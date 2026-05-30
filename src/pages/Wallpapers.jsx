/**
 * /wallpapers — каталог обоев (Wallpaper Engine + статичные)
 * - Три типа: изображение, видео, веб
 * - Фильтр по типу и по категории
 * - Превью: img / video-on-hover / iframe-on-hover (без скролла)
 */
import { useState, useMemo, useDeferredValue, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Image as ImageIcon, Play, Globe, Search } from 'lucide-react'
import SEO from '../components/common/SEO'
import { pluralizeRu } from '../utils/colors'
import { wallpapers, WALLPAPER_TYPES, CATEGORIES } from '../data/wallpapers'
import { useTranslation } from '../i18n'

const TYPE_FILTERS = ['all', WALLPAPER_TYPES.IMAGE, WALLPAPER_TYPES.VIDEO, WALLPAPER_TYPES.WEB]

const TYPE_BADGE = {
    [WALLPAPER_TYPES.IMAGE]: { icon: ImageIcon, color: 'bg-emerald-500/80' },
    [WALLPAPER_TYPES.VIDEO]: { icon: Play,       color: 'bg-violet-500/80'  },
    [WALLPAPER_TYPES.WEB]:   { icon: Globe,      color: 'bg-blue-500/80'    },
}

function WallpaperCard({ wallpaper }) {
    const { t } = useTranslation()
    const videoRef = useRef(null)
    const [hovered,  setHovered]  = useState(false)
    const [playing,  setPlaying]  = useState(false) // для touch-устройств

    const isVideo   = wallpaper.type === WALLPAPER_TYPES.VIDEO
    const isWeb     = wallpaper.type === WALLPAPER_TYPES.WEB
    const badge     = TYPE_BADGE[wallpaper.type]
    const BadgeIcon = badge?.icon

    // Hover (мышь)
    const handleEnter = () => {
        setHovered(true)
        if (isVideo && videoRef.current) {
            videoRef.current.currentTime = 0
            videoRef.current.play().catch(() => {})
        }
    }
    const handleLeave = () => {
        setHovered(false)
        if (isVideo && videoRef.current) {
            videoRef.current.pause()
            videoRef.current.currentTime = 0
        }
    }

    // Touch: кнопка воспроизведения/паузы
    const handleTouchPlay = (e) => {
        if (!isVideo) return
        e.preventDefault()
        if (playing) {
            videoRef.current?.pause()
            setPlaying(false)
        } else {
            videoRef.current.currentTime = 0
            videoRef.current.play().catch(() => {})
            setPlaying(true)
        }
    }

    return (
        <Link
            to={`/wallpapers/${wallpaper.id}`}
            className="group block"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
        >
            {/* Превью */}
            <div className="relative rounded-2xl overflow-hidden bg-gray-900"
                 style={{ aspectRatio: '16/9' }}>

                {/* ── Изображение ─────────────────────────────────────────── */}
                {!isWeb && (
                    <img
                        src={wallpaper.poster || wallpaper.src}
                        alt={wallpaper.title}
                        loading="lazy"
                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-300
                            group-hover:scale-105
                            ${isVideo ? (hovered ? 'opacity-0' : 'opacity-100') : ''}`}
                    />
                )}

                {/* ── Видео: играет только при наведении ──────────────────── */}
                {isVideo && (
                    <video
                        ref={videoRef}
                        muted loop playsInline preload="none"
                        className={`absolute inset-0 w-full h-full object-cover pointer-events-none
                            transition-opacity duration-150
                            ${hovered ? 'opacity-100' : 'opacity-0'}`}
                    >
                        {wallpaper.srcWebm && <source src={wallpaper.srcWebm} type="video/webm" />}
                        <source src={wallpaper.src} type="video/mp4" />
                    </video>
                )}

                {/* ── Веб: iframe всегда в DOM, src меняется при наведении ── */}
                {isWeb && (
                    <>
                        {/* Постер/GIF — виден когда нет hover */}
                        {wallpaper.poster ? (
                            <img
                                src={wallpaper.poster}
                                alt={wallpaper.title}
                                loading="lazy"
                                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-150 pointer-events-none z-10
                                    ${hovered ? 'opacity-0' : 'opacity-100'}`}
                            />
                        ) : (
                            <div
                                className={`absolute inset-0 z-10 flex flex-col items-center justify-center gap-2
                                            bg-gray-900 transition-opacity duration-150 pointer-events-none
                                            ${hovered ? 'opacity-0' : 'opacity-100'}`}
                            >
                                <Globe className="w-10 h-10 text-gray-600" />
                                <span className="text-[10px] text-gray-600 font-medium tracking-wide">
                                    {t('wallpapersPage.hoverPreview')}
                                </span>
                            </div>
                        )}

                        {/* iframe: всегда смонтирован, src подключается только при hover */}
                        <iframe
                            src={hovered ? wallpaper.src : 'about:blank'}
                            title={wallpaper.title}
                            sandbox="allow-scripts"
                            scrolling="no"
                            tabIndex={-1}
                            className="absolute inset-0 w-full h-full border-0 pointer-events-none"
                            style={{ overflow: 'hidden' }}
                        />
                    </>
                )}

                {/* Затемнение при наведении */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-150 z-20" />

                {/* Значок «Открыть» (hover на мышью) */}
                <div className="absolute inset-0 z-30 flex items-center justify-center
                                opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0
                                transition-all duration-200 pointer-events-none">
                    <span className="px-3 py-1.5 bg-white/90 dark:bg-gray-950/90 text-gray-900 dark:text-white
                                     text-[11px] font-bold rounded-full shadow-lg tracking-widest uppercase">
                        {t('wallpapersPage.open')}
                    </span>
                </div>

                {/* Touch: кнопка Play/Pause для видео */}
                {isVideo && (
                    <button
                        onTouchEnd={handleTouchPlay}
                        aria-label={playing ? t('wallpapersPage.pause') : t('wallpapersPage.play')}
                        className="absolute bottom-2.5 right-2.5 z-30 sm:hidden
                                   w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm
                                   flex items-center justify-center text-white"
                    >
                        {playing
                            ? <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                            : <Play className="w-3.5 h-3.5 ml-0.5" />
                        }
                    </button>
                )}

                {/* Бейдж типа */}
                {badge && (
                    <div className="absolute top-2.5 left-2.5 z-30 pointer-events-none">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full
                                         text-[10px] font-semibold text-white backdrop-blur-sm ${badge.color}`}>
                            {BadgeIcon && <BadgeIcon className="w-2.5 h-2.5" />}
                            {t(`wallpapersPage.typeBadge.${wallpaper.type}`)}
                        </span>
                    </div>
                )}

                {/* Пульс «Живая анимация» для веб — показывается только при hover */}
                {isWeb && hovered && (
                    <div className="absolute bottom-2.5 right-2.5 z-30 pointer-events-none">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full
                                         text-[10px] font-semibold text-white bg-blue-500/70 backdrop-blur-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                            {t('wallpapersPage.liveAnimation')}
                        </span>
                    </div>
                )}
            </div>

            {/* Подпись */}
            <div className="mt-2.5 px-0.5">
                <p className="text-xs font-semibold text-gray-900 dark:text-white truncate
                              group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {wallpaper.title}
                </p>
                <div className="flex gap-1 mt-0.5 flex-wrap">
                    {wallpaper.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-[10px] text-gray-400 dark:text-gray-500 capitalize">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </Link>
    )
}

export default function Wallpapers() {
    const { t, lang } = useTranslation()
    const [search,         setSearch]         = useState('')
    const [activeType,     setActiveType]     = useState('all')
    const [activeCategory, setActiveCategory] = useState('all')

    const deferredSearch = useDeferredValue(search)

    // Сбрасываем категорию при смене типа
    const handleTypeChange = (type) => {
        setActiveType(type)
        setActiveCategory('all')
    }

    const filtered = useMemo(() => {
        const q = deferredSearch.toLowerCase()
        return wallpapers.filter(w => {
            const matchSearch = !q ||
                w.title.toLowerCase().includes(q) ||
                (w.tags && w.tags.some(t => t.toLowerCase().includes(q)))
            const typeMatch = activeType === 'all' || w.type === activeType
            const catMatch  = activeCategory === 'all' || w.category === activeCategory
            return matchSearch && typeMatch && catMatch
        })
    }, [deferredSearch, activeType, activeCategory])

    // Категории, у которых есть обои в текущем type-фильтре
    const availableCategories = CATEGORIES.filter(cat =>
        wallpapers.some(w =>
            w.category === cat.id && (activeType === 'all' || w.type === activeType)
        )
    )

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950">
            <SEO
                title={t('wallpapersPage.seoTitle')}
                description={t('wallpapersPage.seoDescription')}
                url="/wallpapers"
            />

            <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

                {/* Hero */}
                <div className="mb-10">
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest
                                    text-blue-600 dark:text-blue-400 uppercase mb-3">
                        <ImageIcon className="w-3.5 h-3.5" />
                        {lang === 'ru'
                            ? `${wallpapers.length} ${pluralizeRu(wallpapers.length, 'обой', 'обоя', 'обоев')} доступно`
                            : t('wallpapersPage.count', { count: wallpapers.length })}
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-black text-gray-950 dark:text-white leading-none tracking-tight mb-4">
                        {t('wallpapersPage.titleTop')}<br />
                        <span className="text-gray-400 dark:text-gray-600">{t('wallpapersPage.titleBottom')}</span>
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 max-w-lg">
                        {t('wallpapersPage.subtitle')}
                    </p>
                </div>

                {/* Поиск */}
                <div className="relative mb-5">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder={t('wallpapersPage.searchPlaceholder')}
                        className="w-full pl-11 pr-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800
                                   rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400
                                   focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/10 transition-all text-sm"
                    />
                </div>

                {/* Фильтр по типу */}
                <div className="flex flex-wrap gap-2 mb-3">
                    {TYPE_FILTERS.map(id => (
                        <button
                            key={id}
                            onClick={() => handleTypeChange(id)}
                            aria-pressed={activeType === id}
                            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150
                                ${activeType === id
                                    ? 'bg-gray-950 dark:bg-white text-white dark:text-gray-950 shadow-sm'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                                }`}
                        >
                            {t(`wallpapersPage.typeFilters.${id}`)}
                        </button>
                    ))}
                </div>

                {/* Фильтр по категориям */}
                {availableCategories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-8">
                        <button
                            onClick={() => setActiveCategory('all')}
                            aria-pressed={activeCategory === 'all'}
                            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150
                                ${activeCategory === 'all'
                                    ? 'bg-blue-600 text-white shadow-sm'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                                }`}
                        >
                            {t('wallpapersPage.allCategories')}
                        </button>
                        {availableCategories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                aria-pressed={activeCategory === cat.id}
                                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150
                                    ${activeCategory === cat.id
                                        ? 'bg-blue-600 text-white shadow-sm'
                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                                    }`}
                            >
                                {cat.emoji} {t(`wallpapersPage.categories.${cat.id}`)}
                            </button>
                        ))}
                    </div>
                )}

                {/* Сетка — 3 в ряд для заметного превью */}
                {filtered.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map(w => (
                            <WallpaperCard key={w.id} wallpaper={w} />
                        ))}
                    </div>
                ) : (
                    <div className="py-20 text-center text-gray-400 dark:text-gray-600">
                        <p className="text-lg mb-1">{t('wallpapersPage.notFoundTitle')}</p>
                        <p className="text-sm">{t('wallpapersPage.notFoundHint')}</p>
                    </div>
                )}

                {/* Инструкция */}
                <div className="mt-16 p-8 bg-gray-50 dark:bg-gray-900 rounded-3xl">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-5">{t('wallpapersPage.howTitle')}</h2>
                    <div className="grid sm:grid-cols-3 gap-6">
                        {t('wallpapersPage.steps').map((s, i) => (
                            <div key={i} className="flex gap-3">
                                <div className="w-7 h-7 rounded-full bg-gray-950 dark:bg-white text-white dark:text-gray-950
                                                text-xs font-bold flex items-center justify-center flex-shrink-0">
                                    {i + 1}
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{s.title}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{s.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}