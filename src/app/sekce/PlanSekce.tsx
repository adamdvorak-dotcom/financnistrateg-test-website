"use client";
import { useState, useEffect, useRef } from "react";
import { T, type Lang } from "../texty";

/* „Tohle dostanete do ruky“: maketa plánu, která se rozevře do vějíře. */
export function PlanSekce({ lang }: { lang: Lang }) {
  const t = T[lang];
  /* Maketa plánu: rozevřený vějíř, jestli zařízení umí najetí myší a jestli na ní myš právě je */
  const planRef = useRef<HTMLDivElement>(null);
  const [planOpen, setPlanOpen] = useState(false);
  const planHoverable = useRef(false);
  const planHovered = useRef(false);
  const planEnter = () => { planHovered.current = true; if (planHoverable.current) setPlanOpen(true); };
  const planLeave = () => { planHovered.current = false; if (planHoverable.current) setPlanOpen(false); };

  /* Maketa plánu: listy leží složené na sobě a rozevřou se do vějíře. Na počítači se vějíř při prvním
     zobrazení na chvíli ukáže a pak reaguje na najetí myší, na dotykových zařízeních zůstane rozevřený.
     Při omezeném pohybu se nic nespouští: styly pak ukazují rozevřený vějíř rovnou. */
  useEffect(() => {
    const el = planRef.current;
    if (!el || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    planHoverable.current = window.matchMedia("(hover: hover)").matches;
    let t: number | undefined;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      setPlanOpen(true);
      if (planHoverable.current) {
        t = window.setTimeout(() => { if (!planHovered.current) setPlanOpen(false); }, 2400);
      }
    }, { threshold: 0.55 });
    io.observe(el);
    return () => { io.disconnect(); window.clearTimeout(t); };
  }, []);
  return (
    <>
      {/* ── Plan ── */}
      <section id="plan" className="section-wrap">
        <div className="container">
          <div className="plan">
            <div>
              <div className="section-eyebrow">{t.planEye}</div>
              <h2 className="section-title-lg" style={{marginTop:12,marginBottom:20}}>{t.planHead}</h2>
              <p style={{maxWidth:"44ch",color:"var(--text-2)",lineHeight:1.65,marginBottom:32}}>{t.s3Desc}</p>
              <ol style={{listStyle:"none",margin:0,padding:0,display:"flex",flexDirection:"column",gap:10}}>
                {t.s3Items.map((item, i) => (
                  <li key={i} style={{display:"flex",alignItems:"center",gap:14,font:"500 15px/1 var(--font-sans)",color:"var(--text-1)"}}>
                    <span style={{fontFamily:"var(--font-display)",fontSize:13,color:"var(--gold)",minWidth:18}}>{String(i+1).padStart(2,"0")}</span>
                    {item}
                  </li>
                ))}
              </ol>
            </div>
            <div ref={planRef} className={planOpen ? "stack open" : "stack"} onMouseEnter={planEnter} onMouseLeave={planLeave}>
              {/* p1: cover — gradient style matching real FP document */}
              <div className="page p1" style={{background:"linear-gradient(125deg,#9E93CA 0%,#E8E3D5 50%,#C5B870 100%)",color:"#fff"}}>
                <div style={{fontSize:9,letterSpacing:2.5,textTransform:"uppercase",color:"rgba(255,255,255,.6)",marginBottom:16}}>Finanční plán</div>
                <div style={{fontFamily:"Lora,serif",fontSize:38,fontWeight:700,lineHeight:1.0,flexGrow:1}}>Rodina<br/>N.</div>
                <div style={{borderTop:"1px solid rgba(255,255,255,.3)",paddingTop:14}}>
                  <div style={{fontSize:9,color:"rgba(255,255,255,.5)",marginBottom:5,letterSpacing:0.5}}>financnistrateg.com</div>
                  <div style={{fontSize:11,fontWeight:600,letterSpacing:0.3}}>Adam Dvořák, EFA</div>
                </div>
              </div>
              {/* p2: chapter with chart */}
              <div className="page p2">
                <div style={{fontSize:9,letterSpacing:2,textTransform:"uppercase",color:"#C9A260",marginBottom:8}}>Kapitola 02</div>
                <div style={{fontFamily:"Lora,serif",fontSize:15,fontWeight:500,marginBottom:14,color:"#1A1511"}}>Investiční strategie</div>
                <svg width={138} height={44} style={{display:"block",marginBottom:12,overflow:"visible"}}>
                  <polygon className="plan-plocha" points="0,38 23,30 46,34 69,16 92,22 115,10 138,14 138,44 0,44" fill="rgba(201,162,96,.12)"/>
                  <polyline className="plan-krivka" pathLength={1} points="0,38 23,30 46,34 69,16 92,22 115,10 138,14" fill="none" stroke="rgba(201,162,96,.7)" strokeWidth="1.5" strokeLinejoin="round"/>
                </svg>
                {[1,.88,1,.72,.9,.6].map((w,i) => (
                  <div key={i} className="plan-radek" style={{height:5,borderRadius:3,background:"rgba(26,21,17,.1)",marginBottom:6,width:`${w*100}%`,transitionDelay:`${350+i*60}ms`}}/>
                ))}
              </div>
              {/* p3: chapter with text */}
              <div className="page p3">
                <div style={{fontSize:9,letterSpacing:2,textTransform:"uppercase",color:"#C9A260",marginBottom:8}}>Kapitola 04</div>
                <div style={{fontFamily:"Lora,serif",fontSize:15,fontWeight:500,marginBottom:14,color:"#1A1511"}}>Daňová optimalizace</div>
                {[1,.9,.95,.7,1,.85,.65,.8].map((w,i) => (
                  <div key={i} className="plan-radek" style={{height:5,borderRadius:3,background:"rgba(26,21,17,.1)",marginBottom:6,width:`${w*100}%`,transitionDelay:`${350+i*60}ms`}}/>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
