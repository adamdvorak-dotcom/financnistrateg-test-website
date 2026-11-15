"use client";
import { useEffect, useState } from "react";

/* Druhý řádek úvodního nadpisu: po úvodní animaci se v něm střídají čtyři konce věty.
   V HTML je vždy jen právě zobrazené slovo (a krátce to odcházející), takže nadpis
   pro vyhledávače i čtečky zůstává jednou větou. */
const SLOVA = {
  cs: ["Celý váš obraz.", "Celý váš majetek.", "Celá vaše rodina.", "Celý váš plán."],
  en: ["The complete picture.", "All your wealth.", "Your whole family.", "Your whole plan."],
};

const PRVNI_ZA = 3600;
const KROK = 2800;

export function HeroRotate({ lang, first }: { lang: "cs" | "en"; first: string }) {
  const [s, setS] = useState({ cur: 0, prev: -1 });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let iid: ReturnType<typeof setInterval> | undefined;
    const step = () => {
      if (document.hidden) return;
      setS((p) => ({ cur: (p.cur + 1) % SLOVA.cs.length, prev: p.cur }));
    };
    const tid = setTimeout(() => {
      step();
      iid = setInterval(step, KROK);
    }, PRVNI_ZA);
    return () => {
      clearTimeout(tid);
      if (iid) clearInterval(iid);
    };
  }, []);

  const slova = SLOVA[lang];
  const started = s.prev >= 0;
  return (
    <span className="hero-rot">
      {started && (
        <span key={`o${s.prev}`} className="hero-rot-w out" aria-hidden="true">
          {slova[s.prev]}
        </span>
      )}
      <span key={`i${s.cur}`} className={started ? "hero-rot-w in" : "hero-rot-w"}>
        {started ? slova[s.cur] : first}
      </span>
    </span>
  );
}
