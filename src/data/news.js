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
    slug: 'equalizer',
    date: '2026-06-28',
    category: 'feature',
    accent: 'blue',
    emoji: '🎚️',
    cta: { labelKey: 'common.installChrome', linkKey: 'chromeWebStore' },
    translations: {
      ru: {
        title: 'Эквалайзер для музыки ВК — 10 полос, пресеты и панель прямо на странице',
        excerpt:
          'Теперь можно подкрутить бас или высокие прямо в плеере ВКонтакте: 10 полос, преамп, готовые и свои пресеты. Звук меняется на лету. А ещё в релизе — дашборд производительности и перестановка колонок.',
        readTime: 2,
        blocks: [
          {
            type: 'p',
            text: 'Главное в обновлении — **эквалайзер для музыки ВКонтакте**. Десять полос от 31 Гц до 16 кГц, отдельный преамп и готовые пресеты: Bass Boost, Rock, Vocal и другие. Не нравится ни один — соберите свой и сохраните под любым именем.',
          },
          {
            type: 'p',
            text: 'Работает на Web Audio API: двигаете ползунок — и слышите разницу сразу, трек перезапускать не нужно. Кнопка вызова стоит в самом плеере, рядом с привычными.',
          },
          {
            type: 'p',
            text: 'Сам эквалайзер живёт в плавающей панели. Её можно перетащить в удобный угол и свернуть в узкий бар — там остаётся только быстрый выбор пресета. Куда поставили и свернули ли — запомнится: после перезагрузки страницы панель вернётся на место.',
          },
          {
            type: 'h2',
            text: 'Что ещё в релизе',
          },
          {
            type: 'p',
            text: 'Появился **дашборд производительности**: видно, сколько работают функции расширения, с разбивкой по нагрузке и разделам. Рядом — «Проводник фич» и небольшой плавающий монитор поверх страницы, если хочется держать цифры перед глазами.',
          },
          {
            type: 'p',
            text: 'Колонки на странице профиля и в сообществах теперь можно поменять местами — раньше так умел только мессенджер. А правую колонку в ленте и на профиле можно и вовсе спрятать.',
          },
          {
            type: 'quote',
            text: 'Под капотом — большая пересборка: расширение стало быстрее и устойчивее, а попап больше не моргает на каждом фоновом обновлении.',
          },
        ],
      },
      en: {
        title: 'An equalizer for VK music — 10 bands, presets and an on-page panel',
        excerpt:
          'You can now tweak the bass or treble right in the VKontakte player: 10 bands, a preamp, built-in and custom presets. The sound changes on the fly. The release also brings a performance dashboard and column swapping.',
        readTime: 2,
        blocks: [
          {
            type: 'p',
            text: 'The headline of this update is an **equalizer for VKontakte music**. Ten bands from 31 Hz to 16 kHz, a separate preamp, and ready-made presets: Bass Boost, Rock, Vocal and more. Like none of them? Build your own and save it under any name.',
          },
          {
            type: 'p',
            text: 'It runs on the Web Audio API: move a slider and you hear the difference immediately — no need to restart the track. The button sits right in the player, next to the usual ones.',
          },
          {
            type: 'p',
            text: 'The equalizer lives in a floating panel. Drag it to a convenient corner and collapse it into a slim bar that keeps just a quick preset picker. Where you put it and whether you collapsed it are remembered: after a page reload the panel comes back to the same spot.',
          },
          {
            type: 'h2',
            text: 'What else is in the release',
          },
          {
            type: 'p',
            text: 'There’s a new **performance dashboard**: it shows how hard the extension’s features are working, grouped by load and by section. Next to it sit a Feature Explorer and a small floating monitor over the page, if you like to keep the numbers in view.',
          },
          {
            type: 'p',
            text: 'You can now swap the columns on profile and community pages — until now only the messenger could do that. And the right column in the feed and on profiles can be hidden entirely.',
          },
          {
            type: 'quote',
            text: 'Under the hood: a big rebuild that makes the extension faster and steadier, and the popup no longer flickers on every background update.',
          },
        ],
      },
    },
  },
  {
    slug: 'center-hub-and-autoplay',
    date: '2026-06-22',
    category: 'feature',
    accent: 'green',
    emoji: '🎛️',
    cta: { labelKey: 'common.installChrome', linkKey: 'chromeWebStore' },
    translations: {
      ru: {
        title: 'Музыка не глохнет после перезагрузки, а скачивалки — в одном «Центре»',
        excerpt:
          'Трек продолжает играть с той же секунды после обновления страницы. Все скачивалки переехали в раздел «Центр», тяжёлые вкладки разложены на подстраницы, а лишние пункты левого меню ВК можно спрятать.',
        readTime: 2,
        blocks: [
          {
            type: 'p',
            text: 'Самое заметное в обновлении — **музыка больше не обрывается на перезагрузке**. Раньше любое обновление вкладки роняло трек на полуслове. Теперь VKify запоминает, что играло, и подхватывает с той же секунды.',
          },
          {
            type: 'p',
            text: 'Браузеры не любят, когда звук включается сам, — это защита от назойливых сайтов. Бороться с этим мы не стали: если автозапуск заблокирован, хватит одного клика по странице, и музыка пойдёт дальше с нужного места.',
          },
          {
            type: 'h2',
            text: 'Все скачивания — в разделе «Центр»',
          },
          {
            type: 'p',
            text: 'Видео, клипы, фото, музыку и истории мы свели в один хаб. Больше не нужно искать кнопку загрузки по разным углам расширения — всё под одной крышей и разложено по разделам так же, как в самом ВКонтакте.',
          },
          {
            type: 'p',
            text: 'На странице аудиозаписей появилась кнопка «Загрузить несколько»: выбираете пачку MP3 со своего компьютера, и они заливаются в ВКонтакте по очереди, с паузами между файлами, чтобы не упереться во флуд-контроль.',
          },
          {
            type: 'p',
            text: 'А вот скачивание теперь можно оборвать на полпути. Передумали в середине большой закачки — повторный клик остановит её и упакует то, что уже успело загрузиться. Свернёте центр загрузок — фоновое скачивание не прервётся.',
          },
          {
            type: 'h2',
            text: 'Тяжёлые вкладки стали подстраницами',
          },
          {
            type: 'p',
            text: 'Самые перегруженные вкладки расширения разложены на отдельные подстраницы — как разделы внутри ВК. Открыли что-то вглубь, вернулись назад — и страница осталась там, где вы её листали, а не прыгнула в начало.',
          },
          {
            type: 'p',
            text: 'Заодно пересобрали «Оформление»: макет, поиск, внешний вид и профили теперь лежат там, где их и ищешь, а сброс настроек стал один на всю вкладку.',
          },
          {
            type: 'h2',
            text: 'Левое меню — под себя',
          },
          {
            type: 'p',
            text: 'Появилась настройка, которая прячет пункты левого меню ВКонтакте. Не заходите в «Игры» или «Звонки»? Уберите их из бокового меню, и список станет короче.',
          },
          {
            type: 'quote',
            text: 'Чем меньше лишнего на экране, тем быстрее находишь нужное.',
          },
          {
            type: 'p',
            text: 'Подтянулись и заметки к диалогам: записи группируются по дням, у авторов появились аватарки, а каждая заметка ведёт прямо к своему сообщению. Плюс пара починок — подсказки ВК больше не съезжают по странице, а реклама в музыке снова скрыта: ВК поменял разметку, мы обновили селекторы.',
          },
        ],
      },
      en: {
        title: 'Music keeps playing after a reload, and downloads moved into one “Center”',
        excerpt:
          'Your track resumes from the same second after the page reloads. Every downloader now lives in the “Center” section, heavy tabs are split into subpages, and you can hide the menu items you never use.',
        readTime: 2,
        blocks: [
          {
            type: 'p',
            text: 'The big one in this update: **music no longer cuts off on reload**. A tab refresh used to kill the track mid-note. Now VKify remembers what was playing and picks up from the same second.',
          },
          {
            type: 'p',
            text: 'Browsers don’t like sound that starts on its own — it’s a guard against pushy sites. We don’t fight it: if autoplay is blocked, one click anywhere on the page is enough, and the music continues from where it left off.',
          },
          {
            type: 'h2',
            text: 'Every download lives in “Center”',
          },
          {
            type: 'p',
            text: 'Videos, clips, photos, music, and stories now sit in a single hub. No more hunting for a download button in different corners of the extension — it’s all under one roof, sorted into sections the same way VKontakte itself is.',
          },
          {
            type: 'p',
            text: 'The audio page got an “Upload several” button: pick a batch of MP3s from your computer and they upload to VKontakte one by one, with pauses between files so you don’t hit flood control.',
          },
          {
            type: 'p',
            text: 'Downloads, on the other hand, can now be stopped midway. Change your mind during a big download? A second click halts it and zips up whatever already came through. Collapse the download center and the job keeps running in the background.',
          },
          {
            type: 'h2',
            text: 'Heavy tabs became subpages',
          },
          {
            type: 'p',
            text: 'The most crowded tabs are now broken into separate subpages, like sections inside VK. Open something deeper, go back, and the page stays where you were scrolling instead of jumping to the top.',
          },
          {
            type: 'p',
            text: 'We also rebuilt “Appearance” along the way: layout, search, look, and profiles now sit where you’d expect them, and a single reset covers the whole tab.',
          },
          {
            type: 'h2',
            text: 'The left menu, your way',
          },
          {
            type: 'p',
            text: 'There’s a new setting that hides items in the VKontakte left menu. Never open “Games” or “Calls”? Drop them from the sidebar and the list gets shorter.',
          },
          {
            type: 'quote',
            text: 'The less clutter on screen, the faster you find what you came for.',
          },
          {
            type: 'p',
            text: 'Dialog notes got some love too: entries group by day, authors now have avatars, and each note links straight to its message. Plus a couple of fixes — VK tooltips no longer drift across the page, and music ads are hidden again after VK changed its markup and we updated the selectors.',
          },
        ],
      },
    },
  },
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
