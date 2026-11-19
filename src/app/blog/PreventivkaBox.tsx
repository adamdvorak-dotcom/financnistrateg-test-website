/* Rámeček s odkazem na Finanční preventivku uvnitř článku (v polovině textu a nad závěrečnou výzvou) */
export function PreventivkaBox({ misto }: { misto: "pulka" | "konec" }) {
  return (
    <aside className="prev-box" aria-label="Finanční preventivka">
      <div className="prev-box-text">
        <b>Finanční preventivka pro majitele firem.</b>
        <p>Dvacet tvrzení, pět minut. Na konci hned uvidíte, kde máte největší mezery.</p>
      </div>
      <a className="prev-box-btn" href="/financni-preventivka" data-mer={`clanek-preventivka-${misto}`}>
        Zahájit preventivku <span aria-hidden="true">→</span>
      </a>
    </aside>
  );
}
