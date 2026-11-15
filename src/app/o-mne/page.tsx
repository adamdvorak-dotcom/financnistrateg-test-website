import type { Metadata } from "next";
import { OMne } from "./OMne";

export const metadata: Metadata = {
  // Příponu „| Adam Dvořák, EFA" doplní šablona titulku v layoutu
  title: "O mně",
  description:
    "Adam Dvořák, EFA: finanční stratég pro majitele firem a jejich rodiny. Osmý rok v oboru, " +
    "registrace u ČNB, kancelář v Praze 1 a tým specialistů, které přivádím k vašemu stolu.",
  alternates: { canonical: "https://www.financnistrateg.com/o-mne" },
  openGraph: {
    title: "O mně | Adam Dvořák, EFA",
    description: "Finanční stratég pro majitele firem a jejich rodiny. Jeden člověk, za ním tým.",
    url: "https://www.financnistrateg.com/o-mne",
    siteName: "Finanční Stratég",
    locale: "cs_CZ",
    type: "profile",
  },
};

export default function OMnePage() {
  return <OMne />;
}
