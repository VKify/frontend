import { Link } from 'react-router-dom'
import { useTranslation } from '../../i18n'

export default function PlatformNav({ active }) {
  const { lang } = useTranslation()
  const platforms = [['browser', lang === 'ru' ? 'Расширение' : 'Extension'], ['lampa', 'Lampa'], ['android', 'Android'], ['android-tv', 'Android TV'], ['desktop', 'Desktop']]
  return (
    <nav aria-label={lang === 'ru' ? 'Платформы' : 'Platforms'} className="mb-8 flex gap-1 overflow-x-auto border-b border-gray-200 pb-3 dark:border-gray-800">
      {platforms.map(([id, title]) => <Link key={id} to={'/docs/' + id} aria-current={active === id ? 'page' : undefined} className={'shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-blue-500 ' + (active === id ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-900')}>{title}</Link>)}
    </nav>
  )
}
