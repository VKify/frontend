/**
 * Общие утилиты работы с цветом.
 * Используются в Themes, ThemeDetail, ThemePreview, LiveDemo.
 */

/** Определяет, является ли HEX-цвет тёмным */
export function isDarkColor(hex) {
    const c = (hex || '').replace('#', '')
    if (c.length !== 6) return false
    const r = parseInt(c.slice(0, 2), 16)
    const g = parseInt(c.slice(2, 4), 16)
    const b = parseInt(c.slice(4, 6), 16)
    return (r * 0.299 + g * 0.587 + b * 0.114) / 255 < 0.5
}

/** Осветляет или затемняет HEX-цвет на заданное значение */
export function adjustColor(hex, amount) {
    const c = (hex || '').replace('#', '')
    if (c.length !== 6) return hex
    const r = parseInt(c.slice(0, 2), 16)
    const g = parseInt(c.slice(2, 4), 16)
    const b = parseInt(c.slice(4, 6), 16)
    const dark = (r * 0.299 + g * 0.587 + b * 0.114) / 255 < 0.5
    const d = amount !== undefined ? amount : (dark ? 22 : -14)
    const clamp = v => Math.min(255, Math.max(0, v + d))
    return `#${[clamp(r), clamp(g), clamp(b)].map(v => v.toString(16).padStart(2, '0')).join('')}`
}

/**
 * Правильная русская плюрализация.
 * pluralizeRu(1, 'обой', 'обоя', 'обоев') → 'обой'
 * pluralizeRu(3, 'обой', 'обоя', 'обоев') → 'обоя'
 * pluralizeRu(11,'обой', 'обоя', 'обоев') → 'обоев'
 */
export function pluralizeRu(n, one, few, many) {
    const abs = Math.abs(n) % 100
    const mod = abs % 10
    if (abs > 10 && abs < 20) return many
    if (mod === 1) return one
    if (mod >= 2 && mod <= 4) return few
    return many
}