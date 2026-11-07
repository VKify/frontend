import { Film, PanelRight, Music, Shield } from 'lucide-react'
import config from '../config/index.js'

export const whatsNew = [
  { id: 'videoFrames', icon: Film, color: 'from-blue-500 to-cyan-500', version: config.app.version },
  { id: 'rightMenu', icon: PanelRight, color: 'from-violet-500 to-fuchsia-500', version: config.app.version },
  { id: 'playerArtwork', icon: Music, color: 'from-rose-500 to-orange-500', version: config.app.version },
  { id: 'adLog', icon: Shield, color: 'from-emerald-500 to-teal-500', version: config.app.version },
]
