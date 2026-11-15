"use client";
import { useState } from "react";

/* Tým jako oběžná dráha: uprostřed Adam, kolem pomalu obíhá šest specialistů.
   Najetí, zaostření nebo klepnutí oběh zastaví a pod fotkou ukáže, co daný člověk řeší.
   Na telefonu se dráha nevejde, takže se specialisté srovnají do mřížky pod fotku. */
const SPEC = {
  cs: [
    { role: "Advokát", popis: "Smlouvy, svěřenský fond a vaše zájmy, když se prodává nebo převádí majetek." },
    { role: "Notář", popis: "Závěť, díky které se vaše rodina nebude jednou soudit o chalupu." },
    { role: "Daňový poradce", popis: "Daně firmy, dividendy a vaše vlastní příjmy na jednom stole." },
    { role: "Účetní", popis: "Čísla firmy, ze kterých se rozhoduje. Bez nich hádáme." },
    { role: "M&A poradce", popis: "Připraví firmu na prodej, ocení ji a provede vás od prvního kupce po podpis." },
    { role: "Privátní banka", popis: "Účty a správa majetku v zahraničí, když dává smysl mít část peněz mimo Česko." },
  ],
  en: [
    { role: "Lawyer", popis: "Contracts, trust fund and your interests when assets are being sold or transferred." },
    { role: "Notary", popis: "A will that stops your family from fighting over the cottage one day." },
    { role: "Tax advisor", popis: "Company taxes, dividends and your personal income at one table." },
    { role: "Accountant", popis: "The numbers decisions are made from. Without them, we're guessing." },
    { role: "M&A advisor", popis: "Gets the company ready for sale, values it and takes you from first buyer to signing." },
    { role: "Private bank", popis: "Accounts and asset management abroad, when it makes sense to keep some money outside the Czech Republic." },
  ],
};

const T = {
  cs: { eye: "Adam, váš člověk", hint: "Vyberte kohokoli z týmu.", alt: "Adam Dvořák" },
  en: { eye: "Adam, your advisor", hint: "Pick anyone on the team.", alt: "Adam Dvořák" },
};

export function TymOrbit({ lang = "cs" }: { lang?: "cs" | "en" }) {
  const [hover, setHover] = useState<number | null>(null);
  const [pinned, setPinned] = useState<number | null>(null);
  const specs = SPEC[lang];
  const t = T[lang];
  const active = hover ?? pinned;
  const info = active != null ? specs[active] : null;

  return (
    <div className={`orbita${active != null ? " is-paused" : ""}`}>
      <div className="orbita-draha" aria-hidden="true" />
      <div className="orbita-orb">
        {specs.map((s, i) => (
          <div
            key={i}
            className={`orbita-o${active === i ? " on" : ""}`}
            style={{ "--a": `${-90 + i * 60}deg` } as React.CSSProperties}
          >
            <div className="orbita-un">
              <div className="orbita-sp">
                <button
                  type="button"
                  className="orbita-chip"
                  aria-pressed={pinned === i}
                  aria-describedby="orbita-cap"
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(null)}
                  onFocus={() => setHover(i)}
                  onBlur={() => setHover(null)}
                  onClick={() => setPinned((p) => (p === i ? null : i))}
                >
                  <i aria-hidden="true" />
                  {s.role}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="orbita-stred">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/adam-dvorak-about.jpg" alt={t.alt} width={150} height={150} loading="lazy" />
      </div>
      <div className="orbita-cap" id="orbita-cap" aria-live="polite">
        <div key={active ?? "z"} className="orbita-cap-in">
          <b>{info ? info.role : t.eye}</b>
          <span>{info ? info.popis : t.hint}</span>
        </div>
      </div>
    </div>
  );
}
