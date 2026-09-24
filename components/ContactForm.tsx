"use client";

import { useState, useTransition } from "react";
import Turnstile from "@/components/Turnstile";
import { sendContactEmail } from "@/app/actions/contact";

const fieldClass =
  "w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 text-stone-800 shadow-xs transition-all placeholder:text-stone-400 focus:border-honey-dark focus:bg-white focus:outline-none focus:ring-2 focus:ring-honey/40";

export default function ContactForm() {
  const [token, setToken] = useState<string>("");
  const [status, setStatus] = useState<{ success?: boolean; message?: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null);

    if (!token) {
      setStatus({ success: false, message: "Proszę potwierdzić, że nie jesteś robotem." });
      return;
    }

    // Zapisujemy referencję do formularza przed wejściem w asynchroniczny transition
    const formElement = e.currentTarget;
    const formData = new FormData(formElement);
    formData.append("turnstileToken", token);

    startTransition(async () => {
      const result = await sendContactEmail(formData);
      if (result.success) {
        setStatus({ success: true, message: "Wiadomość została wysłana pomyślnie!" });
        formElement.reset();
        setToken("");
      } else {
        setStatus({ success: false, message: result.error || "Wystąpił błąd podczas wysyłania." });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {status && (
        <div
          role={status.success ? "status" : "alert"}
          className={`flex items-start gap-3 rounded-xl border p-4 text-sm ${
            status.success
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-rose-200 bg-rose-50 text-rose-800"
          }`}
        >
          <svg className="mt-0.5 h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            {status.success ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M5 13l4 4L19 7" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            )}
          </svg>
          <span>{status.message}</span>
        </div>
      )}

      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium text-stone-700">
          Twoje imię
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          placeholder="Jan Kowalski"
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-stone-700">
          Adres e-mail
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder="jan@example.com"
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-stone-700">
          Treść wiadomości
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="W czym możemy Ci pomóc?"
          className={`${fieldClass} resize-none`}
        ></textarea>
      </div>

      {/* Stała wysokość, żeby formularz nie skakał po załadowaniu widgetu */}
      <div className="flex min-h-[65px] justify-center overflow-hidden">
        <Turnstile
          onSuccess={(token) => setToken(token)}
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-honey px-6 py-4 font-semibold text-stone-900 shadow-md transition-all duration-300 hover:bg-honey-dark hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-honey disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:shadow-md"
      >
        {isPending && (
          <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
        )}
        {isPending ? "Wysyłanie..." : "Wyślij wiadomość"}
      </button>
    </form>
  );
}