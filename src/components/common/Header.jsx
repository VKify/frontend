import FloatingMenu from './FloatingMenu'
import { ProductMark } from '../home/ProductArtwork'
import { ChevronDown, Check } from 'lucide-react'
import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import {
  ChevronRight,
  Sparkles,
  ExternalLink,
  X,
  Zap,
  ArrowRight
} from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import LanguageSwitcher from './LanguageSwitcher'
import InstallButton from './InstallButton'
import Logo from './Logo'
import { socialIcons } from './SocialIcons'
import config from '../../config'
import { products } from '../../data/products'
import { useTranslation } from '../../i18n'
import { getLatestVersion } from '../../data/changelog'
import { useExtension } from '../../hooks/useExtension'
import { scrollWithOffset, getActiveSection, scrollToTop } from '../../utils/scroll'

const SCROLL_THRESHOLD = 50

// Маршруты, на которых глобальная шапка не рендерится — у них своя
// детальная шапка (DetailNavbar) с собственным прогрессбаром.
// Раньше глобальный Header и inline-навбар этих страниц оба сидели
// fixed top-0 z-50 и перекрывали друг друга.
const DETAIL_ROUTES = /^\/(themes|wallpapers)\/[^/]+$|^\/theme\/[^/]+$/

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

function HeaderLogo({ isScrolled, isHomePage }) {
  const { t } = useTranslation()
  const handleLogoClick = (e) => {
    if (isHomePage) {
      e.preventDefault()
      scrollToTop()
    }
  }

  return (
    <Link to="/" onClick={handleLogoClick} className="flex items-center gap-3 group">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-blue-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
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
          {t('ecosystem.tagline')}
        </span>
      </div>
    </Link>
  )
}

function NavItem({ item, isActive }) {
  const { t } = useTranslation()
  const label = item.labelKey ? t(item.labelKey) : item.name
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
      <span className="relative z-10">{label}</span>
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
          {label}
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

function ProductsMenu({ pathname }) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const close = useCallback(() => setOpen(false), [])
  const active = products.some(product => product.href === pathname)

  useEffect(close, [pathname, close])

  return (
    <div ref={ref}>
      <button type="button" aria-haspopup="menu" aria-expanded={open} aria-controls="products-menu"
        onClick={() => setOpen(value => !value)}
        className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${active ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-white dark:text-gray-200 dark:hover:bg-gray-700'}`}>
        {t('ecosystem.products')}<ChevronDown className={`size-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <FloatingMenu align="left" id="products-menu" label={t('ecosystem.products')} open={open} onClose={close} anchorRef={ref}>
        <div className="space-y-1">
          {products.map(product => (
            <Link key={product.id} to={product.href} role="menuitem" onClick={close}
              aria-current={pathname === product.href ? 'page' : undefined}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors ${pathname === product.href ? 'bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
              <span className="w-8 shrink-0"><ProductMark product={product} /></span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-gray-900 dark:text-white">{t(product.labelKey)}</span>
                <span className="block text-xs text-gray-500 dark:text-gray-400">{t('ecosystem.status.' + product.status)}</span>
              </span>
              {pathname === product.href && <Check className="size-4 text-blue-500" />}
            </Link>
          ))}
        </div>
      </FloatingMenu>
    </div>
  )
}

function AnnouncementBar({ isVisible, latestVersion }) {
  const { t } = useTranslation()
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
          <div className="hidden xl:block bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 text-white text-center py-2 text-sm">
            <Link to="/browser/changelog" className="inline-flex items-center gap-2 hover:underline group">
              <Sparkles className="w-4 h-4" />
              <span>{t('docsPage.currentVersion', { version: config.app.version })}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function MenuButton({ isOpen, onClick }) {
  const { t } = useTranslation()
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      className={`relative p-2.5 rounded-xl transition-colors duration-200 ${
        isOpen ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
      }`}
      aria-label={t('header.menu')}
      aria-expanded={isOpen}
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

function MobileNavItem({ item, isActive, onClick }) {
  const { t } = useTranslation()
  const label = item.labelKey ? t(item.labelKey) : item.name
  const baseClasses = `w-full flex items-center justify-between px-4 py-4 rounded-2xl text-base font-medium transition-colors ${
    isActive
      ? 'bg-blue-500/10 text-[#0077ff]'
      : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white'
  }`

  const content = (
    <>
      <span>{label}</span>
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
    <Link to={item.href} onClick={onClick} className={baseClasses} aria-current={isActive ? 'page' : undefined}>
      {content}
    </Link>
  )
}

function MobileMenu({ isOpen, onClose, navigation, activeSection, pathname, latestVersion }) {
  const { t } = useTranslation()
  const checkIsActive = (item) => {
    if (item.isAnchor) {
      return activeSection === (item.sectionId || item.href.split('#')[1])
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
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 xl:hidden"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 400, damping: 40 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white dark:bg-gray-900 z-50 xl:hidden shadow-2xl"
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
                      {t('docsPage.currentVersion', { version: config.app.version })}
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
                <p className="px-4 text-xs font-medium uppercase tracking-wider text-gray-500">{t('ecosystem.products')}</p>
                <div className="mb-4 space-y-1">
                  {products.map(product => (
                    <MobileNavItem key={product.id} item={product} isActive={pathname === product.href} onClick={onClose} />
                  ))}
                </div>
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
                  <div className="flex items-center justify-between px-4 mb-3">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('header.community')}
                    </p>
                    <LanguageSwitcher />
                  </div>
                  {config.social.map((link) => {
                    const IconComponent = socialIcons[link.name]
                    return (
                      <a
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between px-4 py-3 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          {IconComponent ? (
                            <IconComponent className="w-5 h-5" />
                          ) : (
                            <ExternalLink className="w-5 h-5" />
                          )}
                          <span>{link.name}</span>
                        </div>
                        <ExternalLink className="w-4 h-4 opacity-50" />
                      </a>
                    )
                  })}
                </div>
              </div>

              <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                <InstallButton block dropUp label={t('common.installFree')} />

                <p className="mt-3 text-center text-xs text-gray-500">
                  <Zap className="w-3 h-3 inline mr-1" />
                  {t('header.freeBrowsers')}
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  const { t } = useTranslation()
  const location = useLocation()
  const navigation = useMemo(() => location.pathname === '/browser'
    ? config.navigation.main
    : config.navigation.footer.product.filter(item => ['/themes', '/wallpapers', '/docs', '/news'].includes(item.href)),
  [location.pathname])
  const isHomePage = location.pathname === '/'
  const isDetailRoute = DETAIL_ROUTES.test(location.pathname)

  const latestVersion = useMemo(() => {
    const latest = getLatestVersion()
    return latest?.version || '1.0.0'
  }, [])

  const { detected, version: extensionVersion } = useExtension()

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > SCROLL_THRESHOLD)
          
          if (location.pathname === '/browser') {
            const sectionIds = navigation
              .filter(item => item.isAnchor)
              .map(item => item.sectionId || item.href.split('#')[1])
            
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
    if (location.pathname !== '/browser') setActiveSection('')
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
      return activeSection === (item.sectionId || item.href.split('#')[1])
    }
    return location.pathname === item.href
  }, [location.pathname, activeSection])

  // Бар «новая версия» скрываем если расширение уже установлено актуальной версии
  const extensionIsUpToDate = detected === true && extensionVersion === latestVersion
  const showAnnouncementBar = !isScrolled && ['/', '/browser'].includes(location.pathname) && !extensionIsUpToDate

  // Детальные страницы рендерят собственный DetailNavbar — глобальная шапка
  // им не нужна (и раньше визуально конфликтовала: оба элемента fixed top-0 z-50).
  if (isDetailRoute) return null

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-150 ${
          isScrolled ? 'bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl shadow-sm' : ''
        }`}
      >
        <AnnouncementBar isVisible={showAnnouncementBar} latestVersion={latestVersion} />

        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <HeaderLogo isScrolled={isScrolled} isHomePage={isHomePage} />

            <div className="hidden xl:flex items-center">
              <div className="flex items-center bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full p-1.5">
                <ProductsMenu pathname={location.pathname} />
                {navigation.map((item) => (
                  <NavItem key={item.name} item={item} isActive={checkIsActive(item)} />
                ))}
              </div>
            </div>

            <div className="hidden xl:flex items-center gap-3">
              <LanguageSwitcher />
              <ThemeToggle />
              <InstallButton size="sm" label={t('common.install')} />
            </div>

            <div className="flex xl:hidden items-center gap-2">
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