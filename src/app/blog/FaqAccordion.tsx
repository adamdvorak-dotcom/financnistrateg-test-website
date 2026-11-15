"use client";

import { useState } from "react";

/**
 * Časté otázky jako rozbalovací seznam. Odpovědi zůstávají v HTML stránky i sbalené,
 * takže je vyhledávače čtou stejně jako dřív. První otázka je rozbalená hned.
 */
export function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="faq-acc">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.q} className={isOpen ? "faq-item open" : "faq-item"}>
            <h3>
              <button
                type="button"
                id={`faq-q-${i}`}
                aria-expanded={isOpen}
                aria-controls={`faq-a-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span>{it.q}</span>
                <span className="faq-plus" aria-hidden="true">+</span>
              </button>
            </h3>
            <div className="faq-a" id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`}>
              <div>
                <p>{it.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
