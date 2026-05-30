// English dictionary. Mirror of ru.js structure.
export const en = {
  langName: 'English',

  seo: {
    homeDescription: 'VKify — a powerful browser extension to customize VKontakte. Themes, ad blocking, privacy and 50+ features.',
  },

  common: {
    install: 'Install',
    installFree: 'Install free',
    allFeatures: 'All features',
    learnMore: 'Learn more',
    support: 'Support the project',
  },

  nav: {
    features: 'Features',
    howItWorks: 'How it works',
    stats: 'Stats',
    screenshots: 'Screenshots',
    download: 'Download',
  },

  header: {
    tagline: 'Extension for VK',
    announcement: 'Version {version} is out with new features',
    menu: 'Menu',
    community: 'Community',
    freeBrowsers: 'Free • Chrome, Edge, Opera',
    language: 'Language',
  },

  hero: {
    versionAvailable: 'Version {version} available',
    titleTop: 'A new level of',
    titleAccent: 'VKontakte',
    subtitle: 'Themes and video wallpapers, ad and tracker blocking, message encryption and media downloads — {features} features in one extension. Free.',
    worksIn: 'Works in:',
    pills: {
      themes: 'Themes & wallpapers',
      adblock: 'No ads',
      privacy: 'Privacy',
      download: 'Downloads',
    },
  },

  hero3d: {
    themes: 'Themes',
    ads: 'Ads',
    encryption: 'Encryption',
    download: 'Downloads',
    whoRead: 'Who read',
    fonts: 'Fonts',
    wallpapers: 'Video wallpapers',
    css: 'CSS editor',
    online: 'Online tracking',
    search: 'Feature search',
    on: 'On',
    visible: 'Visible',
    custom: 'Custom',
  },

  features: {
    badge: '{features} features',
    titleTop: 'Everything you need —',
    titleAccent: 'in one extension',
    description: 'Themes, privacy, media downloads and activity tracking. Everything is configured right inside VK — no extra tabs.',
    bottomPre: 'Plus a feature search on ',
    bottomPost: ', favorites and quick actions — new features added regularly',
    cards: {
      appearance: {
        title: 'Make it yours',
        description: 'Make VK your own: themes, video wallpapers and custom CSS.',
        details: [
          '{themes} themes and custom colors',
          '{fonts} fonts to choose from',
          'Wallpapers: images and video',
          'CSS editor and compact mode',
        ],
      },
      adblock: {
        title: 'Zero ads and tracking',
        description: 'A clean feed without promos — and no trackers.',
        details: [
          'Two ad filters',
          'Tracker blocking',
          'Hide stories and banners',
          'Custom block lists',
        ],
      },
      privacy: {
        title: 'Chats for your eyes only',
        description: 'E2E encryption and one-tap chat hiding.',
        details: [
          'Message encryption (E2E)',
          'Hide conversations',
          'Quick chat hiding',
          'Page blur',
        ],
      },
      tracking: {
        title: 'Who visited and read',
        description: "See who's online, who read and who's typing — with history.",
        details: [
          'Statuses: typing, read',
          'Online monitoring with history',
          'Activity notifications',
        ],
      },
      media: {
        title: 'Download anything',
        description: 'Videos, stories, photos and albums — straight from VK.',
        details: [
          'Video up to 1080p',
          'Stories and photos',
          'Whole albums',
          'Player hotkeys',
        ],
      },
      messages: {
        title: 'Messages at hand',
        description: 'A unified hub, templates and notes — chat faster.',
        details: [
          'Unified message center',
          'Message templates',
          'Notes for chats',
          'Export conversations',
        ],
      },
    },
  },

  howItWorks: {
    badge: 'Quick start',
    titleTop: 'Three steps to',
    titleAccent: 'a perfect VK',
    description: 'Setup takes less than a minute. No registration, no complex settings — just install and enjoy.',
    steps: [
      {
        title: 'Install the extension',
        description: 'Add VKify to your browser from the Chrome Web Store for free',
        features: ['Free forever', 'No registration', 'Auto-updates'],
      },
      {
        title: 'Open VK',
        description: 'Go to vk.com — the extension activates automatically',
        features: ['Instant activation', 'Works right away', 'No reload'],
      },
      {
        title: 'Make it yours',
        description: 'Pick a theme, enable the features you need and enjoy',
        features: ['{themes} themes and {fonts} fonts', 'Privacy and encryption', 'Download videos and stories'],
      },
    ],
    video: {
      soon: 'Soon',
      title: 'Video in the works',
      subtitle: "We're preparing a detailed video overview. A demo of all features will appear here soon!",
      progress: 'Progress',
      telegram: 'Follow updates on Telegram',
      watchInAction: 'See {name} in action',
      duration: '2 minutes • Feature overview',
      close: 'Close video',
    },
  },

  stats: {
    title: '{name} by the numbers',
    subtitle: 'Join thousands of users who have already upgraded their VK',
    items: {
      features: { label: 'features', description: 'for every day' },
      themes: { label: 'themes', description: 'and video wallpapers' },
      ads: { label: 'ads', description: 'and no trackers' },
      free: { label: 'free', description: 'no hidden fees' },
    },
    openSourceName: 'Open Source',
    openSourceText: ' — code is public',
    madeWithPre: 'Made with ',
    madeWithAccent: 'love',
    madeWithPost: ' in Russia',
    updatesAccent: 'Regular',
    updatesText: ' updates',
  },

  screenshots: {
    titleTop: 'See',
    titleAccent: 'VKify in action',
    subtitle: 'Interactive previews of the main extension features',
    swipeHint: '← Swipe to switch →',
    openFullscreen: 'Open fullscreen',
    close: 'Close',
    prev: 'Previous screenshot',
    next: 'Next screenshot',
    goTo: 'Go to screenshot {n}',
    items: {
      themes: { title: 'Theme settings', description: 'Pick from {themes}+ ready color schemes or create your own' },
      adblock: { title: 'Ad blocking', description: 'A clean feed without promo posts, stories and recommendations' },
      css: { title: 'CSS editor', description: 'Full customization freedom with syntax highlighting' },
      privacy: { title: 'Invisible mode', description: 'Hide your online status, views and typing' },
      wallpapers: { title: 'Live wallpapers', description: 'Animated and static backgrounds right in the VK interface' },
      fonts: { title: 'Font picker', description: '{fonts} fonts for comfortable reading' },
    },
    mockup: {
      adblockHidden: '3 ad posts hidden',
      privacy: {
        name: 'Alex',
        seen: 'last seen recently',
        incoming: 'Did you see the news?',
        outgoing: 'Yeah, interesting!',
        typing: 'typing...',
        hidden: 'hidden',
        read: 'Read receipts',
        typingLabel: 'Typing',
      },
      fonts: {
        name: 'Alexander Ivanov',
        time: 'today at 12:30',
        sample: 'Made VK prettier with VKify! Now everything looks exactly the way I want.',
      },
      wallpapers: { aurora: 'Aurora', sunset: 'Sunset', cyber: 'Cyber', matrix: 'Matrix', space: 'Space', waves: 'Waves' },
    },
  },

  cta: {
    titleTop: 'Ready to transform',
    titleAccent: 'VKontakte?',
    subtitle: 'Join thousands of users who have already made their VK more convenient, beautiful and private',
    pills: {
      themes: '{themes} themes & wallpapers',
      adblock: 'No ads or trackers',
      features: '{features} features',
    },
    installChrome: 'Install for Chrome',
    installNote: 'Free • No registration • Instant install',
  },

  footer: {
    description: 'A browser extension: themes and video wallpapers, ad and tracker blocking, message encryption and media downloads for VKontakte',
    newsletterTitle: 'Stay up to date',
    newsletterSubtitle: 'Follow us on social media',
    support247: '24/7 support',
    madeWithPre: 'Made with ',
    madeWithPost: ' in Russia',
    sections: {
      product: 'Product',
      resources: 'Resources',
      community: 'Community',
      info: 'Information',
    },
    links: {
      features: 'Features',
      screenshots: 'Screenshots',
      install: 'How to install',
      themes: 'Themes',
      wallpapers: 'Wallpaper collection',
      changelog: 'Changelog',
      chromeStore: 'Chrome Web Store',
      sourceCode: 'Source code',
      reportBug: 'Report a bug',
      telegram: 'Telegram channel',
      vkGroup: 'VK group',
      discussions: 'GitHub Discussions',
      privacy: 'Privacy',
      terms: 'Terms of use',
    },
  },
}
