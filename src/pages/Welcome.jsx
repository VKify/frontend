/**
 * Welcome.jsx — страница после установки расширения.
 *
 * Функциональность:
 *   - Живой статус расширения (определяется через postMessage bridge)
 *   - Версия расширения
 *   - Выбор популярных тем с мгновенным применением в расширении
 *   - Быстрые настройки: тема VK, блокировка рекламы, трекеры
 *   - Ссылки на сообщества
 */
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ExternalLink,
  Settings,
  Palette,
  Shield,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Loader2,
  Plug,
  Eye,
  Bug,
  Download,
  Sparkles,
  Video,
  Music2,
  Image,
  Clapperboard,
  History,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import SEO from '../components/common/SEO'
import { TelegramIcon, VKIcon, GitHubIcon } from '../components/common/SocialIcons'
import { useExtension } from '../hooks/useExtension'
import config from '../config'
import { themes } from '../data/themes'
import { useTranslation } from '../i18n'

const FEATURED_IDS = [
  'catppuccin-mocha',
  'nord-dark',
  'dracula',
  'tokyo-night',
  'gruvbox-dark',
  'github-dark',
]

const featuredThemes = FEATURED_IDS
  .map(id => themes.find(t => t.id === id))
  .filter(Boolean)

const DOWNLOAD_FEATURES = [
  { id: 'video_download', Icon: Video },
  { id: 'audio_download', Icon: Music2 },
  { id: 'clip_download', Icon: Clapperboard },
  { id: 'photo_download', Icon: Image },
  { id: 'story_download', Icon: History },
]

function ExtensionStatusBadge({ detected, version }) {
  const { t } = useTranslation()
  if (detected === null) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold
        bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
        <Loader2 className="w-3 h-3 animate-spin" />
        {t('welcome.detecting')}
      </span>
    )
  }
  if (detected) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold
        bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
        <CheckCircle2 className="w-3.5 h-3.5" />
        {t('welcome.installed', { version })}
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold
      bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
      <XCircle className="w-3.5 h-3.5" />
      {t('welcome.notFound')}
    </span>
  )
}

function ThemePickCard({ theme, selected, onClick }) {
  const { bg, accent, card: cardColor } = theme.preview
  return (
    <button
      onClick={onClick}
      className={`relative group rounded-2xl overflow-hidden text-left transition-all duration-200
        ${selected
          ? 'ring-2 ring-[#0077ff] ring-offset-2 ring-offset-white dark:ring-offset-gray-950 scale-[1.02]'
          : 'hover:scale-[1.02] hover:shadow-lg'
        }`}
    >
      {/* Мини-превью */}
      <div className="h-20 relative" style={{ background: bg }}>
        <div className="absolute inset-2 flex flex-col gap-1">
          <div className="rounded px-1.5 py-1 flex items-center gap-1" style={{ background: cardColor }}>
            <div className="w-2 h-2 rounded-full" style={{ background: accent }} />
            <div className="flex-1 h-0.5 rounded-full opacity-30" style={{ background: accent }} />
          </div>
          <div className="rounded px-1.5 py-1 flex-1" style={{ background: cardColor }}>
            <div className="h-0.5 w-4/5 rounded-full opacity-30 mb-0.5" style={{ background: accent }} />
            <div className="h-0.5 w-3/5 rounded-full opacity-20" style={{ background: accent }} />
          </div>
        </div>
        {selected && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <CheckCircle2 className="w-6 h-6 text-white drop-shadow" />
          </div>
        )}
      </div>
      {/* Название */}
      <div className="px-2 py-1.5 bg-white dark:bg-gray-900 border border-t-0 border-gray-200 dark:border-gray-800 rounded-b-2xl">
        <p className="text-[11px] font-semibold text-gray-800 dark:text-gray-200 truncate">{theme.name}</p>
      </div>
    </button>
  )
}

function Toggle({ checked, onChange, disabled }) {
  return (
    <label className={`relative inline-flex items-center ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}>
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={e => !disabled && onChange(e.target.checked)}
        disabled={disabled}
      />
      <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700
        peer-focus:ring-2 peer-focus:ring-[#0077ff]/50
        rounded-full peer transition-colors
        peer-checked:bg-[#0077ff]
        after:content-[''] after:absolute after:top-[2px] after:left-[2px]
        after:bg-white after:rounded-full after:h-5 after:w-5
        after:transition-all peer-checked:after:translate-x-full" />
    </label>
  )
}

export default function Welcome() {
  const { t } = useTranslation()
  const { detected, version, settings, saveSettings } = useExtension()

  const [selectedTheme, setSelectedTheme] = useState(null)
  const [themeSaved, setThemeSaved] = useState(false)

  const notConnected = detected === false

  function applyTheme(theme) {
    setSelectedTheme(theme.id)
    setThemeSaved(false)
    saveSettings(theme.config)
    setTimeout(() => setThemeSaved(true), 300)
  }

  function toggle(key) {
    saveSettings({ [key]: !settings[key] })
  }

  const adProtectionEnabled = ['block_left_ads', 'block_feed_ads_api']
    .every(key => settings[key] ?? true)

  function setAdProtection(enabled) {
    saveSettings({
      block_left_ads: enabled,
      block_feed_ads_api: enabled,
    })
  }

  const allDownloadsEnabled = DOWNLOAD_FEATURES.every(({ id }) => settings[id] ?? false)

  function setAllDownloads(enabled) {
    saveSettings(Object.fromEntries(DOWNLOAD_FEATURES.map(({ id }) => [id, enabled])))
  }

  return (
    <div className="relative min-h-screen overflow-hidden pt-24 pb-16 bg-gradient-to-b from-blue-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-950 dark:to-slate-950">
      <SEO
        title={t('welcome.seoTitle')}
        description={t('welcome.seoDescription')}
      />

      <div className="pointer-events-none absolute -top-36 -left-28 h-96 w-96 rounded-full bg-[#0077ff]/15 blur-3xl" />
      <div className="pointer-events-none absolute top-72 -right-40 h-[28rem] w-[28rem] rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 p-7 shadow-2xl shadow-blue-950/5 backdrop-blur-xl dark:border-white/10 dark:bg-gray-900/75 sm:p-10 lg:p-12"
        >
          <div className="absolute left-1/2 top-0 h-40 w-96 -translate-x-1/2 rounded-full bg-[#0077ff]/15 blur-3xl" />
          <div className="relative mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0077ff] shadow-xl shadow-blue-500/25"
            >
              <Sparkles className="h-8 w-8 text-white" />
            </motion.div>

            <div className="mb-5 flex flex-wrap items-center justify-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#0077ff]/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#0077ff]">
                {t('welcome.kicker')}
              </span>
              <ExtensionStatusBadge detected={detected} version={version} />
            </div>

            <h1 className="mb-4 text-4xl font-black tracking-tight text-gray-950 dark:text-white sm:text-6xl">
              {t('welcome.titlePre')}{' '}
              <span className="text-[#0077ff]">{t('welcome.titleAccent')}</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-300">
              {t('welcome.subtitle')}
            </p>
          </div>

          {/* Баннер «расширение не найдено» */}
          <AnimatePresence>
            {notConnected && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="relative mt-6 overflow-hidden"
              >
                <div className="mx-auto flex max-w-lg items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-left dark:border-amber-700/50 dark:bg-amber-900/20">
                  <Plug className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-amber-800 dark:text-amber-300">
                    {t('welcome.notConnectedHint')}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm"
        >
          <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Palette className="w-5 h-5 text-[#0077ff]" />
              {t('welcome.popularThemes')}
            </h2>
            <Link
              to="/themes"
              className="text-sm text-[#0077ff] hover:underline font-medium flex items-center gap-1"
            >
              {t('welcome.allThemes')} <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-5">
            {featuredThemes.map(theme => (
              <ThemePickCard
                key={theme.id}
                theme={theme}
                selected={selectedTheme === theme.id}
                onClick={() => applyTheme(theme)}
              />
            ))}
          </div>

          {/* Результат сохранения */}
          <AnimatePresence>
            {themeSaved && selectedTheme && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400"
              >
                <CheckCircle2 className="w-4 h-4" />
                {notConnected
                  ? t('welcome.themeAppliedDeferred')
                  : t('welcome.themeApplied', { name: featuredThemes.find(x => x.id === selectedTheme)?.name })
                }
              </motion.div>
            )}
          </AnimatePresence>

          {notConnected && (
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
              {t('welcome.themeWillApply')}
            </p>
          )}
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-8"
        >
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
                <Download className="h-5 w-5 text-[#0077ff]" />
                {t('welcome.downloads.title')}
              </h2>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{t('welcome.downloads.subtitle')}</p>
            </div>
            <label className="flex items-center gap-3 text-sm font-medium text-gray-700 dark:text-gray-200">
              {t('welcome.downloads.enableAll')}
              <Toggle checked={allDownloadsEnabled} onChange={setAllDownloads} disabled={notConnected} />
            </label>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {DOWNLOAD_FEATURES.map(({ id, Icon }) => (
              <div key={id} className="flex items-center justify-between gap-3 rounded-2xl bg-gray-50 p-4 dark:bg-gray-800/60 lg:flex-col lg:items-start">
                <div className="flex min-w-0 items-center gap-3 lg:block">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#0077ff]/10 lg:mb-4">
                    <Icon className="h-5 w-5 text-[#0077ff]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{t(`welcome.downloads.items.${id}.title`)}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-gray-500 dark:text-gray-400">{t(`welcome.downloads.items.${id}.desc`)}</p>
                  </div>
                </div>
                <div className="lg:mt-auto lg:self-end">
                  <Toggle
                    checked={settings[id] ?? false}
                    onChange={() => toggle(id)}
                    disabled={notConnected}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm"
        >
          <div className="mb-5">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Settings className="w-5 h-5 text-[#0077ff]" />
              {t('welcome.quickSettings')}
            </h2>
            <p className="mt-2 max-w-3xl text-sm text-gray-500 dark:text-gray-400">{t('welcome.quickSettingsSubtitle')}</p>
          </div>

          <div className="divide-y divide-gray-100 dark:divide-gray-800">

            {/* Единый пользовательский переключатель включает все слои блокировки рекламы. */}
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0077ff]/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-[#0077ff]" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">{t('welcome.settings.ad_protection.title')}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{t('welcome.settings.ad_protection.desc')}</p>
                </div>
              </div>
              <Toggle
                checked={adProtectionEnabled}
                onChange={setAdProtection}
                disabled={notConnected}
              />
            </div>

            {/* Трекеры */}
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0077ff]/10 flex items-center justify-center flex-shrink-0">
                  <Bug className="w-5 h-5 text-[#0077ff]" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">{t('welcome.settings.block_trackers.title')}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{t('welcome.settings.block_trackers.desc')}</p>
                </div>
              </div>
              <Toggle
                checked={settings.block_trackers ?? true}
                onChange={() => toggle('block_trackers')}
                disabled={notConnected}
              />
            </div>

            {/* Компактный режим */}
            <div className="flex items-center justify-between py-4 last:pb-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0077ff]/10 flex items-center justify-center flex-shrink-0">
                  <Eye className="w-5 h-5 text-[#0077ff]" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">{t('welcome.settings.compact_spacing.title')}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{t('welcome.settings.compact_spacing.desc')}</p>
                </div>
              </div>
              <Toggle
                checked={settings.compact_spacing ?? false}
                onChange={() => toggle('compact_spacing')}
                disabled={notConnected}
              />
            </div>

          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5 text-center">{t('welcome.howStart')}</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[Palette, ExternalLink, Download].map((Icon, i) => {
              const s = t('welcome.steps')[i]
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 + i * 0.08 }}
                  className="relative p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm"
                >
                  <div className="absolute -top-3 -left-3 w-7 h-7 rounded-full bg-[#0077ff] text-white text-xs font-bold flex items-center justify-center shadow">
                    {i + 1}
                  </div>
                  <div className="w-11 h-11 mb-3 rounded-xl bg-[#0077ff]/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#0077ff]" />
                  </div>
                  <p className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{s.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{s.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="text-center"
        >
          <a
            href="https://vk.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl
              bg-[#0077ff] hover:bg-blue-600 text-white font-bold text-base shadow-xl shadow-blue-500/25
              transition-all duration-200 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-blue-500/30"
          >
            {t('welcome.openVk')}
            <ExternalLink className="w-5 h-5" />
          </a>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5 text-center">{t('welcome.resources')}</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { id: 'telegram', Icon: TelegramIcon, href: config.links.telegram, bg: 'bg-[#0088cc]' },
              { id: 'vk',       Icon: VKIcon,       href: config.links.vk,       bg: 'bg-[#0077ff]' },
              { id: 'github',   Icon: GitHubIcon,   href: config.links.github,   bg: 'bg-gray-800 dark:bg-gray-700' },
            ].map(({ id, Icon, href, bg }) => (
              <a
                key={id}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-gray-900
                  border border-gray-200 dark:border-gray-800 hover:shadow-lg hover:border-gray-300
                  dark:hover:border-gray-700 transition-all duration-200"
              >
                <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center shadow flex-shrink-0`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 dark:text-white text-sm group-hover:text-[#0077ff] transition-colors">{t(`welcome.links.${id}.title`)}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{t(`welcome.links.${id}.desc`)}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#0077ff] group-hover:translate-x-1 transition-all flex-shrink-0" />
              </a>
            ))}
          </div>
        </motion.section>

      </div>
    </div>
  )
}
