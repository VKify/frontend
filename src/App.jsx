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
const Privacy = lazy(() => import('./pages/Privacy'))
const Terms = lazy(() => import('./pages/Terms'))
const NotFound = lazy(() => import('./pages/NotFound'))

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
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

export default App