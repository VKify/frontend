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
 *   saveSettings(partial) — отправляет VKIFY_SAVE_SETTINGS и возвращает Promise<boolean>
 *                           после подтверждения записи или ошибки/таймаута
 */
import { useState, useEffect, useCallback, useRef } from 'react'

const DETECT_TIMEOUT_MS = 2000

export function useExtension() {
  const [detected, setDetected]   = useState(null)   // null | false | true
  const [version, setVersion]     = useState(null)
  const [settings, setSettings]   = useState({})
  const timerRef                  = useRef(null)
  const pendingRef                = useRef(new Map())

  useEffect(() => {
    function onMessage(event) {
      if (event.source !== window || event.origin !== window.location.origin) return
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
      if (type === 'VKIFY_SETTINGS_SAVED' || type === 'VKIFY_SETTINGS_ERROR') {
        // Older extension versions acknowledge without a request ID.
        const id = event.data.requestId ?? pendingRef.current.keys().next().value
        const pending = pendingRef.current.get(id)
        if (pending) {
          clearTimeout(pending.timer)
          pendingRef.current.delete(id)
          pending.resolve(type === 'VKIFY_SETTINGS_SAVED')
        }
      }
    }

    window.addEventListener('message', onMessage)

    // Запрашиваем настройки; если через DETECT_TIMEOUT_MS ответа нет — расширения нет
    window.postMessage({ type: 'VKIFY_GET_SETTINGS' }, '*')
    timerRef.current = setTimeout(() => setDetected(false), DETECT_TIMEOUT_MS)

    return () => {
      window.removeEventListener('message', onMessage)
      clearTimeout(timerRef.current)
      for (const pending of pendingRef.current.values()) {
        clearTimeout(pending.timer)
        pending.resolve(false)
      }
      pendingRef.current.clear()
    }
  }, [])

  const saveSettings = useCallback((partial) => {
    return new Promise(resolve => {
      const requestId = crypto.randomUUID()
      const timer = setTimeout(() => {
        pendingRef.current.delete(requestId)
        resolve(false)
      }, 15000)
      pendingRef.current.set(requestId, { resolve, timer })
      window.postMessage({ type: 'VKIFY_SAVE_SETTINGS', settings: partial, requestId }, window.location.origin)
    })
  }, [])

  return { detected, version, settings, saveSettings }
}
