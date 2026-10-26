import type { Metadata } from "next";
import Link from "next/link";
import { articles, type ArticleCategory } from "./articles";

export const metadata: Metadata = {
  title: "Blog: Investice, DIP, Důchod, Hypotéky, Majetek",
  description:
    "Praktické články o investicích, ETF, DIP, penzijním spoření, hypotékách a správě majetku od nezávislého finančního poradce z Prahy. Srozumitelně, bez žargonu.",
  alternates: { canonical: "https://www.financnistrateg.com/blog" },
};

const chips: { id: ArticleCategory | "vse"; label: string }[] = [
  { id: "vse", label: "Vše" },
  { id: "rodinny-majetek", label: "Rodinný majetek" },
  { id: "investice", label: "Investice" },
  { id: "strategie", label: "Strategie" },
  { id: "financovani", label: "Hypotéky" },
  { id: "duchod", label: "Důchod" },
];

const FEATURED = "firma-a-osobni-majetek";
const OWNER_3 = [
  "kolik-si-vyplacet-ze-sro",
  "danove-optimalizace-pro-osvc-a-jednatele",
  "nejnovejsi-trendy-v-wealth-managementu-pro-podnikatele",
];

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const { cat } = await searchParams;
  const activeCat = (cat as ArticleCategory | undefined) ?? null;

  const featured = articles.find((a) => a.slug === FEATURED)!;
  const ownerArticles = OWNER_3.map((s) => articles.find((a) => a.slug === s)!);

  const listArticles = activeCat
    ? articles.filter((a) => a.category === activeCat)
    : articles.filter((a) => a.slug !== FEATURED && !OWNER_3.includes(a.slug));

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
          <div className="chips">
            {chips.map((chip) => {
              const count =
                chip.id === "vse"
                  ? articles.length
                  : articles.filter((a) => a.category === chip.id).length;
              const isOn = chip.id === "vse" ? !activeCat : activeCat === chip.id;
              return (
                <Link
                  key={chip.id}
                  href={chip.id === "vse" ? "/blog" : `/blog?cat=${chip.id}`}
                  className={isOn ? "on" : ""}
                >
                  {chip.label}
                  <span style={{ marginLeft: 5, opacity: 0.55, fontSize: 11 }}>{count}</span>
                </Link>
              );
            })}
          </div>

          {/* ── Featured + 3-grid (no filter only) ── */}
          {!activeCat && (
            <>
              <Link href={`/blog/${featured.slug}`} className="feat" style={{ marginTop: 32 }}>
                <div style={{ padding: "52px 48px" }}>
                  <div className="blog-card-tag" style={{ color: "#C9A260", borderColor: "rgba(201,162,96,.4)" }}>
                    {featured.tag}
                  </div>
                  <h2 style={{ font: "400 36px/1.1 Lora,serif", marginTop: 14, color: "#F5F2EC" }}>
                    {featured.title}
                  </h2>
                  <p style={{ color: "rgba(245,242,236,.65)", fontSize: 15, lineHeight: 1.65, marginTop: 14, maxWidth: "44ch" }}>
                    {featured.desc}
                  </p>
                  <div style={{ marginTop: 30, fontSize: 14, fontWeight: 600, letterSpacing: ".04em", color: "#C9A260" }}>
                    Číst dál →
                  </div>
                </div>
                <div style={{
                  background: "radial-gradient(ellipse 80% 80% at 30% 50%, rgba(201,162,96,.18) 0%, transparent 65%), #0D2347",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <svg width="180" height="180" viewBox="0 0 220 220" fill="none" aria-hidden="true">
                    {[44, 72, 100, 132, 168].map((r, i) => (
                      <circle key={i} cx="110" cy="110" r={r}
                        stroke="rgba(201,162,96,.18)" strokeWidth="1"
                        strokeDasharray={`${r * 0.38} ${r * 0.22}`} />
                    ))}
                    <circle cx="110" cy="110" r="28" fill="rgba(201,162,96,.15)" stroke="#C9A260" strokeWidth="1.2" />
                    <text x="110" y="116" textAnchor="middle" fill="#C9A260"
                      style={{ font: "400 22px Lora,serif" }}>AD</text>
                  </svg>
                </div>
              </Link>

              <div className="section-eyebrow" style={{ marginTop: 56 }}>Pro majitele firem</div>
              <div className="g3" style={{ marginTop: 16 }}>
                {ownerArticles.map((a) => (
                  <Link key={a.slug} href={`/blog/${a.slug}`} className="blog-g3-card">
                    <div className="blog-card-tag">{a.tag}</div>
                    <h3 style={{ font: "400 19px/1.25 Lora,serif", marginTop: 10 }}>{a.title}</h3>
                    <p style={{ color: "var(--text-2)", fontSize: 13.5, lineHeight: 1.6, marginTop: 8 }}>{a.desc}</p>
                    <div style={{ marginTop: "auto", paddingTop: 16, fontSize: 13, color: "var(--text-2)" }}>
                      {a.date} · {a.readTime} min čtení
                    </div>
                  </Link>
                ))}
              </div>

              {listArticles.length > 0 && (
                <div className="section-eyebrow" style={{ marginTop: 56 }}>Další články</div>
              )}
            </>
          )}

          {/* ── Article list ── */}
          <div className="blog-listing" style={{ marginTop: activeCat ? 28 : 16 }}>
            {listArticles.map((article) => (
              <Link key={article.slug} href={`/blog/${article.slug}`} className="blog-listing-card">
                <div className="blog-listing-left">
                  <div className="blog-card-tag">{article.tag}</div>
                  <h2 className="blog-listing-title">{article.title}</h2>
                  <p className="blog-listing-desc">{article.desc}</p>
                </div>
                <div className="blog-listing-right">
                  <span className="blog-card-date">{article.date}</span>
                  <span className="blog-listing-arrow">→</span>
                </div>
              </Link>
            ))}
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
            <Link href="/konzultace">Kontakt</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
