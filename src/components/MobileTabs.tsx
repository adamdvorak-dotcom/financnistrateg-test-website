"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/* Spodní lišta na telefonu: čtyři záložky se zlatým ukazatelem, který přejíždí na tu aktivní.
   Na širších obrazovkách se neukazuje. Nahrazuje dřívější pevnou lištu s tlačítkem „Sjednat termín". */
const T = {
  cs: { nav: "Hlavní navigace", uvod: "Úvod", kalk: "Kalkulačky", blog: "Blog", termin: "Termín" },
  en: { nav: "Main navigation", uvod: "Home", kalk: "Calculators", blog: "Blog", termin: "Book" },
};

export function MobileTabs() {
  const pathname = usePathname();
  const [lang, setLang] = useState<"cs" | "en">("cs");

  // Jazyk přepíná úvodní stránka na prvku <html>; lišta ho jen sleduje
  useEffect(() => {
    const html = document.documentElement;
    const cti = () => setLang(html.lang === "en" ? "en" : "cs");
    cti();
    const mo = new MutationObserver(cti);
    mo.observe(html, { attributes: true, attributeFilter: ["lang"] });
    return () => mo.disconnect();
  }, []);

  const t = T[lang];
  const aktivni =
    pathname === "/" ? 0 : pathname.startsWith("/kalkulacky") ? 1 : pathname.startsWith("/blog") ? 2 : pathname.startsWith("/konzultace") ? 3 : -1;

  const zalozky = [
    { href: "/", label: t.uvod, ikona: <path d="M4 11l8-7 8 7v9H4z" /> },
    {
      href: "/kalkulacky",
      label: t.kalk,
      ikona: (
        <>
          <rect x="5" y="3" width="14" height="18" rx="2" />
          <path d="M9 8h6M9 13h2M13 13h2M9 17h2M13 17h2" />
        </>
      ),
    },
    {
      href: "/blog",
      label: t.blog,
      ikona: (
        <>
          <path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z" />
          <path d="M9 9h6M9 13h6" />
        </>
      ),
    },
    {
      href: "/konzultace",
      label: t.termin,
      ikona: (
        <>
          <rect x="4" y="5" width="16" height="15" rx="2" />
          <path d="M4 10h16M9 3v4M15 3v4" />
        </>
      ),
    },
  ];

  return (
    <nav className={`mtabs${aktivni < 0 ? " bez" : ""}`} aria-label={t.nav} style={{ "--i": Math.max(aktivni, 0) } as React.CSSProperties}>
      <span className="mtabs-ind" aria-hidden="true" />
      {zalozky.map((z, i) => (
        <Link key={z.href} href={z.href} className={i === aktivni ? "on" : undefined} aria-current={i === aktivni ? "page" : undefined}>
          <svg viewBox="0 0 24 24" aria-hidden="true">{z.ikona}</svg>
          {z.label}
        </Link>
      ))}
    </nav>
  );
}
