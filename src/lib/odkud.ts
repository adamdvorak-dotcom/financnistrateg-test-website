/* Odkud návštěvník přišel (UTM parametry a gclid). Prohlížeč je při příchodu uloží do sessionStorage
   (klíč fs_utm, dělá to /znacky.js), formuláře je přiloží k odeslání a server je připíše do e-mailu Adamovi. */
export const ODKUD_KLICE = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid"] as const;
export type Odkud = Partial<Record<(typeof ODKUD_KLICE)[number], string>>;

/* V prohlížeči: přečte uložené hodnoty, nebo null */
export function ctiOdkud(): Odkud | null {
  try {
    const raw = window.sessionStorage.getItem("fs_utm");
    return raw ? (JSON.parse(raw) as Odkud) : null;
  } catch {
    return null;
  }
}

/* Na serveru: z těla požadavku vezme jen známé klíče, ořízne délku a odstraní konce řádků */
export function cistyOdkud(v: unknown): Odkud {
  const out: Odkud = {};
  if (!v || typeof v !== "object") return out;
  for (const k of ODKUD_KLICE) {
    const x = (v as Record<string, unknown>)[k];
    if (typeof x === "string" && x.trim()) out[k] = x.replace(/[\r\n]+/g, " ").trim().slice(0, 200);
  }
  return out;
}

/* Řádky na konec oznamovacího e-mailu; prázdné pole, když není co připsat */
export function odkudRadky(o: Odkud): string[] {
  const radky = ODKUD_KLICE.filter((k) => o[k]).map((k) => `${k}: ${o[k]}`);
  return radky.length ? ["", "ODKUD PŘIŠEL", "────────────", ...radky] : [];
}

/* Událost pro Tag Manager; odešle se jen se souhlasem s marketingovými cookies (řeší /znacky.js) */
export function udalost(nazev: string) {
  try {
    (window as unknown as { fsZnacky?: { udalost?: (n: string) => void } }).fsZnacky?.udalost?.(nazev);
  } catch {}
}
