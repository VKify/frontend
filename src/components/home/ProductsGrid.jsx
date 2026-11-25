import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import ProductDevice from './ProductDevice'
import { products } from '../../data/products'
import { useTranslation } from '../../i18n'

const badgeColors = {
  ready: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
  development: 'bg-blue-500/10 text-blue-700 dark:text-blue-300',
  planned: 'bg-violet-500/10 text-violet-700 dark:text-violet-300',
  longTerm: 'bg-cyan-500/10 text-cyan-800 dark:text-cyan-300',
  backlog: 'bg-orange-500/10 text-orange-800 dark:text-orange-300',
}

export function ProductStatus({ product }) {
  const { t } = useTranslation()
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${badgeColors[product.status]}`}>
      <span className="size-1.5 rounded-full bg-current" />
      {t('ecosystem.status.' + product.status)}
    </span>
  )
}

const surfaces = {
  android: 'from-emerald-500/10 via-teal-500/5 to-transparent',
  lampa: 'from-orange-500/10 via-rose-500/5 to-transparent',
  'android-tv': 'from-violet-500/10 via-indigo-500/5 to-transparent',
  desktop: 'from-sky-500/10 via-blue-500/5 to-transparent',
}

export default function ProductsGrid() {
  const { t, lang } = useTranslation()
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {products.filter(product => product.id !== 'browser').map((product) => (
        <article key={product.id} data-product={product.id} className="group relative isolate flex min-w-0 flex-col overflow-hidden rounded-[2rem] border border-gray-200 bg-white transition-shadow duration-300 hover:shadow-xl hover:shadow-blue-500/5 focus-within:ring-2 focus-within:ring-blue-500 dark:border-gray-800 dark:bg-gray-950">
          <div className={'relative grid items-center gap-3 bg-gradient-to-br p-6 sm:grid-cols-[1fr_1.1fr] sm:p-8 ' + surfaces[product.id]}>
            <div className="relative z-10">
              <ProductStatus product={product} />
              <h3 className="mt-5 font-display text-3xl font-bold tracking-tight">
                <Link to={product.href} className="after:absolute after:inset-0 focus:outline-none">{t(product.labelKey)}</Link>
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{t('ecosystem.platforms.' + product.id + '.summary')}</p>
            </div>
            <div className="pointer-events-none mx-auto w-full max-w-[280px]" aria-hidden="true">
              <ProductDevice product={product} />
            </div>
          </div>
          <div className="flex flex-1 flex-col border-t border-gray-200/70 px-6 py-5 dark:border-gray-800 sm:px-8">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {t('ecosystem.platforms.' + product.id + '.features').slice(0, 3).map(feature => (
                <li key={feature} className="flex items-center gap-2 text-xs leading-relaxed text-gray-600 dark:text-gray-400">
                  <span className="size-1 shrink-0 rounded-full bg-blue-500/60" />{feature}
                </li>
              ))}
            </ul>
            <div className="mt-auto flex items-center justify-between gap-4 pt-6">
              <Link to={product.href} className="inline-flex w-full items-center justify-between gap-3 rounded-xl text-sm font-semibold text-blue-600 transition-colors hover:text-blue-500 focus-visible:outline-blue-500 dark:text-blue-400">
                {lang === 'ru' ? (product.id === 'lampa' ? 'Возможности и установка' : 'Подробнее о продукте') : (product.id === 'lampa' ? 'Features and installation' : 'Explore the product')}
                <ArrowUpRight className="size-5" />
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
