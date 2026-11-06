import type { NextConfig } from "next";

// Staré články z Wixu měly v adrese diakritiku. Prohlížeč je posílá zakódované (%C4%9B…),
// proto se zdrojová adresa kóduje stejně.
const wixPosts: [string, string][] = [
  ["jak-efektivně-spravovat-svěřenské-fondy", "jak-efektivne-spravovat-sverenske-fondy"],
  ["nejnovější-trendy-v-wealth-managementu-pro-podnikatele", "nejnovejsi-trendy-v-wealth-managementu-pro-podnikatele"],
  ["5-tipů-pro-daňovou-optimalizaci-vaší-firmy", "danove-optimalizace-pro-osvc-a-jednatele"],
];

const nextConfig: NextConfig = {
  // Staré adresy z Wixu → nový web
  async redirects() {
    return [
      ...wixPosts.map(([from, to]) => ({
        source: `/post/${encodeURIComponent(from)}`,
        destination: `/blog/${to}`,
        permanent: true,
      })),
      { source: "/post/:slug", destination: "/blog/:slug", permanent: true },
      { source: "/service-page/:slug", destination: "/konzultace", permanent: true },
      { source: "/book-online", destination: "/konzultace", permanent: true },
      { source: "/blog/categories/:cat", destination: "/blog", permanent: true },
      { source: "/blog-posts-sitemap.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/blog-categories-sitemap.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/pages-sitemap.xml", destination: "/sitemap.xml", permanent: true },
    ];
  },
};

export default nextConfig;
