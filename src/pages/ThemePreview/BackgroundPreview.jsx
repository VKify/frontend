import { useState, useEffect, useRef } from 'react'
import { Image } from 'lucide-react'
import VkLogo from '../../components/common/VkLogo'
import { isDarkColor, adjustColor } from '../../utils/colors'
import { detectBackgroundType, parseVideoUrl, platformLabel } from '../../utils/videoEmbed'

function UnavailableBgNotice({ bg }) {
    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center"
             style={{ background: bg }}>
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                <Image className="w-6 h-6 text-white/60" />
            </div>
            <div>
                <p className="text-white/80 font-semibold text-sm">Фон из расширения</p>
                <p className="text-white/40 text-xs mt-1 max-w-xs">
                    Файл хранится внутри расширения и недоступен на веб-странице
                </p>
            </div>
        </div>
    )
}

export default function BackgroundPreview({ settings }) {
    const videoRef = useRef(null)
    const [mediaLoaded,  setMediaLoaded]  = useState(false)
    const [mediaError,   setMediaError]   = useState(false)
    const [iframeLoaded, setIframeLoaded] = useState(false)

    const src          = settings.custom_background
    const bgType       = detectBackgroundType(settings)
    const parsed       = bgType === 'embed' ? parseVideoUrl(src) : null
    const bg           = settings.custom_theme  || '#1e1e2e'
    const accent       = settings.custom_accent || '#0077ff'
    const blockOpacity = settings.block_opacity ?? 1
    const dark         = isDarkColor(bg)
    const card         = dark ? adjustColor(bg, 20) : adjustColor(bg, -14)
    const textHi       = dark ? 'rgba(255,255,255,0.82)' : 'rgba(0,0,0,0.78)'
    const textLo       = dark ? 'rgba(255,255,255,0.26)' : 'rgba(0,0,0,0.20)'

    const bgBlur       = Number(settings.background_blur        ?? 0)
    const bgOpacity    = Number(settings.background_opacity     ?? 100) / 100
    const bgDim        = Number(settings.background_dim         ?? 0)   / 100
    const bgBrightness = Number(settings.background_brightness  ?? 100)
    const bgContrast   = Number(settings.background_contrast    ?? 100)
    const bgSaturation = Number(settings.background_saturation  ?? 100)
    const bgHueRotate  = Number(settings.background_hue_rotate  ?? 0)
    const bgSepia      = Number(settings.background_sepia       ?? 0)
    const bgGrayscale  = Number(settings.background_grayscale   ?? 0)
    const bgScale      = Number(settings.background_scale       ?? 100) / 100
    const bgPosition   = settings.background_position           ?? 'center'
    const bgSize       = settings.background_size               ?? 'cover'
    const rawSpeed     = Number(settings.background_video_speed ?? 1)
    const bgVideoSpeed = rawSpeed > 4 ? rawSpeed / 100 : rawSpeed
    const bgOverlayColor   = settings.background_overlay_color   ?? null
    const bgOverlayOpacity = Number(settings.background_overlay_opacity ?? 0) / 100
    const bgVignette = Number(settings.background_vignette ?? 0) / 100

    const bgFilterParts = [
        bgBlur       > 0     && `blur(${bgBlur}px)`,
        bgBrightness !== 100 && `brightness(${bgBrightness}%)`,
        bgContrast   !== 100 && `contrast(${bgContrast}%)`,
        bgSaturation !== 100 && `saturate(${bgSaturation}%)`,
        bgHueRotate  !== 0   && `hue-rotate(${bgHueRotate}deg)`,
        bgSepia      > 0     && `sepia(${bgSepia}%)`,
        bgGrayscale  > 0     && `grayscale(${bgGrayscale}%)`,
    ].filter(Boolean)
    const bgFilter = bgFilterParts.length ? bgFilterParts.join(' ') : undefined

    const mediaStyle = (loaded) => ({
        opacity:        loaded ? bgOpacity : 0,
        filter:         bgFilter,
        transform:      bgScale !== 1 ? `scale(${bgScale})` : undefined,
        objectPosition: bgPosition,
        objectFit:      bgSize,
        transition:     'opacity .4s',
    })

    const iframeStyle = (loaded) => ({
        opacity:    loaded ? bgOpacity : 0,
        filter:     bgFilter,
        transform:  bgScale !== 1 ? `scale(${bgScale})` : undefined,
        transition: 'opacity .6s',
    })

    const badgeLabel = bgType === 'embed' && parsed
        ? `▶ ${platformLabel(parsed.platform)}`
        : bgType === 'video' ? '▶ Видео'
        : bgType === 'image' ? '🖼 Изображение'
        : bgType === 'web'   ? '✦ Веб-фон'
        : null

    useEffect(() => {
        setMediaLoaded(false); setMediaError(false); setIframeLoaded(false)
        if (bgType === 'video' && videoRef.current) videoRef.current.play().catch(() => {})
    }, [bgType, src])

    useEffect(() => {
        if (videoRef.current && bgType === 'video') {
            videoRef.current.playbackRate = bgVideoSpeed
        }
    }, [bgVideoSpeed, bgType])

    return (
        <div className="relative w-full overflow-hidden"
             style={{ aspectRatio: '16/9', maxHeight: '78vh', minHeight: 320, background: bg }}>

            {/* ══ СЛОЙ 1: Фоновое медиа ══════════════════════════════════════ */}

            {bgType === 'unavailable' && <UnavailableBgNotice bg={bg} />}

            {bgType === 'image' && !mediaError && (
                <>
                    {!mediaLoaded && <div className="absolute inset-0 animate-pulse" style={{ background: adjustColor(bg, dark ? 18 : -10) }} />}
                    <img src={src} alt="фон"
                         onLoad={() => setMediaLoaded(true)} onError={() => setMediaError(true)}
                         className="absolute inset-0 w-full h-full"
                         style={mediaStyle(mediaLoaded)} />
                </>
            )}

            {bgType === 'video' && !mediaError && (
                <>
                    {!mediaLoaded && <div className="absolute inset-0 animate-pulse" style={{ background: adjustColor(bg, dark ? 18 : -10) }} />}
                    <video ref={videoRef} src={src} autoPlay muted loop playsInline
                           onLoadedData={() => setMediaLoaded(true)} onError={() => setMediaError(true)}
                           className="absolute inset-0 w-full h-full"
                           style={mediaStyle(mediaLoaded)} />
                </>
            )}

            {bgType === 'embed' && parsed && (
                <>
                    {!iframeLoaded && <div className="absolute inset-0 animate-pulse" style={{ background: adjustColor(bg, dark ? 18 : -10) }} />}
                    <iframe src={parsed.embedUrl} title={platformLabel(parsed.platform)}
                            {...(parsed.attributes || {})} allowFullScreen tabIndex={-1}
                            onLoad={() => setIframeLoaded(true)}
                            className="absolute inset-0 w-full h-full border-0 pointer-events-none"
                            style={iframeStyle(iframeLoaded)} />
                </>
            )}

            {bgType === 'web' && (
                <>
                    {!iframeLoaded && <div className="absolute inset-0 animate-pulse" style={{ background: adjustColor(bg, dark ? 18 : -10) }} />}
                    <iframe src={src} title="фон" sandbox="allow-scripts" tabIndex={-1}
                            onLoad={() => setIframeLoaded(true)}
                            className="absolute inset-0 w-full h-full border-0 pointer-events-none"
                            style={iframeStyle(iframeLoaded)} />
                </>
            )}

            {bgType && bgType !== 'unavailable' && bgDim > 0 && (
                <div className="absolute inset-0 pointer-events-none"
                     style={{ background: `rgba(0,0,0,${bgDim})` }} />
            )}

            {bgOverlayColor && bgOverlayOpacity > 0 && bgType && bgType !== 'unavailable' && (
                <div className="absolute inset-0 pointer-events-none"
                     style={{ background: bgOverlayColor, opacity: bgOverlayOpacity }} />
            )}

            {bgVignette > 0 && bgType && bgType !== 'unavailable' && (
                <div className="absolute inset-0 pointer-events-none"
                     style={{ background: `radial-gradient(ellipse at center, transparent ${Math.round((1 - bgVignette) * 55)}%, rgba(0,0,0,${bgVignette * 0.92}) 100%)` }} />
            )}

            {/* ══ СЛОЙ 2: VK-интерфейс ════════════════════════════════════════ */}
            <div className="absolute inset-0 flex flex-col overflow-hidden">

                {/* Топбар */}
                <div className="flex items-center gap-3 px-5 shrink-0"
                     style={{ height: 48, background: card,
                              borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'}` }}>
                    <VkLogo accent={accent} size={28} />
                    <div className="flex-1 flex items-center gap-4">
                        <div className="h-2 w-24 rounded-full" style={{ background: accent, opacity: 0.75 }} />
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="h-2 w-20 rounded-full opacity-15" style={{ background: textHi }} />
                        <div className="w-7 h-7 rounded-full opacity-20" style={{ background: textHi }} />
                        <div className="w-7 h-7 rounded-full opacity-20" style={{ background: textHi }} />
                    </div>
                </div>

                {/* Тело */}
                <div className="flex flex-1 min-h-0">

                    {/* Левый сайдбар */}
                    <div className="hidden sm:flex flex-col gap-0.5 shrink-0 p-3 overflow-hidden"
                         style={{ width: 220, background: card + (dark ? 'cc' : 'dd'),
                                  opacity: blockOpacity,
                                  borderRight: `1px solid ${dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}` }}>
                        {[1, 0, 0, 0, 0, 0, 0, 0].map((active, i) => (
                            <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
                                 style={{ background: active ? accent + '20' : 'transparent' }}>
                                <div className="w-4 h-4 rounded shrink-0"
                                     style={{ background: active ? accent : textHi,
                                              opacity: active ? 0.9 : 0.22 }} />
                                <div className="flex-1 h-1.5 rounded-full"
                                     style={{ background: active ? accent : textHi,
                                              opacity: active ? 0.6 : 0.16 }} />
                                {i === 0 && (
                                    <div className="min-w-[18px] h-[18px] rounded-full flex items-center justify-center shrink-0"
                                         style={{ background: accent, fontSize: 9, color: isDarkColor(accent) ? '#fff' : '#000',
                                                  fontWeight: 700, lineHeight: 1 }}>3</div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Лента */}
                    <div className="flex-1 min-w-0 p-4 space-y-3 overflow-hidden">
                        {/* Сториз */}
                        <div className="flex gap-3 pb-1">
                            {[1, 0.8, 0.55, 0.35, 0.2].map((op, i) => (
                                <div key={i} className="flex flex-col items-center gap-1.5 shrink-0">
                                    <div className="w-11 h-11 rounded-full"
                                         style={{ background: accent, opacity: op,
                                                  boxShadow: i === 0
                                                      ? `0 0 0 2.5px ${bg}, 0 0 0 4px ${accent}`
                                                      : `0 0 0 2px ${dark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.10)'}` }} />
                                    <div className="h-1 w-9 rounded-full opacity-20" style={{ background: textHi }} />
                                </div>
                            ))}
                        </div>

                        {/* Посты */}
                        {[
                            { op: 1,    media: true,  lines: 2 },
                            { op: 0.72, media: false, lines: 2 },
                            { op: 0.44, media: false, lines: 1 },
                            { op: 0.20, media: false, lines: 1 },
                        ].map(({ op, media, lines }, i) => (
                            <div key={i} className="rounded-2xl p-3.5 space-y-2.5"
                                 style={{ background: card, opacity: blockOpacity * op }}>
                                <div className="flex items-center gap-2.5">
                                    <div className="w-9 h-9 rounded-full shrink-0"
                                         style={{ background: accent, opacity: i === 0 ? 1 : 0.55 }} />
                                    <div className="space-y-1.5 flex-1 min-w-0">
                                        <div className="h-2 rounded-full"
                                             style={{ background: textHi, opacity: 0.55,
                                                      width: [104, 80, 64, 52][i] }} />
                                        <div className="h-1.5 w-16 rounded-full opacity-20"
                                             style={{ background: textLo }} />
                                    </div>
                                    {i === 0 && (
                                        <div className="h-6 w-16 rounded-xl shrink-0"
                                             style={{ background: accent + '25' }} />
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <div className="h-1.5 w-full rounded-full opacity-30"
                                         style={{ background: textHi }} />
                                    {lines > 1 && (
                                        <div className="h-1.5 w-3/4 rounded-full opacity-22"
                                             style={{ background: textHi }} />
                                    )}
                                </div>
                                {media && (
                                    <div className="rounded-xl"
                                         style={{ height: 72,
                                                  background: `linear-gradient(135deg, ${accent}22 0%, ${dark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'} 100%)`,
                                                  border: `1px solid ${accent}18` }} />
                                )}
                                <div className="flex items-center gap-4 pt-0.5">
                                    {[accent, textHi, textHi].map((c, j) => (
                                        <div key={j} className="flex items-center gap-1.5">
                                            <div className="w-3.5 h-3.5 rounded opacity-28"
                                                 style={{ background: c }} />
                                            <div className="h-1 w-5 rounded-full opacity-16"
                                                 style={{ background: textLo }} />
                                        </div>
                                    ))}
                                    <div className="ml-auto h-1 w-10 rounded-full opacity-12"
                                         style={{ background: textLo }} />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Правая колонка */}
                    <div className="hidden lg:flex flex-col gap-3 shrink-0 p-4 overflow-hidden"
                         style={{ width: 200 }}>
                        {[{ op: 1, h: 80 }, { op: 0.6, h: 60 }, { op: 0.3, h: 60 }].map(({ op, h }, i) => (
                            <div key={i} className="rounded-2xl p-3.5 space-y-2"
                                 style={{ background: card, opacity: blockOpacity * op }}>
                                <div className="h-2 w-20 rounded-full opacity-35" style={{ background: textHi }} />
                                <div style={{ height: h - 40 }} className="space-y-1.5 pt-1">
                                    <div className="h-1.5 w-full rounded-full opacity-18" style={{ background: textHi }} />
                                    <div className="h-1.5 w-4/5 rounded-full opacity-13" style={{ background: textHi }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ══ СЛОЙ 3: Бейджи ══════════════════════════════════════════════ */}
            {bgType && bgType !== 'unavailable' && badgeLabel && (
                <div className="absolute top-14 left-4 z-10">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-black/50 text-white backdrop-blur-sm">
                        {badgeLabel}
                    </span>
                </div>
            )}
            {bgType === 'video' && mediaLoaded && (
                <div className="absolute bottom-4 right-4 z-10">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-green-500/80 text-white backdrop-blur-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        Воспроизводится
                    </span>
                </div>
            )}
        </div>
    )
}