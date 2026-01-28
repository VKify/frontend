import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Download, Chrome, Sparkles, Shield, Palette, Zap, Play, Star, Globe } from 'lucide-react'
import Button from '../common/Button'
import Hero3DCard from './Hero3DCard'
import config from '../../config'
import { getLatestVersion } from '../../data/changelog'
import { scrollToElement } from '../../utils/scroll'

const features = [
  { Icon: Palette, label: 'Темы', color: 'from-purple-500 to-pink-500' },
  { Icon: Shield, label: 'Приватность', color: 'from-green-500 to-emerald-500' },
  { Icon: Zap, label: 'Скорость', color: 'from-yellow-500 to-orange-500' },
  { Icon: Sparkles, label: 'Функции', color: 'from-blue-500 to-cyan-500' },
]

export default function Hero() {
  // Получаем последнюю версию из changelog
  const latestVersion = useMemo(() => {
    const latest = getLatestVersion()
    return latest?.version || '1.0.0'
  }, [])

  const handleScrollToFeatures = () => {
    scrollToElement('features')
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-gray-950">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,119,255,0.15),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,119,255,0.3),rgba(0,0,0,0))]" />
        
        <motion.div
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-gradient-to-r from-cyan-400/30 to-blue-400/30 rounded-full blur-3xl"
        />
      </div>

      {/* Dot Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link 
                to="/changelog"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 hover:border-blue-500/40 transition-colors group"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-[#0077ff] transition-colors">
                  Версия {latestVersion} доступна
                </span>
                <ArrowRight className="w-3 h-3 text-gray-400 group-hover:text-[#0077ff] group-hover:translate-x-0.5 transition-all" />
              </Link>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-8 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight"
            >
              <span className="text-gray-900 dark:text-white">Новый уровень</span>
              <br />
              <span className="bg-gradient-to-r from-[#0077ff] via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                ВКонтакте
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-xl mx-auto lg:mx-0"
            >
              Кастомизируйте VK под себя: уникальные темы, блокировка рекламы, 
              расширенная приватность и 50+ функций в одном расширении
            </motion.p>

            {/* Feature Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-2 justify-center lg:justify-start"
            >
              {features.map(({ Icon, label, color }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 cursor-default"
                >
                  <div className={`w-5 h-5 rounded-md bg-gradient-to-br ${color} flex items-center justify-center`}>
                    <Icon className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-10 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <Button
                href={config.links.chromeWebStore}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                className="w-full sm:w-auto gap-2 group shadow-lg shadow-blue-500/25"
              >
                <Chrome className="w-5 h-5" />
                <span>Установить бесплатно</span>
                <Download className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
              </Button>
              
              <Button
                onClick={handleScrollToFeatures}
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto gap-2"
              >
                <Play className="w-4 h-4" />
                <span>Смотреть демо</span>
              </Button>
            </motion.div>

            {/* Supported Browsers */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-10 flex flex-wrap items-center gap-4 justify-center lg:justify-start"
            >
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Работает в:
              </span>

              <div className="flex items-center gap-3">
                {/* Chrome */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                  bg-yellow-100 text-yellow-800
                  dark:bg-yellow-500/20 dark:text-yellow-300
                  text-sm">
                  <Globe className="w-4 h-4" />
                  <span>Chrome</span>
                </div>

                {/* Edge */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                  bg-blue-100 text-blue-800
                  dark:bg-blue-500/20 dark:text-blue-300
                  text-sm">
                  <Globe className="w-4 h-4" />
                  <span>Edge</span>
                </div>

                {/* Opera */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                  bg-red-100 text-red-800
                  dark:bg-red-500/20 dark:text-red-300
                  text-sm">
                  <Globe className="w-4 h-4" />
                  <span>Opera</span>
                </div>
              </div>
            </motion.div>

            {/* Social Proof - раскомментировать когда будет больше пользователей
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-10 flex items-center gap-6 justify-center lg:justify-start"
            >
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">4.9</span>
              </div>
              <div className="h-4 w-px bg-gray-300 dark:bg-gray-600" />
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold text-gray-700 dark:text-gray-300">10K+</span> пользователей
              </div>
            </motion.div>
            */}
          </div>

          {/* Right Column - Visual */}
          <Hero3DCard />
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-gray-950 to-transparent pointer-events-none" />

      {/* Scroll Indicator */}
      <motion.button
        onClick={handleScrollToFeatures}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
      >
        <span className="text-xs font-medium">Узнать больше</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowRight className="w-4 h-4 rotate-90" />
        </motion.div>
      </motion.button>
    </section>
  )
}