import { NextRequest, NextResponse } from "next/server";
import { calendlyConfigured, createBooking, getEventType, getJoinUrl, locationLabel, slotUrl } from "@/lib/calendly";
import { posliPotvrzeni, potvrzeniZapnute } from "@/lib/potvrzeni";

/* Zápis rezervace z vlastního kalendáře do Calendly. */

// Nejvýš 5 pokusů z jedné IP adresy za 10 minut (v rámci jedné instance serveru)
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

const text = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Skryté pole vyplňují jen roboti: tváříme se, že vše prošlo
    if (body.web) return NextResponse.json({ ok: true });

    const start = text(body.start, 40);
    const name = text(body.name, 120);
    const email = text(body.email, 160);
    const phone = text(body.phone, 40);
    const tema = text(body.tema, 200);
    const misto = text(body.misto, 40);

    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Vyplňte prosím jméno a platný e-mail." }, { status: 400 });
    }
    const kdy = new Date(start);
    if (!start || Number.isNaN(kdy.getTime()) || kdy.getTime() < Date.now()) {
      return NextResponse.json({ error: "Tenhle termín už není k dispozici.", obsazeno: true }, { status: 409 });
    }

    if (process.env.NODE_ENV === "development" && body.ukazka === true) {
      return NextResponse.json({ ok: true, ukazka: true });
    }

    if (!calendlyConfigured()) {
      return NextResponse.json({ error: "Rezervace teď není dostupná." }, { status: 503 });
    }

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
    if (tooMany(ip)) {
      return NextResponse.json({ error: "Příliš mnoho pokusů, zkuste to prosím za chvíli." }, { status: 429 });
    }

    const et = await getEventType();
    if (!et) return NextResponse.json({ error: "Rezervace teď není dostupná." }, { status: 503 });

    const r = await createBooking(et, { start: kdy.toISOString(), name, email, phone, tema, misto });
    if (r.ok) {
      // Vlastní české potvrzení (jen když je nastavená ověřená odesílací adresa).
      // Rezervace je v tu chvíli už zapsaná, takže případná chyba e-mailu ji neshodí.
      if (potvrzeniZapnute()) {
        const inv = r.data?.resource ?? {};
        const loc = et.locations.find((l) => l.kind === misto) ?? et.locations[0];
        const mistoText = !loc
          ? "Online"
          : loc.kind === "google_conference"
            ? "Online přes Google Meet"
            : loc.kind === "zoom_conference"
              ? "Online přes Zoom"
              : loc.kind === "microsoft_teams_conference"
                ? "Online přes Microsoft Teams"
                : loc.kind === "physical"
                  ? `Osobně${loc.location ? `, ${loc.location}` : " v kanceláři"}`
                  : locationLabel(loc);
        await posliPotvrzeni({
          to: email,
          start: kdy.toISOString(),
          delka: et.duration,
          misto: mistoText,
          joinUrl: typeof inv.event === "string" ? await getJoinUrl(inv.event) : null,
          rescheduleUrl: typeof inv.reschedule_url === "string" ? inv.reschedule_url : null,
          cancelUrl: typeof inv.cancel_url === "string" ? inv.cancel_url : null,
        });
      }
      return NextResponse.json({ ok: true });
    }

    console.error("Calendly booking error:", r.status, JSON.stringify(r.data).slice(0, 600));
    const zprava = JSON.stringify(r.data).toLowerCase();
    // Termín mezitím obsadil někdo jiný
    if (r.status === 400 && /not available|no longer|already|unavailable|invalid start/.test(zprava)) {
      return NextResponse.json({ error: "Tenhle termín mezitím někdo obsadil. Vyberte prosím jiný.", obsazeno: true }, { status: 409 });
    }
    // Cokoli jiného (denní limit, nastavení typu schůzky…): nabídneme stejný čas přímo na Calendly
    return NextResponse.json(
      { error: "Rezervaci se nepodařilo zapsat.", nahradni: slotUrl(et, kdy.toISOString()) },
      { status: 502 }
    );
  } catch (err) {
    console.error("Rezervace error:", err);
    return NextResponse.json({ error: "Rezervaci se nepodařilo zapsat." }, { status: 500 });
  }
}
