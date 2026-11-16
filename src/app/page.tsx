"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { T, type Lang } from "./texty";
import { OMNE, vekTed } from "./o-mne/texty";
import { HeroRotate } from "./HeroRotate";
import { FazeFirmy } from "./FazeFirmy";
import { PrevRing } from "./PrevRing";
import { SiteFooter } from "./SiteFooter";

/* ── Karty kalkulaček v upoutávce na úvodní stránce ── */
const KALK_KARTY: Record<Lang, [string, string, string][]> = {
  cs: [
    ["/kalkulacky", "Investice", "Kolik vám za dvacet let udělá pravidelná částka."],
    ["/kalkulacky?kalkulacka=duchod", "Důchod", "Kolik dá stát, kolik vaše peníze a co chybí."],
    ["/kalkulacky?kalkulacka=jak-dlouho", "Na jak dlouho", "Na kolik let vystačí majetek, když z něj začnete žít."],
    ["/kalkulacky?kalkulacka=hypoteka", "Hypotéka", "Měsíční splátka a kolik celkem zaplatíte na úrocích."],
  ],
  en: [
    ["/kalkulacky", "Investing", "What a regular amount turns into over twenty years."],
    ["/kalkulacky?kalkulacka=duchod", "Retirement", "What the state pays, what your money adds, and the gap."],
    ["/kalkulacky?kalkulacka=jak-dlouho", "How long it lasts", "How many years your wealth lasts once you start living off it."],
    ["/kalkulacky?kalkulacka=hypoteka", "Mortgage", "The monthly payment and the total interest you pay."],
  ],
};

export default function Page() {
  const [lang, setLang] = useState<Lang>("cs");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [curtainPhase, setCurtainPhase] = useState<"hidden" | "visible" | "exiting">("hidden");
  const [refDot, setRefDot] = useState(0);
  /* Navigace: sekce, ve které návštěvník právě je (podle ní se v menu posouvá tmavý podklad) */
  const navLinksRef = useRef<HTMLUListElement>(null);
  const [navActive, setNavActive] = useState<string | null>(null);
  const refScrollRef = useRef<HTMLDivElement>(null);
  const dustCanvasRef = useRef<HTMLCanvasElement>(null);
  const contourCanvasRef = useRef<HTMLCanvasElement>(null);

  /* Service card expand, handled imperatively to preserve reveal animation */

  /* Hero heading scramble */
  const [h1Cs1, setH1Cs1] = useState("Jeden člověk.");
  const [h1Cs2, setH1Cs2] = useState("Celý váš obraz.");
  const [h1En1, setH1En1] = useState("One advisor.");
  const [h1En2, setH1En2] = useState("The complete picture.");

  const t = T[lang];
  const omne = OMNE[lang];

  /* Load saved lang from localStorage */
  useEffect(() => {
    const savedLang = (localStorage.getItem("lang") as Lang) || "cs";
    setLang(savedLang);
  }, []);

  /* Apply lang to html element */
  useEffect(() => {
    const html = document.documentElement;
    // Třída „fx" zapíná animace při posunu stránky (karty situací, maketa plánu), proto ji tu nemažeme
    html.className = html.classList.contains("fx") ? "light fx" : "light";
    html.lang = lang;
  }, [lang]);


  /* Animated contour lines, hero left panel */
  useEffect(() => {
    const canvas = contourCanvasRef.current;
    if (!canvas || window.innerWidth < 640) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width, H = canvas.height;
    const cx = W * 0.44, cy = H * 0.52;
    const radii = [44, 86, 130, 178, 230, 288, 352, 424];
    let t = 0, raf: number;
    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.strokeStyle = "rgba(180,130,48,0.21)";
      ctx.lineWidth = 0.9;
      radii.forEach((baseR, i) => {
        const s = i * 0.83;
        ctx.beginPath();
        for (let j = 0; j <= 160; j++) {
          const a = (j / 160) * Math.PI * 2;
          const r = baseR
            + baseR * 0.11 * Math.sin(3 * a + t * 0.22 + s * 1.1)
            + baseR * 0.07 * Math.sin(5 * a + t * 0.17 + s * 0.9)
            + baseR * 0.04 * Math.cos(7 * a + t * 0.30 + s * 2.3);
          const x = cx + r * Math.cos(a), y = cy + r * Math.sin(a);
          j === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
      });
      t += 0.007;
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, []);

  /* Dust particles on curtain canvas */
  useEffect(() => {
    if (curtainPhase === "hidden") return;
    const canvas = dustCanvasRef.current;
    if (!canvas || window.innerWidth < 640) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width = window.innerWidth;
    const H = canvas.height = window.innerHeight;
    const pts = Array.from({ length: 60 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.4 + 0.4,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -(Math.random() * 0.35 + 0.05),
      a: Math.random(), da: (Math.random() * 0.006 + 0.002) * (Math.random() < 0.5 ? 1 : -1),
    }));
    let raf: number;
    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        p.a += p.da;
        if (p.a <= 0 || p.a >= 1) p.da *= -1;
        if (p.y < -8) { p.y = H + 4; p.x = Math.random() * W; }
        if (p.x < -8) p.x = W + 4;
        if (p.x > W + 8) p.x = -4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230,210,170,${Math.max(0, Math.min(1, p.a)) * 0.55})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, [curtainPhase]);

  /* Intro curtain, once per session */
  useEffect(() => {
    if (sessionStorage.getItem("curtain_shown")) return;
    sessionStorage.setItem("curtain_shown", "1");
    setCurtainPhase("visible");
    document.body.style.overflow = "hidden";
    const t1 = setTimeout(() => setCurtainPhase("exiting"), 1400);
    const t2 = setTimeout(() => {
      setCurtainPhase("hidden");
      document.body.style.overflow = "";
    }, 2350);
    return () => { clearTimeout(t1); clearTimeout(t2); document.body.style.overflow = ""; };
  }, []);

  /* Staré odkazy na sekce, které se přestěhovaly na vlastní stránky, tam návštěvníka dovedou */
  useEffect(() => {
    const presmeruj = () => {
      const h = window.location.hash;
      if (h === "#dedictvi" || h === "#druha-noha") { window.location.replace("/sluzby" + h); return; }
      // Kalkulačky mají vlastní stránku; parametry v adrese (záložka, vklad, roky…) jdou s návštěvníkem
      const q = new URLSearchParams(window.location.search);
      if (h === "#calculators" || ["kalkulacka", "vklad", "roky", "vynosnost", "init"].some((k) => q.has(k))) {
        window.location.replace("/kalkulacky" + window.location.search);
        return;
      }
      // Kontakt má vlastní stránku, články a newsletter jsou na blogu
      if (h === "#contact") window.location.replace("/kontakt");
      else if (h === "#blog") window.location.replace("/blog");
      else if (h === "#newsletter") window.location.replace("/blog#newsletter");
    };
    presmeruj();
    window.addEventListener("hashchange", presmeruj);
    return () => window.removeEventListener("hashchange", presmeruj);
  }, []);

  /* Navigace ví, kde návštěvník je: aktivní je sekce, jejíž začátek naposledy přešel přes horní třetinu
     obrazovky. V úvodu není aktivní žádná. Sekce nejsou na stránce ve stejném pořadí jako v menu. */
  useEffect(() => {
    const ids = ["services", "calculators", "about"];
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.35;
      let cur: string | null = null;
      let best = -Infinity;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= line && top > best) { best = top; cur = id; }
      }
      setNavActive(cur);
    };
    const onScroll = () => { if (!raf) raf = window.requestAnimationFrame(update); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  /* Tmavý podklad v menu se přesune pod aktivní položku. Polohu předává stylům přes proměnné,
     při změně jazyka nebo šířky okna se přeměří. */
  useEffect(() => {
    const ul = navLinksRef.current;
    if (!ul) return;
    const place = () => {
      const a = navActive ? ul.querySelector<HTMLElement>(`a[data-nav="${navActive}"]`) : null;
      ul.classList.toggle("has-active", !!a);
      if (!a) return;
      ul.style.setProperty("--nav-x", `${a.offsetLeft}px`);
      ul.style.setProperty("--nav-w", `${a.offsetWidth}px`);
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [navActive, lang]);

  /* Scroll reveal */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("vis");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );
    document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-bold").forEach((el) => obs.observe(el));

    // Effects 01 + 12: data-reveal → is-in
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revEls = document.querySelectorAll('[data-reveal]');
    if (reduced || !('IntersectionObserver' in window)) {
      revEls.forEach(el => el.classList.add('is-in'));
      return () => obs.disconnect();
    }
    // Od této chvíle smí styly schovat výchozí stav animací: sledování je připravené a prvek se určitě ukáže
    document.documentElement.classList.add('fx');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { threshold: 0.35, rootMargin: '0px 0px -10% 0px' });
    revEls.forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.9 && r.bottom > 0) el.classList.add('is-in');
      else io.observe(el);
    });
    return () => { obs.disconnect(); io.disconnect(); document.documentElement.classList.remove('fx'); };
  }, []);


  /* Ref dots, track horizontal scroll on mobile */
  useEffect(() => {
    const el = refScrollRef.current;
    if (!el) return;
    const onScroll = () => setRefDot(Math.round(el.scrollLeft / el.clientWidth));
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  /* Floating pill, show when hero leaves viewport */
  const [pillVisible, setPillVisible] = useState(false);
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const obs = new IntersectionObserver(
      ([entry]) => setPillVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  /* Nav over-dark, transparent while hero is visible */
  useEffect(() => {
    const hero = heroRef.current;
    const nav = document.querySelector("nav");
    if (!hero || !nav) return;
    nav.classList.add("over-dark");
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) nav.classList.add("over-dark");
        else nav.classList.remove("over-dark");
      },
      { threshold: 0 }
    );
    obs.observe(hero);
    return () => { obs.disconnect(); nav.classList.remove("over-dark"); };
  }, []);

  /* Nav scrolled + progress bar */
  useEffect(() => {
    const nav = document.querySelector<HTMLElement>("nav");
    const prog = document.querySelector<HTMLElement>(".progress");
    const onScroll = () => {
      if (!nav) return;
      nav.classList.toggle("scrolled", window.scrollY > 60);
      if (prog) {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        prog.style.setProperty("--p", total > 0 ? (window.scrollY / total * 100) + "%" : "0%");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Cursor glow, lerp follow */
  useEffect(() => {
    const el = document.getElementById("cursor-glow");
    if (!el) return;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let cx = tx;
    let cy = ty;
    let rafId: number;
    const onMove = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; };
    const loop = () => {
      cx += (tx - cx) * 0.07;
      cy += (ty - cy) * 0.07;
      el.style.transform = `translate(${cx - 350}px, ${cy - 350}px)`;
      rafId = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    rafId = requestAnimationFrame(loop);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(rafId); };
  }, []);

  /* Hero heading scramble, runs once on mount */
  useEffect(() => {
    const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const run = (
      target: string,
      setter: React.Dispatch<React.SetStateAction<string>>,
      startDelay: number
    ) => {
      let iid: ReturnType<typeof setInterval>;
      const tid = setTimeout(() => {
        let frame = 0;
        const FRAMES = 22;
        iid = setInterval(() => {
          frame++;
          if (frame >= FRAMES) { setter(target); clearInterval(iid); return; }
          const pct = frame / FRAMES;
          setter(
            Array.from(target).map((char, i) => {
              if (char.charCodeAt(0) > 127 || " .,!?".includes(char)) return char;
              if (i / target.length < pct) return char;
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            }).join("")
          );
        }, 42);
      }, startDelay);
      return () => { clearTimeout(tid); clearInterval(iid); };
    };
    const c1 = run("Jeden člověk.", setH1Cs1, 120);
    const c2 = run("Celý váš obraz.", setH1Cs2, 300);
    const e1 = run("One advisor.", setH1En1, 120);
    const e2 = run("The complete picture.", setH1En2, 300);
    return () => { c1(); c2(); e1(); e2(); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const heroRef = useRef<HTMLElement>(null);
  const heroInnerRef = useRef<HTMLDivElement>(null);

  /* Hero parallax, content drifts up and fades on scroll */
  useEffect(() => {
    const hero = heroRef.current;
    const inner = heroInnerRef.current;
    if (!hero || !inner) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.innerWidth < 768) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const heroH = hero.offsetHeight;
        const progress = scrollY / heroH;
        inner.style.transform = `translateY(${scrollY * 0.38}px)`;
        inner.style.opacity = String(Math.max(0, 1 - progress * 1.75));
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const vyberLang = (next: Lang) => {
    if (next === lang) return;
    setLang(next);
    localStorage.setItem("lang", next);
    window.dispatchEvent(new Event("langchange"));
    // Krátké prolnutí obsahu, aby výměna textů neproblikla
    document.body.classList.remove("lang-anim");
    void document.body.offsetWidth;
    document.body.classList.add("lang-anim");
    window.setTimeout(() => document.body.classList.remove("lang-anim"), 600);
  };

  return (
    <>
      {curtainPhase !== "hidden" && (
        <div className={`curtain${curtainPhase === "exiting" ? " curtain-exit" : ""}`} aria-hidden="true">
          <canvas ref={dustCanvasRef} className="dust-canvas" />
          <div className="curtain-wordmark">
            <span className="curtain-name">Adam Dvořák</span>
            <span className="curtain-efa">, EFA</span>
          </div>
          <div className="curtain-line" />
        </div>
      )}
      <div id="cursor-glow" aria-hidden="true" />
      {/* ── Mobile menu overlay ── */}
      <div className={`mobile-overlay${mobileOpen ? " is-open" : ""}`} aria-hidden={!mobileOpen}>
        {([
          { href: "/o-mne", label: t.navAbout },
          { href: "/sluzby", label: t.navServices },
          { href: "/kalkulacky", label: t.navCalc },
          { href: "/blog", label: t.navBlog },
          { href: "/kontakt", label: t.navContact },
        ] as { href: string; label: string }[]).map((item, i) => (
          <a key={i} href={item.href} className="mob-item"
            style={{ "--i": i } as React.CSSProperties}
            onClick={() => setMobileOpen(false)}
          >{item.label}</a>
        ))}
        <div className="mob-cta">
          <a href="/konzultace" className="btn-primary" onClick={() => setMobileOpen(false)}>
            {lang === "cs" ? "Zahájit rozhovor →" : "Start the conversation →"}
          </a>
          <a href="mailto:adamdvorak@financnistrateg.com" className="mob-contact">
            adamdvorak@financnistrateg.com
          </a>
        </div>
      </div>

      <div className="progress" aria-hidden="true" />
      {/* ── Navbar ── */}
      <nav>
        <div className="container nav-inner">
          <a href="/" className="nav-logo">
            <span className="nav-logo-name">Adam Dvořák</span><span className="nav-logo-efa">, EFA</span>
          </a>
          <ul className="nav-links" ref={navLinksRef}>
            <li className="nav-pill" aria-hidden="true" />
            {([
              ["about", "/o-mne", t.navAbout],
              ["services", "/sluzby", t.navServices],
              ["calculators", "/kalkulacky", t.navCalc],
              ["blog", "/blog", t.navBlog],
              ["contact", "/kontakt", t.navContact],
            ] as const).map(([id, href, label]) => (
              <li key={id}>
                <a href={href} data-nav={id} className={navActive === id ? "is-active" : undefined} aria-current={navActive === id ? "true" : undefined}>
                  <span>{label}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="nav-right">
            <div className={`lang-sw ${lang}`} role="group" aria-label={lang === "cs" ? "Jazyk" : "Language"}>
              <span className="lang-sw-pill" aria-hidden="true" />
              <button type="button" aria-pressed={lang === "cs"} onClick={() => vyberLang("cs")} title="Česky">CZ</button>
              <button type="button" aria-pressed={lang === "en"} onClick={() => vyberLang("en")} title="English" lang="en">EN</button>
            </div>
            <a href="/konzultace" className="btn-nav">{t.navCta}</a>
            <button className={`hamburger${mobileOpen ? " is-open" : ""}`} onClick={() => setMobileOpen(v => !v)} aria-label={lang === "cs" ? (mobileOpen ? "Zavřít menu" : "Otevřít menu") : (mobileOpen ? "Close menu" : "Open menu")} aria-expanded={mobileOpen}>
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section id="hero" ref={heroRef}>
        <div className="hero-inner" ref={heroInnerRef}>
          <div className="hero-text">
            <canvas ref={contourCanvasRef} className="hero-contour" aria-hidden="true" />
            <h1 className="hero-title" data-reveal>
              <span className="line"><span className="line-inner">{lang === "cs" ? h1Cs1 : h1En1}</span></span>
              <span className="line"><span className="line-inner"><em><HeroRotate lang={lang} first={lang === "cs" ? h1Cs2 : h1En2} /></em></span></span>
            </h1>
            <p className="hero-sub">{t.heroSub}</p>
            <div className="hero-actions">
              <a href="/konzultace" className="btn-primary btn-shine">
                <span>{t.heroCta}</span>
                <span className="btn-arrow" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M8 7h9v9"/></svg></span>
              </a>
              <a href="/financni-preventivka" className="btn-ghost">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span>{t.heroCtaProcess}</span>
              </a>
            </div>
          </div>
          <div className="hero-photo-wrap">
            <div className="hero-photo-frame">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/adam-dvorak-hero.jpg" alt="Adam Dvořák, Finanční stratég" loading="eager" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Služby v kostce: celé služby jsou na stránce /sluzby ── */}
      <section id="services">
        <div className="container">
          <div className="section-header reveal-bold" data-reveal>
            <div className="section-rule" />
            <div className="section-eyebrow">{t.navServices}</div>
            <h2 className="section-title-lg"><span className="line"><span className="line-inner">{t.servicesTitle}</span></span></h2>
            <p className="section-sub">{t.servicesSub}</p>
          </div>
          <div className="sl-teaser">
            {([[t.s1Title, t.s1Desc], [t.s2Title, t.s2Desc], [t.s3Title, t.s3Desc], [t.s4Title, t.s4Desc]] as [string, string][]).map(([title, desc], i) => (
              <Link key={title} href="/sluzby" className={`sl-karta reveal${i > 0 ? ` delay-${i}` : ""}`}>
                <span className="sl-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <b>{title}</b>
                <p>{desc}</p>
              </Link>
            ))}
          </div>
          <Link className="om-vic sl-vse" href="/sluzby">{lang === "cs" ? "Všechny služby" : "All services"} <i aria-hidden="true">→</i></Link>
        </div>
      </section>

      {/* ── Kde právě jste ── */}
      <section className="faze-sekce">
        <div className="container">
          <FazeFirmy lang={lang} />
        </div>
      </section>

      {/* ── Process ── */}
      <section id="process">
        <div className="container">
          <div className="section-header reveal-bold" data-reveal>
            <div className="section-rule" />
            <div className="section-eyebrow">{t.processEye}</div>
            <h2 className="section-title-lg"><span className="line"><span className="line-inner">{t.processTitle}</span></span></h2>
          </div>
          <div className="process-grid" data-reveal>
            <div className="process-line-fill" />
            <div className="process-step process-step--featured reveal">
              <span className="step-featured-badge">{lang === "cs" ? "Zdarma" : "Free"}</span>
              <span className="step-num">{t.step1Num}</span>
              <div className="step-title">{t.step1Title}</div>
              <div className="step-desc">{t.step1Desc}</div>
              <a href="/konzultace" className="step-cta">
                {lang === "cs" ? "Sjednat termín →" : "Book a call →"}
              </a>
            </div>
            <div className="process-step reveal delay-1">
              <span className="step-num">{t.step2Num}</span>
              <div className="step-title">{t.step2Title}</div>
              <div className="step-desc">{t.step2Desc}</div>
            </div>
            <div className="process-step reveal delay-2">
              <span className="step-num">{t.step3Num}</span>
              <div className="step-title">{t.step3Title}</div>
              <div className="step-desc">{t.step3Desc}</div>
            </div>
            <div className="process-step reveal delay-3">
              <span className="step-num">{t.step4Num}</span>
              <div className="step-title">{t.step4Title}</div>
              <div className="step-desc">{t.step4Desc}</div>
            </div>
            <div className="process-step reveal delay-4">
              <span className="step-num">{t.step5Num}</span>
              <div className="step-title">{t.step5Title}</div>
              <div className="step-desc">{t.step5Desc}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Preventivka ── */}
      <section className="section-wrap">
        <div className="container">
          <div className="prev-card">
            <div>
              <div className="section-eyebrow" style={{color:"rgba(201,162,96,.72)",marginBottom:20}}>{t.prevEye}</div>
              <h3>{t.prevH3}</h3>
              <p style={{marginTop:16}}>{t.prevP}</p>
              <a href="/financni-preventivka" className="btn-primary" style={{marginTop:32,display:"inline-flex",alignItems:"center",gap:8}}>
                <span>{t.prevCta}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>
            <PrevRing lang={lang} />
          </div>
        </div>
      </section>

      {/* ── Kalkulačky v kostce: samotné kalkulačky jsou na stránce /kalkulacky ── */}
      <section id="calculators">
        <div className="container">
          <div className="section-header reveal-bold" data-reveal>
            <div className="section-rule" />
            <div className="section-eyebrow">{t.navCalc}</div>
            <h2 className="section-title-lg"><span className="line"><span className="line-inner">{t.calcTitle}</span></span></h2>
          </div>
          <div className="sl-teaser">
            {KALK_KARTY[lang].map(([href, title, desc], i) => (
              <Link key={href} href={href} className={`sl-karta reveal${i > 0 ? ` delay-${i}` : ""}`}>
                <span className="sl-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <b>{title}</b>
                <p>{desc}</p>
              </Link>
            ))}
          </div>
          <Link className="om-vic sl-vse" href="/kalkulacky">{lang === "cs" ? "Všechny kalkulačky" : "All calculators"} <i aria-hidden="true">→</i></Link>
        </div>
      </section>

      {/* ── O mně v kostce: celý příběh a tým jsou na stránce /o-mne ── */}
      <section id="about">
        <div className="container">
          <div className="om-teaser">
            <div className="om-teaser-foto reveal-scale">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/adam-dvorak-about.jpg" alt="Adam Dvořák" loading="lazy" />
            </div>
            <div className="reveal-right" data-reveal>
              <div className="section-rule" />
              <div className="section-eyebrow">{omne.eye}</div>
              <h2 className="section-title-lg" style={{ marginBottom: 20 }}>
                <span className="line"><span className="line-inner">{omne.h1a}</span></span>
                <span className="line"><span className="line-inner">{omne.h1b}</span></span>
              </h2>
              <p className="about-text">{omne.p1(vekTed())}</p>
              <ul className="om-teaser-st">
                {omne.stitky.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
              <div className="om-teaser-dole">
                <a className="om-vic" href="/o-mne">{omne.vic} <i aria-hidden="true">→</i></a>
                {/* Skutečný podpis, který se při dojetí „napíše" zleva doprava */}
                <span className="sign" data-reveal>
                  <span className="sign-tah">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/signature-ink.png" alt={omne.podpis} width={348} height={67} loading="lazy" />
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── References ── */}
      <section id="reference">
        <div className="container">
          <div className="section-header reveal-bold" data-reveal>
            <div className="section-rule" />
            <div className="section-eyebrow">{t.refEye}</div>
            <h2 className="section-title-lg"><span className="line"><span className="line-inner">{t.refTitle}</span></span></h2>
          </div>
          <div className="ref-editorial" ref={refScrollRef}>
            {t.refs.map((r, i) => (
              <div key={i} className={`ref-editorial-card reveal${i > 0 ? ` delay-${i}` : ''}`}>
                <span className="ref-guillemet">«</span>
                <p className="ref-editorial-text">{r.text}</p>
                <div className="ref-editorial-author">{r.author}</div>
              </div>
            ))}
          </div>
          <div className="ref-dots" aria-hidden="true">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className={`ref-dot${refDot === i ? " active" : ""}`} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Booking ── */}
      <section id="booking">
        <div className="container">
          <div className="booking-split">
            <div className="booking-info reveal-bold" data-reveal>
              <div className="section-rule" />
              <div className="section-eyebrow">{lang === "cs" ? "Rezervace" : "Booking"}</div>
              <h2 className="section-title-lg">
                <span className="line"><span className="line-inner">{lang === "cs" ? "Vyberte si termín." : "Pick your slot."}</span></span>
              </h2>
            </div>
            <div className="booking-card reveal delay-1">
              <div className="bk-slot">
                <span className="bk-duration">30 min</span>
                <span className="bk-type">{lang === "cs" ? "Online / Praha" : "Online / Prague"}</span>
              </div>
              <div className="bk-heading">
                {lang === "cs" ? "Úvodní konzultace" : "Intro consultation"}
              </div>
              <p className="bk-desc">
                {lang === "cs"
                  ? "Ukážu vám, jak pracuji. Chci hlavně slyšet vás, co řešíte, co nefunguje. Primárně si musíme sednout."
                  : "I'll show you how I work. Mostly I want to hear you: what you're dealing with, what isn't working. We just need to click."}
              </p>
              {/* Termín se vybírá ve vlastním kalendáři na stránce Konzultace */}
              <a href="/konzultace#rezervace" className="btn-primary bk-btn btn-shine">
                <span>{lang === "cs" ? "Vybrat termín" : "Pick a slot"}</span>
                <span className="btn-arrow" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M8 7h9v9"/></svg></span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <SiteFooter lang={lang} />

      {/* ── Floating contact pill (desktop) ── */}
      <a
        href="/kontakt"
        className={`float-pill${pillVisible ? " show" : ""}`}
        aria-label={lang === "cs" ? "Napište mi" : "Contact me"}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
        <span className="float-pill-label">{lang === "cs" ? "Napište mi" : "Contact me"}</span>
      </a>

      {/* ── Mobile CTA bar ── */}
      <div className={`cta-bar${pillVisible ? " show" : ""}`}>
        <span className="cta-bar-text">{lang === "cs" ? "Zahájit rozhovor, první schůzka zdarma" : "Start the conversation · first meeting free"}</span>
        <a href="/konzultace" className="cta-bar-btn">{lang === "cs" ? "Sjednat termín →" : "Book a call →"}</a>
      </div>

    </>
  );
}
