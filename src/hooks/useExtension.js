/**
 * useExtension — React-хук для общения с расширением VKify через postMessage.
 *
 * Протокол (реализован в site-bridge.ts):
 *   Сайт → расширение:  VKIFY_GET_SETTINGS    {}
 *   Сайт → расширение:  VKIFY_SAVE_SETTINGS   { settings }
 *   Расширение → сайт:  VKIFY_EXTENSION_READY { version, settings }
 *   Расширение → сайт:  VKIFY_SETTINGS_SAVED  { settings }
 *
 * Возвращает:
 *   detected    — расширение найдено (null = ещё определяем, false = нет, true = есть)
 *   version     — строка вида "1.2.0" или null
 *   settings    — объект с настройками из chrome.storage или {}
 *   saveSettings(partial) — отправляет VKIFY_SAVE_SETTINGS и оптимистично
 *                           обновляет локальный стейт
 */
import { useState, useEffect, useCallback, useRef } from 'react'

const DETECT_TIMEOUT_MS = 2000

export function useExtension() {
  const [detected, setDetected]   = useState(null)   // null | false | true
  const [version, setVersion]     = useState(null)
  const [settings, setSettings]   = useState({})
  const timerRef                  = useRef(null)

  useEffect(() => {
    function onMessage(event) {
      if (event.source !== window) return
      const { type, version: ver, settings: s } = event.data ?? {}
      if (!type?.startsWith('VKIFY_')) return

      if (type === 'VKIFY_EXTENSION_READY') {
        clearTimeout(timerRef.current)
        setDetected(true)
        if (ver)  setVersion(ver)
        if (s)    setSettings(prev => ({ ...prev, ...s }))
      }

      if (type === 'VKIFY_SETTINGS_SAVED') {
        if (s) setSettings(prev => ({ ...prev, ...s }))
      }
    }

    window.addEventListener('message', onMessage)

    // Запрашиваем настройки; если через DETECT_TIMEOUT_MS ответа нет — расширения нет
    window.postMessage({ type: 'VKIFY_GET_SETTINGS' }, '*')
    timerRef.current = setTimeout(() => setDetected(false), DETECT_TIMEOUT_MS)

    return () => {
      window.removeEventListener('message', onMessage)
      clearTimeout(timerRef.current)
    }
  }, [])

  const saveSettings = useCallback((partial) => {
    // Оптимистичное обновление
    setSettings(prev => ({ ...prev, ...partial }))
    window.postMessage({ type: 'VKIFY_SAVE_SETTINGS', settings: partial }, '*')
  }, [])

  return { detected, version, settings, saveSettings }
}