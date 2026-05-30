/**
 * useApplyToVK — общая логика детальных страниц темы/обоев:
 *   • определяет наличие расширения (через useExtension)
 *   • применяет настройки, если расширение есть, иначе показывает InstallModal
 *   • держит флаг «применено» с авто-сбросом и состояние модалки установки
 *
 *   const { detected, applied, apply, showInstallModal, closeInstallModal } = useApplyToVK()
 *   <button onClick={() => apply(config)}>{applied ? 'Применено!' : 'Применить'}</button>
 *   {showInstallModal && <InstallModal onClose={closeInstallModal} />}
 */
import { useState, useEffect, useRef, useCallback } from 'react'
import { useExtension } from './useExtension'

export function useApplyToVK(appliedMs = 3000) {
  const { detected, saveSettings } = useExtension()
  const [applied, setApplied] = useState(false)
  const [showInstallModal, setShowInstallModal] = useState(false)
  const timerRef = useRef(null)

  // Если расширение точно не найдено — сразу предлагаем установку.
  useEffect(() => {
    if (detected === false) setShowInstallModal(true)
  }, [detected])

  useEffect(() => () => clearTimeout(timerRef.current), [])

  const apply = useCallback((settings) => {
    if (!settings) return
    if (detected) {
      saveSettings(settings)
      setApplied(true)
      clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => setApplied(false), appliedMs)
    } else {
      setShowInstallModal(true)
    }
  }, [detected, saveSettings, appliedMs])

  const closeInstallModal = useCallback(() => setShowInstallModal(false), [])

  return { detected, applied, apply, showInstallModal, closeInstallModal }
}
