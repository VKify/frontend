import { Palette, Type, Image, Sliders, Layers, Settings2, EyeOff } from 'lucide-react'
import { useGoogleFont } from '../../hooks/useGoogleFont'
import { parseVideoUrl, platformLabel } from '../../utils/videoEmbed'

export const GROUPS = [
    { id: 'colors',     label: 'Цвета и тема',    Icon: Palette   },
    { id: 'font',       label: 'Шрифт',            Icon: Type      },
    { id: 'shape',      label: 'Форма и размер',   Icon: Sliders   },
    { id: 'background', label: 'Фон',              Icon: Image     },
    { id: 'filters',    label: 'Фильтры',          Icon: Layers    },
    { id: 'modes',      label: 'Режимы',           Icon: Settings2 },
    { id: 'elements',   label: 'Скрытые элементы', Icon: EyeOff   },
]

export const PARAM_META = {
    custom_theme_id:            { label: 'Пресет',                  group: 'colors' },
    custom_theme:               { label: 'Цвет фона',               group: 'colors',     type: 'color' },
    custom_accent:              { label: 'Акцентный цвет',          group: 'colors',     type: 'color' },
    block_opacity:              { label: 'Прозрачность блоков',     group: 'colors',     type: 'opacity' },
    glass_blur:                 { label: 'Размытие стекла',         group: 'colors',     type: 'px' },
    theme_radius:               { label: 'Радиус темы',             group: 'colors',     type: 'px' },
    custom_font_id:             { label: 'Шрифт',                   group: 'font' },
    custom_font_value:          { label: 'CSS значение',            group: 'font',       hidden: true },
    custom_font_size:           { label: 'Размер',                  group: 'font',       type: 'px' },
    custom_line_height:         { label: 'Межстрочный интервал',    group: 'font' },
    custom_letter_spacing:      { label: 'Межбуквенный',            group: 'font',       type: 'px' },
    custom_font_weight:         { label: 'Начертание',              group: 'font' },
    custom_font_style:          { label: 'Стиль',                   group: 'font' },
    custom_text_decoration:     { label: 'Оформление текста',       group: 'font' },
    custom_text_transform:      { label: 'Регистр',                 group: 'font' },
    border_radius:              { label: 'Скругление',              group: 'shape',      type: 'px' },
    content_width_enabled:      { label: 'Расширить контент',       group: 'shape',      type: 'bool' },
    content_width:              { label: 'Ширина контента',         group: 'shape',      type: 'px' },
    compact_spacing:            { label: 'Компактный режим',        group: 'modes',      type: 'bool' },
    page_offset_enabled:        { label: 'Смещение страницы',       group: 'modes',      type: 'bool' },
    page_offset_value:          { label: 'Величина смещения',       group: 'modes',      type: 'px' },
    custom_background:          { label: 'Источник фона',           group: 'background', type: 'url' },
    background_type:            { label: 'Тип фона',                group: 'background', type: 'bgtype' },
    background_opacity:         { label: 'Прозрачность',            group: 'background', type: 'percent' },
    background_blur:            { label: 'Размытие',                group: 'background', type: 'px' },
    background_dim:             { label: 'Затемнение',              group: 'background', type: 'percent' },
    background_brightness:      { label: 'Яркость',                 group: 'background', type: 'percent' },
    background_contrast:        { label: 'Контраст',                group: 'background', type: 'percent' },
    background_saturation:      { label: 'Насыщенность',            group: 'background', type: 'percent' },
    background_hue_rotate:      { label: 'Поворот цвета',           group: 'background', type: 'deg' },
    background_sepia:           { label: 'Сепия',                   group: 'background', type: 'percent' },
    background_grayscale:       { label: 'Оттенки серого',          group: 'background', type: 'percent' },
    background_scale:           { label: 'Масштаб',                 group: 'background', type: 'scale' },
    background_position:        { label: 'Позиция',                 group: 'background' },
    background_size:            { label: 'Размер',                  group: 'background' },
    background_overlay_color:   { label: 'Цвет оверлея',            group: 'background', type: 'color' },
    background_overlay_opacity: { label: 'Прозрачность оверлея',    group: 'background', type: 'percent' },
    background_vignette:        { label: 'Виньетка',                group: 'background', type: 'percent' },
    background_video_speed:     { label: 'Скорость видео',          group: 'background', type: 'speed' },
    background_video_volume:    { label: 'Громкость видео',         group: 'background', type: 'percent' },
    filter_grayscale:           { label: 'Чёрно-белый',             group: 'filters',    type: 'bool' },
    filter_sepia:               { label: 'Сепия',                   group: 'filters',    type: 'bool' },
    filter_invert:              { label: 'Инверсия',                group: 'filters',    type: 'bool' },
    filter_dim_images:          { label: 'Тёмные изображения',      group: 'filters',    type: 'bool' },
    filter_high_contrast:       { label: 'Высокий контраст',        group: 'filters',    type: 'bool' },
    filter_low_brightness:      { label: 'Низкая яркость',          group: 'filters',    type: 'bool' },
    minimalistic_sidebar:       { label: 'Компактное меню',         group: 'modes',      type: 'bool' },
    fixed_sidebar:              { label: 'Фиксированное меню',      group: 'modes',      type: 'bool' },
    sidebar_with_background:    { label: 'Меню с фоном',            group: 'modes',      type: 'bool' },
    collapse_search:            { label: 'Свернуть поиск',          group: 'modes',      type: 'bool' },
    hide_stories:               { label: 'Истории',                 group: 'elements',   type: 'bool' },
    hide_recommendations:       { label: 'Рекомендации',            group: 'elements',   type: 'bool' },
    hide_friends_suggestions:   { label: 'Возможные друзья',        group: 'elements',   type: 'bool' },
    hide_emoji_status:          { label: 'Эмодзи-статусы',          group: 'elements',   type: 'bool' },
    hide_mini_chat:             { label: 'Мини-чат',                group: 'elements',   type: 'bool' },
    hide_scroll_top:            { label: 'Кнопка «Наверх»',         group: 'elements',   type: 'bool' },
    hide_menu_settings:         { label: 'Настройки в меню',        group: 'elements',   type: 'bool' },
    hide_auth_popup:            { label: 'Окно авторизации',        group: 'elements',   type: 'bool' },
}

const BG_TYPE_LABELS = {
    image: 'Изображение', video: 'Видео',
    web: 'Веб-страница',  embed: 'Встраиваемый',
    color: 'Цвет',        gradient: 'Градиент',
}

function extractFontFamily(cssValue) {
    if (!cssValue) return null
    const match = cssValue.match(/["']([^"']+)["']/)
    return match ? match[1] : cssValue.split(',')[0].trim()
}

function formatValue(key, raw) {
    const meta = PARAM_META[key]
    if (!meta) return String(raw)
    const n = Number(raw)
    switch (meta.type) {
        case 'percent': return `${Math.round(n)}%`
        case 'opacity': return `${Math.round(n * 100)}%`
        case 'px':      return `${raw}px`
        case 'deg':     return `${raw}°`
        case 'scale':   return `${n}%`
        case 'speed':   return `${n}×`
        case 'color':   return String(raw).toUpperCase()
        case 'bool':    return raw ? 'Включено' : 'Выключено'
        case 'bgtype':  return BG_TYPE_LABELS[raw] ?? String(raw)
        case 'url': {
            const s = String(raw)
            if (/^chrome-extension:|^moz-extension:/i.test(s)) return 'Файл из расширения'
            const p = parseVideoUrl(s)
            if (p) return platformLabel(p.platform)
            return s.length > 42 ? s.slice(0, 40) + '…' : s
        }
        default: return String(raw)
    }
}

function ParamRow({ paramKey, value }) {
    const meta = PARAM_META[paramKey]
    if (meta?.hidden) return null

    const label   = meta?.label ?? paramKey.replace(/_/g, ' ')
    const display = formatValue(paramKey, value)
    const isColor = meta?.type === 'color' && typeof value === 'string' && value.startsWith('#')
    const isBool  = meta?.type === 'bool'

    return (
        <div className="flex items-center justify-between py-2.5 border-b border-gray-100 dark:border-gray-800/80 last:border-0 gap-4">
            <span className="text-sm text-gray-500 dark:text-gray-400 shrink-0">{label}</span>
            <div className="flex items-center gap-2 min-w-0">
                {isColor && (
                    <div className="w-4 h-4 rounded border border-black/10 dark:border-white/10 shadow-sm shrink-0"
                         style={{ background: value }} />
                )}
                <span className={[
                    'text-sm font-medium truncate',
                    isBool && value  ? 'text-green-600 dark:text-green-400' : '',
                    isBool && !value ? 'text-gray-400 dark:text-gray-600'   : '',
                    !isBool          ? 'font-mono text-gray-900 dark:text-white' : '',
                ].join(' ')}>
                    {display}
                </span>
            </div>
        </div>
    )
}

export function ParamGroup({ groupId, settings }) {
    const group = GROUPS.find(g => g.id === groupId)
    if (!group) return null

    const entries = Object.entries(settings).filter(([key, val]) => {
        const meta = PARAM_META[key]
        return meta?.group === groupId && !meta?.hidden && val !== undefined && val !== null && val !== ''
    })
    if (entries.length === 0) return null

    const { Icon } = group

    return (
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden">
            <div className="flex items-center gap-2.5 px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                <Icon className="w-4 h-4 text-gray-400 dark:text-gray-500 shrink-0" />
                <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    {group.label}
                </span>
                <span className="ml-auto text-xs text-gray-400 dark:text-gray-600">{entries.length}</span>
            </div>
            <div className="px-4">
                {entries.map(([key, value]) => (
                    <ParamRow key={key} paramKey={key} value={value} />
                ))}
            </div>
        </div>
    )
}

export function ColorStrip({ settings }) {
    const colors = []
    if (settings.custom_theme)             colors.push({ color: settings.custom_theme,             label: 'Фон' })
    if (settings.custom_accent)            colors.push({ color: settings.custom_accent,            label: 'Акцент' })
    if (settings.background_overlay_color) colors.push({ color: settings.background_overlay_color, label: 'Оверлей' })
    if (!colors.length) return null

    return (
        <div className="flex gap-3">
            {colors.map(({ color, label }) => (
                <div key={label} className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl border border-black/10 dark:border-white/10 shadow-sm"
                         style={{ background: color }} />
                    <div>
                        <p className="text-[10px] text-gray-400 dark:text-gray-500">{label}</p>
                        <p className="text-xs font-mono font-bold text-gray-700 dark:text-gray-300 uppercase">{color}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export function FontSample({ settings }) {
    const fontFamily = extractFontFamily(settings.custom_font_value)
    useGoogleFont(fontFamily)
    if (!fontFamily || settings.custom_font_id === 'default' || settings.custom_font_id === 'system') return null

    return (
        <div className="p-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl">
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-2 font-medium">Образец шрифта</p>
            <p style={{ fontFamily }} className="text-2xl text-gray-900 dark:text-white font-semibold">
                {fontFamily}
            </p>
            <p style={{ fontFamily }} className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                ВКонтакте выглядит именно так — удобно и красиво.
            </p>
        </div>
    )
}