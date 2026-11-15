"use client";
import { useState, useEffect, useRef } from "react";

const RATES = [1, 1.25, 1.5];

// Výšky sloupků ozdobné vlny (v pixelech z 56)
const VLNA = [14,22,30,18,40,52,34,26,44,56,38,20,28,46,50,32,16,24,42,54,36,22,30,48,40,18,26,52,44,28,14,34,50,56,38,24,20,42,46,30,16,28,54,48,32,22,36,44,26,18,40,52,34,20,28,14];

function Vlna({ className, style }: { className: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 444 56" preserveAspectRatio="none" aria-hidden="true">
      {VLNA.map((h, i) => (
        <rect key={i} x={i * 8} y={(56 - h) / 2} width={4} height={h} rx={2} />
      ))}
    </svg>
  );
}

export function AudioPlayer() {
  const [available, setAvailable] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [rate, setRate] = useState(1.25);
  const [elapsed, setElapsed] = useState(0);
  const [total, setTotal] = useState(0);
  const [done, setDone] = useState(0); // podíl přečteného textu, 0 až 1
  const cumRef = useRef<number[]>([]);
  const idxRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const check = () => {
      const voices = speechSynthesis.getVoices();
      if (voices.some((v) => v.lang.startsWith("cs"))) setAvailable(true);
    };
    check();
    speechSynthesis.addEventListener("voiceschanged", check);
    return () => speechSynthesis.removeEventListener("voiceschanged", check);
  }, []);

  useEffect(() => {
    // estimate total reading time from paragraphs
    const ps = document.querySelectorAll(".article-body p, .article-body h2, .article-body h3");
    // slova před každým odstavcem, ať vlna ukazuje, jak daleko čtení je
    const cum: number[] = [];
    let words = 0;
    Array.from(ps).forEach((p) => {
      cum.push(words);
      words += p.textContent?.split(/\s+/).length ?? 0;
    });
    cum.push(words);
    cumRef.current = cum;
    setTotal(Math.round((words / 140) * 60)); // ~140 words/min
  }, []);

  const getParas = () =>
    Array.from(document.querySelectorAll(".article-body p, .article-body h2, .article-body h3")) as HTMLElement[];

  const stop = () => {
    speechSynthesis.cancel();
    setPlaying(false);
    if (timerRef.current) clearInterval(timerRef.current);
    getParas().forEach((p) => p.classList.remove("cte-se"));
  };

  const readFrom = (startIdx: number) => {
    const paras = getParas();
    if (startIdx >= paras.length) { stop(); setElapsed(0); setDone(0); idxRef.current = 0; return; }
    idxRef.current = startIdx;
    const cum = cumRef.current;
    const vse = cum[cum.length - 1] || 1;
    setDone((cum[Math.min(startIdx + 1, cum.length - 1)] ?? 0) / vse);
    paras.forEach((p, j) => p.classList.toggle("cte-se", j === startIdx));
    paras[startIdx].scrollIntoView({ behavior: "smooth", block: "nearest" });

    const u = new SpeechSynthesisUtterance(paras[startIdx].innerText);
    u.lang = "cs-CZ";
    u.rate = rate;
    const voice = speechSynthesis.getVoices().find((v) => v.lang.startsWith("cs")) ?? null;
    if (voice) u.voice = voice;
    u.onend = () => readFrom(startIdx + 1);
    speechSynthesis.speak(u);
  };

  const start = () => {
    setPlaying(true);
    readFrom(idxRef.current);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
  };

  const play = () => {
    if (playing) { stop(); return; }
    start();
  };

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  if (!available) return null;

  return (
    <div className={`audio-player ap2${playing ? " hraje" : ""}`}>
      <button type="button" className="ap-play" onClick={play} aria-label={playing ? "Zastavit čtení" : "Přehrát článek"}>
        <svg className="ap-ik pl" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15l13-7.5z" /></svg>
        <svg className="ap-ik pa" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 4h4.5v16H6zM13.5 4H18v16h-4.5z" /></svg>
      </button>
      <div className="ap-stred">
        <div className="ap-radek">
          <span className="ap-label">Poslechněte si článek</span>
          <span className="ap-time">{fmt(elapsed)}{total > 0 && ` / ${fmt(total)}`}</span>
        </div>
        <div className="ap-vlna">
          <Vlna className="ap-vlna-zaklad" />
          <Vlna className="ap-vlna-plna" style={{ clipPath: `inset(0 ${(100 - done * 100).toFixed(1)}% 0 0)` }} />
        </div>
      </div>
      <div className="ap-rates" role="group" aria-label="Rychlost čtení">
        {RATES.map((r) => (
          <button
            key={r}
            type="button"
            className={r === rate ? "on" : ""}
            aria-pressed={r === rate}
            onClick={() => { setRate(r); if (playing) { stop(); setTimeout(start, 50); } }}
          >
            {String(r).replace(".", ",")}×
          </button>
        ))}
      </div>
    </div>
  );
}
