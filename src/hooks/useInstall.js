import { useEffect, useState } from 'react'
import config from '../config'

// Определяем браузер по userAgent. На сервере/пре-рендере — 'chrome'
// (нейтральный дефолт, гидрация уточнит на клиенте).
export function detectBrowser() {
  if (typeof navigator === 'undefined') return 'chrome'
  const ua = navigator.userAgent
  if (/firefox|fxios/i.test(ua)) return 'firefox'
  if (/edg\//i.test(ua)) return 'edge'
  if (/opr\/|opera/i.test(ua)) return 'opera'
  return 'chrome'
}

// Куда ведёт установка для конкретного браузера.
// Firefox → Firefox Add-ons; Chrome / Edge / Opera и любой Chromium →
// Chrome Web Store (расширение из него ставится во все Chromium-браузеры).
export function installTargetFor(browser) {
  if (browser === 'firefox') {
    return { store: 'firefox', href: config.links.firefoxAddons, logo: 'firefox' }
  }
  return { store: 'chrome', href: config.links.chromeWebStore, logo: 'chrome' }
}

// Все варианты установки — для выпадающего меню.
export const INSTALL_OPTIONS = [
  { id: 'chrome', store: 'Chrome Web Store', get href() { return config.links.chromeWebStore } },
  { id: 'firefox', store: 'Firefox Add-ons', get href() { return config.links.firefoxAddons } },
]

export function useInstall() {
  const [browser, setBrowser] = useState('chrome')
  useEffect(() => { setBrowser(detectBrowser()) }, [])
  return { browser, ...installTargetFor(browser) }
}
