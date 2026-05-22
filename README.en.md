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
  ![Routes](https://img.shields.io/badge/prerendered-83_routes-34A853?style=flat-square)

  [Русская версия →](README.md)

  <br/>

  <img src=".github/assets/site-preview.png" alt="VKify Frontend Preview" width="100%" />
</div>

---

## Pages

| Path | Component | Description |
|---|---|---|
| `/` | `Home.jsx` | Landing — Hero, LiveDemo, Features, Screenshots, HowItWorks, Stats, CTA |
| `/themes` | `Themes.jsx` | Theme catalog: search (useDeferredValue), 10-category filter, 4-column grid |
| `/themes/:id` | `ThemeDetail.jsx` | Theme detail: VK UI preview, color palette, similar themes, og:image, InstallModal |
| `/theme/:encoded` | `ThemePreview/` | Shared theme preview (base64url config), InstallModal when extension absent |
| `/wallpapers` | `Wallpapers.jsx` | Wallpaper collection: search, filters by type (video/image/web) and category |
| `/wallpapers/:id` | `WallpaperDetail.jsx` | Wallpaper detail: video player / image, error fallback, InstallModal |
| `/changelog` | `Changelog.jsx` | Update history (3 versions) |
| `/changelog/:version` | `ChangelogVersion.jsx` | Specific version detail |
| `/welcome` | `Welcome.jsx` | Post-install page |
| `/uninstall` | `Uninstall.jsx` | Post-uninstall page with feedback form (Google Forms, no-cors) |
| `/privacy` | `Privacy.jsx` | Privacy policy |
| `/terms` | `Terms.jsx` | Terms of service |
| `*` | `NotFound.jsx` | 404 with Easter egg (5 clicks on digits) and quick links |

---

## Architecture

```
┌────────────────────────────────────────────────────────────────────┐
│                         vkify.ru (SPA)                             │
│                                                                    │
│  React Router 6 ──► pages loaded lazily (lazy + Suspense)         │
│  hydrateRoot ──► hydrates pre-rendered HTML                        │
│                                                                    │
│  Pre-render: 83 routes                                             │
│    8 static + 72 themes (/themes/:id) + 3 wallpapers              │
│    Puppeteer → static HTML for search engines                      │
└────────────────────────────────────────────────────────────────────┘
         │                              │
         ▼                              ▼
  src/data/*.js                  src/config/index.js
  (72 themes, 3 wallpapers,      (URL, links, analytics,
   changelog, features)           Google Forms ID)
         │
         ▼
  scripts/generate-og.js
  (Puppeteer → 72 × og:image PNG 1200×630 for /themes/:id)
```

---

## Project Structure

```
frontend/
├── public/
│   ├── og-image.png                 # Main OG image (1200×630)
│   ├── og/
│   │   └── themes/                  # 72 PNGs — og:image for each theme
│   │       ├── github-dark.png
│   │       ├── nord.png
│   │       └── … (72 files)
│   ├── wallpapers
│   ├── favicon.svg
│   ├── sitemap.xml
│   ├── robots.txt
│   └── _redirects                   # SPA redirects
│
├── scripts/
│   └── generate-og.js               # Puppeteer: generates og:image PNGs for all themes
│                                    # Runs automatically before vite build
│
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Analytics.jsx        # GA4 + Yandex Metrica
│   │   │   ├── Badge.jsx
│   │   │   ├── Button.jsx           # as=Link / button / a
│   │   │   ├── Card.jsx
│   │   │   ├── DetailNavbar.jsx     # /themes/:id, /theme/:encoded, /wallpapers/:id; scroll progress
│   │   │   ├── DonateModal.jsx      # Cloudtips, Tribute
│   │   │   ├── ErrorBoundary.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx           # AnnouncementBar + ThemeToggle
│   │   │   ├── Loading.jsx
│   │   │   ├── Logo.jsx
│   │   │   ├── ScrollToTop.jsx
│   │   │   ├── Section.jsx
│   │   │   ├── SEO.jsx              # title, og:*, twitter:*, canonical
│   │   │   ├── SocialIcons.jsx
│   │   │   ├── ThemeToggle.jsx
│   │   │   ├── VkLogo.jsx           # adaptive accent color
│   │   │   └── VkMiniPreview.jsx    # mini VK UI mockup, 4/3 ratio
│   │   ├── home/
│   │   │   ├── CTA.jsx
│   │   │   ├── Features.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Hero3DCard.jsx       # tilt effect on hover
│   │   │   ├── HowItWorks.jsx
│   │   │   ├── LiveDemo.jsx         # interactive theme preview
│   │   │   ├── Screenshots.jsx
│   │   │   └── Stats.jsx
│   │   ├── changelog/
│   │   │   └── VersionCard.jsx
│   │   └── uninstall/
│   │       └── FeedbackForm.jsx     # Google Forms, no-cors POST
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Themes.jsx
│   │   ├── ThemeDetail.jsx
│   │   ├── ThemePreview/
│   │   │   ├── index.jsx
│   │   │   ├── BackgroundPreview.jsx
│   │   │   ├── ThemeParamTable.jsx  # PARAM_META, ColorStrip, FontSample
│   │   │   └── InstallModal.jsx     # used in ThemeDetail, ThemePreview, WallpaperDetail
│   │   ├── Wallpapers.jsx
│   │   ├── WallpaperDetail.jsx
│   │   ├── Changelog.jsx
│   │   ├── ChangelogVersion.jsx
│   │   ├── Welcome.jsx
│   │   ├── Uninstall.jsx
│   │   ├── Privacy.jsx
│   │   ├── Terms.jsx
│   │   └── NotFound.jsx
│   │
│   ├── data/
│   │   ├── themes.js                # 72 themes, 10 categories
│   │   ├── wallpapers.js            # 3 wallpapers (IMAGE / VIDEO / WEB), 7 categories
│   │   ├── features.js
│   │   └── changelog.js             # 3 versions: 1.2.0, 1.1.0, 1.0.0
│   │
│   ├── hooks/
│   │   ├── useExtension.js          # postMessage bridge; { detected, version, settings, saveSettings }
│   │   ├── useGoogleFont.js
│   │   ├── useVideoMeta.js          # resolution, duration, format, size; loading=false after both requests
│   │   └── useWEProperties.js       # parses Wallpaper Engine project.json
│   │
│   ├── utils/
│   │   ├── colors.js                # isDarkColor, adjustColor, pluralizeRu
│   │   ├── scroll.js                # scrollWithOffset, getActiveSection
│   │   ├── themeShare.js            # encodeTheme / decodeTheme (base64url, v2)
│   │   └── videoEmbed.js            # YouTube, VK, Vimeo, Coub, Twitch, Rutube, MP4
│   │
│   ├── config/
│   │   └── index.js                 # app, analytics, links, navigation, social, stats, feedback, seo, theme
│   ├── context/
│   │   └── ThemeContext.jsx         # dark / light (Tailwind .dark on <html>)
│   ├── styles/
│   │   └── index.css                # Tailwind + CSS variables
│   ├── App.jsx                      # router + lazy imports
│   └── main.jsx                     # hydrateRoot / createRoot + ErrorBoundary
│
├── vite.config.js                   # Build + pre-render of 83 routes
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## Dependencies

```json
"dependencies": {
  "framer-motion":          "^10.16.5",
  "lucide-react":           "^0.294.0",
  "react":                  "^18.2.0",
  "react-dom":              "^18.2.0",
  "react-helmet-async":     "^2.0.4",
  "react-router-dom":       "^6.20.0",
  "react-router-hash-link": "^2.4.3"
}

"devDependencies": {
  "@prerenderer/renderer-puppeteer": "^1.2.4",
  "@prerenderer/rollup-plugin":      "^0.3.12",
  "@vitejs/plugin-react":            "^4.2.0",
  "autoprefixer":                    "^10.4.16",
  "postcss":                         "^8.4.31",
  "tailwindcss":                     "^3.3.5",
  "vite":                            "^7.0.0"
}
```

> Vite is pinned to 7.x (classic Rollup) — the last branch whose peer range is
> compatible with `@vitejs/plugin-react@4`. Vite 8 (rolldown) must not be used:
> it causes an ERESOLVE conflict and deprecation warnings. `manualChunks` in
> `vite.config.js` is defined as a function (required by Rollup).

---

## Commands

```bash
npm install

npm run dev          # dev server → http://localhost:5173
npm run build        # generate og:images + production build with pre-render → dist/
npm run preview      # preview built version
npm run generate-og  # regenerate og:images only (without full build)
```

> On `npm run build`, `scripts/generate-og.js` runs first — it creates 72 PNGs (1200×630) in `public/og/themes/` via Puppeteer. Existing files are skipped. To force full regeneration, delete `public/og/`.

---

## Data

### Themes (`src/data/themes.js`) — 72 themes, 10 categories

| Category | Icon | Count |
|---|---|---|
| Classic | 📝 | 10 |
| Soft | 🌸 | 12 |
| AMOLED | 🖤 | 10 |
| Colored | 🌈 | 11 |
| Neon | ⚡ | 6 |
| Nature | 🌿 | 6 |
| Minimal | ◾ | 4 |
| Retro | 💾 | 5 |
| Warm | 🔥 | 4 |
| Cool | ❄️ | 4 |

Theme structure:
```js
{
  id:          'github-dark',
  name:        'GitHub Dark',
  category:    'classic',
  description: 'Dark theme...',
  tags:        ['dark', 'professional'],
  config: {
    custom_theme_id: 'github-dark',
    custom_theme:    '#0d1117',  // background color
    custom_accent:   '#58a6ff',  // accent color
    // …other extension parameters
  },
  preview: {
    bg:     '#0d1117',  // background
    card:   '#161b22',  // card elements
    accent: '#58a6ff',  // accent
  },
}
```

`preview` is used to render theme cards on the website without the extension installed. `config` contains the settings the extension applies to VK.

---

## SEO & Pre-rendering

Pre-rendering is done via `@prerenderer/rollup-plugin` + `@prerenderer/renderer-puppeteer`. Routes are built dynamically from data at build time:

```js
// vite.config.js
import { themeIds }     from './src/data/themes.js'     // 72 IDs — direct import
import { wallpaperIds } from './src/data/wallpapers.js' // 3 IDs — direct import

const routes = [
  '/', '/welcome', '/uninstall', '/changelog',
  '/privacy', '/terms', '/themes', '/wallpapers',  // 8 static
  ...themeIds.map(id => `/themes/${id}`),           // 72 routes
  ...wallpaperIds.map(id => `/wallpapers/${id}`),   // 3 routes
]  // total: 83 routes
```

Each theme page gets a unique `og:image`:
```jsx
// ThemeDetail.jsx
<SEO
  title={`${theme.name} — VKify Theme`}
  description={theme.description}
  url={`/themes/${theme.id}`}
  image={`/og/themes/${theme.id}.png`}
/>
```

`SEO.jsx` accepts: `title`, `description`, `url` (canonical), `image` (og:image; fallback — `/og-image.png`). Automatically adds `og:locale`, `og:type`, `og:site_name`, Twitter Card, `theme-color`.

---

## CSS Variables (`src/styles/index.css`)

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

Custom utilities: `.glass`, `.text-gradient`, `.glow`, `.card-hover`, `.bg-primary/secondary/tertiary`, `.text-primary/secondary/tertiary`, `.border-theme`.

---

## Configuration (`src/config/index.js`)

```js
config.app            // url, name, description, tagline, email
config.analytics      // googleAnalytics (GA4 ID), yandexMetrika (counter ID)
config.links          // chromeWebStore, github, githubIssues, githubDiscussions,
                      // telegram, vk
config.navigation     // main (5 anchor links), footer.{product, resources,
                      // community, legal}
config.social         // [{name, href, color, bgColor}] — Telegram, VK, GitHub
config.stats          // users, rating, features, themes
config.feedback       // formId, fields.{reasons, comment} — Google Forms
config.seo            // title, description, keywords
config.theme          // primary (#0077ff), gradients
```

---

## Theme Sharing

Themes are encoded to `base64url` and passed via `/theme/:encoded`. The v2 schema uses short key aliases and omits default values to keep URLs minimal.

```js
encodeTheme(settings, meta) → base64url string
decodeTheme(encoded)        → { settings, meta }
generateShareUrl(settings)  → `${window.location.origin}/theme/${encoded}`
```

User clicks "Share" on a theme page → a link is generated → the recipient sees a full-screen preview with the same colors. The "Apply Instantly" button applies the theme via the extension (if not installed, `InstallModal` opens).

---

## Host & Environment

Every **user-facing share link** (`generateShareUrl`, wallpaper page) is built from `window.location.origin` — in dev (`http://localhost:5173`) it produces a local URL, in production it produces `https://vkify.ru`. No domain is hardcoded in the code.

What intentionally stays pinned to `https://vkify.ru` (via `config.app.url`):

| Where | Why |
|---|---|
| `src/components/common/SEO.jsx` | `canonical`, `og:url`, `og:image` must be the production domain; a localhost canonical would hurt SEO |

`src/data/wallpapers.js` `abs()` is now **env-aware**: in the browser it uses
`window.location.origin` (localhost URL in dev, vkify.ru in prod), with the
SSR fallback for prerender being `config.app.url`. This way the extension
receives a working wallpaper URL on whatever version of the site is running
(in local dev the file is served from localhost, not prod).

## Support the Project

If you enjoy VKify, you can support development:

| Method | Link |
|--------|------|
| 🇷🇺 Russian cards (Visa, MasterCard, МИР) | [Cloudtips](https://pay.cloudtips.ru/p/b59e1765) |
| 🌍 International cards & crypto | [Tribute](https://t.me/tribute/app?startapp=dE4k) |
