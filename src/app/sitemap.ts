import type { MetadataRoute } from "next";
import { articles } from "./blog/articles";

const BASE = "https://www.financnistrateg.com";

const CZECH_MONTHS: Record<string, number> = {
  ledna: 1, února: 2, března: 3, dubna: 4, května: 5, června: 6,
  července: 7, srpna: 8, září: 9, října: 10, listopadu: 11, prosince: 12,
};

function czechDateToDate(d: string): Date {
  const parts = d.replace(".", "").trim().split(/\s+/);
  return new Date(Number(parts[2]), (CZECH_MONTHS[parts[1]] ?? 1) - 1, Number(parts[0]));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const articleUrls: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${BASE}/blog/${a.slug}`,
    lastModified: czechDateToDate(a.updated ?? a.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/konzultace`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/test`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    ...articleUrls,
  ];
}
