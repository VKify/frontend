/**
 * WallpaperLayer — слой обоев темы (фон VK): изображение / видео / встраиваемое
 * видео / веб-страница + фильтры, затемнение, оверлей, виньетка.
 * Выделен из старого BackgroundPreview, чтобы показывать обои прямо за
 * интерфейсом VkMockup.
 */
import { useState, useEffect, useRef } from 'react'
import { Image } from 'lucide-react'
import { isDarkColor, adjustColor } from '../../utils/colors'
import { detectBackgroundType, parseVideoUrl, platformLabel } from '../../utils/videoEmbed'
import { useTranslation } from '../../i18n'

export default function WallpaperLayer({ settings }) {
  const { t } = useTranslation()
  const videoRef = useRef(null)
  const [mediaLoaded, setMediaLoaded] = useState(false)
  const [mediaError, setMediaError] = useState(false)
  const [iframeLoaded, setIframeLoaded] = useState(false)

  const src = settings.custom_background
  const bgType = detectBackgroundType(settings)
  const parsed = bgType === 'embed' ? parseVideoUrl(src) : null
  const bg = settings.custom_theme || '#1e1e2e'
  const dark = isDarkColor(bg)

  const bgBlur = Number(settings.background_blur ?? 0)
  const bgOpacity = Number(settings.background_opacity ?? 100) / 100
  const bgDim = Number(settings.background_dim ?? 0) / 100
  const bgBrightness = Number(settings.background_brightness ?? 100)
  const bgContrast = Number(settings.background_contrast ?? 100)
  const bgSaturation = Number(settings.background_saturation ?? 100)
  const bgHueRotate = Number(settings.background_hue_rotate ?? 0)
  const bgSepia = Number(settings.background_sepia ?? 0)
  const bgGrayscale = Number(settings.background_grayscale ?? 0)
  const bgScale = Number(settings.background_scale ?? 100) / 100
  const bgPosition = settings.background_position ?? 'center'
  const bgSize = settings.background_size ?? 'cover'
  const rawSpeed = Number(settings.background_video_speed ?? 1)
  const bgVideoSpeed = rawSpeed > 4 ? rawSpeed / 100 : rawSpeed
  const bgOverlayColor = settings.background_overlay_color ?? null
  const bgOverlayOpacity = Number(settings.background_overlay_opacity ?? 0) / 100
  const bgVignette = Number(settings.background_vignette ?? 0) / 100

  const bgFilterParts = [
    bgBlur > 0 && `blur(${bgBlur}px)`,
    bgBrightness !== 100 && `brightness(${bgBrightness}%)`,
    bgContrast !== 100 && `contrast(${bgContrast}%)`,
    bgSaturation !== 100 && `saturate(${bgSaturation}%)`,
    bgHueRotate !== 0 && `hue-rotate(${bgHueRotate}deg)`,
    bgSepia > 0 && `sepia(${bgSepia}%)`,
    bgGrayscale > 0 && `grayscale(${bgGrayscale}%)`,
  ].filter(Boolean)
  const bgFilter = bgFilterParts.length ? bgFilterParts.join(' ') : undefined

  const mediaStyle = (loaded) => ({
    opacity: loaded ? bgOpacity : 0,
    filter: bgFilter,
    transform: bgScale !== 1 ? `scale(${bgScale})` : undefined,
    objectPosition: bgPosition,
    objectFit: bgSize,
    transition: 'opacity .4s',
  })
  const iframeStyle = (loaded) => ({
    opacity: loaded ? bgOpacity : 0,
    filter: bgFilter,
    transform: bgScale !== 1 ? `scale(${bgScale})` : undefined,
    transition: 'opacity .6s',
  })

  useEffect(() => {
    setMediaLoaded(false); setMediaError(false); setIframeLoaded(false)
    if (bgType === 'video' && videoRef.current) videoRef.current.play().catch(() => {})
  }, [bgType, src])

  useEffect(() => {
    if (videoRef.current && bgType === 'video') videoRef.current.playbackRate = bgVideoSpeed
  }, [bgVideoSpeed, bgType])

  // Нет обоев / недоступны (файл внутри расширения) — показываем просто фон
  if (!bgType || bgType === 'unavailable') {
    return <div className="absolute inset-0" style={{ background: bg }} />
  }

  return (
    <div className="absolute inset-0" style={{ background: bg }}>
      {bgType === 'image' && !mediaError && (
        <>
          {!mediaLoaded && <div className="absolute inset-0 animate-pulse" style={{ background: adjustColor(bg, dark ? 18 : -10) }} />}
          <img src={src} alt={t('bgPreview.alt')}
            onLoad={() => setMediaLoaded(true)} onError={() => setMediaError(true)}
            className="absolute inset-0 w-full h-full" style={mediaStyle(mediaLoaded)} />
        </>
      )}

      {bgType === 'video' && !mediaError && (
        <>
          {!mediaLoaded && <div className="absolute inset-0 animate-pulse" style={{ background: adjustColor(bg, dark ? 18 : -10) }} />}
          <video ref={videoRef} src={src} autoPlay muted loop playsInline
            onLoadedData={() => setMediaLoaded(true)} onError={() => setMediaError(true)}
            className="absolute inset-0 w-full h-full" style={mediaStyle(mediaLoaded)} />
        </>
      )}

      {bgType === 'embed' && parsed && (
        <>
          {!iframeLoaded && <div className="absolute inset-0 animate-pulse" style={{ background: adjustColor(bg, dark ? 18 : -10) }} />}
          <iframe src={parsed.embedUrl} title={platformLabel(parsed.platform)}
            {...(parsed.attributes || {})} allowFullScreen tabIndex={-1}
            onLoad={() => setIframeLoaded(true)}
            className="absolute inset-0 w-full h-full border-0 pointer-events-none" style={iframeStyle(iframeLoaded)} />
        </>
      )}

      {bgType === 'web' && (
        <>
          {!iframeLoaded && <div className="absolute inset-0 animate-pulse" style={{ background: adjustColor(bg, dark ? 18 : -10) }} />}
          <iframe src={src} title={t('bgPreview.alt')} sandbox="allow-scripts" tabIndex={-1}
            onLoad={() => setIframeLoaded(true)}
            className="absolute inset-0 w-full h-full border-0 pointer-events-none" style={iframeStyle(iframeLoaded)} />
        </>
      )}

      {bgDim > 0 && <div className="absolute inset-0" style={{ background: `rgba(0,0,0,${bgDim})` }} />}
      {bgOverlayColor && bgOverlayOpacity > 0 && (
        <div className="absolute inset-0" style={{ background: bgOverlayColor, opacity: bgOverlayOpacity }} />
      )}
      {bgVignette > 0 && (
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at center, transparent ${Math.round((1 - bgVignette) * 55)}%, rgba(0,0,0,${bgVignette * 0.92}) 100%)` }} />
      )}
    </div>
  )
}

// Иконка-заглушка экспортируется на случай повторного использования
export { Image as WallpaperIcon }
