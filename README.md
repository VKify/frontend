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
  ![i18n](https://img.shields.io/badge/i18n-ru%20·%20en-0077FF?style=flat-square)
  ![Routes](https://img.shields.io/badge/пре--рендер-85_маршрутов-34A853?style=flat-square)

  [English version →](README.en.md)

  <br/>

  <img src=".github/assets/site-preview.png" alt="VKify Frontend Preview" width="100%" />
</div>

---

## Страницы

| Путь | Компонент | Описание |
|---|---|---|
| `/` | `Home.jsx` | Главная — Hero, Features, HowItWorks, Stats, Screenshots, CTA |
| `/themes` | `Themes.jsx` | Каталог тем: поиск (`useDeferredValue`), фильтр по 10 категориям, 4-колоночная сетка |
| `/themes/:id` | `ThemeDetail.jsx` | Детальная страница: превью VK UI, палитра, похожие темы, og:image, InstallModal |
| `/theme/:encoded` | `ThemePreview/` | Превью расшаренной темы (base64url config), InstallModal при отсутствии расширения |
| `/wallpapers` | `Wallpapers.jsx` | Коллекция обоев: поиск, фильтры по типу (video/image/web) и категории |
| `/wallpapers/:id` | `WallpaperDetail.jsx` | Видео/изображение/iframe, авто-метаданные, fallback при ошибке, InstallModal |
| `/changelog` | `Changelog.jsx` | История обновлений |
| `/changelog/:version` | `ChangelogVersion.jsx` | Детальная страница конкретной версии |
| `/news` | `News.jsx` | Новости и анонсы (двуязычные посты из `src/data/news.js`) |
| `/news/:slug` | `NewsPost.jsx` | Страница новости: обложка, блоки контента, CTA, похожие посты |
| `/welcome` | `Welcome.jsx` | Страница после установки расширения: статус подключения, выбор тем, быстрые настройки |
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
│  LanguageProvider ──► ru / en, переключатель в шапке               │
│                                                                    │
│  Пре-рендер: 85 маршрутов                                          │
│    8 статических + 72 темы (/themes/:id) + 3 обоя (/wallpapers/:id)│
│    Puppeteer → статический HTML для поисковиков                    │
└────────────────────────────────────────────────────────────────────┘
         │                              │
         ▼                              ▼
  src/data/*.js                  src/config/index.js
  (72 темы, 3 обоя,              (URL, ссылки, аналитика,
   changelog, features)           Google Forms ID, статистика)
         │                              │
         ▼                              ▼
  scripts/generate-og.js         src/i18n/locales/{ru,en}.js
  (Puppeteer → 72 × og:image     (словари UI; контент тем/changelog/
   PNG 1200×630 для /themes/:id)  legal остаётся на RU с фолбэком)
```

---

## Мультиязычность (i18n)

Собственный лёгкий i18n без зависимостей: `LanguageProvider` + хук `useTranslation`.

```jsx
import { useTranslation } from './i18n'

const { t, lang, setLang, supported } = useTranslation()

t('hero.subtitle', { features: '50+' })   // строка с интерполяцией {features}
t('features.cards.appearance.details')     // массивы интерполируются построчно
```

- **Определение языка**: `localStorage('vkify-lang')` → `navigator.language` → `ru`.
- **Сохранение**: при смене языка пишется в `localStorage`, обновляется `<html lang>`.
- **Фолбэк**: пропущенный ключ → язык по умолчанию (`ru`) → сам ключ (с `console.warn` в DEV).
- **`<LanguageSwitcher>`**: выпадающий список с самоназваниями всех языков из `SUPPORTED_LANGS` — добавление языка не требует правок компонента.

Добавление нового языка:
1. Создать `src/i18n/locales/<code>.js` со структурой как у `ru.js`.
2. Зарегистрировать в `src/i18n/index.jsx` (`DICTS`, `SUPPORTED_LANGS`).
3. Готово — переключатель и фолбэк подхватят автоматически.

Сейчас на RU оставлено по решению: 72 описания тем, записи changelog, тело Privacy/Terms (только заголовки/SEO переведены). Фолбэк показывает RU-оригинал в EN-режиме.

---

## Структура проекта

```
frontend/
├── public/
│   ├── og-image.png                 # OG-картинка для главной (1200×630)
│   ├── og/themes/                   # 72 PNG — og:image для каждой темы
│   ├── wallpapers/
│   ├── favicon.svg, sitemap.xml, robots.txt, _redirects
│
├── scripts/
│   └── generate-og.js               # Puppeteer: 72 og:image PNG, запускается перед vite build
│
├── src/
│   ├── i18n/
│   │   ├── index.jsx                # LanguageProvider, useTranslation, LANG_NAMES
│   │   └── locales/
│   │       ├── ru.js                # русский словарь (источник правды)
│   │       └── en.js                # английский (зеркало структуры)
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Analytics.jsx        # GA4 + Яндекс.Метрика
│   │   │   ├── Badge.jsx, Button.jsx, Card.jsx
│   │   │   ├── DetailNavbar.jsx     # /themes/:id, /theme/:encoded, /wallpapers/:id
│   │   │   ├── DonateModal.jsx      # Cloudtips, Tribute
│   │   │   ├── ErrorBoundary.jsx    # читает язык напрямую (не зависит от i18n-провайдера)
│   │   │   ├── ExtensionHint.jsx    # плашка «Расширение подключено» для детальных страниц
│   │   │   ├── Footer.jsx, Header.jsx
│   │   │   ├── LanguageSwitcher.jsx # выпадающий список, расширяется автоматически
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
│   │       └── FeedbackForm.jsx     # Google Forms, no-cors POST; в форму всегда уходит RU
│   │
│   ├── pages/
│   │   ├── Home.jsx, Themes.jsx, ThemeDetail.jsx
│   │   ├── ThemePreview/
│   │   │   ├── index.jsx
│   │   │   ├── BackgroundPreview.jsx
│   │   │   ├── ThemeParamTable.jsx  # PARAM_META, ColorStrip, FontSample
│   │   │   └── InstallModal.jsx     # используется в ThemeDetail/ThemePreview/WallpaperDetail
│   │   ├── Wallpapers.jsx, WallpaperDetail.jsx
│   │   ├── Changelog.jsx, ChangelogVersion.jsx
│   │   ├── Welcome.jsx, Uninstall.jsx
│   │   ├── Privacy.jsx, Terms.jsx, NotFound.jsx
│   │
│   ├── data/
│   │   ├── themes.js                # 72 темы, 10 категорий (themes/themeCategories/themeIds)
│   │   ├── wallpapers.js            # 3 обоя (IMAGE/VIDEO/WEB), 7 категорий
│   │   ├── features.js              # структурные данные топ-фич (id+icon+color)
│   │   ├── changelog.js             # 5 версий
│   │   └── news.js                  # двуязычные новости (slug + translations[lang])
│   │
│   ├── hooks/
│   │   ├── useExtension.js          # postMessage-мост; { detected, version, settings, saveSettings }
│   │   ├── useApplyToVK.js          # apply + InstallModal-state — общий для детальных страниц
│   │   ├── useCopyToClipboard.js    # copy + авто-сброс флага «скопировано»
│   │   ├── useGoogleFont.js
│   │   ├── useVideoMeta.js          # resolution, duration, format, size
│   │   └── useWEProperties.js       # парсит project.json Wallpaper Engine
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
│   │   └── ThemeContext.jsx         # dark / light (Tailwind .dark на <html>)
│   ├── styles/
│   │   └── index.css                # Tailwind + CSS-переменные
│   ├── App.jsx                      # роутер + lazy-импорты
│   └── main.jsx                     # hydrateRoot / createRoot + ErrorBoundary + LanguageProvider
│
├── vite.config.js                   # Сборка + пре-рендер 85 маршрутов
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## Зависимости

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

> Vite зафиксирован на 7.x (классический Rollup) — последняя ветка, совместимая с
> `@vitejs/plugin-react@4` по peer-зависимостям. `manualChunks` в `vite.config.js`
> задан функцией (требование Rollup). `puppeteer` объявлен явно — его напрямую
> импортирует `scripts/generate-og.js`.

---

## Команды

```bash
npm install

npm run dev          # dev-сервер → http://localhost:5173
npm run build        # og:image + продакшн-сборка с пре-рендером → dist/
npm run preview      # превью собранной версии
npm run generate-og  # только перегенерировать og:image (без сборки)
```

> При `npm run build` сначала запускается `scripts/generate-og.js` — удаляет
> старые PNG в `public/og/themes/` и создаёт 72 новых (1200×630) через
> Puppeteer; затем `vite build` собирает фронтенд и делает пре-рендер.

---

## Данные

### Темы (`src/data/themes.js`) — 72 темы, 10 категорий

| Категория | Иконка |
|---|---|
| Классика | 📝 |
| Мягкие | 🌸 |
| AMOLED | 🖤 |
| Цветные | 🌈 |
| Неоновые | ⚡ |
| Природа | 🌿 |
| Минимализм | ◾ |
| Ретро | 💾 |
| Тёплые | 🔥 |
| Холодные | ❄️ |

Структура темы:
```js
{
  id:          'github-dark',
  name:        'GitHub Dark',
  category:    'classic',
  description: 'Тёмная тема...',     // на детальной странице, остаётся на RU
  tags:        ['dark', 'professional'],
  config: {
    custom_theme_id: 'github-dark',
    custom_theme:    '#0d1117',     // цвет фона
    custom_accent:   '#58a6ff',     // акцентный цвет
    // …остальные параметры расширения
  },
  preview: {
    bg:     '#0d1117',  card:   '#161b22',  accent: '#58a6ff',
  },
}
```

`preview` используется для рендера карточек на сайте без установки расширения.
`config` — настройки, которые расширение применяет к VK.

### Фичи на главной (`src/data/features.js`)

Только структура (id + иконка + градиент); тексты — в `i18n.features.cards.<id>`.
6 кураторских блоков: `appearance`, `adblock`, `privacy`, `tracking`, `media`, `messages`.

---

## SEO и пре-рендер

Пре-рендер через `@prerenderer/rollup-plugin` + `@prerenderer/renderer-puppeteer`.
Список маршрутов строится динамически из данных при сборке:

```js
// vite.config.js
import { themeIds }     from './src/data/themes.js'     // 72 ID
import { wallpaperIds } from './src/data/wallpapers.js' // 3 ID
import { newsSlugs }    from './src/data/news.js'       // 1 slug

const routes = [
  '/', '/welcome', '/uninstall', '/changelog',
  '/privacy', '/terms', '/themes', '/wallpapers', '/news', // 9 статических
  ...themeIds.map(id => `/themes/${id}`),             // 72 маршрута
  ...wallpaperIds.map(id => `/wallpapers/${id}`),     // 3 маршрута
  ...newsSlugs.map(slug => `/news/${slug}`),          // 1 маршрут
]  // итого: 85 маршрутов
```

Каждая страница темы получает уникальный `og:image`:
```jsx
// ThemeDetail.jsx
<SEO
  title={t('themeDetail.seoTitle', { name: theme.name })}
  description={theme.description}
  url={`/themes/${theme.id}`}
  image={`/og/themes/${theme.id}.png`}
/>
```

`SEO.jsx` принимает: `title`, `description`, `url` (canonical), `image` (og:image;
fallback — `/og-image.png`). Автоматически добавляет `og:locale`, `og:type`,
`og:site_name`, Twitter Card, `theme-color`.

> На текущий момент пре-рендер запекает мета-теги на языке по умолчанию (RU).
> Для полноценного мультиязычного SEO нужен отдельный заход (hreflang-теги +
> отдельные пререндеры для EN).

---

## Хуки

| Хук | Что делает |
|---|---|
| `useExtension` | postMessage-мост к расширению: `{ detected, version, settings, saveSettings }` |
| `useApplyToVK` | Общая логика «применить + InstallModal» для детальных страниц |
| `useCopyToClipboard` | `copy(text)` + флаг `copied` с авто-сбросом, чистит таймер при unmount |
| `useVideoMeta` / `useImageMeta` | Авто-извлечение метаданных медиа (resolution, duration, size, format) |
| `useWEProperties` | Парсит `project.json` обоев Wallpaper Engine |
| `useGoogleFont` | Подгружает шрифт Google Fonts по `font-family` |
| `useTranslation` | i18n — см. раздел выше |

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

Кастомные утилиты: `.glass`, `.text-gradient`, `.glow`, `.card-hover`,
`.bg-primary/secondary/tertiary`, `.text-primary/secondary/tertiary`, `.border-theme`.

Также уважается `prefers-reduced-motion`: все CSS- и Framer Motion-анимации
сокращаются до 0.01мс.

---

## Конфигурация (`src/config/index.js`)

```js
config.app            // url, name, description, tagline, email
config.analytics      // googleAnalytics (GA4 ID), yandexMetrika
config.links          // chromeWebStore, github, githubIssues, githubDiscussions, telegram, vk
config.navigation     // main (5 якорных ссылок), footer.{product, resources, community, legal}
                      //   у каждого пункта есть labelKey для i18n
config.social         // [{name, href, color, bgColor}] — Telegram, VK, GitHub
config.stats          // users, rating, features, themes, fonts
config.feedback       // formId, fields.{reasons, comment} — Google Forms
config.seo            // title, description, keywords
config.theme          // primary (#0077ff), gradients
```

---

## Шаринг тем

Темы кодируются в `base64url` и передаются по адресу `/theme/:encoded`. v2-схема
с короткими псевдонимами ключей и пропуском дефолтных значений (минимальный
размер URL).

```js
encodeTheme(settings, meta) → base64url string
decodeTheme(encoded)        → { settings, meta }
generateShareUrl(settings)  → `${window.location.origin}/theme/${encoded}`
```

Пользователь нажимает «Поделиться» на странице темы → формируется ссылка →
получатель видит полноэкранный превью с теми же цветами. Кнопка «Применить
мгновенно» применяет тему через расширение (если не установлено — открывается
`InstallModal`).

---

## Хост и окружение

Все **user-facing share-ссылки** (`generateShareUrl`, страница обоев) строятся
от `window.location.origin` — в dev (`http://localhost:5173`) получается
локальный URL, в проде — `https://vkify.ru`. Без хардкода домена в коде.

Что намеренно остаётся привязанным к `https://vkify.ru` (через `config.app.url`):

| Где | Зачем |
|---|---|
| `src/components/common/SEO.jsx` | `canonical`, `og:url`, `og:image` — обязаны быть продовским доменом; localhost-canonical навредит SEO |

`src/data/wallpapers.js` `abs()` env-aware: в браузере берёт
`window.location.origin` (на dev — localhost-URL, на проде — vkify.ru),
SSR-фолбэк для prerender'а — `config.app.url`. Это нужно, чтобы расширение
получало рабочий URL обоев на запущенной версии сайта.

---

## Поддержать проект

Если расширение вам нравится — можно поддержать разработку:

| Способ | Ссылка |
|--------|--------|
| 🇷🇺 Visa, MasterCard, МИР | [Cloudtips](https://pay.cloudtips.ru/p/b59e1765) |
| 🌍 Зарубежные карты и крипта | [Tribute](https://t.me/tribute/app?startapp=dE4k) |
