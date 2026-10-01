import contract from '../data/theme-contract.json';
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
const THEME_PARAMS = contract.keys;
const DEFAULTS = contract.defaults;
const KEY_MAP = contract.aliases;

/** Shared links omit defaults; applying them still replaces the whole appearance. */
export function buildSharedThemeSettings(settings) {
    return { ...DEFAULTS, ...Object.fromEntries(Object.entries(settings).filter(([key]) => THEME_PARAMS.includes(key))) };
}

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
        let val = settings[key];
        if (key === 'web_wallpaper_values') {
            try {
                const values = JSON.parse(val || '{}');
                const id = settings.web_wallpaper_id;
                val = JSON.stringify(id && Object.prototype.hasOwnProperty.call(values, id) ? { [id]: values[id] } : {});
            } catch { return; }
        }

        // Пропускаем: undefined / null / ''
        if (val === undefined || val === null || val === '') return;

        // Пропускаем дефолтные значения (в т.ч. false и 0, если они являются дефолтом)
        // ВАЖНО: проверяем ПЕРЕД общим фильтром на false/0, чтобы page_offset_value=0
        // (дефолт=50) корректно попал в кодировку.
        if (key in DEFAULTS && JSON.stringify(val) === JSON.stringify(DEFAULTS[key])) return;

        // Пропускаем оставшиеся "пустые" значения без дефолта (но не нулевые numeric)
        if (val === false) return;

        // Пропускаем фоны из файловой системы расширения
        if (key === 'custom_background' && /^(?:(?:chrome|moz)-extension:|blob:)/i.test(String(val))) return;

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
        const encoded = b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
        return encoded.length <= 128 * 1024 ? encoded : null;
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
    if (typeof encoded !== 'string' || !encoded || encoded.length > 128 * 1024 || !/^[A-Za-z0-9_-]+$/.test(encoded)) return null;

    try {
        const b64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
        const padding = b64.length % 4 === 0 ? '' : '='.repeat(4 - b64.length % 4);
        const binary = atob(b64 + padding);
        const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
        const json = new TextDecoder().decode(bytes);
        const payload = JSON.parse(json);

        if (!payload || (payload.v !== 1 && payload.v !== 2) || !payload.p || typeof payload.p !== 'object' || Array.isArray(payload.p)) {
            console.warn('[VKify] Invalid theme payload or unsupported version:', payload?.v);
            return null;
        }

        let rawParams = payload.p || {};

        // v:2 — расширяем короткие ключи обратно в полные имена
        if (payload.v >= 2) {
            const expanded = {};
            for (const [key, val] of Object.entries(rawParams)) {
                const fullKey = KEY_MAP_REVERSE[key] ?? key;
                if (THEME_PARAMS.includes(fullKey)) expanded[fullKey] = val;
            }
            rawParams = expanded;
        }

        return {
            settings: Object.fromEntries(Object.entries(rawParams).filter(([key]) => THEME_PARAMS.includes(key))),
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
