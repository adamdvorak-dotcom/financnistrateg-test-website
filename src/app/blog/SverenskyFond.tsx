"use client";
import { useState } from "react";

const ROLE = {
  zakladatel: {
    nazev: "Zakladatel",
    popis: "Vyčlení majetek do fondu a vydá statut. Tím přestává být vlastníkem. Může být i obmyšleným, ale ne správcem.",
  },
  spravce: {
    nazev: "Svěřenský správce",
    popis: "Spravuje majetek fondu podle statutu a je zapsaný v evidenci svěřenských fondů. Majetek mu nepatří — stejně jako nepatří zakladateli ani obmyšleným. Proto je výběr správce nejdůležitější rozhodnutí celé stavby.",
  },
  fond: {
    nazev: "Svěřenský fond",
    popis: "Majetek vyčleněný do fondu nemá vlastníka. Nepatří zakladateli, správci ani obmyšleným. Je to účel, ne osoba.",
  },
  obmysleni: {
    nazev: "Obmyšlení",
    popis: "Děti, vnoučata, kdo je ve statutu. Dostávají plnění podle pravidel, která statut nastaví. Nemusí o fondu vůbec vědět.",
  },
  dohled: {
    nazev: "Dohled (protektor)",
    popis: "Zakladatel, obmyšlený nebo třetí osoba. Hlídá, aby správce dělal, co má. Není povinný, ale u větších fondů doporučovaný.",
  },
} as const;

type Role = keyof typeof ROLE;

export function SverenskyFond() {
  const [active, setActive] = useState<Role | null>(null);

  const Node = ({ role, label, className }: { role: Role; label: string; className: string }) => (
    <button
      type="button"
      className={`sf-node${active === role ? " on" : ""} ${className}`}
      onClick={() => setActive(active === role ? null : role)}
    >
      {label}
    </button>
  );

  return (
    <div className="sf-wrap">
      <div className="sf">
        <Node role="zakladatel" label="Zakladatel" className="sf-zakladatel" />
        <Node role="spravce" label="Správce" className="sf-spravce" />
        <div className="sf-fond-wrap">
          <button
            type="button"
            className={`sf-fond${active === "fond" ? " on" : ""}`}
            onClick={() => setActive(active === "fond" ? null : "fond")}
          >
            <span>Svěřenský fond</span>
            <small>majetek bez vlastníka</small>
          </button>
        </div>
        <Node role="obmysleni" label="Obmyšlení" className="sf-obmysleni" />
        <Node role="dohled" label="Dohled" className="sf-dohled" />
      </div>
      {active && (
        <div className="sf-info">
          <strong>{ROLE[active].nazev}.</strong> {ROLE[active].popis}
        </div>
      )}
      {!active && (
        <p className="sf-hint">Klikněte na roli a zjistěte víc.</p>
      )}
    </div>
  );
}
