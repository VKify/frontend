import { ArrowLeft, ArrowUpRight, BookOpen, ArrowRight, Clock3 } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEO from '../components/common/SEO'
import { ProductMark } from '../components/home/ProductArtwork'
import PlatformNav from '../components/docs/PlatformNav'
import { products } from '../data/products'
import { useTranslation } from '../i18n'

const names = { browser: ['Расширение для браузера', 'Browser extension'], android: ['Android', 'Android'], lampa: ['Lampa', 'Lampa'], 'android-tv': ['Android TV', 'Android TV'], desktop: ['Компьютеры', 'Desktop'] }

export default function PlatformDocs({ platform }) {
  const { lang } = useTranslation()
  const label = (ru, en) => lang === 'ru' ? ru : en
  const name = id => label(...names[id])
  const title = label('Документация', 'Documentation')
  const ready = products.filter(p => ['browser', 'lampa'].includes(p.id))
  const upcoming = products.filter(p => !ready.includes(p))
  return (
    <div className="relative isolate min-h-screen bg-white pb-20 pt-28 text-gray-900 dark:bg-gray-950 dark:text-white">
      <SEO title={platform ? title + ' · ' + name(platform) : title} url={platform ? '/docs/' + platform : '/docs'} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(ellipse_at_top,rgba(0,119,255,0.12),transparent_70%)]" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {platform && <><Link to="/docs" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400"><ArrowLeft className="size-4" />{title}</Link><PlatformNav active={platform} /></>}
        {!platform ? <>
          <div className="mb-5 flex size-12 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-500"><BookOpen className="size-6" /></div>
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">{label('Начните с установки. Настройте VKify под себя.', 'Start with installation. Make VKify your own.')}</p>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {ready.map(product => <Link key={product.id} to={'/docs/' + product.id} className="group relative flex flex-col rounded-3xl border border-gray-200 bg-gray-50 p-6 transition-colors hover:border-blue-500/50 focus-visible:outline-blue-500 dark:border-gray-800 dark:bg-gray-900/50 sm:p-8">
              <div className="mb-7 flex items-center justify-between"><span className="w-14"><ProductMark product={product} /></span><ArrowUpRight className="size-5 text-gray-400 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-blue-500" /></div>
              <h2 className="text-2xl font-semibold tracking-tight">{name(product.id)}</h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{product.id === 'browser' ? label('Оформление, музыка, приватность и инструменты для ВКонтакте.', 'Appearance, music, privacy and tools for VK.') : label('Установка плагина, подключение прокси и поиск видео.', 'Plugin installation, proxy setup and video search.')}</p>
              <span className="mt-7 inline-flex items-center gap-2 border-t border-gray-200 pt-5 text-sm font-semibold text-blue-600 dark:border-gray-800 dark:text-blue-400">{label('Открыть инструкции', 'Open guides')}<ArrowRight className="size-4" /></span>
            </Link>)}
          </div>
          <div className="mb-4 mt-12 flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400"><Clock3 className="size-4" />{label('Документация в разработке', 'Documentation in development')}</div>
          <div className="grid gap-3 sm:grid-cols-3">{upcoming.map(product => <Link key={product.id} to={'/docs/' + product.id} className="flex items-center gap-4 rounded-2xl border border-gray-200 p-5 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900"><span className="w-9 shrink-0"><ProductMark product={product} /></span><span className="flex-1 font-medium">{name(product.id)}</span><ArrowRight className="size-4 text-gray-400" /></Link>)}</div>
        </> : <div className="mx-auto max-w-xl py-12 text-center sm:py-20">
          <div className="mx-auto mb-6 w-16"><ProductMark product={products.find(p => p.id === platform)} /></div>
          <h1 className="text-3xl font-bold sm:text-4xl">{name(platform)}</h1>
          <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-500 dark:bg-gray-900 dark:text-gray-400"><Clock3 className="size-3.5" />{label('Документация в разработке', 'Documentation in development')}</span>
          <p className="mt-5 text-gray-600 dark:text-gray-400">{label('Инструкции появятся здесь. О самом продукте можно узнать уже сейчас.', 'Guides will appear here. You can explore the product now.')}</p>
          <Link to={'/' + platform} className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-500">{label('О продукте', 'Explore the product')}<ArrowUpRight className="size-4" /></Link>
        </div>}
      </div>
    </div>
  )
}
