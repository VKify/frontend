import { ArrowRight, Route } from 'lucide-react'
import { Link } from 'react-router-dom'
import { products, roadmapProducts } from '../../data/products'
import { ProductMark } from './ProductArtwork'
import { ProductStatus } from './ProductsGrid'
import { useTranslation } from '../../i18n'

export default function Roadmap() {
  const { t } = useTranslation()
  return (
    <section id="roadmap" className="overflow-hidden border-y border-gray-200/60 bg-gray-50 py-20 dark:border-gray-800 dark:bg-gray-900 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-8">
        <div>
          <span className="mb-5 inline-flex size-12 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400"><Route className="size-6" /></span>
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">{t('ecosystem.roadmap')}</h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-gray-600 dark:text-gray-400">{t('ecosystem.roadmapDescription')}</p>
          <div className="mt-8 rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-transparent p-6">
            <div className="mb-4 w-10"><ProductMark product={products[0]} /></div>
            <h3 className="text-lg font-bold">{t('ecosystem.browserParallelTitle')}</h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{t('ecosystem.browserParallel')}</p>
            <Link to="/browser/changelog" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400">{t('footer.links.changelog')}<ArrowRight className="size-4" /></Link>
          </div>
        </div>

        <ol className="relative space-y-4 before:absolute before:bottom-12 before:left-5 before:top-6 before:w-px before:bg-gradient-to-b before:from-blue-500 before:via-blue-400/40 before:to-gray-300 dark:before:to-gray-700">
          {roadmapProducts.map((product,index) => (
            <li key={product.id} className="relative flex items-start gap-4 sm:gap-6">
              <span className={`relative z-10 mt-5 grid size-10 shrink-0 place-items-center rounded-full border font-mono text-sm ${index === 0 ? 'border-blue-500 bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'border-gray-300 bg-gray-50 text-gray-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-400'}`}>0{index+1}</span>
              <div className={`min-w-0 flex-1 rounded-3xl border p-5 sm:p-6 ${index === 0 ? 'border-blue-300 bg-white shadow-lg shadow-blue-500/5 dark:border-blue-800 dark:bg-gray-950' : 'border-gray-200 bg-white/60 dark:border-gray-800 dark:bg-gray-950/50'}`}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="font-display text-xl font-bold"><Link to={product.href} className="hover:text-blue-600 dark:hover:text-blue-400">{t(product.labelKey)}</Link></h3>
                  <ProductStatus product={product} />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{t('ecosystem.roadmapSteps.'+product.id)}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
