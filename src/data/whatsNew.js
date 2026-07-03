import { SlidersHorizontal, Gauge, ArrowLeftRight, Navigation } from 'lucide-react'

// Свежие фишки из последних обновлений для блока «Что нового» на главной.
// Тексты (title/description) берутся из i18n по id: whatsNew.cards.<id>.*
export const whatsNew = [
  { id: 'equalizer',     icon: SlidersHorizontal, color: 'from-blue-500 to-cyan-500',     version: '1.7.0' },
  { id: 'perfDashboard', icon: Gauge,             color: 'from-amber-500 to-orange-500',  version: '1.7.0' },
  { id: 'columnsSwap',   icon: ArrowLeftRight,    color: 'from-violet-500 to-purple-500', version: '1.7.0' },
  { id: 'smoothNav',     icon: Navigation,        color: 'from-emerald-500 to-teal-500',  version: '1.7.1' },
]
