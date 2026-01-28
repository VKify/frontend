import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const prevPathname = useRef(pathname)

  useEffect(() => {
    // Не скроллим если есть hash - HashLink обработает сам
    if (hash) return

    // Скроллим только при реальной смене страницы
    if (prevPathname.current !== pathname) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      prevPathname.current = pathname
    }
  }, [pathname, hash])

  return null
}