// Реальные многоцветные логотипы браузеров.
// SVG лежат в /public/browsers как самостоятельные документы — поэтому
// одинаковые id градиентов внутри них не конфликтуют между собой
// (в отличие от инлайна нескольких SVG в один DOM).

const sources = {
  chrome: '/browsers/chrome.svg',
  firefox: '/browsers/firefox.svg',
  edge: '/browsers/edge.svg',
  opera: '/browsers/opera.svg',
}

const labels = {
  chrome: 'Google Chrome',
  firefox: 'Mozilla Firefox',
  edge: 'Microsoft Edge',
  opera: 'Opera',
}

export default function BrowserLogo({ name, className = 'w-4 h-4' }) {
  const src = sources[name]
  if (!src) return null
  return (
    <img
      src={src}
      alt={labels[name] || name}
      className={className}
      loading="lazy"
      draggable={false}
    />
  )
}
