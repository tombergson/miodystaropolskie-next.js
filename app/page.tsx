import About from "@/components/About";
import Bees from "@/components/Bees";
import ContactIcons from "@/components/ContactIcons";
import FavoriteSites from "@/components/FavoriteSites";
import Hero from "@/components/Hero";
import OrderBanner from "@/components/OrderBanner";
import Products from "@/components/Products";
import Socials from "@/components/Socials";
import { getAllHoneys } from "@/lib/honeys"; // 1. Importujemy funkcję pobierającą miody

export default function HomePage() {
  const honeys = getAllHoneys(); // 2. Pobieramy dane na serwerze

  return (
    <main className="min-h-screen">
      {/* Osobna sekcja Hero z efektem dymu i pszczół */}
      <Hero />

      {/* Sekcja polecanych stron */}
      <FavoriteSites />

      {/* Sekcja Nasze Miody z ID do obsługi kotwicy */}
      <div id="miody">
        <Products honeys={honeys} /> {/* 3. Przekazujemy miody jako prop */}
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