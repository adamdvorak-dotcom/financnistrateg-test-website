/* Texty úvodní stránky a sekcí, které z ní vznikly (česky a anglicky).
   Sdílí je úvodní stránka, stránka Služby a jednotlivé sekce. */

export type Lang = "cs" | "en";

export const T = {
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
    s5Tag: "Důchod", s5Title: "Příprava na důchod", s5Desc: "Důchod není o třetím pilíři. Je o tom mít v 65 letech tři zdroje příjmu místo jednoho, a vědět, který z nich v který rok aktivovat.",
    s5Items: ["Třetí pilíř", "Analýza let pojištění", "Výpočet státního důchodu", "Doplnění chybějících dob", "Investiční program"],
    processEye: "Přístup", processTitle: "Jak spolupráce probíhá.",
    step1Num: "Krok 01", step1Title: "Úvodní konzultace", step1Desc: "Ukážu vám, jak pracuji a co od spolupráce čekám já. Ale hlavně, chci slyšet vás. Kde jste, co nefunguje, co chcete jinak. Primárně si musíme sednout.",
    step2Num: "Krok 02", step2Title: "Analýza & strategie", step2Desc: "Provedu hloubkovou analýzu příjmů, výdajů, majetku i závazků a na jejím základě navrhnu strategii přímo na míru.",
    step3Num: "Krok 03", step3Title: "Finanční plán", step3Desc: "Představím konkrétní finanční plán s doporučeními a prioritami. Společně provedeme audit stávající situace a nastavíme cíle.",
    step4Num: "Krok 04", step4Title: "Konzultace & dotazy", step4Desc: "Podrobně projdeme celý plán a zodpovím veškeré otázky. Strategii doladíme podle vašich připomínek a preferencí.",
    step5Num: "Krok 05", step5Title: "Realizace & servis", step5Desc: "Spustíme plán, nastavíme produkty, otevřeme účty. Domluvíme pravidelné servisní schůzky pro průběžný dohled a aktualizace.",
    calcTitle: "Jak vám pracují peníze.",
    tabInvest: "Investiční kalkulačka", tabMortgage: "Hypoteční kalkulačka", tabDepletion: "Na jak dlouho", tabNew: "nové",
    invMonthly: "Měsíční vklad", invRate: "Roční výnos", invYears: "Délka investice", invInit: "Jednorázový vklad",
    invResultLabel: "Celková hodnota portfolia", currency: "Kč", invDep: "Celkové vklady", invProfit: "Výnos", invMult: "Násobek vkladů",
    mtgAmt: "Výše hypotéky", mtgRate: "Úroková sazba", mtgTerm: "Délka splatnosti",
    mtgResultLabel: "Měsíční splátka", mtgTotal: "Celkem zaplatíte", mtgInt: "Úroky celkem", mtgPct: "Podíl úroků",
    tabRetirement: "Důchodová kalkulačka", tabRenta: "Kdy vyjde renta",
    retAgeLabel: "Váš věk", retMissingYrsLabel: "Chybějící roky pojištění", retCurrentSavLabel: "Současné úspory", retMonthlySavLabel: "Měsíční spoření", retDesiredLabel: "Požadovaná renta v důchodu",
    retStatePensionLabel: "Průměrný státní důchod", retMissingEffectLabel: "Vliv chybějících let", retYourPensionLabel: "Váš státní důchod",
    retPortfolioValLabel: "Hodnota portfolia při důchodu", retPortfolioIncLabel: "Příjem z portfolia / měs.",
    retTotalLabel: "Celkový příjem v důchodu", retGapLabel: "Rozdíl od požadované renty", retExtraLabel: "Doporučené extra spoření / měs.",
    retYrsToRet: "let do důchodu",
    retDisclaimer: "Pouze ilustrativní výpočet. Pracujeme s průměrným důchodem dle ČSSZ (21 840 Kč), průměrným zhodnocením 6 % p.a. a čerpáním portfolia po dobu 20 let.",







    tag1: "Certifikovaný poradce", tag2: "ČNB registrace", tag4: "Investiční specialista", tag5: "Majetkové plánování", tag6: "Podnikové poradenství", tag7: "Správa majetku", tag8: "Investiční poradenství", tag9: "Finanční plánování", tag10: "Krizový management", heroCtaProcess: "Finanční preventivka",
    refEye: "Reference", refTitle: "Co říkají klienti.",
    contactSub: "První konzultace je zdarma. Napište mi nebo rovnou zavolejte.",
    ctLocation: "Lokace", ctLocationVal: "Praha & celá ČR (online)", ctOffice: "Kancelář", ctOfficeVal: "Salvátorská 931/8, 110 00 Praha 1-Staré Město",
    fName: "Jméno", fNamePh: "Jan Novák", fPhone: "Telefon", fTopic: "Téma", fTopicPh: "Firma, rodina, nebo obojí?", fMsg: "Zpráva", fMsgPh: "Klidně neformálně, kde jste teď a co byste chtěli jinak.", fSubmit: "Odeslat zprávu",
    footerTagline: "Finanční Stratég", footerReg: "Registrován u ČNB. IČO: 08406804.", footerPrivacy: "Ochrana osobních údajů", footerTerms: "Podmínky užití",
    formSending: "Odesílám…", formSent: "✓ Odesláno!",
    nlEye: "Newsletter", nlTitle: "Finanční tipy přímo do schránky.", nlSub: "Jednou měsíčně krátký e-mail pro majitele firem: co se změnilo v daních a pravidlech, co to znamená pro vaše peníze mimo firmu, a jeden konkrétní krok. Bez spamu.", nlPh: "vas@email.cz", nlBtn: "Odebírat", nlNote: "Odhlášení jedním kliknutím kdykoliv. Žádný spam.", nlSending: "Přihlašuji…", nlDone: "✓ Přihlášeno!",
    blogEye: "Blog", blogTitle: "Finanční vzdělávání.", blogSub: "Píšu o tématech, která řeším se svými klienty, srozumitelně, bez zbytečného žargonu.",
    blogReadMore: "Číst dál",
    planEye: "Co dostanete", planHead: "Tohle dostanete do ruky.",





    /* investment calc */
    invMillSuffix: "mil. Kč", invExact: "přesně", invRentaMonth: "měsíčně renty",
    invRentaHint: "Pravidlo palce: milion udělá zhruba 5 000 Kč měsíčně.",
    invRentaCta: "Spočítat celý důchod →",
    rentaMore: "Kdy vám vyjde renta? Podrobná kalkulačka →",
    /* retirement calc result */
    retResultLabel: "Váš měsíční příjem v důchodu", retOfTarget: "z",
    retStateBar: "Stát", retOnTrack: "Portfolio pokryje váš cíl celé. Jste na dobré cestě.",
    /* depletion calc */
    decAssets: "Majetek", decWithdrawal: "Měsíční výběr", decReturn: "Roční výnos",
    decStartAge: "Začnete vybírat v", decStartAgeSuffix: "letech",
    decResultLabel: "Váš majetek vydrží", decNote: "Klidné rentiérské portfolio dělá zhruba 4 až 5 %.",
    dec10y: "Za 10 let zbude", dec20y: "Za 20 let zbude", decForeverRow: "Navždy vydrží",
    decForeverBig: "Navždy.", decPerMonth: "Kč/měs.",
    decCta: "Probrat rentu →",
    decDisc: "Ilustrační výpočet bez inflace a daní. Výběr se během let nemění.",
    /* preventivka */
    prevEye: "Pro majitele firem", prevH3: "Finanční preventivka",
    prevP: "Nic vás nebolí, a právě proto je dobrá chvíle podívat se, jestli firma běží i bez vás.",
    prevCta: "Začít preventivku",
    /* druhá noha */
    nohaEye: "Struktura majetku", nohaH2a: "Kde máte", nohaH2b: "majetek?",
    nohaP: "Zadejte odhadovanou hodnotu každé části. Počítá se jen v prohlížeči.",
    nohaFirmaLbl: "Firma", nohaNemLbl: "Nemovitosti", nohaInvLbl: "Investice", nohaHotLbl: "Hotovost",
    nohaTotal: "Váš majetek dohromady", nohaOutside: "Mimo firmu", nohaLiquid: "K dispozici hned",
    nohaOfAssets: "majetku", nohaNoSale: "bez prodeje firmy nebo baráku",
    nohaQuote: "„Cihla vám rohlíky nezaplatí.“", nohaCta: "Probrat druhou nohu →",
    /* dědictví */
    dedEye: "Bez závěti rozhodne zákon", dedH2a: "Kdo dědí,", dedH2b: "když závěť nemáte?",
    dedP: "Naklikněte svou situaci a hned vidíte, kdo co dostane.",
    dedPartnerLabel: "Partnerský stav", dedChildrenLabel: "Počet dětí", dedMinorsLabel: "Z toho nezletilých",
    dedParentsLabel: "Žijící rodiče", dedAssetLabel: "Váš majetek",
    dedSjmLabel: "Majetek ve společném jmění manželů?", dedSjmYes: "Ano", dedSjmNo: "Ne, mám smlouvu",
    dedClass1: "1. třída dědiců", dedClass2: "2. třída dědiců", dedClass3: "3. třída dědiců",
    dedNoteGuardian: "Když dědí i rodič, který dítě zastupuje, nebo víc nezletilých sourozenců, jedná za dítě kolizní opatrovník, zpravidla OSPOD.",
    dedNoteMinorSame: "Nezletilé dítě dědí stejně jako dospělé. Liší se jen to, kdo za něj jedná a co smí rodič s jeho podílem dělat.",
    dedForcedShare: "povinný díl",
    dedNoteForced: "I se závětí musíte dětem nechat povinný díl: nezletilým tři čtvrtiny, dospělým čtvrtinu zákonného podílu.",
    dedWarnPartner: "Partner bez svatby vedle dětí nedědí ani korunu, i kdybyste spolu žili dvacet let. Pomůže závěť nebo dědická smlouva.",
    dedNotePartner2: "Podmínka: partner bez svatby dědí ve 2. třídě jen pokud spolu žili aspoň rok ve společné domácnosti (§ 1636 OZ).",
    dedStat: "Přes 560 milionů korun zdědil v roce 2025 stát po 1 615 lidech, kteří neměli dědice ani závěť.",
    dedCta: "Probrat, co do závěti patří →",
    dedNameWife: "Manželka", dedNameHusband: "Manžel", dedNamePartner: "Partner bez svatby",
    dedNameAdultChild: "Dospělé dítě", dedNameMinorChild: "Dítě do 18 let",
    dedNameParent: "Váš rodič", dedNameDistant: "Sourozenci a vzdálenější příbuzní",
    dedParentOpts: ["Žádný", "Jeden", "Oba"] as [string, string, string],
    dedPartnerOpts: [["manzelka", "Manželka"], ["manzel", "Manžel"], [null, "Sám/a"], ["druh", "Spolu bez svatby"]] as [string | null, string][],
    /* situace */
    situEye: "S čím za mnou chodíte", situH2a: "Takhle to", situH2b: "nejčastěji začíná.",
    situCards: [
      { veta: '„Prodávám firmu."', text: 'Nebo o tom přemýšlím. Kolik za ni dostanu, jak je to s daní a hlavně co pak s penězi.', cta: 'Probrat exit', href: '/konzultace' },
      { veta: '„Všechno mám ve firmě."', text: 'Kromě baráku je všechno ve firmě. Postavíme druhou nohu, která nespadne, když se firmě zrovna nedaří.', cta: 'Kde máte majetek', href: '#druha-noha' },
      { veta: '„Přišly velké peníze."', text: 'Dědictví, prodej nebo velký bonus. Nejdřív klid, pak plán.', cta: 'Probrat v klidu', href: '/konzultace' },
      { veta: '„Chci to jednou předat dětem."', text: 'A umí vaše děti s penězi zacházet? Předání začíná pravidly, ne až dědickým řízením.', cta: 'Kdo dědí bez závěti', href: '#dedictvi' },
      { veta: '„Někdo mi nabízí investici."', text: 'Pošlete mi ji dřív, než podepíšete. Většinu nabídek, které mi lidi pošlou, končím větou: tohle ne.', cta: 'Poslat nabídku', href: 'mailto:adamdvorak@financnistrateg.com?subject=Nab%C3%ADdka%20k%20posouzen%C3%AD' },
      { veta: '„Blíží se důchod."', text: 'Stačí to? Spočítáme, kolik dá stát, kolik vaše peníze a co chybí.', cta: 'Důchodová kalkulačka', href: '/?kalkulacka=duchod#calculators' },
    ] as { veta: string; text: string; cta: string; href: string }[],
    /* references */
    refs: [
      { text: 'Naši dosavadní spolupráci hodnotíme velmi pozitivně. Oceňujeme vysokou profesionalitu, rychlost, flexibilitu a schopnost přizpůsobit řešení našim individuálním požadavkům. Přístup je precizní a zaměřený na detail.', author: 'Denisa a Dalibor' },
      { text: 'Jsem rád za osobní přístup. Vím kam směřuji a není mi nic nucené ani prodávané.', author: 'Radek' },
      { text: 'Už po první komunikaci s plánem do budoucna nám se ženou spadl kámen ze srdce, že se můžeme mít dobře. Začali jsme žít.', author: 'Miroslav' },
      { text: 'Je to důvěra v mladého člověka, jehož služby budou moci v budoucnu využívat mí potomci. Investování vyžaduje hodně práce v získávání informací a rozvahu. A protože to momentálně není to, co mě naplňuje, rád tuto činnost přenechám odborníkům.', author: 'Daneš a rodina' },
    ] as { text: string; author: string }[],
  },
  en: {
    navAbout: "About", navServices: "Services", navCalc: "Calculators", navBlog: "Blog", navContact: "Contact", navCta: "Free Consultation",
    heroBadge: "For entrepreneurs & families · Prague & online",
    heroSub: "Nine out of ten business owners have their personal wealth locked in their home. I work with entrepreneurs and families who want to change that. Eight years in the field, over CZK 165 million under management.",
    heroCta: "Start a conversation",
    servicesTitle: "What I do for you",
    servicesSub: "I do not work as a specialist in one thing. I work as one person who holds the entire picture: from daily cashflow to what happens if you do not come home tomorrow.",
    s1Tag: "Family Wealth", s1Title: "Family Wealth Management & Transfer", s1Desc: "Structuring, protecting and transferring wealth across generations. I work with families and entrepreneurs where it is no longer about products but about how to keep wealth together across generations and life situations nobody asks about until they arrive. I work discreetly, always with the specific family context in mind, not from templates.",
    s1Items: ["Crisis & succession plan", "Trust funds", "Family council", "Business sale & exit", "Foreign structures (Switzerland)", "Family office advisory", "Wealth tax optimisation"],
    s2Tag: "Investments", s2Title: "Investments without illusions", s2Desc: "I build portfolios that make sense in relation to the rest of your life, not to a table of historical returns. No “investment opportunity of the year”, no products I cannot justify in five years. Diversification across asset classes, jurisdictions and currencies, with regular review.",
    s2Items: ["ETFs & mutual funds", "Bonds & alternative assets", "Private equity", "International banking relationships", "Rebalancing & reporting"],
    s3Tag: "Strategy", s3Title: "Comprehensive financial strategy", s3Desc: "Three layers in one plan: financial (cashflow, reserves, taxes), investment (where to put surpluses) and crisis (what if). It is not a spreadsheet, it is a document the family actually uses. We update it continuously, not once every five years.",
    s3Items: ["Cashflow & budgeting", "Insurance cover", "Liquid reserve", "Tax optimisation", "Crisis scenario"],
    s4Tag: "Financing", s4Title: "Mortgages & property financing", s4Desc: "A mortgage is not a commodity, it is a long-term contract that affects cashflow, taxes and what you can afford elsewhere in the next ten years. I help design the mortgage as part of the overall architecture, not as a separate item.",
    s4Items: ["Bank comparison", "Fix-rate strategy", "Refinancing", "Investment properties", "Optimisation in relation to the whole"],
    s5Tag: "Retirement", s5Title: "Retirement planning", s5Desc: "Retirement is not about the third pillar. It is about having three income sources at 65 instead of one, and knowing which one to activate in which year. Analysis of years worked, filling missing contribution periods, combining the state pension, investment programme and other sources.",
    s5Items: ["Third pillar", "Contribution period analysis", "State pension calculation", "Filling missing periods", "Investment programme"],
    processEye: "Process", processTitle: "How we work together.",
    step1Num: "Step 01", step1Title: "Intro consultation", step1Desc: "I'll show you how I work and what I expect from the collaboration. But mostly, I want to hear you. Where you are, what isn't working, what you want to change. First, we need to click.",
    step2Num: "Step 02", step2Title: "Analysis & Strategy", step2Desc: "An in-depth analysis of your income, expenses, assets and liabilities, from which I design a strategy tailored specifically to you.",
    step3Num: "Step 03", step3Title: "Financial Plan", step3Desc: "I present a concrete financial plan with recommendations and priorities. Together we audit your current situation and set clear goals.",
    step4Num: "Step 04", step4Title: "Consultation & Q&A", step4Desc: "We review the plan in detail and I answer all your questions. We refine the strategy based on your feedback and preferences.",
    step5Num: "Step 05", step5Title: "Implementation & Service", step5Desc: "We launch the plan: set up products, open accounts. We schedule regular service meetings for ongoing oversight and updates.",
    calcTitle: "Make your money work for you.",
    tabInvest: "Investment Calculator", tabMortgage: "Mortgage Calculator", tabDepletion: "How long it lasts", tabNew: "new",
    invMonthly: "Monthly Deposit", invRate: "Annual Return", invYears: "Investment Period", invInit: "Lump-sum Deposit",
    invResultLabel: "Total Portfolio Value", currency: "CZK", invDep: "Total Deposits", invProfit: "Return", invMult: "Return Multiplier",
    mtgAmt: "Mortgage Amount", mtgRate: "Interest Rate", mtgTerm: "Loan Term",
    mtgResultLabel: "Monthly Payment", mtgTotal: "Total Payment", mtgInt: "Total Interest", mtgPct: "Interest Share",
    tabRetirement: "Retirement Calculator", tabRenta: "Income goal (CZ)",
    retAgeLabel: "Your age", retMissingYrsLabel: "Missing insurance years", retCurrentSavLabel: "Current savings", retMonthlySavLabel: "Monthly savings", retDesiredLabel: "Desired monthly pension",
    retStatePensionLabel: "Average state pension", retMissingEffectLabel: "Effect of missing years", retYourPensionLabel: "Your state pension",
    retPortfolioValLabel: "Portfolio value at retirement", retPortfolioIncLabel: "Portfolio income / month",
    retTotalLabel: "Total retirement income", retGapLabel: "Difference from target", retExtraLabel: "Recommended extra savings / month",
    retYrsToRet: "years to retirement",
    retDisclaimer: "Illustrative calculation only. We use the average Czech state pension per ČSSZ (CZK 21,840), average 6% p.a. return and 20-year portfolio drawdown.",







    tag1: "Certified Advisor", tag2: "CNB Registered", tag4: "Investment Specialist", tag5: "Wealth Planning", tag6: "Business Advisory", tag7: "Asset Management", tag8: "Investment Advisory", tag9: "Financial Planning", tag10: "Crisis Management", heroCtaProcess: "Financial check-up",
    refEye: "Testimonials", refTitle: "What clients say.",
    contactSub: "The first consultation is free. Write to me or call directly.",
    ctLocation: "Location", ctLocationVal: "Prague & Czech Republic (online)", ctOffice: "Office", ctOfficeVal: "Salvátorská 931/8, 110 00 Prague 1 – Old Town",
    fName: "Name", fNamePh: "John Smith", fPhone: "Phone", fTopic: "Topic", fTopicPh: "Business, family, or both?", fMsg: "Message", fMsgPh: "Keep it informal. Where are you now and what would you like to change.", fSubmit: "Send Message",
    footerTagline: "Financial Strategist", footerReg: "Registered with CNB. Company ID: 08406804.", footerPrivacy: "Privacy Policy", footerTerms: "Terms of Use",
    formSending: "Sending…", formSent: "✓ Sent!",
    nlEye: "Newsletter", nlTitle: "Financial insights straight to your inbox.", nlSub: "Once a month, a short email for business owners: what has changed in taxes and rules, what it means for your money outside the company, and one concrete step. No spam.", nlPh: "your@email.com", nlBtn: "Subscribe", nlNote: "Unsubscribe with one click at any time. No spam.", nlSending: "Subscribing…", nlDone: "✓ Subscribed!",
    blogEye: "Blog", blogTitle: "Financial education.", blogSub: "I write about topics I tackle with my clients. Clearly, without unnecessary jargon.",
    blogReadMore: "Read more",
    planEye: "What you get", planHead: "This is what you walk away with.",





    /* investment calc */
    invMillSuffix: "mil. CZK", invExact: "exact", invRentaMonth: "monthly income",
    invRentaHint: "Rule of thumb: a million generates roughly 5,000 CZK per month.",
    invRentaCta: "Calculate full retirement →",
    rentaMore: "When will your target income work out? Detailed calculator (Czech) →",
    /* retirement calc result */
    retResultLabel: "Your monthly retirement income", retOfTarget: "of",
    retStateBar: "State", retOnTrack: "Portfolio covers your target in full. You're on track.",
    /* depletion calc */
    decAssets: "Assets", decWithdrawal: "Monthly withdrawal", decReturn: "Annual return",
    decStartAge: "You start withdrawing at", decStartAgeSuffix: "",
    decResultLabel: "Your assets will last", decNote: "A steady retirement portfolio returns roughly 4–5%.",
    dec10y: "After 10 years", dec20y: "After 20 years", decForeverRow: "Lasts forever",
    decForeverBig: "Forever.", decPerMonth: "CZK/month",
    decCta: "Discuss retirement income →",
    decDisc: "Illustrative calculation, no inflation or tax. Withdrawal stays fixed.",
    /* preventivka */
    prevEye: "For business owners", prevH3: "Financial Health Check",
    prevP: "Nothing hurts right now — which is exactly the right time to check whether the business runs without you.",
    prevCta: "Start the check-up",
    /* asset structure */
    nohaEye: "Asset structure", nohaH2a: "Where is your", nohaH2b: "wealth?",
    nohaP: "Enter the estimated value of each part. Calculated only in your browser.",
    nohaFirmaLbl: "Business", nohaNemLbl: "Real estate", nohaInvLbl: "Investments", nohaHotLbl: "Cash",
    nohaTotal: "Total assets", nohaOutside: "Outside business", nohaLiquid: "Available now",
    nohaOfAssets: "of assets", nohaNoSale: "without selling the business or property",
    nohaQuote: "\"Bricks don't pay bills.\"", nohaCta: "Discuss diversification →",
    /* inheritance */
    dedEye: "Without a will, the law decides", dedH2a: "Who inherits", dedH2b: "when you have no will?",
    dedP: "Select your situation and see immediately who gets what.",
    dedPartnerLabel: "Relationship status", dedChildrenLabel: "Number of children", dedMinorsLabel: "of which minors",
    dedParentsLabel: "Living parents", dedAssetLabel: "Your assets",
    dedSjmLabel: "Assets in joint matrimonial property?", dedSjmYes: "Yes", dedSjmNo: "No, I have a prenup",
    dedClass1: "1st class of heirs", dedClass2: "2nd class of heirs", dedClass3: "3rd class of heirs",
    dedNoteGuardian: "When a parent also inherits as the child's legal guardian, or when multiple minors inherit, a conflict guardian (usually the child welfare authority, OSPOD) represents each child.",
    dedNoteMinorSame: "A minor inherits the same share as an adult child. What differs is who acts for the child and what a parent may do with the child's share.",
    dedForcedShare: "reserved portion",
    dedNoteForced: "Even with a will, you must leave children their reserved portion: three-quarters of the legal share for minors, one-quarter for adults.",
    dedWarnPartner: "An unmarried partner beside children inherits nothing, even if you lived together for twenty years. Only a will or an inheritance contract can change that.",
    dedNotePartner2: "Condition: an unmarried partner inherits in 2nd class only if they lived together for at least one year in a shared household (§ 1636 CZ Civil Code).",
    dedStat: "In 2025, the Czech state inherited over CZK 560 million from 1,615 people who had no heirs and no will.",
    dedCta: "Discuss what belongs in a will →",
    dedNameWife: "Wife", dedNameHusband: "Husband", dedNamePartner: "Unmarried partner",
    dedNameAdultChild: "Adult child", dedNameMinorChild: "Child under 18",
    dedNameParent: "Your parent", dedNameDistant: "Siblings and more distant relatives",
    dedParentOpts: ["None", "One", "Both"] as [string, string, string],
    dedPartnerOpts: [["manzelka", "Wife"], ["manzel", "Husband"], [null, "Single"], ["druh", "Partner, not married"]] as [string | null, string][],
    /* situace */
    situEye: "What brings people to me", situH2a: "This is how it", situH2b: "usually starts.",
    situCards: [
      { veta: '"I\'m selling my business."', text: 'Or thinking about it. How much will I get, what about tax, and — most importantly — what to do with the money.', cta: 'Discuss the exit', href: '/konzultace' },
      { veta: '"Everything is tied up in the business."', text: 'Apart from the house, everything is in the company. Let\'s build a second leg that won\'t collapse if the business hits a rough patch.', cta: 'Where is your wealth', href: '#druha-noha' },
      { veta: '"A large sum just arrived."', text: 'Inheritance, a sale, or a big bonus. First comes calm, then a plan.', cta: 'Let\'s talk it through', href: '/konzultace' },
      { veta: '"I want to pass it on to my children."', text: 'And do your children know how to handle money? Succession starts with rules, not with probate.', cta: 'Who inherits without a will', href: '#dedictvi' },
      { veta: '"Someone is offering me an investment."', text: 'Send it to me before you sign. Most offers that reach me end with one sentence: not this one.', cta: 'Send the offer', href: 'mailto:adamdvorak@financnistrateg.com?subject=Investment%20offer%20for%20review' },
      { veta: '"Retirement is getting close."', text: 'Is it enough? We\'ll work out how much the state provides, how much your money contributes, and what the gap is.', cta: 'Retirement calculator', href: '/?kalkulacka=duchod#calculators' },
    ] as { veta: string; text: string; cta: string; href: string }[],
    /* references */
    refs: [
      { text: 'We have been very happy with our collaboration so far. We appreciate the high professionalism, speed, flexibility and the ability to tailor solutions to our individual needs. The approach is precise and detail-oriented.', author: 'Denisa & Dalibor' },
      { text: 'I appreciate the personal approach. I know where I\'m headed and nothing is pushed or sold to me.', author: 'Radek' },
      { text: 'After the very first conversation and plan for the future, my wife and I felt a huge weight lift off our shoulders. We started living.', author: 'Miroslav' },
      { text: 'It is trust in a young person whose services my children will be able to use in the future. Investing requires a lot of work gathering information and making considered decisions. Since that is not what fulfils me right now, I am happy to leave it to the experts.', author: 'Daneš & family' },
    ] as { text: string; author: string }[],
  },
};
