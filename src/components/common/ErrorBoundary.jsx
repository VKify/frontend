import { Component } from 'react'

// ErrorBoundary — последний рубеж: показывается даже если рухнул i18n-контекст,
// поэтому тексты не берутся из useTranslation, а выбираются по сохранённому
// языку напрямую (с фолбэком на RU).
const FALLBACK_TEXTS = {
  ru: {
    title: 'Что-то пошло не так',
    text: 'Произошла непредвиденная ошибка. Попробуйте обновить страницу.',
    button: 'Обновить страницу',
  },
  en: {
    title: 'Something went wrong',
    text: 'An unexpected error occurred. Please try refreshing the page.',
    button: 'Refresh page',
  },
}

function pickLang() {
  try {
    const saved = localStorage.getItem('vkify-lang')
    if (saved && FALLBACK_TEXTS[saved]) return saved
  } catch { /* localStorage недоступен */ }
  if (typeof document !== 'undefined') {
    const html = document.documentElement.lang
    if (html && FALLBACK_TEXTS[html]) return html
  }
  return 'ru'
}

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('[VKify] Runtime error:', error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      const txt = FALLBACK_TEXTS[pickLang()] ?? FALLBACK_TEXTS.ru
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-950 px-4">
          <p className="text-5xl mb-4">⚠️</p>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">
            {txt.title}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-center mb-6 max-w-sm">
            {txt.text}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-[#0077ff] hover:bg-blue-500 text-white font-semibold rounded-2xl transition-colors"
          >
            {txt.button}
          </button>
        </div>
      )
    }
    return this.props.children
  }
}