"use client";

import { useState, useEffect, useRef } from "react";
import Script from "next/script";

/* ── Translations ── */
const T = {
  cs: {
    navAbout: "O mně", navServices: "Služby", navCalc: "Kalkulačky", navBlog: "Blog", navContact: "Kontakt", navCta: "Chci být klientem",
    heroBadge: "Pro podnikatele a rodiny · Praha & online",
    heroSub: "Systém, který chrání rodinu, drží majetek pohromadě a dává člověku svobodu rozhodovat. Pracuji s podnikateli a rodinami, pro které peníze už dávno neřeší jen výnos, ale to, co po nich zůstane.",
    heroCta: "Sjednat konzultaci",
    servicesTitle: "Pět oblastí. Jeden systém.",
    servicesSub: "Nepracuji jako specialista na jednu věc. Pracuji jako jeden člověk, který drží celý obraz — od denního cashflow po to, co se stane, když se zítra nevrátíte domů.",
    s1Tag: "Rodinný majetek", s1Title: "Správa a předání rodinného majetku", s1Desc: "Strukturování, ochrana a mezigenerační předání majetku. Pracuji s rodinami a podnikateli tam, kde už nejde o produkty, ale o architekturu — jak majetek držet pohromadě napříč generacemi, jurisdikcemi a životními situacemi, na které se nikdo neptá, dokud nepřijdou. Každý případ je jiný. Pracuji diskrétně a vždy s konkrétním rodinným kontextem — ne podle šablon.",
    s1Items: ["Krizový a nástupnický plán", "Svěřenské fondy", "Rodinná rada", "Prodej firmy & exit", "Zahraniční struktury (Švýcarsko)", "Family office poradenství", "Daňová optimalizace majetku"],
    s2Tag: "Investice", s2Title: "Investice bez iluzí", s2Desc: "Sestavuji portfolia, která dávají smysl ve vztahu k vašemu zbytku života — ne k tabulce s historickými výnosy. Žádná „investiční příležitost roku“, žádné produkty, které neumím obhájit za pět let. Diverzifikace přes třídy aktiv, jurisdikce a měny, s pravidelnou revizí.",
    s2Items: ["ETF & podílové fondy", "Dluhopisy & alternativní aktiva", "Private equity", "Zahraniční bankovní vztahy", "Rebalancing & reporting"],
    s3Tag: "Strategie", s3Title: "Komplexní finanční strategie", s3Desc: "Tři vrstvy v jednom plánu: finanční (cashflow, rezervy, daně), investiční (kam s přebytky) a krizová (co když). Není to tabulka v Excelu — je to dokument, který se v rodině používá. Aktualizujeme ho průběžně, ne jednou za pět let.",
    s3Items: ["Cashflow & rozpočet", "Pojistná ochrana", "Likvidní rezerva", "Daňová optimalizace", "Krizový scénář"],
    s4Tag: "Financování", s4Title: "Hypotéky & financování nemovitostí", s4Desc: "Hypotéka není komodita — je to dlouhodobý kontrakt, který ovlivňuje cashflow, daně i to, co si můžete v příštích deseti letech dovolit jinde. Pomáhám hypotéku navrhnout jako součást celkové architektury, ne jako oddělenou položku.",
    s4Items: ["Srovnání bank", "Strategie fixace", "Refinancování", "Investiční nemovitosti", "Optimalizace ve vztahu k celku"],
    s5Tag: "Důchod", s5Title: "Příprava na důchod", s5Desc: "Důchod není o třetím pilíři. Je o tom mít v 65 letech tři zdroje příjmu místo jednoho — a vědět, který z nich v který rok aktivovat. Analýza odpracovaných let, doplnění chybějících dob, kombinace státního důchodu, investičního programu a dalších zdrojů.",
    s5Items: ["Třetí pilíř", "Analýza let pojištění", "Výpočet státního důchodu", "Doplnění chybějících dob", "Investiční program"],
    processEye: "Přístup", processTitle: "Jak spolupráce probíhá.",
    step1Num: "Krok 01", step1Title: "Bezplatná konzultace", step1Desc: "Setkáme se osobně nebo online. Představím se, zjistím vaše životní cíle a očekávání. Bez závazků, bez prodeje.",
    step2Num: "Krok 02", step2Title: "Analýza & strategie", step2Desc: "Provedu hloubkovou analýzu příjmů, výdajů, majetku i závazků a na jejím základě navrhnu strategii přímo na míru.",
    step3Num: "Krok 03", step3Title: "Finanční plán", step3Desc: "Představím konkrétní finanční plán s doporučeními a prioritami. Společně provedeme audit stávající situace a nastavíme cíle.",
    step4Num: "Krok 04", step4Title: "Konzultace & dotazy", step4Desc: "Podrobně projdeme celý plán a zodpovím veškeré otázky. Strategii doladíme podle vašich připomínek a preferencí.",
    step5Num: "Krok 05", step5Title: "Realizace & servis", step5Desc: "Spustíme plán — nastavíme produkty, otevřeme účty. Domluvíme pravidelné servisní schůzky pro průběžný dohled a aktualizace.",
    calcTitle: "Jak vám pracují peníze.",
    tabInvest: "Investiční kalkulačka", tabMortgage: "Hypoteční kalkulačka",
    invMonthly: "Měsíční vklad", invRate: "Roční výnos", invYears: "Délka investice", invInit: "Jednorázový vklad",
    invResultLabel: "Celková hodnota portfolia", currency: "Kč", invDep: "Celkové vklady", invProfit: "Výnos", invMult: "Násobek vkladů",
    mtgAmt: "Výše hypotéky", mtgRate: "Úroková sazba", mtgTerm: "Délka splatnosti",
    mtgResultLabel: "Měsíční splátka", mtgTotal: "Celkem zaplatíte", mtgInt: "Úroky celkem", mtgPct: "Podíl úroků",
    aboutEye: "O mně",
    aboutP1: "Adam Dvořák, EFA. Osmým rokem v oboru, držitel evropské finanční kvalifikace European Financial Advisor a člen Asociace finančních poradců ČR. Pracuji s úzkým okruhem podnikatelů a rodin — typicky tam, kde už nejde o produkty, ale o architekturu.",
    aboutP2: "Většina finančního poradenství v Česku funguje jako prodej. Někdo zavolá, něco doporučí, vy něco podepíšete, on dostane provizi. Tak já nepracuji.",
    aboutP3: "Inspirací je mi švýcarské privátní bankovnictví: diskrétnost, dlouhodobost, jeden člověk, který drží celý obraz — od denního cashflow přes investiční strategii až po to, co se stane, když se zítra nevrátíte domů. Žádné call centrum. Žádný „tým specialistů“. Jeden vztah, jeden plán, jeden telefon.",
    aboutP4: "Pro klienta to znamená pomalý začátek a dlouhý vztah. První schůzka není o produktech — je o tom, jestli si rozumíme. Pak přichází analýza, plán, realizace. A pak roky práce, kdy plán dotahujeme podle toho, jak se mění váš život a svět kolem.",
    aboutP5: "Pracuji s lidmi, ne s portfolii. Své klienty znám jménem, jejich děti taky, někdy i jejich účetní. Když mi v neděli večer někdo napíše, že prodává firmu nebo že lékař přinesl zprávu, kterou nečekal, ozvu se.",
    aboutP6: "To je celý rozdíl.",
    tag1: "Certifikovaný poradce", tag2: "ČNB registrace", tag3: "Nezávislý", tag4: "Investiční specialista", tag5: "Hypoteční expert",
    refEye: "Reference", refTitle: "Co říkají klienti.",
    contactSub: "První konzultace je vždy zdarma a bez závazků. Napište mi nebo rovnou zavolejte.",
    ctLocation: "Lokace", ctLocationVal: "Praha & celá ČR (online)", ctOffice: "Kancelář", ctOfficeVal: "Salvátorská 931/8, 110 00 Praha 1-Staré Město",
    fName: "Jméno", fNamePh: "Jan Novák", fPhone: "Telefon", fTopic: "Téma", fTopicPh: "Hypotéka, investice, důchod...", fMsg: "Zpráva", fMsgPh: "Popište svoji situaci...", fSubmit: "Odeslat zprávu",
    footerTagline: "Finanční Stratég", footerReg: "Registrován u ČNB.", footerPrivacy: "Ochrana osobních údajů", footerTerms: "Podmínky užití",
    formSending: "Odesílám…", formSent: "✓ Odesláno!",
    nlEye: "Newsletter", nlTitle: "Finanční tipy přímo do schránky.", nlSub: "Jednou měsíčně posílám krátký přehled — co se děje na trzích, jak chránit úspory a kde jsou aktuálně příležitosti. Bez spamu.", nlPh: "vas@email.cz", nlBtn: "Odebírat", nlNote: "Odhlášení jedním kliknutím kdykoliv. Žádný spam.", nlSending: "Přihlašuji…", nlDone: "✓ Přihlášeno!",
    blogEye: "Blog", blogTitle: "Finanční vzdělávání.", blogSub: "Píšu o tématech, která řeším se svými klienty — srozumitelně, bez zbytečného žargonu.",
    blogReadMore: "Číst dál",
  },
  en: {
    navAbout: "About", navServices: "Services", navCalc: "Calculators", navBlog: "Blog", navContact: "Contact", navCta: "Free Consultation",
    heroBadge: "For entrepreneurs & families · Prague & online",
    heroSub: "A system that protects the family, keeps wealth together and gives people the freedom to decide. I work with entrepreneurs and families for whom money is no longer just about returns, but about what remains.",
    heroCta: "Book a Consultation",
    servicesTitle: "Five areas. One system.",
    servicesSub: "I do not work as a specialist in one thing. I work as one person who holds the entire picture — from daily cashflow to what happens if you do not come home tomorrow.",
    s1Tag: "Family Wealth", s1Title: "Family Wealth Management & Transfer", s1Desc: "Structuring, protecting and transferring wealth across generations. I work with families and entrepreneurs where it is no longer about products but about architecture — how to keep wealth together across generations, jurisdictions and life situations nobody asks about until they arrive. Every case is different. I work discreetly and always with the specific family context in mind — not from templates.",
    s1Items: ["Crisis & succession plan", "Trust funds", "Family council", "Business sale & exit", "Foreign structures (Switzerland)", "Family office advisory", "Wealth tax optimisation"],
    s2Tag: "Investments", s2Title: "Investments without illusions", s2Desc: "I build portfolios that make sense in relation to the rest of your life — not to a table of historical returns. No “investment opportunity of the year”, no products I cannot justify in five years. Diversification across asset classes, jurisdictions and currencies, with regular review.",
    s2Items: ["ETFs & mutual funds", "Bonds & alternative assets", "Private equity", "International banking relationships", "Rebalancing & reporting"],
    s3Tag: "Strategy", s3Title: "Comprehensive financial strategy", s3Desc: "Three layers in one plan: financial (cashflow, reserves, taxes), investment (where to put surpluses) and crisis (what if). It is not a spreadsheet — it is a document the family actually uses. We update it continuously, not once every five years.",
    s3Items: ["Cashflow & budgeting", "Insurance cover", "Liquid reserve", "Tax optimisation", "Crisis scenario"],
    s4Tag: "Financing", s4Title: "Mortgages & property financing", s4Desc: "A mortgage is not a commodity — it is a long-term contract that affects cashflow, taxes and what you can afford elsewhere in the next ten years. I help design the mortgage as part of the overall architecture, not as a separate item.",
    s4Items: ["Bank comparison", "Fix-rate strategy", "Refinancing", "Investment properties", "Optimisation in relation to the whole"],
    s5Tag: "Retirement", s5Title: "Retirement planning", s5Desc: "Retirement is not about the third pillar. It is about having three income sources at 65 instead of one — and knowing which one to activate in which year. Analysis of years worked, filling missing contribution periods, combining the state pension, investment programme and other sources.",
    s5Items: ["Third pillar", "Contribution period analysis", "State pension calculation", "Filling missing periods", "Investment programme"],
    processEye: "Process", processTitle: "How we work together.",
    step1Num: "Step 01", step1Title: "Free Consultation", step1Desc: "We meet in person or online. I introduce myself and learn about your goals and expectations. No commitment, no sales.",
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
    aboutEye: "About Me",
    aboutP1: "Adam Dvořák, EFA. Eight years in the field, holder of the European Financial Advisor qualification and a member of the Association of Financial Advisors of the Czech Republic. I work with a select group of entrepreneurs and families — typically where it is no longer about products, but about architecture.",
    aboutP2: "Most financial advice in the Czech Republic works like sales. Someone calls, recommends something, you sign something, they get a commission. That is not how I work.",
    aboutP3: "My inspiration is Swiss private banking: discretion, long-term thinking, one person who holds the entire picture — from daily cashflow through investment strategy to what happens if you do not come home tomorrow. No call centre. No “team of specialists”. One relationship, one plan, one phone number.",
    aboutP4: "For the client this means a slow start and a long relationship. The first meeting is not about products — it is about whether we understand each other. Then comes the analysis, the plan, the implementation. And then years of work, refining the plan as your life and the world around you change.",
    aboutP5: "I work with people, not portfolios. I know my clients by name, their children too, sometimes their accountant as well. When someone writes to me on a Sunday evening that they are selling their company or that a doctor has delivered news they did not expect, I respond.",
    aboutP6: "That is the whole difference.",
    tag1: "Certified Advisor", tag2: "CNB Registered", tag3: "Independent", tag4: "Investment Specialist", tag5: "Mortgage Expert",
    refEye: "Testimonials", refTitle: "What clients say.",
    contactSub: "The first consultation is always free and without obligation. Write to me or call directly.",
    ctLocation: "Location", ctLocationVal: "Prague & Czech Republic (online)", ctOffice: "Office", ctOfficeVal: "Salvátorská 931/8, 110 00 Prague 1 – Old Town",
    fName: "Name", fNamePh: "John Smith", fPhone: "Phone", fTopic: "Topic", fTopicPh: "Mortgage, investments, retirement...", fMsg: "Message", fMsgPh: "Describe your situation...", fSubmit: "Send Message",
    footerTagline: "Financial Strategist", footerReg: "Registered with CNB.", footerPrivacy: "Privacy Policy", footerTerms: "Terms of Use",
    formSending: "Sending…", formSent: "✓ Sent!",
    nlEye: "Newsletter", nlTitle: "Financial insights straight to your inbox.", nlSub: "Once a month I send a short overview — what is happening in the markets, how to protect savings and where the current opportunities are. No spam.", nlPh: "your@email.com", nlBtn: "Subscribe", nlNote: "Unsubscribe with one click at any time. No spam.", nlSending: "Subscribing…", nlDone: "✓ Subscribed!",
    blogEye: "Blog", blogTitle: "Financial education.", blogSub: "I write about topics I tackle with my clients — clearly, without unnecessary jargon.",
    blogReadMore: "Read more",
  },
};

type Lang = "cs" | "en";
type Theme = "dark" | "light";

function fmt(n: number, lang: Lang) {
  return Math.round(n).toLocaleString(lang === "cs" ? "cs-CZ" : "en-US");
}

export default function Page() {
  const [lang, setLang] = useState<Lang>("cs");
  const [theme, setTheme] = useState<Theme>("dark");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [calcTab, setCalcTab] = useState<"invest" | "mortgage">("invest");

  /* Invest calc */
  const [invMonthly, setInvMonthly] = useState(5000);
  const [invRate, setInvRate] = useState(7);
  const [invYears, setInvYears] = useState(20);
  const [invInitPos, setInvInitPos] = useState(0);

  /* Mortgage calc */
  const [mtgAmt, setMtgAmt] = useState(4000000);
  const [mtgRate, setMtgRate] = useState(4.5);
  const [mtgYrs, setMtgYrs] = useState(30);

  /* Stats count-up */
  const statsRef = useRef<HTMLDivElement>(null);
  const [statAum, setStatAum] = useState(0);
  const [statFin, setStatFin] = useState(0);
  const [statYrs, setStatYrs] = useState(0);

  /* Form state */
  const [formState, setFormState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [nlState, setNlState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [nlEmail, setNlEmail] = useState("");

  const t = T[lang];

  /* Load saved lang/theme from localStorage */
  useEffect(() => {
    const savedLang = (localStorage.getItem("lang") as Lang) || "cs";
    const savedTheme = (localStorage.getItem("theme") as Theme) || "dark";
    setLang(savedLang);
    setTheme(savedTheme);
  }, []);

  /* Apply theme/lang to html element */
  useEffect(() => {
    const html = document.documentElement;
    html.className = theme;
    html.lang = lang;
  }, [theme, lang]);

  /* Stats count-up animation */
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    let fired = false;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired) {
          fired = true;
          obs.disconnect();
          const duration = 1400;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            setStatAum(Math.round(165 * ease));
            setStatFin(Math.round(400 * ease));
            setStatYrs(Math.round(8 * ease));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

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
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const toggleLang = () => {
    const next: Lang = lang === "cs" ? "en" : "cs";
    setLang(next);
    localStorage.setItem("lang", next);
  };

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
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
            <button className="theme-btn" onClick={toggleTheme} title="Přepnout téma">
              {theme === "dark" ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>
            <a href="#booking" className="btn-nav">{t.navCta}</a>
            <div className="hamburger" onClick={() => setMobileOpen(true)}>
              <span /><span /><span />
            </div>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section id="hero">
        <div className="hero-glow" />
        <div className="hero-inner">
          <div className="hero-text">
            <a href="#booking" className="hero-badge">
              <div className="hero-badge-dot" />
              <span>{t.heroBadge}</span>
            </a>
            <h1 className="hero-title">
              {lang === "cs" ? (
                <>Finance nejsou sbírka produktů.<br /><span className="accent">Jsou to systém.</span></>
              ) : (
                <>Finance is not a collection of products.<br /><span className="accent">It&apos;s a system.</span></>
              )}
            </h1>
            <p className="hero-sub">{t.heroSub}</p>
            <p className="hero-minimum">
              {lang === "cs"
                ? "Pracuji s klienty od 1 mil. Kč jednorázově nebo 10 000 Kč měsíčně."
                : "I work with clients from CZK 1M lump sum or CZK 10,000 monthly."}
            </p>
            <div className="hero-actions">
              <a href="#booking" className="btn-primary">
                <span>{t.heroCta}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <a href="#calculators" className="btn-ghost">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="16" y2="14"/><line x1="8" y1="18" x2="12" y2="18"/></svg>
                <span>{t.navCalc}</span>
              </a>
            </div>
          </div>
          <div className="hero-photo-wrap">
            <div className="hero-photo-frame">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/adam-dvorak-hero.png" alt="Adam Dvořák — Finanční stratég" loading="eager" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <div id="stats" ref={statsRef}>
        <div className="container">
          <div className="stats-grid">
            <div className="stat-cell">
              <div className="stat-num"><span>{statAum}</span>+ mil.</div>
              <div className="stat-desc">{lang === "cs" ? "ve správě" : "under management"}</div>
            </div>
            <div className="stat-cell">
              <div className="stat-num"><span>{statFin}</span>+ mil.</div>
              <div className="stat-desc">{lang === "cs" ? "zafinancováno" : "financed"}</div>
            </div>
            <div className="stat-cell">
              <div className="stat-num"><span>{statYrs}</span>+ {lang === "cs" ? "let" : "yrs"}</div>
              <div className="stat-desc">{lang === "cs" ? "v oboru" : "of experience"}</div>
            </div>
            <div className="stat-cell">
              <div className="stat-num"><span>EFA</span></div>
              <div className="stat-desc">{lang === "cs" ? "evropská kvalifikace" : "European qualification"}</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Services bento ── */}
      <section id="services">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-eyebrow">{t.navServices}</div>
            <h2 className="section-title-lg">{t.servicesTitle}</h2>
            <p className="section-sub">{t.servicesSub}</p>
          </div>
          <div className="bento">
            <div className="bento-card full reveal" style={{ justifyContent: "flex-start" }}>
              <div className="card-tag">{t.s1Tag}</div>
              <div className="card-title">{t.s1Title}</div>
              <div className="card-desc">{t.s1Desc}</div>
              <div className="wealth-tags">
                {t.s1Items.map((item: string) => <span key={item} className="wealth-tag">{item}</span>)}
              </div>
            </div>

            <div className="bento-card wide reveal">
              <div className="card-tag">{t.s2Tag}</div>
              <div className="card-title">{t.s2Title}</div>
              <div className="card-desc">{t.s2Desc}</div>
              <div className="wealth-tags">
                {t.s2Items.map((item: string) => <span key={item} className="wealth-tag">{item}</span>)}
              </div>
            </div>

            <div className="bento-card narrow reveal delay-1">
              <div className="card-tag">{t.s3Tag}</div>
              <div className="card-title">{t.s3Title}</div>
              <div className="card-desc">{t.s3Desc}</div>
              <div className="wealth-tags">
                {t.s3Items.map((item: string) => <span key={item} className="wealth-tag">{item}</span>)}
              </div>
            </div>

            <div className="bento-card narrow reveal">
              <div className="card-tag">{t.s4Tag}</div>
              <div className="card-title">{t.s4Title}</div>
              <div className="card-desc">{t.s4Desc}</div>
              <div className="wealth-tags">
                {t.s4Items.map((item: string) => <span key={item} className="wealth-tag">{item}</span>)}
              </div>
            </div>

            <div className="bento-card wide reveal delay-1" style={{ justifyContent: "flex-start" }}>
              <div className="card-tag">{t.s5Tag}</div>
              <div className="card-title">{t.s5Title}</div>
              <div className="card-desc">{t.s5Desc}</div>
              <div className="wealth-tags">
                {t.s5Items.map((item: string) => <span key={item} className="wealth-tag">{item}</span>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section id="process">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-eyebrow">{t.processEye}</div>
            <h2 className="section-title-lg">{t.processTitle}</h2>
          </div>
          <div className="process-grid reveal">
            <div className="process-step">
              <span className="step-num">{t.step1Num}</span>
              <div className="step-title">{t.step1Title}</div>
              <div className="step-desc">{t.step1Desc}</div>
            </div>
            <div className="process-step">
              <span className="step-num">{t.step2Num}</span>
              <div className="step-title">{t.step2Title}</div>
              <div className="step-desc">{t.step2Desc}</div>
            </div>
            <div className="process-step">
              <span className="step-num">{t.step3Num}</span>
              <div className="step-title">{t.step3Title}</div>
              <div className="step-desc">{t.step3Desc}</div>
            </div>
            <div className="process-step">
              <span className="step-num">{t.step4Num}</span>
              <div className="step-title">{t.step4Title}</div>
              <div className="step-desc">{t.step4Desc}</div>
            </div>
            <div className="process-step">
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
          <div className="section-header reveal">
            <div className="section-eyebrow">{t.navCalc}</div>
            <h2 className="section-title-lg">{t.calcTitle}</h2>
          </div>
          <div className="calc-wrap reveal">
            <div className="calc-header">
              <div className="calc-tabs">
                <button className={`calc-tab${calcTab === "invest" ? " active" : ""}`} onClick={() => setCalcTab("invest")}>{t.tabInvest}</button>
                <button className={`calc-tab${calcTab === "mortgage" ? " active" : ""}`} onClick={() => setCalcTab("mortgage")}>{t.tabMortgage}</button>
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
            </div>
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about">
        <div className="container">
          <div className="about-wrap">
            <div className="about-photo reveal">
              <div className="about-photo-frame">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/adam-dvorak-about-full.png" alt="Adam Dvořák" />
              </div>
            </div>
            <div className="reveal delay-1">
              <div className="section-eyebrow">{t.aboutEye}</div>
              <h2 className="section-title-lg" style={{ marginBottom: 20 }}>
                {lang === "cs" ? (
                  <>Za každým číslem<br />je lidský příběh.</>
                ) : (
                  <>Behind every number<br />is a human story.</>
                )}
              </h2>
              <p className="about-text">{t.aboutP1}</p>
              <p className="about-text">{t.aboutP2}</p>
              <p className="about-text">{t.aboutP3}</p>
              <p className="about-text">{t.aboutP4}</p>
              <p className="about-text">{t.aboutP5}</p>
              <p className="about-text about-text-strong">{t.aboutP6}</p>
              <div className="about-tags">
                {[t.tag1, t.tag2, t.tag3, t.tag4, t.tag5].map((tag) => (
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
          <div className="section-header reveal">
            <div className="section-eyebrow">{t.refEye}</div>
            <h2 className="section-title-lg">{t.refTitle}</h2>
          </div>
          <div className="ref-grid">
            <div className="ref-card reveal">
              <div className="ref-quote">"</div>
              <p className="ref-text">Spolupráci hodnotíme oba velmi pozitivně, na základě upřímné a otevřené komunikace, která je pro nás zásadní. Velmi oceňujeme rychlý zásah a řešení jednotlivých situací.</p>
              <div className="ref-author"><div className="ref-author-dot" /><span>Vanessa a Josef</span></div>
            </div>
            <div className="ref-card reveal delay-1">
              <div className="ref-quote">"</div>
              <p className="ref-text">Naši dosavadní spolupráci hodnotíme velmi pozitivně. Oceňujeme vysokou profesionalitu, rychlost, flexibilitu a schopnost přizpůsobit řešení našim individuálním požadavkům. Přístup je precizní a zaměřený na detail, což vytváří pevný základ pro naši budoucí spolupráci. Věříme, že díky proaktivnímu a odbornému přístupu bude naše spolupráce dlouhodobě přínosná.</p>
              <div className="ref-author"><div className="ref-author-dot" /><span>Denisa a Dalibor</span></div>
            </div>
            <div className="ref-card reveal delay-2">
              <div className="ref-quote">"</div>
              <p className="ref-text">Jsem rád za osobní přístup. Vím kam směřuji a není mi nic nucené ani prodávané.</p>
              <div className="ref-author"><div className="ref-author-dot" /><span>Radek</span></div>
            </div>
            <div className="ref-card reveal">
              <div className="ref-quote">"</div>
              <p className="ref-text">Plánování jako takové je mnohem příjemnější forma než samotný prodej produktů. Win win pro obě strany, protože nakonec jsem si produkty koupil, ale s nějakým určitým cílem.</p>
              <div className="ref-author"><div className="ref-author-dot" /><span>Tomáš</span></div>
            </div>
            <div className="ref-card reveal delay-1">
              <div className="ref-quote">"</div>
              <p className="ref-text">K osobnímu nebo online prodeji, kdy se mě někdo snaží přesvědčit o tom, že danou věc potřebuji, jsem apriori skeptická a je mi to nepříjemné. Finanční plánování vnímám jinak a proto to vítám.</p>
              <div className="ref-author"><div className="ref-author-dot" /><span>Lucie</span></div>
            </div>
            <div className="ref-card reveal delay-2">
              <div className="ref-quote">"</div>
              <p className="ref-text">Pan Dvořák je velmi ochotný a vstřícný poradce ve všech směrech. Vždy dokáže dobře nastavit můj finanční plán podle mých finančních potřeb a vývoje na trhu. Má skvělý přehled.</p>
              <div className="ref-author"><div className="ref-author-dot" /><span>Tomáš</span></div>
            </div>
            <div className="ref-card reveal">
              <div className="ref-quote">"</div>
              <p className="ref-text">K panu Dvořákovi mě přivedla zvědavost na sociální síti. Už po první komunikaci s plánem do budoucna nám se ženou spadl kámen ze srdce, že se můžeme mít dobře. Začali jsme žít.</p>
              <div className="ref-author"><div className="ref-author-dot" /><span>Miroslav</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Blog ── */}
      <section id="blog">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-eyebrow">{t.blogEye}</div>
            <h2 className="section-title-lg">{t.blogTitle}</h2>
            <p className="blog-sub">{t.blogSub}</p>
          </div>
          <div className="blog-grid">
            <article className="blog-card reveal">
              <div className="blog-card-tag">{lang === "cs" ? "Správa majetku" : "Wealth Management"}</div>
              <h3 className="blog-card-title">{lang === "cs" ? "Jak efektivně spravovat svěřenské fondy" : "How to effectively manage trust funds"}</h3>
              <p className="blog-card-desc">{lang === "cs" ? "Svěřenský fond je právní nástroj, který umožňuje převedení majetku do fondu a jeho oddělení od osobního majetku. Klíčem k úspěchu je pečlivé plánování, výběr kvalifikovaného správce a průběžné monitorování." : "A trust fund is a legal instrument that allows assets to be transferred and separated from personal property. The key to success is careful planning, choosing a qualified trustee, and ongoing monitoring."}</p>
              <div className="blog-card-footer">
                <span className="blog-card-date">{lang === "cs" ? "31. března 2025" : "March 31, 2025"}</span>
                <a href="/blog/jak-efektivne-spravovat-sverenske-fondy" className="blog-card-link">{t.blogReadMore} →</a>
              </div>
            </article>
            <article className="blog-card reveal delay-1">
              <div className="blog-card-tag">{lang === "cs" ? "Hypotéky" : "Mortgages"}</div>
              <h3 className="blog-card-title">{lang === "cs" ? "Fixace hypotéky: 3, 5 nebo 10 let? Jak se rozhodnout" : "Mortgage fix period: 3, 5 or 10 years? How to decide"}</h3>
              <p className="blog-card-desc">{lang === "cs" ? "Délka fixace ovlivňuje výši splátky i vaši flexibilitu. Rozebírám, co vzít v úvahu při výběru — od vývoje úrokových sazeb po plány do budoucna." : "The fix period affects your monthly payment and flexibility. I break down what to consider — from interest rate trends to your future plans."}</p>
              <div className="blog-card-footer">
                <span className="blog-card-date">{lang === "cs" ? "2. března 2026" : "March 2, 2026"}</span>
                <a href="/blog/fixace-hypoteky-jak-se-rozhodnout" className="blog-card-link">{t.blogReadMore} →</a>
              </div>
            </article>
            <article className="blog-card reveal delay-2">
              <div className="blog-card-tag">{lang === "cs" ? "Důchod" : "Retirement"}</div>
              <h3 className="blog-card-title">{lang === "cs" ? "Penzijní spoření vs. investice: co se více vyplatí?" : "Pension savings vs. investments: which pays off more?"}</h3>
              <p className="blog-card-desc">{lang === "cs" ? "Státní příspěvky a daňové úlevy dělají z třetího pilíře atraktivní nástroj. Ale má i svá omezení. Porovnávám ho s alternativou v podobě vlastního investičního portfolia." : "State contributions and tax relief make the third pillar attractive. But it has its limits. I compare it to building your own investment portfolio."}</p>
              <div className="blog-card-footer">
                <span className="blog-card-date">{lang === "cs" ? "18. února 2026" : "February 18, 2026"}</span>
                <a href="/blog/penzijni-sporeni-vs-investice" className="blog-card-link">{t.blogReadMore} →</a>
              </div>
            </article>
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
              <h2 className="contact-title">
                {lang === "cs" ? (
                  <>Pojďme to probrat<br />společně.</>
                ) : (
                  <>Let&apos;s talk it through<br />together.</>
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
          <div className="section-header reveal">
            <div className="section-eyebrow">{lang === "cs" ? "Rezervace" : "Booking"}</div>
            <h2 className="section-title-lg">
              {lang === "cs" ? "Vyberte si termín." : "Pick your slot."}
            </h2>
            <p style={{ color: "var(--text-2)", fontSize: 16, maxWidth: 540, marginTop: 8 }}>
              {lang === "cs"
                ? "Zarezervujte si 30minutovou konzultaci přímo online. První setkání je vždy zdarma a bez závazků."
                : "Book a 30-minute consultation directly online. The first meeting is always free and without obligation."}
            </p>
          </div>
          <div
            className="calendly-inline-widget"
            data-url="https://calendly.com/dvorak-beplan/30min?hide_gdpr_banner=1"
            style={{ minWidth: 320, height: 700 }}
          />
        </div>
        <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="afterInteractive" />
      </section>

      {/* ── Newsletter ── */}
      <section id="newsletter">
        <div className="container">
          <div className="newsletter-wrap reveal">
            <div className="newsletter-eyebrow">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <span>{t.nlEye}</span>
            </div>
            <h2 className="newsletter-title">{t.nlTitle}</h2>
            <p className="newsletter-sub">{t.nlSub}</p>
            <form className="newsletter-form" onSubmit={handleNlSubmit}>
              <input type="email" className="newsletter-input" value={nlEmail} onChange={(e) => setNlEmail(e.target.value)} placeholder={t.nlPh} required />
              <button
                type="submit"
                className="newsletter-btn"
                disabled={nlState !== "idle"}
                style={nlState === "done" ? { background: "#22c55e" } : nlState === "error" ? { background: "var(--red)" } : undefined}
              >
                {nlBtnText}
              </button>
            </form>
            {nlState === "done" ? (
              <p style={{ color: "#22c55e", fontSize: 14, fontWeight: 500, marginTop: 12 }}>
                ✓ {lang === "cs" ? "Výborně, jste přihlášeni! Děkuji za zájem — první přehled dorazí brzy." : "You're in! Thank you — the first digest is on its way."}
              </p>
            ) : (
              <p className="newsletter-note">{t.nlNote}</p>
            )}
          </div>
        </div>
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
