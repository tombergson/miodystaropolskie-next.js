import Link from "next/link";

export default function ContactIcons() {
  return (
    <section className="py-12 px-6 max-w-6xl mx-auto my-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">

        {/* Kafel 1: Formularz kontaktowy */}
        <Link
          href="/kontakt"
          className="group flex flex-col items-center cursor-pointer"
        >
          <div className="text-honey mb-3 group-hover:text-honey-dark transition-colors duration-300 transform group-hover:-translate-y-1">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
          </div>
          <h3 className="text-base font-playfair font-bold text-ink mb-1 group-hover:text-honey-dark transition-colors">
            Formularz kontaktowy
          </h3>
          <p className="text-stone-500 text-sm">
            Napisz do nas w sprawie zamówień i pytań
          </p>
        </Link>

        {/* Kafel 2: Lokalizacja */}
        <div className="flex flex-col items-center">
          <div className="text-honey mb-3">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </div>
          <h3 className="text-base font-playfair font-bold text-ink mb-1">
            Lokalizacja
          </h3>
          <p className="text-stone-500 text-sm">
            &bdquo;Pasieka pod lasem&rdquo;<br />08-530 Dęblin
          </p>
        </div>

        {/* Kafel 3: Telefon */}
        <div className="flex flex-col items-center">
          <div className="text-honey mb-3">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
            </svg>
          </div>
          <h3 className="text-base font-playfair font-bold text-ink mb-1">
            Telefon
          </h3>
          <p className="text-stone-500 text-sm">
            Wkrótce podamy numer telefonu do kontaktu. Zachęcamy do kontaktu mailowego lub poprzez formularz.
          </p>
        </div>

      </div>
    </section>
  );
}