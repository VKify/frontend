import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { scrollWithOffset } from '../utils/scroll'
import { products } from '../data/products'
import SEO from '../components/common/SEO'
import Hero from '../components/home/Hero'
import Features from '../components/home/Features'
import WhatsNew from '../components/home/WhatsNew'
import HowItWorks from '../components/home/HowItWorks'
import SupportedBrowsers from '../components/home/SupportedBrowsers'
import Stats from '../components/home/Stats'
import Screenshots from '../components/home/Screenshots'
import FAQ from '../components/home/FAQ'
import CTA from '../components/home/CTA'
import { useTranslation } from '../i18n'

export default function Browser() {
  const { t, lang } = useTranslation()
  const { hash } = useLocation()

  useEffect(() => {
    const section = document.getElementById(hash.slice(1))
    if (section) scrollWithOffset(section)
  }, [hash])
  return (
    <div className="bg-white dark:bg-gray-950">
      <SEO
        title={t('ecosystem.platforms.browser.title')}
        url="/browser"
        image={products.find(product => product.id === 'browser').image}
        locale={lang}
        description={t('seo.homeDescription')}
        appSchema
      />
      <Hero />
      <SupportedBrowsers />
      <Features />
      <WhatsNew />
      <HowItWorks />
      <Stats />
      <Screenshots />
      <FAQ />
      <CTA />
    </div>
  )
}