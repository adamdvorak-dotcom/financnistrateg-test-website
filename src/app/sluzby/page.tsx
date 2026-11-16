import type { Metadata } from "next";
import { Sluzby } from "./Sluzby";

export const metadata: Metadata = {
  // Příponu „| Adam Dvořák, EFA" doplní šablona titulku v layoutu
  title: "Služby",
  description:
    "S čím pomáhám majitelům firem a jejich rodinám: rodinný majetek a jeho předání, investice, finanční strategie a důchod. " +
    "Co dostanete do ruky, jak máte rozložený majetek a kdo dědí, když chybí závěť.",
  alternates: { canonical: "https://www.financnistrateg.com/sluzby" },
  openGraph: {
    title: "Služby | Adam Dvořák, EFA",
    description: "Od cashflow po den, kdy se nevrátíte domů. Jeden člověk, který drží celý obraz.",
    url: "https://www.financnistrateg.com/sluzby",
    siteName: "Finanční Stratég",
    locale: "cs_CZ",
    type: "website",
  },
};

export default function SluzbyPage() {
  return <Sluzby />;
}
