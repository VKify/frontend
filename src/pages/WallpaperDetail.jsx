/**
 * /wallpapers/:id — детальная страница обоя
 * - Авто-извлечение метаданных видео (resolution, duration, size, format)
 * - Inline iframe для веб-обоев
 * - Skeleton для всех загружаемых полей
 */
import { useState, useRef, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Download, Copy, Check, Globe, Zap, Sparkles } from 'lucide-react'
import SEO from '../components/common/SEO'
import DetailNavbar from '../components/common/DetailNavbar'
import { getWallpaperById, getSimilarWallpapers, WALLPAPER_TYPES, CATEGORIES, detectFormat } from '../data/wallpapers'
import { useVideoMeta, useImageMeta } from '../hooks/useVideoMeta'
import { useApplyToVK } from '../hooks/useApplyToVK'
import { useCopyToClipboard } from '../hooks/useCopyToClipboard'
import ExtensionHint from '../components/common/ExtensionHint'
import InstallModal from './ThemePreview/InstallModal'
import { useTranslation } from '../i18n'

function MetaSkeleton() {
    return <span className="inline-block h-3.5 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
}

function InfoRow({ label, value, loading }) {
    return (
        <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800 last:border-0">
            <span className="text-sm text-gray-400 dark:text-gray-500">{label}</span>
            <span className="text-sm font-medium text-gray-900 dark:text-white font-mono">
        {loading ? <MetaSkeleton /> : (value || '—')}
      </span>
        </div>
    )
}

function SimilarCard({ wallpaper }) {
    const videoRef = useRef(null)
    const isVideo  = wallpaper.type === WALLPAPER_TYPES.VIDEO

    const handleEnter = () => {
        if (isVideo && videoRef.current) {
            videoRef.current.currentTime = 0
            videoRef.current.play().catch(() => {})
        }
    }
    const handleLeave = () => {
        if (isVideo && videoRef.current) {
            videoRef.current.pause()
            videoRef.current.currentTime = 0
        }
    }

    return (
        <Link
            to={`/wallpapers/${wallpaper.id}`}
            className="group block rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-900"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
        >
            <div className="relative aspect-video overflow-hidden">
                <img
                    src={wallpaper.poster}
                    alt={wallpaper.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {isVideo && (
                    <video
                        ref={videoRef}
                        muted loop playsInline preload="none"
                        className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none"
                    >
                        {wallpaper.srcWebm && <source src={wallpaper.srcWebm} type="video/webm" />}
                        <source src={wallpaper.src} type="video/mp4" />
                    </video>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-150" />
            </div>
            <div className="p-3">
                <p className="text-sm font-semibold text-gray-900 dark:text-white
          group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                    {wallpaper.title}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{detectFormat(wallpaper) || '—'}</p>
            </div>
        </Link>
    )
}

function PreviewBlock({ wallpaper }) {
    const { t } = useTranslation()
    const videoRef = useRef(null)
    const [isPlaying,    setIsPlaying]    = useState(false)
    const [posterLoaded, setPosterLoaded] = useState(false)
    const [iframeLoaded, setIframeLoaded] = useState(false)
    const [mediaError,   setMediaError]   = useState(false)

    const isVideo  = wallpaper.type === WALLPAPER_TYPES.VIDEO
    const isWeb    = wallpaper.type === WALLPAPER_TYPES.WEB
    const category = CATEGORIES.find(c => c.id === wallpaper.category)

    useEffect(() => {
        if (!isVideo || !videoRef.current) return
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {})
    }, [isVideo])

    const handleMediaError = () => setMediaError(true)

    return (
        <div className="relative w-full bg-gray-950" style={{ aspectRatio: '16/9', maxHeight: '80vh' }}>
            {/* Ошибка загрузки */}
            {mediaError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gray-900 z-20">
                    <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-red-400" />
                    </div>
                    <p className="text-sm font-medium text-gray-400">{t('wallpaperDetail.loadError')}</p>
                    <a
                        href={wallpaper.src}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-400 hover:underline"
                    >
                        {t('wallpaperDetail.openDirect')}
                    </a>
                </div>
            )}

            {/* Skeleton */}
            {!posterLoaded && !iframeLoaded && !mediaError && (
                <div className="absolute inset-0 bg-gray-800 animate-pulse" />
            )}

            {/* Постер для video / image */}
            {!isWeb && (
                <img
                    src={wallpaper.poster}
                    alt={wallpaper.title}
                    onLoad={() => setPosterLoaded(true)}
                    onError={handleMediaError}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500
            ${posterLoaded ? 'opacity-100' : 'opacity-0'}
            ${isPlaying ? 'opacity-0' : ''}`}
                />
            )}

            {/* Видео */}
            {isVideo && (
                <video
                    ref={videoRef}
                    muted loop playsInline preload="auto"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onError={handleMediaError}
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    {wallpaper.srcWebm && <source src={wallpaper.srcWebm} type="video/webm" />}
                    <source src={wallpaper.src} type="video/mp4" />
                </video>
            )}

            {/* Веб-обои: iframe на весь блок */}
            {isWeb && (
                <>
                    {/* GIF-постер — виден пока iframe не загрузился */}
                    {wallpaper.poster && (
                        <img
                            src={wallpaper.poster}
                            alt={wallpaper.title}
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 pointer-events-none
                                ${iframeLoaded ? 'opacity-0' : 'opacity-100'}`}
                        />
                    )}

                    <iframe
                        src={wallpaper.src}
                        title={t('wallpaperDetail.livePreview', { title: wallpaper.title })}
                        sandbox="allow-scripts"
                        scrolling="no"
                        loading="eager"
                        tabIndex={-1}
                        onLoad={() => setIframeLoaded(true)}
                        className={`absolute inset-0 w-full h-full border-0 pointer-events-none transition-opacity duration-700
              ${iframeLoaded ? 'opacity-100' : 'opacity-0'}`}
                        style={{ overflow: 'hidden' }}
                    />
                    {iframeLoaded && (
                        <div className="absolute bottom-5 left-5 pointer-events-none">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-500/80 text-white backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                {t('wallpaperDetail.liveAnimation')}
              </span>
                        </div>
                    )}
                </>
            )}

            {/* Статичное изображение */}
            {wallpaper.type === WALLPAPER_TYPES.IMAGE && (
                <img
                    src={wallpaper.src}
                    alt={wallpaper.title}
                    onLoad={() => setPosterLoaded(true)}
                    onError={handleMediaError}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500
            ${posterLoaded ? 'opacity-100' : 'opacity-0'}`}
                />
            )}

            {/* Градиент */}
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-gray-950/60 to-transparent pointer-events-none" />

            {/* Категория */}
            {category && (
                <div className="absolute top-5 left-5 pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-black/50 text-white backdrop-blur-sm">
                        {category.emoji} {t(`wallpapersPage.categories.${category.id}`)}
                    </span>
                </div>
            )}

            {/* Индикатор видео */}
            {isVideo && (
                <div className="absolute bottom-5 right-5 pointer-events-none">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold backdrop-blur-sm transition-all
            ${isPlaying ? 'bg-green-500/80 text-white' : 'bg-black/50 text-white/60'}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-white animate-pulse' : 'bg-white/40'}`} />
              {isPlaying ? t('wallpaperDetail.playing') : t('wallpaperDetail.paused')}
          </span>
                </div>
            )}
        </div>
    )
}

export default function WallpaperDetail() {
    const { t }      = useTranslation()
    const { id }     = useParams()
    const share = useCopyToClipboard()
    const { detected, applied, apply, showInstallModal, closeInstallModal } = useApplyToVK()

    const wallpaper = getWallpaperById(id)
    const similar   = wallpaper ? getSimilarWallpapers(wallpaper, 3) : []
    const category  = CATEGORIES.find(c => c.id === wallpaper?.category)
    const isVideo   = wallpaper?.type === WALLPAPER_TYPES.VIDEO
    const isWeb     = wallpaper?.type === WALLPAPER_TYPES.WEB


    const videoMeta = useVideoMeta(
        isVideo ? wallpaper.src    : null,
        isVideo ? wallpaper.srcWebm : null,
    )
    const imageMeta = useImageMeta(
        !isVideo && !isWeb ? wallpaper?.src : null,
    )

    // Итоговые поля (из хуков или статики как fallback)
    const displayMeta = isVideo
        ? {
            resolution: videoMeta.resolution,
            format:     videoMeta.format,   // useVideoMeta уже читает из srcWebm/src
            size:       videoMeta.size,
            duration:   videoMeta.duration,
            loading:    videoMeta.loading,
        }
        : isWeb
            ? { resolution: t('wallpaperDetail.adaptive'), format: 'HTML', size: '< 1 KB', duration: null, loading: false }
            : {
                resolution: imageMeta.resolution,
                format:     detectFormat(wallpaper),
                size:       imageMeta.size,
                duration:   null,
                loading:    imageMeta.loading,
            }

    const handleShare = () => {
        if (!wallpaper) return
        // Копируем страницу обоя. window.location.origin — корректен и в dev
        // (localhost), и в проде (vkify.ru); никакого хардкода домена.
        share.copy(`${window.location.origin}/wallpapers/${wallpaper.id}`)
    }

    const handleApplyInVK = () => {
        if (!wallpaper) return
        apply(wallpaper.extensionConfig)
    }

    if (!wallpaper) {
        return (
            <div className="min-h-screen pt-24 flex flex-col items-center justify-center bg-white dark:bg-gray-950">
                <p className="text-6xl mb-4">🖼️</p>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('wallpaperDetail.notFoundTitle')}</h1>
                <p className="text-gray-400 mb-6">{t('wallpaperDetail.notFoundHint')}</p>
                <Link to="/wallpapers"
                      className="px-5 py-2.5 bg-gray-950 dark:bg-white text-white dark:text-gray-950 rounded-full text-sm font-semibold hover:opacity-80 transition-opacity">
                    {t('wallpaperDetail.backToWallpapers')}
                </Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950">
            {showInstallModal && <InstallModal onClose={closeInstallModal} />}
            <SEO title={t('wallpaperDetail.seoTitle', { title: wallpaper.title })} description={wallpaper.description} url={`/wallpapers/${wallpaper.id}`} image={wallpaper.poster} />

            <DetailNavbar backTo="/wallpapers" title={wallpaper.title} />

            <div className="pt-16">
                <PreviewBlock wallpaper={wallpaper} />

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <div className="grid lg:grid-cols-3 gap-10">

                        {/* Левая: описание + похожие */}
                        <div className="lg:col-span-2 min-w-0 space-y-8">
                            <div>
                                <h1 className="text-3xl font-black text-gray-950 dark:text-white tracking-tight mb-3">
                                    {wallpaper.title}
                                </h1>
                                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                                    {wallpaper.description}
                                </p>
                                <div className="flex flex-wrap gap-1.5 mt-4">
                                    {wallpaper.tags.map(tag => (
                                        <span key={tag} className="px-2.5 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg">
                      {tag}
                    </span>
                                    ))}
                                </div>
                            </div>

                            {similar.length > 0 && (
                                <div>
                                    <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4">{t('wallpaperDetail.similar')}</h2>
                                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {similar.map(w => <SimilarCard key={w.id} wallpaper={w} />)}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Правая: кнопки + мета */}
                        <div className="min-w-0 space-y-4">

                            {/* Кнопки */}
                            <div className="p-5 bg-gray-50 dark:bg-gray-900 rounded-2xl space-y-3">
                                {/* Скачать (video / image) */}
                                {!isWeb && (
                                    <a
                                        href={wallpaper.src}
                                        download
                                        className="flex items-center justify-center gap-2 w-full py-3 bg-gray-950 dark:bg-white text-white dark:text-gray-950 text-sm font-bold rounded-xl hover:opacity-90 active:scale-[0.98] transition-all"
                                    >
                                        <Download className="w-4 h-4" />
                                        {t('wallpaperDetail.download')}
                                        {displayMeta.size && !displayMeta.loading && (
                                            <span className="opacity-60">· {displayMeta.size}</span>
                                        )}
                                        {displayMeta.loading && (
                                            <span className="inline-block h-3 w-14 bg-white/30 rounded animate-pulse" />
                                        )}
                                    </a>
                                )}

                                {/* Открыть HTML (web) */}
                                {isWeb && (
                                    <a
                                        href={wallpaper.src}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 w-full py-3 bg-gray-950 dark:bg-white text-white dark:text-gray-950 text-sm font-bold rounded-xl hover:opacity-90 active:scale-[0.98] transition-all"
                                    >
                                        <Globe className="w-4 h-4" />
                                        {t('wallpaperDetail.openInTab')}
                                    </a>
                                )}

                                <button
                                    onClick={handleApplyInVK}
                                    className="hidden lg:flex items-center justify-center gap-2 w-full py-3 bg-[#0077ff] hover:bg-blue-500 text-white text-sm font-bold rounded-xl active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-wait"
                                >
                                    {applied
                                        ? <><Check className="w-4 h-4" /> {t('detail.applied')}</>
                                        : <><Zap className="w-4 h-4" /> {t('detail.apply')}</>
                                    }
                                </button>

                                {/* Поделиться */}
                                <button
                                    onClick={handleShare}
                                    className="flex items-center justify-center gap-2 w-full py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 active:scale-[0.98] transition-all"
                                >
                                    {share.copied
                                        ? <><Check className="w-4 h-4 text-green-500" /> {t('detail.copied')}</>
                                        : <><Copy className="w-4 h-4" /> {t('detail.copyLink')}</>
                                    }
                                </button>
                            </div>

                            {/* Характеристики — с skeleton для загружаемых полей */}
                            <div className="p-5 bg-gray-50 dark:bg-gray-900 rounded-2xl">
                                <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">
                                    {t('wallpaperDetail.specs')}
                                </h3>
                                <InfoRow label={t('wallpaperDetail.specResolution')} value={displayMeta.resolution} loading={displayMeta.loading && !displayMeta.resolution} />
                                <InfoRow label={t('wallpaperDetail.specFormat')}     value={displayMeta.format}     loading={false} />
                                <InfoRow label={t('wallpaperDetail.specSize')}       value={displayMeta.size}       loading={displayMeta.loading && !displayMeta.size} />
                                {(displayMeta.duration || isVideo) && (
                                    <InfoRow label={t('wallpaperDetail.specDuration')} value={displayMeta.duration} loading={displayMeta.loading && !displayMeta.duration} />
                                )}
                                {category && (
                                    <InfoRow label={t('wallpaperDetail.specCategory')} value={`${category.emoji} ${t(`wallpapersPage.categories.${category.id}`)}`} loading={false} />
                                )}
                            </div>

                            {/* Подсказка */}
                            <ExtensionHint
                                detected={detected}
                                connectedTail={t('wallpaperDetail.hintConnected')}
                                disconnectedText={t('wallpaperDetail.hintDisconnected')}
                            />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
