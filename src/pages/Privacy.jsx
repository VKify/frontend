import { motion } from 'framer-motion'
import { Shield, Database, Eye, Lock, Mail, Calendar } from 'lucide-react'
import SEO from '../components/common/SEO'

const sections = [
  {
    icon: Database,
    title: 'Какие данные мы собираем',
    content: `VKify не собирает и не передаёт никакие персональные данные пользователей. Мы придерживаемся принципа "нулевого сбора данных". Все настройки расширения хранятся исключительно локально в вашем браузере.`,
  },
  {
    icon: Eye,
    title: 'Как мы используем данные',
    content: `Поскольку мы не собираем данные, нам нечего использовать. Расширение работает полностью автономно. Все ваши предпочтения, настройки тем и других функций остаются только на вашем устройстве.`,
  },
  {
    icon: Lock,
    title: 'Хранение данных',
    content: `Все данные хранятся локально в хранилище браузера (chrome.storage.local). Это означает, что ваши настройки доступны только вам и не покидают ваше устройство. При удалении расширения все данные также удаляются.`,
  },
  {
    icon: Shield,
    title: 'Сторонние сервисы',
    content: `VKify не использует сторонние сервисы аналитики, рекламные сети или трекеры. Мы не интегрируемся с какими-либо внешними платформами, которые могли бы собирать информацию о вас.`,
  },
  {
    icon: Mail,
    title: 'Контакты для вопросов',
    content: `Если у вас есть вопросы о конфиденциальности или работе расширения, вы можете связаться с нами через Telegram (@vkify) или группу ВКонтакте. Мы всегда рады помочь и ответить на ваши вопросы.`,
  },
]

export default function Privacy() {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-white dark:bg-gray-950">
      <SEO 
        title="Политика конфиденциальности"
        description="Узнайте, как VKify защищает вашу конфиденциальность. Мы не собираем никаких данных."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#0077ff]/10 mb-6">
            <Shield className="w-8 h-8 text-[#0077ff]" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Политика{' '}
            <span className="bg-gradient-to-r from-[#0077ff] to-blue-400 bg-clip-text text-transparent">
              конфиденциальности
            </span>
          </h1>
          <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400">
            <Calendar className="w-4 h-4" />
            <span>Последнее обновление: 28 января 2026</span>
          </div>
        </motion.div>

        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-2xl border-2 border-[#0077ff]/20 bg-[#0077ff]/5 mb-12"
        >
          <p className="text-lg text-center text-gray-700 dark:text-gray-300">
            <strong className="text-gray-900 dark:text-white">Главное:</strong> VKify не собирает, не хранит и не передаёт 
            никакие ваши данные. Ваша приватность — наш приоритет.
          </p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 2) }}
              className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#0077ff]/10 flex items-center justify-center flex-shrink-0">
                  <section.icon className="w-6 h-6 text-[#0077ff]" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {section.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}