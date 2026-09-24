import Link from "next/link";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <main className="min-h-screen py-20 px-6 bg-cream">
      <div className="mx-auto max-w-2xl">
        <Link 
          href="/"
          className="inline-flex items-center text-sm font-medium text-stone-600 hover:text-stone-900 mb-8 transition-colors"
        >
          &larr; Wróć do strony głównej
        </Link>

        <article className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-stone-200/80">
          <h1 className="font-playfair text-3xl md:text-4xl font-bold text-stone-900 mb-4 text-center">
            Napisz do nas
          </h1>
          <p className="text-stone-600 text-center mb-10">
            Masz pytania dotyczące naszych miodów lub chcesz złożyć zamówienie? Skontaktuj się z nami!
          </p>

          <ContactForm />
        </article>
      </div>
    </main>
  );
}