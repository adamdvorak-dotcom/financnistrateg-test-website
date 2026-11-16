import type { MetadataRoute } from "next";
import { articles } from "./blog/articles";
import { categories } from "./blog/categories";

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

  // Stránka kategorie se mění, když v ní přibude nebo se upraví článek
  const categoryUrls: MetadataRoute.Sitemap = categories.map((c) => {
    const dates = articles
      .filter((a) => a.category === c.id)
      .map((a) => czechDateToDate(a.updated ?? a.date).getTime());
    return {
      url: `${BASE}/blog/${c.id}`,
      lastModified: dates.length ? new Date(Math.max(...dates)) : new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    };
  });

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/konzultace`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/sluzby`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/kalkulacky`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/kontakt`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
    { url: `${BASE}/o-mne`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/financni-preventivka`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/renta`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    ...categoryUrls,
    ...articleUrls,
  ];
}
