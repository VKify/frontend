import { useMemo, useRef, useState, useLayoutEffect } from 'react'
import {
  Search, SkipBack, Play, SkipForward, Pencil, ChevronRight,
  ChevronDown, Plus, Lock, Smile, List,
} from 'lucide-react'
import { isDarkColor } from '../../utils/colors'
import { VkIcon } from './vkMenuIcons'
import VkLogo from './VkLogo'
import Logo from './Logo'
import { useGoogleFont } from '../../hooks/useGoogleFont'

function withAlpha(hex, a) {
  const c = (hex || '#000000').replace('#', '')
  const r = parseInt(c.slice(0, 2), 16)
  const g = parseInt(c.slice(2, 4), 16)
  const b = parseInt(c.slice(4, 6), 16)
  return `rgba(${r},${g},${b},${a})`
}

function hexToHsl(hex) {
  const h = (hex || '#000000').replace('#', '')
  const r = parseInt(h.slice(0, 2), 16) / 255
  const g = parseInt(h.slice(2, 4), 16) / 255
  const b = parseInt(h.slice(4, 6), 16) / 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let hue = 0, sat = 0
  const lig = (max + min) / 2
  if (max !== min) {
    const d = max - min
    sat = lig > 0.5 ? d / (2 - max - min) : d / (max + min)
    if (max === r) hue = ((g - b) / d + (g < b ? 6 : 0)) / 6
    else if (max === g) hue = ((b - r) / d + 2) / 6
    else hue = ((r - g) / d + 4) / 6
  }
  return { h: Math.round(hue * 360), s: Math.round(sat * 100), l: Math.round(lig * 100) }
}

// Фон страницы при включённой «Глубине блоков» (block_depth). По умолчанию
// глубины НЕТ — фон совпадает с карточками (плоско). Когда тогл включён,
// расширение переводит --background_page на n00 — темнее карточек, и блоки
// читаются приподнятыми. dir = тёмная тема ? +1 : −1. Без теней.
function depthPageBg(hex) {
  const { h, s, l } = hexToHsl(hex)
  const dir = l < 50 ? 1 : -1
  const pl = Math.max(0, Math.min(100, l - dir * 10))
  return `hsl(${h}, ${s}%, ${pl}%)`
}

// Фигурные пресеты аватарок — синхронизировано с SHAPE_RADIUS расширения
// (content/features/appearance/theme/border-radius.ts) и AVATAR_SHAPES попапа.
const AVATAR_SHAPES = {
  drop:  '0 50% 50% 50%',
  leaf:  '0 50% 0 50%',
  petal: '50% 0 50% 0',
  blob:  '30% 70% 70% 30% / 30% 30% 70% 70%',
}

function buildPalette({ bg, accent, blockOpacity = 1 }) {
  const dark = isDarkColor(bg)
  const op = Math.max(0, Math.min(1, blockOpacity))
  const card = op < 1 ? withAlpha(bg, op) : bg
  return {
    dark, bg, accent,
    card,
    cardBorder: dark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.10)',
    onAccent: isDarkColor(accent) ? '#ffffff' : '#0a0a0a',
    text:  dark ? '#e1e3e6' : '#0a0a0a',
    text2: dark ? 'rgba(255,255,255,0.46)' : 'rgba(0,0,0,0.46)',
    text3: dark ? 'rgba(255,255,255,0.30)' : 'rgba(0,0,0,0.32)',
    icon:  dark ? 'rgba(255,255,255,0.62)' : 'rgba(0,0,0,0.55)',
    sep:   dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)',
    hover: dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.04)',
    field: dark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.05)',
    skel:  dark ? 'rgba(255,255,255,0.13)' : 'rgba(0,0,0,0.10)',
    skel2: dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)',
    accentSoft: withAlpha(accent, dark ? 0.18 : 0.12),
    cover: card,
  }
}

function Sk({ w, h = 9, c, r = 5, style }) {
  return <div style={{ width: w, height: h, borderRadius: r, background: c, ...style }} />
}

const NAV = [
  { id: 'profile', label: 'Профиль', active: true },
  { id: 'feed', label: 'Лента' },
  { id: 'messenger', label: 'Мессенджер' },
  { id: 'calls', label: 'Звонки' },
  { id: 'friends', label: 'Друзья' },
  { id: 'groups', label: 'Сообщества' },
  { id: 'photo', label: 'Фото' },
  { id: 'music', label: 'Музыка' },
  { id: 'video', label: 'Видео' },
  { id: 'clips', label: 'Клипы' },
  { id: 'games', label: 'Игры' },
  { id: 'stickers', label: 'Стикеры' },
  { id: 'market', label: 'Маркет' },
  { sep: true },
  { id: 'services', label: 'Сервисы' },
  { id: 'votes', label: 'Голоса' },
  { sep: true },
  { id: 'bookmarks', label: 'Закладки' },
  { id: 'ads', label: 'Реклама' },
  { id: 'help', label: 'Помощь' },
]

const TABS = [
  { label: 'Музыка', icon: 'tabMusic', active: true },
  { label: 'Фото', icon: 'tabPhoto' },
  { label: 'Альбомы', icon: 'tabAlbums' },
  { label: 'Видео', icon: 'tabVideo' },
  { label: 'Клипы', icon: 'tabClips' },
  { label: 'Статьи', icon: 'tabArticles' },
]

function extractFontFamily(cssValue) {
  if (!cssValue) return null
  const match = cssValue.match(/["']([^"']+)["']/)
  return match ? match[1] : cssValue.split(',')[0].trim()
}

function buildCssFilter(s) {
  const parts = []
  if (s.filter_grayscale)      parts.push('grayscale(1)')
  if (s.filter_sepia)          parts.push('sepia(1)')
  if (s.filter_invert)         parts.push('invert(1)')
  if (s.filter_high_contrast)  parts.push('contrast(1.5)')
  if (s.filter_low_brightness) parts.push('brightness(0.75)')
  return parts.length ? parts.join(' ') : undefined
}

export default function VkMockup({ bg, accent, card, wallpaper = null, blockOpacity = 1, settings = {}, className = '' }) {
  const p = useMemo(() => buildPalette({ bg, accent, blockOpacity }), [bg, accent, blockOpacity])

  // ── Шрифт ──
  const fontFamilyName = (
    settings.custom_font_id &&
    settings.custom_font_id !== 'default' &&
    settings.custom_font_id !== 'system'
  ) ? extractFontFamily(settings.custom_font_value) : null
  useGoogleFont(fontFamilyName)

  const fontStyles = {}
  if (fontFamilyName && settings.custom_font_value) fontStyles.fontFamily = settings.custom_font_value
  if (settings.custom_font_size)       fontStyles.fontSize       = `${settings.custom_font_size}px`
  if (settings.custom_font_weight)     fontStyles.fontWeight     = settings.custom_font_weight
  if (settings.custom_font_style)      fontStyles.fontStyle      = settings.custom_font_style
  if (settings.custom_letter_spacing)  fontStyles.letterSpacing  = `${settings.custom_letter_spacing}px`
  if (settings.custom_line_height)     fontStyles.lineHeight     = settings.custom_line_height
  if (settings.custom_text_decoration) fontStyles.textDecoration = settings.custom_text_decoration
  if (settings.custom_text_transform)  fontStyles.textTransform  = settings.custom_text_transform

  // ── Режимы интерфейса ──
  const compactMenu    = !!settings.minimalistic_sidebar
  const menuBg         = !!settings.sidebar_with_background
  const collapseSearch = !!settings.collapse_search
  const compactSpacing = !!settings.compact_spacing
  // Скрытые элементы, у которых есть аналог в макете
  const hidePostBox = !!settings.hide_post_box

  // Скругление блоков (карточек) — theme_radius (px). 0/не задано → нативный
  // вид VK (~12px). Компактный режим обнуляет.
  const blockRadius = compactSpacing
    ? 0
    : (settings.theme_radius != null && Number(settings.theme_radius) > 0 ? Number(settings.theme_radius) : 12)

  // Скругление аватарок — border_radius (%) + фигурный пресет avatar_radius_shape.
  // 50% — нативные круглые аватарки VK; фигура (если задана) имеет приоритет.
  const avatarShape = settings.avatar_radius_shape || ''
  const avatarPercent = settings.border_radius != null && settings.border_radius !== ''
    ? Math.max(0, Number(settings.border_radius)) : 50
  const avatarRadius = AVATAR_SHAPES[avatarShape] || `${avatarPercent}%`

  // Глубина блоков (block_depth): затемняем фон страницы и добавляем тень карточкам.
  const depth = !!settings.block_depth
  // Ширина контента — растягивает весь макет (шапку + тело), как в реальном VK
  // (расширение применяет width к #page_header, #page_layout, #footer_wrap).
  const DEFAULT_W = 1180
  const contentW = settings.content_width_enabled && Number(settings.content_width) > 0
    ? Number(settings.content_width) : DEFAULT_W
  const gap     = compactSpacing ? 0 : 12
  const bodyGap = compactSpacing ? 0 : 16
  // page_offset (см. расширение page-offset.ts): слайдер 0–100, 50 = центр.
  // px = ((value − 50) / 50) × 600. <50 → влево, >50 → вправо.
  const MAX_PAGE_OFFSET = 600
  const rawOffset = Number(settings.page_offset_value ?? 50)
  const pageOffset = settings.page_offset_enabled && rawOffset !== 50
    ? Math.round(((rawOffset - 50) / 50) * MAX_PAGE_OFFSET)
    : 0

  // ── Адаптация: меряем реальную ширину фрейма и не даём контенту/сдвигу
  //    выйти за пределы экрана (показываем максимально возможное) ──
  const rootRef = useRef(null)
  const [frameW, setFrameW] = useState(0)
  useLayoutEffect(() => {
    const el = rootRef.current
    if (!el) return
    const update = () => setFrameW(el.clientWidth)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // ── Адаптация ──
  //  Десктоп-превью (широкий контейнер): рендерим полноценный desktop-макет VK
  //  в виртуальном экране 1900px и масштабируем (zoom) под контейнер. Так в узком
  //  превью виден весь рабочий стол — сайдбар, мини-плеер — и разница content_width
  //  / page_offset.
  //  Телефон/узкий контейнер: НЕ масштабируем. Отдаём реальную ширину самому макету,
  //  и его собственные брейкпоинты (bpSm/bpMd/bpLg) дают нативный компактный вид
  //  с нормальным размером текста — как настоящий мобильный VK, без «зум-костыля».
  const VIRTUAL_W = 1900
  const isWidePreview = frameW >= 700
  const SIM_W = isWidePreview ? Math.max(frameW, VIRTUAL_W) : (frameW || 375)
  const zoom = isWidePreview && frameW > 0 ? frameW / SIM_W : 1

  // Внутренние брейкпоинты макета считаем от ширины виртуального экрана (SIM_W),
  // а не от вьюпорта страницы — иначе на телефоне прятались бы блоки, которые
  // на самом деле отрисованы в широком (760–1900px) виртуальном окне.
  const bpSm = SIM_W >= 640
  const bpMd = SIM_W >= 768
  const bpLg = SIM_W >= 1024

  // Ширина макета не может превышать виртуальный экран
  const effContentW = Math.min(contentW, SIM_W)
  // Смещение по природе сдвигает контент частично за край. Ограничиваем так,
  // чтобы на экране всегда оставалось не меньше половины контента (не улетал целиком).
  const maxShift = Math.max(0, (SIM_W + effContentW) / 2 - effContentW * 0.5)
  const clampedOffset = Math.max(-maxShift, Math.min(maxShift, pageOffset))
  const shiftStyle = clampedOffset !== 0 ? { transform: `translateX(${clampedOffset}px)` } : {}

  // ── Эффект стекла ──
  const glassBlur = settings.glass_blur != null && Number(settings.glass_blur) > 0
    ? Number(settings.glass_blur) : 0
  const glassStyle = glassBlur > 0 ? {
    backdropFilter: `blur(${glassBlur}px) saturate(1.8)`,
    WebkitBackdropFilter: `blur(${glassBlur}px) saturate(1.8)`,
  } : {}

  // ── Визуальные фильтры ──
  const cssFilter = buildCssFilter(settings)

  // ── Прозрачность блоков: когда blockOpacity < 1 без реального wallpaper-URL ——
  //    показываем акцентный градиент, чтобы сквозь прозрачные блоки было что видеть ──
  const hasRealWallpaper = settings.custom_background &&
    !/^(?:chrome|moz)-extension:/i.test(String(settings.custom_background))
  const showTransparencyBg = blockOpacity < 1 && !hasRealWallpaper

  // По умолчанию фон = карточкам (плоско, глубины нет). Только при block_depth
  // фон становится темнее карточек. Карточки (p.card) и тени не трогаем.
  const pageBg = depth ? depthPageBg(bg) : p.bg

  const block = {
    background: p.card,
    borderRadius: blockRadius,
    border: `1px solid ${p.cardBorder}`,
    ...glassStyle,
  }

  const btnField = {
    background: p.field, color: p.text, borderRadius: 8,
    display: 'flex', alignItems: 'center', gap: 6,
    padding: '8px 12px', fontSize: 12.5, fontWeight: 600, whiteSpace: 'nowrap',
  }
  const btnAccent = { ...btnField, color: p.accent }

  return (
    <div
      ref={rootRef}
      className={`select-none ${className}`}
      style={{
        position: 'relative',
        backgroundColor: pageBg,
        // Когда блоки полупрозрачны и нет обоев — акцентный градиент «за» интерфейсом
        backgroundImage: showTransparencyBg
          ? `radial-gradient(ellipse at 25% 60%, ${withAlpha(accent, 0.45)} 0%, transparent 55%), radial-gradient(ellipse at 75% 25%, ${withAlpha(accent, 0.25)} 0%, transparent 50%)`
          : 'none',
        color: p.text, width: '100%', overflow: 'hidden',
        fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif',
        pointerEvents: 'none',
        ...(cssFilter ? { filter: cssFilter } : {}),
        ...fontStyles,
      }}
    >
      {/* Слой обоев — под интерфейсом */}
      {/* Слой обоев рисуем ТОЛЬКО при реальных обоях. Без них WallpaperLayer
          залил бы всё сплошным цветом темы и перекрыл бы pageBg (в т.ч. эффект
          глубины) — поэтому фон отдаём самому макету через backgroundColor. */}
      {wallpaper && hasRealWallpaper && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>{wallpaper}</div>
      )}

      <div style={{ position: 'relative', zIndex: 1, width: SIM_W, zoom }}>

        {/* ── Top bar (подложка на всю ширину; контент растягивается/сдвигается) ── */}
        <div style={{
          height: 48, background: p.card, borderBottom: `1px solid ${p.sep}`,
          ...glassStyle,
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 26,
            maxWidth: contentW, margin: '0 auto', padding: '0 16px', height: 48,
            ...shiftStyle,
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 9,
              // Компактное меню: логотип сжимается до значка и центрируется над
              // колонкой узкого сайдбара (ширина = ширина сайдбара 52px), как в ВК.
              ...(compactMenu && bpMd ? { width: 52, justifyContent: 'center', gap: 0 } : {}),
            }}>
              <VkLogo accent={p.accent} size={26} />
              {!compactMenu && bpSm && (
                <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: '-0.01em' }}>ВКонтакте</span>
              )}
            </div>

            {collapseSearch || !bpSm ? (
              <Search size={20} style={{ color: p.text2 }} />
            ) : (
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8, background: p.field, borderRadius: 8,
                padding: '0 12px', height: 32, width: 200, color: p.text3,
              }}>
                <Search size={16} />
                <span style={{ fontSize: 13 }}>Поиск</span>
              </div>
            )}

            {/* Уведомления */}
            <VkIcon id="notification" size={22} color={p.text2} viewBox="0 0 24 24" />

            {/* Мини-плеер */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginLeft: 4 }}>
              <SkipBack size={17} style={{ color: p.text2 }} />
              <Play size={17} style={{ color: p.text }} fill={p.text} />
              <SkipForward size={17} style={{ color: p.text2 }} />
              {bpMd && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginLeft: 4 }}>
                  <Sk w={70} h={8} c={p.skel} />
                  <Sk w={110} h={8} c={p.skel2} />
                </div>
              )}
            </div>

            {/* Аватар пользователя */}
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{
                width: 30, height: 30, borderRadius: avatarRadius, background: p.accent,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Logo color={p.onAccent} className="w-4 h-auto" />
              </div>
            </div>
          </div>
        </div>

        {/* ── Body (контент-часть: реагирует на ширину контента и смещение) ── */}
        <div style={{ maxWidth: contentW, margin: '0 auto', ...shiftStyle }}>
          <div style={{ display: 'flex', gap: bodyGap, padding: 16, alignItems: 'flex-start' }}>

            {/* Sidebar */}
            {bpMd && (
            <div style={{
              display: 'flex', flexDirection: 'column', gap: 1, flexShrink: 0,
              width: compactMenu ? 52 : 168,
              ...(menuBg ? { background: p.card, border: `1px solid ${p.cardBorder}`, borderRadius: blockRadius, padding: 8, ...glassStyle } : {}),
            }}>
              {NAV.map((item, i) =>
                item.sep ? (
                  <div key={`sep-${i}`} style={{ height: 1, background: p.sep, margin: compactMenu ? '7px 8px' : '7px 10px' }} />
                ) : (
                  <div key={item.id} style={{
                    display: 'flex', alignItems: 'center',
                    justifyContent: compactMenu ? 'center' : 'flex-start',
                    gap: compactMenu ? 0 : 12, padding: compactMenu ? '9px 0' : '7px 10px', borderRadius: 8,
                    fontSize: 13.5, fontWeight: 500,
                    background: item.active ? p.field : 'transparent',
                    color: item.active ? p.accent : p.text,
                  }}>
                    <VkIcon id={item.id} size={20} color={p.accent} />
                    {!compactMenu && <span>{item.label}</span>}
                  </div>
                )
              )}
            </div>
            )}

            {/* Content area */}
            <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: gap }}>

              {/* ── Профиль ── */}
              <div style={{ ...block, position: 'relative', overflow: 'hidden' }}>
                <div style={{ height: 150, position: 'relative', background: p.cover }}>
                  <div style={{ ...btnField, position: 'absolute', top: 12, right: 12 }}>
                    <Pencil size={13} /> {bpSm && <span>Изменить обложку</span>}
                  </div>
                </div>

                {/* Аватар = логотип проекта */}
                <div style={{ position: 'absolute', left: 20, top: 106, width: 88, height: 88 }}>
                  <div style={{
                    width: 88, height: 88, borderRadius: avatarRadius, background: p.accent,
                    border: `4px solid ${p.card}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Logo color={p.onAccent} className="w-11 h-auto" />
                  </div>
                  <div style={{
                    position: 'absolute', right: 2, bottom: 2,
                    width: 24, height: 24, borderRadius: '50%', background: p.accent,
                    border: `3px solid ${p.card}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Plus size={13} style={{ color: p.onAccent }} strokeWidth={3} />
                  </div>
                </div>

                {/* Имя + кнопки */}
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
                  padding: '14px 20px 16px', paddingLeft: 124, minHeight: 56,
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 9, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <Sk w={140} h={15} c={p.skel} />
                      <span style={{ fontSize: 15, lineHeight: 1 }}>😎</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                      <Sk w={120} h={9} c={withAlpha(p.accent, 0.55)} />
                      <ChevronRight size={13} style={{ color: p.accent }} />
                    </div>
                  </div>
                  {bpSm && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                    <div style={btnAccent}>Редактировать профиль</div>
                    <div style={{ ...btnAccent, padding: 8 }}><VkIcon id="stats" size={17} color={p.accent} /></div>
                    <div style={{ ...btnAccent, padding: '8px 10px' }}>Ещё <ChevronDown size={13} /></div>
                  </div>
                  )}
                </div>
              </div>

              {/* ── Колонки под профилем ── */}
              <div style={{ display: 'flex', gap: gap, alignItems: 'flex-start' }}>

                {/* Левая: вкладки + музыка + пост */}
                <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: gap }}>

                  <div style={block}>
                    <div style={{ display: 'flex', gap: 4, padding: '8px', borderBottom: `1px solid ${p.sep}`, overflow: 'hidden' }}>
                      {TABS.map((tab) => (
                        <div key={tab.label} style={{
                          display: 'flex', alignItems: 'center', gap: 7,
                          padding: '8px 12px', borderRadius: 8, fontSize: 13.5, fontWeight: 600,
                          whiteSpace: 'nowrap',
                          color: tab.active ? p.accent : p.text2,
                          background: tab.active ? p.field : 'transparent',
                        }}>
                          <VkIcon id={tab.icon} size={18} color={p.accent} />
                          {tab.label}
                        </div>
                      ))}
                    </div>

                    <div style={{ padding: 16 }}>
                      <div style={{ display: 'flex', flexDirection: bpSm ? 'row' : 'column', gap: 16 }}>
                        <div style={{ flexShrink: 0 }}>
                          <div style={{
                            width: 116, height: 116, borderRadius: 10, background: p.skel2,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}>
                            <VkIcon id="music" size={40} color={p.text3} />
                          </div>
                          <Sk w={92} h={11} c={p.skel} style={{ marginTop: 9 }} />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: bpSm ? '1fr 1fr' : '1fr', flex: 1, minWidth: 0, gap: '6px 18px' }}>
                          {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '6px 4px' }}>
                              <div style={{ width: 36, height: 36, borderRadius: 7, background: p.skel2, flexShrink: 0 }} />
                              <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                                <Sk w={'80%'} h={9} c={p.skel} />
                                <Sk w={'52%'} h={8} c={p.skel2} />
                              </div>
                              <Sk w={26} h={8} c={p.skel2} />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div style={{ marginTop: 14, padding: 11, textAlign: 'center', borderRadius: 8, background: p.hover, color: p.accent, fontSize: 13, fontWeight: 600 }}>
                        Показать всё
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 12, fontSize: 11.5, color: p.text2 }}>
                        <Lock size={12} /> Аудиозаписи видны только вам · <span style={{ color: p.accent }}>Изменить</span>
                      </div>
                    </div>
                  </div>

                  {/* Создать пост (скрывается тоглом hide_post_box) */}
                  {!hidePostBox && (
                  <div style={{ ...block, padding: '15px 16px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: p.accent, fontSize: 14, fontWeight: 600 }}>
                      <Plus size={18} /> Создать пост
                    </div>
                    <div style={{ position: 'absolute', right: 16, display: 'flex', alignItems: 'center', gap: 16, color: p.accent }}>
                      <Smile size={19} />
                      <List size={19} />
                    </div>
                  </div>
                  )}
                </div>

                {/* Правая: друзья + подписки */}
                {bpLg && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: gap, width: 252, flexShrink: 0 }}>
                  {/* Друзья */}
                  <div style={{ ...block, padding: 14 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                      <span style={{ fontSize: 14, fontWeight: 700 }}>Друзья</span>
                      <Sk w={16} h={9} c={p.skel2} />
                    </div>
                    <div style={{ display: 'flex', gap: 14 }}>
                      {[0, 1, 2].map((i) => (
                        <div key={i} style={{ textAlign: 'center', flex: 1, minWidth: 0 }}>
                          <div style={{ width: 56, height: 56, borderRadius: avatarRadius, background: p.skel, margin: '0 auto' }} />
                          <Sk w={'76%'} h={8} c={p.skel2} style={{ margin: '9px auto 0' }} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Подписки */}
                  <div style={{ ...block, padding: 14 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      <span style={{ fontSize: 14, fontWeight: 700 }}>Подписки</span>
                      <Sk w={18} h={9} c={p.skel2} />
                    </div>
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '8px 0' }}>
                        <div style={{ width: 40, height: 40, borderRadius: avatarRadius, background: p.skel, flexShrink: 0 }} />
                        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 7 }}>
                          <Sk w={'70%'} h={9} c={p.skel} />
                          <Sk w={'90%'} h={8} c={p.skel2} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
