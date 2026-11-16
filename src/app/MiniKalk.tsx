"use client";
import { useState } from "react";
import Link from "next/link";
import type { Lang } from "./texty";

/* Malá investiční kalkulačka na úvodní stránce: jeden posuvník a živý výsledek.
   Tlačítko přenese zadanou částku do plné kalkulačky na stránce Kalkulačky.
   Počítá stejným vzorcem jako plná kalkulačka (vklad na začátku měsíce, měsíční úročení). */
const ROKY = 20;
const VYNOS = 5;

const TX = {
  cs: {
    vklad: "Kolik měsíčně odkládáte",
    mena: "Kč",
    vysledek: `Za ${ROKY} let při výnosu ${VYNOS} % ročně`,
    vklady: "Z toho vaše vklady",
    vynos: "Výnos",
    presne: "Spočítat přesně",
    dalsi: "Další kalkulačky",
    pozn: "Orientační výpočet. Výnos není zaručený.",
    odkazy: [
      ["/kalkulacky?kalkulacka=duchod", "Důchod"],
      ["/kalkulacky?kalkulacka=jak-dlouho", "Na jak dlouho"],
      ["/kalkulacky?kalkulacka=hypoteka", "Hypotéka"],
    ],
  },
  en: {
    vklad: "How much you set aside monthly",
    mena: "CZK",
    vysledek: `After ${ROKY} years at ${VYNOS}% a year`,
    vklady: "Of which your deposits",
    vynos: "Return",
    presne: "Calculate in detail",
    dalsi: "More calculators",
    pozn: "Indicative calculation. Returns are not guaranteed.",
    odkazy: [
      ["/kalkulacky?kalkulacka=duchod", "Retirement"],
      ["/kalkulacky?kalkulacka=jak-dlouho", "How long it lasts"],
      ["/kalkulacky?kalkulacka=hypoteka", "Mortgage"],
    ],
  },
} as const;

export function MiniKalk({ lang }: { lang: Lang }) {
  const t = TX[lang];
  const [vklad, setVklad] = useState(5000);
  const fmt = (n: number) => Math.round(n).toLocaleString(lang === "cs" ? "cs-CZ" : "en-US");

  const r = VYNOS / 100 / 12;
  const n = ROKY * 12;
  const fv = vklad * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  const vklady = vklad * n;
  const pct = ((vklad - 1000) / (50000 - 1000)) * 100;

  return (
    <div className="mk reveal">
      <div className="mk-vstup">
        <label className="mk-lbl" htmlFor="mk-vklad">{t.vklad}</label>
        <div className="mk-castka">{fmt(vklad)} <span>{t.mena}</span></div>
        <input id="mk-vklad" className="mk-range" type="range" min={1000} max={50000} step={1000} value={vklad}
          style={{ "--pct": `${pct}%` } as React.CSSProperties}
          aria-valuetext={`${fmt(vklad)} ${t.mena}`}
          onChange={(e) => setVklad(+e.target.value)} />
        <div className="mk-meze"><span>1 000 {t.mena}</span><span>50 000 {t.mena}</span></div>
        <div className="mk-dalsi">
          <span>{t.dalsi}</span>
          {t.odkazy.map(([href, label]) => (
            <Link key={href} href={href} data-mer={`uvod-kalk-${label}`}>{label}</Link>
          ))}
        </div>
      </div>
      <div className="mk-vysledek" aria-live="polite">
        <div className="mk-lbl">{t.vysledek}</div>
        <div className="mk-cislo">{fmt(fv)} <span>{t.mena}</span></div>
        <div className="mk-radky">
          <div><span>{t.vklady}</span><b>{fmt(vklady)} {t.mena}</b></div>
          <div><span>{t.vynos}</span><b>{fmt(fv - vklady)} {t.mena}</b></div>
        </div>
        <Link className="btn-gold mk-btn" href={`/kalkulacky?vklad=${vklad}&roky=${ROKY}&vynosnost=${VYNOS}`} data-mer="uvod-kalk-presne">
          {t.presne} →
        </Link>
        <p className="mk-pozn">{t.pozn}</p>
      </div>
    </div>
  );
}
