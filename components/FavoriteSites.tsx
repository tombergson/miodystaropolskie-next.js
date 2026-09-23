"use client";

import Image from "next/image";

const sites = [
  {
    name: "Polski Związek Pszczelarski",
    href: "https://pzp.biz.pl/",
    icon: "/images/pzp.png",
  },
  {
    name: "Wojewódzki Związek Pszczelarzy w Lublinie",
    href: "http://www.wzplublin.pl/index.html",
    icon: "/images/wzp.png",
  },
  {
    name: "TomBergson.eu",
    href: "https://tombergson.eu",
    icon: "/images/tb-grey-2.png",
  },
];

export default function FavoriteSites() {
  return (
    <section className="py-4 bg-white/25 border-y border-stone-200/40 overflow-hidden">
      <div className="max-w-xl mx-auto px-6 flex items-center justify-center gap-10 md:gap-14">
        {sites.map((site) => (
          <a
            key={site.href}
            href={site.href}
            target="_blank"
            rel="noopener noreferrer"
            title={site.name}
            className="group relative flex items-center justify-center p-2 transition-transform duration-300 hover:scale-110 animate-drop-custom opacity-0"
          >
            {/* Używamy kontenera z określoną wysokością, a obrazek dopasowuje się automatycznie */}
            <div className="relative h-10 w-24 flex items-center justify-center">
              <Image
                src={site.icon}
                alt={site.name}
                fill
                sizes="100px"
                className="object-contain filter grayscale opacity-70 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
              />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}