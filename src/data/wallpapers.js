import config from '../config/index.js'

const BASE_URL = typeof window !== 'undefined'
    ? window.location.origin
    : config.app.url
const abs = (path) => `${BASE_URL}${path}`

export const WALLPAPER_TYPES = {
    VIDEO: 'video',
    IMAGE: 'image',
    WEB:   'web',
}

export const CATEGORIES = [
    { id: 'nature',   label: 'Природа',    emoji: '🌿' },
    { id: 'abstract', label: 'Абстракция', emoji: '✨' },
    { id: 'cars',     label: 'Автомобили', emoji: '🚗' },
    { id: 'anime',    label: 'Аниме',      emoji: '🎌' },
    { id: 'games',    label: 'Игры',       emoji: '🎮' },
    { id: 'space',    label: 'Космос',     emoji: '🌌' },
    { id: 'city',     label: 'Город',      emoji: '🏙️' },
]

export const wallpapers = [
    {
        id: 'gargantua-black',
        title: 'Gargantua',
        description: 'Чёрная дыра Гаргантюа из фильма «Интерстеллар» — фотореалистичная визуализация в разрешении 5K. Вращающийся аккреционный диск и искажение пространства-времени.',
        type: WALLPAPER_TYPES.IMAGE,
        category: 'space',
        workshopId: null,
        src:    '/wallpapers/images/gargantua-black.jpg',
        poster: '/wallpapers/images/gargantua-black.jpg',
        tags: ['гаргантюа', 'чёрная дыра', 'червоточина', 'интерстеллар', 'космос', '5k'],
        extensionConfig: {
            custom_background:   abs('/wallpapers/images/gargantua-black.jpg'),
            background_type:     'image',
            background_opacity:  100,
            background_dim:      10,
            background_blur:     0,
            background_position: 'center',
            background_size:     'cover',
        },
    },

    {
        id: 'leon-porsche',
        title: 'Leon in his Porsche',
        description: 'Леон из Resident Evil Requiem в чёрной кожаной куртке сидит за рулём своей машины, держа телефон в руке. За окном — ночь, проливной дождь, мигающие огни полицейских машин и криминалисты, исследующие место происшествия.',
        type: WALLPAPER_TYPES.VIDEO,
        category: 'games',
        workshopId: '2331556789',
        src:    '/wallpapers/video/2331556789/leon-in-his-porsche.mp4',
        srcWebm: null,
        poster: '/wallpapers/video/2331556789/preview.jpg',
        tags: ['автомобиль', 'porsche', 'ночь', 'дождь', 'игры'],
        extensionConfig: {
            custom_background:       abs('/wallpapers/video/2331556789/leon-in-his-porsche.mp4'),
            background_type:         'video',
            background_opacity:      100,
            background_dim:          10,
            background_video_speed:  100,
            background_video_volume: 0,
        },
    },

    {
        id: 'rainbow-matrix',
        title: 'Rainbow Matrix',
        description: 'Радужный дождь символов в стиле «Матрицы». Интерактивная Canvas-анимация, работающая прямо в браузере.',
        type: WALLPAPER_TYPES.WEB,
        category: 'abstract',
        workshopId: '2234955662',
        src:    '/wallpapers/web/2234955662/index.html',
        poster: '/wallpapers/web/2234955662/preview.gif',
        tags: ['матрица', 'абстракция', 'анимация', 'веб', 'радуга'],
        extensionConfig: {
            custom_background:  abs('/wallpapers/web/2234955662/index.html'),
            background_type:    'web',
            background_opacity: 100,
            background_dim:     0,
        },
    },
]

export const wallpaperIds = wallpapers.map(w => w.id)

export const getWallpaperById = (id) =>
    wallpapers.find(w => w.id === id) || null

export const getSimilarWallpapers = (wallpaper, limit = 3) =>
    wallpapers
        .filter(w => w.id !== wallpaper.id)
        .slice(0, limit)

export const detectFormat = (wallpaper) => {
    if (wallpaper.type === WALLPAPER_TYPES.WEB) return 'HTML'
    const src = wallpaper.src || ''
    if (src.includes('.webm'))                           return 'WebM'
    if (src.includes('.mp4'))                            return wallpaper.srcWebm ? 'MP4 / WebM' : 'MP4'
    if (src.includes('.jpg') || src.includes('.jpeg'))  return 'JPEG'
    if (src.includes('.png'))                            return 'PNG'
    if (src.includes('.webp'))                           return 'WebP'
    return null
}