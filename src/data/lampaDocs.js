const guideIcons = { install: 'smartphone', proxy: 'devices', server: 'server', local: 'computer', region: 'globe', update: 'refresh' }
function guide(anchor, ruTitle, enTitle, ru, en, commands) {
  return { anchor, icon: guideIcons[anchor], ru: { title: ruTitle, how: ru }, en: { title: enTitle, how: en }, commands }
}
export const lampaDocs = {
  slug: 'lampa', heroIcon: 'video',
  ru: { nav: 'Lampa', title: 'VKify для Lampa', subtitle: 'Подключение Android, Smart TV и компьютера. Установка своего сервера.', seoTitle: 'Документация VKify для Lampa' },
  en: { nav: 'Lampa', title: 'VKify for Lampa', subtitle: 'Connect Android, Smart TV and computers. Set up your own server.', seoTitle: 'VKify for Lampa documentation' },
  features: [
    guide('install', 'Android и Android TV: одна ссылка', 'Android and Android TV: one URL', [
      'В приложении Lampa откройте **Настройки → Расширения → Добавить плагин** и вставьте `https://vkify.ru/plugins/vkify.js`.',
      'Отключите прежнее расширение VKify, если оно уже было установлено, и полностью перезапустите Lampa.',
      'Оставьте поле прокси пустым: приложение с поддерживаемым мостом Lampa 16+ обращается к VK напрямую. Аккаунт VK не нужен.',
    ], [
      'In the Lampa Android app, open **Settings → Extensions → Add plugin** and enter `https://vkify.ru/plugins/vkify.js`.',
      'Disable any older VKify extension and fully restart Lampa.',
      'Leave the proxy field empty: apps with the supported Lampa 16+ bridge connect to VK directly. No VK account is required.',
    ]),
    guide('proxy', 'Smart TV, браузер и компьютер', 'Smart TV, browsers and computers', [
      'Для этих устройств используйте **персональную ссылку** от владельца сервера VKify. Если сервера ещё нет, разверните его по следующему разделу или используйте компьютер в домашней сети.',
      'В Lampa откройте **Настройки → Расширения → Добавить плагин** и вставьте ссылку целиком, например `https://YOUR_HOST:8444/a/KEY/vkify.js`. `YOUR_HOST` — ваш домен, `KEY` — личный ключ. Пример не является публичным сервером.',
      'Отключите прежнее расширение и полностью перезапустите Lampa. Прокси из персональной ссылки настроится автоматически: вручную адрес вводить не нужно.',
      'Храните ссылку как пароль. Не публикуйте её и не заменяйте личный ключ адресом VPN или обычного SOCKS/HTTP-прокси.',
    ], [
      'Use a **personal plugin URL** supplied by your VKify server operator. If you do not have a server, follow the next section or use a computer on your home network.',
      'In Lampa, open **Settings → Extensions → Add plugin** and paste the whole URL, such as `https://YOUR_HOST:8444/a/KEY/vkify.js`. Replace `YOUR_HOST` and `KEY` with your domain and personal key. This example is not a public server.',
      'Disable the old extension and fully restart Lampa. The personal URL configures the proxy automatically; no manual proxy entry is needed.',
      'Treat the URL like a password. Do not publish it or replace it with a VPN or generic SOCKS/HTTP proxy address.',
    ]),
    guide('server', 'Свой VPS: установка', 'Your VPS: installation', [
      'Подготовьте VPS с **российским исходящим IP**, Docker с Compose, Node.js 20+ и доменом, который указывает на сервер.',
      'Порты **80 и 8444** должны быть свободны и открыты в firewall сервера и панели хостинга.',
      'Выполните команды ниже. Установщик спросит домен без `https://`, создаст аккаунт и запустит HTTPS. Первый выпуск сертификата может занять несколько минут.',
      'Скопируйте выведенную персональную ссылку в расширения Lampa. Копия хранится на сервере в `private/access.txt`. Для остановки используйте `docker compose stop` из каталога проекта.',
    ], [
      'Prepare a VPS with a **Russian outgoing IP**, Docker Compose, Node.js 20+ and a domain pointing to the server.',
      'Ports **80 and 8444** must be free and allowed by your server and hosting firewall.',
      'Run the commands below. Enter the domain without `https://`. The installer creates an account and starts HTTPS; the first certificate may take a few minutes.',
      'Copy the resulting personal URL into Lampa extensions. A copy is saved in `private/access.txt`. Run `docker compose stop` from the project directory to stop the service.',
    ], 'git clone https://github.com/VKify/vkify-lampa.git\ncd vkify-lampa\nnode scripts/setup.mjs'),
    guide('local', 'Прокси на домашнем компьютере', 'Proxy on a home computer', [
      'Установите Node.js 20+, скачайте проект `https://github.com/VKify/vkify-lampa` и откройте терминал в его каталоге. Выполните команды ниже.',
      'На этом компьютере добавьте расширение `http://127.0.0.1:8787/vkify.js`, а в **Настройки → VKify → Прокси** укажите `http://127.0.0.1:8787/`.',
      'Для другого устройства замените `127.0.0.1` на IP компьютера из консоли в обоих адресах. Телевизор и компьютер должны быть в одной сети; разрешите доступ Node.js в firewall для частной сети.',
      'Компьютер должен оставаться включённым с работающим прокси. Этот локальный режим не публикуйте в интернете. Если HTTPS-страница блокирует локальный HTTP, используйте серверный вариант с доверенным HTTPS-сертификатом.',
    ], [
      'Install Node.js 20+, download `https://github.com/VKify/vkify-lampa` and open a terminal in its directory. Run the commands below.',
      'On that computer, add `http://127.0.0.1:8787/vkify.js` as an extension and set **Settings → VKify → Proxy** to `http://127.0.0.1:8787/`.',
      'For another device, replace `127.0.0.1` in both URLs with the computer IP printed in the terminal. Use the same network and allow Node.js through the private-network firewall.',
      'Keep the computer and proxy running. Do not expose this local mode to the internet. If an HTTPS page blocks local HTTP, use a server with trusted HTTPS instead.',
    ], 'npm ci\nnpm run build\nnpm run start:proxy'),
    guide('region', 'Российский IP: устройства или сервера?', 'Russian IP: device or server?', [
      '**Android без прокси:** VK видит исходящий IP устройства. Для полного каталога он должен быть российским.',
      '**Через VPS или локальный прокси:** VK видит исходящий IP сервера или компьютера с прокси. Российский IP телевизора не поможет, если запросы уходят через зарубежный VPS.',
      'При ограниченной витрине плагин скрывает неполный каталог и показывает пояснение с кнопкой поиска. Поиск продолжает работать. Доступность определяется по ответу VK, а не по языку приложения.',
    ], [
      '**Android without a proxy:** VK sees the device outgoing IP. It must be Russian for the full catalogue.',
      '**VPS or local proxy:** VK sees the outgoing IP of the server or proxy computer. A Russian TV IP does not help when requests use a foreign VPS.',
      'When VK returns a limited catalogue, the plugin hides it and shows a notice with a search button. Video search remains available. Availability follows the VK response, not the app language.',
    ]),
    guide('update', 'Обновление', 'Updates', [
      '**Android:** ссылка остаётся прежней. Полностью перезапустите Lampa, чтобы загрузить свежую сборку.',
      '**VPS:** сохраните `.env` и `private/` в закрытое место. В каталоге проекта выполните команды ниже. Аккаунты и персональная ссылка сохранятся.',
      '**Локальный компьютер:** остановите прокси через Ctrl+C, выполните `git pull --ff-only`, `npm ci`, `npm run build` и `npm run start:proxy`. После обновления перезапустите Lampa.',
    ], [
      '**Android:** keep the same URL. Fully restart Lampa to load the new bundle.',
      '**VPS:** privately back up `.env` and `private/`. Run the commands below in the project directory. Accounts and personal URLs are preserved.',
      '**Local computer:** stop the proxy with Ctrl+C, run `git pull --ff-only`, `npm ci`, `npm run build` and `npm run start:proxy`, then restart Lampa.',
    ], 'git pull --ff-only\nnode scripts/setup.mjs --update'),
  ],
}
