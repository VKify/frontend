import { motion } from 'framer-motion'
import { forwardRef } from 'react'

/**
 * Единый компонент секции с унифицированным стилем
 * 
 * @param {string} id - ID секции для навигации
 * @param {string} variant - Вариант фона: 'default' | 'alternate' | 'gradient'
 * @param {string} className - Дополнительные классы
 * @param {boolean} withPattern - Добавить паттерн на фон
 * @param {boolean} withGlow - Добавить декоративное свечение
 */
const Section = forwardRef(({ 
  id,
  children, 
  variant = 'default',
  className = '',
  withPattern = false,
  withGlow = false,
  ...props 
}, ref) => {
  // Варианты фона
  const backgrounds = {
    default: 'bg-white dark:bg-gray-950',
    alternate: 'bg-gray-50 dark:bg-gray-900',
    gradient: 'bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950',
  }

  return (
    <section 
      id={id}
      ref={ref}
      className={`relative py-24 md:py-32 overflow-hidden ${backgrounds[variant]} ${className}`}
      {...props}
    >
      {/* Декоративный паттерн */}
      {withPattern && (
        <div 
          className="absolute inset-0 opacity-[0.015] dark:opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      )}

      {/* Декоративное свечение */}
      {withGlow && (
        <>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
        </>
      )}

      {/* Контент */}
      <div className="relative">
        {children}
      </div>
    </section>
  )
})

Section.displayName = 'Section'

export default Section

/**
 * Компонент заголовка секции
 */
export function SectionHeader({ 
  badge,
  badgeIcon: BadgeIcon,
  badgeColor = 'blue',
  title,
  titleHighlight,
  description,
  className = '',
}) {
  const badgeColors = {
    blue: 'bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400',
    green: 'bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400',
    purple: 'bg-purple-500/10 border-purple-500/20 text-purple-600 dark:text-purple-400',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`text-center mb-16 md:mb-20 ${className}`}
    >
      {/* Badge */}
      {badge && (
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6 ${badgeColors[badgeColor]}`}>
          {BadgeIcon && <BadgeIcon className="w-4 h-4" />}
          <span className="text-sm font-medium">{badge}</span>
        </div>
      )}

      {/* Title */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
        {title}{' '}
        {titleHighlight && (
          <span className="bg-gradient-to-r from-[#0077ff] to-cyan-400 bg-clip-text text-transparent">
            {titleHighlight}
          </span>
        )}
      </h2>
      
      {/* Description */}
      {description && (
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </motion.div>
  )
}