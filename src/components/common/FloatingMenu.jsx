import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'

export default function FloatingMenu({ open, onClose, anchorRef, children, dropUp = false, block = false, align = 'right', id, label }) {
  const menuRef = useRef(null)
  const [coords, setCoords] = useState(null)
  const position = useCallback(() => {
    const anchor = anchorRef.current
    if (!anchor) return
    const rect = anchor.getBoundingClientRect()
    const width = Math.min(block ? rect.width : 288, window.innerWidth - 16)
    const height = menuRef.current?.scrollHeight || 320
    const above = dropUp || (rect.bottom + height + 8 > innerHeight && rect.top > innerHeight - rect.bottom)
    setCoords({
      left: Math.max(8, Math.min(align === 'left' ? rect.left : rect.right - width, innerWidth - width - 8)),
      width,
      ...(above ? { bottom: innerHeight - rect.top + 8 } : { top: rect.bottom + 8 }),
      maxHeight: Math.max(80, above ? rect.top - 16 : innerHeight - rect.bottom - 16),
    })
  }, [anchorRef, block, dropUp, align])

  useEffect(() => {
    if (!open) return
    position()
    const outside = event => {
      if (!anchorRef.current?.contains(event.target) && !menuRef.current?.contains(event.target)) onClose()
    }
    const keyboard = event => {
      if (event.key === 'Escape') {
        onClose()
        anchorRef.current?.querySelector('button')?.focus()
      }
      if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return
      if (!anchorRef.current?.contains(document.activeElement) && !menuRef.current?.contains(document.activeElement)) return
      event.preventDefault()
      const items = [...menuRef.current.querySelectorAll('[role="menuitem"]')]
      const current = items.indexOf(document.activeElement)
      let index = current
      switch (event.key) {
        case 'Home': index = 0; break
        case 'End': index = items.length - 1; break
        case 'ArrowDown': index = (current + 1) % items.length; break
        case 'ArrowUp': index = current <= 0 ? items.length - 1 : current - 1; break
      }
      items[index]?.focus()
    }
    document.addEventListener('pointerdown', outside)
    document.addEventListener('focusin', outside)
    document.addEventListener('keydown', keyboard)
    window.addEventListener('resize', position)
    window.addEventListener('scroll', position, true)
    return () => {
      document.removeEventListener('pointerdown', outside)
      document.removeEventListener('focusin', outside)
      document.removeEventListener('keydown', keyboard)
      window.removeEventListener('resize', position)
      window.removeEventListener('scroll', position, true)
    }
  }, [open, onClose, anchorRef, position])

  return createPortal(
    <AnimatePresence>
      {open && coords && (
        <motion.div ref={menuRef} id={id} role="menu" aria-label={label}
          initial={{ opacity: 0, y: dropUp ? -8 : 8, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: dropUp ? -8 : 8, scale: 0.97 }}
          transition={{ duration: 0.15 }}
          style={{ position: 'fixed', ...coords, zIndex: 60 }}
          className="overflow-y-auto rounded-2xl border border-gray-200 bg-white p-2 shadow-2xl dark:border-gray-800 dark:bg-gray-900">
          {children}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
