"use client";
import { useState } from "react";

function Sipka({ popis, dan, nula }: { popis: string; dan: string; nula?: boolean }) {
  return (
    <div className="hld-sipka">
      <div className="hld-conn">
        <span className="hld-arr">▲</span>
        <span className="hld-ln" />
      </div>
      <div className="hld-meta">
        <span>{popis}</span>
        <span className={`hld-dan${nula ? ' hld-nula' : ''}`}>{dan}</span>
      </div>
    </div>
  )
}

function Radek({ stitek, nadpis, children }: { stitek: string; nadpis: string; children: React.ReactNode }) {
  const cls = stitek === 'Ano' ? 'pos' : stitek === 'Spíš ne' ? 'neg' : 'neu'
  return (
    <div className="hld-row">
      <span className={`hld-badge hld-badge-${cls}`}>{stitek}</span>
      <div>
        <strong>{nadpis}</strong>
        <p>{children}</p>
      </div>
    </div>
  )
}

export function HoldingDiag() {
  const [m, setM] = useState<'s' | 'bez'>('s')
  return (
    <div className="hld-wrap">
      <span className="hld-eyebrow">Holding na jednom obrázku</span>
      <div className="hld-toggle">
        <button type="button" className={m === 's' ? 'on' : ''} onClick={() => setM('s')}>S holdingem</button>
        <button type="button" className={m === 'bez' ? 'on' : ''} onClick={() => setM('bez')}>Bez holdingu</button>
      </div>
      <h3 className="hld-claim">Ze stovky zisku <em>{m === 's' ? 'pracuje celá stovka.' : 'pracuje 85 korun.'}</em></h3>

      <div className="hld-dia">
        <div className="hld-box hld-vy">Vy</div>
        {m === 's' ? (<>
          <Sipka popis="dividenda, až když peníze chcete" dan="daň 15 %" />
          <div className="hld-box hld-hold">Holding s.r.o.<small>peníze leží mimo provozní firmu</small></div>
          <Sipka popis="dividenda" dan="daň 0 %" nula />
        </>) : (
          <Sipka popis="dividenda hned" dan="daň 15 %" />
        )}
        <div className="hld-box hld-firma">Vaše firma s.r.o.<small>zisk po dani z příjmů: 100 Kč</small></div>
      </div>

      <div className="hld-info">
        <b>{m === 's' ? '100 Kč' : '85 Kč'}</b>
        <p>{m === 's'
          ? 'jde do holdingu a dál pracuje: v další firmě, v nemovitosti nebo v rezervě. Daň zaplatíte, až si peníze vezmete domů.'
          : 'vám zbyde k investování. Patnáct korun jde státu hned, ať s penězi plánujete cokoli.'}</p>
      </div>

      <Radek stitek="Ano" nadpis="Z peněz firmy kupujete další firmy nebo nemovitosti">
        Do práce jde celá stovka. A peníze leží mimo provozní firmu, takže je neohrozí, když se jí něco stane.
      </Radek>
      <Radek stitek="Není potřeba" nadpis="Prodáváte firmu, kterou máte přes pět let">
        Od roku 2026 je takový prodej bez daně v jakékoli výši. Z holdingu byste si peníze brali s patnáctiprocentní daní.
      </Radek>
      <Radek stitek="Spíš ne" nadpis="Spoříte na rentu do ETF">
        Osobně jsou zisky po třech letech bez daně. Holding platí z každého zisku 21&nbsp;%.
      </Radek>

      <small className="hld-fn">Platí, když holding drží aspoň 10&nbsp;% firmy nejméně rok. Strukturu nastavujeme s daňovým poradcem, ne podle kamaráda z golfu.</small>
    </div>
  )
}
