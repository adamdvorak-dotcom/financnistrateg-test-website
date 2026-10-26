import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { getArticle } from '@/app/blog/articles'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticle(slug)
  const lora = await readFile(join(process.cwd(), 'assets/Lora-Medium.ttf'))

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
          justifyContent: 'space-between', background: '#0C1F3A', color: '#F5F2EC', padding: 80,
        }}
      >
        <div
          style={{
            display: 'flex', fontSize: 19, letterSpacing: 3,
            textTransform: 'uppercase', color: '#C9A260',
          }}
        >
          {article?.tag ?? 'Finanční Stratég'}
        </div>
        <div
          style={{
            display: 'flex', fontFamily: 'Lora', fontSize: 70,
            lineHeight: 1.06, maxWidth: 860,
          }}
        >
          {article?.title ?? 'Adam Dvořák, EFA'}
        </div>
        <div
          style={{
            display: 'flex', alignItems: 'center', gap: 20,
            fontSize: 22, color: 'rgba(245,242,236,.7)',
          }}
        >
          {`Adam Dvořák, EFA · financnistrateg.com/blog${article?.readTime ? ` · ${article.readTime} min čtení` : ''}`}
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: 'Lora', data: lora, weight: 500, style: 'normal' }] }
  )
}
