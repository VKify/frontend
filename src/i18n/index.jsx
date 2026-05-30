/**
 * Лёгкая i18n без зависимостей.
 *
 * Использование:
 *   const { t, lang, setLang } = useTranslation()
 *   t('hero.subtitle', { features: '50+' })   // строка с интерполяцией {features}
 *   t('features.cards.appearance.details')      // может вернуть массив/объект как есть
 *
 * Добавить язык: создайте locales/<code>.js, зарегистрируйте в DICTS и SUPPORTED.
 * Недостающий ключ берётся из языка по умолчанию (ru), затем — сам ключ.
 */
import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'
import { ru } from './locales/ru'
import { en } from './locales/en'

const DICTS = { ru, en }
export const SUPPORTED_LANGS = ['ru', 'en']
export const DEFAULT_LANG = 'ru'
const STORAGE_KEY = 'vkify-lang'

const I18nContext = createContext(null)

function detectInitialLang() {
  if (typeof window === 'undefined') return DEFAULT_LANG
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved && SUPPORTED_LANGS.includes(saved)) return saved
  } catch { /* localStorage недоступен */ }
  const nav = (navigator.language || '').slice(0, 2).toLowerCase()
  return SUPPORTED_LANGS.includes(nav) ? nav : DEFAULT_LANG
}

function lookup(dict, key) {
  return key.split('.').reduce((acc, k) => (acc == null ? undefined : acc[k]), dict)
}

function interpolate(str, vars) {
  if (!vars) return str
  return str.replace(/\{(\w+)\}/g, (_, k) => (vars[k] != null ? String(vars[k]) : `{${k}}`))
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(detectInitialLang)

  useEffect(() => {
    if (typeof document !== 'undefined') document.documentElement.lang = lang
    try { localStorage.setItem(STORAGE_KEY, lang) } catch { /* noop */ }
  }, [lang])

  const setLang = useCallback((next) => {
    if (SUPPORTED_LANGS.includes(next)) setLangState(next)
  }, [])

  const t = useCallback((key, vars) => {
    let val = lookup(DICTS[lang], key)
    if (val === undefined) val = lookup(DICTS[DEFAULT_LANG], key)
    if (val === undefined) {
      if (import.meta.env?.DEV) console.warn('[i18n] missing key:', key)
      return key
    }
    if (typeof val === 'string') return interpolate(val, vars)
    // Интерполируем строки и внутри массивов (списки фич, буллеты шагов)
    if (Array.isArray(val)) return val.map(v => (typeof v === 'string' ? interpolate(v, vars) : v))
    return val
  }, [lang])

  const value = useMemo(() => ({ lang, setLang, t, supported: SUPPORTED_LANGS }), [lang, setLang, t])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useTranslation() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useTranslation must be used within LanguageProvider')
  return ctx
}
