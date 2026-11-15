"use client";
import { useState } from "react";
import Link from "next/link";

/* „Kde právě jste": tři cesty podle fáze firmy. Přepínač s posuvnou pilulkou vymění nadpis
   a dvojici článků, které se k dané fázi hodí. Články jsou skutečné, jen česky. */
const T = {
  cs: {
    eye: "Kde právě jste",
    group: "Fáze firmy",
    cist: "Číst článek",
    faze: [
      {
        label: "Firmu buduji",
        h: "Aby s firmou rostl i váš majetek.",
        clanky: [
          { slug: "firma-a-osobni-majetek", tag: "Správa majetku", title: "Firma roste. Váš osobní majetek ne." },
          { slug: "kolik-si-vyplacet-ze-sro", tag: "Daně", title: "Kolik si vyplácet ze s.r.o.? Odpověď, kterou vám účetní nedá." },
        ],
      },
      {
        label: "Chystám prodej nebo předání",
        h: "Odchod se chystá roky dopředu.",
        clanky: [
          { slug: "nastupnictvi-ve-firme-nvidie", tag: "Nástupnictví", title: "Nvidia přišla ze dne na den o šéfa. Co by se stalo s vaší firmou?" },
          { slug: "den-kdy-se-nevratite-domu", tag: "Dědictví", title: "Kdybyste zítra nebyl, kdo by vaší rodině řekl, kde co máte?" },
        ],
      },
      {
        label: "Firmu jsem prodal",
        h: "Peníze jsou na účtu. Co s nimi?",
        clanky: [
          { slug: "prodej-firmy-co-s-penezi", tag: "Prodej firmy", title: "Prodal jste firmu. Co teď s těmi penězi?" },
          { slug: "sverensky-fond-praha", tag: "Svěřenský fond", title: "Svěřenský fond: kdy ho skutečně potřebujete a kdy ne" },
        ],
      },
    ],
  },
  en: {
    eye: "Where you are now",
    group: "Company stage",
    cist: "Read the article (in Czech)",
    faze: [
      { label: "I'm building the company", h: "So your wealth grows with the company." },
      { label: "Preparing a sale or handover", h: "An exit is prepared years ahead." },
      { label: "I've sold the company", h: "The money is in the account. What now?" },
    ],
  },
};

export function FazeFirmy({ lang = "cs" }: { lang?: "cs" | "en" }) {
  const [i, setI] = useState(0);
  const t = T[lang];
  const cs = T.cs;

  return (
    <div className="faze" style={{ "--i": i } as React.CSSProperties}>
      <div className="section-eyebrow">{t.eye}</div>
      <div className="faze-seg" role="tablist" aria-label={t.group}>
        <span className="faze-pill" aria-hidden="true" />
        {t.faze.map((f, n) => (
          <button
            key={n}
            type="button"
            role="tab"
            id={`faze-tab-${n}`}
            aria-selected={n === i}
            aria-controls="faze-panel"
            tabIndex={n === i ? 0 : -1}
            className={n === i ? "on" : undefined}
            onClick={() => setI(n)}
            onKeyDown={(e) => {
              if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
              const dalsi = (n + (e.key === "ArrowRight" ? 1 : 2)) % 3;
              setI(dalsi);
              document.getElementById(`faze-tab-${dalsi}`)?.focus();
            }}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="faze-pan" id="faze-panel" role="tabpanel" aria-labelledby={`faze-tab-${i}`} key={i}>
        <h2 className="faze-h">{t.faze[i].h}</h2>
        <div className="faze-clanky">
          {cs.faze[i].clanky.map((c) => (
            <Link key={c.slug} href={`/blog/${c.slug}`} lang="cs">
              <small>{c.tag}</small>
              <b>{c.title}</b>
              <span>{t.cist} <i aria-hidden="true">→</i></span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
