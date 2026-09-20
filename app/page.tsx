import About from "@/components/About";
import Bees from "@/components/Bees";
import FavoriteSites from "@/components/FavoriteSites";
import OrderBanner from "@/components/OrderBanner";
import Products from "@/components/Products";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-honey-dark">
          Pasieka pod lasem · Dęblin
        </p>
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-ink md:text-5xl">
          Miody Staropolskie
        </h1>
        <p className="mb-8 max-w-md text-neutral-600">
          Poznaj smak prawdziwego miodu — ekologiczny, naturalnie bezglutenowy.
        </p>
        <a
          href="#miody"
          className="rounded-md bg-honey px-6 py-3 text-sm font-semibold text-white transition hover:bg-honey-dark"
        >
          Zobacz nasze miody
        </a>
      </section>

      {/* Sekcja polecanych stron */}
      <FavoriteSites />

      {/* Sekcja Nasze Miody z ID do obsługi kotwicy */}
      <div id="miody">
        <Products />
      </div>

      {/* Sekcja O nas */}
      <div id="o-nas">
        <About />
      </div>

      {/* Sekcja Nasze pszczoły */}
      <Bees />

      {/* Szeroki baner zamawiania */}
      <OrderBanner />

      
    </main>
  );
}