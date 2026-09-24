"use client";

import Image from "next/image";
import { motion, MotionConfig, type Variants } from "framer-motion";

const slideIn = (offset: number): Variants => ({
  hidden: { opacity: 1, x: offset },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
});

const lines = [
  {
    src: "/images/uploads/2018/10/krainka.webp",
    alt: "Pszczoła Kraińska linia Kortówka",
    caption: "Kraińska linia Kortówka",
    variants: slideIn(-30),
  },
  {
    src: "/images/uploads/2018/10/sklenar.webp",
    alt: "Pszczoła Kraińska linia Sklenar",
    caption: "Kraińska linia Sklenar 47/H/47",
    variants: slideIn(30),
  },
];

export default function Bees() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative w-full overflow-x-clip border-y border-stone-200/80 bg-white px-6 py-20 shadow-xs">
        {/* Kontener ograniczający szerokość samej treści */}
        <div className="mx-auto max-w-7xl">
          {/* Nagłówek sekcji z żółtą kreską */}
          <div className="mb-16 flex flex-col items-center text-center">
            <h2 className="mb-4 text-3xl font-playfair font-bold text-ink md:text-4xl">
              Nasze pszczoły
            </h2>
            <div className="mb-6 h-1 w-24 rounded-full bg-honey"></div>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-stone-700">
              W naszej pasiece wykorzystujemy dwie linie pszczoły Kraińskiej: linię{" "}
              <strong className="font-semibold text-honey-dark">Kortówka</strong> oraz linię{" "}
              <strong className="font-semibold text-honey-dark">Sklenar</strong>.
            </p>
          </div>

          {/* Siatka z dwoma mniejszymi zdjęciami */}
          <div className="mx-auto grid max-w-3xl grid-cols-1 gap-8 md:grid-cols-2">
            {lines.map((line) => (
              <motion.div
                key={line.src}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={line.variants}
                className="group relative isolate h-64 overflow-hidden rounded-2xl border border-stone-200/80 bg-stone-100 shadow-md md:h-72"
              >
                <Image
                  src={line.src}
                  alt={line.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 384px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Myszka: pełny overlay po najechaniu */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-900/70 p-6 text-center text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 [@media(hover:none)]:hidden">
                  <h3 className="mb-2 text-lg font-playfair font-semibold text-honey md:text-xl">
                    Apis mellifera carnica
                  </h3>
                  <p className="text-sm text-stone-200">{line.caption}</p>
                </div>

                {/* Dotyk: stały podpis na dole zdjęcia */}
                <div className="absolute inset-x-0 bottom-0 hidden bg-gradient-to-t from-stone-900/85 to-transparent px-4 pb-4 pt-12 text-center text-white [@media(hover:none)]:block">
                  <p className="font-playfair text-base font-semibold text-honey">
                    Apis mellifera carnica
                  </p>
                  <p className="text-sm text-stone-200">{line.caption}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}