import LampaWays from '../components/home/LampaWays'
import LampaInstall from '../components/home/LampaInstall'
import LampaGallery from '../components/home/LampaGallery'
import { ArrowLeft, ArrowDown, ArrowUpRight, Search, ListVideo, Play, Tv, Bookmark, ShieldCheck, Image as Images } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEO from '../components/common/SEO'
import { ProductMark } from '../components/home/ProductArtwork'
import RelatedProducts from '../components/home/RelatedProducts'
import { products } from '../data/products'
import { useTranslation } from '../i18n'

const product = products.find(p => p.id === 'lampa')
const features = [
  [ListVideo, 'Каталог из VK', 'Подборки и жанры. Настраивайте порядок разделов.', 'VK catalogue', 'Films, series, genres and collections in the VKify Video section.'],
  [Search, 'Поиск без входа', 'По названию, с фильтрами качества и длительности.', 'Search without signing in', 'Search by title and filter by quality, duration and type. Open VKify Video from a Lampa card without a VK account.'],
  [Play, 'Сезоны и серии', 'Сезоны, сохранённый прогресс и автопереход.', 'Seasons and episodes', 'Choose an episode and quality. Automatic playback can continue into the next season.'],
  [Bookmark, 'Продолжить просмотр', 'История, «Смотреть позже» и сохранённая позиция.', 'Pick up where you left off', 'Continue watching and Watch later shelves collect your videos. Saved position and episode history help you resume.'],
  [Tv, 'Телеканалы', 'Прямые эфиры, категории и избранные каналы.', 'Live channels', 'Categories, favourites and channel switching in the player. Programme information is shown when VK supplies it.'],
  [ShieldCheck, 'Гостевой доступ', 'Смотрите доступные видео без входа в VK.', 'Guest access', 'The plugin does not read account passwords or cookies. Private videos and access restrictions are not bypassed.'],
]
export default function Lampa() {
  const { lang } = useTranslation()
  const ru = lang === 'ru'
  const text = (a, b) => ru ? a : b
  const wrap = 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'
  return (
    <div className="bg-white text-gray-900 dark:bg-gray-950 dark:text-white">
      <SEO title={text('VKify Видео для Lampa', 'VKify Video for Lampa')} description={text('Каталог VK Видео, сериалы и телеканалы в интерфейсе Lampa. Возможности и совместимость плагина.', 'VK Video catalogue, series and live channels in Lampa. Features and compatibility.')} url="/lampa" image={product.image} locale={lang} />
      <section className="relative isolate overflow-hidden bg-[radial-gradient(ellipse_at_75%_30%,rgba(249,115,22,0.12),transparent_65%)] pb-10 pt-28 md:pt-36">
        <div className={wrap}>
          <Link to="/#products" className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400"><ArrowLeft className="size-4" />{text('Все продукты', 'All products')}</Link>
          <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_1fr]">
            <div className="pt-8">
              <div className="mb-6 flex flex-wrap gap-3 text-xs font-semibold"><span className="rounded-full bg-orange-500/10 px-3 py-2 text-orange-700 dark:text-orange-300">LAMPA</span><span className="rounded-full bg-blue-500/10 px-3 py-2 text-blue-700 dark:text-blue-300">{text('Плагин для Lampa', 'Lampa plugin')}</span></div>
              <h1 className="font-display text-4xl font-black leading-tight tracking-tight sm:text-5xl xl:text-6xl">{text('VK Видео.', 'VK Video.')}<br /><span className="text-orange-500">{text('В привычной Lampa.', 'Inside your Lampa.')}</span></h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-600 dark:text-gray-400">{text('Смотрите видео из VK в Lampa: через каталог или поиск из карточки фильма.', 'Explore VK in a dedicated menu section or search directly from a familiar Lampa film card. Choose a video and watch with the native player.')}</p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="#lampa-install" className="inline-flex items-center gap-3 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-orange-600">{text('Установить плагин', 'Install the plugin')}<ArrowDown className="size-4" /></a>
                <a href="#lampa-examples" className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-5 py-3 font-semibold transition-colors hover:border-orange-500/50 dark:border-gray-700"><Images className="size-4" />{text('Посмотреть примеры', 'See examples')}</a>
              </div>
              <p className="mt-5 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400"><ShieldCheck className="size-4 text-orange-500" />{text('Без аккаунта VK · В плеере Lampa', 'No VK account · Native Lampa player')}</p>
            </div>
            <div className="relative my-8 min-w-0">
              <div aria-hidden="true" className="absolute inset-8 -z-10 rounded-full bg-orange-500/15 blur-3xl" />
              <a href="#lampa-examples" className="group block overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-orange-950/10 transition-colors hover:border-orange-500/50 dark:border-gray-700 dark:bg-gray-900">
                <div className="flex items-center gap-3 border-b border-gray-200 px-4 py-3 dark:border-gray-800"><span className="w-8"><ProductMark product={product} /></span><span className="text-sm font-semibold">VKify Видео</span><span className="ml-auto text-xs text-gray-500">LAMPA</span></div>
                <img src="/products/lampa/example-5.webp" alt={text('VKify Видео среди источников фильма в Lampa', 'VKify Video in a Lampa film’s sources')} className="block h-auto w-full" fetchPriority="high" />
                <div className="flex items-center justify-between gap-3 px-4 py-4 text-sm"><span className="text-gray-600 dark:text-gray-400">{text('Ваше кино. В знакомом интерфейсе.', 'Your films. A familiar interface.')}</span><ArrowUpRight className="size-4 shrink-0 text-orange-500" /></div>
              </a>
            </div>
          </div>

        </div>
      </section>
      <LampaWays />
      <LampaGallery />
      <LampaInstall />
      <section id="lampa-features" className={'scroll-mt-28 py-20 ' + wrap}>
        <h2 className="font-display text-3xl font-bold sm:text-4xl">{text('От поиска до следующей серии', 'From search to the next episode')}</h2>
        <p className="mt-4 max-w-2xl text-gray-600 dark:text-gray-400">{text('Всё нужное для просмотра в одном месте.', 'Implemented in the plugin. Video availability depends on VK and the platform running Lampa.')}</p>
        <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map(([Icon, title, body, enTitle, enBody]) => <article key={title} className="rounded-3xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-6 dark:border-gray-800 dark:from-gray-900/70 dark:to-gray-950"><span className="mb-5 grid size-11 place-items-center rounded-xl border border-orange-500/15 bg-orange-500/10"><Icon className="size-5 text-orange-500" /></span><h3 className="text-lg font-bold">{text(title, enTitle)}</h3><p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{text(body, enBody)}</p></article>)}
        </div>
        <Link to="/docs/lampa" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:underline dark:text-orange-400">{text('Инструкция и настройка', 'Installation and setup')}<ArrowUpRight className="size-4" /></Link>
      </section>
      <RelatedProducts current="lampa" />
    </div>
  )
}

