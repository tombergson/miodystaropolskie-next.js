"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from "framer-motion";

export default function OrderBanner() {
  return (
    <section className="relative py-20 px-6 w-full overflow-hidden border-y border-stone-200/80 shadow-xs">
      {/* Tło z efektem subtelnego powiększenia (parallax/zoom) przy najechaniu myszką */}
      <motion.div 
        className="absolute inset-0 z-0"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Image
          src="/images/uploads/2018/10/queen-cup-honeycomb-honey-bee-new-queen-rearing-compartment-56876.jpeg"
          alt="Matka pszczela i plaster miodu - Miody Staropolskie"
          fill
          className="object-cover object-center"
        />
        {/* Ciemny filtr nakładany na zdjęcie dla czytelności */}
        <div className="absolute inset-0 bg-stone-900/80"></div>
      </motion.div>

      
      {/* Treść banera wewnątrz wyśrodkowanego kontenera */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto text-white">
        <h2 className="text-2xl md:text-4xl font-serif font-bold mb-4 tracking-tight">
          Zamówienie na tegoroczny miód
        </h2>
        <div className="w-20 h-1 bg-amber-500 rounded-full mb-4"></div>
        <p className="text-stone-200 text-base md:text-lg mb-6 leading-relaxed font-light max-w-2xl">
          Zamówienia na tegoroczny miód można składać poprzez formularz kontaktowy.
        </p>
        <Link
          href="/kontakt"
          className="inline-flex items-center justify-center rounded-xl bg-amber-500 px-7 py-3 text-sm md:text-base font-semibold text-stone-900 shadow-lg hover:bg-amber-400 transition-all duration-300 transform hover:-translate-y-0.5"
        >
          Przejdź do formularza
        </Link>
      </div>
    </section>
  );
}