// Константы
const HEADER_HEIGHT = 80
const SCROLL_THRESHOLD = 50

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
export function scrollToElement(elementId, offset = HEADER_HEIGHT + 20) {
  smoothScrollToElement(document.getElementById(elementId), offset)
}

/**
 * scroll-prop для react-router-hash-link.
 * Используется как: <HashLink scroll={scrollWithOffset} />
 * @param {HTMLElement} el - DOM элемент
 */
export function scrollWithOffset(el) {
  smoothScrollToElement(el, HEADER_HEIGHT + 20)
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
