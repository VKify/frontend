import { useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import VkMockup from '../common/VkMockup'
import InstallButton from '../common/InstallButton'
import BrowserLogo from '../common/BrowserLogo'
import { useTranslation } from '../../i18n'

const palettes = [
  { name: 'VKify', bg: '#0b1220', card: '#152238', accent: '#0077ff' },
  { name: 'Rose Pine', bg: '#191724', card: '#26233a', accent: '#ebbcba' },
  { name: 'Nord', bg: '#2e3440', card: '#3b4252', accent: '#88c0d0' },
  { name: 'Dracula', bg: '#282a36', card: '#343746', accent: '#bd93f9' },
]

export default function BrowserShowcase() {
  const { t } = useTranslation()
  const [selected, setSelected] = useState(0)
  const palette = palettes[selected]

  return (
    <article className="relative mb-6 overflow-hidden rounded-[2rem] border border-blue-300/50 bg-white shadow-xl shadow-blue-500/5 dark:border-blue-900 dark:bg-gray-950">
      <div className="grid items-center gap-8 p-6 sm:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
        <div className="min-w-0">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1.5 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
            <Check className="size-4" /> {t('ecosystem.platforms.browser.name')} · {t('ecosystem.status.ready')}
          </p>
          <h3 className="font-display text-3xl font-black sm:text-4xl">{t('ecosystem.browserTitle')}</h3>
          <p className="mt-4 text-base leading-relaxed text-gray-600 dark:text-gray-400">{t('ecosystem.platforms.browser.summary')}</p>
          <div className="my-6 flex flex-wrap gap-3">
            {['chrome', 'firefox', 'edge', 'opera', 'yandex', 'brave'].map(name => (
              <BrowserLogo key={name} name={name} className="size-7" />
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <InstallButton size="sm" />
            <Link to="/browser" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400">
              {t('ecosystem.browserDetails')} <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>

        <div className="min-w-0">
          <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-2xl dark:border-gray-700">
            <div className="flex items-center gap-3 border-b border-gray-200 bg-gray-100 px-4 py-3 dark:border-gray-700 dark:bg-gray-800">
              <div aria-hidden="true" className="flex gap-1.5">
                <span className="size-2 rounded-full bg-red-400" /><span className="size-2 rounded-full bg-amber-400" /><span className="size-2 rounded-full bg-emerald-400" />
              </div>
              <span className="flex-1 rounded-md bg-white px-3 py-1 text-center text-xs text-gray-500 dark:bg-gray-950 dark:text-gray-400">vk.com</span>
            </div>
            <div className="pointer-events-none h-[290px] overflow-hidden sm:h-[360px]" aria-hidden="true">
              <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0.7 }} key={selected} className="w-full">
                <VkMockup {...palette} fitContainer />
              </motion.div>
            </div>
          </div>
          <fieldset className="mt-5">
            <legend className="mb-3 text-sm text-gray-600 dark:text-gray-400">{t('ecosystem.tryTheme')}</legend>
            <div className="flex flex-wrap gap-2">
              {palettes.map((theme, index) => (
                <button key={theme.name} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)} className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium transition-colors ${selected === index ? 'border-blue-500 bg-blue-500/10 text-blue-700 dark:text-blue-300' : 'border-gray-200 text-gray-600 hover:border-blue-400 dark:border-gray-700 dark:text-gray-400'}`}>
                  <span className="size-3 rounded-full" style={{ backgroundColor: theme.accent }} />{theme.name}
                </button>
              ))}
            </div>
          </fieldset>
        </div>
      </div>
    </article>
  )
}

