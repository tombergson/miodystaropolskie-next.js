"use client";

import { useState } from "react";
import Image from "next/image";

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    
    const x = ((clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((clientY - rect.top) / rect.height - 0.5) * 2;
    
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden flex min-h-[75vh] flex-col items-center justify-center px-6 text-center bg-stone-950"
    >
      {/* Tło z delikatnym efektem ruchu za myszką */}
      <div 
        className="absolute inset-[-30px] w-[calc(100%+60px)] h-[calc(100%+60px)] transition-transform duration-100 ease-out"
        style={{
          transform: `translate(${mousePos.x * -10}px, ${mousePos.y * -10}px) scale(1.05)`
        }}
      >
        <Image
          src="/images/uploads/2018/10/phsep-1920HD-po-kompresji.png"
          alt="Tło pasieki - Miody Staropolskie"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Przyciemniający gradient dla idealnej czytelności tekstu */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/40 to-stone-950/20 pointer-events-none z-10" />

      {/* TREŚĆ HERO */}
      <div className="relative z-20 max-w-2xl mx-auto flex flex-col items-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-amber-400 drop-shadow">
          Pasieka pod lasem · Dęblin
        </p>
        <h1 className="mb-4 text-4xl font-serif font-bold tracking-tight text-white md:text-6xl drop-shadow-md">
          Miody Staropolskie
        </h1>
        <p className="mb-8 max-w-md text-stone-200 text-base md:text-lg drop-shadow">
          Poznaj smak prawdziwego miodu — ekologiczny, naturalnie bezglutenowy.
        </p>
        <a
          href="#miody"
          className="rounded-md bg-amber-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-amber-600 hover:shadow-amber-500/25"
        >
          Zobacz nasze miody
        </a>
      </div>
    </section>
  );
}