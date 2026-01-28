import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart, ChevronRight, Shield, CreditCard, Wallet } from 'lucide-react'

const donateOptions = [
  {
    id: 'cloudtips',
    title: 'CloudTips',
    description: 'Российские карты Visa, MasterCard, МИР',
    href: 'https://pay.cloudtips.ru/p/b59e1765',
    icon: CreditCard,
    color: 'from-blue-500 to-cyan-500',
    badge: 'Россия',
  },
  {
    id: 'tribute',
    title: 'Tribute',
    description: 'Зарубежные карты и криптовалюта',
    href: 'https://t.me/tribute/app?startapp=dE4k',
    icon: Wallet,
    color: 'from-purple-500 to-pink-500',
    badge: 'Весь мир',
  },
]

export default function DonateModal({ isOpen, onClose }) {
  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  const handleEscape = useCallback((e) => {
    if (e.key === 'Escape') {
      handleClose()
    }
  }, [handleClose])

  const handleBackdropClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }, [handleClose])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleEscape)
      
      return () => {
        document.body.style.overflow = ''
        window.removeEventListener('keydown', handleEscape)
      }
    }
  }, [isOpen, handleEscape])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] overflow-y-auto bg-black/60 backdrop-blur-sm"
          onClick={handleBackdropClick}
        >
          <div className="min-h-full flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative bg-gradient-to-br from-pink-500 to-rose-500 px-5 py-6">
                {/* Close button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handleClose()
                  }}
                  className="absolute top-4 right-4 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>

                {/* Header content */}
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/20 mb-3">
                    <Heart className="w-7 h-7 text-white" fill="white" />
                  </div>
                  
                  <h2 className="text-xl font-bold text-white mb-1">
                    Поддержать VKify
                  </h2>
                  <p className="text-sm text-white/80">
                    Выберите удобный способ оплаты
                  </p>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-3">
                {donateOptions.map((option) => (
                  <a
                    key={option.id}
                    href={option.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 
                      hover:border-pink-400 dark:hover:border-pink-500 hover:bg-pink-50 dark:hover:bg-pink-500/10
                      transition-all group"
                  >
                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${option.color} flex items-center justify-center shadow-lg`}>
                      <option.icon className="w-6 h-6 text-white" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {option.title}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r ${option.color} text-white`}>
                          {option.badge}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                        {option.description}
                      </p>
                    </div>
                    
                    <ChevronRight className="flex-shrink-0 w-5 h-5 text-gray-400 group-hover:text-pink-500 transition-colors" />
                  </a>
                ))}

                <div className="flex items-center justify-center gap-2 pt-2 text-xs text-gray-400">
                  <Shield className="w-4 h-4" />
                  <span>Безопасные платежи</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}