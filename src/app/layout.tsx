import type { Metadata } from "next";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";
import TrackingScripts from "@/components/TrackingScripts";

const BASE = "https://www.financnistrateg.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: "Finanční stratég a poradce, Praha | Adam Dvořák, EFA",
    template: "%s | Adam Dvořák, EFA",
  },
  description:
    "Finanční stratég pro majitele firem, lékaře a advokáty v Praze. " +
    "Investice, DIP, krizový plán a předání majetku. Osmý rok v oboru.",
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
    types: { "application/rss+xml": `${BASE}/feed.xml` },
  },
  // Obrázek pro sdílení (1200×630) generuje src/app/opengraph-image.tsx,
  // proto tu žádný není: uvedený by ho přebil.
  openGraph: {
    title: "Finanční stratég a poradce, Praha | Adam Dvořák, EFA",
    description:
      "Finanční stratég pro majitele firem, lékaře a advokáty v Praze. Investice, DIP, krizový plán a předání majetku. Osmý rok v oboru.",
    url: BASE,
    siteName: "Finanční Stratég",
    locale: "cs_CZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Finanční stratég a poradce, Praha | Adam Dvořák, EFA",
    description:
      "Finanční stratég pro majitele firem, lékaře a advokáty v Praze. Investice, DIP, krizový plán a předání majetku. Osmý rok v oboru.",
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

const PERSON_ID = `${BASE}/#adam-dvorak`;
const BUSINESS_ID = `${BASE}/#financni-strateg`;

// Název webu, který Google ukazuje nad výsledkem hledání
const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE}/#web`,
  name: "Finanční Stratég",
  alternateName: "Adam Dvořák, EFA",
  url: BASE,
  inLanguage: "cs",
  publisher: { "@id": BUSINESS_ID },
};

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Adam Dvořák",
  image: `${BASE}/adam-dvorak-about.jpg`,
  alternateName: "Adam Dvořák EFA",
  jobTitle: "Nezávislý finanční poradce, EFA",
  description: "Nezávislý finanční poradce pro podnikatele a majitele firem v Praze. Osmý rok v oboru, přes 165 milionů Kč pod správou.",
  url: BASE,
  // sameAs patří jen profilům jinde na internetu, ne vlastnímu webu
  sameAs: ["https://www.linkedin.com/in/adam-dvo%C5%99%C3%A1k-efa-721479210/"],
  email: "adamdvorak@financnistrateg.com",
  telephone: "+420731147911",
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
  worksFor: { "@id": BUSINESS_ID },
};

const serviceLd = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  "@id": BUSINESS_ID,
  name: "Finanční Stratég | Finanční poradce Praha",
  image: `${BASE}/adam-dvorak-about.jpg`,
  logo: `${BASE}/icon-512.png`,
  telephone: "+420731147911",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Salvátorská 931/8",
    addressLocality: "Praha 1",
    postalCode: "110 00",
    addressCountry: "CZ",
  },
  geo: { "@type": "GeoCoordinates", latitude: 50.0884, longitude: 14.4188 },
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
  founder: { "@id": PERSON_ID },
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
    // Skript níže přidá na <html> třídu „js" dřív, než se stránka oživí. React by to jinak
    // ve vývojovém režimu hlásil jako neshodu, proto se u tohoto prvku neporovnává.
    <html lang="cs" className="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700;1,14..32,300;1,14..32,400&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />
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
