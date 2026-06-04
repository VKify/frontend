// Новости и анонсы VKify.
//
// Каждый пост двуязычный: общие поля (slug, date, category, accent, links)
// плюс локализованный блок translations[lang] с заголовком, лидом (excerpt)
// и контентом в виде массива блоков. Блоки рендерит NewsPost.jsx:
//   { type: 'p',     text }            — абзац (поддерживает **жирный**)
//   { type: 'h2',    text }            — подзаголовок
//   { type: 'ul',    items: [] }       — маркированный список
//   { type: 'quote', text }            — выделенная цитата/итог
//
// Новый пост добавляется одной записью в начало массива.

export const news = [
  {
    slug: 'firefox-support',
    date: '2026-06-04',
    category: 'release',
    accent: 'orange',
    emoji: '🦊',
    cta: { labelKey: 'common.installFirefox', linkKey: 'firefoxAddons' },
    translations: {
      ru: {
        title: 'VKify теперь работает в Firefox',
        excerpt:
          'Любимое расширение для ВКонтакте вышло в Firefox — все функции, что и в Chrome, из единой кодовой базы. Устанавливается прямо из Firefox Add-ons.',
        readTime: 2,
        blocks: [
          {
            type: 'p',
            text: 'Отличные новости для поклонников лисы: **VKify теперь доступен в Firefox**. Расширение уже опубликовано в официальном каталоге Firefox Add-ons — устанавливается в один клик, как и в Chrome.',
          },
          {
            type: 'h2',
            text: 'Все функции — без компромиссов',
          },
          {
            type: 'p',
            text: 'Это не урезанная версия. Firefox-сборка собирается из той же кодовой базы, что и Chrome, поэтому вы получаете весь набор возможностей VKify:',
          },
          {
            type: 'ul',
            items: [
              'Темы оформления и видео-обои',
              'Блокировка рекламы и трекеров',
              'E2E-шифрование переписки',
              'Скачивание видео, историй, фото и альбомов',
              'Слежка за активностью с уведомлениями',
              'Встроенная страница настроек прямо на vk.com',
            ],
          },
          {
            type: 'h2',
            text: 'Что мы сделали под капотом',
          },
          {
            type: 'p',
            text: 'Firefox строже относится к API расширений и изолирует скрипты иначе, чем Chromium. Мы добавили тонкий слой нормализации chrome/browser, перевели уведомления и инжект-скрипты на схему, которую Firefox принимает, и собрали отдельный манифест с gecko-id. Для самопроверки внутри расширения появилась панель диагностики с кнопкой «Копировать отчёт».',
          },
          {
            type: 'quote',
            text: 'Одно расширение — четыре браузера: Chrome, Firefox, Edge и Opera. Устанавливайте там, где вам удобно.',
          },
          {
            type: 'p',
            text: 'Уже пользуетесь Firefox? Установите VKify из Firefox Add-ons и настройте ВКонтакте под себя. Edge и Opera по-прежнему ставятся из Chrome Web Store.',
          },
        ],
      },
      en: {
        title: 'VKify now works in Firefox',
        excerpt:
          'Your favorite VKontakte extension is now on Firefox — the same features as Chrome, from a single codebase. Install it straight from Firefox Add-ons.',
        readTime: 2,
        blocks: [
          {
            type: 'p',
            text: 'Great news for fox fans: **VKify is now available on Firefox**. The extension is already published in the official Firefox Add-ons catalog — one-click install, just like on Chrome.',
          },
          {
            type: 'h2',
            text: 'Every feature — no compromises',
          },
          {
            type: 'p',
            text: 'This is not a stripped-down build. The Firefox version is built from the same codebase as Chrome, so you get the full VKify toolkit:',
          },
          {
            type: 'ul',
            items: [
              'Themes and video wallpapers',
              'Ad and tracker blocking',
              'E2E message encryption',
              'Downloading videos, stories, photos and albums',
              'Activity tracking with notifications',
              'A built-in settings page right on vk.com',
            ],
          },
          {
            type: 'h2',
            text: 'What we did under the hood',
          },
          {
            type: 'p',
            text: "Firefox is stricter about extension APIs and isolates scripts differently from Chromium. We added a thin chrome/browser normalization layer, moved notifications and injected scripts to a schema Firefox accepts, and built a dedicated manifest with a gecko-id. For self-checks, the extension now ships a diagnostics panel with a “Copy report” button.",
          },
          {
            type: 'quote',
            text: 'One extension — four browsers: Chrome, Firefox, Edge and Opera. Install it wherever you like.',
          },
          {
            type: 'p',
            text: 'Already on Firefox? Install VKify from Firefox Add-ons and make VKontakte your own. Edge and Opera are still installed from the Chrome Web Store.',
          },
        ],
      },
    },
  },
]

// Slugs для пререндера (vite.config.js)
export const newsSlugs = news.map((n) => n.slug)

/**
 * Получить пост по slug
 * @param {string} slug
 * @returns {object|undefined}
 */
export function getNewsBySlug(slug) {
  return news.find((n) => n.slug === slug)
}

/**
 * Последний (самый свежий) пост
 * @returns {object|undefined}
 */
export function getLatestNews() {
  return news[0]
}

/**
 * Все посты
 * @returns {array}
 */
export function getAllNews() {
  return news
}
