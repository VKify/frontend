import { 
  Palette, 
  ShieldCheck, 
  EyeOff, 
  Lock, 
  Zap, 
  Code2,
  Brush,
  Ban,
  Ghost,
  UserX,
  Bot,
  Sparkles
} from 'lucide-react'

export const features = [
  {
    id: 'customization',
    icon: Palette,
    title: 'Кастомизация',
    description: 'Темы, цвета, фоны, скругления — сделайте VK уникальным',
    color: 'from-purple-500 to-pink-500',
    details: [
      '12 готовых цветовых тем',
      'Настройка радиуса скругления',
      'Кастомные фоны и обои',
      'Изменение шрифтов'
    ]
  },
  {
    id: 'adblock',
    icon: ShieldCheck,
    title: 'Блокировка рекламы',
    description: 'Чистая лента без промо-постов и рекламных историй',
    color: 'from-green-500 to-emerald-500',
    details: [
      'Блокировка рекламы в ленте',
      'Скрытие промо-историй',
      'Удаление рекламы в боковой панели',
      'Блокировка видео-рекламы'
    ]
  },
  {
    id: 'hiding',
    icon: EyeOff,
    title: 'Скрытие элементов',
    description: 'Уберите всё лишнее — рекомендации, истории, статусы',
    color: 'from-blue-500 to-cyan-500',
    details: [
      'Скрытие рекомендаций друзей',
      'Отключение историй',
      'Скрытие статусов онлайн',
      'Удаление лишних блоков'
    ]
  },
  {
    id: 'privacy',
    icon: Lock,
    title: 'Приватность',
    description: 'Невидимка и блокировка прочтения сообщений',
    color: 'from-orange-500 to-red-500',
    details: [
      'Режим невидимки',
      'Блокировка галочек прочтения',
      'Скрытие набора текста',
      'Анонимный просмотр историй'
    ]
  },
  {
    id: 'automation',
    icon: Zap,
    title: 'Автоматизация',
    description: 'Авто-добавление друзей, автоответы и скрипты',
    color: 'from-yellow-500 to-orange-500',
    details: [
      'Авто-принятие заявок в друзья',
      'Пользовательские скрипты',
      'Быстрые действия',
      'Горячие клавиши'
    ]
  },
  {
    id: 'css-editor',
    icon: Code2,
    title: 'CSS-редактор',
    description: 'Свои стили с подсветкой кода и живым превью',
    color: 'from-indigo-500 to-purple-500',
    details: [
      'Редактор с подсветкой синтаксиса',
      'Живое превью изменений',
      'Импорт/экспорт стилей',
      'Готовые сниппеты'
    ]
  }
]

export const featureCategories = [
  {
    id: 'appearance',
    title: 'Внешний вид',
    icon: Brush,
    features: ['customization', 'css-editor']
  },
  {
    id: 'blocking',
    title: 'Блокировка',
    icon: Ban,
    features: ['adblock', 'hiding']
  },
  {
    id: 'privacy',
    title: 'Приватность',
    icon: Ghost,
    features: ['privacy']
  },
  {
    id: 'productivity',
    title: 'Продуктивность',
    icon: Bot,
    features: ['automation']
  }
]