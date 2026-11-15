import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

// Obrázek pro sdílení homepage a stránek, které nemají vlastní (blog, /konzultace, právní stránky).
// Sítě chtějí formát na šířku 1200×630, fotka z úvodu je na výšku a ořízla by se.
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Adam Dvořák, EFA. Finanční stratég pro majitele firem a jejich rodiny, Praha'

export default async function Image() {
  const [lora, photo] = await Promise.all([
    readFile(join(process.cwd(), 'assets/Lora-Medium.ttf')),
    readFile(join(process.cwd(), 'public/adam-dvorak-hero.jpg')),
  ])
  const photoSrc = `data:image/jpeg;base64,${photo.toString('base64')}`

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: '#0C1F3A', color: '#F5F2EC' }}>
        <div
          style={{
            width: 700, height: '100%', display: 'flex', flexDirection: 'column',
            justifyContent: 'space-between', padding: '72px 0 72px 80px',
          }}
        >
          <div
            style={{
              display: 'flex', fontSize: 19, letterSpacing: 3,
              textTransform: 'uppercase', color: '#C9A260',
            }}
          >
            Finanční stratég · Praha
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', fontFamily: 'Lora', fontSize: 76, lineHeight: 1.08 }}>
            <div style={{ display: 'flex' }}>Jeden člověk.</div>
            <div style={{ display: 'flex', color: '#C9A260' }}>Celý váš obraz.</div>
          </div>
          <div style={{ display: 'flex', fontSize: 22, color: 'rgba(245,242,236,.7)' }}>
            Adam Dvořák, EFA · financnistrateg.com
          </div>
        </div>
        <img src={photoSrc} alt="" width={500} height={630} style={{ objectFit: 'cover', objectPosition: 'center top' }} />
      </div>
    ),
    { ...size, fonts: [{ name: 'Lora', data: lora, weight: 500, style: 'normal' }] }
  )
}
