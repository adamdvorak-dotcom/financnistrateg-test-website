import { NextRequest, NextResponse } from "next/server";

const TO = "adamdvorak@financnistrateg.com";

interface Area { name: string; score: number; }
interface Detail { id: string; area: string; question: string; value: number; label: string; }

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      name: string; email: string; score: number; band: string;
      answered: number; areas: Area[]; details: Detail[];
    };
    const { name, email, score, band, answered, areas, details } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Chybí jméno nebo e-mail." }, { status: 400 });
    }

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
    ].join("\n");

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Test připravenosti <onboarding@resend.dev>",
        to: [TO],
        reply_to: email,
        subject: `Test: ${score}/40 · ${band} — ${name}`,
        text,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error("Resend error:", data);
      return NextResponse.json({ error: "Email se nepodařilo odeslat." }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("test-result route error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
