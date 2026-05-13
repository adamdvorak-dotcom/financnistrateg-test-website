export type Article = {
  slug: string;
  tag: string;
  tagEn: string;
  title: string;
  titleEn: string;
  desc: string;
  descEn: string;
  date: string;
  dateEn: string;
  updated?: string;
  updatedEn?: string;
  author: string;
};

export const articles: Article[] = [
  {
    slug: "jak-efektivne-spravovat-sverenske-fondy",
    tag: "Správa majetku",
    tagEn: "Wealth Management",
    title: "Jak efektivně spravovat svěřenské fondy",
    titleEn: "How to effectively manage trust funds",
    desc: "Svěřenský fond je právní nástroj, který umožňuje převedení majetku do fondu a jeho oddělení od osobního majetku. Klíčem k úspěchu je pečlivé plánování a výběr kvalifikovaného správce.",
    descEn: "A trust fund is a legal instrument allowing assets to be transferred and separated from personal property. The key to success is careful planning and choosing a qualified trustee.",
    date: "31. března 2025",
    dateEn: "March 31, 2025",
    updated: "8. května 2025",
    updatedEn: "May 8, 2025",
    author: "Adam Dvořák, EFA",
  },
  {
    slug: "fixace-hypoteky-jak-se-rozhodnout",
    tag: "Hypotéky",
    tagEn: "Mortgages",
    title: "Fixace hypotéky: 3, 5 nebo 10 let? Jak se rozhodnout",
    titleEn: "Mortgage fix period: 3, 5 or 10 years? How to decide",
    desc: "Délka fixace ovlivňuje výši splátky i vaši flexibilitu. Rozebírám, co vzít v úvahu při výběru — od vývoje úrokových sazeb po vaše plány do budoucna.",
    descEn: "The fix period affects your monthly payment and flexibility. I break down what to consider — from interest rate trends to your future plans.",
    date: "2. března 2026",
    dateEn: "March 2, 2026",
    author: "Adam Dvořák, EFA",
  },
  {
    slug: "nejnovejsi-trendy-v-wealth-managementu-pro-podnikatele",
    tag: "Správa majetku",
    tagEn: "Wealth Management",
    title: "Nejnovější trendy v wealth managementu pro podnikatele",
    titleEn: "Latest wealth management trends for entrepreneurs",
    desc: "Moderní wealth management přináší inovativní strategie zaměřené na maximalizaci finančních výsledků. Co by měl každý podnikatel sledovat v oblasti správy svého bohatství?",
    descEn: "Modern wealth management brings innovative strategies focused on maximising financial outcomes. What should every entrepreneur watch in managing their wealth?",
    date: "31. března 2025",
    dateEn: "March 31, 2025",
    updated: "8. května 2025",
    updatedEn: "May 8, 2025",
    author: "Adam Dvořák, EFA",
  },
  {
    slug: "jak-se-pocita-duchod-v-cr",
    tag: "Důchod",
    tagEn: "Retirement",
    title: "Jak se počítá důchod v Česku — a jak ho legálně ovlivnit",
    titleEn: "How the Czech state pension is calculated — and how to legally influence it",
    desc: "Státní důchod není náhoda. Je to výpočet, do kterého vstupují vaše příjmy za celou kariéru, odpracovaná léta a několik čísel, která ČSSZ každý rok mění. Rozebírám, jak to funguje a co s tím jde dělat.",
    descEn: "Your state pension is not random — it is a formula driven by your lifetime earnings, years worked and a set of figures the ČSSZ updates each year. Here is how it works and what you can do about it.",
    date: "13. května 2026",
    dateEn: "May 13, 2026",
    author: "Adam Dvořák, EFA",
  },
  {
    slug: "penzijni-sporeni-vs-investice",
    tag: "Důchod",
    tagEn: "Retirement",
    title: "Penzijní spoření vs. investice: co se více vyplatí?",
    titleEn: "Pension savings vs. investments: which pays off more?",
    desc: "Státní příspěvky a daňové úlevy dělají z třetího pilíře atraktivní nástroj — ale má i svá omezení. Porovnávám ho s alternativou v podobě vlastního investičního portfolia.",
    descEn: "State contributions and tax relief make the third pillar attractive — but it has its limits. I compare it with building your own investment portfolio.",
    date: "18. února 2026",
    dateEn: "February 18, 2026",
    author: "Adam Dvořák, EFA",
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
