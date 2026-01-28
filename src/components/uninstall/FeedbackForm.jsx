import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle, MessageSquare } from 'lucide-react'
import Button from '../common/Button'

const reasons = [
  { id: 'interface', label: 'Не понравился интерфейс' },
  { id: 'functionality', label: 'Не работает нужная функция' },
  { id: 'performance', label: 'Замедляет браузер' },
  { id: 'alternative', label: 'Нашёл альтернативу' },
  { id: 'temporary', label: 'Временно не нужно' },
  { id: 'other', label: 'Другое' },
]

export default function FeedbackForm() {
  const [selectedReasons, setSelectedReasons] = useState([])
  const [otherText, setOtherText] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleReasonToggle = (id) => {
    setSelectedReasons(prev => 
      prev.includes(id) 
        ? prev.filter(r => r !== id)
        : [...prev, id]
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-8 rounded-2xl border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20"
      >
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Спасибо за отзыв!
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Ваше мнение поможет нам сделать VKify лучше
        </p>
      </motion.div>
    )
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
          <MessageSquare className="w-5 h-5 text-orange-600 dark:text-orange-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Почему вы удалили расширение?
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Выберите одну или несколько причин
          </p>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        {reasons.map((reason) => (
          <label
            key={reason.id}
            className={`
              flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all
              ${selectedReasons.includes(reason.id)
                ? 'border-[#0077ff] bg-[#0077ff]/5'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }
            `}
          >
            <div className={`
              w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors
              ${selectedReasons.includes(reason.id)
                ? 'border-[#0077ff] bg-[#0077ff]'
                : 'border-gray-300 dark:border-gray-600'
              }
            `}>
              {selectedReasons.includes(reason.id) && (
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <input
              type="checkbox"
              checked={selectedReasons.includes(reason.id)}
              onChange={() => handleReasonToggle(reason.id)}
              className="sr-only"
            />
            <span className="font-medium text-gray-900 dark:text-white">{reason.label}</span>
          </label>
        ))}
      </div>

      {selectedReasons.includes('other') && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-6"
        >
          <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
            Расскажите подробнее
          </label>
          <textarea
            value={otherText}
            onChange={(e) => setOtherText(e.target.value)}
            placeholder="Что именно не понравилось?"
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0077ff] focus:border-transparent resize-none"
          />
        </motion.div>
      )}

      <Button
        type="submit"
        disabled={selectedReasons.length === 0 || isSubmitting}
        className="w-full gap-2"
      >
        {isSubmitting ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
            />
            Отправка...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Отправить отзыв
          </>
        )}
      </Button>
    </form>
  )
}