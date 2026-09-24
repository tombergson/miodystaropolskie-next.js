import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-honey/30 bg-sand text-stone-700">
      {/* Cienka miodowa linia na górze, spójna z akcentem w Products */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-honey rounded-full" />

      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-3 md:items-baseline">
        <div className="flex w-fit flex-col items-center">
          <p className="font-playfair text-2xl font-semibold text-ink">
            Miody <span className="text-amber-800">Staropolskie</span>
          </p>
          {/* Kadrowanie logo bez edycji pliku: kwadratowe okno + powiększenie */}
          <div className="relative mt-2 h-44 w-44 overflow-hidden">
            <Image
              src="/images/Main_Logo_3x2.png"
              alt="Miody Staropolskie Logo"
              fill
              sizes="176px"
              className="object-cover scale-[1.6]"
            />
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-800">
            Nawigacja
          </p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link href="/#miody" className="text-stone-600 transition-colors hover:text-ink">
                Miody
              </Link>
            </li>
            <li>
              <Link href="/wydarzenia" className="text-stone-600 transition-colors hover:text-ink">
                Wydarzenia
              </Link>
            </li>
            <li>
              <Link href="/kontakt" className="text-stone-600 transition-colors hover:text-ink">
                Kontakt
              </Link>
            </li>
            <li>
              <Link href="/polityka-prywatnosci" className="text-stone-600 transition-colors hover:text-ink">
                Polityka prywatności
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-800">
            Zamówienia
          </p>
          <p className="mt-4 text-sm text-stone-600 leading-relaxed">
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

      <div className="border-t border-stone-900/10 bg-black/5 px-6 py-6 text-center text-xs text-stone-700 flex flex-col items-center justify-center gap-2">
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