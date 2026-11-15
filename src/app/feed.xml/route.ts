import { articles } from "../blog/articles";

// RSS kanál blogu. Generuje se při buildu, stejně jako sitemapa.
export const dynamic = "force-static";

const BASE = "https://www.financnistrateg.com";

const CZECH_MONTHS: Record<string, number> = {
  ledna: 1, února: 2, března: 3, dubna: 4, května: 5, června: 6,
  července: 7, srpna: 8, září: 9, října: 10, listopadu: 11, prosince: 12,
};

// „6. listopadu 2026" → datum v poledne UTC, aby se v žádném časovém pásmu neposunulo o den
function czechDateToDate(d: string): Date {
  const parts = d.replace(".", "").trim().split(/\s+/);
  return new Date(Date.UTC(Number(parts[2]), (CZECH_MONTHS[parts[1]] ?? 1) - 1, Number(parts[0]), 12));
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function GET() {
  const sorted = articles
    .map((a) => ({ a, date: czechDateToDate(a.date) }))
    .sort((x, y) => y.date.getTime() - x.date.getTime());

  const items = sorted
    .map(({ a, date }) => {
      const url = `${BASE}/blog/${a.slug}`;
      return [
        "    <item>",
        `      <title>${esc(a.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <pubDate>${date.toUTCString()}</pubDate>`,
        `      <category>${esc(a.tag)}</category>`,
        `      <description>${esc(a.seoDesc ?? a.desc)}</description>`,
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Finanční Stratég: blog Adama Dvořáka, EFA</title>
    <link>${BASE}/blog</link>
    <atom:link href="${BASE}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Články o majetku majitelů firem, investicích, důchodu a hypotékách.</description>
    <language>cs</language>
    <lastBuildDate>${(sorted[0]?.date ?? new Date()).toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
