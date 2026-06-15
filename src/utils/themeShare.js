/**
 * VKify Theme Share Utility
 * Кодирование/декодирование параметров темы для шаринга
 *
 * Формат: https://vkify.ru/theme/{base64url(JSON)}
 *
 * v:1 — полные имена ключей (legacy)
 * v:2 — короткие алиасы ключей + пропуск дефолтных значений (текущий)
 */

const SCHEMA_VERSION = 2;

/**
 * Все передаваемые параметры — вкладка «Вид» + вкладка «Элементы»
 */
const THEME_PARAMS = [
    // Тема
    'custom_theme',
    'custom_accent',
    'block_opacity',
    'glass_blur',
    'theme_radius',
    'block_depth',

    // Шрифт
    'custom_font_id',
    'custom_font_value',
    'custom_font_size',
    'custom_line_height',
    'custom_letter_spacing',
    'custom_font_weight',
    'custom_font_style',
    'custom_text_decoration',
    'custom_text_transform',

    // Скругление, ширина, смещение
    'border_radius',
    'avatar_radius_shape',
    'content_width',
    'content_width_enabled',
    'compact_spacing',
    'page_offset_enabled',
    'page_offset_value',
    'custom_theme_id',

    // Режим отображения
    'minimalistic_sidebar',
    'fixed_sidebar',
    'sidebar_with_background',
    'collapse_search',

    // Фон
    'custom_background',
    'background_type',
    'background_blur',
    'background_dim',
    'background_opacity',
    'background_brightness',
    'background_contrast',
    'background_saturation',
    'background_scale',
    'background_hue_rotate',
    'background_sepia',
    'background_grayscale',
    'background_position',
    'background_size',
    'background_overlay_color',
    'background_overlay_opacity',
    'background_vignette',
    'background_video_speed',
    'background_video_volume',

    // Визуальные фильтры
    'filter_grayscale',
    'filter_sepia',
    'filter_invert',
    'filter_dim_images',
    'filter_high_contrast',
    'filter_low_brightness',

    // Скрытые элементы (вкладка «Элементы»)
    'hide_stories',
    'hide_post_box',
    'hide_post_comments',
    'hide_recommendations',
    'hide_friends_suggestions',
    'hide_emoji_status',
    'hide_mini_chat',
    'hide_scroll_top',
    'hide_menu_settings',
    'hide_menu_counters',
    'hide_audio_ads',
    'hide_recent_groups',
    'hide_recommended_channels',
    'hide_auth_popup',
];

/**
 * Дефолтные значения — параметры с этими значениями в URL не сохраняются.
 * Значения соответствуют тому, что расширение хранит в chrome.storage.local.
 */
const DEFAULTS = {
    // block_opacity хранится как float 0.0–1.0 (1 = 100% = непрозрачный)
    block_opacity:             1,
    glass_blur:                0,
    theme_radius:              0,
    block_depth:               false,

    // custom_font_size = 0 означает «по умолчанию браузера»
    custom_font_size:          0,
    custom_line_height:        0,
    custom_letter_spacing:     0,
    custom_font_weight:        400,
    custom_font_style:         'normal',
    custom_text_decoration:    'none',
    custom_text_transform:     'none',

    border_radius:             0,
    // Расширение по умолчанию пишет content_width: 1100 (см. defaults.ts),
    // но применяется значение только когда content_width_enabled === true.
    content_width:             1100,
    content_width_enabled:     false,
    compact_spacing:           false,
    page_offset_enabled:       false,
    page_offset_value:         50,   // 50 = центр

    minimalistic_sidebar:      false,
    fixed_sidebar:             false,
    sidebar_with_background:   false,
    collapse_search:           false,

    background_blur:           0,
    background_dim:            0,
    background_opacity:        100,
    background_brightness:     100,
    background_contrast:       100,
    background_saturation:     100,
    background_scale:          100,
    background_hue_rotate:     0,
    background_sepia:          0,
    background_grayscale:      0,
    background_position:       'center',
    background_size:           'cover',
    background_overlay_opacity: 0,
    background_vignette:       0,
    background_video_speed:    100,
    background_video_volume:   0,

    filter_grayscale:          false,
    filter_sepia:              false,
    filter_invert:             false,
    filter_dim_images:         false,
    filter_high_contrast:      false,
    filter_low_brightness:     false,

    hide_stories:              false,
    hide_post_box:             false,
    hide_post_comments:        false,
    hide_recommendations:      false,
    hide_friends_suggestions:  false,
    hide_emoji_status:         false,
    hide_mini_chat:            false,
    hide_scroll_top:           false,
    hide_menu_settings:        false,
    hide_menu_counters:        false,
    hide_audio_ads:            false,
    hide_recent_groups:        false,
    hide_recommended_channels: false,
    hide_auth_popup:           false,
};

/**
 * Короткие алиасы: полное имя → короткий ключ (v:2)
 */
const KEY_MAP = {
    // Тема
    custom_theme:              'ct',
    custom_accent:             'ca',
    block_opacity:             'bo',
    glass_blur:                'gb',
    theme_radius:              'tr',
    block_depth:               'bd',

    // Шрифт
    custom_font_id:            'fi',
    custom_font_value:         'fv',
    custom_font_size:          'fs',
    custom_line_height:        'lh',
    custom_letter_spacing:     'ls',
    custom_font_weight:        'fw',
    custom_font_style:         'fy',
    custom_text_decoration:    'td',
    custom_text_transform:     'tm',

    // Layout
    border_radius:             'br',
    avatar_radius_shape:       'av',
    content_width:             'cw',
    content_width_enabled:     'cwe',
    compact_spacing:           'cp',
    page_offset_enabled:       'pe',
    page_offset_value:         'pv',
    custom_theme_id:           'ti',

    // Режим отображения
    minimalistic_sidebar:      'ms',
    fixed_sidebar:             'fx',
    sidebar_with_background:   'sw',
    collapse_search:           'cs',

    // Фон
    custom_background:         'cb',
    background_type:           'bt',
    background_blur:           'bl',
    background_dim:            'dm',
    background_opacity:        'op',
    background_brightness:     'bb',
    background_contrast:       'bc',
    background_saturation:     'bs',
    background_scale:          'bk',
    background_hue_rotate:     'bh',
    background_sepia:          'bp',
    background_grayscale:      'bg',
    background_position:       'bx',
    background_size:           'bz',
    background_overlay_color:  'oc',
    background_overlay_opacity:'oo',
    background_vignette:       'bv',
    background_video_speed:    'vs',
    background_video_volume:   'vv',

    // Визуальные фильтры
    filter_grayscale:          'fg',
    filter_sepia:              'fp',
    filter_invert:             'fn',
    filter_dim_images:         'di',
    filter_high_contrast:      'hc',
    filter_low_brightness:     'lb',

    // Скрытые элементы
    hide_stories:              'hs',
    hide_post_box:             'hpb',
    hide_post_comments:        'hpc',
    hide_recommendations:      'hd',
    hide_friends_suggestions:  'hf',
    hide_emoji_status:         'he',
    hide_mini_chat:            'hm',
    hide_scroll_top:           'ht',
    hide_menu_settings:        'hg',
    hide_menu_counters:        'hmc',
    hide_audio_ads:            'haa',
    hide_recent_groups:        'hrg',
    hide_recommended_channels: 'hrc',
    hide_auth_popup:           'ha',
};

/**
 * Обратная таблица: короткий ключ → полное имя (для декодирования v:2)
 */
const KEY_MAP_REVERSE = Object.fromEntries(
    Object.entries(KEY_MAP).map(([full, short]) => [short, full])
);

/**
 * Кодирует объект настроек в base64url строку (v:2)
 * @param {Object} settings - объект настроек расширения
 * @param {Object} meta - метаданные: { name, description, tags, preview }
 * @returns {string|null}
 */
export function encodeTheme(settings, meta = {}) {
    const params = {};

    THEME_PARAMS.forEach(key => {
        const val = settings[key];

        // Пропускаем: undefined / null / ''
        if (val === undefined || val === null || val === '') return;

        // Пропускаем дефолтные значения (в т.ч. false и 0, если они являются дефолтом)
        // ВАЖНО: проверяем ПЕРЕД общим фильтром на false/0, чтобы page_offset_value=0
        // (дефолт=50) корректно попал в кодировку.
        if (key in DEFAULTS && val === DEFAULTS[key]) return;

        // Пропускаем оставшиеся "пустые" значения без дефолта (но не нулевые numeric)
        if (val === false) return;

        // Пропускаем фоны из файловой системы расширения
        if (key === 'custom_background' && /^(?:chrome|moz)-extension:/i.test(String(val))) return;

        // Сохраняем под коротким алиасом
        const shortKey = KEY_MAP[key] ?? key;
        params[shortKey] = val;
    });

    const payload = {
        v: SCHEMA_VERSION,
        p: params,
        ...(meta.name && { n: meta.name }),
        // description намеренно не включаем — раздувает URL
        ...(meta.tags?.length && { t: meta.tags }),
        ...(meta.preview && { prev: meta.preview }),
    };

    try {
        const json = JSON.stringify(payload);
        const bytes = new TextEncoder().encode(json);
        const binary = Array.from(bytes, b => String.fromCharCode(b)).join('');
        const b64 = btoa(binary);
        return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    } catch (e) {
        console.error('[VKify] Failed to encode theme:', e);
        return null;
    }
}

/**
 * Декодирует base64url строку обратно в объект настроек.
 * Поддерживает v:1 (полные ключи) и v:2 (короткие ключи).
 * @param {string} encoded
 * @returns {{ settings: Object, meta: Object } | null}
 */
export function decodeTheme(encoded) {
    if (!encoded) return null;

    try {
        const b64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
        const padding = b64.length % 4 === 0 ? '' : '='.repeat(4 - b64.length % 4);
        const binary = atob(b64 + padding);
        const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
        const json = new TextDecoder().decode(bytes);
        const payload = JSON.parse(json);

        if (payload.v > SCHEMA_VERSION) {
            console.warn('[VKify] Unsupported theme schema version:', payload.v);
            return null;
        }

        let rawParams = payload.p || {};

        // v:2 — расширяем короткие ключи обратно в полные имена
        if (payload.v >= 2) {
            const expanded = {};
            for (const [key, val] of Object.entries(rawParams)) {
                const fullKey = KEY_MAP_REVERSE[key] ?? key;
                expanded[fullKey] = val;
            }
            rawParams = expanded;
        }

        return {
            settings: rawParams,
            meta: {
                name:        payload.n || 'Пользовательская тема',
                description: payload.d || '',
                tags:        payload.t || [],
                preview:     payload.prev || null,
            },
            version: payload.v,
        };
    } catch (e) {
        console.error('[VKify] Failed to decode theme:', e);
        return null;
    }
}

/**
 * Резолвит базовый origin для share-ссылок: в браузере — window.location.origin
 * (dev → http://localhost:5173, prod → https://vkify.ru). Фолбэк для SSR/CLI —
 * production-домен из config.app.url, чтобы не утекал localhost.
 */
function shareOrigin() {
    if (typeof window !== 'undefined' && window.location?.origin) return window.location.origin;
    return 'https://vkify.ru';
}

/**
 * Генерирует полную ссылку для шаринга. В dev получится localhost-URL, в проде —
 * vkify.ru — без хардкода доменa.
 */
export function generateShareUrl(settings, meta = {}) {
    const encoded = encodeTheme(settings, meta);
    if (!encoded) return null;
    return `${shareOrigin()}/theme/${encoded}`;
}

/**
 * Парсит encoded из URL pathname
 */
export function extractEncodedFromPath(pathname) {
    const match = pathname.match(/^\/theme\/([A-Za-z0-9_-]+)$/);
    return match ? match[1] : null;
}

/**
 * Получает превью-информацию из настроек
 */
export function getThemePreviewInfo(settings) {
    return {
        bgColor:        settings.custom_theme || null,
        accentColor:    settings.custom_accent || null,
        hasBackground:  Boolean(settings.custom_background),
        backgroundType: settings.background_type || 'image',
        hasCustomFont:  Boolean(settings.custom_font_id),
        fontId:         settings.custom_font_id || null,
    };
}