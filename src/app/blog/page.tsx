import type { Metadata } from "next";
import Link from "next/link";
import { articles, type ArticleCategory } from "./articles";

export const metadata: Metadata = {
  title: "Blog — Adam Dvořák, Finanční Stratég",
  description:
    "Články o investicích, hypotékách, penzijním spoření a správě majetku. Srozumitelně, bez zbytečného žargonu.",
};

const categories: { id: ArticleCategory; label: string; desc: string }[] = [
  {
    id: "rodinny-majetek",
    label: "Rodinný majetek",
    desc: "Svěřenské fondy, mezigenerační přenos majetku a ochrana aktiv.",
  },
  {
    id: "investice",
    label: "Investice",
    desc: "ETF, portfolia, pravidelné investování a dlouhodobý růst.",
  },
  {
    id: "strategie",
    label: "Strategie",
    desc: "Celkový pohled na finance — plánování, cíle a prioritizace.",
  },
  {
    id: "financovani",
    label: "Financování",
    desc: "Hypotéky, fixace, refinancování a úvěrová strategie.",
  },
  {
    id: "duchod",
    label: "Důchod",
    desc: "Státní důchod, třetí pilíř, DIP a příprava na penzi.",
  },
];

function articleCount(n: number) {
  if (n === 0) return "Brzy";
  if (n === 1) return "1 článek";
  if (n <= 4) return `${n} články`;
  return `${n} článků`;
}

export default function BlogPage() {
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

      {/* ── Header ── */}
      <section style={{ padding: "80px 0 48px" }}>
        <div className="container">
          <div className="section-eyebrow">Blog</div>
          <h1 className="section-title-lg" style={{ marginTop: 12, marginBottom: 16 }}>
            Finanční vzdělávání.
          </h1>
          <p style={{ color: "var(--text-2)", fontSize: 16, maxWidth: 520 }}>
            Píšu o tématech, která řeším se svými klienty — srozumitelně, bez zbytečného žargonu.
          </p>
        </div>
      </section>

      {/* ── Category tiles ── */}
      <main style={{ paddingBottom: 80 }}>
        <div className="container">
          <div className="blog-tiles">
            {categories.map((cat) => {
              const count = articles.filter((a) => a.category === cat.id).length;
              return (
                <Link key={cat.id} href={`/blog/${cat.id}`} className="blog-tile">
                  <div className="blog-tile-label">{cat.label}</div>
                  <p className="blog-tile-desc">{cat.desc}</p>
                  <div className="blog-tile-footer">
                    <span className="blog-tile-count">{articleCount(count)}</span>
                    <span className="blog-tile-arrow">→</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer>
        <div className="container footer-inner">
          <div className="footer-logo">
            Adam <span>Dvořák</span> · <span>Finanční Stratég</span>
          </div>
          <div className="footer-copy">
            © 2026 Adam Dvořák, EFA. <span>Registrován u ČNB.</span>
          </div>
          <div className="footer-links">
            <Link href="/">Hlavní stránka</Link>
            <Link href="/#contact">Kontakt</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
