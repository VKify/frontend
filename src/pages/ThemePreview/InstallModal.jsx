import { X, Sparkles, Check, Download } from 'lucide-react'
import config from '../../config'
import { useTranslation } from '../../i18n'

export default function InstallModal({ onClose }) {
    const { t } = useTranslation()
    return (
        <div
            className="fixed inset-0 z-50 hidden md:flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

            <div
                className="relative w-full max-w-sm bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden"
                onClick={e => e.stopPropagation()}
                style={{ animation: 'modalIn 0.2s ease-out' }}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-1.5 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>

                <div className="bg-gradient-to-br from-[#0077ff] to-blue-500 px-8 pt-8 pb-10 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-xl font-black text-white mb-1">{t('install.title')}</h2>
                    <p className="text-sm text-white/80 leading-relaxed">
                        {t('install.subtitle')}
                    </p>
                </div>

                <div className="px-6 py-6 space-y-3">
                    {t('install.benefits').map(text => (
                        <div key={text} className="flex items-center gap-3">
                            <div className="w-5 h-5 rounded-full bg-[#0077ff]/10 flex items-center justify-center shrink-0">
                                <Check className="w-3 h-3 text-[#0077ff]" />
                            </div>
                            <span className="text-sm text-gray-700 dark:text-gray-300">{text}</span>
                        </div>
                    ))}

                    <a
                        href={config.links.chromeWebStore}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full mt-2 py-3.5 bg-[#0077ff] hover:bg-blue-500
                            text-white text-sm font-bold rounded-2xl transition-colors active:scale-[0.98]"
                    >
                        <Download className="w-4 h-4" />
                        {t('common.installFree')}
                    </a>
                    <p className="text-center text-xs text-gray-400 dark:text-gray-500">
                        {t('install.freeNote')}
                    </p>
                </div>
            </div>

            <style>{`
                @keyframes modalIn {
                    from { opacity: 0; transform: scale(0.92) translateY(8px); }
                    to   { opacity: 1; transform: scale(1)    translateY(0);   }
                }
            `}</style>
        </div>
    )
}