import config from '../config'
import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, EyeOff, Command, Image as ImageIcon, Film, Link as LinkIcon, ZoomIn, Copy, Check, Download } from 'lucide-react'
import SEO from '../components/common/SEO'
import { VkIcon, VkMenuMock } from '../components/docs/vkIcons'
import { DOCS, COMING_SOON, getDocBySlug } from '../data/docs'
import { lampaDocs } from '../data/lampaDocs'
import { useTranslation } from '../i18n'
import ImageLightbox from '../components/docs/ImageLightbox'
import PlatformNav from '../components/docs/PlatformNav'

// Инлайн-разметка: **жирный** и `код`
function renderRich(text) {
  return text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-gray-900 dark:text-white">
          {part.slice(2, -2)}
        </strong>
      )
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={i} className="px-1.5 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-[0.9em] font-mono text-[#0077ff]">
          {part.slice(1, -1)}
        </code>
      )
    }
    return part
  })
}

// Картинка из public/docs/<slug>/<file>; пока файла нет — аккуратная заглушка
function DocMedia({ slug, item, t }) {
  const [failed, setFailed] = useState(false)
  const [open, setOpen] = useState(false)
  const isGif = item.type === 'gif'
  const label = item.label || (isGif ? t('docsPage.mediaGif') : t('docsPage.mediaShot'))
  const src = `/docs/${slug}/${item.file}`

  if (failed) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 h-44 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/60 text-gray-400 dark:text-gray-500">
        {isGif ? <Film className="w-6 h-6" /> : <ImageIcon className="w-6 h-6" />}
        <span className="text-xs font-medium">{label}</span>
        <span className="text-[11px] font-mono opacity-70">{item.file}</span>
      </div>
    )
  }

  return (
    <figure className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t('docsPage.imageOpen')}
        className="group relative block w-full cursor-zoom-in overflow-hidden text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0077ff]"
      >
        <img
          src={src}
          alt={label}
          loading="lazy"
          onError={() => setFailed(true)}
          className="w-full h-auto block transition-transform duration-300 group-hover:scale-[1.01]"
        />
        <span className="absolute bottom-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-gray-950/65 text-white opacity-80 shadow-lg backdrop-blur transition group-hover:opacity-100">
          <ZoomIn className="h-4 w-4" />
        </span>
      </button>
      <figcaption className="flex items-center gap-1.5 px-3 py-2 text-[11px] text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800">
        {isGif ? <Film className="w-3.5 h-3.5" /> : <ImageIcon className="w-3.5 h-3.5" />}
        {label}
      </figcaption>
      {open && <ImageLightbox src={src} alt={label} onClose={() => setOpen(false)} t={t} />}
    </figure>
  )
}

export default function Docs({ platform }) {
  const { t, lang } = useTranslation()
  const { slug } = useParams()
  const isLampa = platform === 'lampa'
  const doc = isLampa ? lampaDocs : getDocBySlug(slug)
  const sections = isLampa ? [lampaDocs] : DOCS
  const meta = doc[lang] || doc.ru
  const features = doc.features
  const [copyState, setCopyState] = useState('')
  async function copyPlugin() {
    try {
      await navigator.clipboard.writeText('https://vkify.ru/plugins/vkify.js')
      setCopyState('ok')
    } catch {
      setCopyState('error')
    }
  }

  return (
    <div className="relative min-h-screen pt-24 pb-20 bg-white dark:bg-gray-950">
      <SEO title={meta.seoTitle} description={meta.seoDescription} url={`/docs/${doc.slug}`} />

      {/* Декоративный градиент за шапкой */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[420px] overflow-hidden">
        <div className="absolute left-1/2 top-[-140px] h-[360px] w-[760px] max-w-[130vw] -translate-x-1/2 rounded-full bg-[#0077ff]/15 blur-[120px] dark:bg-[#0077ff]/25" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/docs" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400">
          <ArrowLeft className="size-4" />{lang === 'ru' ? 'Все платформы' : 'All platforms'}
        </Link>
        <PlatformNav active={isLampa ? 'lampa' : 'browser'} />
        {/* Мобильный переключатель секций (горизонтальная лента) */}
        <div className="lg:hidden -mx-4 px-4 mb-8 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {sections.map((d) => {
            const active = d.slug === doc.slug
            return (
              <Link
                key={d.slug}
                to={`/docs/${d.slug}`}
                className={`flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  active
                    ? 'bg-[#0077ff] text-white shadow-md shadow-blue-500/25'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                }`}
              >
                <VkIcon name={d.heroIcon} size={18} />
                {(d[lang] || d.ru).nav}
              </Link>
            )
          })}
          {COMING_SOON.map((d) => (
            <span
              key={d.slug}
              title={t('docsPage.soonHint')}
              className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium bg-gray-50 dark:bg-gray-900 text-gray-400 dark:text-gray-600 border border-dashed border-gray-200 dark:border-gray-700"
            >
              <VkIcon name={d.heroIcon} size={18} />
              {(d[lang] || d.ru).nav}
            </span>
          ))}
        </div>

        <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-12 lg:items-start">
          {/* Левый сайдбар: секции + оглавление, липкий при прокрутке */}
          <aside className="hidden lg:flex lg:flex-col lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto pr-2 scrollbar-hide">
            {/* Секции документации */}
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">
              {t('docsPage.kicker')}{!isLampa && (' · ' + t('docsPage.currentVersion', { version: config.app.version }))}
            </p>
            <nav className="space-y-1">
              {sections.map((d) => {
                const active = d.slug === doc.slug
                return (
                  <Link
                    key={d.slug}
                    to={`/docs/${d.slug}`}
                    aria-current={active ? 'page' : undefined}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                      active
                        ? 'bg-[#0077ff]/10 text-[#0077ff] font-semibold'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <VkIcon name={d.heroIcon} size={18} className="flex-shrink-0" />
                    {(d[lang] || d.ru).nav}
                  </Link>
                )
              })}
              {COMING_SOON.map((d) => (
                <span
                  key={d.slug}
                  title={t('docsPage.soonHint')}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-400 dark:text-gray-600 cursor-default select-none"
                >
                  <VkIcon name={d.heroIcon} size={18} className="flex-shrink-0" />
                  <span className="flex-1">{(d[lang] || d.ru).nav}</span>
                  <span className="px-1.5 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-[10px] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
                    {t('docsPage.soon')}
                  </span>
                </span>
              ))}
            </nav>

            {/* Оглавление активной секции */}
            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">
                {t('docsPage.onThisPage')}
              </p>
              <nav className="space-y-1">
                {features.map((f) => (
                  <a
                    key={f.anchor}
                    href={`#${f.anchor}`}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:text-[#0077ff] hover:bg-[#0077ff]/5 transition-colors"
                  >
                    <VkIcon name={f.icon} size={16} className="flex-shrink-0 text-gray-400 dark:text-gray-500" />
                    {(f[lang] || f.ru).title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Контент */}
          <div className="min-w-0">
            {/* Шапка секции */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-10"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0077ff] to-blue-400 shadow-xl shadow-blue-500/25 mb-5 text-white">
                <VkIcon name={doc.heroIcon} size={28} />
              </div>
              <p className="text-sm font-semibold uppercase tracking-wider text-[#0077ff] mb-2">
                {t('docsPage.kicker')}
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-3">
                {meta.title}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {meta.subtitle}
              </p>
              {meta.note && (
                <p className="mt-3 text-sm text-gray-500 dark:text-gray-500">
                  {meta.note}
                </p>
              )}
            </motion.div>

            {doc.overviewMedia && (
              <div className="mb-10">
                <DocMedia
                  slug={doc.slug}
                  item={{ ...doc.overviewMedia, label: t('docsPage.overviewShot') }}
                  t={t}
                />
              </div>
            )}

            {/* Быстрый доступ — Ctrl+K */}
            {!isLampa && <div className="mb-14 flex items-start gap-4 p-5 rounded-2xl border border-[#0077ff]/20 bg-gradient-to-br from-[#0077ff]/[0.07] to-blue-400/[0.04]">
              <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-[#0077ff]/10 flex items-center justify-center">
                <Command className="w-5 h-5 text-[#0077ff]" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {t('docsPage.quickTitle')}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t('docsPage.quickPre')}
                  <kbd className="mx-1 px-1.5 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-mono text-gray-700 dark:text-gray-300">Ctrl / Cmd + K</kbd>
                  {t('docsPage.quickPost')}
                </p>
              </div>
            </div>

            }
            {isLampa && (
              <div className="mb-10 rounded-2xl border border-[#0077ff]/20 bg-[#0077ff]/5 p-5 text-sm">
                <p className="mb-3 font-semibold text-gray-900 dark:text-white">{lang === 'ru' ? 'Ссылка для Android' : 'Android installation URL'}</p>
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-blue-500/20 bg-white p-3 dark:bg-gray-950">
                  <a className="min-w-0 break-all font-mono text-[#0077ff]" href="/plugins/vkify.js">https://vkify.ru/plugins/vkify.js</a>
                  <button type="button" onClick={copyPlugin} className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 font-medium text-white hover:bg-blue-500">{copyState === 'ok' ? <Check className="size-4" /> : <Copy className="size-4" />}{copyState === 'ok' ? (lang === 'ru' ? 'Скопировано' : 'Copied') : (lang === 'ru' ? 'Копировать' : 'Copy')}</button>
                </div>
                <p role="status" className="text-xs text-gray-500">{copyState === 'error' ? (lang === 'ru' ? 'Не удалось скопировать. Выделите ссылку и скопируйте вручную.' : 'Could not copy. Select the URL and copy it manually.') : ''}</p>
                <div className="mt-3 flex flex-wrap gap-4 text-[#0077ff]">
                  <a className="inline-flex items-center gap-2 hover:underline" href="https://github.com/lampa-app/LAMPA/releases"><Download className="size-4" />{lang === 'ru' ? 'Lampa для Android · без прокси' : 'Lampa for Android · no proxy'}</a>
                  <Link to="/lampa#lampa-examples">{lang === 'ru' ? 'Скриншоты' : 'Screenshots'}</Link>
                </div>
                <nav className="mt-4 flex flex-wrap gap-4 lg:hidden">
                  {features.map(f => <a className="text-[#0077ff]" key={f.anchor} href={'#' + f.anchor}>{(f[lang] || f.ru).title}</a>)}
                </nav>
              </div>
            )}
            {/* Разделы */}
            <div className="space-y-16">
              {features.map((f) => {
                const tr = f[lang] || f.ru
                return (
                  <motion.section
                    key={f.anchor}
                    id={f.anchor}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    className="scroll-mt-24"
                  >
                    <a href={`#${f.anchor}`} className="group inline-flex items-center gap-3 mb-3">
                      <span className="flex items-center justify-center w-11 h-11 rounded-2xl bg-[#0077ff]/10 text-[#0077ff]">
                        <VkIcon name={f.icon} size={24} />
                      </span>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {tr.title}
                      </h2>
                      <LinkIcon className="w-4 h-4 text-gray-300 dark:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>

                    {tr.lead && <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                      {tr.lead}
                    </p>}

                    <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-3">
                      {isLampa ? (lang === 'ru' ? 'Что нужно сделать' : 'Steps') : tr.items ? t('docsPage.whatHides') : t('docsPage.howItWorks')}
                    </h3>

                    {tr.how && (
                      <ul className="space-y-2.5 mb-7">
                        {tr.how.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            {isLampa ? <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-blue-500/10 text-xs font-semibold text-blue-500">{i + 1}</span> : <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0 bg-[#0077ff]" />}
                            <span className="min-w-0 break-words text-gray-700 dark:text-gray-300 leading-relaxed">{renderRich(item)}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {f.commands && <pre className="mb-7 overflow-x-auto rounded-2xl border border-gray-800 bg-gray-950 p-5 text-sm leading-relaxed text-gray-100"><code>{f.commands}</code></pre>}

                    {tr.items && (
                      <ul className="mb-7 rounded-2xl border border-gray-200 dark:border-gray-800 divide-y divide-gray-100 dark:divide-gray-800 overflow-hidden">
                        {tr.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 p-4">
                            <EyeOff className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-400 dark:text-gray-500" />
                            <div>
                              <span className="font-medium text-gray-900 dark:text-white">{item.title}</span>
                              <span className="text-gray-500 dark:text-gray-400"> — {item.desc}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}

                    {(f.media?.length > 0 || f.widget === 'vkMenu') && (
                      <div className="grid sm:grid-cols-2 gap-4 mb-6">
                        {f.widget === 'vkMenu' && (
                          <VkMenuMock caption={t('docsPage.vkMenuCaption')} />
                        )}
                        {f.media?.map((m, i) => (
                          <DocMedia key={i} slug={doc.slug} item={m} t={t} />
                        ))}
                      </div>
                    )}

                    {tr.access && <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800">
                      <Command className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#0077ff]" />
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium text-gray-800 dark:text-gray-200">{t('docsPage.quickAccessLabel')} </span>
                        {tr.access}
                      </p>
                    </div>
                    }
                  </motion.section>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
