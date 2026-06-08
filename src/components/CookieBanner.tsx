"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cookie_consent")) setVisible(true);
  }, []);

  const save = (value: "accepted" | "necessary") => {
    localStorage.setItem("cookie_consent", value);
    document.cookie = `cookie_consent=${value}; max-age=31536000; path=/; SameSite=Lax`;
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-label="Souhlas s cookies">
      <div className="cookie-text">
        <div className="cookie-title">Používáme cookies</div>
        Tento web používá nezbytné cookies pro svůj provoz. Váš souhlas nám umožní
        analyzovat návštěvnost a zlepšovat obsah.{" "}
        <Link href="/privacy">Více informací</Link>
      </div>
      <div className="cookie-btns">
        <button className="cookie-btn-reject" onClick={() => save("necessary")}>
          Pouze nezbytné
        </button>
        <button className="cookie-btn-accept" onClick={() => save("accepted")}>
          Přijmout vše
        </button>
      </div>
    </div>
  );
}
