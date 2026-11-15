import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { articles, getArticle } from "../articles";
import { categories, getCategory } from "../categories";
import { CategoryChips } from "../CategoryChips";
import { FaqAccordion } from "../FaqAccordion";
import { ArticleToc } from "../ArticleToc";
import { ArticleHints } from "../ArticleHints";
import { ArticleFeedback } from "../ArticleFeedback";
import { PullQuote } from "../PullQuote";
import { DipKalk } from "../DipKalk";
import { PenzijkoKalk } from "../PenzijkoKalk";
import { SverenskyFond } from "../SverenskyFond";
import { AudioPlayer } from "../AudioPlayer";
import { HoldingDiag } from "../HoldingDiag";
import { EtfKalk } from "../EtfKalk";
import { SiteFooter } from "../../SiteFooter";

export function generateStaticParams() {
  return [
    ...articles.map((a) => ({ slug: a.slug })),
    ...categories.map((c) => ({ slug: c.id })),
  ];
}

const BASE = "https://www.financnistrateg.com";
const FEED = `${BASE}/feed.xml`;
const LINKEDIN = "https://www.linkedin.com/in/adam-dvo%C5%99%C3%A1k-efa-721479210/";

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
  const category = getCategory(slug);
  if (category) {
    return {
      title: category.seoTitle,
      description: category.desc,
      alternates: {
        canonical: `${BASE}/blog/${slug}`,
        types: { "application/rss+xml": FEED },
      },
      openGraph: {
        title: category.seoTitle,
        description: category.desc,
        url: `${BASE}/blog/${slug}`,
        siteName: "Finanční Stratég",
        locale: "cs_CZ",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: category.seoTitle,
        description: category.desc,
      },
    };
  }
  const article = getArticle(slug);
  if (!article) return {};
  // Popisek pro vyhledávače se může lišit od delšího textu na kartě článku
  const description = article.seoDesc ?? article.desc;
  // Obrázek pro sdílení se bere z opengraph-image.tsx v této složce. Kdyby tu byl uvedený
  // jiný, přebil by ho a všechny články by sdílely stejnou fotku.
  return {
    title: { absolute: article.seoTitle ?? article.title },
    description,
    alternates: {
      canonical: `${BASE}/blog/${slug}`,
      types: { "application/rss+xml": FEED },
    },
    openGraph: {
      title: article.title,
      description,
      url: `${BASE}/blog/${slug}`,
      siteName: "Finanční Stratég",
      locale: "cs_CZ",
      type: "article",
      authors: [article.author],
      publishedTime: czechDateToISO(article.date),
      modifiedTime: czechDateToISO(article.updated ?? article.date),
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description,
    },
  };
}

function ArticleContent({ slug }: { slug: string }) {


  if (slug === "fixace-hypoteky-jak-se-rozhodnout") {
    return (
      <div className="article-body">
        <p>
          Jedním z prvních rozhodnutí u hypotéky je délka fixace. Po tu dobu banka garantuje
          sazbu, a tedy i výši splátky. Nejde přitom jen o to, která sazba je dnes nejnižší.
          Rozhoduje, co s vámi udělá sazba, kterou dostanete, až fixace skončí.
        </p>

        <h2>Co se stane na konci fixace</h2>
        <p>
          Vezměme hypotéku 4&nbsp;000&nbsp;000&nbsp;Kč na 30 let se sazbou 4,5&nbsp;%. Splátka je
          20&nbsp;267&nbsp;Kč měsíčně. Po pěti letech dlužíte ještě asi 3&nbsp;646&nbsp;000&nbsp;Kč
          a banka vám nabídne novou sazbu na zbývajících 25 let:
        </p>
        <div className="nums">
          <div className="num">
            <span>Nová sazba 3,5&nbsp;%</span>
            <b>18&nbsp;254&nbsp;Kč</b>
            <p>měsíčně. O 2&nbsp;000&nbsp;Kč méně než dnes.</p>
          </div>
          <div className="num">
            <span>Nová sazba 5,5&nbsp;%</span>
            <b>22&nbsp;392&nbsp;Kč</b>
            <p>měsíčně. O 2&nbsp;100&nbsp;Kč víc než dnes.</p>
          </div>
          <div className="num navy">
            <span>Nová sazba 6,5&nbsp;%</span>
            <b>24&nbsp;620&nbsp;Kč</b>
            <p>měsíčně. O 4&nbsp;350&nbsp;Kč víc, přes 52&nbsp;000&nbsp;Kč ročně.</p>
          </div>
        </div>
        <p>
          Otázka tedy nezní „jakou fixaci chci“, ale „unesu splátku o čtyři tisíce vyšší?“.
          Pokud ano, můžete si dovolit kratší fixaci a víc flexibility. Pokud ne, kupujete si
          delší fixací klid.
        </p>

        <h2>Krátká fixace (1 až 3 roky)</h2>
        <p>
          Hodí se, když plánujete nemovitost prodat nebo hypotéku brzy výrazně splatit a zároveň
          unesete vyšší splátku, kdyby sazby šly nahoru. Konec fixace je totiž chvíle, kdy můžete splatit
          libovolnou částku bez poplatku. Nevýhoda je nejistota: za rok nebo za tři roky se sazba
          nastaví podle trhu a ten může být výrazně horší.
        </p>

        <h2>Střední fixace (5 let)</h2>
        <p>
          Dlouho nejoblíbenější volba, dnes u nových hypoték převažují tříleté fixace. Pro většinu
          lidí je to pořád rozumný kompromis. Pět let stability
          pro rodinný rozpočet, a přitom hypotéku nezamknete na příliš dlouho. Za pět let se
          změní příjmy, rodina i plány a vy můžete podmínky přizpůsobit.
        </p>

        <h2>Dlouhá fixace (7 až 10 let)</h2>
        <p>
          Maximální jistota, splátka se nezmění bez ohledu na vývoj trhu. Platíte za to
          flexibilitou: mimo konec fixace splatíte bez poplatku jen v případech, které určuje
          zákon. Typicky jednou ročně do 25&nbsp;% původní výše úvěru v měsíci před výročím
          smlouvy. U smluv a fixací sjednaných od září 2024 navíc při prodeji nemovitosti nebo
          při vypořádání společného jmění po rozvodu, pokud od podpisu smlouvy uplynuly aspoň
          dva roky. Bez poplatku je i splacení kvůli úmrtí, dlouhodobé nemoci nebo invaliditě. Hodí se pro lidi se
          stabilním příjmem, kteří s nemovitostí nic neplánují a chtějí mít splátku jistou.
        </p>

        <h2>Čtyři otázky před podpisem</h2>
        <ul>
          <li><strong>Unesu splátku při sazbě vyšší o 2 až 3 procentní body?</strong> Spočítejte si ji
          v <Link href="/?kalkulacka=hypoteka#calculators">hypoteční kalkulačce</Link>. Pokud by vás
          vyšší splátka dostala do potíží, volte delší fixaci.</li>
          <li><strong>Co plánuji v příštích letech?</strong> Prodej, stěhování, větší splátku
          z bonusu nebo z prodeje firmy? Pak fixaci nastavte tak, aby končila kolem té doby.</li>
          <li><strong>Mám rezervu?</strong> Kdo má stranou šest měsíčních výdajů, přežije
          i nepříjemnou refixaci bez paniky.</li>
          <li><strong>Jaký je rozdíl v sazbách?</strong> Když je delší fixace dražší jen
          o pár desetin procentního bodu, jistota se obvykle vyplatí.</li>
        </ul>

        <h2>Na konci fixace nepodepisujte automaticky</h2>
        <p>
          Banka vám nejpozději tři měsíce před koncem fixace pošle novou nabídku. Většina lidí ji
          jen podepíše. Přitom je to chvíle, kdy můžete bez poplatku přejít k jiné bance, splatit
          část dluhu nebo vyjednat lepší sazbu. Srovnejte nabídky aspoň dvou dalších bank. Kdy
          a za kolik jde splácet mimořádně, rozebírám v článku{" "}
          <Link href="/blog/mimoradna-splatka-hypoteky">Mimořádná splátka hypotéky: kdy se vyplatí a kdy ne</Link>.
        </p>

        <h2>Závěr</h2>
        <p>
          Univerzálně správná délka fixace neexistuje. Kratší fixace vám nechává volnost, delší
          chrání rozpočet. Rozhodujte podle toho, co unesete, ne podle toho, co si myslíte
          o budoucích sazbách. Ty nezná nikdo. Pokud si nejste jistí, rád to s vámi projdu.
        </p>

        <p style={{ marginTop: 24, fontSize: 13.5, color: "var(--text-2)", lineHeight: 1.65 }}>
          Splátky jsou orientační a počítají s anuitním splácením. Zdroj: zákon č. 257/2016 Sb.,
          o spotřebitelském úvěru, § 102 odst. 3 (nabídka před koncem fixace) a § 117 (předčasné
          splacení). Článek je vzdělávací
          a nepředstavuje úvěrové doporučení.
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
        <PullQuote a="Státní důchod je záchranná síť." b="Není to plán." />
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
        <p>
          Pokud s investováním teprve začínáte, přečtěte si nejdřív{" "}
          <Link href="/blog/etf-pro-zacatecniky">ETF pro začátečníky: tři kroky, než koupíte první fond</Link>.
          Tento článek jde hlouběji do mechaniky a daňových nástrojů.
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
        <p>
          Dalším nástrojem je DIP (Dlouhodobý investiční produkt), který umožňuje daňový odpočet
          příspěvků až 48 000 Kč ročně ze základu daně. Jak funguje a pro koho se vyplatí:{" "}
          <Link href="/blog/dip-dlouhodoby-investicni-produkt">DIP: jak ušetřit 7 200 Kč na daních každý rok</Link>.
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
        <p>
          Spočítejte si, co z pravidelné investice vyjde za deset, dvacet nebo třicet let:{" "}
          <Link href="/blog/etf-spocitejte-si">ETF kalkulačka: spočítejte si, co z toho bude</Link>.
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
        <p>
          Jak vybrat konkrétní ETF jako český investor a na co se zaměřit při výběru:{" "}
          <Link href="/blog/jak-vybrat-etf-pro-cecha">Jak vybrat ETF jako český investor: šest kritérií, která rozhodnou</Link>.
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
          aktivní správu, pokud to nepotřebujete. Podle čeho ETF vybírat:{" "}
          <Link href="/blog/jak-vybrat-etf-pro-cecha">Jak vybrat ETF jako český investor: šest kritérií, která rozhodnou</Link>.
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
          „Mějte tříměsíční rezervu.“ Tuhle radu slýcháte všude, ale málokdo dodá, kde přesně ji
          mít a jak velká má být právě u vás. Přitom na tom záleží. Peníze na běžném účtu bez
          úroku reálně každý rok ztrácejí hodnotu. A mít všechno v investicích bez rezervy je
          recept na prodávání akcií v té nejhorší chvíli.
        </p>

        <h2>Proč rezerva není jedno číslo</h2>
        <p>
          Rezerva má tři úkoly: zaplatit nečekanou fakturu ještě dnes, přežít výpadek příjmu
          a zabránit tomu, abyste museli sáhnout na investice, když zrovna padají. Každý z nich
          potřebuje jiné místo. Proto ji stavím ve třech vrstvách.
        </p>

        <h2>Třívrstvý systém</h2>
        <p>
          <strong>Vrstva 1: okamžitá likvidita, zhruba 1 měsíc výdajů.</strong> Běžný účet,
          peníze k dispozici hned. Na nečekané faktury, opravy a krátké výpadky. Tady nehledáte
          výnos, hledáte dostupnost.
        </p>
        <p>
          <strong>Vrstva 2: krátkodobá rezerva, 2 až 3 měsíce výdajů.</strong> Spořicí účet bez
          podmínek, peníze dostupné do pár dní. Pokryje ztrátu zaměstnání, výpadek zakázek, větší
          opravu auta nebo zdravotní výdaje. Sazby spořicích účtů se mění s úrokovými sazbami ČNB,
          takže je jednou za čas porovnejte. To, co bylo nejlepší loni, nemusí platit dnes.
        </p>
        <p>
          <strong>Vrstva 3: střednědobá rezerva, volitelně 1 až 3 měsíce navíc.</strong> Fond
          peněžního trhu nebo krátkodobé dluhopisy. Peníze tu bývají obvykle do týdne, podle statutu
          fondu ale i později.
          Hodí se pro podnikatele a OSVČ s nepravidelnými příjmy nebo pro domácnost, kde výpadek
          jednoho příjmu zasáhne celý rozpočet.
        </p>

        <div className="nums">
          <div className="num">
            <span>Vrstva 1</span>
            <b>1 měsíc</b>
            <p>běžný účet, peníze hned.</p>
          </div>
          <div className="num">
            <span>Vrstva 2</span>
            <b>2 až 3 měsíce</b>
            <p>spořicí účet, peníze do pár dní.</p>
          </div>
          <div className="num navy">
            <span>Vrstva 3</span>
            <b>1 až 3 měsíce</b>
            <p>fond peněžního trhu, pro nepravidelné příjmy.</p>
          </div>
        </div>

        <h2>Jak velká má být vaše rezerva</h2>
        <p>
          Počítejte výdaje, ne příjmy. Kolik doopravdy potřebujete měsíčně na bydlení, jídlo,
          splátky, energie a základní provoz domácnosti?
        </p>
        <ul>
          <li>Zaměstnanec na stabilní pozici: <strong>3 měsíce</strong> výdajů.</li>
          <li>Zaměstnanec ve zkušební době nebo s velkou variabilní složkou: <strong>4 až 5 měsíců</strong>.</li>
          <li>Podnikatelé, OSVČ a domácnosti s jedním příjmem: <strong>6 měsíců</strong>.</li>
          <li>Domácnost s hypotékou a jedním příjmem: <strong>6 měsíců</strong> jako minimum.</li>
        </ul>
        <p>
          Příklad: domácnost podnikatele utratí 60&nbsp;000&nbsp;Kč měsíčně. Na běžném účtu drží
          60&nbsp;000, na spořicím účtu 180&nbsp;000 a ve fondu peněžního trhu dalších
          120&nbsp;000&nbsp;Kč. Dohromady 360&nbsp;000&nbsp;Kč, šest měsíců výdajů. Co je
          navíc, může pracovat jinde. Kam přesně, záleží na tom, na co a na jak dlouho ty peníze máte.
        </p>

        <h2>Majitel firmy: rezerva doma, ne ve firmě</h2>
        <p>
          U majitelů firem slyším často: „Rezervu mám, na firemním účtu.“ To ale není vaše rezerva.
          Peníze firmy patří firmě, a když se jí přestane dařit, budou chybět přesně v tu chvíli,
          kdy je budete potřebovat i doma. Firma potřebuje vlastní provozní rezervu a vy svou
          osobní. Proč na tom záleží, rozebírám v článku{" "}
          <Link href="/blog/firma-a-osobni-majetek">Firma roste. Váš osobní majetek ne.</Link>
        </p>

        <h2>Dvě chyby, které stojí nejvíc</h2>
        <p>
          <strong>Příliš malá rezerva.</strong> Bez polštáře budete nuceni prodávat investice
          v nejhorší chvíli, při poklesu trhu. Medvědí trh začíná propadem o 20&nbsp;%. V roce 2008 spadl americký index S&amp;P 500 skoro o 57&nbsp;%.
          Kdo tehdy prodá, nepřijde jen o peníze v tu chvíli, ale i o návrat trhu, který historicky přišel potom.
          Jak takový propad přečkat, popisuji v článku{" "}
          <Link href="/blog/propady-trhu-co-delat">Akcie padají: co dělat při propadu trhu</Link>.
        </p>
        <p>
          <strong>Příliš velká rezerva.</strong> Dvanáct měsíčních výdajů na spořicím účtu je
          zbytečně moc. Řekněme, že máte o 300&nbsp;000&nbsp;Kč víc, než potřebujete. Na spořicím
          účtu při 3&nbsp;% ročně z nich za 20 let bude zhruba 540&nbsp;000&nbsp;Kč. Investované při
          7&nbsp;% by narostly na 1&nbsp;160&nbsp;000&nbsp;Kč. Rozdíl přes 600&nbsp;000&nbsp;Kč,
          jen proto, že peníze ležely na špatném místě. Výnos investic zaručený není, ale na
          dvaceti letech byl ten rozdíl v minulosti znát.
        </p>

        <h2>Kde rezervu nedržet</h2>
        <ul>
          <li><strong>Ve stavebním spoření.</strong> Peníze jsou vázané šest let. Když smlouvu
          vypovíte dřív, přijdete o státní podporu (pokud peníze nejdou s úvěrem ze stavebka na
          bydlení) a čekáte ještě tři měsíce výpovědní lhůty. Na nouzové peníze se nehodí.</li>
          <li><strong>V akciích nebo akciových fondech.</strong> Ve chvíli, kdy rezervu potřebujete,
          můžou být o třetinu dole.</li>
          <li><strong>V jedné bance nad limit pojištění vkladů.</strong> Pojištění kryje
          100&nbsp;000&nbsp;eur na jednoho člověka u jedné banky. Pozor, dvě značky můžou patřit
          jedné bance s jedním limitem. Větší částky rozložte.</li>
        </ul>

        <h2>Co dál</h2>
        <p>
          Jakmile máte rezervu hotovou, můžete začít investovat bez strachu, že budete muset
          prodávat ve špatnou chvíli. Jak na první kroky, popisuji v článku{" "}
          <Link href="/blog/etf-pro-zacatecniky">ETF pro začátečníky</Link>, a co z pravidelné
          investice vyjde, si spočítáte v{" "}
          <Link href="/blog/etf-spocitejte-si">ETF kalkulačce</Link>.
        </p>

        <p style={{ marginTop: 24, fontSize: 13.5, color: "var(--text-2)", lineHeight: 1.65 }}>
          Výpočty jsou orientační. Výnosy z minulosti nejsou zárukou budoucích výnosů. Článek je
          vzdělávací a nepředstavuje investiční doporučení.
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
          Mimořádná splátka hypotéky vyvolává silnou emoci: dluh mizí, úroky klesají
          a člověk spí klidněji. Matematika ale s emocí ne vždy souhlasí. Než pošlete
          bance peníze navíc, stojí za to počítat.
        </p>

        <h2>Základní matematika rozhodnutí</h2>
        <p>
          Mimořádná splátka přináší <strong>jistý výnos rovný úrokové sazbě hypotéky</strong>.
          Při sazbě 4,5&nbsp;% ročně je to 4,5&nbsp;%, bez rizika a bez výkyvů. Otázka pak zní,
          jestli peníze jinde vydělají víc. Globální akciové indexy historicky vynášely
          zhruba 7 až 10&nbsp;% ročně před inflací. Zaručené to ale není a cestou se počítá
          i s roky, kdy portfolio padá o desítky procent.
        </p>
        <p>
          Pravidlo: když je sazba hypotéky výrazně nižší než výnos, který čekáte od investic
          s horizontem 10 a více let, vychází matematicky lépe investovat. Čím víc se sazba
          k očekávanému výnosu blíží, tím víc dává smysl splácet.
        </p>

        <h2>Kdy mimořádná splátka dává smysl</h2>
        <ul>
          <li><strong>Blíží se konec splatnosti.</strong> Zbývá-li pár let, investice nestihnou
          naplno využít složené úročení. Snížení jistiny ušetří úroky jistě.</li>
          <li><strong>Dluh vás tíží.</strong> Klidný spánek bez hypotéky je legitimní hodnota
          a má svou cenu. Není potřeba ho ignorovat.</li>
          <li><strong>Končí fixace a refinancujete.</strong> Nižší jistina vylepší vaši
          vyjednávací pozici u banky a může přinést lepší sazbu.</li>
          <li><strong>Dostali jste jednorázový příjem</strong>, třeba dědictví, bonus nebo
          peníze z prodeje. Lepší než je nechat ležet na účtu.</li>
        </ul>

        <h2>Kdy splatit bez poplatku</h2>
        <p>
          Hypotéku můžete podle zákona o spotřebitelském úvěru splatit kdykoli, zcela nebo
          zčásti. Bez jakékoli náhrady bance to jde v těchto chvílích:
        </p>
        <ul>
          <li><strong>Ke konci fixace.</strong> Banka vám nejpozději tři měsíce před koncem fixace
          pošle novou sazbu. Do tří měsíců od tohoto oznámení můžete splatit libovolnou částku.
          Lhůta běží od dopisu, ne od konce fixace, tak si datum dopisu pohlídejte. Pokud
          plánujete velkou splátku, je to ideální moment.</li>
          <li><strong>Jednou ročně až 25&nbsp;% celkové výše úvěru</strong>, tedy původně půjčené
          částky, ne zbývajícího dluhu. Musí to být v měsíci před výročím uzavření smlouvy.
          Rozhoduje výročí smlouvy, ne fixace.</li>
          <li><strong>Při úmrtí, dlouhodobé nemoci nebo invaliditě</strong> vás nebo vašeho
          manžela či partnera, pokud to výrazně zhorší schopnost splácet.</li>
          <li><strong>Při prodeji nemovitosti</strong>, kterou je hypotéka zajištěná, pokud od
          podpisu smlouvy uplynuly aspoň dva roky.</li>
          <li><strong>Při vypořádání společného jmění manželů</strong>, typicky po rozvodu, za
          stejné podmínky dvou let od podpisu smlouvy.</li>
          <li><strong>Kdykoli, pokud nemáte fixaci</strong>, tedy u variabilní sazby.</li>
        </ul>
        <p>
          Mimo tyto situace smí banka chtít náhradu nákladů, které jí předčasným splacením
          vznikly, a zákon její výši omezuje. Pozor na starší hypotéky: pokud vám pořád běží
          fixace sjednaná před zářím 2024, novější pravidla (výpočet náhrady, prodej nemovitosti
          a vypořádání společného jmění) pro vás začnou platit až od další fixace. Do té doby rozhoduje vaše smlouva. Než pošlete
          velkou částku, zeptejte se banky na konkrétní číslo.
        </p>

        <h2>Nezapomeňte na odpočet úroků z daní</h2>
        <p>
          Úroky z hypotéky na vlastní bydlení si můžete odečíst od základu daně. Pokud jste
          bydlení pořídili od roku 2021, odečtete nejvýš 150&nbsp;000&nbsp;Kč ročně za celou
          domácnost. U bydlení pořízeného dřív je limit 300&nbsp;000&nbsp;Kč. Rozhoduje, kdy jste
          bydlení pořídili, ne kdy jste podepsali úvěrovou smlouvu. Limity se nesčítají. Při 15% dani tak stát efektivně vrací 15&nbsp;% zaplacených
          úroků a skutečná cena vaší hypotéky je nižší než sazba ve smlouvě. Při sazbě
          4,5&nbsp;% je to zhruba 3,8&nbsp;%. Platí to ale jen pro úroky do limitu a jen tehdy,
          když daň opravdu platíte. Pokud zaplatíte na úrocích víc, než kolik dovolí limit,
          ušetří vám každá koruna mimořádné splátky plných 4,5&nbsp;%. Jak to vychází přesně
          u vás, spočítá daňař nebo účetní.
        </p>

        <h2>Kombinovaná strategie: splácet i investovat</h2>
        <p>
          Často nejlépe funguje kombinace obou cest. Příklad: při sazbě 4,5&nbsp;% vám každý
          měsíc zbývá 10&nbsp;000&nbsp;Kč nad rámec povinné splátky. 7&nbsp;000&nbsp;Kč posíláte
          do ETF a 3&nbsp;000&nbsp;Kč si odkládáte na mimořádnou splátku k výročí smlouvy.
          Poměr upravujete podle výše sazby a vývoje portfolia.
        </p>
        <p>
          Klíčový princip: <strong>nepřerušujte investice kvůli hypotéce</strong>. Čas strávený
          na trhu je nejdůležitější proměnná složeného úročení. Deset let bez investování
          ve prospěch „nejdřív splatit hypotéku“ může stát víc, než kolik ušetříte na úrocích.
          Jak dlouhá fixace se hodí právě vám, rozebírám v článku{" "}
          <Link href="/blog/fixace-hypoteky-jak-se-rozhodnout">Fixace hypotéky: 3, 5 nebo 10 let?</Link>
        </p>

        <p style={{ marginTop: 24, fontSize: 13.5, color: "var(--text-2)", lineHeight: 1.65 }}>
          Zdroje: zákon č. 257/2016 Sb., o spotřebitelském úvěru, § 117 (předčasné splacení);
          zákon č. 586/1992 Sb., o daních z příjmů, § 15 odst. 3 a 4 (odpočet úroků). Článek je
          vzdělávací a nepředstavuje investiční ani úvěrové doporučení.
        </p>
      </div>
    );
  }

  if (slug === "penzijni-sporeni-vs-investice") {
    return (
      <div className="article-body">
        <p>
          Otázka „penzijko, nebo investice?“ patří k nejčastějším, které slyším. Správná odpověď
          většinou zní: obojí, jen každé na něco jiného. Rozhoduje, kolik měsíčně odkládáte a jestli
          platíte daň z příjmů.
        </p>
        <PenzijkoKalk />

        <h2>Penzijko: co vám dá stát</h2>
        <p>
          Doplňkové penzijní spoření má dvě státní výhody. První je <strong>státní příspěvek</strong>:
          stát přidá 20&nbsp;% z vašeho vkladu od 500&nbsp;Kč měsíčně, nejvýš 340&nbsp;Kč při vkladu
          1&nbsp;700&nbsp;Kč. To je až 4&nbsp;080&nbsp;Kč ročně. Stát příspěvek připisuje jednou
          za čtvrtletí se zpožděním, ale jistých 20&nbsp;% k vkladu vám nedá žádná investice.
        </p>
        <p>
          Druhá je <strong>daňový odpočet</strong>. Co pošlete nad 1&nbsp;700&nbsp;Kč měsíčně, si
          můžete odečíst od základu daně. Pozor: odpočet má jeden společný roční limit
          48&nbsp;000&nbsp;Kč pro penzijko, DIP, životní pojištění a pojištění dlouhodobé péče.
          Při 15% dani je to nejvýš 7&nbsp;200&nbsp;Kč zpátky na daních.
        </p>
        <p>
          Pozor na chystanou změnu. Vláda v srpnu 2026 schválila novelu, podle které by lidé do
          30 let dostávali od státu 40&nbsp;% místo 20&nbsp;%, tedy až 680&nbsp;Kč měsíčně. Účinnost
          je navržená od ledna 2027, zákon ale ještě projednává Sněmovna.
        </p>

        <div className="nums">
          <div className="num">
            <span>Státní příspěvek</span>
            <b>340&nbsp;Kč</b>
            <p>měsíčně při vkladu 1&nbsp;700&nbsp;Kč. Ročně 4&nbsp;080&nbsp;Kč.</p>
          </div>
          <div className="num">
            <span>Daňový odpočet</span>
            <b>48&nbsp;000&nbsp;Kč</b>
            <p>ročně, společný limit pro penzijko, DIP a životní pojištění.</p>
          </div>
          <div className="num navy">
            <span>Úspora na dani</span>
            <b>7&nbsp;200&nbsp;Kč</b>
            <p>ročně při plném odpočtu a 15% dani.</p>
          </div>
        </div>

        <h2>Kde je háček</h2>
        <p>
          Peníze jsou zamčené. Penzi z penzijka dostanete nejdřív v 60 letech a u smluv uzavřených
          od roku 2024 navíc až po 10 letech spoření. Kdo chce peníze dřív, přijde o státní
          příspěvky a uplatněné odpočty musí dodanit.
        </p>
        <p>
          Druhý háček je výnos. Konzervativní fondy, které si lidé vybírají nejčastěji, často
          nepřekonají ani inflaci. Pokud máte do 60 let deset a více let, může dávat smysl
          dynamičtější fond s větším podílem akcií. Kolísá víc, ale na dlouhém horizontu historicky vydělává
          víc. Zaručené to není.
        </p>

        <h2>Vlastní investice: volnost za cenu disciplíny</h2>
        <p>
          Pravidelná investice do ETF na vlastním účtu nemá žádné státní příspěvky, zato je
          k penězům přístup kdykoli a vybíráte si, do čeho přesně investujete. Globálně rozložené
          akciové ETF historicky vynášely kolem 7 až 10&nbsp;% ročně před inflací, s roky, kdy
          portfolio padá o desítky procent. Bez plánu, který vás v takových letech udrží, se
          z této výhody snadno stane nevýhoda.
        </p>

        <h2>Jak to poskládat</h2>
        <p>
          U lidí, kteří platí daň, často dává smysl tohle pořadí. Jestli platí i pro vás, záleží
          na věku, rezervě a cílech:
        </p>
        <ul>
          <li><strong>1&nbsp;700&nbsp;Kč měsíčně na penzijko.</strong> Kvůli státnímu příspěvku,
          který nic nepřekoná.</li>
          <li><strong>Do 4&nbsp;000&nbsp;Kč měsíčně na DIP.</strong> Kvůli odpočtu 48&nbsp;000&nbsp;Kč
          ročně. Na penzijku by se odečítalo jen to, co je nad 1&nbsp;700&nbsp;Kč, takže pro plný
          odpočet byste tam museli posílat 5&nbsp;700&nbsp;Kč. DIP dá stejný odpočet s menším vkladem
          a větší volbou, do čeho investujete. Peníze jsou ale zamčené stejně jako v penzijku:
          výplata od 60 let a po 10 letech, jinak odpočty dodaníte.</li>
          <li><strong>Zbytek na vlastní investiční účet.</strong> Peníze, ke kterým se chcete dostat
          i před šedesátkou.</li>
        </ul>
        <p>
          Pokud přispívá zaměstnavatel nebo vaše vlastní firma, je to ještě lepší: do
          50&nbsp;000&nbsp;Kč ročně je jeho příspěvek bez daně i odvodů. Jak to funguje u DIP,
          rozebírám v článku{" "}
          <Link href="/blog/dip-dlouhodoby-investicni-produkt">DIP: jak z investic ušetřit 7&nbsp;200&nbsp;Kč na daních</Link>.
        </p>

        <h2>Závěr</h2>
        <p>
          Malé měsíční částky po 20 až 30 letech dělají zásadní rozdíl. Kolik vám k důchodu bude chybět, si spočítáte v{" "}
          <Link href="/?kalkulacka=duchod#calculators">důchodové kalkulačce</Link>, a pokud to chcete
          projít na svých číslech, ozvěte se.
        </p>

        <p style={{ marginTop: 24, fontSize: 13.5, color: "var(--text-2)", lineHeight: 1.65 }}>
          Zdroje: zákon č. 427/2011 Sb., o doplňkovém penzijním spoření (státní příspěvek, výplata
          dávek); zákon č. 586/1992 Sb., o daních z příjmů (§ 15a, § 6 odst. 9). Článek je vzdělávací
          a nepředstavuje investiční doporučení. Výnosy z minulosti nejsou zárukou budoucích výnosů.
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
          Tohle není výjimka. U majitelů firem, se kterými mluvím, je to spíš pravidlo. Na papíře
          jsou bohatí, ale skoro všechno mají zamčené ve firmě. Auto na
          firmu, nemovitost přes s.r.o., přebytky nechávají v bilanci. &quot;Bude se to hodit.&quot;
          Osobně? Prázdno.
        </p>

        <h2>Proč to dělají</h2>
        <p>
          Logika je jasná. Ve firmě jsou výdaje daňovým nákladem, osobní majetek se buduje
          z peněz po zdanění. Výplata dividendy stojí 15&nbsp;% srážkové daně a účetní řekne:
          nechte to ve firmě, vyplatí se to. Krátkodobě má pravdu.
        </p>
        <p>
          Problém nastane, když se zeptám: co se stane, když firma zítra zpomalí? Žádná
          katastrofa, jen obyčejné průšvihy. Přijdete o klíčového zákazníka, trh se otočí,
          selže zdraví. Firma najednou přestane platit, a vy doma nemáte nic, na co sáhnout.
        </p>

        <h2>Peníze ve firmě nejsou vaše</h2>
        <p>
          Dokud jsou peníze na účtu firmy, patří firmě. Když se jí přestane dařit, sáhnou na ně
          jako první věřitelé, banka a finanční úřad. A když s firmou něco uděláte, třeba ji
          prodáte nebo rozdělíte, řeší se, co s hotovostí v ní. Peníze, které jste si vyplatili
          a investovali osobně, tohle riziko nenesou.
        </p>

        <h2>Firma není penzijní plán</h2>
        <p>
          Tenhle mýtus přežívá překvapivě dlouho. &quot;Prodám firmu a mám na důchod.&quot; Firma se
          ale prodá za tolik, za kolik ji někdo koupí, ne za tolik, za kolik ji oceňujete vy.
          A najít kupce, který zaplatí dobrou cenu, často trvá roky, pokud vůbec přijde.
        </p>
        <PullQuote a="Stavět důchod na exitu je jako stavět golfovou sezonu na hole in one." b="Občas to přijde. Naplánovat se to nedá." />

        <h2>Co dělá systém za patnáct let</h2>
        <p>
          Nejde o to vzít peníze z firmy a propálit je. Jde o systém, který buduje osobní majetek
          souběžně s firmou. Příklad: firma pošle 50&nbsp;000&nbsp;Kč ročně na váš DIP a vy si
          každý rok vyplatíte a investujete dalších 250&nbsp;000&nbsp;Kč z dividendy.
        </p>
        <div className="nums">
          <div className="num">
            <span>Ročně mimo firmu</span>
            <b>300&nbsp;000&nbsp;Kč</b>
            <p>50&nbsp;000 na DIP od firmy a 250&nbsp;000 z dividendy.</p>
          </div>
          <div className="num">
            <span>Za 15 let při 4&nbsp;%</span>
            <b>6,0 mil.</b>
            <p>z toho 4,5 milionu vložených peněz.</p>
          </div>
          <div className="num navy">
            <span>Za 15 let při 6&nbsp;%</span>
            <b>7,0 mil.</b>
            <p>majetek, který nezávisí na tom, jak se daří firmě.</p>
          </div>
        </div>
        <p>
          Výnos zaručený není a investice cestou kolísají. Ale v patnáctém roce máte majetek, ze
          kterého se dá žít, i když firma zrovna nevydělává nebo ji nikdo nekoupí. Jen počítejte
          s tím, že peníze na DIP jsou vázané do šedesáti let, takže na dřívější potřebu slouží
          hlavně volné portfolio.
        </p>

        <h2>Jak to nastavit</h2>
        <p>
          Kombinace, která u majitelů firem vychází nejčastěji: přiměřená mzda (ne symbolická),
          maximální příspěvek firmy na DIP a část přebytků každý rok vyplatit dividendou nebo
          přes holding převést do investičního portfolia. Příspěvek firmy na DIP,
          penzijko a životko je dohromady do 50&nbsp;000&nbsp;Kč ročně bez daně i odvodů, pokud
          máte od firmy mzdu nebo odměnu jednatele. Jak to nastavit u vás, potvrdí účetní nebo
          daňový poradce. Čísla jednotlivých variant najdete v článku{" "}
          <Link href="/blog/vyber-penez-ze-sro-mzda-dividendy">Výběr peněz ze s.r.o.</Link>, a jestli
          dává smysl holding, rozebírám v článku{" "}
          <Link href="/blog/holding-sro-osobni-majetek">Holding s.r.o.</Link>
        </p>

        <h2>Kdy začít</h2>
        <p>
          Teď. Ne po dalším roce a ne až se firma stabilizuje. Každý rok bez systému je rok, kdy
          firmě roste bilance a vám osobně ne.
        </p>
        <p>
          První krok je jednoduchý: spočítat, kolik si dnes reálně vyplácíte a kolik firma
          vydělává. A pak rozhodnout, co změnit. Kde máte největší mezeru, ukáže za pět minut{" "}
          <Link href="/financni-preventivka">Finanční preventivka</Link>.
        </p>

        <p style={{ marginTop: 24, fontSize: 13.5, color: "var(--text-2)", lineHeight: 1.65 }}>
          Výpočty jsou orientační a nezahrnují poplatky ani daně z výnosů. Výnosy z minulosti nejsou
          zárukou budoucích výnosů. Článek je vzdělávací a nepředstavuje investiční ani daňové
          doporučení.
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
          &quot;Pronájem mi pokryje splátku&quot; slyším jednou za čtrnáct dní. Pak si sedneme a počítáme
          doopravdy. Výsledek je vždycky trochu jiný, než člověk čekal.
        </p>

        <h2>Hrubý výnos vs. čistý výnos</h2>
        <p>
          Byt za 4&nbsp;000&nbsp;000&nbsp;Kč, nájem 18&nbsp;000&nbsp;Kč měsíčně. Hrubý výnos je
          5,4&nbsp;% ročně. Zní to dobře. Teď od toho odečteme, co skutečně odejde:
        </p>
        <ul>
          <li><strong>Jeden měsíc prázdno za rok</strong> při střídání nájemníků:
          místo 216&nbsp;000 vyberete 198&nbsp;000&nbsp;Kč.</li>
          <li><strong>Správa bytu</strong>, pokud ji neděláte sami, bývá kolem 7&nbsp;% z nájmu:
          asi 14&nbsp;000&nbsp;Kč.</li>
          <li><strong>Opravy a údržba</strong>: počítejte zhruba 1&nbsp;% hodnoty bytu ročně, tedy
          40&nbsp;000&nbsp;Kč. Jeden rok nic, pak nová kuchyň.</li>
          <li><strong>Pojištění a daň z nemovitosti</strong>: dohromady kolem 6&nbsp;000&nbsp;Kč.</li>
          <li><strong>Daň z příjmů z nájmu</strong>: s paušálními výdaji 30&nbsp;% a 15% sazbou
          asi 21&nbsp;000&nbsp;Kč.</li>
        </ul>

        <div className="nums">
          <div className="num">
            <span>Hrubý výnos</span>
            <b>5,4&nbsp;%</b>
            <p>216&nbsp;000&nbsp;Kč ročně z bytu za 4 miliony.</p>
          </div>
          <div className="num">
            <span>Čistý výnos</span>
            <b>2,9&nbsp;%</b>
            <p>asi 117&nbsp;000&nbsp;Kč ročně po všech nákladech a dani.</p>
          </div>
          <div className="num navy">
            <span>S hypotékou 70&nbsp;%</span>
            <b>−2&nbsp;700&nbsp;Kč</b>
            <p>měsíčně doplácíte z vlastního, než se započte daň.</p>
          </div>
        </div>

        <h2>A s hypotékou?</h2>
        <p>
          Na investiční byt vám banka od dubna 2026 obvykle půjčí nejvýš 70&nbsp;% odhadní hodnoty.
          Tak to ČNB doporučila u hypoték na byt určený k pronájmu nebo na třetí a další
          nemovitost, a každá banka si to vykládá trochu po svém. Hypotéka 2&nbsp;800&nbsp;000&nbsp;Kč na 30 let při 4,5&nbsp;% znamená
          splátku 14&nbsp;187&nbsp;Kč měsíčně, přes 170&nbsp;000&nbsp;Kč ročně. Z nájmu vám po
          nákladech zbude asi 138&nbsp;000&nbsp;Kč. Rozdíl, zhruba 2&nbsp;700&nbsp;Kč měsíčně,
          platíte z vlastní kapsy. A 1,2 milionu vlastních peněz k tomu.
        </p>
        <p>
          Daň z nájmu vám s hypotékou obvykle klesne, protože místo paušálu můžete uplatnit
          skutečné výdaje včetně úroků a odpisů. V prvním roce zaplatíte na úrocích asi
          125&nbsp;000&nbsp;Kč. Kolik to u vás dělá, spočítá daňový poradce nebo účetní. Na tom, že byt musíte
          dotovat, to ale většinou nic nezmění.
        </p>

        <h2>Ale majetek přece roste, ne?</h2>
        <p>
          Ano, ceny bytů v Česku dlouhodobě rostly, v Praze rychleji než jinde. Jenže nerovnoměrně:
          po letech prudkého růstu přišel v letech 2022 a 2023 pokles a návrat trval. Celkový výnos,
          tedy nájem plus růst ceny, tak může dávat smysl. Jen se na něj nedá spolehnout v roce,
          kdy peníze potřebujete.
        </p>
        <p>
          Druhý problém je likvidita. Byt neprodáte za hodinu a neprodáte ho za cenu, kterou chcete
          právě vy. Mezitím platíte hypotéku, opravy a daně.
        </p>
        <p>
          Pro srovnání: globálně rozložené akciové ETF historicky vynášely zhruba 6 až 8&nbsp;%
          ročně. Pozor, to je výnos včetně růstu ceny, takže ho srovnávejte s celkovým výnosem
          bytu, ne jen s nájmem. ETF jsou likvidní a správa zabere pár minut měsíčně. Kolísají ale víc a v některých letech padají
          o desítky procent. Co z pravidelné investice vyjde, si spočítáte v{" "}
          <Link href="/blog/etf-spocitejte-si">ETF kalkulačce</Link>.
        </p>

        <h2>Kdy investiční byt smysl dává</h2>
        <ul>
          <li>Máte vlastní kapitál aspoň na třetinu ceny a rezervu na opravy a prázdné měsíce.</li>
          <li>Kupujete v lokalitě se silnou a trvalou poptávkou po nájmu.</li>
          <li>Byt je jedna z vrstev majetku, ne celý plán.</li>
          <li>Máte čas a chuť řešit nájemníky, nebo počítáte s náklady na správu.</li>
        </ul>
        <p>
          Nemá smysl, když ho kupujete proto, že &quot;nemovitosti jsou jistota&quot;, a přitom nemáte
          žádné jiné úspory. Nebo když celý váš plán na důchod zní: jednou prodám byt.
        </p>

        <h2>Co se vždy vyplatí</h2>
        <p>
          Nechat si celé číslo napočítat dřív, než podepíšete rezervační smlouvu. Rozhoduje cena,
          výše vlastních zdrojů, sazba hypotéky, lokalita a vaše daňová situace. Přineste mi čísla
          konkrétního bytu a spočítám vám celý scénář včetně srovnání s alternativním portfoliem.
        </p>

        <p style={{ marginTop: 24, fontSize: 13.5, color: "var(--text-2)", lineHeight: 1.65 }}>
          Výpočty jsou orientační a zjednodušené, náklady se u konkrétního bytu liší. Zdroje: zákon
          č. 586/1992 Sb., o daních z příjmů, § 9 (příjmy z nájmu); doporučení ČNB k investičním
          hypotékám platné od 1. 4. 2026. Článek je vzdělávací
          a nepředstavuje investiční doporučení. Výnosy z minulosti nejsou zárukou budoucích výnosů.
        </p>
      </div>
    );
  }

  if (slug === "osvc-duchod-proc-jste-na-tom-hur") {
    return (
      <div className="article-body">
        <p>
          OSVČ platí sociální pojištění z vyměřovacího základu. Zákon říká, že základ musí být
          alespoň 55&nbsp;% zisku.<a href="#zdroj-1" className="fn">1</a>{" "}Zákonem stanovené
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
        <PullQuote a="Nejhorší odpověď je počkat na lepší dobu." />

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
          Peníze dejte na spořicí účet nebo do fondu peněžního trhu. Výnos je skromný, zato jsou
          peníze dostupné do pár dní. Za tu dobu nic nezkazíte a získáte čas na rozvahu.
          U velké částky ji rozložte mezi víc bank: pojištění vkladů kryje u jedné banky jen
          100&nbsp;000&nbsp;eur.
        </p>

        <h2>Daň z prodeje: od roku 2026 zase bez stropu</h2>
        <p>
          Když fyzická osoba prodá obchodní podíl v s.r.o., který držela déle než pět let, je příjem
          osvobozený od daně z příjmů. V roce 2025 platil strop 40 milionů korun, od roku 2026 je
          znovu zrušený. U akcií je časový test tři roky.
        </p>
        <p>
          Dvě věci, na které se zapomíná:
        </p>
        <ul>
          <li><strong>Oznámení finančnímu úřadu.</strong> Každý jednotlivý osvobozený příjem nad
          5 milionů korun musíte oznámit do termínu pro daňové přiznání. Kdo zapomene, platí
          pokutu od 0,1 do 15&nbsp;% z neoznámené částky podle toho, jestli to dožene sám, nebo
          až po výzvě úřadu.</li>
          <li><strong>Prodej podílu není prodej majetku firmy.</strong> Pokud firma prodá svůj
          majetek a peníze si pak vyplácíte dividendou, osvobození se netýká. Zaplatíte daň
          firmy 21&nbsp;% a k tomu 15&nbsp;% z dividendy.</li>
        </ul>
        <p>
          Kratší držba, prodej přes holding, splátky kupní ceny nebo prodej části podílu jsou
          případy pro daňového poradce. Řešte je ideálně ještě před podpisem smlouvy, ne po něm.
        </p>

        <h2>Nesázejte vše na jednu kartu</h2>
        <p>
          Každý druhý klient přijde s nápadem koupit investiční byt. Chápu to. Byt je hmatatelný,
          vidíte ho, víte, jak funguje. Ale šest sedm milionů v jedné nemovitosti v jednom městě
          je extrémní koncentrace rizika. A čistý výnos z nájmu po všech nákladech bývá kolem
          3&nbsp;%, jak ukazuji v článku{" "}
          <Link href="/blog/investicni-byt-napocitam-to">Investiční byt na hypotéku</Link>.
        </p>
        <PullQuote a="Diverzifikace neznamená složitost." b="Znamená, že když jedna věc selže, nepřijdete o všechno." />

        <h2>Jak nastavit systém</h2>
        <p>
          Po exitu většinou pracujeme se třemi vrstvami:
        </p>
        <ul>
          <li><strong>Rezerva</strong> na spořicím účtu nebo ve fondu peněžního trhu: výdaje na rok
          až dva a peníze na plánované věci, třeba bydlení.</li>
          <li><strong>Dlouhodobé portfolio</strong> s horizontem deset a více let, rozložené do
          akcií a dluhopisů podle toho, kolik kolísání unesete.</li>
          <li><strong>Holding s.r.o.</strong>, pokud chcete dál investovat do firem nebo
          nemovitostí. Funguje jako šuplík navíc, podrobně v článku{" "}
          <Link href="/blog/holding-sro-osobni-majetek">Holding s.r.o.</Link></li>
        </ul>
        <p>
          Nejde o to mít všechno optimalizované od prvního dne. Jde o systém, který funguje bez
          každodenního rozhodování.
        </p>
        <p>
          Jestli z takového majetku vyjde renta, jakou chcete, a co s plánem udělá propad trhu
          o 40&nbsp;%, si spočítáte v <a href="/renta">kalkulačce renty</a>.
        </p>

        <h2>Proč banka nestačí</h2>
        <p>
          Banka vám nabídne produkty, které má. Nezávislý poradce začíná vaší situací,
          ne produktovým portfoliem. Rozdíl je zásadní, zvlášť když máte najednou
          velkou sumu a žádný spěch.
        </p>
        <p>
          Čas máte, jen z něj nesmí být roky. Šest měsíců na rozvahu je plán. Dva roky na spořáku
          z nerozhodnosti už plán nejsou.
        </p>

        <p style={{ marginTop: 24, fontSize: 13.5, color: "var(--text-2)", lineHeight: 1.65 }}>
          Zdroje: zákon č. 586/1992 Sb., o daních z příjmů, § 4 odst. 1 písm. q) a u) (osvobození
          příjmu z převodu podílu a cenných papírů), § 38v (oznámení osvobozených příjmů), § 38w
          (pokuta). Článek je vzdělávací a nepředstavuje investiční ani daňové doporučení.
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
          neodpovídají výsledku. <Link href="/blog/den-kdy-se-nevratite-domu">Správně sepsaná závěť</Link> a nastavené SJM dají podobný efekt.
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
          Podnikatelé tohle zpravidla neřeší. Jsou zaneprázdnění firmou. A pak jednou přijdou
          a říkají: &quot;Mám padesát, firma funguje. Ale osobně? Žádný plán.&quot;
        </p>
        <p>
          Plán pro majitele firmy má šest kroků. Na pořadí záleží: každý další stojí na tom předchozím.
        </p>

        <h2>Krok 1: rezerva mimo firmu</h2>
        <p>
          Nejdřív bezpečnost. Osobní rezerva, která nesouvisí s firmou: šest měsíců rodinných
          výdajů na spořicím účtu nebo ve fondu peněžního trhu, dostupná do týdne. Když doma
          utratíte 80&nbsp;000&nbsp;Kč měsíčně, je to 480&nbsp;000&nbsp;Kč.
        </p>
        <p>
          U většiny majitelů, se kterými mluvím, tahle rezerva chybí. Firma slouží jako záchranná
          síť i spořicí účet zároveň. Jenže když firma zrovna nemá na výplatu, nemá ani na vás.
          Jak rezervu rozdělit do vrstev, popisuji v článku{" "}
          <Link href="/blog/financni-poduska-jak-ji-spravne-nastavit">Finanční polštář</Link>.
        </p>

        <h2>Krok 2: nastavte výplatu z firmy</h2>
        <p>
          Přiměřená mzda kvůli nemocenské a důchodu, příspěvek firmy na DIP, penzijko a životko
          dohromady až 50&nbsp;000&nbsp;Kč ročně bez daně a odvodů, přebytky dividendou. Bez systému si
          vyplácíte podle pocitu a platíte víc, než musíte. Na zisku 2 milionů je rozdíl mezi
          nejhorší a rozumnou variantou přes 180&nbsp;000&nbsp;Kč ročně, konkrétní čísla jsou
          v článku{" "}
          <Link href="/blog/vyber-penez-ze-sro-mzda-dividendy">Výběr peněz ze s.r.o.: mzda, nebo dividendy?</Link>
        </p>

        <h2>Krok 3: investujte osobně a pravidelně</h2>
        <p>
          Co z vyplacených peněz neutratíte, jde do osobního investičního portfolia. Jako základ
          globálně rozložené akciové ETF, pravidelně a bez přerušení při každém poklesu trhů.
          Nastaví se jednou a pak pracuje samo.
        </p>
        <p>
          Kolik to dělá? Kdo bude 20 let posílat 25&nbsp;000&nbsp;Kč měsíčně a vydělá v průměru
          6&nbsp;% ročně, bude mít přes 11 milionů. Při 4&nbsp;% kolem 9 milionů. Zaručené to
          není, ale bez pravidelného investování nevznikne nic.
        </p>

        <h2>Krok 4: oddělte majetek od firmy</h2>
        <p>
          Osobní majetek nesmí záviset na osudu firmy. Bydlení, rezerva a investice patří vám,
          ne firmě. Firma je nástroj, který může selhat. A když selže, věřitelé sáhnou na všechno,
          co v ní je. Pokud jste bance ručil osobně, sáhnou i na to, co máte doma. Pokud chcete peníze z firmy dál
          investovat podnikatelsky, může pomoct{" "}
          <Link href="/blog/holding-sro-osobni-majetek">holding</Link>.
        </p>

        <h2>Krok 5: ochrana pro případ, že vypadnete</h2>
        <ul>
          <li><strong>Pojištění příjmu</strong> pro případ invalidity a dlouhé nemoci. U majitele
          firmy je to často nejdůležitější pojistka, protože bez něj přestane téct i firma.</li>
          <li><strong>Závěť</strong>, aby o majetku nerozhodl jen zákon. Co se stane bez ní, popisuji
          v článku <Link href="/blog/den-kdy-se-nevratite-domu">Kdybyste zítra nebyl</Link>.</li>
          <li><strong>Předběžné prohlášení</strong>, nejlépe u notáře: kdo za vás bude rozhodovat,
          když to sami nezvládnete. Bez něj o tom rozhoduje soud bez vašeho slova.</li>
          <li><strong>Druhý podpis ve firmě</strong>: kdo podepíše výplaty a zaplatí dodavatele,
          když budete v nemocnici.</li>
        </ul>

        <h2>Krok 6: co bude s firmou po vás</h2>
        <p>
          Komu firma připadne, kolik je skutečně za ni, jestli ji převezmou děti, nebo ji prodáte
          cizímu. Je to práce pro advokáta, notáře, daňového poradce a finančního poradce dohromady.
          Začíná ale tím, že si tu otázku položíte dnes, ne rok před odchodem. Co dělat
          s penězi po prodeji, rozebírám v článku{" "}
          <Link href="/blog/prodej-firmy-co-s-penezi">Prodal jste firmu. Co teď s penězi?</Link>
        </p>

        <h2>Proč to většina odkládá</h2>
        <p>
          Protože je to abstraktní. Firma je konkrétní, každodenní a urgentní. Plán na dvacet let
          vypadá daleko. Jenže složené úročení pracuje jen tehdy, když investujete. Kdo začne
          o pět let později, musí na stejných 11 milionů posílat skoro 40&nbsp;000&nbsp;Kč měsíčně
          místo 25&nbsp;000.
        </p>
        <p>
          Kde jste na tom dnes, si můžete ověřit za pět minut ve{" "}
          <Link href="/financni-preventivka">Finanční preventivce</Link>. Dvacet otázek, pět oblastí
          a hned uvidíte, kde máte největší mezeru.
        </p>

        <p style={{ marginTop: 24, fontSize: 13.5, color: "var(--text-2)", lineHeight: 1.65 }}>
          Výpočty jsou orientační. Výnosy z minulosti nejsou zárukou budoucích výnosů. Článek je
          vzdělávací a nepředstavuje investiční ani daňové doporučení.
        </p>
      </div>
    );
  }

  if (slug === "vyber-penez-ze-sro-mzda-dividendy") {
    return (
      <div className="article-body">
        <p>
          Kolik si z firmy se ziskem dvou milionů ročně odnesete? Podle toho, jak si nastavíte
          výplatu, se výsledek liší o víc než dvě stě tisíc. Bez jakékoli kreativity, jen podle
          zákona.
        </p>

        <h2>Základní logika</h2>
        <p>
          Mzda ze s.r.o. je pro firmu daňový náklad, snižuje její zisk. Platí se z ní ale odvody:
          firma přidá 33,8&nbsp;% ke hrubé mzdě navíc a vám se z hrubé mzdy strhne dalších
          11,6&nbsp;% na sociální a zdravotní pojištění. Za to si budujete nárok na nemocenskou
          a důchod.
        </p>
        <p>
          Dividenda se platí ze zisku, který už zdanila firma. Daň z příjmů právnických osob je
          21&nbsp;% a z vyplacené dividendy se pak strhne ještě 15&nbsp;% srážkové daně. Žádné
          odvody, žádné přiznání. Nevýhoda: dividenda se zpravidla vyplácí jednou ročně, až po
          schválení účetní závěrky.
        </p>

        <div className="nums">
          <div className="num">
            <span>Mzda</span>
            <b>+33,8&nbsp;%</b>
            <p>přidá firma ke hrubé mzdě navíc. Vám se strhne dalších 11,6&nbsp;%.</p>
          </div>
          <div className="num">
            <span>Dividenda</span>
            <b>21 + 15&nbsp;%</b>
            <p>daň firmy a pak srážková daň. Dohromady 32,85&nbsp;% ze zisku.</p>
          </div>
          <div className="num navy">
            <span>DIP od firmy</span>
            <b>50&nbsp;000&nbsp;Kč</b>
            <p>ročně může firma poslat na váš DIP bez daně a bez odvodů, pokud od ní máte mzdu nebo odměnu jednatele.</p>
          </div>
        </div>

        <h2>Konkrétní čísla: 2 miliony zisku</h2>
        <p>
          Firma má před výplatou majitele zisk 2&nbsp;000&nbsp;000&nbsp;Kč a vy si chcete vzít
          všechno. Počítám s pravidly pro rok 2026, slevou na poplatníka a bez dalších příjmů.
        </p>
        <h3>Varianta 1: všechno jako mzda</h3>
        <p>
          Aby firma utratila 2 miliony, může vám dát hrubou mzdu zhruba 1&nbsp;495&nbsp;000&nbsp;Kč.
          Po odvodech a dani vám zůstane přibližně <strong>1&nbsp;128&nbsp;000&nbsp;Kč</strong>.
          Na odvodech a daních odejde skoro 872&nbsp;000&nbsp;Kč.
        </p>
        <h3>Varianta 2: všechno jako dividenda</h3>
        <p>
          Firma zaplatí 21&nbsp;% daně, z dividendy se strhne 15&nbsp;%. Vám zůstane
          <strong> 1&nbsp;343&nbsp;000&nbsp;Kč</strong>. To je o 215&nbsp;000&nbsp;Kč víc než
          u mzdy. Jenže nemáte nemocenskou, důchodový nárok neroste a pokud nejste pojištěný
          jinde, platíte si zdravotní pojištění sám jako osoba bez zdanitelných příjmů. V roce 2026
          je to nejméně 3&nbsp;024&nbsp;Kč měsíčně, přes 36&nbsp;000&nbsp;Kč ročně. Po jeho
          zaplacení vám zůstane zhruba 1&nbsp;307&nbsp;000&nbsp;Kč.
        </p>
        <h3>Varianta 3: kombinace, kterou u majitelů firem vídám nejčastěji</h3>
        <p>
          Hrubá mzda 40&nbsp;000&nbsp;Kč měsíčně, firma vám pošle 50&nbsp;000&nbsp;Kč ročně na DIP
          a zbytek si vyplatíte jako dividendu. Na mzdě dostanete čistého zhruba
          383&nbsp;000&nbsp;Kč, dividenda vám přinese přibližně 878&nbsp;000&nbsp;Kč a na DIP
          přibude 50&nbsp;000&nbsp;Kč. Dohromady <strong>asi 1&nbsp;311&nbsp;000&nbsp;Kč</strong>.
        </p>
        <p>
          Proti čisté dividendě je to o 32&nbsp;000&nbsp;Kč méně. Když ale u dividendy odečtete
          zdravotní pojištění, vyjde kombinace zhruba o 5&nbsp;000&nbsp;Kč lépe. A navíc máte nárok
          na nemocenskou, každý rok si přidáváte do důchodu a 50&nbsp;000&nbsp;Kč ročně se
          investuje mimo firmu. Proti čisté mzdě jste o 183&nbsp;000&nbsp;Kč dál.
        </p>

        <h2>Kdy se mzda vyplatí</h2>
        <p>
          Když je s.r.o. váš hlavní příjem a chcete mít nemocenskou a důchodový nárok. Nemusí to
          ale být vysoká mzda. Výpočet důchodu je nastavený tak, že každá další koruna mzdy přidá
          do budoucího důchodu čím dál méně. A z části mzdy nad 2&nbsp;350&nbsp;416&nbsp;Kč ročně se
          sociální pojištění už neplatí, zdravotní ano.
        </p>
        <p>
          Pozor i na daň: kdo má základ daně nad 1&nbsp;762&nbsp;812&nbsp;Kč ročně, platí
          z části nad touto hranicí 23&nbsp;% místo 15&nbsp;%.
        </p>

        <h2>Kdy se vyplatí dividendy</h2>
        <p>
          Když odvody platíte odjinud: máte zaměstnání, jiné s.r.o. nebo jste už v důchodu. Pak
          je dividenda skoro vždycky levnější cesta. Sazba je stejná, ať si vyplatíte sto tisíc
          nebo deset milionů.
        </p>
        <p>
          Dividendu ale nejde vyplatit kdykoli a v jakékoli výši. Musí na ni být zisk ve schválené
          účetní závěrce a firma se výplatou nesmí dostat do úpadku. To je takzvaný test
          insolvence podle § 40 zákona o obchodních korporacích. U s.r.o. k tomu patří ještě
          kapitálový test podle § 161, takže výplata nesmí snížit vlastní kapitál pod zákonnou
          hranici.
        </p>

        <h2>DIP od firmy: nejlevnější koruna</h2>
        <p>
          Příspěvek firmy na DIP, penzijní spoření nebo životní pojištění je do 50&nbsp;000&nbsp;Kč
          ročně osvobozený od daně i od odvodů a pro firmu je to daňový náklad. Z těch tří cest
          výplaty je to jediná koruna, ze které stát nevezme nic. Platí to pro zaměstnance a pro
          jednatele, kterým firma vyplácí odměnu jako příjem ze závislé činnosti a mají příspěvek
          sjednaný ve smlouvě o výkonu funkce. Limit 50&nbsp;000&nbsp;Kč je společný pro DIP,
          penzijko, životní pojištění a pojištění dlouhodobé péče. Jak to nastavit
          ve vašem případě, je potřeba ověřit s účetní nebo daňovým poradcem.
        </p>

        <h2>Jak to kombinovat</h2>
        <p>
          Kombinace, která u majitelů firem vychází nejčastěji: přiměřená mzda kvůli nemocenské a důchodu, maximální
          příspěvek firmy na DIP a přebytky dividendou jednou ročně. Kolik je „přiměřená mzda“,
          záleží na tom, jestli máte jiné příjmy, kolik vám do důchodu chybí a kolik potřebujete
          měsíčně na život. Podrobný rozhodovací rámec najdete v článku{" "}
          <Link href="/blog/kolik-si-vyplacet-ze-sro">Kolik si vyplácet ze s.r.o.</Link>
        </p>
        <p>
          Peníze vyplacené z firmy jsou ale teprve začátek. Rozhoduje, co s nimi uděláte potom.
          Tím, že je necháte ležet na účtu, o rozdíl z této tabulky zase přijdete.
        </p>

        <p style={{ marginTop: 24, fontSize: 13.5, color: "var(--text-2)", lineHeight: 1.65 }}>
          Výpočty jsou zjednodušené a orientační: počítají s pravidly pro rok 2026, slevou na
          poplatníka a bez dalších příjmů a odpočtů. Zdroje: zákon č. 586/1992 Sb., o daních
          z příjmů (§ 6, § 16, § 21, § 36); zákon č. 589/1992 Sb. a č. 592/1992 Sb. (pojistné);
          zákon č. 90/2012 Sb., o obchodních korporacích (§ 40, § 161). Článek není daňové poradenství,
          konkrétní nastavení proberte s účetní nebo daňovým poradcem.
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

        <h2>Další ETF průvodci</h2>
        <p>
          Jak investovat do ETF krok za krokem a proč záleží víc na plánu než na načasování:{" "}
          <Link href="/blog/jak-investovat-do-etf">Jak investovat do ETF: průvodce od nuly</Link>.
        </p>
        <p>
          Tři kroky, které musíte udělat ještě před prvním nákupem:{" "}
          <Link href="/blog/etf-pro-zacatecniky">ETF pro začátečníky: tři kroky, než koupíte první fond</Link>.
        </p>
        <p>
          Jak vybrat ETF pro český daňový rámec, co je UCITS, TER a proč záleží na akumulačním fondu:{" "}
          <Link href="/blog/jak-vybrat-etf-pro-cecha">Jak vybrat ETF jako český investor: šest kritérií, která rozhodnou</Link>.
        </p>
        <p>
          Kdy z pravidelného investování vyjde renta, včetně slabších a silnějších let a zátěžového
          testu propadu:{" "}
          <a href="/renta">Kalkulačka renty</a>.
        </p>
      </div>
    );
  }

  if (slug === "etf-pro-zacatecniky") {
    return (
      <div className="article-body">
        <p>
          Každý rok se rozhodne začít investovat do ETF tisíce Čechů. Otevřou si účet u brokera,
          koupí první fond a pak sledují portfolio každý týden. Buď je v plusu a hledají, co dalšího koupit.
          Nebo je v mínusu a přemýšlí, jestli neprodají. Oba scénáře jsou špatně.
        </p>
        <p>
          ETF samo o sobě není investiční strategie. Je to nástroj. A jako každý nástroj
          nefunguje, pokud ho použijete špatně. Tři kroky, které musíte udělat ještě
          před prvním nákupem.
        </p>

        <h2>Krok 1: Likvidní rezerva jako základ</h2>
        <p>
          Nejčastější chyba začátečníků není špatná volba ETF. Je to investování peněz,
          které budou potřeba za rok nebo dva.
        </p>
        <p>
          ETF klesne o 30 %. Mezitím přijdete o práci nebo se rozbije auto. Prodáte
          se ztrátou, protože jiná možnost není. Přesně to zažívali investoři
          v březnu 2020 nebo v roce 2022. Ti, kdo nemuseli prodávat, se dočkali zotavení.
          Ti, kdo museli, uzamkli ztrátu.
        </p>
        <p>
          Pravidlo je jednoduché: investujte pouze peníze, které nepotřebujete
          minimálně deset let. Vše ostatní patří na spořicí účet nebo do fondu peněžního trhu.
          Tříměsíční rezerva na okamžité výdaje je minimum, šestiměsíční je lepší.
        </p>
        <p>
          Jak nastavit rezervu ve vrstvách, aby každá část plnila jiný účel:{" "}
          <Link href="/blog/financni-poduska-jak-ji-spravne-nastavit">Finanční polštář: proč nestačí nechat peníze na účtu</Link>.
        </p>

        <h2>Krok 2: Horizont a výše investice</h2>
        <p>
          Na otázku „kolik mám investovat?" neexistuje univerzální odpověď. Závisí
          na výši příjmů, výdajích, závazcích (hypotéka, rodina) a konkrétních cílech.
          Ale existuje postup, jak to zjistit:
        </p>
        <p>
          Vezměte čistý měsíční příjem. Odečtěte fixní výdaje a splátky. Odečtěte
          přiměřenou rezervu na variabilní výdaje. Co zbyde, lze rozdělit: část
          na spořicí účet (krátkodobé cíle), část do investic s horizontem 10 a více let.
        </p>
        <p>
          Začínat lze i s menšími částkami, třeba 500 nebo 1 000 Kč měsíčně.
          Důležitější než výše je pravidelnost a horizont. Spočítejte si,
          co z těchto čísel vyjde za dvacet nebo třicet let:{" "}
          <Link href="/blog/etf-spocitejte-si">ETF kalkulačka: spočítejte si, co z toho bude</Link>.
        </p>

        <h2>Krok 3: Vybrat typ ETF, pak brokera</h2>
        <p>
          Nejčastější chyba číslo dvě: vybrat brokera podle doporučení kamaráda,
          otevřít účet a pak vybrat první ETF ze seznamu.
          Správné pořadí je opačné.
        </p>
        <p>
          Nejdřív si rozmyslete, co chcete kupovat. Pro začátečníka to zpravidla
          znamená jeden globálně diverzifikovaný akciový ETF kopírující světový
          nebo americký akciový index. Konkrétní výběr závisí na vaší situaci:
          zda investujete přes DIP, preferujete fond akumulační (dividendy reinvestuje automaticky)
          nebo výplatní (dividendy vyplácí), a jak dlouhý je váš horizont.
        </p>
        <p>
          Co rozhodně hledat: fond s označením UCITS, roční poplatek (TER) pod 0,25 %
          a dostatečnou velikostí aktiv pod správou (alespoň 500 milionů eur).
          Detailní průvodce výběrem pro český daňový rámec:{" "}
          <Link href="/blog/jak-vybrat-etf-pro-cecha">Jak vybrat ETF jako český investor: šest kritérií, která rozhodnou</Link>.
        </p>
        <p>
          Teprve pak vyberte brokera, který daný fond nabízí za rozumný poplatek
          a s dostatečnou regulatorní jistotou.
        </p>

        <h2>Co se děje po prvním nákupu</h2>
        <PullQuote a="Nic." b="Nebo přesněji: nic byste dělat neměli." />
        <p>
          Pravidelně přidávejte předem stanovenou částku. Ignorujte krátkodobé pohyby trhu.
          Pokud trh klesne o dvacet procent, je to příležitost koupit levněji, ne důvod
          se bát. Ceny na burze se mění každý den. Portfolio s horizontem dvacet let
          by se mělo kontrolovat jednou ročně, ne denně.
        </p>

        <h2>Tři začátečnické chyby, které přijdou draho</h2>
        <p>
          <strong>Čekat na správný moment.</strong> Neexistuje správný moment.
          Trhy jsou ze své podstaty nepředvídatelné v krátkém horizontu. Historicky
          jsou pravidelné nákupy lepší strategií než čekání na „dip".
        </p>
        <p>
          <strong>Příliš mnoho ETF najednou.</strong> Deset ETF z podobných indexů
          není lepší diverzifikace než jedno globální ETF. Je to jen víc práce
          a víc příležitostí udělat chybu.
        </p>
        <p>
          <strong>Investovat bez DIP, pokud platíte daň z příjmu.</strong>
          DIP (Dlouhodobý investiční produkt) umožňuje investovat do ETF
          s daňovým odpočtem až 48 000 Kč ročně. To je roční úspora 7 200 Kč
          pro každého, kdo platí daň v 15% sazbě. Jak to funguje:{" "}
          <Link href="/blog/dip-dlouhodoby-investicni-produkt">DIP: jak z investic ušetřit 7 200 Kč na daních každý rok</Link>.
        </p>
        <p>
          Podrobný průvodce mechanikou ETF, proč výběr indexu rozhoduje méně
          než náklady, a jak přemýšlet o investičním horizontu:{" "}
          <Link href="/blog/jak-investovat-do-etf">Jak investovat do ETF: průvodce od nuly</Link>.
        </p>
        <p style={{ marginTop: 24, fontSize: 13.5, color: "var(--text-2)", lineHeight: 1.65 }}>
          Tento článek je vzdělávací a nepředstavuje investiční doporučení.
          Konkrétní výběr ETF, brokera a výše investice závisí na vaší osobní
          situaci, toleranci rizika a finančním plánu. Obraťte se na regulovaného investičního poradce.
        </p>
      </div>
    );
  }

  if (slug === "jak-vybrat-etf-pro-cecha") {
    return (
      <div className="article-body">
        <p>
          „Doporučte mi nejlepší ETF." Tuto otázku dostávám každý týden.
          Problém je, že neexistuje jedno nejlepší ETF pro všechny.
          Existuje ETF, které je nejlepší pro konkrétní situaci, horizont a daňový režim.
        </p>
        <p>
          Místo konkrétního doporučení, které by bez znalosti vaší situace bylo nezodpovědné,
          dostanete rámec, jak se rozhodovat. Šest kritérií, která rozhodnou víc
          než titulek na investičním fóru.
        </p>

        <h2>Kritérium 1: UCITS je povinné</h2>
        <p>
          Jako investor z EU máte zákonem omezenou možnost nakupovat ETF registrovaná
          mimo Evropu. Americké ETF si přes standardní brokery koupit nemůžete.
          Důvod je regulatorní: PRIIP nařízení vyžaduje, aby každý fond nabízený
          retailovým investorům v EU měl tzv. dokument KID (Key Information Document).
          Americké fondy ho nemají.
        </p>
        <p>
          Praktický dopad: vždy hledejte označení UCITS v názvu nebo dokumentaci fondu.
          Fondy registrované v Irsku nebo Lucembursku splňují tuto podmínku téměř vždy.
        </p>

        <h2>Kritérium 2: TER pod 0,25 %</h2>
        <p>
          TER (Total Expense Ratio) je roční poplatek za správu fondu,
          automaticky strhávaný z výnosu. Na první pohled malé číslo
          v dlouhém horizontu rozhoduje o statisících.
        </p>
        <p>
          Příklad: investujete 5 000 Kč měsíčně po dobu třiceti let, průměrný výnos 7 % p.a.
          Rozdíl mezi TER 0,07 % a TER 1,5 % je přibližně 1 700 000 Kč.
          To jsou peníze, které jdou provozovateli fondu, ne vám.
        </p>
        <p>
          Pro indexové ETF kopírující světové nebo americké indexy je TER pod 0,20 %
          dosažitelné standardně. Vše nad 0,50 % si zaslouží zdůvodnění.
        </p>

        <h2>Kritérium 3: Akumulační nebo výplatní</h2>
        <p>
          Akumulační ETF (označení „Acc" nebo „C") reinvestuje dividendy automaticky
          zpět do fondu. Výplatní ETF (označení „Dis" nebo „D") dividendy vyplácí
          na účet.
        </p>
        <p>
          Pro většinu českých investorů s horizontem deset a více let je akumulační
          varianta výhodnější ze dvou důvodů: automatická reinvestice dividendy plně využívá
          složený úrok bez nutnosti ručního reinvestování a dividendy
          z výplatního ETF jsou daněny jako příjem. Naproti tomu zisk z prodeje akumulačního
          ETF po třech letech je od daně osvobozen díky časovému testu.
        </p>

        <h2>Kritérium 4: Časový test tří let</h2>
        <p>
          Jedním z hlavních daňových nástrojů pro české investory je osvobození
          od daně z příjmu při prodeji cenných papírů držených déle než tři roky
          (§ 10 ZDP). Platí pro fyzické osoby, nezávisle na výši zisku.
        </p>
        <p>
          Praktický dopad na výběr ETF: investujete-li do akumulačního ETF a prodáváte
          vždy nejdříve tři roky po nákupu, platíte nulovou daň z kapitálového zisku.
          U pravidelného investování to znamená sledovat každou nákupní transakci
          jako samostatnou položku s vlastním datem.
        </p>
        <p>
          Přesná aplikace závisí na konkrétní situaci. Doporučuji konzultaci
          s daňovým poradcem, zejména při větších částkách nebo investování přes firmu.
        </p>

        <h2>Kritérium 5: DIP a daňový odpočet</h2>
        <p>
          Pokud investujete přes DIP (Dlouhodobý investiční produkt), vybíráte
          ETF v rámci seznamu produktů, které váš poskytovatel DIP nabízí.
          Výměnou za toto omezení dostanete daňový odpočet až 48 000 Kč ročně
          a možnost příspěvku zaměstnavatele bez odvodů.
        </p>
        <p>
          DIP a klasický brokerský účet se nevylučují: je rozumné investovat část
          přes DIP kvůli daňové výhodě a část přes klasický účet kvůli volnosti výběru. Více:{" "}
          <Link href="/blog/dip-dlouhodoby-investicni-produkt">DIP: jak z investic ušetřit 7 200 Kč na daních každý rok</Link>.
        </p>

        <h2>Kritérium 6: Fyzická replikace a velikost fondu</h2>
        <p>
          ETF může index kopírovat fyzicky (skutečně drží akcie ze seznamu)
          nebo synteticky (přes swapové deriváty). Fyzická replikace je
          transparentnější a pro většinu začátečníků srozumitelnější.
        </p>
        <p>
          Velikost aktiv pod správou (AUM) by měla být alespoň 500 milionů eur.
          Malé fondy mají vyšší riziko uzavření nebo sloučení,
          což může způsobit nechtěnou daňovou událost v nevhodný čas.
        </p>

        <h2>Co z toho vyplývá</h2>
        <p>
          Pro běžného českého retailového investora s horizontem 15 a více let,
          pravidelným investováním a záměrem využít časový test to typicky
          znamená: jeden nebo dva akumulační UCITS ETF s TER pod 0,20 %
          kopírující globální nebo americký akciový index, fyzicky replikované,
          s aktivy přes miliardu eur.
        </p>
        <p>
          Konkrétní výběr produktu závisí na vaší situaci, brokerovi a dalších faktorech.
          Pokud nevíte, kde začít, přečtěte si:{" "}
          <Link href="/blog/etf-pro-zacatecniky">ETF pro začátečníky: tři kroky, než koupíte první fond</Link>.
          Nebo si výpočet, co z pravidelné investice vyjde, spočítejte na kalkulačce:{" "}
          <Link href="/blog/etf-spocitejte-si">ETF kalkulačka</Link>.
        </p>
        <p style={{ marginTop: 24, fontSize: 13.5, color: "var(--text-2)", lineHeight: 1.65 }}>
          Tento článek je vzdělávací a nepředstavuje investiční doporučení.
          Konkrétní výběr ETF závisí na vaší osobní situaci, toleranci rizika
          a finančním plánu. Doporučuji konzultaci s regulovaným investičním poradcem.
        </p>
      </div>
    );
  }

  if (slug === "propady-trhu-co-delat") {
    return (
      <div className="article-body">
        <p>
          Ve čtvrtek 5. listopadu ztratil americký Nasdaq 5,5&nbsp;% a spadl do korekce. Pro index
          S&amp;P 500 to byl nejhorší den od dubna 2025. Jestli vám teď v hlavě běží otázka „mám to
          prodat?“, odpověď je skoro vždycky ne. Ale ne vždycky, a o tom je tenhle článek.
        </p>

        <h2>Co se na trzích právě děje</h2>
        <p>
          Prodává se hlavně umělá inteligence a čipy. Investoři začali přepočítávat, jestli se obří
          investice do AI vůbec vrátí. Po amerických volbách se k tomu přidal strach, že nový Kongres
          přitáhne šrouby datovým centrům. Nvidia ve čtvrtek ztratila přes 9&nbsp;%, AMD přes 17&nbsp;%
          a index S&amp;P 500 přišel za jediný den o 2,8 bilionu dolarů tržní hodnoty.
        </p>
        <p>
          Nepřišlo to z čistého nebe. Už koncem října zažil S&amp;P 500 nejhorší den od června, když
          akcie Intelu spadly o 28,6&nbsp;%, nejvíc od roku 1974. Bitcoin se mezitím, mimo jiné po
          hackerském útoku na burzu Binance, propadl z více než 86&nbsp;000 dolarů v říjnu na zhruba
          76&nbsp;000. A trhliny jsou vidět i pod povrchem: nejrizikovější americké firemní dluhopisy
          s ratingem CCC a nižším mají výnos kolem 18&nbsp;%, nejvíc od roku 2020.
        </p>
        <p>
          Kdo má <Link href="/blog/jak-investovat-do-etf">světový akciový ETF</Link>, má v něm i tyhle
          firmy, protože patří k největším na světě. Takže ano, týká se to i vás. Jestli máte portfolio
          rozumně rozložené, je to ale úplně jiný pocit než u někoho, kdo má všechno v Nvidii.
        </p>

        <h2>Propady k akciím patří, jen to v den propadu nikdo nechce slyšet</h2>
        <p>
          Od roku 1980 spadl americký akciový trh během roku od svého maxima v průměru zhruba
          o 14&nbsp;%. A přesto skončil v plusu přibližně ve třech čtvrtinách let. Propad je cena,
          kterou platíte za to, že akcie dlouhodobě vydělávají víc než peníze na spořáku.
        </p>
        <p>
          Neznamená to, že se všechno vrátí do týdne. Kdo nakoupil na vrcholu v říjnu 2007, čekal
          i s dividendami na návrat svých peněz až do března 2012. Americký index se ale zatím po
          každém propadu dostal na nové maximum.
        </p>
        <p>
          A aby z rozumně rozloženého portfolia zmizelo všech 100&nbsp;%, musely by naráz zkrachovat
          všechny největší firmy světa. To by vaše portfolio bylo to poslední, co byste řešili.
        </p>

        <h2>Největší chyba: prodat ve strachu a čekat, až se to uklidní</h2>
        <p>
          Prodat teď a nakoupit zpátky, až bude klid, zní rozumně. Háček je v tom, že nejlepší dny
          na trhu chodí ruku v ruce s těmi nejhoršími. V datech J.P. Morgan přišlo sedm z deseti
          nejlepších dní indexu S&amp;P 500 za dvacet let do dvou týdnů od deseti nejhorších. A kdo
          za dvacet let zmeškal jen deset nejlepších dní, měl roční výnos skoro poloviční.
        </p>
        <p>
          Proč to lidi přesto dělají? Mozek vnímá ztrátu zhruba dvakrát silněji než stejně velký
          zisk. Když portfolio klesne o dvacet procent, bolí to zhruba dvakrát víc, než kolik by
          vás potěšil stejně velký růst. Za slabost to nepovažujte, takhle reaguje skoro každý. Problém nastane, až ten pocit přeložíte do akce.
          Kdo prodá v panice, zamkne si ztrátu a snadno prošvihne i odraz. Opatrnost, která
          vyjde nejdráž.
        </p>
        <p>
          Vzpomeňte si na březen 2020. Americké akcie za pět týdnů spadly zhruba o třetinu, svět
          byl zavřený a konec nebyl v dohledu. Kolikrát jste si tehdy položili otázku, jestli
          neprodat, dokud něco zbývá? Index S&amp;P 500 byl v srpnu téhož roku zpátky na svém
          maximu. V březnu to ale vědět nikdo nemohl a po propadech v letech 2000 a 2008 trvala
          cesta zpátky roky.
        </p>

        <h2>Co dělat, když trh padá</h2>

        <h3>1. Zeptejte se, kdy ty peníze budete potřebovat</h3>
        <p>
          Na téhle otázce teď záleží nejvíc. Peníze na barák za dva roky do akcií nepatří, a pokud
          tam jsou, propad jen ukázal, že plán nebyl domyšlený. Peníze, které nebudete potřebovat
          patnáct nebo dvacet let, se dnešních titulků bát nemusí. Klientům to říkám takhle:
          křišťálovou kouli nemáme, ale když přes ETF koupíte největší firmy světa, na dvacetiletém
          horizontu hraje čas pro vás. Pokud vydržíte.
        </p>

        <h3>2. Mějte rezervu, ať nikdy nemusíte prodávat</h3>
        <p>
          Nejhorší prodej je ten vynucený. Porouchá se auto, firma potřebuje překlenout pár slabších
          měsíců a jediné volné peníze leží v akciích, které jsou zrovna dvacet procent dole.
          Prodáváte za nejhorší cenu, jakou šlo chytit. Proto chci, aby klienti měli stranou
          zhruba <Link href="/blog/financni-poduska-jak-ji-spravne-nastavit">šest měsíčních výdajů</Link>.
          Leží to nudně na spořáku a přesně v takových týdnech je to k nezaplacení.
        </p>

        <h3>3. Pravidelné investice nevypínejte</h3>
        <p>
          Když v obchodě zlevní všechno o deset procent, nikdo nevybíhá ven s tím, že počká, až zase
          zdraží. U akcií to lidi dělají běžně. Pokud investujete každý měsíc, propad znamená jen to,
          že za stejné peníze kupujete víc. Výprodej, jen bez letáků.
        </p>

        <h3>4. Podívejte se, na čem doopravdy stojíte</h3>
        <p>
          Propad je nejlepší rentgen portfolia. Ukáže, kde máte všechno vsazené na jedno jméno nebo
          jeden příběh. Stačí jedna firma: kdo měl v Intelu polovinu portfolia, byl po tom říjnovém
          dni najednou o sedminu chudší. A kdo měl poslední roky všechno v AI a čipech, cítí tenhle
          týden dvojnásob. Rozložené portfolio padá taky, jen nepadá na hubu. Jak ho rozložit pomocí ETF, popisuji
          v článku <Link href="/blog/jak-vybrat-etf-pro-cecha">jak vybrat ETF jako český investor</Link>.
        </p>

        <h3>5. Vraťte portfolio do poměru, na kterém jste se dohodli</h3>
        <p>
          Když akcie spadnou, jejich podíl v portfoliu se zmenší. Kdo má nastavený poměr třeba
          70&nbsp;procent akcií a 30&nbsp;procent v bezpečnější části, po propadu přesune část peněz
          z bezpečnější části do akcií a vrátí se na svůj poměr. Zní to jednoduše a v praxi je to to
          nejtěžší, protože kupujete přesně ve chvíli, kdy se do toho nikomu nechce. Proto je dobré
          mít ten poměr domluvený dřív, než začne foukat.
        </p>

        <h2>Co v propadu nedělat</h2>
        <p>
          Nekoukejte do aplikace každou hodinu. Červená čísla nezezelenají tím, že na ně budete zírat,
          jen vás dotlačí k unáhlenému rozhodnutí.
        </p>
        <p>
          Nekupujte na dluh. Dokupovat propad z úvěru nebo s pákou je spolehlivý způsob, jak
          z dočasné ztráty udělat trvalou.
        </p>
        <p>
          Nenechte se nahnat do „jistoty“. V každém propadu se vyrojí prodejci zlata, kryptoměn nebo
          dluhopisů s krásným úrokem. Vysoký úrok je odměna za riziko, a nejrizikovější dluhopisy
          to teď připomínají dost hlasitě.
        </p>

        <h2>Kdy je propad důvod něco změnit</h2>
        <p>
          Ne každý propad se má jen přečkat. Změnu dává smysl řešit, když se změnil váš život.
          Prodáváte firmu, kupujete nemovitost, blíží se důchod a ty peníze budete brzy potřebovat.
          Nebo držíte jednotlivou firmu a rozpadl se příběh, kvůli kterému jste ji kupovali.
        </p>
        <p>
          A taky když zjistíte, že kvůli portfoliu nespíte. Pak máte nastavené víc rizika, než unesete.
          To se dá napravit, jen ideálně s chladnou hlavou a v den, kdy Nasdaq nepadá o pět procent.
        </p>

        <div className="article-closing">
          <p>
            Trh se teď bojí AI, regulace a dluhů. Za půl roku se bude bát něčeho úplně jinačího.
            Čeho přesně, je skoro jedno. Rozhodne, jestli máte plán, rezervu a nervy ho dodržet.
          </p>
          <p>
            Aplikace vám v takový den nezavolá. Ukáže vám jen červené číslo. Od toho jsem tady já,
            abych emoce držel na uzdě. I ty svoje.
          </p>
        </div>

        <div className="sources" id="zdroje">
          <div className="section-eyebrow" style={{ marginBottom: 6 }}>Zdroje</div>
          <ol>
            <li><a href="https://www.thestreet.com/stock-market-today/stock-market-today-dow-jones-sp-500-nasdaq-updates-nov-06-2026" target="_blank" rel="noopener">TheStreet, 6. 11. 2026</a>: nejhorší den od dubna 2025, tržní hodnota, bitcoin</li>
            <li><a href="https://www.fool.com/coverage/stock-market-today/2026/11/05/stock-market-today-nov-5-nasdaq-suffers-worst-day-in-18-months-as-ai-trade-comes-under-fire/" target="_blank" rel="noopener">The Motley Fool, 5. 11. 2026</a>: pokles Nasdaqu, Nvidia, AMD, volby a datová centra</li>
            <li><a href="https://www.stocktitan.net/articles/stock-market-today-live-november-5-2026" target="_blank" rel="noopener">StockTitan s daty CNBC, 5. 11. 2026</a>: Nasdaq v korekci</li>
            <li><a href="https://www.itv.com/news/2026-10-30/wall-street-drops-to-its-worst-day-since-june-after-the-sell-off-for-tech-stocks-deepens" target="_blank" rel="noopener">AP přes ITV, 30. 10. 2026</a>: nejhorší den od června, Intel, bitcoin</li>
            <li><a href="https://fred.stlouisfed.org/series/BAMLH0A3HYCEY" target="_blank" rel="noopener">FRED, ICE BofA CCC &amp; Lower US High Yield Effective Yield</a>: výnos dluhopisů s ratingem CCC a nižším</li>
            <li><a href="https://www.fondshop.cz/povolebni-nadeje-pro-akcie-varovne-signaly-z-ciny-a-dluhopisu" target="_blank" rel="noopener">Fondshop, 1. 11. 2026</a>: srovnání s rokem 2020</li>
            <li><a href="https://am.jpmorgan.com/us/en/asset-management/per/about-us/media/press-releases/jp-morgan-asset-management-releases-2025-guide-to-retirement" target="_blank" rel="noopener">J.P. Morgan Asset Management, 2025 Guide to Retirement</a>: zmeškání deseti nejlepších dní</li>
            <li><a href="https://401kspecialistmag.com/folly-of-timing-the-market-explained-in-jpmams-2024-guide-to-retirement/" target="_blank" rel="noopener">401(k) Specialist o J.P. Morgan 2024 Guide to Retirement</a>: nejlepší dny blízko nejhorších</li>
            <li><a href="https://www.raymondjames.com/fitzcustomwealth/the-optimist-investor-blog/2025/04/22/drawdowns" target="_blank" rel="noopener">Raymond James, 22. 4. 2025</a>: průměrný propad během roku od roku 1980</li>
            <li><a href="https://advisorpedia.com/strategists/how-do-investors-navigate-market-volatility" target="_blank" rel="noopener">Advisorpedia s daty J.P. Morgan</a>: návrat trhu po roce 2007</li>
          </ol>
        </div>

        <p style={{ marginTop: 24, fontSize: 13.5, color: "var(--text-2)", lineHeight: 1.65 }}>
          Článek je obecná informace, nikoli investiční doporučení ani nabídka. Investování do akcií
          nese riziko ztráty a minulé výnosy nezaručují výnosy budoucí. Údaje jsou k 6. 11. 2026.
        </p>
      </div>
    );
  }

  if (slug === "den-kdy-se-nevratite-domu") {
    return (
      <div className="article-body">
        <p>
          Nepříjemná otázka, kterou většina majitelů firem odkládá. Jenže když na ni neodpovíte vy,
          odpoví za vás notář, banka a zákon. A jejich odpověď se vaší rodině líbit nemusí.
        </p>

        <h2>Kdo by to vaší rodině řekl</h2>
        <p>
          Bankéř ne. Ten se mění každé dva roky a vidí jen to, co máte u jeho banky.
        </p>
        <p>
          Notář taky ne. V dědickém řízení obešle banky, mrkne do katastru a do pár dalších evidencí.
          Co v nich není, nenajde: účet u zahraničního brokera, kryptoměny, zlato v trezoru, půjčku
          kamarádovi. Najde to jen ten, kdo o tom ví.
        </p>
        <p>
          Manželka často neví, u kterých bank máte účty, kde leží smlouvy a komu zavolat jako prvnímu.
          A ve firmě čekají, kdo podepíše výplaty.
        </p>
        <p>
          A nemusí jít jen o nejhorší den. Stačí vážný úraz nebo nemoc, kvůli které na pár měsíců
          nebudete moct rozhodovat. Otázky jsou stejné, jen je řeší rodina, zatímco vy ležíte
          v nemocnici.
        </p>

        <h2>Kdo dědí, když nemáte závěť</h2>
        <p>
          Spousta chlapů žije v tom, že všechno připadne manželce. Když máte děti, zákon to vidí jinak.
        </p>
        <p>
          Nejdřív se vypořádá společné jmění manželů. Pokud nemáte manželskou smlouvu, patří manželce
          tak jako tak polovina všeho, co jste za manželství nabyli, kromě darů a dědictví. Do
          dědictví jde jen ta vaše polovina a tu zákon rozdělí rovným dílem mezi manželku a děti.
        </p>
        <p>
          Příklad: barák za 12&nbsp;milionů ve společném jmění, manželka a dvě děti. Manželce zůstane
          její polovina, tedy 6&nbsp;milionů. Vaše polovina se rozdělí na třetiny po 2&nbsp;milionech.
          Manželka má dohromady 8&nbsp;milionů a každé dítě 2&nbsp;miliony. Z baráku, ve kterém rodina
          bydlí, jí patří dvě třetiny, ne celý.
        </p>
        <p>
          Když jsou děti nezletilé, je to ještě složitější. Za dítě v dědickém řízení nemůže jednat
          máma, protože dědí taky. Soud mu proto jmenuje kolizního opatrovníka, zpravidla
          OSPOD. A kdyby chtěla barák později prodat, k podílu dětí potřebuje souhlas soudu.
        </p>
        <p>
          Žijete bez svatby? Pak partnerka vedle dětí nedědí ani korunu, i kdybyste spolu žili dvacet
          let. Pomůže závěť nebo dědická smlouva u notáře. A pokud máte životní pojistku, napište ji
          tam jako obmyšlenou. Jinak plnění dostanou děti, ne ona.
        </p>
        <p>
          Kolik by u vás dostal kdo, si naklikáte v simulátoru{" "}
          <Link href="/#dedictvi">Kdo dědí bez závěti</Link>. Je to minuta práce a výsledek často
          překvapí.
        </p>
        <p>
          Závětí to můžete změnit. Jen dětem musíte nechat aspoň povinný díl: nezletilým tři čtvrtiny
          jejich zákonného podílu, dospělým čtvrtinu.
        </p>

        <h2>Co se stane s firmou</h2>
        <PullQuote a="Firma s vámi nezemře." b="Ale může zamrznout." />
        <p>
          Pokud jste jediný jednatel a nikdo další nemá prokuru ani přístup k účtům, nemá za firmu kdo
          podepsat smlouvu, zaplatit fakturu ani poslat výplaty. Nového jednatele musí zvolit
          společník. A pokud jste jediný společník vy, je váš podíl v dědickém řízení. Bez správce
          ze závěti za něj můžou hlasovat jen dědici, a to když se shodnou. Když se neshodnou, soud
          jmenuje správce. Bez přípravy to trvá týdny, často i měsíce. Dodavatelé, zaměstnanci
          i banka mezitím čekají.
        </p>
        <p>Co pomáhá:</p>
        <p>
          <strong>Druhý podpis.</strong> Druhý jednatel nebo prokurista s dispozičním právem
          k firemním účtům. S advokátem si ověřte, že může jednat sám.
        </p>
        <p>
          <strong>Správce pozůstalosti v notářské závěti.</strong> Ujme se správy, hned jak se dozví
          o vaší smrti, a ve firmě může vykonávat vaše práva společníka, třeba zvolit nového
          jednatele. Platně ho jde určit jen u notáře, v závěti psané doma ne.
        </p>
        <p>
          <strong>Pravidla ve společenské smlouvě.</strong> Jestli podíl přejde na dědice, kdo za ně
          bude hlasovat a jak se vyrovnáte s ostatními společníky. Upravit ji můžete jen zaživa.
        </p>
        <p>
          <strong>Předběžné prohlášení.</strong> Pro případ, kdy kvůli nemoci nebo úrazu nebudete moct
          rozhodovat. Nejlépe u notáře určíte, kdo bude rozhodovat za vás a jak. Bez něj o tom, kdo
          vás bude zastupovat, rozhodne soud.
        </p>

        <h2>Na papíře 55 milionů, na ruce tři a půl</h2>
        <p>
          Z čeho rodina v prvních měsících zaplatí hypotéku, školu a pohřeb?
        </p>
        <p>
          V kalkulačce <Link href="/#druha-noha">Kde máte majetek</Link>{" "}má ukázkový majitel na papíře
          přes 55&nbsp;milionů: firmu za 40, barák za 12, investice za 2 a hotovost za 1,5&nbsp;milionu.
          Bez prodeje firmy nebo baráku má k dispozici tři a půl. Zbytek je zamčený ve firmě
          a v baráku.
        </p>
        <p>
          A i ty tři a půl milionu můžou ležet v dědickém řízení, pokud jsou jen na vaše jméno. Banka
          účet po vaší smrti zmrazí. Pokud jste nikomu nezřídil dispoziční právo platné i po smrti,
          rodina se k penězům dostane až po skončení dědického řízení.
        </p>
        <p>
          Proto rodina potřebuje <Link href="/blog/financni-poduska-jak-ji-spravne-nastavit">rezervu</Link>,
          ke které se dostane hned, a životní pojistku s určenou obmyšlenou osobou. Pojistné plnění
          dostane přímo ten, koho jste určil. Do dědictví nepatří, takže se na konec dědického řízení
          nečeká.
        </p>
        <p>
          Kalkulačky na webu po vás nechtějí telefon ani e-mail. Počítá se jen ve vašem prohlížeči.
          A pokud vám vyjde, že skoro všechno máte ve firmě, přečtěte si{" "}
          <Link href="/blog/firma-a-osobni-majetek">Firma roste. Váš osobní majetek ne.</Link>
        </p>

        <h2>Jeden člověk. Celý váš obraz.</h2>
        <p>
          Právě kvůli takovému dni má můj web nadpis „Jeden člověk. Celý váš obraz.“ Chci být ten, komu vaše rodina
          v takový den zavolá jako prvnímu. A kdo ví, co dělat.
        </p>
        <p>
          Inspiraci jsem si přivezl ze Švýcarska. Jeden člověk drží celý obraz, od investic
          po krizový plán. Na webu to mám rozepsané{" "}
          <Link href="/#services">od cashflow po den, kdy se nevrátíte domů</Link>.
        </p>
        <p>
          Sám to všechno nedělám. Za mnou stojí tým: advokát, notář, daňař, účetní. Vy ale voláte
          na jedno číslo a já hlídám, aby si všichni rozuměli.
        </p>

        <h2>Co můžete udělat ještě tento měsíc</h2>
        <p>
          <strong>Sepište jednu stránku.</strong> Kde co máte, kdo má k čemu přístup a komu volat jako
          prvnímu. Účty, investice, pojistky, nemovitosti, podíly i dluhy. Hesla tam nepište, stačí,
          aby rodina věděla, co existuje a kde hledat.
        </p>
        <p>
          <strong>Řekněte někomu, kde ta stránka leží.</strong> Papír v šuplíku, o kterém nikdo neví,
          nepomůže nikomu.
        </p>
        <p>
          <strong>Sepište závěť u notáře.</strong> Notář ji zapíše do Centrální evidence závětí, takže
          ji v dědickém řízení najdou. A rovnou v ní můžete určit správce pozůstalosti.
        </p>
        <p>
          <strong>Dejte firmě druhý podpis.</strong> Druhý jednatel nebo prokurista s přístupem
          k účtům.
        </p>
        <p>
          <strong>Zkontrolujte jména ve smlouvách.</strong> U životní pojistky a penzijka, koho máte
          uvedeného pro případ smrti. Po rozvodu nebo narození dítěte tam často zůstane jméno, které
          už nesedí.
        </p>

        <h2>Kde začít, když nic nebolí</h2>
        <p>
          Nic vás nebolí, a právě proto je dobrá chvíle podívat se, jestli firma běží i bez vás.
        </p>
        <p>
          <Link href="/financni-preventivka">Finanční preventivka</Link> je dvacet tvrzení v pěti
          oblastech: firma bez majitele, peníze mimo firmu, rodina a dokumenty, daně a struktura
          a plán odchodu. Za pět minut a po zadání jména a e-mailu uvidíte, kde máte největší mezery,
          a tři kroky, kterými začít.
        </p>

        <div className="article-closing">
          <p>
            Na tenhle den se nikdo nechystá rád. Ale když přijde, vaše rodina bude hledat číslo,
            kam zavolat.
          </p>
          <p>Chci, aby to číslo bylo moje.</p>
        </div>

        <div className="sources" id="zdroje">
          <div className="section-eyebrow" style={{ marginBottom: 6 }}>Zdroje</div>
          <ol>
            <li><b>Občanský zákoník (zákon č. 89/2012 Sb.), § 1635</b>: v první třídě dědí děti a manžel, každý stejným dílem.</li>
            <li><b>Občanský zákoník, § 1636</b>: druhá třída; partner bez svatby dědí, jen když zůstavitel nemá potomky a partner s ním aspoň rok před smrtí žil ve společné domácnosti a pečoval o ni nebo byl na něm závislý výživou.</li>
            <li><b>Občanský zákoník, § 1643</b>: povinný díl, nezletilý potomek tři čtvrtiny, zletilý čtvrtinu zákonného dědického podílu.</li>
            <li><b>Občanský zákoník, § 1582</b>: dědickou smlouvou lze povolat za dědice druhou stranu nebo třetí osobu; smlouva musí mít formu veřejné listiny.</li>
            <li><b>Občanský zákoník, § 1556</b>: správce pozůstalosti povolaný zůstavitelem; povolání vyžaduje formu veřejné listiny.</li>
            <li><b>Občanský zákoník, § 898</b>: právní jednání o majetku dítěte, která nejsou běžná, schvaluje soud.</li>
            <li><b>Občanský zákoník, § 2832 odst. 1</b>: obmyšlený nabývá právo na pojistné plnění vznikem pojistné události, plnění proto nepatří do dědictví; bez určeného obmyšleného platí pořadí podle § 2831.</li>
          </ol>
        </div>

        <p style={{ marginTop: 24, fontSize: 13.5, color: "var(--text-2)", lineHeight: 1.65 }}>
          Článek je obecná informace, nikoli právní ani daňové poradenství. Dědické právo má výjimky
          a každá rodina je jiná. Konkrétní řešení vždy připravujeme s advokátem nebo notářem.
        </p>
      </div>
    );
  }

  if (slug === "nastupnictvi-ve-firme-nvidie") {
    return (
      <div className="article-body">
        <p className="lead">Jensen Huang přes třicet let vedl Nvidii, jednu z&nbsp;nejhodnotnějších firem světa. Ve čtvrtek 12.&nbsp;listopadu z&nbsp;ní odešel ze dne na den a&nbsp;nástupce nikdy nejmenoval. Co by se stalo s&nbsp;vaší firmou, kdybyste zítra vypadli vy?</p>
        <h2>Co se stalo v&nbsp;Nvidii</h2>
        <p>Koncem října napsal New York Times, že se Huang podle amerických tajných služeb údajně stal terčem čínské rozvědky. Čína to odmítá. Správní rada 8.&nbsp;listopadu spustila nezávislé vyšetřování a&nbsp;akcie druhý den spadly o&nbsp;víc než 4&nbsp;%.</p>
        <p>O&nbsp;čtyři dny později <a href="https://www.sec.gov/Archives/edgar/data/0001045810/000104581026000082/nvidiaannouncesceotransiti.htm" target="_blank" rel="noopener noreferrer">Nvidia oznámila</a>, že Huang s&nbsp;okamžitou platností odchází z&nbsp;funkce generálního ředitele i&nbsp;ze správní rady. Firmu prozatím vede finanční ředitelka Colette Kress, která si finance nechává k&nbsp;tomu. Nástupce Huang za celé ty roky nejmenoval, takže ho teď správní rada hledá uvnitř firmy i&nbsp;venku.</p>
        <p>Huang odcházel z&nbsp;firmy, která má správní radu, armádu právníků a&nbsp;finanční ředitelku, kterou jde přes noc posadit do čela. Vaše firma má nejspíš vás. A&nbsp;pak dlouho nic.</p>

        <h2>Teď si hrajeme na kdyby</h2>
        <PullQuote a="Zítra ráno nepřijdete do práce, protože se vám něco stalo." b={"Kdo u\u00a0vás pak podepíše výplaty?"} />
        <p>Když v&nbsp;Česku zemře jediný jednatel, firma najednou nemá statutára. Nového musí do měsíce zvolit valná hromada, a&nbsp;když to nestihne, jmenuje ho na návrh soud. V&nbsp;krajním případě může soud firmu i&nbsp;zrušit a&nbsp;poslat do likvidace.</p>
        <p>Jenže když jste byli jednatel i&nbsp;majitel zároveň, rozhodují za váš podíl do konce dědického řízení dědicové společně, takže se musí shodnout. Když se neshodnou, může soud jmenovat správce pozůstalosti, a&nbsp;to celé může trvat déle než měsíc. Mezitím nemá kdo podepsat smlouvy ani platby a&nbsp;banka může přístup k&nbsp;účtům omezit. Výplaty, nájem a&nbsp;dodavatelé ale čekat nebudou. A&nbsp;to už je průser.</p>
        <p>Doma to není o&nbsp;moc lepší. Manželka nebo manžel se k&nbsp;penězům na vašem osobním účtu dostane naplno až po dědickém řízení. A&nbsp;běžné dispoziční právo po vaší smrti obvykle zaniká, pokud jste si v&nbsp;bance předem nenastavili, že má platit i&nbsp;potom. Ne každá banka to umožňuje.</p>
        <p>Jeden pán mi vyprávěl, jak dva dny hledal peněženku. A&nbsp;došlo mu, že kdyby se mu něco stalo, žena by klíčenku s&nbsp;bitcoiny za dva tři miliony nejspíš vyhodila jako krám. Jeho závěr byl jednoduchý: musím sepsat, kde co mám.</p>

        <h2>Kdo po vás zdědí firmu</h2>
        <p>Váš podíl ve firmě ze zákona přechází na dědice, pokud to společenská smlouva nezakáže nebo neomezí. Ve firmě tak můžete najednou mít jako společníky manželku, dvacetiletého syna a&nbsp;jeho dvě sestry, každého s&nbsp;jiným názorem na to, co dál. A&nbsp;když smlouva dědění zakáže, rodina dostane místo podílu peníze a&nbsp;vyplatit je musí firma.</p>
        <p>Podle <a href="https://amsp.cz/media/amsp/3839/109-pruzkum-ipsos-pro-amspzaverecna-zpravavyzkum-rodinnych-firemkveten-2024final.pdf" target="_blank" rel="noopener noreferrer">průzkumu Ipsos pro AMSP ČR</a> z&nbsp;roku 2024 má scénář pro případ, že majitel náhle vypadne, připravený i&nbsp;s&nbsp;právními dokumenty jen 27&nbsp;% rodinných firem. Dalších 32&nbsp;% ho má, ale bez dokumentů. Což je asi jako mít airbag nakreslený fixou na volantu.</p>

        <h2>Co má být v&nbsp;krizovém plánu</h2>
        <p>Nemusí to být bichle. Stačí, když na pár stránkách odpovíte na pět otázek.</p>
        <ol>
        <li>Co všechno máte a&nbsp;kde? Firemní a&nbsp;osobní účty, investice, nemovitosti, pojistky, kryptoměny a&nbsp;přístupy k&nbsp;nim.</li>
        <li>Kdo podepisuje, když vy nemůžete? Druhý jednatel nebo prokurista a&nbsp;plné moci pro případ, že budete týdny mimo hru. A&nbsp;předběžné prohlášení pro případ, že byste dlouhodobě nemohli rozhodovat. To ale za firmu podepisovat nebude, jen určí, kdo se postará o&nbsp;vaše záležitosti.</li>
        <li>Co říká vaše společenská smlouva o&nbsp;dědění podílu a&nbsp;kdo bude za váš podíl rozhodovat, než skončí dědictví? Správce pozůstalosti můžete určit předem u&nbsp;notáře.</li>
        <li>Kdo je ve firmě klíčový a&nbsp;co se musí zaplatit v&nbsp;prvních dnech? Výplaty, nájem, úvěry, dodavatelé.</li>
        <li>Komu má rodina zavolat jako prvnímu? Člověk, který ví, co kde je a&nbsp;jak postupovat.</li>
        </ol>
        <p>Předběžné prohlášení podle občanského zákoníku určí, kdo bude spravovat vaše záležitosti, když nebudete schopní rozhodovat. Plán má mít každý z&nbsp;manželů, nejen ten, kdo vede firmu. Právní kostru ať vám sepíše advokát nebo notář. Já s&nbsp;vámi dám dohromady zbytek plánu, abyste za ním přišli s&nbsp;jasným zadáním, a&nbsp;rád budu i&nbsp;tím člověkem z&nbsp;pátého bodu.</p>
        <p>Nvidia si s&nbsp;tím poradí, má na to lidi i&nbsp;miliardy. U&nbsp;firmy se stovkou milionů obratu celou tuhle knížku často nosí v&nbsp;hlavě jeden člověk. Tak ji dostaňte z&nbsp;hlavy na papír. Dokud ta hlava funguje.</p>

        <p className="cta-line">Když vám po těch pěti otázkách vyjde víc otazníků než odpovědí, <a href="/konzultace">ozvěte se mi</a>.</p>

        <div className="sources" id="zdroje">
          <div className="section-eyebrow" style={{ marginBottom: 6 }}>Zdroje</div>
          <ol>
            <li><a href="https://www.sec.gov/Archives/edgar/data/0001045810/000104581026000082/nvidiaannouncesceotransiti.htm" target="_blank" rel="noopener noreferrer">Oznámení Nvidie pro SEC, 12. 11. 2026</a></li>
            <li><a href="https://investor.nvidia.com/news/press-release-details/2026/Statement-from-NVIDIA-Board-of-Directors/default.aspx" target="_blank" rel="noopener noreferrer">Prohlášení správní rady Nvidie, 8. 11. 2026</a></li>
            <li><a href="https://abc7news.com/story/nvidia-stock-falls-company-opens-probe-ceo-jensen-huang-alleged-affair-chinese-spy/20026775/" target="_blank" rel="noopener noreferrer">ABC7 k&nbsp;vyšetřování a&nbsp;propadu akcií, 9. 11. 2026</a></li>
            <li><a href="https://finance.yahoo.com/technology/live/nvidia-live-updates-jensen-huang-resigns-cfo-colette-kress-to-serve-as-interim-ceo-140341430.html" target="_blank" rel="noopener noreferrer">Yahoo Finance k&nbsp;týdenní ztrátě hodnoty, 13. 11. 2026</a></li>
            <li><a href="https://www.aljazeera.com/news/2026/11/12/nvidia-board-weighs-jensen-huangs-future-can-it-remove-its-founder" target="_blank" rel="noopener noreferrer">Al Jazeera a&nbsp;Reuters k&nbsp;chybějícímu nástupci, 12. 11. 2026</a></li>
            <li><a href="https://www.zakonyprolidi.cz/cs/2012-90" target="_blank" rel="noopener noreferrer">Zákon o&nbsp;obchodních korporacích, §&nbsp;42 a&nbsp;§ 198</a></li>
            <li><a href="https://www.zakonyprolidi.cz/cs/2012-89" target="_blank" rel="noopener noreferrer">Občanský zákoník, §&nbsp;38 a&nbsp;§ 39</a></li>
            <li><a href="https://www.epravo.cz/top/clanky/byznys-a-paragrafy-dil-14-umrti-jednatele-a-spolecnika-jednoclenne-spolecnosti-119851.html" target="_blank" rel="noopener noreferrer">epravo.cz k&nbsp;úmrtí jednatele a&nbsp;společníka</a></li>
            <li><a href="https://www.e15.cz/finexpert/banky-a-ucty/nebezpecny-omyl-s-penezi-v-manzelstvi-proc-vas-po-umrti-partnera-muze-banka-ze-dne-na-den-odstrihnout-od-uctu-1434699" target="_blank" rel="noopener noreferrer">E15 k&nbsp;účtům po úmrtí partnera</a></li>
            <li><a href="https://amsp.cz/media/amsp/3839/109-pruzkum-ipsos-pro-amspzaverecna-zpravavyzkum-rodinnych-firemkveten-2024final.pdf" target="_blank" rel="noopener noreferrer">Průzkum Ipsos pro AMSP ČR o&nbsp;rodinných firmách, 2024 (PDF)</a></li>
          </ol>
        </div>
      </div>
    );
  }

  if (slug === "listopad-2026-na-trzich") {
    return (
      <div className="article-body">
        <p className="lead">Česká národní banka zdražila peníze, technologické akcie zažily nejhorší den od března 2020 a&nbsp;bitcoin od říjnového maxima ztratil přes pětinu. Tady je listopad v&nbsp;pěti bodech a&nbsp;u&nbsp;každého to, co z&nbsp;něj plyne pro vás.</p>
        <h2>1. ČNB zdražila peníze</h2>
        <p>Česká národní banka <a href="https://www.cnb.cz/cs/cnb-news/tiskove-zpravy/CNB-zvysuje-urokove-sazby-00028/" target="_blank" rel="noopener noreferrer">5.&nbsp;listopadu zvedla</a> základní sazbu o&nbsp;čtvrt procentního bodu na 4&nbsp;%. Rozhodl jediný hlas, bankovní rada hlasovala 4:3. Centrální banka čeká, že inflace začátkem příštího roku vzroste a&nbsp;za celý rok 2027 bude kolem 3,2&nbsp;%. Další rozhodnutí přijde 17.&nbsp;prosince.</p>
        <p className="takeaway"><strong>Pro vás:</strong> Majitelé mají často ve firmě miliony na běžném účtu. Když inflace příští rok zrychlí, budou ty peníze prohrávat ještě rychleji. Víte, kolik vám reálně vydělávají?</p>

        <h2>2. Americká inflace nechce dolů</h2>
        <p>V&nbsp;září rostly ceny v&nbsp;USA o&nbsp;3,7&nbsp;% meziročně a&nbsp;ceny výrobců v&nbsp;říjnu dokonce o&nbsp;6,5&nbsp;%. Meziroční inflaci za říjen americký statistický úřad nezveřejnil vůbec, protože mu chybí data z&nbsp;loňského října, kdy kvůli rozpočtovému sporu nefungovala vláda. Takže letos statistici nemají s&nbsp;čím srovnávat. Trhy po zveřejnění inflace sázely skoro najisto, že Fed 9.&nbsp;prosince sazby zvedne: zhruba z&nbsp;85&nbsp;% o&nbsp;čtvrt procentního bodu, zbytek o&nbsp;půl.</p>
        <p className="takeaway"><strong>Pro vás:</strong> Dražší dolarové peníze tlačí hlavně na technologické a&nbsp;růstové firmy. Kdo má v&nbsp;portfoliu hodně Ameriky a&nbsp;technologií, ať počítá s&nbsp;tím, že nervozita jen tak nepřejde.</p>

        <h2>3. AI akcie měly nejhorší den od roku 2020</h2>
        <p>Ve čtvrtek 5.&nbsp;listopadu <a href="https://www.boston.com/news/national-news/2026/11/05/a-brutal-sell-off-for-ai-stocks-sends-wall-street-reeling-and-the-sp-500-tumbles-4-4/" target="_blank" rel="noopener noreferrer">spadl index S&amp;P 500 o&nbsp;4,4&nbsp;%</a> a&nbsp;technologický Nasdaq 100 o&nbsp;6,4&nbsp;%. Pro S&amp;P 500 to byl nejhorší den od dubna 2025, pro Nasdaq 100 dokonce od března 2020. Podle odhadu JPMorgan k&nbsp;tomu přispěly pákové ETF, které musely do konce obchodování prodat akcie za víc než 60&nbsp;miliard dolarů, z&nbsp;toho zhruba 90&nbsp;% technologických. O&nbsp;týden později přišla Nvidia ze dne na den o&nbsp;šéfa, víc o&nbsp;tom v&nbsp;<a href="/blog/nastupnictvi-ve-firme-nvidie">článku o&nbsp;nástupnictví</a>.</p>
        <p className="takeaway"><strong>Pro vás:</strong> Pro toho, kdo má plán a&nbsp;čas, je takový den sleva. Pro toho, kdo má páku, je to likvidace. Proto páka do klidného portfolia nepatří.</p>

        <h2>4. Bitcoin: digitální zlato, které padá s&nbsp;Nasdaqem</h2>
        <p>Bitcoin 2.&nbsp;října krátce vystoupal na 87&nbsp;tisíc dolarů. V&nbsp;pátek třináctého listopadu <a href="https://www.forbes.com/sites/digital-assets/2026/11/13/bitcoin-falls-below-70000-to-reach-lowest-since-august/" target="_blank" rel="noopener noreferrer">spadl pod 70&nbsp;tisíc</a>, na chvíli až k&nbsp;67,6&nbsp;tisíce, nejníž od srpna. A&nbsp;z&nbsp;amerických bitcoinových fondů ETF letos k&nbsp;12.&nbsp;listopadu odteklo zhruba o&nbsp;1,6&nbsp;miliardy dolarů víc, než do nich přiteklo.</p>
        <p className="takeaway"><strong>Pro vás:</strong> Kdo kupoval bitcoin jako bezpečný přístav, teď vidí, že se v&nbsp;nervózních časech chová spíš jako zesílené technologické akcie. Sám jsem krypto vždycky bral jen jako zábavu a&nbsp;klientům ho do portfolií nedávám.</p>

        <h2>5. Firemní dluhopisy: trh začal rozlišovat</h2>
        <p>Podle <a href="https://www.swissinfo.ch/eng/junk-market-splits-as-european-spreads-hit-widest-since-2009/92297769" target="_blank" rel="noopener noreferrer">agentury Bloomberg</a> byly koncem října v&nbsp;Evropě rozdíly mezi výnosy nejlepších a&nbsp;nejhorších rizikových firemních dluhopisů největší od roku 2009. V&nbsp;USA se rozdíl mezi nejslabšími a&nbsp;silnějšími emitenty od začátku roku víc než zdvojnásobil. Investoři prostě začali počítat, kdo své dluhy unese a&nbsp;kdo ne.</p>
        <p className="takeaway"><strong>Pro vás:</strong> U&nbsp;nás se to týká hlavně dluhopisů, které vám někdo nabídne s&nbsp;osmi nebo devíti procenty. Při základní sazbě ČNB 4&nbsp;% je ten rozdíl cena za riziko, že peníze neuvidíte. Než do něčeho takového dáte peníze, zeptejte se, proč vám ta firma platí dvakrát víc, než je sazba ČNB, a&nbsp;jestli byste to přežili, kdyby ty peníze nevrátila.</p>

        <h2>Co přijde</h2>
        <p>Kolem 19.&nbsp;listopadu má jít na americkou burzu Anthropic, firma, která stojí za umělou inteligencí Claude. <a href="https://www.timeslive.co.za/news/business/2026-11-10-anthropic-lowers-ipo-valuation-target-to-102-trillion/" target="_blank" rel="noopener noreferrer">Nabízí akcie za 70 až 78&nbsp;dolarů</a>, což firmu oceňuje zhruba na bilion dolarů, po započtení opcí a&nbsp;zaměstnaneckých akcií až na 1,4&nbsp;bilionu. Přesné datum ještě není potvrzené. Pak 9.&nbsp;prosince rozhoduje Fed a&nbsp;17.&nbsp;prosince ČNB.</p>
        <p className="takeaway"><strong>Pro vás:</strong> Kolem tak velkého vstupu na burzu bude pár dní hodně hluku. Váš plán by se kvůli tomu měnit neměl.</p>

        <h2>Co s&nbsp;tím</h2>
        <p>Máte rádi pizzu? Ta nejlepší má tři ingredience. S&nbsp;dvaceti už se nedá jíst. S&nbsp;portfoliem je to podobné: čím je složitější, tím víc míst, kde se může pokazit.</p>
        <p>Listopad v&nbsp;tomhle nic nového nevymyslel. Kdo má široce rozložené portfolio bez páky a&nbsp;rezervu na šest měsíců výdajů, může tohle všechno sledovat jako seriál. A&nbsp;kdo investuje pravidelně, teď nakupuje levněji než v&nbsp;říjnu. Smysl to má ale jen pro toho, kdo vydrží i&nbsp;další propad a&nbsp;neprodá.</p>

        <p className="cta-line">Jestli si nejste jistí, jak by vaše portfolio přežilo další takový měsíc, <a href="/konzultace">ozvěte se mi</a> a&nbsp;projdeme ho spolu.</p>
        <p className="disclaimer-line">Tohle je můj pohled na listopad, žádné investiční doporučení. Co dává smysl vám, záleží na vaší situaci.</p>

        <div className="sources" id="zdroje">
          <div className="section-eyebrow" style={{ marginBottom: 6 }}>Zdroje</div>
          <ol>
            <li><a href="https://www.cnb.cz/cs/cnb-news/tiskove-zpravy/CNB-zvysuje-urokove-sazby-00028/" target="_blank" rel="noopener noreferrer">ČNB, tisková zpráva z&nbsp;5. 11. 2026</a></li>
            <li><a href="https://www.cnb.cz/cs/menova-politika/br-zapisy-z-jednani/Rozhodnuti-bankovni-rady-CNB-1793865600000/?tab=record" target="_blank" rel="noopener noreferrer">ČNB, záznam z&nbsp;jednání bankovní rady a&nbsp;hlasování</a></li>
            <li><a href="https://www.cnb.cz/cs/o_cnb/cnblog/CNB-zvysila-urokove-sazby-inflace-na-pocatku-pristiho-roku-vzroste-nasledne-vsak-zacne-diky-prisne-menove-politice-klesat/" target="_blank" rel="noopener noreferrer">ČNB blog k&nbsp;nové prognóze</a></li>
            <li><a href="https://www.cnb.cz/cs/menova-politika/br-zapisy-z-jednani/" target="_blank" rel="noopener noreferrer">ČNB, kalendář jednání bankovní rady</a></li>
            <li><a href="https://www.bls.gov/news.release/archives/cpi_11102026.htm" target="_blank" rel="noopener noreferrer">BLS, spotřebitelské ceny za říjen 2026</a></li>
            <li><a href="https://www.bls.gov/news.release/ppi.nr0.htm" target="_blank" rel="noopener noreferrer">BLS, ceny výrobců</a></li>
            <li><a href="https://cbsnews.com/news/october-cpi-report-elevated-inflation" target="_blank" rel="noopener noreferrer">CBS News k&nbsp;sázkám na Fed</a></li>
            <li><a href="https://federalreserve.gov/monetarypolicy/fomccalendars.htm" target="_blank" rel="noopener noreferrer">Fed, kalendář zasedání</a></li>
            <li><a href="https://www.boston.com/news/national-news/2026/11/05/a-brutal-sell-off-for-ai-stocks-sends-wall-street-reeling-and-the-sp-500-tumbles-4-4/" target="_blank" rel="noopener noreferrer">AP k&nbsp;výprodeji 5. 11. 2026</a></li>
            <li><a href="https://finance.yahoo.com/markets/stocks/articles/fast-money-systematic-funds-stoked-103031992.html" target="_blank" rel="noopener noreferrer">Bloomberg k&nbsp;Nasdaqu 100 a&nbsp;odhadu JPMorgan</a></li>
            <li><a href="https://247wallst.com/investing/2026/11/06/tech-stocks-just-had-their-worst-day-since-2020/" target="_blank" rel="noopener noreferrer">24/7 Wall St. k&nbsp;nejhoršímu dni Nasdaqu 100 od roku 2020</a></li>
            <li><a href="https://coincentral.com/bitcoin-btc-price-hits-87k-as-weak-jobs-data-sends-yields-lower/" target="_blank" rel="noopener noreferrer">CoinCentral k&nbsp;maximu bitcoinu 2. 10. 2026</a></li>
            <li><a href="https://www.forbes.com/sites/digital-assets/2026/11/13/bitcoin-falls-below-70000-to-reach-lowest-since-august/" target="_blank" rel="noopener noreferrer">Forbes k&nbsp;pádu bitcoinu pod 70&nbsp;tisíc</a></li>
            <li><a href="https://www.coindesk.com/markets/2026/11/13/bitcoin-etfs-are-now-down-over-usd1-5-billion-in-net-outflows-for-the-year" target="_blank" rel="noopener noreferrer">CoinDesk k&nbsp;odlivům z&nbsp;bitcoinových ETF</a></li>
            <li><a href="https://www.swissinfo.ch/eng/junk-market-splits-as-european-spreads-hit-widest-since-2009/92297769" target="_blank" rel="noopener noreferrer">Bloomberg k&nbsp;rizikovým dluhopisům</a></li>
            <li><a href="https://www.timeslive.co.za/news/business/2026-11-10-anthropic-lowers-ipo-valuation-target-to-102-trillion/" target="_blank" rel="noopener noreferrer">Reuters k&nbsp;IPO Anthropicu</a></li>
            <li><a href="https://decrypt.co/382939/anthropic-sets-ipo-price-range-at-70-to-78-valuing-company-at-up-to-1-4-trillion" target="_blank" rel="noopener noreferrer">Decrypt k&nbsp;termínu IPO</a></li>
          </ol>
        </div>
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

  const category = getCategory(slug);
  if (category) {
    const catArticles = articles.filter((a) => a.category === slug).reverse();
    const label = category.label;
    const categoryBreadcrumbLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Finanční Stratég", item: BASE },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE}/blog` },
        { "@type": "ListItem", position: 3, name: label, item: `${BASE}/blog/${slug}` },
      ],
    };
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(categoryBreadcrumbLd) }} />
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
        <section style={{ padding: "80px 0 40px" }}>
          <div className="container">
            <div className="section-eyebrow">Blog</div>
            <h1 className="section-title-lg" style={{ marginTop: 12, marginBottom: 16 }}>
              {label}
            </h1>
            <p style={{ color: "var(--text-2)", fontSize: 16, maxWidth: 560 }}>
              {category.desc}
            </p>
          </div>
        </section>
        <main style={{ paddingBottom: 80 }}>
          <div className="container">
            <div style={{ marginBottom: 28 }}>
              <CategoryChips active={category.id} />
            </div>
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
        <SiteFooter />
      </>
    );
  }

  const article = getArticle(slug);
  if (!article) notFound();

  const candidates = articles.filter(a => a.slug !== slug).reverse();
  const related = candidates
    .filter(a => a.category === article.category)
    .concat(candidates.filter(a => a.category !== article.category))
    .slice(0, 2);

  // Podklady pro náhled článku u odkazu v textu (krátké, ať stránku zbytečně nenafukují)
  const linkMeta = Object.fromEntries(
    articles
      .filter((a) => a.slug !== slug)
      .map((a) => [a.slug, { t: a.title, g: a.tag, d: a.desc.length > 130 ? a.desc.slice(0, 127).trimEnd() + "…" : a.desc, m: a.readTime }])
  );

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.seoDesc ?? article.desc,
    url: `${BASE}/blog/${slug}`,
    datePublished: czechDateToISO(article.date),
    dateModified: czechDateToISO(article.updated ?? article.date),
    author: {
      "@type": "Person",
      "@id": `${BASE}/#adam-dvorak`,
      name: "Adam Dvořák",
      url: BASE,
      sameAs: [LINKEDIN],
    },
    publisher: {
      "@type": "Organization",
      name: "Finanční Stratég",
      url: BASE,
      logo: { "@type": "ImageObject", url: `${BASE}/icon-512.png`, width: 512, height: 512 },
    },
    image: { "@type": "ImageObject", url: `${BASE}/blog/${slug}/opengraph-image`, width: 1200, height: 630 },
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

  const faqLd = slug === "jak-investovat-do-etf" ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Co je ETF a jak funguje?",
        acceptedAnswer: { "@type": "Answer", text: "ETF (Exchange Traded Fund) je fond obchodovaný na burze, který kopíruje vývoj tržního indexu. Místo výběru jednotlivých akcií koupíte jednou transakcí podíl na tisících firmách z celého světa. Roční správcovský poplatek globálních indexových ETF se typicky pohybuje okolo 0,07–0,22 %, což je výrazně méně než u aktivně spravovaných fondů s poplatky 1,5–2,5 % ročně." },
      },
      {
        "@type": "Question",
        name: "Jak začít investovat do ETF v Česku?",
        acceptedAnswer: { "@type": "Answer", text: "Začněte třemi kroky: 1) Zajistěte likvidní rezervu na 3–6 měsíců výdajů na spořicím účtu. 2) Ujasněte si investiční horizont, ETF jsou vhodné pro cíle vzdálené alespoň 10 let. 3) Zvolte si akumulační UCITS ETF s TER pod 0,25 % a nastavte pravidelný plán nákupu. Konkrétní výběr ETF a brokera závisí na vaší situaci. Doporučuji konzultaci s regulovaným investičním poradcem." },
      },
      {
        "@type": "Question",
        name: "Jaké jsou daňové výhody ETF v Česku?",
        acceptedAnswer: { "@type": "Answer", text: "Základní výhoda je časový test tří let: prodáte-li investici nejdříve tři roky po nákupu, zisk z prodeje je osvobozen od daně z příjmů fyzických osob (§ 10 ZDP). Další možností je DIP (Dlouhodobý investiční produkt), který umožňuje odpočet příspěvků až 48 000 Kč ročně ze základu daně. Přesná aplikace závisí na vaší situaci a doporučuji konzultaci s daňovým poradcem." },
      },
      {
        "@type": "Question",
        name: "Kolik peněz potřebuji na začátek investování do ETF?",
        acceptedAnswer: { "@type": "Answer", text: "U většiny brokerů lze investovat od 1 EUR nebo méně. Důležitější než výchozí částka je pravidelnost: i 500–2 000 Kč měsíčně investovaných konzistentně po dobu 20–30 let vytvoří díky složenému úroku významný majetek. Zásadní je začít co nejdříve, ale jen tehdy, kdy máte pokrytou likvidní rezervu a jasný investiční horizont." },
      },
      {
        "@type": "Question",
        name: "Co dělat, když ETF klesne o 30 %?",
        acceptedAnswer: { "@type": "Answer", text: "Nic, pokud máte plán. Propady jsou součástí investování a historicky se globální akciové trhy vždy zotavily. Kdo prodá v propadu a počká na lepší časy, většinou nakoupí zpět výše, než kde prodával. Klíčem je mít před investicí pokrytou likvidní rezervu, aby vás propad nenutil k prodeji v nevhodný moment." },
      },
    ],
  } : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}
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
            <ArticleToc />
            <ArticleContent key={slug} slug={slug} />
            <ArticleHints key={`hints-${slug}`} links={linkMeta} />

            {/* Otázky ze strukturovaných dat musí být vidět i na stránce, jinak je Google bere jako skrytý obsah */}
            {faqLd && (
              <div className="article-body">
                <h2>Časté otázky</h2>
                <FaqAccordion items={faqLd.mainEntity.map((q) => ({ q: q.name, a: q.acceptedAnswer.text }))} />
              </div>
            )}

            <ArticleFeedback key={`zv-${slug}`} slug={slug} title={article.title} />

            <div className="author-box">
              <Image src="/adam-dvorak-about.jpg" alt="Adam Dvořák, EFA" width={64} height={64} className="author-box-photo" />
              <div>
                <b>Adam Dvořák, EFA</b>
                <p>
                  Finanční stratég pro majitele firem a jejich rodiny. Finance dělám osmým rokem, mám evropskou
                  kvalifikaci EFA. Registrován u ČNB, IČO 08406804.
                </p>
                <a href="https://www.linkedin.com/in/adam-dvo%C5%99%C3%A1k-efa-721479210/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                {" · "}
                <Link href="/#about">Více o mně</Link>
              </div>
            </div>

            <div className="article-cta">
              <div className="article-cta-text">
                <div className="section-eyebrow" style={{ marginBottom: 8 }}>Osobní rozhovor</div>
                {article.cta ? (
                  <>
                    <p style={{ font: "400 20px/1.35 Lora,Georgia,serif", color: "var(--text-1)", marginBottom: 6 }}>{article.cta.title}</p>
                    <p>{article.cta.text}</p>
                  </>
                ) : (
                  <p>Chcete vědět, jak to vyjde u vás? První konzultace je bez závazků.</p>
                )}
              </div>
              <Link href="/konzultace" className="btn-primary">
                <span>{article.cta?.button ?? "Zahájit rozhovor"}</span>
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
      <SiteFooter />

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
