import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X, ZoomIn, Palette, ShieldOff, Code, Eye, Type, Download, Check } from 'lucide-react'
import Section from '../common/Section'
import { VK_ICONS } from '../common/vkMenuIcons'
import config from '../../config'
import { useTranslation } from '../../i18n'

// Тексты (title/description) — из i18n: screenshots.items.<mockup>.*
const screenshots = [
  { id: 1, icon: Palette,   color: 'from-purple-500 to-pink-500',   mockup: 'themes' },
  { id: 2, icon: ShieldOff, color: 'from-green-500 to-emerald-500', mockup: 'adblock' },
  { id: 3, icon: Code,      color: 'from-blue-500 to-cyan-500',     mockup: 'css' },
  { id: 4, icon: Eye,       color: 'from-orange-500 to-red-500',    mockup: 'privacy' },
  { id: 5, icon: Download,  color: 'from-teal-500 to-cyan-500',     mockup: 'media' },
  { id: 6, icon: Type,      color: 'from-indigo-500 to-violet-500', mockup: 'fonts' },
]

// Хелпер: переведённые title/description скриншота (с подстановкой чисел)
function useScreenshotText() {
  const { t } = useTranslation()
  return (s) => ({
    title: t(`screenshots.items.${s.mockup}.title`),
    description: t(`screenshots.items.${s.mockup}.description`, { themes: config.stats.themes, fonts: config.stats.fonts }),
  })
}

// Функции загрузки медиа — то, что показано на слайде «Загрузка медиа».
// Каждая строка имитирует пункт настроек VKify с включённым тумблером,
// иконки — настоящие иконки меню ВКонтакте (VK_ICONS), подобранные по смыслу.
const MEDIA_ITEMS = [
  { id: 'video',   icon: 'video' },      // видео
  { id: 'stories', icon: 'photo' },      // истории
  { id: 'clips',   icon: 'clips' },      // клипы
  { id: 'photos',  icon: 'tabAlbums' },  // фото и альбомы
  { id: 'music',   icon: 'music' },      // музыка
  { id: 'dialog',  icon: 'messenger' },  // экспорт диалога
]

function MediaMockup({ isActive }) {
  const { t } = useTranslation()

  return (
    <div className="w-full h-full bg-gradient-to-b from-[#0d1117] to-[#161b22] p-2 sm:p-2.5 flex flex-col gap-2 sm:gap-1.5 overflow-hidden">

      {/* ── Заголовок панели ── */}
      <motion.div
        initial={false}
        animate={isActive ? { opacity: [0, 1], y: [-6, 0] } : { opacity: 1, y: 0 }}
        className="flex-shrink-0 flex items-center gap-2 sm:gap-2.5 bg-gradient-to-r from-teal-500/20 to-cyan-500/5 border border-teal-500/20 rounded-lg sm:rounded-xl px-2.5 sm:px-3 py-1.5 sm:py-2"
      >
        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-teal-500/30">
          <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[11px] sm:text-sm font-bold text-white/90 leading-none truncate">
            {t('screenshots.items.media.title')}
          </div>
          <div className="text-[9px] sm:text-[11px] text-teal-400/80 mt-1 leading-none">VKify</div>
        </div>
        <div className="flex-shrink-0 flex items-center gap-1.5 bg-teal-500/10 border border-teal-500/20 rounded-full px-2 py-1">
          <div className="w-1.5 h-1.5 rounded-full bg-teal-400 shadow-sm shadow-teal-400/50" />
          <span className="text-[9px] text-teal-400 font-bold leading-none">6 ON</span>
        </div>
      </motion.div>

      {/* ── Мобайл: чистые плитки 3×2 · ПК (sm+): вертикальный список ── */}
      <div className="flex-1 min-h-0 grid grid-cols-3 grid-rows-2 gap-2 sm:flex sm:flex-col sm:gap-1.5">
        {MEDIA_ITEMS.map((item, i) => (
          <motion.div
            key={item.id}
            initial={false}
            animate={isActive ? { opacity: [0, 1], scale: [0.92, 1] } : { opacity: 1, scale: 1 }}
            transition={{ delay: 0.08 + i * 0.06 }}
            className="relative flex flex-col items-center justify-center text-center gap-1.5 rounded-xl bg-white/[0.03] border border-white/[0.07] p-2
                       sm:flex-row sm:justify-start sm:text-left sm:gap-3 sm:flex-1 sm:p-0 sm:px-3 sm:bg-white/[0.04]"
          >
            {/* Статус «включено»: галочка в углу на мобайле */}
            <div className="absolute top-1.5 right-1.5 sm:hidden w-3.5 h-3.5 rounded-full bg-teal-500 flex items-center justify-center shadow-sm shadow-teal-500/40">
              <Check className="w-2 h-2 text-white" strokeWidth={4} />
            </div>

            {/* Иконка */}
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-teal-500/[0.12] border border-teal-500/15 flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 20 20" fill="none" className="w-[18px] h-[18px] sm:w-5 sm:h-5 text-teal-400">
                {VK_ICONS[item.icon]}
              </svg>
            </div>

            {/* Текст */}
            <div className="w-full min-w-0 sm:flex-1">
              <div className="text-[9px] sm:text-[13px] font-medium sm:font-semibold text-white/85 truncate leading-tight">
                {t(`screenshots.mockup.media.${item.id}.title`)}
              </div>
              <div className="hidden sm:block text-[8px] sm:text-[10px] text-white/40 truncate leading-tight mt-0.5">
                {t(`screenshots.mockup.media.${item.id}.desc`)}
              </div>
            </div>

            {/* Тумблер «включено» — только в списке (ПК) */}
            <div className="hidden sm:flex flex-shrink-0 w-9 h-5 rounded-full bg-teal-500 shadow-sm shadow-teal-500/40 items-center justify-end px-[3px]">
              <div className="w-3.5 h-3.5 rounded-full bg-white flex items-center justify-center shadow-sm">
                <Check className="w-2.5 h-2.5 text-teal-600" strokeWidth={3.5} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function ScreenMockup({ type, isActive }) {
  const { t } = useTranslation()
  const baseClasses = "w-full h-full"

  if (type === 'themes') {
    return (
      <div className={baseClasses + " bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-4 sm:p-6"}>
        <div className="h-full flex flex-col">
          <div className="h-8 sm:h-10 bg-white dark:bg-gray-800 rounded-lg mb-3 sm:mb-4 flex items-center px-3 sm:px-4 gap-2">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-purple-500" />
            <div className="w-16 sm:w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
          <div className="flex-1 grid grid-cols-4 gap-2 sm:gap-3">
            {['#0077ff', '#9333ea', '#22c55e', '#f97316', '#ef4444', '#ec4899', '#06b6d4', '#eab308'].map((color, i) => (
              <motion.div
                key={i}
                initial={false}
                animate={isActive ? { scale: [0.8, 1], opacity: [0, 1] } : { scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-lg sm:rounded-xl flex items-center justify-center"
                style={{ backgroundColor: color + '20', border: `2px solid ${color}` }}
              >
                <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full" style={{ backgroundColor: color }} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  
  if (type === 'adblock') {
    return (
      <div className={baseClasses + " bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-4 sm:p-6"}>
        <div className="h-full flex gap-3 sm:gap-4">
          <div className="hidden sm:block w-1/4 bg-white dark:bg-gray-800 rounded-xl p-2 sm:p-3 space-y-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-6 sm:h-8 bg-gray-100 dark:bg-gray-700 rounded-lg" />
            ))}
          </div>
          <div className="flex-1 space-y-2 sm:space-y-4">
            {[1, 2].map((i) => (
              <motion.div
                key={i}
                initial={false}
                animate={isActive ? { x: [20, 0], opacity: [0, 1] } : { x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-2 sm:p-4"
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-3">
                  <div className="w-6 h-6 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex-shrink-0" />
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="w-16 sm:w-24 h-1.5 sm:h-2 bg-gray-200 dark:bg-gray-700 rounded" />
                    <div className="w-10 sm:w-16 h-1.5 sm:h-2 bg-gray-100 dark:bg-gray-600 rounded" />
                  </div>
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <div className="w-full h-1.5 sm:h-2 bg-gray-100 dark:bg-gray-700 rounded" />
                  <div className="w-3/4 h-1.5 sm:h-2 bg-gray-100 dark:bg-gray-700 rounded" />
                </div>
              </motion.div>
            ))}
            <motion.div
              initial={false}
              animate={isActive ? { scale: [0.9, 1], opacity: [0, 1] } : { scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center gap-2 py-2 text-green-500"
            >
              <ShieldOff className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-[10px] sm:text-xs font-medium">{t('screenshots.mockup.adblockHidden')}</span>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }
  
  if (type === 'css') {
    return (
      <div className={baseClasses + " bg-gray-900 p-3 sm:p-4 font-mono"}>
        <motion.div
          initial={false}
          animate={isActive ? { opacity: [0, 1] } : { opacity: 1 }}
          className="space-y-0.5 sm:space-y-1 text-[10px] sm:text-xs md:text-sm overflow-x-auto"
        >
          <div><span className="text-purple-400">.vk_feed</span> <span className="text-white">{'{'}</span></div>
          <div className="pl-3 sm:pl-4"><span className="text-cyan-400">background</span><span className="text-white">:</span> <span className="text-orange-400">#1a1a2e</span><span className="text-white">;</span></div>
          <div className="pl-3 sm:pl-4"><span className="text-cyan-400">border-radius</span><span className="text-white">:</span> <span className="text-green-400">16px</span><span className="text-white">;</span></div>
          <div className="pl-3 sm:pl-4"><span className="text-cyan-400">padding</span><span className="text-white">:</span> <span className="text-green-400">20px</span><span className="text-white">;</span></div>
          <div><span className="text-white">{'}'}</span></div>
          <div className="mt-1 sm:mt-2"><span className="text-purple-400">.post_header</span> <span className="text-white">{'{'}</span></div>
          <div className="pl-3 sm:pl-4"><span className="text-cyan-400">color</span><span className="text-white">:</span> <span className="text-orange-400">#fff</span><span className="text-white">;</span></div>
          <div><span className="text-white">{'}'}</span></div>
        </motion.div>
      </div>
    )
  }
  
  if (type === 'privacy') {
    // Показываем реальный диалог VK с заблокированными галочками
    return (
      <div className={baseClasses + " bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-2.5 sm:p-6 flex flex-col gap-2 sm:gap-3"}>
        {/* Заголовок диалога */}
        <motion.div
          initial={false}
          animate={isActive ? { opacity: [0, 1], y: [-8, 0] } : { opacity: 1, y: 0 }}
          className="flex items-center gap-2 sm:gap-2.5 bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1.5 sm:py-2.5 shadow-sm"
        >
          <div className="relative flex-shrink-0">
            <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-orange-400 to-red-500" />
            {/* Онлайн скрыт: зелёная точка статуса перечёркнута */}
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm">
              <div className="relative w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-500/60">
                <div className="absolute left-1/2 top-1/2 w-[150%] h-[1.5px] bg-gray-500 dark:bg-gray-300 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full" />
              </div>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">{t('screenshots.mockup.privacy.name')}</div>
            {/* Онлайн скрыт — показываем «был недавно» вместо зелёной точки */}
            <div className="text-[10px] sm:text-xs text-gray-400">{t('screenshots.mockup.privacy.seen')}</div>
          </div>
          <div className="flex items-center gap-1 bg-orange-100 dark:bg-orange-900/30 rounded-lg px-1.5 sm:px-2 py-1">
            <svg className="w-3 h-3 text-orange-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
              <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
            </svg>
            <span className="text-[9px] sm:text-[10px] font-semibold text-orange-600 dark:text-orange-400 whitespace-nowrap">{t('screenshots.mockup.privacy.onlineHidden')}</span>
          </div>
        </motion.div>

        {/* Сообщения */}
        <div className="flex-1 space-y-1.5 sm:space-y-2 min-h-0">
          {/* Входящее */}
          <motion.div
            initial={false}
            animate={isActive ? { opacity: [0, 1], x: [-12, 0] } : { opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex gap-1.5 sm:gap-2 items-end"
          >
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex-shrink-0" />
            <div className="bg-white dark:bg-gray-700 rounded-2xl rounded-bl-sm px-2.5 sm:px-3 py-1 sm:py-2 max-w-[70%]">
              <p className="text-[11px] sm:text-sm text-gray-800 dark:text-white">{t('screenshots.mockup.privacy.incoming')}</p>
            </div>
          </motion.div>

          {/* Исходящее — без галочек прочтения */}
          <motion.div
            initial={false}
            animate={isActive ? { opacity: [0, 1], x: [12, 0] } : { opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-end"
          >
            <div className="bg-[#0077ff] rounded-2xl rounded-br-sm px-2.5 sm:px-3 py-1 sm:py-2 max-w-[70%]">
              <p className="text-[11px] sm:text-sm text-white">{t('screenshots.mockup.privacy.outgoing')}</p>
              <div className="flex items-center justify-end gap-1 mt-0.5">
                <span className="text-[9px] text-blue-200">14:32</span>
                {/* Галочка одна (доставлено), но не синяя (прочтение скрыто) */}
                <svg className="w-3 h-3 text-blue-300" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Индикатор «не печатает» */}
          <motion.div
            initial={false}
            animate={isActive ? { opacity: [0, 1] } : { opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="flex items-center gap-2 ml-8"
          >
            <div className="flex gap-1">
              {[0,1,2].map(i => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600" />
              ))}
            </div>
            <span className="text-[10px] text-gray-400 line-through">{t('screenshots.mockup.privacy.typing')}</span>
            <span className="text-[10px] text-orange-400 font-medium">{t('screenshots.mockup.privacy.hidden')}</span>
          </motion.div>
        </div>

        {/* Плашка «что скрыто» */}
        <motion.div
          initial={false}
          animate={isActive ? { opacity: [0, 1], y: [8, 0] } : { opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="grid grid-cols-3 gap-1.5"
        >
          {[t('screenshots.mockup.privacy.read'), t('screenshots.mockup.privacy.typingLabel'), t('screenshots.mockup.privacy.online')].map((label) => (
            <div key={label} className="bg-orange-500/10 border border-orange-500/20 rounded-lg py-0.5 sm:py-1 px-1 flex items-center justify-center">
              <span className="text-[9px] sm:text-[10px] text-orange-600 dark:text-orange-400 font-semibold text-center leading-tight">{label} ✓</span>
            </div>
          ))}
        </motion.div>
      </div>
    )
  }

  if (type === 'media') {
    return <MediaMockup isActive={isActive} />
  }

  if (type === 'fonts') {
    return <FontsMockup isActive={isActive} />
  }

  return null
}

// Отдельный компонент — useState нельзя вызывать внутри условия
const FONTS = [
  { name: 'Roboto', family: '"Roboto", "Helvetica Neue", sans-serif' },
  { name: 'Georgia', family: 'Georgia, "Times New Roman", serif' },
  { name: 'Courier New', family: '"Courier New", Courier, monospace' },
  { name: 'Verdana', family: 'Verdana, Geneva, Tahoma, sans-serif' },
  { name: 'Palatino', family: 'Palatino, "Palatino Linotype", serif' },
]

function FontsMockup({ isActive }) {
  const { t } = useTranslation()
  const [activeFont, setActiveFont] = useState(0)
  const font = FONTS[activeFont]

  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex flex-col">
      {/* Превью шрифта — имитация VK поста */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFont}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex-1 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-2 sm:p-4 min-h-0"
        >
          <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2.5">
            <div className="w-5 h-5 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex-shrink-0" />
            <div className="min-w-0">
              <div className="text-[11px] sm:text-xs font-semibold text-gray-900 dark:text-white truncate" style={{ fontFamily: font.family }}>
                {t('screenshots.mockup.fonts.name')}
              </div>
              <div className="text-[9px] sm:text-[10px] text-gray-400">{t('screenshots.mockup.fonts.time')}</div>
            </div>
          </div>
          <p className="text-[11px] sm:text-sm text-gray-800 dark:text-gray-200 leading-snug line-clamp-2 sm:line-clamp-none" style={{ fontFamily: font.family }}>
            {t('screenshots.mockup.fonts.sample')}
          </p>
          <div className="hidden sm:inline-block sm:mt-1.5 bg-indigo-100 dark:bg-indigo-900/30 rounded px-1.5 py-0.5">
            <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-mono">{font.name}</span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Список шрифтов */}
      <div className="flex flex-col divide-y divide-gray-100 dark:divide-gray-700/50">
        {FONTS.map((f, i) => (
          <motion.button
            key={i}
            initial={false}
            animate={isActive ? { opacity: [0, 1], x: [-10, 0] } : { opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            onClick={() => setActiveFont(i)}
            className={`flex items-center justify-between px-2 sm:px-3 py-0.5 sm:py-2 text-left transition-colors
              ${i === activeFont ? 'bg-indigo-50 dark:bg-indigo-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-700/30'}`}
          >
            <span
              className={`text-[11px] sm:text-base ${i === activeFont ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-700 dark:text-gray-300'}`}
              style={{ fontFamily: f.family }}
            >
              {f.name}
            </span>
            {i === activeFont && (
              <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-indigo-500 flex items-center justify-center flex-shrink-0">
                <svg className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

function ThumbnailCard({ screenshot, isActive, onSelect }) {
  const Icon = screenshot.icon
  const { title, description } = useScreenshotText()(screenshot)

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      // Нативный tooltip — показывает полный текст для редких случаев,
      // когда line-clamp-2 всё-таки обрезает (~57+ символов на lg).
      title={`${title} — ${description}`}
      className={`
        relative w-full p-3 xl:p-4 rounded-xl xl:rounded-2xl text-left transition-all duration-150
        ${isActive
          ? 'bg-white dark:bg-gray-800 shadow-xl border-2 border-blue-500'
          : 'bg-gray-100 dark:bg-gray-800/50 border-2 border-transparent hover:bg-white dark:hover:bg-gray-800'
        }
      `}
    >
      <div className="flex items-start gap-3">
        <div className={`w-9 h-9 xl:w-10 xl:h-10 flex-shrink-0 rounded-lg xl:rounded-xl bg-gradient-to-br ${screenshot.color} flex items-center justify-center`}>
          <Icon className="w-4 h-4 xl:w-5 xl:h-5 text-white" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-semibold text-gray-900 dark:text-white text-xs xl:text-sm truncate">
            {title}
          </div>
          {/* line-clamp-2 — описание максимум 2 строки. min-h ≈ 2 строки
              фиксирует высоту всех 6 карточек, чтобы колонки не «прыгали»
              из-за коротких/длинных описаний (EN vs RU). */}
          <div className="text-[10px] xl:text-xs text-gray-500 dark:text-gray-400 leading-snug line-clamp-2 min-h-[2.5em]">
            {description}
          </div>
        </div>
      </div>
    </motion.button>
  )
}

// Рамка «браузер» с контентом мокапа. compact — мобильный вариант.
// Стрелки prev/next рендерятся снаружи родителем — здесь их нет.
function BrowserFrame({ screenshot, contentKey, compact, onZoom }) {
  const { t } = useTranslation()
  const { title, description } = useScreenshotText()(screenshot)
  const Icon = screenshot.icon
  const enter = compact
    ? { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 } }
    : { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 1.05 } }

  return (
    <div className={`relative overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 ${compact ? 'rounded-xl sm:rounded-2xl shadow-xl' : 'rounded-2xl shadow-2xl'}`}>
      {/* Browser header */}
      <div className={`flex items-center bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 ${compact ? 'px-3 py-2' : 'px-4 py-3'}`}>
        <div className={`flex gap-1.5 flex-shrink-0 ${compact ? 'w-12' : 'w-14'}`}>
          {['bg-red-500', 'bg-yellow-500', 'bg-green-500'].map(c => (
            <div key={c} className={`rounded-full ${c} ${compact ? 'w-2.5 h-2.5' : 'w-3 h-3'}`} />
          ))}
        </div>

        <div className="flex-1 flex justify-center">
          <div className={`flex items-center bg-white dark:bg-gray-900 text-gray-500 ${compact ? 'gap-1.5 px-3 py-1 rounded-md text-xs' : 'gap-2 px-4 py-1.5 rounded-lg text-sm'}`}>
            <div className={`rounded bg-green-500/20 flex items-center justify-center ${compact ? 'w-3 h-3' : 'w-4 h-4'}`}>
              <div className={`rounded-full bg-green-500 ${compact ? 'w-1.5 h-1.5' : 'w-2 h-2'}`} />
            </div>
            <span>vk.com</span>
          </div>
        </div>

        <div className={`flex-shrink-0 flex justify-end ${compact ? 'w-12' : 'w-14'}`}>
          <button
            onClick={onZoom}
            className={`hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${compact ? 'p-1 rounded-md' : 'p-1.5 rounded-lg'}`}
            aria-label={t('screenshots.openFullscreen')}
          >
            <ZoomIn className={`text-gray-500 ${compact ? 'w-3.5 h-3.5' : 'w-4 h-4'}`} />
          </button>
        </div>
      </div>

      {/* Screenshot content */}
      <div className="aspect-video relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div key={contentKey} {...enter} transition={{ duration: 0.3 }} className="absolute inset-0">
            <ScreenMockup type={screenshot.mockup} isActive={true} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Caption bar */}
      <div className={`bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 ${compact ? 'px-4 py-3' : 'px-6 py-4'}`}>
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className={`font-bold text-gray-900 dark:text-white ${compact ? 'text-sm' : ''}`}>
              {title}
            </h3>
            {/* truncate (1 строка) — чтобы caption-бар не менял высоту
                между скриншотами (длина описаний разная). Полный текст
                остаётся видимым на тумб-карточках сбоку. */}
            <p className={`text-gray-500 dark:text-gray-400 truncate ${compact ? 'text-xs' : 'text-sm'}`}>
              {description}
            </p>
          </div>
          <div className={`flex-shrink-0 bg-gradient-to-br ${screenshot.color} flex items-center justify-center ${compact ? 'w-8 h-8 rounded-lg' : 'w-10 h-10 rounded-xl'}`}>
            <Icon className={`text-white ${compact ? 'w-4 h-4' : 'w-5 h-5'}`} />
          </div>
        </div>
      </div>

    </div>
  )
}

// Индикатор-точки под превью. compact — мобильный вариант (без авто-прогресса).
function ProgressDots({ compact, currentIndex, isAutoPlaying, onSelect }) {
  const { t } = useTranslation()
  return (
    <div className={`flex justify-center ${compact ? 'gap-1.5 mt-4' : 'gap-2 mt-6'}`}>
      {screenshots.map((_, index) => {
        const active = index === currentIndex
        return (
          <button
            key={index}
            onClick={() => onSelect(index)}
            className={`relative rounded-full overflow-hidden transition-all duration-150 ${compact ? 'h-1.5' : 'h-2'}`}
            style={{ width: active ? (compact ? 24 : 32) : (compact ? 6 : 8) }}
            aria-label={t('screenshots.goTo', { n: index + 1 })}
          >
            <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700" />
            {active && !compact && isAutoPlaying && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 5, ease: 'linear' }}
                className="absolute inset-0 bg-blue-500 origin-left"
              />
            )}
            {active && (compact || !isAutoPlaying) && (
              <div className="absolute inset-0 bg-blue-500" />
            )}
          </button>
        )
      })}
    </div>
  )
}

export default function Screenshots() {
  const { t } = useTranslation()
  const getText = useScreenshotText()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [touchStart, setTouchStart] = useState(null)

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % screenshots.length)
  }, [])

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length)
  }, [])

  useEffect(() => {
    if (!isAutoPlaying || isLightboxOpen) return
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [isAutoPlaying, isLightboxOpen, next])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'Escape') setIsLightboxOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [next, prev])

  useEffect(() => {
    document.body.style.overflow = isLightboxOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isLightboxOpen])

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchEnd = (e) => {
    if (!touchStart) return
    const touchEnd = e.changedTouches[0].clientX
    const diff = touchStart - touchEnd

    if (Math.abs(diff) > 50) {
      if (diff > 0) next()
      else prev()
      setIsAutoPlaying(false)
    }
    setTouchStart(null)
  }

  const currentScreenshot = screenshots[currentIndex]

  const selectScreenshot = useCallback((index) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }, [])

  return (
    <Section id="screenshots" variant="default">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            {t('screenshots.titleTop')}{' '}
            <span className="bg-gradient-to-r from-[#0077ff] to-cyan-400 bg-clip-text text-transparent">
              {t('screenshots.titleAccent')}
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('screenshots.subtitle')}
          </p>
        </motion.div>

        {/* Единый компактный layout на всех размерах — рамка превью +
            точки + горизонтальный ряд миниатюр. Раньше был отдельный
            десктоп-вариант с колонками тумбов по бокам, но он плохо
            масштабировался (прыгающая высота, центрирование, стрелки
            наружу). Компактный вариант проще и стабильнее. */}
        <div
          className="max-w-3xl mx-auto"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {/* Glow effect */}
            <div className={`absolute -inset-2 bg-gradient-to-r ${currentScreenshot.color} opacity-20 blur-2xl rounded-2xl transition-all duration-500`} />

            <BrowserFrame
              compact
              screenshot={currentScreenshot}
              contentKey={currentIndex}
              onZoom={() => setIsLightboxOpen(true)}
            />

            {/* Стрелки prev/next — только на ПК, снаружи рамки превью
                (right-full/left-full ставит границу кнопки на край рамки,
                mr/ml — отступ наружу). На тач-устройствах их нет — свайпы. */}
            <button
              onClick={prev}
              className="hidden lg:flex absolute right-full mr-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:text-blue-500 hover:scale-110 transition-all"
              aria-label={t('screenshots.prev')}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="hidden lg:flex absolute left-full ml-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:text-blue-500 hover:scale-110 transition-all"
              aria-label={t('screenshots.next')}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>

          <ProgressDots
            compact
            currentIndex={currentIndex}
            isAutoPlaying={isAutoPlaying}
            onSelect={selectScreenshot}
          />

          {/* Подсказка свайпа — только на тач-устройствах */}
          <p className="lg:hidden text-center text-xs text-gray-400 mt-2">
            {t('screenshots.swipeHint')}
          </p>

          {/* Mobile thumbnails */}
          <div className="flex justify-center gap-2 mt-4 overflow-x-auto pb-2 pt-2">
            {screenshots.map((screenshot, index) => {
              const Icon = screenshot.icon
              return (
                <button
                  key={screenshot.id}
                  onClick={() => selectScreenshot(index)}
                  className={`
                    flex-shrink-0 p-2.5 rounded-lg transition-all
                    ${index === currentIndex 
                      ? 'bg-white dark:bg-gray-800 shadow-lg ring-2 ring-blue-500' 
                      : 'bg-gray-100 dark:bg-gray-800/50'
                    }
                  `}
                  aria-label={getText(screenshot).title}
                >
                  <div className={`w-7 h-7 rounded-md bg-gradient-to-br ${screenshot.color} flex items-center justify-center`}>
                    <Icon className="w-3.5 h-3.5 text-white" />
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4"
            onClick={() => setIsLightboxOpen(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Close button */}
            <button
              className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
              onClick={() => setIsLightboxOpen(false)}
              aria-label={t('screenshots.close')}
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>

            {/* Content */}
            <div className="flex flex-col items-center justify-center w-full max-w-5xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="w-full rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="aspect-video">
                  <ScreenMockup type={currentScreenshot.mockup} isActive={true} />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mt-4 sm:mt-6 text-center px-4"
              >
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2">
                  {getText(currentScreenshot).title}
                </h3>
                <p className="text-white/60 text-sm sm:text-base max-w-md">
                  {getText(currentScreenshot).description}
                </p>
              </motion.div>

              {/* Dots */}
              <div className="flex justify-center gap-2 mt-4 sm:mt-6">
                {screenshots.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => { 
                      e.stopPropagation()
                      setCurrentIndex(index)
                    }}
                    className={`h-2 rounded-full transition-all ${
                      index === currentIndex 
                        ? 'bg-white w-6' 
                        : 'bg-white/30 hover:bg-white/50 w-2'
                    }`}
                    aria-label={t('screenshots.goTo', { n: index + 1 })}
                  />
                ))}
              </div>
            </div>

            {/* Navigation arrows */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="hidden sm:block absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label={t('screenshots.prev')}
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="hidden sm:block absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label={t('screenshots.next')}
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  )
}