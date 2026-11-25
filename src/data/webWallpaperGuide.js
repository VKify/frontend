const WEB_WALLPAPER_HTML = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>html, body { margin: 0; height: 100%; overflow: hidden; }</style>
  </head>
  <body>
    <canvas id="wallpaper"></canvas>
    <script src="wallpaper.js"><\/script>
  </body>
</html>`

export const WEB_WALLPAPER_GUIDE = {
  slug: 'wallpapers',
  heroIcon: 'picture',
  ru: {
    nav: 'Веб-обои',
    title: 'Как сделать веб-обои',
    subtitle: 'Создание и подключение HTML-анимации на одном небольшом примере.',
    seoTitle: 'Как сделать веб-обои для VKify',
    seoDescription: 'Инструкция по созданию, проверке и публикации HTML-обоев.',
  },
  en: {
    nav: 'Web wallpapers',
    title: 'How to make web wallpapers',
    subtitle: 'Create and connect an HTML animation with one small example.',
    seoTitle: 'How to make web wallpapers for VKify',
    seoDescription: 'A simple guide to creating, testing, and publishing HTML wallpapers.',
  },
  features: [
    {
      anchor: 'basic-web-wallpaper', icon: 'code',
      ru: {
        title: 'Обычные веб-обои',
        lead: 'Веб-обои — это небольшая локальная веб-страница. Внутри можно использовать HTML, CSS, Canvas, SVG и JavaScript.',
        how: [
          '**1. Создайте папку.** Положите в неё `index.html`, `wallpaper.js`, стили и локальные изображения.',
          '**2. Сделайте анимацию.** Она должна заполнять окно, реагировать на изменение размера и не создавать новый таймер на каждом кадре.',
          '**3. Проверьте локально.** Запустите папку через локальный HTTP-сервер и откройте `index.html` в браузере.',
        ],
        code: [{ label: 'Минимальный index.html', language: 'html', content: WEB_WALLPAPER_HTML }],
        access: 'Начните с этого HTML-шаблона.',
      },
      en: {
        title: 'Basic web wallpaper',
        lead: 'A web wallpaper is a small local web page. It can use HTML, CSS, Canvas, SVG, and JavaScript.',
        how: [
          '**1. Create a folder.** Put `index.html`, `wallpaper.js`, styles, and local images inside it.',
          '**2. Build the animation.** It should fill the window, respond to resizing, and avoid creating a new timer every frame.',
          '**3. Test locally.** Serve the folder with a local HTTP server and open `index.html` in a browser.',
        ],
        code: [{ label: 'Minimal index.html', language: 'html', content: WEB_WALLPAPER_HTML }],
        access: 'Start with this HTML template.',
      },
    },
    {
      anchor: 'publish-web-wallpaper', icon: 'globe',
      ru: {
        title: 'Публикация и подключение',
        lead: 'VKify загружает веб-обои по URL, поэтому браузер должен иметь доступ ко всей папке.',
        how: [
          '**1. Загрузите папку на HTTPS-хостинг.** Подойдут GitHub Pages, Cloudflare Pages, Netlify или ваш сервер.',
          '**2. Проверьте прямую ссылку.** URL должен заканчиваться на `index.html`, открываться без авторизации и не скачивать файл.',
          '**3. Вставьте URL в VKify.**',
          '**Проверьте результат.** Обновите VK, убедитесь, что анимация не останавливается после смены вкладки или размера окна.',
        ],
        access: 'VKify → Вид → Фон страницы → Свой → Веб-обои.',
      },
      en: {
        title: 'Publishing and connecting',
        lead: 'VKify loads web wallpapers by URL, so the browser must be able to access the entire folder.',
        how: [
          '**1. Upload the folder to HTTPS hosting.** GitHub Pages, Cloudflare Pages, Netlify, or your own server will work.',
          '**2. Check the direct link.** The URL should end in `index.html`, open without authentication, and render instead of downloading.',
          '**3. Paste the URL into VKify.**',
          '**Verify the result.** Reload VK, ensure the animation keeps running after tab and window-size changes.',
        ],
        access: 'VKify → View → Background → Custom → Web wallpaper.',
      },
    },
  ],
}
