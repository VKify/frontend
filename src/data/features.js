import {
  Palette,
  ShieldCheck,
  Lock,
  Eye,
  Download,
  MessageSquare,
} from 'lucide-react'
import config from '../config'

// Топ-функции для главной — только самое востребованное, по одной выгоде на блок.
export const features = [
  {
    id: 'appearance',
    icon: Palette,
    title: 'Оформление под себя',
    description: 'Сделайте VK своим: темы, видео-обои и собственный CSS.',
    color: 'from-purple-500 to-pink-500',
    details: [
      `${config.stats.themes} темы и кастомные цвета`,
      `${config.stats.fonts} шрифтов на выбор`,
      'Обои: картинки и видео',
      'CSS-редактор и компактный режим',
    ],
  },
  {
    id: 'adblock',
    icon: ShieldCheck,
    title: 'Ноль рекламы и слежки',
    description: 'Чистая лента без промо — и никаких трекеров.',
    color: 'from-green-500 to-emerald-500',
    details: [
      'Два фильтра рекламы',
      'Блокировка трекеров',
      'Скрытие историй и баннеров',
      'Свои списки блокировки',
    ],
  },
  {
    id: 'privacy',
    icon: Lock,
    title: 'Переписка только для вас',
    description: 'E2E-шифрование и скрытие диалогов в один тап.',
    color: 'from-orange-500 to-red-500',
    details: [
      'Шифрование сообщений (E2E)',
      'Скрытие диалогов',
      'Быстрое скрытие переписки',
      'Размытие страницы',
    ],
  },
  {
    id: 'tracking',
    icon: Eye,
    title: 'Кто заходил и читал',
    description: 'Видно, кто в сети, кто прочитал и кто печатает — с историей.',
    color: 'from-blue-500 to-cyan-500',
    details: [
      'Статусы: печатает, прочитал',
      'Онлайн-мониторинг с историей',
      'Уведомления о действиях',
    ],
  },
  {
    id: 'media',
    icon: Download,
    title: 'Скачивай что угодно',
    description: 'Видео, истории, фото и альбомы — прямо из VK.',
    color: 'from-indigo-500 to-violet-500',
    details: [
      'Видео до 1080p',
      'Истории и фото',
      'Целые альбомы',
      'Горячие клавиши плеера',
    ],
  },
  {
    id: 'messages',
    icon: MessageSquare,
    title: 'Сообщения под рукой',
    description: 'Единый хаб, шаблоны и заметки — общайтесь быстрее.',
    color: 'from-teal-500 to-cyan-500',
    details: [
      'Единый центр сообщений',
      'Шаблоны сообщений',
      'Заметки к диалогам',
      'Экспорт переписки',
    ],
  },
]
