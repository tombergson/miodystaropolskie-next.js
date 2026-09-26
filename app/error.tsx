'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Tutaj możesz logować błędy, np. do konsoli
    console.error('Wystąpił błąd aplikacji:', error);
  }, [error]);

  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="space-y-6 max-w-md">
        <span className="text-6xl">⚠️</span>
        <h1 className="text-3xl font-bold tracking-tight text-amber-900">
          Coś poszło nie tak w pasiece!
        </h1>
        <p className="text-stone-600">
          Wystąpił niespodziewany błąd techniczny. Przepraszamy za utrudnienia.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="bg-amber-600 hover:bg-amber-700 text-white font-medium px-5 py-3 rounded-xl transition-colors shadow-sm cursor-pointer"
          >
            Spróbuj ponownie 🔄
          </button>
          <Link
            href="/"
            className="bg-stone-200 hover:bg-stone-300 text-stone-800 font-medium px-5 py-3 rounded-xl transition-colors"
          >
            Strona główna 🏠
          </Link>
        </div>
      </div>
    </main>
  );
}