import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { config } from '../../config'

const { googleAnalytics: GA_ID, yandexMetrika: YM_ID } = config.analytics

export default function Analytics() {
  const location = useLocation()

  // Инициализация скриптов при первой загрузке
  useEffect(() => {
    // Проверяем, что ID указаны
    if (!GA_ID && !YM_ID) return

    // Google Analytics 4
    if (GA_ID && GA_ID !== 'G-XXXXXXXXXX') {
      const gaScript = document.createElement('script')
      gaScript.async = true
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
      document.head.appendChild(gaScript)

      const gaInlineScript = document.createElement('script')
      gaInlineScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_ID}', { send_page_view: false });
      `
      document.head.appendChild(gaInlineScript)
    }

    // Яндекс.Метрика
    if (YM_ID && YM_ID !== 12345678) {
      const ymScript = document.createElement('script')
      ymScript.innerHTML = `
        (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
        (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
        ym(${YM_ID}, "init", {
          clickmap:true,
          trackLinks:true,
          accurateTrackBounce:true,
          webvisor:true
        });
      `
      document.head.appendChild(ymScript)

      // Noscript для Яндекс.Метрики
      const noscript = document.createElement('noscript')
      noscript.innerHTML = `<div><img src="https://mc.yandex.ru/watch/${YM_ID}" style="position:absolute; left:-9999px;" alt="" /></div>`
      document.body.appendChild(noscript)
    }
  }, [])

  // Отслеживание переходов между страницами
  useEffect(() => {
    const url = location.pathname + location.search

    // Google Analytics
    if (window.gtag && GA_ID) {
      window.gtag('config', GA_ID, {
        page_path: url,
      })
    }

    // Яндекс.Метрика
    if (window.ym && YM_ID) {
      window.ym(YM_ID, 'hit', url)
    }
  }, [location])

  return null
}