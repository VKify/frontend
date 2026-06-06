#!/usr/bin/env node
/**
 * generate-og.js — Generates 1200×630 og:image PNGs for every theme.
 *
 * Output: public/og/themes/<theme-id>.png
 * Run:    node scripts/generate-og.js
 *         OG_THEMES=dracula,solarized node scripts/generate-og.js   (только эти темы — для отладки)
 * Build:  automatically called by "npm run build" before vite build.
 *
 * Стиль: фиксированный фирменный тёмный баннер (логотип VKify, eyebrow,
 * палитра, статистика, мокап VK с плавающими бейджами). Цвета конкретной
 * темы показываются в мокапе и акцентах — каждый баннер уникален.
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

function rgbToHex({ r, g, b }) {
  const c = v => Math.min(255, Math.max(0, Math.round(v))).toString(16).padStart(2, '0')
  return `#${c(r)}${c(g)}${c(b)}`
}

function luma({ r, g, b }) {
  return (r * 0.299 + g * 0.587 + b * 0.114) / 255
}

/** Смешать цвет с целевым (target rgb) на долю t (0..1) */
function mix(hex, target, t) {
  const a = hexToRgb(hex)
  return rgbToHex({
    r: a.r + (target.r - a.r) * t,
    g: a.g + (target.g - a.g) * t,
    b: a.b + (target.b - a.b) * t,
  })
}
const WHITE = { r: 255, g: 255, b: 255 }
const BLACK = { r: 0, g: 0, b: 0 }
const lighten = (hex, t) => mix(hex, WHITE, t)
const darken = (hex, t) => mix(hex, BLACK, t)

/** Returns white or near-black depending on what's readable over `hex`. */
function onColor(hex) {
  return luma(hexToRgb(hex)) < 0.55 ? '#ffffff' : '#111111'
}
function onColorMuted(hex) {
  return luma(hexToRgb(hex)) < 0.55 ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.45)'
}

// ─── Inline icons (white stroke/fill) ───────────────────────────────────────────

const ICON_LOGO = `<svg viewBox="0 0 231 148" width="28" height="18" fill="#fff" xmlns="http://www.w3.org/2000/svg"><path d="M73.711 1.83982L97.0564 57.5097C97.9202 59.5696 100.652 59.9968 102.103 58.2988L151.041 1.05066C151.611 0.383902 152.444 0 153.322 0H221.115C223.645 0 225.039 2.93882 223.438 4.898L107.853 146.382C107.275 147.089 106.408 147.494 105.496 147.484L63.8875 147.022C62.7028 147.008 61.6367 146.299 61.1668 145.211L0.249245 4.18967C-0.606304 2.2091 0.845833 0 3.00328 0H70.9444C72.153 0 73.2436 0.725252 73.711 1.83982Z"/><path d="M138.702 122.916L173.168 82.1842C174.36 80.7756 176.529 80.7667 177.733 82.1655L229.675 142.544C231.349 144.488 229.967 147.5 227.401 147.5H160.202C159.395 147.5 158.621 147.175 158.057 146.597L138.848 126.952C137.766 125.845 137.703 124.098 138.702 122.916Z"/></svg>`

const ICON_PALETTE = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><circle cx="12" cy="12" r="9"/><circle cx="9" cy="9" r="1.3" fill="#fff" stroke="none"/><circle cx="15" cy="9" r="1.3" fill="#fff" stroke="none"/><circle cx="9.6" cy="14.6" r="1.3" fill="#fff" stroke="none"/></svg>`
const ICON_LOCK = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/></svg>`
const ICON_SHIELD = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>`
const ICON_GLOBE = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18"/></svg>`

// ─── HTML template ────────────────────────────────────────────────────────────

function buildHtml(theme) {
  const { name } = theme
  const { bg, accent, card } = theme.preview
  const tags = theme.tags || []

  const bgIsLight = luma(hexToRgb(bg)) >= 0.5
  const isLightTheme = tags.includes('light') || bgIsLight

  // ── Banner chrome (фиксированный фирменный тёмный) ──
  const BANNER_BG = '#0a0e17'
  const TXT       = '#ffffff'
  const MUTED     = 'rgba(255,255,255,0.55)'
  const FAINT     = 'rgba(255,255,255,0.10)'

  const accLuma = luma(hexToRgb(accent))
  // Акцент для использования как цвет на тёмном баннере — подсветляем тёмные акценты
  const accentOnDark = accLuma < 0.45 ? lighten(accent, 0.45) : accent

  // ── Mockup (реальные цвета темы) ──
  const onAccent    = onColor(accent)
  const onAccentMut = luma(hexToRgb(accent)) < 0.55 ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,0.45)'
  const postText    = onColor(bg)
  const postMuted   = onColorMuted(bg)
  const cardBorder  = isLightTheme ? 'rgba(0,0,0,0.10)' : 'rgba(255,255,255,0.08)'
  const lineBg      = bgIsLight ? 'rgba(0,0,0,0.10)' : 'rgba(255,255,255,0.14)'
  const postAvBg    = `${accent}66`
  const wallBg      = `${accent}22`
  const wallBorder  = `${accent}45`
  const wallText    = onColor(card)

  // Adaptive title size for long theme names
  const titleSize = name.length > 18 ? 52 : name.length > 13 ? 62 : name.length > 9 ? 72 : 82

  const themeKindLabel = isLightTheme ? 'светлая тема' : 'тёмная тема'

  return /* html */`<!DOCTYPE html>
<html lang="ru"><head>
<meta charset="utf-8">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{
    width:1200px;height:630px;overflow:hidden;
    font-family:'Segoe UI',-apple-system,BlinkMacSystemFont,Roboto,sans-serif;
    -webkit-font-smoothing:antialiased;
  }
  .root{
    position:relative;
    width:1200px;height:630px;
    background:${BANNER_BG};
    overflow:hidden;
  }

  /* ── Background decor ── */
  .grid{
    position:absolute;inset:0;
    background-image:
      linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
    background-size:46px 46px;
    -webkit-mask-image:radial-gradient(ellipse 80% 70% at 35% 30%, #000 10%, transparent 80%);
            mask-image:radial-gradient(ellipse 80% 70% at 35% 30%, #000 10%, transparent 80%);
  }
  .glow-a{
    position:absolute;width:760px;height:760px;
    top:-260px;right:-140px;border-radius:50%;
    background:${accentOnDark};opacity:.20;filter:blur(150px);
  }
  .glow-b{
    position:absolute;width:520px;height:520px;
    bottom:-220px;left:-120px;border-radius:50%;
    background:#0077ff;opacity:.18;filter:blur(150px);
  }

  /* ── Left column ── */
  .left{
    position:absolute;left:60px;top:54px;width:660px;
    display:flex;flex-direction:column;
    z-index:3;
  }
  .eyebrow{
    display:inline-flex;align-items:center;gap:9px;
    align-self:flex-start;
    background:rgba(0,119,255,0.12);
    border:1px solid rgba(0,119,255,0.32);
    border-radius:100px;
    padding:8px 16px;
    font-size:11.5px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;
    color:#7db8ff;
  }
  .eyebrow-dot{width:7px;height:7px;border-radius:50%;background:#0077ff;box-shadow:0 0 10px #0077ff;}

  .brand{display:flex;align-items:center;gap:14px;margin-top:26px;}
  .brand-logo{
    width:60px;height:60px;border-radius:16px;
    background:linear-gradient(135deg,#0a84ff,#0077ff 55%,#0a5bd6);
    display:flex;align-items:center;justify-content:center;
    box-shadow:0 10px 26px rgba(0,119,255,0.45);
  }
  .wordmark{font-size:46px;font-weight:900;letter-spacing:-.03em;line-height:1;}
  .wm-vk{color:#fff;}
  .wm-ify{
    background:linear-gradient(90deg,#0a84ff,#36c5ff);
    -webkit-background-clip:text;background-clip:text;color:transparent;
  }

  .title{
    margin-top:30px;
    font-size:${titleSize}px;font-weight:900;color:${TXT};
    line-height:.96;letter-spacing:-.035em;
    max-width:560px;
  }
  .subtitle{
    margin-top:16px;
    font-size:18px;font-weight:500;color:${MUTED};
  }
  .subtitle b{color:${accentOnDark};font-weight:700;}

  /* palette */
  .palette{display:flex;align-items:center;gap:11px;margin-top:30px;}
  .sw-wrap{display:flex;flex-direction:column;align-items:center;gap:6px;}
  .sw{width:48px;height:48px;border-radius:13px;border:1.5px solid rgba(255,255,255,0.16);box-shadow:0 4px 14px rgba(0,0,0,0.35);}
  .sw-lbl{font-size:9px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:${MUTED};}
  .pal-sep{width:1px;height:34px;background:${FAINT};margin:0 5px;align-self:center;}

  /* ── Footer (stats + domain) ── */
  .footer{position:absolute;left:60px;bottom:46px;z-index:3;}
  .stats{display:flex;gap:34px;margin-bottom:20px;}
  .stat-val{font-size:27px;font-weight:900;color:#fff;line-height:1;letter-spacing:-.02em;}
  .stat-lbl{font-size:11px;color:${MUTED};margin-top:6px;}
  .domain{
    display:inline-flex;align-items:center;gap:9px;
    background:rgba(255,255,255,0.05);
    border:1px solid rgba(255,255,255,0.10);
    border-radius:100px;padding:9px 17px;
    font-size:13px;font-weight:600;color:${MUTED};
  }
  .domain b{color:#fff;font-weight:700;}
  .domain svg{color:#7db8ff;}

  /* ── VK mockup ── */
  .vk-card{
    position:absolute;top:88px;right:150px;
    width:300px;height:454px;
    background:${card};
    border-radius:22px;overflow:hidden;
    border:1px solid ${cardBorder};
    box-shadow:0 30px 70px rgba(0,0,0,0.55),0 10px 24px rgba(0,0,0,0.4);
    display:flex;flex-direction:column;z-index:2;
  }
  .vk-header{background:${accent};padding:0 15px;height:58px;display:flex;align-items:center;gap:11px;flex-shrink:0;}
  .vk-logo{width:34px;height:34px;border-radius:9px;background:${onAccent === '#ffffff' ? 'rgba(255,255,255,0.22)' : 'rgba(0,0,0,0.14)'};display:flex;align-items:center;justify-content:center;flex-shrink:0;}
  .vk-logo svg path{fill:${onAccent};}
  .vk-hinfo{flex:1;min-width:0;}
  .vk-hname{font-size:14px;font-weight:800;color:${onAccent};line-height:1;}
  .vk-hsub{font-size:10.5px;color:${onAccentMut};margin-top:4px;}
  .vk-status{width:9px;height:9px;border-radius:50%;background:#22c55e;box-shadow:0 0 0 3px ${accent};}

  .vk-body{flex:1;padding:11px;display:flex;flex-direction:column;gap:9px;overflow:hidden;}
  .vk-wall{
    display:flex;align-items:center;gap:8px;
    background:${wallBg};border:1px solid ${wallBorder};
    border-radius:10px;padding:8px 11px;
  }
  .vk-wall-dot{width:7px;height:7px;border-radius:50%;background:${accent};flex-shrink:0;}
  .vk-wall-txt{font-size:11px;font-weight:600;color:${wallText};opacity:.92;}

  .vk-post{background:${bg};border-radius:12px;padding:11px 12px;}
  .vk-post-top{display:flex;align-items:center;gap:9px;margin-bottom:9px;}
  .vk-post-av{width:26px;height:26px;border-radius:50%;background:${postAvBg};flex-shrink:0;}
  .vk-post-meta{display:flex;flex-direction:column;gap:3px;}
  .vk-post-name{font-size:11.5px;font-weight:700;color:${postText};line-height:1;}
  .vk-post-time{font-size:9.5px;color:${postMuted};}
  .vk-lines{display:flex;flex-direction:column;gap:6px;}
  .vk-line{height:6.5px;border-radius:3.25px;background:${lineBg};}
  .l-100{width:100%}.l-82{width:82%}.l-64{width:64%}.l-46{width:46%}

  /* ── Floating badges ── */
  .fb{
    position:absolute;z-index:4;
    display:flex;align-items:center;gap:11px;
    background:rgba(15,19,28,0.94);
    border:1px solid rgba(255,255,255,0.10);
    border-radius:15px;padding:11px 15px;
    box-shadow:0 16px 36px rgba(0,0,0,0.5);
  }
  .fb-icon{width:36px;height:36px;border-radius:11px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
  .fb-lbl{font-size:10.5px;color:rgba(255,255,255,0.55);line-height:1;}
  .fb-val{font-size:16px;font-weight:800;color:#fff;line-height:1;margin-top:4px;letter-spacing:-.01em;}

  .fb-themes{top:60px;left:628px;}
  .fb-themes .fb-icon{background:linear-gradient(135deg,#a855f7,#7c3aed);}
  .fb-privacy{top:300px;right:34px;}
  .fb-privacy .fb-icon{background:linear-gradient(135deg,#fb7185,#ef4444);}
  .fb-ads{bottom:64px;right:104px;}
  .fb-ads .fb-icon{background:linear-gradient(135deg,#34d399,#10b981);}
</style>
</head><body>
<div class="root">
  <div class="grid"></div>
  <div class="glow-a"></div>
  <div class="glow-b"></div>

  <!-- Left -->
  <div class="left">
    <div class="eyebrow"><span class="eyebrow-dot"></span>Расширение для браузера · Chrome &amp; Firefox</div>

    <div class="brand">
      <div class="brand-logo">${ICON_LOGO}</div>
      <div class="wordmark"><span class="wm-vk">VK</span><span class="wm-ify">ify</span></div>
    </div>

    <div class="title">${escapeHtml(name)}</div>
    <div class="subtitle">Тема оформления для <b>ВКонтакте</b></div>

    <div class="palette">
      <div class="sw-wrap"><div class="sw" style="background:${bg}"></div><div class="sw-lbl">Фон</div></div>
      <div class="sw-wrap"><div class="sw" style="background:${card}"></div><div class="sw-lbl">Карточки</div></div>
      <div class="pal-sep"></div>
      <div class="sw-wrap"><div class="sw" style="background:${accent}"></div><div class="sw-lbl">Акцент</div></div>
    </div>
  </div>

  <!-- Footer -->
  <div class="footer">
    <div class="stats">
      <div><div class="stat-val">72+</div><div class="stat-lbl">тем оформления</div></div>
      <div><div class="stat-val">50+</div><div class="stat-lbl">функций</div></div>
      <div><div class="stat-val">0&nbsp;₽</div><div class="stat-lbl">бесплатно</div></div>
    </div>
    <div class="domain">${ICON_GLOBE}<b>vkify.ru</b>&nbsp;·&nbsp;Тема для ВКонтакте&nbsp;·&nbsp;Бесплатно</div>
  </div>

  <!-- VK mockup -->
  <div class="vk-card">
    <div class="vk-header">
      <div class="vk-logo">${ICON_LOGO}</div>
      <div class="vk-hinfo">
        <div class="vk-hname">ВКонтакте</div>
        <div class="vk-hsub">через VKify · ${themeKindLabel}</div>
      </div>
      <div class="vk-status"></div>
    </div>
    <div class="vk-body">
      <div class="vk-wall"><span class="vk-wall-dot"></span><span class="vk-wall-txt">Тема · ${escapeHtml(name)}</span></div>

      <div class="vk-post">
        <div class="vk-post-top">
          <div class="vk-post-av"></div>
          <div class="vk-post-meta"><div class="vk-post-name">Иван Петров</div><div class="vk-post-time">только что</div></div>
        </div>
        <div class="vk-lines"><div class="vk-line l-100"></div><div class="vk-line l-82"></div><div class="vk-line l-64"></div></div>
      </div>

      <div class="vk-post">
        <div class="vk-post-top">
          <div class="vk-post-av"></div>
          <div class="vk-post-meta"><div class="vk-post-name">Анна Смирнова</div><div class="vk-post-time">3 мин назад</div></div>
        </div>
        <div class="vk-lines"><div class="vk-line l-100"></div><div class="vk-line l-46"></div></div>
      </div>

      <div class="vk-post">
        <div class="vk-post-top">
          <div class="vk-post-av"></div>
          <div class="vk-post-meta"><div class="vk-post-name">Дмитрий К.</div><div class="vk-post-time">10 мин назад</div></div>
        </div>
        <div class="vk-lines"><div class="vk-line l-100"></div><div class="vk-line l-82"></div></div>
      </div>
    </div>
  </div>

  <!-- Floating badges -->
  <div class="fb fb-themes">
    <div class="fb-icon">${ICON_PALETTE}</div>
    <div><div class="fb-lbl">Тем оформления</div><div class="fb-val">72+</div></div>
  </div>
  <div class="fb fb-privacy">
    <div class="fb-icon">${ICON_LOCK}</div>
    <div><div class="fb-lbl">Приватность</div><div class="fb-val">100%</div></div>
  </div>
  <div class="fb fb-ads">
    <div class="fb-icon">${ICON_SHIELD}</div>
    <div><div class="fb-lbl">Реклама заблокирована</div><div class="fb-val">0 объявлений</div></div>
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
  // Опциональный фильтр для отладки: OG_THEMES=dracula,solarized
  const only = (process.env.OG_THEMES || '').split(',').map(s => s.trim()).filter(Boolean)
  const list = only.length ? themes.filter(t => only.includes(t.id)) : themes

  // Полную регенерацию делаем только при прогоне всех тем
  if (!only.length && fs.existsSync(OUT_DIR)) {
    for (const f of fs.readdirSync(OUT_DIR)) {
      if (f.endsWith('.png')) fs.unlinkSync(path.join(OUT_DIR, f))
    }
  }

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  })

  const generated = []
  console.log(`\n🎨  Generating og:image for ${list.length} theme(s)…\n`)

  for (const theme of list) {
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
