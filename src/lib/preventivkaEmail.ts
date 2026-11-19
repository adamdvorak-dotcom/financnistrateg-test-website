import { vyhodnot } from "@/lib/preventivka";

const WEB = "https://www.financnistrateg.com";

/* V e-mailu se vyká s velkým V (Vy, Vás, Vám, Váš, Vaše…). Texty kroků a hodnocení jsou sdílené s webem,
   kde zůstává malé v, proto se tvary zájmen převádějí až tady. */
const VYKANI = /(?<![\p{L}])(vy|vás|vám|vámi|váš|vaše|vaši|vaší|vašeho|vašemu|vašem|vaším|vašich|vašim|vašimi)(?![\p{L}])/gu;
const V = (x: string) => x.replace(VYKANI, (m) => "V" + m.slice(1));

const esc = (x: string) => x.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/* Text e-mailu návštěvníkovi. Všechno kromě křestního jména se skládá na serveru z jeho odpovědí
   a z textů testu, takže přes formulář nejde poslat cizí obsah. */
export function emailNavstevnikovi(odpovedi: Record<string, number>) {
  const v = vyhodnot(odpovedi);
  const pasmoText = V(v.pasmo.text);
  const kroky = v.kroky.map((k) => V(k.it.tip));
  const osloveni = "Dobrý den,";
  const oblasti = v.oblasti.map((o) => `${o.id}. ${o.name}: ${o.score} z 8`);
  const maKroky = v.kroky.length > 0;
  const slabina = v.nejslabsi.score < 8
    ? `Nejslabší oblast: ${v.nejslabsi.name} (${v.nejslabsi.score} z 8 bodů).`
    : "Žádná oblast nevyšla slabě.";

  const text = [
    osloveni,
    "",
    "děkuji za vyplnění Finanční preventivky. Tady je Váš výsledek, ať ho máte po ruce.",
    "",
    `Celkové skóre: ${v.total} ze 40`,
    `${v.pasmo.nazev}. ${pasmoText}`,
    "",
    slabina,
    "",
    "Výsledky po oblastech",
    ...oblasti,
    "",
    ...(maKroky
      ? ["Tři kroky, kterými začít", ...kroky.map((k, i) => `${i + 1}. ${k}`), ""]
      : ["U všech tvrzení máte odpověď ano, takže žádný krok nevyšel jako naléhavý. Stojí za to projít si preventivku znovu za rok.", ""]),
    "Chcete to probrat nad Vašimi čísly? Vyberte si termín na úvodní rozhovor, 30 minut online nebo v Praze:",
    `${WEB}/konzultace`,
    "",
    "K výsledku se Vám ozvu osobně. Na tento e-mail můžete i rovnou odpovědět, čtu ho já.",
    "",
    "Adam Dvořák, EFA",
    "+420 731 147 911",
    WEB,
    "",
    "Test je orientační. Nejde o daňové, právní ani investiční poradenství a výsledek nenahrazuje posouzení konkrétní situace.",
    "Tento e-mail Vám přišel po vyplnění Finanční preventivky na financnistrateg.com.",
  ].join("\n");

  const p = (x: string, styl = "") => `<p style="margin:0 0 14px;${styl}">${x}</p>`;
  const html = `<!doctype html><html lang="cs"><body style="margin:0;background:#EEE9DF;font-family:Arial,Helvetica,sans-serif;color:#1A1511;font-size:16px;line-height:1.6">
<div style="max-width:560px;margin:0 auto;padding:28px 20px">
<div style="background:#FBF9F5;border:1px solid #DDD5C6;border-radius:14px;padding:28px 26px">
${p(esc(osloveni))}
${p("děkuji za vyplnění Finanční preventivky. Tady je Váš výsledek, ať ho máte po ruce.")}
<div style="background:#0C1F3A;color:#F5F2EC;border-radius:12px;padding:20px 22px;margin:0 0 18px">
<div style="font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#C9A260">Celkové skóre</div>
<div style="font-family:Georgia,serif;font-size:34px;line-height:1.2;margin-top:4px">${v.total} ze 40</div>
<div style="margin-top:6px;color:#C9D1DF"><b style="color:#F5F2EC">${esc(v.pasmo.nazev)}.</b> ${esc(pasmoText)}</div>
</div>
${p(`<b>${esc(slabina)}</b>`)}
<table role="presentation" style="width:100%;border-collapse:collapse;margin:0 0 18px">
${v.oblasti.map((o) => `<tr><td style="padding:7px 0;border-bottom:1px solid #DDD5C6">${o.id}. ${esc(o.name)}</td><td style="padding:7px 0;border-bottom:1px solid #DDD5C6;text-align:right;white-space:nowrap"><b>${o.score}</b> z 8</td></tr>`).join("")}
</table>
${maKroky
    ? `<div style="font-family:Georgia,serif;font-size:20px;margin:0 0 10px">Tři kroky, kterými začít</div><ol style="margin:0 0 18px;padding-left:22px">${kroky.map((k) => `<li style="margin:0 0 10px">${esc(k)}</li>`).join("")}</ol>`
    : p("U všech tvrzení máte odpověď ano, takže žádný krok nevyšel jako naléhavý. Stojí za to projít si preventivku znovu za rok.")}
${p("Chcete to probrat nad Vašimi čísly? Úvodní rozhovor trvá 30 minut, online nebo v Praze.")}
<p style="margin:0 0 18px"><a href="${WEB}/konzultace" style="display:inline-block;background:#C9A260;color:#0C1F3A;font-weight:bold;text-decoration:none;padding:13px 22px;border-radius:10px">Vybrat termín</a></p>
${p("K výsledku se Vám ozvu osobně. Na tento e-mail můžete i rovnou odpovědět, čtu ho já.")}
${p(`Adam Dvořák, EFA<br>+420 731 147 911<br><a href="${WEB}" style="color:#7A5C35">financnistrateg.com</a>`, "margin-bottom:0")}
</div>
<p style="margin:16px 6px 0;font-size:12px;line-height:1.5;color:#6B6359">Test je orientační. Nejde o daňové, právní ani investiční poradenství a výsledek nenahrazuje posouzení konkrétní situace. Tento e-mail Vám přišel po vyplnění Finanční preventivky na financnistrateg.com.</p>
</div></body></html>`;

  return { subject: `Vaše Finanční preventivka: ${v.total} ze 40 bodů`, text, html };
}
