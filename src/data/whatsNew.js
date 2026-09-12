import { AudioLines, Download, Music2, Palette } from 'lucide-react'

// Свежие фишки из последних обновлений для блока «Что нового» на главной.
// Тексты (title/description) берутся из i18n по id: whatsNew.cards.<id>.*
export const whatsNew = [
  { id: 'customization', icon: Palette,    color: 'from-violet-500 to-fuchsia-500', version: '1.7.1' },
  { id: 'equalizer',     icon: AudioLines, color: 'from-rose-500 to-orange-500',    version: '1.7.0' },
  { id: 'musicResume',   icon: Music2,     color: 'from-blue-500 to-cyan-500',       version: '1.6.3' },
  { id: 'downloadCenter', icon: Download,  color: 'from-emerald-500 to-teal-500',    version: '1.6.0' },
]
