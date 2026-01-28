import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, Heart, Send, MessageCircle, ExternalLink, Chrome, Star, Users, Zap } from 'lucide-react'
import DonateModal from '../common/DonateModal'
import Logo from '../common/Logo'
import config from '../../config'

const stats = [
  { icon: Users, value: config.stats.users, label: 'пользователей' },
  { icon: Star, value: config.stats.rating, label: 'рейтинг' },
  { icon: Zap, value: config.stats.features, label: 'функций' },
]

export default function CTA() {
  const [isDonateOpen, setIsDonateOpen] = useState(false)

  return (
    <>
      <section id="cta" className="py-24 md:py-32 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0077ff] via-blue-600 to-indigo-700" />
        
        {/* Animated orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ 
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-0 left-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              x: [0, -100, 0],
              y: [0, 50, 0],
              scale: [1.2, 1, 1.2],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-400/20 rounded-full blur-3xl"
          />
        </div>
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Logo */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                className="inline-block mb-8"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-white/30 rounded-3xl blur-xl scale-150" />
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative w-24 h-24 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-2xl border border-white/30"
                  >
                    <Logo className="w-12 h-12 text-white" />
                  </motion.div>
                </div>
              </motion.div>

              {/* Heading */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Готовы преобразить
                <br />
                <span className="text-cyan-300">ВКонтакте?</span>
              </h2>
              
              <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
                Присоединяйтесь к тысячам пользователей, которые уже сделали 
                свой VK удобнее, красивее и приватнее
              </p>

              {/* Stats */}
              <div className="flex flex-wrap items-center justify-center gap-8 mb-12">
                {stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20"
                  >
                    <stat.icon className="w-5 h-5 text-cyan-300" />
                    <div className="text-left">
                      <div className="text-xl font-bold text-white">{stat.value}</div>
                      <div className="text-xs text-white/60">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Main CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="flex flex-col items-center gap-6"
              >
                <motion.a
                  href={config.links.chromeWebStore}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-[#0077ff] font-bold text-lg rounded-2xl shadow-2xl hover:shadow-white/25 transition-all duration-300"
                >
                  <div className="absolute inset-0 rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-blue-100 to-transparent transition-transform duration-700" />
                  </div>
                  
                  <Chrome className="w-6 h-6" />
                  <span>Установить для Chrome</span>
                  <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                </motion.a>

                <p className="text-white/60 text-sm">
                  Бесплатно • Без регистрации • Мгновенная установка
                </p>
              </motion.div>

              {/* Secondary actions */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="mt-12 pt-12 border-t border-white/10"
              >
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <motion.button
                    onClick={() => setIsDonateOpen(true)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-medium rounded-xl border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all"
                  >
                    <Heart className="w-5 h-5 text-red-400" />
                    <span>Поддержать проект</span>
                  </motion.button>
                  
                  <div className="flex items-center gap-3">
                    <motion.a
                      href={config.links.telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all"
                    >
                      <Send className="w-5 h-5" />
                      <span className="font-medium">Telegram</span>
                    </motion.a>
                    
                    <motion.a
                      href={config.links.vk}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span className="font-medium">VK</span>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <DonateModal isOpen={isDonateOpen} onClose={() => setIsDonateOpen(false)} />
    </>
  )
}