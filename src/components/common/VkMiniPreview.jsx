import VkLogo from './VkLogo'
import { isDarkColor } from '../../utils/colors'

/**
 * Миниатюрный макет интерфейса VK для карточек превью тем.
 * Принимает цвета темы и рендерит упрощённый UI: навбар, сайдбар, лента.
 */
export default function VkMiniPreview({ bg, card, accent }) {
    const dark         = isDarkColor(bg)
    const textColor    = dark ? 'rgba(255,255,255,0.75)' : 'rgba(0,0,0,0.60)'
    const textFaint    = dark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.18)'
    const textFainter  = dark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.09)'
    const divider      = dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)'

    return (
        <>
            {/* Навбар */}
            <div
                className="absolute top-0 left-0 right-0 flex items-center gap-2 px-3 py-2"
                style={{ background: card, borderBottom: `1px solid ${divider}` }}
            >
                <VkLogo accent={accent} size={16} />
                <div className="flex items-center gap-2 flex-1">
                    {[40, 30, 36].map((w, i) => (
                        <div key={i} className="h-1.5 rounded-full"
                             style={{ width: `${w}%`, maxWidth: `${w}px`,
                                      background: i === 0 ? accent : textFaint,
                                      opacity: i === 0 ? 1 : 0.7 }} />
                    ))}
                </div>
                <div className="flex items-center gap-1.5">
                    {[1, 2].map(i => (
                        <div key={i} className="w-4 h-4 rounded-full" style={{ background: textFaint }} />
                    ))}
                </div>
            </div>

            {/* Основной контент */}
            <div className="absolute left-0 right-0 bottom-0 flex gap-2 px-2.5 pb-2.5"
                 style={{ top: '36px' }}>

                {/* Сайдбар */}
                <div className="flex flex-col gap-1.5 pt-2" style={{ width: '28%' }}>
                    <div className="w-7 h-7 rounded-full mb-1" style={{ background: accent, opacity: 0.85 }} />
                    {[70, 55, 65, 50].map((w, i) => (
                        <div key={i} className="h-1.5 rounded-full"
                             style={{ width: `${w}%`, background: i === 0 ? textColor : textFaint }} />
                    ))}
                    <div className="my-1 h-px" style={{ background: divider }} />
                    {[60, 45].map((w, i) => (
                        <div key={i} className="h-1.5 rounded-full"
                             style={{ width: `${w}%`, background: textFainter }} />
                    ))}
                </div>

                {/* Лента */}
                <div className="flex-1 flex flex-col gap-2 pt-2">
                    {/* Пост 1 */}
                    <div className="rounded-xl p-2.5 flex flex-col gap-1.5" style={{ background: card }}>
                        <div className="flex items-center gap-1.5">
                            <div className="w-4 h-4 rounded-full flex-shrink-0" style={{ background: accent, opacity: 0.7 }} />
                            <div className="h-1.5 rounded-full flex-1" style={{ background: textFaint, maxWidth: '60%' }} />
                        </div>
                        {[85, 70, 50].map((w, i) => (
                            <div key={i} className="h-1 rounded-full"
                                 style={{ width: `${w}%`, background: i === 0 ? textColor : textFaint,
                                          opacity: i === 0 ? 0.6 : 1 }} />
                        ))}
                        <div className="flex gap-2 pt-0.5">
                            {[24, 28, 20].map((w, i) => (
                                <div key={i} className="h-1 rounded-full"
                                     style={{ width: `${w}px`, background: i === 0 ? accent : textFainter,
                                              opacity: i === 0 ? 0.7 : 1 }} />
                            ))}
                        </div>
                    </div>

                    {/* Пост 2 */}
                    <div className="rounded-xl p-2 flex flex-col gap-1" style={{ background: card }}>
                        <div className="flex items-center gap-1.5">
                            <div className="w-3.5 h-3.5 rounded-full flex-shrink-0" style={{ background: accent, opacity: 0.5 }} />
                            <div className="h-1 rounded-full" style={{ width: '45%', background: textFaint }} />
                        </div>
                        {[75, 55].map((w, i) => (
                            <div key={i} className="h-1 rounded-full"
                                 style={{ width: `${w}%`, background: textFainter }} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}