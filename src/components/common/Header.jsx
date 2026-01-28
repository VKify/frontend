import { useState, useEffect, useCallback, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { 
  Download, 
  ChevronRight, 
  Sparkles, 
  ExternalLink, 
  Send, 
  Github, 
  MessageCircle,
  X,
  Zap,
  ArrowRight
} from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import Button from './Button'
import Logo from './Logo'
import config from '../../config'
import { getLatestVersion } from '../../data/changelog'

// Константы
const NAV_HEIGHT = 80
const SCROLL_THRESHOLD = 50

const socialIcons = {
  Telegram: Send,
  VK: MessageCircle,
  GitHub: Github,
}

// Функция скролла с учётом фиксированного хедера
const scrollWithOffset = (el) => {
  const performScroll = () => {
    const absoluteTop = el.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ 
      top: Math.max(0, absoluteTop - NAV_HEIGHT - 20), 
      behavior: 'smooth' 
    })
  }
  
  if (window.scrollY < SCROLL_THRESHOLD) {
    window.scrollTo({ top: SCROLL_THRESHOLD + 10, behavior: 'smooth' })
    setTimeout(performScroll, 250)
  } else {
    performScroll()
  }
}

// Экспорт для использования в других компонентах
export const scrollToElement = (elementId) => {
  const el = document.getElementById(elementId)
  if (el) scrollWithOffset(el)
}

// Компонент прогресс-бара
function ProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <motion.div
      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#0077ff] to-blue-600 origin-left"
      style={{ scaleX }}
    />
  )
}

// Компонент логотипа
function HeaderLogo({ isScrolled }) {
  return (
    <Link to="/" className="flex items-center gap-3 group">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-blue-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#0077ff] to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
          <Logo className="w-5 h-5 text-white" />
        </div>
      </motion.div>
      
      {/* Фиксированная высота контейнера */}
      <div className="flex flex-col justify-center h-10">
        <span className="text-xl font-bold text-gray-900 dark:text-white leading-tight">
          {config.app.name}
        </span>
        {/* Tagline всегда занимает место, просто невидим */}
        <span 
          className={`
            text-[10px] text-gray-500 dark:text-gray-400 leading-tight
            transition-opacity duration-200
            ${isScrolled ? 'opacity-100' : 'opacity-0'}
          `}
        >
          {config.app.tagline}
        </span>
      </div>
    </Link>
  )
}

// Компонент навигационного элемента
function NavItem({ item, isActive }) {
  const baseClasses = `relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
    isActive
      ? 'text-white'
      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
  }`

  const content = (
    <>
      {isActive && (
        <motion.div
          layoutId="activeNav"
          className="absolute inset-0 bg-gradient-to-r from-[#0077ff] to-blue-600 rounded-full"
          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
        />
      )}
      <span className="relative z-10">{item.name}</span>
    </>
  )

  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClasses}
      >
        <span className="relative z-10 flex items-center gap-1">
          {item.name}
          <ExternalLink className="w-3 h-3" />
        </span>
      </a>
    )
  }

  if (item.isAnchor) {
    return (
      <HashLink to={item.href} scroll={scrollWithOffset} className={baseClasses}>
        {content}
      </HashLink>
    )
  }

  return (
    <Link to={item.href} className={baseClasses}>
      {content}
    </Link>
  )
}

// Компонент Announcement Bar
function AnnouncementBar({ isVisible, latestVersion }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <div className="hidden lg:block bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 text-white text-center py-2 text-sm">
            <Link to="/changelog" className="inline-flex items-center gap-2 hover:underline group">
              <Sparkles className="w-4 h-4" />
              <span>Вышла версия {latestVersion} с новыми функциями</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Компонент кнопки меню
function MenuButton({ isOpen, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      className={`relative p-2.5 rounded-xl transition-colors duration-200 ${
        isOpen ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
      }`}
      aria-label="Меню"
    >
      <div className="w-5 h-5 relative flex flex-col justify-center items-center">
        <motion.span
          className="absolute w-5 h-0.5 bg-gray-900 dark:bg-white rounded-full"
          animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 0 : -4 }}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          className="absolute w-5 h-0.5 bg-gray-900 dark:bg-white rounded-full"
          animate={{ opacity: isOpen ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          className="absolute w-5 h-0.5 bg-gray-900 dark:bg-white rounded-full"
          animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? 0 : 4 }}
          transition={{ duration: 0.2 }}
        />
      </div>
    </motion.button>
  )
}

// Компонент элемента мобильного меню
function MobileNavItem({ item, isActive, onClick }) {
  const baseClasses = `w-full flex items-center justify-between px-4 py-4 rounded-2xl text-base font-medium transition-colors ${
    isActive
      ? 'bg-blue-500/10 text-[#0077ff]'
      : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white'
  }`

  const content = (
    <>
      <span>{item.name}</span>
      {item.external ? (
        <ExternalLink className="w-4 h-4 text-gray-400" />
      ) : (
        <ChevronRight className={`w-5 h-5 ${isActive ? 'text-[#0077ff]' : 'text-gray-400'}`} />
      )}
    </>
  )

  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={baseClasses} onClick={onClick}>
        {content}
      </a>
    )
  }

  if (item.isAnchor) {
    return (
      <HashLink to={item.href} scroll={scrollWithOffset} onClick={onClick} className={baseClasses}>
        {content}
      </HashLink>
    )
  }

  return (
    <Link to={item.href} onClick={onClick} className={baseClasses}>
      {content}
    </Link>
  )
}

// Компонент мобильного меню
function MobileMenu({ isOpen, onClose, navigation, activeSection, pathname, latestVersion }) {
  const checkIsActive = (item) => {
    if (item.isAnchor) {
      return activeSection === (item.sectionId || item.href.replace('/#', ''))
    }
    return pathname === item.href
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 400, damping: 40 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white dark:bg-gray-900 z-50 lg:hidden shadow-2xl"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
                <Link to="/" onClick={onClose} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0077ff] to-blue-600 flex items-center justify-center">
                    <Logo className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="text-xl font-bold text-gray-900 dark:text-white block">
                      {config.app.name}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      v{latestVersion}
                    </span>
                  </div>
                </Link>
                
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-1">
                  {navigation.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <MobileNavItem item={item} isActive={checkIsActive(item)} onClick={onClose} />
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                  <p className="px-4 text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                    Сообщество
                  </p>
                  {config.social.map((link) => {
                    const Icon = socialIcons[link.name] || ExternalLink
                    return (
                      <a
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between px-4 py-3 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5" />
                          <span>{link.name}</span>
                        </div>
                        <ExternalLink className="w-4 h-4 opacity-50" />
                      </a>
                    )
                  })}
                </div>
              </div>

              <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                <Button 
                  href={config.links.chromeWebStore}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full gap-2 py-4"
                >
                  <Download className="w-5 h-5" />
                  Установить бесплатно
                </Button>
                
                <p className="mt-3 text-center text-xs text-gray-500">
                  <Zap className="w-3 h-3 inline mr-1" />
                  Бесплатно • Chrome, Edge, Opera
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function getActiveSection(sectionIds, offset = 150) {
  const scrollPosition = window.scrollY + offset

  for (let i = sectionIds.length - 1; i >= 0; i--) {
    const element = document.getElementById(sectionIds[i])
    if (element && scrollPosition >= element.offsetTop) {
      return sectionIds[i]
    }
  }
  
  return null
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  
  const location = useLocation()
  const navigation = useMemo(() => config.navigation.main, [])

  // Получаем последнюю версию из changelog
  const latestVersion = useMemo(() => {
    const latest = getLatestVersion()
    return latest?.version || '1.0.0'
  }, [])

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > SCROLL_THRESHOLD)
          
          if (location.pathname === '/') {
            const sectionIds = navigation
              .filter(item => item.isAnchor)
              .map(item => item.sectionId || item.href.replace('/#', ''))
            
            setActiveSection(getActiveSection(sectionIds) || '')
          }
          
          ticking = false
        })
        ticking = true
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [location.pathname, navigation])

  useEffect(() => {
    if (location.pathname !== '/') setActiveSection('')
  }, [location.pathname])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMobileMenuOpen])

  const checkIsActive = useCallback((item) => {
    if (item.isAnchor) {
      return activeSection === (item.sectionId || item.href.replace('/#', ''))
    }
    return location.pathname === item.href
  }, [location.pathname, activeSection])

  const showAnnouncementBar = !isScrolled && location.pathname === '/'

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl shadow-sm' : ''
        }`}
      >
        <AnnouncementBar isVisible={showAnnouncementBar} latestVersion={latestVersion} />

        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <HeaderLogo isScrolled={isScrolled} />

            <div className="hidden lg:flex items-center">
              <div className="flex items-center bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full p-1.5">
                {navigation.map((item) => (
                  <NavItem key={item.name} item={item} isActive={checkIsActive(item)} />
                ))}
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <ThemeToggle />
              <Button 
                href={config.links.chromeWebStore}
                target="_blank"
                rel="noopener noreferrer"
                size="sm"
                className="gap-2 shadow-lg shadow-blue-500/25"
              >
                <Download className="w-4 h-4" />
                <span>Установить</span>
              </Button>
            </div>

            <div className="flex lg:hidden items-center gap-2">
              <ThemeToggle />
              <MenuButton isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(prev => !prev)} />
            </div>
          </div>
        </nav>

        {isScrolled && <ProgressBar />}
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navigation={navigation}
        activeSection={activeSection}
        pathname={location.pathname}
        latestVersion={latestVersion}
      />
    </>
  )
}