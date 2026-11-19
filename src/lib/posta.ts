/* Odesílání e-mailů přes Resend z ověřené domény financnistrateg.com.
   Sledování otevření a prokliků se nezapíná (v API se neposílá nic, co by ho zapnulo; v Resendu je u domény vypnuté).
   Kdyby odeslání z domény selhalo kvůli odesílateli, zkusí se zpráva ještě jednou ze zkušební adresy Resendu,
   aby se poptávka neztratila (ta ale dojde jen na adresu majitele účtu). */
export const ADRESA = process.env.RESEND_FROM_EMAIL || "adamdvorak@financnistrateg.com";
export const odesilatel = (jmeno: string) => `${jmeno} <${ADRESA}>`;
const ZALOZNI = "onboarding@resend.dev";

type Zprava = {
  from: string;
  to: string[];
  subject: string;
  text?: string;
  html?: string;
  reply_to?: string;
};

export async function posliPostu(z: Zprava, { zaloha = true }: { zaloha?: boolean } = {}) {
  const posli = (telo: Zprava) =>
    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify(telo),
    });
  let res = await posli(z);
  if (!res.ok && zaloha && [400, 401, 403, 422].includes(res.status) && !z.from.includes(ZALOZNI)) {
    const jmeno = z.from.replace(/\s*<[^>]*>\s*$/, "") || "Web";
    console.error("Resend: odeslání z domény selhalo, zkouším záložní adresu", res.status, await res.text().catch(() => ""));
    res = await posli({ ...z, from: `${jmeno} <${ZALOZNI}>` });
  }
  return res;
}
