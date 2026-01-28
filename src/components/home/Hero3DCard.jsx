import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { 
  Palette, 
  Shield, 
  Zap, 
  Eye, 
  Download, 
  Music,
  MessageCircle,
  Lock,
  Sparkles
} from 'lucide-react'
import Logo from '../common/Logo'

// 3D Card с эффектом наклона
function TiltCard({ children }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['12deg', '-12deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-12deg', '12deg'])

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    x.set(mouseX / rect.width - 0.5)
    y.set(mouseY / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className="relative"
    >
      {children}
    </motion.div>
  )
}

// Все функции для карточек
const allFeatures = [
  { 
    Icon: Palette, 
    label: 'Темы', 
    value: '12+', 
    color: 'from-purple-500 to-pink-500',
  },
  { 
    Icon: Shield, 
    label: 'Реклама', 
    value: '0%', 
    color: 'from-green-500 to-emerald-500',
  },
  { 
    Icon: Zap, 
    label: 'Скорость', 
    value: '2x', 
    color: 'from-yellow-500 to-orange-500',
  },
  { 
    Icon: Eye, 
    label: 'Просмотры', 
    value: 'Скрыты', 
    color: 'from-blue-500 to-cyan-500',
  },
  { 
    Icon: Download, 
    label: 'Музыка', 
    value: '∞', 
    color: 'from-pink-500 to-rose-500',
  },
  { 
    Icon: MessageCircle, 
    label: 'Сообщения', 
    value: 'Тайные', 
    color: 'from-indigo-500 to-purple-500',
  },
  { 
    Icon: Lock, 
    label: 'Приватность', 
    value: '100%', 
    color: 'from-emerald-500 to-teal-500',
  },
  { 
    Icon: Sparkles, 
    label: 'Функций', 
    value: '50+', 
    color: 'from-amber-500 to-orange-500',
  },
  { 
    Icon: Music, 
    label: 'Музыка', 
    value: 'Фон', 
    color: 'from-cyan-500 to-blue-500',
  },
]

// Позиции для 3 карточек
const cardPositions = [
  { 
    position: '-top-6 -right-2 sm:-right-6 lg:-right-10', 
    animateY: [-15, 15, -15],
    animateX: [-8, 8, -8],
    duration: 5,
    delay: 0 
  },
  { 
    position: '-bottom-6 -left-2 sm:-left-6 lg:-left-10', 
    animateY: [15, -15, 15],
    animateX: [8, -8, 8],
    duration: 6,
    delay: 1 
  },
  { 
    position: 'top-1/2 -right-6 sm:-right-12 lg:-right-20 -translate-y-1/2 hidden sm:block', 
    animateY: [12, -12, 12],
    animateX: [0, 0, 0],
    duration: 4,
    delay: 0.5 
  },
]

export default function Hero3DCard() {
  const [currentFeatures, setCurrentFeatures] = useState([0, 1, 2])
  
  // Меняем карточки каждые 3 секунды
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeatures(prev => {
        const nextIndices = prev.map((index, i) => {
          let next = (index + 3) % allFeatures.length
          // Избегаем дубликатов
          while (prev.includes(next) || (i > 0 && [prev[(i + 1) % 3], prev[(i + 2) % 3]].includes(next))) {
            next = (next + 1) % allFeatures.length
          }
          return next
        })
        return nextIndices
      })
    }, 3000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative flex items-center justify-center"
      style={{ perspective: '1000px' }}
    >
      <TiltCard>
        <div className="relative">
          {/* Glow Effect */}
          <motion.div 
            animate={{ 
              opacity: [0.5, 0.8, 0.5],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute inset-0 scale-125 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-cyan-500/30 blur-3xl rounded-full" 
          />
          
          {/* Main Card */}
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="relative"
          >
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              {/* Glass Card */}
              <div className="absolute inset-4 bg-gradient-to-br from-white/80 to-white/40 dark:from-gray-800/80 dark:to-gray-900/40 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 dark:border-gray-700/50 overflow-hidden">
                {/* Inner Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
                
                {/* Animated Border Shine */}
                <motion.div
                  className="absolute inset-0 rounded-3xl opacity-50"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(0,119,255,0.3), transparent)',
                    backgroundSize: '200% 100%',
                  }}
                  animate={{
                    backgroundPosition: ['200% 0', '-200% 0'],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                />
              </div>
              
              {/* Logo Container */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="relative"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Logo Glow */}
                  <div className="absolute inset-0 bg-blue-500 rounded-3xl blur-2xl opacity-50" />
                  
                  <div 
                    className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-3xl bg-gradient-to-br from-[#0077ff] via-blue-500 to-blue-600 shadow-2xl shadow-blue-500/50 flex items-center justify-center"
                    style={{ transform: 'translateZ(50px)' }}
                  >
                    {/* Shine overlay */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/25 to-transparent" />
                    <Logo className="w-16 h-16 sm:w-20 sm:h-20 text-white drop-shadow-lg" />
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Floating Cards с анимацией смены */}
          {cardPositions.map((pos, i) => {
            const feature = allFeatures[currentFeatures[i]]
            const IconComponent = feature.Icon
            
            return (
              <motion.div
                key={`position-${i}`}
                animate={{ 
                  y: pos.animateY, 
                  x: pos.animateX,
                  rotate: [-2, 2, -2],
                }}
                transition={{ 
                  duration: pos.duration, 
                  repeat: Infinity, 
                  ease: 'easeInOut', 
                  delay: pos.delay 
                }}
                whileHover={{ scale: 1.1, rotate: 0 }}
                className={`absolute ${pos.position} cursor-pointer`}
                style={{ transform: 'translateZ(75px)' }}
              >
                <motion.div 
                  key={currentFeatures[i]}
                  initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                  transition={{ duration: 0.5 }}
                  className="px-4 py-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <motion.div 
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <IconComponent className="w-5 h-5 text-white" />
                    </motion.div>
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{feature.label}</div>
                      <div className="text-lg font-bold text-gray-900 dark:text-white">{feature.value}</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}

          {/* Orbit Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="w-full h-full rounded-full border border-dashed border-blue-500/20" />
          </motion.div>
          
          {/* Second Orbit Ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-8 pointer-events-none"
          >
            <div className="w-full h-full rounded-full border border-dotted border-purple-500/10" />
          </motion.div>
        </div>
      </TiltCard>
    </motion.div>
  )
}