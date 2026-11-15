"use client";
import { useEffect, useRef } from "react";

/* Věta z článku, která při dojetí vystoupí z textu: vyroste zlatá linka, text se vysune
   a blok se na širokém displeji roztáhne přes okraj sloupce. Bez JavaScriptu je vidět rovnou. */
export function PullQuote({ a, b }: { a: string; b?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Třídy se přepínají přímo na prvku: komponenta se nepřekresluje, takže je React nepřepíše
    el.classList.add("ceka");
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        el.classList.replace("ceka", "in");
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      el.classList.remove("ceka");
    };
  }, []);

  return (
    <p ref={ref} className="pq">
      <span>{a}</span>
      {b && <> <span className="g">{b}</span></>}
    </p>
  );
}
