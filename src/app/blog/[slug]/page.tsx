import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticle } from "../articles";
import { DipKalk } from "../DipKalk";
import { PenzijkoKalk } from "../PenzijkoKalk";
import { SverenskyFond } from "../SverenskyFond";
import { AudioPlayer } from "../AudioPlayer";
import { HoldingDiag } from "../HoldingDiag";
import { EtfKalk } from "../EtfKalk";

const CATEGORY_LABELS: Record<string, string> = {
  "rodinny-majetek": "Rodinný majetek",
  "investice": "Investice",
  "strategie": "Strategie",
  "financovani": "Financování",
  "duchod": "Důchod",
};

const CATEGORY_IDS = Object.keys(CATEGORY_LABELS);

export function generateStaticParams() {
  return [
    ...articles.map((a) => ({ slug: a.slug })),
    ...CATEGORY_IDS.map((id) => ({ slug: id })),
  ];
}

const BASE = "https://www.financnistrateg.com";

const CZECH_MONTHS: Record<string, string> = {
  ledna: "01", února: "02", března: "03", dubna: "04",
  května: "05", června: "06", července: "07", srpna: "08",
  září: "09", října: "10", listopadu: "11", prosince: "12",
};

function czechDateToISO(d: string): string {
  const parts = d.replace(".", "").trim().split(/\s+/);
  return `${parts[2]}-${CZECH_MONTHS[parts[1]] ?? "01"}-${parts[0].padStart(2, "0")}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (CATEGORY_LABELS[slug]) {
    return {
      title: `${CATEGORY_LABELS[slug]} · Blog`,
      alternates: { canonical: `${BASE}/blog/${slug}` },
    };
  }
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: { absolute: article.title },
    description: article.desc,
    alternates: { canonical: `${BASE}/blog/${slug}` },
    openGraph: {
      title: article.title,
      description: article.desc,
      url: `${BASE}/blog/${slug}`,
      siteName: "Finanční Stratég",
      locale: "cs_CZ",
      type: "article",
      authors: [article.author],
      images: [
        {
          url: "/adam-dvorak-hero.jpg",
          width: 1200,
          height: 800,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.desc,
      images: ["/adam-dvorak-hero.jpg"],
    },
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
        <SverenskyFond />
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
          Čtvrtým důležitým prvkem je jasné vymezení obmyšlených, tedy osob, které
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
          vhodný pro vaši situaci? Neváhejte mě kontaktovat . První konzultace je vždy
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
          vydělávat, klíčové je také efektivně spravovat vydělanné bohatství a investice.
          Moderní wealth management přináší přístupy, které ještě před deseti lety nebyly
          dostupné. Co jsou aktuální trendy a proč byste je měli sledovat?
        </p>
        <h2>Personalizovaný přístup</h2>
        <p>
          Doba, kdy správce majetku nabízel všem stejné portfolio, je pryč. Dnes vedoucí
          firmy i nezávislí poradci staví strategie přímo na míru, s ohledem na odvětví
          podnikání, fázi životního cyklu firmy, rodinnou situaci i osobní hodnoty klienta.
          Individuální přístup neznamená jen jiné rozložení aktiv, ale i odlišný způsob
          komunikace, reportingu a plánování.
        </p>
        <h2>Udržitelné investice (ESG)</h2>
        <p>
          Rostoucí počet podnikatelů hledá investice, které kombinují finanční výnosy
          s pozitivním dopadem na společnost a životní prostředí. ESG fondy (Environmental,
          Social, Governance) již nejsou jen módní vlnou, studie opakovaně ukazují, že
          dobře sestavené ESG portfolio nemusí zaostávat za tradičními přístupy a zároveň
          snižuje některá regulatorní a reputační rizika.
        </p>
        <h2>Digitální transformace správy portfolia</h2>
        <p>
          Online platformy a automatizované systémy umožňují podnikatelům sledovat
          a spravovat portfolio v reálném čase, odkudkoliv. Pokročilé nástroje nabízejí
          okamžitý přehled o výkonnosti, riziku a alokaci aktiv. To zkracuje reakční dobu
          na tržní změny a zvyšuje transparentnost celé správy.
        </p>
        <h2>Vzdělávání a finanční gramotnost</h2>
        <p>
          Kvalitní wealth management neznamená jen správu peněz za klienta, zahrnuje
          i jeho vzdělávání. Poradci, kteří investují čas do vysvětlování strategií,
          rizik a příležitostí, budují silnější a důvěryhodnější vztah. Informovaný klient
          dělá lepší rozhodnutí a méně podléhá panice při výkyvech trhu.
        </p>
        <h2>Závěr</h2>
        <p>
          Wealth management pro podnikatele se rychle vyvíjí. Personalizace, udržitelnost,
          digitalizace a vzdělávání . To jsou čtyři pilíře, které definují moderní přístup
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
          sazby. Jde o období, po které banka garantuje neměnnost vaší sazby, a tedy
          i výše měsíční splátky. Správná volba může za dobu splácení ušetřit statisíce
          korun.
        </p>
        <h2>Krátká fixace (3 roky)</h2>
        <p>
          Tříletá fixace bývá nejlevnější z hlediska aktuální úrokové sazby. Je vhodná
          tehdy, když očekáváte, že sazby v budoucnu klesnou, nebo když plánujete
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
          Desetiletá fixace poskytuje maximální jistotu, splátka zůstane stejná bez
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
          Neexistuje univerzálně správná odpověď, záleží na vaší konkrétní situaci.
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
          Málokdo ale ví přesně, jak ten výpočet funguje, a co se dá ještě udělat, aby výsledek
          byl lepší. Přitom stačí znát pár čísel a vědět, kde se podívat.
        </p>
        <p>
          Tohle není akademický rozbor zákona. Je to praktický přehled pro každého, kdo se
          blíží padesátce nebo koho prostě zajímá, na co reálně může počítat.
        </p>

        <h2>Jak je důchod složen</h2>
        <p>
          Starobní důchod v Česku tvoří dvě složky. První je <strong>základní výměra</strong>: pevná částka
          4 900 Kč, kterou dostane každý bez ohledu na to, kolik vydělával. Druhá je
          <strong> procentní výměra</strong>, která se počítá individuálně a tvoří hlavní část důchodu.
        </p>
        <p>
          Procentní výměra závisí na třech věcech: na výši vašich příjmů za celou kariéru,
          na počtu odpracovaných let a na redukčních hranicích, které ČSSZ každý rok upravuje.
        </p>

        <h2>Osobní vyměřovací základ: co to je a proč na něm záleží</h2>
        <p>
          Základem výpočtu je tzv. <strong>osobní vyměřovací základ (OVZ)</strong>: zjednodušeně řečeno průměr
          vašich hrubých příjmů od roku 1986, přepočtených na dnešní hodnotu pomocí koeficientů.
          Čím vyšší byl váš příjem v produktivních letech, tím vyšší bude OVZ, a tím vyšší důchod.
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
          Kdo pracoval jen 30 let, má o 10 × 1,495 % méně, v absolutních číslech to
          může být v průměrných příjmech klidně 2–4 tisíce korun měsíčně.
        </p>
        <p>
          A to je přesně ta suma, která v kalkulačce důchodu vychází: každý chybějící
          rok pojištění ubere z výsledného důchodu průměrně kolem 480 Kč měsíčně.
          Za celý důchod (při průměrné délce dožití) jde o statisíce korun.
        </p>

        <h2>Co se do odpracovaných let počítá a co ne</h2>
        <p>
          Do doby pojištění se kromě zaměstnání počítají i tzv. <strong>náhradní doby</strong>:
          péče o dítě do 4 let věku, evidence na úřadu práce (do určité délky),
          pobírání invalidního důchodu, vojenská služba nebo dlouhodobá nemoc.
          Tyto doby se ale nepočítají plně, jen z části, nebo vůbec nezakládají
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
          a evidovaných příjmů. Chyby se stávají, zaměstnavatel zapomněl podat
          přehled, firma zanikla bez předání dokladů, evidence je neúplná.
          Každá taková chyba se dá zpětně opravit, ale čím déle čekáte, tím
          obtížněji se prokazuje.
        </p>
        <p>
          Druhá věc: <strong>přesluhování</strong>. Pokud pracujete i po dosažení
          důchodového věku a důchod si zatím nevyberete, za každých 90 dní
          navíc se zásluhová složka zvýší o 1,5 %. Kdo přeslouží dva roky,
          získá navíc 12 % OVZ, to mohou být tisíce korun měsíčně až do konce života.
        </p>
        <p>
          Třetí cesta vede přes <strong>DIP (Dlouhodobý investiční produkt)</strong>.
          Jde o nástroj, který od roku 2024 umožňuje odečíst si z daňového
          základu až 48 000 Kč ročně za investice do akcií nebo ETF fondů
          v rámci regulovaného účtu. Oproti penzijnímu spoření máte výrazně
          větší svobodu v tom, do čeho investujete.
        </p>

        <h2>Proč státní důchod nestačí jako plán</h2>
        <p>
          Průměrný důchod v Česku je dnes 21 840 Kč měsíčně. Pro většinu lidí
          to představuje výrazný pokles oproti příjmům v produktivním věku.
          Systém je navíc průběžný, dnešní pracující platí dnešním důchodcům.
          Při demografickém vývoji v Česku je zřejmé, že poměr přispívajících
          ku příjemcům se bude dál zhoršovat.
        </p>
        <p>
          Státní důchod je záchranná síť. Není to plán.
        </p>
        <p>
          Plán je vědět, kolik budete mít ze státu, kolik z vlastních úspor
          a z čeho budete čerpat jako první, a v jakém pořadí. To je přesně
          to, co v rámci přípravy na důchod s klienty stavíme.
        </p>
        <p>
          Pokud chcete vědět, jak na tom reálně jste, začněte naší kalkulačkou
          důchodu na hlavní stránce. A pokud výsledek vypadá jinak, než jste
          čekali, ozvěte se.
        </p>
      </div>
    );
  }

  if (slug === "jak-investovat-do-etf") {
    return (
      <div className="article-body">
        <p>
          Výběr jednotlivých akcií je hra, ve které prohrává přes 80 % profesionálních správců fondů.
          Ne proto, že jsou hloupí, ale proto, že trh je efektivní a informace se rychle promítají
          do cen. Existuje jednodušší cesta: koupit celý trh najednou prostřednictvím ETF
          a nechat složený úrok pracovat za vás.
        </p>

        <h2>Co je ETF a proč funguje</h2>
        <p>
          ETF (Exchange Traded Fund) je fond obchodovaný na burze, který kopíruje vývoj indexu, například globálního akciového indexu zahrnujícího tisíce firem z celého světa najednou.
          Roční správcovský poplatek globálních indexových ETF se typicky pohybuje okolo 0,07–0,22 %.
          Srovnejte to s aktivně spravovanými podílovými fondy, kde bývá poplatek 1,5–2,5 %
          ročně, přičemž výkonnost přesto ve většině případů zaostává za trhem.
        </p>
        <p>
          Matematika je neúprosná: investujete-li 5 000 Kč měsíčně po dobu 30 let s průměrným
          výnosem 7 % p.a., rozdíl mezi poplatkem 0,20 % a 2 % představuje více než 1 500 000 Kč.
          To nejsou procenta, to jsou peníze.
        </p>

        <h2>Daňové výhody v Česku</h2>
        <p>
          Česká daňová pravidla pro ETF jsou jedny z nejpříznivějších v Evropě, pokud víte,
          jak je využít. Základní nástroj je <strong>časový test tří let</strong>: prodáte-li
          investici nejdříve tři roky po nákupu, zisk z prodeje je osvobozen od daně z příjmů.
          Přesná aplikace závisí na vaší situaci a doporučuji ji konzultovat s daňovým poradcem. Pravidla se mění a detaily záleží.
        </p>

        <h2>Než začnete: horizont a plán jsou základ</h2>
        <p>
          ETF investování není loterie ani rychlé zbohatnutí. Je to nástroj vhodný pro lidi,
          kteří <strong>vědí, kdy peníze budou potřebovat</strong>, a jsou připraveni, že do té
          doby mohou být dočasně v minusu.
        </p>
        <p>
          Trhy klesají. Někdy o 20 %, někdy o 40 %. Kdo investuje peníze, které potřebuje
          za rok, riskuje, že bude nucen prodávat se ztrátou. Kdo investuje s horizontem
          10–20 let a má pokryté krátkodobé výdaje jinde, může propady přečkat a nechat
          portfolio se zotavit. Investiční horizont není doporučení, je to nutná podmínka.
        </p>
        <p>
          Tento článek je vzdělávací a nepředstavuje investiční doporučení. Konkrétní
          rozhodnutí (jaké ETF, u jakého brokera, v jaké výši a v jakém poměru) závisí
          na vaší osobní situaci, toleranci rizika a finančním plánu. Pokud si nejste jisti,
          obraťte se na regulovaného investičního poradce.
        </p>

        <h2>Jak funguje pravidelné investování</h2>
        <p>
          Nejúčinnějším přístupem pro většinu investorů je <strong>pravidelný nákup
          stejné částky</strong> v pevném intervalu, například měsíčně. Tento přístup
          se nazývá průměrování nákladů (cost averaging): kupujete více podílů,
          když jsou ceny nízké, méně když jsou vysoké. Výsledná průměrná nákupní cena
          je nižší než průměrná cena za sledované období.
        </p>
        <p>
          Efektem je eliminace rizika špatného načasování, největší paralýzy, kterou
          investoři zažívají. „Teď je příliš draho." „Počkám na propad." „Až bude
          situace jasnější." Pravidelný plán tyto mentální pasti obchází automaticky.
        </p>

        <h2>Tři chyby, které investory nejvíce stojí</h2>
        <p>
          <strong>Prodávat při poklesu trhu.</strong> Pokles není varování, je to sleva.
          Kdo prodá v propadu a počká na „lepší časy", nejčastěji nakoupí zpět výše,
          než kde prodával. Historicky se trhy vždy zotavily, ale kdo vyskočil, ten
          zotavení nestihl.
        </p>
        <p>
          <strong>Přehnaná diverzifikace.</strong> Deset různých ETF z podobných indexů
          není diverzifikace, je to zbytečná složitost a vyšší administrativní zátěž.
          Diverzifikace znamená různé třídy aktiv a geografie, ne množství produktů.
        </p>
        <p>
          <strong>Čekat na správný moment.</strong> Nejlepší čas začít investovat byl
          před deseti lety. Druhý nejlepší je dnes, ale pouze tehdy, kdy máte
          pokrytou likvidní rezervu, jasný horizont a plán, který dokážete dodržet
          i když trh klesne o třetinu.
        </p>
      </div>
    );
  }

  if (slug === "dip-dlouhodoby-investicni-produkt") {
    return (
      <div className="article-body">
        <p>
          Stát od roku 2024 nabízí daňový odpočet na investování do akcií a ETF. Nejde o
          produkt s garantovaným výnosem 2 % jako penzijní spoření, jde o plnohodnotný
          investiční účet, kde sami rozhodujete, co koupíte. A kde vám stát ročně vrátí
          až 7 200 Kč na daních.
        </p>

        <h2>Co přesně DIP je</h2>
        <p>
          Dlouhodobý investiční produkt (DIP) je regulovaný investiční účet zavedený od
          1. 1. 2024. Funguje podobně jako britský ISA nebo německý Depot, investujete
          do akcií, ETF nebo podílových fondů, přičemž příspěvky si odečítáte z daňového
          základu. Na rozdíl od penzijního spoření nejste omezeni konzervativními fondy
          s nízkými výnosy.
        </p>

        <h2>Kolik ušetříte na daních</h2>
        <p>
          Roční limit daňového odpočtu je <strong>48 000 Kč</strong> (tj. 4 000 Kč měsíčně).
          Daňová úspora závisí na vaší sazbě daně z příjmů:
        </p>
        <DipKalk />
        <p>
          Pozor: limit 48 000 Kč je sdílený s penzijním spořením a životním pojištěním.
          Pokud příspíváte 2 000 Kč měsíčně do penzijka (24 000 Kč/rok), zbývá vám
          24 000 Kč prostoru pro DIP.
        </p>

        <h2>Příspěvek zaměstnavatele: přehlížená výhoda</h2>
        <p>
          Zaměstnavatel může přispívat do DIP až <strong>50 000 Kč ročně</strong> a tento
          příspěvek je zcela osvobozen od daně z příjmů, sociálního i zdravotního pojištění, jak na straně zaměstnavatele, tak zaměstnance. Jde o jednu z mála legálních cest,
          jak dostat benefity bez odvodů.
        </p>
        <p>
          Pokud vám zaměstnavatel přispívá do penzijního spoření, stojí za to iniciovat
          rozhovor o přesunu (nebo přidání) příspěvku do DIP, potenciální výnosy jsou
          historicky výrazně vyšší.
        </p>

        <h2>Pravidlo 120/60: podmínky pro zachování výhod</h2>
        <p>
          Aby jste o daňový odpočet nepřišli, musí být splněny dvě podmínky zároveň:
          produkt musí trvat minimálně <strong>10 let</strong> (120 měsíců) a výběr
          nesmí proběhnout před dosažením věku <strong>60 let</strong>. Porušení
          kterékoliv podmínky znamená vrácení všech uplatněných odpočtů navýšených
          o úrok z prodlení.
        </p>
        <p>
          Od 1. 1. 2025 platí, že přenesete-li DIP k jinému poskytovateli, původní
          lhůta se zachovává, nejste tedy „uvězněni" u jedné instituce.
        </p>

        <h2>Co v DIP koupit</h2>
        <p>
          Dostupné instrumenty: akcie, ETF, podílové fondy, bez konzervativních omezení.
          Doporučuji globální akumulační ETF (VWCE nebo IWDA), které reinvestují dividendy
          a maximálně využívají složený úrok v dlouhém horizontu. Neplaťte poplatky za
          aktivní správu, pokud to nepotřebujete.
        </p>

        <h2>DIP vs. penzijní spoření: kdo vyhraje?</h2>
        <p>
          Penzijní spoření má státní příspěvek (až 340 Kč/měsíc při vkladu 1 700 Kč)
          a je bezpečnější, garantovaný nezáporný výnos. DIP nemá státní příspěvek,
          ale historicky výrazně vyšší výnos: globální akcie průměrně 7–10 % p.a. oproti
          2–4 % u penzijních fondů. Ideální kombinace pro většinu lidí: penzijní spoření
          do 1 700 Kč/měsíc (pro státní příspěvek), zbytek do DIP.
        </p>

        <h2>Kde DIP otevřít</h2>
        <p>
          V současné době nabízejí DIP mimo jiné Raiffeisenbank, MONETA Bank, Patria Finance
          a iFund.cz. Nabídka se rozrůstá. Před výběrem porovnejte: roční poplatky za správu
          účtu, dostupné instrumenty a minimální výši příspěvku. Podmínky se liší.
        </p>
      </div>
    );
  }

  if (slug === "financni-poduska-jak-ji-spravne-nastavit") {
    return (
      <div className="article-body">
        <p>
          „Mějte tří měsíční rezervu." Tuto radu slýcháte všude, ale málokdo dodá,
          kde přesně ji mít. Přitom na tom záleží. Peníze na běžném účtu s nulovým
          úrokem při inflaci 3 % reálně každý rok ztrácejí hodnotu. Zároveň mít
          vše v investicích bez likvidní rezervy je recept na prodávání akcií ve
          špatnou chvíli.
        </p>

        <h2>Třívrstvý systém: každá vrstva slouží jinému účelu</h2>
        <p>
          <strong>Vrstva 1: Okamžitá likvidita (1 měsíc výdajů):</strong> Běžný účet,
          dostupný okamžitě. Slouží na nečekané faktury, krátkodobé výpadky příjmu
          nebo drobné opravy. Zde nehledáte výnos, hledáte dostupnost.
        </p>
        <p>
          <strong>Vrstva 2: Krátkodobá rezerva (2–3 měsíce výdajů):</strong> Spořicí
          účet nebo spořicí stavební spoření s výnosem 3,5–4,3 % p.a. V roce 2026 takové
          sazby nabízí Fio banka, Air Bank, MONETA a další. Peníze jsou dostupné
          do 7 dnů. Tato vrstva pokryje ztrátu zaměstnání, větší opravu auta nebo
          zdravotní výdaje.
        </p>
        <p>
          <strong>Vrstva 3: Střednědobá rezerva (volitelná, 1–3 měsíce navíc):</strong>
          Peněžní fond nebo krátký dluhopisový ETF. Výnos okolo 4–4,5 % p.a., dostupné
          do 2–3 týdnů. Vhodné pro OSVČ, podnikatele s nepravidelnými příjmy nebo
          jednorodičovské domácnosti, kde výpadek jednoho příjmu zasáhne celý provoz.
        </p>

        <h2>Jak velká má být vaše rezerva</h2>
        <p>
          Počítejte výdaje, ne příjmy. Kolik skutečně potřebujete měsíčně na bydlení,
          jídlo, splátky, energie a základní provoz?
        </p>
        <ul>
          <li>Zaměstnanec na stabilní pozici: <strong>3 měsíce</strong> výdajů</li>
          <li>Zaměstnanec ve zkušební době nebo s variabilní složkou: <strong>4–5 měsíců</strong></li>
          <li>OSVČ, podnikatelé, jednorodičovské domácnosti: <strong>6 měsíců</strong></li>
          <li>Domácnost s hypotékou a jedním příjmem: <strong>6 měsíců</strong> minimum</li>
        </ul>

        <h2>Dvě chyby, které lidi nejvíce stojí</h2>
        <p>
          <strong>Příliš málo rezervy:</strong> Bez polštáře budete nuceni prodávat investice
          v nejhorší možnou chvíli, při poklesu trhu. Průměrný medvědí trh znamená pokles
          o 30–50 %. Prodat tehdy neznamená jen ztrátu v danou chvíli, přijdete o celé
          budoucí zhodnocení těch peněz.
        </p>
        <p>
          <strong>Příliš mnoho rezervy:</strong> 12 měsíčních výdajů na spořicím účtu
          je zbytečné. Rozdíl mezi 3 a 9 měsíci rezervy (řekněme 300 000 Kč navíc)
          investovaných po dobu 20 let při 7 % p.a. představuje více než 1 160 000 Kč
          rozdíl ve výsledném portfoliu.
        </p>

        <h2>Kde konkrétně rezervu uložit (2026)</h2>
        <p>
          Pro vrstvu 2 hledejte spořicí účty s výnosem nad 3,5 % bez povinných podmínek.
          Srovnávejte na bankovních srovnávačích nebo přímo na webech bank . Sazby se
          mění a to, co bylo nejlepší loni, nemusí platit dnes.
        </p>
        <p>
          Pro vrstvu 3 jsou vhodné peněžní fondy (Conseq, ČS Fondy, Raiffeisen) nebo
          krátké dluhopisové ETF. Vyhněte se stavebnímu spoření jako rezervě, šestileté
          výpovědní lhůty jsou pro nouzový fond nevhodné.
        </p>
      </div>
    );
  }

  if (slug === "danove-optimalizace-pro-osvc-a-jednatele") {
    return (
      <div className="article-body">
        <p>
          Zaměstnanec dostane výplatní pásku a daně jsou vyřešeny. OSVČ a jednatelé mají
          situaci složitější, ale zároveň výrazně více možností. Správnou kombinací nástrojů
          lze legálně ušetřit desítky až stovky tisíc korun ročně. Podmínkou je plánovat
          předem, ne v dubnu.
        </p>

        <h2>Pro OSVČ: paušální výdaje nebo skutečné?</h2>
        <p>
          Paušální výdaje nevyžadují doklady ani vedení účetnictví, automaticky snižují
          základ daně o pevné procento z příjmů. Sazby v roce 2026:
        </p>
        <ul>
          <li><strong>80 %</strong>, řemeslníci a živnostníci (max. 1 600 000 Kč výdajů)</li>
          <li><strong>60 %</strong>, ostatní živnosti a většina služeb (max. 1 200 000 Kč)</li>
          <li><strong>40 %</strong>, autoři, lékaři bez praxe, svobodná povolání (max. 800 000 Kč)</li>
          <li><strong>30 %</strong>, příjmy z nájmu (max. 600 000 Kč)</li>
        </ul>
        <p>
          Paušální výdaje se nevyplatí, máte-li reálné výdaje výrazně vyšší, firemní auto,
          zaměstnance, pronájem kanceláře, licence. V takovém případě vedete daňovou evidenci
          a uplatňujete skutečné výdaje.
        </p>

        <h2>Paušální daň: jedna platba místo tří</h2>
        <p>
          Paušální daň kombinuje daň z příjmů, sociální a zdravotní pojištění do jediné
          měsíční platby. Bez daňového přiznání, bez ročního vyúčtování, bez přeplatků.
          Pásma pro rok 2026:
        </p>
        <ul>
          <li>Pásmo 1 (příjmy do 1 000 000 Kč): <strong>9 984 Kč/měsíc</strong></li>
          <li>Pásmo 2 (příjmy do 1 500 000 Kč): <strong>16 745 Kč/měsíc</strong></li>
          <li>Pásmo 3 (příjmy do 2 000 000 Kč): <strong>27 139 Kč/měsíc</strong></li>
        </ul>
        <p>
          Zásadní omezení: v paušálním režimu <strong>nelze uplatňovat daňové odpočty</strong>:
          DIP, penzijní spoření, slevy na děti ani úroky z hypotéky. Pokud tyto odpočty
          máte, spočítejte si, co je výhodnější. Přihláška vždy do <strong>12. ledna</strong>
          daného roku, letos je termín pryč, přemýšlejte o změně od roku 2027.
        </p>

        <h2>Klíčové odpočty ze základu daně</h2>
        <p>
          Pro ty, kteří nejsou v paušálním režimu, jsou dostupné tyto odpočty:
        </p>
        <ul>
          <li><strong>DIP</strong> (Dlouhodobý investiční produkt): až 48 000 Kč/rok → úspora 7 200 Kč (nebo 11 040 Kč ve 23% pásmu)</li>
          <li><strong>Penzijní spoření a životní pojištění</strong>: sdílený limit 48 000 Kč/rok s DIP</li>
          <li><strong>Úroky z hypotéky</strong>: až 150 000 Kč/rok, ale pouze u smluv sjednaných do 31. 12. 2020</li>
          <li><strong>Dary</strong>: do výše 15 % ze základu daně</li>
        </ul>

        <h2>Jednatelé s.r.o.: plat nebo dividendy?</h2>
        <p>
          Dividendy ze s.r.o. se daní 15 % srážkovou daní, bez sociálního a zdravotního
          pojištění. Hrubý plat naopak podléhá dani z příjmů a celkovým odvodům okolo 48 %
          hrubé mzdy (zaměstnanec + zaměstnavatel dohromady). Z pohledu celkového zdanění
          jsou dividendy výrazně výhodnější.
        </p>
        <p>
          Optimální nastavení: minimální plat ve výši, která splňuje odvodové povinnosti
          a prokazuje reálný výkon manažerské práce, zbytek jako dividendy. Příliš nízký
          plat bez reálného zdůvodnění je riziko doměření ze strany finančního úřadu.
          S.r.o. se vyplatí při ročních příjmech zpravidla od 1–1,5 milionu Kč výše.
        </p>

        <h2>Klíčové datum: 31. prosinec</h2>
        <p>
          Daňové odpočty uplatníte za rok, ve kterém jste příspěvky zaplatili. DIP,
          penzijní spoření, dary, vše musí být zaplaceno do 31. 12., aby snížilo základ
          daně za daný rok. Přechod na paušální daň nebo změna výdajového režimu platí
          od 1. 1. . Rozhodnutí musíte udělat v listopadu nebo prosinci, ne v dubnu.
          Daňová optimalizace není práce pro březen, je to práce pro celý rok.
        </p>
      </div>
    );
  }

  if (slug === "mimoradna-splatka-hypoteky") {
    return (
      <div className="article-body">
        <p>
          Mimořádná splátka hypotéky vyvolává silnou emoci: dluh mizí, úroky klesají,
          a člověk spí klidněji. Matematika ale ne vždy souhlasí s emocí. Než pošlete
          bance extra peníze, stojí za to počítat.
        </p>

        <h2>Základní matematika rozhodnutí</h2>
        <p>
          Mimořádná splátka hypotéky přináší <strong>zaručený výnos rovný výši vaší
          úrokové sazby</strong>. Při sazbě 4,5 % p.a. je to garantovaných 4,5 %, bez rizika, bez volatility. Otázka pak zní: dokážete najít investici
          s vyšším výnosem? Historický průměrný výnos globálních akciových indexů
          je 7–10 % p.a. (před inflací). Ve velmi dlouhém horizontu (a s ochotou přijmout krátkodobé výkyvy) odpověď zní: zpravidla ano.
        </p>
        <p>
          Pravidlo: pokud je vaše hypoteční sazba nižší než očekávaný výnos
          z investic, matematicky vychází lépe investovat. Pokud je sazba vyšší
          (typicky nad 6–7 %), je extra splátka smysluplnější.
        </p>

        <h2>Kdy extra splátka rozhodně dává smysl</h2>
        <ul>
          <li><strong>Blížíte se konci fixace nebo splatnosti</strong>, zbývají-li 3–5 let,
            efekt složeného úroku z investic je omezený. Splátka jistiny sníží zbývající
            úroky efektivněji.</li>
          <li><strong>Máte averzi k dluhu</strong>, psychologická hodnota „vlastnit bydlení
            bez dluhů" je legitimní a má svou cenu. Není potřeba ji ignorovat.</li>
          <li><strong>Refinancujete</strong>, nižší jistina při refinancování zlepší vaši
            pozici vůči bance a může přinést lepší sazbu.</li>
          <li><strong>Dostali jste jednorázový příjem</strong> (dědictví, bonus, prodej aktiv). Lepší než nechat peníze ladem.</li>
        </ul>

        <h2>Pravidla pro mimořádné splátky bez sankce (2026)</h2>
        <p>
          Zákon umožňuje každý rok splatit mimořádně až <strong>25 % jistiny bez poplatku</strong>,
          ale pouze v okně <strong>1 měsíc před výročím</strong> uzavření smlouvy. Mimo toto
          okno si banka může účtovat administrativní poplatek . Od roku 2025 se tato pravidla
          zpřísnila, konkrétní podmínky si ověřte ve své smlouvě.
        </p>
        <p>
          Zdarma a bez omezení: <strong>konec fixačního období</strong> . Tehdy můžete splatit
          libovolnou výši. Toto je ideální moment pro velkou splátku, pokud ji plánujete.
          Dále jsou bez sankcí povoleny splátky při tzv. „životních událostech": rozvod, smrt
          dlužníka, ztráta zaměstnání nebo vážná nemoc.
        </p>

        <h2>Pozor: úroky z hypotéky nejsou daňově odečitatelné</h2>
        <p>
          Na rozdíl od mnoha zemí EU platí v Česku, že úroky z hypotéky na primární bydlení
          <strong> nejsou daňově odečitatelné</strong>, s výjimkou smluv sjednaných do
          31. 12. 2020, kde odpočet až 150 000 Kč ročně stále platí. Máte-li starší
          hypotéku s tímto odpočtem, vaše efektivní úroková sazba je nižší . Kalkulujte
          s ní, ne s nominální sazbou.
        </p>

        <h2>Kombinovaná strategie: splácet i investovat</h2>
        <p>
          Nejlepší výsledky přináší kombinace obou přístupů. Příklad: při sazbě 4,5 %
          a disponibilních 10 000 Kč/měsíc nad rámec povinné splátky . Investujte 7 000 Kč
          do ETF, 3 000 Kč pošlete jako mimořádnou splátku. Poměr upravujte podle aktuální
          výše sazeb a vývoje portfolia.
        </p>
        <p>
          Klíčový princip: <strong>nepřerušujte investice kvůli hypotéce</strong>. Čas
          strávený na trhu je nejdůležitější proměnná složeného úroku. Deset let bez
          investování ve prospěch „splacení hypotéky nejdříve" může stát více, než kolik
          ušetříte na úrocích.
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
        <PenzijkoKalk />
        <h2>Třetí pilíř: penzijní spoření</h2>
        <p>
          Účastnické fondy (dříve penzijní připojištění) fungují díky kombinaci vašich
          příspěvků, státní podpory a případného příspěvku zaměstnavatele. Stát přispívá
          až 340 Kč měsíčně při vkladu 1 700 Kč. Navíc si od daňového základu lze odečíst
          příspěvky přesahující 1 700 Kč měsíčně, až 48 000 Kč ročně.
        </p>
        <p>
          Nevýhodou je omezená likvidita: peníze jsou dostupné zpravidla až v 60 letech
          a výnosy konzervativních fondů bývají nízké, často nepřekonají ani inflaci.
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
          překonat psychicky těžší období poklesů, bez institucionálního „jistícího
          mechanismu."
        </p>
        <h2>Kombinace jako nejlepší přístup</h2>
        <p>
          Pro většinu klientů doporučuji kombinaci obou přístupů. Třetí pilíř využijte
          alespoň do výše příspěvku 1 700 Kč měsíčně, státní podpora je zaručený
          výnos, který žádná investice nenahradí. Zbytek volných prostředků pak
          investujte do diverzifikovaného portfolia s vyšším výnosovým potenciálem.
        </p>
        <h2>Závěr</h2>
        <p>
          Čím dříve začnete, tím lépe. Složený úrok pracuje nejlépe v dlouhém horizontu
          a i malé měsíční částky mohou po 20–30 letech tvořit zásadní rozdíl. Pokud
          nevíte, kde začít, nebo chcete nastavit strategii na míru, ozvěte se . Rád
          vám pomohu sestavit konkrétní plán.
        </p>
      </div>
    );
  }

  if (slug === "firma-a-osobni-majetek") {
    return (
      <div className="article-body">
        <p>
          Přišel za mnou klient. Firma s obratem kolem třiceti milionů, sedm zaměstnanců, osmý rok
          v řadě roste. Ptám se na osobní majetek. Pauza. &quot;Máme barák, ještě splácíme. A spořák.&quot;
        </p>
        <p>
          Kolik na tom spořáku? &quot;Tak dvakrát moje výplata.&quot;
        </p>
        <p>
          Tohle není výjimka. Je to pravidlo.
        </p>
        <p>
          Majitelé firem jsou na papíře nejbohatší vrstva v Česku. Ale devět z deseti má skoro vše
          zamčené v té firmě. Auto na firmu, nemovitost přes s.r.o., přebytky nechávají v bilanci.
          &quot;Bude se to hodit.&quot; Osobně? Prázdno.
        </p>

        <h2>Proč to dělají</h2>
        <p>
          Logika je jasná. Ve firmě jsou výdaje daňovým nákladem. Osobní majetek se buduje z čistého.
          Účetní řekne: nechte to ve firmě, to se vyplatí. A krátkodobě má pravdu.
        </p>
        <p>
          Problém nastane, když se ptám: co se stane, když ten business zítra zpomalí?
        </p>
        <p>
          Ne katastrofa, jen obyčejná průšvihy. Přijdete o klíčového zákazníka, trh se otočí,
          zdraví selže. Najednou ta firma přestane platit. A vy doma nemáte nic, na co sáhnout.
        </p>

        <h2>Firma není penzijní plán</h2>
        <p>
          Tenhle mýtus přežívá překvapivě dlouho. &quot;Prodám firmu a mám na důchod.&quot; Ale firma se prodá
          za tolik, za kolik ji někdo koupí. Ne za tolik, za kolik ji oceňujete vy. A kupce, který
          zaplatí dobrou cenu, hledáte minimálně tři roky, pokud vůbec přijde.
        </p>
        <p>
          Stavět důchod na exitu je jak stavět golfovou sezonu na hole in one. Občas to přijde.
          Naplánovat se to nedá.
        </p>

        <h2>Jak nastavit systém</h2>
        <p>
          Nejde o to vzít peníze z firmy a propálit je. Jde o to mít systém, který buduje osobní
          majetek souběžně s tím, jak roste firma.
        </p>
        <p>
          Kombinace, která funguje: přiměřená mzda (ne symbolická), maximální příspěvek firmy na DIP
          a část přebytků každý rok vytáhnout dividendami nebo přes holding do osobního investičního
          portfolia.
        </p>
        <p>
          DIP sám o sobě umožňuje firmě přispívat jednateli až 50 000 Kč ročně bez jakýchkoliv odvodů.
          To jsou prachy, které jinak zaplatíte na daních. A přitom rostou.
        </p>

        <h2>Kdy začít</h2>
        <p>
          Teď. Ne po dalším roce. Ne až se firma stabilizuje. Každý rok bez systému je rok, kdy
          firmě rostou bilance a vám osobně ne.
        </p>
        <p>
          První krok je jednoduchý: spočítat, kolik si dnes reálně vyplácíte versus kolik generujete.
          A pak rozhodnout, co změnit.
        </p>
      </div>
    );
  }

  if (slug === "trhy-padaji-co-ted") {
    return (
      <div className="article-body">
        <p>
          V březnu 2020 mi jeden klient napsal: &quot;Mám prodat, dokud něco zbývá?&quot;
        </p>
        <p>
          Trhy za tři týdny spadly o pětatřicet procent. Celý svět zavřený, žádný konec v nedohlednu.
          Neměl prodat. Bylo to tehdy jedno z nejtěžších doporučení, které jsem kdy dával.
        </p>

        <h2>Proč nás trhy děsí</h2>
        <p>
          Mozek vnímá ztrátu zhruba dvakrát silněji než stejně velký zisk. Takže když portfolio
          klesne o dvacet procent, bolí to asi tak jako by vám někdo vzal čtyřicet. Není to slabost,
          je to biologie.
        </p>
        <p>
          Problém nastane, když tenhle pocit přeložíte do akce. Prodáváte ve ztrátě, zamykáte ztrátu,
          a pak sledujete, jak trh za rok je zpátky výše.
        </p>

        <h2>Co říkají čísla</h2>
        <p>
          Od roku 1928 zažily americké akcie průměrně jeden pokles o deset procent každý rok. Jednou
          za tři roky pokles o dvacet. A jednou za deset let skutečnou krizi.
        </p>
        <p>
          Každý z těch poklesů pak byl překonán. Ne vždy za rok, ne vždy elegantně. Ale překonán byl.
        </p>
        <p>
          Kdo prodal v březnu 2020, realizoval ztrátu třicet pět procent. Kdo nic nedělal, byl do
          konce roku na nule. Kdo v březnu přikoupil, vydělal přes padesát procent za devět měsíců.
        </p>

        <h2>Co říkám klientům při pádu trhů</h2>
        <p>
          Dvě věci.
        </p>
        <p>
          Za prvé: kontext. Posílám čísla: jak vypadalo portfolio před rokem, jak vypadá teď,
          jak by vypadalo historicky za rok od propadu. Ne sliby, jen data.
        </p>
        <p>
          Za druhé: připomínám plán. Kolik měsíců výdajů mají jako hotovostní rezervu. Kolik let
          do doby, kdy peníze reálně potřebují. Kdo má deset let do důchodu, toho propad v roce jedna
          skoro nezajímá. Kdo plánuje vybírat za dva roky, pro toho jsme to od začátku nastavili jinak.
        </p>

        <h2>Plán funguje jen tehdy, když ho dodržíte</h2>
        <p>
          Největší nepřítel investic nejsou trhy. Jste to vy ve chvíli paniky.
        </p>
        <p>
          Tohle nezní hezky, ale je to pravda. Proto má smysl mít plán napsaný, odsouhlasený
          a připomínaný v klidu, ne ve chvíli, kdy Bloomberg píše o apokalypse.
        </p>
        <p>
          Moje práce při každém propadu je připomenout vám ten plán. A případně přikoupit.
          Proto je dobré mít část peněz připravenou přesně na ten okamžik.
        </p>
      </div>
    );
  }

  if (slug === "kolik-si-vyplacet-ze-sro") {
    return (
      <div className="article-body">
        <p>
          Tuhle otázku slyším pořád. Přichází obvykle takhle: &quot;Účetní říká tohle, kamarád dělá tamto,
          nevím, co je správně.&quot;
        </p>
        <p>
          Správně záleží na čtyřech věcech, které musejí do sebe zapadnout. Níže je rámec, který
          používám se svými klienty.
        </p>

        <h2>Dvě základní možnosti: mzda nebo dividendy</h2>
        <p>
          Mzda ze s.r.o. snižuje základ daně firmy, protože je to náklad. Platíte z ní odvody
          na sociální a zdravotní pojištění: firma přidá 33,8&nbsp;% navíc k hrubé mzdě a vám se z ní strhne dalších 11,6&nbsp;%. Tím si
          budujete sociální pojistku a důchodové nároky.
        </p>
        <p>
          Dividendy nejsou nákladem, platí se ze zisku po dani. Zdanění je patnáct procent srážkovou
          daní, žádné odvody. Nevýhoda: dividendy si nemůžete vyplácet průběžně, jen jednou ročně
          po schválení účetní závěrky.
        </p>

        <h2>Kdy se vyplatí mzda</h2>
        <p>
          Pokud je s.r.o. váš primární zdroj příjmu a chcete mít dovolené, neschopenku a důchodové
          nároky, mzda dává smysl. Zhruba do příjmu 150 tisíc měsíčně hrubého je kombinace odvodů
          a daní snesitelná.
        </p>
        <p>
          Nad tímhle prahem ale odvody přestávají přinášet odpovídající benefit. Platíte čím dál
          větší podíl bez toho, aby se vám důchodové nároky stejně zvyšovaly.
        </p>

        <h2>Kdy se vyplatí dividendy</h2>
        <p>
          Pokud máte jiné příjmy, zaměstnání, jiná s.r.o. nebo příjmy z pronájmu, kde odvody
          platíte odjinud, dividendy dávají smysl. Patnáct procent a hotovo.
        </p>
        <p>
          A platí to bez ohledu na výši. Ať si vyplatíte sto tisíc, nebo deset milionů,
          firma strhne patnáct procent a tím je daň vyřízená.
        </p>

            <div className="nums">
              <div className="num">
                <span>Mzda</span>
                <b>+33,8&nbsp;%</b>
                <p>přidá firma navíc k hrubé mzdě. Dalších 11,6&nbsp;% se strhne vám.</p>
              </div>
              <div className="num">
                <span>Dividenda</span>
                <b>15&nbsp;%</b>
                <p>srážková daň a hotovo. Bez ohledu na výši, bez odvodů.</p>
              </div>
              <div className="num navy">
                <span>DIP od firmy</span>
                <b>50&nbsp;000&nbsp;Kč</b>
                <p>ročně může firma poslat na váš DIP bez daně a bez odvodů.</p>
              </div>
            </div>

        <h2>DIP jako třetí páka</h2>
        <p>
          Od roku 2024 může firma přispívat jednateli na DIP investiční účet až 50 000 Kč ročně
          bez jakýchkoliv odvodů a bez daně z příjmu. To je přibližně 22 000 Kč ušetřených ročně,
          jen díky správnému nastavení.
        </p>
        <p>
          Tohle je instrument, o kterém spousta účetních neví nebo ho zatím nepoužívá.
        </p>

        <h2>Jak to nastavit dohromady</h2>
        <p>
          Recept, který používám nejčastěji: přiměřená mzda (aby byl jednatel účasten sociálního
          pojištění), maximální příspěvek firmy na DIP, a přebytky dividendami jednou ročně.
        </p>
        <p>
          Přesná čísla záleží na výši příjmu a konkrétní situaci. Ale tohle jsou tři páky, které
          se dají nastavit relativně rychle a ušetřit desítky tisíc ročně. A zároveň si budovat
          osobní majetek mimo firmu.
        </p>

        <h2>A co holding?</h2>
        <p>
          Na holding se mě majitelé ptají hned po dividendách. Kamarád ho má, tak by ho chtěli taky.
          Holding je šuplík vedle firmy: peníze do něj jdou bez daně a pracují dál.
          Jestli ho potřebujete, záleží na tom, co s nimi chcete dělat.
        </p>
        <HoldingDiag />
      </div>
    );
  }

  if (slug === "investicni-byt-napocitam-to") {
    return (
      <div className="article-body">
        <p>
          &quot;Pronájem mi pokryje splátku&quot; slyším jednou za čtrnáct dní. Pak si sednem a počítáme
          doopravdy. Výsledek je vždycky trochu jiný, než člověk čekal.
        </p>

        <h2>Hrubý výnos vs. čistý výnos</h2>
        <p>
          Byt za čtyři miliony, pronájem 18 000 Kč měsíčně. Hrubý výnos je 5,4 %. Zní to dobře.
        </p>
        <p>
          Teď od toho odečteme: správu bytu (6 až 8 % z nájmu, pokud to neděláte sami), opravy
          a údržbu (odhadem 1 až 1,5 % z hodnoty bytu ročně), pojištění, daň z příjmu
          z nájemného a průměrně jeden měsíc prázdno za rok.
        </p>
        <p>
          Po všem tomhle jde čistý výnos na zhruba 3 až 3,5 %. U hypotéky za 4,5 % to je záporný
          cashflow. Každý měsíc platíte z vlastní kapsy.
        </p>

        <h2>Ale majetek přece roste, ne?</h2>
        <p>
          Ano, nemovitosti v Česku historicky rostou. Průměrně kolem čtyř až pěti procent ročně,
          v Praze více. Takže celkový výnos, renta plus apreciace, dává smysl.
        </p>
        <p>
          Problém je likvidita. Nemovitost neprodáte za hodinu. Neprodáte ji za cenu, kterou
          chcete. A v mezidobí platíte hypotéku, opravy a daně.
        </p>
        <p>
          Porovnejte to s diverzifikovaným ETF portfoliem, které historicky vynáší sedm až osm
          procent ročně, je likvidní a správa zabere pár minut měsíčně.
        </p>

        <h2>Kdy investiční byt smysl dává</h2>
        <p>
          Dává smysl, když máte dost vlastního kapitálu (alespoň třicet procent), kupujete v lokalitě
          se silnou a trvalou poptávkou po nájmu a nepovažujete to za náhradu diverzifikovaného
          portfolia, ale za jednu z vrstev.
        </p>
        <p>
          Nemá smysl, když to kupujete proto, že &quot;nemovitosti jsou jistota&quot;, přitom nemáte žádné
          jiné úspory. Nebo když celý váš plán na důchod zní: jednou prodám barák.
        </p>

        <h2>Co se vždy vyplatí</h2>
        <p>
          Nechat si celé číslo napočítat. Víc, než si myslíte, záleží na načasování nákupu,
          výši vlastních zdrojů, sazbě hypotéky a lokalitě.
        </p>
        <p>
          Přinesete mi čísla, já vám napočítám celý scénář, včetně srovnání s alternativním
          investičním portfoliem.
        </p>
      </div>
    );
  }

  if (slug === "osvc-duchod-proc-jste-na-tom-hur") {
    return (
      <div className="article-body">
        <p>
          OSVČ platí sociální pojištění z vyměřovacího základu. Zákon říká, že základ musí být
          alespoň 55&nbsp;% zisku.<a href="#zdroj-1" className="fn">1</a> Zákonem stanovené
          minimum pro rok 2026 je 17&nbsp;139&nbsp;Kč měsíčně, do konce června 19&nbsp;587&nbsp;Kč.<a href="#zdroj-2" className="fn">2</a>
        </p>
        <p>
          Tenhle článek je pro ty, kteří platí zákonné minimum a ještě nepočítali, co z toho vyjde
          za třicet let.
        </p>

        <h2>Jak se výše důchodu počítá</h2>
        <p>
          Zjednodušeně: čím více let odvádíte a čím vyšší jsou vaše evidované příjmy v systému ČSSZ,
          tím vyšší důchod dostanete. Oba faktory hrají roli.
        </p>
        <div className="stat">
          <div className="stat-cell">
            <b>22 000 Kč</b>
            <span>Průměrný starobní důchod<a href="#zdroj-3" className="fn">3</a></span>
          </div>
          <div className="stat-cell">
            <b>14–15 tis.</b>
            <span>OSVČ na minimálních odvodech</span>
          </div>
        </div>
        <p>
          Pokud platíte minimální odvody pětadvacet let, vaše evidované příjmy jsou minimální.
          Státní důchod bude odpovídající. OSVČ s minimálními odvody se pohybuje kolem čtrnácti, patnácti tisíc korun měsíčně.
        </p>

        <div className="calc-cta">
          <div>
            <p className="t">Jak velká je vaše mezera?</p>
            <p style={{fontSize:14,lineHeight:1.6,color:"rgba(245,242,236,.72)",marginTop:10,marginBottom:18}}>
              Spočítejte si, kolik dostanete od státu a kolik vám bude chybět.
            </p>
            <a href="/konzultace" style={{display:"inline-flex",alignItems:"center",gap:8,padding:"10px 20px",
              borderRadius:999,background:"#C9A260",color:"#0C1F3A",fontWeight:600,fontSize:14,textDecoration:"none"}}>
              Spočítat s poradcem →
            </a>
          </div>
          <div>
            <p style={{fontSize:12,fontWeight:500,color:"rgba(245,242,236,.55)",marginBottom:10,letterSpacing:".06em",textTransform:"uppercase"}}>Odhadovaný příjem v důchodu</p>
            <div className="bar">
              <div className="s" title="Státní důchod ~14–15 tis. Kč" />
              <div className="u" title="DIP + vlastní investice" />
              <div className="x" title="Mezera bez investic" />
            </div>
            <div style={{display:"flex",gap:14,marginTop:8,fontSize:11,color:"rgba(245,242,236,.55)"}}>
              <span>Státní důchod</span>
              <span style={{color:"#C9A260"}}>+ investice</span>
              <span>mezera</span>
            </div>
          </div>
        </div>

        <h2>Proč to OSVČ dělají</h2>
        <p>
          Aby ušetřily dnes. Minimální odvody znamenají víc peněz v kapse teď. A je tu poctivý
          argument: pokud ty ušetřené peníze investujete systematicky, sami si na důchod naberete
          víc, než by vám dal stát.
        </p>
        <p>
          To je pravda, ale pouze tehdy, když ty peníze opravdu investujete. Disciplinovaně,
          každý měsíc, dlouhodobě.
        </p>
        <p>
          Kdo to nedělá a jede na minimech, protože se zdá, že je čas, ten za dvacet let zjistí,
          že má minimální státní důchod a nic jiného.
        </p>

        <h2>Co s tím</h2>
        <p>
          Tři věci, které dávají smysl dohromady.
        </p>
        <p>
          Za prvé, DIP. Od roku 2024 si OSVČ může odepsat z daní až 48&nbsp;000&nbsp;Kč vložených do
          investičního účtu. Na daních to reálně ušetří sedm až jedenáct tisíc ročně v závislosti
          na sazbě.<a href="#zdroj-4" className="fn">4</a> A ty peníze rostou bez daně z výnosů.
        </p>
        <p>
          Za druhé, investiční program vedle toho. Systematický vklad do diverzifikovaného ETF
          portfolia každý měsíc bez ohledu na trhy. Z tisícikoruny měsíčně za pětadvacet let
          při sedmiprocentním průměrném výnosu vyroste přes 800&nbsp;000&nbsp;Kč.
        </p>
        <p>
          Za třetí, dobrovolné navýšení vyměřovacího základu. Nemusíte platit maximum, ale platit
          trochu více než zákonné minimum. Každých 10&nbsp;000&nbsp;Kč ročně navíc na základu přidá do
          důchodu zhruba 150&nbsp;Kč měsíčně na celý život.
        </p>

        <h2>Kdy začít</h2>
        <p>
          Platí jedno jednoduché pravidlo: každý rok navíc je rok složeného úročení, o který
          přicházíte. Kdo začne investovat tisícikorunu měsíčně ve třiceti, má za pětatřicet
          let přibližně třikrát víc než ten, kdo začne ve čtyřiceti pěti.
        </p>
        <p>
          Nejhorší odpověď je počkat na lepší dobu.
        </p>

        <div className="sources" id="zdroje">
          <ol>
            <li id="zdroj-1"><b>Zákon č. 589/1992 Sb.</b>, § 5b odst. 2 — vyměřovací základ OSVČ nesmí být nižší než 55 % daňového základu.</li>
            <li id="zdroj-2"><b>ČSSZ: Přehled o příjmech a výdajích OSVČ 2026</b> — minimální záloha na pojistné: 19 587 Kč/měs. (I. pololetí), 17 139 Kč/měs. (II. pololetí). cssz.cz</li>
            <li id="zdroj-3"><b>MPSV: Statistická ročenka z oblasti práce a sociálních věcí 2025</b> — průměrný starobní důchod k 31. 12. 2025 činil přibližně 22 000 Kč. mpsv.cz</li>
            <li id="zdroj-4"><b>Zákon č. 586/1992 Sb.</b>, § 15b — odpočet vkladů na DIP (Dlouhodobý investiční produkt) až 48 000 Kč ročně. Úspora 15 % (základní sazba) až 23 % (vyšší sazba).</li>
          </ol>
        </div>
      </div>
    );
  }

  if (slug === "prodej-firmy-co-s-penezi") {
    return (
      <div className="article-body">
        <p>
          Přišel za mnou klient. Firma šla za osm milionů, smlouva podepsaná před třemi týdny.
          Sedl si a řekl: &quot;Peníze jsou na účtu. Co s nimi?&quot;
        </p>
        <p>
          Tohle je moment, na který se deset let dřete. A pak nastane a není připravený skoro nikdo.
        </p>

        <h2>Nejdřív počkejte</h2>
        <p>
          Prvních šest měsíců po prodeji firmy je nejhorší čas na velká investiční rozhodnutí.
          Emoce ještě neodezněly, nabídky přicházejí odevšad a každý má radu. Banka nabídne
          strukturované produkty. Kamarád má tip. Tchán chce půjčku.
        </p>
        <p>
          Peníze dejte na spořicí účet nebo do peněžního fondu. Výnos okolo čtyř procent,
          dostupné do týdne. Za tu dobu nic nezkazíte a získáte čas na rozvahu.
        </p>

        <h2>Daň: od roku 2026 je to jinak</h2>
        <p>
          Pokud jste obchodní podíl drželi déle než pět let, příjem z prodeje je od roku 2026
          osvobozen od daně z příjmů bez ohledu na výši. Dříve platil limit pět milionů korun,
          teď neexistuje.
        </p>
        <p>
          Pokud jste prodali dříve nebo podíl drželi kratší dobu, situace je jiná. To je práce
          pro daňového poradce, ne pro obecnou radu.
        </p>

        <h2>Nesázejte vše na jednu kartu</h2>
        <p>
          Každý druhý klient přijde s nápadem koupit investiční byt. Chápu to. Byt je hmatatelný,
          vidíte ho, víte, jak funguje. Ale šest sedm milionů v jedné nemovitosti v jednom
          městě je extrémní koncentrace rizika.
        </p>
        <p>
          Diverzifikace neznamená složitost. Znamená, že když jedna věc selže, nepřijdete o vše.
        </p>

        <h2>Jak nastavit systém</h2>
        <p>
          S klienty po exitu stavíme většinou toto: část jako krátkodobá rezerva na spořicím účtu,
          část do ETF portfolia s horizontem deset a více let a pokud chcete dál investovat
          do firem nebo nemovitostí, holding s.r.o. jako šuplík navíc.
        </p>
        <p>
          Nejde o to mít vše optimalizované od prvního dne. Jde o systém, který funguje
          bez každodenního rozhodování.
        </p>

        <h2>Proč banka nestačí</h2>
        <p>
          Banka vám nabídne produkty, které má. Nezávislý poradce začíná vaší situací,
          ne produktovým portfoliem. Rozdíl je zásadní, zvláště tehdy, když máte najednou
          velkou sumu a žádný spěch.
        </p>
        <p>
          Čas máte. Ale ten čas také ubíhá. Každý měsíc peněz, které nepracují správně,
          je ztracená příležitost.
        </p>
      </div>
    );
  }

  if (slug === "sverensky-fond-praha") {
    return (
      <div className="article-body">
        <p>
          Přišel za mnou klient po obědě. &quot;Hele, ten svěřenský fond, mám ho mít, ne? Kamarád ho má.&quot;
        </p>
        <p>
          Projeli jsme situaci. Závěr: fond nepotřeboval. Ale věděl proč a co by se muselo změnit,
          aby to smysl dávalo. A to je přesně ta věc, kterou chci vysvětlit.
        </p>

        <h2>Co svěřenský fond je</h2>
        <p>
          Svěřenský fond není firma ani nadace. Je to účelově vyčleněný majetek, který nikomu
          nepatří jako osobě. Zákon č. 89/2012 Sb., § 1448. Vložíte majetek, správce ho spravuje
          a obmyšlení z něj mají prospěch. Vy přestáváte být právním vlastníkem.
        </p>
        <p>
          Majetek ve fondu není váš. Nelze ho snadno postihnout v exekuci. Věřitelé ho nevidí
          v katastru pod vaším jménem. Neprojde standardním dědickým řízením.
        </p>
        <p>
          Ale ochrana není absolutní. § 1467 OZ říká, že pokud správce, zakladatel nebo obmyšlený
          úmyslně poškodí věřitele zakladatele, jsou zavázáni společně a nerozdílně.
          Fond nelze zřídit den před exekucí a pak se schovat. Musí existovat preventivně,
          dávno předtím než problém nastane.
        </p>

        <SverenskyFond />

        <h2>Kdo tvoří fond</h2>
        <p>
          Tři povinné role: zakladatel, správce a obmyšlený. Zakladatel vymezuje účel,
          podmínky plnění a obmyšlené ve statutu. Správce spravuje majetek s péčí řádného
          hospodáře a jedná za fond ve všech právních věcech. Obmyšlený má nárok na plnění
          za podmínek, které statut nastavil.
        </p>
        <p>
          Volitelně: protektor, rodinná rada, shromáždění beneficientů. Protektor dohlíží na správce
          a chrání obmyšlené před jeho chybami nebo zneužitím. Hodí se u rozvětvených rodin
          nebo asymetrického rozdělení. Shromáždění beneficientů funguje jako valná hromada fondu:
          jmenuje protektory, schvaluje klíčová rozhodnutí a integruje rodinu do správy.
        </p>
        <p>
          Fond se zapisuje do Evidence svěřenských fondů u krajského soudu podle bydliště správce.
          Správce je veřejný. Zakladatel, obmyšlený a protektor jsou neveřejní.
          Soukromý fond trvá maximálně 100 let.
        </p>

        <h2>Proč případ Kellner mění perspektivu</h2>
        <p>
          V březnu 2021 zahynul Petr Kellner při havárii vrtulníku. Majetek přibližně 293 miliard
          korun. Žádná závěť. Žádný fond ani nadace. Spustilo se klasické dědické řízení na více než rok.
        </p>
        <p>
          V září 2022 se dohodli: vdova získala přibližně 59 %, čtyři děti po necelých 10 % každé.
          Vzniklo pět akcionářů PPF, poradní výbor s partnerem dcery. V srpnu 2025 se vdova s dcerami
          dohodla na vyplacení Petra Kellnera ml. za přibližně 40 miliard.
        </p>
        <p>
          Kellner byl nejbohatší Čech. Nástupnický plán formálně chyběl. Rodinné dynamiky
          nových partnerů a nevlastních dětí se musely řešit až po smrti, za plnou cenu.
          To je přesná situace, na kterou svěřenský fond nebo nadace existují.
        </p>

        <h2>Kdy fond smysl dává</h2>
        <p>
          <strong>Ochrana před věřiteli.</strong> Preventivně, v době kdy žádné závazky neexistují.
          Retroaktivní přesuny jsou napadnutelné přes institut relativní neúčinnosti (§ 589 OZ).
          Fond musí existovat dávno před problémem.
        </p>
        <p>
          <strong>Rozvod a SJM.</strong> Alternativa k předmanželské smlouvě, která bývá emocionálně
          problematická a zákonem omezená. Fond pokryje všechny složky majetku, i budoucí.
          Klíčový rodinný majetek se tak vyloučí z dědické sukcese při rozvodu nebo smrti jednoho z manželů.
        </p>
        <p>
          <strong>Předání rodinné firmy.</strong> Pokud není jasný nástupce nebo se potomci hádají
          o převzetí. Fond nastaví konkrétní podmínky: dosažené vzdělání, délka praxe, KPI
          v managementu. Nebo negativní podmínky: fluktuace zaměstnanců, nepřijatelné chování.
          Firma je v klidu, správce řídí a potomci podmínky teprve splňují nebo nesplňují.
        </p>
        <p>
          <strong>Mezigenerační majetek.</strong> Fond přežije smrt zakladatele bez dědického řízení.
          Majetek přejde na obmyšlené přesně tak, jak statut nastavil. Aktuální trend jsou výnosy,
          ne jistina: obmyšlení dostávají plody hospodaření, majetek zůstává konsolidovaný
          v fondu pro další generace.
        </p>

        <h2>Vzory, které fungují a které ne</h2>
        <p>
          Rockefellerové. John D. Rockefeller st. zřídil první family trust v roce 1934, druhý
          dynastický v roce 1952. Profesionální správce: Chase Bank, ne rodinný příslušník.
          Diverzifikované portfolio zahrnující akcie, nemovitosti, soukromé investice a filantropii.
          Formální rodinná konstituce, rodinné rady, finanční vzdělání od raného věku.
          Dnes jsou prostředky distribuovány přes 170 dědičcům šesté a sedmé generace.
        </p>
        <p>
          Vanderbiltové. Cornelius Vanderbilt zemřel v roce 1877 jako nejbohatší muž USA.
          Bez trustu, majetek nejstaršímu synovi. Další generace bez struktury a governance.
          Při aukci sídla The Breakers v roce 1973 rodina mezi nejbohatšími Američany nebyla.
          Anglosaské rčení: od košile ke košili za tři generace. Právě takové případy ho vytvořily.
        </p>
        <p>
          Ponaučení: fond sám o sobě nic nezachrání. Je to architektura. Vyžaduje správce,
          governance a sdílené hodnoty. Bez toho je to jen papír u soudu.
        </p>

        <h2>Typy fondů a co se hodí kdy</h2>
        <p>
          <strong>Rodinný:</strong> zachování rodinného majetku, péče o členy rodiny, motivační
          schémata pro potomky, eliminace dědické sukcese klíčového majetku.
        </p>
        <p>
          <strong>Osobní (ochranný):</strong> preventivní ochrana osobního majetku před věřiteli.
          Ochrana není bezmezná, musí respektovat zákonná pravidla.
        </p>
        <p>
          <strong>Testamentární:</strong> zřizuje se pořízením pro případ smrti, vzniká smrtí
          zůstavitele. Umožňuje vliv zakladatele na nakládání s majetkem i po jeho smrti.
        </p>
        <p>
          <strong>Obchodní:</strong> využití v holdingových strukturách pro ochranu aktiv nebo know-how.
        </p>

        <h2>Kdy fond nepotřebujete</h2>
        <p>
          Celkový majetek pod patnáct dvacet milionů. Náklady na nastavení a správu fondu
          neodpovídají výsledku. Správně sepsaná závěť a nastavené SJM dají podobný efekt.
        </p>
        <p>
          Nemáte děti ani jiné osoby, pro které chcete strukturovat majetek do dalších generací.
          Fond přidá administrativu bez odpovídajícího benefitu.
        </p>
        <p>
          Hledáte ochranu před závazky, které již existují. Na to fond neslouží.
          To je práce pro advokáta a insolvenčního specialistu.
        </p>

        <h2>Co to stojí v praxi</h2>
        <p>
          Nastavení fondu: advokát a notář, třicet až šedesát tisíc korun, dva tři měsíce práce.
          Statut musí obsahovat označení fondu a majetku, účel, podmínky plnění, dobu trvání
          a určení obmyšlených. Zakladatel, obmyšlený a protektor zůstávají neveřejní.
        </p>
        <p>
          Roční správa u profesionálního správce: deset až dvacet tisíc jako minimum.
          Pokud fond aktivně spravuje nemovitosti nebo podíly ve firmách, výrazně více.
        </p>
        <p>
          Dobrý fond nastavují advokát, notář a finanční poradce dohromady.
          Každý pokrývá jinou část. Sám žádný nestačí.
        </p>
      </div>
    );
  }

  if (slug === "holding-sro-osobni-majetek") {
    return (
      <div className="article-body">
        <p>
          &quot;Kamarád má holding, tak bych ho taky chtěl.&quot; Tohle slyším jednou za čtrnáct dní.
          Kamarád má s.r.o. pod s.r.o. a vypadá to chytře.
        </p>
        <p>
          Holding může být velmi efektivní nástroj. Nebo zbytečná administrativa za dvacet
          tisíc ročně navíc. Záleží na jedné věci: co s penězi chcete dělat.
        </p>

        <HoldingDiag />

        <h2>Jak holding funguje</h2>
        <p>
          Holding je mateřská s.r.o., která vlastní vaši provozní firmu. Dividendy z provozní
          firmy do holdingu jsou osvobozeny od daně, pokud holding vlastní aspoň deset procent
          dcery nejméně rok. Peníze přejdou bez daňové ztráty.
        </p>
        <p>
          Z holdingu pak investujete do dalšího podnikání, nemovitostí nebo dalších aktiv.
          Daň platíte až tehdy, když si peníze vezmete osobně.
        </p>

        <h2>Kdy holding dává smysl</h2>
        <p>
          Generujete přebytky, které nechcete okamžitě vybrat. Chcete je reinvestovat
          do dalších firem nebo nemovitostí. Holding je šuplík: v něm pracuje celá stovka,
          ne jen osmdesát pět po dividendové dani.
        </p>
        <p>
          Máte nebo plánujete mít víc firem. Holding je přirozené místo, odkud je vlastnit.
          Čistší struktura, jednodušší prodej jedné z nich.
        </p>
        <p>
          Chcete oddělit provozní riziko od majetku. Pokud provozní firma selže, majetek
          v holdingu věřitelé firmy nemohou snadno postihnout.
        </p>

        <h2>Kdy holding nepotřebujete</h2>
        <p>
          Vybíráte veškerý zisk jako dividendy každý rok. Pak zaplatíte stejně a máte
          o jednu firmu víc na správu.
        </p>
        <p>
          Plánujete firmu prodat a máte ji déle než pět let. Od roku 2026 je takový prodej
          bez daně v jakékoli výši. Z holdingu byste si peníze brali s patnáctiprocentní daní.
        </p>
        <p>
          Roční zisk firmy je nízký. Holding se vyplatí přibližně od okamžiku, kdy byste
          jinak platili na dividendové dani přes sto padesát tisíc ročně.
        </p>

        <h2>Co to stojí</h2>
        <p>
          Nastavení holdingové struktury s advokátem: třicet až padesát tisíc korun.
          Roční správa dvou s.r.o.: dvě daňová přiznání, dvě účetní závěrky, větší
          administrativa. Počítejte s náklady navíc okolo dvaceti tisíc ročně.
          Struktura se vyplatí, když roční daňová úspora tyto náklady přesáhne s přehledem.
        </p>
      </div>
    );
  }

  if (slug === "financni-plan-pro-podnikatele") {
    return (
      <div className="article-body">
        <p>
          Finanční plán není tabulka v Excelu. Není to ani soubor produktů u jedné banky.
          Je to odpověď na jednu otázku: co chcete mít za dvacet let a co pro to děláte dnes?
        </p>
        <p>
          Podnikatelé tohle zpravidla neřeší. Jsou zaneprázdněni firmou. A pak jednou přijdou
          a říkají: &quot;Mám padesát, firma funguje. Ale osobně? Žádný plán.&quot;
        </p>

        <h2>Krok 1: rezerva mimo firmu</h2>
        <p>
          Nejdřív bezpečnost. Osobní likvidní rezerva, která nesouvisí s firmou. Šest měsíců
          výdajů na spořicím účtu nebo v peněžním fondu. Dostupná do týdne bez dopadu na firmu.
        </p>
        <p>
          Toto chybí devíti z deseti podnikatelů. Firma slouží jako záchranná síť a spořicí
          účet zároveň. Ale firma není ani jedno.
        </p>

        <h2>Krok 2: nastavte výplatu správně</h2>
        <p>
          Přiměřená mzda z firmy, ne symbolická. Maximální příspěvek firmy na váš DIP, to je
          až padesát tisíc ročně bez odvodů. Přebytky dividendami, ne v bilanci.
        </p>
        <p>
          Systém musí existovat. Bez systému si vyplácíte podle pocitu a platíte víc,
          než musíte.
        </p>

        <h2>Krok 3: investujte osobně</h2>
        <p>
          Dividendy, které neutratíte na bydlení a provoz, jdou do investičního portfolia.
          ETF globálního indexu jako základ, pravidelně, bez přerušení při každém poklesu trhů.
          Tohle se nastaví jednou a pak pracuje samo.
        </p>

        <h2>Krok 4: oddělte majetek</h2>
        <p>
          Osobní majetek nesmí záviset na osudu firmy. Co má smysl mít osobně, nechte osobně.
          Firma není vaše penzijní pojistka. Je to nástroj, který může selhat.
        </p>

        <h2>Krok 5: ochrana</h2>
        <p>
          Pojistka na příjmy. Závěť. Plná moc pro případ neschopnosti. Věci, které lidé
          neřeší, dokud je nepotřebují. A pak je pozdě.
        </p>

        <h2>Krok 6: co bude po vás</h2>
        <p>
          Komu firma připadne. Jak ji ocenit. Jak ji předat dětem nebo prodat cizímu.
          Je to práce pro advokáta, notáře a poradce dohromady. Ale začíná tím, že si to
          začnete klást jako otázku dnes.
        </p>

        <h2>Proč to většina odkládá</h2>
        <p>
          Protože je to abstraktní. Firma je konkrétní, každodenní, urgentní. Plán na dvacet
          let se zdá daleko. Ale čas ubíhá a složený úrok pracuje jen tehdy, když investujete.
          Každý rok odkladu je rok, o který přicházíte.
        </p>
      </div>
    );
  }

  if (slug === "vyber-penez-ze-sro-mzda-dividendy") {
    return (
      <div className="article-body">
        <p>
          Dva klienti. Podobná firma, podobný zisk. Jeden zaplatí ročně o více než sto padesát
          tisíc víc. Rozdíl není v žádné kreativitě. Je v tom, jak si nastavili výplatu.
        </p>

        <h2>Základní logika</h2>
        <p>
          Mzda ze s.r.o. je daňový náklad firmy, snižuje základ daně z příjmů právnických
          osob. Platíte z ní odvody: firma přidá třicet tři a půl procenta ke hrubé mzdě
          navíc, vy zaplatíte dalších jedenáct a půl procenta. Budujete si sociální nárok
          a důchod.
        </p>
        <p>
          Dividendy se platí ze zisku po dani z příjmu právnických osob. Zdanění je
          patnáct procent srážkovou daní, bez jakýchkoliv odvodů. Nevýhoda: jednou ročně
          po schválení účetní závěrky.
        </p>

        <div className="nums">
          <div className="num">
            <span>Mzda</span>
            <b>+33,8&nbsp;%</b>
            <p>přidá firma ke hrubé mzdě navíc. Vy zaplatíte dalších 11,6&nbsp;%.</p>
          </div>
          <div className="num">
            <span>Dividenda</span>
            <b>15&nbsp;%</b>
            <p>srážková daň a hotovo. Bez odvodů, bez ohledu na výši.</p>
          </div>
          <div className="num navy">
            <span>DIP od firmy</span>
            <b>50&nbsp;000&nbsp;Kč</b>
            <p>ročně může firma poslat na váš DIP bez daně a bez odvodů.</p>
          </div>
        </div>

        <h2>Kdy se mzda vyplatí</h2>
        <p>
          Pokud je s.r.o. váš primární příjem a chcete neschopenku, nemocenskou a důchodový
          nárok, mzda dává smysl. Zhruba do hrubé mzdy sto čtyřicet tisíc měsíčně jsou
          odvody ještě snesitelné.
        </p>
        <p>
          Nad tímto prahem platíte čím dál větší podíl bez toho, aby se vám důchodový nárok
          dál zvyšoval. Systém má strop.
        </p>

        <h2>Kdy se vyplatí dividendy</h2>
        <p>
          Pokud máte jiné příjmy, kde odvody platíte odjinud: zaměstnání, jiné s.r.o.,
          příjmy z pronájmu. Patnáct procent z dividendy a hotovo. Platí to bez ohledu
          na výši: sto tisíc nebo deset milionů, sazba je stejná.
        </p>

        <h2>Jak to kombinovat</h2>
        <p>
          Recept, který používám nejčastěji: přiměřená mzda pro zachování odvodů a sociálního
          nároku, maximální příspěvek firmy na DIP, přebytky dividendami jednou ročně.
        </p>
        <p>
          Přesná čísla záleží na výši zisku a konkrétní situaci. Ale tohle jsou tři páky,
          které se dají nastavit rychle a ušetřit statisíce ročně. A zároveň budovat osobní
          majetek mimo firmu.
        </p>
      </div>
    );
  }

  if (slug === "etf-spocitejte-si") {
    return (
      <div className="article-body">
        <p>
          Složený úrok je jediná síla ve financích, která pracuje i když spíte. Problém je,
          že se nedá dobře představit. Čísla jsou abstraktní, dokud je nevidíte konkrétně.
        </p>
        <p>
          Tak si je spočítejte.
        </p>

        <EtfKalk />

        <h2>Co ta čísla znamenají</h2>
        <p>
          Pět tisíc měsíčně za dvacet let při sedmiprocentním průměrném výnosu. Vložíte
          celkem milion dvě stě tisíc. Dostanete zpátky přibližně dva a půl milionu.
          Víc než polovina je složený úrok: peníze, které nikdy nevložíte, ale vydělá je čas.
        </p>
        <p>
          Tohle není reklama na konkrétní produkt. Je to matematika. Funguje u každého
          diverzifikovaného ETF portfolia v dostatečně dlouhém horizontu.
        </p>

        <h2>Kdy to funguje a kdy ne</h2>
        <p>
          Funguje tehdy, když nevybíráte předčasně. Každý prodej v poklesu trhu přeruší
          složený úrok a zamkne ztrátu. Trhy klesají pravidelně: jednou za rok o deset
          procent, jednou za deset let o třicet. Kdo to vydrží, dostane plný výnos.
          Kdo prodá v panice, dostane zlomek.
        </p>
        <p>
          Funguje tehdy, když investujete pravidelně. Ne čekáte na správný moment.
          Pravidelná investice průměruje nákupní cenu a eliminuje chybu načasování.
        </p>
        <p>
          Nefunguje s penězi, které budete potřebovat za dva roky. ETF je nástroj
          s horizontem deset a více let. Krátkodobé výdaje patří na spořicí účet,
          ne do portfolia.
        </p>

        <h2>Co kalkulačka neukáže</h2>
        <p>
          Kalkulačka ukáže číslo. Neukáže, jaká výše investice dává smysl v kombinaci
          s vaší hypotékou, firmou a životními výdaji. Neukáže, jaké ETF koupit ani
          u jakého brokera. Neukáže, jak to nastavit, aby to vydrželo i při příštím
          třicetiprocentním propadu.
        </p>
        <p>
          Na tohle je konzultace. A první je zdarma.
        </p>
        <Link href="/konzultace" className="btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 4 }}>
          <span>Probrat konkrétní plán</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </Link>
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

  if (CATEGORY_LABELS[slug]) {
    const catArticles = articles.filter((a) => a.category === slug);
    const label = CATEGORY_LABELS[slug];
    return (
      <>
        <nav>
          <div className="container nav-inner">
            <Link href="/" className="nav-logo">
              <span className="nav-logo-name">Adam Dvořák</span><span className="nav-logo-efa">, EFA</span>
            </Link>
            <div className="nav-right" style={{ gap: 10 }}>
              <Link href="/blog" className="btn-ghost" style={{ fontSize: 14 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
                <span>Všechny kategorie</span>
              </Link>
              <Link href="/" className="btn-primary">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
                <span>Zpět na web</span>
              </Link>
            </div>
          </div>
        </nav>
        <section style={{ padding: "80px 0 48px" }}>
          <div className="container">
            <div className="section-eyebrow">Blog</div>
            <h1 className="section-title-lg" style={{ marginTop: 12, marginBottom: 0 }}>
              {label}
            </h1>
          </div>
        </section>
        <main style={{ paddingBottom: 80 }}>
          <div className="container">
            {catArticles.length === 0 ? (
              <p style={{ color: "var(--text-3)", fontSize: 15, borderTop: "1px solid var(--border)", paddingTop: 28 }}>
                Články připravuji . Sledujte mě brzy.
              </p>
            ) : (
              <div className="blog-listing">
                {catArticles.map((article) => (
                  <Link key={article.slug} href={`/blog/${article.slug}`} className="blog-listing-card">
                    <div className="blog-listing-left">
                      <div className="blog-card-tag">{article.tag}</div>
                      <h2 className="blog-listing-title">{article.title}</h2>
                      <p className="blog-listing-desc">{article.desc}</p>
                    </div>
                    <div className="blog-listing-right">
                      <span className="blog-card-date">{article.date}</span>
                      <span className="blog-listing-arrow">→</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </main>
        <footer>
          <div className="container footer-inner">
            <div className="footer-logo">Adam <span>Dvořák</span> · <span>Finanční Stratég</span></div>
            <div className="footer-copy">© 2026 Adam Dvořák, EFA. <span>Registrován u ČNB.</span></div>
            <div className="footer-links">
              <Link href="/">Hlavní stránka</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/konzultace">Kontakt</Link>
            </div>
          </div>
        </footer>
      </>
    );
  }

  const article = getArticle(slug);
  if (!article) notFound();

  const related = articles
    .filter(a => a.slug !== slug && a.category === article.category)
    .slice(0, 2)
    .concat(articles.filter(a => a.slug !== slug && a.category !== article.category))
    .slice(0, 2);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.desc,
    url: `${BASE}/blog/${slug}`,
    datePublished: czechDateToISO(article.date),
    ...(article.updated ? { dateModified: czechDateToISO(article.updated) } : {}),
    author: { "@type": "Person", name: "Adam Dvořák", url: BASE },
    publisher: {
      "@type": "Organization",
      name: "Finanční Stratég",
      url: BASE,
      logo: { "@type": "ImageObject", url: `${BASE}/adam-dvorak-hero.jpg` },
    },
    image: { "@type": "ImageObject", url: `${BASE}/adam-dvorak-hero.jpg`, width: 1200, height: 800 },
    inLanguage: "cs",
    mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE}/blog/${slug}` },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Finanční Stratég", item: BASE },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE}/blog` },
      { "@type": "ListItem", position: 3, name: article.title, item: `${BASE}/blog/${slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <div className="progress" aria-hidden="true" />
      <div className="read-bar" id="readBar" aria-hidden="true" />
      {article.readTime && (
        <div className="read-chip" id="readChip">
          <span>{article.title.length > 44 ? article.title.slice(0, 41) + '…' : article.title}</span>
          <span style={{opacity:.4}}>·</span>
          <span id="chipTime" data-total={article.readTime}>{article.readTime} min čtení</span>
        </div>
      )}
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
            <AudioPlayer />
            <header className="article-header">
              <div className="article-tag">{article.tag}</div>
              <h1 className="article-title">{article.title}</h1>
              <div className="article-meta">
                <span className="av">AD</span>
                <span>{article.author}</span>
                <span>·</span>
                <span>{article.date}</span>
                {article.updated && (
                  <span className="updated">Aktualizováno {article.updated}</span>
                )}
                {article.readTime && (
                  <>
                    <span>·</span>
                    <span>{article.readTime} min čtení</span>
                  </>
                )}
              </div>
            </header>

            {article.tldr && article.tldr.length > 0 && (
              <div className="tldr">
                <ol>
                  {article.tldr.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ol>
              </div>
            )}
            <ArticleContent slug={slug} />

            <div className="article-cta">
              <div className="article-cta-text">
                <div className="section-eyebrow" style={{ marginBottom: 8 }}>Osobní rozhovor</div>
                <p>Chcete vědět, jak to vyjde u vás? První konzultace je bez závazků.</p>
              </div>
              <Link href="/konzultace" className="btn-primary">
                <span>Zahájit rozhovor</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>

            {/* ── Related ── */}
            {related.length > 0 && (
              <div className="related">
                <div className="section-eyebrow">Další čtení</div>
                <div className="g">
                  {related.map(a => (
                    <Link key={a.slug} href={`/blog/${a.slug}`}>
                      <b>{a.title}</b>
                      <span style={{ fontSize: 13, color: "var(--text-2)" }}>{a.tag}{a.readTime ? ` · ${a.readTime} min čtení` : ""}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          <nav className="toc" id="toc" aria-label="Obsah článku">
            {article.readTime && (
              <div id="tocTime" data-total={article.readTime} style={{fontSize:12,color:"var(--text-2)",marginBottom:16,fontWeight:500}}>
                Zbývá {article.readTime} {article.readTime === 1 ? "minuta" : "minut"} čtení
              </div>
            )}
          </nav>
        </div>
      </main>

      {/* ── Quote band ── */}
      <div className="quote-band">
        <div className="container quote-band-inner">
          <p className="quote-band-text">Peníze jsou nástroj, ne cíl. Cílem je svoboda: dělat rozhodnutí proto, že chcete, ne proto, že musíte.</p>
          <div className="quote-band-attr">Adam Dvořák, EFA</div>
          <div className="quote-band-progress"><div className="quote-band-fill" style={{ width: "100%" }} /></div>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer>
        <div className="container footer-inner">
          <div className="footer-logo">Adam <span>Dvořák</span> · <span>Finanční Stratég</span></div>
          <div className="footer-copy">© 2026 Adam Dvořák, EFA. <span>Registrován u ČNB.</span></div>
          <div className="footer-links">
            <Link href="/">Hlavní stránka</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/konzultace">Kontakt</Link>
          </div>
        </div>
      </footer>

      {/* ── Sticky CTA bar ── */}
      <div className="cta-bar" id="ctaBar">
        <span className="cta-bar-text">Chcete probrat vaši situaci osobně?</span>
        <Link href="/konzultace" className="cta-bar-btn">Zahájit rozhovor →</Link>
      </div>

      {/* ── Client scripts: progress, anchors, CTA bar ── */}
      <script dangerouslySetInnerHTML={{ __html: `
        // TOC: build from h2s, highlight active with IntersectionObserver
        (function() {
          var toc = document.getElementById('toc');
          if (!toc) return;
          var h2s = Array.from(document.querySelectorAll('.article-body h2'));
          if (!h2s.length) { toc.style.display = 'none'; return; }
          h2s.forEach(function(h, i) {
            if (!h.id) h.id = 'h-' + i;
            var a = document.createElement('a');
            a.href = '#' + h.id;
            a.textContent = h.textContent;
            toc.appendChild(a);
          });
          var links = toc.querySelectorAll('a');
          var io = new IntersectionObserver(function(entries) {
            entries.forEach(function(e) {
              if (e.isIntersecting) {
                links.forEach(function(l) { l.classList.remove('on'); });
                var active = toc.querySelector('a[href="#' + e.target.id + '"]');
                if (active) active.classList.add('on');
              }
            });
          }, { rootMargin: '-20% 0px -70% 0px' });
          h2s.forEach(function(h) { io.observe(h); });
          // Reading time countdown
          var countdown = document.getElementById('tocTime');
          if (countdown) {
            window.addEventListener('scroll', function() {
              var total = document.documentElement.scrollHeight - window.innerHeight;
              var pct = total > 0 ? window.scrollY / total : 0;
              var readTime = parseInt(countdown.dataset.total || '5', 10);
              var remaining = Math.max(1, Math.round(readTime * (1 - pct)));
              countdown.textContent = (remaining === 1 ? 'Zbývá 1 minuta' : 'Zbývají ' + remaining + ' minuty');
            }, { passive: true });
          }
        })();
        (function() {
          // Page progress bar + nav.scrolled + read-bar + read-chip
          var prog = document.querySelector('.progress');
          var nav = document.querySelector('nav');
          var readBar = document.getElementById('readBar');
          var readChip = document.getElementById('readChip');
          var chipTime = document.getElementById('chipTime');
          function updateProgress() {
            var total = document.documentElement.scrollHeight - window.innerHeight;
            var p = total > 0 ? window.scrollY / total : 0;
            var pct = p * 100;
            if (prog) prog.style.setProperty('--p', pct + '%');
            if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);
            if (readBar) readBar.style.setProperty('--read-p', p);
            if (readChip) readChip.classList.toggle('show', window.scrollY > 180);
            if (chipTime) {
              var rt = parseInt(chipTime.dataset.total || '5', 10);
              var rem = Math.max(1, Math.round(rt * (1 - p)));
              chipTime.textContent = rem + (rem === 1 ? ' minuta čtení' : ' min čtení');
            }
          }
          window.addEventListener('scroll', updateProgress, { passive: true });
          updateProgress();

          // Anchor copy links on h2
          document.querySelectorAll('.article-body h2').forEach(function(h2) {
            var txt = h2.textContent || '';
            var id = txt.toLowerCase()
              .replace(/[^a-z0-9\\u00C0-\\u024F\\s-]/g, '')
              .replace(/\\s+/g, '-')
              .replace(/-+/g, '-')
              .slice(0, 60);
            h2.id = id;
            var a = document.createElement('a');
            a.href = '#' + id;
            a.className = 'anchor-link';
            a.title = 'Kopírovat odkaz';
            a.innerHTML = '#';
            a.addEventListener('click', function(e) {
              e.preventDefault();
              var url = location.href.split('#')[0] + '#' + id;
              navigator.clipboard && navigator.clipboard.writeText(url);
              history.pushState(null, '', '#' + id);
            });
            h2.insertBefore(a, h2.firstChild);
          });

          // CTA bar: show after first scroll, hide near footer
          var ctaBar = document.getElementById('ctaBar');
          var footer = document.querySelector('footer');
          function updateCtaBar() {
            if (!ctaBar) return;
            var scrolled = window.scrollY > 200;
            var nearFooter = footer && footer.getBoundingClientRect().top < window.innerHeight + 60;
            ctaBar.classList.toggle('show', scrolled && !nearFooter);
          }
          window.addEventListener('scroll', updateCtaBar, { passive: true });
          updateCtaBar();
        })();
      ` }} />
    </>
  );
}
