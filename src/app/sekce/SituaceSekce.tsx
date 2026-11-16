"use client";
import { T, type Lang } from "../texty";

/* Karty „S čím za mnou chodíte“. */
export function SituaceSekce({ lang }: { lang: Lang }) {
  const t = T[lang];

  return (
    <>
      {/* ── Situace ── */}
      <section id="situace" style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="section-eyebrow">{t.situEye}</div>
          <h2 className="section-title-lg" style={{ marginTop: 8, marginBottom: 40 }}>
            {t.situH2a} <em>{t.situH2b}</em>
          </h2>
          <div className="situace" data-reveal>
            {t.situCards.map((s, i) => (
              <a key={s.veta} href={s.href} className="situace-karta" style={{ "--i": i } as React.CSSProperties}>
                <span className="situace-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <p className="situace-veta">{s.veta}</p>
                <p className="situace-text">{s.text}</p>
                <span className="situace-cta">{s.cta} <span className="situace-sipka" aria-hidden="true">→</span></span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
