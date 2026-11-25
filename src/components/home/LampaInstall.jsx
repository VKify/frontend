import { useState } from 'react'
import { BookOpen, Copy, Network, AlertTriangle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ProductMark } from './ProductArtwork'
import { useTranslation } from '../../i18n'
export const lampaPluginUrl = 'https://vkify.ru/plugins/vkify.js'
export default function LampaInstall() {
 const {lang}=useTranslation();const t=(ru,en)=>lang==='ru'?ru:en
 const [status,setStatus]=useState('')
 return <section id="lampa-install" className="mx-auto max-w-7xl scroll-mt-28 px-4 py-20 sm:px-6 lg:px-8">
  <div className="rounded-3xl border border-orange-500/25 bg-gradient-to-br from-orange-500/10 to-transparent p-6 sm:p-10">
   <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-orange-600 dark:text-orange-400">{t('Начните здесь','Start here')}</p>
   <h2 className="font-display text-3xl font-bold sm:text-4xl">{t('Добавьте VKify в Lampa','Add VKify to Lampa')}</h2>
   <p className="mt-4 text-gray-600 dark:text-gray-400">{t('На Android — одна ссылка. Аккаунт VK не нужен.','On Android, just add the link. No VK account required.')}</p>
   <div className="my-7 flex flex-wrap items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-950">
    <a href="/plugins/vkify.js" className="min-w-0 flex-1 break-all font-mono text-sm text-orange-600 dark:text-orange-300">{lampaPluginUrl}</a>
    <button onClick={async()=>{try{await navigator.clipboard.writeText(lampaPluginUrl);setStatus(t('Скопировано','Copied'))}catch{setStatus(t('Скопируйте ссылку вручную','Copy the link manually'))}}} className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-4 py-3 text-sm font-semibold text-white"><Copy className="size-4"/>{t('Копировать','Copy')}</button>
   </div>
   <p role="status" className="mt-2 text-xs text-orange-500">{status}</p>
   <div className="mt-5 grid gap-3 sm:grid-cols-2">
    <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
     <h3 className="flex items-center gap-2.5 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
      <span className="w-7 shrink-0"><ProductMark product={{ id: 'android' }} /></span>
      Android / Android TV
     </h3>
     <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{t('В приложении Lampa для Android работает напрямую — без прокси.', 'The Lampa Android app connects directly — no proxy needed.')}</p>
    </div>
    <div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-4">
     <h3 className="flex items-center gap-2.5 text-sm font-semibold text-orange-700 dark:text-orange-300">
      <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-orange-500/10"><Network className="size-4" aria-hidden="true" /></span>
      {t('Остальные платформы', 'Other platforms')}
     </h3>
     <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{t('Подключите персональную ссылку от своего сервера или настройте прокси на компьютере. Все шаги — в документации.', 'Use a personal URL from your server or set up a local computer proxy. Follow the documentation for each step.')}</p>
    </div>
   </div>
   <div className="mt-5 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5">
    <h3 className="flex items-center gap-2 font-semibold text-amber-800 dark:text-amber-300"><AlertTriangle className="size-5 shrink-0" />{t('Для полного каталога нужен российский IP', 'A Russian IP is required for the full catalogue')}</h3>
    <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{t('На Android важен исходящий IP самого устройства. При подключении через VPS важен исходящий IP сервера, а не телевизора или компьютера. С зарубежным IP вместо каталога появится пояснение; поиск видео останется доступен.', 'On Android, your device needs a Russian outgoing IP. With a VPS, the server needs a Russian outgoing IP, regardless of your TV or computer IP. A limited catalogue is replaced by a notice; video search remains available.')}</p>
   </div>
   <Link to="/docs/lampa" className="mt-6 inline-flex items-center gap-2 font-semibold text-orange-600 hover:underline dark:text-orange-400"><BookOpen className="size-5" />{t('Инструкция для Android, Smart TV и компьютера', 'Instructions for Android, Smart TV and computers')}</Link>

  </div>
 </section>
}
