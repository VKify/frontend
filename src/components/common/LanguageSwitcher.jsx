import { useTranslation } from '../../i18n'

/**
 * Переключатель языка. Рендерит сегменты по всем поддерживаемым языкам,
 * поэтому при добавлении нового языка в i18n ничего здесь менять не нужно.
 */
export default function LanguageSwitcher({ className = '' }) {
  const { lang, setLang, supported } = useTranslation()

  return (
    <div
      className={`inline-flex items-center rounded-lg bg-tertiary p-0.5 ${className}`}
      role="group"
      aria-label="Language"
    >
      {supported.map((code) => {
        const active = code === lang
        return (
          <button
            key={code}
            onClick={() => setLang(code)}
            aria-pressed={active}
            className={`px-2 py-1 text-xs font-bold rounded-md transition-colors ${
              active
                ? 'bg-[#0077ff] text-white shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            {code.toUpperCase()}
          </button>
        )
      })}
    </div>
  )
}
