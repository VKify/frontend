/**
 * /themes — каталог тем
 * - Skeleton loading
 * - Hover: scale + overlay
 * - Поиск + фильтры по категориям
 * - Крупные карточки с детальным превью VK-интерфейса и логотипом VK
 */
import { useState, useMemo, useDeferredValue } from 'react'
import { Link } from 'react-router-dom'
import { Search, Palette } from 'lucide-react'
import SEO from '../components/common/SEO'
import VkMiniPreview from '../components/common/VkMiniPreview'
import { themes, themeCategories } from '../data/themes'

function SkeletonCard() {
    return (
        <div className="animate-pulse">
            <div className="rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-800" style={{ aspectRatio: '4/3' }} />
            <div className="mt-3 space-y-1.5 px-0.5">
                <div className="h-3.5 bg-gray-200 dark:bg-gray-800 rounded-full w-3/4" />
                <div className="h-2.5 bg-gray-200 dark:bg-gray-800 rounded-full w-1/2" />
            </div>
        </div>
    )
}

function ThemeCard({ theme }) {
    return (
        <Link to={`/themes/${theme.id}`} className="group block">
            <div
                className="relative rounded-2xl overflow-hidden border border-black/5 dark:border-white/5
                           transition-all duration-150 group-hover:-translate-y-1.5 group-hover:shadow-2xl"
                style={{ background: theme.preview.bg, aspectRatio: '4/3' }}
            >
                <VkMiniPreview
                    bg={theme.preview.bg}
                    card={theme.preview.card}
                    accent={theme.preview.accent}
                />

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-150 z-10" />

                <div className="absolute inset-0 z-20 flex items-center justify-center
                               opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200">
                    <span className="px-4 py-1.5 bg-white/90 dark:bg-gray-950/90 text-gray-900 dark:text-white
                                     text-[11px] font-bold rounded-full shadow-lg tracking-widest uppercase select-none">
                        Открыть
                    </span>
                </div>
            </div>

            <div className="mt-2.5 px-0.5">
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate
                              group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {theme.name}
                </p>
                <div className="flex gap-1.5 mt-0.5 flex-wrap">
                    {theme.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-[11px] text-gray-400 dark:text-gray-500 capitalize">{tag}</span>
                    ))}
                </div>
            </div>
        </Link>
    )
}

export default function Themes() {
    const [search,         setSearch]         = useState('')
    const [activeCategory, setActiveCategory] = useState('all')
    const [isLoading] = useState(false)

    // Откладываем фильтрацию чтобы не блокировать ввод
    const deferredSearch = useDeferredValue(search)

    const filtered = useMemo(() => themes.filter(t => {
        const q = deferredSearch.toLowerCase()
        const matchSearch = !q ||
            t.name.toLowerCase().includes(q) ||
            t.description.toLowerCase().includes(q) ||
            t.tags.some(tag => tag.includes(q))
        const matchCat = activeCategory === 'all' || t.category === activeCategory
        return matchSearch && matchCat
    }), [deferredSearch, activeCategory])

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950">
            <SEO
                title="Темы оформления VK"
                description="Выбирайте и применяйте темы для VK через расширение VKify. Catppuccin, Dracula, Nord и другие."
                url="/themes"
            />

            <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

                {/* Hero */}
                <div className="mb-10">
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest text-blue-600 dark:text-blue-400 uppercase mb-3">
                        <Palette className="w-3.5 h-3.5" />
                        {themes.length} тем доступно
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-black text-gray-950 dark:text-white leading-none tracking-tight mb-4">
                        Темы<br />
                        <span className="text-gray-400 dark:text-gray-600">оформления</span>
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 max-w-lg">
                        Выберите тему — и она применится в VK автоматически через расширение.
                    </p>
                </div>

                {/* Поиск */}
                <div className="relative mb-5">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Catppuccin, nord, dark..."
                        className="w-full pl-11 pr-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800
                                   rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400
                                   focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/10 transition-all text-sm"
                    />
                </div>

                {/* Категории */}
                <div className="flex flex-wrap gap-2 mb-8">
                    <button
                        onClick={() => setActiveCategory('all')}
                        aria-pressed={activeCategory === 'all'}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150
                            ${activeCategory === 'all'
                                ? 'bg-gray-950 dark:bg-white text-white dark:text-gray-950 shadow-sm'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                    >
                        Все
                    </button>
                    {themeCategories.filter(c => c.id !== 'all').map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            aria-pressed={activeCategory === cat.id}
                            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold capitalize transition-all duration-150
                                ${activeCategory === cat.id
                                    ? 'bg-gray-950 dark:bg-white text-white dark:text-gray-950 shadow-sm'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>

                {/* Сетка — 4 колонки для читаемых крупных карточек */}
                {isLoading ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                        {Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)}
                    </div>
                ) : filtered.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                        {filtered.map(theme => <ThemeCard key={theme.id} theme={theme} />)}
                    </div>
                ) : (
                    <div className="py-20 text-center text-gray-400 dark:text-gray-600">
                        <p className="text-lg mb-1">Ничего не найдено</p>
                        <p className="text-sm">Попробуйте другой запрос или категорию</p>
                    </div>
                )}

                {/* Инструкция */}
                <div className="mt-16 p-8 bg-gray-50 dark:bg-gray-900 rounded-3xl">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-5">Как применить тему</h2>
                    <div className="grid sm:grid-cols-3 gap-6">
                        {[
                            { n: '1', title: 'Установите VKify', desc: 'Расширение для Chrome, Firefox или Edge' },
                            { n: '2', title: 'Выберите тему',   desc: 'Нажмите «Применить мгновенно» на странице темы' },
                            { n: '3', title: 'Готово',          desc: 'Тема применится автоматически при открытии VK' },
                        ].map(s => (
                            <div key={s.n} className="flex gap-3">
                                <div className="w-7 h-7 rounded-full bg-gray-950 dark:bg-white text-white dark:text-gray-950
                                                text-xs font-bold flex items-center justify-center flex-shrink-0">
                                    {s.n}
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{s.title}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{s.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}