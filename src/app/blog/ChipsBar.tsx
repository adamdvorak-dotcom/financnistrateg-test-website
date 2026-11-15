"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";

export type Chip = { href: string; label: string; count: number; on: boolean };

type Rect = { x: number; y: number; w: number; h: number };

/** Poloha štítku, ze kterého se právě odchází. Přežije přechod mezi stránkami blogu, obnovení stránky ne. */
let odkud: (Rect & { t: number }) | null = null;

/**
 * Štítky kategorií s tmavým podkladem, který po kliknutí přejede z původního štítku na nový.
 * Každá kategorie je samostatná stránka, takže si polohu původního štítku pamatujeme mimo komponentu.
 * Bez JavaScriptu zůstává aktivní štítek podbarvený běžným stylem.
 */
export function ChipsBar({ items }: { items: Chip[] }) {
  const box = useRef<HTMLDivElement>(null);
  const pill = useRef<HTMLSpanElement>(null);
  const activeHref = items.find((c) => c.on)?.href;

  useLayoutEffect(() => {
    const el = box.current;
    const p = pill.current;
    if (!el || !p) return;
    const on = el.querySelector<HTMLElement>("a.on");
    if (!on) return;

    const target = (): Rect => ({ x: on.offsetLeft, y: on.offsetTop, w: on.offsetWidth, h: on.offsetHeight });
    const place = (r: Rect, animate: boolean) => {
      p.style.transition = animate ? "" : "none";
      p.style.transform = `translate(${r.x}px,${r.y}px)`;
      p.style.width = `${r.w}px`;
      p.style.height = `${r.h}px`;
    };

    // Starší záznam je z kliknutí, které nevedlo sem (třeba otevření v novém panelu).
    // Záznam se nemaže hned: ve vývojovém režimu React efekt spouští dvakrát a druhý běh by přejezd zrušil.
    const from = odkud && Date.now() - odkud.t < 3000 ? odkud : null;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (from && !reduced) {
      place(from, false);
      el.classList.add("chips-ready", "chips-anim");
      void p.offsetWidth; // vynutí vykreslení výchozí polohy, jinak by se přejezd neodehrál
      place(target(), true);
    } else {
      place(target(), false);
      el.classList.add("chips-ready");
    }

    const snap = () => place(target(), false);
    window.addEventListener("resize", snap);
    // Po dojetí už podklad jen drží polohu; dorovnání po načtení písma nesmí přejezd přerušit
    const done = () => el.classList.remove("chips-anim");
    p.addEventListener("transitionend", done);
    document.fonts?.ready
      .then(() => {
        if (!el.classList.contains("chips-anim")) snap();
      })
      .catch(() => {});
    return () => {
      window.removeEventListener("resize", snap);
      p.removeEventListener("transitionend", done);
      el.classList.remove("chips-anim");
    };
  }, [activeHref]);

  const remember = () => {
    const on = box.current?.querySelector<HTMLElement>("a.on");
    if (!on) return;
    odkud = { x: on.offsetLeft, y: on.offsetTop, w: on.offsetWidth, h: on.offsetHeight, t: Date.now() };
  };

  return (
    <div className="chips" ref={box}>
      <span className="chips-pill" ref={pill} aria-hidden="true" />
      {items.map((c) => (
        <Link
          key={c.href}
          href={c.href}
          className={c.on ? "on" : ""}
          aria-current={c.on ? "page" : undefined}
          onClick={c.on ? undefined : remember}
        >
          <span className="chips-text">
            {c.label}
            <span style={{ marginLeft: 5, opacity: 0.55, fontSize: 11 }}>{c.count}</span>
          </span>
        </Link>
      ))}
    </div>
  );
}
