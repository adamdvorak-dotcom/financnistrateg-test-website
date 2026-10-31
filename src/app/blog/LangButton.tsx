"use client";
import { useLang } from "./useLang";

export function LangButton() {
  const [lang, toggle] = useLang();
  return (
    <button className="theme-btn lang-btn" onClick={toggle} title="Switch language">
      {lang === "cs" ? "EN" : "CS"}
    </button>
  );
}
