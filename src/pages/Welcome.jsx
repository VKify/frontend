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
  PartyPopper,
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
  Search,
  Bookmark,
  Download,
  Sparkles,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import SEO from '../components/common/SEO'
import { TelegramIcon, VKIcon, GitHubIcon } from '../components/common/SocialIcons'
import { useExtension } from '../hooks/useExtension'
import config from '../config'
import { themes } from '../data/themes'

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

function ExtensionStatusBadge({ detected, version }) {
  if (detected === null) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold
        bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
        <Loader2 className="w-3 h-3 animate-spin" />
        Определяем…
      </span>
    )
  }
  if (detected) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold
        bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
        <CheckCircle2 className="w-3.5 h-3.5" />
        VKify {version} установлен
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold
      bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
      <XCircle className="w-3.5 h-3.5" />
      Расширение не найдено
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

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-blue-50/60 to-white dark:from-gray-900 dark:to-gray-950">
      <SEO
        title="Добро пожаловать в VKify"
        description="Спасибо за установку VKify! Выберите тему и настройте расширение прямо здесь."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: [0, 12, -8, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="inline-block mb-5"
          >
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#0077ff] to-blue-400 flex items-center justify-center shadow-2xl shadow-blue-500/30">
              <PartyPopper className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">
            Добро пожаловать в{' '}
            <span className="bg-gradient-to-r from-[#0077ff] to-blue-400 bg-clip-text text-transparent">
              VKify!
            </span>
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-4">
            Теперь ВКонтакте будет выглядеть именно так, как вы хотите.
          </p>

          {/* Статус подключения */}
          <ExtensionStatusBadge detected={detected} version={version} />

          {/* Баннер «расширение не найдено» */}
          <AnimatePresence>
            {notConnected && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 overflow-hidden"
              >
                <div className="inline-flex items-start gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20
                  border border-amber-200 dark:border-amber-700/50 text-left max-w-lg mx-auto">
                  <Plug className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-amber-800 dark:text-amber-300">
                    Браузер не видит расширение. Откройте эту страницу в Chrome/Firefox
                    с установленным VKify — настройки применятся в реальном времени.
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
              Популярные темы
            </h2>
            <Link
              to="/themes"
              className="text-sm text-[#0077ff] hover:underline font-medium flex items-center gap-1"
            >
              Все темы <ChevronRight className="w-4 h-4" />
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
                  ? 'Тема будет применена, когда вы откроете страницу с установленным расширением.'
                  : `Тема «${featuredThemes.find(t => t.id === selectedTheme)?.name}» применена в VK!`
                }
              </motion.div>
            )}
          </AnimatePresence>

          {notConnected && (
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
              Выбор темы сохранится — она применится, как только расширение будет найдено.
            </p>
          )}
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-5">
            <Settings className="w-5 h-5 text-[#0077ff]" />
            Быстрые настройки
          </h2>

          <div className="divide-y divide-gray-100 dark:divide-gray-800">

            {/* Реклама в левой колонке */}
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0077ff]/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-[#0077ff]" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">Реклама в левой колонке</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Скрыть баннеры в боковой панели</p>
                </div>
              </div>
              <Toggle
                checked={settings.block_left_ads ?? true}
                onChange={() => toggle('block_left_ads')}
                disabled={notConnected}
              />
            </div>

            {/* Реклама в ленте — фильтр API: перехват newsfeed.get до рендера,
                рекламные посты режутся ещё на сетевом уровне. */}
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0077ff]/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-[#0077ff]" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">Реклама в ленте — API</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Перехват рекламных постов до рендера ленты</p>
                </div>
              </div>
              <Toggle
                checked={settings.block_feed_ads_api ?? true}
                onChange={() => toggle('block_feed_ads_api')}
                disabled={notConnected}
              />
            </div>

            {/* Реклама в ленте — фильтр DOM: страховочный слой поверх
                API-фильтра. Срабатывает на промопосты, которые проскочили
                сквозь сеть (ERID-маркеры, кастомные слова, hardMarkers). */}
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0077ff]/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-[#0077ff]" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">Реклама в ленте — DOM</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Скрытие промопостов, проскочивших API-фильтр</p>
                </div>
              </div>
              <Toggle
                checked={settings.block_feed_ads_dom ?? true}
                onChange={() => toggle('block_feed_ads_dom')}
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
                  <p className="font-medium text-gray-900 dark:text-white text-sm">Блокировка трекеров</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Отключить аналитику и счётчики VK</p>
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
                  <p className="font-medium text-gray-900 dark:text-white text-sm">Компактный режим</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Уменьшить отступы для плотной вёрстки</p>
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
          transition={{ delay: 0.35 }}
          className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-900 border border-blue-100 dark:border-gray-800 shadow-sm"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-5">
            <Sparkles className="w-5 h-5 text-[#0077ff]" />
            Что нового в v1.3
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              {
                Icon: Search,
                title: 'Поиск по функциям',
                desc: 'Ctrl+K в попапе — мгновенный переход к любой настройке расширения. Звезда у результата кладёт функцию в избранное',
              },
              {
                Icon: Download,
                title: 'Экспорт диалогов',
                desc: 'Скачать переписку в JSON, TXT, HTML или ZIP с фотографиями. Опционально расшифровать сообщения сохранённым ключом',
              },
              {
                Icon: Bookmark,
                title: 'Заметки из сообщений',
                desc: 'Иконка-закладка у каждого сообщения сохраняет его в локальный архив — потом найдёте во вкладке «Заметки»',
              },
              {
                Icon: Settings,
                title: 'Панель прямо на VK',
                desc: (
                  <>
                    Откройте{' '}
                    <a
                      href="https://vk.com/vkify_settings"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0077ff] hover:underline font-medium"
                    >
                      vk.com/vkify_settings
                    </a>{' '}
                    — попап появится прямо на странице, без открытия иконки расширения
                  </>
                ),
              },
            ].map(({ Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                className="flex gap-3 p-3 rounded-2xl bg-white/70 dark:bg-gray-900/60 border border-white dark:border-gray-800"
              >
                <div className="w-9 h-9 rounded-lg bg-[#0077ff]/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-[#0077ff]" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 dark:text-white text-sm mb-0.5">{title}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5 text-center">Как начать</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { n: '1', icon: ExternalLink, title: 'Откройте VK',          desc: 'Перейдите на vk.com — расширение уже работает' },
              { n: '2', icon: Palette,     title: 'Выберите тему',          desc: 'Прямо здесь или через иконку расширения в браузере' },
              { n: '3', icon: Settings,    title: 'Настройте под себя',     desc: 'Реклама, шрифт, скругления и другие параметры' },
            ].map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 + i * 0.08 }}
                className="relative p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm"
              >
                <div className="absolute -top-3 -left-3 w-7 h-7 rounded-full bg-[#0077ff] text-white text-xs font-bold flex items-center justify-center shadow">
                  {s.n}
                </div>
                <div className="w-11 h-11 mb-3 rounded-xl bg-[#0077ff]/10 flex items-center justify-center">
                  <s.icon className="w-5 h-5 text-[#0077ff]" />
                </div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{s.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{s.desc}</p>
              </motion.div>
            ))}
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
            Открыть VK
            <ExternalLink className="w-5 h-5" />
          </a>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5 text-center">Полезные ресурсы</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { Icon: TelegramIcon, title: 'Telegram', desc: 'Новости и обновления', href: config.links.telegram, bg: 'bg-[#0088cc]' },
              { Icon: VKIcon,       title: 'ВКонтакте', desc: 'Поддержка и обсуждения', href: config.links.vk,       bg: 'bg-[#0077ff]' },
              { Icon: GitHubIcon,   title: 'GitHub',    desc: 'Исходный код и баги',    href: config.links.github,   bg: 'bg-gray-800 dark:bg-gray-700' },
            ].map(({ Icon, title, desc, href, bg }) => (
              <a
                key={title}
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
                  <p className="font-semibold text-gray-900 dark:text-white text-sm group-hover:text-[#0077ff] transition-colors">{title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{desc}</p>
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