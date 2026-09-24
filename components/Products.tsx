"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";

interface Honey {
  slug: string;
  title: string;
  images?: string[];
}

interface ProductsProps {
  honeys: Honey[];
}

const honeyDescriptions: Record<string, string> = {
  "miod-wielokwiatowy": "Miód wielokwiatowy łączy w sobie niezwykłe właściwości różnych pożytków pszczelich.",
  "miod-spadziowy": "Miód spadziowy jest produktem unikalnym i sporo droższym od zwykłych miodów nektarowych. Przyczyną tego jest trudniejsze jego pozyskanie.",
  "miod-akacjowy": "Miód akacjowy doskonale smakuje i ma sporo właściwości odżywczych. Gdy jest w stanie płynnym bywa bardzo jasny.",
  "miod-nawlociowy": "Miód nawłociowy to mało popularna i stosunkowo nowa odmiana miodu w Polsce. Powstaje z nektaru nawłoci pospolitej – rośliny potocznie nazywanej mimozą, złotą rózgą lub złotą dziewicą.",
  "miod-lipowy": "Miód lipowy jest wytwarzany przez pszczoły z nektaru kwiatu lipy. Czasami w smaku wyczuwalna jest mięta.",
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 1,
    x: 20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export default function Products({ honeys }: ProductsProps) {
  return (
    <section id="miody" className="w-full bg-white py-20 px-6 border-y border-stone-200/80 shadow-xs relative">
      <div className="text-center mb-12 flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-ink mb-4">
          Nasze Miody
        </h2>
        <p className="text-stone-600 max-w-xl mx-auto mb-6">
          Nasze miody pozyskujemy z naturalnych pożytków obecnych u zbiegu Wieprza i Wisły na zielonej Lubelszczyźnie.
        </p>
        <div className="w-24 h-1 bg-honey rounded-full"></div>
      </div>

      <motion.div
        className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {honeys.map((honey) => {
          const imageSrc = honey.images && honey.images.length > 0
            ? honey.images[0]
            : "/images/placeholder.jpg";

          const cleanTitle = honey.title.split(":")[0];
          const description = honeyDescriptions[honey.slug] || "Naturalny miód najwyższej jakości z polskiej pasieki.";

          return (
            <motion.div
              key={honey.slug}
              variants={cardVariants}
              className="group flex flex-col overflow-hidden rounded-lg border border-stone-200/80 border-b-4 border-b-stone-200 bg-white shadow-xs transition-[box-shadow,border-color] duration-300 hover:border-b-honey hover:shadow-lg"
            >
              <Link
                href={`/miody/${honey.slug}`}
                aria-hidden="true"
                tabIndex={-1}
                className="relative flex h-72 cursor-pointer items-center justify-center overflow-hidden bg-stone-50 p-6 md:h-80"
              >
                <Image
                  src={imageSrc}
                  alt={cleanTitle}
                  width={240}
                  height={300}
                  style={{ height: "100%", width: "auto" }}
                  className="max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </Link>

              <div className="flex flex-grow flex-col p-6 text-center">
                <h3 className="mb-2 text-xl font-playfair font-semibold text-honey-dark">
                  {cleanTitle}
                </h3>
                <p className="mb-4 flex-grow text-sm text-stone-600">
                  {description}
                </p>
                <Link
                  href={`/miody/${honey.slug}`}
                  className="mt-auto inline-block text-sm font-medium text-amber-700 transition-colors hover:text-amber-800"
                >
                  Dowiedz się więcej &rarr;
                </Link>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}