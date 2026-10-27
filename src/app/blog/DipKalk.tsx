"use client";
import { useState } from "react";

const kc = (n: number) =>
  n.toLocaleString("cs-CZ", { maximumFractionDigits: 0 }) + " Kč";

export function DipKalk() {
  const [vklad, setVklad] = useState(48_000);
  const [sazba, setSazba] = useState(0.15);
  const odpocet = Math.min(vklad, 48_000);
  const zpet = Math.round(odpocet * sazba);
  return (
    <div className="dipk">
      <small>Spočítejte si to</small>
      <div className="dipk-row">
        <label className="dipk-label">
          Kolik ročně vložíte na DIP&ensp;<strong>{kc(vklad)}</strong>
        </label>
        <input
          type="range"
          min={0}
          max={48_000}
          step={1_000}
          value={vklad}
          onChange={(e) => setVklad(+e.target.value)}
        />
      </div>
      <div className="seg">
        <button
          type="button"
          aria-pressed={sazba === 0.15}
          onClick={() => setSazba(0.15)}
        >
          Příjmy do 1&nbsp;762&nbsp;812&nbsp;Kč (15&nbsp;%)
        </button>
        <button
          type="button"
          aria-pressed={sazba === 0.23}
          onClick={() => setSazba(0.23)}
        >
          Nad 1&nbsp;762&nbsp;812&nbsp;Kč (23&nbsp;%)
        </button>
      </div>
      <div className="dipk-out">
        <b>{kc(zpet)}</b> zpátky na daních každý rok
        <span>{kc(zpet * 10)} za deset let, jen na dani. Výnos investic k&nbsp;tomu.</span>
      </div>
    </div>
  );
}
