/* Napojení vlastního rezervačního kalendáře na Calendly.
   Web kreslí kalendář sám (česky, ve vlastním vzhledu) a Calendly zůstává vzadu:
   drží volné časy, zapisuje rezervace do kalendáře a posílá pozvánky.

   Potřebuje osobní přístupový token Calendly v proměnné prostředí CALENDLY_TOKEN
   (oprávnění users:read, event_types:read, scheduled_events:write).
   Volitelně CALENDLY_EVENT_TYPE s adresou (URI) typu schůzky; jinak se vezme typ
   s adresou končící na /30min, případně první aktivní.
   Bez tokenu se na webu dál ukazuje původní vložené okno Calendly. */

const API = "https://api.calendly.com";
export const TZ = "Europe/Prague";

type Location = { kind: string; location?: string };
type Question = { name: string; required: boolean; enabled: boolean; position: number };

export type EventType = {
  uri: string;
  name: string;
  duration: number;
  schedulingUrl: string;
  locations: Location[];
  questions: Question[];
};

export function calendlyConfigured() {
  return Boolean(process.env.CALENDLY_TOKEN);
}

async function call(path: string, init?: RequestInit & { next?: { revalidate: number } }) {
  const res = await fetch(path.startsWith("http") ? path : API + path, {
    ...init,
    headers: {
      Authorization: `Bearer ${process.env.CALENDLY_TOKEN}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data };
}

/* Typ schůzky se mění zřídka, stačí ho číst jednou za hodinu */
export async function getEventType(): Promise<EventType | null> {
  const hodina = { next: { revalidate: 3600 } };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let raw: any = null;
  const pevny = process.env.CALENDLY_EVENT_TYPE;
  if (pevny) {
    const r = await call(pevny, hodina);
    if (r.ok) raw = r.data.resource;
  } else {
    const me = await call("/users/me", hodina);
    if (!me.ok) return null;
    const list = await call(`/event_types?user=${encodeURIComponent(me.data.resource.uri)}&active=true&count=50`, hodina);
    if (!list.ok) return null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const all: any[] = list.data.collection ?? [];
    raw = all.find((e) => e.slug === "30min") ?? all[0] ?? null;
  }
  if (!raw) return null;
  return {
    uri: raw.uri,
    name: raw.name,
    duration: raw.duration ?? 30,
    schedulingUrl: raw.scheduling_url,
    locations: (raw.locations ?? []).map((l: Location) => ({ kind: l.kind, location: l.location })),
    questions: (raw.custom_questions ?? []).filter((q: Question) => q.enabled !== false),
  };
}

/* Volné časy na příštích pět týdnů. Calendly dovoluje ptát se jen na omezené období,
   proto pět dotazů po sedmi dnech. Začátek se zaokrouhluje na pět minut, aby se odpovědi
   daly minutu držet v mezipaměti a web Calendly zbytečně nezatěžoval. */
export async function getSlots(eventTypeUri: string, fresh = false): Promise<string[] | null> {
  const krok = 5 * 60 * 1000;
  const start = Math.ceil((Date.now() + 60 * 1000) / krok) * krok;
  const tyden = 7 * 24 * 60 * 60 * 1000;
  const okna = [0, 1, 2, 3, 4].map((i) => {
    const od = new Date(start + i * tyden).toISOString();
    const dd = new Date(start + (i + 1) * tyden - 1000).toISOString();
    return `/event_type_available_times?event_type=${encodeURIComponent(eventTypeUri)}&start_time=${encodeURIComponent(od)}&end_time=${encodeURIComponent(dd)}`;
  });
  const res = await Promise.all(
    okna.map((u) => call(u, fresh ? { cache: "no-store" } : { next: { revalidate: 60 } }))
  );
  if (res.every((r) => !r.ok)) return null;
  const slots: string[] = [];
  for (const r of res) {
    if (!r.ok) continue;
    for (const s of r.data.collection ?? []) {
      if (s.status === "available") slots.push(new Date(s.start_time).toISOString());
    }
  }
  return Array.from(new Set(slots)).sort();
}

/* Česká podoba místa schůzky pro tlačítka ve formuláři */
export function locationLabel(l: Location): string {
  switch (l.kind) {
    case "physical":
      return "Osobně v kanceláři";
    case "outbound_call":
      return "Zavolám vám";
    case "inbound_call":
      return "Zavoláte mi";
    case "custom":
    case "ask_invitee":
      return l.location || "Podle domluvy";
    default:
      return "Online";
  }
}

export type BookingInput = {
  start: string;
  name: string;
  email: string;
  phone?: string;
  tema?: string;
  misto?: string;
  // UTM parametry návštěvy; Calendly je ukáže u rezervace (gclid nepřijímá)
  tracking?: Record<string, string>;
};

export async function createBooking(et: EventType, b: BookingInput) {
  // Místo musí odpovídat tomu, co má typ schůzky nastavené
  const loc = et.locations.find((l) => l.kind === b.misto) ?? et.locations[0];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let location: any = undefined;
  if (loc) {
    location = { kind: loc.kind };
    if (loc.kind === "outbound_call") location.location = b.phone || "";
    else if (loc.location) location.location = loc.location;
  }

  // Vlastní otázky typu schůzky: povinné musí dostat odpověď, text otázky musí sedět přesně
  const qa = et.questions
    .map((q) => {
      const jeTelefon = /telefon|phone|číslo|cislo/i.test(q.name);
      const answer = jeTelefon ? b.phone : b.tema;
      if (!answer && !q.required) return null;
      return { question: q.name, answer: answer || "neuvedeno", position: q.position };
    })
    .filter(Boolean);

  const posli = (tracking?: Record<string, string>) =>
    call("/invitees", {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify({
        event_type: et.uri,
        start_time: b.start,
        invitee: { name: b.name, email: b.email, timezone: TZ },
        ...(location ? { location } : {}),
        ...(qa.length ? { questions_and_answers: qa } : {}),
        ...(tracking && Object.keys(tracking).length ? { tracking } : {}),
      }),
    });

  const maTracking = !!b.tracking && Object.keys(b.tracking).length > 0;
  const r = await posli(b.tracking);
  // Kdyby Calendly údaje o zdroji odmítlo, rezervace se zapíše bez nich (obsazený termín se neopakuje)
  if (!r.ok && maTracking && r.status === 400) return posli();
  return r;
}

/* Odkaz na stejný čas přímo na Calendly, kdyby zápis přes rozhraní neprošel */
export function slotUrl(et: EventType, startIso: string) {
  const d = new Date(startIso);
  const iso = d.toISOString().replace(/\.\d{3}Z$/, "Z");
  const den = iso.slice(0, 10);
  return `${et.schedulingUrl}/${iso}?month=${den.slice(0, 7)}&date=${den}`;
}

/* Odkaz na videohovor ke schůzce. Calendly ho po zápisu doplňuje s malým zpožděním,
   takže může ještě chybět; pak se vrátí null. */
export async function getJoinUrl(eventUri: string): Promise<string | null> {
  try {
    const r = await call(eventUri, { cache: "no-store" });
    const url = r.ok ? r.data.resource?.location?.join_url : null;
    return typeof url === "string" && url.startsWith("https://") ? url : null;
  } catch {
    return null;
  }
}
