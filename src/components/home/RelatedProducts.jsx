import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { products } from '../../data/products'
import { ProductMark } from './ProductArtwork'
import { useTranslation } from '../../i18n'

export default function RelatedProducts({ current }) {
  const { t } = useTranslation()
  return (
    <nav aria-label={t('ecosystem.otherPlatforms')} className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <h2 className="mb-6 font-display text-2xl font-bold">{t('ecosystem.otherPlatforms')}</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {products.filter(product => product.id !== current).map(product => (
          <Link key={product.id} to={product.href} className="group flex items-center gap-3 rounded-2xl border border-gray-200 p-4 transition-colors hover:border-blue-400 hover:bg-blue-500/5 dark:border-gray-800">
            <span className="w-10 shrink-0"><ProductMark product={product} /></span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold">{t(product.labelKey)}</span>
              <span className="mt-1 block text-xs text-gray-500 dark:text-gray-400">{t('ecosystem.status.' + product.status)}</span>
            </span>
            <ArrowUpRight className="size-4 shrink-0 text-gray-400 group-hover:text-blue-500" />
          </Link>
        ))}
      </div>
    </nav>
  )
}
