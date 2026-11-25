import { HashLink } from 'react-router-hash-link'
import { scrollWithOffset } from '../utils/scroll'
import Roadmap from '../components/home/Roadmap'
import Hero from '../components/home/Hero'
import Features from '../components/home/Features'
import CTA from '../components/home/CTA'
import BrowserShowcase from '../components/home/BrowserShowcase'
import { ArrowRight, Layers, BookOpen } from 'lucide-react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import SEO from '../components/common/SEO'
import Section, { SectionHeader } from '../components/common/Section'
import ProductsGrid from '../components/home/ProductsGrid'
import LatestNews from '../components/home/LatestNews'
import { useTranslation } from '../i18n'

const browserSections = ['#browsers', '#features', '#whats-new', '#how-it-works', '#stats', '#screenshots', '#faq', '#cta']
const container = 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'

export default function Home() {
  const { t, lang } = useTranslation()
  const { hash, search } = useLocation()

  if (browserSections.includes(hash)) {
    return <Navigate to={{ pathname: '/browser', search, hash }} replace />
  }

  return (
    <div className="bg-white text-gray-900 dark:bg-gray-950 dark:text-white">
      <SEO title={t('ecosystem.seoTitle')} description={t('ecosystem.subtitle')} image="/og/products/ecosystem.png" locale={lang} />
      <Hero ecosystem />

      <Section id="products" variant="alternate" withGlow className="!py-16 md:!py-24">
        <div className={container}>
          <SectionHeader badge={t('ecosystem.products')} badgeIcon={Layers} title={t('ecosystem.productsTitle')} description={t('ecosystem.productsDescription')} className="!mb-10" />
          <BrowserShowcase />
          <div className="mb-6 mt-12 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h3 className="font-display text-2xl font-bold">{t('ecosystem.upNext')}</h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-600 dark:text-gray-400">{t('ecosystem.upNextDescription')}</p>
            </div>
            <HashLink to="/#roadmap" scroll={scrollWithOffset} className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400">{t('ecosystem.roadmap')}<ArrowRight className="size-4" /></HashLink>
          </div>
          <ProductsGrid />
          <div className="mt-6 flex flex-col gap-5 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
            <div className="flex items-start gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-blue-500/10 text-blue-500"><BookOpen className="size-5" /></span>
              <div><h3 className="font-semibold">{lang === 'ru' ? 'Поможем начать' : 'Get started'}</h3><p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{lang === 'ru' ? 'Установка и настройки — в инструкциях для вашей платформы.' : 'Installation and setup guides for your platform.'}</p></div>
            </div>
            <Link to="/docs" className="inline-flex shrink-0 items-center justify-center gap-3 rounded-xl border border-blue-500/25 bg-white px-5 py-3 text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-500/10 dark:bg-gray-950 dark:text-blue-400">{lang === 'ru' ? 'Открыть документацию' : 'Open documentation'}<ArrowRight className="size-4" /></Link>
          </div>
        </div>
      </Section>

      <Features variant="default" />

      <Roadmap />

      <LatestNews />
      <CTA />
    </div>
  )
}
