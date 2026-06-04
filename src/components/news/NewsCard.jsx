import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Calendar, ArrowRight, Clock } from 'lucide-react'
import Badge from '../common/Badge'
import { useTranslation } from '../../i18n'

// Акцентные градиенты обложки по полю accent в data/news.js
const accentGradients = {
  orange: 'from-orange-500 via-amber-500 to-yellow-400',
  blue: 'from-[#0077ff] via-blue-500 to-cyan-400',
  purple: 'from-purple-500 via-violet-500 to-fuchsia-400',
  green: 'from-green-500 via-emerald-500 to-teal-400',
}

function CoverPattern() {
  return (
    <div
      className="absolute inset-0 opacity-20"
      style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
        backgroundSize: '24px 24px',
      }}
    />
  )
}

export default function NewsCard({ post, isLatest = false, featured = false }) {
  const { t, lang } = useTranslation()
  const { slug, date, category, accent = 'blue', emoji } = post
  const tr = post.translations[lang] || post.translations.ru

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString(t('newsPage.locale'), {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })

  const gradient = accentGradients[accent] || accentGradients.blue

  const meta = (
    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
      <span className="flex items-center gap-1.5">
        <Calendar className="w-4 h-4" />
        {formatDate(date)}
      </span>
      {tr.readTime && (
        <span className="flex items-center gap-1.5">
          <Clock className="w-4 h-4" />
          {t('newsPage.readTime', { count: tr.readTime })}
        </span>
      )}
    </div>
  )

  const chips = (
    <div className="flex items-center gap-2">
      <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-semibold">
        {t(`newsPage.categories.${category}`)}
      </span>
      {featured && (
        <span className="px-3 py-1 rounded-full bg-black/25 backdrop-blur-sm text-white text-xs font-semibold">
          {t('newsPage.featured')}
        </span>
      )}
      {isLatest && !featured && <Badge variant="new">{t('newsPage.latest')}</Badge>}
    </div>
  )

  const readMore = (
    <span className="inline-flex items-center gap-1 text-[#0077ff] text-sm font-semibold">
      {t('newsPage.readMore')}
      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </span>
  )

  // ── Featured (широкая горизонтальная карточка) ──────────────────────
  if (featured) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Link
          to={`/news/${slug}`}
          className="group grid lg:grid-cols-5 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden hover:shadow-2xl hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-200"
        >
          <div className={`relative lg:col-span-2 min-h-[200px] bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden`}>
            <CoverPattern />
            {emoji && (
              <span className="relative text-7xl sm:text-8xl drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
                {emoji}
              </span>
            )}
            <div className="absolute top-5 left-5">{chips}</div>
          </div>

          <div className="lg:col-span-3 p-7 sm:p-9 flex flex-col justify-center gap-4">
            {meta}
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white group-hover:text-[#0077ff] transition-colors">
              {tr.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
              {tr.excerpt}
            </p>
            {readMore}
          </div>
        </Link>
      </motion.div>
    )
  }

  // ── Обычная карточка ────────────────────────────────────────────────
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <Link
        to={`/news/${slug}`}
        className="group flex flex-col h-full rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden hover:shadow-xl hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-150"
      >
        <div className={`relative h-40 bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden`}>
          <CoverPattern />
          {emoji && (
            <span className="relative text-6xl drop-shadow-lg group-hover:scale-110 transition-transform duration-200">
              {emoji}
            </span>
          )}
          <div className="absolute top-4 left-4">{chips}</div>
        </div>

        <div className="flex flex-col flex-1 p-6">
          <div className="mb-3">{meta}</div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[#0077ff] transition-colors">
            {tr.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-3">
            {tr.excerpt}
          </p>
          <div className="mt-4 pt-2">{readMore}</div>
        </div>
      </Link>
    </motion.div>
  )
}
