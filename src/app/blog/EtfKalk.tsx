"use client";
import { useState } from "react";

const kc = (n: number) =>
  n.toLocaleString("cs-CZ", { maximumFractionDigits: 0 }) + " Kč";

const RETURNS = [
  { label: "5 % ročně", rate: 0.05 },
  { label: "7 % ročně", rate: 0.07 },
  { label: "9 % ročně", rate: 0.09 },
];

export function EtfKalk() {
  const [mesicne, setMesicne] = useState(5_000);
  const [roky, setRoky] = useState(20);
  const [rateIdx, setRateIdx] = useState(1);

  const r = RETURNS[rateIdx].rate / 12;
  const months = roky * 12;
  const fv = mesicne * ((Math.pow(1 + r, months) - 1) / r);
  const invested = mesicne * months;
  const profit = fv - invested;

  return (
    <div className="dipk">
      <small>Spočítejte si to</small>
      <div className="dipk-row">
        <label className="dipk-label">
          Měsíčně investuji&ensp;<strong>{kc(mesicne)}</strong>
        </label>
        <input
          type="range"
          min={500}
          max={50_000}
          step={500}
          value={mesicne}
          onChange={(e) => setMesicne(+e.target.value)}
        />
      </div>
      <div className="dipk-row">
        <label className="dipk-label">
          Horizont&ensp;<strong>{roky} let</strong>
        </label>
        <input
          type="range"
          min={5}
          max={40}
          step={1}
          value={roky}
          onChange={(e) => setRoky(+e.target.value)}
        />
      </div>
      <div className="seg">
        {RETURNS.map((ret, i) => (
          <button key={i} type="button" aria-pressed={rateIdx === i} onClick={() => setRateIdx(i)}>
            {ret.label}
          </button>
        ))}
      </div>
      <div className="dipk-out">
        <b>{kc(Math.round(fv))}</b>
        <span>hodnota portfolia za {roky} let</span>
        <span>Vložíte {kc(invested)} · Výnosy {kc(Math.round(profit))}</span>
        <span style={{ fontSize: 11, opacity: 0.55 }}>Orientační výpočet. Historické výnosy nezaručují budoucí výnosy.</span>
      </div>
    </div>
  );
}
