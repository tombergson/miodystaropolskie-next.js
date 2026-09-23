import Link from "next/link";

export default async function ContactPage() {
  // Przykładowa Server Action do obsługi wysyłki formularza
  async function handleSubmit(formData: FormData) {
    "use server";
    
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    // Tutaj możesz dodać logikę wysyłki e-maila (np. przez Resend, Nodemailer lub Formspree)
    console.log("Wysłano wiadomość:", { name, email, message });
  }

  return (
    <main className="min-h-screen py-20 px-6 bg-cream">
      <div className="mx-auto max-w-2xl">
        {/* Przycisk powrotu */}
        <Link 
          href="/"
          className="inline-flex items-center text-sm font-medium text-stone-600 hover:text-stone-900 mb-8 transition-colors"
        >
          &larr; Wróć do strony głównej
        </Link>

        <article className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-stone-200/80">
          
          {/* Tytuł */}
          <h1 className="font-playfair text-3xl md:text-4xl font-bold text-stone-900 mb-4 text-center">
            Napisz do nas
          </h1>
          <p className="text-stone-600 text-center mb-10">
            Masz pytania dotyczące naszych miodów lub chcesz złożyć zamówienie? Skontaktuj się z nami!
          </p>

          {/* Formularz */}
          <form action={handleSubmit} className="space-y-6">
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

            <button 
              type="submit"
              className="w-full py-4 px-6 bg-amber-700 hover:bg-amber-800 text-white font-medium rounded-xl shadow-md transition-colors cursor-pointer"
            >
              Wyślij wiadomość
            </button>
          </form>

        </article>
      </div>
    </main>
  );
}