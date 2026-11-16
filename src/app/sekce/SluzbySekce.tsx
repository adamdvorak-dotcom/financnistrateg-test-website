"use client";
import { T, type Lang } from "../texty";

/* Mřížka služeb. Na stránce Služby nese hlavní nadpis stránky (hlavni). */
export function SluzbySekce({ lang, hlavni = false }: { lang: Lang; hlavni?: boolean }) {
  const t = T[lang];
  const Nadpis = hlavni ? "h1" : "h2";
  return (
    <>
      {/* ── Services card grid ── */}
      <section id="services">
        <div className="container">
          <div className="section-header reveal-bold" data-reveal>
            <div className="section-rule" />
            <div className="section-eyebrow">{t.navServices}</div>
            <Nadpis className="section-title-lg"><span className="line"><span className="line-inner">{t.servicesTitle}</span></span></Nadpis>
            <p className="section-sub">{t.servicesSub}</p>
          </div>
          <div className="svc-grid">
            {([
              {
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>,
                title: t.s1Title, desc: t.s1Desc, items: t.s1Items,
              },
              {
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>,
                title: t.s2Title, desc: t.s2Desc, items: t.s2Items,
              },
              {
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
                title: t.s3Title, desc: t.s3Desc, items: t.s3Items,
              },
              {
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
                title: t.s4Title, desc: t.s4Desc, items: t.s4Items,
              },
            ] as { icon: React.ReactNode; title: string; desc: string; items: string[] }[]).map((svc, i) => (
              <div
                key={i}
                className={`svc-card reveal${i > 0 ? ` delay-${i}` : ""}`}
                onPointerMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
                  e.currentTarget.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
                }}
                onPointerLeave={(e) => {
                  e.currentTarget.style.setProperty('--mx', '50%');
                  e.currentTarget.style.setProperty('--my', '50%');
                }}
              >
                <div className="svc-icon">{svc.icon}</div>
                <div className="svc-card-title">{svc.title}</div>
                <p className="svc-card-desc">{svc.desc}</p>
                <button
                  className="acc-head"
                  type="button"
                  aria-expanded="false"
                  onClick={(e) => {
                    const card = e.currentTarget.closest('.svc-card') as HTMLElement;
                    const isOpen = card.classList.contains('is-open');
                    document.querySelectorAll<HTMLElement>('.svc-card.is-open').forEach(c => {
                      c.classList.remove('is-open');
                      const btn = c.querySelector('.acc-head');
                      if (btn) btn.setAttribute('aria-expanded', 'false');
                    });
                    if (!isOpen) {
                      card.classList.add('is-open');
                      e.currentTarget.setAttribute('aria-expanded', 'true');
                    }
                  }}
                >
                  <span>{lang === "cs" ? "Co zahrnuje" : "What's included"}</span>
                  <span className="acc-plus" aria-hidden="true" />
                </button>
                <div className="acc-body">
                  <div>
                    <ul className="svc-card-items">
                      {svc.items.map((item, j) => <li key={j}>{item}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
