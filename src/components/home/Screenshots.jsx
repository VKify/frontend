import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X, ZoomIn, Palette, ShieldOff, Code, Eye, ImageIcon, Type } from 'lucide-react'
import Section from '../common/Section'
import config from '../../config'
import { useTranslation } from '../../i18n'

// Тексты (title/description) — из i18n: screenshots.items.<mockup>.*
const screenshots = [
  { id: 1, icon: Palette,   color: 'from-purple-500 to-pink-500',   mockup: 'themes' },
  { id: 2, icon: ShieldOff, color: 'from-green-500 to-emerald-500', mockup: 'adblock' },
  { id: 3, icon: Code,      color: 'from-blue-500 to-cyan-500',     mockup: 'css' },
  { id: 4, icon: Eye,       color: 'from-orange-500 to-red-500',    mockup: 'privacy' },
  { id: 5, icon: ImageIcon, color: 'from-teal-500 to-cyan-500',     mockup: 'wallpapers' },
  { id: 6, icon: Type,      color: 'from-indigo-500 to-violet-500', mockup: 'fonts' },
]

// Хелпер: переведённые title/description скриншота (с подстановкой чисел)
function useScreenshotText() {
  const { t } = useTranslation()
  return (s) => ({
    title: t(`screenshots.items.${s.mockup}.title`),
    description: t(`screenshots.items.${s.mockup}.description`, { themes: config.stats.themes, fonts: config.stats.fonts }),
  })
}

function AuroraEffect() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[
        { left: '8%',  color: 'rgba(52,211,153,0.55)',  delay: 0,   w: 70 },
        { left: '30%', color: 'rgba(6,182,212,0.45)',   delay: 0.7, w: 55 },
        { left: '55%', color: 'rgba(59,130,246,0.50)',  delay: 0.3, w: 90 },
        { left: '78%', color: 'rgba(16,185,129,0.40)',  delay: 1.1, w: 65 },
      ].map((ray, i) => (
        <motion.div
          key={`ray-${i}`}
          className="absolute top-0 blur-2xl rounded-full"
          style={{
            left: ray.left,
            width: ray.w,
            height: '70%',
            background: `linear-gradient(180deg, ${ray.color}, transparent)`,
          }}
          animate={{ scaleY: [1, 1.4, 0.85, 1.2, 1], x: [-6, 6, -9, 4, -6], opacity: [0.6, 1, 0.65, 0.9, 0.6] }}
          transition={{ duration: 3 + i * 0.6, repeat: Infinity, delay: ray.delay, ease: 'easeInOut' }}
        />
      ))}
      {[...Array(18)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute rounded-full bg-white"
          style={{ top: `${(i * 13 + 3) % 55}%`, left: `${(i * 19 + 7) % 92}%`, width: i % 4 === 0 ? 2 : 1, height: i % 4 === 0 ? 2 : 1 }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 1.5 + (i % 3) * 0.6, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  )
}

function SunsetEffect() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute top-[15%] left-[30%] w-28 h-28 rounded-full blur-3xl bg-orange-400/60"
        animate={{ scale: [1, 1.4, 1], x: [-10, 12, -10], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-[35%] right-[20%] w-24 h-24 rounded-full blur-3xl bg-pink-500/55"
        animate={{ scale: [1.2, 0.85, 1.2], y: [-10, 10, -10] }}
        transition={{ duration: 3.5, repeat: Infinity, delay: 0.6, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[20%] left-[15%] w-20 h-20 rounded-full blur-3xl bg-purple-600/45"
        animate={{ scale: [0.9, 1.3, 0.9], x: [6, -8, 6] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1.2, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-purple-900/50 to-transparent"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </div>
  )
}

function CyberEffect() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Сетка */}
      <div
        className="absolute inset-0 opacity-[0.13]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(34,211,238,0.7) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(34,211,238,0.7) 1px, transparent 1px)',
          backgroundSize: '18px 18px',
        }}
      />

      {/* Сканирующая линия */}
      <motion.div
        className="absolute left-0 right-0 h-[2px]"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(34,211,238,0.9) 50%, transparent 100%)',
          boxShadow: '0 0 10px rgba(34,211,238,0.7), 0 0 20px rgba(34,211,238,0.3)',
        }}
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
      />

      {/* HUD-уголки */}
      {[
        'top-2 left-2 border-l-2 border-t-2',
        'top-2 right-2 border-r-2 border-t-2',
        'bottom-2 left-2 border-l-2 border-b-2',
        'bottom-2 right-2 border-r-2 border-b-2',
      ].map((cls, i) => (
        <div key={i} className={`absolute w-4 h-4 sm:w-5 sm:h-5 border-cyan-400/80 ${cls}`} />
      ))}

      {/* Данные слева */}
      <motion.div
        className="absolute top-[22%] left-3 font-mono text-cyan-400 space-y-0.5 opacity-80"
        style={{ fontSize: '7px' }}
        animate={{ opacity: [0.65, 1, 0.65] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      >
        <div>SYS: ONLINE</div>
        <div>ENC: AES-256</div>
        <motion.div
          style={{ color: '#a78bfa' }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 0.85, repeat: Infinity }}
        >
          VPN: ACTIVE
        </motion.div>
      </motion.div>

      {/* Данные справа */}
      <motion.div
        className="absolute bottom-[22%] right-3 font-mono text-violet-400 text-right space-y-0.5 opacity-70"
        style={{ fontSize: '7px' }}
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 2.2, repeat: Infinity, delay: 0.6 }}
      >
        <div>CPU: 4%</div>
        <div>MEM: 128MB</div>
        <div className="text-cyan-400">PRIV: 100%</div>
      </motion.div>

      {/* Центральный вращающийся HUD */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="w-10 h-10 sm:w-14 sm:h-14 border border-cyan-400/55 rotate-45"
          animate={{ rotate: [45, 405] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute inset-2 border border-violet-400/45 rotate-45"
          animate={{ rotate: [45, -315] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-300"
          animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.6, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          style={{ boxShadow: '0 0 8px rgba(34,211,238,1)' }}
        />
      </div>

      {/* Вертикальные импульсы */}
      {[22, 55, 80].map((left, i) => (
        <motion.div
          key={i}
          className="absolute top-0 bottom-0 w-px"
          style={{
            left: `${left}%`,
            background: `linear-gradient(180deg, transparent, rgba(${i === 1 ? '139,92,246' : '34,211,238'},0.45), transparent)`,
          }}
          animate={{ scaleY: [0, 1, 0], opacity: [0, 0.7, 0] }}
          transition={{ duration: 1.5 + i * 0.45, repeat: Infinity, delay: i * 0.65, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

const MATRIX_CHARS = '10ァアイウエオカキクケコサシスセタチツテナニランダム01'
const MATRIX_COLS  = 10
const MATRIX_ROWS  = 9

function MatrixEffect() {
  // Скорость каждой колонки фиксируется один раз (только клиент — useRef не SSR)
  const speeds = useRef(
    Array.from({ length: MATRIX_COLS }, (_, i) => 110 + i * 22 + Math.floor(Math.random() * 80))
  )

  // Детерминированное начальное состояние — без Math.random() во избежание hydration mismatch
  const [cols, setCols] = useState(() =>
    Array.from({ length: MATRIX_COLS }, (_, i) => ({
      head: -(i % 6) - 1,  // staggered, deterministic
      chars: Array.from({ length: MATRIX_ROWS }, (_, j) =>
        MATRIX_CHARS[(i * MATRIX_ROWS + j) % MATRIX_CHARS.length]
      ),
    }))
  )

  useEffect(() => {
    const timers = speeds.current.map((speed, colIdx) =>
      setInterval(() => {
        setCols(prev =>
          prev.map((col, i) => {
            if (i !== colIdx) return col
            // Когда хвост полностью ушёл за экран — рестарт с рандомной задержкой
            const nextHead = col.head >= MATRIX_ROWS + 4
              ? -Math.floor(Math.random() * 5)
              : col.head + 1
            return {
              head: nextHead,
              // Символы в колонке немного меняются — эффект «живых» знаков
              chars: col.chars.map(ch =>
                Math.random() < 0.1
                  ? MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
                  : ch
              ),
            }
          })
        )
      }, speed)
    )
    return () => timers.forEach(clearInterval)
  }, []) // deps пустые — speeds.current стабилен

  return (
    <div className="absolute inset-0 overflow-hidden bg-black p-1.5">
      <div
        className="grid h-full"
        style={{ gridTemplateColumns: `repeat(${MATRIX_COLS}, 1fr)` }}
      >
        {cols.map((col, colIdx) => (
          <div key={colIdx} className="flex flex-col">
            {col.chars.map((char, rowIdx) => {
              // dist < 0 — голова ещё не дошла до этой строки
              const dist = col.head - rowIdx
              const isHead  = dist === 0
              // Длина «хвоста» — 5 символов, экспоненциальное затухание
              const opacity = isHead
                ? 1
                : dist > 0 && dist < 6
                  ? Math.pow(1 - dist / 6, 1.4)
                  : 0

              return (
                <div
                  key={rowIdx}
                  className="flex-1 text-center font-mono select-none"
                  style={{
                    fontSize: '9px',
                    lineHeight: 1.5,
                    opacity,
                    color: isHead ? '#f0fff4' : '#4ade80',
                    textShadow: isHead
                      ? '0 0 6px #fff, 0 0 14px #4ade80, 0 0 22px #16a34a'
                      : opacity > 0.45
                      ? '0 0 5px #22c55e'
                      : 'none',
                  }}
                >
                  {opacity > 0 ? char : ' '}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

function SpaceEffect() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(35)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            top: `${(i * 17 + 3) % 95}%`,
            left: `${(i * 23 + 7) % 95}%`,
            width: i % 6 === 0 ? 2.5 : i % 3 === 0 ? 1.5 : 1,
            height: i % 6 === 0 ? 2.5 : i % 3 === 0 ? 1.5 : 1,
          }}
          animate={{ opacity: [0.1, 1, 0.1], scale: i % 5 === 0 ? [1, 1.8, 1] : 1 }}
          transition={{ duration: 1.2 + (i % 4) * 0.4, repeat: Infinity, delay: i * 0.08 }}
        />
      ))}
      <motion.div
        className="absolute top-[30%] left-[45%] w-20 h-14 rounded-full blur-3xl bg-indigo-500/30"
        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[25%] right-[30%] w-14 h-14 rounded-full blur-2xl bg-violet-600/25"
        animate={{ scale: [1.2, 0.8, 1.2], opacity: [0.25, 0.5, 0.25] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1.5, ease: 'easeInOut' }}
      />
    </div>
  )
}

function WavesEffect() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute w-[130%] -left-[15%]"
          style={{ bottom: `${10 + i * 14}%`, height: 50 }}
          animate={{ x: ['0%', '-8%', '0%'] }}
          transition={{ duration: 3 + i * 0.7, repeat: Infinity, delay: i * 0.5, ease: 'easeInOut' }}
        >
          <svg viewBox="0 0 400 50" preserveAspectRatio="none" className="w-full h-full">
            <path
              d={`M0,25 C50,${10 + i * 5} 100,${40 - i * 5} 150,25 C200,${10 + i * 5} 250,${40 - i * 5} 300,25 C350,${10 + i * 5} 400,${40 - i * 5} 400,25 L400,50 L0,50 Z`}
              fill={`rgba(${i === 0 ? '56,189,248' : i === 1 ? '14,165,233' : '2,132,199'},${0.35 - i * 0.08})`}
            />
          </svg>
        </motion.div>
      ))}
      <motion.div
        className="absolute top-[20%] left-[40%] w-24 h-12 rounded-full blur-3xl bg-cyan-300/25"
        animate={{ x: [-15, 15, -15], opacity: [0.25, 0.5, 0.25] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

const WALLPAPERS_DATA = [
  { id: 'aurora', thumb: 'from-green-400 via-teal-500 to-blue-600',    bg: 'from-emerald-950 via-teal-900 to-blue-950',    Effect: AuroraEffect },
  { id: 'sunset', thumb: 'from-orange-400 via-pink-500 to-purple-600',  bg: 'from-orange-950 via-rose-950 to-purple-950',   Effect: SunsetEffect },
  { id: 'cyber',  thumb: 'from-violet-600 via-blue-600 to-cyan-400',    bg: 'from-indigo-950 via-blue-950 to-cyan-950',     Effect: CyberEffect  },
  { id: 'matrix', thumb: 'from-green-900 via-green-600 to-black',       bg: 'from-green-950 via-green-900 to-black',        Effect: MatrixEffect },
  { id: 'space',  thumb: 'from-slate-900 via-indigo-950 to-slate-900',  bg: 'from-slate-950 via-indigo-950 to-slate-950',   Effect: SpaceEffect  },
  { id: 'waves',  thumb: 'from-sky-500 via-cyan-400 to-blue-600',       bg: 'from-sky-950 via-cyan-900 to-blue-950',        Effect: WavesEffect  },
]

function WallpapersMockup({ isActive }) {
  const { t } = useTranslation()
  const [active, setActive] = useState(0)
  const wp = WALLPAPERS_DATA[active]
  const Effect = wp.Effect

  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* Живой обой */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
          className={`absolute inset-0 bg-gradient-to-br ${wp.bg}`}
        >
          <Effect />
        </motion.div>
      </AnimatePresence>

      {/* VK-интерфейс поверх обоя */}
      <div className="absolute inset-0 flex flex-col justify-between p-3 sm:p-4">
        {/* Навбар */}
        <div className="flex items-center gap-2 bg-black/25 backdrop-blur-md rounded-xl px-3 py-2 border border-white/10 pointer-events-none">
          <div className="w-5 h-5 rounded bg-[#0077ff] flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-[8px]">VK</span>
          </div>
          <div className="flex-1 h-1.5 rounded bg-white/25" />
          <div className="w-5 h-5 rounded-full bg-white/20" />
        </div>

        {/* Пост */}
        <div className="bg-white/15 backdrop-blur-xl rounded-2xl border border-white/25 p-3 sm:p-4 shadow-2xl pointer-events-none">
          <div className="flex items-center gap-2 mb-2.5">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex-shrink-0" />
            <div className="space-y-1 flex-1">
              <div className="w-20 sm:w-24 h-1.5 rounded bg-white/75" />
              <div className="w-14 h-1 rounded bg-white/45" />
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="w-full h-1.5 rounded bg-white/50" />
            <div className="w-4/5 h-1.5 rounded bg-white/40" />
            <div className="w-3/5 h-1.5 rounded bg-white/30" />
          </div>
        </div>

        {/* Выбор обоя */}
        <div className="flex gap-1.5 justify-center">
          {WALLPAPERS_DATA.map((w, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => setActive(i)}
              className={`rounded-lg sm:rounded-xl bg-gradient-to-br ${w.thumb} transition-all duration-150 relative overflow-hidden
                ${i === active
                  ? 'ring-2 ring-white shadow-lg shadow-white/30'
                  : 'opacity-55 hover:opacity-85'}`}
              style={{ width: i === active ? 52 : 28, height: i === active ? 36 : 24 }}
              title={t(`screenshots.mockup.wallpapers.${w.id}`)}
            >
              {i === active && (
                <motion.div
                  layoutId="activeThumbDot"
                  className="absolute inset-0 flex items-end justify-center pb-0.5"
                >
                  <div className="w-1 h-1 rounded-full bg-white/90 shadow" />
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}

function ScreenMockup({ type, isActive }) {
  const { t } = useTranslation()
  const baseClasses = "w-full h-full"

  if (type === 'themes') {
    return (
      <div className={baseClasses + " bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-4 sm:p-6"}>
        <div className="h-full flex flex-col">
          <div className="h-8 sm:h-10 bg-white dark:bg-gray-800 rounded-lg mb-3 sm:mb-4 flex items-center px-3 sm:px-4 gap-2">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-purple-500" />
            <div className="w-16 sm:w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
          <div className="flex-1 grid grid-cols-4 gap-2 sm:gap-3">
            {['#0077ff', '#9333ea', '#22c55e', '#f97316', '#ef4444', '#ec4899', '#06b6d4', '#eab308'].map((color, i) => (
              <motion.div
                key={i}
                initial={false}
                animate={isActive ? { scale: [0.8, 1], opacity: [0, 1] } : { scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-lg sm:rounded-xl flex items-center justify-center"
                style={{ backgroundColor: color + '20', border: `2px solid ${color}` }}
              >
                <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full" style={{ backgroundColor: color }} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  
  if (type === 'adblock') {
    return (
      <div className={baseClasses + " bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-4 sm:p-6"}>
        <div className="h-full flex gap-3 sm:gap-4">
          <div className="hidden sm:block w-1/4 bg-white dark:bg-gray-800 rounded-xl p-2 sm:p-3 space-y-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-6 sm:h-8 bg-gray-100 dark:bg-gray-700 rounded-lg" />
            ))}
          </div>
          <div className="flex-1 space-y-3 sm:space-y-4">
            {[1, 2].map((i) => (
              <motion.div
                key={i}
                initial={false}
                animate={isActive ? { x: [20, 0], opacity: [0, 1] } : { x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-3 sm:p-4 h-24 sm:h-32"
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex-shrink-0" />
                  <div className="space-y-1 min-w-0">
                    <div className="w-20 sm:w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded" />
                    <div className="w-14 sm:w-16 h-2 bg-gray-100 dark:bg-gray-600 rounded" />
                  </div>
                </div>
                <div className="space-y-1.5 sm:space-y-2">
                  <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded" />
                  <div className="w-3/4 h-2 bg-gray-100 dark:bg-gray-700 rounded" />
                </div>
              </motion.div>
            ))}
            <motion.div
              initial={false}
              animate={isActive ? { scale: [0.9, 1], opacity: [0, 1] } : { scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center gap-2 py-2 text-green-500"
            >
              <ShieldOff className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-[10px] sm:text-xs font-medium">{t('screenshots.mockup.adblockHidden')}</span>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }
  
  if (type === 'css') {
    return (
      <div className={baseClasses + " bg-gray-900 p-3 sm:p-4 font-mono"}>
        <motion.div
          initial={false}
          animate={isActive ? { opacity: [0, 1] } : { opacity: 1 }}
          className="space-y-0.5 sm:space-y-1 text-[10px] sm:text-xs md:text-sm overflow-x-auto"
        >
          <div><span className="text-purple-400">.vk_feed</span> <span className="text-white">{'{'}</span></div>
          <div className="pl-3 sm:pl-4"><span className="text-cyan-400">background</span><span className="text-white">:</span> <span className="text-orange-400">#1a1a2e</span><span className="text-white">;</span></div>
          <div className="pl-3 sm:pl-4"><span className="text-cyan-400">border-radius</span><span className="text-white">:</span> <span className="text-green-400">16px</span><span className="text-white">;</span></div>
          <div className="pl-3 sm:pl-4"><span className="text-cyan-400">padding</span><span className="text-white">:</span> <span className="text-green-400">20px</span><span className="text-white">;</span></div>
          <div><span className="text-white">{'}'}</span></div>
          <div className="mt-1 sm:mt-2"><span className="text-purple-400">.post_header</span> <span className="text-white">{'{'}</span></div>
          <div className="pl-3 sm:pl-4"><span className="text-cyan-400">color</span><span className="text-white">:</span> <span className="text-orange-400">#fff</span><span className="text-white">;</span></div>
          <div><span className="text-white">{'}'}</span></div>
        </motion.div>
      </div>
    )
  }
  
  if (type === 'privacy') {
    // Показываем реальный диалог VK с заблокированными галочками
    return (
      <div className={baseClasses + " bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-4 sm:p-6 flex flex-col gap-3"}>
        {/* Заголовок диалога */}
        <motion.div
          initial={false}
          animate={isActive ? { opacity: [0, 1], y: [-8, 0] } : { opacity: 1, y: 0 }}
          className="flex items-center gap-2.5 bg-white dark:bg-gray-800 rounded-xl px-3 py-2.5 shadow-sm"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">{t('screenshots.mockup.privacy.name')}</div>
            {/* Онлайн скрыт — показываем «был недавно» вместо зелёной точки */}
            <div className="text-[10px] sm:text-xs text-gray-400">{t('screenshots.mockup.privacy.seen')}</div>
          </div>
          <div className="flex items-center gap-1 bg-orange-100 dark:bg-orange-900/30 rounded-lg px-2 py-1">
            <svg className="w-3 h-3 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
              <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
            </svg>
          </div>
        </motion.div>

        {/* Сообщения */}
        <div className="flex-1 space-y-2">
          {/* Входящее */}
          <motion.div
            initial={false}
            animate={isActive ? { opacity: [0, 1], x: [-12, 0] } : { opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex gap-2 items-end"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex-shrink-0" />
            <div className="bg-white dark:bg-gray-700 rounded-2xl rounded-bl-sm px-3 py-2 max-w-[65%]">
              <p className="text-xs sm:text-sm text-gray-800 dark:text-white">{t('screenshots.mockup.privacy.incoming')}</p>
            </div>
          </motion.div>

          {/* Исходящее — без галочек прочтения */}
          <motion.div
            initial={false}
            animate={isActive ? { opacity: [0, 1], x: [12, 0] } : { opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-end"
          >
            <div className="bg-[#0077ff] rounded-2xl rounded-br-sm px-3 py-2 max-w-[65%]">
              <p className="text-xs sm:text-sm text-white">{t('screenshots.mockup.privacy.outgoing')}</p>
              <div className="flex items-center justify-end gap-1 mt-0.5">
                <span className="text-[9px] text-blue-200">14:32</span>
                {/* Галочка одна (доставлено), но не синяя (прочтение скрыто) */}
                <svg className="w-3 h-3 text-blue-300" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Индикатор «не печатает» */}
          <motion.div
            initial={false}
            animate={isActive ? { opacity: [0, 1] } : { opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="flex items-center gap-2 ml-8"
          >
            <div className="flex gap-1">
              {[0,1,2].map(i => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600" />
              ))}
            </div>
            <span className="text-[10px] text-gray-400 line-through">{t('screenshots.mockup.privacy.typing')}</span>
            <span className="text-[10px] text-orange-400 font-medium">{t('screenshots.mockup.privacy.hidden')}</span>
          </motion.div>
        </div>

        {/* Плашка «что скрыто» */}
        <motion.div
          initial={false}
          animate={isActive ? { opacity: [0, 1], y: [8, 0] } : { opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="grid grid-cols-3 gap-1.5"
        >
          {[t('screenshots.mockup.privacy.read'), t('screenshots.mockup.privacy.typingLabel')].map((label) => (
            <div key={label} className="bg-orange-500/10 border border-orange-500/20 rounded-lg py-1 text-center">
              <span className="text-[9px] sm:text-[10px] text-orange-600 dark:text-orange-400 font-semibold">{label} ✓</span>
            </div>
          ))}
        </motion.div>
      </div>
    )
  }

  if (type === 'wallpapers') {
    return <WallpapersMockup isActive={isActive} />
  }

  if (type === 'fonts') {
    return <FontsMockup isActive={isActive} />
  }

  return null
}

// Отдельный компонент — useState нельзя вызывать внутри условия
const FONTS = [
  { name: 'Roboto', family: '"Roboto", "Helvetica Neue", sans-serif' },
  { name: 'Georgia', family: 'Georgia, "Times New Roman", serif' },
  { name: 'Courier New', family: '"Courier New", Courier, monospace' },
  { name: 'Verdana', family: 'Verdana, Geneva, Tahoma, sans-serif' },
  { name: 'Palatino', family: 'Palatino, "Palatino Linotype", serif' },
]

function FontsMockup({ isActive }) {
  const { t } = useTranslation()
  const [activeFont, setActiveFont] = useState(0)
  const font = FONTS[activeFont]

  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex flex-col">
      {/* Превью шрифта — имитация VK поста */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFont}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex-1 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-3 sm:p-4"
        >
          <div className="flex items-center gap-2 mb-2.5">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex-shrink-0" />
            <div>
              <div className="text-xs font-semibold text-gray-900 dark:text-white" style={{ fontFamily: font.family }}>
                {t('screenshots.mockup.fonts.name')}
              </div>
              <div className="text-[10px] text-gray-400">{t('screenshots.mockup.fonts.time')}</div>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-gray-800 dark:text-gray-200 leading-relaxed" style={{ fontFamily: font.family }}>
            {t('screenshots.mockup.fonts.sample')}
          </p>
          <div className="mt-1.5 inline-block bg-indigo-100 dark:bg-indigo-900/30 rounded px-1.5 py-0.5">
            <span className="text-[9px] sm:text-[10px] text-indigo-600 dark:text-indigo-400 font-mono">{font.name}</span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Список шрифтов */}
      <div className="flex flex-col divide-y divide-gray-100 dark:divide-gray-700/50">
        {FONTS.map((f, i) => (
          <motion.button
            key={i}
            initial={false}
            animate={isActive ? { opacity: [0, 1], x: [-10, 0] } : { opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            onClick={() => setActiveFont(i)}
            className={`flex items-center justify-between px-3 py-1.5 sm:py-2 text-left transition-colors
              ${i === activeFont ? 'bg-indigo-50 dark:bg-indigo-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-700/30'}`}
          >
            <span
              className={`text-sm sm:text-base ${i === activeFont ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-700 dark:text-gray-300'}`}
              style={{ fontFamily: f.family }}
            >
              {f.name}
            </span>
            {i === activeFont && (
              <div className="w-4 h-4 rounded-full bg-indigo-500 flex items-center justify-center flex-shrink-0">
                <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

function ThumbnailCard({ screenshot, isActive, onSelect }) {
  const Icon = screenshot.icon
  const { title, description } = useScreenshotText()(screenshot)

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className={`
        relative w-full p-3 xl:p-4 rounded-xl xl:rounded-2xl text-left transition-all duration-150
        ${isActive
          ? 'bg-white dark:bg-gray-800 shadow-xl border-2 border-blue-500'
          : 'bg-gray-100 dark:bg-gray-800/50 border-2 border-transparent hover:bg-white dark:hover:bg-gray-800'
        }
      `}
    >
      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 xl:w-10 xl:h-10 flex-shrink-0 rounded-lg xl:rounded-xl bg-gradient-to-br ${screenshot.color} flex items-center justify-center`}>
          <Icon className="w-4 h-4 xl:w-5 xl:h-5 text-white" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-semibold text-gray-900 dark:text-white text-xs xl:text-sm truncate">
            {title}
          </div>
          <div className="text-[10px] xl:text-xs text-gray-500 dark:text-gray-400 truncate">
            {description}
          </div>
        </div>
      </div>
    </motion.button>
  )
}

// Рамка «браузер» с контентом мокапа. compact — мобильный вариант.
function BrowserFrame({ screenshot, contentKey, compact, onZoom, onPrev, onNext }) {
  const { t } = useTranslation()
  const { title, description } = useScreenshotText()(screenshot)
  const Icon = screenshot.icon
  const enter = compact
    ? { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 } }
    : { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 1.05 } }

  return (
    <div className={`relative overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 ${compact ? 'rounded-xl sm:rounded-2xl shadow-xl' : 'rounded-2xl shadow-2xl'}`}>
      {/* Browser header */}
      <div className={`flex items-center bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 ${compact ? 'px-3 py-2' : 'px-4 py-3'}`}>
        <div className={`flex gap-1.5 flex-shrink-0 ${compact ? 'w-12' : 'w-14'}`}>
          {['bg-red-500', 'bg-yellow-500', 'bg-green-500'].map(c => (
            <div key={c} className={`rounded-full ${c} ${compact ? 'w-2.5 h-2.5' : 'w-3 h-3'}`} />
          ))}
        </div>

        <div className="flex-1 flex justify-center">
          <div className={`flex items-center bg-white dark:bg-gray-900 text-gray-500 ${compact ? 'gap-1.5 px-3 py-1 rounded-md text-xs' : 'gap-2 px-4 py-1.5 rounded-lg text-sm'}`}>
            <div className={`rounded bg-green-500/20 flex items-center justify-center ${compact ? 'w-3 h-3' : 'w-4 h-4'}`}>
              <div className={`rounded-full bg-green-500 ${compact ? 'w-1.5 h-1.5' : 'w-2 h-2'}`} />
            </div>
            <span>vk.com</span>
          </div>
        </div>

        <div className={`flex-shrink-0 flex justify-end ${compact ? 'w-12' : 'w-14'}`}>
          <button
            onClick={onZoom}
            className={`hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${compact ? 'p-1 rounded-md' : 'p-1.5 rounded-lg'}`}
            aria-label={t('screenshots.openFullscreen')}
          >
            <ZoomIn className={`text-gray-500 ${compact ? 'w-3.5 h-3.5' : 'w-4 h-4'}`} />
          </button>
        </div>
      </div>

      {/* Screenshot content */}
      <div className="aspect-video relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div key={contentKey} {...enter} transition={{ duration: 0.3 }} className="absolute inset-0">
            <ScreenMockup type={screenshot.mockup} isActive={true} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Caption bar */}
      <div className={`bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 ${compact ? 'px-4 py-3' : 'px-6 py-4'}`}>
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className={`font-bold text-gray-900 dark:text-white ${compact ? 'text-sm' : ''}`}>
              {title}
            </h3>
            <p className={`text-gray-500 dark:text-gray-400 ${compact ? 'text-xs truncate' : 'text-sm'}`}>
              {description}
            </p>
          </div>
          <div className={`flex-shrink-0 bg-gradient-to-br ${screenshot.color} flex items-center justify-center ${compact ? 'w-8 h-8 rounded-lg' : 'w-10 h-10 rounded-xl'}`}>
            <Icon className={`text-white ${compact ? 'w-4 h-4' : 'w-5 h-5'}`} />
          </div>
        </div>
      </div>

      {/* Navigation buttons — только в десктопном варианте */}
      {!compact && (
        <>
          <button
            onClick={onPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:text-blue-500 hover:scale-110 transition-all z-10"
            aria-label={t('screenshots.prev')}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:text-blue-500 hover:scale-110 transition-all z-10"
            aria-label={t('screenshots.next')}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}
    </div>
  )
}

// Индикатор-точки под превью. compact — мобильный вариант (без авто-прогресса).
function ProgressDots({ compact, currentIndex, isAutoPlaying, onSelect }) {
  const { t } = useTranslation()
  return (
    <div className={`flex justify-center ${compact ? 'gap-1.5 mt-4' : 'gap-2 mt-6'}`}>
      {screenshots.map((_, index) => {
        const active = index === currentIndex
        return (
          <button
            key={index}
            onClick={() => onSelect(index)}
            className={`relative rounded-full overflow-hidden transition-all duration-150 ${compact ? 'h-1.5' : 'h-2'}`}
            style={{ width: active ? (compact ? 24 : 32) : (compact ? 6 : 8) }}
            aria-label={t('screenshots.goTo', { n: index + 1 })}
          >
            <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700" />
            {active && !compact && isAutoPlaying && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 5, ease: 'linear' }}
                className="absolute inset-0 bg-blue-500 origin-left"
              />
            )}
            {active && (compact || !isAutoPlaying) && (
              <div className="absolute inset-0 bg-blue-500" />
            )}
          </button>
        )
      })}
    </div>
  )
}

export default function Screenshots() {
  const { t } = useTranslation()
  const getText = useScreenshotText()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [touchStart, setTouchStart] = useState(null)

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % screenshots.length)
  }, [])

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length)
  }, [])

  useEffect(() => {
    if (!isAutoPlaying || isLightboxOpen) return
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [isAutoPlaying, isLightboxOpen, next])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'Escape') setIsLightboxOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [next, prev])

  useEffect(() => {
    document.body.style.overflow = isLightboxOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isLightboxOpen])

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchEnd = (e) => {
    if (!touchStart) return
    const touchEnd = e.changedTouches[0].clientX
    const diff = touchStart - touchEnd

    if (Math.abs(diff) > 50) {
      if (diff > 0) next()
      else prev()
      setIsAutoPlaying(false)
    }
    setTouchStart(null)
  }

  const currentScreenshot = screenshots[currentIndex]

  const selectScreenshot = useCallback((index) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }, [])

  return (
    <Section id="screenshots" variant="default">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            {t('screenshots.titleTop')}{' '}
            <span className="bg-gradient-to-r from-[#0077ff] to-cyan-400 bg-clip-text text-transparent">
              {t('screenshots.titleAccent')}
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('screenshots.subtitle')}
          </p>
        </motion.div>

{/* Desktop Layout */}
<div className="hidden lg:flex gap-6 xl:gap-8 items-center">
  {/* Thumbnails - Left Side */}
  <div className="w-52 xl:w-64 flex-shrink-0 flex flex-col gap-3 xl:gap-4">
    {screenshots.slice(0, Math.ceil(screenshots.length / 2)).map((screenshot, index) => (
      <ThumbnailCard
        key={screenshot.id}
        screenshot={screenshot}
        isActive={index === currentIndex}
        onSelect={() => selectScreenshot(index)}
      />
    ))}
  </div>

  {/* Main Preview - Center (занимает всё оставшееся место) */}
  <div 
    className="flex-1 min-w-0"
    onMouseEnter={() => setIsAutoPlaying(false)}
    onMouseLeave={() => setIsAutoPlaying(true)}
  >
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative"
    >
      {/* Glow effect */}
      <div className={`absolute -inset-4 bg-gradient-to-r ${currentScreenshot.color} opacity-20 blur-3xl rounded-3xl transition-all duration-500`} />

      <BrowserFrame
        screenshot={currentScreenshot}
        contentKey={currentIndex}
        onZoom={() => setIsLightboxOpen(true)}
        onPrev={prev}
        onNext={next}
      />
    </motion.div>

    <ProgressDots
      currentIndex={currentIndex}
      isAutoPlaying={isAutoPlaying}
      onSelect={selectScreenshot}
    />
  </div>

  {/* Thumbnails - Right Side */}
  <div className="w-52 xl:w-64 flex-shrink-0 flex flex-col gap-3 xl:gap-4">
    {screenshots.slice(Math.ceil(screenshots.length / 2)).map((screenshot, index) => {
      const realIndex = index + Math.ceil(screenshots.length / 2)
      return (
        <ThumbnailCard
          key={screenshot.id}
          screenshot={screenshot}
          isActive={realIndex === currentIndex}
          onSelect={() => selectScreenshot(realIndex)}
        />
      )
    })}
  </div>
</div>

        {/* Mobile/Tablet Layout */}
        <div 
          className="lg:hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Glow effect */}
            <div className={`absolute -inset-2 bg-gradient-to-r ${currentScreenshot.color} opacity-20 blur-2xl rounded-2xl transition-all duration-500`} />

            <BrowserFrame
              compact
              screenshot={currentScreenshot}
              contentKey={currentIndex}
              onZoom={() => setIsLightboxOpen(true)}
            />
          </motion.div>

          <ProgressDots
            compact
            currentIndex={currentIndex}
            isAutoPlaying={isAutoPlaying}
            onSelect={selectScreenshot}
          />

          {/* Swipe hint */}
          <p className="text-center text-xs text-gray-400 mt-2">
            {t('screenshots.swipeHint')}
          </p>

          {/* Mobile thumbnails */}
          <div className="flex justify-center gap-2 mt-4 overflow-x-auto pb-2 pt-2">
            {screenshots.map((screenshot, index) => {
              const Icon = screenshot.icon
              return (
                <button
                  key={screenshot.id}
                  onClick={() => selectScreenshot(index)}
                  className={`
                    flex-shrink-0 p-2.5 rounded-lg transition-all
                    ${index === currentIndex 
                      ? 'bg-white dark:bg-gray-800 shadow-lg ring-2 ring-blue-500' 
                      : 'bg-gray-100 dark:bg-gray-800/50'
                    }
                  `}
                  aria-label={getText(screenshot).title}
                >
                  <div className={`w-7 h-7 rounded-md bg-gradient-to-br ${screenshot.color} flex items-center justify-center`}>
                    <Icon className="w-3.5 h-3.5 text-white" />
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4"
            onClick={() => setIsLightboxOpen(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Close button */}
            <button
              className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
              onClick={() => setIsLightboxOpen(false)}
              aria-label={t('screenshots.close')}
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>

            {/* Content */}
            <div className="flex flex-col items-center justify-center w-full max-w-5xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="w-full rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="aspect-video">
                  <ScreenMockup type={currentScreenshot.mockup} isActive={true} />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mt-4 sm:mt-6 text-center px-4"
              >
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2">
                  {getText(currentScreenshot).title}
                </h3>
                <p className="text-white/60 text-sm sm:text-base max-w-md">
                  {getText(currentScreenshot).description}
                </p>
              </motion.div>

              {/* Dots */}
              <div className="flex justify-center gap-2 mt-4 sm:mt-6">
                {screenshots.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => { 
                      e.stopPropagation()
                      setCurrentIndex(index)
                    }}
                    className={`h-2 rounded-full transition-all ${
                      index === currentIndex 
                        ? 'bg-white w-6' 
                        : 'bg-white/30 hover:bg-white/50 w-2'
                    }`}
                    aria-label={t('screenshots.goTo', { n: index + 1 })}
                  />
                ))}
              </div>
            </div>

            {/* Navigation arrows */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="hidden sm:block absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label={t('screenshots.prev')}
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="hidden sm:block absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label={t('screenshots.next')}
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  )
}