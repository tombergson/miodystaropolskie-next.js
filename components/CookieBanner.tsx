"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      // Opóźnienie pojawienia się banera (np. 1.5 sekundy)
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "true");
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <aside 
      aria-label="Informacja o plikach cookies" 
      className="fixed bottom-6 right-6 z-50 max-w-sm p-6 bg-cream text-ink rounded-2xl shadow-xl border border-honey/30 backdrop-blur-md transition-all duration-300 animate-fade-in"
    >
      <div className="flex items-start gap-3 mb-3">
        <span className="text-2xl" role="img" aria-label="Ciasteczko">🍯</span>
        <div>
          <h3 className="font-playfair font-semibold text-base text-ink">
            Słodkie ciasteczka
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed mt-1">
            Używamy plików cookies, aby strona działała bez zarzutu i w celach statystycznych. Szczegóły znajdziesz w naszej{" "}
            <Link 
              href="/polityka-prywatnosci" 
              className="text-honey-dark font-medium underline hover:text-ink transition-colors"
            >
              Polityce prywatności
            </Link>.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 mt-4">
        <button
          onClick={handleAccept}
          className="w-full rounded-full bg-honey px-4 py-2 text-xs font-semibold text-ink transition-all hover:bg-honey-dark hover:shadow-md hover:shadow-honey/20"
        >
          Akceptuję i wchodzę
        </button>
      </div>
    </aside>
  );
}