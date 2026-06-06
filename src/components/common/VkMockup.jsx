/**
 * VkMockup — достоверная имитация интерфейса ВКонтакте (страница профиля),
 * перекрашиваемая под цвета темы. Иконки меню — реальные из VK; аватар
 * профиля — логотип проекта; контент — нейтральные заглушки (без градиентов,
 * как в настоящем VK).
 *
 * props: bg, accent, card — цвета темы (как в theme.preview).
 */
import { useMemo } from 'react'
import {
  Search, SkipBack, Play, SkipForward, Pencil, ChevronRight,
  ChevronDown, Plus, Lock, Smile, List, Settings, ChevronUp, MessageCircle, UserPlus,
} from 'lucide-react'
import { isDarkColor } from '../../utils/colors'
import { VkIcon } from './vkMenuIcons'
import VkLogo from './VkLogo'
import Logo from './Logo'

function withAlpha(hex, a) {
  const c = (hex || '#000000').replace('#', '')
  const r = parseInt(c.slice(0, 2), 16)
  const g = parseInt(c.slice(2, 4), 16)
  const b = parseInt(c.slice(4, 6), 16)
  return `rgba(${r},${g},${b},${a})`
}

function buildPalette({ bg, accent, blockOpacity = 1 }) {
  const dark = isDarkColor(bg)
  const op = Math.max(0, Math.min(1, blockOpacity))
  // Блоки = цвет ФОНА (полупрозрачные при наличии обоев), видны обводкой.
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

// Скелет-полоска (заглушка текста/данных)
function Sk({ w, h = 9, c, r = 5, style }) {
  return <div style={{ width: w, height: h, borderRadius: r, background: c, ...style }} />
}

// Полный список левого меню VK (id соответствуют VK_ICONS)
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

export default function VkMockup({ bg, accent, card, wallpaper = null, blockOpacity = 1, settings = {}, className = '' }) {
  const p = useMemo(() => buildPalette({ bg, accent, blockOpacity }), [bg, accent, blockOpacity])

  // ── Настройки интерфейса (для пользовательских тем) ──
  const compactMenu    = !!settings.minimalistic_sidebar   // только иконки в меню
  const menuBg         = !!settings.sidebar_with_background // меню в блоке с обводкой
  const collapseSearch = !!settings.collapse_search        // поиск — только значок
  const compactSpacing = !!settings.compact_spacing        // слитые блоки
  // Компактный режим: блоки слитые — без скругления и без зазоров
  const radius = compactSpacing
    ? 0
    : (settings.border_radius != null && settings.border_radius !== '' ? Math.max(0, Number(settings.border_radius)) : 12)
  const maxW = settings.content_width_enabled && Number(settings.content_width) > 0
    ? Number(settings.content_width) : 1180
  const gap = compactSpacing ? 0 : 12        // зазор между блоками (0 = слитые)
  const bodyGap = compactSpacing ? 0 : 16    // сайдбар ↔ контент

  // Видимость элементов по настройкам hide_* (true = показывать)
  const showStories     = !settings.hide_stories
  const showFriendSug   = !settings.hide_friends_suggestions
  const showRecommend   = !settings.hide_recommendations
  const showEmojiStatus = !settings.hide_emoji_status
  const showMiniChat    = !settings.hide_mini_chat
  const showScrollTop   = !settings.hide_scroll_top
  const showMenuGear    = !settings.hide_menu_settings
  // Смещение страницы (page_offset_value) — сдвигает контент по горизонтали
  const pageOffset = settings.page_offset_enabled ? Number(settings.page_offset_value || 0) : 0
  // fixed_sidebar — фиксация меню при скролле; в статичном превью не визуализируется

  const block = { background: p.card, borderRadius: radius, border: `1px solid ${p.cardBorder}` }
  const btnField = {
    background: p.field, color: p.text, borderRadius: 8,
    display: 'flex', alignItems: 'center', gap: 6,
    padding: '8px 12px', fontSize: 12.5, fontWeight: 600, whiteSpace: 'nowrap',
  }
  // Вторичная accent-кнопка VK: акцентный ТЕКСТ/иконка, фон нейтральный
  const btnAccent = { ...btnField, color: p.accent }

  return (
    <div
      className={`select-none ${className}`}
      style={{
        position: 'relative',
        background: p.bg, color: p.text, width: '100%', overflow: 'hidden',
        fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif',
        pointerEvents: 'none',
      }}
    >
      {/* Слой обоев (если заданы) — под интерфейсом */}
      {wallpaper && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>{wallpaper}</div>
      )}

      <div style={{ position: 'relative', zIndex: 1, transform: pageOffset ? `translateX(${pageOffset}px)` : undefined }}>
      {/* ── Top bar — полоса на всю ширину, контент по центру ── */}
      <div style={{ height: 48, background: p.card, borderBottom: `1px solid ${p.sep}` }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 26,
          maxWidth: maxW, margin: '0 auto', padding: '0 16px', height: 48,
        }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <VkLogo accent={p.accent} size={26} />
          <span className="hidden sm:inline" style={{ fontSize: 15, fontWeight: 700, letterSpacing: '-0.01em' }}>ВКонтакте</span>
        </div>

        {collapseSearch ? (
          <Search size={20} style={{ color: p.text2 }} />
        ) : (
          <div className="hidden sm:flex" style={{
            alignItems: 'center', gap: 8, background: p.field, borderRadius: 8,
            padding: '0 12px', height: 32, width: 200, color: p.text3,
          }}>
            <Search size={16} />
            <span style={{ fontSize: 13 }}>Поиск</span>
          </div>
        )}

        {/* Уведомления — между поиском и плеером */}
        <VkIcon id="notification" size={22} color={p.text2} viewBox="0 0 24 24" />

        {/* mini-player — простые иконки, как в реальном VK */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginLeft: 4 }}>
          <SkipBack size={17} style={{ color: p.text2 }} />
          <Play size={17} style={{ color: p.text }} fill={p.text} />
          <SkipForward size={17} style={{ color: p.text2 }} />
          <div className="hidden md:flex" style={{ alignItems: 'center', gap: 6, marginLeft: 4 }}>
            <Sk w={70} h={8} c={p.skel} />
            <Sk w={110} h={8} c={p.skel2} />
          </div>
        </div>

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 30, height: 30, borderRadius: '50%', background: p.skel }} />
        </div>
        </div>
      </div>

      {/* ── Body — контент по центру ── */}
      <div style={{ maxWidth: maxW, margin: '0 auto' }}>
      <div style={{ display: 'flex', gap: bodyGap, padding: 16, alignItems: 'flex-start' }}>

        {/* Sidebar — реальные иконки VK (компактное меню / меню с фоном) */}
        <div className="hidden md:flex" style={{
          flexDirection: 'column', gap: 1, flexShrink: 0,
          width: compactMenu ? 52 : 168,
          ...(menuBg ? { background: p.card, border: `1px solid ${p.cardBorder}`, borderRadius: radius, padding: 8 } : {}),
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
                {!compactMenu && item.active && showMenuGear && (
                  <Settings size={14} style={{ marginLeft: 'auto', color: p.text3 }} />
                )}
              </div>
            )
          )}
        </div>

        {/* Content area */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: gap }}>

          {/* Истории (hide_stories) */}
          {showStories && (
            <div style={{ ...block, padding: 12, display: 'flex', gap: 10, overflow: 'hidden' }}>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div key={i} style={{
                  width: 58, height: 58, borderRadius: '50%', flexShrink: 0, background: p.skel,
                  boxShadow: i === 0 ? `0 0 0 2px ${p.bg}, 0 0 0 4px ${p.accent}` : 'none',
                }} />
              ))}
            </div>
          )}

          {/* ── Профиль (полная ширина) ── */}
          <div style={{ ...block, position: 'relative', overflow: 'hidden' }}>
            {/* Обложка — плоский нейтральный цвет (как пустая обложка VK) */}
            <div style={{ height: 150, position: 'relative', background: p.cover }}>
              <div style={{ ...btnField, position: 'absolute', top: 12, right: 12 }}>
                <Pencil size={13} /> <span className="hidden sm:inline">Изменить обложку</span>
              </div>
            </div>

            {/* Аватар = логотип проекта */}
            <div style={{ position: 'absolute', left: 20, top: 106, width: 88, height: 88 }}>
              <div style={{
                width: 88, height: 88, borderRadius: '50%', background: p.accent,
                border: `4px solid ${p.card}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Logo color={p.onAccent} className="w-11 h-auto" />
              </div>
              {/* «+» как в VK */}
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
                  {showEmojiStatus && <span style={{ fontSize: 15, lineHeight: 1 }}>😎</span>}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Sk w={120} h={9} c={withAlpha(p.accent, 0.55)} />
                  <ChevronRight size={13} style={{ color: p.accent }} />
                </div>
              </div>
              <div className="hidden sm:flex" style={{ alignItems: 'center', gap: 8, flexShrink: 0 }}>
                <div style={btnAccent}>Редактировать профиль</div>
                <div style={{ ...btnAccent, padding: 8 }}><VkIcon id="stats" size={17} color={p.accent} /></div>
                <div style={{ ...btnAccent, padding: '8px 10px' }}>Ещё <ChevronDown size={13} /></div>
              </div>
            </div>
          </div>

          {/* ── Колонки под профилем ── */}
          <div style={{ display: 'flex', gap: gap, alignItems: 'flex-start' }}>

            {/* Левая: вкладки + музыка + пост */}
            <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: gap }}>

              <div style={block}>
                {/* Вкладки — иконка + текст, активная как пилюля */}
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

                {/* Музыка (контент — заглушки) */}
                <div style={{ padding: 16 }}>
                  <div className="flex flex-col sm:flex-row" style={{ gap: 16 }}>
                    {/* Обложка альбома — плоский плейсхолдер с иконкой */}
                    <div style={{ flexShrink: 0 }}>
                      <div style={{
                        width: 116, height: 116, borderRadius: 10, background: p.skel2,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <VkIcon id="music" size={40} color={p.text3} />
                      </div>
                      <Sk w={92} h={11} c={p.skel} style={{ marginTop: 9 }} />
                    </div>

                    {/* Треки — заглушки, 1 кол. на мобильном / 2 на sm+ */}
                    <div className="grid grid-cols-1 sm:grid-cols-2" style={{ flex: 1, minWidth: 0, gap: '6px 18px' }}>
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

              {/* Создать пост — по центру + 2 иконки справа */}
              <div style={{ ...block, padding: '15px 16px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: p.accent, fontSize: 14, fontWeight: 600 }}>
                  <Plus size={18} /> Создать пост
                </div>
                <div style={{ position: 'absolute', right: 16, display: 'flex', alignItems: 'center', gap: 16, color: p.accent }}>
                  <Smile size={19} />
                  <List size={19} />
                </div>
              </div>
            </div>

            {/* Правая: друзья + подписки */}
            <div className="hidden lg:flex" style={{ flexDirection: 'column', gap: gap, width: 252, flexShrink: 0 }}>
              {/* Друзья */}
              <div style={{ ...block, padding: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <span style={{ fontSize: 14, fontWeight: 700 }}>Друзья</span>
                  <Sk w={16} h={9} c={p.skel2} />
                </div>
                <div style={{ display: 'flex', gap: 14 }}>
                  {[0, 1, 2].map((i) => (
                    <div key={i} style={{ textAlign: 'center', flex: 1, minWidth: 0 }}>
                      <div style={{ width: 56, height: 56, borderRadius: '50%', background: p.skel, margin: '0 auto' }} />
                      <Sk w={'76%'} h={8} c={p.skel2} style={{ margin: '9px auto 0' }} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Возможные друзья (hide_friends_suggestions) */}
              {showFriendSug && (
                <div style={{ ...block, padding: 14 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, display: 'block', marginBottom: 12 }}>Возможные друзья</span>
                  <div style={{ display: 'flex', gap: 14 }}>
                    {[3, 4, 5].map((i) => (
                      <div key={i} style={{ textAlign: 'center', flex: 1, minWidth: 0 }}>
                        <div style={{ width: 56, height: 56, borderRadius: '50%', background: p.skel, margin: '0 auto' }} />
                        <Sk w={'76%'} h={8} c={p.skel2} style={{ margin: '9px auto 8px' }} />
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, color: p.accent, fontSize: 11, fontWeight: 600 }}>
                          <UserPlus size={13} /> Добавить
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Подписки */}
              <div style={{ ...block, padding: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 14, fontWeight: 700 }}>Подписки</span>
                  <Sk w={18} h={9} c={p.skel2} />
                </div>
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '8px 0' }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: p.skel, flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 7 }}>
                      <Sk w={'70%'} h={9} c={p.skel} />
                      <Sk w={'90%'} h={8} c={p.skel2} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Рекомендации (hide_recommendations) */}
              {showRecommend && (
                <div style={{ ...block, padding: 14 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, display: 'block', marginBottom: 8 }}>Рекомендации</span>
                  {[0, 1, 2].map((i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '8px 0' }}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, background: p.skel, flexShrink: 0 }} />
                      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 7 }}>
                        <Sk w={'70%'} h={9} c={p.skel} />
                        <Sk w={'90%'} h={8} c={p.skel2} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>

      {/* Плавающие кнопки: наверх (hide_scroll_top) + мини-чат (hide_mini_chat) */}
      {(showScrollTop || showMiniChat) && (
        <div style={{ position: 'absolute', right: 16, bottom: 16, zIndex: 2, display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
          {showScrollTop && (
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: p.card, border: `1px solid ${p.cardBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
              <ChevronUp size={20} style={{ color: p.text2 }} />
            </div>
          )}
          {showMiniChat && (
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: p.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(0,0,0,0.35)' }}>
              <MessageCircle size={22} style={{ color: p.onAccent }} fill={p.onAccent} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
