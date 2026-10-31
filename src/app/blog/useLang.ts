"use client";
import { useState, useEffect } from "react";

export type Lang = "cs" | "en";

export function useLang(): [Lang, () => void] {
  const [lang, setLang] = useState<Lang>("cs");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("lang") as Lang | null;
      if (saved === "cs" || saved === "en") setLang(saved);
    } catch {}

    const handler = () => {
      try {
        const cur = localStorage.getItem("lang") as Lang | null;
        if (cur === "cs" || cur === "en") setLang(cur);
      } catch {}
    };
    window.addEventListener("langchange", handler);
    return () => window.removeEventListener("langchange", handler);
  }, []);

  const toggle = () => {
    const next: Lang = lang === "cs" ? "en" : "cs";
    setLang(next);
    try {
      localStorage.setItem("lang", next);
      window.dispatchEvent(new Event("langchange"));
    } catch {}
  };

  return [lang, toggle];
}
