import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 bg-neutral-900 text-neutral-300">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3 md:px-6">
        <div>
          <p className="text-lg font-bold text-white">
            Miody <span className="text-honey">Staropolskie</span>
          </p>
          <p className="mt-2 text-sm text-neutral-400">
            Pasieka pod lasem · 08-530 Dęblin
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Nawigacja
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/#miody" className="hover:text-white">
                Miody
              </Link>
            </li>
            <li>
              <Link href="/wydarzenia" className="hover:text-white">
                Wydarzenia
              </Link>
            </li>
            <li>
              <Link href="/kontakt" className="hover:text-white">
                Kontakt
              </Link>
            </li>
            <li>
              <Link href="/polityka-prywatnosci" className="hover:text-white">
                Polityka prywatności
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Zamówienia
          </p>
          <p className="mt-3 text-sm text-neutral-400">
            Tegoroczny miód zamówisz przez formularz kontaktowy.
          </p>
          <Link
            href="/kontakt"
            className="mt-4 inline-block rounded-md bg-honey px-4 py-2 text-sm font-semibold text-white hover:bg-honey-dark"
          >
            Formularz zamówienia
          </Link>
        </div>
      </div>
      <div className="border-t border-neutral-800 py-4 text-center text-xs text-neutral-500">
        © {year} Miody Staropolskie
      </div>
    </footer>
  );
}