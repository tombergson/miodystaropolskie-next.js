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
    <section className="overflow-hidden border-y border-stone-200/40 bg-white/25 py-4">
      <div className="mx-auto grid max-w-xl grid-cols-3 items-center gap-2 px-4 sm:flex sm:justify-center sm:gap-10 sm:px-6 md:gap-14">
        {sites.map((site) => (
          <a
            key={site.href}
            href={site.href}
            target="_blank"
            rel="noopener noreferrer"
            title={site.name}
            className="group relative flex min-w-0 items-center justify-center p-1 opacity-0 animate-drop-custom transition-transform duration-300 hover:scale-105 motion-reduce:animate-none motion-reduce:opacity-100 sm:flex-none sm:p-2 sm:hover:scale-110"
          >
            {/* Mobile: logo wypełnia kolumnę (1/3), od sm: stałe 96px */}
            <div className="relative h-10 w-full sm:w-24">
              <Image
                src={site.icon}
                alt={site.name}
                fill
                sizes="(min-width: 640px) 96px, 33vw"
                className="object-contain grayscale opacity-70 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
              />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}