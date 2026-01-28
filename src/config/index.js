export const config = {
  // Информация о приложении
  app: {
    url: 'https://vkify.ru',
    name: 'VKify',
    description: 'Расширение для браузера, которое делает ВКонтакте удобнее, красивее и приватнее',
    tagline: 'Расширение для VK',
    email: '@vkify',
    video: '',
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
        { name: 'Возможности', href: '/#features', isAnchor: true, sectionId: 'features' },
        { name: 'Как это работает', href: '/#how-it-works', isAnchor: true, sectionId: 'how-it-works' },
        { name: 'Статистика', href: '/#stats', isAnchor: true, sectionId: 'stats' },
        { name: 'Скриншоты', href: '/#screenshots', isAnchor: true, sectionId: 'screenshots' },
        { name: 'Скачать', href: '/#cta', isAnchor: true, sectionId: 'cta' },
    ],
    footer: {
      product: [
        { name: 'Возможности', href: '/#features', isAnchor: true },
        { name: 'Скриншоты', href: '/#screenshots', isAnchor: true },
        { name: 'Как установить', href: '/#how-it-works', isAnchor: true },
        { name: 'Обновления', href: '/changelog' },
      ],
      resources: [
        { name: 'Chrome Web Store', href: 'https://chromewebstore.google.com/detail/vkify/lofggenkgbpdmmplnbgfplnpfjhgljla', external: true },
        { name: 'Исходный код', href: 'https://github.com/VKify/vkify-extension', external: true },
        { name: 'Сообщить о баге', href: 'https://github.com/VKify/vkify-extension/issues', external: true },
      ],
      community: [
        { name: 'Telegram канал', href: 'https://t.me/vkify', external: true },
        { name: 'Группа ВКонтакте', href: 'https://vk.com/vkify', external: true },
        { name: 'GitHub Discussions', href: 'https://github.com/VKify/vkify-extension/discussions', external: true },
      ],
      legal: [
        { name: 'Конфиденциальность', href: '/privacy' },
        { name: 'Условия использования', href: '/terms' },
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
    themes: '12',
  },

  // SEO
  seo: {
    title: 'VKify — Улучшите свой ВКонтакте',
    description: 'Бесплатное расширение для браузера с темами, блокировкой рекламы и 50+ функциями для VK',
    keywords: 'vk, вконтакте, расширение, темы, блокировка рекламы, приватность',
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