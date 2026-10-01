import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import { DOCS } from '../src/data/docs.js'

const root = fileURLToPath(new URL('../', import.meta.url))
const targets = new Set()
let screenshots = 0
for (const doc of DOCS) {
  assert(doc.features.length, `${doc.slug}: empty page`)
  const anchors = new Set()
  for (const feature of doc.features) {
    assert(!anchors.has(feature.anchor), `${doc.slug}: duplicate ${feature.anchor}`)
    anchors.add(feature.anchor)
    targets.add(`${doc.slug}#${feature.anchor}`)
    for (const lang of ['ru', 'en']) {
      const text = feature[lang]
      assert(text?.title && text?.lead && text?.access, `${doc.slug}/${feature.anchor}: missing ${lang} guide`)
      assert(text.how?.length || text.items?.length, `${doc.slug}/${feature.anchor}: missing ${lang} instructions`)
    }
    for (const media of feature.media) {
      assert(existsSync(resolve(root, 'public/docs', doc.slug, media.file)), `Missing screenshot ${doc.slug}/${media.file}`)
      screenshots++
    }
  }
  if (doc.overviewMedia) assert(existsSync(resolve(root, 'public/docs', doc.slug, doc.overviewMedia.file)), `Missing overview ${doc.slug}`)
}

// Optional cross-repository check when the extension checkout is available.
const extension = resolve(process.env.VKIFY_EXTENSION_DIR || resolve(root, '../vkify-extension'))
const mapping = resolve(extension, 'src/shared/constants/docs.ts')
if (existsSync(mapping)) {
  const source = readFileSync(mapping, 'utf8')
  for (const match of source.matchAll(/\['([^']+)',\s*'([^']+)'\]/g)) {
    assert(targets.has(`${match[1]}#${match[2]}`), `Broken extension documentation link: ${match[1]}#${match[2]}`)
  }
}
console.log(`Verified ${DOCS.length} RU/EN pages, ${targets.size} articles and ${screenshots} screenshot references`)
