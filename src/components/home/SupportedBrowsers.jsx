import { Globe } from 'lucide-react'
import Section from '../common/Section'
import BrowserLogo from '../common/BrowserLogo'
import config from '../../config'
import { useTranslation } from '../../i18n'

// Edge/Opera/Brave/Vivaldi/Yandex/Arc и прочие Chromium-браузеры
// ставятся из Chrome Web Store; Firefox — из Firefox Add-ons.
const cws = config.links.chromeWebStore
const browsers = [
  { name: 'Chrome', logo: 'chrome', href: cws },
  { name: 'Firefox', logo: 'firefox', href: config.links.firefoxAddons, isNew: true },
  { name: 'Edge', logo: 'edge', href: cws },
  { name: 'Opera', logo: 'opera', href: cws },
  { name: 'Brave', logo: 'brave', href: cws },
  { name: 'Vivaldi', logo: 'vivaldi', href: cws },
  { name: 'Yandex', logo: 'yandex', href: cws },
  { name: 'Arc', logo: 'arc', href: cws },
]

function BrowserItem({ browser, newLabel }) {
  return (
    <a
      href={browser.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group/item flex items-center gap-3 shrink-0 mr-6 sm:mr-10 px-5 py-2.5 rounded-2xl hover:bg-gray-100/80 dark:hover:bg-white/[0.06] transition-colors duration-200"
    >
      <BrowserLogo
        name={browser.logo}
        className="w-9 h-9 sm:w-10 sm:h-10 opacity-90 transition-all duration-200 group-hover/item:opacity-100 group-hover/item:scale-110"
      />
      <span className="text-lg font-semibold text-gray-700 dark:text-gray-200 whitespace-nowrap transition-colors group-hover/item:text-gray-900 dark:group-hover/item:text-white">
        {browser.name}
      </span>
      {browser.isNew && (
        <span className="px-1.5 py-0.5 rounded-full bg-orange-500 text-white text-[9px] font-bold leading-none">
          {newLabel}
        </span>
      )}
    </a>
  )
}

export default function SupportedBrowsers() {
  const { t } = useTranslation()
  // Дублируем список для бесшовной прокрутки. translateX(-50%) сдвигает на
  // ПОЛОВИНУ трека, поэтому повторяющийся блок = 2 копии. Берём 4 копии,
  // чтобы этот блок (≈2 набора) был заведомо шире любого экрана и в ленте
  // не появлялось пустого «хвоста».
  const loop = [...browsers, ...browsers, ...browsers, ...browsers]

  return (
    <Section id="browsers" variant="default" className="!py-20 md:!py-28">
      {/* Заголовок */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-medium mb-5">
          <Globe className="w-4 h-4" />
          {t('browsers.badge')}
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
          {t('browsers.title')}{' '}
          <span className="bg-gradient-to-r from-[#0077ff] to-cyan-400 bg-clip-text text-transparent">
            {t('browsers.titleHighlight')}
          </span>
        </h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          {t('browsers.subtitle')}
        </p>
      </div>

      {/* Лента логотипов прямо на фоне сайта */}
      <div className="marquee-viewport group relative overflow-hidden">
        {/* Маски затухания — в цвет фона секции */}
        <div className="pointer-events-none absolute left-0 inset-y-0 w-16 sm:w-40 z-10 bg-gradient-to-r from-white dark:from-gray-950 to-transparent" />
        <div className="pointer-events-none absolute right-0 inset-y-0 w-16 sm:w-40 z-10 bg-gradient-to-l from-white dark:from-gray-950 to-transparent" />

        <div className="marquee-track flex w-max">
          {loop.map((browser, index) => (
            <BrowserItem
              key={`${browser.name}-${index}`}
              browser={browser}
              newLabel={t('browsers.newBadge')}
            />
          ))}
        </div>
      </div>

      <p className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
        {t('browsers.chromiumNote')}
      </p>
    </Section>
  )
}
