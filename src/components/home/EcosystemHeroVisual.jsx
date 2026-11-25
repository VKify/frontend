import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import Logo from '../common/Logo'
import BrowserLogo from '../common/BrowserLogo'
import { ProductMark } from './ProductArtwork'
import { products, roadmapProducts } from '../../data/products'
import { useTranslation } from '../../i18n'

export default function EcosystemHeroVisual() {
  const { t } = useTranslation()
  const reduced = useReducedMotion()

  return (
    <div className="relative mx-auto w-full max-w-lg py-4">
      <div aria-hidden="true" className="absolute inset-10 rounded-full bg-blue-500/15 blur-3xl" />
      <motion.div initial={reduced ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative">
        <div className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/70 shadow-2xl shadow-blue-950/10 backdrop-blur-xl dark:border-gray-700/70 dark:bg-gray-900/80">
          <div className="flex items-center justify-between border-b border-gray-200/70 px-5 py-4 dark:border-gray-700/50">
            <span className="flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400"><span className="size-2 rounded-full bg-emerald-500" />vkify.ru</span>
            <div className="flex gap-2">{['chrome','firefox','edge'].map(name => <BrowserLogo key={name} name={name} className="size-5" />)}</div>
          </div>
          <Link to="/browser" className="group relative flex flex-col items-center bg-[radial-gradient(ellipse_at_center,#0077ff15,transparent_70%)] px-6 py-9 focus-visible:outline-blue-500 sm:py-12">
            <motion.div animate={reduced ? undefined : { y: [-4, 4, -4] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} className="relative grid size-24 place-items-center rounded-[1.7rem] border border-blue-300/40 bg-gradient-to-br from-blue-400 via-[#0077ff] to-indigo-600 shadow-xl shadow-blue-500/30 sm:size-28">
              <Logo className="w-14 text-white sm:w-16" />
              <span className="absolute inset-0 rounded-[1.7rem] bg-gradient-to-br from-white/20 to-transparent" />
            </motion.div>
            <span className="mt-5 font-display text-3xl font-black text-gray-900 dark:text-white">VKify</span>
            <span className="mt-2 flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300">{t(products[0].labelKey)}<ArrowUpRight className="size-4 text-blue-500 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
            <span className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400"><Check className="size-3.5" />{t('ecosystem.status.ready')}</span>
          </Link>
        </div>

        <div aria-hidden="true" className="mx-auto h-7 w-px bg-gradient-to-b from-blue-400/70 to-blue-400/20" />
        <div className="relative grid grid-cols-2 gap-3">
          {roadmapProducts.map(product => (
            <Link key={product.id} to={product.href} className="group flex min-w-0 items-center gap-3 rounded-2xl border border-gray-200 bg-white/90 p-3 shadow-lg shadow-blue-950/5 transition-colors hover:border-blue-400 focus-visible:outline-blue-500 dark:border-gray-700 dark:bg-gray-900/90 sm:p-4">
              <span className="w-9 shrink-0"><ProductMark product={product} /></span>
              <span className="min-w-0">
                <span className="block text-sm font-bold text-gray-900 dark:text-white">{t('ecosystem.platforms.' + product.id + '.shortName')}</span>
                <span className="mt-1 block text-[10px] leading-snug text-gray-500 dark:text-gray-400">{t('ecosystem.status.' + product.status)}</span>
              </span>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
