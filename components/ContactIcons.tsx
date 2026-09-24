import Link from "next/link";

export default function ContactIcons() {
  return (
    <section className="mx-auto my-4 max-w-6xl px-6 py-12">
      <h2 className="sr-only">Kontakt</h2>

      <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
        {/* Kafel 1: Formularz kontaktowy */}
        <Link
          href="/kontakt"
          className="group flex flex-col items-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-honey"
        >
          <div className="mb-3 text-honey transition-all duration-300 group-hover:-translate-y-1 group-hover:text-honey-dark motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
            <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="mb-1 text-base font-playfair font-bold text-ink transition-colors group-hover:text-honey-dark">
            Formularz kontaktowy
          </h3>
          <p className="text-sm text-stone-600">
            Napisz do nas w sprawie zamówień i pytań
          </p>
        </Link>

        {/* Kafel 2: Lokalizacja */}
        <div className="flex flex-col items-center">
          <div className="mb-3 text-honey">
            <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 className="mb-1 text-base font-playfair font-bold text-ink">
            Lokalizacja
          </h3>
          <address className="text-sm not-italic text-stone-600">
            &bdquo;Pasieka pod lasem&rdquo;<br />08-530 Dęblin
          </address>
        </div>

        {/* Kafel 3: Telefon */}
        <div className="flex flex-col items-center">
          <div className="mb-3 text-honey">
            <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <h3 className="mb-1 text-base font-playfair font-bold text-ink">
            Telefon
          </h3>
          <p className="text-sm text-stone-600">
            Wkrótce podamy numer telefonu do kontaktu. Zachęcamy do kontaktu mailowego lub poprzez formularz.
          </p>
        </div>
      </div>
    </section>
  );
}