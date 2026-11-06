import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Staré adresy z Wixu → nový web
  async redirects() {
    return [
      { source: "/post/:slug", destination: "/blog/:slug", permanent: true },
      { source: "/blog/categories/:cat", destination: "/blog", permanent: true },
      { source: "/blog-posts-sitemap.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/blog-categories-sitemap.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/pages-sitemap.xml", destination: "/sitemap.xml", permanent: true },
    ];
  },
};

export default nextConfig;
