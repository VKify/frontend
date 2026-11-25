import { ArrowRight, Newspaper } from 'lucide-react'
import { Link } from 'react-router-dom'
import { news } from '../../data/news'
import { useTranslation } from '../../i18n'

export default function LatestNews() {
  const { t, lang } = useTranslation()
  return (
    <section id="latest-news" className="relative border-b border-gray-200/70 bg-gradient-to-b from-white to-gray-50 py-20 dark:border-gray-800 dark:from-gray-950 dark:to-gray-900/40 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span aria-hidden="true" className="mb-5 inline-flex size-11 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400"><Newspaper className="size-5" /></span>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">{t('ecosystem.latest')}</h2>
            <p className="mt-4 text-base leading-relaxed text-gray-600 dark:text-gray-400">{t('ecosystem.newsDescription')}</p>
          </div>
          <Link to="/news" className="inline-flex items-center gap-3 rounded-full border border-gray-300 px-5 py-3 text-sm font-semibold transition-colors hover:border-blue-500 hover:text-blue-600 focus-visible:outline-blue-500 dark:border-gray-700 dark:hover:text-blue-400">{t('footer.links.news')}<ArrowRight className="size-4" /></Link>
        </div>
        <div className="grid items-stretch gap-6 md:grid-cols-3">
          {news.slice(0, 3).map((post, index) => {
            const tr = post.translations[lang] || post.translations.ru
            return (
              <article key={post.slug} className="group relative flex min-w-0 flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white transition-shadow duration-300 hover:shadow-xl hover:shadow-blue-500/5 focus-within:ring-2 focus-within:ring-blue-500 dark:border-gray-800 dark:bg-gray-900">
                <img src={post.image} alt="" loading="lazy" className="block h-auto w-full shrink-0" />
                <div className="flex flex-1 flex-col p-6 lg:p-7">
                  <div className="mb-4 flex flex-wrap items-center gap-3 text-xs">
                    <span className="rounded-full bg-blue-500/10 px-2.5 py-1 font-semibold text-blue-700 dark:text-blue-300">{t(index === 0 ? 'newsPage.latest' : 'newsPage.categories.' + post.category)}</span>
                    <time dateTime={post.date} className="text-gray-500 dark:text-gray-400">{new Date(post.date).toLocaleDateString(lang, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })}</time>
                  </div>
                  <h3 className="font-display text-xl font-bold leading-snug">
                    <Link to={'/news/' + post.slug} className="after:absolute after:inset-0 after:rounded-3xl focus:outline-none group-hover:text-blue-600 dark:group-hover:text-blue-400">{tr.title}</Link>
                  </h3>
                  <p className="mb-6 mt-3 line-clamp-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{tr.excerpt}</p>
                  <span className="mt-auto inline-flex items-center justify-between border-t border-gray-200 pt-5 text-sm font-semibold text-blue-600 dark:border-gray-800 dark:text-blue-400">{t('newsPage.readMore')}<ArrowRight className="size-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" /></span>
                </div>
              </article>
            )
          })}
        </div>
        <div className="mt-7 flex justify-end">
          <Link to="/browser/changelog" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">{t('footer.links.changelog')}<ArrowRight className="size-4" /></Link>
        </div>
      </div>
    </section>
  )
}
