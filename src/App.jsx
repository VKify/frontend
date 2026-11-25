import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { lazy, Suspense, useLayoutEffect } from 'react'
import ScrollToTop from './components/common/ScrollToTop'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import Loading from './components/common/Loading'
import Analytics from './components/common/Analytics'

import { products } from './data/products'

const Browser = lazy(() => import('./pages/Browser'))
const Android = lazy(() => import('./pages/Android'))
const Lampa = lazy(() => import('./pages/Lampa'))
const ProductComingSoon = lazy(() => import('./pages/ProductComingSoon'))
const Home = lazy(() => import('./pages/Home'))
const Welcome = lazy(() => import('./pages/Welcome'))
const Uninstall = lazy(() => import('./pages/Uninstall'))
const Changelog = lazy(() => import('./pages/Changelog'))
const ChangelogVersion = lazy(() => import('./pages/ChangelogVersion'))
const News = lazy(() => import('./pages/News'))
const NewsPost = lazy(() => import('./pages/NewsPost'))
const PlatformDocs = lazy(() => import('./pages/PlatformDocs'))
const Docs = lazy(() => import('./pages/Docs'))
const Privacy = lazy(() => import('./pages/Privacy'))
const Terms = lazy(() => import('./pages/Terms'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Themes = lazy(() => import('./pages/Themes'))
const ThemePreview = lazy(() => import('./pages/ThemePreview'))
const ThemeDetail = lazy(() => import('./pages/ThemeDetail'))
const Wallpapers = lazy(() => import('./pages/Wallpapers'))
const WallpaperDetail = lazy(() => import('./pages/WallpaperDetail'))
const WebWallpaperGuide = lazy(() => import('./pages/WebWallpaperGuide'))
const FirefoxInstall = lazy(() => import('./pages/FirefoxInstall'))

function LegacyChangelog() {
    const { pathname, search, hash } = useLocation()
    return <Navigate to={'/browser' + pathname + search + hash} replace />
}

function PrerenderReady() {
    useLayoutEffect(() => {
        window.__VKIFY_PRERENDER_READY = true
    }, [])
    return null
}

function App() {
    const isPrerender = window.__PRERENDER_INJECTED?.isPrerender

    return (
        <div className="min-h-screen flex flex-col bg-primary">
            {!isPrerender && <Analytics />}
            <ScrollToTop />
            <Header />
            <main className="flex-1">
                <Suspense fallback={<Loading />}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/browser" element={<Browser />} />
                        {products.filter(product => product.id !== 'browser').map(product => (
                            <Route key={product.id} path={product.href} element={product.id === 'android' ? <Android /> : product.id === 'lampa' ? <Lampa /> : <ProductComingSoon key={product.id} product={product} />} />
                        ))}
                        <Route path="/welcome" element={<Welcome />} />
                        <Route path="/uninstall" element={<Uninstall />} />
                        <Route path="/browser/changelog" element={<Changelog />} />
                        <Route path="/changelog" element={<LegacyChangelog />} />
                        <Route path="/browser/changelog/:version" element={<ChangelogVersion />} />
                        <Route path="/changelog/:version" element={<LegacyChangelog />} />
                        <Route path="/news" element={<News />} />
                        <Route path="/news/:slug" element={<NewsPost />} />
                        <Route path="/docs" element={<PlatformDocs />} />
                        <Route path="/docs/browser" element={<Docs />} />
                        {products.filter(product => product.id !== 'browser').map(product => (
                            <Route key={product.id} path={'/docs/' + product.id} element={product.id === 'lampa' ? <Docs platform="lampa" /> : <PlatformDocs platform={product.id} />} />
                        ))}
                        <Route path="/docs/:slug" element={<Docs />} />
                        <Route path="/privacy" element={<Privacy />} />
                        <Route path="/terms" element={<Terms />} />
                        <Route path="/themes" element={<Themes />} />
                        <Route path="/theme/:encoded?" element={<ThemePreview />} />
                        <Route path="/themes/:id" element={<ThemeDetail />} />
                        <Route path="/wallpapers" element={<Wallpapers />} />
                        <Route path="/wallpapers/guide" element={<WebWallpaperGuide />} />
                        <Route path="/wallpapers/:id" element={<WallpaperDetail />} />
                        <Route path="/firefox" element={<FirefoxInstall />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                    {isPrerender && <PrerenderReady />}
                </Suspense>
            </main>
            <Footer />
        </div>
    )
}

export default App
