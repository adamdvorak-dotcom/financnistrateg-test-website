import { NextRequest, NextResponse } from "next/server";
import { calendlyConfigured, getEventType, getSlots, locationLabel, TZ } from "@/lib/calendly";

/* Volné termíny pro vlastní rezervační kalendář.
   Odpověď { configured: false } znamená, že web má ukázat původní okno Calendly. */

// Ukázková data jen pro místní vývoj (adresa stránky s ?ukazka=1), ať jde kalendář
// vyzkoušet i bez tokenu. V ostrém provozu se nikdy nepoužijí.
function ukazka() {
  const slots: string[] = [];
  const dnes = new Date();
  for (let d = 2; d < 30; d++) {
    const den = new Date(Date.UTC(dnes.getUTCFullYear(), dnes.getUTCMonth(), dnes.getUTCDate() + d));
    const wd = den.getUTCDay();
    if (wd === 0 || wd === 6 || d % 5 === 0) continue;
    for (const [h, m] of [[8, 0], [9, 30], [12, 0], [14, 30]]) {
      if ((d + h) % 3 === 0) continue;
      slots.push(new Date(den.getTime() + (h * 60 + m) * 60000).toISOString());
    }
  }
  return {
    configured: true,
    ukazka: true,
    tz: TZ,
    nazev: "Úvodní konzultace",
    delka: 30,
    mista: [
      { kind: "google_conference", label: "Online" },
      { kind: "physical", label: "Osobně v kanceláři" },
    ],
    slots,
  };
}

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams;
  if (process.env.NODE_ENV === "development" && q.get("ukazka") === "1") {
    return NextResponse.json(ukazka());
  }
  if (!calendlyConfigured()) return NextResponse.json({ configured: false });

  try {
    const et = await getEventType();
    if (!et) return NextResponse.json({ configured: false, error: "event_type" });
    const slots = await getSlots(et.uri, q.get("fresh") === "1");
    if (!slots) return NextResponse.json({ configured: false, error: "slots" });
    return NextResponse.json({
      configured: true,
      tz: TZ,
      nazev: et.name,
      delka: et.duration,
      mista: et.locations.map((l) => ({ kind: l.kind, label: locationLabel(l) })),
      slots,
    });
  } catch (err) {
    console.error("Terminy error:", err);
    return NextResponse.json({ configured: false, error: "exception" });
  }
}
