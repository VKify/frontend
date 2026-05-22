<div align="center">
  <img src=".github/assets/logo.png" alt="VKify" width="96" />

  # VKify — Frontend

  **Лендинг-сайт расширения VKify для ВКонтакте**

  [![Website](https://img.shields.io/badge/vkify.ru-0077FF?style=for-the-badge&logo=googlechrome&logoColor=white)](https://vkify.ru)
  [![Telegram](https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/VKify)
  [![VK](https://img.shields.io/badge/VK-4C75A3?style=for-the-badge&logo=vk&logoColor=white)](https://vk.com/vkify)
  [![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/rianvy/vkify)

  ![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)
  ![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite&logoColor=white)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
  ![Framer Motion](https://img.shields.io/badge/Framer_Motion-10-FF0055?style=flat-square&logo=framer&logoColor=white)
  ![Routes](https://img.shields.io/badge/пре--рендер-83_маршрута-34A853?style=flat-square)

  [English version →](README.en.md)

  <br/>

  <img src=".github/assets/site-preview.png" alt="VKify Frontend Preview" width="100%" />
</div>

---

## Страницы

| Путь | Компонент | Описание |
|---|---|---|
| `/` | `Home.jsx` | Главная — Hero, LiveDemo, Features, Screenshots, HowItWorks, Stats, CTA |
| `/themes` | `Themes.jsx` | Каталог тем: поиск (useDeferredValue), фильтр по 10 категориям, 4-колоночная сетка |
| `/themes/:id` | `ThemeDetail.jsx` | Детальная страница: превью VK UI, палитра, похожие темы, og:image, InstallModal |
| `/theme/:encoded` | `ThemePreview/` | Превью расшаренной темы (base64url config), InstallModal при отсутствии расширения |
| `/wallpapers` | `Wallpapers.jsx` | Коллекция обоев: поиск, фильтры по типу (video/image/web) и категории |
| `/wallpapers/:id` | `WallpaperDetail.jsx` | Детальная страница: видеоплеер/изображение, fallback при ошибке загрузки, InstallModal |
| `/changelog` | `Changelog.jsx` | История обновлений (3 версии) |
| `/changelog/:version` | `ChangelogVersion.jsx` | Детальная страница конкретной версии |
| `/welcome` | `Welcome.jsx` | Страница после установки расширения |
| `/uninstall` | `Uninstall.jsx` | Страница после удаления — форма фидбека (Google Forms, no-cors) |
| `/privacy` | `Privacy.jsx` | Политика конфиденциальности |
| `/terms` | `Terms.jsx` | Условия использования |
| `*` | `NotFound.jsx` | 404 с Easter egg (5 кликов на цифры) и быстрыми ссылками |

---

## Архитектура

```
┌────────────────────────────────────────────────────────────────────┐
│                         vkify.ru (SPA)                             │
│                                                                    │
│  React Router 6 ──► страницы загружаются лениво (lazy + Suspense) │
│  hydrateRoot ──► гидрация пре-рендеренного HTML                    │
│                                                                    │
│  Пре-рендер: 83 маршрута                                           │
│    8 статических + 72 темы (/themes/:id) + 3 обоя (/wallpapers/:id)│
│    Puppeteer → статический HTML для поисковиков                    │
└────────────────────────────────────────────────────────────────────┘
         │                              │
         ▼                              ▼
  src/data/*.js                  src/config/index.js
  (72 темы, 3 обоя,              (URL, ссылки, аналитика,
   changelog, features)           Google Forms ID)
         │
         ▼
  scripts/generate-og.js
  (Puppeteer → 72 × og:image PNG 1200×630 для /themes/:id)
```

---

## Структура проекта

```
frontend/
├── public/
│   ├── og-image.png                 # OG-картинка для главной (1200×630)
│   ├── og/
│   │   └── themes/                  # 72 PNG — og:image для каждой темы
│   │       ├── github-dark.png
│   │       ├── nord.png
│   │       └── … (72 файла)
│   ├── wallpapers
│   ├── favicon.svg
│   ├── sitemap.xml
│   ├── robots.txt
│   └── _redirects                   # SPA-редиректы
│
├── scripts/
│   └── generate-og.js               # Puppeteer: генерирует og:image PNG для каждой темы
│                                    # Запускается автоматически перед vite build
│
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Analytics.jsx        # GA4 + Яндекс.Метрика
│   │   │   ├── Badge.jsx
│   │   │   ├── Button.jsx           # as=Link / button / a
│   │   │   ├── Card.jsx
│   │   │   ├── DetailNavbar.jsx     # /themes/:id, /theme/:encoded, /wallpapers/:id; scroll-прогресс
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
│   │   │   ├── VkLogo.jsx           # адаптивный цвет акцента
│   │   │   └── VkMiniPreview.jsx    # мини-макет VK UI, ratio 4/3
│   │   ├── home/
│   │   │   ├── CTA.jsx
│   │   │   ├── Features.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Hero3DCard.jsx       # tilt-эффект при наведении
│   │   │   ├── HowItWorks.jsx
│   │   │   ├── LiveDemo.jsx         # интерактивный превью тем
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
│   │   │   └── InstallModal.jsx     # используется в ThemeDetail, ThemePreview, WallpaperDetail
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
│   │   ├── themes.js                # 72 темы, 10 категорий
│   │   ├── wallpapers.js            # 3 обоя (IMAGE / VIDEO / WEB), 7 категорий
│   │   ├── features.js
│   │   └── changelog.js             # 3 версии: 1.2.0, 1.1.0, 1.0.0
│   │
│   ├── hooks/
│   │   ├── useExtension.js          # postMessage-мост; { detected, version, settings, saveSettings }
│   │   ├── useGoogleFont.js
│   │   ├── useVideoMeta.js          # resolution, duration, format, size; loading=false после обоих запросов
│   │   └── useWEProperties.js       # парсит project.json Wallpaper Engine
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
│   │   └── ThemeContext.jsx         # dark / light (Tailwind .dark на <html>)
│   ├── styles/
│   │   └── index.css                # Tailwind + CSS-переменные
│   ├── App.jsx                      # роутер + lazy-импорты
│   └── main.jsx                     # hydrateRoot / createRoot + ErrorBoundary
│
├── vite.config.js                   # Сборка + пре-рендер 83 маршрутов
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## Зависимости

```json
"dependencies": {
  "framer-motion": "^10.16.5",
  "lucide-react":  "^0.294.0",
  "react":         "^18.2.0",
  "react-dom":     "^18.2.0",
  "react-helmet-async":   "^2.0.4",
  "react-router-dom":     "^6.20.0",
  "react-router-hash-link":"^2.4.3"
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

> Vite зафиксирован на 7.x (классический Rollup) — это последняя ветка,
> совместимая с `@vitejs/plugin-react@4` по peer-зависимостям. Vite 8
> (rolldown) ставить нельзя: конфликт ERESOLVE и deprecation-предупреждения.
> `manualChunks` в `vite.config.js` задан функцией (требование Rollup).

---

## Команды

```bash
npm install

npm run dev          # dev-сервер → http://localhost:5173
npm run build        # og:image + продакшн-сборка с пре-рендером → dist/
npm run preview      # превью собранной версии
npm run generate-og  # только перегенерировать og:image (без сборки)
```

> При `npm run build` сначала запускается `scripts/generate-og.js` — создаёт 72 PNG (1200×630) в `public/og/themes/` через Puppeteer. Уже существующие файлы пропускаются. Для полной перегенерации — удалите `public/og/`.

---

## Данные

### Темы (`src/data/themes.js`) — 72 темы, 10 категорий

| Категория | Иконка | Количество тем |
|---|---|---|
| Классика | 📝 | 10 |
| Мягкие | 🌸 | 12 |
| AMOLED | 🖤 | 10 |
| Цветные | 🌈 | 11 |
| Неоновые | ⚡ | 6 |
| Природа | 🌿 | 6 |
| Минимализм | ◾ | 4 |
| Ретро | 💾 | 5 |
| Тёплые | 🔥 | 4 |
| Холодные | ❄️ | 4 |

Структура темы:
```js
{
  id:          'github-dark',
  name:        'GitHub Dark',
  category:    'classic',
  description: 'Тёмная тема...',
  tags:        ['dark', 'professional'],
  config: {
    custom_theme_id: 'github-dark',
    custom_theme:    '#0d1117',  // цвет фона
    custom_accent:   '#58a6ff',  // акцентный цвет
    // …остальные параметры расширения
  },
  preview: {
    bg:     '#0d1117',  // фон
    card:   '#161b22',  // карточки
    accent: '#58a6ff',  // акцент
  },
}
```

`preview` используется для рендера карточек на сайте без установки расширения. `config` — настройки, которые расширение применяет к VK.

---

## SEO и пре-рендер

Пре-рендер выполняется через `@prerenderer/rollup-plugin` + `@prerenderer/renderer-puppeteer`. Список маршрутов строится динамически из данных при сборке:

```js
// vite.config.js
import { themeIds }     from './src/data/themes.js'     // 72 ID — прямой импорт
import { wallpaperIds } from './src/data/wallpapers.js' // 3 ID — прямой импорт

const routes = [
  '/', '/welcome', '/uninstall', '/changelog',
  '/privacy', '/terms', '/themes', '/wallpapers',     // 8 статических
  ...themeIds.map(id => `/themes/${id}`),             // 72 маршрута
  ...wallpaperIds.map(id => `/wallpapers/${id}`),     // 3 маршрута
]  // итого: 83 маршрута
```

Каждая страница темы получает уникальный `og:image`:
```jsx
// ThemeDetail.jsx
<SEO
  title={`${theme.name} — Тема VKify`}
  description={theme.description}
  url={`/themes/${theme.id}`}
  image={`/og/themes/${theme.id}.png`}
/>
```

`SEO.jsx` принимает: `title`, `description`, `url` (canonical), `image` (og:image; fallback — `/og-image.png`). Автоматически добавляет `og:locale`, `og:type`, `og:site_name`, Twitter Card, `theme-color`.

---

## CSS-переменные (`src/styles/index.css`)

```css
:root {
  --bg-primary:    #ffffff;  --bg-secondary:   #f5f5f7;  --bg-tertiary:  #e8e8ed;
  --text-primary:  #1d1d1f;  --text-secondary: #6e6e73;  --text-tertiary:#9b9b9f;
  --border-color:  #e0e0e5;  --primary-light:  #e5f1ff;
}
.dark {                       /* Tailwind dark mode — класс на <html> */
  --bg-primary:    #1c1c1e;  --bg-secondary:   #000000;  --bg-tertiary:  #2c2c2e;
  --text-primary:  #f5f5f7;  --text-secondary: #a1a1a6;  --text-tertiary:#6e6e73;
  --border-color:  #38383a;  --primary-light:  #0a3a6b;
}
```

Кастомные утилиты: `.glass`, `.text-gradient`, `.glow`, `.card-hover`, `.bg-primary/secondary/tertiary`, `.text-primary/secondary/tertiary`, `.border-theme`.

---

## Конфигурация (`src/config/index.js`)

```js
config.app            // url, name, description, tagline, email
config.analytics      // googleAnalytics (GA4 ID), yandexMetrika (счётчик)
config.links          // chromeWebStore, github, githubIssues, githubDiscussions,
                      // telegram, vk
config.navigation     // main (5 якорных ссылок), footer.{product, resources,
                      // community, legal}
config.social         // [{name, href, color, bgColor}] — Telegram, VK, GitHub
config.stats          // users, rating, features, themes
config.feedback       // formId, fields.{reasons, comment} — Google Forms
config.seo            // title, description, keywords
config.theme          // primary (#0077ff), gradients
```

---

## Шаринг тем

Темы кодируются в `base64url` и передаются по адресу `/theme/:encoded`. Реализована v2-схема с короткими псевдонимами ключей и пропуском дефолтных значений (минимальный размер URL).

```js
encodeTheme(settings, meta) → base64url string
decodeTheme(encoded)        → { settings, meta }
generateShareUrl(settings)  → `${window.location.origin}/theme/${encoded}`
```

Пользователь нажимает «Поделиться» на странице темы → формируется ссылка → получатель видит полноэкранный превью с теми же цветами. Кнопка «Применить мгновенно» применяет тему через расширение (если не установлено — открывается `InstallModal`).

---

## Хост и окружение

Все **user-facing share-ссылки** (`generateShareUrl`, страница обоев) строятся от `window.location.origin` — в dev (`http://localhost:5173`) получается локальный URL, в проде — `https://vkify.ru`. Без хардкода домена в коде.

Что намеренно остаётся привязанным к `https://vkify.ru` (через `config.app.url`):

| Где | Зачем |
|---|---|
| `src/components/common/SEO.jsx` | `canonical`, `og:url`, `og:image` — обязаны быть продовским доменом; localhost-canonical навредит SEO |

`src/data/wallpapers.js` `abs()` теперь **env-aware**: в браузере берёт
`window.location.origin` (на dev — localhost-URL, на проде — vkify.ru), SSR-фолбэк
для prerender'а — `config.app.url`. Это нужно, чтобы расширение получало
рабочий URL обоев на запущенной версии сайта (на локальной разработке
файл подгрузится с localhost'а, а не с прода).

## Поддержать проект

Если расширение вам нравится — можно поддержать разработку:

| Способ | Ссылка |
|--------|--------|
| 🇷🇺 Visa, MasterCard, МИР | [Cloudtips](https://pay.cloudtips.ru/p/b59e1765) |
| 🌍 Зарубежные карты и крипта | [Tribute](https://t.me/tribute/app?startapp=dE4k) |
