import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticle } from "../articles";

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (CATEGORY_LABELS[slug]) {
    return { title: `${CATEGORY_LABELS[slug]} — Blog — Adam Dvořák` };
  }
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

  if (slug === "jak-investovat-do-etf") {
    return (
      <div className="article-body">
        <p>
          Výběr jednotlivých akcií je hra, ve které prohrává přes 80 % profesionálních správců fondů.
          Ne proto, že jsou hloupí — ale proto, že trh je efektivní a informace se rychle promítají
          do cen. Existuje jednodušší cesta: koupit celý trh najednou prostřednictvím ETF
          a nechat složený úrok pracovat za vás.
        </p>

        <h2>Co je ETF a proč funguje</h2>
        <p>
          ETF (Exchange Traded Fund) je fond obchodovaný na burze, který kopíruje vývoj indexu —
          například globálního akciového indexu zahrnujícího tisíce firem z celého světa najednou.
          Roční správcovský poplatek globálních indexových ETF se typicky pohybuje okolo 0,07–0,22 %.
          Srovnejte to s aktivně spravovanými podílovými fondy, kde bývá poplatek 1,5–2,5 %
          ročně — přičemž výkonnost přesto ve většině případů zaostává za trhem.
        </p>
        <p>
          Matematika je neúprosná: investujete-li 5 000 Kč měsíčně po dobu 30 let s průměrným
          výnosem 7 % p.a., rozdíl mezi poplatkem 0,20 % a 2 % představuje více než 1 500 000 Kč.
          To nejsou procenta — to jsou peníze.
        </p>

        <h2>Daňové výhody v Česku</h2>
        <p>
          Česká daňová pravidla pro ETF jsou jedny z nejpříznivějších v Evropě, pokud víte,
          jak je využít. Základní nástroj je <strong>časový test tří let</strong>: prodáte-li
          investici nejdříve tři roky po nákupu, zisk z prodeje je osvobozen od daně z příjmů.
          Přesná aplikace závisí na vaší situaci a doporučuji ji konzultovat s daňovým poradcem —
          pravidla se mění a detaily záleží.
        </p>

        <h2>Než začnete: horizont a plán jsou základ</h2>
        <p>
          ETF investování není loterie ani rychlé zbohatnutí. Je to nástroj vhodný pro lidi,
          kteří <strong>vědí, kdy peníze budou potřebovat</strong> — a jsou připraveni, že do té
          doby mohou být dočasně v minusu.
        </p>
        <p>
          Trhy klesají. Někdy o 20 %, někdy o 40 %. Kdo investuje peníze, které potřebuje
          za rok, riskuje, že bude nucen prodávat se ztrátou. Kdo investuje s horizontem
          10–20 let a má pokryté krátkodobé výdaje jinde, může propady přečkat a nechat
          portfolio se zotavit. Investiční horizont není doporučení — je to nutná podmínka.
        </p>
        <p>
          Tento článek je vzdělávací a nepředstavuje investiční doporučení. Konkrétní
          rozhodnutí — jaké ETF, u jakého brokera, v jaké výši a v jakém poměru — závisí
          na vaší osobní situaci, toleranci rizika a finančním plánu. Pokud si nejste jisti,
          obraťte se na regulovaného investičního poradce.
        </p>

        <h2>Jak funguje pravidelné investování</h2>
        <p>
          Nejúčinnějším přístupem pro většinu investorů je <strong>pravidelný nákup
          stejné částky</strong> v pevném intervalu — například měsíčně. Tento přístup
          se nazývá průměrování nákladů (cost averaging): kupujete více podílů,
          když jsou ceny nízké, méně když jsou vysoké. Výsledná průměrná nákupní cena
          je nižší než průměrná cena za sledované období.
        </p>
        <p>
          Efektem je eliminace rizika špatného načasování — největší paralýzy, kterou
          investoři zažívají. „Teď je příliš draho." „Počkám na propad." „Až bude
          situace jasnější." Pravidelný plán tyto mentální pasti obchází automaticky.
        </p>

        <h2>Tři chyby, které investory nejvíce stojí</h2>
        <p>
          <strong>Prodávat při poklesu trhu.</strong> Pokles není varování — je to sleva.
          Kdo prodá v propadu a počká na „lepší časy", nejčastěji nakoupí zpět výše,
          než kde prodával. Historicky se trhy vždy zotavily — ale kdo vyskočil, ten
          zotavení nestihl.
        </p>
        <p>
          <strong>Přehnaná diverzifikace.</strong> Deset různých ETF z podobných indexů
          není diverzifikace — je to zbytečná složitost a vyšší administrativní zátěž.
          Diverzifikace znamená různé třídy aktiv a geografie, ne množství produktů.
        </p>
        <p>
          <strong>Čekat na správný moment.</strong> Nejlepší čas začít investovat byl
          před deseti lety. Druhý nejlepší je dnes — ale pouze tehdy, kdy máte
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
          produkt s garantovaným výnosem 2 % jako penzijní spoření — jde o plnohodnotný
          investiční účet, kde sami rozhodujete, co koupíte. A kde vám stát ročně vrátí
          až 7 200 Kč na daních.
        </p>

        <h2>Co přesně DIP je</h2>
        <p>
          Dlouhodobý investiční produkt (DIP) je regulovaný investiční účet zavedený od
          1. 1. 2024. Funguje podobně jako britský ISA nebo německý Depot — investujete
          do akcií, ETF nebo podílových fondů, přičemž příspěvky si odečítáte z daňového
          základu. Na rozdíl od penzijního spoření nejste omezeni konzervativními fondy
          s nízkými výnosy.
        </p>

        <h2>Kolik ušetříte na daních</h2>
        <p>
          Roční limit daňového odpočtu je <strong>48 000 Kč</strong> (tj. 4 000 Kč měsíčně).
          Daňová úspora závisí na vaší sazbě daně z příjmů:
        </p>
        <ul>
          <li>15% sazba (příjmy do 1 762 812 Kč/rok): úspora <strong>7 200 Kč ročně</strong></li>
          <li>23% sazba (příjmy nad 1 762 812 Kč/rok): úspora <strong>11 040 Kč ročně</strong></li>
        </ul>
        <p>
          Pozor: limit 48 000 Kč je sdílený s penzijním spořením a životním pojištěním.
          Pokud příspíváte 2 000 Kč měsíčně do penzijka (24 000 Kč/rok), zbývá vám
          24 000 Kč prostoru pro DIP.
        </p>

        <h2>Příspěvek zaměstnavatele — přehlížená výhoda</h2>
        <p>
          Zaměstnavatel může přispívat do DIP až <strong>50 000 Kč ročně</strong> a tento
          příspěvek je zcela osvobozen od daně z příjmů, sociálního i zdravotního pojištění —
          jak na straně zaměstnavatele, tak zaměstnance. Jde o jednu z mála legálních cest,
          jak dostat benefity bez odvodů.
        </p>
        <p>
          Pokud vám zaměstnavatel přispívá do penzijního spoření, stojí za to iniciovat
          rozhovor o přesunu (nebo přidání) příspěvku do DIP — potenciální výnosy jsou
          historicky výrazně vyšší.
        </p>

        <h2>Pravidlo 120/60 — podmínky pro zachování výhod</h2>
        <p>
          Aby jste o daňový odpočet nepřišli, musí být splněny dvě podmínky zároveň:
          produkt musí trvat minimálně <strong>10 let</strong> (120 měsíců) a výběr
          nesmí proběhnout před dosažením věku <strong>60 let</strong>. Porušení
          kterékoliv podmínky znamená vrácení všech uplatněných odpočtů navýšených
          o úrok z prodlení.
        </p>
        <p>
          Od 1. 1. 2025 platí, že přenesete-li DIP k jinému poskytovateli, původní
          lhůta se zachovává — nejste tedy „uvězněni" u jedné instituce.
        </p>

        <h2>Co v DIP koupit</h2>
        <p>
          Dostupné instrumenty: akcie, ETF, podílové fondy — bez konzervativních omezení.
          Doporučuji globální akumulační ETF (VWCE nebo IWDA), které reinvestují dividendy
          a maximálně využívají složený úrok v dlouhém horizontu. Neplaťte poplatky za
          aktivní správu, pokud to nepotřebujete.
        </p>

        <h2>DIP vs. penzijní spoření: kdo vyhraje?</h2>
        <p>
          Penzijní spoření má státní příspěvek (až 340 Kč/měsíc při vkladu 1 700 Kč)
          a je bezpečnější — garantovaný nezáporný výnos. DIP nemá státní příspěvek,
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
          „Mějte tří měsíční rezervu." Tuto radu slýcháte všude — ale málokdo dodá,
          kde přesně ji mít. Přitom na tom záleží. Peníze na běžném účtu s nulovým
          úrokem při inflaci 3 % reálně každý rok ztrácejí hodnotu. Zároveň mít
          vše v investicích bez likvidní rezervy je recept na prodávání akcií ve
          špatnou chvíli.
        </p>

        <h2>Třívrstvý systém — každá vrstva slouží jinému účelu</h2>
        <p>
          <strong>Vrstva 1 — Okamžitá likvidita (1 měsíc výdajů):</strong> Běžný účet,
          dostupný okamžitě. Slouží na nečekané faktury, krátkodobé výpadky příjmu
          nebo drobné opravy. Zde nehledáte výnos — hledáte dostupnost.
        </p>
        <p>
          <strong>Vrstva 2 — Krátkodobá rezerva (2–3 měsíce výdajů):</strong> Spořicí
          účet nebo spořicí stavební spoření s výnosem 3,5–4,3 % p.a. V roce 2026 takové
          sazby nabízí Fio banka, Air Bank, MONETA a další. Peníze jsou dostupné
          do 7 dnů. Tato vrstva pokryje ztrátu zaměstnání, větší opravu auta nebo
          zdravotní výdaje.
        </p>
        <p>
          <strong>Vrstva 3 — Střednědobá rezerva (volitelná, 1–3 měsíce navíc):</strong>
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
          v nejhorší možnou chvíli — při poklesu trhu. Průměrný medvědí trh znamená pokles
          o 30–50 %. Prodat tehdy neznamená jen ztrátu v danou chvíli — přijdete o celé
          budoucí zhodnocení těch peněz.
        </p>
        <p>
          <strong>Příliš mnoho rezervy:</strong> 12 měsíčních výdajů na spořicím účtu
          je zbytečné. Rozdíl mezi 3 a 9 měsíci rezervy — řekněme 300 000 Kč navíc —
          investovaných po dobu 20 let při 7 % p.a. představuje více než 1 160 000 Kč
          rozdíl ve výsledném portfoliu.
        </p>

        <h2>Kde konkrétně rezervu uložit (2026)</h2>
        <p>
          Pro vrstvu 2 hledejte spořicí účty s výnosem nad 3,5 % bez povinných podmínek.
          Srovnávejte na bankovních srovnávačích nebo přímo na webech bank — sazby se
          mění a to, co bylo nejlepší loni, nemusí platit dnes.
        </p>
        <p>
          Pro vrstvu 3 jsou vhodné peněžní fondy (Conseq, ČS Fondy, Raiffeisen) nebo
          krátké dluhopisové ETF. Vyhněte se stavebnímu spoření jako rezervě — šestileté
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
          situaci složitější — ale zároveň výrazně více možností. Správnou kombinací nástrojů
          lze legálně ušetřit desítky až stovky tisíc korun ročně. Podmínkou je plánovat
          předem, ne v dubnu.
        </p>

        <h2>Pro OSVČ: paušální výdaje nebo skutečné?</h2>
        <p>
          Paušální výdaje nevyžadují doklady ani vedení účetnictví — automaticky snižují
          základ daně o pevné procento z příjmů. Sazby v roce 2026:
        </p>
        <ul>
          <li><strong>80 %</strong> — řemeslníci a živnostníci (max. 1 600 000 Kč výdajů)</li>
          <li><strong>60 %</strong> — ostatní živnosti a většina služeb (max. 1 200 000 Kč)</li>
          <li><strong>40 %</strong> — autoři, lékaři bez praxe, svobodná povolání (max. 800 000 Kč)</li>
          <li><strong>30 %</strong> — příjmy z nájmu (max. 600 000 Kč)</li>
        </ul>
        <p>
          Paušální výdaje se nevyplatí, máte-li reálné výdaje výrazně vyšší — firemní auto,
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
          Zásadní omezení: v paušálním režimu <strong>nelze uplatňovat daňové odpočty</strong> —
          DIP, penzijní spoření, slevy na děti ani úroky z hypotéky. Pokud tyto odpočty
          máte, spočítejte si, co je výhodnější. Přihláška vždy do <strong>12. ledna</strong>
          daného roku — letos je termín pryč, přemýšlejte o změně od roku 2027.
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
          Dividendy ze s.r.o. se daní 15 % srážkovou daní — bez sociálního a zdravotního
          pojištění. Hrubý plat naopak podléhá dani z příjmů a celkovým odvodům okolo 48 %
          hrubé mzdy (zaměstnanec + zaměstnavatel dohromady). Z pohledu celkového zdanění
          jsou dividendy výrazně výhodnější.
        </p>
        <p>
          Optimální nastavení: minimální plat ve výši, která splňuje odvodové povinnosti
          a prokazuje reálný výkon manažerské práce — zbytek jako dividendy. Příliš nízký
          plat bez reálného zdůvodnění je riziko doměření ze strany finančního úřadu.
          S.r.o. se vyplatí při ročních příjmech zpravidla od 1–1,5 milionu Kč výše.
        </p>

        <h2>Klíčové datum: 31. prosinec</h2>
        <p>
          Daňové odpočty uplatníte za rok, ve kterém jste příspěvky zaplatili. DIP,
          penzijní spoření, dary — vše musí být zaplaceno do 31. 12., aby snížilo základ
          daně za daný rok. Přechod na paušální daň nebo změna výdajového režimu platí
          od 1. 1. — rozhodnutí musíte udělat v listopadu nebo prosinci, ne v dubnu.
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
          úrokové sazby</strong>. Při sazbě 4,5 % p.a. je to garantovaných 4,5 % —
          bez rizika, bez volatility. Otázka pak zní: dokážete najít investici
          s vyšším výnosem? Historický průměrný výnos globálních akciových indexů
          je 7–10 % p.a. (před inflací). Ve velmi dlouhém horizontu — a s ochotou
          přijmout krátkodobé výkyvy — odpověď zní: zpravidla ano.
        </p>
        <p>
          Pravidlo: pokud je vaše hypoteční sazba nižší než očekávaný výnos
          z investic, matematicky vychází lépe investovat. Pokud je sazba vyšší
          (typicky nad 6–7 %), je extra splátka smysluplnější.
        </p>

        <h2>Kdy extra splátka rozhodně dává smysl</h2>
        <ul>
          <li><strong>Blížíte se konci fixace nebo splatnosti</strong> — zbývají-li 3–5 let,
            efekt složeného úroku z investic je omezený. Splátka jistiny sníží zbývající
            úroky efektivněji.</li>
          <li><strong>Máte averzi k dluhu</strong> — psychologická hodnota „vlastnit bydlení
            bez dluhů" je legitimní a má svou cenu. Není potřeba ji ignorovat.</li>
          <li><strong>Refinancujete</strong> — nižší jistina při refinancování zlepší vaši
            pozici vůči bance a může přinést lepší sazbu.</li>
          <li><strong>Dostali jste jednorázový příjem</strong> (dědictví, bonus, prodej aktiv) —
            lepší než nechat peníze ladem.</li>
        </ul>

        <h2>Pravidla pro mimořádné splátky bez sankce (2026)</h2>
        <p>
          Zákon umožňuje každý rok splatit mimořádně až <strong>25 % jistiny bez poplatku</strong>,
          ale pouze v okně <strong>1 měsíc před výročím</strong> uzavření smlouvy. Mimo toto
          okno si banka může účtovat administrativní poplatek — od roku 2025 se tato pravidla
          zpřísnila, konkrétní podmínky si ověřte ve své smlouvě.
        </p>
        <p>
          Zdarma a bez omezení: <strong>konec fixačního období</strong> — tehdy můžete splatit
          libovolnou výši. Toto je ideální moment pro velkou splátku, pokud ji plánujete.
          Dále jsou bez sankcí povoleny splátky při tzv. „životních událostech": rozvod, smrt
          dlužníka, ztráta zaměstnání nebo vážná nemoc.
        </p>

        <h2>Pozor: úroky z hypotéky nejsou daňově odečitatelné</h2>
        <p>
          Na rozdíl od mnoha zemí EU platí v Česku, že úroky z hypotéky na primární bydlení
          <strong> nejsou daňově odečitatelné</strong> — s výjimkou smluv sjednaných do
          31. 12. 2020, kde odpočet až 150 000 Kč ročně stále platí. Máte-li starší
          hypotéku s tímto odpočtem, vaše efektivní úroková sazba je nižší — kalkulujte
          s ní, ne s nominální sazbou.
        </p>

        <h2>Kombinovaná strategie: splácet i investovat</h2>
        <p>
          Nejlepší výsledky přináší kombinace obou přístupů. Příklad: při sazbě 4,5 %
          a disponibilních 10 000 Kč/měsíc nad rámec povinné splátky — investujte 7 000 Kč
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
                Články připravuji — sledujte mě brzy.
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
              <Link href="/#contact">Kontakt</Link>
            </div>
          </div>
        </footer>
      </>
    );
  }

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
