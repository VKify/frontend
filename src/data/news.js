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
    slug: 'music-download',
    date: '2026-06-15',
    category: 'feature',
    accent: 'purple',
    emoji: '🎵',
    cta: { labelKey: 'common.installChrome', linkKey: 'chromeWebStore' },
    translations: {
      ru: {
        title: 'Скачивание музыки из ВКонтакте — прямо в MP3',
        excerpt:
          'VKify научился сохранять музыку из ВК в MP3: отдельный трек, целый альбом или всю библиотеку разом — с обложкой, тегами и текстом песни. Всё видно в новом центре загрузок.',
        readTime: 2,
        blocks: [
          {
            type: 'p',
            text: 'Главное в этом обновлении — **скачивание музыки**. Рядом с каждым треком появилась кнопка: нажали — получили MP3. Работает и в классических списках, и в новом плеере ВКонтакте.',
          },
          {
            type: 'h2',
            text: 'Трек, альбом или вся библиотека',
          },
          {
            type: 'p',
            text: 'Одной кнопкой можно забрать не только отдельную песню. Откройте альбом или свою страницу с аудиозаписями — и VKify соберёт всё в ZIP. Большие библиотеки бьются на части, чтобы не упереться в память браузера.',
          },
          {
            type: 'p',
            text: 'В файлы сразу прописываются ID3-теги: обложка, исполнитель, название. Если для трека находится текст на Genius, он тоже уходит в метаданные.',
          },
          {
            type: 'h2',
            text: 'Центр загрузок',
          },
          {
            type: 'p',
            text: 'Все скачивания теперь собраны в одной плавающей панели. В ней видно каждую задачу с прогрессом — не только музыку, но и видео, клипы, истории, фото и экспорт диалогов.',
          },
          {
            type: 'ul',
            items: [
              'Панель не пропадает при переходах по сайту: начали качать альбом, ушли в ленту — скачивание продолжается',
              'Завершённые задачи убираются сами',
              'Карточку можно перетащить за шапку, и она запомнит, где вы её оставили',
            ],
          },
          {
            type: 'quote',
            text: 'Любимый плейлист теперь живёт не только в ленте рекомендаций, но и у вас на диске.',
          },
          {
            type: 'p',
            text: 'Музыка тянется тем же путём, что и плеер ВК, расшифровывается на лету и кодируется в MP3 прямо в браузере. Скачивание работает и в Chrome, и в Firefox.',
          },
        ],
      },
      en: {
        title: 'Download music from VKontakte — straight to MP3',
        excerpt:
          'VKify can now save VK music as MP3: a single track, a whole album, or your entire library at once — with cover art, tags, and lyrics. Everything shows up in the new download center.',
        readTime: 2,
        blocks: [
          {
            type: 'p',
            text: 'The headline of this update is **music downloads**. Every track now has a button next to it: click it, get an MP3. It works both in the classic lists and in the new VKontakte player.',
          },
          {
            type: 'h2',
            text: 'A track, an album, or your whole library',
          },
          {
            type: 'p',
            text: 'One button grabs more than a single song. Open an album or your own audio page, and VKify packs everything into a ZIP. Large libraries are split into parts so the browser doesn’t run out of memory.',
          },
          {
            type: 'p',
            text: 'Files get ID3 tags right away: cover, artist, title. If lyrics are found on Genius, they go into the metadata too.',
          },
          {
            type: 'h2',
            text: 'Download center',
          },
          {
            type: 'p',
            text: 'All downloads now live in a single floating panel that shows each job with its progress — not just music, but also videos, clips, stories, photos, and dialog exports.',
          },
          {
            type: 'ul',
            items: [
              'The panel survives in-page navigation: start an album, head to the feed, and the download keeps going',
              'Finished jobs clear themselves',
              'Drag the card by its header and it remembers where you left it',
            ],
          },
          {
            type: 'quote',
            text: 'Your favorite playlist now lives on your own drive, not just in the recommendations feed.',
          },
          {
            type: 'p',
            text: 'Music is fetched the same way the VK player loads it, decrypted on the fly, and encoded to MP3 right in the browser. Downloads already work in both Chrome and Firefox.',
          },
        ],
      },
    },
  },
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
