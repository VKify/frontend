<div align="center">
  <img src=".github/assets/logo.png" alt="VKify" width="96" />

  # VKify — Frontend

  **Landing website for the VKify VKontakte browser extension**

  [![Website](https://img.shields.io/badge/vkify.ru-0077FF?style=for-the-badge&logo=googlechrome&logoColor=white)](https://vkify.ru)
  [![Telegram](https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/VKify)
  [![VK](https://img.shields.io/badge/VK-4C75A3?style=for-the-badge&logo=vk&logoColor=white)](https://vk.com/vkify)
  [![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/rianvy/vkify)

  ![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)
  ![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite&logoColor=white)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
  ![Framer Motion](https://img.shields.io/badge/Framer_Motion-10-FF0055?style=flat-square&logo=framer&logoColor=white)
  ![i18n](https://img.shields.io/badge/i18n-ru%20·%20en-0077FF?style=flat-square)
  ![Routes](https://img.shields.io/badge/prerendered-85_routes-34A853?style=flat-square)

  [Русская версия →](README.md)

  <br/>

  <img src=".github/assets/site-preview.png" alt="VKify Frontend Preview" width="100%" />
</div>

---

## Pages

| Path | Component | Description |
|---|---|---|
| `/` | `Home.jsx` | Landing — Hero, Features, HowItWorks, Stats, Screenshots, CTA |
| `/themes` | `Themes.jsx` | Theme catalog: search (`useDeferredValue`), 10-category filter, 4-column grid |
| `/themes/:id` | `ThemeDetail.jsx` | Theme detail: VK UI preview, color palette, similar themes, og:image, InstallModal |
| `/theme/:encoded` | `ThemePreview/` | Shared theme preview (base64url config), InstallModal when extension absent |
| `/wallpapers` | `Wallpapers.jsx` | Wallpaper collection: search, filters by type (video/image/web) and category |
| `/wallpapers/:id` | `WallpaperDetail.jsx` | Video/image/iframe, auto-extracted metadata, error fallback, InstallModal |
| `/changelog` | `Changelog.jsx` | Update history |
| `/changelog/:version` | `ChangelogVersion.jsx` | Specific version detail |
| `/news` | `News.jsx` | News & announcements (bilingual posts from `src/data/news.js`) |
| `/news/:slug` | `NewsPost.jsx` | News article: cover, content blocks, CTA, related posts |
| `/welcome` | `Welcome.jsx` | Post-install page: extension status, theme picker, quick settings |
| `/uninstall` | `Uninstall.jsx` | Post-uninstall page with feedback form (Google Forms, no-cors) |
| `/privacy` | `Privacy.jsx` | Privacy policy |
| `/terms` | `Terms.jsx` | Terms of use |
| `*` | `NotFound.jsx` | 404 with Easter egg (5 clicks on digits) and quick links |

---

## Architecture

```
┌────────────────────────────────────────────────────────────────────┐
│                         vkify.ru (SPA)                             │
│                                                                    │
│  React Router 6 ──► pages load lazily (lazy + Suspense)            │
│  hydrateRoot ──► hydrate prerendered HTML                          │
│  LanguageProvider ──► ru / en, switcher in the header              │
│                                                                    │
│  Prerender: 85 routes                                              │
│    8 static + 72 themes (/themes/:id) + 3 wallpapers (/wallpapers) │
│    Puppeteer → static HTML for search engines                      │
└────────────────────────────────────────────────────────────────────┘
         │                              │
         ▼                              ▼
  src/data/*.js                  src/config/index.js
  (72 themes, 3 wallpapers,      (URLs, links, analytics,
   changelog, features)           Google Forms ID, stats)
         │                              │
         ▼                              ▼
  scripts/generate-og.js         src/i18n/locales/{ru,en}.js
  (Puppeteer → 72 × og:image     (UI dictionaries; theme content,
   PNGs 1200×630)                 changelog, legal stay in RU with fallback)
```

---

## Internationalization (i18n)

A lightweight, dependency-free i18n: `LanguageProvider` + `useTranslation` hook.

```jsx
import { useTranslation } from './i18n'

const { t, lang, setLang, supported } = useTranslation()

t('hero.subtitle', { features: '50+' })   // string with {var} interpolation
t('features.cards.appearance.details')     // arrays are interpolated per item
```

- **Language detection**: `localStorage('vkify-lang')` → `navigator.language` → `ru`.
- **Persistence**: stored in `localStorage`, `<html lang>` updated on change.
- **Fallback**: missing key → default language (`ru`) → the key itself (with `console.warn` in DEV).
- **`<LanguageSwitcher>`**: dropdown showing each language's native name from `SUPPORTED_LANGS` — adding a language requires no component changes.

Adding a new language:
1. Create `src/i18n/locales/<code>.js` mirroring `ru.js`.
2. Register it in `src/i18n/index.jsx` (`DICTS`, `SUPPORTED_LANGS`).
3. Done — the switcher and fallback pick it up automatically.

Kept in RU intentionally for now: 72 theme descriptions, changelog entries,
the body of Privacy/Terms (only headers/SEO are translated). The fallback shows
the RU original in EN mode.

---

## Project structure

```
frontend/
├── public/
│   ├── og-image.png                 # OG image for the homepage (1200×630)
│   ├── og/themes/                   # 72 PNGs — og:image per theme
│   ├── wallpapers/
│   ├── favicon.svg, sitemap.xml, robots.txt, _redirects
│
├── scripts/
│   └── generate-og.js               # Puppeteer: 72 og:image PNGs, runs before vite build
│
├── src/
│   ├── i18n/
│   │   ├── index.jsx                # LanguageProvider, useTranslation, LANG_NAMES
│   │   └── locales/
│   │       ├── ru.js                # Russian dictionary (source of truth)
│   │       └── en.js                # English (mirror structure)
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Analytics.jsx        # GA4 + Yandex.Metrika
│   │   │   ├── Badge.jsx, Button.jsx, Card.jsx
│   │   │   ├── DetailNavbar.jsx     # /themes/:id, /theme/:encoded, /wallpapers/:id
│   │   │   ├── DonateModal.jsx      # Cloudtips, Tribute
│   │   │   ├── ErrorBoundary.jsx    # reads language directly (doesn't depend on i18n provider)
│   │   │   ├── ExtensionHint.jsx    # "Extension connected" banner for detail pages
│   │   │   ├── Footer.jsx, Header.jsx
│   │   │   ├── LanguageSwitcher.jsx # dropdown, auto-extends with new languages
│   │   │   ├── Loading.jsx, Logo.jsx
│   │   │   ├── ScrollToTop.jsx
│   │   │   ├── Section.jsx
│   │   │   ├── SEO.jsx              # title, og:*, twitter:*, canonical
│   │   │   ├── SocialIcons.jsx, ThemeToggle.jsx
│   │   │   ├── VkLogo.jsx, VkMiniPreview.jsx
│   │   ├── home/
│   │   │   ├── CTA.jsx, Features.jsx
│   │   │   ├── Hero.jsx, Hero3DCard.jsx
│   │   │   ├── HowItWorks.jsx, Screenshots.jsx, Stats.jsx
│   │   ├── changelog/
│   │   │   └── VersionCard.jsx
│   │   └── uninstall/
│   │       └── FeedbackForm.jsx     # Google Forms, no-cors POST; always submits in RU
│   │
│   ├── pages/
│   │   ├── Home.jsx, Themes.jsx, ThemeDetail.jsx
│   │   ├── ThemePreview/
│   │   │   ├── index.jsx
│   │   │   ├── BackgroundPreview.jsx
│   │   │   ├── ThemeParamTable.jsx  # PARAM_META, ColorStrip, FontSample
│   │   │   └── InstallModal.jsx     # used in ThemeDetail/ThemePreview/WallpaperDetail
│   │   ├── Wallpapers.jsx, WallpaperDetail.jsx
│   │   ├── Changelog.jsx, ChangelogVersion.jsx
│   │   ├── Welcome.jsx, Uninstall.jsx
│   │   ├── Privacy.jsx, Terms.jsx, NotFound.jsx
│   │
│   ├── data/
│   │   ├── themes.js                # 72 themes, 10 categories (themes/themeCategories/themeIds)
│   │   ├── wallpapers.js            # 3 wallpapers (IMAGE/VIDEO/WEB), 7 categories
│   │   ├── features.js              # structural data of top features (id+icon+color)
│   │   ├── changelog.js             # 5 versions
│   │   └── news.js                  # bilingual news (slug + translations[lang])
│   │
│   ├── hooks/
│   │   ├── useExtension.js          # postMessage bridge; { detected, version, settings, saveSettings }
│   │   ├── useApplyToVK.js          # apply + InstallModal state — shared by detail pages
│   │   ├── useCopyToClipboard.js    # copy + auto-reset "copied" flag, clears timer on unmount
│   │   ├── useGoogleFont.js
│   │   ├── useVideoMeta.js          # resolution, duration, format, size
│   │   └── useWEProperties.js       # parses Wallpaper Engine project.json
│   │
│   ├── utils/
│   │   ├── colors.js                # isDarkColor, adjustColor, pluralizeRu
│   │   ├── scroll.js                # scrollToElement, scrollWithOffset, scrollToTop, getActiveSection
│   │   ├── themeShare.js            # encodeTheme / decodeTheme (base64url, v2)
│   │   └── videoEmbed.js            # YouTube, VK, Vimeo, Coub, Twitch, Rutube, MP4
│   │
│   ├── config/
│   │   └── index.js                 # app, analytics, links, navigation, social, stats, feedback, seo
│   ├── context/
│   │   └── ThemeContext.jsx         # dark / light (Tailwind .dark on <html>)
│   ├── styles/
│   │   └── index.css                # Tailwind + CSS variables
│   ├── App.jsx                      # router + lazy imports
│   └── main.jsx                     # hydrateRoot / createRoot + ErrorBoundary + LanguageProvider
│
├── vite.config.js                   # Build + prerender of 85 routes
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## Dependencies

```json
"dependencies": {
  "framer-motion":         "^10.16.5",
  "lucide-react":          "^0.294.0",
  "react":                 "^18.2.0",
  "react-dom":             "^18.2.0",
  "react-helmet-async":    "^2.0.4",
  "react-router-dom":      "^6.20.0",
  "react-router-hash-link":"^2.4.3"
}

"devDependencies": {
  "@prerenderer/renderer-puppeteer": "^1.2.4",
  "@prerenderer/rollup-plugin":      "^0.3.12",
  "@vitejs/plugin-react":            "^4.2.0",
  "autoprefixer":                    "^10.4.16",
  "postcss":                         "^8.4.31",
  "puppeteer":                       "^25.0.4",
  "tailwindcss":                     "^3.3.5",
  "vite":                            "^7.0.0"
}
```

> Vite is pinned at 7.x (classic Rollup) — the latest branch compatible with
> `@vitejs/plugin-react@4` peer dependencies. `manualChunks` in `vite.config.js`
> is given as a function (Rollup requirement). `puppeteer` is declared
> explicitly — `scripts/generate-og.js` imports it directly.

---

## Commands

```bash
npm install

npm run dev          # dev server → http://localhost:5173
npm run build        # og:image + production build with prerender → dist/
npm run preview      # preview the built version
npm run generate-og  # only regenerate og:images (no build)
```

> `npm run build` first runs `scripts/generate-og.js` — it removes old PNGs in
> `public/og/themes/` and creates 72 new ones (1200×630) via Puppeteer; then
> `vite build` bundles the frontend and runs the prerender.

---

## Data

### Themes (`src/data/themes.js`) — 72 themes, 10 categories

| Category | Icon |
|---|---|
| Classic | 📝 |
| Soft | 🌸 |
| AMOLED | 🖤 |
| Colored | 🌈 |
| Neon | ⚡ |
| Nature | 🌿 |
| Minimal | ◾ |
| Retro | 💾 |
| Warm | 🔥 |
| Cool | ❄️ |

Theme structure:
```js
{
  id:          'github-dark',
  name:        'GitHub Dark',
  category:    'classic',
  description: 'Dark theme...',      // shown on detail page; kept in RU
  tags:        ['dark', 'professional'],
  config: {
    custom_theme_id: 'github-dark',
    custom_theme:    '#0d1117',     // background color
    custom_accent:   '#58a6ff',     // accent color
    // …other extension parameters
  },
  preview: {
    bg:     '#0d1117',  card:   '#161b22',  accent: '#58a6ff',
  },
}
```

`preview` is used to render cards on the site without the extension installed.
`config` is what the extension applies to VK.

### Home features (`src/data/features.js`)

Structure only (id + icon + gradient); copy lives in `i18n.features.cards.<id>`.
6 curated blocks: `appearance`, `adblock`, `privacy`, `tracking`, `media`, `messages`.

---

## SEO and prerender

Prerendering uses `@prerenderer/rollup-plugin` + `@prerenderer/renderer-puppeteer`.
The route list is built dynamically from data at build time:

```js
// vite.config.js
import { themeIds }     from './src/data/themes.js'     // 72 IDs
import { wallpaperIds } from './src/data/wallpapers.js' // 3 IDs
import { newsSlugs }    from './src/data/news.js'       // 1 slug

const routes = [
  '/', '/welcome', '/uninstall', '/changelog',
  '/privacy', '/terms', '/themes', '/wallpapers', '/news', // 9 static
  ...themeIds.map(id => `/themes/${id}`),             // 72 routes
  ...wallpaperIds.map(id => `/wallpapers/${id}`),     // 3 routes
  ...newsSlugs.map(slug => `/news/${slug}`),          // 1 route
]  // total: 85 routes
```

Every theme page gets a unique `og:image`:
```jsx
// ThemeDetail.jsx
<SEO
  title={t('themeDetail.seoTitle', { name: theme.name })}
  description={theme.description}
  url={`/themes/${theme.id}`}
  image={`/og/themes/${theme.id}.png`}
/>
```

`SEO.jsx` accepts: `title`, `description`, `url` (canonical), `image`
(og:image; fallback — `/og-image.png`). Automatically adds `og:locale`,
`og:type`, `og:site_name`, Twitter Card, `theme-color`.

> Currently the prerender bakes meta tags in the default language (RU).
> Proper multilingual SEO (hreflang tags + separate EN prerenders) is a
> separate task.

---

## Hooks

| Hook | What it does |
|---|---|
| `useExtension` | postMessage bridge to the extension: `{ detected, version, settings, saveSettings }` |
| `useApplyToVK` | Shared "apply + InstallModal" logic for detail pages |
| `useCopyToClipboard` | `copy(text)` + `copied` flag with auto-reset, clears timer on unmount |
| `useVideoMeta` / `useImageMeta` | Auto-extracts media metadata (resolution, duration, size, format) |
| `useWEProperties` | Parses Wallpaper Engine `project.json` |
| `useGoogleFont` | Loads a Google Font by `font-family` |
| `useTranslation` | i18n — see section above |

---

## CSS variables (`src/styles/index.css`)

```css
:root {
  --bg-primary:    #ffffff;  --bg-secondary:   #f5f5f7;  --bg-tertiary:  #e8e8ed;
  --text-primary:  #1d1d1f;  --text-secondary: #6e6e73;  --text-tertiary:#9b9b9f;
  --border-color:  #e0e0e5;  --primary-light:  #e5f1ff;
}
.dark {                       /* Tailwind dark mode — class on <html> */
  --bg-primary:    #1c1c1e;  --bg-secondary:   #000000;  --bg-tertiary:  #2c2c2e;
  --text-primary:  #f5f5f7;  --text-secondary: #a1a1a6;  --text-tertiary:#6e6e73;
  --border-color:  #38383a;  --primary-light:  #0a3a6b;
}
```

Custom utilities: `.glass`, `.text-gradient`, `.glow`, `.card-hover`,
`.bg-primary/secondary/tertiary`, `.text-primary/secondary/tertiary`, `.border-theme`.

`prefers-reduced-motion` is respected: all CSS and Framer Motion animations
shrink to 0.01ms.

---

## Configuration (`src/config/index.js`)

```js
config.app            // url, name, description, tagline, email
config.analytics      // googleAnalytics (GA4 ID), yandexMetrika
config.links          // chromeWebStore, github, githubIssues, githubDiscussions, telegram, vk
config.navigation     // main (5 anchor links), footer.{product, resources, community, legal}
                      //   every item has a labelKey for i18n
config.social         // [{name, href, color, bgColor}] — Telegram, VK, GitHub
config.stats          // users, rating, features, themes, fonts
config.feedback       // formId, fields.{reasons, comment} — Google Forms
config.seo            // title, description, keywords
config.theme          // primary (#0077ff), gradients
```

---

## Theme sharing

Themes are encoded in `base64url` and shared via `/theme/:encoded`. A v2 schema
with short key aliases and default value skipping (minimal URL size).

```js
encodeTheme(settings, meta) → base64url string
decodeTheme(encoded)        → { settings, meta }
generateShareUrl(settings)  → `${window.location.origin}/theme/${encoded}`
```

A user clicks "Share" on a theme page → a link is built → the recipient sees a
full-screen preview with the same colors. The "Apply instantly" button applies
the theme via the extension (if not installed — `InstallModal` opens).

---

## Host and environment

All **user-facing share links** (`generateShareUrl`, wallpaper page) are built
from `window.location.origin` — in dev (`http://localhost:5173`) you get a
local URL, in production — `https://vkify.ru`. No hardcoded domain in code.

What intentionally stays pinned to `https://vkify.ru` (via `config.app.url`):

| Where | Why |
|---|---|
| `src/components/common/SEO.jsx` | `canonical`, `og:url`, `og:image` — must be the production domain; a localhost canonical would hurt SEO |

`src/data/wallpapers.js` `abs()` is env-aware: in the browser it uses
`window.location.origin` (dev — localhost URL, prod — vkify.ru), the SSR
fallback for the prerender is `config.app.url`. This way the extension gets a
working wallpaper URL on whatever instance the site is running on.

---

## Support the project

If you like the extension, you can support development:

| Method | Link |
|--------|------|
| 🇷🇺 Visa, MasterCard, MIR | [Cloudtips](https://pay.cloudtips.ru/p/b59e1765) |
| 🌍 International cards & crypto | [Tribute](https://t.me/tribute/app?startapp=dE4k) |
