import { useState, useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ExternalLink, Check } from 'lucide-react'
import { useTranslation } from '../../i18n'
import { useInstall, INSTALL_OPTIONS } from '../../hooks/useInstall'
import BrowserLogo from './BrowserLogo'
import { browserIcons } from './BrowserIcons'

// Размеры зеркалят Button, чтобы сплит-кнопка совпадала с обычными по высоте.
const sizes = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-5 py-2.5 text-base gap-2',
  lg: 'px-7 py-3.5 text-base gap-2',
}
const caretSizes = { sm: 'px-2', md: 'px-2.5', lg: 'px-3' }
const logoSizes = { sm: 'w-4 h-4', md: 'w-5 h-5', lg: 'w-5 h-5' }

const MENU_WIDTH = 288 // соответствует прежнему w-72

// Сплит-кнопка установки: основное действие ведёт в магазин ТЕКУЩЕГО
// браузера пользователя (Firefox → Firefox Add-ons, остальные → Chrome
// Web Store), а стрелка открывает меню со всеми вариантами установки.
//
// Меню рендерится через портал в <body> с position:fixed — иначе секции
// с overflow:hidden (Hero, HowItWorks) обрезают выпадающий список.
export default function InstallButton({
  size = 'md',
  className = '',
  label,
  block = false,
  dropUp = false,
}) {
  const { t } = useTranslation()
  const { browser, href, logo } = useInstall()
  const [open, setOpen] = useState(false)
  const [coords, setCoords] = useState(null)
  const ref = useRef(null)
  const menuRef = useRef(null)

  const MainLogo = browserIcons[logo] || browserIcons.chrome
  const mainLabel = label || t('common.install')

  const updateCoords = useCallback(() => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const width = block ? r.width : MENU_WIDTH
    let left = block ? r.left : r.right - width
    left = Math.max(8, Math.min(left, window.innerWidth - width - 8))
    const next = { left, width }
    // Авто-флип вверх, если снизу не хватает места (а сверху — есть)
    const MENU_EST_H = 240
    const openUp = dropUp || (r.bottom + MENU_EST_H > window.innerHeight && r.top > MENU_EST_H)
    if (openUp) next.bottom = window.innerHeight - r.top + 8
    else next.top = r.bottom + 8
    setCoords(next)
  }, [block, dropUp])

  useEffect(() => {
    if (!open) return
    updateCoords()
    const onDoc = (e) => {
      if (ref.current?.contains(e.target)) return
      if (menuRef.current?.contains(e.target)) return
      setOpen(false)
    }
    const onEsc = (e) => { if (e.key === 'Escape') setOpen(false) }
    const onReflow = () => updateCoords()
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onEsc)
    window.addEventListener('scroll', onReflow, true)
    window.addEventListener('resize', onReflow)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onEsc)
      window.removeEventListener('scroll', onReflow, true)
      window.removeEventListener('resize', onReflow)
    }
  }, [open, updateCoords])

  const menu = typeof document !== 'undefined'
    ? createPortal(
        <AnimatePresence>
          {open && coords && (
            <motion.div
              ref={menuRef}
              role="menu"
              initial={{ opacity: 0, y: dropUp ? -8 : 8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: dropUp ? -8 : 8, scale: 0.97 }}
              transition={{ duration: 0.15 }}
              style={{
                position: 'fixed',
                left: coords.left,
                width: coords.width,
                top: coords.top,
                bottom: coords.bottom,
                zIndex: 60,
              }}
              className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-2xl p-2"
            >
              <div className="space-y-1">
                {INSTALL_OPTIONS.map((opt) => {
                  const isCurrent = browser === opt.id
                  return (
                    <a
                      key={opt.id}
                      href={opt.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      role="menuitem"
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                        isCurrent ? 'bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      <BrowserLogo name={opt.id} className="w-6 h-6 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            {t(`install.for.${opt.id}`)}
                          </span>
                          {isCurrent && <Check className="w-3.5 h-3.5 text-[#0077ff] flex-shrink-0" />}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{opt.store}</div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    </a>
                  )
                })}
              </div>
              <p className="px-3 pt-2 pb-1 mt-2 text-[11px] leading-snug text-gray-400 dark:text-gray-500 border-t border-gray-100 dark:border-gray-800">
                {t('install.chromiumHint')}
              </p>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )
    : null

  return (
    <div ref={ref} className={`relative inline-flex ${block ? 'w-full' : ''} ${className}`}>
      <div className="flex w-full rounded-xl shadow-lg shadow-blue-500/25 overflow-hidden">
        {/* flex-auto (а не flex-1) — основа = контент, поэтому при ширине
            «auto» кнопка не схлопывается, а при w-full тянется во всю ширину. */}
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex-auto inline-flex items-center justify-center font-semibold bg-[#0077ff] hover:bg-[#0066dd] text-white transition-colors focus:outline-none ${sizes[size]}`}
        >
          <MainLogo className={logoSizes[size]} />
          <span className="whitespace-nowrap">{mainLabel}</span>
        </a>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={t('install.chooseBrowser')}
          aria-expanded={open}
          aria-haspopup="menu"
          className={`flex-none flex items-center bg-[#0077ff] hover:bg-[#0066dd] text-white border-l border-white/25 transition-colors focus:outline-none ${caretSizes[size]}`}
        >
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {menu}
    </div>
  )
}
