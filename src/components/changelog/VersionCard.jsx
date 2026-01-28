import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Calendar, Sparkles, Bug, Zap, ChevronRight } from 'lucide-react'
import Badge from '../common/Badge'

export default function VersionCard({ version, isLatest = false }) {
  const { version: ver, date, title, highlights, changes } = version

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative"
    >
      {/* Timeline dot */}
      <div className="absolute left-0 top-8 w-4 h-4 rounded-full bg-[#0077ff] border-4 border-gray-50 dark:border-gray-950 -translate-x-1/2 hidden md:block z-10" />
      
      <div className="md:ml-8 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">v{ver}</h3>
              {isLatest && (
                <Badge variant="new">Последняя</Badge>
              )}
            </div>
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
              <Calendar className="w-4 h-4" />
              {formatDate(date)}
            </div>
          </div>
          
          <Link
            to={`/changelog/${ver}`}
            className="flex items-center gap-1 text-[#0077ff] hover:underline text-sm font-medium group"
          >
            Подробнее
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Title */}
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{title}</h4>

        {/* Highlights */}
        <div className="flex flex-wrap gap-2 mb-4">
          {highlights.map((highlight, i) => (
            <span
              key={i}
              className="px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm"
            >
              {highlight}
            </span>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
          {changes.new?.length > 0 && (
            <div className="flex items-center gap-2 text-sm">
              <Sparkles className="w-4 h-4 text-green-500" />
              <span className="text-gray-600 dark:text-gray-400">{changes.new.length} новых</span>
            </div>
          )}
          {changes.fixed?.length > 0 && (
            <div className="flex items-center gap-2 text-sm">
              <Bug className="w-4 h-4 text-red-500" />
              <span className="text-gray-600 dark:text-gray-400">{changes.fixed.length} исправлений</span>
            </div>
          )}
          {changes.improved?.length > 0 && (
            <div className="flex items-center gap-2 text-sm">
              <Zap className="w-4 h-4 text-blue-500" />
              <span className="text-gray-600 dark:text-gray-400">{changes.improved.length} улучшений</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}