import { Music2, Layers, Play, Compass } from 'lucide-react'

// Свежие фишки из последних обновлений для блока «Что нового» на главной.
// Тексты (title/description) берутся из i18n по id: whatsNew.cards.<id>.*
export const whatsNew = [
  { id: 'musicDownload', icon: Music2,  color: 'from-purple-500 to-fuchsia-500', version: '1.6.0' },
  { id: 'profiles',      icon: Layers,  color: 'from-pink-500 to-rose-500',      version: '1.6.0' },
  { id: 'autoplay',      icon: Play,    color: 'from-green-500 to-emerald-500',  version: '1.6.3' },
  { id: 'centerHub',     icon: Compass, color: 'from-blue-500 to-cyan-500',      version: '1.6.3' },
]
