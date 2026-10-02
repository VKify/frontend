// Articles added after the documentation audit of extension commit 9728d595.
// These are user-facing guides; storage migration details live in the extension.
const article = (anchor, icon, ru, en) => ({ anchor, icon, ru, en })

export const CURRENT_FEATURES = {
  center: [
    article('auto_add_friends', 'users3', {
      title: 'Авто-добавление друзей', lead: 'Отправка заявок через VK API с заданными лимитами.',
      how: ['Выберите рекомендации, собственный список ID или ссылок на людей, файл TXT/CSV/JSON либо результат парсера участников.', 'Подтвердите риск перед запуском. Максимум 20 заявок в час, 50 в сутки и 20 за сессию, пауза от 30 секунд. Это ограничения расширения, а не гарантия безопасности аккаунта.', 'Прогресс сохраняется; любую ошибку, капчу или предупреждение VK скрипт обрабатывает остановкой. Используйте только на свой страх и риск.'],
      access: '«Центр» → «Друзья» → «Авто-добавление друзей».',
    }, {
      title: 'Auto add friends', lead: 'Send friend requests through the VK API with configured limits.',
      how: ['Choose recommendations, your own user IDs or links, a TXT/CSV/JSON file, or the member parser result.', 'Acknowledge the risk before starting. At most 20 requests per hour, 50 per day and 20 per session, with pauses of at least 30 seconds. These extension limits do not guarantee account safety.', 'Progress is saved; any VK error, CAPTCHA or warning stops the script. Use at your own risk.'],
      access: 'Center → Friends → Auto add friends.',
    }),
    article('group_members_parser', 'users3', {
      title: 'Парсер участников', lead: 'Список ID участников сообщества через VK API.',
      how: ['Выберите своё сообщество в списке с аватарами или укажите ссылку либо ID. Задайте лимит и запустите сбор.', 'Прогресс показывает сохранённые участники, загрузку страницы и время до следующего запроса. До 10 000 участников, страницы по 1 000 с паузой от 30 секунд; до 120 API-запросов в час и 500 в сутки, включая ошибки.', 'Любая ошибка, капча или предупреждение останавливает сбор; готовые страницы сохраняются. Скрытые участники недоступны, а меняющийся состав группы не является точным снимком.', 'Экспортируйте TXT, CSV или JSON. Список доступен в авто-добавлении друзей, включая частично собранный результат.'],
      access: '«Центр» → «Сообщества» → «Парсер участников».',
    }, {
      title: 'Member parser', lead: 'Community member IDs collected through the VK API.',
      how: ['Choose one of your communities using the avatar list, or enter its link or ID. Set a limit and start collection.', 'Live progress shows saved members, the current page and the next-request countdown. Up to 10,000 members, pages of 1,000 at least 30 seconds apart; up to 120 API calls per hour and 500 per day, including failures.', 'Any error, CAPTCHA or warning stops collection and preserves completed pages. Hidden members remain inaccessible; changing membership is not a point-in-time snapshot.', 'Export TXT, CSV or JSON, or use the list in Auto add friends. Partial results are available too.'],
      access: 'Center → Communities → Member parser.',
    }),
    article('music_visualizer', 'music', {
      title: 'Музыкальный визуализатор', lead: 'Анимация на странице VK, реагирующая на воспроизведение музыки.',
      how: ['Выберите вид анимации, цвета, интенсивность, прозрачность и положение. Пресеты дают готовые сочетания параметров.', 'Визуализатор можно разместить свободно или в панели виджетов. Настройки паузы определяют поведение без воспроизведения.', 'Тексты песен имеют отдельный переключатель и собственные настройки; для них не нужно менять режим визуализатора.'], access: '«Центр» → «Музыка» → «Визуализатор».',
    }, {
      title: 'Music visualizer', lead: 'An on-page animation responding to music playback.',
      how: ['Choose the animation, colors, intensity, opacity and placement. Presets provide ready-made combinations.', 'Keep the visualizer floating or add it to the widget stack. Pause settings control its behavior without playback.', 'Lyrics have their own switch and settings; they do not require changing the visualizer mode.'], access: 'Center → Music → Visualizer.',
    }),
    article('dialog-files', 'message', {
      title: 'Файлы диалогов', lead: 'Вложения одного диалога или общая библиотека переписок.',
      how: ['Откройте «Мессенджер» → «Файлы диалогов». В режиме одного диалога выберите переписку и тип вложений; продолжение загружает следующую порцию.', '«Все диалоги» собирает общую библиотеку по вашему запросу. Видны количество найденных файлов, охват диалогов и пропущенные переписки; это не обещание полного архива.', 'Фильтруйте по типу и диалогу, ищите по названию и сортируйте по дате. Карточка открывает файл или исходное сообщение.', 'Сбор можно остановить и продолжить. Кнопка загрузки более старых файлов расширяет результаты; поиск охватывает уже загруженные данные. Ничего не отправляется и не удаляется.'],
      access: '«Центр» → «Мессенджер» → «Данные аккаунта · VK API».',
    }, {
      title: 'Dialog files', lead: 'Attachments from one conversation or a combined conversation library.',
      how: ['Open Messenger → Dialog files. In single-dialog mode, choose a conversation and attachment type; load more to fetch the next batch.', 'All dialogs builds a combined library on request. File totals, conversation coverage and skipped dialogs show how much was scanned; the result is not necessarily a complete archive.', 'Filter by type or conversation, search titles and sort by date. Cards open the file or its original message.', 'Stop and resume collection, or load older files to extend the results. Search covers loaded data. The tool sends and deletes nothing.'],
      access: 'Center → Messenger → Account data · VK API.',
    }),
    article('messages-stats', 'message', {
      title: 'Статистика диалогов', lead: 'Активность переписок и топ диалогов по числу сообщений.',
      how: ['Откройте страницу и загрузите данные. Сводка, поиск и сортировка помогают сравнить личные диалоги и беседы.', 'Количество сообщений в первичной сводке может быть приблизительным. Выберите переписки для точного уточнения; ограничение выбора отображается в интерфейсе.', 'Можно остановить запросы и обновить сводку. Статистика не отмечает сообщения прочитанными и не меняет переписки.'],
      access: '«Центр» → «Мессенджер» → «Статистика диалогов».',
    }, {
      title: 'Dialog statistics', lead: 'Conversation activity and top dialogs by message count.',
      how: ['Open the page and load data. Summary cards, search and sorting compare personal and group conversations.', 'Initial message counts may be approximate. Select conversations for exact refinement; the selection limit is shown in the interface.', 'Requests can be stopped and the overview refreshed. Statistics never mark messages as read or modify conversations.'],
      access: 'Center → Messenger → Dialog statistics.',
    }),
    article('subscriptions', 'users3', {
      title: 'Обзор подписок', lead: 'Сообщества, активность публикаций и список для ручного разбора.',
      how: ['Загрузите подписки, затем запустите проверку активности. Порог неактивности можно менять; недоступная дата остаётся неизвестной.', 'Поиск и фильтры выделяют активные, неактивные, закрытые и недоступные сообщества. Закреплённая запись не подменяет дату последней публикации.', 'Выберите сообщества и экспортируйте CSV, либо откройте выбранные страницы в VK для ручного разбора. Расширение не отписывает вас автоматически.'],
      access: '«Центр» → «Сообщества» → «Данные аккаунта · VK API».',
    }, {
      title: 'Subscription overview', lead: 'Subscribed communities, posting activity and a list for manual review.',
      how: ['Load subscriptions, then check activity. Change the inactivity threshold; unavailable publication dates remain unknown.', 'Search and filters show active, inactive, closed and unavailable communities. A pinned post does not replace the latest publication date.', 'Select communities to export as CSV or open their VK pages for manual review. The extension never unsubscribes automatically.'],
      access: 'Center → Communities → Account data · VK API.',
    }),
    article('video-catalog', 'download', {
      title: 'Каталог сохранённых видео', lead: 'Сохранённая видеотека VK с поиском, альбомами и фильтрами.',
      how: ['Нажмите «Загрузить видеотеку». Каталог загружает доступные аккаунту видео порциями; продолжайте загрузку, чтобы расширить поиск.', 'Выбирайте альбом и фильтруйте по длительности и доступности. Поиск работает по загруженным названиям; сортировка меняет порядок карточек.', 'Карточка открывает видео в VK. Недоступные ролики видны отдельно; каталог не удаляет их и не скачивает всю коллекцию автоматически.'],
      access: '«Центр» → «Видео» → «Каталог сохранённых видео».',
    }, {
      title: 'Saved video catalog', lead: 'Your saved VK video library with search, albums and filters.',
      how: ['Click Load video library. Available videos are loaded in batches; load more to expand search coverage.', 'Choose an album and filter by duration or availability. Search covers loaded titles; sorting changes the card order.', 'Cards open videos in VK. Unavailable entries are shown separately; the catalog neither deletes them nor automatically downloads the collection.'],
      access: 'Center → Video → Saved video catalog.',
    }),
    article('music_mini_player', 'music', {
      title: 'Мини-плеер', lead: 'Плавающий плеер VK с двумя режимами и быстрыми музыкальными инструментами.',
      how: ['Включите мини-плеер в разделе «Музыка». Доступны обычный и компактный режимы, перетаскивание, изменение размеров и закрепление.', 'Настройте автоматическое появление, свёрнутый запуск, кнопку скачивания и визуализатора. Alt+M по умолчанию показывает или скрывает плеер.', 'Эквалайзер, визуализатор и тексты открываются из плеера. Выключенный инструмент можно включить прямо оттуда; его состояние согласовано с настройками расширения.', 'Закрытие сохраняется до повторного открытия. Мини-плеер можно включить в общую панель виджетов.'],
      access: '«Центр» → «Музыка» → «Мини-плеер».',
    }, {
      title: 'Mini player', lead: 'A floating VK player with two layouts and quick music tools.',
      how: ['Enable the mini player under Music. Choose the regular or compact layout, drag, resize and pin it.', 'Configure automatic appearance, collapsed startup, download and visualizer buttons. Alt+M shows or hides the player by default.', 'Open the equalizer, visualizer and lyrics from the player. Disabled tools can be enabled there and stay synchronized with extension settings.', 'Closing remains in effect until the player is reopened. The player can join the shared widget stack.'],
      access: 'Center → Music → Mini player.',
    }),
    article('music_lyrics', 'music', {
      title: 'Текст на фоне', lead: 'Отдельный настраиваемый слой текста песни с синхронизацией по времени трека.',
      how: ['Включите «Тексты песен» в разделе «Музыка». Поиск использует исполнителя и название; совпадение для ремиксов и редких записей может отсутствовать.', 'Синхронизированный текст следует за воспроизведением и перемоткой. Если временных меток нет, показывается обычный текст.', 'Выберите пресет, шрифт, размер, выравнивание, число строк и расположение; можно добавить обложку и избегать перекрытия контента.', 'Тексты и визуализатор включаются независимо. Доступен экспорт TXT и, при наличии временных меток, LRC.'],
      access: '«Центр» → «Музыка» → «Текст на фоне».',
    }, {
      title: 'On-page lyrics', lead: 'A separate customizable lyrics layer synchronized with track playback.',
      how: ['Enable Lyrics under Music. Matching uses artist and title; rare recordings or remixes may not have a match.', 'Timed lyrics follow playback and seeking. Without timestamps, plain lyrics are displayed.', 'Choose a preset, font, size, alignment, line count and placement. Optional cover art and content avoidance refine the layout.', 'Lyrics and the visualizer work independently. Export TXT, or LRC when timestamps are available.'],
      access: 'Center → Music → Lyrics.',
    }),
    article('widget_stack', 'layout', {
      title: 'Панель виджетов', lead: 'Общее место для музыкальных инструментов, часов и служебных виджетов.',
      how: ['Добавляйте виджеты в панель или оставляйте их свободно на странице. Порядок, видимость и положения сохраняются.', 'Мини-плеер, эквалайзер, визуализатор, тексты, часы, загрузки и виджет производительности используют согласованное состояние.', 'Скрытие виджета и отключение функции учитываются и на странице, и в настройках; свободные позиции подстраиваются при изменении окна.'],
      access: 'Меню виджета на странице VK; музыкальные функции — «Центр» → «Музыка», часы — «Вид».',
    }, {
      title: 'Widget stack', lead: 'A shared home for music tools, the clock and utility widgets.',
      how: ['Dock widgets in the stack or keep them floating. Order, visibility and positions are saved.', 'The mini player, equalizer, visualizer, lyrics, clock, downloads and performance widget share consistent state.', 'Hiding a widget or disabling its feature updates both the VK page and settings. Floating positions adapt to window changes.'],
      access: 'Widget menu on VK; music settings in Center → Music, clock settings in View.',
    }),
  ],
  privacy: [
    article('prevent_story_views', 'eye', {
      title: 'Анонимный просмотр историй', lead: 'Блокирует отправку отметки просмотра истории из этого браузера.',
      how: ['Включите до открытия истории. Просмотр на другом устройстве или в другом клиенте этой настройкой не контролируется.'], access: '«Приватность» → «Истории анонимно».',
    }, {
      title: 'Anonymous story viewing', lead: 'Blocks story-view acknowledgements from this browser.',
      how: ['Enable before opening a story. Viewing from another device or client is outside this setting’s control.'], access: 'Privacy → Anonymous stories.',
    }),
    article('prevent_notification_read', 'eye', {
      title: 'Не читать уведомления', lead: 'Не отправляет VK отметку прочтения при открытии уведомлений.',
      how: ['Не отключает сами уведомления и не заменяет отдельную настройку прочтения сообщений. Действует в браузере с VKify.'], access: 'Вкладка «Приватность».',
    }, {
      title: 'Keep notifications unread', lead: 'Prevents VK read acknowledgements when you open notifications.',
      how: ['Notifications remain available. This is separate from message read protection and applies in the browser running VKify.'], access: 'The Privacy tab.',
    }),
  ],
  more: [
    article('telegram_notifications', 'message', {
      title: 'Уведомления в Telegram', lead: 'Один бот для новых сообщений VK и выбранных событий слежки.',
      how: ['Создайте бота через BotFather, начните с ним диалог, затем в «Ещё» укажите Bot Token и Chat ID. Включите уведомления и отправьте тест. Параметры бота задаются только здесь; токен не экспортируется в настройки.', '«Новые сообщения VK» — отдельный переключатель. Его копия в «Центр» → «Мессенджер» управляет той же настройкой; ссылка на настройку бота появляется при неактивном подключении.', 'Отдельно включайте текст сообщения, сообщения из бесед и учёт тихих диалогов VK. Без текста Telegram получает имя и ссылку на диалог.', 'Пересылка проверяет новые входящие сообщения раз в минуту, пока браузер на компьютере запущен. Вкладку VK можно закрыть; при истечении токена откройте VK снова. Это не автономная служба на телефоне.', 'Пересылка начинает отсчёт с новых сообщений после включения и не отмечает их прочитанными. Смена аккаунта, получателя или параметров начинает отсчёт заново.', 'Три независимых переключателя управляют событиями активности в сообщениях, онлайн-мониторинга и отслеживания профилей. Источники и пользователи выбираются во вкладке «Слежка»; включение доставки не включает сам мониторинг.'],
      access: '«Ещё» → «Уведомления в Telegram».',
    }, {
      title: 'Telegram notifications', lead: 'One bot for new VK messages and selected tracking events.',
      how: ['Create a bot through BotFather and start a conversation with it. Enter Bot Token and Chat ID in More, enable delivery and send a test. Bot credentials are configured only here; the token is excluded from settings exports.', 'New VK messages has its own switch. The shortcut switch in Center → Messenger controls the same setting; a bot-setup link appears when the connection is inactive.', 'Configure message previews, group conversations and respect for muted VK dialogs separately. Without previews, Telegram receives the name and a dialog link.', 'New incoming messages are checked once per minute while the desktop browser is running. The VK tab may be closed; reopen VK when its token expires. This is not an independent service running on your phone.', 'Forwarding starts with new messages after activation and never marks them as read. Changing the account, recipient or options restarts the baseline.', 'Three independent switches control message activity, online monitoring and profile tracking events. Choose sources and users in Tracking; enabling delivery does not enable monitoring itself.'],
      access: 'More → Telegram notifications.',
    }),
    article('interface', 'layout', {
      title: 'Интерфейс расширения', lead: 'Компактная навигация, поиск функций и оформление страниц.',
      how: ['Главное меню открывает разделы; Ctrl/Cmd+K ищет функции и ведёт сразу к нужному пункту. Кнопка документации у настройки открывает соответствующую статью.', 'Иллюстрации заголовков можно выключить в «Ещё». Они учитывают тему и акцент; уменьшение анимации в системе учитывается интерфейсом.', 'В «Центре» действия с данными VK API отделены от инструментов страницы. API-страницы объясняют загрузку, охват и обновление данных.'], access: 'Вкладка «Ещё» и главное меню расширения.',
    }, {
      title: 'Extension interface', lead: 'Compact navigation, feature search and page appearance.',
      how: ['The main menu opens sections; Ctrl/Cmd+K searches features and navigates directly to a setting. Documentation buttons open the relevant guide.', 'Disable header illustrations in More. Illustrations follow the theme and accent; the interface respects system reduced-motion preferences.', 'Center separates VK API account tools from page tools. API pages explain loading, coverage and data refresh.'], access: 'More and the extension’s main menu.',
    }),
  ],
}

// Existing articles retain their stable anchors; expand their user instructions.
export const ARTICLE_ADDITIONS = {
  'hiding:profile': {
    items: { ru: [{ title: 'Рекомендации друзей', desc: 'Блок рекомендаций на странице профиля, независимо от основной колонки' }], en: [{ title: 'Friend recommendations', desc: 'The profile recommendation block, independently of the main column' }] },
  },
  'hiding:messenger': {
    items: { ru: [{ title: 'Вкладка каналов', desc: 'Фильтр каналов в мессенджере' }, { title: 'Бизнес-уведомления', desc: 'Фильтр бизнес-уведомлений в мессенджере' }], en: [{ title: 'Channels tab', desc: 'The messenger channel filter' }, { title: 'Business notifications', desc: 'The messenger business-notification filter' }] },
  },
  'view:clock_enabled': {
    ru: ['Режим мини-виджета добавляет часы в общую панель виджетов или оставляет их плавающими. Свободное положение сохраняется относительно окна и остаётся доступным после изменения его размера.'],
    en: ['Mini-widget mode docks the clock in the widget stack or keeps it floating. Free placement is stored relative to the viewport and stays reachable after resizing.'],
  },
  'view:custom_background': {
    ru: ['Сброс к стандартному фону возвращает страницу к выбору нового фона. Для видео доступно действие «В обои» независимо от скачивания видео.'],
    en: ['Resetting to the default background returns to background selection. Videos offer Set as wallpaper independently of video downloads.'],
  },
  'center:video_download': {
    ru: ['На странице плейлиста доступно скачивание всей подборки: выберите качество и запустите очередь. Недоступные потоки могут быть пропущены.', 'Действие «В обои» доступно независимо от переключателя скачивания видео.'],
    en: ['Playlist pages also support downloading the collection: select quality and start the queue. Unavailable streams may be skipped.', 'Set as wallpaper works independently of the video-download switch.'],
  },
  'center:media_player_hotkeys': {
    ru: ['Эквалайзер открывается из плеера VK и мини-плеера. Если он выключен, действие позволяет включить инструмент непосредственно из плеера.'],
    en: ['Open the equalizer from the VK player or mini player. If disabled, the player action lets you enable it directly.'],
    access: { ru: '«Центр» → «Музыка» → «Хоткеи плеера» или «Эквалайзер».', en: 'Center → Music → Player hotkeys or Equalizer.' },
  },
  'ads:recommendations': {
    ru: ['Отдельный переключатель раздела «Видео» скрывает рекомендации и продвижение VK Premium. Блоки рекомендаций других разделов управляются независимо.'],
    en: ['A separate Video switch hides recommendations and VK Premium promotions. Recommendation blocks in other sections have independent switches.'],
  },
  'ads:ads_stats': {
    ru: ['Журнал также учитывает скрытые блоки рекомендаций разделов; сводка и фильтры помогают отличать их от рекламы и трекеров.'],
    en: ['The log also counts hidden section recommendation blocks; summaries and filters distinguish them from ads and trackers.'],
  },
  'onlinespy:profile_spy': {
    ru: ['Смена аватара определяется по идентификатору фотографии, а не временной CDN-ссылке: обновление адреса того же фото не создаёт событие. История показывает изменения с временем; её можно экспортировать.'],
    en: ['Avatar changes use the photo identifier rather than a temporary CDN URL: refreshing the same photo URL creates no change event. History shows timestamps and can be exported.'],
  },
}

export function addCurrentFeatures(doc) {
  return { ...doc, features: [...doc.features.map(feature => {
    const addition = ARTICLE_ADDITIONS[`${doc.slug}:${feature.anchor}`]
    if (!addition) return feature
    const result = { ...feature }
    for (const lang of ['ru', 'en']) result[lang] = {
      ...feature[lang], how: [...(feature[lang].how ?? []), ...(addition[lang] ?? [])],
      ...(addition.access ? { access: addition.access[lang] } : {}),
      ...(addition.items ? { items: [...(feature[lang].items ?? []), ...addition.items[lang]] } : {}),
    }
    return result
  }), ...(CURRENT_FEATURES[doc.slug] ?? [])] }
}
