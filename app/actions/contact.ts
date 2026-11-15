"use server";

import { headers } from "next/headers";
import { contactFormSchema } from "@/lib/validations/contact";
import { checkRateLimit } from "@/lib/rateLimit";

const isDev = process.env.NODE_ENV === "development";

const ALLOWED_HOSTNAMES = new Set(
  (process.env.TURNSTILE_ALLOWED_HOSTNAMES || "miodystaropolskie.pl,www.miodystaropolskie.pl")
    .split(",")
    .map((h) => h.trim())
    .filter(Boolean)
);

/**
 * Escapes HTML special characters to prevent injection in email templates
 */
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

function readString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

const SERVER_ERROR = "Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie później.";

export async function sendContactEmail(
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  try {
    // 1. Rate limiting per IP (za Cloudflare: cf-connecting-ip)
    const headersList = await headers();
    const ip =
      headersList.get("cf-connecting-ip") ??
      headersList.get("x-real-ip") ??
      headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown";

    if (!checkRateLimit(ip).allowed) {
      return { success: false, error: "Zbyt wiele prób. Spróbuj ponownie za chwilę." };
    }

    // 2. Walidacja przed zewnętrznymi wywołaniami
    const parsed = contactFormSchema.safeParse({
      name: readString(formData, "name"),
      email: readString(formData, "email"),
      message: readString(formData, "message"),
    });
    if (!parsed.success) {
      return { success: false, error: "Wprowadzone dane są niepoprawne. Sprawdź formularz." };
    }
    const { name, email, message } = parsed.data;

    // 3. Weryfikacja Cloudflare Turnstile (w dev: testowy secret w .env.local)
    const turnstileToken = readString(formData, "turnstileToken");
    if (!turnstileToken || turnstileToken.length > 2048) {
      return { success: false, error: "Brak tokenu weryfikacji CAPTCHA." };
    }

    const secret = process.env.TURNSTILE_SECRET_KEY;
    if (!secret) {
      console.error("CONFIG_ERROR: brak TURNSTILE_SECRET_KEY");
      return { success: false, error: SERVER_ERROR };
    }

    const turnstileRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: turnstileToken, remoteip: ip }),
      signal: AbortSignal.timeout(8000),
    });
    const turnstileResult = (await turnstileRes.json()) as {
      success?: boolean;
      hostname?: string;
      "error-codes"?: string[];
    };

    if (!turnstileResult.success || (!isDev && !ALLOWED_HOSTNAMES.has(turnstileResult.hostname ?? ""))) {
      console.warn("TURNSTILE_REJECTED:", {
        success: turnstileResult.success,
        hostname: turnstileResult.hostname,
        errors: turnstileResult["error-codes"],
      });
      return { success: false, error: "Niepomyślna weryfikacja bezpieczeństwa (CAPTCHA)." };
    }

    // 4. Resend
    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      console.error("CONFIG_ERROR: brak RESEND_API_KEY");
      return { success: false, error: SERVER_ERROR };
    }

    // Temat to czysty tekst: bez escapeHtml, tylko bez CR/LF i z limitem długości
    const safeSubjectName = name.replace(/[\r\n]+/g, " ").slice(0, 100);

    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: "Miody Staropolskie <kontakt@miodystaropolskie.pl>",
          to: [process.env.CONTACT_EMAIL_TO || "pasieka@miodystaropolskie.pl"],
          reply_to: email,
          subject: `[miodystaropolskie.pl] Nowa wiadomość od ${safeSubjectName} (${email})`,
          text: `Nowa wiadomość z formularza kontaktowego\n\nImię: ${name}\nE-mail: ${email}\n\nWiadomość:\n${message}`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; color: #111; line-height: 1.6;">
              <h2>Nowa wiadomość z formularza kontaktowego</h2>
              <p><strong>Imię i nazwisko:</strong> ${escapeHtml(name)}</p>
              <p><strong>Email nadawcy:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
              <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
              <p><strong>Treść wiadomości:</strong></p>
              <p style="white-space: pre-wrap; background: #f9f9f9; padding: 15px; border-radius: 6px; border: 1px solid #e5e5e5;">${escapeHtml(message)}</p>
              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 25px 0 15px 0;" />
              <p style="font-size: 12px; color: #94a3b8; text-align: center; margin: 0;">
                Wiadomość wysłana automatycznie z formularza kontaktowego na stronie miodystaropolskie.pl.
              </p>
            </div>
          `,
        }),
        signal: AbortSignal.timeout(10000),
      });

      if (!response.ok) {
        console.error("RESEND_API_ERROR:", { status: response.status, body: await response.text() });
        return { success: false, error: "Nie udało się wysłać wiadomości. Spróbuj ponownie później." };
      }

      return { success: true };
    } catch (networkError) {
      if (isDev) {
        console.warn("DEV_MODE WARNING: Lokalna sieć zablokowała fetch do Resend. Symuluję sukces wysyłki dla UI.");
        return { success: true };
      }
      throw networkError;
    }
  } catch (error) {
    console.error("INTERNAL_SERVER_ERROR:", {
      type: error instanceof Error ? error.constructor.name : typeof error,
      message: error instanceof Error ? error.message : String(error),
    });

    return { success: false, error: SERVER_ERROR };
  }
}