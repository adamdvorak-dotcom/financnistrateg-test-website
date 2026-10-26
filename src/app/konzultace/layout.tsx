import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bezplatná konzultace — Finanční poradce Praha",
  description:
    "Domluvte první bezplatnou schůzku s nezávislým finančním poradcem v Praze. Řeším investice, ETF, DIP, penzijní spoření, ochranu majetku a finanční strategie pro podnikatele a jejich rodiny.",
  alternates: { canonical: "https://www.financnistrateg.com/konzultace" },
  openGraph: {
    title: "Bezplatná konzultace — Adam Dvořák, Finanční poradce Praha",
    description:
      "První schůzka zdarma, bez závazku. Investice, DIP, penzijní spoření, ochrana majetku. Praha a online.",
    url: "https://www.financnistrateg.com/konzultace",
    siteName: "Finanční Stratég",
    locale: "cs_CZ",
    type: "website",
  },
};

export default function KonzultaceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
