import SEO from '../components/common/SEO'
import Hero from '../components/home/Hero'
import Features from '../components/home/Features'
import HowItWorks from '../components/home/HowItWorks'
import SupportedBrowsers from '../components/home/SupportedBrowsers'
import Stats from '../components/home/Stats'
import Screenshots from '../components/home/Screenshots'
import FAQ from '../components/home/FAQ'
import CTA from '../components/home/CTA'
import { useTranslation } from '../i18n'

export default function Home() {
  const { t } = useTranslation()
  return (
    <div className="bg-white dark:bg-gray-950">
      <SEO
        title={null}
        description={t('seo.homeDescription')}
        appSchema
      />
      <Hero />
      <SupportedBrowsers />
      <Features />
      <HowItWorks />
      <Stats />
      <Screenshots />
      <FAQ />
      <CTA />
    </div>
  )
}