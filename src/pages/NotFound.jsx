import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { Home, ArrowLeft, Search, Frown, RefreshCw, Sparkles } from 'lucide-react'
import SEO from '../components/common/SEO'
import Button from '../components/common/Button'

// Забавные сообщения
const funMessages = [
  'Эта страница ушла за кофе ☕',
  'Страница взяла отпуск 🏖️',
  'Тут был только ветер... 🍃',
  'Страница играет в прятки 🙈',
  'Ой, кто-то удалил страницу 🗑️',
  'Здесь могла быть ваша страница 📄',
  '404 причины почему её тут нет 🤔',
]

// Плавающие частицы
function FloatingParticles() {
  const [windowSize, setWindowSize] = useState({ width: 1000, height: 800 })

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight })
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-[#0077ff]/20"
          initial={{
            x: Math.random() * windowSize.width,
            y: Math.random() * windowSize.height,
          }}
          animate={{
            x: Math.random() * windowSize.width,
            y: Math.random() * windowSize.height,
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 10 + Math.random() * 20,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )
}

// 3D карточка с эффектом наклона
function Tilt3DCard({ children }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['15deg', '-15deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-15deg', '15deg'])

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) / rect.width)
    y.set((e.clientY - centerY) / rect.height)
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
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="relative"
    >
      {children}
    </motion.div>
  )
}

// Анимированные цифры 404
function AnimatedDigit({ digit, delay }) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.span
      initial={{ opacity: 0, y: 100, rotateX: -90 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ 
        duration: 0.8, 
        delay,
        type: 'spring',
        stiffness: 100,
      }}
      whileHover={{ 
        scale: 1.1, 
        color: '#00d4ff',
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative inline-block cursor-pointer select-none"
    >
      {digit}
      {isHovered && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2"
        >
          <Sparkles className="w-6 h-6 text-yellow-400" />
        </motion.span>
      )}
    </motion.span>
  )
}

export default function NotFound() {
  const [funMessage, setFunMessage] = useState('')
  const [clickCount, setClickCount] = useState(0)
  const [showEasterEgg, setShowEasterEgg] = useState(false)

  useEffect(() => {
    setFunMessage(funMessages[Math.floor(Math.random() * funMessages.length)])
  }, [])

  // Easter egg после 5 кликов на 404
  useEffect(() => {
    if (clickCount >= 5) {
      setShowEasterEgg(true)
      setTimeout(() => setShowEasterEgg(false), 3000)
      setClickCount(0)
    }
  }, [clickCount])

  const refreshMessage = () => {
    const newMessage = funMessages[Math.floor(Math.random() * funMessages.length)]
    setFunMessage(newMessage)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 pt-20 pb-16 relative overflow-hidden">
      <SEO 
        title="Страница не найдена"
        description="Запрашиваемая страница не существует"
      />

      {/* Floating Particles */}
      <FloatingParticles />

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#0077ff]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      {/* Easter Egg Celebration */}
      {showEasterEgg && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            className="text-6xl"
          >
            🎉
          </motion.div>
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 1, scale: 0 }}
              animate={{
                opacity: 0,
                scale: 1,
                x: (Math.random() - 0.5) * 500,
                y: (Math.random() - 0.5) * 500,
              }}
              transition={{ duration: 1, delay: i * 0.05 }}
              className="absolute text-2xl"
            >
              {['🎊', '✨', '🌟', '💫', '🎈'][Math.floor(Math.random() * 5)]}
            </motion.div>
          ))}
        </motion.div>
      )}

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Animated 404 */}
        <Tilt3DCard>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 relative"
          >
            {/* Glowing background */}
            <motion.div 
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-r from-[#0077ff]/20 via-purple-500/20 to-cyan-500/20 blur-3xl rounded-full scale-150" 
            />
            
            {/* 404 Text */}
            <div 
              onClick={() => setClickCount(c => c + 1)}
              className="relative cursor-pointer"
              style={{ perspective: '1000px' }}
            >
              <h1 className="text-[120px] sm:text-[180px] md:text-[220px] font-black leading-none bg-gradient-to-br from-[#0077ff] via-blue-500 to-cyan-400 bg-clip-text text-transparent tracking-tighter">
                <AnimatedDigit digit="4" delay={0} />
                <AnimatedDigit digit="0" delay={0.1} />
                <AnimatedDigit digit="4" delay={0.2} />
              </h1>
            </div>
            
            {/* Floating Icon */}
            <motion.div
              animate={{ 
                y: [-15, 15, -15],
                rotate: [0, 10, -10, 0],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <motion.div 
                whileHover={{ scale: 1.2, rotate: 180 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-[#0077ff] to-blue-600 shadow-2xl shadow-blue-500/40 flex items-center justify-center cursor-pointer"
              >
                <Frown className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
              </motion.div>
            </motion.div>
          </motion.div>
        </Tilt3DCard>

        {/* Fun Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <motion.p
            key={funMessage}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-xl sm:text-2xl font-medium text-gray-600 dark:text-gray-300 flex items-center justify-center gap-2"
          >
            {funMessage}
            <motion.button
              whileHover={{ rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              onClick={refreshMessage}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Другое сообщение"
              type="button"
            >
              <RefreshCw className="w-4 h-4 text-gray-400" />
            </motion.button>
          </motion.p>
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Страница не найдена
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-lg mx-auto">
            Страница, которую вы ищете, не существует, была перемещена или временно недоступна.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Button
            to="/"
            size="lg"
            className="w-full sm:w-auto gap-2 group"
          >
            <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
            На главную
          </Button>
          <Button
            onClick={() => window.history.back()}
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto gap-2 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Назад
          </Button>
        </motion.div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-12 text-xs text-gray-400 dark:text-gray-600"
        >
          Такое бывает даже с лучшими из нас 🤷‍♂️
        </motion.p>
      </div>
    </div>
  )
}