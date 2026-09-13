const WEB_WALLPAPER_HTML = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>html, body { margin: 0; height: 100%; overflow: hidden; }</style>
  </head>
  <body>
    <canvas id="wallpaper"></canvas>
    <script src="wallpaper-runtime.js"><\/script>
    <script src="wallpaper.js"><\/script>
  </body>
</html>`

const WEB_WALLPAPER_PROJECT = `{
  "file": "index.html",
  "preview": "preview.png",
  "title": "My Wallpaper",
  "type": "web",
  "general": {
    "properties": {
      "speed": {
        "text": "Speed",
        "type": "slider",
        "value": 5,
        "min": 1,
        "max": 10,
        "step": 1,
        "order": 0
      },
      "accentcolor": {
        "text": "Accent color",
        "type": "color",
        "value": "0.1 0.55 1",
        "order": 1
      },
      "glow": {
        "text": "Glow",
        "type": "bool",
        "value": true,
        "order": 2
      }
    }
  }
}`

const WEB_WALLPAPER_LISTENER = `const settings = { speed: 5, accentcolor: '0.1 0.55 1', glow: true };

window.wallpaperPropertyListener = {
  applyUserProperties(properties) {
    for (const key of Object.keys(settings)) {
      if (properties[key]?.value !== undefined) {
        settings[key] = properties[key].value;
      }
    }
  }
};`

export const WEB_WALLPAPER_GUIDE = {
  slug: 'wallpapers',
  heroIcon: 'picture',
  ru: {
    nav: 'Веб-обои',
    title: 'Как сделать веб-обои',
    subtitle: 'От простой HTML-анимации до совместимых параметров Wallpaper Engine — на одном небольшом примере.',
    seoTitle: 'Как сделать веб-обои для VKify и Wallpaper Engine',
    seoDescription: 'Простая инструкция по созданию, настройке, проверке и публикации HTML-обоев с параметрами Wallpaper Engine.',
  },
  en: {
    nav: 'Web wallpapers',
    title: 'How to make web wallpapers',
    subtitle: 'From a simple HTML animation to Wallpaper Engine-compatible properties in one small example.',
    seoTitle: 'How to make web wallpapers for VKify and Wallpaper Engine',
    seoDescription: 'A simple guide to creating, configuring, testing, and publishing HTML wallpapers with Wallpaper Engine properties.',
  },
  features: [
    {
      anchor: 'basic-web-wallpaper', icon: 'code',
      ru: {
        title: 'Обычные веб-обои',
        lead: 'Веб-обои — это небольшая локальная веб-страница. Внутри можно использовать HTML, CSS, Canvas, SVG и JavaScript.',
        how: [
          '**1. Создайте папку.** Положите в неё `index.html`, `wallpaper.js`, стили и локальные изображения. Для параметров также скопируйте `wallpaper-runtime.js` из каталога VKify.',
          '**2. Сделайте анимацию.** Она должна заполнять окно, реагировать на изменение размера и не создавать новый таймер на каждом кадре.',
          '**3. Проверьте локально.** Запустите папку через локальный HTTP-сервер и откройте `index.html` в браузере.',
        ],
        code: [{ label: 'Минимальный index.html', language: 'html', content: WEB_WALLPAPER_HTML }],
        access: 'Начните с этого шаблона. Если параметры не нужны, строку с `wallpaper-runtime.js` можно удалить.',
      },
      en: {
        title: 'Basic web wallpaper',
        lead: 'A web wallpaper is a small local web page. It can use HTML, CSS, Canvas, SVG, and JavaScript.',
        how: [
          '**1. Create a folder.** Put `index.html`, `wallpaper.js`, styles, and local images inside it. For properties, also copy `wallpaper-runtime.js` from the VKify catalog.',
          '**2. Build the animation.** It should fill the window, respond to resizing, and avoid creating a new timer every frame.',
          '**3. Test locally.** Serve the folder with a local HTTP server and open `index.html` in a browser.',
        ],
        code: [{ label: 'Minimal index.html', language: 'html', content: WEB_WALLPAPER_HTML }],
        access: 'Start with this template. Remove the `wallpaper-runtime.js` line if you do not need properties.',
      },
    },
    {
      anchor: 'wallpaper-engine-properties', icon: 'settings',
      ru: {
        title: 'Параметры Wallpaper Engine',
        lead: 'Чтобы настройки появились в VKify и Wallpaper Engine, положите `project.json` рядом с `index.html`, а в JavaScript добавьте стандартный обработчик.',
        how: [
          '**1. Подключите мост VKify.** Сохраните `https://vkify.ru/wallpapers/web/wallpaper-runtime.js` рядом с `index.html` и подключите его перед своим скриптом, как в примере выше.',
          '**2. Опишите поля в `project.json`.** VKify поддерживает `slider`, `bool`, `color`, `textinput` и `combo`.',
          '**3. Используйте одинаковые ключи.** Например, параметр `speed` из JSON должен читаться как `properties.speed` в обработчике.',
          '**4. Применяйте значения сразу.** Wallpaper Engine и VKify вызывают `applyUserProperties`, когда пользователь меняет настройку.',
          '**Цвета.** Тип `color` приходит строкой из трёх чисел от 0 до 1, например `0.1 0.55 1`. Перед использованием в Canvas или CSS преобразуйте её в RGB.',
        ],
        code: [
          { label: 'project.json', language: 'json', content: WEB_WALLPAPER_PROJECT },
          { label: 'wallpaper.js — получение значений', language: 'javascript', content: WEB_WALLPAPER_LISTENER },
        ],
        access: '`project.json` и `index.html` должны находиться в одной папке.',
      },
      en: {
        title: 'Wallpaper Engine properties',
        lead: 'To expose settings in VKify and Wallpaper Engine, place `project.json` next to `index.html` and add the standard listener to JavaScript.',
        how: [
          '**1. Add the VKify bridge.** Save `https://vkify.ru/wallpapers/web/wallpaper-runtime.js` next to `index.html` and load it before your own script, as shown above.',
          '**2. Describe fields in `project.json`.** VKify supports `slider`, `bool`, `color`, `textinput`, and `combo`.',
          '**3. Use matching keys.** A `speed` property in JSON must be read as `properties.speed` in the listener.',
          '**4. Apply values immediately.** Wallpaper Engine and VKify call `applyUserProperties` whenever the user changes a setting.',
          '**Colors.** A `color` value is a string with three numbers from 0 to 1, such as `0.1 0.55 1`. Convert it to RGB before using it in Canvas or CSS.',
        ],
        code: [
          { label: 'project.json', language: 'json', content: WEB_WALLPAPER_PROJECT },
          { label: 'wallpaper.js — receiving values', language: 'javascript', content: WEB_WALLPAPER_LISTENER },
        ],
        access: '`project.json` and `index.html` must be in the same folder.',
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
          '**3. Вставьте URL в VKify.** Если рядом доступен `project.json`, дополнительные параметры появятся автоматически.',
          '**Проверьте результат.** Обновите VK, измените каждый параметр и убедитесь, что анимация не останавливается после смены вкладки или размера окна.',
        ],
        access: 'VKify → Вид → Фон страницы → Свой → Веб-обои.',
      },
      en: {
        title: 'Publishing and connecting',
        lead: 'VKify loads web wallpapers by URL, so the browser must be able to access the entire folder.',
        how: [
          '**1. Upload the folder to HTTPS hosting.** GitHub Pages, Cloudflare Pages, Netlify, or your own server will work.',
          '**2. Check the direct link.** The URL should end in `index.html`, open without authentication, and render instead of downloading.',
          '**3. Paste the URL into VKify.** If `project.json` is available next to it, extra properties appear automatically.',
          '**Verify the result.** Reload VK, change every property, and ensure the animation keeps running after tab and window-size changes.',
        ],
        access: 'VKify → View → Background → Custom → Web wallpaper.',
      },
    },
  ],
}
