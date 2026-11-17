"use client";

import { useEffect } from "react";
import Script from "next/script";

/* Skripty třetích stran, každý jen se svým souhlasem:
   – Leady (analytické cookies), načítá se tady,
   – značka Googlu a Meta Pixel (marketingové cookies), ty řídí /znacky.js. */
export default function TrackingScripts() {
  useEffect(() => {
    const load = () => {
      const analytika =
        localStorage.getItem("cookie_analytics") === "1" ||
        (localStorage.getItem("cookie_analytics") === null && localStorage.getItem("cookie_consent") === "accepted");
      if (!analytika) return;
      if (document.getElementById("leady-script")) return;
      const s = document.createElement("script");
      s.id = "leady-script";
      s.type = "text/javascript";
      s.async = true;
      s.src = "https://ct.leady.com/0YXSENhcpS5AfLaA/L.js";
      document.head.appendChild(s);
    };

    load();

    const onStorage = (e: StorageEvent) => {
      if (e.key === "cookie_consent" || e.key === "cookie_analytics") load();
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("cookie-souhlas", load);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("cookie-souhlas", load);
    };
  }, []);

  return <Script src="/znacky.js" strategy="afterInteractive" />;
}
