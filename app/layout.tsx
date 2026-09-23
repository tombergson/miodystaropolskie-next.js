import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InitialLoader from "@/components/InitialLoader";
import CookieBanner from "@/components/CookieBanner"; // <-- import banera cookies
import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://miodystaropolskie.pl"),
  title: {
    default: "Miody Staropolskie | Pasieka pod lasem – Dęblin",
    template: "%s | Miody Staropolskie",
  },
  description:
    "Naturalne miody z pasieki w Dęblinie. Wielokwiatowy, lipowy, akacjowy, spadziowy, nawłociowy. Ekologiczny, naturalnie bezglutenowy.",
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: {
      url: "/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png",
    },
    other: [
      {
        rel: "icon",
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
      },
      {
        rel: "icon",
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
      },
    ],
  },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: "https://miodystaropolskie.pl",
    siteName: "Miody Staropolskie",
    title: "Miody Staropolskie | Pasieka pod lasem – Dęblin",
    description:
      "Naturalne miody z pasieki w Dęblinie. Ekologiczny, naturalnie bezglutenowy.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl" className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-cream text-ink`}
      >
        <InitialLoader />
        <Header />
        {children}
        <Footer />
        <CookieBanner /> {/* <-- baner cookies dodany na samym końcu */}
      </body>
    </html>
  );
}