import type { ArticleCategory } from "./articles";

export type CategoryInfo = {
  id: ArticleCategory;
  /** Krátký název na štítku a v nadpisu stránky */
  label: string;
  /** Titulek pro vyhledávače, šablona k němu přidá „| Adam Dvořák, EFA" */
  seoTitle: string;
  /** Popisek pro vyhledávače a úvodní věta na stránce kategorie */
  desc: string;
};

export const categories: CategoryInfo[] = [
  {
    id: "rodinny-majetek",
    label: "Rodinný majetek",
    seoTitle: "Rodinný majetek, dědictví a svěřenský fond",
    desc: "Co se stane s majetkem a firmou, když se něco stane vám. Závěť, svěřenský fond, holding a oddělení osobního majetku od firmy.",
  },
  {
    id: "investice",
    label: "Investice",
    seoTitle: "Investice a ETF pro české investory",
    desc: "Jak začít s ETF, podle čeho vybrat fond, jak funguje DIP a co dělat, když trhy padají.",
  },
  {
    id: "strategie",
    label: "Strategie",
    seoTitle: "Finanční strategie pro majitele firem",
    desc: "Kolik si vyplácet ze s.r.o., jak legálně platit méně na daních, co s penězi po prodeji firmy a kde začít s finančním plánem.",
  },
  {
    id: "financovani",
    label: "Hypotéky",
    seoTitle: "Hypotéky, fixace a investiční byt",
    desc: "Jak vybrat fixaci, kdy se vyplatí mimořádná splátka a jak si spočítat investiční byt na hypotéku.",
  },
  {
    id: "duchod",
    label: "Důchod",
    seoTitle: "Důchod, penzijní spoření a renta",
    desc: "Jak se počítá státní důchod, co k němu přidá penzijní spoření a proč jsou na tom OSVČ hůř, než si myslí.",
  },
];

export function getCategory(id: string): CategoryInfo | undefined {
  return categories.find((c) => c.id === id);
}
