// Pošle adresy webu přes IndexNow do Seznamu, Bingu a dalších vyhledávačů (Google IndexNow nepodporuje).
// Použití:
//   npm run indexnow                          → všechny adresy z živé sitemapy
//   npm run indexnow -- /blog/novy-clanek     → jen vybrané adresy
// Klíč leží veřejně v public/<KEY>.txt, tak to IndexNow vyžaduje.

const HOST = "www.financnistrateg.com";
const KEY = "e1c6b1c60fa78ee5d17f2eb3c3032f94";
const BASE = `https://${HOST}`;

const args = process.argv.slice(2);
let urls;
if (args.length) {
  urls = args.map((u) => (u.startsWith("http") ? u : BASE + (u.startsWith("/") ? u : `/${u}`)));
} else {
  const xml = await (await fetch(`${BASE}/sitemap.xml`)).text();
  urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${BASE}/${KEY}.txt`, urlList: urls }),
});

console.log(`IndexNow: ${res.status} ${res.statusText}, odesláno ${urls.length} adres`);
if (!res.ok) {
  console.log(await res.text());
  process.exit(1);
}
