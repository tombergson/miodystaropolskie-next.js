import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-honey/20 bg-ink text-stone-400">
      {/* Cienka miodowa linia na górze, spójna z akcentem w Products */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-honey rounded-full" />

      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-3">
        <div>
          <p className="font-playfair text-2xl font-semibold text-cream">
            Miody <span className="text-honey">Staropolskie</span>
          </p>
          <p className="mt-3 text-sm text-stone-500 leading-relaxed">
            Pasieka pod lasem · 08-530 Dęblin
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-honey/80">
            Nawigacja
          </p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link href="/#miody" className="text-stone-400 transition-colors hover:text-cream">
                Miody
              </Link>
            </li>
            <li>
              <Link href="/wydarzenia" className="text-stone-400 transition-colors hover:text-cream">
                Wydarzenia
              </Link>
            </li>
            <li>
              <Link href="/kontakt" className="text-stone-400 transition-colors hover:text-cream">
                Kontakt
              </Link>
            </li>
            <li>
              <Link href="/polityka-prywatnosci" className="text-stone-400 transition-colors hover:text-cream">
                Polityka prywatności
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-honey/80">
            Zamówienia
          </p>
          <p className="mt-4 text-sm text-stone-500 leading-relaxed">
            Tegoroczny miód zamówisz przez formularz kontaktowy.
          </p>
          <Link
            href="/kontakt"
            className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-honey px-5 py-2.5 text-sm font-semibold text-ink transition-all hover:bg-honey-dark hover:shadow-lg hover:shadow-honey/20"
          >
            Formularz zamówienia
          </Link>
        </div>
      </div>

      <div className="border-t border-stone-800/60 px-6 py-6 text-center text-xs text-stone-600 flex flex-col items-center justify-center gap-2">
        <div className="flex items-center justify-center gap-1.5">
          <span>Designed by</span>
          <Link
            href="https://tombergson.eu"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-70"
          >
            <Image
              src="/images/tb-grey-2.png"
              alt="TomBergson Logo"
              width={18}
              height={18}
              className="inline-block object-contain"
            />
          </Link>
        </div>
        <div>
          &copy; {year} miodystaropolskie.pl
        </div>
      </div>
    </footer>
  );
}