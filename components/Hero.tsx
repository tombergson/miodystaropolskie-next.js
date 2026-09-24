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
      className="relative overflow-hidden flex min-h-[85dvh] flex-col items-center justify-center px-6 text-center bg-stone-950"
    >
      {/* Tło z efektem ruchu za myszką */}
      <div
        ref={bgRef}
        className="absolute inset-[-30px] w-[calc(100%+60px)] h-[calc(100%+60px)] will-change-transform"
      >
        <Image
          src="/images/uploads/2018/10/phsep-1920HD-po-kompresji.webp"
          alt="Tło pasieki - Miody Staropolskie"
          fill
          priority
          className="object-cover brightness-[0.85]"
        />
      </div>

      {/* Warstwa dymu 1 (bez filtra na wrapperze, żeby mix-blend-screen działał) */}
      <div
        ref={smokeRef}
        className="absolute inset-[-40px] w-[calc(100%+80px)] h-[calc(100%+80px)] pointer-events-none z-[5] will-change-transform"
      >
        <Image
          src="/images/uploads/2018/10/smoke.webp"
          alt=""
          fill
          className="object-cover opacity-60 mix-blend-screen"
        />
      </div>

      {/* Warstwa dymu 2 */}
      <div
        ref={smoke2Ref}
        className="absolute inset-[-40px] w-[calc(100%+80px)] h-[calc(100%+80px)] pointer-events-none z-[6] will-change-transform"
      >
        <Image
          src="/images/uploads/2018/10/smoke2.webp"
          alt=""
          fill
          className="object-cover opacity-80 mix-blend-screen"
        />
      </div>

      {/* Punktowa poświata pod logo — jaśniej w centrum */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_760px_480px_at_50%_38%,rgba(250,246,239,0.6),transparent_62%)] pointer-events-none z-[7]" />

      {/* Gradient od dołu — ciemne podłoże pod tagline i CTA */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 from-0% via-stone-950/50 via-15% to-transparent to-35% pointer-events-none z-10" />
      {/* Delikatna winieta */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(12,10,9,0.15)_100%)] pointer-events-none z-10" />

      {/* TREŚĆ HERO */}
      <div className="relative z-20 mx-auto flex w-full max-w-[720px] flex-col items-center">

        {/* LOGO W HERO: kwadratowe okno z kadrowaniem na telefonie (max 288px), pełne 3:2 od md */}
        <div className="relative mb-1 aspect-square w-full max-w-72 overflow-hidden md:aspect-[3/2] md:max-w-[720px]">
          <Image
            src="/images/Logo_Square.png"
            alt="Miody Staropolskie Logo"
            fill
            priority
            sizes="(min-width: 768px) 720px, 700px"
            className="scale-[1.6] object-cover drop-shadow-lg md:scale-100 md:object-contain"
          />
        </div>

        {/* Ukryty nagłówek h1 dla wyszukiwarek (SEO) */}
        <h1 className="sr-only">Miody Staropolskie</h1>

        <h2 className="-mt-6 mb-9 max-w-xl text-stone-50 text-2xl md:-mt-20 md:text-3xl leading-snug font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] font-playfair">
          Poznaj smak prawdziwego miodu — ekologiczny, naturalnie bezglutenowy.
        </h2>

        <a
          href="#miody"
          className="group relative inline-flex items-center gap-2.5 rounded-full bg-stone-950/30 px-6 py-2.5 text-xs font-medium tracking-widest uppercase text-stone-100 backdrop-blur-sm transition-all duration-300 hover:bg-stone-950/45 hover:text-white"
        >
          Sprawdź ofertę
          <span className="block h-1.5 w-1.5 rounded-full bg-amber-400 transition-all duration-300 group-hover:scale-150 group-hover:bg-amber-300"></span>
        </a>
      </div>
    </section>
  );
}