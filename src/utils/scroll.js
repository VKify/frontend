// Константы
const HEADER_HEIGHT = 80
const SCROLL_THRESHOLD = 50

/**
 * Плавный скролл к элементу с учётом отступа для фиксированного хедера
 * @param {string} elementId - ID элемента для скролла
 * @param {number} offset - отступ сверху (по умолчанию высота хедера + 20px)
 */
export function scrollToElement(elementId, offset = HEADER_HEIGHT + 20) {
  const element = document.getElementById(elementId)
  if (!element) return

  // Если мы в начале страницы, где виден AnnouncementBar
  if (window.scrollY < SCROLL_THRESHOLD) {
    // Мгновенно проскроллим за порог, чтобы AnnouncementBar исчез
    window.scrollTo({ top: SCROLL_THRESHOLD + 1, behavior: 'instant' })
    
    // Небольшая задержка для перерасчёта layout после исчезновения AnnouncementBar
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const elementTop = element.getBoundingClientRect().top + window.scrollY
        const targetPosition = Math.max(0, elementTop - offset)
        
        window.scrollTo({ 
          top: targetPosition, 
          behavior: 'smooth' 
        })
      })
    })
  } else {
    // Обычный плавный скролл
    const elementTop = element.getBoundingClientRect().top + window.scrollY
    const targetPosition = Math.max(0, elementTop - offset)
    
    window.scrollTo({ 
      top: targetPosition, 
      behavior: 'smooth' 
    })
  }
}

/**
 * Функция для react-router-hash-link
 * Используется как scroll prop: <HashLink scroll={scrollWithOffset} />
 * @param {HTMLElement} el - DOM элемент
 */
export function scrollWithOffset(el) {
  if (!el) return

  const offset = HEADER_HEIGHT + 20
  
  // Если мы в начале страницы, где виден AnnouncementBar
  if (window.scrollY < SCROLL_THRESHOLD) {
    // Мгновенно проскроллим за порог, чтобы AnnouncementBar исчез
    window.scrollTo({ top: SCROLL_THRESHOLD + 1, behavior: 'instant' })
    
    // Небольшая задержка для перерасчёта layout после исчезновения AnnouncementBar
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const elementTop = el.getBoundingClientRect().top + window.scrollY
        const targetPosition = Math.max(0, elementTop - offset)
        
        window.scrollTo({ 
          top: targetPosition, 
          behavior: 'smooth' 
        })
      })
    })
  } else {
    // Обычный плавный скролл
    const elementTop = el.getBoundingClientRect().top + window.scrollY
    const targetPosition = Math.max(0, elementTop - offset)
    
    window.scrollTo({ 
      top: targetPosition, 
      behavior: 'smooth' 
    })
  }
}

/**
 * Скролл наверх страницы
 */
export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

/**
 * Проверка, виден ли элемент во viewport
 * @param {string} elementId - ID элемента
 * @param {number} offset - отступ для расчёта
 * @returns {boolean}
 */
export function isElementInView(elementId, offset = 150) {
  const element = document.getElementById(elementId)
  if (!element) return false

  const rect = element.getBoundingClientRect()
  return rect.top <= offset && rect.bottom >= offset
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