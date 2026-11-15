"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Script from "next/script";
import Link from "next/link";

/* Vlastní rezervační kalendář: česky a ve vzhledu webu. Volné časy čte z /api/terminy
   a rezervaci zapisuje přes /api/rezervace; obojí vzadu obsluhuje Calendly.
   Když napojení není nastavené nebo neodpovídá, ukáže se původní vložené okno Calendly. */

type Misto = { kind: string; label: string };
type Data =
  | { configured: false }
  | { configured: true; ukazka?: boolean; tz: string; nazev: string; delka: number; mista: Misto[]; slots: string[] };

const MESICE = ["Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"];
const MESICE_2 = ["ledna", "února", "března", "dubna", "května", "června", "července", "srpna", "září", "října", "listopadu", "prosince"];
const DNY = ["Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota", "Neděle"];
const DNY_KR = ["Po", "Út", "St", "Čt", "Pá", "So", "Ne"];
const TEMATA = ["Firma", "Rodina a majetek", "Obojí"];
const CALENDLY_URL = "https://calendly.com/dvorak-beplan/30min?hide_gdpr_banner=1";

const pad = (n: number) => String(n).padStart(2, "0");
// pořadí dne v týdnu, pondělí = 0
const denVTydnu = (y: number, m: number, d: number) => (new Date(Date.UTC(y, m - 1, d)).getUTCDay() + 6) % 7;
const rozloz = (key: string) => key.split("-").map(Number) as [number, number, number];
const popisDne = (key: string) => {
  const [y, m, d] = rozloz(key);
  return `${DNY[denVTydnu(y, m, d)]} ${d}. ${MESICE_2[m - 1]}`;
};

function CalendlyInline() {
  return (
    <>
      <div className="calendly-inline-widget" data-url={CALENDLY_URL} style={{ minWidth: 320, height: 700 }} />
      <link rel="stylesheet" href="https://assets.calendly.com/assets/external/widget.css" precedence="default" />
      <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="afterInteractive" />
    </>
  );
}

export function Rezervace() {
  const [data, setData] = useState<Data | null>(null);
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [mesic, setMesic] = useState<string | null>(null); // "2026-11"
  const [den, setDen] = useState<string | null>(null); // "2026-11-19"
  const [slot, setSlot] = useState<string | null>(null); // ISO v UTC
  const [tema, setTema] = useState(2);
  const [misto, setMisto] = useState<string | null>(null);
  const [stav, setStav] = useState<"" | "odesilam">("");
  const [chyba, setChyba] = useState<{ text: string; nahradni?: string } | null>(null);
  const ukazka = useRef(false);
  const koren = useRef<HTMLDivElement>(null);

  const nacti = (fresh = false) => {
    const p = new URLSearchParams();
    if (ukazka.current) p.set("ukazka", "1");
    if (fresh) p.set("fresh", "1");
    return fetch(`/api/terminy?${p}`)
      .then((r) => r.json())
      .then((d: Data) => setData(d))
      .catch(() => setData({ configured: false }));
  };

  useEffect(() => {
    ukazka.current = new URLSearchParams(window.location.search).get("ukazka") === "1";
    nacti();
  }, []);

  const ok = data && data.configured ? data : null;

  // Časy se ukazují v pražském čase bez ohledu na to, kde návštěvník právě je
  const fmt = useMemo(() => {
    const tz = ok?.tz ?? "Europe/Prague";
    const d = new Intl.DateTimeFormat("en-CA", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit" });
    const t = new Intl.DateTimeFormat("cs-CZ", { timeZone: tz, hour: "numeric", minute: "2-digit" });
    return { den: (iso: string) => d.format(new Date(iso)), cas: (iso: string) => t.format(new Date(iso)) };
  }, [ok?.tz]);

  const poDnech = useMemo(() => {
    const m = new Map<string, string[]>();
    for (const s of ok?.slots ?? []) {
      const k = fmt.den(s);
      m.set(k, [...(m.get(k) ?? []), s]);
    }
    return m;
  }, [ok, fmt]);

  const dny = useMemo(() => Array.from(poDnech.keys()).sort(), [poDnech]);
  const mesice = useMemo(() => Array.from(new Set(dny.map((k) => k.slice(0, 7)))), [dny]);
  const aktDen = den && poDnech.has(den) ? den : dny[0] ?? null;
  const aktMesic = mesic && mesice.includes(mesic) ? mesic : aktDen?.slice(0, 7) ?? null;
  const aktMisto = misto ?? ok?.mista[0]?.kind ?? null;
  const dnes = fmt.den(new Date().toISOString());

  if (!data) return <div className="rez rez-ceka" aria-busy="true" aria-label="Načítám volné termíny" />;
  if (!ok) return <CalendlyInline />;

  // „ve 13:00", ale „v 9:30": předložka podle toho, jak se hodina čte
  const predlozka = (cas: string) => ([2, 3, 4, 12, 13, 14, 20, 21, 22, 23].includes(parseInt(cas, 10)) ? "ve" : "v");
  const souhrn = slot && aktDen ? `${popisDne(aktDen)} ${predlozka(fmt.cas(slot))} ${fmt.cas(slot)}` : null;

  // Kroky mají různou výšku; po přechodu ať je začátek kalendáře vidět
  const jdiNa = (k: 0 | 1 | 2) => {
    setStep(k);
    requestAnimationFrame(() => {
      const el = koren.current;
      if (el && el.getBoundingClientRect().top < 80) el.scrollIntoView({ block: "start" });
    });
  };

  // Mřížka měsíce včetně dnů sousedních měsíců, aby řádky byly celé
  const bunky: { key: string; d: number; jiny: boolean }[] = [];
  if (aktMesic) {
    const [y, m] = aktMesic.split("-").map(Number);
    const prvni = denVTydnu(y, m, 1);
    const pocet = new Date(Date.UTC(y, m, 0)).getUTCDate();
    for (let i = prvni; i > 0; i--) {
      const x = new Date(Date.UTC(y, m - 1, 1 - i));
      bunky.push({ key: `${x.getUTCFullYear()}-${pad(x.getUTCMonth() + 1)}-${pad(x.getUTCDate())}`, d: x.getUTCDate(), jiny: true });
    }
    for (let d = 1; d <= pocet; d++) bunky.push({ key: `${y}-${pad(m)}-${pad(d)}`, d, jiny: false });
    for (let i = 1; bunky.length % 7 !== 0; i++) {
      const x = new Date(Date.UTC(y, m - 1, pocet + i));
      bunky.push({ key: `${x.getUTCFullYear()}-${pad(x.getUTCMonth() + 1)}-${pad(x.getUTCDate())}`, d: x.getUTCDate(), jiny: true });
    }
  }
  const iMesic = aktMesic ? mesice.indexOf(aktMesic) : -1;

  const vyberDen = (k: string) => {
    setDen(k);
    setMesic(k.slice(0, 7));
    setSlot(null);
    setChyba(null);
  };
  const posunMesic = (o: number) => {
    const m = mesice[iMesic + o];
    if (!m) return;
    setMesic(m);
    const prvniDen = dny.find((k) => k.startsWith(m));
    if (prvniDen) {
      setDen(prvniDen);
      setSlot(null);
    }
  };

  async function odesli(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!slot) return;
    const fd = new FormData(e.currentTarget);
    setStav("odesilam");
    setChyba(null);
    try {
      const res = await fetch("/api/rezervace", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          start: slot,
          name: fd.get("name"),
          email: fd.get("email"),
          phone: fd.get("phone"),
          tema: TEMATA[tema],
          misto: aktMisto,
          web: fd.get("web"),
          ukazka: ukazka.current,
        }),
      });
      const out = await res.json().catch(() => ({}));
      if (res.ok) {
        jdiNa(2);
      } else if (out.obsazeno) {
        setChyba({ text: out.error });
        setSlot(null);
        jdiNa(0);
        nacti(true);
      } else {
        setChyba({ text: out.error || "Rezervaci se nepodařilo zapsat.", nahradni: out.nahradni });
      }
    } catch {
      setChyba({ text: "Rezervaci se nepodařilo zapsat. Zkontrolujte prosím připojení a zkuste to znovu." });
    }
    setStav("");
  }

  const doKalendare = () => {
    if (!slot) return;
    const z = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    const od = new Date(slot);
    const dd = new Date(od.getTime() + ok.delka * 60000);
    const ics = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//financnistrateg.com//Rezervace//CS", "BEGIN:VEVENT",
      `UID:${z(od)}@financnistrateg.com`, `DTSTAMP:${z(new Date())}`, `DTSTART:${z(od)}`, `DTEND:${z(dd)}`,
      "SUMMARY:Úvodní konzultace: Adam Dvořák\\, EFA", "END:VEVENT", "END:VCALENDAR",
    ].join("\r\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
    a.download = "konzultace-adam-dvorak.ics";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <div ref={koren} className={`rez st${step}`}>
      <aside className="rez-levy">
        <div className="rez-kdo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/adam-dvorak-about.jpg" alt="" width={56} height={56} />
          <div>
            <b>Adam Dvořák, EFA</b>
            <span>Finanční stratég</span>
          </div>
        </div>
        <div className="rez-nazev">Úvodní konzultace</div>
        <ul className="rez-fakta">
          <li>
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
            {ok.delka} minut
          </li>
          <li>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s7-6.2 7-11a7 7 0 0 0-14 0c0 4.800 7 11 7 11z" /><circle cx="12" cy="10" r="2.500" /></svg>
            {ok.mista.length ? ok.mista.map((m) => m.label).join(" nebo ").replace(/ nebo O/, " nebo o") : "Online nebo v kanceláři, Praha 1"}
          </li>
          <li>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.500l4.500 4.500L19 7.500" /></svg>
            Zdarma
          </li>
        </ul>
        <div className={`rez-vas${souhrn ? " ma" : ""}`} aria-live="polite">
          <small>Váš termín</small>
          <div>{souhrn ?? "Vyberte den a čas"}</div>
        </div>
      </aside>

      <div className="rez-pravy">
        <ol className="rez-kroky" aria-label="Postup rezervace">
          {["Termín", "Údaje", "Hotovo"].map((k, i) => (
            <li key={k} className={i === step ? "akt" : i < step ? "hot" : ""} aria-current={i === step ? "step" : undefined}>
              <b>{i + 1}</b>
              <span>{k}</span>
            </li>
          ))}
        </ol>

        {ok.ukazka && <p className="rez-ukazka">Ukázková data. Rezervace se nikam nezapíše.</p>}

        {step === 0 && (
          <div className="rez-pn" key="p0">
            {dny.length === 0 ? (
              <p className="rez-prazdno">
                V nejbližších týdnech není volný žádný termín. Napište mi prosím přes formulář níže, domluvíme se jinak.
              </p>
            ) : (
              <>
                {chyba && <p className="rez-chyba" role="alert">{chyba.text}</p>}
                <div className="rez-vyber">
                  <div className="rez-mesic">
                    <div className="rez-mes-hl">
                      <div className="rez-mes-nazev">
                        {aktMesic && `${MESICE[Number(aktMesic.slice(5)) - 1]} ${aktMesic.slice(0, 4)}`}
                      </div>
                      <div className="rez-sipky">
                        <button type="button" onClick={() => posunMesic(-1)} disabled={iMesic <= 0} aria-label="Předchozí měsíc">‹</button>
                        <button type="button" onClick={() => posunMesic(1)} disabled={iMesic >= mesice.length - 1} aria-label="Další měsíc">›</button>
                      </div>
                    </div>
                    <div className="rez-g">
                      {DNY_KR.map((d) => (
                        <div key={d} className="rez-dn" aria-hidden="true">{d}</div>
                      ))}
                      {bunky.map((b) =>
                        poDnech.has(b.key) && !b.jiny ? (
                          <button
                            key={b.key}
                            type="button"
                            className={`rez-c v${b.key === aktDen ? " on" : ""}`}
                            aria-pressed={b.key === aktDen}
                            aria-label={`${popisDne(b.key)}, volné termíny`}
                            onClick={() => vyberDen(b.key)}
                          >
                            {b.d}
                          </button>
                        ) : (
                          <span key={b.key} className={`rez-c${b.jiny ? " m" : ""}${b.key === dnes ? " dnes" : ""}`} aria-hidden="true">
                            {b.d}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  <div className="rez-pas" role="group" aria-label="Dny s volným termínem">
                    {dny.slice(0, 14).map((k) => {
                      const [y, m, d] = rozloz(k);
                      return (
                        <button key={k} type="button" className={`rez-den${k === aktDen ? " on" : ""}`} aria-pressed={k === aktDen} aria-label={popisDne(k)} onClick={() => vyberDen(k)}>
                          <small>{DNY_KR[denVTydnu(y, m, d)]}</small>
                          <b>{d}</b>
                          <i>{MESICE_2[m - 1].slice(0, 3)}</i>
                        </button>
                      );
                    })}
                  </div>

                  <div className="rez-casy">
                    <div className="rez-casy-den">{aktDen && popisDne(aktDen)}</div>
                    <div className="rez-casy-hl">Volné časy</div>
                    <div className="rez-casy-list" key={aktDen}>
                      {(aktDen ? poDnech.get(aktDen) ?? [] : []).map((s, i) => (
                        <button
                          key={s}
                          type="button"
                          className={`rez-z${s === slot ? " on" : ""}`}
                          style={{ animationDelay: `${i * 50}ms` }}
                          aria-pressed={s === slot}
                          onClick={() => { setSlot(s); setChyba(null); }}
                        >
                          {fmt.cas(s)}
                        </button>
                      ))}
                    </div>
                    <p className="rez-pozn">Časy jsou v pražském čase.</p>
                  </div>
                </div>
                <div className="rez-pata">
                  <span>{souhrn ?? "Vyberte den a čas"}</span>
                  <button type="button" className="rez-dal" disabled={!slot} onClick={() => jdiNa(1)}>Pokračovat →</button>
                </div>
              </>
            )}
          </div>
        )}

        {step === 1 && (
          <form className="rez-pn" key="p1" onSubmit={odesli}>
            <h3 className="rez-h">Kam vám mám poslat pozvánku?</h3>
            <label aria-hidden="true" style={{ position: "absolute", left: -9999, width: 1, height: 1, overflow: "hidden" }}>
              Web<input type="text" name="web" tabIndex={-1} autoComplete="off" />
            </label>
            <div className="rez-pole-g">
              <label className="rez-pole siroke">Jméno a příjmení<input name="name" type="text" autoComplete="name" placeholder="Jan Novák" required /></label>
              <label className="rez-pole">E-mail<input name="email" type="email" autoComplete="email" placeholder="jan@firma.cz" required /></label>
              <label className="rez-pole">Telefon<input name="phone" type="tel" autoComplete="tel" placeholder="+420" /></label>
            </div>
            {ok.mista.length > 1 && (
              <>
                <div className="rez-stitek">Jak se sejdeme?</div>
                <div className="rez-volby" role="group" aria-label="Jak se sejdeme">
                  {ok.mista.map((m) => (
                    <button key={m.kind} type="button" className={m.kind === aktMisto ? "on" : ""} aria-pressed={m.kind === aktMisto} onClick={() => setMisto(m.kind)}>{m.label}</button>
                  ))}
                </div>
              </>
            )}
            <div className="rez-stitek">O čem chcete mluvit?</div>
            <div className="rez-volby" role="group" aria-label="Téma schůzky">
              {TEMATA.map((t, i) => (
                <button key={t} type="button" className={i === tema ? "on" : ""} aria-pressed={i === tema} onClick={() => setTema(i)}>{t}</button>
              ))}
            </div>
            {chyba && (
              <p className="rez-chyba" role="alert">
                {chyba.text}{" "}
                {chyba.nahradni && <a href={chyba.nahradni} target="_blank" rel="noopener noreferrer">Dokončit rezervaci přímo na Calendly</a>}
              </p>
            )}
            <p className="rez-pozn">
              Rezervaci eviduje služba Calendly, která vám pošle i pozvánku. <Link href="/privacy">Jak s údaji zacházím</Link>
            </p>
            <div className="rez-pata">
              <button type="button" className="rez-zpet" onClick={() => { jdiNa(0); setChyba(null); }}>← Zpět na termín</button>
              <button type="submit" className="rez-dal" disabled={stav === "odesilam"}>{stav === "odesilam" ? "Zapisuji…" : "Potvrdit termín"}</button>
            </div>
          </form>
        )}

        {step === 2 && (
          <div className="rez-pn rez-hotovo" key="p2" role="status">
            <svg className="rez-chk" width="88" height="88" viewBox="0 0 88 88" aria-hidden="true">
              <circle cx="44" cy="44" r="38" transform="rotate(-90 44 44)" />
              <path d="M28 45l11 11 21-23" />
            </svg>
            <h3 className="rez-h">Máte to v kalendáři.</h3>
            <div className="rez-hotovo-kdy">{souhrn}</div>
            <p>Pozvánka je na cestě do vašeho e-mailu.</p>
            <div className="rez-hotovo-btn">
              <button type="button" className="rez-dal" onClick={doKalendare}>Přidat do kalendáře</button>
              <Link className="rez-zpet-web" href="/">Zpět na web</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
