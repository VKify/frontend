import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, Check, ChevronDown } from 'lucide-react'
import { useTranslation, LANG_NAMES } from '../../i18n'

/**
 * Переключатель языка — выпадающий список. Рендерит все поддерживаемые языки
 * с их самоназваниями, поэтому при добавлении языка менять здесь ничего не нужно.
 */
export default function LanguageSwitcher({ className = '' }) {
  const { lang, setLang, supported } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg bg-tertiary hover:bg-primary/10 text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors"
      >
        <Globe className="w-4 h-4" />
        <span className="uppercase">{lang}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            role="listbox"
            className="absolute right-0 mt-2 min-w-[160px] py-1 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl z-50"
          >
            {supported.map((code) => {
              const active = code === lang
              return (
                <li key={code}>
                  <button
                    onClick={() => { setLang(code); setOpen(false) }}
                    role="option"
                    aria-selected={active}
                    className={`w-full flex items-center justify-between gap-3 px-3 py-2 text-sm transition-colors ${
                      active
                        ? 'text-[#0077ff] font-semibold'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-xs font-mono uppercase text-gray-400 w-5">{code}</span>
                      {LANG_NAMES[code]}
                    </span>
                    {active && <Check className="w-4 h-4 shrink-0" />}
                  </button>
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
