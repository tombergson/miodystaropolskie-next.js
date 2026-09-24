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

export default function Bees() {
  return (
    <section className="w-full bg-white py-20 px-6 border-y border-stone-200/80 shadow-xs relative">
      {/* Kontener ograniczający szerokość samej treści */}
      <div className="max-w-7xl mx-auto">
        {/* Nagłówek sekcji z żółtą kreską */}
        <div className="text-center mb-16 flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-ink mb-4">
            Nasze pszczoły
          </h2>
          <div className="w-24 h-1 bg-honey rounded-full mb-6"></div>
          <p className="text-stone-700 max-w-2xl mx-auto text-lg leading-relaxed">
            W naszej pasiece wykorzystujemy dwie linie pszczoły Kraińskiej: linię <strong className="text-honey-dark font-semibold">Kortówka</strong> oraz linię <strong className="text-honey-dark font-semibold">Sklenar</strong>.
          </p>
        </div>

        {/* Siatka z dwoma mniejszymi zdjęciami */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Karta 1: Kortówka (Najazd z lewej) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={slideLeftVariants}
            className="relative h-64 md:h-72 rounded-2xl overflow-hidden shadow-md group cursor-pointer bg-stone-100 border border-stone-200/80 will-change-transform"
          >
            <Image
              src="/images/uploads/2018/10/krainka.webp"
              alt="Pszczoła Kraińska linia Kortówka"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-stone-900/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-6 text-white">
              <h3 className="text-lg md:text-xl font-playfair font-semibold text-honey mb-2">
                Apis mellifera carnica
              </h3>
              <p className="text-stone-200 text-sm">
                Kraińska linia Kortówka
              </p>
            </div>
          </motion.div>

          {/* Karta 2: Sklenar (Najazd z prawej) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={slideRightVariants}
            className="relative h-64 md:h-72 rounded-2xl overflow-hidden shadow-md group cursor-pointer bg-stone-100 border border-stone-200/80 will-change-transform"
          >
            <Image
              src="/images/uploads/2018/10/sklenar.webp"
              alt="Pszczoła Kraińska linia Sklenar"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-stone-900/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-6 text-white">
              <h3 className="text-lg md:text-xl font-playfair font-semibold text-honey mb-2">
                Apis mellifera carnica
              </h3>
              <p className="text-stone-200 text-sm">
                Rasa Krainka linia Sklenar 47/H/47
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}