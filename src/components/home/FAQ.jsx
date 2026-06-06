import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { HelpCircle, ChevronDown } from 'lucide-react'
import Section, { SectionHeader } from '../common/Section'
import { useTranslation } from '../../i18n'

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-2xl bg-white dark:bg-gray-950 overflow-hidden transition-colors hover:border-gray-300 dark:hover:border-gray-700">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5 text-left"
      >
        <span className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
          {item.q}
        </span>
        <ChevronDown
          className={`w-5 h-5 shrink-0 text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#0077ff]' : ''
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const { t } = useTranslation()
  const items = t('faq.items')
  const list = Array.isArray(items) ? items : []
  const [openIndex, setOpenIndex] = useState(0)

  // FAQPage JSON-LD — Google может показать раскрытые вопросы прямо в выдаче.
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: list.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  }

  if (list.length === 0) return null

  return (
    <Section id="faq" variant="alternate" withGlow>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
      </Helmet>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge={t('faq.badge')}
          badgeIcon={HelpCircle}
          title={t('faq.title')}
          titleHighlight={t('faq.titleHighlight')}
          description={t('faq.subtitle')}
        />

        <div className="space-y-3 sm:space-y-4">
          {list.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(index * 0.05, 0.3) }}
            >
              <FaqItem
                item={item}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}
