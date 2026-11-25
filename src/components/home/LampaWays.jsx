import { ListVideo, Search } from 'lucide-react'
import { useTranslation } from '../../i18n'
export default function LampaWays() {
 const {lang}=useTranslation();const t=(ru,en)=>lang==='ru'?ru:en
 return <section aria-label={t('Как смотреть','Ways to watch')} className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
  <div className="grid divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-gray-50 dark:divide-gray-800 dark:border-gray-800 dark:bg-gray-900/50 md:grid-cols-2 md:divide-x md:divide-y-0">
   {[
    [ListVideo,t('Каталог в меню','Catalogue in the menu'),t('Фильмы, сериалы и эфиры в разделе «VKify Видео».','Films, series and live TV in the VKify Video section.')],
    [Search,t('Поиск из карточки','Search from a film card'),t('Выберите «VKify Видео» в источниках фильма Lampa.','Choose VKify Video in a Lampa film’s sources.')],
   ].map(([Icon,title,body])=><div key={title} className="flex items-start gap-4 p-6 sm:p-7"><span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500"><Icon className="size-5"/></span><div><h2 className="text-lg font-bold">{title}</h2><p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{body}</p></div></div>)}
  </div>
 </section>
}
