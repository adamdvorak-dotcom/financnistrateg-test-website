import Link from "next/link";

/* Stránka 404: text s cestami zpět a vedle něj obrysové číslo, přes které se dokreslí
   křivka grafu. Ta nakonec spadne dolů a zastaví se v pulzujícím bodě. */
export default function NotFound() {
  return (
    <div className="nf4">
      <header className="nf4-nav">
        <Link href="/" className="nf4-logo">
          Adam Dvořák<span>, EFA</span>
        </Link>
      </header>

      <main className="nf4-main">
        <div className="nf4-text">
          <div className="nf4-eye">Chyba 404</div>
          <h1>Tahle stránka neexistuje.</h1>
          <p>Možná se přestěhovala, nebo v adrese zůstal překlep. Zbytek webu je na svém místě.</p>
          <div className="nf4-btns">
            <Link href="/" className="nf4-btn h">Zpět na úvod →</Link>
            <Link href="/blog" className="nf4-btn">Blog</Link>
            <Link href="/#calculators" className="nf4-btn">Kalkulačky</Link>
            <Link href="/konzultace" className="nf4-btn">Konzultace</Link>
          </div>
        </div>

        <div className="nf4-obr" aria-hidden="true">
          <div className="nf4-cis"><span>4</span><span>0</span><span>4</span></div>
          <svg viewBox="0 0 340 260">
            <path pathLength={1} d="M4 150L52 132L96 140L142 104L186 112L232 70L262 76L262 203L325 203" />
          </svg>
          <i className="nf4-konec" />
        </div>
      </main>

      <div className="nf4-pata">
        <a href="tel:+420731147911">+420 731 147 911</a>
      </div>
    </div>
  );
}
