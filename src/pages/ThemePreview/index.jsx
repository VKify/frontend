import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Check, Copy, Palette, AlertCircle, ExternalLink, Zap } from 'lucide-react'
import SEO from '../../components/common/SEO'
import DetailNavbar from '../../components/common/DetailNavbar'
import { decodeTheme } from '../../utils/themeShare'
import { useApplyToVK } from '../../hooks/useApplyToVK'
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard'
import ExtensionHint from '../../components/common/ExtensionHint'
import BackgroundPreview from './BackgroundPreview'
import { PARAM_META, GROUPS, ParamGroup, ColorStrip, FontSample } from './ThemeParamTable'
import InstallModal from './InstallModal'
import { useTranslation } from '../../i18n'

export default function ThemePreview() {
    const { t } = useTranslation()
    const { encoded } = useParams()
    const [themeData, setThemeData] = useState(null)
    const [error,     setError]     = useState(false)

    const link = useCopyToClipboard()
    const { detected, applied, apply, showInstallModal, closeInstallModal } = useApplyToVK()

    useEffect(() => {
        if (!encoded) { setError(true); return }
        const decoded = decodeTheme(encoded)
        if (!decoded)  { setError(true); return }
        setThemeData(decoded)
    }, [encoded])

    const shareUrl = `${window.location.origin}/theme/${encoded}`

    const handleCopy = () => link.copy(shareUrl)
    const handleApply = () => apply(themeData?.settings)

    if (error) {
        return (
            <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center px-4">
                <SEO title={t('themePreview.notFoundTitle')} />
                <div className="text-center max-w-md">
                    <div className="w-16 h-16 rounded-2xl bg-red-100 dark:bg-red-950/50 flex items-center justify-center mx-auto mb-4">
                        <AlertCircle className="w-8 h-8 text-red-500" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('themePreview.notFoundTitle')}</h1>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">
                        {t('themePreview.notFoundText')}
                    </p>
                    <Link to="/themes"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-[#0077ff] text-white font-semibold rounded-2xl hover:bg-blue-500 transition-colors">
                        <Palette className="w-4 h-4" />
                        {t('themePreview.seeThemes')}
                    </Link>
                </div>
            </div>
        )
    }

    if (!themeData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
                <div className="w-8 h-8 border-2 border-[#0077ff] border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    const { settings, meta } = themeData
    const paramCount = Object.keys(settings).filter(k => PARAM_META[k] && !PARAM_META[k].hidden).length

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950">
            {showInstallModal && <InstallModal onClose={closeInstallModal} />}
            <SEO
                title={t('themePreview.seoTitle', { name: meta.name })}
                description={meta.description || t('themePreview.seoDescription', { count: paramCount })}
                url={`/theme/${encoded}`}
            />

            <DetailNavbar
                backTo="/themes"
                title={meta.name}
                accent={settings.custom_accent}
                actions={
                    <button
                        onClick={handleCopy}
                        className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                        title={t('detail.copyLink')}
                    >
                        {link.copied ? <Check className="w-4 h-4 text-green-500" /> : <ExternalLink className="w-4 h-4" />}
                    </button>
                }
            />

            <div className="pt-16">
                <BackgroundPreview settings={settings} />

                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <div className="grid lg:grid-cols-3 gap-10">

                        {/* Левая колонка */}
                        <div className="lg:col-span-2 order-2 lg:order-1 min-w-0 space-y-6">
                            <div>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 dark:bg-blue-950/50 text-[#0077ff] text-xs font-semibold rounded-full mb-3">
                                    <Palette className="w-3.5 h-3.5" />
                                    {t('themePreview.sharedBadge')}
                                </span>
                                <h1 className="text-3xl font-black text-gray-950 dark:text-white tracking-tight mb-2">
                                    {meta.name}
                                </h1>
                                {meta.description && (
                                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{meta.description}</p>
                                )}
                                {meta.tags?.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 mt-3">
                                        {meta.tags.map(tag => (
                                            <span key={tag} className="px-2.5 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <ColorStrip settings={settings} />
                            <FontSample settings={settings} />

                            <div className="space-y-3">
                                <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                                    {t('themePreview.paramsCount', { count: paramCount })}
                                </p>
                                {GROUPS.map(g => (
                                    <ParamGroup key={g.id} groupId={g.id} settings={settings} />
                                ))}
                            </div>
                        </div>

                        {/* Правая колонка (sticky) */}
                        <div className="order-1 lg:order-2 min-w-0 space-y-4 lg:sticky lg:top-24 self-start">
                            <div className="p-5 bg-gray-50 dark:bg-gray-900 rounded-2xl space-y-3">
                                <button
                                    onClick={handleApply}
                                    className="flex items-center justify-center gap-2 w-full py-3 bg-[#0077ff] hover:bg-blue-500 text-white text-sm font-bold rounded-xl active:scale-[0.98] transition-all"
                                >
                                    {applied
                                        ? <><Check className="w-4 h-4" /> {t('detail.applied')}</>
                                        : <><Zap className="w-4 h-4" /> {t('detail.apply')}</>
                                    }
                                </button>
                                <button
                                    onClick={handleCopy}
                                    className="flex items-center justify-center gap-2 w-full py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 active:scale-[0.98] transition-all"
                                >
                                    {link.copied
                                        ? <><Check className="w-4 h-4 text-green-500" /> {t('detail.copied')}</>
                                        : <><Copy className="w-4 h-4" /> {t('detail.copyLink')}</>
                                    }
                                </button>
                            </div>

                            <ExtensionHint
                                detected={detected}
                                connectedTail={t('themeDetail.hintConnected')}
                                disconnectedText={t('themeDetail.hintDisconnected')}
                            />

                            <div className="p-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl">
                                <p className="text-xs text-gray-400 dark:text-gray-500 mb-2 font-medium">{t('themePreview.themeLink')}</p>
                                <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 rounded-xl px-3 py-2 border border-gray-200 dark:border-gray-700">
                                    <span className="flex-1 min-w-0 text-[10px] font-mono text-gray-500 dark:text-gray-400 truncate">
                                        {shareUrl}
                                    </span>
                                    <button onClick={handleCopy} className="shrink-0 text-[#0077ff] hover:text-blue-500 transition-colors">
                                        {link.copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                                    </button>
                                </div>
                            </div>

                            <Link
                                to="/themes"
                                className="flex items-center justify-center gap-2 py-2.5 text-sm text-gray-400 dark:text-gray-500 hover:text-[#0077ff] transition-colors"
                            >
                                <ExternalLink className="w-3.5 h-3.5" />
                                {t('themePreview.seeAllThemes')}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}