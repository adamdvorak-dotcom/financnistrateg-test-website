import { NextRequest, NextResponse } from "next/server";
import { cistyOdkud, odkudRadky } from "@/lib/odkud";
import { odesilatel, posliPostu } from "@/lib/posta";
import { emailNavstevnikovi } from "@/lib/preventivkaEmail";

const TO = "adamdvorak@financnistrateg.com";

/* E-mail s výsledkem pro návštěvníka. Text je schválený; zapne se, až Adam potvrdí zkušební cestu
   a schválení z BEplanu. */
const EMAIL_NAVSTEVNIKOVI = false;

interface Area { name: string; score: number; }
interface Detail { id: string; area: string; question: string; value: number; label: string; }

// Nejvýš 5 odeslání z jedné IP adresy za 10 minut (v rámci jedné instance serveru)
const OKNO_MS = 10 * 60 * 1000;
const MAX_ZA_OKNO = 5;
const zasahy = new Map<string, number[]>();
function prilisMnoho(ip: string) {
  const ted = Date.now();
  const nedavne = (zasahy.get(ip) ?? []).filter((t) => ted - t < OKNO_MS);
  nedavne.push(ted);
  zasahy.set(ip, nedavne);
  return nedavne.length > MAX_ZA_OKNO;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      name: string; email: string; score: number; band: string;
      answered: number; areas: Area[]; details: Detail[]; utm?: unknown;
    };
    const { name, email, score, band, answered, areas, details } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Chybí jméno nebo e-mail." }, { status: 400 });
    }

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
    if (prilisMnoho(ip)) return NextResponse.json({ ok: true });

    const areaTable = areas
      .map((a, i) => `  ${i + 1}. ${a.name}: ${a.score} / 8`)
      .join("\n");

    const detailRows = details
      .map((d) => `  ${d.id.padEnd(5)} ${d.label.padEnd(10)} ${d.question}`)
      .join("\n");

    const text = [
      "NOVÝ TEST PŘIPRAVENOSTI MAJITELE FIRMY",
      "═══════════════════════════════════════",
      "",
      `Jméno:     ${name}`,
      `E-mail:    ${email}`,
      "",
      `Celkové skóre: ${score} / 40`,
      `Výsledek:      ${band}`,
      `Zodpovězeno:   ${answered} z 20`,
      "",
      "VÝSLEDKY PO OBLASTECH",
      "─────────────────────",
      areaTable,
      "",
      "JEDNOTLIVÉ ODPOVĚDI",
      "───────────────────",
      detailRows,
      ...odkudRadky(cistyOdkud(body.utm)),
    ].join("\n");

    const res = await posliPostu({
      from: odesilatel("Web financnistrateg.com"),
      to: [TO],
      reply_to: email,
      subject: `Test: ${score}/40 · ${band}| ${name}`,
      text,
    });

    const data = await res.json();
    if (!res.ok) {
      console.error("Resend error:", data);
      return NextResponse.json({ error: "Email se nepodařilo odeslat." }, { status: 500 });
    }

    // E-mail návštěvníkovi: jen na platně vypadající adresu, obsah se skládá na serveru z jeho odpovědí.
    // Jeho případné selhání neshodí odeslání testu (oznámení Adamovi už odešlo).
    const adresa = String(email).trim();
    if (EMAIL_NAVSTEVNIKOVI && /^[^\s@<>,;]+@[^\s@<>,;]+\.[^\s@<>,;]{2,}$/.test(adresa) && adresa.length <= 160) {
      try {
        const odpovedi: Record<string, number> = {};
        for (const d of Array.isArray(details) ? details : []) {
          if (typeof d?.id === "string" && [0, 1, 2].includes(d.value)) odpovedi[d.id] = d.value;
        }
        const m = emailNavstevnikovi(odpovedi);
        const r2 = await posliPostu({ from: odesilatel("Adam Dvořák"), to: [adresa], reply_to: TO, ...m }, { zaloha: false });
        if (!r2.ok) console.error("Resend (návštěvník):", r2.status, await r2.text().catch(() => ""));
      } catch (e) {
        console.error("E-mail návštěvníkovi se nepodařilo odeslat:", e);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("test-result route error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
