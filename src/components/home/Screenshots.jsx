import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X, ZoomIn, Palette, ShieldOff, Code, Eye } from 'lucide-react'
import Section from '../common/Section'

const screenshots = [
  {
    id: 1,
    title: 'Настройки тем',
    description: 'Выбирайте из 12 готовых цветовых схем или создайте свою',
    icon: Palette,
    color: 'from-purple-500 to-pink-500',
    mockup: 'themes',
  },
  {
    id: 2,
    title: 'Блокировка рекламы',
    description: 'Чистая лента без промо-постов, историй и рекомендаций',
    icon: ShieldOff,
    color: 'from-green-500 to-emerald-500',
    mockup: 'adblock',
  },
  {
    id: 3,
    title: 'CSS-редактор',
    description: 'Полная свобода кастомизации с подсветкой синтаксиса',
    icon: Code,
    color: 'from-blue-500 to-cyan-500',
    mockup: 'css',
  },
  {
    id: 4,
    title: 'Режим невидимки',
    description: 'Скрывайте онлайн-статус, просмотры и набор текста',
    icon: Eye,
    color: 'from-orange-500 to-red-500',
    mockup: 'privacy',
  },
]

// Компонент мокапа для разных типов скриншотов
function ScreenMockup({ type, isActive }) {
  const baseClasses = "w-full h-full"
  
  if (type === 'themes') {
    return (
      <div className={baseClasses + " bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-6"}>
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="h-10 bg-white dark:bg-gray-800 rounded-lg mb-4 flex items-center px-4 gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500" />
            <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
          {/* Theme grid */}
          <div className="flex-1 grid grid-cols-4 gap-3">
            {['#0077ff', '#9333ea', '#22c55e', '#f97316', '#ef4444', '#ec4899', '#06b6d4', '#eab308'].map((color, i) => (
              <motion.div
                key={i}
                initial={false}
                animate={isActive ? { scale: [0.8, 1], opacity: [0, 1] } : { scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-xl flex items-center justify-center"
                style={{ backgroundColor: color + '20', border: `2px solid ${color}` }}
              >
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color }} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  
  if (type === 'adblock') {
    return (
      <div className={baseClasses + " bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-6"}>
        <div className="h-full flex gap-4">
          {/* Sidebar */}
          <div className="w-1/4 bg-white dark:bg-gray-800 rounded-xl p-3 space-y-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-8 bg-gray-100 dark:bg-gray-700 rounded-lg" />
            ))}
          </div>
          {/* Feed */}
          <div className="flex-1 space-y-4">
            {[1, 2].map((i) => (
              <motion.div
                key={i}
                initial={false}
                animate={isActive ? { x: [20, 0], opacity: [0, 1] } : { x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 h-32"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500" />
                  <div className="space-y-1">
                    <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded" />
                    <div className="w-16 h-2 bg-gray-100 dark:bg-gray-600 rounded" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded" />
                  <div className="w-3/4 h-2 bg-gray-100 dark:bg-gray-700 rounded" />
                </div>
              </motion.div>
            ))}
            {/* Blocked ad indicator */}
            <motion.div
              initial={false}
              animate={isActive ? { scale: [0.9, 1], opacity: [0, 1] } : { scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center gap-2 py-2 text-green-500"
            >
              <ShieldOff className="w-4 h-4" />
              <span className="text-xs font-medium">3 рекламных поста скрыто</span>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }
  
  if (type === 'css') {
    return (
      <div className={baseClasses + " bg-gray-900 p-4 font-mono text-sm"}>
        <div className="flex gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <motion.div
          initial={false}
          animate={isActive ? { opacity: [0, 1] } : { opacity: 1 }}
          className="space-y-1 text-xs sm:text-sm"
        >
          <div><span className="text-purple-400">.vk_feed</span> <span className="text-white">{'{'}</span></div>
          <div className="pl-4"><span className="text-cyan-400">background</span><span className="text-white">:</span> <span className="text-orange-400">#1a1a2e</span><span className="text-white">;</span></div>
          <div className="pl-4"><span className="text-cyan-400">border-radius</span><span className="text-white">:</span> <span className="text-green-400">16px</span><span className="text-white">;</span></div>
          <div className="pl-4"><span className="text-cyan-400">padding</span><span className="text-white">:</span> <span className="text-green-400">20px</span><span className="text-white">;</span></div>
          <div><span className="text-white">{'}'}</span></div>
          <div className="mt-2"><span className="text-purple-400">.post_header</span> <span className="text-white">{'{'}</span></div>
          <div className="pl-4"><span className="text-cyan-400">color</span><span className="text-white">:</span> <span className="text-orange-400">#fff</span><span className="text-white">;</span></div>
          <div><span className="text-white">{'}'}</span></div>
        </motion.div>
      </div>
    )
  }
  
  if (type === 'privacy') {
    return (
      <div className={baseClasses + " bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-6"}>
        <div className="max-w-xs mx-auto space-y-4">
          {[
            { label: 'Скрыть онлайн', active: true },
            { label: 'Скрыть набор текста', active: true },
            { label: 'Скрыть просмотр историй', active: false },
            { label: 'Скрыть прочтение', active: true },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={false}
              animate={isActive ? { x: [-20, 0], opacity: [0, 1] } : { x: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-xl p-4"
            >
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.label}</span>
              <div className={`w-12 h-6 rounded-full p-1 transition-colors ${item.active ? 'bg-orange-500' : 'bg-gray-300 dark:bg-gray-600'}`}>
                <div 
                  className={`w-4 h-4 rounded-full bg-white shadow transition-transform ${item.active ? 'translate-x-6' : 'translate-x-0'}`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    )
  }
  
  return null
}

export default function Screenshots() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % screenshots.length)
  }, [])

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length)
  }, [])

  // Автоплей
  useEffect(() => {
    if (!isAutoPlaying || isLightboxOpen) return
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [isAutoPlaying, isLightboxOpen, next])

  // Клавиатурная навигация
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'Escape') setIsLightboxOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [next, prev])

  // Блокируем скролл при открытом лайтбоксе
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isLightboxOpen])

  const currentScreenshot = screenshots[currentIndex]

  // Компонент превью-карточки
  const ThumbnailCard = ({ screenshot, index }) => {
    const isActive = index === currentIndex
    const Icon = screenshot.icon
    
    return (
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => { 
          setCurrentIndex(index)
          setIsAutoPlaying(false)
        }}
        className={`
          relative w-full p-4 rounded-2xl text-left transition-all duration-300
          ${isActive 
            ? 'bg-white dark:bg-gray-800 shadow-xl border-2 border-blue-500' 
            : 'bg-gray-100 dark:bg-gray-800/50 border-2 border-transparent hover:bg-white dark:hover:bg-gray-800'
          }
        `}
      >
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 flex-shrink-0 rounded-xl bg-gradient-to-br ${screenshot.color} flex items-center justify-center`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0">
            <div className="font-semibold text-gray-900 dark:text-white text-sm">
              {screenshot.title}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {screenshot.description}
            </div>
          </div>
        </div>
      </motion.button>
    )
  }

  return (
    <Section id="screenshots" variant="default">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Посмотрите{' '}
            <span className="bg-gradient-to-r from-[#0077ff] to-cyan-400 bg-clip-text text-transparent">
              VKify в действии
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Интерактивные превью основных функций расширения
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 items-center">
          {/* Thumbnails - Left Side */}
          <div className="hidden lg:flex flex-col gap-4 order-1">
            {screenshots.slice(0, 2).map((screenshot, index) => (
              <ThumbnailCard 
                key={screenshot.id} 
                screenshot={screenshot} 
                index={index} 
              />
            ))}
          </div>

          {/* Main Preview */}
          <div 
            className="lg:col-span-3 order-2"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Glow effect */}
              <div className={`absolute -inset-4 bg-gradient-to-r ${currentScreenshot.color} opacity-20 blur-3xl rounded-3xl transition-all duration-500`} />
              
              {/* Browser frame */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                {/* Browser header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-white dark:bg-gray-900 text-sm text-gray-500">
                      <div className="w-4 h-4 rounded bg-green-500/20 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                      </div>
                      <span>vk.com</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsLightboxOpen(true)}
                    className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Открыть на весь экран"
                  >
                    <ZoomIn className="w-4 h-4 text-gray-500" />
                  </button>
                </div>

                {/* Screenshot content */}
                <div className="aspect-video relative overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0"
                    >
                      <ScreenMockup type={currentScreenshot.mockup} isActive={true} />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Caption bar */}
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">
                        {currentScreenshot.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {currentScreenshot.description}
                      </p>
                    </div>
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${currentScreenshot.color} flex items-center justify-center`}>
                      <currentScreenshot.icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none px-2 -mx-4 lg:-mx-14">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={prev}
                  className="pointer-events-auto p-3 rounded-full bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:text-blue-500 transition-colors"
                  aria-label="Предыдущий скриншот"
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={next}
                  className="pointer-events-auto p-3 rounded-full bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:text-blue-500 transition-colors"
                  aria-label="Следующий скриншот"
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>

            {/* Progress dots */}
            <div className="flex justify-center gap-2 mt-6">
              {screenshots.map((_, index) => (
                <button
                  key={index}
                  onClick={() => { 
                    setCurrentIndex(index)
                    setIsAutoPlaying(false)
                  }}
                  className="relative h-2 rounded-full overflow-hidden transition-all duration-300"
                  style={{ width: index === currentIndex ? 32 : 8 }}
                  aria-label={`Перейти к скриншоту ${index + 1}`}
                >
                  <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700" />
                  {index === currentIndex && isAutoPlaying && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 5, ease: 'linear' }}
                      className="absolute inset-0 bg-blue-500 origin-left"
                    />
                  )}
                  {index === currentIndex && !isAutoPlaying && (
                    <div className="absolute inset-0 bg-blue-500" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Thumbnails - Right Side */}
          <div className="hidden lg:flex flex-col gap-4 order-3">
            {screenshots.slice(2, 4).map((screenshot, index) => (
              <ThumbnailCard 
                key={screenshot.id} 
                screenshot={screenshot} 
                index={index + 2} 
              />
            ))}
          </div>
        </div>

        {/* Mobile thumbnails */}
        <div className="flex lg:hidden justify-center gap-3 mt-6 overflow-x-auto pb-2">
          {screenshots.map((screenshot, index) => {
            const Icon = screenshot.icon
            return (
              <motion.button
                key={screenshot.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => { 
                  setCurrentIndex(index)
                  setIsAutoPlaying(false)
                }}
                className={`
                  flex-shrink-0 p-3 rounded-xl transition-all
                  ${index === currentIndex 
                    ? 'bg-white dark:bg-gray-800 shadow-lg border-2 border-blue-500' 
                    : 'bg-gray-100 dark:bg-gray-800/50 border-2 border-transparent'
                  }
                `}
                aria-label={screenshot.title}
              >
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${screenshot.color} flex items-center justify-center`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4"
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-4 right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
              onClick={() => setIsLightboxOpen(false)}
              aria-label="Закрыть"
            >
              <X className="w-6 h-6 text-white" />
            </motion.button>

            {/* Content container */}
            <div className="flex flex-col items-center justify-center w-full max-w-5xl">
              {/* Screenshot */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="w-full rounded-2xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="aspect-video">
                  <ScreenMockup type={currentScreenshot.mockup} isActive={true} />
                </div>
              </motion.div>

              {/* Info below screenshot */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mt-6 text-center"
              >
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  {currentScreenshot.title}
                </h3>
                <p className="text-white/60 text-sm sm:text-base max-w-md">
                  {currentScreenshot.description}
                </p>
              </motion.div>

              {/* Dots indicator */}
              <div className="flex justify-center gap-2 mt-6">
                {screenshots.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => { 
                      e.stopPropagation()
                      setCurrentIndex(index)
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex 
                        ? 'bg-white w-6' 
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`Перейти к скриншоту ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Navigation arrows */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Предыдущий"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Следующий"
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  )
}