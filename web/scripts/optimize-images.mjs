/**
 * Convert heavy public JPG/PNG assets to WebP for faster delivery.
 * Keeps originals as fallback. Hero frames: quality 72, max width 900.
 */
import sharp from 'sharp'
import fs from 'fs/promises'
import path from 'path'

const root = path.resolve('public')

async function convertFile(src, dest, { quality = 78, maxWidth } = {}) {
  let pipeline = sharp(src).rotate()
  if (maxWidth) {
    pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true })
  }
  await pipeline.webp({ quality, effort: 4 }).toFile(dest)
  const [a, b] = await Promise.all([fs.stat(src), fs.stat(dest)])
  return { src, dest, before: a.size, after: b.size }
}

async function main() {
  const results = []

  // Static marketing images
  const staticFiles = [
    'bottle-19l.jpg',
    'Waterabout.jpg',
    'bottle.png',
    'logo.png',
    'Water19.png',
    ...[
      'gazette_audit.jpg',
      'gazette_glass_bottle.jpg',
      'gazette_mountain_spring.jpg',
      'gazette_policy_solar.jpg',
      'gazette_tds_meter.jpg',
    ].map((f) => path.join('gazette', f)),
  ]

  for (const rel of staticFiles) {
    const src = path.join(root, rel)
    try {
      await fs.access(src)
    } catch {
      continue
    }
    const dest = src.replace(/\.(jpe?g|png)$/i, '.webp')
    results.push(
      await convertFile(src, dest, {
        quality: rel.includes('logo') ? 90 : 80,
        maxWidth: rel.includes('logo') ? 800 : 1600,
      })
    )
  }

  // Hero scroll frames
  const framesDir = path.join(root, 'frames')
  const frames = (await fs.readdir(framesDir))
    .filter((f) => /^ezgif-frame-\d+\.png$/i.test(f))
    .sort()

  for (let i = 0; i < frames.length; i++) {
    const f = frames[i]
    const src = path.join(framesDir, f)
    const dest = src.replace(/\.png$/i, '.webp')
    results.push(await convertFile(src, dest, { quality: 72, maxWidth: 900 }))
    if ((i + 1) % 25 === 0) {
      console.log(`frames ${i + 1}/${frames.length}`)
    }
  }

  const before = results.reduce((s, r) => s + r.before, 0)
  const after = results.reduce((s, r) => s + r.after, 0)
  console.log(
    `Converted ${results.length} files: ${(before / 1e6).toFixed(1)}MB → ${(after / 1e6).toFixed(1)}MB (−${(
      ((before - after) / before) *
      100
    ).toFixed(0)}%)`
  )
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
