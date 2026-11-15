"use client";

import { useEffect, useState } from "react";

type Item = { id: string; text: string };

/** Adresa kapitoly z jejího nadpisu: bez diakritiky, slova spojená pomlčkou. */
function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

/**
 * Obsah článku v levém okraji stránky. Kapitoly si načte z nadpisů v textu, zvýrazňuje tu,
 * kterou čtenář právě čte, a kliknutím na ni skočí. Zobrazuje se jen na široké obrazovce,
 * kde vedle textu zbývá místo (šířku hlídají styly), a jen u článků s aspoň třemi kapitolami.
 */
export function ArticleToc() {
  const [items, setItems] = useState<Item[]>([]);
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const inner = document.querySelector<HTMLElement>(".article-inner");
    if (!inner) return;
    const heads = Array.from(inner.querySelectorAll<HTMLElement>(".article-body h2"));
    if (heads.length < 3) return;

    const used = new Set<string>();
    const list = heads.map((h, i) => {
      let id = h.id || slugify(h.textContent || "") || `kapitola-${i + 1}`;
      while (used.has(id)) id += "-2";
      used.add(id);
      h.id = id;
      return { id, text: (h.textContent || "").trim() };
    });

    let raf = 0;
    const update = () => {
      raf = 0;
      // Aktivní je poslední kapitola, jejíž nadpis už přešel přes horní třetinu obrazovky
      const line = window.innerHeight * 0.3;
      let cur = 0;
      heads.forEach((h, i) => {
        if (h.getBoundingClientRect().top <= line) cur = i;
      });
      setActive(cur);
      // Obsah je vidět od první kapitoly po konec textu článku
      const first = heads[0].getBoundingClientRect().top;
      const end = inner.getBoundingClientRect().bottom;
      setVisible(first < window.innerHeight * 0.6 && end > window.innerHeight * 0.5);
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };

    // Seznam kapitol vzniká až z hotové stránky, proto se plní po prvním vykreslení
    raf = window.requestAnimationFrame(() => {
      setItems(list);
      update();
    });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  if (items.length === 0) return null;

  return (
    <div role="navigation" className={visible ? "toc show" : "toc"} aria-label="Obsah článku">
      <div className="toc-nadpis">V tomto článku</div>
      <ol>
        {items.map((it, i) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              className={i === active ? "on" : ""}
              aria-current={i === active ? "location" : undefined}
              tabIndex={visible ? undefined : -1}
            >
              {it.text}
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}
