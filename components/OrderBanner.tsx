import Link from "next/link";
import Image from "next/image";

export default function OrderBanner() {
  return (
    <section className="group relative w-full overflow-hidden border-y border-stone-200/80 px-6 py-20 shadow-xs">
      {/* Tło z subtelnym zoomem po najechaniu na całą sekcję */}
      <div className="absolute inset-0 z-0 transition-transform duration-[800ms] ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100">
        <Image
          src="/images/uploads/2018/10/queen-cup-honeycomb-honey-bee-new-queen-rearing-compartment-56876.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Ciemny filtr nakładany na zdjęcie dla czytelności */}
        <div className="absolute inset-0 bg-stone-900/80"></div>
      </div>

      {/* Treść banera wewnątrz wyśrodkowanego kontenera */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center text-white">
        <h2 className="mb-4 text-2xl font-playfair font-bold tracking-tight md:text-4xl">
          Zamówienie na tegoroczny miód
        </h2>
        <div className="mb-4 h-1 w-20 rounded-full bg-honey"></div>
        <p className="mb-6 max-w-2xl text-base font-light leading-relaxed text-stone-200 md:text-lg">
          Zamówienia na tegoroczny miód można składać poprzez formularz kontaktowy.
        </p>
        <Link
          href="/kontakt"
          className="inline-flex items-center justify-center rounded-xl bg-honey px-7 py-3 text-sm font-semibold text-stone-900 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-honey-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-honey md:text-base"
        >
          Przejdź do formularza
        </Link>
      </div>
    </section>
  );
}