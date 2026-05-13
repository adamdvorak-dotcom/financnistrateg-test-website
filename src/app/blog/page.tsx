import type { Metadata } from "next";
import Link from "next/link";
import { articles, type ArticleCategory } from "./articles";

export const metadata: Metadata = {
  title: "Blog — Adam Dvořák, Finanční Stratég",
  description:
    "Články o investicích, hypotékách, penzijním spoření a správě majetku. Srozumitelně, bez zbytečného žargonu.",
};

const categories: { id: ArticleCategory; label: string; icon: string }[] = [
  { id: "rodinny-majetek", label: "Rodinný majetek", icon: "🏛" },
  { id: "investice",       label: "Investice",       icon: "📈" },
  { id: "strategie",       label: "Strategie",        icon: "♟" },
  { id: "financovani",     label: "Financování",      icon: "🏦" },
  { id: "duchod",          label: "Důchod",           icon: "🌅" },
];

export default function BlogPage() {
  return (
    <>
      {/* ── Nav ── */}
      <nav>
        <div className="container nav-inner">
          <Link href="/" className="nav-logo">
            <span className="nav-logo-name">Adam Dvořák</span><span className="nav-logo-efa">, EFA</span>
          </Link>
          <div className="nav-right">
            <Link href="/" className="btn-primary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
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

      {/* ── Articles by category ── */}
      <main style={{ paddingBottom: 80 }}>
        <div className="container">
          <div className="blog-categories">
            {categories.map((cat) => {
              const catArticles = articles.filter((a) => a.category === cat.id);
              return (
                <div key={cat.id} className="blog-category-block">
                  <div className="blog-category-header">
                    <span className="blog-category-icon">{cat.icon}</span>
                    <h2 className="blog-category-title">{cat.label}</h2>
                  </div>
                  {catArticles.length === 0 ? (
                    <div className="blog-category-empty">
                      Články připravuji — sledujte mě brzy.
                    </div>
                  ) : (
                    <div className="blog-listing">
                      {catArticles.map((article) => (
                        <Link
                          key={article.slug}
                          href={`/blog/${article.slug}`}
                          className="blog-listing-card"
                        >
                          <div className="blog-listing-left">
                            <div className="blog-card-tag">{article.tag}</div>
                            <h3 className="blog-listing-title">{article.title}</h3>
                            <p className="blog-listing-desc">{article.desc}</p>
                          </div>
                          <div className="blog-listing-right">
                            <span className="blog-card-date">{article.date}</span>
                            <span className="blog-listing-arrow">→</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer>
        <div className="container footer-inner">
          <div className="footer-logo">Adam <span>Dvořák</span> · <span>Finanční Stratég</span></div>
          <div className="footer-copy">© 2026 Adam Dvořák, EFA. <span>Registrován u ČNB.</span></div>
          <div className="footer-links">
            <Link href="/">Hlavní stránka</Link>
            <Link href="/#contact">Kontakt</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
