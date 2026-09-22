"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";

const slideLeftVariants: Variants = {
  hidden: { opacity: 1, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const slideRightVariants: Variants = {
  hidden: { opacity: 1, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function About() {
  return (
    // Używamy tego samego sprawdzonego stylu obramowania i cienia
    <section className="w-full bg-white py-20 px-6 border-y border-stone-200/80 shadow-xs relative">
      <div className="max-w-7xl mx-auto">
        {/* Nagłówek sekcji z żółtą kreską */}
        <div className="text-center mb-16 flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-ink mb-4">
            O nas
          </h2>
          <div className="w-24 h-1 bg-honey rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center overflow-hidden">
          {/* Treść / Opis - po lewej stronie */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={slideLeftVariants}
            className="flex flex-col justify-center space-y-4 text-stone-700 leading-relaxed text-base md:text-lg order-2 lg:order-1 will-change-transform"
          >
            <p>
              Wiosną 2013 roku założyliśmy pasiekę z jedną rodziną. Na początku były dwa ule warszawskie zwykłe, które zrobiliśmy własnoręcznie. Wspomniane ule postawiliśmy w sąsiedztwie lasu i łąk. Wszystko po to aby pszczoły miały spokój oraz dobre &bdquo;pożytki&rdquo;.
            </p>
            <p>
              W miarę upływu czasu nasza pasieka rozrosła się do zawrotnej ilości 10 pni ;-). I tak juz pewnie zostanie ponieważ pszczoły traktujemy jako hobby, a nie źródło zarobku.
            </p>
            <p>
              Niewątpliwą zaletą naszej pasieki jest przede wszystkim jej niewielki rozmiar, który pozwala dopilnować każdą rodzinę z osobna. Nasz miód pozyskiwany w sposób tradycyjny, czyli tak jak to robili nasi dziadkowie.
            </p>
          </motion.div>

          {/* Zdjęcie pasieki - po prawej stronie */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={slideRightVariants}
            className="relative h-80 md:h-[420px] rounded-2xl overflow-hidden shadow-md bg-stone-100 order-1 lg:order-2 will-change-transform"
          >
            <Image
            src="/images/uploads/2018/10/IMG-20170216-00039.jpg"
            alt="Nasza pasieka - Miody Staropolskie"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
          </motion.div>
        </div>
      </div>
    </section>
  );
}