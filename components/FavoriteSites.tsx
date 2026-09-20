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
    <section className="py-10 bg-white/40 border-y border-stone-200/50">
      <div className="max-w-4xl mx-auto px-6 flex items-center justify-center gap-8 md:gap-12">
        {sites.map((site) => (
          <a
            key={site.href}
            href={site.href}
            target="_blank"
            rel="noopener noreferrer"
            title={site.name}
            className="group relative flex items-center justify-center p-3 rounded-2xl bg-white border border-stone-200/70 shadow-xs transition-all duration-300 hover:scale-105 hover:border-honey hover:shadow-md"
          >
            <div className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
              <Image
                src={site.icon}
                alt={site.name}
                width={40}
                height={40}
                className="object-contain transition-opacity duration-300 group-hover:opacity-100"
              />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}