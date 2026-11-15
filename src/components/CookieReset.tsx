"use client";

// Smaže uložený souhlas s cookies, takže se při dalším načtení znovu ukáže lišta
export default function CookieReset() {
  const reset = () => {
    localStorage.removeItem("cookie_consent");
    document.cookie = "cookie_consent=; max-age=0; path=/";
    location.reload();
  };
  return (
    <button type="button" className="link-gold" onClick={reset} style={{ background: "none", border: 0, padding: 0, cursor: "pointer", font: "inherit" }}>
      Změnit nastavení cookies
    </button>
  );
}
