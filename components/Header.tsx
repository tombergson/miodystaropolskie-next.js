"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const SCROLL_THRESHOLD = 150;

export default function Header() {
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  // Sprawdzamy, czy jesteśmy na podstronie, na której header ma być zawsze widoczny
  const isAlwaysVisiblePage = 
    pathname?.startsWith("/polityka-prywatnosci") || 
    pathname?.startsWith("/miody") ||
    pathname?.startsWith("/kontakt") ||
    pathname?.startsWith("/produkt");

  useEffect(() => {
    if (isAlwaysVisiblePage) {
      setIsVisible(true);
      return;
    }

    const handleScroll = () => {
      const show = window.scrollY > SCROLL_THRESHOLD;
      setIsVisible(show);
      if (!show) setOpen(false);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isAlwaysVisiblePage]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 border-b border-neutral-200/85 bg-cream/95 backdrop-blur transition-all duration-500 ease-in-out ${
        isVisible
          ? "translate-y-0 opacity-100 shadow-md"
          : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" className="text-lg font-bold tracking-tight text-ink">
          Miody <span className="text-honey-dark">Staropolskie</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Główne">
          <Link href="/" className="text-sm font-medium text-neutral-600 transition hover:text-ink">Home</Link>
          <Link href="/#miody" className="text-sm font-medium text-neutral-600 transition hover:text-ink">Nasze miody</Link>
          <Link href="/polityka-prywatnosci" className="text-sm font-medium text-neutral-600 transition hover:text-ink">Polityka prywatności</Link>
          <Link href="/kontakt" className="text-sm font-medium text-neutral-600 transition hover:text-ink">Kontakt</Link>
        </nav>

        <button
          type="button"
          className="rounded-md p-2 text-ink md:hidden focus-visible:outline focus-visible:ring-2 focus-visible:ring-honey"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          {open ? "✕" : "☰"}
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`border-t border-neutral-200 bg-cream md:hidden ${open ? "block" : "hidden"}`}
      >
        <nav className="flex flex-col gap-1 px-4 py-3" aria-label="Mobilne">
          <Link href="/" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100">Home</Link>
          <Link href="/#miody" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100">Nasze miody</Link>
          <Link href="/polityka-prywatnosci" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100">Polityka prywatności</Link>
          <Link href="/kontakt" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100">Kontakt</Link>
        </nav>
      </div>
    </header>
  );
}