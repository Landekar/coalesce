import sharp from 'sharp'
import { readdirSync, existsSync } from 'fs'
import { join, extname, basename } from 'path'

const inputDir = 'public/images'
const convertable = ['.jpg', '.jpeg', '.png']

if (!existsSync(inputDir)) process.exit(0)

const files = readdirSync(inputDir)
let converted = 0

for (const file of files) {
  const ext = extname(file).toLowerCase()
  if (!convertable.includes(ext)) continue

  const name = basename(file, ext)
  const outputPath = join(inputDir, `${name}.webp`)

  if (existsSync(outputPath)) continue // already converted

  await sharp(join(inputDir, file))
    .webp({ quality: 82 })
    .toFile(outputPath)

  console.log(`  ✓ ${file} → ${name}.webp`)
  converted++
}

if (converted > 0) console.log(`Converted ${converted} image(s) to WebP.`)
