"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useLang } from "../blog/useLang";
import { SiteNav } from "../SiteNav";
import { SiteFooter } from "../SiteFooter";
import { ZmenaPlan } from "../ZmenaPlan";
import { SluzbySekce } from "../sekce/SluzbySekce";
import { SituaceSekce } from "../sekce/SituaceSekce";
import { PlanSekce } from "../sekce/PlanSekce";
import { NohaSekce } from "../sekce/NohaSekce";
import { DedictviSekce } from "../sekce/DedictviSekce";
import { useReveal } from "../sekce/useReveal";

const TX = {
  cs: {
    kapitoly: "Na této stránce",
    kap: [
      ["services", "S čím pomáhám"],
      ["situace", "S čím za mnou chodíte"],
      ["plan", "Co dostanete"],
      ["zmena", "Co se změní"],
      ["druha-noha", "Struktura majetku"],
      ["dedictvi", "Dědictví"],
    ],
    ctaH: "Vyberte si termín.",
    ctaP: "30 minut, online nebo v Praze.",
    ctaBtn: "Zahájit rozhovor",
  },
  en: {
    kapitoly: "On this page",
    kap: [
      ["services", "What I do"],
      ["situace", "What brings you"],
      ["plan", "What you get"],
      ["zmena", "What changes"],
      ["druha-noha", "Asset structure"],
      ["dedictvi", "Inheritance"],
    ],
    ctaH: "Pick your slot.",
    ctaP: "30 minutes, online or in Prague.",
    ctaBtn: "Start a conversation",
  },
} as const;

/* Samostatná stránka Služby: všechno, co bylo dřív rozložené po úvodní stránce.
   Na úvodní stránce z ní zůstává jen krátká upoutávka se čtyřmi kartami. */
export function Sluzby() {
  const [lang, prepni] = useLang();
  const t = TX[lang];
  const [kde, setKde] = useState<string>("services");

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useReveal(".sl");

  // Pruh kapitol ví, kde čtenář je: aktivní je sekce, jejíž začátek naposledy přešel přes horní třetinu obrazovky.
  useEffect(() => {
    const ids = TX.cs.kap.map(([id]) => id);
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.35;
      let cur: string = ids[0];
      let best = -Infinity;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= line && top > best) { best = top; cur = id; }
      }
      setKde(cur);
    };
    const onScroll = () => { if (!raf) raf = window.requestAnimationFrame(update); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  // Na úzké obrazovce se pruh posouvá do stran: aktivní kapitola má být vidět.
  useEffect(() => {
    const a = document.querySelector<HTMLElement>(`.sl-kap a[data-kap="${kde}"]`);
    const pas = a?.parentElement;
    if (!a || !pas || pas.scrollWidth <= pas.clientWidth) return;
    pas.scrollTo({ left: a.offsetLeft - (pas.clientWidth - a.offsetWidth) / 2, behavior: "smooth" });
  }, [kde]);

  return (
    <div className="sl">
      <SiteNav lang={lang} prepni={prepni} aktivni="services" />

      <div className="sl-kap" role="navigation" aria-label={t.kapitoly}>
        <div className="container sl-kap-in">
          <span className="sl-kap-lbl">{t.kapitoly}</span>
          <div className="sl-kap-pas">
            {t.kap.map(([id, label]) => (
              <a key={id} href={`#${id}`} data-kap={id} className={kde === id ? "je" : undefined} aria-current={kde === id ? "true" : undefined}>
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <main>
        <SluzbySekce lang={lang} hlavni />
        <SituaceSekce lang={lang} />
        <PlanSekce lang={lang} />
        <section id="zmena" className="section-wrap">
          <div className="container">
            <ZmenaPlan lang={lang} />
          </div>
        </section>
        <NohaSekce lang={lang} />
        <DedictviSekce lang={lang} />

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
