"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { articles } from "./blog/articles";
import { T, type Lang } from "./texty";
import { OMNE, vekTed } from "./o-mne/texty";
import { HeroRotate } from "./HeroRotate";
import { NewsletterBox } from "./NewsletterBox";
import { FazeFirmy } from "./FazeFirmy";
import { PrevRing } from "./PrevRing";
import { SiteFooter } from "./SiteFooter";

/* ── Quote band aphorisms ── */
const APHORISMS: Record<string, string[]> = {
  cs: [
    "Nejdražší poradce je ten špatný.",
    "Milionář na papíře. Nebo milionář v kapse. To není totéž.",
    "Plán není luxus. Je to rozdíl mezi třemi zdroji příjmu a jedním.",
    "Stavět důchod na exitu je jak stavět golfovou sezonu na hole in one.",
  ],
  en: [
    "The most expensive advisor is the wrong one.",
    "A millionaire on paper. Or a millionaire in the pocket. That's not the same.",
    "A plan is not a luxury. It's the difference between three income streams and one.",
    "Building your retirement on an exit is like building a golf season on a hole in one.",
  ],
};

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

  /* Form state */
  const [formState, setFormState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  /* Aphorism cycling */
  const [aphoIdx, setAphoIdx] = useState(0);
  const [aphoVis, setAphoVis] = useState(true);


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
    const h = window.location.hash;
    if (h === "#dedictvi" || h === "#druha-noha") { window.location.replace("/sluzby" + h); return; }
    // Kalkulačky mají vlastní stránku; parametry v adrese (záložka, vklad, roky…) jdou s návštěvníkem
    const q = new URLSearchParams(window.location.search);
    if (h === "#calculators" || ["kalkulacka", "vklad", "roky", "vynosnost", "init"].some((k) => q.has(k))) {
      window.location.replace("/kalkulacky" + window.location.search);
    }
  }, []);

  /* Navigace ví, kde návštěvník je: aktivní je sekce, jejíž začátek naposledy přešel přes horní třetinu
     obrazovky. V úvodu není aktivní žádná. Sekce nejsou na stránce ve stejném pořadí jako v menu. */
  useEffect(() => {
    const ids = ["services", "calculators", "about", "blog", "contact"];
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

  /* Aphorism cycle */
  useEffect(() => {
    const timer = setInterval(() => {
      setAphoVis(false);
      setTimeout(() => {
        setAphoIdx((i) => (i + 1) % APHORISMS[lang].length);
        setAphoVis(true);
      }, 700);
    }, 5700);
    return () => clearInterval(timer);
  }, [lang]);

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
          { href: "#contact", label: t.navContact },
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
              ["contact", "#contact", t.navContact],
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

      {/* ── Quote band ── */}
      <div className="quote-band band-warm" aria-live="polite">
        <div className="quote-band-inner">
          <p className={`quote-band-text${aphoVis ? " vis" : ""}`}>
            {APHORISMS[lang][aphoIdx]}
          </p>
        </div>
        <div className="quote-band-progress" aria-hidden="true">
          <div className="quote-band-fill" key={aphoIdx} />
        </div>
      </div>

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

      {/* ── Blog ── */}
      <section id="blog">
        <div className="container">
          <div className="section-header reveal-bold" data-reveal>
            <div className="section-rule" />
            <div className="section-eyebrow">{t.blogEye}</div>
            <h2 className="section-title-lg"><span className="line"><span className="line-inner">{t.blogTitle}</span></span></h2>
            <p className="blog-sub">{t.blogSub}</p>
          </div>
          <div className="blog-listing">
            {articles.slice(-3).reverse().map((article, i) => (
              <a key={article.slug} href={`/blog/${article.slug}`} className={`blog-listing-card reveal${i > 0 ? ` delay-${i}` : ""}`}>
                <div className="blog-listing-left">
                  <div className="blog-card-tag">{lang === "cs" ? article.tag : article.tagEn}</div>
                  <h3 className="blog-listing-title">{lang === "cs" ? article.title : article.titleEn}</h3>
                  <p className="blog-listing-desc">{lang === "cs" ? article.desc : article.descEn}</p>
                </div>
                <div className="blog-listing-right">
                  <span className="blog-card-date">{lang === "cs" ? article.date : article.dateEn}</span>
                  <span className="blog-listing-arrow">→</span>
                </div>
              </a>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <a href="/blog" className="btn-ghost">
              <span>{lang === "cs" ? "Všechny články" : "All articles"}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact">
        <div className="container">
          <div className="contact-wrap reveal">
            <div className="contact-left">
              <div className="section-eyebrow" style={{ marginBottom: 16 }}>{t.navContact}</div>
              <h2 className="contact-heading" data-reveal>
                <span className="line"><span className="line-inner">{lang === "cs" ? "Nekoušu." : "I don't bite."}</span></span>
                <span className="line"><span className="line-inner"><em>{lang === "cs" ? "Napište mi." : "Write to me."}</em></span></span>
              </h2>
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

      {/* ── Newsletter ── */}
      <section id="newsletter" className="section-wrap">
        <div className="container reveal">
          <NewsletterBox
            lang={lang}
            t={{ eye: t.nlEye, title: t.nlTitle, sub: t.nlSub, ph: t.nlPh, btn: t.nlBtn, sending: t.nlSending, note: t.nlNote }}
          />
        </div>
      </section>

      {/* ── Footer ── */}
      <SiteFooter lang={lang} />

      {/* ── Floating contact pill (desktop) ── */}
      <a
        href="#contact"
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
