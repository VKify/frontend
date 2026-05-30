/**
 * LiveDemo — интерактивный демо-раздел на главной странице.
 */
import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Palette, ShieldOff, Image, Lock, Check, Chrome, Download } from 'lucide-react'
import { Link } from 'react-router-dom'
import config from '../../config'
import { themes as allThemes } from '../../data/themes'
import { isDarkColor } from '../../utils/colors'

const DEMO_THEME_IDS = ['github-dark', 'mocha', 'nord', 'rose-pine', 'everforest', 'amoled-white']

const THEMES = DEMO_THEME_IDS
    .map(id => allThemes.find(t => t.id === id))
    .filter(Boolean)
    .map(t => ({
        id:     t.id,
        name:   t.name,
        bg:     t.preview.bg,
        card:   t.preview.card,
        accent: t.preview.accent,
        dark:   isDarkColor(t.preview.bg),
    }))

const BACKGROUNDS = [
  {
    id: 'none',
    name: 'Без фона',
    preview: null,
    style: {},
  },
  {
    id: 'aurora',
    name: 'Аврора',
    preview: 'linear-gradient(135deg,#0f2027,#203a43,#2c5364)',
    style: { background: 'linear-gradient(135deg,#0f2027,#203a43,#2c5364)' },
  },
  {
    id: 'sunset',
    name: 'Закат',
    preview: 'linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)',
    style: { background: 'linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)' },
  },
  {
    id: 'forest',
    name: 'Лес',
    preview: 'linear-gradient(135deg,#134e5e,#71b280)',
    style: { background: 'linear-gradient(135deg,#134e5e,#71b280)' },
  },
  {
    id: 'galaxy',
    name: 'Галактика',
    preview: 'radial-gradient(ellipse at 20% 50%,#120078 0%,#9d0191 50%,#fd3a69 100%)',
    style: { background: 'radial-gradient(ellipse at 20% 50%,#120078 0%,#9d0191 50%,#fd3a69 100%)' },
  },
]


const TABS = [
  { id: 'themes',    label: 'Темы',        Icon: Palette,  color: 'from-purple-500 to-pink-500'    },
  { id: 'adblock',   label: 'Без рекламы', Icon: ShieldOff,color: 'from-green-500 to-emerald-500'  },
  { id: 'background',label: 'Фон',         Icon: Image,    color: 'from-blue-500 to-cyan-500'      },
  { id: 'privacy',   label: 'Приватность', Icon: Lock,     color: 'from-orange-500 to-red-500'     },
]

function VKShell({ theme, bgStyle, opacity = 1, children }) {
  const textHi  = theme.dark ? 'rgba(255,255,255,0.80)' : 'rgba(0,0,0,0.75)'
  const textLo  = theme.dark ? 'rgba(255,255,255,0.22)' : 'rgba(0,0,0,0.18)'
  const border  = theme.dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'
  const cardBg  = bgStyle?.background
    ? `${theme.card}cc`  // полупрозрачный при наличии обоев
    : theme.card

  return (
    <div
      className="relative w-full overflow-hidden flex flex-col"
      style={{
        minHeight: 320,
        maxHeight: 420,
        background: theme.bg,
        transition: 'background 0.5s ease',
        ...bgStyle,
      }}
    >
      {/* Dim overlay для читаемости при тёмных фонах */}
      {bgStyle?.background && (
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'rgba(0,0,0,0.25)' }} />
      )}

      {/* Топбар */}
      <div
        className="relative flex items-center gap-3 px-4 shrink-0 z-10"
        style={{ height: 48, background: cardBg, borderBottom: `1px solid ${border}`,
                 transition: 'background 0.5s ease' }}
      >
        <div className="w-7 h-7 rounded-full shrink-0" style={{ background: theme.accent, transition: 'background 0.5s ease' }} />
        <div className="flex-1 flex items-center gap-3">
          <div className="h-2 w-20 rounded-full" style={{ background: theme.accent, opacity: 0.7, transition: 'background 0.5s ease' }} />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-16 rounded-full opacity-15" style={{ background: textHi }} />
          <div className="w-6 h-6 rounded-full opacity-20" style={{ background: textHi }} />
          <div className="w-6 h-6 rounded-full opacity-20" style={{ background: textHi }} />
        </div>
      </div>

      {/* Тело */}
      <div className="relative flex flex-1 min-h-0 z-10">
        {/* Сайдбар */}
        <div
          className="hidden sm:flex flex-col gap-0.5 shrink-0 py-2 px-2 overflow-hidden"
          style={{ width: 180, background: cardBg, borderRight: `1px solid ${border}`, transition: 'background 0.5s ease' }}
        >
          {[1,0,0,0,0,0].map((active, i) => (
            <div key={i} className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl"
                 style={{ background: active ? `${theme.accent}22` : 'transparent', transition: 'background 0.5s ease' }}>
              <div className="w-3.5 h-3.5 rounded shrink-0"
                   style={{ background: active ? theme.accent : textHi, opacity: active ? 1 : 0.22, transition: 'background 0.5s ease' }} />
              <div className="flex-1 h-1.5 rounded-full"
                   style={{ background: active ? theme.accent : textHi, opacity: active ? 0.55 : 0.16, transition: 'background 0.5s ease' }} />
              {i === 0 && (
                <div className="min-w-[16px] h-[16px] rounded-full flex items-center justify-center shrink-0 text-[9px] font-bold"
                     style={{ background: theme.accent, color: isDarkColor(theme.accent) ? '#fff' : '#000',
                              transition: 'background 0.5s ease' }}>3</div>
              )}
            </div>
          ))}
        </div>

        {/* Контент */}
        <div className="flex-1 p-3 overflow-hidden">
          {children({ theme, textHi, textLo, cardBg })}
        </div>
      </div>
    </div>
  )
}

function ThemesDemo() {
  const [activeTheme, setActiveTheme] = useState(THEMES[1]) // GitHub Dark по умолчанию

  return (
    <div className="space-y-4">
      <VKShell theme={activeTheme} bgStyle={{}}>
        {({ theme, textHi, cardBg }) => (
          <div className="space-y-2">
            {[1, 0.7, 0.4].map((op, i) => (
              <div key={i} className="rounded-xl p-3 space-y-2"
                   style={{ background: cardBg, opacity: op, transition: 'background 0.5s ease' }}>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full shrink-0" style={{ background: theme.accent, transition: 'background 0.5s ease' }} />
                  <div className="space-y-1 flex-1">
                    <div className="h-1.5 rounded-full" style={{ background: textHi, opacity: 0.5, width: [96,72,56][i] }} />
                    <div className="h-1 w-12 rounded-full opacity-20" style={{ background: textHi }} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="h-1.5 w-full rounded-full opacity-28" style={{ background: textHi }} />
                  <div className="h-1.5 w-4/5 rounded-full opacity-18" style={{ background: textHi }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </VKShell>

      {/* Выбор темы */}
      <div>
        <p className="text-xs text-gray-400 dark:text-gray-500 mb-2 font-medium uppercase tracking-wide">
          Выберите тему
        </p>
        <div className="flex gap-2 flex-wrap">
          {THEMES.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTheme(t)}
              title={t.name}
              className="relative flex flex-col items-center gap-1 group"
            >
              <div
                className="w-10 h-10 rounded-xl border-2 transition-all duration-200"
                style={{
                  background: t.bg,
                  borderColor: activeTheme.id === t.id ? t.accent : 'transparent',
                  boxShadow: activeTheme.id === t.id ? `0 0 0 2px ${t.accent}55` : undefined,
                }}
              >
                <div className="absolute inset-1.5 rounded-md" style={{ background: t.accent, opacity: 0.6 }} />
              </div>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors whitespace-nowrap">
                {t.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 rounded-xl px-3 py-2">
        <Palette className="w-3.5 h-3.5 text-blue-500 shrink-0" />
        <span>В расширении доступно <strong className="text-blue-600 dark:text-blue-400">{config.stats.themes}+ темы</strong> и полная ручная настройка цветов</span>
      </div>
    </div>
  )
}

const FEED_POSTS = [
  { id: 1, isAd: false, name: 'Иван Петров',      text: 'Отличный день! Сходил на пробежку и вернулся полным сил 🏃',  lines: 1 },
  { id: 2, isAd: true,  name: '🎯 Реклама',        text: 'Топовый смартфон за 1490 ₽! Купите сейчас — осталось 3 штуки', lines: 2, label: 'Промо' },
  { id: 3, isAd: false, name: 'Мария Сидорова',    text: 'Посмотрите какой закат сегодня был за городом 🌅',            lines: 1 },
  { id: 4, isAd: true,  name: '💰 Спонсор',        text: 'Заработай от 50 000 ₽ в месяц не выходя из дома! Узнать →',  lines: 1, label: 'Реклама' },
  { id: 5, isAd: false, name: 'Алексей Новиков',   text: 'Сегодня наконец починил велосипед, завтра едем на великах!',  lines: 1 },
]

function AdBlockDemo() {
  const theme = THEMES[1] // GitHub Dark
  const [blocked, setBlocked] = useState(false)
  const [count, setCount]     = useState(0)

  useEffect(() => {
    if (!blocked) { setCount(0); return }
    const timer = setTimeout(() => setCount(FEED_POSTS.filter(p => p.isAd).length), 300)
    return () => clearTimeout(timer)
  }, [blocked])

  const textHi = 'rgba(255,255,255,0.80)'
  const textLo = 'rgba(255,255,255,0.22)'
  const border = 'rgba(255,255,255,0.07)'
  const cardBg = theme.card

  return (
    <div className="space-y-4">
      {/* Упрощённый макет (только лента — без сайдбара, чтобы было компактнее) */}
      <div
        className="relative w-full overflow-hidden rounded-2xl"
        style={{ background: theme.bg, minHeight: 310 }}
      >
        {/* Топбар */}
        <div className="flex items-center gap-3 px-4 shrink-0" style={{ height: 44, background: cardBg, borderBottom: `1px solid ${border}` }}>
          <div className="w-6 h-6 rounded-full" style={{ background: theme.accent }} />
          <div className="h-1.5 w-16 rounded-full" style={{ background: theme.accent, opacity: 0.6 }} />
          <div className="ml-auto flex items-center gap-2">
            {blocked && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold"
                style={{ background: '#22c55e22', color: '#22c55e', border: '1px solid #22c55e44' }}
              >
                <ShieldOff className="w-2.5 h-2.5" />
                VKify активен
              </motion.div>
            )}
          </div>
        </div>

        {/* Лента */}
        <div className="p-3 space-y-2 overflow-hidden" style={{ maxHeight: 265 }}>
          {FEED_POSTS.map(post => (
            <AnimatePresence key={post.id}>
              {(!blocked || !post.isAd) && (
                <motion.div
                  initial={blocked && !post.isAd ? { opacity: 0, height: 0 } : false}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div
                    className="rounded-xl p-3 space-y-1.5"
                    style={{
                      background: post.isAd ? '#ff444411' : cardBg,
                      border: post.isAd ? '1px solid #ff444433' : `1px solid ${border}`,
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full shrink-0"
                           style={{ background: post.isAd ? '#ff4444' : theme.accent, opacity: post.isAd ? 0.7 : 1 }} />
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] font-semibold" style={{ color: post.isAd ? '#ff8888' : textHi }}>
                            {post.name}
                          </span>
                          {post.label && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold"
                                  style={{ background: '#ff444422', color: '#ff6666' }}>
                              {post.label}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <p className="text-[11px] leading-snug" style={{ color: textHi, opacity: post.isAd ? 0.7 : 0.8 }}>
                      {post.text}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          ))}
        </div>

        {/* Счётчик удалённых */}
        <AnimatePresence>
          {blocked && count > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-3 left-3 right-3 flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold"
              style={{ background: '#22c55e18', color: '#22c55e', border: '1px solid #22c55e33' }}
            >
              <Check className="w-3.5 h-3.5" />
              Скрыто рекламных постов: {count} — лента стала чище!
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Тоггл */}
      <button
        onClick={() => setBlocked(b => !b)}
        className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 active:scale-[0.98]"
        style={{
          background: blocked ? '#22c55e18' : 'linear-gradient(135deg,#22c55e,#16a34a)',
          color: blocked ? '#22c55e' : '#fff',
          border: blocked ? '1px solid #22c55e44' : 'none',
        }}
      >
        <ShieldOff className="w-4 h-4" />
        {blocked ? 'Блокировка включена — нажмите чтобы выключить' : 'Включить блокировку рекламы'}
      </button>

      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 bg-green-50 dark:bg-green-950/30 border border-green-100 dark:border-green-900/50 rounded-xl px-3 py-2">
        <ShieldOff className="w-3.5 h-3.5 text-green-500 shrink-0" />
        <span>Блокирует рекламу в ленте, боковой колонке, истории и трекеры Яндекс/Google/Mail.ru</span>
      </div>
    </div>
  )
}

function BackgroundDemo() {
  const [activeBg, setActiveBg] = useState(BACKGROUNDS[1])
  const [blur,   setBlur]   = useState(6)
  const [dim,    setDim]    = useState(30)
  const theme = THEMES[1] // GitHub Dark semi-transparent

  const glassCard = activeBg.id !== 'none'
    ? `rgba(22,27,34,0.72)`  // полупрозрачный тёмный
    : theme.card

  const textHi = 'rgba(255,255,255,0.82)'
  const border  = 'rgba(255,255,255,0.10)'

  return (
    <div className="space-y-4">
      <div className="relative rounded-2xl overflow-hidden" style={{ minHeight: 300 }}>
        {/* Фоновый слой */}
        {activeBg.id !== 'none' && (
          <div
            className="absolute inset-0 transition-all duration-700"
            style={{
              ...activeBg.style,
              filter: `blur(${blur}px) brightness(${(100-dim)/100})`,
              transform: 'scale(1.1)',
            }}
          />
        )}

        {/* VK интерфейс поверх */}
        <div className="relative flex flex-col" style={{ background: activeBg.id === 'none' ? theme.bg : 'transparent', minHeight: 300 }}>
          {/* Топбар */}
          <div className="flex items-center gap-3 px-4 shrink-0" style={{ height: 44, background: glassCard, borderBottom: `1px solid ${border}`, backdropFilter: 'blur(16px)' }}>
            <div className="w-6 h-6 rounded-full" style={{ background: theme.accent }} />
            <div className="h-1.5 w-16 rounded-full" style={{ background: theme.accent, opacity: 0.7 }} />
            <div className="ml-auto h-2 w-12 rounded-full opacity-25" style={{ background: textHi }} />
          </div>

          {/* Лента */}
          <div className="flex flex-1 gap-3 p-3 overflow-hidden">
            {/* Сайдбар */}
            <div className="hidden sm:flex flex-col gap-1 w-40 shrink-0 p-2 rounded-xl overflow-hidden"
                 style={{ background: glassCard, backdropFilter: 'blur(16px)' }}>
              {[1,0,0,0,0].map((a, i) => (
                <div key={i} className="flex items-center gap-2 px-2 py-2 rounded-lg"
                     style={{ background: a ? `${theme.accent}25` : 'transparent' }}>
                  <div className="w-3 h-3 rounded shrink-0" style={{ background: a ? theme.accent : textHi, opacity: a ? 1 : 0.22 }} />
                  <div className="flex-1 h-1 rounded-full opacity-20" style={{ background: textHi }} />
                </div>
              ))}
            </div>

            {/* Посты */}
            <div className="flex-1 space-y-2">
              {[1, 0.72, 0.44].map((op, i) => (
                <div key={i} className="rounded-xl p-3 space-y-2"
                     style={{ background: glassCard, opacity: op, backdropFilter: 'blur(16px)' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full shrink-0" style={{ background: theme.accent }} />
                    <div className="h-1.5 rounded-full opacity-55" style={{ background: textHi, width: [80,60,48][i] }} />
                  </div>
                  <div className="space-y-1.5">
                    <div className="h-1 w-full rounded-full opacity-25" style={{ background: textHi }} />
                    <div className="h-1 w-3/4 rounded-full opacity-18" style={{ background: textHi }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Выбор фона */}
      <div>
        <p className="text-xs text-gray-400 dark:text-gray-500 mb-2 font-medium uppercase tracking-wide">
          Выберите фон
        </p>
        <div className="flex gap-2 flex-wrap">
          {BACKGROUNDS.map(bg => (
            <button
              key={bg.id}
              onClick={() => setActiveBg(bg)}
              title={bg.name}
              className="flex flex-col items-center gap-1 group"
            >
              <div
                className="w-10 h-10 rounded-xl border-2 transition-all duration-200"
                style={{
                  background: bg.preview ?? '#e5e7eb',
                  borderColor: activeBg.id === bg.id ? '#0077ff' : 'transparent',
                  boxShadow: activeBg.id === bg.id ? '0 0 0 2px #0077ff44' : undefined,
                }}
              />
              <span className="text-[10px] text-gray-400 dark:text-gray-500 whitespace-nowrap">{bg.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Слайдеры */}
      {activeBg.id !== 'none' && (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Размытие</span><span>{blur}px</span>
            </div>
            <input type="range" min={0} max={20} value={blur} onChange={e => setBlur(Number(e.target.value))}
                   className="w-full accent-blue-500" />
          </div>
          <div>
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Затемнение</span><span>{dim}%</span>
            </div>
            <input type="range" min={0} max={70} value={dim} onChange={e => setDim(Number(e.target.value))}
                   className="w-full accent-blue-500" />
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-100 dark:border-cyan-900/50 rounded-xl px-3 py-2">
        <Image className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
        <span>Поддерживает: картинки, видео-фоны, YouTube, Twitch, Vimeo, Rutube и веб-страницы</span>
      </div>
    </div>
  )
}

const MESSAGES = [
  { id: 1, from: 'other', text: 'Привет! Как дела?',           read: true  },
  { id: 2, from: 'me',    text: 'Всё хорошо, спасибо!',        read: true  },
  { id: 3, from: 'other', text: 'Что делаешь сегодня вечером?',read: false },
]

function PrivacyDemo() {
  const [vkifyOn,   setVkifyOn]   = useState(false)
  const [typing,    setTyping]    = useState(false)
  const [showOnline,setShowOnline]= useState(true)

  // Симулируем появление индикатора "печатает..."
  useEffect(() => {
    const interval = setInterval(() => {
      setTyping(true)
      const t = setTimeout(() => setTyping(false), 2500)
      return () => clearTimeout(t)
    }, 4000)
    setTyping(true)
    return () => clearInterval(interval)
  }, [])

  const theme   = THEMES[1] // GitHub Dark
  const textHi  = 'rgba(255,255,255,0.85)'
  const textLo  = 'rgba(255,255,255,0.40)'
  const cardBg  = theme.card
  const border  = 'rgba(255,255,255,0.07)'

  return (
    <div className="space-y-4">
      {/* Чат-макет */}
      <div className="rounded-2xl overflow-hidden" style={{ background: theme.bg, minHeight: 310 }}>
        {/* Заголовок чата */}
        <div className="flex items-center gap-3 px-4 py-2.5" style={{ background: cardBg, borderBottom: `1px solid ${border}` }}>
          <div className="relative shrink-0">
            <div className="w-9 h-9 rounded-full" style={{ background: theme.accent }} />
            {/* Зелёная точка онлайн */}
            <AnimatePresence>
              {(!vkifyOn || showOnline) && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2"
                  style={{ background: '#22c55e', borderColor: cardBg }}
                />
              )}
            </AnimatePresence>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-20 rounded-full opacity-60" style={{ background: textHi }} />
            </div>
            <AnimatePresence mode="wait">
              {vkifyOn ? (
                <motion.p key="hidden" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
                          className="text-[10px]" style={{ color: '#22c55e' }}>
                  онлайн скрыт VKify
                </motion.p>
              ) : (
                <motion.p key="online" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
                          className="text-[10px] font-semibold" style={{ color: '#22c55e' }}>
                  онлайн
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          <div className="ml-auto flex gap-1.5">
            <div className="w-5 h-5 rounded-full opacity-20" style={{ background: textHi }} />
            <div className="w-5 h-5 rounded-full opacity-20" style={{ background: textHi }} />
          </div>
        </div>

        {/* Сообщения */}
        <div className="p-3 space-y-2">
          {MESSAGES.map(msg => (
            <div key={msg.id}
                 className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div
                className="max-w-[70%] px-3 py-2 rounded-2xl"
                style={{
                  background: msg.from === 'me' ? theme.accent : cardBg,
                  borderRadius: msg.from === 'me' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                }}
              >
                <p className="text-xs font-medium leading-snug" style={{ color: msg.from === 'me' ? (isDarkColor(theme.accent) ? '#fff' : '#000') : textHi }}>
                  {msg.text}
                </p>
                {/* Галочки прочтения */}
                {msg.from === 'me' && (
                  <div className="flex justify-end mt-0.5">
                    <AnimatePresence>
                      {(!vkifyOn) && (
                        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
                                    className="flex gap-0.5 items-center">
                          <Check className="w-2.5 h-2.5 opacity-60" style={{ color: isDarkColor(theme.accent) ? '#fff' : '#000' }} />
                          {msg.read && <Check className="w-2.5 h-2.5 -ml-1.5 opacity-60" style={{ color: isDarkColor(theme.accent) ? '#fff' : '#000' }} />}
                        </motion.div>
                      )}
                      {vkifyOn && (
                        <motion.span key="blocked" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
                                     className="text-[9px] opacity-50" style={{ color: isDarkColor(theme.accent) ? '#fff' : '#000' }}>
                          скрыто
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Индикатор "печатает..." */}
          <div className="flex justify-start">
            <AnimatePresence>
              {typing && !vkifyOn && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="px-3 py-2 rounded-2xl flex items-center gap-1"
                  style={{ background: cardBg, borderRadius: '18px 18px 18px 4px' }}
                >
                  {[0,1,2].map(i => (
                    <motion.span key={i} className="w-1.5 h-1.5 rounded-full"
                                 style={{ background: textLo }}
                                 animate={{ y: [0,-4,0] }}
                                 transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }} />
                  ))}
                </motion.div>
              )}
              {vkifyOn && (
                <motion.div
                  key="blocked-typing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="px-3 py-1.5 rounded-xl"
                  style={{ background: '#22c55e18', border: '1px solid #22c55e33' }}
                >
                  <p className="text-[10px] font-medium" style={{ color: '#22c55e' }}>
                    «Печатает…» — скрыто VKify
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Тоггл VKify */}
      <button
        onClick={() => setVkifyOn(v => !v)}
        className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 active:scale-[0.98]"
        style={{
          background: vkifyOn ? '#f97316' : 'linear-gradient(135deg,#f97316,#ef4444)',
          color: '#fff',
        }}
      >
        <Lock className="w-4 h-4" />
        {vkifyOn ? 'VKify приватность ON — нажмите для выкл.' : 'Включить режим приватности'}
      </button>

      {/* Список фич */}
      <div className="grid grid-cols-2 gap-2">
        {[
          { emoji: '👻', text: 'Скрытие онлайн-статуса' },
          { emoji: '✓',  text: 'Блокировка прочтения' },
          { emoji: '⌨️', text: 'Скрытие «Печатает…»' },
          { emoji: '📖', text: 'Анонимный просмотр историй' },
        ].map(item => (
          <div key={item.text} className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 bg-orange-50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/30 rounded-xl px-2.5 py-2">
            <span>{item.emoji}</span>
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function LiveDemo() {
  const [activeTab, setActiveTab] = useState('themes')

  const tab = TABS.find(t => t.id === activeTab)

  return (
    <section className="py-20 lg:py-28 bg-gray-50 dark:bg-gray-900/50" id="live-demo">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Заголовок */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900/50 text-xs font-semibold text-blue-600 dark:text-blue-400 mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            Живая демонстрация — попробуйте прямо сейчас
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white tracking-tight"
          >
            Увидьте VK{' '}
            <span className="bg-gradient-to-r from-[#0077ff] to-cyan-400 bg-clip-text text-transparent">
              каким он должен быть
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Нажмите на любую вкладку и кликайте внутри — это настоящий интерактивный макет.
            Расширение делает именно так, только на живом VK.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-6 lg:gap-10 items-start">

          {/* Боковое меню вкладок */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0"
          >
            {TABS.map(t => {
              const active = activeTab === t.id
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`
                    flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-semibold
                    transition-all duration-200 shrink-0 lg:w-full text-left
                    ${active
                      ? 'bg-white dark:bg-gray-800 shadow-lg dark:shadow-none border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white'
                      : 'text-gray-500 dark:text-gray-400 hover:bg-white/60 dark:hover:bg-gray-800/60 hover:text-gray-900 dark:hover:text-white'
                    }
                  `}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br ${t.color}`}>
                    <t.Icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div>{t.label}</div>
                    {active && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[10px] font-normal text-gray-400 dark:text-gray-500"
                      >
                        {t.id === 'themes'     && 'Выберите цветовую схему'}
                        {t.id === 'adblock'    && 'Нажмите кнопку блокировки'}
                        {t.id === 'background' && 'Выберите стиль обоев'}
                        {t.id === 'privacy'    && 'Включите режим невидимки'}
                      </motion.div>
                    )}
                  </div>
                  {active && (
                    <motion.div
                      layoutId="tab-indicator"
                      className={`ml-auto w-1.5 h-6 rounded-full bg-gradient-to-b ${t.color} hidden lg:block`}
                    />
                  )}
                </button>
              )
            })}

            {/* CTA под вкладками (десктоп) */}
            <div className="hidden lg:block mt-4 p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Нравится?
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mb-3 leading-relaxed">
                Установите расширение — всё это будет работать на вашем настоящем VK бесплатно.
              </p>
              <a
                href={config.links.chromeWebStore}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-xl text-xs font-bold text-white transition-all hover:opacity-90 active:scale-[0.98]"
                style={{ background: 'linear-gradient(135deg,#0077ff,#0055cc)' }}
              >
                <Chrome className="w-3.5 h-3.5" />
                Установить бесплатно
                <Download className="w-3 h-3 opacity-70" />
              </a>
            </div>
          </motion.div>

          {/* Контент вкладки */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="bg-white dark:bg-gray-800 rounded-3xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm"
              >
                {activeTab === 'themes'     && <ThemesDemo />}
                {activeTab === 'adblock'    && <AdBlockDemo />}
                {activeTab === 'background' && <BackgroundDemo />}
                {activeTab === 'privacy'    && <PrivacyDemo />}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Мобильный CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 lg:hidden text-center"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Всё это доступно бесплатно — установите расширение и настройте VK под себя
          </p>
          <a
            href={config.links.chromeWebStore}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold text-white transition-all hover:opacity-90 active:scale-[0.98] shadow-lg shadow-blue-500/25"
            style={{ background: 'linear-gradient(135deg,#0077ff,#0055cc)' }}
          >
            <Chrome className="w-4 h-4" />
            Установить бесплатно
            <Download className="w-3.5 h-3.5 opacity-70" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}