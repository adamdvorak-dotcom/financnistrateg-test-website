"use client";

import { useState, useEffect, useRef } from "react";
import Script from "next/script";
import { articles } from "./blog/articles";

/* ── Quote band aphorisms ── */
const APHORISMS: Record<string, string[]> = {
  cs: [
    "Nejdražší poradce je ten špatný.",
    "Milionář na papíře. Nebo milionář v kapse. To není totéž.",
    "Plán není luxus. Je to rozdíl mezi třemi zdroji příjmu a jedním.",
    "Stavět důchod na exitu je jak stavět golfovou sezonu na hole in one.",
  ],
  en: [
    "The most expensive advisor is the wrong one.",
    "A millionaire on paper. Or a millionaire in the pocket. That's not the same.",
    "A plan is not a luxury. It's the difference between three income streams and one.",
    "Building your retirement on an exit is like building a golf season on a hole in one.",
  ],
};

/* ── Translations ── */
const T = {
  cs: {
    navAbout: "O mně", navServices: "Služby", navCalc: "Kalkulačky", navBlog: "Blog", navContact: "Kontakt", navCta: "Chci být klientem",
    heroBadge: "Pro podnikatele a rodiny · Praha & online",
    heroSub: "Devět z deseti majitelů firem má osobní majetek jen v baráku. Pracuju s podnikateli a rodinami, co chtějí tohle změnit. Osmý rok v oboru, přes 165 milionů pod správou.",
    heroCta: "Zahájit rozhovor",
    servicesTitle: "Od cashflow po den, kdy se nevrátíte domů.",
    servicesSub: "Nepracuju jako specialista na jednu věc. Držím celý obraz: co vám zůstane z firmy, kam s přebytky a kdo bude vědět, kde co je.",
    s1Tag: "Rodinný majetek", s1Title: "Rodinný majetek a jeho předání", s1Desc: "Krizový plán, svěřenský fond, rodinná rada, prodej firmy. Věci, na které se nikdo neptá, dokud nepřijdou.",
    s1Items: ["Krizový a nástupnický plán", "Svěřenské fondy", "Rodinná rada", "Prodej firmy & exit", "Zahraniční struktury (Švýcarsko)", "Family office poradenství", "Daňová optimalizace majetku"],
    s2Tag: "Investice", s2Title: "Investice bez iluzí", s2Desc: "Portfolio, které dává smysl ke zbytku vašeho života, ne k tabulce historických výnosů. Většinu nabídek, co mi lidi posílají, končím větou: tohle ne.",
    s2Items: ["ETF & podílové fondy", "Dluhopisy & alternativní aktiva", "Private equity", "Zahraniční bankovní vztahy", "Rebalancing & reporting"],
    s3Tag: "Strategie", s3Title: "Finanční strategie", s3Desc: "Cashflow, rezervy, daně, ochrana a hypotéka jako součást celku. Jeden dokument, který se v rodině používá, ne tabulka v Excelu.",
    s3Items: ["Cashflow & rozpočet", "Pojistná ochrana", "Likvidní rezerva", "Daňová optimalizace", "Krizový scénář"],
    s4Tag: "Důchod", s4Title: "Důchod ze tří zdrojů", s4Desc: "V 65 mít tři příjmy místo jednoho a vědět, který kdy zapnout. Cihla vám rohlíky nezaplatí.",
    s4Items: ["Třetí pilíř", "Analýza let pojištění", "Výpočet státního důchodu", "Doplnění chybějících dob", "Investiční program"],
    s5Tag: "Důchod", s5Title: "Příprava na důchod", s5Desc: "Důchod není o třetím pilíři. Je o tom mít v 65 letech tři zdroje příjmu místo jednoho — a vědět, který z nich v který rok aktivovat.",
    s5Items: ["Třetí pilíř", "Analýza let pojištění", "Výpočet státního důchodu", "Doplnění chybějících dob", "Investiční program"],
    processEye: "Přístup", processTitle: "Jak spolupráce probíhá.",
    step1Num: "Krok 01", step1Title: "Úvodní konzultace", step1Desc: "Ukážu vám, jak pracuji a co od spolupráce čekám já. Ale hlavně, chci slyšet vás. Kde jste, co nefunguje, co chcete jinak. Primárně si musíme sednout.",
    step2Num: "Krok 02", step2Title: "Analýza & strategie", step2Desc: "Provedu hloubkovou analýzu příjmů, výdajů, majetku i závazků a na jejím základě navrhnu strategii přímo na míru.",
    step3Num: "Krok 03", step3Title: "Finanční plán", step3Desc: "Představím konkrétní finanční plán s doporučeními a prioritami. Společně provedeme audit stávající situace a nastavíme cíle.",
    step4Num: "Krok 04", step4Title: "Konzultace & dotazy", step4Desc: "Podrobně projdeme celý plán a zodpovím veškeré otázky. Strategii doladíme podle vašich připomínek a preferencí.",
    step5Num: "Krok 05", step5Title: "Realizace & servis", step5Desc: "Spustíme plán, nastavíme produkty, otevřeme účty. Domluvíme pravidelné servisní schůzky pro průběžný dohled a aktualizace.",
    calcTitle: "Jak vám pracují peníze.",
    tabInvest: "Investiční kalkulačka", tabMortgage: "Hypoteční kalkulačka",
    invMonthly: "Měsíční vklad", invRate: "Roční výnos", invYears: "Délka investice", invInit: "Jednorázový vklad",
    invResultLabel: "Celková hodnota portfolia", currency: "Kč", invDep: "Celkové vklady", invProfit: "Výnos", invMult: "Násobek vkladů",
    mtgAmt: "Výše hypotéky", mtgRate: "Úroková sazba", mtgTerm: "Délka splatnosti",
    mtgResultLabel: "Měsíční splátka", mtgTotal: "Celkem zaplatíte", mtgInt: "Úroky celkem", mtgPct: "Podíl úroků",
    tabRetirement: "Důchodová kalkulačka",
    retAgeLabel: "Váš věk", retMissingYrsLabel: "Chybějící roky pojištění", retCurrentSavLabel: "Současné úspory", retMonthlySavLabel: "Měsíční spoření", retDesiredLabel: "Požadovaná renta v důchodu",
    retStatePensionLabel: "Průměrný státní důchod", retMissingEffectLabel: "Vliv chybějících let", retYourPensionLabel: "Váš státní důchod",
    retPortfolioValLabel: "Hodnota portfolia při důchodu", retPortfolioIncLabel: "Příjem z portfolia / měs.",
    retTotalLabel: "Celkový příjem v důchodu", retGapLabel: "Rozdíl od požadované renty", retExtraLabel: "Doporučené extra spoření / měs.",
    retYrsToRet: "let do důchodu",
    retDisclaimer: "Pouze ilustrativní výpočet. Pracujeme s průměrným důchodem dle ČSSZ (21 840 Kč), průměrným zhodnocením 6 % p.a. a čerpáním portfolia po dobu 20 let.",
    aboutEye: "O mně",
    aboutP1: "Adam Dvořák, EFA. Osmým rokem v oboru, držitel evropské finanční kvalifikace European Financial Advisor. Pracuji s úzkým okruhem podnikatelů a rodin, typicky tam, kde už nejde o produkty, ale o architekturu.",
    aboutP2: "Většina finančního poradenství v Česku funguje jako prodej. Někdo zavolá, něco doporučí, vy něco podepíšete, on dostane provizi. Tak já nepracuji.",
    aboutP3: "Inspirací je mi švýcarské privátní bankovnictví. Jeden člověk, který drží celý obraz od cashflow přes investice až po krizovej plán. Žádné callcentrum, ale tým specialistů.",
    aboutP4: "Pro klienta to znamená pomalý začátek a dlouhý vztah. První schůzka není o produktech, je o tom, jestli si rozumíme. Pak přichází analýza, plán, realizace. A pak roky práce, kdy plán dotahujeme podle toho, jak se mění váš život a svět kolem.",
    aboutP5: "Pracuji s lidmi, ne s portfolii. Své klienty znám jménem, jejich děti taky, někdy i jejich účetní. Když mi v neděli večer někdo napíše, že prodává firmu nebo že lékař přinesl zprávu, kterou nečekal, ozvu se.",
    aboutP6: "To je celý rozdíl.",
    tag1: "Certifikovaný poradce", tag2: "ČNB registrace", tag4: "Investiční specialista", heroCtaProcess: "Finanční preventivka",
    refEye: "Reference", refTitle: "Co říkají klienti.",
    contactSub: "První konzultace je vždy zdarma a bez závazků. Napište mi nebo rovnou zavolejte.",
    ctLocation: "Lokace", ctLocationVal: "Praha & celá ČR (online)", ctOffice: "Kancelář", ctOfficeVal: "Salvátorská 931/8, 110 00 Praha 1-Staré Město",
    fName: "Jméno", fNamePh: "Jan Novák", fPhone: "Telefon", fTopic: "Téma", fTopicPh: "Firma, rodina, nebo obojí?", fMsg: "Zpráva", fMsgPh: "Klidně neformálně, kde jste teď a co byste chtěli jinak.", fSubmit: "Odeslat zprávu",
    footerTagline: "Finanční Stratég", footerReg: "Registrován u ČNB. IČO: 08406804.", footerPrivacy: "Ochrana osobních údajů", footerTerms: "Podmínky užití",
    formSending: "Odesílám…", formSent: "✓ Odesláno!",
    nlEye: "Newsletter", nlTitle: "Finanční tipy přímo do schránky.", nlSub: "Jednou měsíčně posílám krátký přehled — co se děje na trzích, jak chránit úspory a kde jsou aktuálně příležitosti. Bez spamu.", nlPh: "vas@email.cz", nlBtn: "Odebírat", nlNote: "Odhlášení jedním kliknutím kdykoliv. Žádný spam.", nlSending: "Přihlašuji…", nlDone: "✓ Přihlášeno!",
    blogEye: "Blog", blogTitle: "Finanční vzdělávání.", blogSub: "Píšu o tématech, která řeším se svými klienty — srozumitelně, bez zbytečného žargonu.",
    blogReadMore: "Číst dál",
  },
  en: {
    navAbout: "About", navServices: "Services", navCalc: "Calculators", navBlog: "Blog", navContact: "Contact", navCta: "Free Consultation",
    heroBadge: "For entrepreneurs & families · Prague & online",
    heroSub: "Nine out of ten business owners have their personal wealth locked in their home. I work with entrepreneurs and families who want to change that. Eight years in the field, over CZK 165 million under management.",
    heroCta: "Start a conversation",
    servicesTitle: "What I do for you",
    servicesSub: "I do not work as a specialist in one thing. I work as one person who holds the entire picture — from daily cashflow to what happens if you do not come home tomorrow.",
    s1Tag: "Family Wealth", s1Title: "Family Wealth Management & Transfer", s1Desc: "Structuring, protecting and transferring wealth across generations. I work with families and entrepreneurs where it is no longer about products but about how to keep wealth together across generations and life situations nobody asks about until they arrive. I work discreetly, always with the specific family context in mind, not from templates.",
    s1Items: ["Crisis & succession plan", "Trust funds", "Family council", "Business sale & exit", "Foreign structures (Switzerland)", "Family office advisory", "Wealth tax optimisation"],
    s2Tag: "Investments", s2Title: "Investments without illusions", s2Desc: "I build portfolios that make sense in relation to the rest of your life, not to a table of historical returns. No “investment opportunity of the year”, no products I cannot justify in five years. Diversification across asset classes, jurisdictions and currencies, with regular review.",
    s2Items: ["ETFs & mutual funds", "Bonds & alternative assets", "Private equity", "International banking relationships", "Rebalancing & reporting"],
    s3Tag: "Strategy", s3Title: "Comprehensive financial strategy", s3Desc: "Three layers in one plan: financial (cashflow, reserves, taxes), investment (where to put surpluses) and crisis (what if). It is not a spreadsheet, it is a document the family actually uses. We update it continuously, not once every five years.",
    s3Items: ["Cashflow & budgeting", "Insurance cover", "Liquid reserve", "Tax optimisation", "Crisis scenario"],
    s4Tag: "Financing", s4Title: "Mortgages & property financing", s4Desc: "A mortgage is not a commodity, it is a long-term contract that affects cashflow, taxes and what you can afford elsewhere in the next ten years. I help design the mortgage as part of the overall architecture, not as a separate item.",
    s4Items: ["Bank comparison", "Fix-rate strategy", "Refinancing", "Investment properties", "Optimisation in relation to the whole"],
    s5Tag: "Retirement", s5Title: "Retirement planning", s5Desc: "Retirement is not about the third pillar. It is about having three income sources at 65 instead of one — and knowing which one to activate in which year. Analysis of years worked, filling missing contribution periods, combining the state pension, investment programme and other sources.",
    s5Items: ["Third pillar", "Contribution period analysis", "State pension calculation", "Filling missing periods", "Investment programme"],
    processEye: "Process", processTitle: "How we work together.",
    step1Num: "Step 01", step1Title: "Intro consultation", step1Desc: "I'll show you how I work and what I expect from the collaboration. But mostly — I want to hear you. Where you are, what isn't working, what you want to change. First, we need to click.",
    step2Num: "Step 02", step2Title: "Analysis & Strategy", step2Desc: "An in-depth analysis of your income, expenses, assets and liabilities — from which I design a strategy tailored specifically to you.",
    step3Num: "Step 03", step3Title: "Financial Plan", step3Desc: "I present a concrete financial plan with recommendations and priorities. Together we audit your current situation and set clear goals.",
    step4Num: "Step 04", step4Title: "Consultation & Q&A", step4Desc: "We review the plan in detail and I answer all your questions. We refine the strategy based on your feedback and preferences.",
    step5Num: "Step 05", step5Title: "Implementation & Service", step5Desc: "We launch the plan — set up products, open accounts. We schedule regular service meetings for ongoing oversight and updates.",
    calcTitle: "Make your money work for you.",
    tabInvest: "Investment Calculator", tabMortgage: "Mortgage Calculator",
    invMonthly: "Monthly Deposit", invRate: "Annual Return", invYears: "Investment Period", invInit: "Lump-sum Deposit",
    invResultLabel: "Total Portfolio Value", currency: "CZK", invDep: "Total Deposits", invProfit: "Return", invMult: "Return Multiplier",
    mtgAmt: "Mortgage Amount", mtgRate: "Interest Rate", mtgTerm: "Loan Term",
    mtgResultLabel: "Monthly Payment", mtgTotal: "Total Payment", mtgInt: "Total Interest", mtgPct: "Interest Share",
    tabRetirement: "Retirement Calculator",
    retAgeLabel: "Your age", retMissingYrsLabel: "Missing insurance years", retCurrentSavLabel: "Current savings", retMonthlySavLabel: "Monthly savings", retDesiredLabel: "Desired monthly pension",
    retStatePensionLabel: "Average state pension", retMissingEffectLabel: "Effect of missing years", retYourPensionLabel: "Your state pension",
    retPortfolioValLabel: "Portfolio value at retirement", retPortfolioIncLabel: "Portfolio income / month",
    retTotalLabel: "Total retirement income", retGapLabel: "Difference from target", retExtraLabel: "Recommended extra savings / month",
    retYrsToRet: "years to retirement",
    retDisclaimer: "Illustrative calculation only. We use the average Czech state pension per ČSSZ (CZK 21,840), average 6% p.a. return and 20-year portfolio drawdown.",
    aboutEye: "About Me",
    aboutP1: "Adam Dvořák, EFA. Eight years in the field, holder of the European Financial Advisor qualification. I work with a select group of entrepreneurs and families — typically where it is no longer about products, but about architecture.",
    aboutP2: "Most financial advice in the Czech Republic works like sales. Someone calls, recommends something, you sign something, they get a commission. That is not how I work.",
    aboutP3: "My inspiration is Swiss private banking. One person who holds the entire picture from cashflow through investment strategy to the crisis plan. No call centre, but a team of specialists.",
    aboutP4: "For the client this means a slow start and a long relationship. The first meeting is not about products, it is about whether we understand each other. Then comes the analysis, the plan, the implementation. And then years of work, refining the plan as your life and the world around you change.",
    aboutP5: "I work with people, not portfolios. I know my clients by name, their children too, sometimes their accountant as well. When someone writes to me on a Sunday evening that they are selling their company or that a doctor has delivered news they did not expect, I respond.",
    aboutP6: "That is the whole difference.",
    tag1: "Certified Advisor", tag2: "CNB Registered", tag4: "Investment Specialist", heroCtaProcess: "Financial check-up",
    refEye: "Testimonials", refTitle: "What clients say.",
    contactSub: "The first consultation is always free and without obligation. Write to me or call directly.",
    ctLocation: "Location", ctLocationVal: "Prague & Czech Republic (online)", ctOffice: "Office", ctOfficeVal: "Salvátorská 931/8, 110 00 Prague 1 – Old Town",
    fName: "Name", fNamePh: "John Smith", fPhone: "Phone", fTopic: "Topic", fTopicPh: "Business, family, or both?", fMsg: "Message", fMsgPh: "Keep it informal — where are you now and what would you like to change.", fSubmit: "Send Message",
    footerTagline: "Financial Strategist", footerReg: "Registered with CNB. Company ID: 08406804.", footerPrivacy: "Privacy Policy", footerTerms: "Terms of Use",
    formSending: "Sending…", formSent: "✓ Sent!",
    nlEye: "Newsletter", nlTitle: "Financial insights straight to your inbox.", nlSub: "Once a month I send a short overview — what is happening in the markets, how to protect savings and where the current opportunities are. No spam.", nlPh: "your@email.com", nlBtn: "Subscribe", nlNote: "Unsubscribe with one click at any time. No spam.", nlSending: "Subscribing…", nlDone: "✓ Subscribed!",
    blogEye: "Blog", blogTitle: "Financial education.", blogSub: "I write about topics I tackle with my clients — clearly, without unnecessary jargon.",
    blogReadMore: "Read more",
  },
};

type Lang = "cs" | "en";

function fmt(n: number, lang: Lang) {
  return Math.round(n).toLocaleString(lang === "cs" ? "cs-CZ" : "en-US");
}

export default function Page() {
  const [lang, setLang] = useState<Lang>("cs");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [calcTab, setCalcTab] = useState<"invest" | "mortgage" | "retirement">("invest");

  /* Invest calc */
  const [invMonthly, setInvMonthly] = useState(5000);
  const [invRate, setInvRate] = useState(7);
  const [invYears, setInvYears] = useState(20);
  const [invInitPos, setInvInitPos] = useState(0);

  /* Mortgage calc */
  const [mtgAmt, setMtgAmt] = useState(4000000);
  const [mtgRate, setMtgRate] = useState(4.5);
  const [mtgYrs, setMtgYrs] = useState(30);

  /* Retirement calc */
  const [retAge, setRetAge] = useState(35);
  const [retMissingYears, setRetMissingYears] = useState(0);
  const [retCurrentSavings, setRetCurrentSavings] = useState(0);
  const [retMonthlySavings, setRetMonthlySavings] = useState(3000);
  const [retDesiredPension, setRetDesiredPension] = useState(40000);


  /* Service card expand */
  const [openCard, setOpenCard] = useState<number | null>(null);

  /* Form state */
  const [formState, setFormState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [nlState, setNlState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [nlEmail, setNlEmail] = useState("");

  /* Aphorism cycling */
  const [aphoIdx, setAphoIdx] = useState(0);
  const [aphoVis, setAphoVis] = useState(true);

  /* Hero heading scramble */
  const [h1Cs1, setH1Cs1] = useState("Jeden člověk.");
  const [h1Cs2, setH1Cs2] = useState("Celý váš obraz.");
  const [h1En1, setH1En1] = useState("One advisor.");
  const [h1En2, setH1En2] = useState("The complete picture.");

  const t = T[lang];

  /* Load saved lang from localStorage */
  useEffect(() => {
    const savedLang = (localStorage.getItem("lang") as Lang) || "cs";
    setLang(savedLang);
  }, []);

  /* Apply lang to html element */
  useEffect(() => {
    const html = document.documentElement;
    html.className = "light";
    html.lang = lang;
  }, [lang]);


  /* Scroll reveal */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("vis");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );
    document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-bold").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  /* Aphorism cycle */
  useEffect(() => {
    const timer = setInterval(() => {
      setAphoVis(false);
      setTimeout(() => {
        setAphoIdx((i) => (i + 1) % APHORISMS[lang].length);
        setAphoVis(true);
      }, 700);
    }, 5700);
    return () => clearInterval(timer);
  }, [lang]);

  /* Cursor glow — lerp follow */
  useEffect(() => {
    const el = document.getElementById("cursor-glow");
    if (!el) return;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let cx = tx;
    let cy = ty;
    let rafId: number;
    const onMove = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; };
    const loop = () => {
      cx += (tx - cx) * 0.07;
      cy += (ty - cy) * 0.07;
      el.style.transform = `translate(${cx - 350}px, ${cy - 350}px)`;
      rafId = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    rafId = requestAnimationFrame(loop);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(rafId); };
  }, []);

  /* Hero heading scramble — runs once on mount */
  useEffect(() => {
    const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const run = (
      target: string,
      setter: React.Dispatch<React.SetStateAction<string>>,
      startDelay: number
    ) => {
      let iid: ReturnType<typeof setInterval>;
      const tid = setTimeout(() => {
        let frame = 0;
        const FRAMES = 22;
        iid = setInterval(() => {
          frame++;
          if (frame >= FRAMES) { setter(target); clearInterval(iid); return; }
          const pct = frame / FRAMES;
          setter(
            Array.from(target).map((char, i) => {
              if (char.charCodeAt(0) > 127 || " .,!?".includes(char)) return char;
              if (i / target.length < pct) return char;
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            }).join("")
          );
        }, 42);
      }, startDelay);
      return () => { clearTimeout(tid); clearInterval(iid); };
    };
    const c1 = run("Jeden člověk.", setH1Cs1, 120);
    const c2 = run("Celý váš obraz.", setH1Cs2, 300);
    const e1 = run("One advisor.", setH1En1, 120);
    const e2 = run("The complete picture.", setH1En2, 300);
    return () => { c1(); c2(); e1(); e2(); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const heroRef = useRef<HTMLElement>(null);
  const heroInnerRef = useRef<HTMLDivElement>(null);

  /* Hero parallax — content drifts up and fades on scroll */
  useEffect(() => {
    const hero = heroRef.current;
    const inner = heroInnerRef.current;
    if (!hero || !inner) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.innerWidth < 768) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const heroH = hero.offsetHeight;
        const progress = scrollY / heroH;
        inner.style.transform = `translateY(${scrollY * 0.38}px)`;
        inner.style.opacity = String(Math.max(0, 1 - progress * 1.75));
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleLang = () => {
    const next: Lang = lang === "cs" ? "en" : "cs";
    setLang(next);
    localStorage.setItem("lang", next);
  };

  /* ── Invest calculator ── */
  const invInit = (() => {
    if (invInitPos === 0) return 0;
    const raw = 1000 * Math.pow(10, ((invInitPos - 1) / 99) * Math.log10(50000));
    const mag = Math.pow(10, Math.floor(Math.log10(raw)) - 1);
    return Math.round(raw / mag) * mag;
  })();
  const iR = invRate / 100 / 12;
  const iN = invYears * 12;
  const iFv =
    iR === 0
      ? invMonthly * iN + invInit
      : invMonthly * ((Math.pow(1 + iR, iN) - 1) / iR) * (1 + iR) + invInit * Math.pow(1 + iR, iN);
  const iDep = invMonthly * iN + invInit;
  const iProfit = Math.max(0, iFv - iDep);
  const iPct = iDep > 0 ? (iDep / iFv) * 100 : 50;

  /* ── Mortgage calculator ── */
  const mR = mtgRate / 100 / 12;
  const mN = mtgYrs * 12;
  const mMo = mR === 0 ? mtgAmt / mN : (mtgAmt * (mR * Math.pow(1 + mR, mN))) / (Math.pow(1 + mR, mN) - 1);
  const mTotal = mMo * mN;
  const mInt = Math.max(0, mTotal - mtgAmt);
  const mPct = mtgAmt > 0 ? (mInt / mTotal) * 100 : 50;
  const mBarColor = mPct > 55 ? "var(--red)" : mPct > 35 ? "#f97316" : "var(--green)";

  /* ── Retirement calculator ── */
  const retYears = Math.max(1, 65 - retAge);
  const retN = retYears * 12;
  const retR = 0.06 / 12;
  const retStatePension = Math.max(0, 21840 - retMissingYears * 480);
  const retPortfolioFV =
    retCurrentSavings * Math.pow(1 + retR, retN) +
    retMonthlySavings * ((Math.pow(1 + retR, retN) - 1) / retR) * (1 + retR);
  const retPortfolioMonthly = retPortfolioFV / 240;
  const retTotalMonthly = retStatePension + retPortfolioMonthly;
  const retGap = retTotalMonthly - retDesiredPension;
  const retDesiredFromPortfolio = Math.max(0, retDesiredPension - retStatePension);
  const retFVFromCurrent = retCurrentSavings * Math.pow(1 + retR, retN);
  const retAdditionalFV = Math.max(0, retDesiredFromPortfolio * 240 - retFVFromCurrent);
  const retExtraMonthly = Math.max(0,
    retAdditionalFV * retR / ((Math.pow(1 + retR, retN) - 1) * (1 + retR)) - retMonthlySavings
  );

  /* ── Form handlers ── */
  const handleFormSubmit = async (e: { preventDefault(): void; currentTarget: HTMLFormElement }) => {
    e.preventDefault();
    if (formState !== "idle") return;
    setFormState("sending");
    const form = e.currentTarget;
    const fd = new FormData(form);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          phone: fd.get("phone"),
          email: fd.get("email"),
          topic: fd.get("topic"),
          message: fd.get("message"),
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setFormState("sent");
        form.reset();
        setTimeout(() => setFormState("idle"), 4000);
      } else {
        console.error("Chyba formuláře:", data);
        setFormState("error");
        setTimeout(() => setFormState("idle"), 4000);
      }
    } catch (err) {
      console.error("Chyba sítě:", err);
      setFormState("error");
      setTimeout(() => setFormState("idle"), 4000);
    }
  };

  const handleNlSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    if (nlState !== "idle") return;
    setNlState("sending");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: nlEmail }),
      });
      const data = await res.json();
      if (res.ok) {
        setNlState("done");
        setNlEmail("");
        setTimeout(() => setNlState("idle"), 4000);
      } else {
        console.error("Chyba newsletteru:", data);
        setNlState("error");
        setTimeout(() => setNlState("idle"), 4000);
      }
    } catch (err) {
      console.error("Chyba sítě:", err);
      setNlState("error");
      setTimeout(() => setNlState("idle"), 4000);
    }
  };

  const formBtnText =
    formState === "sending" ? t.formSending :
    formState === "sent" ? t.formSent :
    formState === "error" ? (lang === "cs" ? "✕ Chyba — zkuste znovu" : "✕ Error — try again") :
    t.fSubmit;
  const nlBtnText =
    nlState === "sending" ? t.nlSending :
    nlState === "done" ? t.nlDone :
    nlState === "error" ? (lang === "cs" ? "✕ Chyba" : "✕ Error") :
    t.nlBtn;

  return (
    <>
      <div id="cursor-glow" aria-hidden="true" />
      {/* ── Mobile menu overlay ── */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 200,
            background: "var(--bg)", display: "flex",
            flexDirection: "column", alignItems: "center",
            justifyContent: "center", gap: 32,
          }}
        >
          <button
            onClick={() => setMobileOpen(false)}
            style={{ position: "absolute", top: 20, right: 24, background: "none", border: "none", fontSize: 28, color: "var(--text-2)", cursor: "pointer" }}
          >✕</button>
          <a href="#about" onClick={() => setMobileOpen(false)} style={{ fontSize: 24, fontWeight: 700, color: "var(--text-1)", textDecoration: "none", letterSpacing: "-0.03em" }}>{t.navAbout}</a>
          <a href="#services" onClick={() => setMobileOpen(false)} style={{ fontSize: 24, fontWeight: 700, color: "var(--text-1)", textDecoration: "none", letterSpacing: "-0.03em" }}>{t.navServices}</a>
          <a href="#calculators" onClick={() => setMobileOpen(false)} style={{ fontSize: 24, fontWeight: 700, color: "var(--text-1)", textDecoration: "none", letterSpacing: "-0.03em" }}>{t.navCalc}</a>
          <a href="#blog" onClick={() => setMobileOpen(false)} style={{ fontSize: 24, fontWeight: 700, color: "var(--text-1)", textDecoration: "none", letterSpacing: "-0.03em" }}>{t.navBlog}</a>
          <a href="#contact" onClick={() => setMobileOpen(false)} style={{ fontSize: 24, fontWeight: 700, color: "var(--text-1)", textDecoration: "none", letterSpacing: "-0.03em" }}>{t.navContact}</a>
        </div>
      )}

      {/* ── Navbar ── */}
      <nav>
        <div className="container nav-inner">
          <a href="#" className="nav-logo">
            <span className="nav-logo-name">Adam Dvořák</span><span className="nav-logo-efa">, EFA</span>
          </a>
          <ul className="nav-links">
            <li><a href="#about">{t.navAbout}</a></li>
            <li><a href="#services">{t.navServices}</a></li>
            <li><a href="#calculators">{t.navCalc}</a></li>
            <li><a href="/blog">{t.navBlog}</a></li>
            <li><a href="#contact">{t.navContact}</a></li>
          </ul>
          <div className="nav-right">
            <button className="theme-btn lang-btn" onClick={toggleLang} title="Switch language">
              {lang === "cs" ? "EN" : "CS"}
            </button>
            <a href="/konzultace" className="btn-nav">{t.navCta}</a>
            <div className="hamburger" onClick={() => setMobileOpen(true)}>
              <span /><span /><span />
            </div>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section id="hero" ref={heroRef}>
        <div className="hero-inner" ref={heroInnerRef}>
          <div className="hero-text">
            <h1 className="hero-title">
              {lang === "cs" ? (
                <>{h1Cs1}<br /><em>{h1Cs2}</em></>
              ) : (
                <>{h1En1}<br /><em>{h1En2}</em></>
              )}
            </h1>
            <p className="hero-sub">{t.heroSub}</p>
            <div className="hero-actions">
              <a href="/konzultace" className="btn-primary">
                <span>{t.heroCta}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <a href="/test" className="btn-ghost">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span>{t.heroCtaProcess}</span>
              </a>
            </div>
          </div>
          <div className="hero-photo-wrap">
            <div className="hero-photo-frame">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/adam-dvorak-hero.jpg" alt="Adam Dvořák — Finanční stratég" loading="eager" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Quote band ── */}
      <div className="quote-band" aria-live="polite">
        <div className="quote-band-inner">
          <p className={`quote-band-text${aphoVis ? " vis" : ""}`}>
            {APHORISMS[lang][aphoIdx]}
          </p>
        </div>
        <div className="quote-band-progress" aria-hidden="true">
          <div className="quote-band-fill" key={aphoIdx} />
        </div>
      </div>

      {/* ── Services card grid ── */}
      <section id="services">
        <div className="container">
          <div className="section-header reveal-bold">
            <div className="section-eyebrow">{t.navServices}</div>
            <h2 className="section-title-lg">{t.servicesTitle}</h2>
            <p className="section-sub">{t.servicesSub}</p>
          </div>
          <div className="svc-grid">
            {([
              {
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>,
                title: t.s1Title, desc: t.s1Desc, items: t.s1Items,
              },
              {
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>,
                title: t.s2Title, desc: t.s2Desc, items: t.s2Items,
              },
              {
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
                title: t.s3Title, desc: t.s3Desc, items: t.s3Items,
              },
              {
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
                title: t.s4Title, desc: t.s4Desc, items: t.s4Items,
              },
            ] as { icon: React.ReactNode; title: string; desc: string; items: string[] }[]).map((svc, i) => (
              <div key={i} className={`svc-card reveal${i > 0 ? ` delay-${i}` : ""}`}>
                <div className="svc-icon">{svc.icon}</div>
                <div className="svc-card-title">{svc.title}</div>
                <p className="svc-card-desc">{svc.desc}</p>
                <button
                  className="svc-card-toggle"
                  onClick={() => setOpenCard(openCard === i ? null : i)}
                  aria-expanded={openCard === i}
                >
                  {openCard === i ? (lang === "cs" ? "Méně ↑" : "Less ↑") : (lang === "cs" ? "Co zahrnuje ↓" : "What's included ↓")}
                </button>
                {openCard === i && (
                  <ul className="svc-card-items">
                    {svc.items.map((item, j) => <li key={j}>{item}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section id="process">
        <div className="container">
          <div className="section-header reveal-bold">
            <div className="section-eyebrow">{t.processEye}</div>
            <h2 className="section-title-lg">{t.processTitle}</h2>
          </div>
          <div className="process-grid">
            <div className="process-step process-step--featured reveal">
              <span className="step-featured-badge">{lang === "cs" ? "Zdarma" : "Free"}</span>
              <span className="step-num">{t.step1Num}</span>
              <div className="step-title">{t.step1Title}</div>
              <div className="step-desc">{t.step1Desc}</div>
              <a href="/konzultace" className="step-cta">
                {lang === "cs" ? "Sjednat termín →" : "Book a call →"}
              </a>
            </div>
            <div className="process-step reveal delay-1">
              <span className="step-num">{t.step2Num}</span>
              <div className="step-title">{t.step2Title}</div>
              <div className="step-desc">{t.step2Desc}</div>
            </div>
            <div className="process-step reveal delay-2">
              <span className="step-num">{t.step3Num}</span>
              <div className="step-title">{t.step3Title}</div>
              <div className="step-desc">{t.step3Desc}</div>
            </div>
            <div className="process-step reveal delay-3">
              <span className="step-num">{t.step4Num}</span>
              <div className="step-title">{t.step4Title}</div>
              <div className="step-desc">{t.step4Desc}</div>
            </div>
            <div className="process-step reveal delay-4">
              <span className="step-num">{t.step5Num}</span>
              <div className="step-title">{t.step5Title}</div>
              <div className="step-desc">{t.step5Desc}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Calculators ── */}
      <section id="calculators">
        <div className="container">
          <div className="section-header reveal-bold">
            <div className="section-eyebrow">{t.navCalc}</div>
            <h2 className="section-title-lg">{t.calcTitle}</h2>
          </div>
          <div className="calc-wrap reveal">
            <div className="calc-header">
              <div className="calc-tabs">
                <button className={`calc-tab${calcTab === "invest" ? " active" : ""}`} onClick={() => setCalcTab("invest")}>{t.tabInvest}</button>
                <button className={`calc-tab${calcTab === "mortgage" ? " active" : ""}`} onClick={() => setCalcTab("mortgage")}>{t.tabMortgage}</button>
                <button className={`calc-tab${calcTab === "retirement" ? " active" : ""}`} onClick={() => setCalcTab("retirement")}>{t.tabRetirement}</button>
              </div>
            </div>
            <div className="calc-body">
              {/* Invest panel */}
              <div className={`calc-panel${calcTab === "invest" ? " active" : ""}`}>
                <div className="calc-inputs">
                  <div>
                    <label className="field-label">{t.invMonthly}</label>
                    <div className="field-input-wrap">
                      <input type="text" inputMode="numeric" className="field-input" value={invMonthly.toLocaleString('cs-CZ')} onChange={(e) => setInvMonthly(parseInt(e.target.value.replace(/[^\d]/g, ''), 10) || 0)} />
                      <span className="field-unit">Kč</span>
                    </div>
                    <input type="range" min={500} max={200000} step={1} value={invMonthly} onChange={(e) => setInvMonthly(+e.target.value)} />
                    <div className="range-meta"><span>500 Kč</span><span>200 000 Kč</span></div>
                  </div>
                  <div>
                    <label className="field-label">{t.invRate}</label>
                    <div className="field-input-wrap">
                      <input type="number" className="field-input" value={invRate} min={0.1} max={30} step={0.1} onChange={(e) => setInvRate(+e.target.value || 0)} />
                      <span className="field-unit">% p.a.</span>
                    </div>
                    <input type="range" min={1} max={20} step={0.5} value={invRate} onChange={(e) => setInvRate(+e.target.value)} />
                    <div className="range-meta"><span>1 %</span><span>20 %</span></div>
                  </div>
                  <div>
                    <label className="field-label">{t.invYears}</label>
                    <div className="field-input-wrap">
                      <input type="number" className="field-input" value={invYears} min={1} max={50} onChange={(e) => setInvYears(+e.target.value || 0)} />
                      <span className="field-unit">let</span>
                    </div>
                    <input type="range" min={1} max={40} step={1} value={invYears} onChange={(e) => setInvYears(+e.target.value)} />
                    <div className="range-meta"><span>1 rok</span><span>40 let</span></div>
                  </div>
                  <div>
                    <label className="field-label">{t.invInit}</label>
                    <div className="field-input-wrap">
                      <input type="text" inputMode="numeric" className="field-input" value={invInit > 0 ? invInit.toLocaleString('cs-CZ') : ''} placeholder="0" onChange={(e) => {
                        const v = parseInt(e.target.value.replace(/[^\d]/g, ''), 10) || 0;
                        if (v <= 0) { setInvInitPos(0); return; }
                        const pos = Math.round(1 + (Math.log10(Math.max(1000, v) / 1000) / Math.log10(50000)) * 99);
                        setInvInitPos(Math.max(0, Math.min(100, pos)));
                      }} />
                      <span className="field-unit">Kč</span>
                    </div>
                    <input type="range" min={0} max={100} step={1} value={invInitPos} onChange={(e) => setInvInitPos(+e.target.value)} />
                    <div style={{ position: "relative", height: 18, marginTop: 2 }}>
                      {([
                        { pos: 0, label: "0" },
                        { pos: 22, label: "10 000" },
                        { pos: 43, label: "100 000" },
                        { pos: 64, label: "1 mil." },
                        { pos: 85, label: "10 mil." },
                        { pos: 100, label: "50 mil." },
                      ] as { pos: number; label: string }[]).map(({ pos, label }) => (
                        <span key={pos} style={{
                          position: "absolute",
                          left: `${pos}%`,
                          transform: pos === 100 ? "translateX(-100%)" : pos > 0 ? "translateX(-50%)" : "none",
                          fontSize: 10,
                          color: "var(--text-3)",
                          whiteSpace: "nowrap",
                        }}>{label}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="calc-result">
                  <div className="result-label">{t.invResultLabel}</div>
                  <div className="result-big"><span>{t.currency}</span> {fmt(iFv, lang)}</div>
                  <div className="result-divider" />
                  <div className="result-row"><span className="result-row-k">{t.invDep}</span><span className="result-row-v">{fmt(iDep, lang)} {t.currency}</span></div>
                  <div className="result-row"><span className="result-row-k">{t.invProfit}</span><span className="result-row-v pos">{fmt(iProfit, lang)} {t.currency}</span></div>
                  <div className="result-row"><span className="result-row-k">{t.invMult}</span><span className="result-row-v">{iDep > 0 ? (iFv / iDep).toFixed(2) + "×" : "—"}</span></div>
                  <div className="progress-track"><div className="progress-fill" style={{ width: Math.min(100, iPct) + "%", background: "var(--accent)" }} /></div>
                </div>
              </div>

              {/* Mortgage panel */}
              <div className={`calc-panel${calcTab === "mortgage" ? " active" : ""}`}>
                <div className="calc-inputs">
                  <div>
                    <label className="field-label">{t.mtgAmt}</label>
                    <div className="field-input-wrap">
                      <input type="number" className="field-input" value={mtgAmt} min={100000} step={50000} onChange={(e) => setMtgAmt(+e.target.value || 0)} />
                      <span className="field-unit">Kč</span>
                    </div>
                    <input type="range" min={500000} max={20000000} step={100000} value={mtgAmt} onChange={(e) => setMtgAmt(+e.target.value)} />
                    <div className="range-meta"><span>500 000</span><span>20 mil.</span></div>
                  </div>
                  <div>
                    <label className="field-label">{t.mtgRate}</label>
                    <div className="field-input-wrap">
                      <input type="number" className="field-input" value={mtgRate} min={0.1} max={20} step={0.1} onChange={(e) => setMtgRate(+e.target.value || 0)} />
                      <span className="field-unit">% p.a.</span>
                    </div>
                    <input type="range" min={1} max={15} step={0.1} value={mtgRate} onChange={(e) => setMtgRate(+e.target.value)} />
                    <div className="range-meta"><span>1 %</span><span>15 %</span></div>
                  </div>
                  <div>
                    <label className="field-label">{t.mtgTerm}</label>
                    <div className="field-input-wrap">
                      <input type="number" className="field-input" value={mtgYrs} min={1} max={40} onChange={(e) => setMtgYrs(+e.target.value || 0)} />
                      <span className="field-unit">let</span>
                    </div>
                    <input type="range" min={5} max={40} step={1} value={mtgYrs} onChange={(e) => setMtgYrs(+e.target.value)} />
                    <div className="range-meta"><span>5 let</span><span>40 let</span></div>
                  </div>
                </div>
                <div className="calc-result">
                  <div className="result-label">{t.mtgResultLabel}</div>
                  <div className="result-big"><span>{t.currency}</span> {fmt(mMo, lang)}</div>
                  <div className="result-divider" />
                  <div className="result-row"><span className="result-row-k">{t.mtgTotal}</span><span className="result-row-v">{fmt(mTotal, lang)} {t.currency}</span></div>
                  <div className="result-row"><span className="result-row-k">{t.mtgInt}</span><span className="result-row-v neg">{fmt(mInt, lang)} {t.currency}</span></div>
                  <div className="result-row"><span className="result-row-k">{t.mtgPct}</span><span className="result-row-v">{mtgAmt > 0 ? mPct.toFixed(1) + " %" : "0 %"}</span></div>
                  <div className="progress-track"><div className="progress-fill" style={{ width: Math.min(100, mPct) + "%", background: mBarColor }} /></div>
                </div>
              </div>
              {/* Retirement panel */}
              <div className={`calc-panel${calcTab === "retirement" ? " active" : ""}`}>
                <div className="calc-inputs">
                  <div>
                    <label className="field-label">{t.retAgeLabel}</label>
                    <div className="field-input-wrap">
                      <input type="number" className="field-input" value={retAge} min={20} max={64} onChange={(e) => setRetAge(Math.min(64, Math.max(20, +e.target.value || 35)))} />
                      <span className="field-unit">{lang === "cs" ? "let" : "yrs"}</span>
                    </div>
                    <input type="range" min={20} max={64} step={1} value={retAge} onChange={(e) => setRetAge(+e.target.value)} />
                    <div className="range-meta"><span>20</span><span>64 — {retYears} {t.retYrsToRet}</span></div>
                  </div>
                  <div>
                    <label className="field-label">{t.retMissingYrsLabel}</label>
                    <div className="field-input-wrap">
                      <input type="number" className="field-input" value={retMissingYears} min={0} max={15} onChange={(e) => setRetMissingYears(Math.min(15, Math.max(0, +e.target.value || 0)))} />
                      <span className="field-unit">{lang === "cs" ? "let" : "yrs"}</span>
                    </div>
                    <input type="range" min={0} max={15} step={1} value={retMissingYears} onChange={(e) => setRetMissingYears(+e.target.value)} />
                    <div className="range-meta"><span>0</span><span>15 let (−{fmt(15 * 480, lang)} Kč/měs.)</span></div>
                  </div>
                  <div>
                    <label className="field-label">{t.retCurrentSavLabel}</label>
                    <div className="field-input-wrap">
                      <input type="text" inputMode="numeric" className="field-input" value={retCurrentSavings > 0 ? retCurrentSavings.toLocaleString("cs-CZ") : ""} placeholder="0" onChange={(e) => setRetCurrentSavings(parseInt(e.target.value.replace(/[^\d]/g, ""), 10) || 0)} />
                      <span className="field-unit">Kč</span>
                    </div>
                    <input type="range" min={0} max={5000000} step={50000} value={retCurrentSavings} onChange={(e) => setRetCurrentSavings(+e.target.value)} />
                    <div className="range-meta"><span>0</span><span>5 mil.</span></div>
                  </div>
                  <div>
                    <label className="field-label">{t.retMonthlySavLabel}</label>
                    <div className="field-input-wrap">
                      <input type="text" inputMode="numeric" className="field-input" value={retMonthlySavings.toLocaleString("cs-CZ")} onChange={(e) => setRetMonthlySavings(parseInt(e.target.value.replace(/[^\d]/g, ""), 10) || 0)} />
                      <span className="field-unit">Kč</span>
                    </div>
                    <input type="range" min={0} max={50000} step={500} value={retMonthlySavings} onChange={(e) => setRetMonthlySavings(+e.target.value)} />
                    <div className="range-meta"><span>0</span><span>50 000 Kč</span></div>
                  </div>
                  <div>
                    <label className="field-label">{t.retDesiredLabel}</label>
                    <div className="field-input-wrap">
                      <input type="text" inputMode="numeric" className="field-input" value={retDesiredPension.toLocaleString("cs-CZ")} onChange={(e) => setRetDesiredPension(parseInt(e.target.value.replace(/[^\d]/g, ""), 10) || 0)} />
                      <span className="field-unit">Kč</span>
                    </div>
                    <input type="range" min={15000} max={150000} step={1000} value={retDesiredPension} onChange={(e) => setRetDesiredPension(+e.target.value)} />
                    <div className="range-meta"><span>15 000</span><span>150 000 Kč</span></div>
                  </div>
                </div>
                <div className="calc-result">
                  <div className="result-label">{t.retTotalLabel}</div>
                  <div className="result-big" style={retGap >= 0 ? { color: "var(--green)" } : { color: "var(--red)" }}>
                    <span>{t.currency}</span> {fmt(retTotalMonthly, lang)}
                  </div>
                  <div className="result-divider" />
                  <div className="result-row">
                    <span className="result-row-k">{t.retStatePensionLabel}</span>
                    <span className="result-row-v">{fmt(21840, lang)} {t.currency}</span>
                  </div>
                  {retMissingYears > 0 && (
                    <div className="result-row">
                      <span className="result-row-k">{t.retMissingEffectLabel} ({retMissingYears} {lang === "cs" ? "let" : "yrs"})</span>
                      <span className="result-row-v neg">−{fmt(retMissingYears * 480, lang)} {t.currency}</span>
                    </div>
                  )}
                  <div className="result-row">
                    <span className="result-row-k">{t.retYourPensionLabel}</span>
                    <span className="result-row-v">{fmt(retStatePension, lang)} {t.currency}</span>
                  </div>
                  <div className="result-divider" />
                  <div className="result-row">
                    <span className="result-row-k">{t.retPortfolioValLabel}</span>
                    <span className="result-row-v">{fmt(retPortfolioFV, lang)} {t.currency}</span>
                  </div>
                  <div className="result-row">
                    <span className="result-row-k">{t.retPortfolioIncLabel}</span>
                    <span className="result-row-v">{fmt(retPortfolioMonthly, lang)} {t.currency}</span>
                  </div>
                  <div className="result-divider" />
                  <div className="result-row">
                    <span className="result-row-k">{t.retGapLabel}</span>
                    <span className={`result-row-v ${retGap >= 0 ? "pos" : "neg"}`}>{retGap >= 0 ? "+" : "−"}{fmt(Math.abs(retGap), lang)} {t.currency}</span>
                  </div>
                  {retGap < 0 && retExtraMonthly > 0 && (
                    <div className="result-row">
                      <span className="result-row-k">{t.retExtraLabel}</span>
                      <span className="result-row-v neg">+{fmt(retExtraMonthly, lang)} {t.currency}</span>
                    </div>
                  )}
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: Math.min(100, (retTotalMonthly / Math.max(1, retDesiredPension)) * 100) + "%", background: retGap >= 0 ? "var(--green)" : "var(--red)" }} />
                  </div>
                  <p style={{ fontSize: 11, color: "var(--text-3)", marginTop: 16, lineHeight: 1.55 }}>{t.retDisclaimer}</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about">
        <div className="container">
          <div className="about-wrap">
            <div className="about-photo reveal-scale">
              <div className="about-photo-frame">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/adam-dvorak-about.jpg" alt="Adam Dvořák" />
              </div>
            </div>
            <div className="reveal-right">
              <div className="section-eyebrow">{t.aboutEye}</div>
              <h2 className="section-title-lg" style={{ marginBottom: 20 }}>
                {lang === "cs" ? (
                  <>Proč jsem nešel<br />do banky.</>
                ) : (
                  <>Why I chose<br />independence.</>
                )}
              </h2>
              <p className="about-text">{t.aboutP1}</p>
              <p className="about-text">{t.aboutP2}</p>
              <p className="about-text">{t.aboutP3}</p>
              <p className="about-text">{t.aboutP4}</p>
              <p className="about-text">{t.aboutP5}</p>
              <p className="about-text about-text-strong">{t.aboutP6}</p>
              <div className="about-tags">
                {[t.tag1, t.tag2, t.tag4].map((tag) => (
                  <span key={tag} className="about-tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── References ── */}
      <section id="reference">
        <div className="container">
          <div className="section-header reveal-bold">
            <div className="section-eyebrow">{t.refEye}</div>
            <h2 className="section-title-lg">{t.refTitle}</h2>
          </div>
          <div className="ref-editorial">
            <div className="ref-editorial-card reveal">
              <span className="ref-guillemet">«</span>
              <p className="ref-editorial-text">Naši dosavadní spolupráci hodnotíme velmi pozitivně. Oceňujeme vysokou profesionalitu, rychlost, flexibilitu a schopnost přizpůsobit řešení našim individuálním požadavkům. Přístup je precizní a zaměřený na detail.</p>
              <div className="ref-editorial-author">Denisa a Dalibor</div>
            </div>
            <div className="ref-editorial-card reveal delay-1">
              <span className="ref-guillemet">«</span>
              <p className="ref-editorial-text">Jsem rád za osobní přístup. Vím kam směřuji a není mi nic nucené ani prodávané.</p>
              <div className="ref-editorial-author">Radek</div>
            </div>
            <div className="ref-editorial-card reveal delay-2">
              <span className="ref-guillemet">«</span>
              <p className="ref-editorial-text">Už po první komunikaci s plánem do budoucna nám se ženou spadl kámen ze srdce, že se můžeme mít dobře. Začali jsme žít.</p>
              <div className="ref-editorial-author">Miroslav</div>
            </div>
            <div className="ref-editorial-card reveal delay-3">
              <span className="ref-guillemet">«</span>
              <p className="ref-editorial-text">Je to důvěra v mladého člověka, jehož služby budou moci v budoucnu využívat mí potomci. Investování vyžaduje hodně práce v získávání informací a rozvahu. A protože to momentálně není to, co mě naplňuje, rád tuto činnost přenechám odborníkům.</p>
              <div className="ref-editorial-author">Daneš a rodina</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Blog ── */}
      <section id="blog">
        <div className="container">
          <div className="section-header reveal-bold">
            <div className="section-eyebrow">{t.blogEye}</div>
            <h2 className="section-title-lg">{t.blogTitle}</h2>
            <p className="blog-sub">{t.blogSub}</p>
          </div>
          <div className="blog-grid">
            {articles.slice(-3).reverse().map((article, i) => (
              <article key={article.slug} className={`blog-card reveal${i > 0 ? ` delay-${i}` : ""}`}>
                <div className="blog-card-tag">{lang === "cs" ? article.tag : article.tagEn}</div>
                <h3 className="blog-card-title">{lang === "cs" ? article.title : article.titleEn}</h3>
                <p className="blog-card-desc">{lang === "cs" ? article.desc : article.descEn}</p>
                <div className="blog-card-footer">
                  <span className="blog-card-date">{lang === "cs" ? article.date : article.dateEn}</span>
                  <a href={`/blog/${article.slug}`} className="blog-card-link">{t.blogReadMore} →</a>
                </div>
              </article>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <a href="/blog" className="btn-ghost">
              <span>{lang === "cs" ? "Všechny články" : "All articles"}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact">
        <div className="container">
          <div className="contact-wrap reveal">
            <div className="contact-left">
              <div className="section-eyebrow" style={{ marginBottom: 16 }}>{t.navContact}</div>
              <h2 className="contact-heading">
                {lang === "cs" ? (
                  <>Nekoušu.<br /><em>Napište mi.</em></>
                ) : (
                  <>I don&apos;t bite.<br /><em>Write to me.</em></>
                )}
              </h2>
              <p className="contact-sub">{t.contactSub}</p>
              <div className="contact-items">
                <div className="contact-item">
                  <div className="contact-item-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  </div>
                  <div>
                    <div className="contact-item-meta">E-mail</div>
                    <div className="contact-item-text"><a href="mailto:adamdvorak@financnistrateg.com">adamdvorak@financnistrateg.com</a></div>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-item-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.48 2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-.84a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  </div>
                  <div>
                    <div className="contact-item-meta">Telefon</div>
                    <div className="contact-item-text"><a href="tel:+420731147911">+420 731 147 911</a></div>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-item-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <div>
                    <div className="contact-item-meta">{t.ctLocation}</div>
                    <div className="contact-item-text">{t.ctLocationVal}</div>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-item-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <div>
                    <div className="contact-item-meta">{t.ctOffice}</div>
                    <div className="contact-item-text">{t.ctOfficeVal}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form-wrap">
              <form onSubmit={handleFormSubmit}>
                <div className="form-grid">
                  <div className="form-field" style={{ marginBottom: 0 }}>
                    <label className="form-label">{t.fName}</label>
                    <input name="name" type="text" className="form-input" placeholder={t.fNamePh} required />
                  </div>
                  <div className="form-field" style={{ marginBottom: 0 }}>
                    <label className="form-label">{t.fPhone}</label>
                    <input name="phone" type="tel" className="form-input" placeholder="+420 000 000 000" />
                  </div>
                </div>
                <div style={{ height: 12 }} />
                <div className="form-field">
                  <label className="form-label">E-mail</label>
                  <input name="email" type="email" className="form-input" placeholder="vas@email.cz" required />
                </div>
                <div className="form-field">
                  <label className="form-label">{t.fTopic}</label>
                  <input name="topic" type="text" className="form-input" placeholder={t.fTopicPh} />
                </div>
                <div className="form-field">
                  <label className="form-label">{t.fMsg}</label>
                  <textarea name="message" className="form-textarea" placeholder={t.fMsgPh} />
                </div>
                <button
                  type="submit"
                  className="form-submit"
                  disabled={formState !== "idle"}
                  style={formState === "sent" ? { background: "#22c55e" } : formState === "error" ? { background: "var(--red)" } : undefined}
                >
                  <span>{formBtnText}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
                {formState === "sent" && (
                  <div style={{ marginTop: 12, padding: "14px 18px", background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.25)", borderRadius: "var(--r-sm)", color: "#22c55e", fontSize: 14, fontWeight: 500, lineHeight: 1.5 }}>
                    ✓ {lang === "cs"
                      ? "Děkuji! Zpráva dorazila v pořádku. Ozvu se vám co nejdříve — obvykle do 24 hodin."
                      : "Thank you! Your message arrived safely. I'll get back to you shortly — usually within 24 hours."}
                  </div>
                )}
                {formState === "error" && (
                  <div style={{ marginTop: 12, padding: "12px 16px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: "var(--r-sm)", color: "var(--red)", fontSize: 13, fontWeight: 500 }}>
                    {lang === "cs" ? "Odeslání se nezdařilo. Zkuste to prosím znovu nebo mi napište na email." : "Sending failed. Please try again or email me directly."}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── Booking ── */}
      <section id="booking">
        <div className="container">
          <div className="booking-split">
            <div className="booking-info reveal-bold">
              <div className="section-eyebrow">{lang === "cs" ? "Rezervace" : "Booking"}</div>
              <h2 className="section-title-lg">
                {lang === "cs" ? "Vyberte si termín." : "Pick your slot."}
              </h2>
            </div>
            <div className="booking-card reveal delay-1">
              <div className="bk-slot">
                <span className="bk-duration">30 min</span>
                <span className="bk-type">{lang === "cs" ? "Online / Praha" : "Online / Prague"}</span>
              </div>
              <div className="bk-heading">
                {lang === "cs" ? "Úvodní konzultace" : "Intro consultation"}
              </div>
              <p className="bk-desc">
                {lang === "cs"
                  ? "Ukážu vám, jak pracuji. Chci hlavně slyšet vás, co řešíte, co nefunguje. Primárně si musíme sednout."
                  : "I'll show you how I work. Mostly I want to hear you — what you're dealing with, what isn't working. We just need to click."}
              </p>
              <button
                className="btn-primary bk-btn"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (window as any).Calendly?.initPopupWidget({
                      url: "https://calendly.com/dvorak-beplan/30min?hide_gdpr_banner=1&primary_color=C9A260&text_color=1A1511&background_color=F0EBE0",
                    });
                  }
                }}
              >
                <span>{lang === "cs" ? "Vybrat termín" : "Pick a slot"}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        </div>
        <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="afterInteractive" />
      </section>

      {/* ── Footer ── */}
      <footer>
        <div className="container footer-inner">
          <div className="footer-logo">Adam <span>Dvořák</span> · <span>{t.footerTagline}</span></div>
          <div className="footer-copy">© 2026 Adam Dvořák, EFA. <span>{t.footerReg}</span></div>
          <div className="footer-links">
            <a href="/privacy">{t.footerPrivacy}</a>
            <a href="/terms">{t.footerTerms}</a>
            <a href="#contact">{t.navContact}</a>
          </div>
        </div>
      </footer>

    </>
  );
}
