import type { Metadata } from "next";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";
import TrackingScripts from "@/components/TrackingScripts";

export const metadata: Metadata = {
  title: "Adam Dvořák, EFA — Finanční Stratég",
  description:
    "Nezávislý finanční poradce. Pomáhám jednotlivcům a rodinám budovat finanční jistotu — od investic po hypotéky a přípravu na důchod.",
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
      </head>
      <body>
        {children}
        <CookieBanner />
        <TrackingScripts />
      </body>
    </html>
  );
}
