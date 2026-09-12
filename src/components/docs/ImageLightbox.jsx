import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Minus, Plus, RotateCcw, X } from 'lucide-react'

const MIN_SCALE = 1
const MAX_SCALE = 4
const SCALE_STEP = 0.5

const distance = (touches) => Math.hypot(
  touches[0].clientX - touches[1].clientX,
  touches[0].clientY - touches[1].clientY,
)

export default function ImageLightbox({ src, alt, onClose, t }) {
  const [scale, setScale] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const gesture = useRef(null)

  const setSafeScale = (next) => {
    const value = Math.min(MAX_SCALE, Math.max(MIN_SCALE, next))
    setScale(value)
    if (value === MIN_SCALE) setOffset({ x: 0, y: 0 })
  }

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === '+' || event.key === '=') setSafeScale(scale + SCALE_STEP)
      if (event.key === '-') setSafeScale(scale - SCALE_STEP)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onClose, scale])

  const onTouchStart = (event) => {
    if (event.touches.length === 2) {
      gesture.current = { type: 'pinch', distance: distance(event.touches), scale }
    } else if (event.touches.length === 1 && scale > 1) {
      gesture.current = {
        type: 'pan',
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
        offset,
      }
    }
  }

  const onTouchMove = (event) => {
    if (!gesture.current) return
    event.preventDefault()
    if (gesture.current.type === 'pinch' && event.touches.length === 2) {
      setSafeScale(gesture.current.scale * (distance(event.touches) / gesture.current.distance))
    } else if (gesture.current.type === 'pan' && event.touches.length === 1) {
      setOffset({
        x: gesture.current.offset.x + event.touches[0].clientX - gesture.current.x,
        y: gesture.current.offset.y + event.touches[0].clientY - gesture.current.y,
      })
    }
  }

  const reset = () => {
    setScale(1)
    setOffset({ x: 0, y: 0 })
  }

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t('docsPage.imageViewer')}
      className="fixed inset-0 z-[100] flex flex-col bg-gray-950/95 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="relative z-10 flex h-16 flex-shrink-0 items-center justify-between gap-3 border-b border-white/10 px-3 sm:px-5">
        <p className="min-w-0 truncate text-sm text-white/70">{alt}</p>
        <div className="flex flex-shrink-0 items-center gap-1 rounded-xl bg-white/10 p-1">
          <button type="button" onClick={() => setSafeScale(scale - SCALE_STEP)} disabled={scale <= MIN_SCALE} aria-label={t('docsPage.zoomOut')} className="flex h-9 w-9 items-center justify-center rounded-lg text-white/80 transition hover:bg-white/10 disabled:opacity-30">
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-12 text-center text-xs font-medium tabular-nums text-white/70">{Math.round(scale * 100)}%</span>
          <button type="button" onClick={() => setSafeScale(scale + SCALE_STEP)} disabled={scale >= MAX_SCALE} aria-label={t('docsPage.zoomIn')} className="flex h-9 w-9 items-center justify-center rounded-lg text-white/80 transition hover:bg-white/10 disabled:opacity-30">
            <Plus className="h-4 w-4" />
          </button>
          <button type="button" onClick={reset} aria-label={t('docsPage.zoomReset')} className="flex h-9 w-9 items-center justify-center rounded-lg text-white/80 transition hover:bg-white/10">
            <RotateCcw className="h-4 w-4" />
          </button>
          <button type="button" onClick={onClose} aria-label={t('docsPage.imageClose')} className="flex h-9 w-9 items-center justify-center rounded-lg text-white/80 transition hover:bg-white/10">
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        className={`flex min-h-0 flex-1 select-none items-center justify-center overflow-hidden p-3 sm:p-6 touch-none ${scale > 1 ? 'cursor-grab active:cursor-grabbing' : ''}`}
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) {
            onClose()
          } else if (scale > 1) {
            gesture.current = { type: 'mouse-pan', x: event.clientX, y: event.clientY, offset }
          }
        }}
        onMouseMove={(event) => {
          if (gesture.current?.type !== 'mouse-pan') return
          setOffset({
            x: gesture.current.offset.x + event.clientX - gesture.current.x,
            y: gesture.current.offset.y + event.clientY - gesture.current.y,
          })
        }}
        onMouseUp={() => { gesture.current = null }}
        onMouseLeave={() => { gesture.current = null }}
        onWheel={(event) => {
          event.preventDefault()
          setSafeScale(scale + (event.deltaY < 0 ? SCALE_STEP : -SCALE_STEP))
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={() => { gesture.current = null }}
        onDoubleClick={() => { if (scale === 1) setSafeScale(2); else reset() }}
      >
        <img
          src={src}
          alt={alt}
          draggable="false"
          className="max-h-full max-w-full rounded-lg object-contain shadow-2xl will-change-transform"
          style={{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${scale})` }}
        />
      </div>

      <p className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/40 px-3 py-1.5 text-center text-[11px] text-white/55 sm:bottom-5">
        {t('docsPage.zoomHint')}
      </p>
    </div>,
    document.body,
  )
}
