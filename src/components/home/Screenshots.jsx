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
      <div className={baseClasses + " bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-4 sm:p-6"}>
        <div className="h-full flex flex-col">
          <div className="h-8 sm:h-10 bg-white dark:bg-gray-800 rounded-lg mb-3 sm:mb-4 flex items-center px-3 sm:px-4 gap-2">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-purple-500" />
            <div className="w-16 sm:w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
          <div className="flex-1 grid grid-cols-4 gap-2 sm:gap-3">
            {['#0077ff', '#9333ea', '#22c55e', '#f97316', '#ef4444', '#ec4899', '#06b6d4', '#eab308'].map((color, i) => (
              <motion.div
                key={i}
                initial={false}
                animate={isActive ? { scale: [0.8, 1], opacity: [0, 1] } : { scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-lg sm:rounded-xl flex items-center justify-center"
                style={{ backgroundColor: color + '20', border: `2px solid ${color}` }}
              >
                <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full" style={{ backgroundColor: color }} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  
  if (type === 'adblock') {
    return (
      <div className={baseClasses + " bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-4 sm:p-6"}>
        <div className="h-full flex gap-3 sm:gap-4">
          <div className="hidden sm:block w-1/4 bg-white dark:bg-gray-800 rounded-xl p-2 sm:p-3 space-y-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-6 sm:h-8 bg-gray-100 dark:bg-gray-700 rounded-lg" />
            ))}
          </div>
          <div className="flex-1 space-y-3 sm:space-y-4">
            {[1, 2].map((i) => (
              <motion.div
                key={i}
                initial={false}
                animate={isActive ? { x: [20, 0], opacity: [0, 1] } : { x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-3 sm:p-4 h-24 sm:h-32"
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex-shrink-0" />
                  <div className="space-y-1 min-w-0">
                    <div className="w-20 sm:w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded" />
                    <div className="w-14 sm:w-16 h-2 bg-gray-100 dark:bg-gray-600 rounded" />
                  </div>
                </div>
                <div className="space-y-1.5 sm:space-y-2">
                  <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded" />
                  <div className="w-3/4 h-2 bg-gray-100 dark:bg-gray-700 rounded" />
                </div>
              </motion.div>
            ))}
            <motion.div
              initial={false}
              animate={isActive ? { scale: [0.9, 1], opacity: [0, 1] } : { scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center gap-2 py-2 text-green-500"
            >
              <ShieldOff className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-[10px] sm:text-xs font-medium">3 рекламных поста скрыто</span>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }
  
  if (type === 'css') {
    return (
      <div className={baseClasses + " bg-gray-900 p-3 sm:p-4 font-mono"}>
        <motion.div
          initial={false}
          animate={isActive ? { opacity: [0, 1] } : { opacity: 1 }}
          className="space-y-0.5 sm:space-y-1 text-[10px] sm:text-xs md:text-sm overflow-x-auto"
        >
          <div><span className="text-purple-400">.vk_feed</span> <span className="text-white">{'{'}</span></div>
          <div className="pl-3 sm:pl-4"><span className="text-cyan-400">background</span><span className="text-white">:</span> <span className="text-orange-400">#1a1a2e</span><span className="text-white">;</span></div>
          <div className="pl-3 sm:pl-4"><span className="text-cyan-400">border-radius</span><span className="text-white">:</span> <span className="text-green-400">16px</span><span className="text-white">;</span></div>
          <div className="pl-3 sm:pl-4"><span className="text-cyan-400">padding</span><span className="text-white">:</span> <span className="text-green-400">20px</span><span className="text-white">;</span></div>
          <div><span className="text-white">{'}'}</span></div>
          <div className="mt-1 sm:mt-2"><span className="text-purple-400">.post_header</span> <span className="text-white">{'{'}</span></div>
          <div className="pl-3 sm:pl-4"><span className="text-cyan-400">color</span><span className="text-white">:</span> <span className="text-orange-400">#fff</span><span className="text-white">;</span></div>
          <div><span className="text-white">{'}'}</span></div>
        </motion.div>
      </div>
    )
  }
  
  if (type === 'privacy') {
    return (
      <div className={baseClasses + " bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-4 sm:p-6"}>
        <div className="max-w-xs mx-auto space-y-2 sm:space-y-4">
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
              className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-3 sm:p-4"
            >
              <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">{item.label}</span>
              <div className={`w-10 sm:w-12 h-5 sm:h-6 rounded-full p-0.5 sm:p-1 transition-colors flex-shrink-0 ${item.active ? 'bg-orange-500' : 'bg-gray-300 dark:bg-gray-600'}`}>
                <div 
                  className={`w-4 h-4 rounded-full bg-white shadow transition-transform ${item.active ? 'translate-x-5 sm:translate-x-6' : 'translate-x-0'}`}
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
  const [touchStart, setTouchStart] = useState(null)

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % screenshots.length)
  }, [])

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length)
  }, [])

  useEffect(() => {
    if (!isAutoPlaying || isLightboxOpen) return
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [isAutoPlaying, isLightboxOpen, next])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'Escape') setIsLightboxOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [next, prev])

  useEffect(() => {
    document.body.style.overflow = isLightboxOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isLightboxOpen])

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchEnd = (e) => {
    if (!touchStart) return
    const touchEnd = e.changedTouches[0].clientX
    const diff = touchStart - touchEnd

    if (Math.abs(diff) > 50) {
      if (diff > 0) next()
      else prev()
      setIsAutoPlaying(false)
    }
    setTouchStart(null)
  }

  const currentScreenshot = screenshots[currentIndex]

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
          relative w-full p-3 xl:p-4 rounded-xl xl:rounded-2xl text-left transition-all duration-300
          ${isActive 
            ? 'bg-white dark:bg-gray-800 shadow-xl border-2 border-blue-500' 
            : 'bg-gray-100 dark:bg-gray-800/50 border-2 border-transparent hover:bg-white dark:hover:bg-gray-800'
          }
        `}
      >
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 xl:w-10 xl:h-10 flex-shrink-0 rounded-lg xl:rounded-xl bg-gradient-to-br ${screenshot.color} flex items-center justify-center`}>
            <Icon className="w-4 h-4 xl:w-5 xl:h-5 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-semibold text-gray-900 dark:text-white text-xs xl:text-sm truncate">
              {screenshot.title}
            </div>
            <div className="text-[10px] xl:text-xs text-gray-500 dark:text-gray-400 truncate">
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
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Посмотрите{' '}
            <span className="bg-gradient-to-r from-[#0077ff] to-cyan-400 bg-clip-text text-transparent">
              VKify в действии
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Интерактивные превью основных функций расширения
          </p>
        </motion.div>

{/* Desktop Layout */}
<div className="hidden lg:flex gap-6 xl:gap-8 items-center">
  {/* Thumbnails - Left Side */}
  <div className="w-52 xl:w-64 flex-shrink-0 flex flex-col gap-3 xl:gap-4">
    {screenshots.slice(0, 2).map((screenshot, index) => (
      <ThumbnailCard 
        key={screenshot.id} 
        screenshot={screenshot} 
        index={index} 
      />
    ))}
  </div>

  {/* Main Preview - Center (занимает всё оставшееся место) */}
  <div 
    className="flex-1 min-w-0"
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
        <div className="flex items-center px-4 py-3 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex gap-1.5 w-14 flex-shrink-0">
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
          
          <div className="w-14 flex-shrink-0 flex justify-end">
            <button
              onClick={() => setIsLightboxOpen(true)}
              className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Открыть на весь экран"
            >
              <ZoomIn className="w-4 h-4 text-gray-500" />
            </button>
          </div>
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
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0 flex-1">
              <h3 className="font-bold text-gray-900 dark:text-white">
                {currentScreenshot.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {currentScreenshot.description}
              </p>
            </div>
            <div className={`w-10 h-10 flex-shrink-0 rounded-xl bg-gradient-to-br ${currentScreenshot.color} flex items-center justify-center`}>
              <currentScreenshot.icon className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        {/* Navigation buttons - внутри карточки */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:text-blue-500 hover:scale-110 transition-all z-10"
          aria-label="Предыдущий скриншот"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:text-blue-500 hover:scale-110 transition-all z-10"
          aria-label="Следующий скриншот"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
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
  <div className="w-52 xl:w-64 flex-shrink-0 flex flex-col gap-3 xl:gap-4">
    {screenshots.slice(2, 4).map((screenshot, index) => (
      <ThumbnailCard 
        key={screenshot.id} 
        screenshot={screenshot} 
        index={index + 2} 
      />
    ))}
  </div>
</div>

        {/* Mobile/Tablet Layout */}
        <div 
          className="lg:hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Glow effect */}
            <div className={`absolute -inset-2 bg-gradient-to-r ${currentScreenshot.color} opacity-20 blur-2xl rounded-2xl transition-all duration-500`} />
            
            {/* Browser frame */}
            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              {/* Browser header */}
              <div className="flex items-center px-3 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div className="flex gap-1.5 w-12 flex-shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                </div>
                
                <div className="flex-1 flex justify-center">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white dark:bg-gray-900 text-xs text-gray-500">
                    <div className="w-3 h-3 rounded bg-green-500/20 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    </div>
                    <span>vk.com</span>
                  </div>
                </div>
                
                <div className="w-12 flex-shrink-0 flex justify-end">
                  <button
                    onClick={() => setIsLightboxOpen(true)}
                    className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Открыть на весь экран"
                  >
                    <ZoomIn className="w-3.5 h-3.5 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Screenshot content */}
              <div className="aspect-video relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <ScreenMockup type={currentScreenshot.mockup} isActive={true} />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Caption bar */}
              <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm">
                      {currentScreenshot.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {currentScreenshot.description}
                    </p>
                  </div>
                  <div className={`w-8 h-8 flex-shrink-0 rounded-lg bg-gradient-to-br ${currentScreenshot.color} flex items-center justify-center`}>
                    <currentScreenshot.icon className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Progress dots */}
          <div className="flex justify-center gap-1.5 mt-4">
            {screenshots.map((_, index) => (
              <button
                key={index}
                onClick={() => { 
                  setCurrentIndex(index)
                  setIsAutoPlaying(false)
                }}
                className="relative h-1.5 rounded-full overflow-hidden transition-all duration-300"
                style={{ width: index === currentIndex ? 24 : 6 }}
                aria-label={`Перейти к скриншоту ${index + 1}`}
              >
                <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700" />
                {index === currentIndex && (
                  <div className="absolute inset-0 bg-blue-500" />
                )}
              </button>
            ))}
          </div>

          {/* Swipe hint */}
          <p className="text-center text-xs text-gray-400 mt-2">
            ← Свайпайте для переключения →
          </p>

          {/* Mobile thumbnails */}
          <div className="flex justify-center gap-2 mt-4 overflow-x-auto pb-2 pt-2">
            {screenshots.map((screenshot, index) => {
              const Icon = screenshot.icon
              return (
                <button
                  key={screenshot.id}
                  onClick={() => { 
                    setCurrentIndex(index)
                    setIsAutoPlaying(false)
                  }}
                  className={`
                    flex-shrink-0 p-2.5 rounded-lg transition-all
                    ${index === currentIndex 
                      ? 'bg-white dark:bg-gray-800 shadow-lg ring-2 ring-blue-500' 
                      : 'bg-gray-100 dark:bg-gray-800/50'
                    }
                  `}
                  aria-label={screenshot.title}
                >
                  <div className={`w-7 h-7 rounded-md bg-gradient-to-br ${screenshot.color} flex items-center justify-center`}>
                    <Icon className="w-3.5 h-3.5 text-white" />
                  </div>
                </button>
              )
            })}
          </div>
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
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Close button */}
            <button
              className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
              onClick={() => setIsLightboxOpen(false)}
              aria-label="Закрыть"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>

            {/* Content */}
            <div className="flex flex-col items-center justify-center w-full max-w-5xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="w-full rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="aspect-video">
                  <ScreenMockup type={currentScreenshot.mockup} isActive={true} />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mt-4 sm:mt-6 text-center px-4"
              >
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2">
                  {currentScreenshot.title}
                </h3>
                <p className="text-white/60 text-sm sm:text-base max-w-md">
                  {currentScreenshot.description}
                </p>
              </motion.div>

              {/* Dots */}
              <div className="flex justify-center gap-2 mt-4 sm:mt-6">
                {screenshots.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => { 
                      e.stopPropagation()
                      setCurrentIndex(index)
                    }}
                    className={`h-2 rounded-full transition-all ${
                      index === currentIndex 
                        ? 'bg-white w-6' 
                        : 'bg-white/30 hover:bg-white/50 w-2'
                    }`}
                    aria-label={`Перейти к скриншоту ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Navigation arrows */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="hidden sm:block absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Предыдущий"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="hidden sm:block absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Следующий"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  )
}