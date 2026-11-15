import { NextRequest, NextResponse } from "next/server";

const TO = "adamdvorak@financnistrateg.com";

// Jednoduchý limit: nejvýš 5 zpráv z jedné IP adresy za 10 minut (v rámci jedné instance serveru)
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function tooMany(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(req: NextRequest) {
  try {
    const { name, phone, email, topic, message, web } = await req.json();

    // Skryté pole vyplňují jen roboti: tváříme se, že vše prošlo
    if (web) return NextResponse.json({ ok: true });

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
    if (tooMany(ip)) {
      return NextResponse.json({ error: "Příliš mnoho zpráv, zkuste to prosím za chvíli." }, { status: 429 });
    }

    if (!name || !email) {
      return NextResponse.json({ error: "Chybí povinné pole." }, { status: 400 });
    }

    const body = [
      `Jméno: ${name}`,
      `E-mail: ${email}`,
      phone ? `Telefon: ${phone}` : null,
      topic ? `Téma: ${topic}` : null,
      "",
      message || "(bez zprávy)",
    ]
      .filter(Boolean)
      .join("\n");

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Web formulář <onboarding@resend.dev>",
        to: [TO],
        reply_to: email,
        subject: `Nová zpráva: ${topic || "bez tématu"} | ${name}`,
        text: body,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Resend error:", data);
      return NextResponse.json({ error: data }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Route error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
