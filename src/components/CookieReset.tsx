"use client";

// Otevře lištu se souhlasem na nastavení kategorií, kde jde volbu změnit nebo odvolat
export default function CookieReset() {
  const otevri = () => window.dispatchEvent(new Event("cookie-nastaveni"));
  return (
    <button type="button" className="link-gold" onClick={otevri} style={{ background: "none", border: 0, padding: 0, cursor: "pointer", font: "inherit" }}>
      Změnit nastavení cookies
    </button>
  );
}
