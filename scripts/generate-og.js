#!/usr/bin/env node
/**
 * generate-og.js — Generates 1200×630 og:image PNGs for every theme.
 *
 * Output: public/og/themes/<theme-id>.png
 * Run:    node scripts/generate-og.js
 * Build:  automatically called by "npm run build" before vite build.
 *
 * Skips files that already exist — delete public/og/ to force full regen.
 */

import puppeteer from 'puppeteer'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')

const { themes } = await import('../src/data/themes.js')

const OUT_DIR = path.join(ROOT, 'public', 'og', 'themes')
fs.mkdirSync(OUT_DIR, { recursive: true })

// ─── Color utilities ──────────────────────────────────────────────────────────

function hexToRgb(hex) {
  const h = hex.replace('#', '')
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  }
}

function luma({ r, g, b }) {
  return (r * 0.299 + g * 0.587 + b * 0.114) / 255
}

/** Returns white or near-black depending on what's readable over `hex`. */
function onColor(hex) {
  return luma(hexToRgb(hex)) < 0.55 ? '#ffffff' : '#111111'
}

/** Muted version of onColor */
function onColorMuted(hex) {
  return luma(hexToRgb(hex)) < 0.55
    ? 'rgba(255,255,255,0.55)'
    : 'rgba(0,0,0,0.45)'
}

// ─── HTML template ────────────────────────────────────────────────────────────

function buildHtml(theme) {
  const { name, preview } = theme
  const { bg, accent, card } = preview

  const bgLuma      = luma(hexToRgb(bg))
  const accentLuma  = luma(hexToRgb(accent))
  const isDark      = bgLuma < 0.5
  const text        = onColor(bg)
  const textMuted   = onColorMuted(bg)
  const onAccent    = onColor(accent)
  const onAccentMut = accentLuma < 0.55
    ? 'rgba(255,255,255,0.6)'
    : 'rgba(0,0,0,0.4)'

  const cardBodyBg  = card
  const postBg      = bg

  const cardBorder  = isDark
    ? 'rgba(255,255,255,0.07)'
    : 'rgba(0,0,0,0.1)'

  // Glow: stronger on dark bg, minimal on light
  const glowOp  = isDark ? '0.25' : '0.12'
  const glow2Op = isDark ? '0.15' : '0.07'

  const divider      = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'
  const swatchBorder = isDark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.12)'

  // Adaptive font size for long theme names
  const titleSize = name.length > 16 ? 54 : name.length > 12 ? 64 : name.length > 9 ? 74 : 84

  // Accent tag: if accent is too close to bg in luma, use text color instead
  const tagColor  = Math.abs(accentLuma - bgLuma) > 0.15 ? accent : text
  const tagBg     = `${tagColor}18`
  const tagBorder = `${tagColor}35`
  const tagText   = luma(hexToRgb(bg)) < 0.5
    ? (accentLuma > 0.7 ? accent : (accentLuma > 0.2 ? accent : text))
    : (accentLuma < 0.5 ? accent : `${tagColor}cc`)

  // Post content line color — readable against postBg (= bg)
  const postLineBg = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)'
  // Avatar circles in posts — use a tinted accent
  const postAvBg = `${accent}66`

  return /* html */`<!DOCTYPE html>
<html lang="ru"><head>
<meta charset="utf-8">
<style>
  *{margin:0;padding:0;box-sizing:border-box}

  body{
    width:1200px;height:630px;overflow:hidden;
    background:${bg};
    font-family:'Segoe UI',-apple-system,BlinkMacSystemFont,Roboto,sans-serif;
    -webkit-font-smoothing:antialiased;
  }

  .root{
    width:1200px;height:630px;
    position:relative;
    display:flex;
    flex-direction:column;
  }

  /* ── Glows ── */
  .glow1{
    position:absolute;
    width:680px;height:680px;
    top:-220px;right:-80px;
    background:${accent};
    opacity:${glowOp};
    border-radius:50%;
    filter:blur(130px);
    pointer-events:none;
  }
  .glow2{
    position:absolute;
    width:360px;height:360px;
    bottom:-90px;left:60px;
    background:${accent};
    opacity:${glow2Op};
    border-radius:50%;
    filter:blur(100px);
    pointer-events:none;
  }

  /* ── Top bar ── */
  .topbar{
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding:34px 64px 0;
    position:relative;
    z-index:2;
    flex-shrink:0;
  }
  .brand{
    display:flex;
    align-items:center;
    gap:10px;
  }
  /* "VK" logotype box */
  .brand-logo{
    width:34px;height:34px;
    border-radius:9px;
    background:${accent};
    display:flex;align-items:center;justify-content:center;
    flex-shrink:0;
  }
  .brand-logo-text{
    font-size:13px;font-weight:900;
    color:${onAccent};
    letter-spacing:-.02em;
    line-height:1;
  }
  .brand-name{
    font-size:20px;font-weight:800;
    color:${text};
    letter-spacing:-.02em;
  }
  .brand-sep{
    width:1px;height:16px;
    background:${divider};
    margin:0 4px;
  }
  .brand-tagline{
    font-size:13px;font-weight:500;
    color:${textMuted};
  }
  /* Tag pill top-right */
  .tag{
    display:inline-flex;align-items:center;
    background:${tagBg};
    border:1px solid ${tagBorder};
    color:${tagText};
    font-size:11px;font-weight:700;
    letter-spacing:.08em;text-transform:uppercase;
    padding:6px 16px;border-radius:100px;
  }

  /* ── Main ── */
  .main{
    flex:1;
    display:flex;
    align-items:center;
    padding:0 64px;
    position:relative;
    z-index:2;
    gap:0;
  }

  /* ── Left ── */
  .left{
    flex:1;
    min-width:0;
    padding-right:52px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    gap:0;
  }
  /* Accent bar left of title */
  .title-wrap{
    display:flex;
    align-items:flex-start;
    gap:18px;
    margin-bottom:14px;
  }
  .accent-bar{
    width:5px;
    border-radius:3px;
    background:${accent};
    flex-shrink:0;
    align-self:stretch;
    min-height:${titleSize * 0.85}px;
  }
  .title{
    font-size:${titleSize}px;
    font-weight:900;
    color:${text};
    line-height:.92;
    letter-spacing:-.04em;
    word-break:break-word;
  }
  .subtitle{
    font-size:19px;
    font-weight:500;
    color:${textMuted};
    line-height:1.4;
    padding-left:23px; /* align with title (bar 5px + gap 18px) */
    margin-bottom:24px;
  }
  /* Palette row */
  .palette{
    display:flex;
    align-items:center;
    gap:10px;
    padding-left:23px;
  }
  .swatch-wrap{
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:5px;
  }
  .swatch{
    width:46px;height:46px;
    border-radius:13px;
    border:1.5px solid ${swatchBorder};
    box-shadow:0 2px 8px rgba(0,0,0,0.15);
  }
  .swatch-label{
    font-size:9px;font-weight:700;
    letter-spacing:.07em;text-transform:uppercase;
    color:${textMuted};
  }
  .palette-sep{
    width:1px;height:30px;
    background:${divider};
    margin:0 6px;
    align-self:center;
  }

  /* ── VK card ── */
  .vk-card{
    width:294px;
    height:385px;
    flex-shrink:0;
    background:${cardBodyBg};
    border-radius:20px;
    overflow:hidden;
    border:1px solid ${cardBorder};
    box-shadow:
      0 4px 8px rgba(0,0,0,0.06),
      0 12px 28px rgba(0,0,0,0.14),
      0 36px 80px rgba(0,0,0,0.24);
    display:flex;
    flex-direction:column;
  }

  /* VK header */
  .vk-header{
    background:${accent};
    padding:0 14px;
    height:54px;
    display:flex;align-items:center;gap:10px;
    flex-shrink:0;
  }
  .vk-av{
    width:32px;height:32px;border-radius:50%;
    background:${onAccent === '#ffffff' ? 'rgba(255,255,255,0.28)' : 'rgba(0,0,0,0.14)'};
    flex-shrink:0;
  }
  .vk-hinfo{ flex:1;min-width:0; }
  .vk-hname{
    font-size:13px;font-weight:700;
    color:${onAccent};
    line-height:1;
  }
  .vk-hstatus{
    font-size:10.5px;
    color:${onAccentMut};
    margin-top:3px;
  }
  .vk-dots{
    display:flex;gap:3.5px;align-items:center;
  }
  .vk-dot{
    width:3.5px;height:3.5px;border-radius:50%;
    background:${onAccentMut};
  }

  /* VK body */
  .vk-body{
    flex:1;
    padding:10px;
    display:flex;flex-direction:column;gap:8px;
    overflow:hidden;
  }
  .vk-post{
    background:${postBg};
    border-radius:11px;
    padding:11px 12px;
  }
  .vk-post-top{
    display:flex;align-items:center;gap:8px;
    margin-bottom:9px;
  }
  .vk-post-av{
    width:24px;height:24px;border-radius:50%;
    background:${postAvBg};
    flex-shrink:0;
  }
  .vk-post-meta{
    display:flex;flex-direction:column;gap:4px;flex:1;
  }
  .vk-post-name-bar{
    height:7px;border-radius:3.5px;width:72px;
    background:${accent};opacity:0.45;
  }
  .vk-post-time-bar{
    height:5px;border-radius:2.5px;width:44px;
    background:${postLineBg};
  }
  .vk-lines{ display:flex;flex-direction:column;gap:6px; }
  .vk-line{
    height:6.5px;border-radius:3.25px;
    background:${postLineBg};
  }
  .l-100{width:100%}
  .l-82{width:82%}
  .l-68{width:68%}
  .l-52{width:52%}
  .l-40{width:40%}
  .vk-post-actions{
    display:flex;gap:12px;margin-top:9px;
    align-items:center;
  }
  .vk-action{
    display:flex;align-items:center;gap:5px;
  }
  .vk-action-icon{
    width:12px;height:12px;border-radius:2px;
    background:${accent};opacity:0.35;
  }
  .vk-action-label{
    height:6px;width:20px;border-radius:3px;
    background:${postLineBg};
  }

  /* ── Bottom bar ── */
  .bottom{
    padding:0 64px 30px;
    display:flex;align-items:center;justify-content:space-between;
    position:relative;z-index:2;
    flex-shrink:0;
  }
  .bottom-rule{
    position:absolute;top:0;left:64px;right:64px;
    height:1px;background:${divider};
  }
  .bottom-left{
    display:flex;align-items:center;gap:8px;
    padding-top:18px;
  }
  .bottom-dot{
    width:6px;height:6px;border-radius:50%;
    background:${accent};opacity:0.7;
  }
  .bottom-text{
    font-size:12px;font-weight:500;
    color:${textMuted};
  }
  .bottom-domain{
    font-size:15px;font-weight:700;
    color:${text};
    opacity:0.45;
    letter-spacing:-.01em;
    padding-top:18px;
  }
</style>
</head><body>
<div class="root">

  <div class="glow1"></div>
  <div class="glow2"></div>

  <!-- Top bar -->
  <div class="topbar">
    <div class="brand">
      <div class="brand-logo">
        <span class="brand-logo-text">VK</span>
      </div>
      <div class="brand-name">ify</div>
      <div class="brand-sep"></div>
      <div class="brand-tagline">Темы для ВКонтакте</div>
    </div>
    <div class="tag">Тема оформления</div>
  </div>

  <!-- Main content -->
  <div class="main">

    <!-- Left: text + palette -->
    <div class="left">
      <div class="title-wrap">
        <div class="accent-bar"></div>
        <div class="title">${escapeHtml(name)}</div>
      </div>
      <div class="subtitle">Тема оформления для ВКонтакте</div>
      <div class="palette">
        <div class="swatch-wrap">
          <div class="swatch" style="background:${bg}"></div>
          <div class="swatch-label">Фон</div>
        </div>
        <div class="swatch-wrap">
          <div class="swatch" style="background:${card}"></div>
          <div class="swatch-label">Карточки</div>
        </div>
        <div class="palette-sep"></div>
        <div class="swatch-wrap">
          <div class="swatch" style="background:${accent}"></div>
          <div class="swatch-label">Акцент</div>
        </div>
      </div>
    </div>

    <!-- Right: VK mockup -->
    <div class="vk-card">
      <div class="vk-header">
        <div class="vk-av"></div>
        <div class="vk-hinfo">
          <div class="vk-hname">ВКонтакте</div>
          <div class="vk-hstatus">в сети</div>
        </div>
        <div class="vk-dots">
          <div class="vk-dot"></div>
          <div class="vk-dot"></div>
          <div class="vk-dot"></div>
        </div>
      </div>
      <div class="vk-body">

        <div class="vk-post">
          <div class="vk-post-top">
            <div class="vk-post-av"></div>
            <div class="vk-post-meta">
              <div class="vk-post-name-bar"></div>
              <div class="vk-post-time-bar"></div>
            </div>
          </div>
          <div class="vk-lines">
            <div class="vk-line l-100"></div>
            <div class="vk-line l-82"></div>
            <div class="vk-line l-68"></div>
          </div>
          <div class="vk-post-actions">
            <div class="vk-action">
              <div class="vk-action-icon"></div>
              <div class="vk-action-label"></div>
            </div>
            <div class="vk-action">
              <div class="vk-action-icon"></div>
              <div class="vk-action-label"></div>
            </div>
          </div>
        </div>

        <div class="vk-post">
          <div class="vk-post-top">
            <div class="vk-post-av"></div>
            <div class="vk-post-meta">
              <div class="vk-post-name-bar"></div>
              <div class="vk-post-time-bar"></div>
            </div>
          </div>
          <div class="vk-lines">
            <div class="vk-line l-100"></div>
            <div class="vk-line l-52"></div>
          </div>
          <div class="vk-post-actions">
            <div class="vk-action">
              <div class="vk-action-icon"></div>
              <div class="vk-action-label"></div>
            </div>
          </div>
        </div>

        <div class="vk-post">
          <div class="vk-post-top">
            <div class="vk-post-av"></div>
            <div class="vk-post-meta">
              <div class="vk-post-name-bar"></div>
              <div class="vk-post-time-bar"></div>
            </div>
          </div>
          <div class="vk-lines">
            <div class="vk-line l-100"></div>
            <div class="vk-line l-82"></div>
            <div class="vk-line l-40"></div>
          </div>
        </div>

      </div>
    </div>
  </div>

  <!-- Bottom -->
  <div class="bottom">
    <div class="bottom-rule"></div>
    <div class="bottom-left">
      <div class="bottom-dot"></div>
      <div class="bottom-text">Бесплатно · Chrome Web Store</div>
    </div>
    <div class="bottom-domain">vkify.ru</div>
  </div>

</div>
</body></html>`
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function run() {
  // Force-delete existing images so we regenerate with the new template
  if (fs.existsSync(OUT_DIR)) {
    for (const f of fs.readdirSync(OUT_DIR)) {
      if (f.endsWith('.png')) fs.unlinkSync(path.join(OUT_DIR, f))
    }
  }

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  })

  const generated = []

  console.log(`\n🎨  Generating og:image for ${themes.length} themes…\n`)

  for (const theme of themes) {
    const outPath = path.join(OUT_DIR, `${theme.id}.png`)

    const page = await browser.newPage()
    await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 })
    await page.setContent(buildHtml(theme), { waitUntil: 'networkidle0' })
    await page.screenshot({ path: outPath, type: 'png' })
    await page.close()

    generated.push(theme.id)
    process.stdout.write('✓')
  }

  await browser.close()

  console.log(`\n\n✅  Done! Generated ${generated.length} images → public/og/themes/\n`)
}

run().catch(err => {
  console.error('\n❌  OG image generation failed:', err.message)
  process.exit(1)
})