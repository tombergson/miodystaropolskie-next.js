"use server";

import { contactFormSchema } from "@/lib/validations/contact";
import { checkRateLimit } from "@/lib/rateLimit";
import { headers } from "next/headers";
import { z } from "zod";

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

export async function sendContactEmail(formData: FormData) {
  try {
    // 1. Rate limiting per IP address using Next.js headers
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "unknown";
    const rateLimitResult = checkRateLimit(ip);

    if (!rateLimitResult.allowed) {
      return { success: false, error: "Zbyt wiele prób. Spróbuj ponownie za chwilę." };
    }

    // Wyciągamy dane z FormData
    const rawData = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };
    const turnstileToken = formData.get("turnstileToken") as string;

    const isDev = process.env.NODE_ENV !== "production";

    // 2. Weryfikacja tokenu Cloudflare Turnstile (pomijamy w trybie deweloperskim)
    if (!isDev) {
      if (!turnstileToken) {
        return { success: false, error: "Brak tokenu weryfikacji CAPTCHA." };
      }

      const turnstileRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: process.env.TURNSTILE_SECRET_KEY || "",
          response: turnstileToken,
        }),
      });

      const turnstileResult = await turnstileRes.json();

      if (!turnstileResult.success) {
        return { success: false, error: "Niepomyślna weryfikacja bezpieczeństwa (CAPTCHA)." };
      }
    } else {
      console.log("DEV_MODE: Pomijam weryfikację Cloudflare Turnstile.");
    }

    // 3. Walidacja Zod dla danych formularza
    const validatedData = contactFormSchema.parse(rawData);
    const { name, email, message } = validatedData;

    // 4. Wywołanie Resend API z zabezpieczeniem sieciowym dla macOS
    try {
      console.log("Wysyłam e-mail przez Resend API...");
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "Miody Staropolskie <kontakt@miodystaropolskie.pl>",
          to: [process.env.CONTACT_EMAIL_TO || "pasieka@miodystaropolskie.pl"],
          reply_to: email,
          subject: `[miodystaropolskie.pl] Nowa wiadomość od ${escapeHtml(name)} (${escapeHtml(email)})`,
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
      });

      const resData = await response.json();

      if (!response.ok) {
        console.error("RESEND_API_ERROR:", { status: response.status, resData });
        return { success: false, error: "Nie udało się wysłać wiadomości. Spróbuj ponownie później." };
      }

      console.log("EMAIL_SENT_SUCCESS", { messageId: resData?.id });
      return { success: true };

    } catch (networkError) {
      if (isDev) {
        console.warn("DEV_MODE WARNING: Lokalna sieć zablokowała fetch do Resend. Symuluję sukces wysyłki dla UI.");
        return { success: true };
      }
      throw networkError;
    }

  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: "Wprowadzone dane są niepoprawne. Sprawdź formularz." };
    }

    console.error("INTERNAL_SERVER_ERROR:", {
      type: error instanceof Error ? error.constructor.name : typeof error,
      message: error instanceof Error ? error.message : String(error),
    });

    return { success: false, error: "Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie później." };
  }
}