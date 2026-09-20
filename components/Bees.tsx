import Image from 'next/image';

export default function Bees() {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto bg-stone-50/50 rounded-3xl my-12">
      {/* Nagłówek sekcji z żółtą kreską */}
      <div className="text-center mb-16 flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-800 mb-4">
          Nasze pszczoły
        </h2>
        <div className="w-24 h-1 bg-amber-500 rounded-full mb-6"></div>
        <p className="text-stone-700 max-w-2xl mx-auto text-lg leading-relaxed">
          W naszej pasiece wykorzystujemy dwie linie pszczoły Kraińskiej: linię <strong className="text-amber-600 font-semibold">Kortówka</strong> oraz linię <strong className="text-amber-600 font-semibold">Sklenar</strong>.
        </p>
      </div>

      {/* Siatka z dwoma mniejszymi zdjęciami (zmniejszona szerokość i wysokość) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        {/* Karta 1: Kortówka - zmniejszona wysokość */}
        <div className="relative h-64 md:h-72 rounded-2xl overflow-hidden shadow-md group cursor-pointer bg-stone-100 border border-stone-200/80">
          <Image
            src="/images/uploads/2018/10/krainka.jpg"
            alt="Pszczoła Kraińska linia Kortówka"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Ciemny overlay z animacją pojawiania się */}
          <div className="absolute inset-0 bg-stone-900/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-6 text-white">
            <h3 className="text-lg md:text-xl font-serif font-semibold text-amber-400 mb-2">
              Apis mellifera carnica
            </h3>
            <p className="text-stone-200 text-sm">
              Kraińska linia Kortówka
            </p>
          </div>
        </div>

        {/* Karta 2: Sklenar - zmniejszona wysokość */}
        <div className="relative h-64 md:h-72 rounded-2xl overflow-hidden shadow-md group cursor-pointer bg-stone-100 border border-stone-200/80">
          <Image
            src="/images/uploads/2018/10/sklenar.jpg"
            alt="Pszczoła Kraińska linia Sklenar"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Ciemny overlay z animacją pojawiania się */}
          <div className="absolute inset-0 bg-stone-900/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-6 text-white">
            <h3 className="text-lg md:text-xl font-serif font-semibold text-amber-400 mb-2">
              Apis mellifera carnica
            </h3>
            <p className="text-stone-200 text-sm">
              Rasa Krainka linia Sklenar 47/H/47
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}