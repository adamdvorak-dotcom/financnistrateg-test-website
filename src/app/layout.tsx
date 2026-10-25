import type { Metadata } from "next";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";
import TrackingScripts from "@/components/TrackingScripts";

const BASE = "https://www.financnistrateg.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: "Adam Dvořák, EFA — Finanční Stratég",
    template: "%s | Adam Dvořák, EFA",
  },
  description:
    "Nezávislý finanční poradce pro podnikatele a majitele firem. Pomáhám s cashflow, ochranou majetku, investicemi a přípravou na odchod z firmy.",
  alternates: {
    canonical: BASE,
  },
  openGraph: {
    title: "Adam Dvořák, EFA — Finanční Stratég",
    description:
      "Nezávislý finanční poradce pro podnikatele a majitele firem. Pomáhám s cashflow, ochranou majetku, investicemi a přípravou na odchod z firmy.",
    url: BASE,
    siteName: "Finanční Stratég",
    locale: "cs_CZ",
    type: "website",
    images: [
      {
        url: "/adam-dvorak-hero.jpg",
        width: 1200,
        height: 800,
        alt: "Adam Dvořák, EFA — nezávislý finanční poradce",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adam Dvořák, EFA — Finanční Stratég",
    description:
      "Nezávislý finanční poradce pro podnikatele a majitele firem.",
    images: ["/adam-dvorak-hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Adam Dvořák",
  jobTitle: "Nezávislý finanční poradce, EFA",
  url: BASE,
  sameAs: [
    "https://www.linkedin.com/in/adam-dvo%C5%99%C3%A1k-efa-721479210/",
    "https://financnistrateg.com",
  ],
  email: "adamdvorak@financnistrateg.com",
  knowsAbout: [
    "Finanční plánování",
    "Investice",
    "Ochrana majetku",
    "Podnikatelské finance",
    "Penzijní spoření",
    "Hypotéky",
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "CZ",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" className="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700;1,14..32,300;1,14..32,400&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="https://assets.calendly.com/assets/external/widget.css" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <CookieBanner />
        <TrackingScripts />
      </body>
    </html>
  );
}
