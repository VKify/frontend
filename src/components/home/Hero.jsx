import { motion } from 'framer-motion'
import { ArrowRight, Download, Sparkles, Shield, Palette, Lock } from 'lucide-react'
import Button from '../common/Button'
import InstallButton from '../common/InstallButton'
import Hero3DCard from './Hero3DCard'
import config from '../../config'
import { useTranslation } from '../../i18n'
import { scrollToElement } from '../../utils/scroll'

const features = [
  { Icon: Palette, id: 'themes', color: 'from-purple-500 to-pink-500' },
  { Icon: Shield, id: 'adblock', color: 'from-green-500 to-emerald-500' },
  { Icon: Lock, id: 'privacy', color: 'from-orange-500 to-red-500' },
  { Icon: Download, id: 'download', color: 'from-blue-500 to-cyan-500' },
]

export default function Hero() {
  const { t } = useTranslation()

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
            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display font-black leading-[0.95] tracking-tight text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-gray-900 dark:text-white"
            >
              {t('hero.h.make')}{' '}
              <span className="font-serif font-bold italic">{t('hero.h.your')}</span>{' '}
              {t('hero.h.vk')}{' '}
              <span className="text-[#0077ff]">{t('hero.h.quiet')}</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-xl mx-auto lg:mx-0"
            >
              {t('hero.subtitle', { features: config.stats.features })}
            </motion.p>

            {/* Feature Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-8 flex flex-wrap gap-2 justify-center lg:justify-start"
            >
              {features.map(({ Icon, id, color }) => (
                <motion.div
                  key={id}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 cursor-default"
                >
                  <div className={`w-5 h-5 rounded-md bg-gradient-to-br ${color} flex items-center justify-center`}>
                    <Icon className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t(`hero.pills.${id}`)}</span>
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
              <InstallButton
                size="md"
                label={t('common.installFree')}
                className="w-full sm:w-auto"
              />

              <Button
                onClick={handleScrollToFeatures}
                variant="secondary"
                size="md"
                className="w-full sm:w-auto gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>{t('common.allFeatures')}</span>
              </Button>
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
      >
        <span className="text-xs font-medium">{t('common.learnMore')}</span>
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