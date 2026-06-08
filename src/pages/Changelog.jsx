import { useState, useRef, useEffect } from 'react'
import { Filter, Sparkles, Bug, Zap, ChevronDown, Check } from 'lucide-react'
import SEO from '../components/common/SEO'
import VersionCard from '../components/changelog/VersionCard'
import { changelog } from '../data/changelog'
import { useTranslation } from '../i18n'

const filters = [
  { id: 'all', icon: null },
  { id: 'new', icon: Sparkles },
  { id: 'fixed', icon: Bug },
  { id: 'improved', icon: Zap },
]

export default function Changelog() {
  const { t } = useTranslation()
  const [activeFilter, setActiveFilter] = useState('all')
  const [filterOpen, setFilterOpen] = useState(false)
  const filterRef = useRef(null)

  // Закрытие выпадающего списка по клику вне и по Escape
  useEffect(() => {
    if (!filterOpen) return
    const onPointer = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) setFilterOpen(false)
    }
    const onKey = (e) => { if (e.key === 'Escape') setFilterOpen(false) }
    document.addEventListener('mousedown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [filterOpen])

  const filteredChangelog = changelog.filter(version => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'new') return version.changes.new?.length > 0
    if (activeFilter === 'fixed') return version.changes.fixed?.length > 0
    if (activeFilter === 'improved') return version.changes.improved?.length > 0
    return true
  })

  return (
    // Убрали motion.div - анимация теперь в AnimatedPage
    <div className="relative min-h-screen overflow-hidden pt-24 pb-20 bg-white dark:bg-gray-950">
      <SEO
        title={t('changelogPage.seoTitle')}
        description={t('changelogPage.seoDescription')}
      />

      {/* Декоративный градиент за шапкой */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[420px] overflow-hidden">
        <div className="absolute left-1/2 top-[-140px] h-[360px] w-[760px] max-w-[130vw] -translate-x-1/2 rounded-full bg-[#0077ff]/15 blur-[120px] dark:bg-[#0077ff]/25" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
            {t('changelogPage.titleTop')}{' '}
            <span className="bg-gradient-to-r from-[#0077ff] to-blue-400 bg-clip-text text-transparent">
              {t('changelogPage.titleAccent')}
            </span>
          </h1>
          <p className="text-base sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('changelogPage.subtitle')}
          </p>
        </div>

        {/* Filters — выпадающий список на мобильных, чипсы на десктопе */}
        <div className="mb-10 sm:mb-12">
          {/* Mobile: dropdown */}
          <div className="sm:hidden flex justify-center">
            <div ref={filterRef} className="relative w-full max-w-xs">
              <button
                type="button"
                onClick={() => setFilterOpen((o) => !o)}
                aria-haspopup="listbox"
                aria-expanded={filterOpen}
                className="flex items-center gap-2.5 w-full pl-4 pr-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-sm font-medium text-gray-700 dark:text-gray-200 hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
              >
                <Filter className="w-4 h-4 text-[#0077ff] flex-shrink-0" />
                <span className="flex-1 text-left truncate">{t(`changelogPage.filters.${activeFilter}`)}</span>
                <ChevronDown className={`w-4 h-4 flex-shrink-0 text-gray-400 transition-transform ${filterOpen ? 'rotate-180' : ''}`} />
              </button>

              {filterOpen && (
                <div
                  role="listbox"
                  className="absolute left-0 right-0 top-full mt-2 z-20 p-1.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xl shadow-black/[0.07] dark:shadow-black/40"
                >
                  {filters.map((filter) => (
                    <button
                      key={filter.id}
                      type="button"
                      role="option"
                      aria-selected={activeFilter === filter.id}
                      onClick={() => { setActiveFilter(filter.id); setFilterOpen(false) }}
                      className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-sm font-medium text-left transition-colors ${
                        activeFilter === filter.id
                          ? 'bg-[#0077ff]/10 text-[#0077ff]'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      {filter.icon
                        ? <filter.icon className="w-4 h-4 flex-shrink-0" />
                        : <Filter className="w-4 h-4 flex-shrink-0 opacity-60" />}
                      <span className="flex-1">{t(`changelogPage.filters.${filter.id}`)}</span>
                      {activeFilter === filter.id && <Check className="w-4 h-4 flex-shrink-0" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Desktop: chips */}
          <div className="hidden sm:flex flex-wrap items-center justify-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeFilter === filter.id
                    ? 'bg-[#0077ff] text-white shadow-lg shadow-blue-500/25'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {filter.icon && <filter.icon className="w-4 h-4" />}
                {t(`changelogPage.filters.${filter.id}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-[#0077ff]/40 via-gray-200 to-transparent dark:via-gray-800 hidden md:block" />

          <div className="space-y-5 sm:space-y-6">
            {filteredChangelog.map((version, index) => (
              <VersionCard
                key={version.version}
                version={version}
                isLatest={index === 0}
              />
            ))}
          </div>
        </div>

        {filteredChangelog.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              {t('changelogPage.empty')}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}