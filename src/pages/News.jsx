import { useMemo, useState, useDeferredValue } from 'react'
import { Search, X, Newspaper } from 'lucide-react'
import SEO from '../components/common/SEO'
import NewsCard from '../components/news/NewsCard'
import { news } from '../data/news'
import { useTranslation } from '../i18n'

export default function News() {
  const { t, lang } = useTranslation()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const deferredQuery = useDeferredValue(query)

  // Категории, реально присутствующие в новостях, + счётчики
  const categories = useMemo(() => {
    const counts = news.reduce((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1
      return acc
    }, {})
    return [
      { id: 'all', count: news.length },
      ...Object.keys(counts).map((id) => ({ id, count: counts[id] })),
    ]
  }, [])

  const filtered = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase()
    return news.filter((post) => {
      if (category !== 'all' && post.category !== category) return false
      if (!q) return true
      const tr = post.translations[lang] || post.translations.ru
      return (
        tr.title.toLowerCase().includes(q) ||
        tr.excerpt.toLowerCase().includes(q)
      )
    })
  }, [deferredQuery, category, lang])

  const isDefaultView = category === 'all' && !deferredQuery.trim()
  const hasFeatured = isDefaultView && filtered.length > 0
  const featured = hasFeatured ? filtered[0] : null
  const rest = hasFeatured ? filtered.slice(1) : filtered

  const resetFilters = () => {
    setQuery('')
    setCategory('all')
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-white dark:bg-gray-950">
      <SEO
        title={t('newsPage.seoTitle')}
        description={t('newsPage.seoDescription')}
        url="/news"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('newsPage.titleTop')}{' '}
            <span className="bg-gradient-to-r from-[#0077ff] to-blue-400 bg-clip-text text-transparent">
              {t('newsPage.titleAccent')}
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('newsPage.subtitle')}
          </p>
        </div>

        {/* Toolbar: поиск + фильтр категорий */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-10">
          {/* Search */}
          <div className="relative w-full lg:max-w-sm">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('newsPage.searchPlaceholder')}
              className="w-full pl-12 pr-10 py-3 rounded-2xl bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0077ff] focus:border-transparent transition-all"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                aria-label="Clear"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category chips */}
          <div className="flex flex-wrap items-center gap-2 lg:ml-auto">
            {categories.map((cat) => {
              const active = category === cat.id
              const label =
                cat.id === 'all'
                  ? t('newsPage.allCategory')
                  : t(`newsPage.categories.${cat.id}`)
              return (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 ${
                    active
                      ? 'bg-[#0077ff] text-white shadow-lg shadow-blue-500/25'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {label}
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-full ${
                      active
                        ? 'bg-white/25'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Results */}
        {filtered.length > 0 ? (
          <div className="space-y-6">
            {featured && <NewsCard post={featured} featured isLatest />}

            {rest.length > 0 && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((post) => (
                  <NewsCard key={post.slug} post={post} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 mb-5">
              <Newspaper className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {news.length === 0 ? t('newsPage.empty') : t('newsPage.searchEmptyTitle')}
            </h3>
            {news.length > 0 && (
              <>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  {t('newsPage.searchEmptyHint')}
                </p>
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0077ff] text-white text-sm font-medium hover:bg-[#0066dd] transition-colors"
                >
                  {t('newsPage.resetFilters')}
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
