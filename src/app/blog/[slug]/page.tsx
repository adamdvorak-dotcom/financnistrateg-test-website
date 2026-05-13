import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticle } from "../articles";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: `${article.title} — Adam Dvořák`,
    description: article.desc,
  };
}

function ArticleContent({ slug }: { slug: string }) {
  if (slug === "jak-efektivne-spravovat-sverenske-fondy") {
    return (
      <div className="article-body">
        <p>
          Svěřenský fond je právní nástroj, který umožňuje převedení majetku do fondu
          a jeho oddělení od ostatního osobního majetku. Takový fond se může využívat
          pro ochranu aktiv v případě dědictví, rozvodů nebo dlužních problémů.
        </p>
        <h2>1. Důkladné plánování</h2>
        <p>
          Prvním krokem je důkladné plánování s jasnou představou o správě majetku
          a výběru správce. Je nezbytné zvážit dlouhodobé cíle a zvolit vhodný právní
          rámec odpovídající vaší situaci a záměrům. Bez kvalitního plánu se svěřenský
          fond snadno stane administrativní zátěží místo nástrojem ochrany.
        </p>
        <h2>2. Výběr správce fondu</h2>
        <p>
          Druhým klíčovým aspektem je výběr správce fondu, který by měl mít dostatečné
          odborné znalosti v oblasti práva i financí. Důvěra a otevřená komunikace
          s manažerem jsou zásadní pro dlouhodobý úspěch celého uspořádání. Správce by
          měl být schopen reagovat na změny v legislativě i na vaše životní situace.
        </p>
        <h2>3. Pravidelné monitorování</h2>
        <p>
          Třetím prvkem je pravidelné monitorování vývoje fondu a přizpůsobování
          strategií aktuálním podmínkám. Průběžné revize plánu pomáhají maximalizovat
          výnosy a minimalizovat rizika spojená s vývojem trhu i legislativy. Doporučuji
          minimálně roční přezkum s vaším správcem a právním poradcem.
        </p>
        <h2>4. Vymezení obmyšlených</h2>
        <p>
          Čtvrtým důležitým prvkem je jasné vymezení obmyšlených — tedy osob, které
          budou mít prospěch z fondu. Přesná definice příjemců minimalizuje případné
          spory mezi dědici a zajišťuje, že majetek bude využit přesně tak, jak jste
          zamýšleli. Neurčitá formulace může vést k nákladným soudním sporům.
        </p>
        <h2>Závěr</h2>
        <p>
          Svěřenské fondy jsou mocným nástrojem pro správu a ochranu majetku.
          S pečlivým plánováním, správným výběrem správce a pravidelným monitorováním
          lze dosáhnout finanční stability a zabezpečení pro budoucí generace.
        </p>
        <p>
          Máte otázky ke svěřenským fondům nebo chcete probrat, zda je tento nástroj
          vhodný pro vaši situaci? Neváhejte mě kontaktovat — první konzultace je vždy
          zdarma.
        </p>
      </div>
    );
  }

  if (slug === "nejnovejsi-trendy-v-wealth-managementu-pro-podnikatele") {
    return (
      <div className="article-body">
        <p>
          Podnikatelé dnes čelí stále složitějšímu finančnímu prostředí. Nestačí jen
          vydělávat — klíčové je také efektivně spravovat vydělanné bohatství a investice.
          Moderní wealth management přináší přístupy, které ještě před deseti lety nebyly
          dostupné. Co jsou aktuální trendy a proč byste je měli sledovat?
        </p>
        <h2>Personalizovaný přístup</h2>
        <p>
          Doba, kdy správce majetku nabízel všem stejné portfolio, je pryč. Dnes vedoucí
          firmy i nezávislí poradci staví strategie přímo na míru — s ohledem na odvětví
          podnikání, fázi životního cyklu firmy, rodinnou situaci i osobní hodnoty klienta.
          Individuální přístup neznamená jen jiné rozložení aktiv, ale i odlišný způsob
          komunikace, reportingu a plánování.
        </p>
        <h2>Udržitelné investice (ESG)</h2>
        <p>
          Rostoucí počet podnikatelů hledá investice, které kombinují finanční výnosy
          s pozitivním dopadem na společnost a životní prostředí. ESG fondy (Environmental,
          Social, Governance) již nejsou jen módní vlnou — studie opakovaně ukazují, že
          dobře sestavené ESG portfolio nemusí zaostávat za tradičními přístupy a zároveň
          snižuje některá regulatorní a reputační rizika.
        </p>
        <h2>Digitální transformace správy portfolia</h2>
        <p>
          Online platformy a automatizované systémy umožňují podnikatelům sledovat
          a spravovat portfolio v reálném čase — odkudkoliv. Pokročilé nástroje nabízejí
          okamžitý přehled o výkonnosti, riziku a alokaci aktiv. To zkracuje reakční dobu
          na tržní změny a zvyšuje transparentnost celé správy.
        </p>
        <h2>Vzdělávání a finanční gramotnost</h2>
        <p>
          Kvalitní wealth management neznamená jen správu peněz za klienta — zahrnuje
          i jeho vzdělávání. Poradci, kteří investují čas do vysvětlování strategií,
          rizik a příležitostí, budují silnější a důvěryhodnější vztah. Informovaný klient
          dělá lepší rozhodnutí a méně podléhá panice při výkyvech trhu.
        </p>
        <h2>Závěr</h2>
        <p>
          Wealth management pro podnikatele se rychle vyvíjí. Personalizace, udržitelnost,
          digitalizace a vzdělávání — to jsou čtyři pilíře, které definují moderní přístup
          ke správě majetku. Pokud chcete zjistit, jak tyto trendy aplikovat ve vaší
          konkrétní situaci, rád se s vámi setkám na nezávazné konzultaci.
        </p>
      </div>
    );
  }

  if (slug === "fixace-hypoteky-jak-se-rozhodnout") {
    return (
      <div className="article-body">
        <p>
          Jedním z prvních rozhodnutí při sjednávání hypotéky je délka fixace úrokové
          sazby. Jde o období, po které banka garantuje neměnnost vaší sazby — a tedy
          i výše měsíční splátky. Správná volba může za dobu splácení ušetřit statisíce
          korun.
        </p>
        <h2>Krátká fixace (3 roky)</h2>
        <p>
          Tříletá fixace bývá nejlevnější z hlediska aktuální úrokové sazby. Je vhodná
          tehdy, když očekáváte, že sazby v budoucnu klesnou — nebo když plánujete
          nemovitost prodat či hypotéku předčasně splatit. Nevýhodou je nejistota:
          po třech letech se sazba přenastaví na tržní podmínky, které mohou být
          výrazně horší.
        </p>
        <h2>Střední fixace (5 let)</h2>
        <p>
          Pětiletá fixace je v Česku historicky nejoblíbenější a pro většinu klientů
          představuje rozumný kompromis. Nabízí dostatečnou stabilitu pro rodinný
          rozpočet a zároveň nezamkne vaši hypotéku na příliš dlouhou dobu. Po pěti
          letech máte možnost refinancovat nebo upravit podmínky podle aktuální situace.
        </p>
        <h2>Dlouhá fixace (10 let)</h2>
        <p>
          Desetiletá fixace poskytuje maximální jistotu — splátka zůstane stejná bez
          ohledu na vývoj trhu. To oceníte především ve výkyvných obdobích. Banky ji
          ale zpravidla nabízejí za vyšší sazbu a výrazně omezují možnost předčasného
          splacení bez sankcí. Hodí se pro konzervativní klienty s dlouhodobou stabilitou
          příjmů a bez plánů na změnu nemovitosti.
        </p>
        <h2>Jak se rozhodnout?</h2>
        <p>
          Při výběru délky fixace berte v úvahu čtyři klíčové faktory: aktuální výši
          sazeb a jejich očekávaný vývoj, vaše životní plány v horizontu 5–10 let,
          toleranci vůči finančnímu riziku a potřebu flexibility (stěhování, refinancování,
          předčasné splacení).
        </p>
        <p>
          Obecně platí: čím více jistoty potřebujete, tím delší fixace dává smysl.
          Čím více flexibility chcete zachovat, tím kratší fixace je vhodnější.
        </p>
        <h2>Závěr</h2>
        <p>
          Neexistuje univerzálně správná odpověď — záleží na vaší konkrétní situaci.
          Před podpisem smlouvy vždy doporučuji srovnat nabídky více bank a projít
          si scénáře, co by se stalo, kdyby sazby po skončení fixace vzrostly o 2–3 %.
          Pokud si nejste jisti, rád vám s výběrem pomohu.
        </p>
      </div>
    );
  }

  if (slug === "jak-se-pocita-duchod-v-cr") {
    return (
      <div className="article-body">
        <p>
          Většina lidí tuší, že důchod nějak závisí na tom, kolik let pracovali a kolik vydělávali.
          Málokdo ale ví přesně, jak ten výpočet funguje — a co se dá ještě udělat, aby výsledek
          byl lepší. Přitom stačí znát pár čísel a vědět, kde se podívat.
        </p>
        <p>
          Tohle není akademický rozbor zákona. Je to praktický přehled pro každého, kdo se
          blíží padesátce nebo koho prostě zajímá, na co reálně může počítat.
        </p>

        <h2>Jak je důchod složen</h2>
        <p>
          Starobní důchod v Česku tvoří dvě složky. První je <strong>základní výměra</strong> — pevná částka
          4 900 Kč, kterou dostane každý bez ohledu na to, kolik vydělával. Druhá je
          <strong> procentní výměra</strong>, která se počítá individuálně a tvoří hlavní část důchodu.
        </p>
        <p>
          Procentní výměra závisí na třech věcech: na výši vašich příjmů za celou kariéru,
          na počtu odpracovaných let a na redukčních hranicích, které ČSSZ každý rok upravuje.
        </p>

        <h2>Osobní vyměřovací základ: co to je a proč na něm záleží</h2>
        <p>
          Základem výpočtu je tzv. <strong>osobní vyměřovací základ (OVZ)</strong> — zjednodušeně řečeno průměr
          vašich hrubých příjmů od roku 1986, přepočtených na dnešní hodnotu pomocí koeficientů.
          Čím vyšší byl váš příjem v produktivních letech, tím vyšší bude OVZ — a tím vyšší důchod.
        </p>
        <p>
          Jenže systém není lineární. Platí redukční hranice, které vyšší příjmy
          znevýhodňují. V roce 2026 to vypadá takto:
        </p>
        <p>
          Do 21 546 Kč se do výpočtu počítá 99 % příjmu. Mezi 21 546 Kč a 195 868 Kč
          jen 26 %. Nad tuto hranici se příjem do důchodu nepočítá vůbec.
        </p>
        <p>
          Prakticky to znamená, že manažer s platem 150 000 Kč měsíčně nebude mít
          důchod šestkrát vyšší než člověk s platem 25 000 Kč. Bude ho mít vyšší, ale
          rozdíl bude překvapivě malý.
        </p>

        <h2>Kolik přidá každý rok práce</h2>
        <p>
          Za každý odpracovaný rok se důchod zvyšuje o <strong>1,495 % OVZ</strong>. Kdo pracoval
          40 let, má zásluhovou složku 40 × 1,495 % = přibližně 59,8 % svého OVZ.
          Kdo pracoval jen 30 let, má o 10 × 1,495 % méně — v absolutních číslech to
          může být v průměrných příjmech klidně 2–4 tisíce korun měsíčně.
        </p>
        <p>
          A to je přesně ta suma, která v kalkulačce důchodu vychází: každý chybějící
          rok pojištění ubere z výsledného důchodu průměrně kolem 480 Kč měsíčně.
          Za celý důchod — při průměrné délce dožití — jde o statisíce korun.
        </p>

        <h2>Co se do odpracovaných let počítá a co ne</h2>
        <p>
          Do doby pojištění se kromě zaměstnání počítají i tzv. <strong>náhradní doby</strong> —
          péče o dítě do 4 let věku, evidence na úřadu práce (do určité délky),
          pobírání invalidního důchodu, vojenská služba nebo dlouhodobá nemoc.
          Tyto doby se ale nepočítají plně — jen z části, nebo vůbec nezakládají
          nárok na zásluhovou složku.
        </p>
        <p>
          Co se do důchodu naopak <strong>nepočítá vůbec</strong>: brigády na DPP bez odvodu
          pojistného. Od roku 2026 platí nové limity pro dohody o provedení práce.
          Pokud jste část kariéry pracovali jen na DPP pod limit pro odvod pojistného,
          tato období ve výpočtu důchodu jednoduše neexistují.
        </p>

        <h2>Jak legálně svůj důchod zvýšit</h2>
        <p>
          Nejdříve si ověřte, co ČSSZ o vás skutečně ví. Na ePortálu ČSSZ
          (eportal.cssz.cz) si bezplatně stáhnete výpis odpracovaných let
          a evidovaných příjmů. Chyby se stávají — zaměstnavatel zapomněl podat
          přehled, firma zanikla bez předání dokladů, evidence je neúplná.
          Každá taková chyba se dá zpětně opravit, ale čím déle čekáte, tím
          obtížněji se prokazuje.
        </p>
        <p>
          Druhá věc: <strong>přesluhování</strong>. Pokud pracujete i po dosažení
          důchodového věku a důchod si zatím nevyberete, za každých 90 dní
          navíc se zásluhová složka zvýší o 1,5 %. Kdo přeslouží dva roky,
          získá navíc 12 % OVZ — to mohou být tisíce korun měsíčně až do konce života.
        </p>
        <p>
          Třetí cesta vede přes <strong>DIP — Dlouhodobý investiční produkt</strong>.
          Jde o nástroj, který od roku 2024 umožňuje odečíst si z daňového
          základu až 48 000 Kč ročně za investice do akcií nebo ETF fondů
          v rámci regulovaného účtu. Oproti penzijnímu spoření máte výrazně
          větší svobodu v tom, do čeho investujete.
        </p>

        <h2>Proč státní důchod nestačí jako plán</h2>
        <p>
          Průměrný důchod v Česku je dnes 21 840 Kč měsíčně. Pro většinu lidí
          to představuje výrazný pokles oproti příjmům v produktivním věku.
          Systém je navíc průběžný — dnešní pracující platí dnešním důchodcům.
          Při demografickém vývoji v Česku je zřejmé, že poměr přispívajících
          ku příjemcům se bude dál zhoršovat.
        </p>
        <p>
          Státní důchod je záchranná síť. Není to plán.
        </p>
        <p>
          Plán je vědět, kolik budete mít ze státu, kolik z vlastních úspor
          a z čeho budete čerpat jako první — a v jakém pořadí. To je přesně
          to, co v rámci přípravy na důchod s klienty stavíme.
        </p>
        <p>
          Pokud chcete vědět, jak na tom reálně jste, začněte naší kalkulačkou
          důchodu na hlavní stránce. A pokud výsledek vypadá jinak, než jste
          čekali — ozvěte se.
        </p>
      </div>
    );
  }

  if (slug === "penzijni-sporeni-vs-investice") {
    return (
      <div className="article-body">
        <p>
          Otázka „spoření nebo investice na důchod?" patří k nejčastějším, které se mě
          klienti ptají. Obě cesty mají svá specifika a nejlepší řešení závisí na vaší
          situaci, věku a finančních cílech.
        </p>
        <h2>Třetí pilíř — penzijní spoření</h2>
        <p>
          Účastnické fondy (dříve penzijní připojištění) fungují díky kombinaci vašich
          příspěvků, státní podpory a případného příspěvku zaměstnavatele. Stát přispívá
          až 340 Kč měsíčně při vkladu 1 700 Kč. Navíc si od daňového základu lze odečíst
          příspěvky přesahující 1 700 Kč měsíčně — až 48 000 Kč ročně.
        </p>
        <p>
          Nevýhodou je omezená likvidita: peníze jsou dostupné zpravidla až v 60 letech
          a výnosy konzervativních fondů bývají nízké — často nepřekonají ani inflaci.
        </p>
        <h2>Vlastní investiční portfolio</h2>
        <p>
          Alternativou je pravidelné investování do ETF fondů nebo podílových fondů
          na vlastní účet. Historické výnosy globálně diverzifikovaných ETF se pohybují
          kolem 7–10 % ročně (před inflací). Peníze jsou kdykoliv dostupné a portfolio
          si přizpůsobíte přesně svým potřebám.
        </p>
        <p>
          Na druhé straně neprofitujete ze státní podpory a musíte být připraveni
          překonat psychicky těžší období poklesů — bez institucionálního „jistícího
          mechanismu."
        </p>
        <h2>Kombinace jako nejlepší přístup</h2>
        <p>
          Pro většinu klientů doporučuji kombinaci obou přístupů. Třetí pilíř využijte
          alespoň do výše příspěvku 1 700 Kč měsíčně — státní podpora je zaručený
          výnos, který žádná investice nenahradí. Zbytek volných prostředků pak
          investujte do diverzifikovaného portfolia s vyšším výnosovým potenciálem.
        </p>
        <h2>Závěr</h2>
        <p>
          Čím dříve začnete, tím lépe. Složený úrok pracuje nejlépe v dlouhém horizontu
          a i malé měsíční částky mohou po 20–30 letech tvořit zásadní rozdíl. Pokud
          nevíte, kde začít, nebo chcete nastavit strategii na míru, ozvěte se — rád
          vám pomohu sestavit konkrétní plán.
        </p>
      </div>
    );
  }

  return null;
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <>
      {/* ── Nav ── */}
      <nav>
        <div className="container nav-inner">
          <Link href="/" className="nav-logo">
            <span className="nav-logo-name">Adam Dvořák</span><span className="nav-logo-efa">, EFA</span>
          </Link>
          <div className="nav-right" style={{ gap: 10 }}>
            <Link href="/blog" className="btn-ghost" style={{ fontSize: 14 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
              <span>Všechny články</span>
            </Link>
            <Link href="/" className="btn-primary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
              <span>Zpět na web</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Article ── */}
      <main className="article-wrap">
        <div className="container">
          <div className="article-inner">
            <header className="article-header">
              <div className="article-tag">{article.tag}</div>
              <h1 className="article-title">{article.title}</h1>
              <div className="article-meta">
                <span>{article.author}</span>
                <span className="article-meta-dot">·</span>
                <span>{article.date}</span>
                {article.updated && (
                  <>
                    <span className="article-meta-dot">·</span>
                    <span>Aktualizováno {article.updated}</span>
                  </>
                )}
              </div>
            </header>

            <ArticleContent slug={slug} />

            <div className="article-cta">
              <div className="article-cta-text">
                <div className="section-eyebrow" style={{ marginBottom: 8 }}>Konzultace</div>
                <p>Chcete toto téma probrat osobně? První konzultace je zdarma a bez závazků.</p>
              </div>
              <Link href="/#contact" className="btn-primary">
                <span>Sjednat konzultaci</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer>
        <div className="container footer-inner">
          <div className="footer-logo">Adam <span>Dvořák</span> · <span>Finanční Stratég</span></div>
          <div className="footer-copy">© 2026 Adam Dvořák, EFA. <span>Registrován u ČNB.</span></div>
          <div className="footer-links">
            <Link href="/">Hlavní stránka</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/#contact">Kontakt</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
