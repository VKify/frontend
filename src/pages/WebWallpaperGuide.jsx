import { Link } from 'react-router-dom'
import { ArrowLeft, Check, Code2, FolderTree, Globe2, Settings2 } from 'lucide-react'
import SEO from '../components/common/SEO'
import { WEB_WALLPAPER_GUIDE } from '../data/webWallpaperGuide'
import { useTranslation } from '../i18n'

const ICONS = [Code2, Settings2, Globe2]

function rich(text) {
  return text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={index} className="font-semibold text-gray-950 dark:text-white">{part.slice(2, -2)}</strong>
    if (part.startsWith('`') && part.endsWith('`')) return <code key={index} className="rounded bg-blue-50 px-1.5 py-0.5 font-mono text-[0.9em] text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">{part.slice(1, -1)}</code>
    return part
  })
}

function CodeBlock({ example }) {
  return (
    <div className="mt-5 overflow-hidden rounded-2xl border border-gray-800 bg-[#090d16] shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-800 px-4 py-2 text-xs text-gray-400">
        <span>{example.label}</span><span className="font-mono uppercase">{example.language}</span>
      </div>
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed text-gray-200"><code>{example.content}</code></pre>
    </div>
  )
}

export default function WebWallpaperGuide() {
  const { lang } = useTranslation()
  const meta = WEB_WALLPAPER_GUIDE[lang] || WEB_WALLPAPER_GUIDE.ru

  return (
    <div className="min-h-screen bg-white pb-20 pt-24 dark:bg-gray-950">
      <SEO title={meta.seoTitle} description={meta.seoDescription} url="/wallpapers/guide" />
      <main className="mx-auto max-w-4xl px-4 sm:px-6">
        <Link to="/wallpapers" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-blue-600 dark:text-gray-400">
          <ArrowLeft className="h-4 w-4" />{lang === 'ru' ? 'Вернуться в каталог' : 'Back to catalog'}
        </Link>
        <div className="mb-10">
          <span className="mb-4 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
            {lang === 'ru' ? 'Отдельное руководство' : 'Standalone guide'}
          </span>
          <h1 className="text-4xl font-black tracking-tight text-gray-950 sm:text-5xl dark:text-white">{meta.title}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-600 dark:text-gray-400">{meta.subtitle}</p>
        </div>
        <div className="mb-12 grid gap-4 rounded-3xl border border-gray-200 bg-gray-50 p-5 sm:grid-cols-[auto_1fr] dark:border-gray-800 dark:bg-gray-900">
          <FolderTree className="mt-1 h-6 w-6 text-blue-600" />
          <div>
            <h2 className="font-bold text-gray-950 dark:text-white">{lang === 'ru' ? 'Структура папки' : 'Folder structure'}</h2>
            <pre className="mt-3 overflow-x-auto font-mono text-sm leading-6 text-gray-600 dark:text-gray-300">{`my-wallpaper/\n├─ index.html\n├─ wallpaper.js\n├─ wallpaper-runtime.js  (properties)\n├─ project.json          (properties)\n└─ preview.png`}</pre>
          </div>
        </div>
        <div className="space-y-8">
          {WEB_WALLPAPER_GUIDE.features.map((feature, featureIndex) => {
            const content = feature[lang] || feature.ru
            const Icon = ICONS[featureIndex] || Code2
            return (
              <section key={feature.anchor} id={feature.anchor} className="scroll-mt-24 rounded-3xl border border-gray-200 p-6 sm:p-8 dark:border-gray-800">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300"><Icon className="h-5 w-5" /></span>
                  <div><span className="text-xs font-bold text-blue-600">0{featureIndex + 1}</span><h2 className="text-2xl font-bold text-gray-950 dark:text-white">{content.title}</h2></div>
                </div>
                <p className="mb-6 leading-relaxed text-gray-600 dark:text-gray-400">{content.lead}</p>
                <ol className="space-y-3">
                  {content.how.map((step, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" /><span className="leading-relaxed">{rich(step)}</span>
                    </li>
                  ))}
                </ol>
                {content.code?.map((example, index) => <CodeBlock key={index} example={example} />)}
                <p className="mt-5 rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-600 dark:bg-gray-900 dark:text-gray-400">{rich(content.access)}</p>
              </section>
            )
          })}
        </div>
      </main>
    </div>
  )
}
