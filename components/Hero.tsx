"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const smokeRef = useRef<HTMLDivElement>(null);
  const smoke2Ref = useRef<HTMLDivElement>(null);

  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const animate = () => {
      // Płynne "doganianie" celu (lekki lerp) zamiast skoku 1:1 — łagodzi drgania
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.08;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.08;

      const { x, y } = currentPos.current;

      if (bgRef.current) {
        bgRef.current.style.transform = `translate3d(${x * -10}px, ${y * -10}px, 0) scale(1.05)`;
      }
      if (smokeRef.current) {
        smokeRef.current.style.transform = `translate3d(${x * -18}px, ${y * -12}px, 0) scale(1.08)`;
      }
      if (smoke2Ref.current) {
        smoke2Ref.current.style.transform = `translate3d(${x * -32}px, ${y * -22}px, 0) scale(1.1)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    targetPos.current = { x, y };
  };

  const handleMouseLeave = () => {
    targetPos.current = { x: 0, y: 0 };
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden flex min-h-[93.75vh] flex-col items-center justify-center px-6 text-center bg-stone-950"
    >
      {/* Tło z delikatnym efektem ruchu za myszką i przyciemnionym filtrem */}
      <div
        ref={bgRef}
        className="absolute inset-[-30px] w-[calc(100%+60px)] h-[calc(100%+60px)] will-change-transform"
      >
        <Image
          src="/images/uploads/2018/10/phsep-1920HD-po-kompresji.png"
          alt="Tło pasieki - Miody Staropolskie"
          fill
          priority
          className="object-cover brightness-[0.55]"
        />
      </div>

      {/* Warstwa dymu — wolniejszy, delikatniejszy ruch (głębsza warstwa) */}
      <div
        ref={smokeRef}
        className="absolute inset-[-40px] w-[calc(100%+80px)] h-[calc(100%+80px)] pointer-events-none z-[5] will-change-transform"
      >
        <Image
          src="/images/uploads/2018/10/smoke.png"
          alt=""
          fill
          className="object-cover opacity-70 mix-blend-screen"
        />
      </div>

      {/* Warstwa dymu i pszczół — szybszy ruch (bliższa warstwa, mocniejsza paralaksa) */}
      <div
        ref={smoke2Ref}
        className="absolute inset-[-40px] w-[calc(100%+80px)] h-[calc(100%+80px)] pointer-events-none z-[6] will-change-transform"
      >
        <Image
          src="/images/uploads/2018/10/smoke2.png"
          alt=""
          fill
          className="object-cover opacity-90 mix-blend-screen"
        />
      </div>

      {/* Przyciemniający gradient dla idealnej czytelności tekstu */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/50 via-stone-950/20 to-stone-950/10 pointer-events-none z-10" />

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