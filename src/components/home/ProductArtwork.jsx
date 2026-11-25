import { Monitor, Puzzle, Tv } from 'lucide-react'
import Logo from '../common/Logo'
import BrowserLogo from '../common/BrowserLogo'
import { products } from '../../data/products'
import { useTranslation } from '../../i18n'

const gradients = {
  browser: 'from-blue-500 to-indigo-600',
  android: 'from-emerald-400 to-teal-600',
  'android-tv': 'from-violet-500 to-indigo-600',
  desktop: 'from-cyan-400 to-blue-600',
  lampa: 'from-orange-400 to-rose-500',
}

function AndroidMark() {
  return (
    <svg viewBox="0 0 32 32" className="h-full w-full" fill="currentColor">
      <path d="m8 6 2 4m14-4-2 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M2 24a14 14 0 0 1 28 0v2H2z" />
      <circle cx="10" cy="18" r="1.5" fill="#047857" />
      <circle cx="22" cy="18" r="1.5" fill="#047857" />
    </svg>
  )
}

export function ProductMark({ product }) {
  const Icon = { 'android-tv': Tv, desktop: Monitor, lampa: Puzzle }[product.id]
  return (
    <span aria-hidden="true" className={`grid aspect-square w-full place-items-center rounded-[28%] border border-white/25 bg-gradient-to-br text-white shadow-lg ${gradients[product.id]}`}>
      <span className="grid size-[56%] place-items-center">
        {product.id === 'browser' && <Logo className="w-full" />}
        {product.id === 'android' && <AndroidMark />}
        {Icon && <Icon className="h-full w-full" strokeWidth={1.8} />}
      </span>
    </span>
  )
}

const positions = [
  'left-[18%] top-[22%]',
  'right-[18%] top-[21%]',
  'right-[10%] bottom-[23%]',
  'left-[43%] bottom-[8%]',
  'left-[10%] bottom-[25%]',
]

export default function ProductArtwork({ product }) {
  const { t } = useTranslation()
  return (
    <div aria-hidden="true" className="relative isolate mx-auto aspect-[6/5] w-full max-w-xl overflow-hidden rounded-[2rem] border border-blue-400/20 bg-[#080e22] text-white shadow-2xl shadow-blue-950/25">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#174799,transparent_72%)]" />
      <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(#93c5fd_1px,transparent_1px)] [background-size:22px_22px]" />
      <div className="absolute inset-[13%] rounded-[50%] border border-blue-300/20" />
      <div className="absolute inset-[26%] rounded-[50%] border border-blue-300/20" />
      <div className="absolute inset-x-0 top-1/2 border-t border-blue-300/10" />
      <div className="absolute inset-y-0 left-1/2 border-l border-blue-300/10" />

      <div className="absolute inset-0 grid place-items-center">
        <div className="grid w-[26%] place-items-center">
          <ProductMark product={product || products[0]} />
        </div>
      </div>

      {product ? (
        <div className="absolute inset-x-0 bottom-[12%] text-center font-display text-lg font-bold sm:text-3xl">
          {t(product.labelKey)}
        </div>
      ) : products.map((platform, index) => (
        <div key={platform.id} className={`absolute flex w-[16%] flex-col items-center gap-1 ${positions[index]}`}>
          {platform.id === 'browser' ? (
            <div className="flex aspect-square w-full items-center justify-center gap-1 rounded-[28%] border border-blue-300/30 bg-[#101e3c] shadow-lg">
              <BrowserLogo name="chrome" className="w-[33%]" />
              <BrowserLogo name="firefox" className="w-[33%]" />
            </div>
          ) : <ProductMark product={platform} />}
          <span className="whitespace-nowrap text-[10px] font-medium text-blue-100 sm:text-xs">{t('ecosystem.platforms.' + platform.id + '.shortName')}</span>
        </div>
      ))}
    </div>
  )
}
