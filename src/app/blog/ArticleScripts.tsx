"use client";

import { useEffect } from "react";

/**
 * Drobnosti na stránce článku: pruh postupu čtení, čip se zbývajícím časem, odkazy „#“
 * u nadpisů a spodní lišta s výzvou. (Obsah článku v okraji řeší ArticleToc.) Dřív to byl vložený skript,
 * který měnil stránku ještě před načtením Reactu, a React pak celý článek vykresloval
 * znovu (chyba hydratace #418). Teď se vše spustí až po hydrataci a funguje i po
 * přechodu mezi články bez znovunačtení stránky.
 */
export function ArticleScripts() {
  useEffect(() => {
    const ac = new AbortController();
    const opt: AddEventListenerOptions = { passive: true, signal: ac.signal };
    const added: HTMLElement[] = [];

    const h2s = Array.from(document.querySelectorAll<HTMLElement>(".article-body h2"));

    // Kotvy u nadpisů. Id nadpisům dává ArticleToc; kde chybí, doplní se tady.
    h2s.forEach((h2, i) => {
      if (!h2.id) {
        h2.id =
          (h2.textContent || "")
            .toLowerCase()
            .normalize("NFD")
            .replace(/[̀-ͯ]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "")
            .slice(0, 60) || `kapitola-${i + 1}`;
      }
      if (h2.querySelector(".anchor-link")) return;
      const a = document.createElement("a");
      a.href = "#" + h2.id;
      a.className = "anchor-link";
      a.title = "Kopírovat odkaz";
      a.textContent = "#";
      a.setAttribute("aria-hidden", "true");
      a.addEventListener(
        "click",
        (e) => {
          e.preventDefault();
          const url = location.href.split("#")[0] + "#" + h2.id;
          navigator.clipboard?.writeText(url);
          history.pushState(null, "", "#" + h2.id);
        },
        { signal: ac.signal },
      );
      h2.insertBefore(a, h2.firstChild);
      added.push(a);
    });

    const tocTime = document.getElementById("tocTime");
    const chipTime = document.getElementById("chipTime");
    const prog = document.querySelector<HTMLElement>(".progress");
    const nav = document.querySelector("nav");
    const readBar = document.getElementById("readBar");
    const readChip = document.getElementById("readChip");
    const ctaBar = document.getElementById("ctaBar");
    const footer = document.querySelector("footer");

    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const p = total > 0 ? window.scrollY / total : 0;
      prog?.style.setProperty("--p", p * 100 + "%");
      nav?.classList.toggle("scrolled", window.scrollY > 60);
      readBar?.style.setProperty("--read-p", String(p));
      readChip?.classList.toggle("show", window.scrollY > 180);
      if (chipTime) {
        const rt = parseInt(chipTime.dataset.total || "5", 10);
        const rem = Math.max(1, Math.round(rt * (1 - p)));
        chipTime.textContent = rem + (rem === 1 ? " minuta čtení" : " min čtení");
      }
      if (tocTime) {
        const rt = parseInt(tocTime.dataset.total || "5", 10);
        const rem = Math.max(1, Math.round(rt * (1 - p)));
        tocTime.textContent =
          rem === 1 ? "Zbývá 1 minuta čtení" : rem < 5 ? `Zbývají ${rem} minuty čtení` : `Zbývá ${rem} minut čtení`;
      }
      if (ctaBar) {
        const nearFooter = footer && footer.getBoundingClientRect().top < window.innerHeight + 60;
        ctaBar.classList.toggle("show", window.scrollY > 200 && !nearFooter);
      }
    };
    window.addEventListener("scroll", update, opt);
    update();

    return () => {
      ac.abort();
      added.forEach((el) => el.remove());
    };
  }, []);

  return null;
}
