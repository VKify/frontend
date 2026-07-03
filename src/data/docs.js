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
          { title: 'Окно авторизации', desc: 'Всплывающие окна входа и баннеры' },
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
          { title: 'Login popup', desc: 'Pop-up sign-in windows and banners' },
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
        lead: 'Невидимка через VK API: вас не видно в сети — но и чужой онлайн вы тоже перестаёте видеть. Нужен открытый таб ВК для доступа к API.',
        how: [
          'Статус переключается одним тумблером и применяется на стороне ВК.',
          'Это симметрично: скрыли себя — не видите и других.',
        ],
        access: 'Ctrl/Cmd + K → «Скрыть онлайн-статус».',
      },
      en: {
        title: 'Hide online status',
        lead: 'Invisible mode via the VK API: you’re hidden from the online list — but you stop seeing others’ online status too. Needs an open VK tab for API access.',
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

export const DOCS = [viewDocs, hidingDocs, adsDocs, privacyDocs]

// Остальные вкладки расширения — документация по ним появится позже. Показываем
// в переключателе неактивными чипами с пометкой «Позже», без отдельных страниц
// и без пререндера. Порядок и подписи — как в самом расширении (constants/tabs).
export const COMING_SOON = [
  { slug: 'center',    heroIcon: 'download',   ru: { nav: 'Центр' },     en: { nav: 'Center' } },
  { slug: 'notes',     heroIcon: 'bookmark',   ru: { nav: 'Заметки' },   en: { nav: 'Notes' } },
  { slug: 'onlinespy', heroIcon: 'activity',   ru: { nav: 'Слежка' },    en: { nav: 'Tracking' } },
  { slug: 'scripts',   heroIcon: 'flash',      ru: { nav: 'Скрипты' },   en: { nav: 'Scripts' } },
  { slug: 'css',       heroIcon: 'code',       ru: { nav: 'CSS' },       en: { nav: 'CSS' } },
  { slug: 'more',      heroIcon: 'settings',   ru: { nav: 'Ещё' },       en: { nav: 'More' } },
]

export const docsSlugs = DOCS.map((d) => d.slug)

/** Секция документации по slug (или первая, если slug не задан/неизвестен). */
export function getDocBySlug(slug) {
  return DOCS.find((d) => d.slug === slug) ?? DOCS[0]
}
