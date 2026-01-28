import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Sparkles, Bug, Zap, AlertTriangle } from 'lucide-react'
import SEO from '../components/common/SEO'
import Button from '../components/common/Button'
import Badge from '../components/common/Badge'
import { getVersionBySlug } from '../data/changelog'

export default function ChangelogVersion() {
  const { version } = useParams()
  const versionData = getVersionBySlug(version)

  if (!versionData) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center bg-white dark:bg-gray-950">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Версия не найдена
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Запрашиваемая версия "{version}" не существует
          </p>
          <Button to="/changelog">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Вернуться к списку
          </Button>
        </div>
      </div>
    )
  }

  const { version: ver, date, title, changes } = versionData

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  const sections = [
    { 
      key: 'new', 
      title: 'Что нового', 
      icon: Sparkles, 
      iconColor: 'text-green-500',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      dotColor: 'bg-green-500',
    },
    { 
      key: 'fixed', 
      title: 'Исправления', 
      icon: Bug, 
      iconColor: 'text-red-500',
      bgColor: 'bg-red-100 dark:bg-red-900/30',
      dotColor: 'bg-red-500',
    },
    { 
      key: 'improved', 
      title: 'Улучшения', 
      icon: Zap, 
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      dotColor: 'bg-blue-500',
    },
  ]

  return (
    <div className="min-h-screen pt-24 pb-16 bg-white dark:bg-gray-950">
      <SEO 
        title={`Версия ${ver}`}
        description={`${title} — обновление VKify v${ver}`}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            to="/changelog"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-[#0077ff] dark:hover:text-[#0077ff] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Все обновления
          </Link>
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge variant="version" className="text-lg px-4 py-1.5">
              v{ver}
            </Badge>
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <Calendar className="w-4 h-4" />
              {formatDate(date)}
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
            {title}
          </h1>
        </div>

        {/* Changes */}
        <div className="space-y-8">
          {sections.map((section, sectionIndex) => {
            const items = changes[section.key]
            if (!items || items.length === 0) return null

            return (
              <motion.div
                key={section.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: sectionIndex * 0.1 }}
                className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-10 h-10 rounded-xl ${section.bgColor} flex items-center justify-center`}>
                    <section.icon className={`w-5 h-5 ${section.iconColor}`} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {section.title}
                  </h2>
                </div>

                <ul className="space-y-3">
                  {items.map((item, index) => (
                    <li 
                      key={index}
                      className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50"
                    >
                      <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${section.dotColor}`} />
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>

        {/* Known Issues */}
        <div className="mt-8 p-6 rounded-2xl border border-yellow-200 dark:border-yellow-900/50 bg-yellow-50 dark:bg-yellow-900/20">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-500" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Известные проблемы
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            На данный момент известных проблем не обнаружено. Если вы столкнулись с багом, 
            пожалуйста, сообщите нам через{' '}
            <a 
              href="https://github.com/rianvy/vkify/issues" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#0077ff] hover:underline"
            >
              GitHub Issues
            </a>.
          </p>
        </div>

        {/* Navigation */}
        <div className="mt-12 flex justify-center">
          <Button to="/changelog" variant="secondary" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Назад к списку обновлений
          </Button>
        </div>
      </div>
    </div>
  )
}