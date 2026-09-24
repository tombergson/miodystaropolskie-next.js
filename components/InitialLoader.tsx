"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const STORAGE_KEY = "hasLoaded";
const VISIBLE_MS = 900;
const FADE_MS = 600;

export default function InitialLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    let hasLoaded = false;
    try {
      hasLoaded = sessionStorage.getItem(STORAGE_KEY) === "true";
    } catch {
      // storage niedostępny, pokazujemy loader normalnie
    }

    if (hasLoaded) {
      setIsLoading(false);
      return;
    }

    const fadeTimer = setTimeout(() => setIsFading(true), VISIBLE_MS);
    const removeTimer = setTimeout(() => {
      setIsLoading(false);
      try {
        sessionStorage.setItem(STORAGE_KEY, "true");
      } catch {
        // ignorujemy
      }
    }, VISIBLE_MS + FADE_MS);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div
      role="status"
      aria-label="Ładowanie strony"
      className={`fixed inset-0 z-50 flex items-center justify-center bg-cream transition-opacity duration-[600ms] ${
        isFading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-20 w-20 animate-pulse motion-reduce:animate-none">
          <Image
            src="/android-chrome-192x192.png"
            alt="Miody Staropolskie"
            width={80}
            height={80}
            className="h-full w-full object-contain drop-shadow-sm"
            priority
          />
        </div>
        <span className="text-sm font-medium tracking-wider text-stone-600">
          Miody Staropolskie
        </span>
      </div>
    </div>
  );
}