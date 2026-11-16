"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { T, type Lang } from "./texty";

/* Společné menu podstránek (O mně, Služby, Kalkulačky, Kontakt): stejné položky a stejný vzhled
   jako na úvodní stránce. Tmavý podklad stojí pod stránkou, na které návštěvník právě je. */
export type NavId = "about" | "services" | "calculators" | "blog" | "contact";

export function SiteNav({ lang, prepni, aktivni }: { lang: Lang; prepni: () => void; aktivni?: NavId }) {
  const t = T[lang];
  const [otevrene, setOtevrene] = useState(false);
  const seznam = useRef<HTMLUListElement>(null);

  const polozky: [NavId, string, string][] = [
    ["about", "/o-mne", t.navAbout],
    ["services", "/sluzby", t.navServices],
    ["calculators", "/kalkulacky", t.navCalc],
    ["blog", "/blog", t.navBlog],
    ["contact", "/kontakt", t.navContact],
  ];

  // Poloha tmavého podkladu se předává stylům přes proměnné; při změně jazyka nebo šířky okna se přeměří
  useEffect(() => {
    const ul = seznam.current;
    if (!ul) return;
    const umisti = () => {
      const a = aktivni ? ul.querySelector<HTMLElement>(`a[data-nav="${aktivni}"]`) : null;
      ul.classList.toggle("has-active", !!a);
      if (!a) return;
      ul.style.setProperty("--nav-x", `${a.offsetLeft}px`);
      ul.style.setProperty("--nav-w", `${a.offsetWidth}px`);
    };
    umisti();
    window.addEventListener("resize", umisti);
    return () => window.removeEventListener("resize", umisti);
  }, [aktivni, lang]);

  return (
    <>
      <div className={`mobile-overlay${otevrene ? " is-open" : ""}`} aria-hidden={!otevrene}>
        {polozky.map(([id, href, label], i) => (
          <Link key={id} href={href} className="mob-item" style={{ "--i": i } as React.CSSProperties}
            aria-current={aktivni === id ? "page" : undefined} tabIndex={otevrene ? undefined : -1}
            onClick={() => setOtevrene(false)}>{label}</Link>
        ))}
        <div className="mob-cta">
          <Link href="/konzultace" className="btn-primary" tabIndex={otevrene ? undefined : -1} onClick={() => setOtevrene(false)}>
            {lang === "cs" ? "Zahájit rozhovor →" : "Start the conversation →"}
          </Link>
          <a href="mailto:adamdvorak@financnistrateg.com" className="mob-contact" tabIndex={otevrene ? undefined : -1}>
            adamdvorak@financnistrateg.com
          </a>
        </div>
      </div>

      <nav>
        <div className="container nav-inner">
          <Link href="/" className="nav-logo">
            <span className="nav-logo-name">Adam Dvořák</span>
            <span className="nav-logo-efa">, EFA</span>
          </Link>
          <ul className="nav-links" ref={seznam}>
            <li className="nav-pill" aria-hidden="true" />
            {polozky.map(([id, href, label]) => (
              <li key={id}>
                <Link href={href} data-nav={id} className={aktivni === id ? "is-active" : undefined} aria-current={aktivni === id ? "page" : undefined}>
                  <span>{label}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="nav-right">
            <div className={`lang-sw ${lang}`} role="group" aria-label={lang === "cs" ? "Jazyk" : "Language"}>
              <span className="lang-sw-pill" aria-hidden="true" />
              <button type="button" aria-pressed={lang === "cs"} onClick={() => lang !== "cs" && prepni()} title="Česky">CZ</button>
              <button type="button" aria-pressed={lang === "en"} onClick={() => lang !== "en" && prepni()} title="English" lang="en">EN</button>
            </div>
            <Link href="/konzultace" className="btn-nav">{t.navCta}</Link>
            <button type="button" className={`hamburger${otevrene ? " is-open" : ""}`} onClick={() => setOtevrene((v) => !v)}
              aria-expanded={otevrene}
              aria-label={lang === "cs" ? (otevrene ? "Zavřít menu" : "Otevřít menu") : (otevrene ? "Close menu" : "Open menu")}>
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
