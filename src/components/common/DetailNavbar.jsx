import { useNavigate } from 'react-router-dom'
import { motion, useScroll, useSpring } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useTranslation } from '../../i18n'

/**
 * Прогрессбар прокрутки страницы — копия логики из глобального Header.
 * Рендерится всегда: при scrollY = 0 имеет scaleX = 0 (визуально пустой),
 * при прокрутке плавно тянется до конца.
 */
function NavbarProgressBar() {
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    })

    return (
        <motion.div
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#0077ff] to-blue-600 origin-left"
            style={{ scaleX }}
        />
    )
}

/**
 * Шапка для детальных страниц (/themes/:id, /theme/:encoded, /wallpapers/:id):
 * fixed top-0, h-16, кнопка «Назад» слева, заголовок по центру (опционально
 * с цветной точкой-акцентом), произвольный слот справа, прогрессбар прокрутки
 * на нижней границе.
 *
 *
 * Props:
 *   backTo  — путь, куда уходить по клику «Назад»
 *   title   — заголовок страницы
 *   accent  — опциональный цвет точки слева от заголовка
 *   actions — опциональный React-узел в правом слоте (например, кнопка копирования)
 */
export default function DetailNavbar({ backTo, title, accent, actions }) {
    const navigate = useNavigate()
    const { t } = useTranslation()

    return (
        <div
            className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-4 sm:px-6 lg:px-8
                bg-white/80 dark:bg-gray-950/80 backdrop-blur-md
                border-b border-gray-100 dark:border-gray-900"
        >
            <button
                onClick={() => navigate(backTo)}
                className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400
                    hover:text-gray-900 dark:hover:text-white transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                {t('common.back')}
            </button>

            <div className="mx-auto flex items-center gap-2 text-sm font-semibold
                text-gray-900 dark:text-white truncate px-4">
                {accent && (
                    <span
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ background: accent }}
                    />
                )}
                {title}
            </div>

            {/* Правый слот: сохраняет симметрию с кнопкой «Назад», даже если actions пустой. */}
            <div className="flex items-center justify-end min-w-[4rem]">
                {actions}
            </div>

            <NavbarProgressBar />
        </div>
    )
}