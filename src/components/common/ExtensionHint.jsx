/**
 * ExtensionHint — синяя плашка-подсказка на детальных страницах:
 *   • расширение подключено  → connectedTail (после «Расширение подключено.»)
 *   • расширение не найдено   → disconnectedText
 */
import { useTranslation } from '../../i18n'

export default function ExtensionHint({ detected, connectedTail, disconnectedText }) {
  const { t } = useTranslation()
  return (
    <div className="p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 rounded-2xl">
      <p className="text-xs text-blue-700 dark:text-blue-400 leading-relaxed">
        {detected ? (
          <>
            <strong>{t('detail.extensionConnected')}</strong> {connectedTail}
          </>
        ) : (
          disconnectedText
        )}
      </p>
    </div>
  )
}
