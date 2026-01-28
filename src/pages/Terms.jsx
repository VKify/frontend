import { motion } from 'framer-motion'
import { FileText, CheckCircle, AlertCircle, Scale, Mail, Calendar } from 'lucide-react'
import SEO from '../components/common/SEO'

const sections = [
  {
    icon: FileText,
    title: 'Описание сервиса',
    content: `VKify — это бесплатное браузерное расширение для кастомизации социальной сети ВКонтакте. Расширение предоставляет возможности изменения внешнего вида, блокировки рекламы и дополнительные функции для улучшения пользовательского опыта.`,
  },
  {
    icon: CheckCircle,
    title: 'Правила использования',
    items: [
      'Использовать расширение только в личных целях',
      'Не нарушать правила использования сайта vk.com',
      'Не использовать расширение для спама или вредоносных действий',
      'Не пытаться обойти системы безопасности ВКонтакте',
      'Не распространять модифицированные версии расширения',
    ],
  },
  {
    icon: AlertCircle,
    title: 'Ограничение ответственности',
    content: `VKify предоставляется "как есть" без каких-либо гарантий. Мы не несём ответственности за любые изменения в работе ВКонтакте, временную недоступность функций, любые последствия использования расширения или действия администрации ВКонтакте в отношении вашего аккаунта. Используйте расширение на свой страх и риск.`,
  },
  {
    icon: Scale,
    title: 'Изменения в соглашении',
    content: `Мы оставляем за собой право изменять условия данного соглашения в любое время. Продолжая использовать расширение после внесения изменений, вы соглашаетесь с новыми условиями. Рекомендуем периодически проверять эту страницу.`,
  },
  {
    icon: Mail,
    title: 'Контактная информация',
    content: `По всем вопросам, связанным с использованием VKify, вы можете обратиться к нам через Telegram (@vkify), ВКонтакте (vk.com/vkify) или GitHub (github.com/rianvy/vkify). Мы стараемся отвечать на все обращения в течение 24-48 часов.`,
  },
]

export default function Terms() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24 pb-16 bg-white dark:bg-gray-950"
    >
      <SEO 
        title="Условия использования"
        description="Условия использования браузерного расширения VKify."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#0077ff]/10 mb-6">
            <FileText className="w-8 h-8 text-[#0077ff]" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Условия{' '}
            <span className="bg-gradient-to-r from-[#0077ff] to-blue-400 bg-clip-text text-transparent">
              использования
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
          className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 mb-12"
        >
          <p className="text-lg text-center text-gray-700 dark:text-gray-300">
            Пожалуйста, внимательно прочитайте условия использования перед 
            установкой и использованием расширения VKify.
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
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {section.title}
                  </h2>
                  {section.content && (
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {section.content}
                    </p>
                  )}
                  {section.items && (
                    <ul className="space-y-2">
                      {section.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#0077ff] mt-2 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-400">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center text-gray-500 dark:text-gray-400"
        >
          <p>
            Если у вас есть вопросы относительно данных условий, пожалуйста, 
            свяжитесь с нами перед использованием расширения.
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}