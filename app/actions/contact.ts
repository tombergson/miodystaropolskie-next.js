"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;
  const token = formData.get("turnstileToken") as string;

  if (!token) {
    return { success: false, error: "Brak weryfikacji Turnstile." };
  }

  // Weryfikacja Turnstile po stronie serwera
  try {
    const turnstileRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: token,
      }),
    });

    const turnstileData = await turnstileRes.json();
    if (!turnstileData.success) {
      return { success: false, error: "Weryfikacja antybotowa nie powiodła się." };
    }
  } catch {
    return { success: false, error: "Błąd połączenia z weryfikacją Turnstile." };
  }

  // Wysyłka maila przez Resend
  try {
    await resend.emails.send({
      from: "Miody Staropolskie <kontakt@miodystaropolskie.pl>",
      to: ["pasieka@miodystaropolskie.pl"],
      subject: `Nowa wiadomość od ${name} (${email})`,
      text: `Nowa wiadomość z formularza kontaktowego\n\nImię: ${name}\nE-mail: ${email}\n\nWiadomość:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
          <h2 style="color: #92400e; margin-top: 0; border-bottom: 2px solid #fef3c7; padding-bottom: 10px;">
            Nowa wiadomość z formularza kontaktowego
          </h2>
          
          <p style="margin: 15px 0 5px 0; color: #475569; font-size: 14px;"><strong>Imię:</strong></p>
          <p style="margin: 0; color: #1e293b; font-size: 16px;">${name}</p>

          <p style="margin: 15px 0 5px 0; color: #475569; font-size: 14px;"><strong>E-mail:</strong></p>
          <p style="margin: 0; color: #1e293b; font-size: 16px;">
            <a href="mailto:${email}" style="color: #b45309; text-decoration: none;">${email}</a>
          </p>

          <p style="margin: 15px 0 5px 0; color: #475569; font-size: 14px;"><strong>Wiadomość:</strong></p>
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; border-left: 4px solid #b45309; color: #334155; font-size: 15px; line-height: 1.5; white-space: pre-wrap;">${message}</div>
          
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 25px 0 15px 0;" />
          <p style="font-size: 12px; color: #94a3b8; text-align: center; margin: 0;">
            Wiadomość wysłana automatycznie z formularza kontaktowego na stronie Miodów Staropolskich.
          </p>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Resend error:", error);
    return { success: false, error: "Nie udało się wysłać wiadomości. Spróbuj ponownie później." };
  }
}