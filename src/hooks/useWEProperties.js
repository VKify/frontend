/**
 * useWEProperties — автоматически читает project.json из папки Wallpaper Engine обоины.
 *
 * Структура project.json:
 *   general.properties — объект { key: { type, text, value, order, min?, max?, options? } }
 *
 * Фильтрует неподдерживаемые типы и пустые объекты. Служебные ключи
 * локализации `ui_*` превращает в читаемые подписи: само свойство при этом
 * остаётся пользовательским и должно попасть в схему расширения.
 *
 * Работает только для обоев с workshopId (папки Wallpaper Engine).
 */
import { useState, useEffect } from 'react'

// Типы, которые умеем отображать
const KNOWN_TYPES = new Set(['slider', 'bool', 'combo', 'textinput', 'color', 'group'])

function humanizeLabel(text, key) {
    if (typeof text !== 'string' || !text.trim()) return key
    if (!text.startsWith('ui_')) return text
    return text
        .replace(/^ui_(?:browse_)?(?:properties_)?/, '')
        .replace(/_/g, ' ')
        .replace(/^./, c => c.toUpperCase())
}

/**
 * Превращает сырой объект properties из project.json в нормализованный массив,
 * отсортированный по полю order.
 */
function normalize(rawProps) {
    return Object.entries(rawProps)
        .filter(([, p]) =>
            p &&
            typeof p.text === 'string' &&
            KNOWN_TYPES.has(p.type)
        )
        .map(([key, p]) => ({
            key,
            type: p.type,
            label: humanizeLabel(p.text, key),
            text: humanizeLabel(p.text, key),
            defaultValue: p.value,
            value: p.value,
            min: p.min,
            max: p.max,
            step: p.step,
            precision: p.precision,
            order: p.order,
            options: Array.isArray(p.options)
                ? p.options.map(option => ({ label: String(option.label ?? option.value), value: String(option.value ?? '') }))
                : undefined,
        }))
        .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
}

/**
 * @param {object|null} wallpaper — объект обоины из wallpapers.js
 * @returns {{ properties: array|null, loading: boolean, error: string|null }}
 *
 * properties === null  — хук ещё не запускался (нет workshopId)
 * properties === []    — запрос прошёл, но полезных свойств нет
 * properties === [...]  — есть что показывать
 */
export function useWEProperties(wallpaper) {
    const [properties, setProperties] = useState(null)
    const [loading,    setLoading]    = useState(false)
    const [error,      setError]      = useState(null)

    const workshopId = wallpaper?.workshopId
    const type       = wallpaper?.type   // 'web' | 'video' | 'image'

    useEffect(() => {
        if (!workshopId) {
            setProperties(null)
            return
        }

        // Определяем базовую папку по типу обоины
        const folder = type === 'video'
            ? `/wallpapers/video/${workshopId}`
            : `/wallpapers/web/${workshopId}`

        const url = `${folder}/project.json`

        let cancelled = false
        setLoading(true)
        setError(null)

        fetch(url)
            .then(r => {
                if (!r.ok) throw new Error(`HTTP ${r.status}`)
                return r.json()
            })
            .then(data => {
                if (cancelled) return
                const raw = data?.general?.properties ?? {}
                setProperties(normalize(raw))
            })
            .catch(err => {
                if (cancelled) return
                console.warn('[VKify] useWEProperties: failed to load', url, err.message)
                setError(err.message)
                setProperties([])
            })
            .finally(() => {
                if (!cancelled) setLoading(false)
            })

        return () => { cancelled = true }
    }, [workshopId, type])

    return { properties, loading, error }
}
