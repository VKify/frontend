import SEO from '../components/common/SEO'
import Hero from '../components/home/Hero'
import Features from '../components/home/Features'
import HowItWorks from '../components/home/HowItWorks'
import Stats from '../components/home/Stats'
import Screenshots from '../components/home/Screenshots'
import CTA from '../components/home/CTA'

export default function Home() {
  return (
    <div className="bg-white dark:bg-gray-950">
      <SEO 
        title={null}
        description="VKify — мощное браузерное расширение для кастомизации ВКонтакте. Темы, блокировка рекламы, приватность и более 50 функций."
      />
      <Hero />
      <Features />
      <HowItWorks />
      <Stats />
      <Screenshots />
      <CTA />
    </div>
  )
}