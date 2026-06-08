"use client";

import { useState } from "react";
import Link from "next/link";
import Script from "next/script";

type FormState = "idle" | "sending" | "sent" | "error";

export default function KonzultacePage() {
  const [formState, setFormState] = useState<FormState>("idle");

  const btnText =
    formState === "sending" ? "Odesílám…" :
    formState === "sent"    ? "✓ Odesláno!" :
    "Odeslat zprávu";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("sending");
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:    fd.get("name"),
          phone:   fd.get("phone"),
          email:   fd.get("email"),
          topic:   fd.get("topic"),
          message: fd.get("message"),
        }),
      });
      setFormState(res.ok ? "sent" : "error");
    } catch {
      setFormState("error");
    }
  }

  return (
    <>
      {/* ── Nav ── */}
      <nav>
        <div className="container nav-inner">
          <Link href="/" className="nav-logo">
            <span className="nav-logo-name">Adam Dvořák</span>
            <span className="nav-logo-efa">, EFA</span>
          </Link>
          <div className="nav-right">
            <Link href="/" className="btn-primary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              <span>Zpět na web</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section style={{ padding: "72px 0 52px" }}>
        <div className="container">
          <div className="section-eyebrow">Chci být klientem</div>
          <h1 className="section-title-lg" style={{ marginTop: 12, marginBottom: 16 }}>
            Zarezervujte si první schůzku.
          </h1>
          <p style={{ color: "var(--text-2)", fontSize: 16, maxWidth: 520, lineHeight: 1.65 }}>
            30 minut, zdarma a bez závazků. Zjistíme, jestli si rozumíme — a co by
            mohla spolupráce přinést.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 24 }}>
            {["EFA — European Financial Advisor", "Registrován u ČNB", "Praha & online"].map((b) => (
              <span key={b} style={{
                fontSize: 11, fontWeight: 600, letterSpacing: "0.07em",
                textTransform: "uppercase", color: "var(--text-3)",
                border: "1px solid var(--border)", borderRadius: 20,
                padding: "5px 12px",
              }}>{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Calendly ── */}
      <section style={{ paddingBottom: 0 }}>
        <div className="container">
          <div className="section-eyebrow" style={{ marginBottom: 20 }}>Rezervace termínu</div>
          <div
            className="calendly-inline-widget"
            data-url="https://calendly.com/dvorak-beplan/30min?hide_gdpr_banner=1"
            style={{ minWidth: 320, height: 700 }}
          />
        </div>
        <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="afterInteractive" />
      </section>

      {/* ── Contact form ── */}
      <section style={{ paddingTop: 64, paddingBottom: 80 }}>
        <div className="container">
          <div className="contact-wrap">
            <div className="contact-left">
              <div className="section-eyebrow" style={{ marginBottom: 16 }}>Kontakt</div>
              <h2 className="contact-title">
                Nebo mi<br />napište.
              </h2>
              <p className="contact-sub">
                Pokud dáváte přednost e-mailu nebo chcete sdělit víc detailů předem —
                ozvu se vám do 24 hodin.
              </p>
              <div className="contact-items">
                <div className="contact-item">
                  <div className="contact-item-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  </div>
                  <div>
                    <div className="contact-item-meta">E-mail</div>
                    <div className="contact-item-text"><a href="mailto:adamdvorak@financnistrateg.com">adamdvorak@financnistrateg.com</a></div>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-item-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.48 2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-.84a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  </div>
                  <div>
                    <div className="contact-item-meta">Telefon</div>
                    <div className="contact-item-text"><a href="tel:+420731147911">+420 731 147 911</a></div>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-item-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <div>
                    <div className="contact-item-meta">Kancelář</div>
                    <div className="contact-item-text">Salvátorská 931/8, 110 00 Praha 1</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form-wrap">
              <form onSubmit={handleSubmit}>
                <div className="form-grid">
                  <div className="form-field" style={{ marginBottom: 0 }}>
                    <label className="form-label">Jméno</label>
                    <input name="name" type="text" className="form-input" placeholder="Jan Novák" required />
                  </div>
                  <div className="form-field" style={{ marginBottom: 0 }}>
                    <label className="form-label">Telefon</label>
                    <input name="phone" type="tel" className="form-input" placeholder="+420 000 000 000" />
                  </div>
                </div>
                <div style={{ height: 12 }} />
                <div className="form-field">
                  <label className="form-label">E-mail</label>
                  <input name="email" type="email" className="form-input" placeholder="vas@email.cz" required />
                </div>
                <div className="form-field">
                  <label className="form-label">Téma</label>
                  <input name="topic" type="text" className="form-input" placeholder="Hypotéka, investice, důchod…" />
                </div>
                <div className="form-field">
                  <label className="form-label">Zpráva</label>
                  <textarea name="message" className="form-textarea" placeholder="Popište svoji situaci…" />
                </div>
                <button
                  type="submit"
                  className="form-submit"
                  disabled={formState !== "idle"}
                  style={
                    formState === "sent"  ? { background: "#22c55e" } :
                    formState === "error" ? { background: "var(--red)" } :
                    undefined
                  }
                >
                  <span>{btnText}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
                {formState === "sent" && (
                  <div style={{ marginTop: 12, padding: "14px 18px", background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.25)", borderRadius: "var(--r-sm)", color: "#22c55e", fontSize: 14, fontWeight: 500, lineHeight: 1.5 }}>
                    ✓ Děkuji! Zpráva dorazila. Ozvu se vám co nejdříve — obvykle do 24 hodin.
                  </div>
                )}
                {formState === "error" && (
                  <div style={{ marginTop: 12, padding: "12px 16px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: "var(--r-sm)", color: "var(--red)", fontSize: 13, fontWeight: 500 }}>
                    Odeslání se nezdařilo. Zkuste to prosím znovu nebo mi napište na email.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer>
        <div className="container footer-inner">
          <div className="footer-logo">Adam <span>Dvořák</span> · <span>Finanční Stratég</span></div>
          <div className="footer-copy">© 2026 Adam Dvořák, EFA. <span>Registrován u ČNB.</span></div>
          <div className="footer-links">
            <Link href="/">Hlavní stránka</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/privacy">Ochrana osobních údajů</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
