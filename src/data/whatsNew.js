import { FileText, Languages, Music2, Zap } from 'lucide-react'

// Свежие фишки из последних обновлений для блока «Что нового» на главной.
// Тексты (title/description) берутся из i18n по id: whatsNew.cards.<id>.*
export const whatsNew = [
  { id: 'pdfExport',    icon: FileText,  color: 'from-blue-500 to-cyan-500',     version: '1.8.0' },
  { id: 'localization', icon: Languages, color: 'from-violet-500 to-purple-500', version: '1.8.0' },
  { id: 'audioFormats', icon: Music2,    color: 'from-rose-500 to-orange-500',   version: '1.8.0' },
  { id: 'fasterVk',     icon: Zap,       color: 'from-emerald-500 to-teal-500',  version: '1.8.0' },
]
