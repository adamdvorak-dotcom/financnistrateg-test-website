"use client";
import { useState, useSyncExternalStore } from "react";

/* Otázka na konci článku: Pomohl vám? Ano vede rovnou na poděkování, Ne nejdřív nabídne
   tři důvody. Odpověď odchází anonymně přes /api/zpetna-vazba a prohlížeč si pamatuje,
   že u tohoto článku už někdo odpověděl. */
const DUVODY = ["Bylo to moc obecné", "Chyběl mi příklad", "Hledal jsem něco jiného"];

// 0 = otázka, 1 = důvody, 2 = poděkování
type Krok = 0 | 1 | 2;

export function ArticleFeedback({ slug, title }: { slug: string; title: string }) {
  const [zvoleno, setKrok] = useState<Krok>(0);
  const klic = `zv:${slug}`;
  // Už zodpovězeno dřív? Čte se až v prohlížeči, na serveru se vždy ukáže otázka.
  const uzOdpovedel = useSyncExternalStore(
    () => () => {},
    () => {
      try {
        return localStorage.getItem(klic) !== null;
      } catch {
        return false; // soukromé okno: prostě se zeptáme znovu
      }
    },
    () => false
  );
  const krok: Krok = uzOdpovedel && zvoleno === 0 ? 2 : zvoleno;

  const posli = (odpoved: "ano" | "ne", duvod?: string) => {
    setKrok(2);
    try {
      localStorage.setItem(klic, odpoved);
    } catch {
      /* nevadí */
    }
    fetch("/api/zpetna-vazba", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, title, odpoved, duvod }),
      keepalive: true,
    }).catch(() => {});
  };

  return (
    <section className={`zv k${krok}`} aria-label="Zpětná vazba k článku">
      {krok === 0 && (
        <div className="zv-st" key="k0">
          <h2 className="zv-q">Pomohl vám tenhle článek?</h2>
          <div className="zv-volby">
            <button type="button" className="zv-vol ano" onClick={() => posli("ano")}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 11v9H4v-9zM7 11l4-7c1.500 0 2.500 1 2.500 2.500V10h5a2 2 0 0 1 2 2.300l-1 6A2 2 0 0 1 17.500 20H7" /></svg>
              Ano
            </button>
            <button type="button" className="zv-vol ne" onClick={() => setKrok(1)}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 13V4H4v9zM7 13l4 7c1.500 0 2.500-1 2.500-2.500V14h5a2 2 0 0 0 2-2.300l-1-6A2 2 0 0 0 17.500 4H7" /></svg>
              Ne
            </button>
          </div>
        </div>
      )}
      {krok === 1 && (
        <div className="zv-st" key="k1">
          <h2 className="zv-q">Co vám v něm chybělo?</h2>
          <div className="zv-volby">
            {DUVODY.map((d) => (
              <button key={d} type="button" className="zv-chip" onClick={() => posli("ne", d)}>{d}</button>
            ))}
          </div>
        </div>
      )}
      {krok === 2 && (
        <div className="zv-st zv-dik" key="k2" role="status">
          <svg viewBox="0 0 52 52" aria-hidden="true"><circle cx="26" cy="26" r="26" /><path d="M15 27l7.500 7.500L37 19" /></svg>
          <div>
            <div className="zv-q">Děkuji, to mi pomáhá.</div>
            <p>Podle odpovědí články upravuji.</p>
          </div>
        </div>
      )}
    </section>
  );
}
