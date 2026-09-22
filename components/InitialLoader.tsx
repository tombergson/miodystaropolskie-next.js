"use client";

import { useState, useEffect } from "react";

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
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin"></div>
        <span className="text-sm font-light text-stone-600 tracking-wide">Miody Staropolskie...</span>
      </div>
    </div>
  );
}