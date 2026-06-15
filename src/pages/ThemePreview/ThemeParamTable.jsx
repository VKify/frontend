import { Palette, Type, Image, Sliders, Layers, Settings2, EyeOff } from 'lucide-react'
import { useGoogleFont } from '../../hooks/useGoogleFont'
import { parseVideoUrl, platformLabel } from '../../utils/videoEmbed'
import { useTranslation } from '../../i18n'

// Только структура (id + иконка); подписи групп — из i18n: paramMeta.groups.<id>
export const GROUPS = [
    { id: 'colors',     Icon: Palette   },
    { id: 'font',       Icon: Type      },
    { id: 'shape',      Icon: Sliders   },
    { id: 'background', Icon: Image     },
    { id: 'filters',    Icon: Layers    },
    { id: 'modes',      Icon: Settings2 },
    { id: 'elements',   Icon: EyeOff   },
]

// Только группа/тип/видимость; подписи — из i18n: paramMeta.labels.<key>
export const PARAM_META = {
    custom_theme_id:            { group: 'colors' },
    custom_theme:               { group: 'colors',     type: 'color' },
    custom_accent:              { group: 'colors',     type: 'color' },
    block_opacity:              { group: 'colors',     type: 'opacity' },
    glass_blur:                 { group: 'colors',     type: 'px' },
    theme_radius:               { group: 'colors',     type: 'px' },
    block_depth:                { group: 'colors',     type: 'bool' },
    custom_font_id:             { group: 'font' },
    custom_font_value:          { group: 'font',       hidden: true },
    custom_font_size:           { group: 'font',       type: 'px' },
    custom_line_height:         { group: 'font' },
    custom_letter_spacing:      { group: 'font',       type: 'px' },
    custom_font_weight:         { group: 'font' },
    custom_font_style:          { group: 'font' },
    custom_text_decoration:     { group: 'font' },
    custom_text_transform:      { group: 'font' },
    border_radius:              { group: 'shape',      type: 'percent' },
    avatar_radius_shape:        { group: 'shape',      type: 'shape' },
    content_width_enabled:      { group: 'shape',      type: 'bool' },
    content_width:              { group: 'shape',      type: 'px' },
    compact_spacing:            { group: 'modes',      type: 'bool' },
    page_offset_enabled:        { group: 'modes',      type: 'bool' },
    page_offset_value:          { group: 'modes',      type: 'px' },
    custom_background:          { group: 'background', type: 'url' },
    background_type:            { group: 'background', type: 'bgtype' },
    background_opacity:         { group: 'background', type: 'percent' },
    background_blur:            { group: 'background', type: 'px' },
    background_dim:             { group: 'background', type: 'percent' },
    background_brightness:      { group: 'background', type: 'percent' },
    background_contrast:        { group: 'background', type: 'percent' },
    background_saturation:      { group: 'background', type: 'percent' },
    background_hue_rotate:      { group: 'background', type: 'deg' },
    background_sepia:           { group: 'background', type: 'percent' },
    background_grayscale:       { group: 'background', type: 'percent' },
    background_scale:           { group: 'background', type: 'scale' },
    background_position:        { group: 'background' },
    background_size:            { group: 'background' },
    background_overlay_color:   { group: 'background', type: 'color' },
    background_overlay_opacity: { group: 'background', type: 'percent' },
    background_vignette:        { group: 'background', type: 'percent' },
    background_video_speed:     { group: 'background', type: 'speed' },
    background_video_volume:    { group: 'background', type: 'percent' },
    filter_grayscale:           { group: 'filters',    type: 'bool' },
    filter_sepia:               { group: 'filters',    type: 'bool' },
    filter_invert:              { group: 'filters',    type: 'bool' },
    filter_dim_images:          { group: 'filters',    type: 'bool' },
    filter_high_contrast:       { group: 'filters',    type: 'bool' },
    filter_low_brightness:      { group: 'filters',    type: 'bool' },
    minimalistic_sidebar:       { group: 'modes',      type: 'bool' },
    fixed_sidebar:              { group: 'modes',      type: 'bool' },
    sidebar_with_background:    { group: 'modes',      type: 'bool' },
    collapse_search:            { group: 'modes',      type: 'bool' },
    hide_stories:               { group: 'elements',   type: 'bool' },
    hide_post_box:              { group: 'elements',   type: 'bool' },
    hide_post_comments:         { group: 'elements',   type: 'bool' },
    hide_recommendations:       { group: 'elements',   type: 'bool' },
    hide_friends_suggestions:   { group: 'elements',   type: 'bool' },
    hide_emoji_status:          { group: 'elements',   type: 'bool' },
    hide_mini_chat:             { group: 'elements',   type: 'bool' },
    hide_scroll_top:            { group: 'elements',   type: 'bool' },
    hide_menu_settings:         { group: 'elements',   type: 'bool' },
    hide_menu_counters:         { group: 'elements',   type: 'bool' },
    hide_audio_ads:             { group: 'elements',   type: 'bool' },
    hide_recent_groups:         { group: 'elements',   type: 'bool' },
    hide_recommended_channels:  { group: 'elements',   type: 'bool' },
    hide_auth_popup:            { group: 'elements',   type: 'bool' },
}

function extractFontFamily(cssValue) {
    if (!cssValue) return null
    const match = cssValue.match(/["']([^"']+)["']/)
    return match ? match[1] : cssValue.split(',')[0].trim()
}

function formatValue(key, raw, t) {
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
        case 'bool':    return raw ? t('paramMeta.enabled') : t('paramMeta.disabled')
        case 'bgtype':  return t(`paramMeta.bgTypes.${raw}`)
        case 'shape':   return t(`paramMeta.shapes.${raw}`)
        case 'url': {
            const s = String(raw)
            if (/^chrome-extension:|^moz-extension:/i.test(s)) return t('paramMeta.extFile')
            const p = parseVideoUrl(s)
            if (p) return platformLabel(p.platform)
            return s.length > 42 ? s.slice(0, 40) + '…' : s
        }
        default: return String(raw)
    }
}

// Диапазоны слайдеров для числовых типов (min, max, step)
const SLIDER_RANGE = {
    opacity: [0, 1, 0.05],
    percent: [0, 200, 1],
    deg:     [0, 360, 1],
    scale:   [50, 200, 1],
    speed:   [10, 400, 5],
}
// Диапазоны для px-параметров (у каждого свой масштаб)
const PX_RANGE = {
    block_opacity:         [0, 1, 0.05],
    glass_blur:            [0, 40, 1],
    theme_radius:          [0, 24, 1],
    border_radius:         [0, 50, 5],
    content_width:         [800, 1800, 10],
    page_offset_value:     [0, 100, 1],
    custom_font_size:      [10, 28, 1],
    custom_letter_spacing: [-3, 10, 0.5],
    background_blur:       [0, 40, 1],
}

// Редактор одного параметра — тип контрола зависит от meta.type
function ParamEditor({ paramKey, value, meta, onChange }) {
    const { t } = useTranslation()
    const type = meta?.type

    if (type === 'bool') {
        const on = !!value
        return (
            <button
                type="button"
                onClick={() => onChange(paramKey, !on)}
                className={`relative w-10 h-6 rounded-full transition-colors shrink-0 ${on ? 'bg-[#0077ff]' : 'bg-gray-300 dark:bg-gray-700'}`}
                aria-pressed={on}
            >
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${on ? 'translate-x-4' : ''}`} />
            </button>
        )
    }

    if (type === 'shape') {
        const shapes = ['', 'drop', 'leaf', 'petal', 'blob']
        return (
            <select
                value={shapes.includes(value) ? value : ''}
                onChange={e => onChange(paramKey, e.target.value)}
                className="text-sm font-medium text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1 shrink-0 cursor-pointer"
            >
                {shapes.map(s => (
                    <option key={s || 'custom'} value={s}>{t(`paramMeta.shapes.${s || 'none'}`)}</option>
                ))}
            </select>
        )
    }

    if (type === 'color' && typeof value === 'string') {
        return (
            <div className="flex items-center gap-2 shrink-0">
                <input
                    type="color"
                    value={/^#[0-9a-f]{6}$/i.test(value) ? value : '#000000'}
                    onChange={e => onChange(paramKey, e.target.value)}
                    className="w-7 h-7 rounded-lg border border-black/10 dark:border-white/10 bg-transparent cursor-pointer p-0"
                />
                <span className="text-xs font-mono text-gray-900 dark:text-white uppercase w-16">{String(value).toUpperCase()}</span>
            </div>
        )
    }

    // Числовые слайдеры
    const range = PX_RANGE[paramKey] || SLIDER_RANGE[type]
    if (range) {
        const [min, max, step] = range
        const num = Number(value)
        return (
            <div className="flex items-center gap-2.5 shrink-0">
                <input
                    type="range"
                    min={min} max={max} step={step}
                    value={Number.isFinite(num) ? num : min}
                    onChange={e => onChange(paramKey, Number(e.target.value))}
                    className="w-28 accent-[#0077ff] cursor-pointer"
                />
                <span className="text-xs font-mono text-gray-900 dark:text-white w-14 text-right">
                    {formatValue(paramKey, value, t)}
                </span>
            </div>
        )
    }

    // Остальное — текстовое поле
    return (
        <input
            type="text"
            value={value ?? ''}
            onChange={e => onChange(paramKey, e.target.value)}
            className="text-sm font-mono text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1 w-40 min-w-0"
        />
    )
}

function ParamRow({ paramKey, value, onChange }) {
    const { t } = useTranslation()
    const meta = PARAM_META[paramKey]
    if (meta?.hidden) return null

    const label   = t(`paramMeta.labels.${paramKey}`)
    const display = formatValue(paramKey, value, t)
    const isColor = meta?.type === 'color' && typeof value === 'string' && value.startsWith('#')
    const isBool  = meta?.type === 'bool'

    return (
        <div className="flex items-center justify-between py-2.5 border-b border-gray-100 dark:border-gray-800/80 last:border-0 gap-4">
            <span className="text-sm text-gray-500 dark:text-gray-400 shrink-0">{label}</span>
            {onChange ? (
                <ParamEditor paramKey={paramKey} value={value} meta={meta} onChange={onChange} />
            ) : (
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
            )}
        </div>
    )
}

export function ParamGroup({ groupId, settings, onChange }) {
    const { t } = useTranslation()
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
                    {t(`paramMeta.groups.${group.id}`)}
                </span>
                <span className="ml-auto text-xs text-gray-400 dark:text-gray-600">{entries.length}</span>
            </div>
            <div className="px-4">
                {entries.map(([key, value]) => (
                    <ParamRow key={key} paramKey={key} value={value} onChange={onChange} />
                ))}
            </div>
        </div>
    )
}

export function ColorStrip({ settings }) {
    const { t } = useTranslation()
    const colors = []
    if (settings.custom_theme)             colors.push({ color: settings.custom_theme,             label: t('paramMeta.strip.bg') })
    if (settings.custom_accent)            colors.push({ color: settings.custom_accent,            label: t('paramMeta.strip.accent') })
    if (settings.background_overlay_color) colors.push({ color: settings.background_overlay_color, label: t('paramMeta.strip.overlay') })
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
    const { t } = useTranslation()
    const fontFamily = extractFontFamily(settings.custom_font_value)
    useGoogleFont(fontFamily)
    if (!fontFamily || settings.custom_font_id === 'default' || settings.custom_font_id === 'system') return null

    return (
        <div className="p-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl">
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-2 font-medium">{t('paramMeta.fontSampleTitle')}</p>
            <p style={{ fontFamily }} className="text-2xl text-gray-900 dark:text-white font-semibold">
                {fontFamily}
            </p>
            <p style={{ fontFamily }} className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {t('paramMeta.fontSampleText')}
            </p>
        </div>
    )
}