export const config = {
  // Информация о приложении
  app: {
    url: 'https://vkify.ru',
    name: 'VKify',
    description: 'Расширение для браузера: темы и видео-обои, блокировка рекламы и трекеров, шифрование переписки и скачивание медиа из ВКонтакте',
    tagline: 'Расширение для VK',
    email: 'support@vkify.ru',
  },

  // Аналитика
  analytics: {
    googleAnalytics: 'G-1MT0EPKQ4B',
    yandexMetrika: 106720485,
  },

  // Внешние ссылки
  links: {
    chromeWebStore: 'https://chromewebstore.google.com/detail/vkify/lofggenkgbpdmmplnbgfplnpfjhgljla',
    github: 'https://github.com/VKify',
    githubIssues: 'https://github.com/VKify/vkify-extension/issues',
    githubDiscussions: 'https://github.com/VKify/vkify-extension/discussions',
    telegram: 'https://t.me/vkify',
    vk: 'https://vk.com/vkify',
  },

  // Навигация
  navigation: {
    main: [
        { name: 'Возможности', labelKey: 'nav.features', href: '/#features', isAnchor: true, sectionId: 'features' },
        { name: 'Как это работает', labelKey: 'nav.howItWorks', href: '/#how-it-works', isAnchor: true, sectionId: 'how-it-works' },
        { name: 'Статистика', labelKey: 'nav.stats', href: '/#stats', isAnchor: true, sectionId: 'stats' },
        { name: 'Скриншоты', labelKey: 'nav.screenshots', href: '/#screenshots', isAnchor: true, sectionId: 'screenshots' },
        { name: 'Скачать', labelKey: 'nav.download', href: '/#cta', isAnchor: true, sectionId: 'cta' },
    ],
    footer: {
      product: [
        { name: 'Возможности', labelKey: 'footer.links.features', href: '/#features', isAnchor: true },
        { name: 'Скриншоты', labelKey: 'footer.links.screenshots', href: '/#screenshots', isAnchor: true },
        { name: 'Как установить', labelKey: 'footer.links.install', href: '/#how-it-works', isAnchor: true },
        { name: 'Темы оформления', labelKey: 'footer.links.themes', href: '/themes' },
        { name: 'Коллекция обоев', labelKey: 'footer.links.wallpapers', href: '/wallpapers' },
        { name: 'Обновления', labelKey: 'footer.links.changelog', href: '/changelog' },
      ],
      resources: [
        { name: 'Chrome Web Store', labelKey: 'footer.links.chromeStore', href: 'https://chromewebstore.google.com/detail/vkify/lofggenkgbpdmmplnbgfplnpfjhgljla', external: true },
        { name: 'Исходный код', labelKey: 'footer.links.sourceCode', href: 'https://github.com/VKify/vkify-extension', external: true },
        { name: 'Сообщить о баге', labelKey: 'footer.links.reportBug', href: 'https://github.com/VKify/vkify-extension/issues', external: true },
      ],
      community: [
        { name: 'Telegram канал', labelKey: 'footer.links.telegram', href: 'https://t.me/vkify', external: true },
        { name: 'Группа ВКонтакте', labelKey: 'footer.links.vkGroup', href: 'https://vk.com/vkify', external: true },
        { name: 'GitHub Discussions', labelKey: 'footer.links.discussions', href: 'https://github.com/VKify/vkify-extension/discussions', external: true },
      ],
      legal: [
        { name: 'Конфиденциальность', labelKey: 'footer.links.privacy', href: '/privacy' },
        { name: 'Условия использования', labelKey: 'footer.links.terms', href: '/terms' },
      ],
    },
  },

  // Социальные сети
  social: [
    { 
      name: 'Telegram', 
      href: 'https://t.me/vkify', 
      color: 'hover:bg-[#0088cc]/10 hover:text-[#0088cc]',
      bgColor: '#0088cc',
    },
    { 
      name: 'VK', 
      href: 'https://vk.com/vkify', 
      color: 'hover:bg-[#0077ff]/10 hover:text-[#0077ff]',
      bgColor: '#0077ff',
    },
    { 
      name: 'GitHub', 
      href: 'https://github.com/VKify', 
      color: 'hover:bg-gray-500/10 hover:text-gray-900 dark:hover:text-white',
      bgColor: '#333',
    },
  ],

  // Статистика
  stats: {
    users: '10K+',
    rating: '4.9',
    features: '50+',
    themes: '72',
    fonts: '60+',
  },

  // Форма обратной связи (Google Forms)
  feedback: {
    formId: '1-FTj02V2EF9Gmxejh3JM-yvQIxRf7NnTm_QWxLm7RUw',
    fields: {
      reasons: 'entry.1286215964', // первый вопрос — чекбоксы
      comment:  'entry.245136211', // второй вопрос — абзац
    },
  },

  // SEO
  seo: {
    title: 'VKify — Улучшите свой ВКонтакте',
    description: 'Бесплатное расширение для VK: 72 темы и видео-обои, блокировка рекламы и трекеров, E2E-шифрование переписки, скачивание видео и историй. 50+ функций.',
    keywords: 'vk, вконтакте, расширение, темы, блокировка рекламы, приватность, шифрование, скачать видео вк, скачать истории',
  },

  // Стили (цвета темы)
  theme: {
    primary: '#0077ff',
    gradients: {
      primary: 'from-[#0077ff] to-blue-600',
      accent: 'from-[#0077ff] via-blue-500 to-cyan-400',
    },
  },
}

export default config