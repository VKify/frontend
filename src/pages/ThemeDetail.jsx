/**
 * /themes/:id — детальная страница темы
 * - Большое превью VK-интерфейса
 * - Кнопка «Применить мгновенно» (InstallModal если расширение не установлено)
 * - Кнопка «Поделиться»
 * - Цветовая палитра
 * - Параметры конфигурации
 * - Похожие темы
 */
import { useParams, Link } from 'react-router-dom'
import { Copy, Check, ExternalLink, Zap } from 'lucide-react'
import SEO from '../components/common/SEO'
import DetailNavbar from '../components/common/DetailNavbar'
import VkLogo from '../components/common/VkLogo'
import VkMockup from '../components/common/VkMockup'
import { isDarkColor } from '../utils/colors'
import { themes } from '../data/themes'
import { generateShareUrl } from '../utils/themeShare'
import { useApplyToVK } from '../hooks/useApplyToVK'
import { useCopyToClipboard } from '../hooks/useCopyToClipboard'
import ExtensionHint from '../components/common/ExtensionHint'
import InstallModal from './ThemePreview/InstallModal'
import { useTranslation } from '../i18n'

// Похожие: та же категория, исключая текущую
function getSimilar(theme, limit = 4) {
    return themes
        .filter(t => t.id !== theme.id && t.category === theme.category)
        .slice(0, limit)
}

// Мини-карточка похожей темы
function SimilarThemeCard({ theme }) {
    const isDark = isDarkColor(theme.preview.bg)

    return (
        <Link to={`/themes/${theme.id}`} className="group block">
            <div
                className="relative rounded-xl overflow-hidden h-24 border border-black/5 dark:border-white/5
          transition-all duration-150 group-hover:-translate-y-0.5 group-hover:shadow-lg"
                style={{ background: theme.preview.bg }}
            >
                <div className="absolute inset-2.5 flex flex-col gap-1">
                    <div className="rounded-md px-1.5 py-1 flex items-center gap-1" style={{ background: theme.preview.card }}>
                        <VkLogo accent={theme.preview.accent} size={12} />
                        <div className="flex-1 h-0.5 rounded-full opacity-30" style={{ background: theme.preview.accent }} />
                    </div>
                    <div className="rounded-sm px-1.5 py-1 flex-1 space-y-0.5" style={{ background: theme.preview.card }}>
                        <div className="h-0.5 w-4/5 rounded-full opacity-40" style={{ background: isDark ? '#fff' : '#111' }} />
                        <div className="h-0.5 w-3/5 rounded-full opacity-25" style={{ background: isDark ? '#fff' : '#111' }} />
                    </div>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-all duration-150" />
            </div>
            <p className="mt-1.5 text-[11px] font-semibold text-gray-700 dark:text-gray-300
        group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors px-0.5 truncate">
                {theme.name}
            </p>
        </Link>
    )
}

// Большой превью VK-интерфейса — достоверная имитация ВКонтакте в цветах темы
function BigPreview({ theme }) {
    return (
        <div className="w-full overflow-hidden border-y border-black/5 dark:border-white/10">
            <VkMockup
                bg={theme.preview.bg}
                accent={theme.preview.accent}
            />
        </div>
    )
}

// Строка параметра
function ParamRow({ label, value, accent }) {
    return (
        <div className="flex items-center justify-between py-2.5 border-b border-gray-100 dark:border-gray-800 last:border-0">
            <span className="text-sm text-gray-400 dark:text-gray-500">{label}</span>
            <div className="flex items-center gap-2">
                {accent && (
                    <span className="w-4 h-4 rounded border border-white/20 shadow-sm inline-block" style={{ background: value }} />
                )}
                <span className="text-sm font-mono font-medium text-gray-900 dark:text-white">{value}</span>
            </div>
        </div>
    )
}

export default function ThemeDetail() {
    const { t }     = useTranslation()
    const { id }    = useParams()
    const shareLink = useCopyToClipboard()
    const pageLink  = useCopyToClipboard()
    const { detected, applied, apply, showInstallModal, closeInstallModal } = useApplyToVK()

    const theme   = themes.find(t => t.id === id)
    const similar = theme ? getSimilar(theme) : []

    const shareUrl = theme ? generateShareUrl(theme.config, {
        name: theme.name,
        description: theme.description,
        tags: theme.tags,
    }) : null

    const handleCopyLink = () => shareUrl && shareLink.copy(shareUrl)
    const handleCopyUrl  = () => pageLink.copy(window.location.href)
    const handleApplyInVK = () => apply(theme?.config)

    // 404
    if (!theme) {
        return (
            <div className="min-h-screen pt-24 flex flex-col items-center justify-center bg-white dark:bg-gray-950">
                <p className="text-6xl mb-4">🎨</p>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('themeDetail.notFoundTitle')}</h1>
                <p className="text-gray-400 mb-6">{t('themeDetail.notFoundHint')}</p>
                <Link to="/themes"
                      className="px-5 py-2.5 bg-gray-950 dark:bg-white text-white dark:text-gray-950 rounded-full text-sm font-semibold hover:opacity-80 transition-opacity">
                    {t('themeDetail.backToThemes')}
                </Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950">
            {showInstallModal && <InstallModal onClose={closeInstallModal} />}
            <SEO
                title={t('themeDetail.seoTitle', { name: theme.name })}
                description={theme.description}
                url={`/themes/${theme.id}`}
                image={`/og/themes/${theme.id}.png`}
            />

            <DetailNavbar
                backTo="/themes"
                title={theme.name}
                accent={theme.preview.accent}
                actions={
                    <button
                        onClick={handleCopyUrl}
                        className="text-sm text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors flex items-center gap-1.5"
                        title={t('detail.copyPageLink')}
                    >
                        {pageLink.copied ? <Check className="w-4 h-4 text-green-500" /> : <ExternalLink className="w-4 h-4" />}
                    </button>
                }
            />

            <div className="pt-16">
                {/* Большой превью */}
                <BigPreview theme={theme} />

                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <div className="grid lg:grid-cols-3 gap-8 lg:gap-10">

                        {/* Левая: описание + похожие (на мобиле идёт второй) */}
                        <div className="lg:col-span-2 order-2 lg:order-1 min-w-0 space-y-8">
                            <div>
                                <h1 className="text-3xl font-black text-gray-950 dark:text-white tracking-tight mb-2">
                                    {theme.name}
                                </h1>
                                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                                    {theme.description}
                                </p>
                                <div className="flex flex-wrap gap-1.5 mt-4">
                                    {theme.tags.map(tag => (
                                        <span key={tag}
                                              className="px-2.5 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg capitalize">
                      {tag}
                    </span>
                                    ))}
                                </div>
                            </div>

                            {/* Похожие */}
                            {similar.length > 0 && (
                                <div>
                                    <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4">{t('themeDetail.similar')}</h2>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                        {similar.map(t => <SimilarThemeCard key={t.id} theme={t} />)}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Правая: действия + параметры (на мобиле идёт первой) */}
                        <div className="order-1 lg:order-2 min-w-0 space-y-4 lg:sticky lg:top-24 self-start">
                            {/* Цветовые пятна */}
                            <div className="flex gap-2 mb-2">
                                {[
                                    { color: theme.preview.bg,     label: t('themeDetail.swatchBg')    },
                                    { color: theme.preview.card,   label: t('themeDetail.swatchCard') },
                                    { color: theme.preview.accent, label: t('themeDetail.swatchAccent')  },
                                ].map(({ color, label }) => (
                                    <div key={label} className="flex-1 text-center">
                                        <div className="h-10 rounded-xl border border-black/10 dark:border-white/10 shadow-sm mb-1.5"
                                             style={{ background: color }} />
                                        <p className="text-[10px] font-mono text-gray-400 dark:text-gray-500">{color}</p>
                                        <p className="text-[9px] text-gray-400 dark:text-gray-600">{label}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Кнопки */}
                            <div className="p-5 bg-gray-50 dark:bg-gray-900 rounded-2xl space-y-3">
                                <button
                                    onClick={handleApplyInVK}
                                    className="hidden lg:flex items-center justify-center gap-2 w-full py-3 bg-[#0077ff] hover:bg-blue-500 text-white text-sm font-bold rounded-xl active:scale-[0.98] transition-all"
                                >
                                    {applied
                                        ? <><Check className="w-4 h-4" /> {t('detail.applied')}</>
                                        : <><Zap className="w-4 h-4" /> {t('detail.apply')}</>
                                    }
                                </button>

                                <button
                                    onClick={handleCopyLink}
                                    className="flex items-center justify-center gap-2 w-full py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 active:scale-[0.98] transition-all"
                                >
                                    {shareLink.copied
                                        ? <><Check className="w-4 h-4 text-green-500" /> {t('detail.copied')}</>
                                        : <><Copy className="w-4 h-4" /> {t('detail.copyLink')}</>}
                                </button>
                            </div>

                            {/* Параметры */}
                            <div className="p-5 bg-gray-50 dark:bg-gray-900 rounded-2xl">
                                <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">
                                    {t('themeDetail.paramsTitle')}
                                </h3>
                                {Object.entries(theme.config).map(([key, value]) => (
                                    <ParamRow
                                        key={key}
                                        label={t(`paramLabels.${key}`)}
                                        value={String(value)}
                                        accent={typeof value === 'string' && value.startsWith('#')}
                                    />
                                ))}
                            </div>

                            {/* URL ссылки на тему */}
                            {shareUrl && (
                                <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl">
                                    <p className="text-xs text-gray-400 dark:text-gray-500 mb-2 font-medium">{t('themeDetail.themeLink')}</p>
                                    <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-lg px-3 py-2 border border-gray-200 dark:border-gray-700">
                    <span className="flex-1 min-w-0 text-[10px] font-mono text-gray-500 dark:text-gray-400 truncate">
                      {shareUrl}
                    </span>
                                        <button onClick={handleCopyLink} className="flex-shrink-0 text-blue-500 hover:text-blue-600 transition-colors">
                                            {shareLink.copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Подсказка */}
                            <ExtensionHint
                                detected={detected}
                                connectedTail={t('themeDetail.hintConnected')}
                                disconnectedText={t('themeDetail.hintDisconnected')}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}