"use client";
import { useState } from "react";
import { T, type Lang } from "../texty";

/* Dědictví: kdo dědí ze zákona, když chybí závěť. */
export function DedictviSekce({ lang }: { lang: Lang }) {
  const t = T[lang];
  /* Inheritance calc */
  const [dedManzel, setDedManzel] = useState<'manzelka' | 'manzel' | 'druh' | null>(null)
  const [dedDeti, setDedDeti] = useState(2)
  const [dedNezletile, setDedNezletile] = useState(1)
  const [dedRodice, setDedRodice] = useState<0|1|2>(0)
  const [dedMajetek, setDedMajetek] = useState(20_000_000)
  const [dedSjm, setDedSjm] = useState(true)


  /* ── Inheritance widget ── */
  // nezl je vyplněné jen u dětí: podle něj se počítá povinný díl (§ 1643 OZ)
  type Dedic = { kdo: string; castka: number; nezl?: boolean }
  const kdoDedi = (): { trida: number; dedici: Dedic[] } => {
    const sjm = dedManzel === 'manzelka' || dedManzel === 'manzel'
    const jmeno = dedManzel === 'manzel' ? t.dedNameHusband : dedManzel === 'druh' ? t.dedNamePartner : t.dedNameWife
    const pulkaSJM = sjm && dedSjm ? dedMajetek / 2 : 0
    const D = dedMajetek - pulkaSJM
    if (dedDeti > 0) {
      const dil = D / (dedDeti + (sjm ? 1 : 0))
      return { trida: 1, dedici: [
        ...(sjm ? [{ kdo: jmeno, castka: pulkaSJM + dil }] : []),
        ...Array.from({ length: dedDeti }, (_, i) => {
          const nezl = i >= dedDeti - dedNezletile
          return { kdo: nezl ? t.dedNameMinorChild : t.dedNameAdultChild, castka: dil, nezl }
        }),
      ] }
    }
    if (dedManzel || dedRodice > 0) {
      const sjm2 = dedManzel === 'manzelka' || dedManzel === 'manzel'
      const m = !dedManzel ? 0
        : sjm2 ? (dedRodice ? Math.max(D / (1 + dedRodice), D / 2) : D)
        : (dedRodice > 0 ? D / (1 + dedRodice) : D)
      const r = dedRodice ? (D - m) / dedRodice : 0
      return { trida: 2, dedici: [
        ...(dedManzel ? [{ kdo: jmeno, castka: pulkaSJM + m }] : []),
        ...Array.from({ length: dedRodice }, () => ({ kdo: t.dedNameParent, castka: r })),
      ] }
    }
    return { trida: 3, dedici: [{ kdo: t.dedNameDistant, castka: D }] }
  }
  const dedVysledek = kdoDedi()
  const dedSjmPartner = dedManzel === 'manzelka' || dedManzel === 'manzel'
  const dedOpatrovnik = dedVysledek.trida === 1 && dedNezletile > 0 && (dedSjmPartner || dedNezletile >= 2)
  const dedVarovani = dedManzel === 'druh' && dedDeti > 0 ? t.dedWarnPartner : null
  const loc = lang === 'cs' ? 'cs-CZ' : 'en-US'
  const dedFmt = (n: number) => n >= 1_000_000_000
    ? (Math.round(n / 100_000_000) / 10).toLocaleString(loc) + (lang === 'cs' ? ' mld. Kč' : ' bil. CZK')
    : n >= 10_000_000
    ? (Math.round(n / 100_000) / 10).toLocaleString(loc) + ' mil. ' + t.currency
    : Math.round(n).toLocaleString(loc) + ' ' + t.currency
  const dedZlomek = (x: number) => {
    if (x >= 1 || x <= 0) return null
    for (let d = 1; d <= 96; d++) {
      if (Math.abs(x * d - Math.round(x * d)) < 1e-6) return `${Math.round(x * d)}/${d}`
    }
    return null
  }
  return (
    <>
      {/* ── Dědictví ── */}
      <section id="dedictvi" style={{ padding: '80px 0', background: 'var(--bg-2)' }}>
        <div className="container">
          <div className="section-eyebrow">{t.dedEye}</div>
          <h2 className="section-title-lg" style={{ marginTop: 8, marginBottom: 8 }}>
            {t.dedH2a} <em>{t.dedH2b}</em>
          </h2>
          <p style={{ color: 'var(--text-2)', fontSize: 15, maxWidth: '50ch', marginBottom: 40 }}>
            {t.dedP}
          </p>
          <div className="ded-grid">
            <div className="ded-inputs">
              <div className="ded-group">
                <label className="ded-label">{t.dedPartnerLabel}</label>
                <div className="ded-opts">
                  {t.dedPartnerOpts.map(([v, l]) => (
                    <button key={String(v)} type="button"
                      className={`ded-opt${dedManzel === v ? ' on' : ''}`}
                      onClick={() => setDedManzel(v as 'manzelka' | 'manzel' | 'druh' | null)}>
                      {l}
                    </button>
                  ))}
                </div>
              </div>
              <div className="ded-group">
                <label className="ded-label">{t.dedChildrenLabel} <strong>{dedDeti}</strong></label>
                <input type="range" min={0} max={6} step={1} value={dedDeti}
                  onChange={(e) => { setDedDeti(+e.target.value); setDedNezletile(Math.min(dedNezletile, +e.target.value)) }}
                  className="ded-range" />
                <div className="ded-range-meta"><span>0</span><span>6</span></div>
              </div>
              {dedDeti > 0 && (
                <div className="ded-group">
                  <label className="ded-label">{t.dedMinorsLabel} <strong>{dedNezletile}</strong></label>
                  <input type="range" min={0} max={dedDeti} step={1} value={dedNezletile}
                    onChange={(e) => setDedNezletile(+e.target.value)}
                    className="ded-range" />
                  <div className="ded-range-meta"><span>0</span><span>{dedDeti}</span></div>
                </div>
              )}
              <div className="ded-group">
                <label className="ded-label">{t.dedParentsLabel}</label>
                <div className="ded-opts">
                  {([0, 1, 2] as const).map((v) => (
                    <button key={v} type="button"
                      className={`ded-opt${dedRodice === v ? ' on' : ''}`}
                      onClick={() => setDedRodice(v)}>
                      {t.dedParentOpts[v]}
                    </button>
                  ))}
                </div>
              </div>
              <div className="ded-group">
                <label className="ded-label">{t.dedAssetLabel} <strong>{dedFmt(dedMajetek)}</strong></label>
                <input type="range" min={0} max={1000} step={1}
                  value={Math.round(1000 * Math.log(dedMajetek / 1_000_000) / Math.log(1000))}
                  onChange={(e) => { const p = +e.target.value; const v = 1_000_000 * Math.pow(1000, p / 1000); const k = v < 10e6 ? 500_000 : v < 100e6 ? 1_000_000 : 10_000_000; setDedMajetek(Math.min(1_000_000_000, Math.round(v / k) * k)); }}
                  className="ded-range" />
                <div className="ded-ticks">
                  <span>1 mil.</span><span>10 mil.</span><span>100 mil.</span><span>1 {lang === 'cs' ? 'mld.' : 'bil.'} {t.currency}</span>
                </div>
              </div>
              {dedSjmPartner && (
                <div className="ded-group">
                  <label className="ded-label">{t.dedSjmLabel}</label>
                  <div className="ded-opts">
                    <button type="button" className={`ded-opt${dedSjm ? ' on' : ''}`} onClick={() => setDedSjm(true)}>{t.dedSjmYes}</button>
                    <button type="button" className={`ded-opt${!dedSjm ? ' on' : ''}`} onClick={() => setDedSjm(false)}>{t.dedSjmNo}</button>
                  </div>
                </div>
              )}
            </div>
            <div className="ded-result">
              <p className="ded-result-label">{dedVysledek.trida === 1 ? t.dedClass1 : dedVysledek.trida === 2 ? t.dedClass2 : t.dedClass3}</p>
              {dedVysledek.dedici.map((d, i) => (
                <div key={i} className="ded-row">
                  <div className="ded-row-left">
                    <span className="ded-kdo">{d.kdo}</span>
                    {(() => {
                      const frac = dedZlomek(d.castka / dedMajetek)
                      return frac ? <span className="ded-frac">{frac}</span> : null
                    })()}
                  </div>
                  <div className="ded-right">
                    <span className="ded-castka">{dedFmt(d.castka)}</span>
                    {d.nezl !== undefined && (
                      <span className="ded-povinny">{t.dedForcedShare} {dedFmt(d.castka * (d.nezl ? 0.75 : 0.25))}</span>
                    )}
                  </div>
                </div>
              ))}
              {dedVysledek.trida === 1 && dedNezletile > 0 && (
                <p className="ded-pozn">{t.dedNoteMinorSame}</p>
              )}
              {dedOpatrovnik && (
                <p className="ded-pozn">{t.dedNoteGuardian}</p>
              )}
              {dedVysledek.trida === 1 && (
                <p className="ded-pozn">{t.dedNoteForced}</p>
              )}
              {dedVarovani && (
                <p className="ded-pozn ded-warn">{dedVarovani}</p>
              )}
              {dedManzel === 'druh' && dedDeti === 0 && (
                <p className="ded-pozn">{t.dedNotePartner2}</p>
              )}
              <div className="ded-stat">{t.dedStat}</div>
              <a href="/konzultace" className="btn-primary" style={{ display: 'inline-flex', marginTop: 20 }}>
                {t.dedCta}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
