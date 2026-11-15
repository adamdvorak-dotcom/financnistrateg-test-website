import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "./articles";
import { ReadingPaths } from "./ReadingPaths";
import { LangButton } from "./LangButton";
import { CategoryChips } from "./CategoryChips";
import { FeaturedCard, OwnerCards, BlogListing, BlogSectionLabel } from "./BlogCards";

export const metadata: Metadata = {
  title: "Blog: Investice, DIP, Důchod, Hypotéky, Majetek",
  description:
    "Praktické články o investicích, ETF, DIP, penzijním spoření, hypotékách a správě majetku od nezávislého finančního poradce z Prahy. Srozumitelně, bez žargonu.",
  alternates: {
    canonical: "https://www.financnistrateg.com/blog",
    types: { "application/rss+xml": "https://www.financnistrateg.com/feed.xml" },
  },
};

const FEATURED = "firma-a-osobni-majetek";
const OWNER_3 = [
  "kolik-si-vyplacet-ze-sro",
  "danove-optimalizace-pro-osvc-a-jednatele",
  "vyber-penez-ze-sro-mzda-dividendy",
];

// Kategorie mají vlastní adresy /blog/<kategorie>, proto stránka nečte parametry z adresy
// a může se vygenerovat staticky.
export default function BlogPage() {
  const featured = articles.find((a) => a.slug === FEATURED)!;
  const ownerArticles = OWNER_3.map((s) => articles.find((a) => a.slug === s)!);

  const listArticles = articles
    .filter((a) => a.slug !== FEATURED && !OWNER_3.includes(a.slug))
    .slice()
    .reverse();

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
            <LangButton />
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
      <section style={{ padding: "80px 0 40px" }}>
        <div className="container">
          <div className="section-eyebrow">Blog</div>
          <h1 className="section-title-lg" style={{ marginTop: 12, marginBottom: 16 }}>
            Finanční vzdělávání.
          </h1>
          <p style={{ color: "var(--text-2)", fontSize: 16, maxWidth: 520 }}>
            Píšu o tématech, která řeším se svými klienty. Srozumitelně, bez zbytečného žargonu.
          </p>
        </div>
      </section>

      <main style={{ paddingBottom: 80 }}>
        <div className="container">

          {/* ── Category chips ── */}
          <CategoryChips active={null} />

          <ReadingPaths articles={articles.map(a => ({ slug: a.slug, title: a.title, readTime: a.readTime }))} />

          {/* ── Featured + 3-grid ── */}
          <FeaturedCard article={featured} />
          <BlogSectionLabel cs="Pro majitele firem" en="For business owners" />
          <OwnerCards articles={ownerArticles} />
          {listArticles.length > 0 && (
            <BlogSectionLabel cs="Další články" en="More articles" />
          )}

          {/* ── Article list ── */}
          <BlogListing articles={listArticles} activeCat={false} />

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
            <Link href="/konzultace">Kontakt</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
