"use client";
import { useEffect, useState } from "react";

/* Dvě nápovědy v textu článku:
   1) slovníček – první výskyt odborného pojmu dostane tečkované podtržení a po najetí,
      klepnutí nebo zaostření klávesnicí se ukáže krátké vysvětlení,
   2) náhled článku – po najetí myší na odkaz na jiný článek se ukáže kartička s tím, kam vede.
   Pojmy se hledají samy, takže to funguje i v článcích, které teprve přibudou. */

export type LinkMeta = { t: string; g: string; d: string; m?: number };

// [vzor, název v bublině, vysvětlení]
const POJMY: [string, string, string][] = [
  ["ETF", "ETF", "Fond obchodovaný na burze, který obvykle kopíruje tržní index. Jedním nákupem držíte stovky i tisíce firem."],
  ["DIP", "DIP", "Dlouhodobý investiční produkt. Investiční účet na stáří, u kterého si vklady můžete odečíst od základu daně."],
  ["TER", "TER", "Celková roční nákladovost fondu. Kolik procent z vaší investice si fond za rok vezme na poplatcích."],
  ["UCITS", "UCITS", "Evropská pravidla pro fondy určené běžným investorům. Hlídají rozložení rizika a oddělení majetku fondu."],
  ["[Aa]kumulační\\p{L}*", "Akumulační fond", "Dividendy nevyplácí, ale sám je znovu investuje."],
  ["[Ss]rážkov\\p{L}+\\s+da\\p{L}+", "Srážková daň", "Daň, kterou z výnosu strhne už ten, kdo ho vyplácí. K vám přijde částka po zdanění."],
  ["[Ss]věřensk\\p{L}+\\s+fond\\p{L}*", "Svěřenský fond", "Majetek vyčleněný z vlastnictví zakladatele. Spravuje ho správce podle statutu ve prospěch obmyšlených."],
  ["[Oo]bmyšlen\\p{L}+", "Obmyšlený", "Osoba, které má něco připadnout. U svěřenského fondu majetek nebo výnosy, u životního pojištění pojistné plnění."],
  ["[Hh]olding\\p{L}*", "Holding", "Uspořádání, ve kterém mateřská společnost vlastní podíly v dalších firmách."],
  ["[Dd]iverzifik\\p{L}+", "Diverzifikace", "Rozložení peněz mezi více investic, aby vás jedna z nich nepoložila."],
  ["[Vv]yměřovací\\p{L}*\\s+základ\\p{L}*", "Vyměřovací základ", "Částka, ze které se počítá pojistné a později i důchod."],
  ["p\\.\\s?a\\.", "p. a.", "Per annum, tedy ročně."],
];

type Hint =
  | { kind: "pojem"; nazev: string; popis: string; x: number; y: number; nad: boolean; ax: number }
  | { kind: "link"; meta: LinkMeta; x: number; y: number; nad: boolean };

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

/* Pojmy značíme jen v běžných odstavcích a odrážkách samotného textu.
   Nadpisy, odkazy, tabulky a vložené kalkulačky zůstávají, jak jsou. */
function vhodny(node: Text): boolean {
  const el = node.parentElement;
  if (!el || el.closest("a,button,h1,h2,h3,h4,summary,label,table,figure,form,.pojem,.pq")) return false;
  const blok = el.closest("p,li");
  if (!blok) return false;
  const vrch = blok.tagName === "LI" ? blok.parentElement : blok;
  return !!vrch?.parentElement?.classList.contains("article-body");
}

function oznacPojmy(root: Element) {
  if (root.querySelector(".pojem")) return; // už hotovo (React v režimu vývoje spouští efekt dvakrát)
  POJMY.forEach(([vzor, , ], idx) => {
    let re: RegExp;
    try {
      re = new RegExp(`(^|[^\\p{L}\\d])(${vzor})(?![\\p{L}\\d])`, "u");
    } catch {
      return;
    }
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let n: Node | null;
    while ((n = walker.nextNode())) {
      const text = n as Text;
      const m = re.exec(text.data);
      if (!m || !vhodny(text)) continue;
      const start = m.index + m[1].length;
      const mid = text.splitText(start);
      mid.splitText(m[2].length);
      const span = document.createElement("span");
      span.className = "pojem";
      span.dataset.pojem = String(idx);
      span.tabIndex = 0;
      span.setAttribute("role", "button");
      span.setAttribute("aria-describedby", "pojem-pop");
      mid.parentNode!.replaceChild(span, mid);
      span.appendChild(mid);
      break;
    }
  });
}

export function ArticleHints({ links }: { links: Record<string, LinkMeta> }) {
  const [hint, setHint] = useState<Hint | null>(null);

  useEffect(() => {
    const root = document.querySelector(".article-inner");
    if (!root) return;
    root.querySelectorAll(":scope > .article-body").forEach(oznacPojmy);

    let aktivni: Element | null = null;
    let ukazanoV = 0;
    let mysi = false; // nápovědu vyvolala myš (jinak zaostření klávesnicí nebo klepnutí)
    const skryj = () => {
      aktivni?.classList.remove("on");
      aktivni = null;
      setHint(null);
    };

    const ukazPojem = (el: HTMLElement, mys = false) => {
      const p = POJMY[Number(el.dataset.pojem)];
      if (!p) return;
      const r = el.getBoundingClientRect();
      mysi = mys;
      if (aktivni !== el) aktivni?.classList.remove("on");
      aktivni = el;
      el.classList.add("on");
      ukazanoV = performance.now();
      // Pojem zaostřený mimo obrazovku: nápověda se ukáže, až k němu stránka dojede
      if (r.bottom < 0 || r.top > window.innerHeight) return setHint(null);
      const vw = document.documentElement.clientWidth;
      const w = Math.min(270, vw - 24);
      const cx = r.left + r.width / 2;
      const x = clamp(cx - w / 2, 12, vw - w - 12);
      const nad = r.top > 150;
      setHint({ kind: "pojem", nazev: p[1], popis: p[2], x, y: nad ? r.top - 12 : r.bottom + 12, nad, ax: clamp(cx - x, 18, w - 18) });
    };

    const ukazLink = (a: HTMLAnchorElement, clientY?: number) => {
      mysi = clientY != null;
      const slug = (a.getAttribute("href") || "").replace(/^\/blog\//, "").replace(/[#?].*$/, "");
      const meta = links[slug];
      if (!meta) return;
      const rects = Array.from(a.getClientRects());
      if (!rects.length) return;
      // Odkaz přes dva řádky: kartička patří k řádku, na kterém je ukazatel
      const r = (clientY != null && rects.find((q) => clientY >= q.top - 2 && clientY <= q.bottom + 2)) || rects[rects.length - 1];
      aktivni?.classList.remove("on");
      aktivni = a;
      ukazanoV = performance.now();
      if (r.bottom < 0 || r.top > window.innerHeight) return setHint(null);
      const vw = document.documentElement.clientWidth;
      const w = Math.min(340, vw - 24);
      const nad = window.innerHeight - r.bottom < 210;
      setHint({ kind: "link", meta, x: clamp(r.left, 12, vw - w - 12), y: nad ? r.top - 12 : r.bottom + 12, nad });
    };

    const pojemZ = (t: EventTarget | null) => (t instanceof Element ? (t.closest(".pojem") as HTMLElement | null) : null);
    const linkZ = (t: EventTarget | null) =>
      t instanceof Element ? (t.closest('.article-body a[href^="/blog/"]') as HTMLAnchorElement | null) : null;

    const over = (e: Event) => {
      const pe = e as PointerEvent;
      if (pe.pointerType !== "mouse") return;
      const p = pojemZ(e.target);
      if (p) return ukazPojem(p, true);
      const a = linkZ(e.target);
      if (a && a !== aktivni) ukazLink(a, pe.clientY);
    };
    const out = (e: Event) => {
      const pe = e as PointerEvent;
      if (pe.pointerType !== "mouse" || !aktivni) return;
      const kam = pe.relatedTarget;
      if (kam instanceof Node && aktivni.contains(kam)) return;
      if (pojemZ(e.target) === aktivni || linkZ(e.target) === aktivni) skryj();
    };
    const focusin = (e: Event) => {
      const p = pojemZ(e.target);
      if (p) return ukazPojem(p);
      const a = linkZ(e.target);
      if (a && a.matches(":focus-visible")) ukazLink(a);
    };
    const focusout = () => skryj();
    const click = (e: Event) => {
      const p = pojemZ(e.target);
      if (!p) return;
      // Klepnutí prstem pojem nejdřív zaostří (a tím ukáže), teprve další klepnutí ho schová
      if (aktivni !== p) ukazPojem(p);
      else if ((e as PointerEvent).pointerType !== "mouse" && performance.now() - ukazanoV > 350) skryj();
    };
    // Při posunu stránky: nápověda vyvolaná myší zmizí, nápověda u zaostřeného prvku jede s ním
    // (zaostření klávesnicí stránku samo posune, takže schovat ji nejde)
    let raf = 0;
    const naScroll = () => {
      if (!aktivni || raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (!aktivni) return;
        if (mysi) {
          if (performance.now() - ukazanoV > 300) skryj();
        } else if (aktivni.classList.contains("pojem")) ukazPojem(aktivni as HTMLElement);
        else ukazLink(aktivni as HTMLAnchorElement);
      });
    };
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") skryj();
    };
    const down = (e: Event) => {
      if (aktivni && !(e.target instanceof Node && aktivni.contains(e.target))) skryj();
    };

    root.addEventListener("pointerover", over);
    root.addEventListener("pointerout", out);
    root.addEventListener("focusin", focusin);
    root.addEventListener("focusout", focusout);
    root.addEventListener("click", click);
    document.addEventListener("keydown", key);
    document.addEventListener("pointerdown", down);
    window.addEventListener("scroll", naScroll, { passive: true });
    window.addEventListener("resize", skryj);
    return () => {
      root.removeEventListener("pointerover", over);
      root.removeEventListener("pointerout", out);
      root.removeEventListener("focusin", focusin);
      root.removeEventListener("focusout", focusout);
      root.removeEventListener("click", click);
      document.removeEventListener("keydown", key);
      document.removeEventListener("pointerdown", down);
      window.removeEventListener("scroll", naScroll);
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", skryj);
    };
  }, [links]);

  if (!hint) return null;
  if (hint.kind === "pojem") {
    return (
      <div
        key={hint.nazev}
        id="pojem-pop"
        role="tooltip"
        className={`hint hint-pojem${hint.nad ? " nad" : ""}`}
        style={{ left: hint.x, top: hint.y, "--ax": `${hint.ax}px` } as React.CSSProperties}
      >
        <b>{hint.nazev}</b>
        {hint.popis}
      </div>
    );
  }
  const { meta } = hint;
  return (
    <div key={meta.t} aria-hidden="true" className={`hint hint-clanek${hint.nad ? " nad" : ""}`} style={{ left: hint.x, top: hint.y }}>
      <span className="hint-eye">
        Článek · {meta.g}
        {meta.m ? ` · ${meta.m} min` : ""}
      </span>
      <span className="hint-tit">{meta.t}</span>
      <span className="hint-desc">{meta.d}</span>
      <span className="hint-go">Číst článek →</span>
    </div>
  );
}
