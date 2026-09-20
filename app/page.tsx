import About from "@/components/About";
import Bees from "@/components/Bees";
import ContactIcons from "@/components/ContactIcons";
import FavoriteSites from "@/components/FavoriteSites";
import Hero from "@/components/Hero";
import OrderBanner from "@/components/OrderBanner";
import Products from "@/components/Products";
import Socials from "@/components/Socials";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Osobna sekcja Hero z efektem dymu i pszczół */}
      <Hero />

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

      {/* Sekcja z trzema ikonami kontaktowymi */}
      <ContactIcons />

      {/* Sekcja Facebook */}
      <Socials />
    </main>
  );
}