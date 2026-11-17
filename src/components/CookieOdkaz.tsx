"use client";

// Odkaz v patičce: otevře lištu se souhlasem na nastavení kategorií cookies
export function CookieOdkaz({ label }: { label: string }) {
  return (
    <button type="button" className="pata-btn" onClick={() => window.dispatchEvent(new Event("cookie-nastaveni"))}>
      {label}
    </button>
  );
}
