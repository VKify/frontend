import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Eye, EyeOff, Command, Image as ImageIcon, Film, Link as LinkIcon,
  LayoutGrid, Bookmark, Shield, Activity, Zap, Ban, Code, Settings,
} from 'lucide-react'
import SEO from '../components/common/SEO'
import { DOCS, COMING_SOON, getDocBySlug } from '../data/docs'
import { useTranslation } from '../i18n'

const HERO_ICONS = {
  eye: Eye, eyeOff: EyeOff, layoutRows: LayoutGrid, bookmark: Bookmark,
  shield: Shield, activity: Activity, zap: Zap, ban: Ban, code: Code, settings: Settings,
}

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
  const isGif = item.type === 'gif'
  const label = isGif ? t('docsPage.mediaGif') : t('docsPage.mediaShot')
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
      <img
        src={src}
        alt={label}
        loading="lazy"
        onError={() => setFailed(true)}
        className="w-full h-auto block"
      />
      <figcaption className="flex items-center gap-1.5 px-3 py-2 text-[11px] text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800">
        {isGif ? <Film className="w-3.5 h-3.5" /> : <ImageIcon className="w-3.5 h-3.5" />}
        {label}
      </figcaption>
    </figure>
  )
}

export default function Docs() {
  const { t, lang } = useTranslation()
  const { slug } = useParams()
  const doc = getDocBySlug(slug)
  const meta = doc[lang] || doc.ru
  const HeroIcon = HERO_ICONS[doc.heroIcon] || Eye
  const features = doc.features

  return (
    <div className="relative min-h-screen pt-24 pb-20 bg-white dark:bg-gray-950">
      <SEO title={meta.seoTitle} description={meta.seoDescription} url={`/docs/${doc.slug}`} />

      {/* Декоративный градиент за шапкой */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[420px] overflow-hidden">
        <div className="absolute left-1/2 top-[-140px] h-[360px] w-[760px] max-w-[130vw] -translate-x-1/2 rounded-full bg-[#0077ff]/15 blur-[120px] dark:bg-[#0077ff]/25" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Мобильный переключатель секций (горизонтальная лента) */}
        <div className="lg:hidden -mx-4 px-4 mb-8 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {DOCS.map((d) => {
            const Icon = HERO_ICONS[d.heroIcon] || Eye
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
                <Icon className="w-4 h-4" />
                {(d[lang] || d.ru).nav}
              </Link>
            )
          })}
          {COMING_SOON.map((d) => {
            const Icon = HERO_ICONS[d.heroIcon] || Eye
            return (
              <span
                key={d.slug}
                title={t('docsPage.soonHint')}
                className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium bg-gray-50 dark:bg-gray-900 text-gray-400 dark:text-gray-600 border border-dashed border-gray-200 dark:border-gray-700"
              >
                <Icon className="w-4 h-4" />
                {(d[lang] || d.ru).nav}
              </span>
            )
          })}
        </div>

        <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-12 lg:items-start">
          {/* Левый сайдбар: секции + оглавление, липкий при прокрутке */}
          <aside className="hidden lg:flex lg:flex-col lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto pr-2 scrollbar-hide">
            {/* Секции документации */}
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">
              {t('docsPage.kicker')}
            </p>
            <nav className="space-y-1">
              {DOCS.map((d) => {
                const Icon = HERO_ICONS[d.heroIcon] || Eye
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
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    {(d[lang] || d.ru).nav}
                  </Link>
                )
              })}
              {COMING_SOON.map((d) => {
                const Icon = HERO_ICONS[d.heroIcon] || Eye
                return (
                  <span
                    key={d.slug}
                    title={t('docsPage.soonHint')}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-400 dark:text-gray-600 cursor-default select-none"
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="flex-1">{(d[lang] || d.ru).nav}</span>
                    <span className="px-1.5 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-[10px] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
                      {t('docsPage.soon')}
                    </span>
                  </span>
                )
              })}
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
                    <span aria-hidden>{f.emoji}</span>
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
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0077ff] to-blue-400 shadow-xl shadow-blue-500/25 mb-5">
                <HeroIcon className="w-7 h-7 text-white" />
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

            {/* Быстрый доступ — Ctrl+K */}
            <div className="mb-14 flex items-start gap-4 p-5 rounded-2xl border border-[#0077ff]/20 bg-gradient-to-br from-[#0077ff]/[0.07] to-blue-400/[0.04]">
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
                      <span className="flex items-center justify-center w-11 h-11 rounded-2xl bg-gray-100 dark:bg-gray-800 text-2xl">
                        {f.emoji}
                      </span>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {tr.title}
                      </h2>
                      <LinkIcon className="w-4 h-4 text-gray-300 dark:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>

                    <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                      {tr.lead}
                    </p>

                    <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-3">
                      {tr.items ? t('docsPage.whatHides') : t('docsPage.howItWorks')}
                    </h3>

                    {tr.how && (
                      <ul className="space-y-2.5 mb-7">
                        {tr.how.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0 bg-[#0077ff]" />
                            <span className="text-gray-700 dark:text-gray-300 leading-relaxed">{renderRich(item)}</span>
                          </li>
                        ))}
                      </ul>
                    )}

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

                    {f.media?.length > 0 && (
                      <div className="grid sm:grid-cols-2 gap-4 mb-6">
                        {f.media.map((m, i) => (
                          <DocMedia key={i} slug={doc.slug} item={m} t={t} />
                        ))}
                      </div>
                    )}

                    <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800">
                      <Command className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#0077ff]" />
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium text-gray-800 dark:text-gray-200">{t('docsPage.quickAccessLabel')} </span>
                        {tr.access}
                      </p>
                    </div>
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
