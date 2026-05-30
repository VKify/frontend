/**
 * useCopyToClipboard — копирование текста в буфер с авто-сбросом флага «скопировано».
 *
 * Каждый вызов хука — независимое состояние, поэтому на странице с несколькими
 * кнопками копирования просто вызывайте хук несколько раз.
 *
 *   const link = useCopyToClipboard()
 *   <button onClick={() => link.copy(url)}>{link.copied ? '✓' : 'Копировать'}</button>
 */
import { useState, useRef, useCallback, useEffect } from 'react'

export function useCopyToClipboard(resetMs = 2000) {
  const [copied, setCopied] = useState(false)
  const timerRef = useRef(null)

  const copy = useCallback((text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => setCopied(false), resetMs)
    })
  }, [resetMs])

  useEffect(() => () => clearTimeout(timerRef.current), [])

  return { copied, copy }
}
