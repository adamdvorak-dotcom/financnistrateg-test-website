"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useLang } from "../blog/useLang";
import { SiteNav } from "../SiteNav";
import { SiteFooter } from "../SiteFooter";
import { KalkulackySekce } from "../sekce/KalkulackySekce";
import { useReveal } from "../sekce/useReveal";

const TX = {
  cs: {
    dalsiEye: "Další nástroje",
    dalsiH: "Co si ještě můžete spočítat.",
    dalsi: [
      ["/renta", "Kdy vám vyjde renta?", "Kolik investujete a jakou rentu chcete. Uvidíte pásmo možných výsledků i cenu za čekání."],
      ["/financni-preventivka", "Finanční preventivka", "Osm bodů, které ukážou, kde máte ve financích mezery."],
      ["/sluzby#druha-noha", "Kde máte majetek?", "Kolik z vašeho majetku stojí mimo firmu."],
      ["/sluzby#dedictvi", "Kdo dědí bez závěti?", "Kdo by dnes dědil ze zákona a jak velký díl."],
    ],
    ctaH: "Vyberte si termín.",
    ctaP: "30 minut, online nebo v Praze.",
    ctaBtn: "Zahájit rozhovor",
  },
  en: {
    dalsiEye: "More tools",
    dalsiH: "What else you can work out.",
    dalsi: [
      ["/renta", "When will your annuity work?", "How much you invest and the income you want. You get a range of outcomes and the cost of waiting."],
      ["/financni-preventivka", "Financial check-up", "Eight points that show where the gaps in your finances are."],
      ["/sluzby#druha-noha", "Where is your wealth?", "How much of your wealth sits outside the business."],
      ["/sluzby#dedictvi", "Who inherits without a will?", "Who would inherit by law today, and how large a share."],
    ],
    ctaH: "Pick your slot.",
    ctaP: "30 minutes, online or in Prague.",
    ctaBtn: "Start a conversation",
  },
} as const;

/* Samostatná stránka Kalkulačky: čtyři kalkulačky pohromadě a odkazy na další nástroje webu.
   Na úvodní stránce z nich zůstává jen krátká upoutávka. */
export function Kalkulacky() {
  const [lang, prepni] = useLang();
  const t = TX[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useReveal(".kl");

  return (
    <div className="kl">
      <SiteNav lang={lang} prepni={prepni} aktivni="calculators" />

      <main>
        <KalkulackySekce lang={lang} hlavni />

        <section className="kl-dalsi">
          <div className="container">
            <div className="section-eyebrow">{t.dalsiEye}</div>
            <h2 className="section-title-lg" style={{ marginTop: 8, marginBottom: 32 }}>{t.dalsiH}</h2>
            <div className="sl-teaser">
              {t.dalsi.map(([href, title, desc], i) => (
                <a key={href} href={href} className={`sl-karta reveal${i > 0 ? ` delay-${i}` : ""}`}>
                  <span className="sl-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  <b>{title}</b>
                  <p>{desc}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="om-cta">
          <div className="container om-cta-in">
            <div>
              <h2>{t.ctaH}</h2>
              <p>{t.ctaP}</p>
            </div>
            <Link href="/konzultace" className="btn-primary btn-shine">
              <span>{t.ctaBtn}</span>
              <span className="btn-arrow" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M8 7h9v9" /></svg></span>
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter lang={lang} />
    </div>
  );
}
