"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion, Variants } from "framer-motion";

interface Honey {
  slug: string;
  title: string;
  images?: string[];
}

interface ProductsProps {
  honeys: Honey[];
}

const honeyDescriptions: Record<string, string> = {
  'miod-wielokwiatowy': 'Miód wielokwiatowy łączy w sobie niezwykłe właściwości różnych pożytków pszczelich.',
  'miod-spadziowy': 'Miód spadziowy jest produktem unikalnym i sporo droższym od zwykłych miodów nektarowych. Przyczyną tego jest trudniejsze jego pozyskanie.',
  'miod-akacjowy': 'Miód akacjowy doskonale smakuje i ma sporo właściwości odżywczych. Gdy jest w stanie płynnym bywa bardzo jasny.',
  'miod-nawlociowy': 'Miód nawłociowy to mało popularna i stosunkowo nowa odmiana miodu w Polsce. Powstaje z nektaru nawłoci pospolitej – rośliny potocznie nazywanej mimozą, złotą rózgą lub złotą dziewicą.',
  'miod-lipowy': 'Miód lipowy jest wytwarzany przez pszczoły z nektaru kwiatu lipy. Czasami w smaku wyczuwalna jest mięta.',
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
    x: 20 
  },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: {
      duration: 0.4,
      ease: "easeOut",
    }
  },
};

export default function Products({ honeys }: ProductsProps) {
  return (
    <section id="miody" className="w-full bg-white py-20 px-6 border-y border-stone-200/80 shadow-xs relative">
      
      <div className="text-center mb-12 flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-800 mb-4">
          Nasze Miody
        </h2>
        <p className="text-stone-600 max-w-xl mx-auto mb-6">
          Nasze miody pozyskujemy z naturalnych pożytków obecnych u zbiegu Wieprza i Wisły na zielonej Lubelszczyźnie.
        </p>
        <div className="w-24 h-1 bg-amber-500 rounded-full"></div>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible" 
        viewport={{ once: true, amount: 0.2 }} 
      >
        {honeys.map((honey) => {
          const imageSrc = honey.images && honey.images.length > 0 
            ? honey.images[0] 
            : '/images/placeholder.jpg';

          const cleanTitle = honey.title.split(':')[0];
          const description = honeyDescriptions[honey.slug] || 'Naturalny miód najwyższej jakości z polskiej pasieki.';

          return (
            <motion.div
              key={honey.slug}
              variants={cardVariants}
              className="bg-white rounded-lg border border-stone-200/80 border-b-4 border-b-stone-200 shadow-xs hover:shadow-lg hover:border-b-amber-500 transition-all duration-300 flex flex-col overflow-hidden group will-change-transform"
            >
              <Link 
                href={`/${honey.slug}`} 
                className="relative h-72 md:h-80 bg-stone-50 flex items-center justify-center p-6 overflow-hidden cursor-pointer"
              >
                <Image
                  src={imageSrc}
                  alt={cleanTitle}
                  width={240}
                  height={300}
                  className="object-contain h-full transition-transform duration-500 group-hover:scale-105"
                />
              </Link>

              <div className="p-6 flex flex-col flex-grow text-center">
                <h3 className="text-xl font-serif font-semibold text-amber-600 mb-2">
                  {cleanTitle}
                </h3>
                <p className="text-stone-600 text-sm flex-grow">
                  {description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}