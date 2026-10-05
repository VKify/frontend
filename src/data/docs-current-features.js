// Guides synchronized with the current extension, including Center API actions.
// These are user-facing guides; storage migration details live in the extension.
const article = (anchor, icon, ru, en) => ({ anchor, icon, ru, en })

export const WIDGETS_DOC = {
  slug: 'widgets', heroIcon: 'layout', overviewMedia: { type: 'screenshot', file: 'overview.png' },
  ru: {
    nav: 'Виджеты', title: 'Вкладка «Виджеты»',
    subtitle: 'Видимость и размещение семи виджетов: часы, мини-плеер, эквалайзер, визуализатор, тексты песен, загрузки и производительность.',
    seoTitle: 'Документация — вкладка «Виджеты»',
    seoDescription: 'Как включить виджеты VKify, разместить их свободно или в общей панели, изменить порядок, ширину и прозрачность.',
  },
  en: {
    nav: 'Widgets', title: 'The “Widgets” tab',
    subtitle: 'Visibility and placement for seven widgets: clock, mini player, equalizer, visualizer, lyrics, downloads and performance.',
    seoTitle: 'Documentation — the “Widgets” tab',
    seoDescription: 'Enable VKify widgets, arrange them freely or in a shared panel, and change their order, width and opacity.',
  },
  features: [
    article('available_widgets', 'layout', {
      title: 'Доступные виджеты', lead: 'Управление видимостью и размещением каждого инструмента на странице VK.',
      how: ['Включите нужные виджеты в списке. Переключатели согласованы с настройками функций и меню виджетов на странице VK.', 'Раскройте карточку и выберите свободное размещение или общую панель. В панели меняйте порядок стрелками вверх и вниз.', 'Сброс положения отдельного виджета возвращает его к исходному размещению. Настройки звучания, текстов, часов и других функций остаются в соответствующих разделах «Центра», «Вида» и «Ещё».'],
      access: '«Виджеты» → «Доступные виджеты».',
    }, {
      title: 'Available widgets', lead: 'Control each tool’s visibility and placement on VK.',
      how: ['Enable the widgets you need. Switches stay synchronized with feature settings and on-page widget menus.', 'Expand a card and choose free placement or the shared panel. Use the up and down arrows to reorder panel widgets.', 'Reset a widget’s position to restore its default placement. Sound, lyrics, clock and other feature options remain in their respective Center, View and More sections.'],
      access: 'Widgets → Available widgets.',
    }),
    article('widget_stack', 'layout', {
      title: 'Панель и её оформление', lead: 'Объединяет выбранные виджеты в настраиваемую панель.',
      how: ['Разместите панель слева, справа или свободно; выберите выравнивание сверху, по центру или снизу.', 'Настройте запуск в свёрнутом виде и анимацию. Измените ширину от 240 до 600 px, прозрачность от 40 до 100% и расстояние между виджетами от 0 до 80 px.', 'Свободные положения сохраняются. Сброс всех позиций возвращает расположение панели и виджетов, сохраняя другие параметры оформления.'],
      access: '«Виджеты» → настройки панели и оформления.',
    }, {
      title: 'Panel and appearance', lead: 'Combine selected widgets in a configurable panel.',
      how: ['Place the panel on the left, right or freely; align it to the top, center or bottom.', 'Configure collapsed startup and animation. Set width from 240 to 600 px, opacity from 40 to 100%, and widget spacing from 0 to 80 px.', 'Free positions are saved. Reset all positions to restore panel and widget placement while retaining other appearance options.'],
      access: 'Widgets → panel and appearance settings.',
    }),
  ],
}

export const CURRENT_FEATURES = {
  center: [
    article('bulk_actions', 'layout', {
      title: 'Массовые действия', lead: 'Очередь действий с выбранными данными аккаунта через VK API.',
      how: ['Сначала загрузите данные и выберите элементы. Доступны действия с друзьями и заявками, отписка от сообществ, удаление сохранённых видео или добавление в альбом, скачивание вложений, сохранение ссылок в закладки и отметка диалогов прочитанными.', 'Выберите паузу от 1 до 30 секунд. Перед запуском расширение покажет список названий и ID: проверьте его и подтвердите действие.', 'Остановка отменяет следующие действия; уже отправленный запрос должен завершиться. Отчёт показывает успехи, ошибки и оставшиеся элементы, экспортируется в JSON. Продолжение оставшегося списка требует нового подтверждения.', 'Закрытие страницы или смена аккаунта прекращает выполнение. Ошибки авторизации, капча, ограничения частоты и неопределённый результат останавливают очередь; ошибки доступа к отдельному объекту могут быть пропущены. Авто-добавление друзей и парсер участников используют свои отдельные лимиты.'],
      access: '«Центр» → нужная страница данных аккаунта → выбор элементов.',
    }, {
      title: 'Bulk actions', lead: 'A queue of VK API actions on selected account data.',
      how: ['Load data and select items first. Actions cover friends and requests, community unsubscriptions, removing saved videos or adding them to an album, downloading attachments, bookmarking links and marking conversations read.', 'Choose a pause from 1 to 30 seconds. Before starting, review the list of names and IDs and confirm the action.', 'Stop cancels upcoming actions; an already dispatched request must finish. Export the report of successes, errors and remaining items as JSON. Continuing the remaining list requires another confirmation.', 'Closing the page or changing accounts stops execution. Authentication errors, CAPTCHA, rate limits and uncertain results stop the queue; object-specific access errors may be skipped. Auto add friends and Member parser use their own separate limits.'],
      access: 'Center → the relevant account-data page → select items.',
    }),
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
      how: ['Откройте «Мессенджер» → «Файлы диалогов». В режиме одного диалога выберите переписку и тип вложений; продолжение загружает следующую порцию.', '«Все диалоги» собирает общую библиотеку по вашему запросу. Видны количество найденных файлов, охват диалогов и пропущенные переписки; это не обещание полного архива.', 'Фильтруйте по типу и диалогу, ищите по названию и сортируйте по дате. Карточка открывает файл или исходное сообщение.', 'Сбор можно остановить и продолжить. Кнопка загрузки более старых файлов расширяет результаты; поиск охватывает уже загруженные данные. Выберите вложения для скачивания или сохранения HTTPS-ссылок в закладки VK. Можно экспортировать список в JSON; перед выполнением проверьте выбранные элементы и подтвердите действие.'],
      access: '«Центр» → «Мессенджер» → «Данные аккаунта · VK API».',
    }, {
      title: 'Dialog files', lead: 'Attachments from one conversation or a combined conversation library.',
      how: ['Open Messenger → Dialog files. In single-dialog mode, choose a conversation and attachment type; load more to fetch the next batch.', 'All dialogs builds a combined library on request. File totals, conversation coverage and skipped dialogs show how much was scanned; the result is not necessarily a complete archive.', 'Filter by type or conversation, search titles and sort by date. Cards open the file or its original message.', 'Stop and resume collection, or load older files to extend the results. Search covers loaded data. Select attachments to download or save HTTPS links to VK bookmarks. Export the list as JSON; review the selected items and confirm before running an action.'],
      access: 'Center → Messenger → Account data · VK API.',
    }),
    article('messages-stats', 'message', {
      title: 'Статистика диалогов', lead: 'Активность переписок и топ диалогов по числу сообщений.',
      how: ['Откройте страницу и загрузите данные. Сводка, поиск и сортировка помогают сравнить личные диалоги и беседы.', 'Количество сообщений в первичной сводке может быть приблизительным. Выберите переписки для точного уточнения; ограничение выбора отображается в интерфейсе.', 'Можно остановить запросы и обновить сводку. Сбор статистики не отмечает сообщения прочитанными. Для выбранных непрочитанных переписок доступно отдельное действие отметки прочтения с проверкой списка и подтверждением.'],
      access: '«Центр» → «Мессенджер» → «Статистика диалогов».',
    }, {
      title: 'Dialog statistics', lead: 'Conversation activity and top dialogs by message count.',
      how: ['Open the page and load data. Summary cards, search and sorting compare personal and group conversations.', 'Initial message counts may be approximate. Select conversations for exact refinement; the selection limit is shown in the interface.', 'Requests can be stopped and the overview refreshed. Collecting statistics never marks messages as read. Selected unread conversations can be marked read through a separate action with a list review and confirmation.'],
      access: 'Center → Messenger → Dialog statistics.',
    }),
    article('subscriptions', 'users3', {
      title: 'Обзор подписок', lead: 'Сообщества, активность публикаций и список для ручного разбора.',
      how: ['Загрузите подписки, затем запустите проверку активности. Порог неактивности можно менять; недоступная дата остаётся неизвестной.', 'Поиск и фильтры выделяют активные, неактивные, закрытые и недоступные сообщества. Закреплённая запись не подменяет дату последней публикации.', 'Выберите сообщества и экспортируйте CSV, либо откройте выбранные страницы в VK для ручного разбора. Для выбранного списка доступна отписка через VK API: проверьте названия и ID, задайте паузу и подтвердите запуск.'],
      access: '«Центр» → «Сообщества» → «Данные аккаунта · VK API».',
    }, {
      title: 'Subscription overview', lead: 'Subscribed communities, posting activity and a list for manual review.',
      how: ['Load subscriptions, then check activity. Change the inactivity threshold; unavailable publication dates remain unknown.', 'Search and filters show active, inactive, closed and unavailable communities. A pinned post does not replace the latest publication date.', 'Select communities to export as CSV or open their VK pages for manual review. To unsubscribe through the VK API, review the selected names and IDs, set a pause and confirm.'],
      access: 'Center → Communities → Account data · VK API.',
    }),
    article('photo-catalog', 'download', {
      title: 'Каталог фотографий', lead: 'Поиск, альбомы, загрузка и управление фотографиями вашего аккаунта VK.',
      how: ["Один выбранный элемент скачивается отдельным файлом. Для нескольких выберите ZIP с папкой photos, videos или documents либо отдельные файлы через загрузки браузера. ZIP разбивается на части примерно по 512 МБ; один файл — до 3 ГБ. Не закрывайте страницу во время подготовки архива. Для видео можно выбрать качество MP4; если его нет, используется ближайшее доступное. Ошибочные и не начатые файлы можно повторить, а при ошибке ZIP — скачать отдельно.", 'Загрузите фототеку, выберите альбом, найдите фотографии по подписи и отсортируйте по дате. Выбранные фото можно скачать, переместить в альбом или удалить после проверки списка.', 'Для загрузки выберите существующий альбом или задайте название нового. Лимиты VKify: до 10 файлов за запуск, до 20 МБ на файл; JPG, JPEG, PNG, GIF и WEBP. Пустые файлы и неподдерживаемые форматы не отправляются.', 'Пауза между файлами — от 3 секунд, между запросами API — не менее 1,1 секунды. При ограничении VK, капче или ошибке очередь остановится с кодом и именем файла. Успешные файлы убираются из очереди, не начатые остаются; перед повтором проверьте каталог на дубли.'],
      access: '«Центр» → «Фото» → «Каталог фотографий».',
    }, {
      title: 'Photo catalog', lead: 'Search, albums, uploads and management for photos in your VK account.',
      how: ["One selected item downloads separately. For multiple items choose a ZIP with a photos, videos or documents folder, or separate files through browser downloads. ZIP archives split into parts of about 512 MB; each file can be up to 3 GB. Keep the page open while preparing an archive. Choose MP4 video quality; if unavailable, the nearest available option is used. Retry failed or unstarted files, or download them separately if ZIP fails.", 'Load your photo library, select an album, search captions and sort by date. Download, move or delete selected photos after reviewing the list.', 'Upload to an existing album or enter a new album name. VKify limits each run to 10 files and each file to 20 MB; JPG, JPEG, PNG, GIF and WEBP. Empty files and unsupported formats are rejected before upload.', 'Files are spaced at least 3 seconds apart and API calls at least 1.1 seconds apart. VK restrictions, CAPTCHA or errors stop the queue with a code and filename. Successful files leave the queue; unstarted files remain. Check the catalog for duplicates before retrying.'],
      access: 'Center → Photos → Photo catalog.',
    }),
    article('document-catalog', 'download', {
      title: 'Каталог документов', lead: 'Документы VK с поиском по названию и тегам, фильтрами и загрузкой файлов.',
      how: ["Один выбранный элемент скачивается отдельным файлом. Для нескольких выберите ZIP с папкой photos, videos или documents либо отдельные файлы через загрузки браузера. ZIP разбивается на части примерно по 512 МБ; один файл — до 3 ГБ. Не закрывайте страницу во время подготовки архива. Для видео можно выбрать качество MP4; если его нет, используется ближайшее доступное. Ошибочные и не начатые файлы можно повторить, а при ошибке ZIP — скачать отдельно.", 'Откройте документы в «Центре» и загрузите список. Фильтруйте по типу, сортируйте по названию, дате и размеру; скачивайте выбранные файлы или удаляйте после проверки списка.', 'Перетащите файлы или выберите их с компьютера. Для одного файла можно задать название; теги применяются ко всей очереди. Лимиты VKify: до 10 файлов за запуск и до 200 МБ на файл. У документов нет альбомов.', 'Выберите паузу от 3 секунд. API-запросы дополнительно разделяются паузой 1,1 секунды. Ошибка останавливает очередь; отчёт показывает сохранённые, ошибочные и не начатые файлы. Код VK помогает отличить ограничения, капчу и отсутствие доступа. Перед повтором проверьте каталог.'],
      access: '«Центр» → «Документы».',
    }, {
      title: 'Document catalog', lead: 'Your VK documents with title/tag search, filters and file uploads.',
      how: ["One selected item downloads separately. For multiple items choose a ZIP with a photos, videos or documents folder, or separate files through browser downloads. ZIP archives split into parts of about 512 MB; each file can be up to 3 GB. Keep the page open while preparing an archive. Choose MP4 video quality; if unavailable, the nearest available option is used. Retry failed or unstarted files, or download them separately if ZIP fails.", 'Open Documents in Center and load the list. Filter by type and sort by title, date or size. Download selected files or delete them after reviewing the list.', 'Drop files or choose them from your computer. Set a title for one file; tags apply to the entire queue. VKify limits each run to 10 files and each file to 200 MB. Documents do not have albums.', 'Choose a file delay of at least 3 seconds. API requests are also spaced at least 1.1 seconds apart. Errors stop the queue; the report lists saved, failed and unstarted files. VK codes distinguish limits, CAPTCHA and access failures. Check the catalog before retrying.'],
      access: 'Center → Documents.',
    }),
    article('video-catalog', 'download', {
      title: 'Каталог сохранённых видео', lead: 'Сохранённая видеотека VK с поиском, альбомами и фильтрами.',
      how: ["Один выбранный элемент скачивается отдельным файлом. Для нескольких выберите ZIP с папкой photos, videos или documents либо отдельные файлы через загрузки браузера. ZIP разбивается на части примерно по 512 МБ; один файл — до 3 ГБ. Не закрывайте страницу во время подготовки архива. Для видео можно выбрать качество MP4; если его нет, используется ближайшее доступное. Ошибочные и не начатые файлы можно повторить, а при ошибке ZIP — скачать отдельно.", 'Загрузка своих видео: до 3 файлов за запуск и до 2 ГБ на файл (локальные лимиты VKify). Между файлами — от 3 секунд, между API-запросами — не менее 1,1 секунды. При ошибке очередь остановится с кодом VK; успешные файлы убраны, остальные остаются. Проверьте каталог перед повтором.', 'Нажмите «Загрузить видеотеку». Каталог загружает доступные аккаунту видео порциями; продолжайте загрузку, чтобы расширить поиск.', 'Выбирайте альбом и фильтруйте по длительности и доступности. Поиск работает по загруженным названиям; сортировка меняет порядок карточек.', 'Карточка открывает видео в VK. Недоступные ролики видны отдельно; для выбранных видео доступны удаление из сохранённых и добавление в выбранный альбом с проверкой списка и подтверждением. Список можно экспортировать в JSON.'],
      access: '«Центр» → «Видео» → «Каталог сохранённых видео».',
    }, {
      title: 'Saved video catalog', lead: 'Your saved VK video library with search, albums and filters.',
      how: ["One selected item downloads separately. For multiple items choose a ZIP with a photos, videos or documents folder, or separate files through browser downloads. ZIP archives split into parts of about 512 MB; each file can be up to 3 GB. Keep the page open while preparing an archive. Choose MP4 video quality; if unavailable, the nearest available option is used. Retry failed or unstarted files, or download them separately if ZIP fails.", 'Upload your own videos: up to 3 files per run and 2 GB per file (local VKify limits). Files are spaced at least 3 seconds apart and API calls at least 1.1 seconds apart. Errors stop the queue with a VK code; successful files leave the queue and others remain. Check the catalog before retrying.', 'Click Load video library. Available videos are loaded in batches; load more to expand search coverage.', 'Choose an album and filter by duration or availability. Search covers loaded titles; sorting changes the card order.', 'Cards open videos in VK. Unavailable entries are shown separately; selected videos can be removed from saved videos or added to a chosen album after a list review and confirmation. Export the list as JSON if needed.'],
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
      access: 'Вкладка «Виджеты» или меню виджета на странице VK.',
    }, {
      title: 'Widget stack', lead: 'A shared home for music tools, the clock and utility widgets.',
      how: ['Dock widgets in the stack or keep them floating. Order, visibility and positions are saved.', 'The mini player, equalizer, visualizer, lyrics, clock, downloads and performance widget share consistent state.', 'Hiding a widget or disabling its feature updates both the VK page and settings. Floating positions adapt to window changes.'],
      access: 'Widgets tab or widget menus on VK.',
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
      how: ['Главное меню открывает разделы; Ctrl/Cmd+K ищет функции и ведёт сразу к нужному пункту. Кнопка документации у настройки открывает соответствующую статью.', 'Боковая панель по умолчанию свёрнута; её можно раскрыть и настроить в «Ещё». Настройки доступны по значку расширения, пункту VKify в меню VK или адресу `vk.ru/vkify_settings`.', 'Иллюстрации заголовков можно выключить в «Ещё». Они учитывают тему и акцент; уменьшение анимации в системе учитывается интерфейсом.', 'В «Центре» действия с данными VK API отделены от инструментов страницы. API-страницы объясняют загрузку, охват и обновление данных.'], access: 'Вкладка «Ещё» и главное меню расширения.',
    }, {
      title: 'Extension interface', lead: 'Compact navigation, feature search and page appearance.',
      how: ['The main menu opens sections; Ctrl/Cmd+K searches features and navigates directly to a setting. Documentation buttons open the relevant guide.', 'The sidebar starts collapsed; expand it or configure it in More. Open settings from the extension icon, the VKify entry in VK’s menu, or `vk.ru/vkify_settings`.', 'Disable header illustrations in More. Illustrations follow the theme and accent; the interface respects system reduced-motion preferences.', 'Center separates VK API account tools from page tools. API pages explain loading, coverage and data refresh.'], access: 'More and the extension’s main menu.',
    }),
  ],
}

// Existing articles retain their stable anchors; expand their user instructions.
export const ARTICLE_ADDITIONS = {
  'view:share_theme': {
    ru: ['Страница /theme/ показывает настройки подключённого расширения или значения по умолчанию актуальной версии. Изменения видны в превью; «Применить» отправляет их в расширение, «Скопировать ссылку» создаёт общую ссылку с текущими параметрами.'],
    en: ['The /theme/ page shows settings from the connected extension or current-version defaults. Edits update the preview; Apply sends them to the extension, while Copy link creates a shared URL with the current settings.'],
  },
  'hiding:menu': {
    ru: ['Порядок пунктов и разделителей задаётся в настройках меню и сохраняется вместе с оформлением. Общая ссылка темы передаёт порядок и список скрытых пунктов.'],
    en: ['Menu settings control the order of items and dividers, saved with appearance settings. Shared themes include that order and the list of hidden items.'],
  },
  'hiding:menu': {
    ru: ['В «Пунктах меню» перемещайте пункты и разделители стрелками вверх и вниз. Порядок сохраняется; кнопка сброса возвращает стандартный порядок.', 'Пункт VKify открывает настройки на `vk.ru/vkify_settings`. Его можно скрыть и переместить, как остальные пункты.'],
    en: ['In Menu items, move entries and separators with the up and down arrows. The order is saved; Reset order restores the default.', 'The VKify entry opens settings at `vk.ru/vkify_settings`. Hide or reorder it like other entries.'],
  },
  'center:friends_audit': {
    ru: ['Для массовых действий выберите паузу от 1 до 30 секунд. Остановка отменяет следующие действия; уже отправленный запрос должен завершиться. После остановки можно проверить отчёт, экспортировать JSON и подтвердить продолжение оставшегося списка.', 'Ошибки авторизации, капча, ограничения частоты и неопределённый результат останавливают очередь. Ошибки доступа к отдельному объекту могут быть пропущены. При закрытии страницы или смене аккаунта выполнение прекращается.'],
    en: ['Choose a pause from 1 to 30 seconds for bulk actions. Stop cancels upcoming actions; an already dispatched request must finish. Review the report, export JSON and confirm before continuing the remaining list.', 'Authentication errors, CAPTCHA, rate limits and uncertain results stop the queue. Object-specific access errors may be skipped. Closing the page or changing accounts stops execution.'],
  },
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
