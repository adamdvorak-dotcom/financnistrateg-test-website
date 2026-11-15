"use client";
import { useEffect, useRef, useState } from "react";

/* Přihlášení k newsletteru s obálkou: po úspěšném odeslání sjede lístek s e-mailem do obálky,
   klopa se zavře, obálka odletí a místo ní se ukáže poděkování. */
type Texty = { eye: string; title: string; sub: string; ph: string; btn: string; sending: string; note: string };

const T = {
  cs: {
    label: "E-mailová adresa",
    privacy: "Ochrana osobních údajů",
    listek: "Přihláška",
    hotovo: "Jste na seznamu.",
    hotovoSub: "První e-mail přijde s dalším vydáním.",
    chyba: "Přihlášení se nepovedlo. Zkuste to prosím znovu.",
    neplatny: "Zadejte prosím platný e-mail.",
  },
  en: {
    label: "Email address",
    privacy: "Privacy policy",
    listek: "Sign-up",
    hotovo: "You're on the list.",
    hotovoSub: "The first email arrives with the next issue.",
    chyba: "Sign-up failed. Please try again.",
    neplatny: "Please enter a valid email.",
  },
};

// 0 = čeká, 1 = lístek jede do obálky a obálka odlétá, 2 = poděkování
type Faze = 0 | 1 | 2;

export function NewsletterBox({ lang = "cs", t }: { lang?: "cs" | "en"; t: Texty }) {
  const [email, setEmail] = useState("");
  const [odeslany, setOdeslany] = useState("");
  const [stav, setStav] = useState<"idle" | "sending">("idle");
  const [faze, setFaze] = useState<Faze>(0);
  const [chyba, setChyba] = useState("");
  const casovac = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const x = T[lang];

  useEffect(() => () => clearTimeout(casovac.current), []);

  async function odesli(e: React.FormEvent) {
    e.preventDefault();
    if (stav !== "idle" || faze !== 0) return;
    const adresa = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(adresa)) {
      setChyba(x.neplatny);
      return;
    }
    setChyba("");
    setStav("sending");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: adresa }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setOdeslany(adresa);
      setEmail("");
      setFaze(1);
      const bezPohybu = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      casovac.current = setTimeout(() => setFaze(2), bezPohybu ? 0 : 1900);
    } catch (err) {
      console.error("Chyba newsletteru:", err);
      setChyba(x.chyba);
    }
    setStav("idle");
  }

  return (
    <div className={`nlb f${faze}`}>
      <div className="nlb-text">
        <div className="section-eyebrow">{t.eye}</div>
        <h2 className="nlb-title">{t.title}</h2>
        <p className="nlb-sub">{t.sub}</p>
        <form className="nlb-form" onSubmit={odesli} noValidate>
          <label htmlFor="nl-email" className="sr-only">{x.label}</label>
          <input
            id="nl-email"
            type="email"
            autoComplete="email"
            placeholder={t.ph}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={stav === "sending" || faze !== 0}
            aria-invalid={chyba ? true : undefined}
            aria-describedby={chyba ? "nl-chyba" : undefined}
          />
          <button type="submit" className="btn-shine" disabled={stav === "sending" || faze !== 0}>
            {stav === "sending" ? t.sending : t.btn}
          </button>
        </form>
        {chyba && <p className="nlb-chyba" id="nl-chyba" role="alert">{chyba}</p>}
        <p className="nlb-note">
          {t.note} <a href="/privacy">{x.privacy}</a>
        </p>
      </div>

      <div className="nlb-scena" aria-hidden={faze !== 2}>
        <div className="nlb-ob">
          <div className="nlb-zad" />
          <div className="nlb-klopa" />
          <div className="nlb-dopis">
            <b>{x.listek}</b>
            <span>{odeslany || email || t.ph}</span>
            <i style={{ width: "100%" }} />
            <i style={{ width: "80%" }} />
            <i style={{ width: "60%" }} />
          </div>
          <div className="nlb-pred2" />
          <div className="nlb-pred" />
        </div>
        <div className="nlb-dik" role="status">
          {faze === 2 && (
            <>
              <svg width="76" height="76" viewBox="0 0 76 76" aria-hidden="true">
                <circle cx="38" cy="38" r="34" transform="rotate(-90 38 38)" />
                <path d="M24 39l10 10 18-20" />
              </svg>
              <strong>{x.hotovo}</strong>
              <span>{x.hotovoSub}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
