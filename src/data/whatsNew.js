import { AudioLines, Globe, LayoutGrid, Users } from 'lucide-react'

import config from '../config/index.js'

// Свежие фишки из последних обновлений для блока «Что нового» на главной.
// Тексты (title/description) берутся из i18n по id: whatsNew.cards.<id>.*
export const whatsNew = [
  { id: 'accountTools', icon: Users, color: 'from-emerald-500 to-teal-500', version: config.app.version },
  { id: 'widgets', icon: LayoutGrid, color: 'from-blue-500 to-cyan-500', version: config.app.version },
  { id: 'visualizer', icon: AudioLines, color: 'from-rose-500 to-orange-500', version: config.app.version },
  { id: 'webWallpapers', icon: Globe, color: 'from-violet-500 to-fuchsia-500', version: config.app.version },
]
