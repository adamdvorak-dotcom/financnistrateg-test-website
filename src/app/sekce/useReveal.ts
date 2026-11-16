"use client";
import { useEffect } from "react";

/* Postupné odkrývání sekcí na samostatných stránkách, stejně jako na úvodní stránce:
   prvky .reveal* dostanou třídu vis, prvky s data-reveal třídu is-in, jakmile dojedou na obrazovku.
   Třída fx na <html> říká stylům, že sledování běží a výchozí stav smí být schovaný. */
export function useReveal(koren: string) {
  useEffect(() => {
    const html = document.documentElement;
    const root = document.querySelector(koren);
    if (!root) return;
    const jednoduche = Array.from(root.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-bold"));
    const sData = Array.from(root.querySelectorAll("[data-reveal]"));
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      jednoduche.forEach((el) => el.classList.add("vis"));
      sData.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const obs = new IntersectionObserver(
      (zaznamy) => {
        zaznamy.forEach((z) => {
          if (!z.isIntersecting) return;
          z.target.classList.add("vis");
          obs.unobserve(z.target);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );
    jednoduche.forEach((el) => obs.observe(el));
    const io = new IntersectionObserver(
      (zaznamy) => {
        zaznamy.forEach((z) => {
          if (!z.isIntersecting) return;
          z.target.classList.add("is-in");
          io.unobserve(z.target);
        });
      },
      { threshold: 0.35, rootMargin: "0px 0px -10% 0px" }
    );
    sData.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.9 && r.bottom > 0) el.classList.add("is-in");
      else io.observe(el);
    });
    html.classList.add("fx");
    return () => {
      obs.disconnect();
      io.disconnect();
      html.classList.remove("fx");
    };
  }, [koren]);
}
