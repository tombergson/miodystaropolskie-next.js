"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function InitialLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Sprawdzamy, czy użytkownik był już na stronie w tej sesji
    const hasLoaded = sessionStorage.getItem("hasLoaded");
    
    if (hasLoaded) {
      setIsLoading(false);
      return;
    }

    // Zapisujemy informację, że strona została załadowana
    sessionStorage.setItem("hasLoaded", "true");

    // Wydłużony czas widoczności loadera (np. 900ms)
    const timer = setTimeout(() => {
      setIsFading(true);
      const removeTimer = setTimeout(() => {
        setIsLoading(false);
      }, 600); // Czas płynnego zanikania (600ms)
      return () => clearTimeout(removeTimer);
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-stone-50 transition-opacity duration-600 ${
        isFading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-20 h-20 animate-pulse">
          <Image 
            src="/android-chrome-192x192.png" 
            alt="Miody Staropolskie" 
            fill 
            className="object-contain drop-shadow-sm"
            priority
          />
        </div>
        <span className="text-sm font-medium text-stone-600 tracking-wider">Miody Staropolskie</span>
      </div>
    </div>
  );
}