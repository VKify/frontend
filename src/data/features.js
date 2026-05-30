import {
  Palette,
  ShieldCheck,
  Lock,
  Eye,
  Download,
  MessageSquare,
} from 'lucide-react'

// Структура топ-функций для главной. Тексты (title/description/details)
// берутся из i18n по id: features.cards.<id>.*
export const features = [
  { id: 'appearance', icon: Palette,      color: 'from-purple-500 to-pink-500' },
  { id: 'adblock',    icon: ShieldCheck,  color: 'from-green-500 to-emerald-500' },
  { id: 'privacy',    icon: Lock,         color: 'from-orange-500 to-red-500' },
  { id: 'tracking',   icon: Eye,          color: 'from-blue-500 to-cyan-500' },
  { id: 'media',      icon: Download,     color: 'from-indigo-500 to-violet-500' },
  { id: 'messages',   icon: MessageSquare, color: 'from-teal-500 to-cyan-500' },
]
