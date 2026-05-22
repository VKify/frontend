/**
 * Video embed URL parser — портирован из расширения VKify
 * Поддерживает: YouTube, VK Video, Vimeo, Coub, Twitch, Dailymotion, Rutube, .mp4/.webm
 */

/**
 * Парсит URL видео и возвращает данные для встраивания.
 * @param {string} url
 * @param {string} [parentHost] — hostname для Twitch (требует parent=)
 * @returns {{ platform: string, embedUrl: string, attributes?: object } | null}
 */
export function parseVideoUrl(url, parentHost = window.location.hostname) {
    if (!url) return null

    try {
        const u = new URL(url)
        const host = u.hostname.replace(/^(www\.|m\.)/, '')
        const path = u.pathname

        // YouTube
        if (host === 'youtube.com' || host === 'youtu.be' || host === 'youtube-nocookie.com') {
            let id = null

            // youtu.be/{id}
            if (host === 'youtu.be') {
                id = path.slice(1).split('?')[0]
            }
            // /embed/{id}  или  /shorts/{id}
            const embedMatch = path.match(/\/(?:embed|shorts)\/([a-zA-Z0-9_-]{11})/)
            if (embedMatch) id = embedMatch[1]
            // /watch?v={id}
            if (!id) id = u.searchParams.get('v')

            if (id) {
                return {
                    platform: 'youtube',
                    embedUrl: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0&playsinline=1`,
                    attributes: { allow: 'autoplay; encrypted-media; picture-in-picture' },
                }
            }
        }

        // VK Video
        if (host === 'vk.com' || host === 'vk.ru' || host === 'vkvideo.ru') {
            // Уже embed
            if (path.includes('video_ext.php')) {
                const oid  = u.searchParams.get('oid')
                const vid  = u.searchParams.get('id')
                const hash = u.searchParams.get('hash') || ''
                if (oid && vid) {
                    return {
                        platform: 'vk',
                        embedUrl: `https://vkvideo.ru/video_ext.php?oid=${oid}&id=${vid}&autoplay=1&mute=1&loop=1&controls=0${hash ? '&hash=' + hash : ''}`,
                        attributes: { allow: 'autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock' },
                    }
                }
            }
            // /video{oid}_{id}  или  /clip{oid}_{id}
            const m = path.match(/\/(?:video|clip)(-?\d+)_(\d+)/)
            if (m) {
                const [, oid, vid] = m
                return {
                    platform: 'vk',
                    embedUrl: `https://vkvideo.ru/video_ext.php?oid=${oid}&id=${vid}&autoplay=1&mute=1&loop=1&controls=0`,
                    attributes: { allow: 'autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock' },
                }
            }
        }

        // Vimeo
        if (host === 'vimeo.com' || host === 'player.vimeo.com') {
            const m = path.match(/\/(?:video\/)?(\d+)/)
            if (m) {
                return {
                    platform: 'vimeo',
                    embedUrl: `https://player.vimeo.com/video/${m[1]}?autoplay=1&muted=1&loop=1&background=1&controls=0`,
                    attributes: { allow: 'autoplay; fullscreen; picture-in-picture' },
                }
            }
        }

        // Coub
        if (host === 'coub.com') {
            const m = path.match(/\/(?:view|embed)\/([a-zA-Z0-9]+)/)
            if (m) {
                return {
                    platform: 'coub',
                    embedUrl: `https://coub.com/embed/${m[1]}?muted=true&autostart=true&originalSize=false&startWithHD=true`,
                    attributes: { allow: 'autoplay; encrypted-media' },
                }
            }
        }

        // Twitch
        if (host === 'twitch.tv' || host === 'clips.twitch.tv' || host === 'player.twitch.tv') {
            const parent = `parent=${parentHost}`

            // Видео: /videos/{id}
            const videoM = path.match(/\/videos\/(\d+)/)
            if (videoM) {
                return {
                    platform: 'twitch',
                    embedUrl: `https://player.twitch.tv/?video=${videoM[1]}&${parent}&autoplay=true&muted=true&controls=false`,
                    attributes: { allow: 'autoplay; encrypted-media; fullscreen' },
                }
            }

            // Клип: clips.twitch.tv/{slug}
            if (host === 'clips.twitch.tv') {
                const slug = path.slice(1)
                if (slug) {
                    return {
                        platform: 'twitch',
                        embedUrl: `https://clips.twitch.tv/embed?clip=${slug}&${parent}&autoplay=true&muted=true`,
                        attributes: { allow: 'autoplay; encrypted-media; fullscreen' },
                    }
                }
            }

            // Клип через канал: /{channel}/clip/{slug}
            const clipM = path.match(/\/([a-zA-Z0-9_]+)\/clip\/([a-zA-Z0-9_-]+)/)
            if (clipM) {
                return {
                    platform: 'twitch',
                    embedUrl: `https://clips.twitch.tv/embed?clip=${clipM[2]}&${parent}&autoplay=true&muted=true`,
                    attributes: { allow: 'autoplay; encrypted-media; fullscreen' },
                }
            }

            // Канал: /{channelName}
            const RESERVED = new Set(['directory', 'downloads', 'jobs', 'p', 'payments', 'prime', 'settings', 'subscriptions', 'turbo', 'user', 'videos'])
            const chanM = path.match(/^\/([a-zA-Z0-9_]+)\/?$/)
            if (chanM && !RESERVED.has(chanM[1].toLowerCase())) {
                return {
                    platform: 'twitch',
                    embedUrl: `https://player.twitch.tv/?channel=${chanM[1]}&${parent}&autoplay=true&muted=true&controls=false`,
                    attributes: { allow: 'autoplay; encrypted-media; fullscreen' },
                }
            }
        }

        // Dailymotion
        if (host === 'dailymotion.com' || host === 'dai.ly') {
            const m = host === 'dai.ly'
                ? path.match(/\/([a-zA-Z0-9]+)/)
                : path.match(/\/video\/([a-zA-Z0-9]+)/)
            if (m) {
                return {
                    platform: 'dailymotion',
                    embedUrl: `https://www.dailymotion.com/embed/video/${m[1]}?autoplay=1&mute=1&controls=0&loop=1`,
                    attributes: { allow: 'autoplay; fullscreen' },
                }
            }
        }

        // Rutube
        if (host === 'rutube.ru') {
            const m = path.match(/\/(?:play\/embed|video)\/([a-f0-9]+)/i)
            if (m) {
                return {
                    platform: 'rutube',
                    embedUrl: `https://rutube.ru/play/embed/${m[1]}`,
                    attributes: {
                        allow: 'clipboard-write; autoplay',
                        webkitAllowFullScreen: true,
                        mozallowfullscreen: true,
                        allowFullScreen: true,
                    },
                }
            }
        }

    } catch {
        // невалидный URL
    }

    return null
}

/**
 * Определяет тип фона по URL и background_type из настроек расширения.
 * @returns {'embed'|'video'|'web'|'image'|'unavailable'|null}
 */
export function detectBackgroundType(settings) {
    const src  = settings.custom_background || ''
    const type = (settings.background_type || '').toLowerCase()

    if (!src) return null

    // Недоступные источники (файлы расширения)
    if (/^chrome-extension:|^moz-extension:/i.test(src)) return 'unavailable'

    // Если расширение уже знает тип — доверяем
    if (type === 'embed') return 'embed'
    if (type === 'video') return 'video'
    if (type === 'web')   return 'web'

    // Иначе — определяем по URL
    if (parseVideoUrl(src))                                          return 'embed'
    if (/\.(mp4|webm|mov|ogg)(\?|$)/i.test(src))                   return 'video'
    if (/\.(html?)(\?|$)/i.test(src) ||
        /codepen\.io|shadertoy\.com/i.test(src))                    return 'web'

    return 'image'
}

/** Читаемое название платформы */
export function platformLabel(platform) {
    return {
        youtube:     'YouTube',
        vk:          'VK Video',
        vimeo:       'Vimeo',
        coub:        'Coub',
        twitch:      'Twitch',
        dailymotion: 'Dailymotion',
        rutube:      'Rutube',
    }[platform] ?? platform
}