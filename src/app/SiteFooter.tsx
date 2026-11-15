import Link from "next/link";

/* Společná patička všech stránek: velké jméno, tři sloupce odkazů, tlačítko nahoru
   a na pozadí pomalu jedoucí obrysový nápis. */
const T = {
  cs: {
    tagline: "Finanční stratég pro majitele firem a jejich rodiny.",
    top: "Zpět nahoru",
    web: "Web",
    services: "Služby",
    calcs: "Kalkulačky",
    about: "O mně",
    blog: "Blog",
    contact: "Kontakt",
    address: "Salvátorská 931/8, Praha 1",
    book: "Rezervovat termín",
    legal: "Právní",
    privacy: "Ochrana osobních údajů",
    terms: "Podmínky užití",
    reg: "Registrován u ČNB. IČO: 08406804.",
    mark: "Finanční Stratég",
  },
  en: {
    tagline: "Financial strategist for business owners and their families.",
    top: "Back to top",
    web: "Site",
    services: "Services",
    calcs: "Calculators",
    about: "About",
    blog: "Blog",
    contact: "Contact",
    address: "Salvátorská 931/8, Prague 1",
    book: "Book a meeting",
    legal: "Legal",
    privacy: "Privacy policy",
    terms: "Terms of use",
    reg: "Registered with the Czech National Bank. Company ID: 08406804.",
    mark: "Finanční Stratég",
  },
};

export function SiteFooter({ lang = "cs" }: { lang?: "cs" | "en" }) {
  const t = T[lang];
  return (
    <footer className="pata">
      <div className="pata-pas" aria-hidden="true">
        <span>{t.mark}</span><span>{t.mark}</span><span>{t.mark}</span><span>{t.mark}</span>
      </div>
      <div className="container pata-in">
        <div className="pata-top">
          <div>
            <div className="pata-jmeno">Adam Dvořák<span>, EFA</span></div>
            <p className="pata-tag">{t.tagline}</p>
          </div>
          <a href="#" className="pata-nahoru" aria-label={t.top}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
          </a>
        </div>
        <div className="pata-sloupce">
          <div className="pata-sl">
            <b>{t.web}</b>
            <Link href="/#services">{t.services}</Link>
            <Link href="/#calculators">{t.calcs}</Link>
            <Link href="/#about">{t.about}</Link>
            <Link href="/blog">{t.blog}</Link>
          </div>
          <div className="pata-sl">
            <b>{t.contact}</b>
            <a href="tel:+420731147911">+420 731 147 911</a>
            <Link href="/#contact">{t.address}</Link>
            <Link href="/konzultace">{t.book}</Link>
            <a href="https://www.linkedin.com/in/adam-dvo%C5%99%C3%A1k-efa-721479210/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
          <div className="pata-sl">
            <b>{t.legal}</b>
            <Link href="/privacy">{t.privacy}</Link>
            <Link href="/terms">{t.terms}</Link>
          </div>
        </div>
        <div className="pata-dole">
          <span>© 2026 Adam Dvořák, EFA</span>
          <span>{t.reg}</span>
        </div>
      </div>
    </footer>
  );
}
