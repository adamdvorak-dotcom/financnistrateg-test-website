"use client";
import { useState } from "react";

type Kdy = "do2012" | "od2013" | "nevim";
type Strategie = "nevim" | "konz" | "vyv" | "dyn";

const tvar = (n: number, [jeden, dva, pet]: [string, string, string]) =>
  n === 1 ? jeden : n >= 2 && n <= 4 ? dva : pet;

export function PenzijkoKalk() {
  const [kdy, setKdy] = useState<Kdy | null>(null);
  const [strategie, setStrategie] = useState<Strategie | null>(null);
  const [vek, setVek] = useState(38);

  const zbyva = Math.max(60 - vek, 0);
  const letStr = `${zbyva} ${tvar(zbyva, ["rok", "roky", "let"])}`;

  type Vysledek = { nadpis: string; text: string; kroky?: string[] } | null;

  const vysledek: Vysledek = (() => {
    if (!kdy) return null;
    if (kdy === "nevim")
      return { nadpis: "Pomůže výpis.", text: "Na výpisu je datum smlouvy i název fondu. Pošlete mi ho a řeknu vám, co s tím." };
    if (kdy === "do2012")
      return {
        nadpis: "Máte staré penzijko.",
        text: `Peníze leží v transformovaném fondu. Ten hlídá, abyste nebyli v minusu, a proto vydělává málo — často méně než inflace. Do šedesáti vám zbývá ${letStr} a na takovou dobu je to škoda peněz.`,
        kroky: [
          "Vezměte si výpis a podívejte se, kolik tam máte a jak to roste.",
          "Zvažte převod do účastnického fondu se strategií podle věku. Přijdete o garanci nuly, získáte šanci na růst.",
          "Posílejte dál aspoň 1 700 Kč měsíčně, ať berete celý státní příspěvek 340 Kč.",
        ],
      };
    if (strategie === null) return null;
    if (strategie === "konz" && zbyva > 10)
      return { nadpis: "Spoříte moc opatrně.", text: `Na ${letStr} do důchodu je konzervativní strategie brzda. Zvažte strategii odpovídající věku.` };
    return { nadpis: "Máte nové penzijko.", text: "Zkontrolujte, jestli strategie sedí k věku a jestli posíláte aspoň 1 700 Kč měsíčně, ať berete celý státní příspěvek." };
  })();

  const Opt = ({ value, label, active, onClick }: { value: string; label: string; active: boolean; onClick: () => void }) => (
    <button type="button" className={`penz-opt${active ? " on" : ""}`} onClick={onClick}>{label}</button>
  );

  return (
    <div className="penz">
      <p className="penz-eyebrow">Jaké penzijko máte?</p>

      <div className="penz-q">
        <label className="penz-label">Kdy jste uzavřeli smlouvu?</label>
        <div className="penz-opts">
          <Opt value="do2012" label="Do 30. 11. 2012" active={kdy === "do2012"} onClick={() => setKdy("do2012")} />
          <Opt value="od2013" label="Od 1. 1. 2013" active={kdy === "od2013"} onClick={() => setKdy("od2013")} />
          <Opt value="nevim" label="Nevím" active={kdy === "nevim"} onClick={() => setKdy("nevim")} />
        </div>
      </div>

      {kdy === "od2013" && (
        <div className="penz-q">
          <label className="penz-label">V jaké strategii spoříte?</label>
          <div className="penz-opts">
            <Opt value="konz" label="Konzervativní" active={strategie === "konz"} onClick={() => setStrategie("konz")} />
            <Opt value="vyv" label="Vyvážená" active={strategie === "vyv"} onClick={() => setStrategie("vyv")} />
            <Opt value="dyn" label="Dynamická" active={strategie === "dyn"} onClick={() => setStrategie("dyn")} />
            <Opt value="nevim" label="Nevím" active={strategie === "nevim"} onClick={() => setStrategie("nevim")} />
          </div>
        </div>
      )}

      {(kdy === "do2012" || kdy === "od2013") && (
        <div className="penz-q">
          <label className="penz-label">Kolik vám je let? <strong>{vek}</strong></label>
          <input type="range" min={25} max={65} step={1} value={vek} onChange={(e) => setVek(+e.target.value)} className="penz-range" />
          <div className="penz-range-meta"><span>25</span><span>65 let</span></div>
        </div>
      )}

      {vysledek && (
        <div className="penz-result">
          <p className="penz-nadpis">{vysledek.nadpis}</p>
          <p className="penz-text">{vysledek.text}</p>
          {vysledek.kroky && (
            <ol className="penz-kroky">
              {vysledek.kroky.map((k, i) => <li key={i}>{k}</li>)}
            </ol>
          )}
          <a className="penz-cta" href="mailto:adamdvorak@financnistrateg.com?subject=V%C3%BDpis%20penzijka">
            Pošlete mi výpis, řeknu vám, co s tím →
          </a>
        </div>
      )}
    </div>
  );
}
