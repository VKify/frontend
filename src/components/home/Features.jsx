import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { features } from '../../data/features'
import { Sparkles } from 'lucide-react'
import Section, { SectionHeader } from '../common/Section'

export default function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <Section id="features" variant="alternate" withGlow>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Более 50 функций"
          badgeIcon={Sparkles}
          badgeColor="blue"
          title="Всё для"
          titleHighlight="идеального VK"
          description="Кастомизация, приватность и удобство в одном расширении. Настройте ВКонтакте под себя за несколько кликов."
        />

        {/* Features Grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative h-full p-6 lg:p-8 rounded-3xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-800 hover:scale-[1.02] transition-all duration-300"
            >
              {/* Icon */}
              <div className="mb-6">
                <div className={`
                  w-14 h-14 rounded-2xl 
                  bg-gradient-to-br ${feature.color}
                  flex items-center justify-center
                  shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300
                `}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                {feature.description}
              </p>

              {/* Details List */}
              <ul className="space-y-3">
                {feature.details.map((detail, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm text-gray-500 dark:text-gray-400"
                  >
                    <span className={`
                      mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0
                      bg-gradient-to-r ${feature.color}
                    `} />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center text-gray-500 dark:text-gray-400"
        >
          И это только начало — новые функции добавляются регулярно
        </motion.p>
      </div>
    </Section>
  )
}