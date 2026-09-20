"use client";

import Link from "next/link";
import { useState } from "react";

const nav = [
  { href: "/#miody", label: "Miody" },
  { href: "/#o-nas", label: "O nas" },
  { href: "/wydarzenia", label: "Wydarzenia" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200/80 bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" className="text-lg font-bold tracking-tight text-ink">
          Miody <span className="text-honey-dark">Staropolskie</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Główne">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-neutral-600 transition hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/kontakt"
            className="rounded-md bg-honey px-4 py-2 text-sm font-semibold text-white transition hover:bg-honey-dark"
          >
            Zamów
          </Link>
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
        className={`border-t border-neutral-200 bg-cream md:hidden ${
          open ? "block" : "hidden"
        }`}
      >
        <nav className="flex flex-col gap-1 px-4 py-3" aria-label="Mobilne">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/kontakt"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-md bg-honey px-3 py-2 text-center text-sm font-semibold text-white"
          >
            Zamów
          </Link>
        </nav>
      </div>
    </header>
  );
}