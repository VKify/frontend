// Документация по расширению. Каждая секция = одна вкладка расширения и
// отдельная страница /docs/<slug>. Сейчас их две: «Вид» и «Скрытие».
//
// Движок страницы (pages/Docs.jsx) общий. Запись секции:
//   slug        — адрес: /docs/<slug>
//   heroIcon    — ключ иконки в шапке (резолвится в Docs.jsx)
//   ru/en       — мета страницы: nav, title, subtitle, note?, seo*
//   features[]  — блоки. У блока либо how[] (пояснения), либо items[]
//                 (список именованных переключателей). anchor совпадает с
//                 data-vkify-anchor внутри расширения — отсюда прямые ссылки.
//
// Медиа лежат в public/docs/<slug>/<file>. Нет файла — DocMedia рисует
// аккуратную заглушку, поэтому страницу можно публиковать до съёмки скриншотов.

const viewDocs = {
  slug: 'view',
  heroIcon: 'palette',
  ru: {
    nav: 'Вид',
    title: 'Вкладка «Вид»',
    subtitle: 'Всё, что отвечает за внешний вид ВКонтакте: тема, шрифт, фон, фильтры и сохранённые профили оформления.',
    seoTitle: 'Документация — вкладка «Вид»',
    seoDescription: 'Как работает каждая функция вкладки «Вид» в VKify: тема, шрифт, фон, фильтры, профили оформления и быстрый доступ через поиск.',
  },
  en: {
    nav: 'View',
    title: 'The “View” tab',
    subtitle: 'Everything that shapes how VKontakte looks: theme, font, background, filters, and saved appearance profiles.',
    seoTitle: 'Documentation — the “View” tab',
    seoDescription: 'How every feature of the VKify “View” tab works: theme, font, background, filters, appearance profiles, and quick access via search.',
  },
  features: [
    {
      anchor: 'display_mode',
      icon: 'layout',
      media: [
        { type: 'screenshot', file: 'display-mode.png' },
        { type: 'gif', file: 'widescreen.gif' },
      ],
      ru: {
        title: 'Режим отображения',
        lead: 'Меняет каркас страницы ВКонтакте: боковое меню, ширину контента и его положение на экране.',
        how: [
          '**Макет.** Боковое меню можно сделать минималистичным (только иконки с подсказками), закрепить при прокрутке или подсветить фоном.',
          '**Ширина контента.** Включите — и профиль, лента и сообщения растянутся; ползунок задаёт ширину от 900 до 2500 px, под слайдером сразу видно превью.',
          '**Смещение страницы.** Сдвигает контент влево или вправо до 600 px — удобно на широких мониторах, когда хочется увести ленту из-под края.',
          '**Поиск.** Строку поиска можно свернуть в иконку, которая разворачивается при наведении.',
          '**Внешний вид.** Компактные отступы убирают пустоты между блоками, а форма аватарок выбирается пресетом (капля, лист, лепесток, блоб) или процентом скругления.',
        ],
        access: 'Ctrl/Cmd + K → «Режим отображения». Блок открывается первым на вкладке «Вид».',
      },
      en: {
        title: 'Display mode',
        lead: 'Reshapes the VKontakte page frame: the sidebar, content width, and where it sits on screen.',
        how: [
          '**Layout.** The sidebar can go minimal (icons with tooltips), stay pinned while scrolling, or get a background highlight.',
          '**Content width.** Turn it on and the profile, feed, and messages stretch; the slider sets 900–2500 px with a live preview underneath.',
          '**Page offset.** Shifts content left or right by up to 600 px — handy on wide monitors.',
          '**Search.** The search bar can collapse into an icon that expands on hover.',
          '**Appearance.** Compact spacing removes gaps between blocks, and avatar shape is picked from presets (drop, leaf, petal, blob) or a corner-radius percentage.',
        ],
        access: 'Ctrl/Cmd + K → “Display mode”. It’s the first block on the “View” tab.',
      },
    },
    {
      anchor: 'custom_theme',
      icon: 'palette',
      media: [
        { type: 'screenshot', file: 'theme.png' },
        { type: 'gif', file: 'theme-apply.gif' },
      ],
      ru: {
        title: 'Тема',
        lead: 'Перекрашивает ВКонтакте целиком. Это главный блок вкладки — он выделен и помечен значком «Основное».',
        how: [
          'Готовые пресеты разбиты по категориям (Classic, AMOLED, Neon и другие). Клик по карточке применяет тему сразу, без перезагрузки.',
          'Свой цвет фона задаётся пипеткой — расширение само подберёт под него остальную палитру.',
          'Блок «Блоки» настраивает прозрачность карточек, эффект стекла (размытие за полупрозрачными блоками), скругление и глубину с тенями.',
        ],
        access: 'Ctrl/Cmd + K → «Цветовая тема». Внутри вкладки — карточка «Тема» с пометкой «Основное».',
      },
      en: {
        title: 'Theme',
        lead: 'Repaints all of VKontakte. This is the tab’s key block — highlighted and marked “Primary”.',
        how: [
          'Presets are grouped by category (Classic, AMOLED, Neon, and more). A click applies the theme instantly, no reload.',
          'Pick your own background color with the eyedropper, and the extension derives the rest of the palette.',
          'The “Blocks” group tunes card opacity, a glass blur behind translucent blocks, corner radius, and depth with shadows.',
        ],
        access: 'Ctrl/Cmd + K → “Theme”. Inside the tab it’s the “Theme” card marked “Primary”.',
      },
    },
    {
      anchor: 'custom_accent',
      icon: 'drops',
      media: [{ type: 'screenshot', file: 'accent.png' }],
      ru: {
        title: 'Акцентный цвет',
        lead: 'Один цвет для всех акцентов интерфейса — ссылок, кнопок, активных элементов.',
        how: [
          'Выберите цвет — и он разойдётся по всей палитре ВКонтакте.',
          'Если у выбранной темы есть свой рекомендованный акцент, расширение подскажет его и применит в один клик.',
        ],
        access: 'Ctrl/Cmd + K → «Акцентный цвет». Кнопка сброса появляется в шапке, когда цвет задан.',
      },
      en: {
        title: 'Accent color',
        lead: 'One color for every interface accent — links, buttons, active elements.',
        how: [
          'Pick a color and it spreads across the whole VKontakte palette.',
          'If the current theme has a recommended accent, the extension suggests it and applies it in one click.',
        ],
        access: 'Ctrl/Cmd + K → “Accent color”. A reset button appears in the header once a color is set.',
      },
    },
    {
      anchor: 'custom_font',
      icon: 'text',
      media: [{ type: 'screenshot', file: 'font.png' }],
      ru: {
        title: 'Шрифт',
        lead: 'Меняет шрифт всего ВКонтакте — из готового списка или своим названием.',
        how: [
          'Каталог шрифтов с поиском и категориями (популярные, моноширинные, с засечками и другие); карточки показывают живое начертание.',
          'Свой шрифт добавляется строкой вроде `"Roboto", sans-serif`. Рядом — подсказка «Как найти?» со ссылкой на Google Fonts.',
          'Размер задаётся пресетами или точным ползунком; в дополнительных настройках — насыщенность, курсив, подчёркивание, регистр и интервалы.',
        ],
        access: 'Ctrl/Cmd + K → «Шрифт интерфейса».',
      },
      en: {
        title: 'Font',
        lead: 'Changes the font across all of VKontakte — from a ready list or your own name.',
        how: [
          'A searchable font catalog with categories (popular, monospace, serif, and more); cards show the live typeface.',
          'Add a custom font with a line like `"Roboto", sans-serif`. A “How to find?” hint links to Google Fonts.',
          'Size is set by presets or a precise slider; advanced settings cover weight, italic, underline, case, and spacing.',
        ],
        access: 'Ctrl/Cmd + K → “Font”.',
      },
    },
    {
      anchor: 'visual_filters',
      icon: 'filter',
      media: [{ type: 'screenshot', file: 'filters.png' }],
      ru: {
        title: 'Визуальные фильтры',
        lead: 'Накладывают эффект на всю страницу: чёрно-белый режим, сепия, инверсия, затемнение картинок, высокий контраст, пониженная яркость.',
        how: [
          'Каждый фильтр — отдельный переключатель, можно комбинировать.',
          'Если включено сразу несколько, расширение предупредит: это может подтормаживать страницу.',
        ],
        access: 'Ctrl/Cmd + K → «Визуальные фильтры». Сброс всех фильтров — кнопкой в шапке блока.',
      },
      en: {
        title: 'Visual filters',
        lead: 'Apply an effect to the whole page: grayscale, sepia, invert, dimmed images, high contrast, low brightness.',
        how: [
          'Each filter is its own toggle, and they can be combined.',
          'Turn on several at once and the extension warns it may slow the page down.',
        ],
        access: 'Ctrl/Cmd + K → “Visual filters”. Reset them all from the block header.',
      },
    },
    {
      anchor: 'custom_background',
      icon: 'picture',
      media: [
        { type: 'screenshot', file: 'background.png' },
        { type: 'gif', file: 'background-video.gif' },
      ],
      ru: {
        title: 'Фон',
        lead: 'Ставит за страницу картинку, видео или целые веб-обои.',
        how: [
          'Вкладка «Готовые» — каталог обоев; «Свой» принимает ссылку или файл с компьютера.',
          'Поддерживаются картинки (JPG, PNG, WebP, GIF, AVIF), видео по прямой ссылке или с YouTube, VK Video, Rutube и других, а также HTML-обои (анимации, Wallpaper Engine).',
          'Когда фон установлен, открываются настройки отображения: размытие, затемнение, прозрачность, цветовые фильтры, эффекты, для видео — скорость и громкость.',
        ],
        access: 'Ctrl/Cmd + K → «Фон страницы».',
      },
      en: {
        title: 'Background',
        lead: 'Puts an image, a video, or full web wallpapers behind the page.',
        how: [
          'The “Presets” tab is a wallpaper catalog; “Custom” takes a link or a file from your computer.',
          'Supports images (JPG, PNG, WebP, GIF, AVIF), video by direct link or from YouTube, VK Video, Rutube and others, plus HTML wallpapers (animations, Wallpaper Engine).',
          'Once a background is set, display settings open up: blur, dim, opacity, color filters, effects, and — for video — speed and volume.',
        ],
        access: 'Ctrl/Cmd + K → “Background”.',
      },
    },
    {
      anchor: 'appearance_profiles',
      icon: 'bookmark',
      media: [{ type: 'screenshot', file: 'profiles.png' }],
      ru: {
        title: 'Мои профили',
        lead: 'Сохраняет всю связку оформления под именем и переключает её одним кликом.',
        how: [
          'Один профиль хранит тему, акцент, шрифт, фон и фильтры разом.',
          'Профиль можно перезаписать текущим оформлением, переименовать или удалить; активный помечен.',
          'Профили не пропадают при сбросе настроек.',
        ],
        access: 'Ctrl/Cmd + K → «Мои профили». Раздел «Профили» на вкладке «Вид».',
      },
      en: {
        title: 'My profiles',
        lead: 'Saves a whole appearance setup under a name and switches it with one click.',
        how: [
          'A profile holds the theme, accent, font, background, and filters together.',
          'Overwrite a profile with the current look, rename it, or delete it; the active one is marked.',
          'Profiles survive a settings reset.',
        ],
        access: 'Ctrl/Cmd + K → “My profiles”. The “Profiles” section on the “View” tab.',
      },
    },
    {
      anchor: 'share_theme',
      icon: 'share',
      media: [{ type: 'screenshot', file: 'share.png' }],
      ru: {
        title: 'Поделиться темой',
        lead: 'Собирает ваше оформление в ссылку — друг открывает её и применяет тему одним кликом.',
        how: [
          'Перед генерацией блок «Что попадёт в ссылку» показывает точный список параметров по группам.',
          'В ссылку идут только изменённые значения; фоны из файлов расширения пропускаются — они недоступны другим.',
          'Кнопка копирует готовый адрес вида `vkify.ru/theme/…` в буфер обмена.',
        ],
        access: 'Ctrl/Cmd + K → «Поделиться темой». Блок внизу вкладки «Вид».',
      },
      en: {
        title: 'Share a theme',
        lead: 'Packs your look into a link — a friend opens it and applies the theme in one click.',
        how: [
          'Before generating, the “What goes into the link” block shows the exact parameters, grouped.',
          'Only changed values are included; backgrounds stored as extension files are skipped since others can’t reach them.',
          'The button copies a ready `vkify.ru/theme/…` address to the clipboard.',
        ],
        access: 'Ctrl/Cmd + K → “Share a theme”. The block at the bottom of the “View” tab.',
      },
    },
  ],
}

const hidingDocs = {
  slug: 'hiding',
  heroIcon: 'hide',
  ru: {
    nav: 'Скрытие',
    title: 'Вкладка «Скрытие»',
    subtitle: 'Точечно убирает блоки ВКонтакте — по разделам, как устроен сам сайт: профиль, лента, музыка, меню.',
    note: 'У заголовка каждого раздела — счётчик скрытого и кнопка «Скрыть всё / Показать всё». Всё применяется сразу, без перезагрузки.',
    seoTitle: 'Документация — вкладка «Скрытие»',
    seoDescription: 'Как скрыть лишние блоки ВКонтакте в VKify: истории, рекомендации, рекламу в музыке, пункты левого меню и сквозные элементы по всему сайту.',
  },
  en: {
    nav: 'Hiding',
    title: 'The “Hiding” tab',
    subtitle: 'Removes VKontakte blocks one by one — organized by section, the way the site itself is: profile, feed, music, menu.',
    note: 'Each section header shows how many items are hidden and has a “Hide all / Show all” button. Everything applies instantly, no reload.',
    seoTitle: 'Documentation — the “Hiding” tab',
    seoDescription: 'How to hide extra VKontakte blocks in VKify: stories, recommendations, music ads, left-menu items, and site-wide elements.',
  },
  features: [
    {
      anchor: 'profile',
      icon: 'profile',
      media: [{ type: 'screenshot', file: 'profile.png' }],
      ru: {
        title: 'Профиль',
        lead: 'Убирает лишнее со страниц пользователей.',
        items: [
          { title: 'Эмодзи-статусы', desc: 'Статусы с эмодзи рядом с именем' },
          { title: 'Истории возможных друзей', desc: 'Блок историй на странице профиля' },
          { title: 'Промо-блок', desc: 'Рекламная ссылка на мини-приложение' },
          { title: 'Правая колонка', desc: 'Колонка с друзьями, подписками и прочими блоками' },
        ],
        access: 'Ctrl/Cmd + K по названию пункта или хаб «Скрытие» → «Профиль».',
      },
      en: {
        title: 'Profile',
        lead: 'Clears clutter from user pages.',
        items: [
          { title: 'Emoji statuses', desc: 'Emoji statuses next to the name' },
          { title: 'Stories of suggested friends', desc: 'The stories block on the profile page' },
          { title: 'Promo block', desc: 'An ad link to a mini app' },
          { title: 'Right column', desc: 'The column with friends, subscriptions, and other blocks' },
        ],
        access: 'Ctrl/Cmd + K by item name, or the “Hiding” hub → “Profile”.',
      },
    },
    {
      anchor: 'feed',
      icon: 'feed',
      media: [{ type: 'screenshot', file: 'feed.png' }],
      ru: {
        title: 'Лента',
        lead: 'Чистит главную ленту новостей.',
        items: [
          { title: 'Истории', desc: 'Полоса историй вверху ленты' },
          { title: 'Добавление поста', desc: 'Поле «Что у вас нового»' },
          { title: 'Комментарии', desc: 'Комментарии под постами' },
          { title: 'Правая колонка', desc: 'Колонка с фильтрами тем — лента станет шире' },
        ],
        access: 'Ctrl/Cmd + K по названию пункта или хаб «Скрытие» → «Лента».',
      },
      en: {
        title: 'Feed',
        lead: 'Cleans up the main news feed.',
        items: [
          { title: 'Stories', desc: 'The stories strip at the top of the feed' },
          { title: 'Post box', desc: 'The “What’s new” composer' },
          { title: 'Comments', desc: 'Comments under posts' },
          { title: 'Right column', desc: 'The topic-filter column — the feed gets wider' },
        ],
        access: 'Ctrl/Cmd + K by item name, or the “Hiding” hub → “Feed”.',
      },
    },
    {
      anchor: 'messenger',
      icon: 'message',
      media: [{ type: 'screenshot', file: 'messenger.png' }],
      ru: {
        title: 'Мессенджер',
        lead: 'Прибирает раздел сообщений.',
        items: [
          { title: 'Рекомендуемые каналы', desc: 'Блок рекомендаций каналов в списке диалогов' },
        ],
        access: 'Ctrl/Cmd + K → «Рекомендуемые каналы» или хаб «Скрытие» → «Мессенджер».',
      },
      en: {
        title: 'Messenger',
        lead: 'Tidies up the messages section.',
        items: [
          { title: 'Recommended channels', desc: 'The channel suggestions block in the dialog list' },
        ],
        access: 'Ctrl/Cmd + K → “Recommended channels”, or the “Hiding” hub → “Messenger”.',
      },
    },
    {
      anchor: 'friends',
      icon: 'users',
      media: [{ type: 'screenshot', file: 'friends.png' }],
      ru: {
        title: 'Друзья',
        lead: 'Раздел друзей без навязчивых предложений.',
        items: [
          { title: 'Возможные друзья', desc: 'Блок с предложениями добавить в друзья' },
        ],
        access: 'Ctrl/Cmd + K → «Возможные друзья» или хаб «Скрытие» → «Друзья».',
      },
      en: {
        title: 'Friends',
        lead: 'The friends section without pushy suggestions.',
        items: [
          { title: 'People you may know', desc: 'The friend-suggestion block' },
        ],
        access: 'Ctrl/Cmd + K → “People you may know”, or the “Hiding” hub → “Friends”.',
      },
    },
    {
      anchor: 'communities',
      icon: 'users3',
      media: [{ type: 'screenshot', file: 'communities.png' }],
      ru: {
        title: 'Сообщества',
        lead: 'Раздел групп без лишних подсказок.',
        items: [
          { title: 'Недавние группы', desc: 'Блок недавно посещённых сообществ' },
        ],
        access: 'Ctrl/Cmd + K → «Недавние группы» или хаб «Скрытие» → «Сообщества».',
      },
      en: {
        title: 'Communities',
        lead: 'The groups section without extra hints.',
        items: [
          { title: 'Recent groups', desc: 'The block of recently visited communities' },
        ],
        access: 'Ctrl/Cmd + K → “Recent groups”, or the “Hiding” hub → “Communities”.',
      },
    },
    {
      anchor: 'music',
      icon: 'music',
      media: [{ type: 'screenshot', file: 'music.png' }],
      ru: {
        title: 'Музыка',
        lead: 'Аудио без рекламы.',
        items: [
          { title: 'Реклама в аудио', desc: 'Рекламные блоки и баннеры подписки в музыке' },
        ],
        access: 'Ctrl/Cmd + K → «Скрыть рекламу в музыке» или хаб «Скрытие» → «Музыка».',
      },
      en: {
        title: 'Music',
        lead: 'Audio without ads.',
        items: [
          { title: 'Audio ads', desc: 'Ad blocks and subscription banners in music' },
        ],
        access: 'Ctrl/Cmd + K → “Hide audio ads”, or the “Hiding” hub → “Music”.',
      },
    },
    {
      anchor: 'menu',
      icon: 'menu',
      widget: 'vkMenu',
      media: [{ type: 'screenshot', file: 'menu.png' }],
      ru: {
        title: 'Меню',
        lead: 'Управляет левым меню ВКонтакте.',
        items: [
          { title: 'Пункты меню', desc: 'Тумблер у каждого пункта — показывать его в левом меню или нет. Выключенные пункты и разделители исчезают: уберите «Игры», «Звонки» или что угодно ещё' },
          { title: 'Настройки в меню', desc: 'Пункт «Настройки» в боковом меню' },
          { title: 'Счётчики', desc: 'Бейджи с числами у пунктов меню' },
        ],
        access: 'Ctrl/Cmd + K → «Пункты меню» или хаб «Скрытие» → «Меню».',
      },
      en: {
        title: 'Menu',
        lead: 'Controls the VKontakte left menu.',
        items: [
          { title: 'Menu items', desc: 'A toggle for each item — whether to show it in the left menu. Disabled items and dividers disappear: drop “Games”, “Calls”, or anything else' },
          { title: 'Settings in the menu', desc: 'The “Settings” item in the sidebar' },
          { title: 'Counters', desc: 'Number badges next to menu items' },
        ],
        access: 'Ctrl/Cmd + K → “Menu items”, or the “Hiding” hub → “Menu”.',
      },
    },
    {
      anchor: 'global',
      icon: 'globe',
      media: [{ type: 'screenshot', file: 'global.png' }],
      ru: {
        title: 'Глобально',
        lead: 'Сквозные элементы, которые видны на любой странице ВКонтакте.',
        items: [
          { title: 'Рекомендации', desc: 'Блоки рекомендуемого контента' },
          { title: 'Мини-чат', desc: 'Всплывающий чат в углу экрана' },
          { title: 'Кнопка «Наверх»', desc: 'Кнопка быстрой прокрутки вверх' },
        ],
        access: 'Ctrl/Cmd + K по названию пункта или хаб «Скрытие» → «Глобально».',
      },
      en: {
        title: 'Global',
        lead: 'Site-wide elements visible on any VKontakte page.',
        items: [
          { title: 'Recommendations', desc: 'Recommended-content blocks' },
          { title: 'Mini chat', desc: 'The pop-up chat in the corner' },
          { title: 'Back-to-top button', desc: 'The scroll-to-top button' },
        ],
        access: 'Ctrl/Cmd + K by item name, or the “Hiding” hub → “Global”.',
      },
    },
  ],
}

const adsDocs = {
  slug: 'ads',
  heroIcon: 'ban',
  ru: {
    nav: 'Реклама',
    title: 'Вкладка «Реклама»',
    subtitle: 'Фильтры рекламы и трекеров: боковая панель, лента, аналитика. Сверху видно, сколько фильтров включено и общую защиту.',
    seoTitle: 'Документация — вкладка «Реклама»',
    seoDescription: 'Как VKify блокирует рекламу ВКонтакте: боковая панель, фильтр ленты на уровне API и DOM, фильтр по словам, блокировка трекеров и журнал.',
  },
  en: {
    nav: 'Ads',
    title: 'The “Ads” tab',
    subtitle: 'Ad and tracker filters: sidebar, feed, analytics. The top shows how many filters are on and your overall protection.',
    seoTitle: 'Documentation — the “Ads” tab',
    seoDescription: 'How VKify blocks VKontakte ads: the sidebar, feed filtering at the API and DOM level, keyword filter, tracker blocking, and a log.',
  },
  features: [
    {
      anchor: 'ad_blocking',
      icon: 'ban',
      media: [{ type: 'screenshot', file: 'blocking.png' }],
      ru: {
        title: 'Блокировка рекламы',
        lead: 'Четыре независимых фильтра. Кнопка «Включить всё» поднимает их разом, а баннер сверху показывает уровень защиты: полная, частичная или отключена.',
        items: [
          { title: 'Боковая панель', desc: 'Скрывает рекламные баннеры и виджеты в левой колонке' },
          { title: 'Лента · фильтр API', desc: 'Перехватывает рекламные посты на уровне сетевых запросов — они не доходят до страницы' },
          { title: 'Лента · фильтр DOM', desc: 'Запасной слой: скрывает промопосты через CSS и анализ содержимого, если API-фильтр что-то пропустил' },
          { title: 'Блокировка трекеров', desc: 'Перехватывает аналитику, телеметрию и рекламные сети' },
        ],
        access: 'Ctrl/Cmd + K → «Скрыть левый блок рекламы», «Резать рекламу в API/DOM» или «Блокировка трекеров».',
      },
      en: {
        title: 'Ad blocking',
        lead: 'Four independent filters. “Enable all” flips them together, and the banner on top shows your protection level: full, partial, or off.',
        items: [
          { title: 'Sidebar', desc: 'Hides ad banners and widgets in the left column' },
          { title: 'Feed · API filter', desc: 'Intercepts promo posts at the network level — they never reach the page' },
          { title: 'Feed · DOM filter', desc: 'A fallback layer: hides promo posts via CSS and content analysis if the API filter missed one' },
          { title: 'Tracker blocking', desc: 'Intercepts analytics, telemetry, and ad networks' },
        ],
        access: 'Ctrl/Cmd + K → “Hide left ad block”, “Cut feed ads (API/DOM)”, or “Tracker blocking”.',
      },
    },
    {
      anchor: 'custom_block_words',
      icon: 'filter',
      media: [{ type: 'screenshot', file: 'keywords.png' }],
      ru: {
        title: 'Фильтр по словам',
        lead: 'Появляется, когда включён DOM-фильтр ленты. Прячет или, наоборот, всегда показывает посты по словам в тексте.',
        how: [
          '**Список скрытия** — посты с этими словами уходят из ленты.',
          '**Список показа** — слова-исключения: такие посты остаются, даже если их зацепил бы другой фильтр.',
        ],
        access: 'Ctrl/Cmd + K → «Реклама» → «Фильтр по словам» (нужен включённый DOM-фильтр).',
      },
      en: {
        title: 'Keyword filter',
        lead: 'Appears once the feed DOM filter is on. Hides posts — or always keeps them — based on words in the text.',
        how: [
          '**Block list** — posts containing these words leave the feed.',
          '**Allow list** — exception words: those posts stay, even if another filter would catch them.',
        ],
        access: 'Ctrl/Cmd + K → “Ads” → “Keyword filter” (needs the DOM filter on).',
      },
    },
    {
      anchor: 'ads_stats',
      icon: 'activity',
      media: [{ type: 'screenshot', file: 'stats.png' }],
      ru: {
        title: 'Статистика и журнал',
        lead: 'Сколько рекламы и трекеров заблокировано за всё время, плюс журнал последних срабатываний с фильтрами и деталями.',
        how: [
          'Счётчики отдельно по рекламе и трекерам.',
          'Журнал последних блокировок с фильтром «Всё / Реклама / Трекеры» и постраничной подгрузкой.',
        ],
        access: 'Ctrl/Cmd + K → «Реклама» → «Статистика и журнал».',
      },
      en: {
        title: 'Stats and log',
        lead: 'How many ads and trackers were blocked all-time, plus a log of recent hits with filters and details.',
        how: [
          'Separate counters for ads and trackers.',
          'A log of recent blocks with an “All / Ads / Trackers” filter and paged loading.',
        ],
        access: 'Ctrl/Cmd + K → “Ads” → “Stats and log”.',
      },
    },
  ],
}

const privacyDocs = {
  slug: 'privacy',
  heroIcon: 'shield',
  ru: {
    nav: 'Приватность',
    title: 'Вкладка «Приватность»',
    subtitle: 'Шифрование переписки, невидимка и анти-слежка. Всё работает на вашей стороне — как дополнительный слой, а не стопроцентная гарантия.',
    note: 'Функции приватности действуют только в вашем браузере и не дают полной защиты — это дополнительный слой конфиденциальности.',
    seoTitle: 'Документация — вкладка «Приватность»',
    seoDescription: 'Приватность в VKify: сквозное шифрование сообщений (COFFEE и VKify E2E), скрытие онлайн-статуса, отключение «печатает» и «прочитано», скрытые диалоги.',
  },
  en: {
    nav: 'Privacy',
    title: 'The “Privacy” tab',
    subtitle: 'Message encryption, invisible mode, and anti-tracking. It all runs on your side — an extra layer, not a 100% guarantee.',
    note: 'Privacy features work only in your browser and don’t provide full protection — treat them as an extra layer.',
    seoTitle: 'Documentation — the “Privacy” tab',
    seoDescription: 'Privacy in VKify: end-to-end message encryption (COFFEE and VKify E2E), hiding your online status, disabling “typing” and “read”, and hidden dialogs.',
  },
  features: [
    {
      anchor: 'message_crypto',
      icon: 'lock',
      media: [{ type: 'screenshot', file: 'crypto.png' }],
      ru: {
        title: 'Шифрование сообщений',
        lead: 'В поле ввода ВК появляется кнопка: нажали перед отправкой — текст ушёл шифротекстом. Входящие в поддерживаемых форматах расшифровываются сами.',
        how: [
          '**COFFEE** (AES-128-ECB) — совместим с Kate Mobile, VK Coffee, Laney и Vika; маркер исходящих выбирается под нужный клиент. Без ключа берётся публичный ключ протокола.',
          '**VKify E2E** (AES-256-GCM) — только между пользователями VKify; нужен общий пароль, одинаковый у обоих собеседников.',
        ],
        access: 'Ctrl/Cmd + K → «Шифрование сообщений». Внутри — отдельная страница «Формат и ключ».',
      },
      en: {
        title: 'Message encryption',
        lead: 'A button appears in the VK composer: press it before sending and the text goes out encrypted. Incoming messages in supported formats decrypt on their own.',
        how: [
          '**COFFEE** (AES-128-ECB) — compatible with Kate Mobile, VK Coffee, Laney, and Vika; pick the outgoing marker for the target client. Without a key it uses the protocol’s public key.',
          '**VKify E2E** (AES-256-GCM) — only between VKify users; needs a shared password, identical on both sides.',
        ],
        access: 'Ctrl/Cmd + K → “Message encryption”. Inside is a “Format and key” page.',
      },
    },
    {
      anchor: 'hide_online',
      icon: 'eye',
      media: [{ type: 'screenshot', file: 'online.png' }],
      ru: {
        title: 'Скрыть онлайн-статус',
        lead: 'Невидимка через VK API: вас не видно в сети. Нужен открытый таб ВК для доступа к API.',
        how: [
          'Статус переключается одним тумблером и применяется на стороне ВК.',
          'Это симметрично: скрыли себя — не видите и других.',
        ],
        access: 'Ctrl/Cmd + K → «Скрыть онлайн-статус».',
      },
      en: {
        title: 'Hide online status',
        lead: 'Invisible mode via the VK API: you’re hidden from the online list. Needs an open VK tab for API access.',
        how: [
          'A single toggle switches the status, applied on VK’s side.',
          'It’s symmetric: hide yourself and you no longer see others.',
        ],
        access: 'Ctrl/Cmd + K → “Hide online status”.',
      },
    },
    {
      anchor: 'anti_tracking',
      icon: 'hide',
      media: [{ type: 'screenshot', file: 'anti-tracking.png' }],
      ru: {
        title: 'Анти-слежка',
        lead: 'Не отдавать собеседнику лишних сигналов о вашей активности.',
        items: [
          { title: 'Не показывать «печатает»', desc: 'Собеседник не увидит, что вы набираете сообщение' },
          { title: 'Не отмечать прочитанным', desc: 'Сообщения остаются непрочитанными для отправителя' },
          { title: 'Размытие при отходе', desc: 'Размывает страницу, когда курсор покидает окно ВК или вы переключаетесь на другое окно' },
        ],
        access: 'Ctrl/Cmd + K по названию: «Не показывать печатает», «Не отмечать прочитанным», «Размытие при потере фокуса».',
      },
      en: {
        title: 'Anti-tracking',
        lead: 'Don’t hand the other person extra signals about your activity.',
        items: [
          { title: 'Hide “typing”', desc: 'The other person won’t see that you’re typing' },
          { title: 'Don’t mark as read', desc: 'Messages stay unread for the sender' },
          { title: 'Blur on leave', desc: 'Blurs the page when the cursor leaves the VK window or you switch to another window' },
        ],
        access: 'Ctrl/Cmd + K by name: “Hide typing”, “Don’t mark as read”, “Blur on focus loss”.',
      },
    },
    {
      anchor: 'hidden_dialogs',
      icon: 'message',
      media: [{ type: 'screenshot', file: 'hidden-dialogs.png' }],
      ru: {
        title: 'Скрытие диалогов',
        lead: 'Убирает чаты из списка переписок — переписка остаётся, просто становится невидимой.',
        items: [
          { title: 'Скрытые диалоги', desc: 'Выбранные чаты исчезают из списка: ни имени, ни аватара, ни сообщений' },
          { title: 'Скрыть всё хоткеем', desc: 'Одна горячая клавиша (по умолчанию Ctrl+Q) мгновенно прячет весь список чатов' },
        ],
        access: 'Ctrl/Cmd + K → «Скрытые диалоги» или «Скрыть переписки хоткеем».',
      },
      en: {
        title: 'Hiding dialogs',
        lead: 'Removes chats from the conversation list — the chat stays, it just becomes invisible.',
        items: [
          { title: 'Hidden dialogs', desc: 'Selected chats vanish from the list: no name, avatar, or messages' },
          { title: 'Hide all with a hotkey', desc: 'One hotkey (Ctrl+Q by default) instantly hides the whole chat list' },
        ],
        access: 'Ctrl/Cmd + K → “Hidden dialogs” or “Hide chats with a hotkey”.',
      },
    },
  ],
}

const builtinPresetsFeature = {
  anchor: 'builtin_presets',
  icon: 'drops',
  category: 'profiles',
  subfeatures: [
    { id: 'preset_minimal', title: 'Минимализм', description: 'Чистая лента, компактные отступы и минимум отвлекающих блоков.' },
    { id: 'preset_privacy', title: 'Приватность', description: 'Анти‑слежка, блокировка трекеров и прямые внешние ссылки.' },
    { id: 'preset_performance', title: 'Производительность', description: 'Отключает тяжёлые эффекты и фоновые функции.' },
  ],
  ru: {
    title: 'Готовые пресеты',
    lead: 'Применяют сразу несколько согласованных настроек одним нажатием — для минимализма, приватности или максимальной скорости.',
    how: [
      '**Минимализм.** Убирает истории, рекомендации и лишние блоки, включает компактные отступы. Он заменяет текущее оформление, поэтому сначала сохраните его в «Мои профили», если хотите быстро вернуться.',
      '**Приватность.** Отключает сигналы набора и прочтения, блокирует трекеры и включает обход `away.php`.',
      '**Производительность.** Выключает тяжёлые визуальные эффекты и фоновые подсистемы. Кнопка «Отключить» возвращает параметры выбранного пресета к значениям по умолчанию.',
    ],
    access: 'Ctrl/Cmd + K → «Пресеты настроек» или «Вид» → «Пресеты».',
  },
  en: {
    title: 'Ready-made presets',
    lead: 'Apply a coordinated group of settings in one click—for minimalism, privacy, or maximum responsiveness.',
    how: [
      '**Minimalism.** Removes stories, recommendations, and extra blocks, then enables compact spacing. It replaces the current appearance, so save that look to “My profiles” first if you may want it back.',
      '**Privacy.** Hides typing and read signals, blocks trackers, and bypasses `away.php` redirects.',
      '**Performance.** Disables heavy visual effects and background subsystems. “Disable” restores that preset’s settings to their defaults.',
    ],
    access: 'Ctrl/Cmd + K → “Settings presets”, or “View” → “Presets”.',
  },
}

const centerDocs = {
  slug: 'center',
  heroIcon: 'download',
  ru: {
    nav: 'Центр',
    title: 'Вкладка «Центр»',
    subtitle: 'Инструменты для профиля, ленты, сообщений и медиа: меняйте раскладку, сохраняйте контент и автоматизируйте работу с плеером.',
    note: 'Внутри вкладки девять страниц. Рейл слева повторяет основные разделы ВКонтакте; у музыки, плеера и сообщений есть дополнительные подстраницы.',
    seoTitle: 'Документация VKify — вкладка «Центр»',
    seoDescription: 'Все функции Центра VKify: профиль, лента, мессенджер, сообщества, фото, музыка, плеер, видео и клипы.',
  },
  en: {
    nav: 'Center',
    title: 'The “Center” tab',
    subtitle: 'Tools for profiles, feed, messages, and media: rearrange layouts, save content, and automate the player.',
    note: 'The tab contains nine pages. Its left rail mirrors VK’s main sections; Music, Player, and Messenger have nested pages.',
    seoTitle: 'VKify documentation — the “Center” tab',
    seoDescription: 'Every VKify Center feature: profile, feed, messenger, communities, photos, music, player, video, and clips.',
  },
  features: [
    {
      anchor: 'profile_swap_columns',
      icon: 'profile',
      category: 'profile',
      subfeatures: [
        { id: 'profile_swap_columns', title: 'Поменять колонки местами', description: 'Узкая колонка слева, основной контент справа.' },
      ],
      ru: {
        title: 'Профиль',
        lead: 'Меняет привычное расположение колонок на страницах пользователей.',
        how: [
          '**Поменять колонки местами** переносит узкую колонку с фотографией и краткими данными влево, а публикации и основной контент — вправо.',
          'Настройка применяется ко всем открываемым профилям. Если страница уже открыта, изменение появляется без ручной перезагрузки.',
        ],
        access: 'Ctrl/Cmd + K → «Поменять колонки профиля» или «Центр» → «Профиль».',
      },
      en: {
        title: 'Profile',
        lead: 'Changes the familiar column order on user profile pages.',
        how: [
          '**Swap columns** moves the narrow photo and summary column to the left and keeps posts and main content on the right.',
          'The setting applies to every profile you open and updates an already open page without a manual reload.',
        ],
        access: 'Ctrl/Cmd + K → “Swap profile columns”, or “Center” → “Profile”.',
      },
    },
    {
      anchor: 'expand_post_text',
      icon: 'feed',
      category: 'feed',
      subfeatures: [
        { id: 'expand_post_text', title: 'Разворачивать посты', description: 'Показывает полный текст без «Показать ещё».' },
        { id: 'story_download', title: 'Скачивание сторис', description: 'Добавляет кнопку скачивания в просмотрщик историй.' },
      ],
      ru: {
        title: 'Лента',
        lead: 'Убирает лишние действия при чтении постов и позволяет сохранить открытую историю.',
        items: [
          { title: 'Разворачивать посты', desc: 'автоматически показывает текст целиком, без нажатия «Показать ещё»' },
          { title: 'Скачивание сторис', desc: 'добавляет кнопку «Скачать» в просмотрщик историй' },
        ],
        access: 'Ctrl/Cmd + K → «Разворачивать текст постов» или «Скачать историю».',
      },
      en: {
        title: 'Feed',
        lead: 'Removes extra clicks while reading posts and lets you save the story currently being viewed.',
        items: [
          { title: 'Expand posts', desc: 'shows the full post automatically, without pressing “Show more”' },
          { title: 'Story download', desc: 'adds a Download button to the story viewer' },
        ],
        access: 'Ctrl/Cmd + K → “Expand post text” or “Download story”.',
      },
    },
    {
      anchor: 'message_quick_copy',
      icon: 'message',
      category: 'messages',
      subfeatures: [
        { id: 'message_quick_copy', title: 'Быстрое копирование', description: 'Кнопка копирования у сообщений; Shift+клик выбирает диапазон.' },
        { id: 'dialog_export_enabled', title: 'Экспорт диалога', description: 'JSON, TXT, HTML, ZIP или PDF.' },
        { id: 'message_pin_notes', title: 'Заметки из сообщений', description: 'Сохраняет сообщения в локальную вкладку «Заметки».' },
        { id: 'messenger_swap_panels', title: 'Поменять панели местами', description: 'Диалог слева, список бесед справа.' },
        { id: 'message_templates_enabled', title: 'Шаблоны сообщений', description: 'Быстрые ответы со слэшем, хоткеем, переменными и файлами.' },
      ],
      ru: {
        title: 'Мессенджер',
        lead: 'Добавляет инструменты копирования, экспорта и сохранения сообщений, меняет раскладку и поддерживает полноценные шаблоны ответов.',
        how: [
          '**Быстрое копирование.** У каждого сообщения появляется кнопка. Обычный клик копирует одно сообщение, Shift+клик помогает захватить диапазон.',
          '**Экспорт диалога.** Выгружает переписку в JSON, TXT, HTML, ZIP или PDF. Выбирайте JSON для обработки данных, HTML/PDF — для чтения, ZIP — когда нужны вложения.',
          '**Заметки.** Значок закладки сохраняет важное сообщение локально; найти, скопировать или открыть оригинал можно во вкладке «Заметки».',
          '**Раскладка.** Переносит список бесед вправо, а текущий диалог — влево.',
          '**Шаблоны.** Создавайте ответы с переменными `%first_name%`, `%date%`, `%time%` и другими; прикладывайте до разрешённого интерфейсом числа файлов, сортируйте и дублируйте шаблоны.',
          'Пикер шаблонов открывается слэшем `/`, назначенной горячей клавишей или автоподсказкой. Автоотправка работает только для шаблонов без файлов — вложения всегда требуют подтверждения.',
        ],
        access: '«Центр» → «Мессенджер». Шаблоны открываются отдельной строкой; отдельные инструменты находятся через Ctrl/Cmd + K.',
      },
      en: {
        title: 'Messenger',
        lead: 'Adds copying, export, and note tools, changes the layout, and provides full message templates.',
        how: [
          '**Quick copy.** Every message gets a copy button. A normal click copies one message; Shift-click helps select a range.',
          '**Dialog export.** Saves a conversation as JSON, TXT, HTML, ZIP, or PDF. Use JSON for processing, HTML/PDF for reading, and ZIP when attachments matter.',
          '**Notes.** A bookmark button saves an important message locally; search, copy, or open the original from the Notes tab.',
          '**Layout.** Moves the conversation list to the right and the active dialog to the left.',
          '**Templates.** Build replies with `%first_name%`, `%date%`, `%time%`, and other variables; attach files, reorder templates, and duplicate them.',
          'Open the template picker with `/`, an assigned hotkey, or autocomplete. Auto-send is limited to templates without files; attachments always require confirmation.',
        ],
        access: '“Center” → “Messenger”. Templates have their own row; individual tools are also available through Ctrl/Cmd + K.',
      },
    },
    {
      anchor: 'communities_swap_columns',
      icon: 'users3',
      category: 'communities',
      subfeatures: [
        { id: 'communities_swap_columns', title: 'Поменять колонки местами', description: 'Узкая колонка сообщества слева.' },
        { id: 'communities_my_groups_redirect', title: 'Сразу в «Мои сообщества»', description: 'Пропускает страницу рекомендаций.' },
      ],
      ru: {
        title: 'Сообщества',
        lead: 'Настраивает раскладку страниц групп и сокращает путь к списку ваших сообществ.',
        items: [
          { title: 'Поменять колонки местами', desc: 'переносит узкую колонку сообщества влево, основной контент — вправо' },
          { title: 'Сразу в «Мои сообщества»', desc: 'пункт «Сообщества» открывает «Мои группы», минуя рекомендации' },
        ],
        access: 'Ctrl/Cmd + K по названию функции или «Центр» → «Сообщества».',
      },
      en: {
        title: 'Communities',
        lead: 'Adjusts community-page layout and shortens the path to your own groups.',
        items: [
          { title: 'Swap columns', desc: 'moves the narrow community column left and main content right' },
          { title: 'Open “My communities” directly', desc: 'the Communities menu item skips recommendations and opens your groups' },
        ],
        access: 'Ctrl/Cmd + K by feature name, or “Center” → “Communities”.',
      },
    },
    {
      anchor: 'photo_download',
      icon: 'picture',
      category: 'media',
      subfeatures: [
        { id: 'photo_download', title: 'Скачивание фото', description: 'Оригинал одного фото или ZIP всего альбома.' },
      ],
      ru: {
        title: 'Фото',
        lead: 'Сохраняет фотографии без ручного поиска исходного файла.',
        how: [
          'Для отдельной фотографии VKify загружает оригинал в доступном качестве.',
          'Для альбома расширение собирает выбранные фотографии в ZIP‑архив. На больших альбомах дождитесь завершения подготовки архива и не закрывайте вкладку.',
        ],
        access: 'Ctrl/Cmd + K → «Скачать фото» или «Центр» → «Фото».',
      },
      en: {
        title: 'Photos',
        lead: 'Saves photos without making you hunt for the original file.',
        how: [
          'For a single photo, VKify downloads the best original available.',
          'For an album, the extension collects the photos into a ZIP archive. Keep the tab open while a large archive is being prepared.',
        ],
        access: 'Ctrl/Cmd + K → “Download photo”, or “Center” → “Photos”.',
      },
    },
    {
      anchor: 'audio_download',
      icon: 'music',
      category: 'media',
      subfeatures: [
        { id: 'audio_download', title: 'Сохранение треков', description: 'Один трек или альбом в MP3 либо исходном M4A.' },
        { id: 'audio_download_id3', title: 'Теги и обложка', description: 'Записывает исполнителя, название и изображение в MP3.' },
        { id: 'audio_download_lyrics', title: 'Текст песни', description: 'Подбирает слова из открытых источников.' },
        { id: 'audio_download_bitrate', title: 'Качество MP3', description: '128, 192 или 320 кбит/с.' },
        { id: 'audio_download_filename', title: 'Имя файла', description: 'Исполнитель — название, обратный порядок или только название.' },
        { id: 'audio_multi_upload', title: 'Загрузка нескольких треков', description: 'Пакетная загрузка с защитными задержками.' },
      ],
      ru: {
        title: 'Музыка',
        lead: 'Скачивает треки и альбомы, а также помогает загрузить несколько аудиофайлов в ВК.',
        how: [
          '**Сохранение.** MP3 собирается прямо в браузере и поддерживает теги, обложку, текст песни и битрейт 128/192/320 кбит/с. Оригинальный M4A сохраняется быстрее и без перекодирования, но без этих метаданных.',
          '**Имена файлов.** Доступны схемы «Исполнитель — Название», «Название — Исполнитель» и только название; пример виден до скачивания.',
          '**Тексты песен.** Подбираются по исполнителю и названию из открытых источников, поэтому проверяйте результат для редких треков и ремиксов.',
          '**Мультизагрузка.** Добавляет несколько файлов на `vk.ru/audios`. Между файлами ставится минимум 2 секунды, перед сохранением — минимум 0,5 секунды.',
          'Не загружайте больше 10 треков за один запуск: VK может ответить `Flood control` или временно ограничить загрузку.',
        ],
        access: '«Центр» → «Музыка» → «Сохранение в MP3» или «Загрузка нескольких треков».',
      },
      en: {
        title: 'Music',
        lead: 'Downloads tracks and albums and helps upload several audio files to VK.',
        how: [
          '**Saving.** MP3 is assembled in the browser and can include tags, cover art, lyrics, and 128/192/320 kbps quality. Original M4A is faster and avoids transcoding but has no added metadata.',
          '**File names.** Choose Artist — Title, Title — Artist, or title only; a preview appears before download.',
          '**Lyrics.** They are matched from public sources by artist and title, so check rare tracks and remixes.',
          '**Multi-upload.** Adds several files at `vk.ru/audios`, waiting at least two seconds between files and half a second before saving.',
          'Keep each run to no more than ten tracks: VK may return `Flood control` or temporarily limit uploads.',
        ],
        access: '“Center” → “Music” → “Save as MP3” or “Upload multiple tracks”.',
      },
    },
    {
      anchor: 'media_player_hotkeys',
      icon: 'music',
      category: 'player',
      subfeatures: [
        { id: 'media_player_hotkeys', title: 'Хоткеи плеера', description: 'Пауза, переходы, перемотка и скорость.' },
        { id: 'audio_autoplay', title: 'Автозапуск', description: 'Продолжает трек после обновления страницы.' },
        { id: 'audio_equalizer', title: 'Эквалайзер', description: 'Преамп, 10 полос и сохраняемые пресеты.' },
      ],
      ru: {
        title: 'Плеер',
        lead: 'Управляет музыкой с клавиатуры, продолжает воспроизведение после перезагрузки и настраивает звук.',
        how: [
          '**Хоткеи.** Назначьте паузу/плей, предыдущий и следующий трек, перемотку назад/вперёд, ускорение, замедление и возврат к 1×. Скорость меняется от 0,25× до 3×.',
          'Локальные сочетания работают на активной вкладке VK. Для управления с любой вкладки назначьте глобальные команды расширения в настройках браузера.',
          '**Автозапуск.** После обновления страницы продолжает последний трек вместо запуска с начала.',
          '**Эквалайзер.** Обрабатывает звук через Web Audio API: преамп и десять частотных полос применяются сразу, без перезапуска трека. Есть встроенные и пользовательские пресеты.',
          'При сильном усилении нескольких полос уменьшите преамп, чтобы избежать перегруза и искажений.',
        ],
        access: '«Центр» → «Плеер». Хоткеи и эквалайзер открываются как отдельные подстраницы.',
      },
      en: {
        title: 'Player',
        lead: 'Controls music from the keyboard, resumes playback after reload, and adjusts the sound.',
        how: [
          '**Hotkeys.** Assign play/pause, previous/next, seek backward/forward, speed up/down, and reset to 1×. Playback speed ranges from 0.25× to 3×.',
          'Local shortcuts work on the active VK tab. To control music from any tab, assign extension-wide commands in browser settings.',
          '**Autoplay.** Resumes the last track after the page reloads instead of starting over.',
          '**Equalizer.** Uses the Web Audio API: preamp and ten frequency bands apply instantly without restarting the track. Built-in and custom presets are supported.',
          'If several bands are boosted heavily, lower the preamp to avoid clipping and distortion.',
        ],
        access: '“Center” → “Player”. Hotkeys and Equalizer open as nested pages.',
      },
    },
    {
      anchor: 'video_download',
      icon: 'download',
      category: 'media',
      subfeatures: [
        { id: 'video_download', title: 'Скачивание видео', description: 'Кнопка скачивания с выбором доступного качества.' },
      ],
      ru: {
        title: 'Видео',
        lead: 'Добавляет загрузку роликов с VK Video с выбором качества.',
        how: [
          'Кнопка «Скачать» появляется на странице видео и показывает доступные варианты качества.',
          'Набор вариантов зависит от исходного ролика и доступных потоков. Выбирайте разрешение с учётом размера файла и трафика.',
        ],
        access: 'Ctrl/Cmd + K → «Скачать видео» или «Центр» → «Видео».',
      },
      en: {
        title: 'Video',
        lead: 'Adds VK Video downloads with a quality picker.',
        how: [
          'A Download button appears on the video page and lists available quality levels.',
          'The choices depend on the source video and streams exposed by VK. Balance resolution against file size and bandwidth.',
        ],
        access: 'Ctrl/Cmd + K → “Download video”, or “Center” → “Video”.',
      },
    },
    {
      anchor: 'clip_download',
      icon: 'download',
      category: 'media',
      subfeatures: [
        { id: 'clip_download', title: 'Скачивание клипов', description: 'Кнопка сохранения рядом с лайком.' },
      ],
      ru: {
        title: 'Клипы',
        lead: 'Сохраняет открытый VK Clip локально.',
        how: [
          'После включения рядом с кнопкой лайка появляется «Скачать». VKify берёт доступный медиапоток и сохраняет его обычным файлом.',
          'Если кнопка не появилась у уже открытого клипа, перейдите к следующему и вернитесь — интерфейс клипов иногда переиспользует старую карточку.',
        ],
        access: 'Ctrl/Cmd + K → «Скачать клип» или «Центр» → «Клипы».',
      },
      en: {
        title: 'Clips',
        lead: 'Saves the currently open VK Clip locally.',
        how: [
          'Once enabled, a Download button appears beside Like. VKify takes the available media stream and saves it as a normal file.',
          'If the button is missing on a clip that was already open, move to the next clip and back—VK sometimes reuses an older card.',
        ],
        access: 'Ctrl/Cmd + K → “Download clip”, or “Center” → “Clips”.',
      },
    },
  ],
}

const notesDocs = {
  slug: 'notes',
  heroIcon: 'bookmark',
  ru: {
    nav: 'Заметки',
    title: 'Вкладка «Заметки»',
    subtitle: 'Локальный архив важных сообщений из ВКонтакте с поиском и быстрым переходом к оригиналу.',
    seoTitle: 'Документация VKify — заметки из сообщений',
    seoDescription: 'Как сохранять, искать, копировать и удалять заметки из сообщений ВКонтакте в VKify.',
  },
  en: {
    nav: 'Notes',
    title: 'The “Notes” tab',
    subtitle: 'A local archive of important VK messages with search and a quick link to the original.',
    seoTitle: 'VKify documentation — message notes',
    seoDescription: 'How to save, search, copy, and delete notes made from VK messages.',
  },
  features: [
    {
      anchor: 'notes_view',
      icon: 'bookmark',
      category: 'messages',
      subfeatures: [
        { id: 'message_pin_notes', title: 'Сохранение', description: 'Закладка рядом с сообщением добавляет его в заметки.' },
        { id: 'notes_search', title: 'Поиск', description: 'По тексту, автору и названию чата.' },
        { id: 'notes_actions', title: 'Действия', description: 'Копирование, переход к сообщению, удаление и полная очистка.' },
      ],
      ru: {
        title: 'Заметки из сообщений',
        lead: 'Сохраняет важные сообщения в браузере и группирует их по диалогам.',
        how: [
          'Сначала включите «Заметки из сообщений» в «Центр» → «Мессенджер». В чате рядом с сообщением появится значок закладки.',
          'На первом уровне заметки сгруппированы по собеседникам и беседам; внутри группы видны сохранённые сообщения и время оригинала.',
          'Поиск работает сразу по тексту, автору и названию чата. У каждой записи есть копирование, переход к исходному сообщению в VK и удаление.',
          'Кнопка «Очистить» удаляет весь архив без возможности восстановления. Для резервной копии заранее экспортируйте настройки во вкладке «Ещё».',
          'Архив хранится локально в данных расширения и не публикуется в ВК.',
        ],
        access: 'Вкладка «Заметки»; включение кнопки сохранения — «Центр» → «Мессенджер» → «Заметки из сообщений».',
      },
      en: {
        title: 'Message notes',
        lead: 'Stores important messages in the browser and groups them by dialog.',
        how: [
          'First enable “Message notes” under “Center” → “Messenger”. A bookmark icon then appears beside messages.',
          'The first level groups notes by person or conversation; open a group to see saved messages and their original timestamps.',
          'Search covers text, author, and chat title. Each note can be copied, opened at its original VK message, or deleted.',
          'Clear removes the entire archive permanently. Export settings from the More tab first if you need a backup.',
          'The archive stays in the extension’s local data and is not published to VK.',
        ],
        access: 'The “Notes” tab; enable saving under “Center” → “Messenger” → “Message notes”.',
      },
    },
  ],
}

const onlineSpyDocs = {
  slug: 'onlinespy',
  heroIcon: 'activity',
  ru: {
    nav: 'Слежка',
    title: 'Вкладка «Слежка»',
    subtitle: 'Три режима мониторинга активности: события в сообщениях, входы в сеть и изменения профиля.',
    note: 'Функции используют VK API и работают только при доступе к открытой вкладке VK. Учитывайте приватность других людей и правила платформы.',
    seoTitle: 'Документация VKify — слежка и мониторинг активности',
    seoDescription: 'Онлайн-мониторинг, события сообщений и отслеживание изменений профилей в VKify.',
  },
  en: {
    nav: 'Tracking',
    title: 'The “Tracking” tab',
    subtitle: 'Three activity monitors: message events, online sessions, and profile changes.',
    note: 'These features use the VK API and need access to an open VK tab. Respect other people’s privacy and the platform rules.',
    seoTitle: 'VKify documentation — activity tracking',
    seoDescription: 'Online monitoring, message events, and profile-change tracking in VKify.',
  },
  features: [
    {
      anchor: 'spy_activity',
      icon: 'eye',
      category: 'messages',
      subfeatures: [
        { id: 'spy_typing', title: 'Печатает сообщение', description: 'Событие набора текста.' },
        { id: 'spy_voice', title: 'Записывает голосовое', description: 'Событие записи голосового.' },
        { id: 'spy_uploads', title: 'Загружает медиа', description: 'Фото, видео и файлы.' },
        { id: 'spy_read', title: 'Прочитал сообщение', description: 'Фиксирует прочтение вашего сообщения.' },
        { id: 'spy_edit', title: 'Редактирование', description: 'Изменение отправленного сообщения.' },
        { id: 'spy_delete', title: 'Удаление', description: 'Удаление сообщения.' },
        { id: 'spy_messages', title: 'Новые сообщения', description: 'Входящие сообщения.' },
        { id: 'spy_calls', title: 'Звонки', description: 'Входящий звонок.' },
        { id: 'spy_friends', title: 'События друзей', description: 'Принятие заявки и удаление.' },
        { id: 'spy_invisibility', title: 'Невидимка', description: 'Изменение состояния невидимки.' },
        { id: 'spy_chat_events', title: 'События бесед', description: 'Вход, выход и исключение участников.' },
      ],
      ru: {
        title: 'Активность в сообщениях',
        lead: 'Получает события переписок через Long Poll и показывает их для всех или только выбранных пользователей.',
        how: [
          'Выберите режим «За всеми» или добавьте конкретных людей. Затем включите только нужные типы событий: набор, голосовое, загрузки, прочтение, редактирование, удаление, сообщения, звонки и события бесед.',
          'Системные уведомления отвечают за всплывающие оповещения, «Записывать лог» — за историю внутри VKify.',
          'Мониторинг продолжается только пока в браузере открыта вкладка VK. После её закрытия поток событий прекращается.',
        ],
        access: 'Ctrl/Cmd + K → «Активность в чатах» или «Слежка» → «Активность в сообщениях».',
      },
      en: {
        title: 'Message activity',
        lead: 'Receives conversation events through Long Poll and shows them for everyone or selected people only.',
        how: [
          'Choose “Everyone” or add specific people, then enable only the events you need: typing, voice, uploads, reads, edits, deletes, messages, calls, and chat events.',
          'Browser notifications control system popups; Save log keeps a history inside VKify.',
          'Monitoring continues only while a VK tab is open in the browser. Closing it stops the event stream.',
        ],
        access: 'Ctrl/Cmd + K → “Chat activity”, or “Tracking” → “Message activity”.',
      },
    },
    {
      anchor: 'spy_online',
      icon: 'activity',
      category: 'online',
      subfeatures: [
        { id: 'spy_online_interval', title: 'Интервал проверки', description: 'Частота запросов статуса; рекомендуется от 60 секунд.' },
        { id: 'spy_online_notify', title: 'Уведомления', description: 'Сообщает, когда пользователь появляется в сети.' },
        { id: 'spy_online_log', title: 'История и графики', description: 'Сохраняет события за семь дней.' },
      ],
      ru: {
        title: 'Онлайн-мониторинг',
        lead: 'Проверяет, когда выбранные пользователи входят в сеть и выходят из неё, и строит статистику активности.',
        how: [
          'Добавьте друзей в список и задайте интервал. Для стабильной работы и меньшей нагрузки на VK API рекомендуется 60 секунд или больше.',
          'VKify показывает текущий статус, последнее посещение, общий график, подробную статистику пользователя и сравнение нескольких людей.',
          'История посещений хранится семь дней. Уведомления и запись лога можно отключать независимо.',
        ],
        access: 'Ctrl/Cmd + K → «Онлайн-мониторинг» или «Слежка» → «Онлайн-мониторинг».',
      },
      en: {
        title: 'Online monitoring',
        lead: 'Checks when selected users come online or leave and builds activity statistics.',
        how: [
          'Add friends and set an interval. Sixty seconds or more is recommended for stable operation and lower VK API load.',
          'VKify shows current state, last seen, an overall chart, per-user details, and comparisons.',
          'Visit history is retained for seven days. Notifications and log recording can be controlled separately.',
        ],
        access: 'Ctrl/Cmd + K → “Online monitoring”, or “Tracking” → “Online monitoring”.',
      },
    },
    {
      anchor: 'profile_spy',
      icon: 'users',
      category: 'profile',
      subfeatures: [
        { id: 'profile_spy_avatar', title: 'Смена аватарки', description: 'Уведомляет о новой фотографии профиля.' },
        { id: 'profile_spy_status', title: 'Смена статуса', description: 'Фиксирует изменение строки статуса.' },
        { id: 'profile_spy_friends', title: 'Новые друзья', description: 'Следит за изменением счётчика друзей.' },
      ],
      ru: {
        title: 'Отслеживание профилей',
        lead: 'Периодически сравнивает данные профиля через VK API и сообщает об изменениях.',
        how: [
          'Для каждого добавленного пользователя можно отслеживать аватарку, текстовый статус и изменение количества друзей.',
          'Интервал лучше держать в пределах 5–15 минут: слишком частые проверки упираются в ограничения VK API.',
          'Системные уведомления и журнал изменений настраиваются отдельно. Журнал можно открыть и очистить на этой же подстранице.',
        ],
        access: 'Ctrl/Cmd + K → «Слежка за профилем» или «Слежка» → «Отслеживание профилей».',
      },
      en: {
        title: 'Profile tracking',
        lead: 'Periodically compares profile data through the VK API and reports changes.',
        how: [
          'For every added user, track avatar, status text, and changes in friend count.',
          'Keep the interval around 5–15 minutes; more frequent checks can hit VK API limits.',
          'System notifications and the change log are independent. The same page lets you open or clear the log.',
        ],
        access: 'Ctrl/Cmd + K → “Profile tracking”, or “Tracking” → “Profile tracking”.',
      },
    },
  ],
}

const scriptsDocs = {
  slug: 'scripts',
  heroIcon: 'flash',
  ru: {
    nav: 'Скрипты',
    title: 'Вкладка «Скрипты»',
    subtitle: 'Автоматизация повторяющихся действий: заявки в друзья, исправление раскладки и прямые внешние ссылки.',
    seoTitle: 'Документация VKify — скрипты и автоматизация',
    seoDescription: 'Авто-добавление друзей, смена раскладки и обход away.php в VKify.',
  },
  en: {
    nav: 'Scripts',
    title: 'The “Scripts” tab',
    subtitle: 'Automation for repetitive actions: friend requests, keyboard-layout correction, and direct external links.',
    seoTitle: 'VKify documentation — scripts and automation',
    seoDescription: 'Auto-add friends, keyboard-layout conversion, and away.php bypass in VKify.',
  },
  features: [
    {
      anchor: 'auto_add_friends',
      icon: 'users',
      category: 'automation',
      subfeatures: [
        { id: 'auto_add_limit', title: 'Лимит в час', description: 'От 10 до 100 заявок.' },
        { id: 'auto_add_delay_min', title: 'Минимальная задержка', description: 'От 10 до 60 секунд.' },
        { id: 'auto_add_delay_max', title: 'Максимальная задержка', description: 'От 20 до 120 секунд.' },
      ],
      ru: {
        title: 'Авто-добавление друзей',
        lead: 'Отправляет заявки случайным пользователям на странице поиска друзей с заданным темпом и лимитом.',
        how: [
          'Функция работает только на `vk.ru/friends?act=find`. Кнопка в popup открывает нужную страницу.',
          'Задайте лимит 10–100 заявок в час и случайный диапазон задержки. По умолчанию — 50 заявок, 20–40 секунд между действиями.',
          'Остановка скрипта сбрасывает статистику текущей сессии. Не закрывайте страницу поиска, пока автоматизация должна работать.',
          '**Важно.** Массовые заявки могут привести к `Flood control` или временной блокировке аккаунта. Используйте умеренный лимит и не запускайте скрипт надолго без контроля.',
        ],
        access: 'Ctrl/Cmd + K → «Авто-добавление друзей» или «Скрипты» → одноимённая подстраница.',
      },
      en: {
        title: 'Auto-add friends',
        lead: 'Sends requests to random users on the friend-search page at a configured pace and limit.',
        how: [
          'The feature works only at `vk.ru/friends?act=find`; the popup has a button that opens the correct page.',
          'Set 10–100 requests per hour and a randomized delay range. Defaults are 50 requests and 20–40 seconds between actions.',
          'Stopping the script resets the current-session counter. Keep the search page open while automation is expected to run.',
          '**Important.** Bulk requests may trigger `Flood control` or a temporary account restriction. Use conservative limits and supervise long runs.',
        ],
        access: 'Ctrl/Cmd + K → “Auto-add friends”, or its page under “Scripts”.',
      },
    },
    {
      anchor: 'keyboard_layout_switch',
      icon: 'text',
      category: 'keyboard',
      subfeatures: [
        { id: 'keyboard_layout_hotkey', title: 'Горячая клавиша', description: 'По умолчанию Alt+Shift+Q; можно переназначить.' },
      ],
      ru: {
        title: 'Смена раскладки',
        lead: 'Преобразует уже набранный текст между русской и английской раскладкой.',
        how: [
          'Выделите или оставьте курсор в ошибочно набранном тексте и нажмите назначенное сочетание. VKify заменит символы по соответствующим клавишам `ru ↔ en`.',
          'Горячую клавишу можно записать заново; значение по умолчанию — `Alt+Shift+Q`.',
        ],
        access: 'Ctrl/Cmd + K → «Смена раскладки» или «Скрипты» → «Клавиатура».',
      },
      en: {
        title: 'Keyboard layout conversion',
        lead: 'Converts already typed text between Russian and English keyboard layouts.',
        how: [
          'Select the mistyped text, or leave the caret in it, then press the assigned shortcut. VKify maps the characters by matching `ru ↔ en` keys.',
          'The hotkey can be reassigned; the default is `Alt+Shift+Q`.',
        ],
        access: 'Ctrl/Cmd + K → “Keyboard layout”, or “Scripts” → “Keyboard”.',
      },
    },
    {
      anchor: 'bypass_away_links',
      icon: 'share',
      category: 'links',
      subfeatures: [],
      ru: {
        title: 'Обход away.php',
        lead: 'Открывает внешние ссылки напрямую, без промежуточной страницы-предупреждения VK.',
        how: [
          'VKify распознаёт ссылки через `away.php`, извлекает конечный адрес и подставляет его сразу.',
          'Промежуточная проверка VK пропускается, поэтому перед переходом внимательнее смотрите на домен незнакомой ссылки.',
        ],
        access: 'Ctrl/Cmd + K → «Обход away.php» или «Скрипты» → «Ссылки».',
      },
      en: {
        title: 'Bypass away.php',
        lead: 'Opens external links directly instead of using VK’s intermediate warning page.',
        how: [
          'VKify recognizes `away.php` links, extracts the final destination, and replaces the redirect.',
          'Because VK’s intermediate check is skipped, inspect unfamiliar domains before opening them.',
        ],
        access: 'Ctrl/Cmd + K → “Bypass away.php”, or “Scripts” → “Links”.',
      },
    },
  ],
}

const cssDocs = {
  slug: 'css',
  heroIcon: 'code',
  ru: {
    nav: 'CSS',
    title: 'Вкладка «CSS»',
    subtitle: 'Встроенный редактор пользовательских стилей для точечной настройки интерфейса ВКонтакте.',
    note: 'Пользовательский CSS требует базового понимания селекторов. Ошибочный код влияет только на отображение страницы и всегда может быть отключён мастер‑переключателем.',
    seoTitle: 'Документация VKify — редактор своего CSS',
    seoDescription: 'Как применять, сохранять, форматировать и создавать пользовательские CSS-стили для ВКонтакте.',
  },
  en: {
    nav: 'CSS',
    title: 'The “CSS” tab',
    subtitle: 'A built-in custom-style editor for precise control over the VK interface.',
    note: 'Custom CSS requires basic selector knowledge. A mistake affects display only and can always be disabled with the master switch.',
    seoTitle: 'VKify documentation — custom CSS editor',
    seoDescription: 'How to apply, save, format, and create custom CSS styles for VK.',
  },
  features: [
    {
      anchor: 'custom_css_enabled',
      icon: 'code',
      category: 'customization',
      subfeatures: [
        { id: 'css_apply', title: 'Применить', description: 'Проверяет текущий код без отдельного сохранения.' },
        { id: 'css_save', title: 'Сохранить', description: 'Записывает код; поддерживается Ctrl+S.' },
        { id: 'css_history', title: 'Отмена и повтор', description: 'Ctrl+Z/Ctrl+Y и кнопки редактора.' },
        { id: 'css_format', title: 'Форматирование', description: 'Приводит код к читаемому виду.' },
        { id: 'css_templates', title: 'Шаблоны', description: '14 заготовок для частых приёмов.' },
      ],
      ru: {
        title: 'Свой CSS',
        lead: 'Применяет ваш CSS поверх стилей ВКонтакте и даёт основные инструменты полноценного редактора.',
        how: [
          'Мастер‑переключатель отвечает за применение сохранённого кода. Можно временно отключить стили, не удаляя текст.',
          '**Применить** показывает текущий черновик на странице, **Сохранить** записывает его в настройки. `Ctrl+S` также сохраняет код.',
          'Доступны подсветка синтаксиса, номера строк, автоотступы и скобки, отмена/повтор, форматирование, копирование и очистка.',
          'В 14 шаблонах есть скрытие элемента, цвета, скругления, тени, hover‑эффект, flex‑центрирование, градиент, фиксированная шапка и другие заготовки.',
          'Селекторы VK могут быть специфичнее вашего правила. Добавляйте `!important` только точечно; слишком общие селекторы вроде `div` способны сломать весь макет.',
        ],
        access: 'Ctrl/Cmd + K → «Свой CSS» или вкладка «CSS».',
      },
      en: {
        title: 'Custom CSS',
        lead: 'Applies your CSS over VK’s styles and provides the essentials of a real code editor.',
        how: [
          'The master switch controls whether saved code is active. Disable styles temporarily without deleting the text.',
          '**Apply** previews the current draft; **Save** stores it in settings. `Ctrl+S` saves as well.',
          'The editor includes syntax highlighting, line numbers, indentation and bracket help, undo/redo, formatting, copy, and clear.',
          'Fourteen templates cover hiding elements, colors, radii, shadows, hover effects, flex centering, gradients, sticky headers, and more.',
          'VK selectors can outrank your rule. Add `!important` only where needed; broad selectors such as `div` can break the whole layout.',
        ],
        access: 'Ctrl/Cmd + K → “Custom CSS”, or open the “CSS” tab.',
      },
    },
  ],
}

const moreDocs = {
  slug: 'more',
  heroIcon: 'settings',
  ru: {
    nav: 'Ещё',
    title: 'Вкладка «Ещё»',
    subtitle: 'Производительность, язык, диагностика, резервные копии и ссылки проекта.',
    seoTitle: 'Документация VKify — вкладка «Ещё»',
    seoDescription: 'Performance Dashboard, язык, диагностика API, экспорт, импорт и сброс настроек VKify.',
  },
  en: {
    nav: 'More',
    title: 'The “More” tab',
    subtitle: 'Performance, language, diagnostics, backups, and project links.',
    seoTitle: 'VKify documentation — the “More” tab',
    seoDescription: 'Performance Dashboard, language, API diagnostics, export, import, and settings reset in VKify.',
  },
  features: [
    {
      anchor: 'performance_dashboard',
      icon: 'activity',
      category: 'performance',
      subfeatures: [
        { id: 'perf_metrics', title: 'Метрики', description: 'Heap, инициализация, API, стили, скрипты и observer-подписки.' },
        { id: 'perf_widget', title: 'Мини-виджет', description: 'FPS, фичи, API и память поверх vk.ru.' },
        { id: 'perf_charts', title: 'Графики', description: 'Загрузка, API-вызовы, DOM-мутации и observer-подписки.' },
        { id: 'perf_features', title: 'Реестр функций', description: 'Группировка по весу и категории.' },
        { id: 'perf_export', title: 'Экспорт отчёта', description: 'JSON-снимок телеметрии и состояния функций.' },
      ],
      ru: {
        title: 'Performance Dashboard',
        lead: 'Показывает в реальном времени, как VKify влияет на страницу, popup и фоновый процесс.',
        how: [
          'Метрики обновляются раз в секунду: память страницы/popup/worker, время инициализации, тяжёлые функции, API‑вызовы, объём стилей и скриптов, observer‑подписки.',
          'Графики показывают загрузку страницы, API‑вызовы в минуту, DOM‑мутации и число подписок. Heap страницы доступен только в Chromium.',
          'В реестре функции сгруппированы по весу и категории; видны порядок запуска, зависимости и использование DOM‑слоя.',
          'Мини‑виджет выводит FPS, активные функции, API и heap поверх `vk.ru`; его позицию можно сбросить.',
          '`Reset heavy` отключает активные тяжёлые функции. `Export` сохраняет JSON‑отчёт для диагностики или обращения в поддержку.',
          'Для метрик самой страницы нужна открытая вкладка VK; без неё доступны только данные popup и фонового процесса.',
        ],
        access: 'Ctrl/Cmd + K → «Performance Dashboard» или «Ещё» → «Производительность».',
      },
      en: {
        title: 'Performance Dashboard',
        lead: 'Shows in real time how VKify affects the page, popup, and background process.',
        how: [
          'Metrics refresh every second: page/popup/worker memory, initialization time, heavy features, API calls, style and script size, and observer subscriptions.',
          'Charts cover page load, API calls per minute, DOM mutations, and subscriptions. Page heap is Chromium-only.',
          'The registry groups features by impact and category and shows initialization order, dependencies, and DOM-layer use.',
          'A mini widget can display FPS, active features, API, and heap over `vk.ru`; its position can be reset.',
          '`Reset heavy` disables active heavy features. `Export` saves a JSON report for diagnostics or support.',
          'Page metrics require an open VK tab; without one, only popup and background-process data are available.',
        ],
        access: 'Ctrl/Cmd + K → “Performance Dashboard”, or “More” → “Performance”.',
      },
    },
    {
      anchor: 'language',
      icon: 'globe',
      category: 'interface',
      subfeatures: [
        { id: 'language_ru', title: 'Русский', description: 'Русский интерфейс popup.' },
        { id: 'language_en', title: 'English', description: 'English popup interface.' },
      ],
      ru: {
        title: 'Язык интерфейса',
        lead: 'Переключает язык popup между русским и английским.',
        how: [
          'Выбор применяется сразу, без перезагрузки расширения. Настройка меняет только интерфейс VKify и не влияет на язык самого ВКонтакте.',
        ],
        access: '«Ещё» → «Язык».',
      },
      en: {
        title: 'Interface language',
        lead: 'Switches the popup between Russian and English.',
        how: [
          'The choice applies immediately without reloading the extension. It changes VKify only, not VK’s own language.',
        ],
        access: '“More” → “Language”.',
      },
    },
    {
      anchor: 'api_method',
      icon: 'flash',
      category: 'diagnostics',
      subfeatures: [
        { id: 'api_status', title: 'Метод API', description: 'Нативный API, токен или недоступное состояние.' },
        { id: 'diagnostics', title: 'Диагностика', description: 'Сводка состояния расширения и доступов.' },
      ],
      ru: {
        title: 'Метод API и диагностика',
        lead: 'Показывает, каким способом VKify обращается к VK API, и помогает найти причину неработающей функции.',
        how: [
          '**Нативный API** использует возможности открытой вкладки VK без отдельного токена; **Token API** выполняет запросы с токеном доступа.',
          'Если API недоступен, откройте `vk.ru` и нажмите обновление статуса. Функции друзей, диалогов и слежки без API могут быть ограничены.',
          'Кнопка «Диагностика расширения» открывает техническую сводку, которую удобно приложить к сообщению об ошибке.',
        ],
        access: '«Ещё» → «Метод API».',
      },
      en: {
        title: 'API method and diagnostics',
        lead: 'Shows how VKify reaches the VK API and helps identify why a feature is unavailable.',
        how: [
          '**Native API** uses an open VK tab without a separate token; **Token API** sends requests with an access token.',
          'If the API is unavailable, open `vk.ru` and refresh the status. Friends, dialogs, and tracking features may otherwise be limited.',
          'Extension Diagnostics opens a technical summary suitable for attaching to a bug report.',
        ],
        access: '“More” → “API method”.',
      },
    },
    {
      anchor: 'export_settings',
      icon: 'download',
      category: 'data',
      subfeatures: [
        { id: 'export_settings', title: 'Экспорт настроек', description: 'Сохраняет резервную копию в JSON.' },
        { id: 'import_settings', title: 'Импорт настроек', description: 'Восстанавливает данные из файла VKify.' },
        { id: 'reset_settings', title: 'Сбросить всё', description: 'Возвращает настройки по умолчанию.' },
      ],
      ru: {
        title: 'Управление данными',
        lead: 'Создаёт резервную копию настроек, восстанавливает её или возвращает расширение к исходному состоянию.',
        how: [
          '**Экспорт** скачивает JSON‑файл с настройками и локальными данными, поддерживаемыми текущей версией.',
          '**Импорт** принимает JSON VKify, проверяет формат и применяет значения. После импорта просмотрите приватность, хоткеи и автоматизацию — они могли отличаться на другом устройстве.',
          '**Сбросить всё** возвращает значения по умолчанию и требует подтверждения. Действие необратимо, поэтому перед ним сделайте экспорт.',
        ],
        access: 'Ctrl/Cmd + K → «Экспорт настроек», «Импорт настроек» или «Сбросить настройки».',
      },
      en: {
        title: 'Data management',
        lead: 'Creates a settings backup, restores one, or returns the extension to its initial state.',
        how: [
          '**Export** downloads a JSON file with settings and local data supported by the current version.',
          '**Import** accepts a VKify JSON file, validates it, and applies the values. Review privacy, hotkeys, and automation afterward because they may differ between devices.',
          '**Reset all** restores defaults and asks for confirmation. It is irreversible, so export first.',
        ],
        access: 'Ctrl/Cmd + K → “Export settings”, “Import settings”, or “Reset settings”.',
      },
    },
    {
      anchor: 'project_links',
      icon: 'share',
      category: 'support',
      subfeatures: [
        { id: 'website', title: 'vkify.ru', description: 'Официальный сайт проекта.' },
        { id: 'telegram', title: 'Telegram', description: 'Новости и сообщество.' },
        { id: 'vk', title: 'Группа VK', description: 'Официальная страница ВКонтакте.' },
        { id: 'github', title: 'GitHub', description: 'Исходный код и сообщения об ошибках.' },
        { id: 'donate', title: 'Поддержать', description: 'Финансовая поддержка проекта.' },
      ],
      ru: {
        title: 'Ссылки и поддержка',
        lead: 'Быстрый доступ к официальному сайту, сообществам, исходному коду и поддержке проекта.',
        how: [
          'Все ссылки открываются в новой вкладке. Для багов используйте GitHub Issues и приложите экспорт из Performance Dashboard или окно диагностики, если проблема техническая.',
        ],
        access: 'Нижний блок вкладки «Ещё».',
      },
      en: {
        title: 'Links and support',
        lead: 'Quick access to the official site, communities, source code, and ways to support the project.',
        how: [
          'Links open in a new tab. For bugs, use GitHub Issues and attach a Performance Dashboard export or diagnostics summary when relevant.',
        ],
        access: 'The bottom block of the “More” tab.',
      },
    },
  ],
}

/**
 * Современный слой данных для React-компонентов.
 *
 * Старые поля `slug`, `ru/en` и `features` сохраняются, чтобы текущая страница
 * документации оставалась совместимой. Одновременно каждый раздел и блок
 * получает стабильные `id`, `title`, `description`, `category` и
 * `subfeatures` — их можно напрямую использовать в меню, поиске, карточках,
 * хлебных крошках и будущей типизированной схеме без повторного парсинга текста.
 */
const ITEM_IDS_BY_FEATURE = {
  profile: ['hide_emoji_status', 'hide_stories_discover', 'hide_promo_link', 'hide_profile_right_column'],
  feed: ['hide_stories', 'hide_post_box', 'hide_post_comments', 'hide_feed_right_column'],
  messenger: ['hide_recommended_channels'],
  friends: ['hide_friends_suggestions'],
  communities: ['hide_recent_groups'],
  music: ['hide_audio_ads'],
  menu: ['hidden_menu_items', 'hide_menu_settings', 'hide_menu_counters'],
  global: ['hide_recommendations', 'hide_mini_chat', 'hide_scroll_top'],
  ad_blocking: ['block_left_ads', 'block_feed_ads_api', 'block_feed_ads_dom', 'block_trackers'],
  anti_tracking: ['prevent_typing', 'prevent_read', 'blur_on_unfocus'],
  hidden_dialogs: ['hidden_dialogs', 'hide_dialogs_hotkey'],
}

function normalizeFeature(feature, docId) {
  const items = feature.ru?.items ?? []
  const how = feature.ru?.how ?? []
  const itemIds = ITEM_IDS_BY_FEATURE[feature.anchor] ?? []
  const fallbackSubfeatures = items.length > 0
    ? items.map((item, index) => ({
        id: itemIds[index] ?? `${feature.anchor}_${index + 1}`,
        title: item.title,
        description: item.desc,
      }))
    : how.map((text, index) => {
        const match = text.match(/^\*\*([^*]+?)\.?\*\*\s*(.*)$/)
        return {
          id: `${feature.anchor}_${index + 1}`,
          title: match?.[1] ?? `${feature.ru?.title ?? feature.anchor} · ${index + 1}`,
          description: match?.[2] ?? text,
        }
      })

  return {
    ...feature,
    id: feature.id ?? feature.anchor,
    title: feature.title ?? feature.ru?.title ?? feature.anchor,
    description: feature.description ?? feature.ru?.lead ?? '',
    category: feature.category ?? docId,
    subfeatures: feature.subfeatures ?? fallbackSubfeatures,
  }
}

function normalizeDoc(doc) {
  const features = doc.features.map((feature) => normalizeFeature(feature, doc.slug))
  return {
    ...doc,
    id: doc.id ?? doc.slug,
    popupTab: doc.popupTab ?? doc.id ?? doc.slug,
    route: `/docs/${doc.slug}`,
    title: doc.title ?? doc.ru.title,
    description: doc.description ?? doc.ru.subtitle,
    category: doc.category ?? 'popup',
    subfeatures: features.map(({ id, title, description, category }) => ({
      id,
      title,
      description,
      category,
    })),
    features,
  }
}

const appearanceDocs = {
  ...viewDocs,
  id: 'appearance',
  popupTab: 'appearance',
  features: [
    ...viewDocs.features.slice(0, 7),
    builtinPresetsFeature,
    ...viewDocs.features.slice(7),
  ],
}

// Порядок в точности повторяет constants/tabs.ts из расширения.
export const DOCS = [
  appearanceDocs,
  hidingDocs,
  centerDocs,
  notesDocs,
  privacyDocs,
  onlineSpyDocs,
  scriptsDocs,
  adsDocs,
  cssDocs,
  moreDocs,
].map(normalizeDoc)

// Все вкладки документированы. Экспорт оставлен для обратной совместимости с
// текущим Docs.jsx, который умеет показывать неактивные разделы «Позже».
export const COMING_SOON = []

export const docsSlugs = DOCS.map((d) => d.slug)

/** Секция документации по slug (или первая, если slug не задан/неизвестен). */
export function getDocBySlug(slug) {
  return DOCS.find((d) => d.slug === slug) ?? DOCS[0]
}
