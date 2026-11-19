import { NextRequest, NextResponse } from "next/server";
import { odesilatel, posliPostu } from "@/lib/posta";

const TO = "adamdvorak@financnistrateg.com";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Neplatná e-mailová adresa." }, { status: 400 });
    }

    const res = await posliPostu({
        from: odesilatel("Web financnistrateg.com"),
        to: [TO],
        reply_to: email,
        subject: `Nový odběratel newsletteru: ${email}`,
        text: `Nový odběratel se přihlásil k newsletteru:\n\n${email}`,
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
