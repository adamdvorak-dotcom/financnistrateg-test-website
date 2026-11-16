"use client";
import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/next";
import { track } from "@vercel/analytics";

/* Měření bez cookies (Vercel Web Analytics): návštěvy stránek a kliknutí na prvky označené data-mer.
   U kliknutí se posílá jen název prvku, stránka a typ zařízení, žádný identifikátor návštěvníka. */
export function Mereni() {
  useEffect(() => {
    const naKlik = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest?.("[data-mer]");
      if (!el) return;
      track("klik", {
        co: el.getAttribute("data-mer") ?? "",
        stranka: window.location.pathname,
        zarizeni: window.innerWidth < 900 ? "mobil" : "pocitac",
      });
    };
    document.addEventListener("click", naKlik, { capture: true });
    return () => document.removeEventListener("click", naKlik, { capture: true });
  }, []);
  return <Analytics />;
}
