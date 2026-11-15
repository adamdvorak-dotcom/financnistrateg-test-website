"use client";
import { useEffect, useRef, useState } from "react";

/* „Co se změní": čtyři řádky, které se přepínají mezi stavem bez plánu a s plánem.
   Při dojetí na obrazovku se jednou přepnou samy, dál už jen na kliknutí. */
const T = {
  cs: {
    eye: "Rozdíl",
    title: "Co se změní",
    group: "Zobrazit stav",
    bez: "Bez plánu",
    s: "S plánem",
    rows: [
      ["Zisk leží na firemním účtu", "Pravidelná výplata a jasno, kam s ní"],
      ["Majetek rodiny stojí jen na firmě", "Druhá noha mimo firmu"],
      ["Závěť ani plné moci neexistují", "Rodina ví, co dělat, kdyby se něco stalo"],
      ["Prodej firmy se řeší, až přijde kupec", "Plán odchodu roky dopředu"],
    ],
  },
  en: {
    eye: "The difference",
    title: "What changes",
    group: "Show state",
    bez: "Without a plan",
    s: "With a plan",
    rows: [
      ["Profit sits in the company account", "A regular payout and a clear place for it"],
      ["The family's wealth rests on the company alone", "A second leg outside the company"],
      ["No will, no powers of attorney", "The family knows what to do if something happens"],
      ["The sale gets dealt with when a buyer shows up", "An exit plan years ahead"],
    ],
  },
};

export function ZmenaPlan({ lang = "cs" }: { lang?: "cs" | "en" }) {
  const [stav, setStav] = useState<0 | 1>(0);
  const ref = useRef<HTMLDivElement>(null);
  const rucne = useRef(false);
  const t = T[lang];

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    let tid: ReturnType<typeof setTimeout> | undefined;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        tid = setTimeout(() => {
          if (!rucne.current) setStav(1);
        }, 1400);
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (tid) clearTimeout(tid);
    };
  }, []);

  const vyber = (n: 0 | 1) => () => {
    rucne.current = true;
    setStav(n);
  };

  return (
    <div ref={ref} className={`zmena c${stav}`}>
      <div>
        <div className="section-eyebrow">{t.eye}</div>
        <h2 className="section-title-lg" style={{ marginTop: 12 }}>{t.title}</h2>
        <div className="zmena-seg" role="group" aria-label={t.group}>
          <span className="zmena-pill" aria-hidden="true" />
          <button type="button" aria-pressed={stav === 0} onClick={vyber(0)}>{t.bez}</button>
          <button type="button" aria-pressed={stav === 1} onClick={vyber(1)}>{t.s}</button>
        </div>
      </div>
      <ul className="zmena-rows">
        {t.rows.map(([a, b], i) => (
          <li key={i} style={{ "--i": i } as React.CSSProperties}>
            <span className="zmena-ic" aria-hidden="true">
              <svg className="x" viewBox="0 0 16 16" fill="none" strokeWidth="2" strokeLinecap="round"><path d="M4 4l8 8M12 4l-8 8" /></svg>
              <svg className="v" viewBox="0 0 16 16" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8.5l3.2 3.2L13 5" /></svg>
            </span>
            <span className="zmena-tx">
              <span className="a" aria-hidden={stav === 1}>{a}</span>
              <span className="b" aria-hidden={stav === 0}>{b}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
