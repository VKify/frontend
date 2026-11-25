import { useRef, useState } from 'react'
import { Maximize2, X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react'
import { useTranslation } from '../../i18n'

const shots = [
 {id:'example-1',title:['Каталог VK','VK catalogue'],body:['Отдельный раздел в меню: подборки, жанры, сериалы и продолжение просмотра.','A dedicated menu section with collections, genres, series and viewing history.']},
 {id:'example-5',title:['Из карточки Lampa','From a Lampa card'],body:['«VKify Видео» доступен в источниках фильма Lampa.','Open a film in Lampa and select VKify Video in the source list to find matches on VK.']},
 {id:'example-6',title:['Результаты поиска','Search results'],body:['Выберите подходящее видео из результатов поиска.','Compare titles, duration and quality. Adjust the query or expand the search when needed.']},
 {id:'example-7',title:['Фильтры','Filters'],body:['Фильтруйте видео по качеству, длительности и типу.','Narrow results by quality, duration and video type using VK metadata.']},
 {id:'example-2',title:['Карточка видео','Video details'],body:['Прочитайте описание, добавьте видео в «Смотреть позже» или вернитесь к просмотру.','Read the description, save a video for later or return to watching.']},
 {id:'example-3',title:['Сезоны и серии','Seasons and episodes'],body:['Выбирайте сезон и серию или продолжайте с сохранённой позиции.','Choose a season and episode or resume from your saved position.']},
 {id:'example-4',title:['Телеканалы','Live channels'],body:['Категории прямых эфиров и избранные каналы в том же интерфейсе.','Live TV categories and favourite channels in the same interface.']},
]
export default function LampaGallery() {
  const { lang } = useTranslation()
  const en = lang !== 'ru'
  const [selected, setSelected] = useState(1)
  const [zoomed, setZoomed] = useState(false)
  const dialog = useRef(null)
  const viewport = useRef(null)
  const shot = shots[selected]
  const src = '/products/lampa/' + shot.id + (shot.id === 'example-3' ? '.png' : '.webp')
  return (
    <section id="lampa-examples" className="scroll-mt-28 border-y border-gray-200 bg-gray-50 py-16 dark:border-gray-800 dark:bg-gray-900/40 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-orange-600 dark:text-orange-400">{en ? 'Inside the plugin' : 'Плагин в работе'}</p>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{en ? 'Inside VKify' : 'Интерфейс VKify'}</h2>

        </div>
        <div className="grid gap-5">
          <figure className="relative min-w-0 overflow-hidden rounded-3xl border border-gray-200 bg-gray-950 dark:border-gray-700">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 text-white sm:px-6">
              <div aria-live="polite"><span className="mr-3 font-mono text-xs text-orange-400">{String(selected + 1).padStart(2, '0')} / 07</span><span className="text-sm font-semibold">{shot.title[en ? 1 : 0]}</span></div>
              <div className="flex gap-1">
                <button aria-label={en ? 'Previous screenshot' : 'Предыдущий снимок'} onClick={() => {setSelected(i=>(i+shots.length-1)%shots.length);viewport.current.scrollTop=0}} className="rounded-full p-2 hover:bg-white/10"><ChevronLeft className="size-5"/></button>
                <button aria-label={en ? 'Next screenshot' : 'Следующий снимок'} onClick={() => {setSelected(i=>(i+1)%shots.length);viewport.current.scrollTop=0}} className="rounded-full p-2 hover:bg-white/10"><ChevronRight className="size-5"/></button>
              </div>
            </div>
            <div ref={viewport} tabIndex={0} role="region" aria-label={en ? 'Screenshot — scroll to explore' : 'Скриншот — прокрутите для просмотра'} className="aspect-[4/3] overflow-y-auto bg-[#1c2028] outline-offset-[-3px] focus-visible:outline-orange-500 sm:aspect-video">
              <div className="flex min-h-full items-center">
                <img src={src} alt={shot.title[en ? 1 : 0]} loading="lazy" className="mx-auto block h-auto w-full" />
              </div>
            </div>
            <figcaption className="flex items-center justify-between gap-3 border-t border-white/10 px-4 py-3 text-xs text-gray-400">
              <span>{en ? 'Scroll to see the full screenshot' : 'Прокрутите, чтобы увидеть весь снимок'}</span>
              <button type="button" onClick={() => { setZoomed(false); dialog.current.showModal() }} className="inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-white hover:bg-white/10"><Maximize2 className="size-4" />{en ? 'Enlarge' : 'Увеличить'}</button>
            </figcaption>
          </figure>
          <div className="flex gap-3 overflow-x-auto pb-3" aria-label={en ? 'Screenshots' : 'Скриншоты'}>
            {shots.map((item,index)=><button key={item.id} type="button" aria-pressed={selected===index} onClick={()=>{setSelected(index);viewport.current.scrollTop=0}} className={'w-36 shrink-0 overflow-hidden rounded-xl border p-1.5 text-left transition-colors sm:flex-1 ' + (selected===index ? 'border-orange-500 bg-orange-500/10' : 'border-gray-200 hover:border-orange-400 dark:border-gray-800')}>
              <img src={'/products/lampa/'+item.id+(item.id==='example-3'?'.png':'.webp')} alt="" loading="lazy" className="aspect-video w-full rounded-lg object-cover object-top"/>
              <span className="block px-1 pb-1 pt-2 text-xs font-semibold">{item.title[en?1:0]}</span>
            </button>)}
          </div>
        </div>
      </div>
      <dialog ref={dialog} aria-label={shot.title[en ? 1 : 0]} onClose={() => setZoomed(false)} onKeyDown={e => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          e.preventDefault(); setZoomed(false); setSelected(i => (i + (e.key === 'ArrowRight' ? 1 : shots.length - 1)) % shots.length)
        }
      }} className="fixed inset-0 m-0 h-[100dvh] max-h-none w-screen max-w-none border-0 bg-gray-950/95 p-0 text-white backdrop:bg-black/80">
        <div className="flex h-16 items-center justify-between gap-4 border-b border-white/10 px-4 sm:px-8">
          <span className="text-sm">{selected + 1} / {shots.length} · {shot.title[en ? 1 : 0]}</span>
          <div className="flex gap-2">
            <button type="button" onClick={() => setZoomed(v => !v)} aria-label={en ? 'Toggle zoom' : 'Изменить масштаб'} className="rounded-full p-3 hover:bg-white/10">{zoomed ? <ZoomOut className="size-5" /> : <ZoomIn className="size-5" />}</button>
            <button type="button" autoFocus onClick={() => dialog.current.close()} aria-label={en ? 'Close' : 'Закрыть'} className="rounded-full p-3 hover:bg-white/10"><X className="size-5" /></button>
          </div>
        </div>
        <div className="relative flex h-[calc(100dvh-4rem)] items-center">
          <button aria-label={en ? 'Previous' : 'Предыдущий'} onClick={() => {setZoomed(false);setSelected(i=>(i+shots.length-1)%shots.length)}} className="absolute left-2 z-10 rounded-full bg-black/60 p-3 hover:bg-black"><ChevronLeft className="size-6"/></button>
          <div key={shot.id + zoomed} className="h-full w-full overflow-auto p-4 sm:px-16" onClick={e=>{if(e.target===e.currentTarget)dialog.current.close()}}>
            <img src={src} alt={shot.title[en ? 1 : 0]} onClick={() => setZoomed(v => !v)} className={zoomed ? 'mx-auto block h-auto w-full cursor-zoom-out' : 'mx-auto block h-full max-w-full cursor-zoom-in object-contain'} />
          </div>
          <button aria-label={en ? 'Next' : 'Следующий'} onClick={() => {setZoomed(false);setSelected(i=>(i+1)%shots.length)}} className="absolute right-2 z-10 rounded-full bg-black/60 p-3 hover:bg-black"><ChevronRight className="size-6"/></button>
        </div>
      </dialog>
    </section>
  )
}
