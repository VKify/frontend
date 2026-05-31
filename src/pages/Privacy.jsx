import { motion } from 'framer-motion'
import { Shield, Database, Eye, Lock, Mail, Calendar } from 'lucide-react'
import SEO from '../components/common/SEO'
import { useTranslation } from '../i18n'

// Только иконки; тексты — из i18n: legal.privacy.sections[i]
const sectionIcons = [Database, Eye, Lock, Shield, Mail]

export default function Privacy() {
  const { t } = useTranslation()
  const sections = t('legal.privacy.sections')
  return (
    <div className="min-h-screen pt-24 pb-16 bg-white dark:bg-gray-950">
      <SEO
        title={t('legal.privacy.seoTitle')}
        description={t('legal.privacy.seoDescription')}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#0077ff]/10 mb-6">
            <Shield className="w-8 h-8 text-[#0077ff]" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('legal.privacy.titleTop')}{' '}
            <span className="bg-gradient-to-r from-[#0077ff] to-blue-400 bg-clip-text text-transparent">
              {t('legal.privacy.titleAccent')}
            </span>
          </h1>
          <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400">
            <Calendar className="w-4 h-4" />
            <span>{t('legal.privacy.lastUpdated')}</span>
          </div>
        </motion.div>

        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-2xl border-2 border-[#0077ff]/20 bg-[#0077ff]/5 mb-12"
        >
          <p className="text-lg text-center text-gray-700 dark:text-gray-300">
            <strong className="text-gray-900 dark:text-white">{t('legal.privacy.keyLabel')}</strong> {t('legal.privacy.keyText')}
          </p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => {
            const Icon = sectionIcons[index]
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 2) }}
                className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0077ff]/10 flex items-center justify-center flex-shrink-0">
                    {Icon && <Icon className="w-6 h-6 text-[#0077ff]" />}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {section.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}