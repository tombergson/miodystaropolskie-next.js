import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InitialLoader from "@/components/InitialLoader";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
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
        className={`${inter.variable} font-sans antialiased bg-cream text-ink`}
      >
        <InitialLoader />
        {children}
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}