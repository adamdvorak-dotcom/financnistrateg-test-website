import type { Metadata } from "next";
import { Kontakt } from "./Kontakt";

export const metadata: Metadata = {
  // Příponu „| Adam Dvořák, EFA" doplní šablona titulku v layoutu
  title: "Kontakt",
  description:
    "Napište nebo zavolejte: Adam Dvořák, EFA, finanční stratég pro majitele firem a jejich rodiny. " +
    "Kancelář v Praze 1, telefon, e-mail a formulář pro zprávu.",
  alternates: { canonical: "https://www.financnistrateg.com/kontakt" },
  openGraph: {
    title: "Kontakt | Adam Dvořák, EFA",
    description: "Kancelář v Praze 1, telefon, e-mail a formulář pro zprávu.",
    url: "https://www.financnistrateg.com/kontakt",
    siteName: "Finanční Stratég",
    locale: "cs_CZ",
    type: "website",
  },
};

export default function KontaktPage() {
  return <Kontakt />;
}
