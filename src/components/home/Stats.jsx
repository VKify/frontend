import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Sparkles, Palette, ShieldOff, Gift, Github, Heart, Zap } from 'lucide-react'
import Section from '../common/Section'
import config from '../../config'

const stats = [
  { 
    value: 50, 
    suffix: '+', 
    label: 'функций', 
    description: 'для кастомизации',
    icon: Sparkles,
    color: 'from-blue-500 to-cyan-500' 
  },
  { 
    value: 12, 
    suffix: '', 
    label: 'тем оформления', 
    description: 'на любой вкус',
    icon: Palette,
    color: 'from-purple-500 to-pink-500' 
  },
  { 
    value: 0, 
    suffix: '', 
    label: 'рекламы', 
    description: 'полная блокировка',
    icon: ShieldOff,
    color: 'from-green-500 to-emerald-500' 
  },
  { 
    value: 100, 
    suffix: '%', 
    label: 'бесплатно', 
    description: 'без скрытых платежей',
    icon: Gift,
    color: 'from-orange-500 to-red-500' 
  },
]

function AnimatedNumber({ value, suffix }) {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      const duration = 2000
      const startTime = Date.now()

      const animate = () => {
        const now = Date.now()
        const progress = Math.min((now - startTime) / duration, 1)
        const easeOut = 1 - Math.pow(1 - progress, 3)
        const current = Math.round(value * easeOut)
        
        setDisplayValue(current)
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }

      requestAnimationFrame(animate)
    }
  }, [isInView, value])

  return (
    <span ref={ref}>
      {displayValue}{suffix}
    </span>
  )
}

export default function Stats() {
  return (
    <Section id="stats" variant="alternate" withGlow>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {config.app.name} в цифрах
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Присоединяйтесь к тысячам пользователей, которые уже улучшили свой VK
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="relative h-full p-4 sm:p-5 md:p-6 lg:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 hover:shadow-xl hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300">
                {/* Gradient glow on hover */}
                <div className={`absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                {/* Icon */}
                <div className="flex justify-center mb-2 sm:mb-3 md:mb-4">
                  <div className={`w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                  </div>
                </div>

                {/* Number */}
                <div className="text-center">
                  <div 
                    className={`
                      text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold
                      bg-gradient-to-r ${stat.color} bg-clip-text text-transparent
                      mb-1 sm:mb-2
                    `}
                  >
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  </div>
                  
                  <div className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-0.5 sm:mb-1">
                    {stat.label}
                  </div>
                  
                  <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-tight">
                    {stat.description}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom decoration - раскомментировать когда будет больше пользователей
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 flex justify-center"
        >
          <div className="flex items-center gap-4 px-6 py-3 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div 
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 border-2 border-white dark:border-gray-800"
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-semibold text-gray-900 dark:text-white">{config.stats.users}</span> пользователей
            </span>
          </div>
        </motion.div>
        */}
        {/* Bottom - Open Source & Features */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 flex flex-wrap justify-center gap-4"
        >
          {/* Open Source Badge */}
          <a
            href={config.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-5 py-3 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-lg transition-all group"
          >
            <Github className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-semibold text-gray-900 dark:text-white">Open Source</span> — код открыт
            </span>
          </a>
          
          {/* Made with love */}
          <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Сделано с <span className="font-semibold text-gray-900 dark:text-white">любовью</span> в России
            </span>
          </div>
          
          {/* Fast updates */}
          <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <Zap className="w-5 h-5 text-yellow-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-semibold text-gray-900 dark:text-white">Регулярные</span> обновления
            </span>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}