/**
 * useVideoMeta — автоматически извлекает метаданные видео-файла.
 *
 * Возвращает:
 *   resolution  — "3840×2160" или null
 *   duration    — "1m 23s loop" / "45s loop" или null
 *   format      — "WebM / MP4" (из src-ов) или null
 *   size        — "48.3 MB" или null
 *   loading     — true пока хотя бы один запрос не завершён
 */
import { useState, useEffect, useRef } from 'react'

function formatDuration(seconds) {
    if (!seconds || !isFinite(seconds)) return null
    const s = Math.round(seconds)
    if (s < 60) return `${s}s loop`
    const m = Math.floor(s / 60)
    const rem = s % 60
    return rem > 0 ? `${m}m ${rem}s loop` : `${m}m loop`
}

function formatBytes(bytes) {
    if (!bytes || bytes <= 0) return null
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

function detectFormats(srcMp4, srcWebm) {
    const parts = []
    if (srcWebm) parts.push('WebM')
    if (srcMp4)  parts.push('MP4')
    return parts.length ? parts.join(' / ') : null
}

async function fetchFileSize(url) {
    if (!url) return null
    try {
        const res = await fetch(url, { method: 'HEAD' })
        const cl = res.headers.get('content-length')
        return cl ? parseInt(cl, 10) : null
    } catch {
        return null
    }
}

export function useVideoMeta(srcMp4, srcWebm) {
    const videoRef = useRef(null)
    const [meta, setMeta] = useState({
        resolution: null,
        duration: null,
        format: detectFormats(srcMp4, srcWebm),  // синхронно из URL
        size: null,
        loading: !!(srcMp4 || srcWebm),
    })

    useEffect(() => {
        if (!srcMp4 && !srcWebm) {
            setMeta(m => ({ ...m, loading: false }))
            return
        }

        let cancelled = false
        let metaDone  = false
        let sizeDone  = false

        const tryFinish = () => {
            if (metaDone && sizeDone && !cancelled) {
                setMeta(m => ({ ...m, loading: false }))
            }
        }

        // Создаём скрытый video-элемент только для чтения метаданных
        const video = document.createElement('video')
        video.preload = 'metadata'
        video.muted = true
        videoRef.current = video

        const primarySrc = srcWebm || srcMp4  // webm приоритетно

        const onLoaded = () => {
            if (cancelled) return
            const w = video.videoWidth
            const h = video.videoHeight
            setMeta(m => ({
                ...m,
                resolution: w && h ? `${w}×${h}` : null,
                duration: formatDuration(video.duration),
            }))
            // Убираем src чтобы браузер не продолжал буферизацию
            video.src = ''
            video.load()
            metaDone = true
            tryFinish()
        }

        const onError = () => {
            if (cancelled) return
            metaDone = true
            tryFinish()
        }

        video.addEventListener('loadedmetadata', onLoaded)
        video.addEventListener('error', onError)
        video.src = primarySrc

        // Параллельно получаем размер файла через HEAD
        fetchFileSize(primarySrc).then(bytes => {
            if (cancelled) return
            setMeta(m => ({ ...m, size: formatBytes(bytes) }))
            sizeDone = true
            tryFinish()
        })

        return () => {
            cancelled = true
            video.removeEventListener('loadedmetadata', onLoaded)
            video.removeEventListener('error', onError)
            video.src = ''
            video.load()
        }
    }, [srcMp4, srcWebm])

    return meta
}

/**
 * Метаданные статического изображения:
 *   • resolution — naturalWidth × naturalHeight (читается через <img>).
 *   • size — content-length из HEAD-запроса.
 * Оба запроса параллельны; loading=false когда оба завершились (или упали).
 */
export function useImageMeta(src) {
    const [meta, setMeta] = useState({
        resolution: null,
        size: null,
        loading: !!src,
    })

    useEffect(() => {
        if (!src) { setMeta({ resolution: null, size: null, loading: false }); return }

        let cancelled = false
        let imgDone   = false
        let sizeDone  = false
        const maybeFinish = () => {
            if (imgDone && sizeDone && !cancelled) {
                setMeta(m => ({ ...m, loading: false }))
            }
        }

        // Разрешение — через скрытый <img>. naturalWidth/Height доступны на load.
        const img = new Image()
        img.onload = () => {
            if (cancelled) return
            const w = img.naturalWidth
            const h = img.naturalHeight
            setMeta(m => ({ ...m, resolution: w && h ? `${w}×${h}` : null }))
            imgDone = true
            maybeFinish()
        }
        img.onerror = () => {
            imgDone = true
            maybeFinish()
        }
        img.src = src

        // Размер — HEAD-запрос параллельно.
        fetchFileSize(src).then(bytes => {
            if (cancelled) return
            setMeta(m => ({ ...m, size: formatBytes(bytes) }))
            sizeDone = true
            maybeFinish()
        })

        return () => { cancelled = true }
    }, [src])

    return meta
}