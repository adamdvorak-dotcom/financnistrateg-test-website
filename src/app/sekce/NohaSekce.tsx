"use client";
import { useState } from "react";
import { T, type Lang } from "../texty";

/* Struktura majetku („druhá noha“) s posuvníky. */
export function NohaSekce({ lang }: { lang: Lang }) {
  const t = T[lang];
  /* Asset structure */
  const [firma, setFirma] = useState(40)
  const [nem, setNem] = useState(12)
  const [inv, setInv] = useState(2)
  const [hot, setHot] = useState(1.5)

  /* Druhá noha */
  const noha = firma + nem + inv + hot
  const nohaMin = inv + hot
  const nohaMimo = noha - firma
  const nohaFmt = (x: number) =>
    x.toLocaleString('cs-CZ', { minimumFractionDigits: 0, maximumFractionDigits: 1 })
  const nohaDil = (x: number) => `${noha > 0 ? (x / noha) * 100 : 0}%`
  // Podíly zaokrouhlené metodou největšího zbytku, aby dávaly dohromady 100 %
  const [pFirma, pNem, pInv, pHot] = (() => {
    const xs = [firma, nem, inv, hot]
    if (noha <= 0) return [0, 0, 0, 0]
    const raw = xs.map(x => (x / noha) * 100)
    const out = raw.map(Math.floor)
    let rest = 100 - out.reduce((a, b) => a + b, 0)
    for (const i of raw.map((r, i) => i).sort((a, b) => (raw[b] - out[b]) - (raw[a] - out[a]))) {
      if (rest <= 0) break
      out[i]++; rest--
    }
    return out
  })()
  const nohaPct = (p: number) => `${p} %`
  return (
    <>
      {/* ── Druhá noha ── */}
      <section className="noha" id="druha-noha">
        <div className="container noha-grid">
          <div>
            <div className="section-eyebrow">{t.nohaEye}</div>
            <h2 className="section-title-lg" style={{ marginTop: 8, marginBottom: 16 }}>
              {t.nohaH2a} <em>{t.nohaH2b}</em>
            </h2>
            <p style={{ color: 'var(--text-2)', fontSize: 15, maxWidth: '42ch', marginBottom: 32 }}>
              {t.nohaP}
            </p>
            <div className="noha-sliders">
              {[
                { label: t.nohaFirmaLbl, val: firma, set: setFirma, max: 1000 },
                { label: t.nohaNemLbl, val: nem, set: setNem, max: 500 },
                { label: t.nohaInvLbl, val: inv, set: setInv, max: 500 },
                { label: t.nohaHotLbl, val: hot, set: setHot, max: 200 },
              ].map(({ label, val, set, max }) => (
                <div key={label}>
                  <div className="noha-slider-label">
                    <span>{label}</span>
                    <span>{nohaFmt(val)} {t.invMillSuffix}</span>
                  </div>
                  {/* Nelineární posuvník (třetí mocnina): malé částky jdou nastavit jemně, velké stačí hrubě */}
                  <input
                    type="range"
                    min={0}
                    max={1000}
                    step={1}
                    value={Math.round(1000 * Math.cbrt(Math.min(val, max) / max))}
                    aria-valuetext={`${nohaFmt(val)} ${t.invMillSuffix}`}
                    onChange={(e) => {
                      const v = max * Math.pow(+e.target.value / 1000, 3)
                      const k = v < 10 ? 0.5 : v < 100 ? 1 : v < 500 ? 5 : 10
                      set(Math.min(max, Math.round(v / k) * k))
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="noha-card">
            <div className="noha-total">
              <span>{t.nohaTotal}</span>
              <b>{nohaFmt(noha)} {t.invMillSuffix}</b>
            </div>
            <div className="pruh" role="img" aria-label={`${t.nohaFirmaLbl} ${nohaPct(pFirma)}, ${t.nohaNemLbl} ${nohaPct(pNem)}, ${t.nohaInvLbl} ${nohaPct(pInv)}, ${t.nohaHotLbl} ${nohaPct(pHot)}`}>
              <i className="firma" style={{ width: nohaDil(firma) }} />
              <i className="nem" style={{ width: nohaDil(nem) }} />
              <i className="inv" style={{ width: nohaDil(inv) }} />
              <i className="hot" style={{ width: nohaDil(hot) }} />
            </div>
            <div className="pruh-legend">
              <span className="l-firma">{t.nohaFirmaLbl} {nohaPct(pFirma)}</span>
              <span className="l-nem">{t.nohaNemLbl} {nohaPct(pNem)}</span>
              <span className="l-inv">{t.nohaInvLbl} {nohaPct(pInv)}</span>
              <span className="l-hot">{t.nohaHotLbl} {nohaPct(pHot)}</span>
            </div>
            <div className="karty">
              <div>
                <small>{t.nohaOutside}</small>
                <b>{nohaFmt(nohaMimo)} mil.</b>
                <span>{nohaPct(pNem + pInv + pHot)} {t.nohaOfAssets}</span>
              </div>
              <div className="navy">
                <small>{t.nohaLiquid}</small>
                <b>{nohaFmt(nohaMin)} mil.</b>
                <span>{nohaPct(pInv + pHot)} {t.nohaNoSale}</span>
              </div>
            </div>
            <blockquote className="noha-quote">{t.nohaQuote}</blockquote>
            <a className="btn-navy" href="/konzultace">{t.nohaCta}</a>
          </div>
        </div>
      </section>
    </>
  );
}
