"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

/* Lišta se souhlasem. Tři kategorie: nezbytné (vždy), analytické (Leady) a marketingové (Google, Meta Pixel).
   Rozhodnutí se ukládá do localStorage: cookie_consent (accepted | necessary | custom), cookie_analytics a
   cookie_marketing ("1" | "0"). Kdo odsouhlasil dřívější verzi bez marketingové kategorie, uvidí lištu znovu. */
export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [nastaveni, setNastaveni] = useState(false);
  const [analytika, setAnalytika] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const ukaz = () => {
      if (localStorage.getItem("cookie_marketing") === null) {
        // Dřívější souhlas se týkal jen analytiky; předvyplníme ho, marketing zůstává vypnutý
        setAnalytika(localStorage.getItem("cookie_consent") === "accepted");
        setVisible(true);
      }
    };
    ukaz();
    // Odkaz „Nastavení cookies“ kdekoli na webu lištu znovu otevře
    const otevri = () => {
      setAnalytika(localStorage.getItem("cookie_analytics") === "1");
      setMarketing(localStorage.getItem("cookie_marketing") === "1");
      setNastaveni(true);
      setVisible(true);
    };
    window.addEventListener("cookie-nastaveni", otevri);
    return () => window.removeEventListener("cookie-nastaveni", otevri);
  }, []);

  const save = (a: boolean, m: boolean) => {
    const value = a && m ? "accepted" : !a && !m ? "necessary" : "custom";
    localStorage.setItem("cookie_consent", value);
    localStorage.setItem("cookie_analytics", a ? "1" : "0");
    localStorage.setItem("cookie_marketing", m ? "1" : "0");
    document.cookie = `cookie_consent=${value}; max-age=31536000; path=/; SameSite=Lax`;
    setVisible(false);
    setNastaveni(false);
    window.dispatchEvent(new Event("cookie-souhlas"));
  };

  if (!visible) return null;

  return (
    <div className={`cookie-banner${nastaveni ? " cookie-banner--nast" : ""}`} role="dialog" aria-label="Souhlas s cookies">
      <div className="cookie-text">
        <div className="cookie-title">Používáme cookies</div>
        Nezbytné cookies web potřebuje k provozu. S vaším souhlasem použijeme i analytické cookies
        ke zlepšování obsahu a marketingové cookies (Google, Meta) k měření reklamy.{" "}
        <Link href="/privacy">Více informací</Link>
        {nastaveni && (
          <div className="cookie-nast">
            <label><input type="checkbox" checked disabled /> <span><b>Nezbytné</b> Provoz webu, jazyk, uložení této volby.</span></label>
            <label><input type="checkbox" checked={analytika} onChange={(e) => setAnalytika(e.target.checked)} /> <span><b>Analytické</b> Které firmy web navštěvují (Leady).</span></label>
            <label><input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} /> <span><b>Marketingové</b> Měření reklamy v Googlu a na Facebooku a Instagramu.</span></label>
          </div>
        )}
      </div>
      <div className="cookie-btns">
        {nastaveni ? (
          <button className="cookie-btn-reject" onClick={() => save(analytika, marketing)}>Uložit výběr</button>
        ) : (
          <button className="cookie-btn-link" onClick={() => setNastaveni(true)}>Nastavení</button>
        )}
        <button className="cookie-btn-reject" onClick={() => save(false, false)}>Pouze nezbytné</button>
        <button className="cookie-btn-accept" onClick={() => save(true, true)}>Přijmout vše</button>
      </div>
    </div>
  );
}
