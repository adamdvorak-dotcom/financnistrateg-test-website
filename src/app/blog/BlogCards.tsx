"use client";
import Link from "next/link";
import { useLang } from "./useLang";
import type { Article } from "./articles";

export function FeaturedCard({ article }: { article: Article }) {
  const [lang] = useLang();
  const title = lang === "en" ? (article.titleEn || article.title) : article.title;
  const desc  = lang === "en" ? (article.descEn  || article.desc)  : article.desc;
  const cta   = lang === "en" ? "Read more →" : "Číst dál →";
  return (
    <Link href={`/blog/${article.slug}`} className="feat" style={{ marginTop: 32 }}>
      <div style={{ padding: "52px 48px" }}>
        <div className="blog-card-tag" style={{ color: "#C9A260", borderColor: "rgba(201,162,96,.4)" }}>
          {lang === "en" ? (article.tagEn || article.tag) : article.tag}
        </div>
        <h2 style={{ font: "400 36px/1.1 Lora,serif", marginTop: 14, color: "#F5F2EC" }}>{title}</h2>
        <p style={{ color: "rgba(245,242,236,.65)", fontSize: 15, lineHeight: 1.65, marginTop: 14, maxWidth: "44ch" }}>{desc}</p>
        <div style={{ marginTop: 30, fontSize: 14, fontWeight: 600, letterSpacing: ".04em", color: "#C9A260" }}>{cta}</div>
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
  );
}

export function OwnerCards({ articles }: { articles: Article[] }) {
  const [lang] = useLang();
  return (
    <div className="g3" style={{ marginTop: 16 }}>
      {articles.map((a) => (
        <Link key={a.slug} href={`/blog/${a.slug}`} className="blog-g3-card">
          <div className="blog-card-tag">{lang === "en" ? (a.tagEn || a.tag) : a.tag}</div>
          <h3 style={{ font: "400 19px/1.25 Lora,serif", marginTop: 10 }}>
            {lang === "en" ? (a.titleEn || a.title) : a.title}
          </h3>
          <p style={{ color: "var(--text-2)", fontSize: 13.5, lineHeight: 1.6, marginTop: 8 }}>
            {lang === "en" ? (a.descEn || a.desc) : a.desc}
          </p>
          <div style={{ marginTop: "auto", paddingTop: 16, fontSize: 13, color: "var(--text-2)" }}>
            {lang === "en" ? (a.dateEn || a.date) : a.date}
            {a.readTime ? ` · ${a.readTime} min read` : ""}
          </div>
        </Link>
      ))}
    </div>
  );
}

export function BlogListing({ articles, activeCat }: { articles: Article[]; activeCat: boolean }) {
  const [lang] = useLang();
  return (
    <div className="blog-listing" style={{ marginTop: activeCat ? 28 : 16 }}>
      {articles.map((article) => (
        <Link key={article.slug} href={`/blog/${article.slug}`} className="blog-listing-card">
          <div className="blog-listing-left">
            <div className="blog-card-tag">
              {lang === "en" ? (article.tagEn || article.tag) : article.tag}
            </div>
            <h2 className="blog-listing-title">
              {lang === "en" ? (article.titleEn || article.title) : article.title}
            </h2>
            <p className="blog-listing-desc">
              {lang === "en" ? (article.descEn || article.desc) : article.desc}
            </p>
          </div>
          <div className="blog-listing-right">
            <span className="blog-card-date">
              {lang === "en" ? (article.dateEn || article.date) : article.date}
            </span>
            <span className="blog-listing-arrow">→</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export function BlogSectionLabel({ cs, en }: { cs: string; en: string }) {
  const [lang] = useLang();
  return <div className="section-eyebrow" style={{ marginTop: 56 }}>{lang === "en" ? en : cs}</div>;
}
