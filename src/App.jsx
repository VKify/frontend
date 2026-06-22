import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import ScrollToTop from './components/common/ScrollToTop'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import Loading from './components/common/Loading'
import Analytics from './components/common/Analytics'

const Home = lazy(() => import('./pages/Home'))
const Welcome = lazy(() => import('./pages/Welcome'))
const Uninstall = lazy(() => import('./pages/Uninstall'))
const Changelog = lazy(() => import('./pages/Changelog'))
const ChangelogVersion = lazy(() => import('./pages/ChangelogVersion'))
const News = lazy(() => import('./pages/News'))
const NewsPost = lazy(() => import('./pages/NewsPost'))
const Docs = lazy(() => import('./pages/Docs'))
const Privacy = lazy(() => import('./pages/Privacy'))
const Terms = lazy(() => import('./pages/Terms'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Themes = lazy(() => import('./pages/Themes'))
const ThemePreview = lazy(() => import('./pages/ThemePreview'))
const ThemeDetail = lazy(() => import('./pages/ThemeDetail'))
const Wallpapers = lazy(() => import('./pages/Wallpapers'))
const WallpaperDetail = lazy(() => import('./pages/WallpaperDetail'))

function App() {
    return (
        <div className="min-h-screen flex flex-col bg-primary">
            <Analytics />
            <ScrollToTop />
            <Header />
            <main className="flex-1">
                <Suspense fallback={<Loading />}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/welcome" element={<Welcome />} />
                        <Route path="/uninstall" element={<Uninstall />} />
                        <Route path="/changelog" element={<Changelog />} />
                        <Route path="/changelog/:version" element={<ChangelogVersion />} />
                        <Route path="/news" element={<News />} />
                        <Route path="/news/:slug" element={<NewsPost />} />
                        <Route path="/docs" element={<Docs />} />
                        <Route path="/docs/:slug" element={<Docs />} />
                        <Route path="/privacy" element={<Privacy />} />
                        <Route path="/terms" element={<Terms />} />
                        <Route path="/themes" element={<Themes />} />
                        <Route path="/theme/:encoded" element={<ThemePreview />} />
                        <Route path="/themes/:id" element={<ThemeDetail />} />
                        <Route path="/wallpapers" element={<Wallpapers />} />
                        <Route path="/wallpapers/:id" element={<WallpaperDetail />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Suspense>
            </main>
            <Footer />
        </div>
    )
}

export default App