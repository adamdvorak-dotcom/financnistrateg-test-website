"use client";
import { useEffect } from "react";
import { useLang } from "../blog/useLang";
import { SiteNav } from "../SiteNav";
import { SiteFooter } from "../SiteFooter";
import { KontaktSekce } from "../sekce/KontaktSekce";
import { useReveal } from "../sekce/useReveal";

/* Samostatná stránka Kontakt: údaje, mapa kanceláře a formulář, které byly dřív na konci úvodní stránky. */
export function Kontakt() {
  const [lang, prepni] = useLang();

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useReveal(".kt");

  return (
    <div className="kt">
      <SiteNav lang={lang} prepni={prepni} aktivni="contact" />
      <main>
        <KontaktSekce lang={lang} hlavni />
      </main>
      <SiteFooter lang={lang} />
    </div>
  );
}
