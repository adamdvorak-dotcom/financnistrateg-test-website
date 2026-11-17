import type { Metadata } from "next";
import Link from "next/link";
import CookieReset from "@/components/CookieReset";
import { SiteFooter } from "../SiteFooter";

export const metadata: Metadata = {
  // Příponu „| Adam Dvořák, EFA" doplní šablona titulku v layoutu
  title: "Ochrana osobních údajů",
  description: "Zásady ochrany osobních údajů a informace o zpracování osobních dat na webu Adam Dvořák, EFA.",
  alternates: { canonical: "https://www.financnistrateg.com/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <nav>
        <div className="container nav-inner">
          <Link href="/" className="nav-logo">
            <span className="nav-logo-name">Adam Dvořák</span><span className="nav-logo-efa">, EFA</span>
          </Link>
          <div className="nav-right">
            <Link href="/" className="btn-primary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
              <span>Zpět na web</span>
            </Link>
          </div>
        </div>
      </nav>

      <main className="article-wrap">
        <div className="container">
          <div className="article-inner">
            <header className="article-header">
              <div className="article-tag">Právní informace</div>
              <h1 className="article-title">Ochrana osobních údajů</h1>
              <div className="article-meta">
                <span>Adam Dvořák, EFA</span>
                <span className="article-meta-dot">·</span>
                <span>Aktualizováno 17. listopadu 2026</span>
              </div>
            </header>

            <div className="article-body">
              <p>
                Tyto zásady popisují, jak zpracovávám osobní údaje lidí, kteří navštíví web
                financnistrateg.com, napíšou mi přes formulář, vyplní Finanční preventivku nebo se
                přihlásí k newsletteru. Řídím se nařízením (EU) 2016/679 (GDPR) a zákonem
                č. 110/2019 Sb., o zpracování osobních údajů. Zpracování údajů při samotném
                poskytování finančních služeb se řídí samostatnými informacemi, které dostanete
                při zahájení spolupráce.
              </p>

              <h2>1. Správce osobních údajů</h2>
              <p>
                Adam Dvořák, EFA, IČO 08406804<br />
                Salvátorská 931/8, 110 00 Praha 1, Staré Město<br />
                E-mail: <a href="mailto:adamdvorak@financnistrateg.com">adamdvorak@financnistrateg.com</a><br />
                Telefon: <a href="tel:+420731147911">+420 731 147 911</a>
              </p>

              <h2>2. Jaké údaje zpracovávám a proč</h2>
              <p>
                <strong>Kontaktní formulář</strong> (na stránkách Kontakt a Konzultace):
                jméno, e-mail, případně telefon, téma a text zprávy. Použiji je, abych vám odpověděl
                a případně domluvil schůzku. Právním základem je jednání o smlouvě na vaši žádost
                (čl. 6 odst. 1 písm. b) GDPR) a můj oprávněný zájem odpovědět na dotaz
                (čl. 6 odst. 1 písm. f) GDPR). Údaje uchovávám nejdéle 3 roky od poslední komunikace.
              </p>
              <p>
                <strong>Finanční preventivka</strong>: jméno, e-mail, vaše odpovědi a výsledné skóre.
                Po odeslání mi přijdou e-mailem, abych vám k výsledku mohl osobně napsat. Právním
                základem je vaše žádost o rozbor (čl. 6 odst. 1 písm. b) GDPR). Pokud zaškrtnete
                políčko pro další e-maily, zpracovávám e-mail i pro newsletter na základě souhlasu.
                Údaje uchovávám nejdéle 3 roky.
              </p>
              <p>
                <strong>Newsletter</strong>: e-mailová adresa. Posílám na ni jednou měsíčně krátký
                e-mail pro majitele firem. Právním základem je váš souhlas (čl. 6 odst. 1 písm. a)
                GDPR), který můžete kdykoli odvolat odkazem v každém e-mailu nebo zprávou na můj
                e-mail. Údaje uchovávám do odvolání souhlasu.
              </p>
              <p>
                <strong>Rezervace schůzky</strong>: když si vyberete termín, jméno, e-mail a případně
                telefon a téma schůzky předávám službě Calendly, která rezervaci eviduje a pošle vám
                pozvánku. Přes službu Resend vám může přijít i potvrzení a mně oznámení o nové
                rezervaci. Použiji je k domluvě a konání schůzky. Právním základem je jednání
                o smlouvě na vaši žádost (čl. 6 odst. 1 písm. b) GDPR).
              </p>
              <p>
                <strong>Technický provoz webu</strong>: při každé návštěvě zpracovává hosting
                technické údaje, jako je IP adresa, typ prohlížeče a čas požadavku. Jsou potřeba
                k doručení stránky a k ochraně před zneužitím, právním základem je oprávněný zájem
                (čl. 6 odst. 1 písm. f) GDPR). Kontaktní formulář navíc krátkodobě eviduje počet
                zpráv z jedné IP adresy, aby se dal omezit spam.
              </p>
              <p>
                <strong>Měření návštěvnosti bez cookies</strong>: web používá Vercel Web Analytics.
                Zaznamenává, které stránky se zobrazují a na které hlavní odkazy a tlačítka se kliká,
                odkud návštěva přišla, přibližnou polohu (zemi a město), typ zařízení, operační systém
                a prohlížeč. Neukládá do vašeho
                prohlížeče cookies ani nic jiného. Návštěvy rozlišuje jen podle otisku požadavku, který
                se po 24 hodinách zahodí, takže z dat nejde poznat, kdo web navštívil. Vidím jen souhrnná
                čísla. Právním základem je oprávněný zájem na tom, aby web fungoval a byl srozumitelný
                (čl. 6 odst. 1 písm. f) GDPR).
              </p>

              <h2>3. Cookies a podobné technologie</h2>
              <p>
                <strong>Nezbytné</strong>: ukládám vaši volbu v liště cookies (cookie a místní úložiště
                prohlížeče „cookie_consent“, platnost 1 rok) a zvolený jazyk webu (místní úložiště
                „lang“). Bez nich web nefunguje tak, jak má, souhlas k nim není potřeba.
              </p>
              <p>
                V liště cookies si vyberete, které kategorie povolíte. Na stránkách Finanční
                preventivka a Renta je lišta zjednodušená: „Přijmout vše“ povolí analytické
                i marketingové cookies, „Pouze nezbytné“ jen ty nezbytné. Dokud nic nepovolíte,
                analytické ani marketingové nástroje se nenačtou.
              </p>
              <p>
                <strong>Nezbytné</strong>: ukládám vaši volbu v liště cookies (cookie a místní úložiště
                prohlížeče „cookie_consent“, platnost cookie 1 rok; v místním úložišti navíc
                „cookie_analytics“ a „cookie_marketing“ s volbou pro jednotlivé kategorie) a zvolený
                jazyk webu (místní úložiště „lang“). Bez nich web nefunguje tak, jak má, souhlas
                k nim není potřeba.
              </p>
              <p>
                <strong>Analytické</strong>: jen pokud je povolíte, načte se nástroj Leady, který měří
                návštěvnost a ukazuje, které firmy web navštívily. Právním základem je váš souhlas
                (čl. 6 odst. 1 písm. a) GDPR). Měření návštěvnosti přes Vercel (viz výše) cookies
                nepoužívá, proto běží i bez souhlasu.
              </p>
              <p>
                <strong>Marketingové</strong>: jen pokud je povolíte, načte se značka Googlu (měření
                reklamy Google Ads, případně Google Analytics) a Meta Pixel (měření reklamy na
                Facebooku a Instagramu). Slouží k tomu, abych věděl, jestli reklama přivádí lidi,
                které web zajímá, a mohl ji ukazovat vhodnějšímu publiku. Zaznamenávají zobrazené
                stránky a několik událostí, například dokončení Finanční preventivky nebo použití
                kalkulačky renty. Vaše jméno, e-mail ani odpovědi z preventivky jim neposílám.
                Ukládají cookies třetích stran, typicky „_gcl_au“ (Google, 90 dní), „_ga“ a „_ga_*“
                (Google Analytics, až 2 roky) a „_fbp“ (Meta, 90 dní). Google a Meta mohou údaje
                propojit s vaším účtem u nich a používají je i pro své vlastní účely podle svých
                zásad. Právním základem je váš souhlas (čl. 6 odst. 1 písm. a) GDPR). Bez souhlasu
                se tyto nástroje vůbec nenačtou.
              </p>
              <p>
                Souhlas můžete kdykoli změnit nebo odvolat: <CookieReset />. Stejný odkaz
                „Nastavení cookies“ najdete v patičce každé stránky.
              </p>

              <h2>4. Komu údaje předávám</h2>
              <p>
                Údaje neprodávám. Pracují s nimi služby, které pro mě zajišťují provoz, a to
                v rozsahu nutném pro danou činnost:
              </p>
              <ul>
                <li><strong>Vercel</strong>: hosting webu a měření návštěvnosti bez cookies (USA)</li>
                <li><strong>Resend</strong>: doručení zpráv z formulářů a preventivky do mé schránky (USA)</li>
                <li><strong>Google Workspace</strong>: firemní e-mail (Google, EU a USA)</li>
                <li><strong>Google Fonts</strong>: písma webu, při načtení stránky se Googlu předá IP adresa</li>
                <li><strong>SmartEmailing</strong>: rozesílání newsletteru (Česko)</li>
                <li><strong>Calendly</strong>: rezervace schůzek (USA)</li>
                <li><strong>Leady</strong>: analýza návštěvnosti, jen se souhlasem (Česko)</li>
                <li><strong>Google Ireland Ltd.</strong>: měření reklamy (Google Ads, případně Google
                  Analytics), jen se souhlasem (Irsko, údaje mohou směřovat do USA)</li>
                <li><strong>Meta Platforms Ireland Ltd.</strong>: měření reklamy na Facebooku
                  a Instagramu (Meta Pixel), jen se souhlasem (Irsko, údaje mohou směřovat do USA)</li>
              </ul>
              <p>
                U marketingových cookies jsou Google a Meta zčásti samostatnými správci: údaje
                z měření používají i pro vlastní účely, například ke zlepšování svých reklamních
                služeb. Za to, že se údaje z webu vůbec shromáždí a předají Metě, odpovídám
                s Metou společně podle jejích podmínek pro společné správce; za další zpracování
                odpovídá Meta. Podrobnosti najdete v zásadách{" "}
                <a href="https://policies.google.com/privacy?hl=cs" target="_blank" rel="noopener noreferrer">Googlu</a>{" "}
                a{" "}
                <a href="https://www.facebook.com/privacy/policy" target="_blank" rel="noopener noreferrer">Mety</a>.
              </p>
              <p>
                Některé z těchto služeb sídlí v USA. Předání tam probíhá na základě rámce EU-USA
                pro ochranu osobních údajů (Data Privacy Framework) nebo standardních smluvních
                doložek schválených Evropskou komisí.
              </p>

              <h2>5. Vaše práva</h2>
              <p>
                Máte právo na přístup ke svým údajům, jejich opravu, výmaz, omezení zpracování
                a přenositelnost. Proti zpracování na základě oprávněného zájmu můžete vznést
                námitku a udělený souhlas můžete kdykoli odvolat. Stačí napsat na{" "}
                <a href="mailto:adamdvorak@financnistrateg.com">adamdvorak@financnistrateg.com</a>.
                Máte také právo podat stížnost u Úřadu pro ochranu osobních údajů
                (<a href="https://www.uoou.cz" target="_blank" rel="noopener noreferrer">www.uoou.cz</a>).
              </p>

              <h2>6. Zabezpečení</h2>
              <p>
                Web běží jen přes zabezpečené spojení (HTTPS).
                Přijímám přiměřená technická a organizační opatření proti neoprávněnému přístupu,
                ztrátě nebo zneužití.
              </p>

              <h2>7. Změny těchto zásad</h2>
              <p>
                Zásady průběžně aktualizuji, když se změní to, jak web funguje. Aktuální verze
                je vždy na této stránce.
              </p>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
