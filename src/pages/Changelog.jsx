import { useState } from 'react'
import { Filter, Sparkles, Bug, Zap } from 'lucide-react'
import SEO from '../components/common/SEO'
import VersionCard from '../components/changelog/VersionCard'
import { changelog } from '../data/changelog'

const filters = [
  { id: 'all', label: 'Все', icon: null },
  { id: 'new', label: 'Новое', icon: Sparkles },
  { id: 'fixed', label: 'Исправления', icon: Bug },
  { id: 'improved', label: 'Улучшения', icon: Zap },
]

export default function Changelog() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filteredChangelog = changelog.filter(version => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'new') return version.changes.new?.length > 0
    if (activeFilter === 'fixed') return version.changes.fixed?.length > 0
    if (activeFilter === 'improved') return version.changes.improved?.length > 0
    return true
  })

  return (
    // Убрали motion.div - анимация теперь в AnimatedPage
    <div className="min-h-screen pt-24 pb-16 bg-white dark:bg-gray-950">
      <SEO 
        title="История обновлений"
        description="Следите за всеми обновлениями VKify — новые функции, исправления и улучшения."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            История{' '}
            <span className="bg-gradient-to-r from-[#0077ff] to-blue-400 bg-clip-text text-transparent">
              обновлений
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Все изменения, исправления и новые функции VKify
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`
                flex items-center gap-2 px-4 py-2.5 rounded-full font-medium transition-all duration-200
                ${activeFilter === filter.id
                  ? 'bg-[#0077ff] text-white shadow-lg shadow-blue-500/25'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }
              `}
            >
              {filter.icon && <filter.icon className="w-4 h-4" />}
              {filter.label}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-800 hidden md:block" />

          <div className="space-y-6">
            {filteredChangelog.map((version, index) => (
              <VersionCard 
                key={version.version} 
                version={version} 
                isLatest={index === 0}
              />
            ))}
          </div>
        </div>

        {filteredChangelog.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              Нет обновлений по выбранному фильтру
            </p>
          </div>
        )}
      </div>
    </div>
  )
}