import { motion } from 'framer-motion'
import {
  AlertTriangle,
  CheckCircle2,
  Download,
  ExternalLink,
  FileArchive,
  FolderOpen,
  Github,
  Loader2,
  MousePointerClick,
  Puzzle,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react'
import SEO from '../components/common/SEO'
import BrowserLogo from '../components/common/BrowserLogo'
import { useLatestFirefoxRelease } from '../hooks/useLatestFirefoxRelease'
import { useTranslation } from '../i18n'

const steps = [
  { id: 'download', icon: Download },
  { id: 'open', icon: FolderOpen },
  { id: 'confirm', icon: MousePointerClick },
  { id: 'permissions', icon: ShieldCheck },
  { id: 'check', icon: Puzzle },
]

function DownloadAction() {
  const { t } = useTranslation()
  const { status, release, retry } = useLatestFirefoxRelease()

  if (status === 'loading') {
    return (
      <div className="inline-flex items-center gap-3 rounded-xl bg-[#0077ff]/10 px-6 py-3 font-semibold text-[#0077ff]">
        <Loader2 className="h-5 w-5 animate-spin" />
        {t('firefoxInstall.loading')}
      </div>
    )
  }

  if (status === 'error' || status === 'missing') {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-left dark:border-amber-900/60 dark:bg-amber-950/30">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 flex-none text-amber-600 dark:text-amber-400" />
          <div>
            <p className="font-semibold text-amber-950 dark:text-amber-100">
              {t(`firefoxInstall.${status}Title`)}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-amber-800 dark:text-amber-200/80">
              {t(`firefoxInstall.${status}Description`)}
            </p>
            <button
              type="button"
              onClick={retry}
              className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-amber-900 hover:text-[#0077ff] dark:text-amber-100"
            >
              <RefreshCw className="h-4 w-4" />
              {t('firefoxInstall.retry')}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-3 sm:items-start">
      <motion.a
        href={release.downloadUrl}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-[#0077ff] px-7 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/25 hover:bg-[#0066dd] sm:w-auto"
      >
        <Download className="h-5 w-5" />
        {t('firefoxInstall.download')}
      </motion.a>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {release.fileName} · {release.version}
      </p>
    </div>
  )
}

export default function FirefoxInstall() {
  const { t } = useTranslation()

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-orange-50 via-white to-blue-50 pb-20 pt-28 dark:from-gray-900 dark:via-gray-950 dark:to-slate-950 sm:pt-32">
      <SEO
        title={t('firefoxInstall.seoTitle')}
        description={t('firefoxInstall.seoDescription')}
        url="/firefox"
      />

      <div className="pointer-events-none absolute -left-32 top-8 h-80 w-80 rounded-full bg-orange-400/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-96 h-96 w-96 rounded-full bg-[#0077ff]/10 blur-3xl" />

      <div className="relative mx-auto max-w-5xl space-y-10 px-4 sm:px-6 lg:px-8">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/85 p-6 shadow-2xl shadow-blue-950/5 backdrop-blur-xl dark:border-white/10 dark:bg-gray-900/80 sm:p-10 lg:p-12"
        >
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto] lg:gap-12">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-orange-500/10 px-3 py-1.5 text-sm font-semibold text-orange-600 dark:text-orange-400">
                <BrowserLogo name="firefox" className="h-5 w-5" />
                Firefox
              </div>
              <h1 className="text-4xl font-black tracking-tight text-gray-950 dark:text-white sm:text-5xl lg:text-6xl">
                {t('firefoxInstall.title')}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                {t('firefoxInstall.intro')}
              </p>
              <div className="mt-7">
                <DownloadAction />
              </div>
            </div>

            <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-[2.5rem] bg-gradient-to-br from-orange-400/15 to-purple-500/15 shadow-inner sm:h-48 sm:w-48">
              <BrowserLogo name="firefox" className="h-24 w-24 sm:h-28 sm:w-28" />
            </div>
          </div>
        </motion.section>

        <section>
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-bold text-gray-950 dark:text-white sm:text-4xl">
              {t('firefoxInstall.stepsTitle')}
            </h2>
            <p className="mt-3 text-gray-600 dark:text-gray-400">{t('firefoxInstall.stepsSubtitle')}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {steps.map(({ id, icon: Icon }, index) => (
              <motion.article
                key={id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className={`rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 ${index === steps.length - 1 ? 'md:col-span-2' : ''}`}
              >
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-[#0077ff]/10 text-[#0077ff]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#0077ff]">
                      {t('firefoxInstall.stepNumber', { number: index + 1 })}
                    </p>
                    <h3 className="mt-1 text-lg font-bold text-gray-950 dark:text-white">
                      {t(`firefoxInstall.steps.${id}.title`)}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                      {t(`firefoxInstall.steps.${id}.description`)}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-blue-200 bg-blue-50/80 p-6 dark:border-blue-900/60 dark:bg-blue-950/30 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <div className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-[#0077ff] text-white shadow-lg shadow-blue-500/20">
              <FileArchive className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-950 dark:text-white">{t('firefoxInstall.hintTitle')}</h2>
              <p className="mt-2 leading-relaxed text-gray-700 dark:text-gray-300">{t('firefoxInstall.hintDescription')}</p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold">
                <span className="inline-flex items-center gap-2 text-[#0077ff]">
                  <CheckCircle2 className="h-4 w-4" />
                  about:addons
                </span>
                <a
                  href="https://github.com/VKify/vkify-extension/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-gray-600 hover:text-[#0077ff] dark:text-gray-300"
                >
                  <Github className="h-4 w-4" />
                  {t('firefoxInstall.allReleases')}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
