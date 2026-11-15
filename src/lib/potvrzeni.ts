/* Vlastní české potvrzení rezervace. Posílá se přes Resend hned po zápisu schůzky do Calendly.

   Funguje jen s ověřenou odesílací doménou: v proměnné prostředí RESEND_FROM_EMAIL musí být
   adresa z domény ověřené v Resendu (například rezervace@financnistrateg.com). Se zkušebním
   odesílatelem onboarding@resend.dev Resend cizím příjemcům nedoručuje, proto se bez této
   proměnné nic neposílá a zůstává jen potvrzení od Calendly. */

const TZ = "Europe/Prague";
const ODPOVED_NA = "adamdvorak@financnistrateg.com";
const DNY = ["neděle", "pondělí", "úterý", "středa", "čtvrtek", "pátek", "sobota"];
const MESICE_2 = ["ledna", "února", "března", "dubna", "května", "června", "července", "srpna", "září", "října", "listopadu", "prosince"];
const MESICE_KR = ["LED", "ÚNO", "BŘE", "DUB", "KVĚ", "ČVN", "ČVC", "SRP", "ZÁŘ", "ŘÍJ", "LIS", "PRO"];

export type Potvrzeni = {
  to: string;
  start: string; // ISO v UTC
  delka: number; // minuty
  misto: string; // např. „Online přes Google Meet"
  joinUrl?: string | null;
  rescheduleUrl?: string | null;
  cancelUrl?: string | null;
};

export function potvrzeniZapnute() {
  return Boolean(process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL);
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const velke = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
// „ve 13:00", ale „v 9:30": předložka podle toho, jak se hodina čte
const predlozka = (hodina: number) => ([2, 3, 4, 12, 13, 14, 20, 21, 22, 23].includes(hodina) ? "ve" : "v");

/* Datum a čas v pražském čase rozložené na části */
function casti(iso: string) {
  const f = new Intl.DateTimeFormat("en-GB", {
    timeZone: TZ, weekday: "short", year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "2-digit", hour12: false,
  }).formatToParts(new Date(iso));
  const g = (t: string) => f.find((p) => p.type === t)?.value ?? "";
  const den = Number(g("day"));
  const mesic = Number(g("month"));
  const hodina = Number(g("hour")) % 24;
  const wd = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(g("weekday"));
  const cas = `${hodina}:${g("minute")}`;
  return { den, mesic, hodina, cas, denVTydnu: DNY[wd] ?? "" };
}

const ics = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

export function sestavPotvrzeni(p: Potvrzeni) {
  const c = casti(p.start);
  const kdyKratce = `${c.denVTydnu} ${c.den}. ${c.mesic}. ${predlozka(c.hodina)} ${c.cas}`;
  const kdyDlouze = `${velke(c.denVTydnu)} ${c.den}. ${MESICE_2[c.mesic - 1]} ${predlozka(c.hodina)} ${c.cas}`;
  const od = new Date(p.start);
  const dd = new Date(od.getTime() + p.delka * 60000);
  const nazev = "Úvodní konzultace: Adam Dvořák, EFA";

  const gcal =
    "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    `&text=${encodeURIComponent(nazev)}&dates=${ics(od)}/${ics(dd)}` +
    `&details=${encodeURIComponent(p.joinUrl ? `Odkaz na hovor: ${p.joinUrl}` : "Úvodní konzultace, 30 minut.")}` +
    (p.joinUrl ? `&location=${encodeURIComponent(p.joinUrl)}` : "");

  const kalendar = [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//financnistrateg.com//Rezervace//CS", "METHOD:PUBLISH", "BEGIN:VEVENT",
    `UID:${ics(od)}@financnistrateg.com`, `DTSTAMP:${ics(new Date())}`, `DTSTART:${ics(od)}`, `DTEND:${ics(dd)}`,
    "SUMMARY:Úvodní konzultace: Adam Dvořák\\, EFA", p.joinUrl ? `LOCATION:${p.joinUrl}` : null, "END:VEVENT", "END:VCALENDAR",
  ].filter(Boolean).join("\r\n");

  const tlacitko = (href: string, text: string, hlavni: boolean) =>
    `<a href="${esc(href)}" style="display:inline-block;margin:0 8px 8px 0;padding:13px 20px;border-radius:10px;font:600 14px Arial,Helvetica,sans-serif;text-decoration:none;${
      hlavni ? "background:#C9A260;color:#1A1511;" : "border:1px solid #C9B99A;color:#1A1511;"
    }">${text}</a>`;

  const html = `<!doctype html><html lang="cs"><body style="margin:0;padding:0;background:#EEE9DF;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#EEE9DF;padding:28px 12px;"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#FBF9F5;border-radius:16px;overflow:hidden;">
<tr><td style="padding:28px 30px 8px;font:16px/1.6 Arial,Helvetica,sans-serif;color:#1A1511;">Dobrý den,<br>těším se na náš rozhovor.</td></tr>
<tr><td style="padding:12px 30px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0C1F3A;border-radius:14px;"><tr>
<td width="76" align="center" style="padding:18px 0 18px 8px;">
<div style="font:11px/1.4 'Courier New',monospace;letter-spacing:2px;color:#C9A260;">${MESICE_KR[c.mesic - 1]}</div>
<div style="font:34px/1.1 Georgia,'Times New Roman',serif;color:#F5F2EC;">${c.den}</div></td>
<td style="padding:18px 20px 18px 12px;border-left:1px solid #2A3D5A;">
<div style="font:21px/1.3 Georgia,'Times New Roman',serif;color:#F5F2EC;">${esc(kdyDlouze)}</div>
<div style="margin-top:4px;font:14px/1.5 Arial,Helvetica,sans-serif;color:#C9D1DF;">${p.delka} minut · ${esc(p.misto)}</div></td>
</tr></table></td></tr>
${p.joinUrl ? `<tr><td style="padding:4px 30px 0;font:15px/1.6 Arial,Helvetica,sans-serif;color:#1A1511;">Odkaz na hovor: <a href="${esc(p.joinUrl)}" style="color:#7A5C35;">${esc(p.joinUrl)}</a></td></tr>` : ""}
<tr><td style="padding:10px 30px 4px;font:15px/1.6 Arial,Helvetica,sans-serif;color:#4A433B;">Časy jsou v pražském čase.</td></tr>
<tr><td style="padding:14px 30px 6px;">${tlacitko(gcal, "Přidat do kalendáře", true)}${p.rescheduleUrl ? tlacitko(p.rescheduleUrl, "Změnit termín", false) : ""}</td></tr>
${p.cancelUrl ? `<tr><td style="padding:0 30px;font:13px/1.6 Arial,Helvetica,sans-serif;color:#6B6359;">Nehodí se vám to? <a href="${esc(p.cancelUrl)}" style="color:#6B6359;">Zrušit schůzku</a></td></tr>` : ""}
<tr><td style="padding:22px 30px 28px;font:17px/1.4 Georgia,'Times New Roman',serif;color:#1A1511;">Adam Dvořák, EFA<br>
<span style="font:13px/1.6 Arial,Helvetica,sans-serif;color:#6B6359;">Finanční stratég · +420 731 147 911 · financnistrateg.com</span></td></tr>
</table></td></tr></table></body></html>`;

  const text = [
    "Dobrý den,",
    "těším se na náš rozhovor.",
    "",
    kdyDlouze,
    `${p.delka} minut · ${p.misto}`,
    p.joinUrl ? `Odkaz na hovor: ${p.joinUrl}` : null,
    "",
    "Časy jsou v pražském čase.",
    "",
    `Přidat do kalendáře: ${gcal}`,
    p.rescheduleUrl ? `Změnit termín: ${p.rescheduleUrl}` : null,
    p.cancelUrl ? `Zrušit schůzku: ${p.cancelUrl}` : null,
    "",
    "Adam Dvořák, EFA",
    "Finanční stratég · +420 731 147 911 · financnistrateg.com",
  ].filter((r) => r !== null).join("\n");

  return { subject: `Máme termín: ${kdyKratce}`, html, text, kalendar };
}

/* Vrací true, když Resend e-mail přijal. Chyba nikdy nesmí shodit rezervaci, jen se zapíše. */
export async function posliPotvrzeni(p: Potvrzeni): Promise<boolean> {
  if (!potvrzeniZapnute()) return false;
  try {
    const m = sestavPotvrzeni(p);
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: `Adam Dvořák <${process.env.RESEND_FROM_EMAIL}>`,
        to: [p.to],
        reply_to: ODPOVED_NA,
        subject: m.subject,
        html: m.html,
        text: m.text,
        attachments: [{ filename: "konzultace-adam-dvorak.ics", content: Buffer.from(m.kalendar, "utf-8").toString("base64") }],
      }),
    });
    if (!res.ok) console.error("Potvrzeni: Resend odmítl e-mail:", res.status, (await res.text()).slice(0, 300));
    return res.ok;
  } catch (err) {
    console.error("Potvrzeni error:", err);
    return false;
  }
}

/* Zpráva pro Adama o nové rezervaci z webu. Calendly pošle svoje oznámení taky, ale neví nic
   o telefonu ani o tématu (třeba oblastech přenesených z Finanční preventivky). Jde na vlastní
   adresu, takže funguje i se zkušebním odesílatelem Resendu. */
export async function posliOznameni(r: { start: string; name: string; email: string; phone?: string; tema?: string; misto?: string }): Promise<boolean> {
  if (!process.env.RESEND_API_KEY) return false;
  try {
    const c = casti(r.start);
    const kdy = `${c.denVTydnu} ${c.den}. ${c.mesic}. ${predlozka(c.hodina)} ${c.cas}`;
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "Web formulář <onboarding@resend.dev>",
        to: [ODPOVED_NA],
        reply_to: r.email,
        subject: `Nová rezervace: ${kdy} | ${r.name}`,
        text: [
          `Termín: ${kdy} (pražský čas)`,
          `Jméno: ${r.name}`,
          `E-mail: ${r.email}`,
          r.phone ? `Telefon: ${r.phone}` : null,
          r.tema ? `Téma: ${r.tema}` : null,
          r.misto ? `Místo: ${r.misto}` : null,
          "",
          "Rezervace je zapsaná v Calendly.",
        ].filter((x) => x !== null).join("\n"),
      }),
    });
    if (!res.ok) console.error("Oznameni: Resend odmítl e-mail:", res.status, (await res.text()).slice(0, 300));
    return res.ok;
  } catch (err) {
    console.error("Oznameni error:", err);
    return false;
  }
}
