import { NextRequest, NextResponse } from "next/server";
import { odesilatel, posliPostu } from "@/lib/posta";

/* Anonymní zpětná vazba k článku („Pomohl vám tenhle článek?"). Odpověď přijde e-mailem. */
const TO = "adamdvorak@financnistrateg.com";

// Nejvýš 10 odpovědí z jedné IP adresy za 10 minut (v rámci jedné instance serveru)
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 10;
const hits = new Map<string, number[]>();

function tooMany(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const text = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/[\r\n]+/g, " ").trim().slice(0, max) : "");

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const slug = text(body.slug, 120);
    const title = text(body.title, 200);
    const odpoved = body.odpoved === "ano" ? "ano" : body.odpoved === "ne" ? "ne" : "";
    const duvod = text(body.duvod, 120);
    if (!slug || !odpoved || !/^[a-z0-9-]+$/.test(slug)) {
      return NextResponse.json({ error: "Neplatná odpověď." }, { status: 400 });
    }

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
    if (tooMany(ip)) return NextResponse.json({ ok: true });

    const res = await posliPostu({
        from: odesilatel("Web financnistrateg.com"),
        to: [TO],
        subject: `[Zpětná vazba] ${odpoved === "ano" ? "Pomohl" : "Nepomohl"}: ${title || slug}`,
        text: [
          `Článek: ${title || slug}`,
          `Adresa: https://www.financnistrateg.com/blog/${slug}`,
          `Pomohl: ${odpoved}`,
          duvod ? `Co chybělo: ${duvod}` : null,
        ]
          .filter(Boolean)
          .join("\n"),
      });
    if (!res.ok) {
      console.error("Resend error:", await res.text());
      return NextResponse.json({ error: "Odeslání se nepovedlo." }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Zpetna vazba error:", err);
    return NextResponse.json({ error: "Odeslání se nepovedlo." }, { status: 500 });
  }
}
