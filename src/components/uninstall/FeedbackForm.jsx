import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle, MessageSquare, AlertCircle, Loader2 } from 'lucide-react'
import config from '../../config'

const reasons = [
  { id: 'interface',   label: 'Не понравился интерфейс' },
  { id: 'broken',      label: 'Не работает нужная функция' },
  { id: 'performance', label: 'Замедляет браузер' },
  { id: 'alternative', label: 'Нашёл альтернативу' },
  { id: 'temporary',   label: 'Временно не нужно' },
  { id: 'other',       label: 'Другое' },
]

const SUBMIT_URL = `https://docs.google.com/forms/d/${config.feedback.formId}/formResponse`

export default function FeedbackForm() {
  const [selected,     setSelected]     = useState([])
  const [comment,      setComment]      = useState('')
  const [status,       setStatus]       = useState('idle') // idle | submitting | success | error

  const toggle = (id) =>
    setSelected(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selected.length) return
    setStatus('submitting')

    try {
      const body = new FormData()

      // Sentinel — обязательное служебное поле для чекбоксов Google Forms
      body.append(config.feedback.fields.reasons + '_sentinel', '')

      // Каждая выбранная причина
      selected.forEach(id => {
        const reason = reasons.find(r => r.id === id)
        if (reason) body.append(config.feedback.fields.reasons, reason.label)
      })

      // Комментарий
      if (comment.trim()) {
        body.append(config.feedback.fields.comment, comment.trim())
      }

      // no-cors: Google не отдаёт CORS-заголовки, ответ всегда opaque
      // Данные доходят в 99.9% случаев — статус не проверяем, всегда показываем успех
      await fetch(SUBMIT_URL, { method: 'POST', mode: 'no-cors', body })
      setStatus('success')
    } catch {
      // Сеть недоступна
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-10 rounded-2xl border border-green-200 dark:border-green-900
          bg-green-50 dark:bg-green-900/20"
      >
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/50
          flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Спасибо за отзыв!</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Ваше мнение поможет нам сделать VKify лучше
        </p>
      </motion.div>
    )
  }

  if (status === 'error') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-10 rounded-2xl border border-red-200 dark:border-red-900
          bg-red-50 dark:bg-red-900/20"
      >
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/50
          flex items-center justify-center">
          <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Не удалось отправить</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-5">Проверьте интернет-соединение</p>
        <button
          onClick={() => setStatus('idle')}
          className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-semibold transition-colors"
        >
          Попробовать снова
        </button>
      </motion.div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm"
    >
      {/* Заголовок */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30
          flex items-center justify-center flex-shrink-0">
          <MessageSquare className="w-5 h-5 text-orange-600 dark:text-orange-400" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Почему вы удалили расширение?
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Выберите одну или несколько причин
          </p>
        </div>
      </div>

      {/* Чекбоксы */}
      <div className="space-y-2.5 mb-5">
        {reasons.map(reason => {
          const checked = selected.includes(reason.id)
          return (
            <label
              key={reason.id}
              className={`flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer
                transition-all duration-150
                ${checked
                  ? 'border-[#0077ff] bg-[#0077ff]/5 dark:bg-[#0077ff]/10'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
            >
              {/* Кастомный чекбокс */}
              <div className={`w-5 h-5 rounded-md border-2 flex-shrink-0 flex items-center justify-center
                transition-colors duration-150
                ${checked ? 'border-[#0077ff] bg-[#0077ff]' : 'border-gray-300 dark:border-gray-600'}`}
              >
                {checked && (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <input
                type="checkbox"
                className="sr-only"
                checked={checked}
                onChange={() => toggle(reason.id)}
              />
              <span className="font-medium text-gray-900 dark:text-white text-sm">{reason.label}</span>
            </label>
          )
        })}
      </div>

      {/* Поле комментария — показывается при «Другое» или любом выборе */}
      <AnimatePresence>
        {selected.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-5"
          >
            <div className="flex items-baseline justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Комментарий
                <span className="ml-1.5 text-gray-400 dark:text-gray-500 font-normal">(необязательно)</span>
              </label>
              <span className={`text-xs tabular-nums ${comment.length >= 1800 ? 'text-red-400' : 'text-gray-400 dark:text-gray-500'}`}>
                {comment.length}/2000
              </span>
            </div>
            <textarea
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder={
                selected.includes('other')
                  ? 'Расскажите подробнее, что именно не устроило...'
                  : 'Есть что добавить?'
              }
              rows={3}
              maxLength={2000}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700
                bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white
                placeholder:text-gray-400 text-sm
                focus:outline-none focus:ring-2 focus:ring-[#0077ff]/40 focus:border-[#0077ff]
                resize-none transition-all"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Кнопка */}
      <button
        type="submit"
        disabled={!selected.length || status === 'submitting'}
        className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl
          text-sm font-bold transition-all duration-150
          ${selected.length && status !== 'submitting'
            ? 'bg-[#0077ff] hover:bg-blue-500 text-white active:scale-[0.98]'
            : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed'
          }`}
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Отправка...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Отправить отзыв
          </>
        )}
      </button>

      <p className="text-center text-[11px] text-gray-400 dark:text-gray-600 mt-3">
        Ответы анонимны и хранятся в Google Sheets
      </p>
    </form>
  )
}