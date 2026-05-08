import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Podmínky užití — Adam Dvořák, EFA",
  description: "Podmínky užití webu Adam Dvořák, EFA — nezávislý finanční poradce.",
};

export default function TermsPage() {
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
              <h1 className="article-title">Podmínky užití</h1>
              <div className="article-meta">
                <span>Adam Dvořák, EFA</span>
                <span className="article-meta-dot">·</span>
                <span>Platné od 1. ledna 2026</span>
              </div>
            </header>

            <div className="article-body">
              <p>
                Tyto podmínky užití upravují pravidla pro používání webu provozovaného Adamem Dvořákem, EFA.
                Přístupem na tento web souhlasíte s níže uvedenými podmínkami.
              </p>

              <h2>1. Provozovatel webu</h2>
              <p>
                Adam Dvořák, EFA<br />
                Salvátorská 931/8, 110 00 Praha 1 – Staré Město<br />
                E-mail: <a href="mailto:adamdvorak@financnistrateg.com">adamdvorak@financnistrateg.com</a><br />
                Telefon: <a href="tel:+420731147911">+420 731 147 911</a><br />
                Registrován u České národní banky jako investiční zprostředkovatel.
              </p>

              <h2>2. Charakter obsahu</h2>
              <p>
                Obsah tohoto webu má výhradně informační a vzdělávací charakter. Žádná informace
                zveřejněná na těchto stránkách nepředstavuje investiční poradenství, doporučení
                k nákupu či prodeji jakéhokoli finančního instrumentu ani výzvu k uzavření smlouvy
                ve smyslu zákona č. 256/2004 Sb., o podnikání na kapitálovém trhu.
              </p>
              <p>
                Historické výnosy a výsledky nejsou zárukou výnosů budoucích. Hodnota investic může
                klesat i stoupat a není zaručena návratnost vložených prostředků. Před každým
                investičním rozhodnutím doporučujeme konzultaci s licencovaným finančním poradcem.
              </p>

              <h2>3. Autorská práva</h2>
              <p>
                Veškerý obsah webu — texty, grafika, loga, fotografie a další materiály — je
                chráněn autorským právem © 2026 Adam Dvořák. Jakékoli šíření, kopírování nebo
                jiné užití obsahu bez předchozího písemného souhlasu provozovatele je zakázáno,
                s výjimkou případů dovolených zákonem.
              </p>

              <h2>4. Omezení odpovědnosti</h2>
              <p>
                Provozovatel vynakládá veškerou péči na to, aby informace na webu byly přesné
                a aktuální, avšak neodpovídá za jejich úplnost, správnost ani aktuálnost.
                Provozovatel nenese odpovědnost za jakékoli škody vzniklé v přímé či nepřímé
                souvislosti s používáním tohoto webu nebo s rozhodnutími učiněnými na základě
                zde zveřejněných informací.
              </p>
              <p>
                Web může obsahovat odkazy na webové stránky třetích stran. Provozovatel nemá
                kontrolu nad jejich obsahem a nenese za něj odpovědnost.
              </p>

              <h2>5. Dostupnost webu</h2>
              <p>
                Provozovatel si vyhrazuje právo kdykoli bez předchozího upozornění upravit,
                pozastavit nebo ukončit provoz webu nebo jeho části. Za případnou nedostupnost
                webu nenese provozovatel odpovědnost.
              </p>

              <h2>6. Rozhodné právo a řešení sporů</h2>
              <p>
                Tyto podmínky se řídí právním řádem České republiky. Případné spory budou
                řešeny příslušnými soudy České republiky. Spotřebitelé mohou rovněž využít
                mimosoudní řešení sporů prostřednictvím České obchodní inspekce
                (<a href="https://www.coi.cz" target="_blank" rel="noopener noreferrer">www.coi.cz</a>).
              </p>

              <h2>7. Změny podmínek</h2>
              <p>
                Provozovatel si vyhrazuje právo tyto podmínky kdykoli změnit. Aktuální verze
                je vždy dostupná na této stránce. Dalším užíváním webu po zveřejnění změn
                vyjadřujete souhlas s aktualizovaným zněním.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer>
        <div className="container footer-inner">
          <div className="footer-logo">Adam <span>Dvořák</span> · <span>Finanční Stratég</span></div>
          <div className="footer-copy">© 2026 Adam Dvořák, EFA. <span>Registrován u ČNB.</span></div>
          <div className="footer-links">
            <Link href="/">Hlavní stránka</Link>
            <Link href="/privacy">Ochrana osobních údajů</Link>
            <Link href="/#contact">Kontakt</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
