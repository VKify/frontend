import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowLeft, Search, Sparkles, Bug, Zap, Layers } from 'lucide-react'
import SEO from '../components/common/SEO'
import VersionCard from '../components/changelog/VersionCard'
import { changelog } from '../data/changelog'
import { useTranslation } from '../i18n'

const filters = [
  { id: 'all', icon: Layers },
  { id: 'new', icon: Sparkles },
  { id: 'fixed', icon: Bug },
  { id: 'improved', icon: Zap },
]

export default function Changelog() {
  const { t, lang } = useTranslation()
  const [params, setParams] = useSearchParams()
  const requested = params.get('type')
  const activeFilter = filters.some(filter => filter.id === requested) ? requested : 'all'
  const query = params.get('q') || ''
  const update = (key, value) => {
    setParams(previous => {
      const next = new URLSearchParams(previous)
      if (value && value !== 'all') next.set(key, value)
      else next.delete(key)
      return next
    }, { replace: true })
  }
  const results = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase()
    return changelog.map(release => {
      const matchesRelease = [release.version, release.title].some(text => text.toLocaleLowerCase().includes(needle))
      const changes = Object.fromEntries(['new', 'fixed', 'improved'].map(type => [
        type,
        (release.changes[type] || []).filter(text =>
          (activeFilter === 'all' || activeFilter === type) &&
          (!needle || matchesRelease || text.toLocaleLowerCase().includes(needle))),
      ]))
      return { ...release, changes }
    }).filter(release => Object.values(release.changes).some(items => items.length))
  }, [activeFilter, query])
  const count = results.reduce((total, release) => total + Object.values(release.changes).reduce((sum, items) => sum + items.length, 0), 0)

  return (
    <div className="min-h-screen bg-white pb-20 pt-28 text-gray-900 dark:bg-gray-950 dark:text-white">
      <SEO title={t('changelogPage.seoTitle')} description={t('changelogPage.seoDescription')} url="/browser/changelog" locale={lang} />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Link to="/browser" className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400"><ArrowLeft className="size-4" />{t('ecosystem.browserDetails')}</Link>
        <header className="mb-10 mt-8">
          <p className="mb-4 text-sm font-semibold text-blue-600 dark:text-blue-400">{t('ecosystem.platforms.browser.title')}</p>
          <h1 className="font-display text-4xl font-black sm:text-5xl">{t('changelogPage.titleTop')} <span className="text-blue-600 dark:text-blue-400">{t('changelogPage.titleAccent')}</span></h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-400">{t('changelogPage.filterHelp')}</p>
        </header>

        <section aria-label={t('changelogPage.searchLabel')} className="mb-8 rounded-3xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900 sm:p-6">
          <label className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 dark:border-gray-700 dark:bg-gray-950">
            <Search className="size-5 shrink-0 text-gray-400" />
            <span className="sr-only">{t('changelogPage.searchLabel')}</span>
            <input type="search" value={query} onChange={event => update('q', event.target.value)} placeholder={t('changelogPage.searchPlaceholder')} className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-gray-400" />
          </label>
          <div className="mt-4 flex flex-wrap gap-2">
            {filters.map(({ id, icon: Icon }) => (
              <button key={id} type="button" aria-pressed={activeFilter === id} onClick={() => update('type', id)}
                className={`inline-flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${activeFilter === id ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800'}`}>
                <Icon className="size-4" />{t('changelogPage.filters.' + id)}
              </button>
            ))}
          </div>
        </section>

        <p role="status" className="mb-6 text-sm text-gray-500 dark:text-gray-400">{t('changelogPage.results', { releases: results.length, changes: count })}</p>
        <div className="space-y-6">
          {results.map(release => (
            <VersionCard key={release.version} version={release} isLatest={release.version === changelog[0].version} showChanges={activeFilter !== 'all' || !!query.trim()} />
          ))}
        </div>
        {!results.length && (
          <div className="rounded-3xl border border-dashed border-gray-300 p-10 text-center dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-400">{t('changelogPage.empty')}</p>
            <button type="button" onClick={() => { const next = new URLSearchParams(params); next.delete('q'); next.delete('type'); setParams(next, { replace: true }) }} className="mt-5 font-semibold text-blue-600 dark:text-blue-400">{t('changelogPage.reset')}</button>
          </div>
        )}
      </div>
    </div>
  )
}
