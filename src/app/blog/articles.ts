export type ArticleCategory = "rodinny-majetek" | "investice" | "strategie" | "financovani" | "duchod";

export type Article = {
  slug: string;
  category: ArticleCategory;
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
    category: "rodinny-majetek",
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
    category: "financovani",
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
    category: "rodinny-majetek",
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
    category: "duchod",
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
    category: "duchod",
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
  {
    slug: "jak-investovat-do-etf",
    category: "investice",
    tag: "ETF",
    tagEn: "ETF",
    title: "Jak investovat do ETF: průvodce od nuly",
    titleEn: "How to invest in ETFs: a complete guide from scratch",
    desc: "Indexové ETF kopírují celý trh za zlomek nákladů aktivně spravovaných fondů. Vysvětluji, jak fungují, co znamená investiční horizont a proč je plán důležitější než načasování.",
    descEn: "Index ETFs mirror the entire market at a fraction of the cost of actively managed funds. I explain how they work, what investment horizon means and why having a plan matters more than timing.",
    date: "13. května 2026",
    dateEn: "May 13, 2026",
    author: "Adam Dvořák, EFA",
  },
  {
    slug: "dip-dlouhodoby-investicni-produkt",
    category: "investice",
    tag: "Daně",
    tagEn: "Tax",
    title: "DIP: jak z investic ušetřit 7 200 Kč na daních každý rok",
    titleEn: "DIP: how to save CZK 7,200 in taxes on investments every year",
    desc: "Od roku 2024 lze investovat do akcií a ETF s daňovým odpočtem až 48 000 Kč ročně. A zaměstnavatel může přispět dalších 50 000 Kč zcela bez odvodů. Jak DIP funguje a jestli se vám vyplatí.",
    descEn: "Since 2024 you can invest in stocks and ETFs with a tax deduction of up to CZK 48,000 per year — and your employer can add another CZK 50,000 free of levies. How DIP works and whether it makes sense for you.",
    date: "13. května 2026",
    dateEn: "May 13, 2026",
    author: "Adam Dvořák, EFA",
  },
  {
    slug: "financni-poduska-jak-ji-spravne-nastavit",
    category: "strategie",
    tag: "Plánování",
    tagEn: "Planning",
    title: "Finanční polštář: proč nestačí nechat peníze na účtu",
    titleEn: "Emergency fund: why leaving money in a bank account isn't enough",
    desc: "Tříměsíční rezerva na běžném účtu reálně ztrácí hodnotu. Popisuji třívrstvý systém, kde každá vrstva slouží jinému účelu — a jak rezervu nastavit tak, abyste kvůli ní nepřicházeli o zbytečné výnosy.",
    descEn: "A three-month reserve in a current account loses real value. I describe a three-layer system where each layer serves a different purpose — and how to size your reserve without sacrificing unnecessary returns.",
    date: "13. května 2026",
    dateEn: "May 13, 2026",
    author: "Adam Dvořák, EFA",
  },
  {
    slug: "danove-optimalizace-pro-osvc-a-jednatele",
    category: "strategie",
    tag: "Daně",
    tagEn: "Tax",
    title: "Jak legálně platit méně na daních — pro OSVČ i jednatele",
    titleEn: "How to legally pay less tax — for sole traders and company directors",
    desc: "Paušální daň, paušální výdaje, DIP, dividendy nebo plat — správnou kombinací lze legálně ušetřit desítky až stovky tisíc korun ročně. Konkrétní čísla a rozhodovací rámec pro OSVČ i jednatele s.r.o.",
    descEn: "Flat-rate tax, lump-sum expenses, DIP, dividends or salary — the right combination can legally save you tens to hundreds of thousands of CZK per year. Concrete numbers and a decision framework for sole traders and company directors.",
    date: "13. května 2026",
    dateEn: "May 13, 2026",
    author: "Adam Dvořák, EFA",
  },
  {
    slug: "mimoradna-splatka-hypoteky",
    category: "financovani",
    tag: "Hypotéky",
    tagEn: "Mortgages",
    title: "Mimořádná splátka hypotéky: kdy se vyplatí a kdy ne",
    titleEn: "Extra mortgage payment: when it makes sense and when it doesn't",
    desc: "Při sazbě 4,5 % je mimořádná splátka garantovaný výnos 4,5 %. Ale globální akcie historicky vynáší 7–10 %. Kdy splácet, kdy investovat — a jak splátky načasovat tak, abyste neplatili zbytečné sankce.",
    descEn: "At a 4.5% rate, an extra mortgage payment is a guaranteed 4.5% return. But global equities have historically returned 7–10%. When to repay, when to invest — and how to time payments to avoid unnecessary penalties.",
    date: "13. května 2026",
    dateEn: "May 13, 2026",
    author: "Adam Dvořák, EFA",
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
