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
          src="/images/uploads/2018/10/phsep-1920HD-po-kompresji.png"
          alt="Tło pasieki - Miody Staropolskie"
          fill
          priority
          className="object-cover brightness-[0.78]"
        />
      </div>

      {/* Warstwa dymu 1 */}
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

      {/* Warstwa dymu 2 */}
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

      {/* Gradient przyciemniający */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/45 via-stone-950/15 to-stone-950/10 pointer-events-none z-10" />
      {/* Delikatna winieta po bokach dla skupienia uwagi na środku */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(12,10,9,0.3)_100%)] pointer-events-none z-10" />

      {/* TREŚĆ HERO */}
      <div className="relative z-20 max-w-2xl mx-auto flex flex-col items-center">

        {/* LOGO W HERO */}
        <div className="mb-1 flex justify-center">
          <Image
            src="/images/Main_Logo_3x2.png"
            alt="Miody Staropolskie Logo"
            width={640}
            height={220}
            priority
            style={{ width: "auto", height: "auto" }}
            className="max-w-[380px] md:max-w-[540px] drop-shadow-lg"
          />
        </div>

        {/* Ukryty nagłówek h1 dla wyszukiwarek (SEO) */}
        <h1 className="sr-only">Miody Staropolskie</h1>

        <h2 className="mb-9 max-w-xl text-stone-100 text-2xl md:text-3xl leading-snug font-light drop-shadow font-playfair">

          Poznaj smak prawdziwego miodu — ekologiczny, naturalnie bezglutenowy.
        </h2>

        <a
          href="#miody"
          className="group relative inline-flex items-center gap-1.5 rounded-full bg-amber-500/90 px-5 py-2 text-xs font-medium tracking-wide text-stone-950 shadow-md shadow-amber-950/20 transition-all duration-300 hover:bg-amber-400 hover:shadow-lg hover:shadow-amber-500/20"
        >
          Sprawdź
          <svg
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
      </div>
    </section>
  );
}