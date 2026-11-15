"use client";

import { useEffect, useRef, useState } from "react";

type Lang = "cs" | "en";

/** Pět oblastí Finanční preventivky a z každé jedno tvrzení, které v ní návštěvník hodnotí. */
const AREAS: Record<Lang, { name: string; claim: string }[]> = {
  cs: [
    { name: "Firma bez majitele", claim: "Firma vydrží dva měsíce bez mého telefonu." },
    { name: "Peníze mimo firmu", claim: "Víc než čtvrtina mého majetku je mimo firmu." },
    { name: "Rodina a dokumenty", claim: "Mám notářskou závěť a v ní určeného správce pozůstalosti." },
    { name: "Daně a struktura", claim: "Peníze, které firma nepotřebuje na provoz a rezervu, z ní pravidelně dostávám ven." },
    { name: "Plán odchodu", claim: "Vím zhruba, kolik firma stojí a co tu cenu zvedá nebo sráží." },
  ],
  en: [
    { name: "Business without the owner", claim: "The business can run for two months without my phone." },
    { name: "Money outside the business", claim: "More than a quarter of my wealth is outside the business." },
    { name: "Family and documents", claim: "I have a notarised will that names an estate administrator." },
    { name: "Taxes and structure", claim: "Money the business doesn't need for operations and reserves is regularly paid out to me." },
    { name: "Exit plan", claim: "I know roughly what the business is worth and what raises or lowers that price." },
  ],
};

const TEXT: Record<Lang, { lead: string; label: string }> = {
  cs: { lead: "Jedno z dvaceti tvrzení", label: "Pět oblastí Finanční preventivky" },
  en: { lead: "One of the twenty statements", label: "The five areas of the Financial Health Check" },
};

/**
 * Prstenec na kartě Finanční preventivky. Díly se dokreslí, když karta přijede na obrazovku,
 * pak se oblasti samy střídají. Najetí myší nebo kliknutí vybere oblast a střídání zastaví.
 */
export function PrevRing({ lang }: { lang: Lang }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const areas = AREAS[lang];
  const text = TEXT[lang];

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        setShown(true);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!shown || !auto) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setActive((i) => (i + 1) % 5), 3200);
    return () => window.clearInterval(t);
  }, [shown, auto]);

  const pick = (i: number) => {
    setAuto(false);
    setActive(i);
  };

  return (
    <div className={shown ? "prev-ring in" : "prev-ring"} ref={ref}>
      <div className="prev-ring-kruh">
        <svg viewBox="0 0 220 220" role="img" aria-label={text.label}>
          <circle cx="110" cy="110" r="96" fill="none" stroke="rgba(201,162,96,.1)" strokeWidth="12" />
          {/* r=96, obvod 603,19; díl 112,64 a mezera, krok 120,64 */}
          <g transform="rotate(-90 110 110)">
            {areas.map((a, i) => (
              <circle
                key={a.name}
                className={i === active ? "prev-seg on" : "prev-seg"}
                cx="110"
                cy="110"
                r="96"
                fill="none"
                stroke="#C9A260"
                strokeLinecap="round"
                strokeDashoffset={-(i * 120.637)}
                style={{ animationDelay: `${i * 130}ms` }}
                onMouseEnter={() => pick(i)}
                onClick={() => pick(i)}
              />
            ))}
          </g>
        </svg>
        <div className="prev-ring-stred" aria-live="polite">
          <span className="prev-ring-cislo">{active + 1} / 5</span>
          <span className="prev-ring-nazev" key={active}>{areas[active].name}</span>
        </div>
      </div>
      <div className="prev-ring-tvrzeni" key={`${lang}-${active}`}>
        <span>{text.lead}</span>
        „{areas[active].claim}“
      </div>
      <div className="prev-ring-tecky">
        {areas.map((a, i) => (
          <button
            key={a.name}
            type="button"
            className={i === active ? "on" : ""}
            aria-label={a.name}
            aria-pressed={i === active}
            onClick={() => pick(i)}
          >
            <i />
          </button>
        ))}
      </div>
    </div>
  );
}
