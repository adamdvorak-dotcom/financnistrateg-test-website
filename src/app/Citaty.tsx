"use client";
import { useState, useEffect } from "react";
import type { Lang } from "./texty";

/* Pás se střídajícími se citáty. Dřív byl pod úvodní obrazovkou, teď je na stránce O mně. */
const APHORISMS: Record<string, string[]> = {
  cs: [
    "Nejdražší poradce je ten špatný.",
    "Milionář na papíře. Nebo milionář v kapse. To není totéž.",
    "Plán není luxus. Je to rozdíl mezi třemi zdroji příjmu a jedním.",
    "Stavět důchod na exitu je jak stavět golfovou sezonu na hole in one.",
  ],
  en: [
    "The most expensive advisor is the wrong one.",
    "A millionaire on paper. Or a millionaire in the pocket. That's not the same.",
    "A plan is not a luxury. It's the difference between three income streams and one.",
    "Building your retirement on an exit is like building a golf season on a hole in one.",
  ],
};

export function Citaty({ lang }: { lang: Lang }) {
  /* Aphorism cycling */
  const [aphoIdx, setAphoIdx] = useState(0);
  const [aphoVis, setAphoVis] = useState(true);

  /* Aphorism cycle */
  useEffect(() => {
    const timer = setInterval(() => {
      setAphoVis(false);
      setTimeout(() => {
        setAphoIdx((i) => (i + 1) % APHORISMS[lang].length);
        setAphoVis(true);
      }, 700);
    }, 5700);
    return () => clearInterval(timer);
  }, [lang]);

  return (
    <>
      {/* ── Quote band ── */}
      <div className="quote-band band-warm" aria-live="polite">
        <div className="quote-band-inner">
          <p className={`quote-band-text${aphoVis ? " vis" : ""}`}>
            {APHORISMS[lang][aphoIdx]}
          </p>
        </div>
        <div className="quote-band-progress" aria-hidden="true">
          <div className="quote-band-fill" key={aphoIdx} />
        </div>
      </div>
    </>
  );
}
