/* Reklamní značky (Google a Meta Pixel) pro celý web, včetně stránek mimo společný layout (Finanční preventivka).
   Skript nic nenačte, dokud návštěvník nedá souhlas s marketingovými cookies (localStorage cookie_marketing = "1").
   Kódy se berou z proměnných prostředí; dokud nejsou nastavené, skript nedělá nic.
     NEXT_PUBLIC_GOOGLE_TAG_ID      značka Googlu, např. AW-123456789 nebo G-XXXXXXX (víc značek oddělit čárkou)
     NEXT_PUBLIC_GOOGLE_CONVERSION  konverze „dokončený test“ v Google Ads, např. AW-123456789/AbCdEfGh
     NEXT_PUBLIC_META_PIXEL_ID      číslo Meta Pixelu
   Události se posílají bez jména a e-mailu. */
export const dynamic = "force-static";

const SKRIPT = `(function () {
  var G = __G__, KONVERZE = __K__, PIXEL = __P__;
  if (!G.length && !PIXEL) { window.fsZnacky = { load: function () {}, lead: function () {}, udalost: function () {} }; }
  var nacteno = false;
  function souhlas() { try { return localStorage.getItem("cookie_marketing") === "1"; } catch (e) { return false; } }
  function rozhodnuto() { try { return localStorage.getItem("cookie_marketing") !== null; } catch (e) { return true; } }
  function skript(src) { var s = document.createElement("script"); s.async = true; s.src = src; document.head.appendChild(s); }
  function load() {
    if (nacteno || !souhlas() || (!G.length && !PIXEL)) return;
    nacteno = true;
    if (G.length) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
      window.gtag("consent", "default", { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "denied" });
      window.gtag("consent", "update", { ad_storage: "granted", ad_user_data: "granted", ad_personalization: "granted", analytics_storage: "granted" });
      window.gtag("js", new Date());
      G.forEach(function (id) { window.gtag("config", id); });
      skript("https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(G[0]));
    }
    if (PIXEL) {
      if (!window.fbq) {
        var n = window.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
        if (!window._fbq) window._fbq = n;
        n.push = n; n.loaded = true; n.version = "2.0"; n.queue = [];
        skript("https://connect.facebook.net/en_US/fbevents.js");
      }
      window.fbq("init", PIXEL);
      window.fbq("track", "PageView");
    }
  }
  /* Dokončený test: konverze do Googlu a událost Lead do Pixelu, jednou za návštěvu a jen se souhlasem */
  function lead() {
    if (!souhlas()) return;
    try { if (sessionStorage.getItem("fs_lead")) return; sessionStorage.setItem("fs_lead", "1"); } catch (e) {}
    load();
    if (window.gtag && G.length) {
      if (KONVERZE) window.gtag("event", "conversion", { send_to: KONVERZE });
      window.gtag("event", "generate_lead", { event_category: "test", event_label: "dokonceny_test" });
    }
    if (window.fbq && PIXEL) window.fbq("track", "Lead", { content_name: "Financni preventivka" });
  }
  /* Vlastní událost (např. použití kalkulačky renty): jednou za návštěvu a jen se souhlasem */
  function udalost(nazev) {
    if (!souhlas() || !/^[a-z0-9_]{1,40}$/.test(nazev)) return;
    try { if (sessionStorage.getItem("fs_u_" + nazev)) return; sessionStorage.setItem("fs_u_" + nazev, "1"); } catch (e) {}
    load();
    if (window.gtag && G.length) window.gtag("event", nazev);
    if (window.fbq && PIXEL) window.fbq("trackCustom", nazev);
  }
  if (!window.fsZnacky) window.fsZnacky = { load: load, lead: lead, udalost: udalost };
  load();
  window.addEventListener("cookie-souhlas", load);
  window.addEventListener("storage", function (e) { if (e.key === "cookie_marketing") load(); });

  /* Lišta se souhlasem pro stránky mimo společný layout (značka <script data-lista>) */
  var ja = document.currentScript;
  if (!ja || !ja.hasAttribute("data-lista") || rozhodnuto()) return;
  function uloz(marketing, analytika) {
    try {
      localStorage.setItem("cookie_consent", marketing && analytika ? "accepted" : "necessary");
      localStorage.setItem("cookie_marketing", marketing ? "1" : "0");
      localStorage.setItem("cookie_analytics", analytika ? "1" : "0");
    } catch (e) {}
    document.cookie = "cookie_consent=" + (marketing && analytika ? "accepted" : "necessary") + "; max-age=31536000; path=/; SameSite=Lax";
    box.remove();
    window.dispatchEvent(new Event("cookie-souhlas"));
  }
  var box = document.createElement("div");
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-label", "Souhlas s cookies");
  box.style.cssText = "position:fixed;left:50%;bottom:24px;transform:translateX(-50%);z-index:9999;box-sizing:border-box;width:calc(100% - 32px);max-width:600px;padding:20px 22px;border-radius:14px;background:#F5F2EC;border:1px solid #DDD5C6;box-shadow:0 8px 40px rgba(12,31,58,.25);font:400 13px/1.6 Inter,system-ui,sans-serif;color:#4A433B";
  box.innerHTML = '<div style="font-weight:600;color:#1A1511;margin-bottom:4px">Používáme cookies</div>'
    + 'Nezbytné cookies web potřebuje k provozu. S vaším souhlasem použijeme i analytické a marketingové cookies (Google, Meta) k měření reklamy. '
    + '<a href="/privacy" style="color:#7A5C35">Více informací</a>'
    + '<div style="display:flex;flex-wrap:wrap;justify-content:flex-end;gap:8px;margin-top:14px">'
    + '<button type="button" data-v="0" style="min-height:44px;padding:0 16px;border-radius:8px;border:1px solid #CDBF9F;background:none;color:#1A1511;font:500 13px Inter,system-ui,sans-serif;cursor:pointer">Pouze nezbytné</button>'
    + '<button type="button" data-v="1" style="min-height:44px;padding:0 18px;border-radius:8px;border:0;background:#0C1F3A;color:#F5F2EC;font:600 13px Inter,system-ui,sans-serif;cursor:pointer">Přijmout vše</button></div>';
  box.addEventListener("click", function (e) {
    var b = e.target && e.target.closest ? e.target.closest("button[data-v]") : null;
    if (b) uloz(b.getAttribute("data-v") === "1", b.getAttribute("data-v") === "1");
  });
  (document.body || document.documentElement).appendChild(box);
})();`;

export function GET() {
  const g = (process.env.NEXT_PUBLIC_GOOGLE_TAG_ID ?? "").split(",").map((s) => s.trim()).filter((s) => /^[A-Z]{1,3}-[A-Za-z0-9-]+$/.test(s));
  const k = (process.env.NEXT_PUBLIC_GOOGLE_CONVERSION ?? "").trim();
  const p = (process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "").trim();
  const js = SKRIPT
    .replace("__G__", JSON.stringify(g))
    .replace("__K__", JSON.stringify(/^AW-[A-Za-z0-9-]+\/[A-Za-z0-9_-]+$/.test(k) ? k : ""))
    .replace("__P__", JSON.stringify(/^\d{5,20}$/.test(p) ? p : ""));
  return new Response(js, { headers: { "Content-Type": "application/javascript; charset=utf-8", "Cache-Control": "public, max-age=300" } });
}
