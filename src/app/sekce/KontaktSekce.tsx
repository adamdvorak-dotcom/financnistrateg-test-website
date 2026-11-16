"use client";
import { useState } from "react";
import { T, type Lang } from "../texty";

/* Kontakt: údaje, mapa kanceláře a formulář. Přenesené z úvodní stránky beze změny. */
export function KontaktSekce({ lang, hlavni = false }: { lang: Lang; hlavni?: boolean }) {
  const t = T[lang];
  const Nadpis = hlavni ? "h1" : "h2";
  /* Form state */
  const [formState, setFormState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  /* ── Form handlers ── */
  const handleFormSubmit = async (e: { preventDefault(): void; currentTarget: HTMLFormElement }) => {
    e.preventDefault();
    if (formState !== "idle") return;
    setFormState("sending");
    const form = e.currentTarget;
    const fd = new FormData(form);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          phone: fd.get("phone"),
          email: fd.get("email"),
          topic: fd.get("topic"),
          message: fd.get("message"),
          web: fd.get("web"),
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setFormState("sent");
        form.reset();
        setTimeout(() => setFormState("idle"), 4000);
      } else {
        console.error("Chyba formuláře:", data);
        setFormState("error");
        setTimeout(() => setFormState("idle"), 4000);
      }
    } catch (err) {
      console.error("Chyba sítě:", err);
      setFormState("error");
      setTimeout(() => setFormState("idle"), 4000);
    }
  };

  const formBtnText =
    formState === "sending" ? t.formSending :
    formState === "sent" ? t.formSent :
    formState === "error" ? (lang === "cs" ? "✕ Chyba, zkuste znovu" : "✕ Error, try again") :
    t.fSubmit;

  return (
    <>
      {/* ── Contact ── */}
      <section id="contact">
        <div className="container">
          <div className="contact-wrap reveal">
            <div className="contact-left">
              <div className="section-eyebrow" style={{ marginBottom: 16 }}>{t.navContact}</div>
              <Nadpis className="contact-heading" data-reveal>
                <span className="line"><span className="line-inner">{lang === "cs" ? "Nekoušu." : "I don't bite."}</span></span>
                <span className="line"><span className="line-inner"><em>{lang === "cs" ? "Napište mi." : "Write to me."}</em></span></span>
              </Nadpis>
              <p className="contact-sub">{t.contactSub}</p>
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
                    <div className="contact-item-meta">{t.ctLocation}</div>
                    <div className="contact-item-text">{t.ctLocationVal}</div>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-item-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <div>
                    <div className="contact-item-meta">{t.ctOffice}</div>
                    <div className="contact-item-text">{t.ctOfficeVal}</div>
                  </div>
                </div>
              </div>
              {/* Office map */}
              <div className="office-map" data-reveal>
                <img src="/map-salvatorska.png" alt="Mapa okolí kanceláře" />
                <div className="pin" />
                <a className="osm" href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">© OpenStreetMap</a>
                <div className="lbl">{lang === "cs" ? "Kancelář · Salvátorská 931/8" : "Office · Salvátorská 931/8"}</div>
              </div>
              <div style={{display:"flex",gap:14,marginTop:12,flexWrap:"wrap"}}>
                <a href="https://mapy.cz/zakladni?x=14.4188&y=50.0884&z=17" target="_blank" rel="noopener noreferrer" style={{fontSize:13,color:"var(--gold)",fontWeight:500,textDecoration:"none"}}>{lang === "cs" ? "Otevřít v Mapy.cz →" : "Open in Mapy.cz →"}</a>
                <a href="https://maps.google.com/maps?q=Salvátorská+8,+110+00+Praha+1" target="_blank" rel="noopener noreferrer" style={{fontSize:13,color:"var(--text-2)",fontWeight:500,textDecoration:"none"}}>Google Maps →</a>
              </div>
            </div>

            <div className="contact-form-wrap">
              <form onSubmit={handleFormSubmit}>
                <label aria-hidden="true" style={{ position: "absolute", left: -9999, width: 1, height: 1, overflow: "hidden" }}>
                  Web<input type="text" name="web" tabIndex={-1} autoComplete="off" />
                </label>
                <div className="form-grid">
                  <div className="form-field float-field" style={{ marginBottom: 0 }}>
                    <input id="f-name" name="name" type="text" className="form-input" placeholder=" " required />
                    <label htmlFor="f-name" className="float-label">{t.fName}</label>
                  </div>
                  <div className="form-field float-field" style={{ marginBottom: 0 }}>
                    <input id="f-phone" name="phone" type="tel" className="form-input" placeholder=" " />
                    <label htmlFor="f-phone" className="float-label">{t.fPhone}</label>
                  </div>
                </div>
                <div style={{ height: 12 }} />
                <div className="form-field float-field">
                  <input id="f-email" name="email" type="email" className="form-input" placeholder=" " required />
                  <label htmlFor="f-email" className="float-label">E-mail</label>
                </div>
                <div className="form-field float-field">
                  <input id="f-topic" name="topic" type="text" className="form-input" placeholder=" " />
                  <label htmlFor="f-topic" className="float-label">{t.fTopic}</label>
                </div>
                <div className="form-field float-field float-ta">
                  <textarea id="f-message" name="message" className="form-textarea" placeholder=" " />
                  <label htmlFor="f-message" className="float-label">{t.fMsg}</label>
                </div>
                <button
                  type="submit"
                  className={`form-submit${formState === "sending" ? " is-sending" : formState === "sent" ? " is-sent" : ""}`}
                  disabled={formState !== "idle"}
                >
                  {formState === "sent" ? (
                    <>
                      <svg className="check-icon" viewBox="0 0 14 10" width="14" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 5l3.5 3.5L12 1" />
                      </svg>
                      <span>{lang === "cs" ? "Odesláno" : "Sent"}</span>
                    </>
                  ) : (
                    <>
                      <span>{formBtnText}</span>
                      {formState === "idle" && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>}
                    </>
                  )}
                </button>
                <p className="form-privacy">
                  {lang === "cs" ? "Údaje použiji jen k odpovědi na vaši zprávu. " : "I will only use your details to reply to your message. "}
                  <a href="/privacy">{lang === "cs" ? "Jak s nimi zacházím" : "How I handle them"}</a>
                </p>
                {formState === "idle" && (
                  <div className="trust" style={{marginTop:14}}>
                    <span>{lang === "cs" ? "Odpovídám do 24 hodin" : "I reply within 24 hours"}</span>
                    <span>{lang === "cs" ? "Diskrétně" : "Discreetly"}</span>
                  </div>
                )}
                {formState === "sent" && (
                  <div style={{ marginTop: 12, padding: "14px 18px", background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.25)", borderRadius: "var(--r-sm)", color: "#22c55e", fontSize: 14, fontWeight: 500, lineHeight: 1.5 }}>
                    ✓ {lang === "cs"
                      ? "Děkuji! Zpráva dorazila v pořádku. Ozvu se vám co nejdříve, obvykle do 24 hodin."
                      : "Thank you! Your message arrived safely. I'll get back to you shortly, usually within 24 hours."}
                  </div>
                )}
                {formState === "error" && (
                  <div style={{ marginTop: 12, padding: "12px 16px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: "var(--r-sm)", color: "var(--red)", fontSize: 13, fontWeight: 500 }}>
                    {lang === "cs" ? "Odeslání se nezdařilo. Zkuste to prosím znovu nebo mi napište na email." : "Sending failed. Please try again or email me directly."}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
