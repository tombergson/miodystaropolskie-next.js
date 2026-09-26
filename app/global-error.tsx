'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="pl">
      <body>
        <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-amber-50/30">
          <div className="space-y-6 max-w-md p-8 bg-white rounded-2xl shadow-xl border border-amber-100">
            <span className="text-6xl">🚨</span>
            <h1 className="text-2xl font-bold tracking-tight text-amber-900">
              Krytyczny błąd systemu
            </h1>
            <p className="text-stone-600 text-sm">
              Wystąpił poważny problem z załadowaniem strony. Pracujemy nad tym!
            </p>
            <button
              onClick={() => reset()}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium px-5 py-3 rounded-xl transition-colors shadow-sm cursor-pointer"
            >
              Odśwież stronę
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}