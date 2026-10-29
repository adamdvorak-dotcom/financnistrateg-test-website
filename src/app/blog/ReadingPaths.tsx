"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Article {
  slug: string;
  title: string;
  readTime?: number;
}

const CESTY: { label: string; slugs: string[] }[] = [
  { label: "Mám firmu",           slugs: ["firma-a-osobni-majetek", "kolik-si-vyplacet-ze-sro", "dip-dlouhodoby-investicni-produkt"] },
  { label: "Začínám investovat",  slugs: ["financni-poduska-jak-ji-spravne-nastavit", "jak-investovat-do-etf", "trhy-padaji-co-ted"] },
  { label: "Řeším důchod",        slugs: ["jak-se-pocita-duchod-v-cr", "penzijni-sporeni-vs-investice", "osvc-duchod-proc-jste-na-tom-hur"] },
];

export function ReadingPaths({ articles }: { articles: Article[] }) {
  const [active, setActive] = useState(CESTY[0].label);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("reading-path");
      if (saved && CESTY.some((c) => c.label === saved)) setActive(saved);
    } catch {}
  }, []);

  const pick = (label: string) => {
    setActive(label);
    try { localStorage.setItem("reading-path", label); } catch {}
  };

  const cesta = CESTY.find((c) => c.label === active)!;
  const items = cesta.slugs.map((s) => articles.find((a) => a.slug === s)).filter(Boolean) as Article[];
  const totalMins = items.reduce((sum, a) => sum + (a.readTime ?? 0), 0);

  return (
    <div className="cesty">
      <div className="cesty-head">
        <span className="cesty-eyebrow">Kde začít</span>
        <div className="cesty-tabs">
          {CESTY.map((c) => (
            <button
              key={c.label}
              type="button"
              className={c.label === active ? "on" : ""}
              onClick={() => pick(c.label)}
            >
              {c.label}
            </button>
          ))}
        </div>
        <span className="cesty-time">{totalMins} min čtení</span>
      </div>
      <div className="cesty-list">
        {items.map((a, i) => (
          <Link key={a.slug} href={`/blog/${a.slug}`} className="cesty-item">
            <span className="cesty-num">{i + 1}</span>
            <span className="cesty-title">{a.title}</span>
            {a.readTime && <span className="cesty-mins">{a.readTime} min</span>}
          </Link>
        ))}
      </div>
    </div>
  );
}
