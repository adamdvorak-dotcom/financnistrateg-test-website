import type { Metadata } from "next";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";
import TrackingScripts from "@/components/TrackingScripts";

const BASE = "https://www.financnistrateg.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: "Adam Dvořák, EFA | Finanční poradce Praha",
    template: "%s | Adam Dvořák, EFA | Finanční poradce Praha",
  },
  description:
    "Nezávislý finanční poradce Praha pro podnikatele a majitele firem. Investice, ETF, DIP, penzijní spoření, ochrana a správa majetku. Osmý rok v oboru. První konzultace zdarma.",
  keywords: [
    "finanční poradce Praha",
    "investiční poradenství Praha",
    "DIP dlouhodobý investiční produkt",
    "penzijní spoření",
    "ETF investice",
    "správa majetku Praha",
    "ochrana majetku",
    "finanční stratég",
    "finanční plánování podnikatelé",
    "Adam Dvořák EFA",
    "nezávislý finanční poradce",
    "důchod plánování",
    "dědictví finanční poradce",
    "daňová optimalizace OSVČ",
    "kolik si vyplácet ze sro",
  ],
  alternates: {
    canonical: BASE,
  },
  openGraph: {
    title: "Adam Dvořák, EFA | Finanční poradce Praha",
    description:
      "Nezávislý finanční poradce Praha pro podnikatele a majitele firem. Investice, ETF, DIP, penzijní spoření, ochrana a správa majetku. První konzultace zdarma.",
    url: BASE,
    siteName: "Finanční Stratég",
    locale: "cs_CZ",
    type: "website",
    images: [
      {
        url: "/adam-dvorak-hero.jpg",
        width: 1200,
        height: 800,
        alt: "Adam Dvořák, EFA | nezávislý finanční poradce Praha",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adam Dvořák, EFA | Finanční poradce Praha",
    description:
      "Nezávislý finanční poradce Praha. Investice, ETF, DIP, penzijní spoření, ochrana majetku. První konzultace zdarma.",
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

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Adam Dvořák",
  alternateName: "Adam Dvořák EFA",
  jobTitle: "Nezávislý finanční poradce, EFA",
  description: "Nezávislý finanční poradce pro podnikatele a majitele firem v Praze. Osmý rok v oboru, přes 165 milionů Kč pod správou.",
  url: BASE,
  sameAs: [
    "https://www.linkedin.com/in/adam-dvo%C5%99%C3%A1k-efa-721479210/",
    "https://financnistrateg.com",
    "https://www.financnistrateg.com",
  ],
  email: "adamdvorak@financnistrateg.com",
  knowsAbout: [
    "Finanční plánování Praha",
    "Investiční poradenství",
    "ETF a indexové fondy",
    "DIP (Dlouhodobý investiční produkt)",
    "Penzijní spoření a třetí pilíř",
    "Ochrana a správa majetku",
    "Podnikatelské finance",
    "Finanční strategie",
    "Daňová optimalizace OSVČ a jednatelů",
    "Hypotéky a refinancování",
    "Svěřenské fondy",
    "Dědictví a mezigenerační přenos majetku",
    "Cashflow management pro firmy",
    "Výběr peněz ze s.r.o.: mzda vs. dividendy",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Praha",
    addressRegion: "Praha",
    addressCountry: "CZ",
  },
  worksFor: {
    "@type": "Organization",
    name: "Finanční Stratég",
    url: BASE,
  },
};

const serviceLd = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  name: "Finanční Stratég | Finanční poradce Praha",
  alternateName: ["Adam Dvořák EFA finanční poradce Praha", "Finanční poradce Praha"],
  description: "Nezávislé finanční poradenství pro podnikatele a majitele firem v Praze. Investice, ETF, DIP, penzijní spoření, správa a ochrana majetku. První konzultace zdarma.",
  url: BASE,
  email: "adamdvorak@financnistrateg.com",
  areaServed: [
    { "@type": "City", name: "Praha" },
    { "@type": "AdministrativeArea", name: "Středočeský kraj" },
    { "@type": "Country", name: "Česká republika" },
  ],
  serviceType: [
    "Investiční poradenství",
    "Finanční plánování",
    "Správa majetku",
    "Penzijní poradenství",
    "Daňová optimalizace",
    "Ochrana majetku",
  ],
  provider: {
    "@type": "Person",
    name: "Adam Dvořák",
    jobTitle: "EFA (European Financial Advisor)",
  },
  priceRange: "Bezplatná první konzultace",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Finanční poradenství Praha",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Investiční poradenství a ETF portfolia" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "DIP (Dlouhodobý investiční produkt)" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Penzijní spoření a plánování důchodu" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Správa a ochrana rodinného majetku" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Daňová optimalizace pro OSVČ a jednatele" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Dědictví, svěřenské fondy a mezigenerační přenos" } },
    ],
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
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700;1,14..32,300;1,14..32,400&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="https://assets.calendly.com/assets/external/widget.css" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
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
