import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="space-y-6 max-w-md">
        <span className="text-6xl animate-bounce">🍯</span>
        <h1 className="text-4xl font-bold tracking-tight text-amber-900">
          404 - Nie znaleziono strony
        </h1>
        <p className="text-stone-600">
          Wygląda na to, że ten plaster miodu gdzieś się zawieruszył lub wpisany adres jest niepoprawny.
        </p>
        <div>
          <Link
            href="/"
            className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-medium px-6 py-3 rounded-xl transition-colors shadow-sm"
          >
            Wróć na stronę główną 🏠
          </Link>
        </div>
      </div>
    </main>
  );
}