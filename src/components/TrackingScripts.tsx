"use client";

import { useEffect } from "react";

export default function TrackingScripts() {
  useEffect(() => {
    const load = () => {
      if (localStorage.getItem("cookie_consent") !== "accepted") return;
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
      if (e.key === "cookie_consent" && e.newValue === "accepted") load();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return null;
}
