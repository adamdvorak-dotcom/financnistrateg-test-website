"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useLang } from "../blog/useLang";
import { TymOrbit } from "../TymOrbit";
import { Citaty } from "../Citaty";
import { SiteNav } from "../SiteNav";
import { SiteFooter } from "../SiteFooter";
import { OMNE, vekTed } from "./texty";

/* Samostatná stránka O mně: celý příběh s podpisem, tým kolem klienta a výzva k rezervaci.
   Na úvodní stránce z ní zůstává jen krátká upoutávka. */
export function OMne() {
  const [lang, prepni] = useLang();
  const t = OMNE[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // Prvky s data-reveal dostanou třídu is-in, až dojedou na obrazovku (podpis, nadpisy).
  // Třída fx na <html> říká stylům, že sledování běží a výchozí stav smí být schovaný.
  useEffect(() => {
    const html = document.documentElement;
    const prvky = Array.from(document.querySelectorAll<HTMLElement>(".om [data-reveal]"));
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      prvky.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (zaznamy) => {
        zaznamy.forEach((z) => {
          if (!z.isIntersecting) return;
          z.target.classList.add("is-in");
          io.unobserve(z.target);
        });
      },
      { threshold: 0.35, rootMargin: "0px 0px -10% 0px" }
    );
    prvky.forEach((el) => io.observe(el));
    html.classList.add("fx");
    return () => {
      io.disconnect();
      html.classList.remove("fx");
    };
  }, []);

  return (
    <div className="om">
      <SiteNav lang={lang} prepni={prepni} aktivni="about" />

      <main>
        <section className="om-hero">
          <div className="container">
            <div className="about-wrap">
              <div className="about-photo om-in">
                <div className="about-photo-frame">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/adam-dvorak-about.jpg" alt="Adam Dvořák" />
                </div>
              </div>
              <div className="om-in om-in-2">
                <div className="section-rule" />
                <div className="section-eyebrow">{t.eye}</div>
                <h1 className="section-title-lg" style={{ marginBottom: 20 }}>
                  {t.h1a} <em>{t.h1b}</em>
                </h1>
                <p className="about-text">{t.p1(vekTed())}</p>
                <p className="about-text">{t.p2}</p>
                <p className="about-text">{t.p3}</p>
                <p className="about-text">{t.p4}</p>
                <p className="about-text">{t.p5}</p>
                <p className="about-text about-text-strong">{t.p6}</p>
                <div className="about-facts">
                  {t.fakta.map(([b, s]) => (
                    <div className="fact" key={b}>
                      <b>{b}</b>
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
                <a className="link-gold" href="https://www.linkedin.com/in/adam-dvo%C5%99%C3%A1k-efa-721479210/" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", marginTop: 20 }}>
                  {t.linkedin}
                </a>
                <span className="sign" data-reveal>
                  <span className="sign-tah">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/signature-ink.png" alt={t.podpis} width={348} height={67} />
                  </span>
                </span>
              </div>
            </div>
          </div>
        </section>

        <Citaty lang={lang} />

        <section className="tym-sekce">
          <div className="container tym-o">
            <div>
              <div className="section-eyebrow">{t.tymEye}</div>
              <h2 className="section-title-lg" style={{ marginTop: 8, marginBottom: 16 }}>
                {t.tymH2a} <em>{t.tymH2b}</em>
              </h2>
              <p className="tym-o-sub">{t.tymSub}</p>
              <ol className="tym-o-list">
                <li><i>01</i><span><b>{t.tymLi1b}</b> {t.tymLi1t}</span></li>
                <li><i>02</i><span><b>{t.tymLi2b}</b> {t.tymLi2t}</span></li>
                <li><i>03</i><span><b>{t.tymLi3b}</b> {t.tymLi3t}</span></li>
              </ol>
            </div>
            <TymOrbit lang={lang} />
          </div>
        </section>

        <section className="om-cta">
          <div className="container om-cta-in">
            <div>
              <h2>{t.ctaH}</h2>
              <p>{t.ctaP}</p>
            </div>
            <Link href="/konzultace" className="btn-primary btn-shine">
              <span>{t.ctaBtn}</span>
              <span className="btn-arrow" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M8 7h9v9" /></svg></span>
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter lang={lang} />
    </div>
  );
}
