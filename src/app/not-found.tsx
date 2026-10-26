"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";

export default function NotFound() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || window.innerWidth < 640) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width, H = canvas.height;
    const cx = W * 0.5, cy = H * 0.52;
    const radii = [44, 86, 130, 178, 230, 288, 352, 424, 500];
    let t = 0, raf: number;
    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.strokeStyle = "rgba(180,130,48,0.15)";
      ctx.lineWidth = 0.9;
      radii.forEach((baseR, i) => {
        const s = i * 0.83;
        ctx.beginPath();
        for (let j = 0; j <= 160; j++) {
          const a = (j / 160) * Math.PI * 2;
          const r = baseR
            + baseR * 0.11 * Math.sin(3 * a + t * 0.22 + s * 1.1)
            + baseR * 0.07 * Math.sin(5 * a + t * 0.17 + s * 0.9)
            + baseR * 0.04 * Math.cos(7 * a + t * 0.30 + s * 2.3);
          const x = cx + r * Math.cos(a), y = cy + r * Math.sin(a);
          j === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
      });
      t += 0.007;
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="nf">
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      />
      <nav style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 56px", maxWidth: 1180, margin: "0 auto", width: "100%" }}>
        <Link href="/" style={{ display: "flex", alignItems: "baseline", gap: 10, textDecoration: "none", color: "#F5F2EC" }}>
          <span style={{ fontFamily: "Lora, serif", fontSize: 22, fontWeight: 400 }}>Adam Dvořák</span>
          <span style={{ fontSize: 12, fontWeight: 500, letterSpacing: ".12em", textTransform: "uppercase", color: "#C9A260" }}>EFA</span>
        </Link>
      </nav>

      <main style={{ position: "relative", zIndex: 1 }}>
        <div>
          <div className="big">404</div>
          <h1>
            Tahle stránka tu není.<br />
            <em>Vy ano, a to se počítá.</em>
          </h1>
          <p style={{ color: "rgba(245,242,236,.65)", fontSize: 16, lineHeight: 1.65, marginTop: 18, maxWidth: "42ch" }}>
            Stránka byla přesunuta nebo neexistuje. Tady jsou místa, která fungují.
          </p>
        </div>

        <div className="links">
          <Link href="/konzultace">
            <span style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(201,162,96,.2)", display: "grid", placeItems: "center" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A260" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </span>
            <span>
              <span style={{ display: "block", fontFamily: "Lora, serif", fontSize: 17 }}>Konzultace</span>
              <span style={{ fontSize: 12, color: "rgba(245,242,236,.55)" }}>Nezávazný první rozhovor</span>
            </span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(245,242,236,.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
          <Link href="/#services">
            <span style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(245,242,236,.06)", display: "grid", placeItems: "center" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(245,242,236,.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            </span>
            <span>
              <span style={{ display: "block", fontFamily: "Lora, serif", fontSize: 17 }}>Služby</span>
              <span style={{ fontSize: 12, color: "rgba(245,242,236,.55)" }}>Co dělám a pro koho</span>
            </span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(245,242,236,.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
          <Link href="/test">
            <span style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(245,242,236,.06)", display: "grid", placeItems: "center" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(245,242,236,.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
            </span>
            <span>
              <span style={{ display: "block", fontFamily: "Lora, serif", fontSize: 17 }}>Finanční preventivka</span>
              <span style={{ fontSize: 12, color: "rgba(245,242,236,.55)" }}>Zjistěte svůj finanční stav</span>
            </span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(245,242,236,.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
          <Link href="/blog">
            <span style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(245,242,236,.06)", display: "grid", placeItems: "center" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(245,242,236,.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
            </span>
            <span>
              <span style={{ display: "block", fontFamily: "Lora, serif", fontSize: 17 }}>Blog</span>
              <span style={{ fontSize: 12, color: "rgba(245,242,236,.55)" }}>Články o financích a investicích</span>
            </span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(245,242,236,.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </main>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1180, margin: "0 auto", padding: "0 56px 48px", width: "100%" }}>
        <a href="tel:+420776561191" style={{ color: "rgba(245,242,236,.45)", fontSize: 13, textDecoration: "none", fontWeight: 500, letterSpacing: ".04em" }}>
          +420 776 561 191
        </a>
      </div>
    </div>
  );
}
