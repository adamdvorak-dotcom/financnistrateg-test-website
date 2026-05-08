import { NextRequest, NextResponse } from "next/server";

const TO = "adamdvorak@financnistrateg.com";

export async function POST(req: NextRequest) {
  try {
    const { name, phone, email, topic, message } = await req.json();

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
        subject: `Nová zpráva: ${topic || "bez tématu"} — ${name}`,
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
