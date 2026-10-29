"use client";
import { useState, Fragment } from "react";

const W = 540, H = 320;

const SPEC = {
  cs: [
    { role: "Advokát",        co: "smlouvy, svěřenský fond", popis: "Připravuje smlouvy, zakládá svěřenský fond a hlídá vaše zájmy při prodeji nebo převodu majetku.",          x: 160, y:  60, dir: "r" as const },
    { role: "Notář",          co: "závěť, dědictví",         popis: "Sepisuje závěť a zajišťuje, aby váš majetek přešel tam, kam chcete — bez zbytečných sporů.",                x: 345, y:  52, dir: "l" as const },
    { role: "Daňový poradce", co: "daně firmy i rodiny",     popis: "Koordinuje daně firmy, dividendy i osobní příjmy tak, aby výsledek seděl jako celek.",                      x: 455, y: 140, dir: "l" as const },
    { role: "Účetní",         co: "čísla firmy",             popis: "Drží přesné účetnictví firmy a dodává podklady, ze kterých se rozhoduje.",                                  x: 450, y: 212, dir: "l" as const },
    { role: "M&A poradce",    co: "prodej firmy",            popis: "Připraví firmu na prodej, ocení ji a provede celý proces — od oslovení kupce po podpis smlouvy.",            x: 345, y: 280, dir: "l" as const },
    { role: "Privátní banka", co: "účty v zahraničí",        popis: "Zajišťuje účty a správu majetku v zahraničí pro případ, kdy potřebujete strukturu mimo českou jurisdikci.", x: 148, y: 280, dir: "r" as const },
  ],
  en: [
    { role: "Lawyer",       co: "contracts, trust fund",    popis: "Prepares contracts, sets up trust funds and protects your interests when transferring assets.",         x: 160, y:  60, dir: "r" as const },
    { role: "Notary",       co: "will, inheritance",        popis: "Drafts your will and ensures your estate passes where you intend — without unnecessary disputes.",       x: 345, y:  52, dir: "l" as const },
    { role: "Tax advisor",  co: "company & personal taxes", popis: "Coordinates company taxes, dividends and personal income so the overall result works as a whole.",      x: 455, y: 140, dir: "l" as const },
    { role: "Accountant",   co: "company figures",          popis: "Keeps accurate company accounts and delivers the figures decisions are based on.",                      x: 450, y: 212, dir: "l" as const },
    { role: "M&A advisor",  co: "business sale",            popis: "Prepares your company for sale, values it and runs the whole process from finding a buyer to signing.", x: 345, y: 280, dir: "l" as const },
    { role: "Private bank", co: "accounts abroad",          popis: "Provides accounts and asset management abroad when you need a structure outside Czech jurisdiction.",    x: 148, y: 280, dir: "r" as const },
  ],
};

const AD_EYE = { cs: "ADAM, VÁŠ ČLOVĚK", en: "ADAM, YOUR ADVISOR" };
const HINT   = { cs: "Klikněte na specialistu", en: "Click a specialist" };

export function TymDiag({ lang = "cs" }: { lang?: "cs" | "en" }) {
  const [active, setActive] = useState<string | null>(null);
  const specs = SPEC[lang];
  const tap = (r: string) => setActive((a) => (a === r ? null : r));
  const info = specs.find((s) => s.role === active) ?? null;

  return (
    <figure className="tym-mapa">
      <div className="tym-canvas">
        {/* Lines only — no SVG text */}
        <svg className="tym-lines" viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
          <line x1="97" y1="160" x2="196" y2="160" stroke="rgba(201,162,96,.45)" strokeWidth="1" />
          {specs.map((s, i) => {
            const ang = Math.atan2(s.y - 160, s.x - 240);
            const on = active === s.role;
            return (
              <line key={i}
                x1={240 + 44 * Math.cos(ang)} y1={160 + 44 * Math.sin(ang)}
                x2={s.x} y2={s.y}
                stroke={on ? "rgba(201,162,96,.75)" : "rgba(201,162,96,.28)"}
                strokeWidth={on ? 1.5 : 1}
                strokeDasharray="4 4"
              />
            );
          })}
        </svg>

        {/* Vy node */}
        <div className="tnd tnd-vy" style={{ left: `${(65 / W) * 100}%`, top: "50%" }}>
          <div className="tnd-ring-vy"><em>Vy</em></div>
        </div>

        {/* AD node */}
        <div className="tnd tnd-ad" style={{ left: `${(240 / W) * 100}%`, top: "50%" }}>
          <div className="tnd-ring-ad"><em>AD</em></div>
          <div className="tnd-eye tnd-eye-ad">{AD_EYE[lang]}</div>
        </div>

        {/* Specialists — dot (button) and label are separate positioned elements so the dot sits exactly at (x, y) */}
        {specs.map((s) => {
          const on = active === s.role;
          const lx = `${(s.x / W) * 100}%`;
          const ty = `${(s.y / H) * 100}%`;
          const lblStyle: React.CSSProperties = s.dir === "r"
            ? { left: `calc(${lx} + 20px)`, top: ty, transform: "translateY(-50%)", textAlign: "left" }
            : { right: `calc(${((W - s.x) / W) * 100}% + 20px)`, top: ty, transform: "translateY(-50%)", textAlign: "right" };
          return (
            <Fragment key={s.role}>
              <button
                type="button"
                aria-pressed={on}
                className={`tnd-btn${on ? " on" : ""}`}
                style={{ left: lx, top: ty }}
                onClick={() => tap(s.role)}
                aria-label={s.role}
              >
                <div className="tnd-dot" />
              </button>
              <div
                className={`tnd-lbl${on ? " on" : ""}`}
                style={lblStyle}
                onClick={() => tap(s.role)}
              >
                <span className="tnd-role">{s.role}</span>
                <span className="tnd-co">{s.co}</span>
              </div>
            </Fragment>
          );
        })}
      </div>

      {/* Detail panel */}
      <div className={`tym-panel${info ? " open" : ""}`}>
        {info ? (
          <>
            <span className="tym-panel-role">{info.role}</span>
            <p className="tym-panel-txt">{info.popis}</p>
          </>
        ) : (
          <p className="tym-panel-hint">{HINT[lang]}</p>
        )}
      </div>
    </figure>
  );
}
