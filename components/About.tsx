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

const slideLeftVariants = slideIn(-30);
const slideRightVariants = slideIn(30);

export default function About() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative w-full overflow-x-clip border-y border-stone-200/80 bg-cream px-6 py-20 shadow-xs">
        <div className="mx-auto max-w-7xl">
          {/* Nagłówek sekcji z żółtą kreską */}
          <div className="mb-16 flex flex-col items-center text-center">
            <h2 className="mb-4 text-3xl font-playfair font-bold text-ink md:text-4xl">
              O nas
            </h2>
            <div className="h-1 w-24 rounded-full bg-honey"></div>
          </div>

          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            {/* Treść / Opis - po lewej stronie */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={slideLeftVariants}
              className="order-2 flex flex-col justify-center space-y-4 text-base leading-relaxed text-stone-700 md:text-lg lg:order-1"
            >
              <p>
                Wiosną 2013 roku założyliśmy pasiekę z jedną rodziną. Na początku były dwa ule warszawskie zwykłe, które zrobiliśmy własnoręcznie. Wspomniane ule postawiliśmy w sąsiedztwie lasu i łąk. Wszystko po to aby pszczoły miały spokój oraz dobre &bdquo;pożytki&rdquo;.
              </p>
              <p>
                W miarę upływu czasu nasza pasieka rozrosła się do zawrotnej ilości 10 pni ;-). I tak już pewnie zostanie ponieważ pszczoły traktujemy jako hobby, a nie źródło zarobku.
              </p>
              <p>
                Niewątpliwą zaletą naszej pasieki jest przede wszystkim jej niewielki rozmiar, który pozwala dopilnować każdą rodzinę z osobna. Nasz miód jest pozyskiwany w sposób tradycyjny, czyli tak jak to robili nasi dziadkowie.
              </p>
            </motion.div>

            {/* Zdjęcie pasieki - po prawej stronie */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={slideRightVariants}
              className="relative isolate order-1 h-80 overflow-hidden rounded-2xl bg-stone-100 shadow-md md:h-[420px] lg:order-2"
            >
              <Image
                src="/images/uploads/2018/10/IMG-20170216-00039.webp"
                alt="Nasza pasieka - Miody Staropolskie"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}