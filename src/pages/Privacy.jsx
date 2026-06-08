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
    <div className="relative min-h-screen overflow-hidden pt-24 pb-20 bg-white dark:bg-gray-950">
      <SEO
        title={t('legal.privacy.seoTitle')}
        description={t('legal.privacy.seoDescription')}
      />

      {/* Декоративный градиент за шапкой */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[420px] overflow-hidden">
        <div className="absolute left-1/2 top-[-140px] h-[360px] w-[760px] max-w-[130vw] -translate-x-1/2 rounded-full bg-[#0077ff]/15 blur-[120px] dark:bg-[#0077ff]/25" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-2xl bg-gradient-to-br from-[#0077ff] to-blue-400 shadow-xl shadow-blue-500/25 mb-6">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
            {t('legal.privacy.titleTop')}{' '}
            <span className="bg-gradient-to-r from-[#0077ff] to-blue-400 bg-clip-text text-transparent">
              {t('legal.privacy.titleAccent')}
            </span>
          </h1>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-900 text-sm text-gray-500 dark:text-gray-400">
            <Calendar className="w-3.5 h-3.5" />
            <span>{t('legal.privacy.lastUpdated')}</span>
          </div>
        </motion.div>

        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative overflow-hidden p-5 sm:p-7 rounded-2xl border border-[#0077ff]/20 bg-gradient-to-br from-[#0077ff]/[0.07] to-blue-400/[0.04] mb-10 sm:mb-12"
        >
          <p className="text-base sm:text-lg text-center leading-relaxed text-gray-700 dark:text-gray-200">
            <strong className="text-gray-900 dark:text-white">{t('legal.privacy.keyLabel')}</strong> {t('legal.privacy.keyText')}
          </p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-4 sm:space-y-5">
          {sections.map((section, index) => {
            const Icon = sectionIcons[index]
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * (index + 2) }}
                className="group p-5 sm:p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/60 hover:border-[#0077ff]/30 hover:shadow-lg hover:shadow-blue-500/[0.06] hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#0077ff] to-blue-400 shadow-lg shadow-blue-500/20 flex items-center justify-center flex-shrink-0">
                    {Icon && <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2.5 mb-2">
                      <span className="text-xs font-mono font-bold text-[#0077ff]/70 tabular-nums">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                        {section.title}
                      </h2>
                    </div>
                    <p className="text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed">
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
