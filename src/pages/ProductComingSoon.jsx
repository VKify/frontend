import RelatedProducts from '../components/home/RelatedProducts'
import { HashLink } from 'react-router-hash-link'
import { scrollWithOffset } from '../utils/scroll'
import { Palette, Shield, Download, Lock, Search, Play, ListVideo, Sliders, Bell, MousePointer2 } from 'lucide-react'
import { useState } from 'react'
import { ArrowLeft, ArrowRight, Heart, Layers, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../components/common/Button'
import Section, { SectionHeader } from '../components/common/Section'
import InstallButton from '../components/common/InstallButton'
import SEO from '../components/common/SEO'
import DonateModal from '../components/common/DonateModal'
import ProductDevice from '../components/home/ProductDevice'
import { ProductMark } from '../components/home/ProductArtwork'
import { ProductStatus } from '../components/home/ProductsGrid'
import { roadmapProducts } from '../data/products'
import { useTranslation } from '../i18n'

const featureIcons = {
  android: [Palette, Shield, Download, Lock],
  lampa: [ListVideo, Search, Play],
  'android-tv': [MousePointer2, Search, Play],
  desktop: [Palette, Sliders, Bell],
}

const container = 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'

export default function ProductComingSoon({ product }) {
  const { t, lang } = useTranslation()
  const [donateOpen, setDonateOpen] = useState(false)
  const copy = t('ecosystem.platforms.' + product.id)
  const stageNumber = roadmapProducts.findIndex(item => item.id === product.id) + 1
  const detail = t('ecosystem.productDetails.' + product.id)

  return (
    <div className="bg-white text-gray-900 dark:bg-gray-950 dark:text-white">
      <SEO title={copy.title} description={copy.description} image={product.image} url={product.href} locale={lang} robots="noindex, follow" />
      <section className="relative overflow-hidden pb-14 pt-28 lg:pb-24 lg:pt-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,#dbeafe88,transparent_70%)] dark:bg-[radial-gradient(ellipse_at_top,#17255488,transparent_70%)]" />
        <div className={`relative ${container}`}>
          <HashLink to="/#products" scroll={scrollWithOffset} className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400"><ArrowLeft className="size-4" />{t('ecosystem.products')}</HashLink>
          <div className="mt-8 grid items-center gap-6 lg:grid-cols-2 lg:gap-16">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="min-w-0">
              <div className="mb-6 flex items-center gap-3"><div className="w-10"><ProductMark product={product} /></div><ProductStatus product={product} /></div>
              <p className="mb-3 text-sm font-semibold tracking-wide text-blue-600 dark:text-blue-400">{copy.title}</p>
              <h1 className="font-display text-4xl font-black leading-[1.06] tracking-tight sm:text-5xl xl:text-6xl">{detail.heading}</h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-600 dark:text-gray-400">{copy.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button to="/news" size="sm" className="gap-2">{t('ecosystem.follow')}<ArrowRight className="size-4" /></Button>
                <Button size="sm" variant="secondary" className="gap-2" onClick={() => setDonateOpen(true)}><Heart className="size-4" />{t('ecosystem.support')}</Button>
              </div>
            </motion.div>
            <ProductDevice product={product} />
          </div>
        </div>
      </section>

      <Section variant="alternate" withGlow>
        <div className={container}>
          <SectionHeader badge={copy.name} badgeIcon={Layers} title={t('ecosystem.plannedFeatures')} description={detail.intro} />
          <div className={`grid gap-6 ${copy.features.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
            {copy.features.map((feature, index) => {
              const Icon = featureIcons[product.id][index]
              return (
              <article key={feature} className="rounded-3xl border border-gray-200 bg-white p-7 dark:border-gray-800 dark:bg-gray-950 sm:p-8">
                <span className="mb-5 inline-flex size-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400"><Icon className="size-6" /></span>
                <h3 className="text-xl font-bold">{feature}</h3>
                <p className="mt-3 leading-relaxed text-gray-600 dark:text-gray-400">{detail.features[index]}</p>
              </article>
              )
            })}
          </div>
        </div>
      </Section>

      <Section withPattern>
        <div className={`grid gap-10 lg:grid-cols-[1fr_1.3fr] ${container}`}>
          <div>
            <p className="mb-4 flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400"><Sparkles className="size-4" />{t('ecosystem.roadmap')}</p>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">{t('ecosystem.currentStage')}</h2>
          </div>
          <div className="rounded-3xl border border-blue-500/20 bg-blue-500/5 p-6 sm:p-8">
            <p className="mb-5 font-mono text-xs uppercase tracking-widest text-blue-600 dark:text-blue-400">{t('ecosystem.stageNumber', { number: stageNumber, total: roadmapProducts.length })}</p>
            <ProductStatus product={product} />
            <p className="mt-4 text-lg leading-relaxed text-gray-600 dark:text-gray-400">{detail.stage}</p>
            <HashLink to="/#roadmap" scroll={scrollWithOffset} className="mt-5 inline-flex items-center gap-2 font-semibold text-blue-600 dark:text-blue-400">{t('ecosystem.fullRoadmap')}<ArrowRight className="size-4" /></HashLink>
          </div>
        </div>
      </Section>

      <section className="bg-gray-50 py-16 dark:bg-gray-900">
        <div className={`flex flex-wrap items-center justify-between gap-8 ${container}`}>
          <div className="max-w-xl">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">{t('ecosystem.availableNow')}</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-400">{t('ecosystem.availableDescription')}</p>
          </div>
          <div className="flex flex-wrap items-center gap-4"><InstallButton size="sm" /><Button to="/browser" size="sm" variant="secondary">{t('ecosystem.browserDetails')}</Button></div>
        </div>
      </section>
      <RelatedProducts current={product.id} />
      <DonateModal isOpen={donateOpen} onClose={() => setDonateOpen(false)} />
    </div>
  )
}
