import { NextResponse } from "next/server";

const html = `<!DOCTYPE html>
<html lang="cs">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Finanční preventivka pro majitele firem · Adam Dvořák</title>
<meta name="description" content="20 tvrzení, 5 oblastí, 5 minut. Zjistěte, kde máte největší mezery v připravenosti firmy a rodiny.">
<meta property="og:title" content="Finanční preventivka pro majitele firem">
<meta property="og:description" content="20 tvrzení, 5 oblastí, 5 minut. Zjistěte, kde máte největší mezery.">
<meta property="og:url" content="https://www.financnistrateg.com/test">
<link rel="canonical" href="https://www.financnistrateg.com/test">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:ital,opsz,wght@0,14..32,400;0,14..32,500;0,14..32,600&display=swap">
<style>
:root {
  --paper: #F0EBE0;
  --sheet: #FCFBF8;
  --ink: #1A1511;
  --muted: #5F5347;
  --rule: rgba(26,21,17,0.14);
  --navy: #0C1F3A;
  --gold: #C9A260;
  --gold-deep: #8a6a2e;
  --gold-soft: rgba(201,162,96,0.15);
  --seg-off: rgba(26,21,17,0.10);
  --good: #2f6b4f;
  --warn: #8a6a2e;
  --bad: #9b3b32;
  --on-navy: #F5F2EC;
  --sel-bg: #8a6a2e;
  --sel-fg: #F5F2EC;
  --font-display: "Lora", Georgia, serif;
  --font-body: "Inter", "Segoe UI", "Helvetica Neue", Arial, sans-serif;
  --radius: 8px;
}
* { box-sizing: border-box; }
[hidden] { display: none !important; }
html { -webkit-text-size-adjust: 100%; }
body {
  background: var(--paper); color: var(--ink);
  font-family: var(--font-body); font-size: 16px; line-height: 1.55;
  padding-inline: 16px; padding-block: 0 96px; margin: 0;
}
.wrap { max-width: 1120px; margin: 0 auto; }
.masthead {
  display: grid; grid-template-columns: minmax(0,1fr) auto;
  gap: 24px; align-items: end; padding-block: 40px 28px;
  border-bottom: 1px solid var(--rule);
}
.eyebrow { font-size: 12px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; color: var(--gold); margin: 0 0 10px; }
h1 { font-family: var(--font-display); font-weight: 600; font-size: clamp(34px,5.2vw,56px); line-height: 1.04; letter-spacing: -0.01em; margin: 0 0 14px; text-wrap: balance; }
.lead { margin: 0; max-width: 62ch; color: var(--muted); font-size: 17px; }
.docmeta { display: grid; grid-template-columns: auto auto; gap: 4px 16px; font-size: 13px; color: var(--muted); border: 1px solid var(--rule); border-radius: var(--radius); padding: 12px 14px; background: var(--sheet); font-variant-numeric: tabular-nums; }
.docmeta dt { text-transform: uppercase; letter-spacing: 0.08em; font-size: 11px; padding-top: 2px; }
.docmeta dd { margin: 0; color: var(--ink); font-weight: 500; }
.gate { padding: 52px 0 68px; display: flex; flex-direction: column; align-items: flex-start; gap: 20px; }
.gate-hint { font-size: 15px; color: var(--muted); margin: 0; max-width: 52ch; }
.back-link { font-size: 14px; color: var(--muted); border-color: var(--rule); margin-top: 4px; }
.back-link:hover { color: var(--ink); }
.btn { appearance: none; border: 1px solid var(--ink); background: transparent; color: var(--ink); font: 500 14px/1 var(--font-body); letter-spacing: 0.04em; padding: 11px 16px; border-radius: var(--radius); cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; }
.btn:hover { background: var(--gold-soft); }
.btn.solid { background: var(--gold); color: var(--ink); border-color: var(--gold); border-radius: 999px; }
.btn.solid:hover { background: var(--gold-deep); border-color: var(--gold-deep); color: var(--on-navy); }
.btn.solid.large { font-size: 17px; padding: 15px 36px; letter-spacing: 0.03em; border-radius: 999px; }
.btn:focus-visible, .opt input:focus-visible + span, a:focus-visible { outline: 2px solid var(--gold); outline-offset: 2px; }
.layout { display: grid; grid-template-columns: minmax(0,1fr) 360px; gap: 40px; align-items: start; margin-top: 32px; }
.section { margin-bottom: 36px; }
.section-head { display: flex; align-items: baseline; gap: 14px; border-bottom: 1px solid var(--rule); padding-bottom: 8px; margin-bottom: 4px; }
.section-no { display: grid; place-items: center; width: 32px; height: 32px; border-radius: 50%; background: var(--gold); color: var(--ink); font-family: var(--font-display); font-size: 15px; font-weight: 700; flex-shrink: 0; line-height: 1; }
.section-head h2 { font-family: var(--font-display); font-size: 26px; font-weight: 600; margin: 0; line-height: 1.15; }
.section-head .pts { margin-left: auto; font-size: 13px; color: var(--muted); font-variant-numeric: tabular-nums; white-space: nowrap; }
.item { padding: 16px 0; border-bottom: 1px solid var(--rule); display: grid; grid-template-columns: 44px minmax(0,1fr) auto; gap: 8px 16px; align-items: center; }
.item-no { font-size: 13px; color: var(--muted); font-variant-numeric: tabular-nums; padding-top: 2px; }
.item-text { font-size: 16px; min-width: 0; }
.item-note { display: block; margin-top: 4px; font-size: 13px; line-height: 1.4; color: var(--muted); }
.opts { display: flex; gap: 6px; }
.opt-card { position: relative; flex: 1; display: flex; align-items: center; justify-content: center; padding: 9px 12px; border: 1px solid rgba(26,21,17,.18); border-radius: 999px; cursor: pointer; background: var(--sheet); user-select: none; transition: border-color 0.15s, background 0.15s, color 0.15s; font-weight: 500; }
.opt-card input { position: absolute; opacity: 0; width: 1px; height: 1px; pointer-events: none; }
.opt-circ { display: none; }
.opt-txt { font-size: 13px; color: inherit; }
.opt-card:hover { border-color: var(--gold); }
.opt-card:has(input:checked) { background: var(--gold-deep); border-color: var(--gold-deep); color: var(--sel-fg); }
.result { position: sticky; top: calc(env(safe-area-inset-top,0px) + 24px); background: var(--sheet); border: 1px solid rgba(201,162,96,0.22); border-radius: 16px; padding: 22px 22px 24px; box-shadow: 0 2px 20px rgba(26,21,17,0.06); max-height: calc(100vh - 48px); overflow-y: auto; }
.result h2 { font-size: 12px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); margin: 0 0 12px; }
.score { display: flex; align-items: center; gap: 14px; font-variant-numeric: tabular-nums; }
.ring-outer { position: relative; flex-shrink: 0; width: 88px; height: 88px; }
.ring { display: block; }
.ring .bg { fill: none; stroke: rgba(26,21,17,0.08); stroke-width: 7; }
.ring .fg { fill: none; stroke: var(--gold); stroke-width: 7; stroke-linecap: round;
  stroke-dasharray: 238.76; stroke-dashoffset: calc(238.76 * (1 - var(--p, 0)));
  transition: stroke-dashoffset 1.2s cubic-bezier(.22,1,.36,1); }
.ring-inner { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; }
.score .big { font-family: var(--font-display); font-size: 28px; font-weight: 600; line-height: 1; color: var(--ink); }
.score .of { font-size: 12px; color: var(--muted); margin-top: 2px; }
.result-cta { margin-top: 22px; padding-top: 18px; border-top: 1px solid rgba(26,21,17,.12); }
.answered { font-size: 13px; color: var(--muted); margin: 2px 0 14px; font-variant-numeric: tabular-nums; }
.band { border-radius: var(--radius); padding: 10px 12px; margin-bottom: 18px; border-left: 3px solid var(--muted); background: var(--paper); }
.band strong { display: block; font-size: 15px; }
.band p { margin: 4px 0 0; font-size: 14px; color: var(--muted); }
.band.r { border-left-color: var(--bad); }
.band.m { border-left-color: var(--warn); }
.band.g { border-left-color: var(--good); }
.meters { display: grid; gap: 10px; margin-bottom: 20px; }
.meter-row { display: grid; grid-template-columns: minmax(0,1fr) auto; gap: 4px 10px; font-size: 13px; }
.meter-row .lbl { min-width: 0; }
.meter-row .val { color: var(--muted); font-variant-numeric: tabular-nums; }
.segs { grid-column: 1/-1; display: grid; grid-template-columns: repeat(8,1fr); gap: 3px; }
.segs i { height: 8px; border-radius: 1px; background: var(--seg-off); display: block; }
.segs i.on { background: var(--gold); }
.prio h3 { font-family: var(--font-display); font-size: 21px; font-weight: 600; margin: 0 0 8px; }
.prio ol { margin: 0; padding: 0; list-style: none; display: grid; gap: 10px; counter-reset: p; }
.prio li { counter-increment: p; display: grid; grid-template-columns: 26px minmax(0,1fr); gap: 8px; font-size: 14px; }
.prio li::before { content: counter(p); width: 22px; height: 22px; border-radius: 50%; border: 1px solid var(--gold); color: var(--gold); font-size: 12px; display: grid; place-items: center; margin-top: 1px; }
.prio .ref { font-size: 12px; color: var(--muted); display: block; }
.prio .empty { font-size: 14px; color: var(--muted); margin: 0; }
.cta { margin-top: 40px; background: var(--navy); color: var(--on-navy); border-radius: var(--radius); padding: 28px; display: grid; grid-template-columns: minmax(0,1fr) auto; gap: 18px 28px; align-items: center; }
.cta h2 { font-family: var(--font-display); font-weight: 600; font-size: 30px; margin: 0 0 6px; line-height: 1.1; text-wrap: balance; color: var(--on-navy); }
.cta p { margin: 0; max-width: 60ch; color: var(--on-navy); opacity: 0.86; }
.cta .btn { border-color: var(--gold); color: var(--on-navy); }
.cta .btn:hover { background: var(--gold); color: var(--navy); }
.cta .site { font-size: 13px; opacity: 0.75; margin-top: 8px; display: block; }
.fine { font-size: 13px; color: var(--muted); margin-top: 22px; max-width: 80ch; }
.lock { display: grid; gap: 12px; }
.lock p { margin: 0; font-size: 14px; color: var(--muted); }
.lock .answered { margin: 0; }
.progress { display: grid; grid-template-columns: repeat(20,minmax(0,1fr)); gap: 2px; }
.progress i { height: 6px; border-radius: 1px; background: var(--seg-off); display: block; }
.progress i.on { background: var(--gold); }
.lock .missing a { color: var(--ink); }
.lead-form { display: grid; gap: 12px; }
.lead-form .lead-title { font-size: 16px; color: var(--ink); }
.lead-form .field { display: grid; gap: 4px; font-size: 13px; color: var(--muted); }
.lead-form input[type="text"], .lead-form input[type="email"] { font: 400 16px/1.3 var(--font-body); padding: 10px 12px; border: 1px solid var(--rule); border-radius: var(--radius); background: var(--paper); color: var(--ink); width: 100%; min-width: 0; }
.lead-form input[type="text"]:focus-visible, .lead-form input[type="email"]:focus-visible { outline: 2px solid var(--gold); outline-offset: 1px; border-color: var(--gold); }
.lead-form .check { display: grid; grid-template-columns: 18px minmax(0,1fr); gap: 8px; font-size: 13px; color: var(--muted); align-items: start; cursor: pointer; }
.lead-form .check input { margin: 3px 0 0; accent-color: var(--gold); }
.lead-form .err { font-size: 13px; color: var(--bad); }
.lead-form .btn { justify-content: center; }
.lead-form .btn[disabled] { opacity: 0.6; cursor: progress; }
.lead-form .privacy { font-size: 12px; line-height: 1.45; }
.lead-form .privacy a { color: var(--ink); }
.ff { position: relative; margin-bottom: 4px; }
.ff input[type="text"], .ff input[type="email"] { font: 400 16px/1.3 var(--font-body); padding: 12px 12px; border: 1.5px solid var(--rule); border-radius: var(--radius); background: var(--sheet); color: var(--ink); width: 100%; min-width: 0; transition: border-color 0.15s; }
.ff input:focus-visible { outline: none; border-color: var(--gold); }
.ff label { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); font-size: 14px; color: var(--muted); pointer-events: none; line-height: 1; transition: top .18s, transform .18s, font-size .18s, color .18s, padding .18s; }
.ff input:focus ~ label, .ff input:not(:placeholder-shown) ~ label { top: 0; transform: translateY(-50%); font-size: 11px; color: var(--gold); background: var(--sheet); padding: 0 3px; left: 10px; }
.btn.solid { overflow: hidden; position: relative; }
.btn.solid.is-sending::after { content: ''; position: absolute; inset: 0; pointer-events: none; background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%); animation: btn-sweep 1.2s ease-in-out infinite; }
.btn.solid.is-sent { background: var(--good) !important; border-color: var(--good) !important; }
@keyframes btn-sweep { from { transform: translateX(-150%); } to { transform: translateX(250%); } }
@keyframes draw-chk { to { stroke-dashoffset: 0; } }
#topBar { position: fixed; top: 0; left: 0; height: 3px; background: var(--gold); width: 0%; z-index: 100; transition: width 0.4s ease; pointer-events: none; }
.progress-pill { display: inline-flex; align-items: center; background: var(--gold-soft); border: 1px solid rgba(201,162,96,0.25); border-radius: 100px; padding: 5px 14px; margin: 16px 0 28px; font-size: 12px; font-weight: 600; color: var(--gold-deep); letter-spacing: 0.06em; font-variant-numeric: tabular-nums; }
.hp { position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden; }
.thanks { font-size: 14px; color: var(--ink); margin: 0 0 12px; padding: 8px 10px; border-radius: var(--radius); background: var(--gold-soft); }
.thanks:focus { outline: none; }
.mobilebar { display: none; position: fixed; left: 0; right: 0; bottom: 0; padding: 10px 16px calc(10px + env(safe-area-inset-bottom,0px)); background: var(--navy); color: var(--on-navy); align-items: center; justify-content: space-between; gap: 12px; font-variant-numeric: tabular-nums; z-index: 5; }
.mobilebar a { color: var(--on-navy); font-size: 14px; }
@media (max-width: 900px) { .layout { grid-template-columns: minmax(0,1fr); } .result { position: static; } .mobilebar { display: flex; } }
@media (max-width: 640px) { .masthead { grid-template-columns: minmax(0,1fr); padding-top: 28px; } .docmeta { display: none; } .item { grid-template-columns: 36px minmax(0,1fr); } .opts { grid-column: 1/-1; } .opt-card { flex: 1; } .cta { grid-template-columns: minmax(0,1fr); } }
@media (prefers-reduced-motion: no-preference) { .segs i { transition: background-color 0.25s ease; } }
</style>
</head>
<body>
<div id="topBar" aria-hidden="true"></div>
<div class="wrap">
  <header class="masthead">
    <div>
      <p class="eyebrow">Finanční Stratég · Adam Dvořák</p>
      <h1>Finanční preventivka pro majitele firem</h1>
      <p class="lead">Nic vás nebolí, a právě proto je dobrá chvíle podívat se, jestli firma běží i bez vás, kolik majetku máte mimo ni, co máte sepsané pro rodinu, jak máte nastavené daně a smlouvy a co s firmou dál. Dvacet tvrzení, pět minut a žádná čekárna. Na konci vás poprosím o jméno a e-mail a výsledek se hned ukáže.</p>
    </div>
    <dl class="docmeta" aria-label="Údaje o testu">
      <dt>Oblasti</dt><dd>5</dd>
      <dt>Tvrzení</dt><dd>20</dd>
      <dt>Body</dt><dd>0 až 40</dd>
      <dt>Čas</dt><dd>5 minut</dd>
    </dl>
  </header>

  <p class="progress-pill" id="progressPill" hidden aria-live="polite">Odpovězeno <span id="pillCount">0</span> z 20</p>

  <div class="gate" id="gate">
    <p class="gate-hint">Odpovídáte sami za sebe. Žádné správné nebo špatné odpovědi, jen upřímné. Na konci uvidíte, kde jsou největší mezery, a tři kroky, kterými začít.</p>
    <button class="btn solid large" id="gateStart" type="button">Začít Finanční preventivku →</button>
    <a href="https://www.financnistrateg.com" class="btn back-link">← Zpět na web</a>
  </div>

  <div class="layout" id="quizContent" hidden>
    <form id="quiz" aria-label="Tvrzení testu" novalidate></form>
    <aside class="result" id="result">
      <h2>Výsledek</h2>
      <div class="lock" id="lockBox" hidden>
        <p class="answered" id="lockCount" aria-live="polite">Odpovězeno 0 z 20</p>
        <div class="progress" id="lockBar" aria-hidden="true"></div>
        <p id="lockText">Výsledek a tři kroky, kterými začít, se ukážou, až odpovíte na všech dvacet tvrzení.</p>
        <p class="missing" id="lockMissing" hidden></p>
        <form class="lead-form" id="leadForm" novalidate hidden>
          <strong class="lead-title">Hotovo, výsledek je připravený.</strong>
          <p>Napište mi jméno a e-mail a hned se vám ukáže. Do pár dnů vám k němu napíšu pár vět osobně.</p>
          <div class="ff"><input type="text" id="leadName" name="jmeno" autocomplete="name" required placeholder=" "><label for="leadName">Jméno</label></div>
          <div class="ff"><input type="email" id="leadEmail" name="email" autocomplete="email" inputmode="email" required placeholder=" "><label for="leadEmail">E-mail</label></div>
          <label class="hp" aria-hidden="true">Web<input type="text" id="leadHp" name="web" tabindex="-1" autocomplete="off"></label>
          <label class="check" for="leadNews"><input type="checkbox" id="leadNews" name="newsletter"><span>Občas mi pošlete i něco dalšího pro majitele firem.</span></label>
          <p class="err" id="leadErr" role="alert" hidden></p>
          <button class="btn solid" type="submit" id="leadBtn">Ukázat výsledek</button>
          <p class="privacy">Jméno, e-mail a odpovědi mi přijdou e-mailem. Napíšu vám k výsledku, a pokud zaškrtnete políčko, občas i něco dalšího. Odhlásit se jde kdykoli. <a href="https://www.financnistrateg.com/privacy">Ochrana osobních údajů</a></p>
        </form>
      </div>
      <div id="resultBody">
        <p class="thanks" id="thanks" tabindex="-1" hidden>Díky. Do pár dnů vám k výsledku napíšu.</p>
        <div class="score" aria-live="polite">
          <div class="ring-outer">
            <svg class="ring" viewBox="0 0 88 88" width="88" height="88" aria-hidden="true">
              <circle class="bg" cx="44" cy="44" r="38"/>
              <circle class="fg" cx="44" cy="44" r="38" transform="rotate(-90 44 44)"/>
            </svg>
            <div class="ring-inner">
              <span class="big" id="score">0</span>
              <span class="of">/ 40</span>
            </div>
          </div>
        </div>
        <p class="answered" id="answered">Odpovězeno 0 z 20</p>
        <div class="band" id="band"><strong id="bandTitle">Výsledek</strong><p id="bandText"></p></div>
        <div class="meters" id="meters"></div>
        <div class="prio">
          <h3>Tři kroky, kterými začít</h3>
          <ol id="prio"></ol>
          <p class="empty" id="prioEmpty" hidden>Zatím nic. Jakmile odpovíte „ne" nebo „částečně", objeví se tu, čím začít.</p>
        </div>
        <div class="result-cta" id="resultCta" hidden>
          <p style="font-size:13px;color:var(--muted);margin:0 0 10px">Chcete promluvit o výsledku osobně?</p>
          <a href="/konzultace" class="btn solid">Zahájit rozhovor →</a>
        </div>
      </div>
    </aside>
  </div>

  <section class="cta" aria-labelledby="ctaTitle" id="ctaSection" hidden>
    <div>
      <h2 id="ctaTitle">Kdo to vyplnil poctivě, ví teď, kde začít.</h2>
      <p>Starám se o majetek majitelů firem a jejich rodin. Řešíme spolu, jak si z firmy vybírat peníze, co postavit vedle ní a jak ji jednou prodat nebo předat. Daně řeší daňový poradce a právo advokát. Já hlídám, aby to celé dávalo smysl. Na úvodním rozhovoru se nic neprodává.</p>
    </div>
    <div>
      <a class="btn" href="/konzultace">Zahájit rozhovor →</a>
      <span class="site">financnistrateg.com</span>
    </div>
  </section>

  <p class="fine" id="fineText" hidden>Test je orientační. Nejde o daňové, právní ani investiční poradenství a výsledek nenahrazuje posouzení konkrétní situace. Daňové a právní kroky řešte s daňovým poradcem a advokátem. Odpovědi mi přijdou, až na konci vyplníte jméno a e-mail.</p>
</div>

<div class="mobilebar" id="mobilebar">
  <span id="mbScore">Skóre 0 / 40</span>
  <a href="#result">Zobrazit výsledek</a>
</div>

<script>
(function () {
  var AREAS = [
    { id: 1, name: "Firma bez majitele", items: [
      { id: "1.1", t: "Firma vydrží dva měsíce bez mého telefonu.", w: 7, tip: "Naplánujte si dva týdny pryč a sepište, co se během nich zaseklo. To je seznam úkolů pro druhou linii." },
      { id: "1.2", t: "Stav zakázek vidím v systému a nikomu kvůli tomu nemusím volat.", w: 5, tip: "Převeďte stav zakázek do jednoho systému, kde ho vidí vedení i vy. Co je jen v hlavách a v telefonech, se ztratí ve chvíli, kdy jeden člověk vypadne." },
      { id: "1.3", t: "Když nemůžu, má kdo za firmu podepisovat i platit: druhý jednatel nebo prokurista s dispozičním právem k účtům.", w: 10, tip: "Rozhodněte, komu svěříte prokuru nebo funkci druhého jednatele. S advokátem ověřte, že může jednat sám, a v bance mu nastavte dispoziční právo k účtům." },
      { id: "1.4", t: "Máme druhou linii vedení pro obchod, provoz a finance.", w: 6, tip: "Pro každou oblast pojmenujte jednoho člověka a dejte mu rozhodovací pravomoc s jasným limitem." }
    ]},
    { id: 2, name: "Peníze mimo firmu", items: [
      { id: "2.1", t: "Víc než čtvrtina mého majetku je mimo firmu.", w: 7, tip: "Rozhodněte, jakou část zisku si každý rok vyplatíte, a držte se toho, i když by se peníze hodily ve firmě." },
      { id: "2.2", t: "Víc než čtvrtinu majetku mám v investicích mimo firmu, tedy ve fondech, akciích, dluhopisech nebo nemovitostech k pronájmu. Vlastní bydlení ani chalupu nepočítám.", w: 8, tip: "Vlastní bydlení vás neuživí. Postavte vedle firmy majetek, který vydělává i bez vás a dá se v případě potřeby prodat." },
      { id: "2.3", t: "Vím, kolik si z firmy beru mzdou a kolik dividendou, a mám to rozmyšlené na pár let dopředu.", w: 5, tip: "S účetní a daňovým poradcem si spočítejte, kolik vytáhnout mzdou, kolik dividendou a kolik za vás může poslat firma na DIP nebo penzijko." },
      { id: "2.4", t: "Kdyby firma rok nic nevyplatila, rodina by z majetku mimo firmu žila dál jako dosud.", w: 8, tip: "Spočítejte si, kolik domácnost utratí za rok, a mějte tolik mimo firmu v penězích nebo investicích, které jdou rychle prodat. Špatný rok ve firmě vás pak nedonutí brát si z ní peníze, které zrovna potřebuje sama." }
    ]},
    { id: 3, name: "Rodina a dokumenty", items: [
      { id: "3.1", t: "Mám notářskou závěť a v ní určeného správce pozůstalosti.", w: 9, tip: "Správce pozůstalosti jde platně určit jen u notáře, v závěti psané doma ne. Ujme se správy, hned jak se dozví o vaší smrti, a ve firmě může vykonávat vaše práva společníka, třeba zvolit nového jednatele." },
      { id: "3.2", t: "Mám předběžné prohlášení pro případ, kdy kvůli nemoci nebo úrazu nebudu moct rozhodovat.", w: 9, tip: "U notáře určete, kdo bude za vás rozhodovat a jak, kdybyste to sami nezvládli. Na firmu to samo nestačí: prodat nebo zastavit váš podíl smí opatrovník jen se souhlasem soudu." },
      { id: "3.3", t: "Partner, partnerka nebo jiný blízký člověk ví, kde co mám a komu zavolat, kdyby se mi něco stalo.", w: 8, tip: "Sepište jednu stránku: kde co máte, kdo má k čemu přístup a komu volat jako prvnímu." },
      { id: "3.4", t: "Můj podíl ve firmě nepatří do společného jmění, nebo to máme s manželkou či manželem vyřešené manželskou smlouvou.", n: "Pokud nejste v manželství, odpovězte ano.", w: 6, tip: "Zjistěte, jestli podíl patří do společného jmění. Pokud ano, proberte s notářem nebo advokátem manželskou smlouvu." }
    ]},
    { id: 4, name: "Daně a struktura", items: [
      { id: "4.1", t: "Vím, kdy mi u podílu doběhne časový test pro osvobození příjmu z prodeje.", w: 6, tip: "Dohledejte, kdy a jak jste podíl nabyli. Příjem fyzické osoby z prodeje podílu v s.r.o. je osvobozený po pěti letech držby, u akcií po třech, a nad pět milionů ho musíte oznámit finančnímu úřadu. Holding nebo jinou změnu struktury proberte s daňovým poradcem dřív, než začnete jednat s kupcem." },
      { id: "4.2", t: "Ve společenské smlouvě nebo dohodě se společníky mám vyřešené, co bude s mým podílem, když zemřu nebo z firmy odejdu.", w: 6, tip: "S advokátem projděte společenskou smlouvu nebo zakladatelskou listinu: jestli podíl přejde na dědice, kdo za ně bude hlasovat a jak se případně vyrovnáte se společníky. Upravit ji můžete jen zaživa." },
      { id: "4.3", t: "Nemovitosti, ve kterých firma podniká, mám oddělené od provozu, nebo vím, proč to nedělám.", n: "Pokud firma žádné nemovitosti nevlastní, odpovězte ano.", w: 5, tip: "S daňovým poradcem rozhodněte, jestli a kdy oddělit nemovitosti od provozu. Udělejte to s předstihem, změnu těsně před prodejem může finanční úřad zpochybnit." },
      { id: "4.4", t: "Účetnictví firmy za poslední tři roky je čisté, bez mých soukromých výdajů.", w: 5, tip: "S účetní vyčistěte firmu od soukromých výdajů, třeba za rodinná auta nebo dovolené. Kupec bude chtít vidět aspoň tři roky čistých čísel." }
    ]},
    { id: 5, name: "Plán odchodu", items: [
      { id: "5.1", t: "Vím, jestli firmu prodám, předám dětem, nebo si ji nechám a povedou ji manažeři.", w: 7, tip: "Vyslovte směr nahlas, i když není definitivní. Bez něj nejde nic dalšího naplánovat." },
      { id: "5.2", t: "S rodinou máme otevřeně probrané, co bude s firmou, až odejdu.", w: 6, tip: "Domluvte si s rodinou samostatný čas jen na tohle téma, ne u nedělního oběda. Pokud máte děti, zeptejte se jich, co chtějí ony, ne co si myslíte, že chtějí." },
      { id: "5.3", t: "Vím zhruba, kolik firma stojí a co tu cenu zvedá nebo sráží.", w: 4, tip: "Nechte si udělat orientační ocenění a pochopte, co cenu zvedá a co ji sráží." },
      { id: "5.4", t: "Vím, kolik měsíčně potřebuji na život a z čeho to budu mít, až z firmy odejdu.", w: 5, tip: "Spočítejte si, kolik měsíčně potřebujete a jaký majetek to bez firmy pokryje. A rozmyslete si, co budete dělat první pondělí po odchodu z firmy." }
    ]}
  ];
  var OPTS = [{ v: 2, label: "Ano", cls: "ano" }, { v: 1, label: "Částečně", cls: "cast" }, { v: 0, label: "Ne", cls: "ne" }];
  var LEAD_ENDPOINT = "/api/test-result";
  var state = { answers: {}, unlocked: false };
  function save() {}
  var form = document.getElementById("quiz");
  AREAS.forEach(function (a) {
    var sec = document.createElement("section");
    sec.className = "section";
    sec.setAttribute("aria-labelledby", "area-" + a.id);
    var head = document.createElement("div");
    head.className = "section-head";
    head.innerHTML = '<span class="section-no">' + a.id + '</span><h2 id="area-' + a.id + '">' + a.name + '</h2><span class="pts" id="pts-' + a.id + '">0 / 8 bodů</span>';
    sec.appendChild(head);
    a.items.forEach(function (it) {
      var fs = document.createElement("div");
      fs.className = "item";
      fs.id = "it-" + it.id.replace(".", "-");
      var name = "q" + it.id.replace(".", "-");
      fs.setAttribute("role", "radiogroup");
      fs.setAttribute("aria-labelledby", "t-" + name);
      var html = '<span class="item-no">' + it.id + '</span><span class="item-text" id="t-' + name + '">' + it.t + (it.n ? '<span class="item-note">' + it.n + '</span>' : '') + '</span><div class="opts">';
      OPTS.forEach(function (o) {
        var id = name + "-" + o.v;
        html += '<label class="opt-card ' + o.cls + '" for="' + id + '"><input type="radio" id="' + id + '" name="' + name + '" value="' + o.v + '"><span class="opt-circ"></span><span class="opt-txt">' + o.label + '</span></label>';
      });
      html += "</div>";
      fs.innerHTML = html;
      sec.appendChild(fs);
    });
    form.appendChild(sec);
  });
  form.addEventListener("submit", function (e) { e.preventDefault(); });
  form.addEventListener("change", function (e) {
    var t = e.target;
    if (!t || t.type !== "radio") return;
    var id = t.name.slice(1).replace("-", ".");
    state.answers[id] = Number(t.value);
    render();
  });
  function showQuiz() {
    document.getElementById("gate").hidden = true;
    document.getElementById("quizContent").hidden = false;
    document.getElementById("ctaSection").hidden = false;
    document.getElementById("fineText").hidden = false;
    var mb = document.getElementById("mobilebar");
    if (window.innerWidth <= 900) { mb.style.display = "flex"; }
    render();
    var first = form.querySelector("input[type=radio]");
    if (first) { first.focus(); }
  }
  document.getElementById("gateStart").addEventListener("click", showQuiz);
  function render() {
    var locked = !state.unlocked;
    var total = 0, count = 0, cands = [];
    var meters = document.getElementById("meters");
    meters.innerHTML = "";
    AREAS.forEach(function (a) {
      var sub = 0;
      a.items.forEach(function (it) {
        var v = state.answers[it.id];
        if (typeof v === "number") { sub += v; total += v; count += 1; if (v < 2) { cands.push({ it: it, v: v, area: a.name }); } }
      });
      document.getElementById("pts-" + a.id).textContent = locked ? "" : sub + " / 8 bodů";
      var row = document.createElement("div");
      row.className = "meter-row";
      var segs = "";
      for (var s = 0; s < 8; s++) { segs += '<i class="' + (s < sub ? "on" : "") + '"></i>'; }
      row.innerHTML = '<span class="lbl">' + a.id + ". " + a.name + '</span><span class="val">' + sub + ' / 8</span><span class="segs" aria-hidden="true">' + segs + "</span>";
      meters.appendChild(row);
    });
    document.getElementById("score").textContent = total;
    document.getElementById("answered").textContent = "Odpovězeno " + count + " z 20" + (count < 20 && count > 0 ? ", skóre je zatím průběžné" : "");
    var topBar = document.getElementById("topBar");
    if (topBar) topBar.style.width = (count / 20 * 100) + "%";
    var pill = document.getElementById("progressPill"), pillCount = document.getElementById("pillCount");
    if (pill) pill.hidden = count === 0;
    if (pillCount) pillCount.textContent = count;
    document.getElementById("mbScore").textContent = locked ? "Odpovězeno " + count + " z 20" : "Skóre " + total + " / 40 · " + count + " z 20";
    document.getElementById("resultBody").hidden = locked;
    document.getElementById("lockBox").hidden = !locked;
    if (locked) { renderLock(count); }
    var band = document.getElementById("band"), bt = document.getElementById("bandTitle"), bx = document.getElementById("bandText");
    band.className = "band";
    if (count === 0) { bt.textContent = "Zatím bez odpovědí"; bx.textContent = "Odpovězte na tvrzení vlevo. Ano znamená 2 body, částečně 1 bod, ne 0."; }
    else if (total <= 15) { band.classList.add("r"); bt.textContent = "Je co dohánět"; bx.textContent = "Firma i rodina dnes stojí hlavně na vás. Většinu nejdůležitějších kroků ale jde udělat během pár měsíců."; }
    else if (total <= 29) { band.classList.add("m"); bt.textContent = "Příprava je rozjetá"; bx.textContent = "Základy máte, ale pár důležitých kroků chybí. Ty první jsou níže."; }
    else { band.classList.add("g"); bt.textContent = "Připravenost je vysoká"; bx.textContent = "Většinu práce máte hotovou. Zbývá doladit detaily a jednou ročně to celé projít znovu."; }
    cands.sort(function (x, y) { return (x.v - y.v) || (y.it.w - x.it.w); });
    var top3 = cands.slice(0, 3);
    var ol = document.getElementById("prio");
    ol.innerHTML = "";
    top3.forEach(function (c) {
      var li = document.createElement("li");
      li.innerHTML = '<span><span class="ref">' + c.it.id + " · " + c.area + "</span>" + c.it.tip + "</span>";
      ol.appendChild(li);
    });
    var pe = document.getElementById(“prioEmpty”);
    pe.hidden = top3.length > 0;
    if (!top3.length) { pe.textContent = count === 20 ? “Nic zásadního vám nechybí. Projděte test znovu za rok nebo ve chvíli, kdy se ve firmě či v rodině něco změní.” : “Zatím nic. Jakmile odpovíte „ne” nebo „částečně”, objeví se tu, čím začít.”; }
    var rc = document.getElementById(“resultCta”);
    if (rc) rc.hidden = !state.unlocked;
  }
  function renderLock(count) {
    document.getElementById("lockCount").textContent = "Odpovězeno " + count + " z 20";
    var bar = document.getElementById("lockBar"), segs = "";
    for (var i = 0; i < 20; i++) { segs += '<i class="' + (i < count ? "on" : "") + '"></i>'; }
    bar.innerHTML = segs;
    var done = count === 20;
    document.getElementById("lockText").hidden = done;
    document.getElementById("leadForm").hidden = !done;
    var miss = [];
    AREAS.forEach(function (a) { a.items.forEach(function (it) { if (typeof state.answers[it.id] !== "number") { miss.push(it.id); } }); });
    var mEl = document.getElementById("lockMissing");
    if (!done && count > 0 && miss.length <= 5) { mEl.innerHTML = "Chybí ještě: " + miss.map(function (id) { return '<a href="#it-' + id.replace(".", "-") + '">' + id + "</a>"; }).join(", "); mEl.hidden = false; }
    else { mEl.hidden = true; }
  }
  function buildPayload(name, mail, news) {
    var LABEL = { 2: "Ano", 1: "Částečně", 0: "Ne" };
    var total = 0, areas = [], details = [], weak = [];
    AREAS.forEach(function (a) {
      var sub = 0;
      a.items.forEach(function (it) {
        var v = state.answers[it.id]; sub += v; total += v;
        details.push({ id: it.id, area: a.name, question: it.t, value: v, label: LABEL[v] });
        if (v < 2) { weak.push({ it: it, v: v }); }
      });
      areas.push({ name: a.name, score: sub });
    });
    weak.sort(function (x, y) { return (x.v - y.v) || (y.it.w - x.it.w); });
    return { name: name, email: mail, score: total, band: document.getElementById("bandTitle").textContent, answered: Object.keys(state.answers).length, areas: areas, details: details };
  }
  function sendLead(payload) {
    return fetch(LEAD_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }).then(function (r) { if (!r.ok) { throw new Error("HTTP " + r.status); } return r; });
  }
  function unlock() {
    state.unlocked = true;
    var pts = 0;
    AREAS.forEach(function(a) { a.items.forEach(function(it) { pts += (state.answers[it.id] || 0); }); });
    var ringOuter = document.querySelector('.ring-outer');
    if (ringOuter) ringOuter.style.setProperty('--p', (pts / 40).toFixed(3));
    var th = document.getElementById("thanks");
    th.hidden = false;
    render();
    th.focus();
  }
  var attempts = 0;
  document.getElementById("leadForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var nameEl = document.getElementById("leadName"), mailEl = document.getElementById("leadEmail");
    var err = document.getElementById("leadErr"), btn = document.getElementById("leadBtn");
    var name = nameEl.value.trim(), email = mailEl.value.trim();
    function fail(msg, el) { err.textContent = msg; err.hidden = false; if (el) { el.focus(); } }
    err.hidden = true;
    if (name.length < 2) { fail("Napište prosím jméno.", nameEl); return; }
    if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$/.test(email)) { fail("Zkontrolujte prosím e-mail.", mailEl); return; }
    if (document.getElementById("leadHp").value) { unlock(); return; }
    btn.disabled = true;
    btn.classList.add('is-sending');
    btn.textContent = "Odesílám…";
    sendLead(buildPayload(name, email, document.getElementById("leadNews").checked)).then(function () {
      btn.classList.remove('is-sending');
      btn.classList.add('is-sent');
      btn.innerHTML = '<svg width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 5l3.5 3.5L12 1" stroke-dasharray="17" stroke-dashoffset="17" style="animation:draw-chk .4s ease-out both"/></svg>';
      setTimeout(unlock, 700);
    }).catch(function () {
      btn.classList.remove('is-sending');
      attempts += 1;
      btn.disabled = false;
      btn.textContent = "Ukázat výsledek";
      if (attempts >= 2) { unlock(); return; }
      fail("Odeslání se nepovedlo. Zkuste to prosím ještě jednou.");
    });
  });
})();
</script>
</body>
</html>`;

export async function GET() {
  return new NextResponse(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
