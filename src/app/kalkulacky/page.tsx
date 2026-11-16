import type { Metadata } from "next";
import { Kalkulacky } from "./Kalkulacky";

export const metadata: Metadata = {
  // Příponu „| Adam Dvořák, EFA" doplní šablona titulku v layoutu
  title: "Kalkulačky",
  description:
    "Čtyři kalkulačky pohromadě: investice, důchod, na jak dlouho vystačí majetek a hypotéka. " +
    "Počítá se jen ve vašem prohlížeči, nic se nikam neodesílá.",
  alternates: { canonical: "https://www.financnistrateg.com/kalkulacky" },
  openGraph: {
    title: "Kalkulačky | Adam Dvořák, EFA",
    description: "Investice, důchod, na jak dlouho vystačí majetek a hypotéka. Čtyři kalkulačky pohromadě.",
    url: "https://www.financnistrateg.com/kalkulacky",
    siteName: "Finanční Stratég",
    locale: "cs_CZ",
    type: "website",
  },
};

export default function KalkulackyPage() {
  return <Kalkulacky />;
}
