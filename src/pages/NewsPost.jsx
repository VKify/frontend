import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Clock, ExternalLink } from 'lucide-react'
import SEO from '../components/common/SEO'
import Button from '../components/common/Button'
import NewsCard from '../components/news/NewsCard'
import config from '../config'
import { getNewsBySlug, news } from '../data/news'
import { useTranslation } from '../i18n'

// Простой инлайн-парсер **жирного** текста для блоков новостей
function renderRich(text) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-gray-900 dark:text-white">
          {part.slice(2, -2)}
        </strong>
      )
    }
    return part
  })
}

const accentGradients = {
  orange: 'from-orange-500 via-amber-500 to-yellow-400',
  blue: 'from-[#0077ff] via-blue-500 to-cyan-400',
  purple: 'from-purple-500 via-violet-500 to-fuchsia-400',
  green: 'from-green-500 via-emerald-500 to-teal-400',
}

function Block({ block }) {
  switch (block.type) {
    case 'h2':
      return (
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-4">
          {block.text}
        </h2>
      )
    case 'ul':
      return (
        <ul className="my-6 space-y-3">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full mt-2.5 flex-shrink-0 bg-[#0077ff]" />
              <span className="text-lg text-gray-700 dark:text-gray-300">{renderRich(item)}</span>
            </li>
          ))}
        </ul>
      )
    case 'quote':
      return (
        <blockquote className="my-8 p-6 rounded-2xl border-l-4 border-[#0077ff] bg-blue-50 dark:bg-blue-900/20 text-lg font-medium text-gray-800 dark:text-gray-200">
          {block.text}
        </blockquote>
      )
    case 'p':
    default:
      return (
        <p className="my-5 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          {renderRich(block.text)}
        </p>
      )
  }
}

export default function NewsPost() {
  const { t, lang } = useTranslation()
  const { slug } = useParams()
  const post = getNewsBySlug(slug)

  if (!post) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center bg-white dark:bg-gray-950">
        <div className="text-center px-4">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('newsPage.notFoundTitle')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{t('newsPage.notFoundText')}</p>
          <Button to="/news">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('newsPage.backToList')}
          </Button>
        </div>
      </div>
    )
  }

  const { date, category, accent = 'blue', emoji } = post
  const tr = post.translations[lang] || post.translations.ru
  const gradient = accentGradients[accent] || accentGradients.blue

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString(t('newsPage.locale'), {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })

  const ctaHref = post.cta ? config.links[post.cta.linkKey] : null
  const related = news.filter((n) => n.slug !== post.slug).slice(0, 2)

  return (
    <div className="min-h-screen pt-24 pb-16 bg-white dark:bg-gray-950">
      <SEO
        title={t('newsPage.postSeoTitle', { title: tr.title })}
        description={t('newsPage.postSeoDescription', { excerpt: tr.excerpt })}
        url={`/news/${post.slug}`}
        type="article"
      />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <div className="mb-8">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-[#0077ff] dark:hover:text-[#0077ff] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            {t('newsPage.allNews')}
          </Link>
        </div>

        {/* Cover */}
        <div className={`relative h-48 sm:h-56 rounded-3xl bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden mb-8`}>
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
              backgroundSize: '28px 28px',
            }}
          />
          {emoji && <span className="relative text-7xl sm:text-8xl drop-shadow-lg">{emoji}</span>}
          <span className="absolute top-5 left-5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-semibold">
            {t(`newsPage.categories.${category}`)}
          </span>
        </div>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
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

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-8">
          {tr.title}
        </h1>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {tr.blocks.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </motion.div>

        {/* CTA */}
        {ctaHref && (
          <div className="mt-10 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-700 dark:text-gray-300 font-medium text-center sm:text-left">
              {tr.excerpt}
            </p>
            <Button href={ctaHref} target="_blank" rel="noopener noreferrer" className="gap-2 whitespace-nowrap">
              {t(post.cta.labelKey)}
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              {t('newsPage.relatedTitle')}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {related.map((n) => (
                <NewsCard key={n.slug} post={n} />
              ))}
            </div>
          </div>
        )}

        {/* Back button */}
        <div className="mt-12 flex justify-center">
          <Button to="/news" variant="secondary" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            {t('newsPage.allNews')}
          </Button>
        </div>
      </article>
    </div>
  )
}
