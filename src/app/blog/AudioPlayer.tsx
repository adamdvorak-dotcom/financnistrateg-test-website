"use client";
import { useState, useEffect, useRef } from "react";

const RATES = [1, 1.25, 1.5];

export function AudioPlayer() {
  const [available, setAvailable] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [rate, setRate] = useState(1.25);
  const [elapsed, setElapsed] = useState(0);
  const [total, setTotal] = useState(0);
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
    const words = Array.from(ps).reduce((s, p) => s + (p.textContent?.split(/\s+/).length ?? 0), 0);
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
    if (startIdx >= paras.length) { stop(); setElapsed(0); idxRef.current = 0; return; }
    idxRef.current = startIdx;
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

  const play = () => {
    if (playing) { stop(); return; }
    setPlaying(true);
    readFrom(idxRef.current);
    timerRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
  };

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  if (!available) return null;

  return (
    <div className="audio-player">
      <button className="ap-play" onClick={play} aria-label={playing ? "Pause" : "Play"}>
        {playing ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
        )}
      </button>
      <span className="ap-time">{fmt(elapsed)}{total > 0 && ` / ${fmt(total)}`}</span>
      <div className="ap-rates">
        {RATES.map((r) => (
          <button
            key={r}
            type="button"
            className={r === rate ? "on" : ""}
            onClick={() => { setRate(r); if (playing) { stop(); setTimeout(() => { setPlaying(true); readFrom(idxRef.current); }, 50); } }}
          >
            {r}×
          </button>
        ))}
      </div>
      <span className="ap-label">Poslechnout článek</span>
    </div>
  );
}
