import Link from "next/link";

export default function Socials() {
  return (
    <section className="py-4 px-6 w-full bg-cream-dark border-y border-honey/20 shadow-sm text-center">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-xl font-playfair font-bold text-ink mb-6">
          Obserwuj nas na:
        </h3>
        <div className="flex justify-center items-center">
          <Link
            href="https://www.facebook.com/miodystaropolskie"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center cursor-pointer transition-transform duration-300 transform hover:-translate-y-1"
          >
            {/* Minimalistyczna ikona Facebooka bez tła i ramek */}
            <div className="text-honey mb-2 group-hover:text-honey-dark transition-colors duration-300">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </div>
            <span className="text-stone-700 text-sm font-medium group-hover:text-honey-dark transition-colors">
              Facebook
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}