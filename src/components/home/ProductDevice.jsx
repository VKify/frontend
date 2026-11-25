import { motion, useReducedMotion } from 'framer-motion'
import Logo from '../common/Logo'
import { ProductMark } from './ProductArtwork'

export default function ProductDevice({ product }) {
  const reduced = useReducedMotion()
  const phone = product.id === 'android'
  const desktop = product.id === 'desktop'
  const lampa = product.id === 'lampa'
  const colors = {
    android: '#34d399',
    'android-tv': '#a78bfa',
    desktop: '#38bdf8',
    lampa: '#fb923c',
  }

  return (
    <div aria-hidden="true" className="relative isolate flex aspect-[6/5] items-center justify-center" style={{ '--device-accent': colors[product.id], containerType: 'inline-size' }}>
      <div className="absolute inset-[12%] rounded-full opacity-20 blur-3xl [background:var(--device-accent)]" />
      <div className="absolute inset-4 rounded-full border border-gray-200/60 dark:border-white/5" />
      <div className="absolute inset-12 rounded-full border border-gray-200/50 dark:border-white/5" />
      <motion.div animate={reduced ? undefined : { y: [-6, 6, -6] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} className={phone ? 'relative w-[43%]' : 'relative w-[90%]'}>
        <div className={`relative overflow-hidden border border-gray-300 bg-gradient-to-br from-gray-100 to-white p-2 shadow-2xl dark:border-gray-600 dark:from-gray-700 dark:to-gray-900 ${phone ? 'aspect-[9/17] rounded-[2.5rem]' : 'aspect-[16/10] rounded-2xl'}`}>
          <div className={`relative flex size-full flex-col items-center justify-center overflow-hidden pt-[8%] pb-[4%] bg-[#080d1d] ${phone ? 'rounded-[2rem]' : 'rounded-lg'}`}>
            <div className="absolute inset-0 opacity-25 [background:radial-gradient(ellipse_at_top,var(--device-accent),transparent_75%)]" />
            {phone && <div className="absolute top-2 h-3 w-1/3 rounded-full bg-black" />}
            {!phone && <div className="absolute inset-x-0 top-0 flex gap-1 border-b border-white/10 p-[2.5%]"><span className="size-1.5 rounded-full bg-white/40" /><span className="size-1.5 rounded-full bg-white/25" /><span className="size-1.5 rounded-full bg-white/15" /></div>}
            <div className="relative w-[24%]"><ProductMark product={product} /></div>
            <div className="relative mt-[3cqw] flex items-center gap-[1.5cqw] text-white"><Logo className="w-[4cqw]" /><span className="font-display text-[clamp(10px,4cqw,18px)] font-bold">VKify</span></div>
            {lampa && <span className="relative mt-1 text-[clamp(7px,2cqw,10px)] uppercase tracking-[0.3em] text-orange-200/70">Lampa</span>}
          </div>
        </div>
        {!phone && <div className={desktop ? 'mx-auto h-7 w-1/4 border-x border-gray-300 bg-gradient-to-b from-gray-300 to-gray-100 dark:border-gray-700 dark:from-gray-700 dark:to-gray-800' : 'mx-auto h-3 w-2/3 rounded-b-full bg-gray-300 dark:bg-gray-700'} />}
        {desktop && <div className="mx-auto h-2 w-1/2 rounded-full bg-gray-300 dark:bg-gray-600" />}
      </motion.div>
    </div>
  )
}
