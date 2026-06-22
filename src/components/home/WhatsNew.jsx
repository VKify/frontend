import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Rocket, ArrowRight } from 'lucide-react'
import { whatsNew } from '../../data/whatsNew'
import Section, { SectionHeader } from '../common/Section'
import { useTranslation } from '../../i18n'

export default function WhatsNew() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <Section id="whats-new" variant="default" withPattern>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge={t('whatsNew.badge')}
          badgeIcon={Rocket}
          badgeColor="purple"
          title={t('whatsNew.titleTop')}
          titleHighlight={t('whatsNew.titleAccent')}
          description={t('whatsNew.description')}
        />

        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {whatsNew.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative h-full p-6 rounded-3xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 hover:shadow-xl hover:border-purple-200 dark:hover:border-purple-800 hover:scale-[1.02] transition-all duration-150"
            >
              <div className="flex items-center justify-between mb-5">
                <div className={`
                  w-12 h-12 rounded-2xl
                  bg-gradient-to-br ${item.color}
                  flex items-center justify-center
                  shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-150
                `}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <span className="px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-semibold text-gray-500 dark:text-gray-400">
                  {t('whatsNew.versionTag', { version: item.version })}
                </span>
              </div>

              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {t(`whatsNew.cards.${item.id}.title`)}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {t(`whatsNew.cards.${item.id}.description`)}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-[#0077ff] font-semibold hover:gap-3 transition-all"
          >
            {t('whatsNew.allNews')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </Section>
  )
}
