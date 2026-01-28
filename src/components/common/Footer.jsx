// src/components/common/Footer.jsx
import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Heart, 
  Send, 
  Github, 
  MessageCircle, 
  ExternalLink, 
  ArrowUp,
  Sparkles,
  Mail,
  Clock
} from 'lucide-react'
import Logo from './Logo'
import DonateModal from './DonateModal'
import config from '../../config'
import { getLatestVersion } from '../../data/changelog'

// Иконки для социальных сетей
const socialIcons = {
  Telegram: Send,
  VK: MessageCircle,
  GitHub: Github,
}

// Функция плавного скролла с отступом для хедера
const scrollWithOffset = (el) => {
  const yOffset = -80
  const y = el.getBoundingClientRect().top + window.scrollY + yOffset
  window.scrollTo({ top: y, behavior: 'smooth' })
}

// Компонент анимированного фона
function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div 
        animate={{ 
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl" 
      />
      <motion.div 
        animate={{ 
          x: [0, -20, 0],
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl" 
      />
      <motion.div 
        animate={{ 
          x: [0, 15, 0],
          y: [0, 15, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" 
      />
      
      <div 
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />
    </div>
  )
}

// Компонент кнопки "Наверх"
function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 500)
    }
    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 bg-[#0077ff] text-white rounded-full shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-shadow"
          aria-label="Наверх"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

// Компонент социальной иконки
function SocialIcon({ link, size = 'md' }) {
  const Icon = socialIcons[link.name] || ExternalLink
  const sizeClasses = {
    sm: 'p-2 w-9 h-9',
    md: 'p-2.5 w-10 h-10',
    lg: 'p-3 w-12 h-12',
  }
  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }

  return (
    <motion.a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className={`
        ${sizeClasses[size]} 
        rounded-xl bg-gray-100 dark:bg-gray-800/80 
        text-gray-500 dark:text-gray-400 
        hover:bg-gray-200 dark:hover:bg-gray-700
        transition-all duration-300 
        flex items-center justify-center
        group relative overflow-hidden
        ${link.color || ''}
      `}
      aria-label={link.name}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
      <Icon className={`${iconSizes[size]} relative z-10 transition-transform group-hover:scale-110`} />
    </motion.a>
  )
}

// Компонент ссылки футера
function FooterLink({ item }) {
  const [isHovered, setIsHovered] = useState(false)

  const baseClasses = `
    relative inline-flex items-center gap-1 text-sm 
    text-gray-600 dark:text-gray-400 
    hover:text-[#0077ff] dark:hover:text-[#0077ff] 
    transition-colors duration-300
  `

  const underline = (
    <motion.span 
      className="absolute -bottom-0.5 left-0 h-px bg-[#0077ff]"
      initial={{ width: 0 }}
      animate={{ width: isHovered ? '100%' : 0 }}
      transition={{ duration: 0.3 }}
    />
  )

  // Внешняя ссылка
  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`${baseClasses} group`}
      >
        <span className="relative">
          {item.name}
          {underline}
        </span>
        <ExternalLink className="w-3 h-3 opacity-0 -translate-y-0.5 group-hover:opacity-50 group-hover:translate-y-0 transition-all duration-300" />
      </a>
    )
  }

  // Якорная ссылка (HashLink)
  if (item.isAnchor) {
    return (
      <HashLink
        smooth
        to={item.href}
        scroll={scrollWithOffset}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={baseClasses}
      >
        <span className="relative">
          {item.name}
          {underline}
        </span>
      </HashLink>
    )
  }

  // Обычная внутренняя ссылка
  return (
    <Link
      to={item.href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={baseClasses}
    >
      <span className="relative">
        {item.name}
        {underline}
      </span>
    </Link>
  )
}

// Компонент секции ссылок
function LinkSection({ title, links }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <span className="w-1 h-4 bg-gradient-to-b from-[#0077ff] to-blue-600 rounded-full" />
        {title}
      </h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <motion.li 
            key={link.name}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          >
            <FooterLink item={link} />
          </motion.li>
        ))}
      </ul>
    </div>
  )
}

// Компонент кнопки поддержки
function DonateButton({ onClick }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-2xl font-medium shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 transition-all duration-300 overflow-hidden group"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-rose-500 to-pink-600"
        initial={{ x: '100%' }}
        animate={{ x: isHovered ? 0 : '100%' }}
        transition={{ duration: 0.3 }}
      />
      
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
        animate={{ x: ['-200%', '200%'] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
      />
      
      <motion.div
        animate={{ scale: isHovered ? [1, 1.2, 1] : 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <Heart className="w-5 h-5" fill={isHovered ? 'currentColor' : 'none'} />
      </motion.div>
      <span className="relative z-10">Поддержать проект</span>
      
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="absolute -right-1 -top-1"
          >
            <Sparkles className="w-4 h-4 text-yellow-300" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

// Компонент брендинга
function BrandSection({ onDonateClick, latestVersion }) {
  return (
    <div className="col-span-2">
      <Link to="/" className="inline-flex items-center gap-3 mb-6 group">
        <motion.div 
          whileHover={{ rotate: 5, scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0077ff] to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-shadow"
        >
          <div className="absolute inset-0 rounded-2xl bg-blue-500 blur-xl opacity-0 group-hover:opacity-50 transition-opacity" />
          <Logo className="w-8 h-8 text-white relative z-10" />
        </motion.div>
        <div>
          <span className="text-xl font-bold text-gray-900 dark:text-white block group-hover:text-[#0077ff] transition-colors">
            {config.app.name}
          </span>
          <Link 
            to="/changelog" 
            className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:text-[#0077ff] transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            v{latestVersion}
          </Link>
        </div>
      </Link>
      
      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-xs mb-6">
        {config.app.description}
      </p>

      <div className="space-y-2 mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <Mail className="w-4 h-4 text-[#0077ff]" />
          <a href={`mailto:${config.app.email}`} className="hover:text-[#0077ff] transition-colors">
            {config.app.email}
          </a>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <Clock className="w-4 h-4 text-[#0077ff]" />
          <span>24/7 поддержка</span>
        </div>
      </div>

      <DonateButton onClick={onDonateClick} />

      <div className="flex items-center gap-2 mt-6 lg:hidden">
        {config.social.map((link) => (
          <SocialIcon key={link.name} link={link} size="md" />
        ))}
      </div>
    </div>
  )
}

// Компонент нижней панели
function BottomBar({ currentYear, latestVersion }) {
  return (
    <div className="py-6 border-t border-gray-200/50 dark:border-gray-800/50">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-2">
          <p className="text-sm text-gray-500 dark:text-gray-500">
            © {currentYear} {config.app.name}
          </p>
          <span className="hidden sm:block text-gray-300 dark:text-gray-700">•</span>
          <Link 
            to="/changelog"
            className="text-sm text-gray-500 dark:text-gray-500 hover:text-[#0077ff] transition-colors"
          >
            v{latestVersion}
          </Link>
          <span className="hidden sm:block text-gray-300 dark:text-gray-700">•</span>
          <p className="text-sm text-gray-500 dark:text-gray-500 flex items-center gap-1">
            Сделано с 
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
            >
              <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            </motion.span>
            в России
          </p>
        </div>
        
        <div className="hidden lg:flex items-center gap-1.5">
          {config.social.map((link, index) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <SocialIcon link={link} size="sm" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Основной компонент Footer
export default function Footer() {
  const [isDonateOpen, setIsDonateOpen] = useState(false)
  const currentYear = useMemo(() => new Date().getFullYear(), [])
  
  // Получаем последнюю версию из changelog
  const latestVersion = useMemo(() => {
    const latest = getLatestVersion()
    return latest?.version || '1.0.0'
  }, [])

  const { footer } = config.navigation

  const linkSections = useMemo(() => [
    { title: 'Продукт', links: footer.product },
    { title: 'Ресурсы', links: footer.resources },
    { title: 'Сообщество', links: footer.community },
    { title: 'Информация', links: footer.legal },
  ], [footer])

  return (
    <>
      <footer className="relative bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 border-t border-gray-200/50 dark:border-gray-800/50">
        <AnimatedBackground />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Newsletter Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="py-12 border-b border-gray-200/50 dark:border-gray-800/50"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  Будьте в курсе обновлений
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Подписывайтесь на наши социальные сети
                </p>
              </div>
              <div className="flex items-center gap-3">
                {config.social.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, type: 'spring' }}
                  >
                    <SocialIcon link={link} size="lg" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Main Footer Content */}
          <div className="py-12 md:py-16">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
              <BrandSection 
                onDonateClick={() => setIsDonateOpen(true)} 
                latestVersion={latestVersion}
              />

              {linkSections.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <LinkSection title={section.title} links={section.links} />
                </motion.div>
              ))}
            </div>
          </div>

          <BottomBar currentYear={currentYear} latestVersion={latestVersion} />
        </div>
      </footer>

      <ScrollToTopButton />
      <DonateModal isOpen={isDonateOpen} onClose={() => setIsDonateOpen(false)} />
    </>
  )
}