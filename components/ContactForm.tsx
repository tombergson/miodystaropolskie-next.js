"use client";

import { useState, useTransition } from "react";
import Turnstile from "@/components/Turnstile";
import { sendContactEmail } from "@/app/actions/contact";

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
        <div className={`p-4 rounded-xl text-sm ${status.success ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-rose-50 text-rose-800 border border-rose-200"}`}>
          {status.message}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-2">
          Twoje imię
        </label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          required
          placeholder="Jan Kowalski"
          className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-600/50 focus:border-amber-600 text-stone-800 bg-stone-50/50 transition-all"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">
          Adres e-mail
        </label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          required
          placeholder="jan@example.com"
          className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-600/50 focus:border-amber-600 text-stone-800 bg-stone-50/50 transition-all"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-2">
          Treść wiadomości
        </label>
        <textarea 
          id="message" 
          name="message" 
          rows={5}
          required
          placeholder="W czym możemy Ci pomóc?"
          className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-600/50 focus:border-amber-600 text-stone-800 bg-stone-50/50 transition-all resize-none"
        ></textarea>
      </div>

      <Turnstile
        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
        onSuccess={(token) => setToken(token)}
      />

      <button 
        type="submit"
        disabled={isPending}
        className="w-full py-4 px-6 bg-amber-700 hover:bg-amber-800 text-white font-medium rounded-xl shadow-md transition-colors cursor-pointer disabled:opacity-50"
      >
        {isPending ? "Wysyłanie..." : "Wyślij wiadomość"}
      </button>
    </form>
  );
}