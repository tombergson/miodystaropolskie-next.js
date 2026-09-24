import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "/#miody", label: "Miody" },
  { href: "/wydarzenia", label: "Wydarzenia" },
  { href: "/kontakt", label: "Kontakt" },
  { href: "/polityka-prywatnosci", label: "Polityka prywatności" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-honey/30 bg-sand text-stone-700">
      {/* Cienka miodowa linia na górze, spójna z akcentem w Products */}
      <div className="absolute top-0 left-1/2 h-0.5 w-24 -translate-x-1/2 rounded-full bg-honey" />

      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-3 md:items-baseline">
        <div className="flex w-fit flex-col items-center justify-self-center md:justify-self-start">
          <p className="font-playfair text-2xl font-semibold text-ink">
            Miody <span className="text-amber-800">Staropolskie</span>
          </p>
          {/* Kadrowanie logo bez edycji pliku: kwadratowe okno + powiększenie.
              Wyświetlana szerokość ≈ 176px * 1.5 (proporcje 3:2) * 1.6 (scale) ≈ 420px */}
          <div className="relative mt-2 h-44 w-44 overflow-hidden">
            <Image
              src="/images/Main_Logo_3x2.png"
              alt="Miody Staropolskie Logo"
              fill
              sizes="420px"
              className="scale-[1.6] object-cover"
            />
          </div>
        </div>

        <nav aria-label="Nawigacja w stopce">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-800">
            Nawigacja
          </p>
          <ul className="mt-4 space-y-0.5 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-block py-1 text-stone-600 transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-honey"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-800">
            Zamówienia
          </p>
          <p className="mt-4 text-sm leading-relaxed text-stone-600">
            Tegoroczny miód zamówisz przez formularz kontaktowy.
          </p>
          <Link
            href="/kontakt"
            className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-honey px-5 py-2.5 text-sm font-semibold text-ink transition-all hover:bg-honey-dark hover:shadow-lg hover:shadow-honey/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-honey"
          >
            Formularz zamówienia
          </Link>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-2 border-t border-stone-900/10 bg-black/5 px-6 py-6 text-center text-xs text-stone-700">
        <div className="flex items-center justify-center gap-1.5">
          <span>Designed by</span>
          <Link
            href="https://tombergson.eu"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TomBergson (otwiera się w nowej karcie)"
            className="transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-honey"
          >
            <Image
              src="/images/tb-grey-2.png"
              alt=""
              width={18}
              height={18}
              className="inline-block object-contain"
            />
          </Link>
        </div>
        <div>&copy; {year} miodystaropolskie.pl</div>
      </div>
    </footer>
  );
}