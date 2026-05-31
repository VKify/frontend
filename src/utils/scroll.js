// Константы
const HEADER_HEIGHT = 80
const SCROLL_THRESHOLD = 50

/**
 * Фактическая высота навбара. Меряется вживую по элементу <nav> внутри
 * <header>, поэтому корректна и на мобиле (h-16 = 64px), и на десктопе
 * (h-20 = 80px). Баннер «Вышла версия…» — отдельный элемент НАД <nav> и
 * при любом скролле схлопывается, поэтому в офсет не попадает: секция
 * прилегает к навбару вплотную в обоих состояниях баннера.
 * Фолбэк (SSR / нет хедера) — HEADER_HEIGHT.
 */
function getHeaderOffset() {
  if (typeof document === 'undefined') return HEADER_HEIGHT
  const nav = document.querySelector('header nav')
  return nav ? Math.round(nav.getBoundingClientRect().height) : HEADER_HEIGHT
}

/**
 * Плавно скроллит к DOM-элементу с учётом фиксированного хедера.
 *
 * Если страница в самом верху (виден AnnouncementBar) — сначала мгновенно
 * уходим за порог, чтобы бар схлопнулся, и пересчитываем позицию уже после
 * перерасчёта layout (двойной requestAnimationFrame).
 *
 * @param {HTMLElement|null} element - целевой элемент
 * @param {number} offset - отступ сверху
 */
function smoothScrollToElement(element, offset) {
  if (!element) return

  const scrollToTarget = () => {
    const elementTop = element.getBoundingClientRect().top + window.scrollY
    const targetPosition = Math.max(0, elementTop - offset)
    window.scrollTo({ top: targetPosition, behavior: 'smooth' })
  }

  if (window.scrollY < SCROLL_THRESHOLD) {
    // Мгновенно проскроллим за порог, чтобы AnnouncementBar исчез,
    // затем дождёмся перерасчёта layout перед плавным скроллом.
    window.scrollTo({ top: SCROLL_THRESHOLD + 1, behavior: 'instant' })
    requestAnimationFrame(() => requestAnimationFrame(scrollToTarget))
  } else {
    scrollToTarget()
  }
}

/**
 * Плавный скролл к элементу по id с учётом отступа для фиксированного хедера.
 * @param {string} elementId - ID элемента для скролла
 * @param {number} offset - отступ сверху (по умолчанию высота хедера + 20px)
 */
export function scrollToElement(elementId, offset = getHeaderOffset()) {
  smoothScrollToElement(document.getElementById(elementId), offset)
}

/**
 * scroll-prop для react-router-hash-link.
 * Используется как: <HashLink scroll={scrollWithOffset} />
 * @param {HTMLElement} el - DOM элемент
 */
export function scrollWithOffset(el) {
  smoothScrollToElement(el, getHeaderOffset())
}

/**
 * Плавный скролл в самый верх страницы.
 *
 * Тонкость: когда позиция уходит ниже SCROLL_THRESHOLD (50px), в шапке
 * раскрывается баннер «Вышла версия…» — это асинхронно (framer-motion
 * height 0 → auto) и добавляет ~40px к layout уже ПОСЛЕ того, как
 * плавная прокрутка завершилась. В итоге scrollY оставался положительным
 * на высоту баннера.
 *
 * Решение: после scrollend в течение ~1 секунды принудительно дотягиваем
 * позицию до 0 на каждом кадре — это покрывает анимацию появления баннера
 * и любой другой layout-shift (загрузка изображений, lazy-секции).
 */
const SETTLE_WINDOW_MS = 1000

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })

  const settle = () => {
    const start = Date.now()
    const tick = () => {
      if (Date.now() - start > SETTLE_WINDOW_MS) return
      if (window.scrollY !== 0) window.scrollTo({ top: 0 })
      requestAnimationFrame(tick)
    }
    tick()
  }

  if ('onscrollend' in window) {
    window.addEventListener('scrollend', settle, { once: true })
  } else {
    // Фолбэк для движков без scrollend (старые Safari) — даём smooth-анимации
    // время завершиться, затем включаем окно дотягивания.
    setTimeout(settle, 600)
  }
}

/**
 * Получить текущую активную секцию из списка
 * @param {string[]} sectionIds - массив ID секций
 * @param {number} offset - отступ для расчёта
 * @returns {string|null}
 */
export function getActiveSection(sectionIds, offset = 150) {
  const scrollPosition = window.scrollY + offset

  for (let i = sectionIds.length - 1; i >= 0; i--) {
    const element = document.getElementById(sectionIds[i])
    if (element && scrollPosition >= element.offsetTop) {
      return sectionIds[i]
    }
  }

  return null
}
