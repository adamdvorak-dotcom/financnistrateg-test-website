import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ochrana osobních údajů — Adam Dvořák, EFA",
  description: "Zásady ochrany osobních údajů a informace o zpracování osobních dat na webu Adam Dvořák, EFA.",
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
                <span>Platné od 1. ledna 2026</span>
              </div>
            </header>

            <div className="article-body">
              <p>
                Tyto zásady ochrany osobních údajů popisují, jakým způsobem Adam Dvořák, EFA
                (dále jen „správce") zpracovává osobní údaje návštěvníků tohoto webu. Zpracování probíhá
                v souladu s Nařízením Evropského parlamentu a Rady (EU) 2016/679 (GDPR)
                a zákonem č. 110/2019 Sb., o zpracování osobních údajů.
              </p>

              <h2>1. Správce osobních údajů</h2>
              <p>
                Adam Dvořák, EFA<br />
                Salvátorská 931/8, 110 00 Praha 1 – Staré Město<br />
                E-mail: <a href="mailto:adamdvorak@financnistrateg.com">adamdvorak@financnistrateg.com</a><br />
                Telefon: <a href="tel:+420731147911">+420 731 147 911</a>
              </p>

              <h2>2. Jaké údaje zpracováváme a proč</h2>
              <p>
                <strong>Kontaktní formulář</strong> — Při odeslání dotazu zpracováváme jméno, e-mailovou adresu,
                telefonní číslo a obsah zprávy. Účelem je vyřízení vašeho dotazu a navázání spolupráce.
                Právním základem je náš oprávněný zájem podle čl. 6 odst. 1 písm. f) GDPR.
              </p>
              <p>
                <strong>Newsletter</strong> — Při přihlášení k odběru zpracováváme e-mailovou adresu.
                Účelem je zasílání finančního přehledu a aktuálních informací. Právním základem je váš
                souhlas podle čl. 6 odst. 1 písm. a) GDPR. Souhlas můžete kdykoli odvolat kliknutím
                na odkaz v patičce každého e-mailu.
              </p>
              <p>
                <strong>Rezervační systém (Calendly)</strong> — Při rezervaci schůzky prostřednictvím
                Calendly jsou vaše údaje zpracovávány také společností Calendly LLC. Doporučujeme
                seznámit se se zásadami ochrany osobních údajů služby Calendly.
              </p>

              <h2>3. Příjemci osobních údajů</h2>
              <p>
                Osobní údaje nejsou předávány třetím stranám za účelem jejich přímého marketingu
                ani prodávány. Údaje mohou být zpřístupněny zpracovatelům, kteří zajišťují technický
                provoz webu a e-mailové komunikace, a to výlučně v rozsahu nezbytném pro plnění
                smluvních povinností.
              </p>

              <h2>4. Doba uchovávání</h2>
              <p>
                Údaje z kontaktního formuláře jsou uchovávány po dobu nezbytně nutnou k vyřízení
                vašeho dotazu, nejdéle však 3 roky. Údaje pro newsletter jsou uchovávány do odvolání
                souhlasu. Po uplynutí doby uchovávání jsou osobní údaje bezpečně smazány.
              </p>

              <h2>5. Vaše práva</h2>
              <p>
                V souladu s GDPR máte právo na:
              </p>
              <p>
                <strong>Přístup</strong> — právo získat potvrzení, zda jsou vaše osobní údaje zpracovávány,
                a přístup k těmto údajům.<br />
                <strong>Opravu</strong> — právo požadovat opravení nepřesných nebo doplnění neúplných údajů.<br />
                <strong>Výmaz</strong> — právo požadovat smazání údajů, pokud pominul účel jejich zpracování.<br />
                <strong>Omezení zpracování</strong> — právo požadovat dočasné pozastavení zpracování.<br />
                <strong>Přenositelnost</strong> — právo obdržet své údaje ve strukturovaném, strojově čitelném formátu.<br />
                <strong>Námitku</strong> — právo vznést námitku proti zpracování na základě oprávněného zájmu.
              </p>
              <p>
                Svá práva uplatněte na adrese{" "}
                <a href="mailto:adamdvorak@financnistrateg.com">adamdvorak@financnistrateg.com</a>.
                Máte rovněž právo podat stížnost u Úřadu pro ochranu osobních údajů
                (<a href="https://www.uoou.cz" target="_blank" rel="noopener noreferrer">www.uoou.cz</a>).
              </p>

              <h2>6. Zabezpečení</h2>
              <p>
                Přijímáme přiměřená technická a organizační opatření, aby byly vaše osobní údaje
                chráněny před neoprávněným přístupem, ztrátou nebo zneužitím.
              </p>

              <h2>7. Změny těchto zásad</h2>
              <p>
                Tyto zásady mohou být příležitostně aktualizovány. O podstatných změnách vás budeme
                informovat prostřednictvím webu. Aktuální verze je vždy dostupná na této stránce.
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
            <Link href="/terms">Podmínky užití</Link>
            <Link href="/#contact">Kontakt</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
