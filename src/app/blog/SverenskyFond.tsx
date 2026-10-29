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
  const [active, setActive] = useState<Role | null>("spravce");
  const on = (r: Role) => active === r;
  const tap = (r: Role) => setActive(on(r) ? null : r);

  return (
    <div className="sf-wrap">
      <div className="sf-head">
        <div>
          <span className="sf-eyebrow">Kdo je kdo</span>
          <p className="sf-title">Svěřenský fond na jednom obrázku</p>
        </div>
        <span className="sf-cta-hint">Klikněte na roli</span>
      </div>

      <svg viewBox="0 0 500 345" className="sf-svg">
        <defs>
          <marker id="sfarr" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <path d="M0,0.5 L0,5.5 L7,3.5 z" fill="rgba(201,162,96,.75)" />
          </marker>
        </defs>

        {/* Arrows */}
        <line x1="250" y1="84" x2="250" y2="113" stroke="rgba(201,162,96,.55)" strokeWidth="1.5" markerEnd="url(#sfarr)" />
        <text x="160" y="173" textAnchor="middle" fill="rgba(201,162,96,.7)" fontSize="7.5" fontFamily="Inter,sans-serif" letterSpacing="1.2">MAJETEK</text>
        <line x1="138" y1="180" x2="183" y2="180" stroke="rgba(201,162,96,.55)" strokeWidth="1.5" markerEnd="url(#sfarr)" />
        <text x="340" y="173" textAnchor="middle" fill="rgba(201,162,96,.7)" fontSize="7.5" fontFamily="Inter,sans-serif" letterSpacing="1.2">PLNĚNÍ</text>
        <line x1="317" y1="180" x2="362" y2="180" stroke="rgba(201,162,96,.55)" strokeWidth="1.5" markerEnd="url(#sfarr)" />
        <line x1="250" y1="247" x2="250" y2="286" stroke="rgba(201,162,96,.55)" strokeWidth="1.5" markerEnd="url(#sfarr)" />

        {/* Správce */}
        <g onClick={() => tap("spravce")} style={{ cursor: "pointer" }}>
          <rect x="158" y="16" width="184" height="66" rx="10"
            fill={on("spravce") ? "#1B3A5C" : "#0C1F3A"}
            stroke={on("spravce") ? "#C9A260" : "transparent"}
            strokeWidth="1.5" />
          <text x="250" y="45" textAnchor="middle" fill="#F5F2EC" fontSize="13.5" fontFamily="Lora,serif">Svěřenský správce</text>
          <text x="250" y="62" textAnchor="middle" fill="rgba(245,242,236,.5)" fontSize="9.5" fontFamily="Inter,sans-serif">spravuje majetek podle statutu</text>
        </g>

        {/* Fond circle */}
        <g onClick={() => tap("fond")} style={{ cursor: "pointer" }}>
          <circle cx="250" cy="180" r="67"
            fill="rgba(250,247,240,.97)"
            stroke={on("fond") ? "#C9A260" : "rgba(201,162,96,.5)"}
            strokeWidth={on("fond") ? 2.5 : 1.5} />
          <text x="250" y="165" textAnchor="middle" fill="rgba(201,162,96,.7)" fontSize="7.5" fontFamily="Inter,sans-serif" letterSpacing="2">SVĚŘENSKÝ FOND</text>
          <text x="250" y="184" textAnchor="middle" fill="#1A1511" fontSize="14" fontFamily="Lora,serif">majetek bez</text>
          <text x="250" y="201" textAnchor="middle" fill="#1A1511" fontSize="14" fontFamily="Lora,serif">vlastníka</text>
        </g>

        {/* Zakladatel */}
        <g onClick={() => tap("zakladatel")} style={{ cursor: "pointer" }}>
          {on("zakladatel") && <rect x="10" y="156" width="122" height="54" rx="8" fill="none" stroke="#C9A260" strokeWidth="1.5" />}
          <text x="71" y="177" textAnchor="middle" fill={on("zakladatel") ? "#7A5C35" : "#1A1511"} fontSize="14" fontFamily="Lora,serif">Zakladatel</text>
          <text x="71" y="193" textAnchor="middle" fill="#999080" fontSize="9" fontFamily="Inter,sans-serif">vyčlení majetek,</text>
          <text x="71" y="204" textAnchor="middle" fill="#999080" fontSize="9" fontFamily="Inter,sans-serif">sepíše statut</text>
        </g>

        {/* Obmyšlení */}
        <g onClick={() => tap("obmysleni")} style={{ cursor: "pointer" }}>
          {on("obmysleni") && <rect x="368" y="156" width="122" height="54" rx="8" fill="none" stroke="#C9A260" strokeWidth="1.5" />}
          <text x="429" y="177" textAnchor="middle" fill={on("obmysleni") ? "#7A5C35" : "#1A1511"} fontSize="14" fontFamily="Lora,serif">Obmyšlení</text>
          <text x="429" y="193" textAnchor="middle" fill="#999080" fontSize="9" fontFamily="Inter,sans-serif">děti, vnoučata,</text>
          <text x="429" y="204" textAnchor="middle" fill="#999080" fontSize="9" fontFamily="Inter,sans-serif">kdo je ve statutu</text>
        </g>

        {/* Dohled */}
        <g onClick={() => tap("dohled")} style={{ cursor: "pointer" }}>
          {on("dohled") && <rect x="98" y="290" width="304" height="40" rx="8" fill="none" stroke="#C9A260" strokeWidth="1.5" />}
          <text x="250" y="313" textAnchor="middle" fill={on("dohled") ? "#7A5C35" : "#1A1511"} fontSize="14" fontFamily="Lora,serif">Dohled</text>
          <text x="250" y="328" textAnchor="middle" fill="#999080" fontSize="9" fontFamily="Inter,sans-serif">zakladatel, obmyšlení, protektor</text>
        </g>
      </svg>

      {active && (
        <div className="sf-info">
          <span className="sf-dot" />
          <p><strong>{ROLE[active].nazev}.</strong> {ROLE[active].popis}</p>
        </div>
      )}
    </div>
  );
}
