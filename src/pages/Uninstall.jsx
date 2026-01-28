import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Frown, RefreshCw, Heart } from 'lucide-react'
import SEO from '../components/common/SEO'
import Button from '../components/common/Button'
import FeedbackForm from '../components/uninstall/FeedbackForm'
import { TelegramIcon, VKIcon } from '../components/common/SocialIcons'
import config from '../config'

export default function Uninstall() {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-gray-950">
      <SEO 
        title="Жаль, что вы уходите"
        description="Помогите нам стать лучше — расскажите, почему вы удалили VKify."
      />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-6"
          >
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-2xl shadow-orange-500/30">
              <Frown className="w-12 h-12 text-white" />
            </div>
          </motion.div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Жаль, что вы уходите 😢
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Мы постоянно работаем над улучшением VKify. Ваш отзыв поможет нам стать лучше.
          </p>
        </motion.div>

        {/* Feedback Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <FeedbackForm />
        </motion.div>

        {/* Second Chance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 mb-12 shadow-sm"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Может, дать ещё один шанс?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Мы выпустили много обновлений — возможно, проблема уже решена!
          </p>
          <Button
            href={config.links.chromeWebStore}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            className="gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Установить снова
          </Button>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Есть вопросы или предложения? Свяжитесь с нами:
          </p>
          <div className="flex items-center justify-center gap-4">
            <a
              href={config.links.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-[#0088cc]/10 text-gray-700 dark:text-gray-300 hover:text-[#0088cc] transition-colors"
            >
              <TelegramIcon className="w-5 h-5" />
              Telegram
            </a>
            <a
              href={config.links.vk}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-[#0077ff]/10 text-gray-700 dark:text-gray-300 hover:text-[#0077ff] transition-colors"
            >
              <VKIcon className="w-5 h-5" />
              ВКонтакте
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}