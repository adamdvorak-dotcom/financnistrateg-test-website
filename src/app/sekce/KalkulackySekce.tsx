"use client";
import { useState, useEffect, useRef } from "react";
import { T, type Lang } from "../texty";

/* Kalkulačky (investice, důchod, na jak dlouho, hypotéka), přenesené z úvodní stránky beze změny.
   Parametry v adrese (?kalkulacka=…, ?vklad=…&roky=…) fungují stejně jako dřív. */

function fmt(n: number, lang: Lang) {
  return Math.round(n).toLocaleString(lang === "cs" ? "cs-CZ" : "en-US");
}

/* ── Arc ring (calc summary + test result) ── */
function ArcRing({ pct, label }: { pct: number; label: string }) {
  const r = 36, circ = 2 * Math.PI * r;
  const [drawn, setDrawn] = useState(0);
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; const t = setTimeout(() => setDrawn(pct), 120); return () => clearTimeout(t); }
    setDrawn(pct);
  }, [pct]);
  const offset = circ * (1 - Math.min(drawn / 100, 1));
  return (
    <div className="arc-ring-wrap">
      <svg viewBox="0 0 88 88" width="88" height="88" style={{ transform: "rotate(-90deg)" }} aria-hidden="true">
        <circle cx="44" cy="44" r={r} fill="none" stroke="var(--bg-3)" strokeWidth="5" />
        <circle cx="44" cy="44" r={r} fill="none" stroke="#C9A260" strokeWidth="5"
          strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.16,1,0.3,1)" }} />
      </svg>
      <div className="arc-label">{label}</div>
    </div>
  );
}

/* ── Growth chart (invest calc) ── */
function GrowthChart({ monthly, rate, years, init }: { monthly: number; rate: number; years: number; init: number }) {
  const W = 280, H = 68, steps = Math.min(years, 60);
  const depPts = Array.from({ length: steps + 1 }, (_, i) => {
    const n = (i / steps) * years * 12;
    return Math.max(0, monthly * n + init);
  });
  const fvPts = Array.from({ length: steps + 1 }, (_, i) => {
    const n = (i / steps) * years * 12, r = rate / 100 / 12;
    return r === 0 ? monthly * n + init : monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r) + init * Math.pow(1 + r, n);
  });
  const maxFv = Math.max(...fvPts, 1);
  const toY = (v: number) => H - 4 - (v / maxFv) * (H - 12);
  const xs = Array.from({ length: steps + 1 }, (_, i) => (i / steps) * W);
  const fvY = fvPts.map(toY);
  const depY = depPts.map(toY);
  const fvPath = `M${xs[0]},${fvY[0]} ` + xs.slice(1).map((x, i) => `L${x},${fvY[i + 1]}`).join(" ");
  const depPath = `M${xs[0]},${depY[0]} ` + xs.slice(1).map((x, i) => `L${x},${depY[i + 1]}`).join(" ");
  const areaPath = fvPath + ` L${W},${H} L0,${H}Z`;
  const last = { x: xs[xs.length - 1], y: fvY[fvY.length - 1] };
  return (
    <svg className="growth-chart" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="cgfill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C9A260" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#C9A260" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#cgfill)" className="chart-area" />
      <path d={depPath} stroke="var(--text-3)" strokeWidth="1.5" strokeDasharray="4 3" fill="none" className="chart-dep" />
      <path d={fvPath} stroke="#C9A260" strokeWidth="2" fill="none" className="chart-line" />
      <circle cx={last.x} cy={last.y} r="4" fill="#C9A260" className="chart-dot" />
    </svg>
  );
}

/* ── Gold range slider ── */
function GoldRange({ value, min, max, step, onChange, fmtLabel, logStep }: {
  value: number; min: number; max: number; step: number;
  onChange: (v: number) => void; fmtLabel?: (v: number) => string;
  logStep?: (v: number) => number;
}) {
  const pos = logStep ? Math.round(1000 * Math.log(Math.max(min, value) / min) / Math.log(max / min)) : null
  const pct = logStep ? pos! / 10 : Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
  const label = fmtLabel ? fmtLabel(value) : value.toLocaleString("cs-CZ");
  return (
    <div className="gold-range-outer" style={{ "--pct": `${pct.toFixed(1)}%` } as React.CSSProperties}>
      <div className="gold-bubble" style={{ left: `${pct.toFixed(1)}%`, transform: `translateX(-${pct.toFixed(1)}%)` }}>{label}</div>
      {logStep ? (
        <input type="range" min={0} max={1000} step={1} value={pos!}
          onChange={(e) => { const p = +e.target.value; const v = min * Math.pow(max / min, p / 1000); const k = logStep(v); onChange(Math.min(max, Math.round(v / k) * k)); }} />
      ) : (
        <input type="range" min={min} max={max} step={step} value={value}
          onChange={(e) => onChange(+e.target.value)} />
      )}
    </div>
  );
}

function SlotNum({ value }: { value: string }) {
  return (
    <span className="slot-num">
      {value.split("").map((ch, i) => (
        <span
          key={i}
          className={/\d/.test(ch) ? "slot-digit" : "slot-sep"}
          style={/\d/.test(ch) ? { animationDelay: `${i * 60}ms` } : undefined}
        >{ch}</span>
      ))}
    </span>
  );
}

export function KalkulackySekce({ lang, hlavni = false }: { lang: Lang; hlavni?: boolean }) {
  const t = T[lang];
  const Nadpis = hlavni ? "h1" : "h2";
  const [calcTab, setCalcTab] = useState<"invest" | "mortgage" | "retirement" | "depletion">("invest");
  const calcTouchX = useRef<number>(0);
  const calcTouchY = useRef<number>(0);
  const calcTabOrder = ['invest', 'retirement', 'depletion', 'mortgage'] as const;

  /* Invest calc */
  const [invMonthly, setInvMonthly] = useState(5000);
  const [invRate, setInvRate] = useState(5);
  const [invYears, setInvYears] = useState(20);
  const [invInitPos, setInvInitPos] = useState(0);
  /* Mortgage calc */
  const [mtgAmt, setMtgAmt] = useState(4000000);
  const [mtgRate, setMtgRate] = useState(4.5);
  const [mtgYrs, setMtgYrs] = useState(30);

  /* Retirement calc */
  const [retAge, setRetAge] = useState(35);
  const [retMissingYears, setRetMissingYears] = useState(0);
  const [retCurrentSavings, setRetCurrentSavings] = useState(0);
  const [retMonthlySavings, setRetMonthlySavings] = useState(3000);
  const [retDesiredPension, setRetDesiredPension] = useState(40000);


  /* Depletion calculator */
  const [decMajetek, setDecMajetek] = useState(10_000_000)
  const [decVyber, setDecVyber] = useState(50_000)
  const [decVynos, setDecVynos] = useState(4.5)
  const [decZacatek, setDecZacatek] = useState(60)

  /* Calculator field editing — show raw text while user types, commit on blur */
  const [editField, setEditField] = useState<{ key: string; raw: string } | null>(null);
  const startEdit = (key: string, raw: string) => setEditField({ key, raw });
  const updateRaw = (raw: string) => setEditField(prev => prev ? { ...prev, raw } : null);
  const commitEdit = <T,>(key: string, parse: (s: string) => T | null, set: (v: T) => void) => {
    if (editField?.key === key) { const v = parse(editField.raw); if (v !== null) set(v); }
    setEditField(null);
  };
  const rawOr = (key: string, fallback: string) => editField?.key === key ? editField.raw : fallback;
  const parseNum = (s: string) => { const v = parseInt(s.replace(/[^\d]/g, ''), 10); return isNaN(v) ? null : v; };
  const parseDec = (s: string) => { const v = parseFloat(s.replace(',', '.')); return isNaN(v) || v <= 0 ? null : v; };

  /* ── Read calculator params from URL on mount ── */
  useEffect(() => {
    const p = new URLSearchParams(location.search);
    if (p.get("vklad"))     setInvMonthly(Math.round(+(p.get("vklad") ?? 0) / 1000) * 1000 || 5000);
    if (p.get("roky"))      setInvYears(Math.min(40, Math.max(1, +(p.get("roky") ?? 20))));
    if (p.get("vynosnost")) setInvRate(Math.min(20, Math.max(1, +(p.get("vynosnost") ?? 5))));
    if (p.get("init")) {
      const v = +(p.get("init") ?? 0);
      if (v > 0) setInvInitPos(Math.round(1 + 99 * (Math.log10(v / 1000) / Math.log10(50000))));
    }
    if (p.get("vklad") || p.get("roky")) {
      setTimeout(() => document.getElementById("calculators")?.scrollIntoView({ behavior: "smooth" }), 300);
    }
    const k = p.get('kalkulacka')
    if (k === 'duchod') setCalcTab('retirement')
    if (k === 'jak-dlouho') setCalcTab('depletion')
    if (k === 'hypoteka') setCalcTab('mortgage')
  }, []);

  /* ── Invest calculator ── */
  const invInit = (() => {
    if (invInitPos === 0) return 0;
    const raw = 1000 * Math.pow(10, ((invInitPos - 1) / 99) * Math.log10(50000));
    const mag = Math.pow(10, Math.floor(Math.log10(raw)) - 1);
    return Math.round(raw / mag) * mag;
  })();
  const iR = invRate / 100 / 12;
  const iN = invYears * 12;
  const iFv =
    iR === 0
      ? invMonthly * iN + invInit
      : invMonthly * ((Math.pow(1 + iR, iN) - 1) / iR) * (1 + iR) + invInit * Math.pow(1 + iR, iN);
  const iDep = invMonthly * iN + invInit;
  const iProfit = Math.max(0, iFv - iDep);
  const iPct = iDep > 0 ? (iDep / iFv) * 100 : 50;
  /* ── Mortgage calculator ── */
  const mR = mtgRate / 100 / 12;
  const mN = mtgYrs * 12;
  const mMo = mR === 0 ? mtgAmt / mN : (mtgAmt * (mR * Math.pow(1 + mR, mN))) / (Math.pow(1 + mR, mN) - 1);
  const mTotal = mMo * mN;
  const mInt = Math.max(0, mTotal - mtgAmt);
  const mPct = mtgAmt > 0 ? (mInt / mTotal) * 100 : 50;
  const mBarColor = mPct > 55 ? "var(--red)" : mPct > 35 ? "#f97316" : "var(--green)";

  /* ── Retirement calculator ── */
  const retYears = Math.max(1, 65 - retAge);
  const retN = retYears * 12;
  const retR = 0.06 / 12;
  const retStatePension = Math.max(0, 21840 - retMissingYears * 480);
  const retPortfolioFV =
    retCurrentSavings * Math.pow(1 + retR, retN) +
    retMonthlySavings * ((Math.pow(1 + retR, retN) - 1) / retR) * (1 + retR);
  const retPortfolioMonthly = retPortfolioFV / 240;
  const retTotalMonthly = retStatePension + retPortfolioMonthly;
  const retGap = retTotalMonthly - retDesiredPension;
  const retDesiredFromPortfolio = Math.max(0, retDesiredPension - retStatePension);
  const retFVFromCurrent = retCurrentSavings * Math.pow(1 + retR, retN);
  const retAdditionalFV = Math.max(0, retDesiredFromPortfolio * 240 - retFVFromCurrent);
  const retExtraMonthly = Math.max(0,
    retAdditionalFV * retR / ((Math.pow(1 + retR, retN) - 1) * (1 + retR)) - retMonthlySavings
  );

  /* Pension result redesign */
  const pCil = retDesiredPension            // target monthly income in retirement
  const pStat = retStatePension              // from state pension
  const pPort = retPortfolioMonthly          // from portfolio
  const pChybi = Math.max(0, pCil - pStat - pPort)
  const pSirka = (x: number) => `${(x / Math.max(pCil, pStat + pPort) * 100)}%`
  const pRMo = invRate / 100 / 12
  const pNMo = invYears * 12
  const pFvF = pNMo > 0 && pRMo > 0
    ? ((Math.pow(1 + pRMo, pNMo) - 1) / pRMo) * (1 + pRMo)
    : pNMo
  const pKapital = pChybi > 0 ? pChybi * 12 / Math.max(invRate / 100, 0.01) : 0
  const pDoplatek = pKapital > 0 && pFvF > 0
    ? Math.ceil(pKapital / pFvF / 100) * 100
    : 0
  const pKc = (x: number) => `${Math.round(x).toLocaleString(lang === 'cs' ? 'cs-CZ' : 'en-US')} ${t.currency}`
  const pCislo = (x: number) => Math.round(x).toLocaleString(lang === 'cs' ? 'cs-CZ' : 'en-US')

  const tvar = (n: number, [jeden, dva, pet]: [string, string, string]) =>
    n === 1 ? jeden : n >= 2 && n <= 4 ? dva : pet

  const decR = decVynos / 100 / 12
  const decNavzdy = decR > 0 ? decMajetek * decR : 0
  const decMesice = decVyber <= decNavzdy
    ? Infinity
    : decR > 0
      ? -Math.log(1 - (decMajetek * decR) / decVyber) / Math.log(1 + decR)
      : decMajetek / decVyber
  const decRoky = isFinite(decMesice) ? Math.floor(decMesice / 12) : 0
  const decZbyva = isFinite(decMesice) ? Math.floor(decMesice % 12) : 0
  const decZustatek = (m: number) =>
    decMajetek * Math.pow(1 + decR, m) - (decR > 0 ? decVyber * ((Math.pow(1 + decR, m) - 1) / decR) : decVyber * m)

  return (
    <>
      {/* ── Calculators ── */}
      <section id="calculators">
        <div className="container">
          <div className="section-header reveal-bold" data-reveal>
            <div className="section-rule" />
            <div className="section-eyebrow">{t.navCalc}</div>
            <Nadpis className="section-title-lg"><span className="line"><span className="line-inner">{t.calcTitle}</span></span></Nadpis>
          </div>
          <div className="calc-wrap reveal">
            <div className="calc-header">
              <div className="calc-tabs">
                <button className={`calc-tab${calcTab === "invest" ? " active" : ""}`} onClick={() => setCalcTab("invest")}>{t.tabInvest}</button>
                <button className={`calc-tab${calcTab === "retirement" ? " active" : ""}`} onClick={() => setCalcTab("retirement")}>{t.tabRetirement}</button>
                <button className={`calc-tab${calcTab === "depletion" ? " active" : ""}`} onClick={() => setCalcTab("depletion")}>
                  {t.tabDepletion}
                </button>
                {/* Kalkulačka renty je samostatná stránka (public/renta.html) */}
                <a className="calc-tab" href="/renta">
                  {t.tabRenta} ↗ <span className="new-badge">{t.tabNew}</span>
                </a>
                <button className={`calc-tab${calcTab === "mortgage" ? " active" : ""}`} onClick={() => setCalcTab("mortgage")}>{t.tabMortgage}</button>
              </div>
            </div>
            <div className="calc-body"
              onTouchStart={(e) => {
                calcTouchX.current = e.touches[0].clientX;
                calcTouchY.current = e.touches[0].clientY;
              }}
              onTouchEnd={(e) => {
                const dx = e.changedTouches[0].clientX - calcTouchX.current;
                const dy = e.changedTouches[0].clientY - calcTouchY.current;
                if (Math.abs(dx) < 50 || Math.abs(dy) > Math.abs(dx)) return;
                const idx = calcTabOrder.indexOf(calcTab);
                if (dx < 0 && idx < calcTabOrder.length - 1) setCalcTab(calcTabOrder[idx + 1]);
                if (dx > 0 && idx > 0) setCalcTab(calcTabOrder[idx - 1]);
              }}
            >
              {/* Invest panel */}
              <div className={`calc-panel${calcTab === "invest" ? " active" : ""}`}>
                <div className="calc-inputs">
                  <div>
                    <label className="field-label">{t.invMonthly}</label>
                    <div className="field-input-wrap">
                      <input type="text" inputMode="numeric" className="field-input"
                        value={rawOr('invMonthly', invMonthly.toLocaleString(lang === 'cs' ? 'cs-CZ' : 'en-US'))}
                        onFocus={() => startEdit('invMonthly', String(invMonthly))}
                        onChange={(e) => updateRaw(e.target.value)}
                        onBlur={() => commitEdit('invMonthly', s => { const v = parseNum(s.trim() === '' ? '0' : s); return v !== null ? Math.min(1000000, v) : null; }, setInvMonthly)} />
                      <span className="field-unit">{t.currency}</span>
                    </div>
                    <GoldRange value={invMonthly} min={0} max={200000} step={1000} onChange={setInvMonthly} fmtLabel={(v) => v.toLocaleString(lang === 'cs' ? 'cs-CZ' : 'en-US') + ' ' + t.currency} />
                    <div className="range-meta"><span>0 {t.currency}</span><span>200 000 {t.currency}</span></div>
                  </div>
                  <div>
                    <label className="field-label">{t.invRate}</label>
                    <div className="field-input-wrap">
                      <input type="text" inputMode="decimal" className="field-input"
                        value={rawOr('invRate', String(invRate).replace('.', lang === 'cs' ? ',' : '.'))}
                        onFocus={() => startEdit('invRate', String(invRate))}
                        onChange={(e) => updateRaw(e.target.value)}
                        onBlur={() => commitEdit('invRate', parseDec, v => setInvRate(Math.min(30, v)))} />
                      <span className="field-unit">% p.a.</span>
                    </div>
                    <GoldRange value={invRate} min={1} max={20} step={0.5} onChange={setInvRate} fmtLabel={(v) => v + " %"} />
                    <div className="range-meta"><span>1 %</span><span>20 %</span></div>
                  </div>
                  <div>
                    <label className="field-label">{t.invYears}</label>
                    <div className="field-input-wrap">
                      <input type="text" inputMode="numeric" className="field-input"
                        value={rawOr('invYears', String(invYears))}
                        onFocus={() => startEdit('invYears', String(invYears))}
                        onChange={(e) => updateRaw(e.target.value)}
                        onBlur={() => commitEdit('invYears', s => { const v = parseNum(s); return v && v >= 1 ? Math.min(50, v) : null; }, setInvYears)} />
                      <span className="field-unit">{lang === 'cs' ? 'let' : 'yrs'}</span>
                    </div>
                    <GoldRange value={invYears} min={1} max={40} step={1} onChange={setInvYears} fmtLabel={(v) => v + (lang === 'cs' ? ' let' : ' yrs')} />
                    <div className="range-meta"><span>{lang === 'cs' ? '1 rok' : '1 yr'}</span><span>{lang === 'cs' ? '40 let' : '40 yrs'}</span></div>
                  </div>
                  <div>
                    <label className="field-label">{t.invInit}</label>
                    <div className="field-input-wrap">
                      <input type="text" inputMode="numeric" className="field-input" placeholder="0"
                        value={rawOr('invInit', invInit > 0 ? invInit.toLocaleString(lang === 'cs' ? 'cs-CZ' : 'en-US') : '')}
                        onFocus={() => startEdit('invInit', invInit > 0 ? String(invInit) : '')}
                        onChange={(e) => updateRaw(e.target.value)}
                        onBlur={() => {
                          const v = parseNum(editField?.key === 'invInit' ? editField.raw : '') ?? 0;
                          if (v <= 0) { setInvInitPos(0); } else {
                            const pos = Math.round(1 + (Math.log10(Math.max(1000, v) / 1000) / Math.log10(50000)) * 99);
                            setInvInitPos(Math.max(0, Math.min(100, pos)));
                          }
                          setEditField(null);
                        }} />
                      <span className="field-unit">{t.currency}</span>
                    </div>
                    <GoldRange value={invInitPos} min={0} max={100} step={1} onChange={setInvInitPos} fmtLabel={() => invInit > 0 ? invInit.toLocaleString(lang === 'cs' ? 'cs-CZ' : 'en-US') + ' ' + t.currency : "0"} />
                    <div style={{ position: "relative", height: 18, marginTop: 2 }}>
                      {([
                        { pos: 0, label: "0" },
                        { pos: 22, label: "10 000" },
                        { pos: 43, label: "100 000" },
                        { pos: 64, label: "1 mil." },
                        { pos: 85, label: "10 mil." },
                        { pos: 100, label: "50 mil." },
                      ] as { pos: number; label: string }[]).map(({ pos, label }) => (
                        <span key={pos} className={pos === 85 ? "scale-mid" : undefined} style={{
                          position: "absolute",
                          left: `${pos}%`,
                          transform: pos === 100 ? "translateX(-100%)" : pos > 0 ? "translateX(-50%)" : "none",
                          fontSize: 10,
                          color: "var(--text-3)",
                          whiteSpace: "nowrap",
                        }}>{label}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="calc-result">
                  <div className="calc-result-top">
                    <ArcRing pct={Math.min(100, iDep > 0 ? (iProfit / iFv) * 100 : 0)} label={iDep > 0 ? (iFv / iDep).toFixed(1).replace('.', ',') + "×" : "—"} />
                    <div className="calc-result-numbers">
                      <div className="result-label">
                        {t.invResultLabel}
                      </div>
                      <div className="result-big">
                        {iFv >= 10_000_000
                          ? <>{(Math.round(iFv / 100_000) / 10).toLocaleString(lang === 'cs' ? 'cs-CZ' : 'en-US')}<small>{t.invMillSuffix}</small></>
                          : <>{Math.round(iFv).toLocaleString(lang === 'cs' ? 'cs-CZ' : 'en-US')}<small>{t.currency}</small></>}
                      </div>
                      {iFv >= 10_000_000 && <p className="result-presne">{t.invExact} {fmt(iFv, lang)} {t.currency}</p>}
                      {(() => {
                        const invRenta = Math.round((iFv / 1_000_000) * 5_000 / 100) * 100
                        const invRentaStr = invRenta.toLocaleString(lang === 'cs' ? 'cs-CZ' : 'en-US') + ' ' + t.currency
                        return invRenta > 0 ? (
                          <div className="inv-renta">
                            <p className="inv-renta-num">≈ {invRentaStr} <span>{t.invRentaMonth}</span></p>
                            <p className="inv-renta-hint">{t.invRentaHint}</p>
                            <button type="button" className="link-gold" onClick={() => setCalcTab('retirement')}>
                              {t.invRentaCta}
                            </button>
                            <a className="link-gold" href="/renta" style={{ display: 'block', marginTop: 12 }}>{t.rentaMore}</a>
                          </div>
                        ) : null
                      })()}
                    </div>
                  </div>
                  <GrowthChart key={`${invMonthly}-${invRate}-${invYears}-${invInit}`} monthly={invMonthly} rate={invRate} years={invYears} init={invInit} />
                  <div className="cmp-bars">
                    {([
                      { label: lang === "cs" ? "Průměrný investor, 20 let" : "Average investor, 20 yrs", pct: 3.6, max: 10, cls: "cmp-fill-avg" },
                      { label: lang === "cs" ? "Akciový trh, 20 let" : "Stock market, 20 yrs", pct: 10, max: 10, cls: "cmp-fill-mkt" },
                    ] as { label: string; pct: number; max: number; cls: string }[]).map((row) => (
                      <div key={row.cls} className="cmp-bar-row">
                        <div className="cmp-bar-meta">
                          <span className="cmp-bar-label">{row.label}</span>
                          <span className="cmp-bar-pct">{row.pct.toLocaleString("cs-CZ")} %</span>
                        </div>
                        <div className="cmp-bar-track">
                          <div className={`cmp-bar-fill ${row.cls}`} style={{ width: `${(row.pct / row.max) * 100}%` }} />
                        </div>
                      </div>
                    ))}
                    <p className="cmp-note">{lang === "cs"
                      ? "Průměrný investor: DALBAR QAIB 2023 (průměrný roční výnos akciových podílových fondů za 20 let). Akciový trh: S&P 500 historický průměr. Čísla jsou ilustrativní."
                      : "Average investor: DALBAR QAIB 2023 (avg. annual equity fund return over 20 yrs). Stock market: S&P 500 historical average. Numbers are illustrative."
                    }</p>
                  </div>
                  <div className="calc-cta">
                    <div className="calc-cta-text">
                      <b>{lang === "cs" ? "Co to znamená pro vás?" : "What does this mean for you?"}</b>
                      <span>{lang === "cs" ? "Projdeme čísla spolu za 30 minut." : "We'll walk through your numbers in 30 minutes."}</span>
                    </div>
                    <a
                      href={`/konzultace?vklad=${invMonthly}&init=${invInit}&roky=${invYears}&vynosnost=${invRate}`}
                      className="calc-cta-btn"
                    >
                      {lang === "cs" ? "Zahájit rozhovor" : "Start the conversation"}
                    </a>
                  </div>
                  <p className="calc-disc">
                    {lang === "cs"
                      ? "Ilustrační výpočet, ne předpověď. Výnosy dosažené v minulosti nejsou zárukou výnosů budoucích."
                      : "Illustrative calculation, not a forecast. Past performance does not guarantee future returns."}
                  </p>
                  <div className="result-divider" />
                  <div className="result-row"><span className="result-row-k">{t.invDep}</span><span className="result-row-v">{fmt(iDep, lang)} {t.currency}</span></div>
                  <div className="result-row"><span className="result-row-k">{t.invProfit}</span><span className="result-row-v pos">{fmt(iProfit, lang)} {t.currency}</span></div>
                </div>
              </div>

              {/* Mortgage panel */}
              <div className={`calc-panel${calcTab === "mortgage" ? " active" : ""}`}>
                <div className="calc-inputs">
                  <div>
                    <label className="field-label">{t.mtgAmt}</label>
                    <div className="presets">
                      {[2000000, 4000000, 6000000, 8000000].map(v => (
                        <button key={v} type="button" className={mtgAmt === v ? "on" : ""} onClick={() => setMtgAmt(v)}>{v / 1000000} mil.</button>
                      ))}
                    </div>
                    <div className="field-input-wrap">
                      <input type="text" inputMode="numeric" className="field-input"
                        value={rawOr('mtgAmt', mtgAmt.toLocaleString(lang === 'cs' ? 'cs-CZ' : 'en-US'))}
                        onFocus={() => startEdit('mtgAmt', String(mtgAmt))}
                        onChange={(e) => updateRaw(e.target.value)}
                        onBlur={() => commitEdit('mtgAmt', s => { const v = parseNum(s); return v && v >= 100000 ? Math.min(20000000, v) : null; }, setMtgAmt)} />
                      <span className="field-unit">{t.currency}</span>
                    </div>
                    <GoldRange value={mtgAmt} min={500000} max={20000000} step={100000} onChange={setMtgAmt} fmtLabel={(v) => (v / 1000000).toLocaleString((lang === 'cs' ? 'cs-CZ' : 'en-US'), { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + ' mil. ' + t.currency} />
                    <div className="range-meta"><span>500 000</span><span>20 mil.</span></div>
                  </div>
                  <div>
                    <label className="field-label">{t.mtgRate}</label>
                    <div className="field-input-wrap">
                      <input type="text" inputMode="decimal" className="field-input"
                        value={rawOr('mtgRate', String(mtgRate).replace('.', lang === 'cs' ? ',' : '.'))}
                        onFocus={() => startEdit('mtgRate', String(mtgRate))}
                        onChange={(e) => updateRaw(e.target.value)}
                        onBlur={() => commitEdit('mtgRate', parseDec, v => setMtgRate(Math.min(20, v)))} />
                      <span className="field-unit">% p.a.</span>
                    </div>
                    <GoldRange value={mtgRate} min={1} max={15} step={0.1} onChange={setMtgRate} fmtLabel={(v) => v.toLocaleString((lang === 'cs' ? 'cs-CZ' : 'en-US'), { maximumFractionDigits: 1 }) + " %"} />
                    <div className="range-meta"><span>1 %</span><span>15 %</span></div>
                  </div>
                  <div>
                    <label className="field-label">{t.mtgTerm}</label>
                    <div className="field-input-wrap">
                      <input type="text" inputMode="numeric" className="field-input"
                        value={rawOr('mtgYrs', String(mtgYrs))}
                        onFocus={() => startEdit('mtgYrs', String(mtgYrs))}
                        onChange={(e) => updateRaw(e.target.value)}
                        onBlur={() => commitEdit('mtgYrs', s => { const v = parseNum(s); return v && v >= 1 ? Math.min(40, v) : null; }, setMtgYrs)} />
                      <span className="field-unit">{lang === 'cs' ? 'let' : 'yrs'}</span>
                    </div>
                    <GoldRange value={mtgYrs} min={5} max={40} step={1} onChange={setMtgYrs} fmtLabel={(v) => v + (lang === 'cs' ? ' let' : ' yrs')} />
                    <div className="range-meta"><span>{lang === 'cs' ? '5 let' : '5 yrs'}</span><span>{lang === 'cs' ? '40 let' : '40 yrs'}</span></div>
                  </div>
                </div>
                <div className="calc-result">
                  <div className="result-label">{t.mtgResultLabel}</div>
                  <div className="result-big"><SlotNum key={fmt(mMo, lang)} value={fmt(mMo, lang)} /> <span>{t.currency}</span></div>
                  <div className="result-divider" />
                  <div className="result-row"><span className="result-row-k">{t.mtgTotal}</span><span className="result-row-v">{fmt(mTotal, lang)} {t.currency}</span></div>
                  <div className="result-row"><span className="result-row-k">{t.mtgInt}</span><span className="result-row-v neg">{fmt(mInt, lang)} {t.currency}</span></div>
                  <div className="result-row"><span className="result-row-k">{t.mtgPct}</span><span className="result-row-v">{mtgAmt > 0 ? mPct.toLocaleString((lang === 'cs' ? 'cs-CZ' : 'en-US'), { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + " %" : "0 %"}</span></div>
                  <div className="progress-track"><div className="progress-fill" style={{ width: Math.min(100, mPct) + "%", background: mBarColor }} /></div>
                </div>
              </div>
              {/* Retirement panel */}
              <div className={`calc-panel${calcTab === "retirement" ? " active" : ""}`}>
                <div className="calc-inputs">
                  <div>
                    <label className="field-label">{t.retDesiredLabel}</label>
                    <div className="field-input-wrap">
                      <input type="text" inputMode="numeric" className="field-input"
                        value={rawOr('retDesiredPension', retDesiredPension.toLocaleString(lang === 'cs' ? 'cs-CZ' : 'en-US'))}
                        onFocus={() => startEdit('retDesiredPension', String(retDesiredPension))}
                        onChange={(e) => updateRaw(e.target.value)}
                        onBlur={() => commitEdit('retDesiredPension', s => { const v = parseNum(s); return v && v >= 1000 ? Math.min(1000000, v) : null; }, setRetDesiredPension)} />
                      <span className="field-unit">{t.currency}</span>
                    </div>
                    <GoldRange value={retDesiredPension} min={15000} max={1_000_000} step={5000} onChange={setRetDesiredPension} fmtLabel={(v) => v >= 1_000_000 ? '1 mil. ' + t.currency : v.toLocaleString(lang === 'cs' ? 'cs-CZ' : 'en-US') + ' ' + t.currency} logStep={(v) => v < 100_000 ? 1_000 : v < 500_000 ? 5_000 : 50_000} />
                    <div className="range-meta"><span>15 000 {t.currency}</span><span>1 000 000 {t.currency}</span></div>
                  </div>
                  <div>
                    <label className="field-label">{t.retAgeLabel}</label>
                    <div className="field-input-wrap">
                      <input type="text" inputMode="numeric" className="field-input"
                        value={rawOr('retAge', String(retAge))}
                        onFocus={() => startEdit('retAge', String(retAge))}
                        onChange={(e) => updateRaw(e.target.value)}
                        onBlur={() => commitEdit('retAge', s => { const v = parseNum(s); return v ? Math.min(64, Math.max(20, v)) : null; }, setRetAge)} />
                      <span className="field-unit">{lang === "cs" ? "let" : "yrs"}</span>
                    </div>
                    <GoldRange value={retAge} min={20} max={64} step={1} onChange={setRetAge} fmtLabel={(v) => v + " let"} />
                    <div className="range-meta"><span>20</span><span>64, {retYears} {t.retYrsToRet}</span></div>
                  </div>
                  <div>
                    <label className="field-label">{t.retMissingYrsLabel}</label>
                    <div className="field-input-wrap">
                      <input type="text" inputMode="numeric" className="field-input"
                        value={rawOr('retMissingYears', String(retMissingYears))}
                        onFocus={() => startEdit('retMissingYears', String(retMissingYears))}
                        onChange={(e) => updateRaw(e.target.value)}
                        onBlur={() => commitEdit('retMissingYears', s => { const v = parseInt(s, 10); return isNaN(v) ? null : Math.min(15, Math.max(0, v)); }, setRetMissingYears)} />
                      <span className="field-unit">{lang === "cs" ? "let" : "yrs"}</span>
                    </div>
                    <GoldRange value={retMissingYears} min={0} max={15} step={1} onChange={setRetMissingYears} fmtLabel={(v) => v + (lang === 'cs' ? ' let' : '')} />
                    <div className="range-meta"><span>0</span><span>15{lang === 'cs' ? ' let' : ''} (−{fmt(15 * 480, lang)} {t.currency}/{lang === 'cs' ? 'měs.' : 'mo.'})</span></div>
                  </div>
                  <div>
                    <label className="field-label">{t.retCurrentSavLabel}</label>
                    <div className="field-input-wrap">
                      <input type="text" inputMode="numeric" className="field-input" placeholder="0"
                        value={rawOr('retCurrentSavings', retCurrentSavings > 0 ? retCurrentSavings.toLocaleString(lang === 'cs' ? 'cs-CZ' : 'en-US') : '')}
                        onFocus={() => startEdit('retCurrentSavings', retCurrentSavings > 0 ? String(retCurrentSavings) : '')}
                        onChange={(e) => updateRaw(e.target.value)}
                        onBlur={() => { const v = parseNum(editField?.key === 'retCurrentSavings' ? editField.raw : '') ?? 0; setRetCurrentSavings(Math.min(5000000, v)); setEditField(null); }} />
                      <span className="field-unit">{t.currency}</span>
                    </div>
                    <GoldRange value={retCurrentSavings} min={0} max={5000000} step={50000} onChange={setRetCurrentSavings} fmtLabel={(v) => v === 0 ? "0" : (v / 1000).toFixed(0) + (lang === 'cs' ? ' tis. Kč' : 'k CZK')} />
                    <div className="range-meta"><span>0</span><span>5 mil.</span></div>
                  </div>
                  <div>
                    <label className="field-label">{t.retMonthlySavLabel}</label>
                    <div className="presets">
                      {[1000, 3000, 5000, 10000].map(v => (
                        <button key={v} type="button" className={retMonthlySavings === v ? "on" : ""} onClick={() => setRetMonthlySavings(v)}>{v.toLocaleString(lang === 'cs' ? 'cs-CZ' : 'en-US')} {t.currency}</button>
                      ))}
                    </div>
                    <div className="field-input-wrap">
                      <input type="text" inputMode="numeric" className="field-input"
                        value={rawOr('retMonthlySavings', retMonthlySavings.toLocaleString(lang === 'cs' ? 'cs-CZ' : 'en-US'))}
                        onFocus={() => startEdit('retMonthlySavings', String(retMonthlySavings))}
                        onChange={(e) => updateRaw(e.target.value)}
                        onBlur={() => { const v = parseNum(editField?.key === 'retMonthlySavings' ? editField.raw : '') ?? 0; setRetMonthlySavings(Math.min(50000, v)); setEditField(null); }} />
                      <span className="field-unit">{t.currency}</span>
                    </div>
                    <GoldRange value={retMonthlySavings} min={0} max={50000} step={1000} onChange={setRetMonthlySavings} fmtLabel={(v) => v.toLocaleString(lang === 'cs' ? 'cs-CZ' : 'en-US') + ' ' + t.currency} />
                    <div className="range-meta"><span>0</span><span>50 000 {t.currency}</span></div>
                  </div>
                </div>
                <div className="calc-result">
                  <p className="result-label">{t.retResultLabel}</p>
                  <p className="result-big">
                    {pKc(pStat + pPort)} <small style={{ fontSize: '0.55em', color: 'rgba(245,242,236,.6)', fontWeight: 400 }}>{t.retOfTarget} {pKc(pCil)}</small>
                  </p>
                  <div className="renta">
                    <i className="stat" style={{ width: pSirka(pStat) }}>{t.retStateBar} {pCislo(pStat)}</i>
                    <i className="port" style={{ width: pSirka(pPort) }}>Portfolio {pCislo(pPort)}</i>
                    {pChybi > 0 && <i className="chybi" style={{ width: pSirka(pChybi) }} />}
                  </div>
                  {pChybi > 0 && (
                    <p className="calc-hint">
                      {lang === 'cs'
                        ? <>Chybějících {pKc(pChybi)} dorovnáte, když budete spořit o {pKc(pDoplatek)} měsíčně víc.</>
                        : <>You're short {pKc(pChybi)}. Saving an extra {pKc(pDoplatek)} per month closes the gap.</>}
                    </p>
                  )}
                  {pChybi === 0 && (
                    <p className="calc-hint" style={{ color: 'var(--good, #2f6b4f)' }}>
                      {t.retOnTrack}
                    </p>
                  )}
                  <a className="link-gold" href="/renta" style={{ display: 'inline-block', marginTop: 14 }}>{t.rentaMore}</a>
                  <p style={{ fontSize: 11, color: "var(--text-3)", marginTop: 16, lineHeight: 1.55 }}>{t.retDisclaimer}</p>
                </div>
              </div>

              {/* Depletion tab */}
              {calcTab === 'depletion' && (
                <div className="calc-cols">
                  <div className="calc-inputs">
                    <div>
                      <label className="field-label">{t.decAssets} <span className="field-val">{(Math.round(decMajetek / 100_000) / 10).toLocaleString(lang === 'cs' ? 'cs-CZ' : 'en-US')} {t.invMillSuffix}</span></label>
                      <GoldRange value={decMajetek} min={500_000} max={50_000_000} step={500_000} onChange={setDecMajetek} fmtLabel={(v) => (Math.round(v / 100_000) / 10).toLocaleString(lang === 'cs' ? 'cs-CZ' : 'en-US') + ' mil.'} />
                      <div className="range-meta"><span>{lang === 'cs' ? '0,5 mil.' : '0.5 mil.'}</span><span>50 mil. {t.currency}</span></div>
                    </div>
                    <div>
                      <label className="field-label">{t.decWithdrawal} <span className="field-val">{decVyber.toLocaleString(lang === 'cs' ? 'cs-CZ' : 'en-US')} {t.currency}</span></label>
                      <GoldRange value={decVyber} min={5_000} max={200_000} step={1_000} onChange={setDecVyber} fmtLabel={(v) => v.toLocaleString(lang === 'cs' ? 'cs-CZ' : 'en-US')} />
                      <div className="range-meta"><span>5 000</span><span>200 000 {t.currency}</span></div>
                    </div>
                    <div>
                      <label className="field-label">{t.decReturn} <span className="field-val">{decVynos.toLocaleString(lang === 'cs' ? 'cs-CZ' : 'en-US')} %</span></label>
                      <GoldRange value={decVynos} min={0} max={10} step={0.1} onChange={setDecVynos} fmtLabel={(v) => v.toLocaleString(lang === 'cs' ? 'cs-CZ' : 'en-US') + ' %'} />
                      <div className="range-meta"><span>0 %</span><span>10 %</span></div>
                      <p className="range-note">{t.decNote}</p>
                    </div>
                    <div>
                      <label className="field-label">{t.decStartAge} <span className="field-val">{decZacatek}{t.decStartAgeSuffix ? ' ' + t.decStartAgeSuffix : ''}</span></label>
                      <GoldRange value={decZacatek} min={40} max={80} step={1} onChange={setDecZacatek} fmtLabel={(v) => v + (lang === 'cs' ? ' let' : '')} />
                      <div className="range-meta"><span>40{lang === 'cs' ? ' let' : ''}</span><span>80{lang === 'cs' ? ' let' : ''}</span></div>
                    </div>
                  </div>
                  <div className="calc-result">
                    {isFinite(decMesice) ? (
                      <>
                        <p className="result-label">{t.decResultLabel}</p>
                        <p className="result-big">
                          {decRoky} {lang === 'cs' ? tvar(decRoky, ['rok', 'roky', 'let']) : decRoky === 1 ? 'year' : 'years'}
                          {decZbyva > 0 && <span style={{ fontSize: '0.6em', opacity: .7 }}> {lang === 'cs' ? 'a' : 'and'} {decZbyva} {lang === 'cs' ? tvar(decZbyva, ['měsíc', 'měsíce', 'měsíců']) : decZbyva === 1 ? 'month' : 'months'}</span>}
                        </p>
                        <p style={{ fontSize: 13, color: 'rgba(245,242,236,.6)', margin: '0 0 16px', lineHeight: 1.5 }}>
                          {lang === 'cs'
                            ? <>Když začnete v {decZacatek}, vystačí vám do {decZacatek + decRoky}.</>
                            : <>Starting at {decZacatek}, your assets last until {decZacatek + decRoky}.</>}
                        </p>
                        <svg viewBox="0 0 200 80" className="dec-chart" preserveAspectRatio="none">
                          {(() => {
                            const maxM = Math.ceil(decMesice)
                            const pts: string[] = []
                            for (let step = 0; step <= 60; step++) {
                              const m = (step / 60) * maxM
                              const z = Math.max(0, decZustatek(m))
                              pts.push(`${(step / 60) * 200},${80 - (z / decMajetek) * 78}`)
                            }
                            return <polyline points={pts.join(' ')} fill="none" stroke="#C9A260" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                          })()}
                        </svg>
                        <div className="result-divider" />
                        <div className="result-row">
                          <span className="result-row-k">{t.dec10y}</span>
                          <span className="result-row-v">{Math.max(0, Math.round(decZustatek(120))).toLocaleString(lang === 'cs' ? 'cs-CZ' : 'en-US')} {t.currency}</span>
                        </div>
                        <div className="result-row">
                          <span className="result-row-k">{t.dec20y}</span>
                          <span className="result-row-v">{Math.max(0, Math.round(decZustatek(240))).toLocaleString(lang === 'cs' ? 'cs-CZ' : 'en-US')} {t.currency}</span>
                        </div>
                        <div className="result-row">
                          <span className="result-row-k">{t.decForeverRow}</span>
                          <span className="result-row-v">{Math.round(decNavzdy).toLocaleString(lang === 'cs' ? 'cs-CZ' : 'en-US')} {t.decPerMonth}</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <p className="result-label">{t.decResultLabel}</p>
                        <p className="result-big">{t.decForeverBig}</p>
                        <p style={{ fontSize: 13, color: 'rgba(245,242,236,.6)', margin: '0 0 16px' }}>
                          {lang === 'cs'
                            ? <>Výnos portfolia ({Math.round(decNavzdy).toLocaleString('cs-CZ')} Kč/měs.) pokryje výběr.</>
                            : <>Portfolio yield ({Math.round(decNavzdy).toLocaleString('en-US')} {t.decPerMonth}) covers your withdrawal.</>}
                        </p>
                      </>
                    )}
                    <p style={{ fontSize: 11, color: 'rgba(245,242,236,.35)', marginTop: 16, lineHeight: 1.55 }}>
                      {t.decDisc}
                    </p>
                    <a className="btn-gold" href="/konzultace" style={{ display: 'inline-block', marginTop: 14 }}>{t.decCta}</a>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
