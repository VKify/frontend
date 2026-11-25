import { ArrowLeft, ArrowDown, MessageCircle, Music2, Newspaper, PencilLine, Users, Download, Palette, Smartphone, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEO from '../components/common/SEO'
import ProductDevice from '../components/home/ProductDevice'
import RelatedProducts from '../components/home/RelatedProducts'
import { products } from '../data/products'
import { useTranslation } from '../i18n'

const product = products.find(p => p.id === 'android')
const features = [
  [Newspaper, 'Лента без потери места', 'Возвращайтесь к той записи, на которой остановились. Новые публикации появляются по вашему переходу, без принудительной прокрутки наверх.', 'Keep your place in the feed', 'Return to the post you were reading. Open new posts when you choose, without being forced back to the top.'],
  [MessageCircle, 'Сообщения в порядке', 'Папки, локальный архив, закрепления и поиск. Черновики и очередь отправки сохраняются; отдельную отправку можно повторить или отменить.', 'Organised conversations', 'Folders, a local archive, pinned chats and search. Drafts and the outgoing queue are saved; individual sends can be retried or cancelled.'],
  [Music2, 'Музыка под ваш ритм', 'Фоновый плеер, очередь, плейлисты, тексты и похожие треки. Эквалайзер с пресетами, локальная музыка и пакетное скачивание.', 'Music your way', 'Background playback, a queue, playlists, lyrics and similar tracks. Equalizer presets, local music and batch downloads.'],
  [PencilLine, 'От идеи до публикации', 'Редактор записей с вложениями и опросами. Именованные черновики с поиском и восстановлением, инструменты для историй и клипов.', 'From idea to post', 'A post editor with attachments and polls. Named drafts with search and restore, plus tools for stories and clips.'],
  [Users, 'Профили и сообщества', 'Друзья, фотографии, альбомы и обсуждения. Для администраторов — настройки сообщества, статистика и инструменты модерации.', 'Profiles and communities', 'Friends, photos, albums and discussions. Community settings, statistics and moderation tools for administrators.'],
  [Download, 'Медиа с собой', 'Общая офлайн-библиотека, загрузки и кеш. Сохранённые материалы собраны в одном месте для дальнейшего использования.', 'Keep media with you', 'A shared offline library, downloads and cache. Saved items are organised in one place for later use.'],
]
export default function Android() {
  const { lang } = useTranslation()
  const text = (ru, en) => lang === 'ru' ? ru : en
  const wrap = 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'
  return (
    <div className="bg-white text-gray-900 dark:bg-gray-950 dark:text-white">
      <SEO title={text('VKify для Android', 'VKify for Android')} description={text('Лента, сообщения, музыка и публикации ВКонтакте в приложении VKify для Android. Возможности и текущее состояние проекта.', 'VK feed, messages, music and publishing in VKify for Android. Features and project status.')} image={product.image} url="/android" locale={lang} />
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-500/10 via-transparent to-teal-500/5 pb-16 pt-28 md:pt-36">
        <div className={wrap}>
          <Link to="/#products" className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400"><ArrowLeft className="size-4" />{text('Все продукты', 'All products')}</Link>
          <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_1fr]">
            <div className="pt-8">
              <div className="mb-6 flex flex-wrap gap-3 text-xs font-semibold"><span className="rounded-full bg-emerald-500/10 px-3 py-2 text-emerald-700 dark:text-emerald-300">ANDROID 8+</span><span className="rounded-full bg-blue-500/10 px-3 py-2 text-blue-700 dark:text-blue-300">{text('В активной разработке', 'In active development')}</span></div>
              <h1 className="font-display text-4xl font-black leading-tight tracking-tight sm:text-5xl xl:text-6xl">{text('Ваш ВКонтакте.', 'Your VK.')}<br /><span className="text-emerald-600 dark:text-emerald-400">{text('Всегда под рукой.', 'Always within reach.')}</span></h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-600 dark:text-gray-400">{text('Читайте ленту, общайтесь, слушайте музыку и создавайте публикации. VKify собирает привычные возможности ВКонтакте в приложении с настраиваемым оформлением.', 'Read your feed, chat, listen to music and create posts. VKify brings familiar VK features together in an app with customisable styling.')}</p>
              <a href="#android-features" className="mt-8 inline-flex items-center gap-3 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700">{text('Возможности приложения', 'Explore the app')}<ArrowDown className="size-4" /></a>
            </div>
            <div className="mx-auto w-full max-w-md"><ProductDevice product={product} /></div>
          </div>
        </div>
      </section>
      <section id="android-features" className={'scroll-mt-28 py-20 ' + wrap}>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">{text('Уже в проекте', 'Implemented in the project')}</p>
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{text('Для общения. И всего вокруг.', 'For conversations. And everything around them.')}</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map(([Icon, title, body, enTitle, enBody]) => <article key={title} className="rounded-3xl border border-gray-200 bg-gray-50 p-7 dark:border-gray-800 dark:bg-gray-900/50"><span className="mb-5 inline-flex size-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"><Icon className="size-5" /></span><h3 className="text-xl font-bold">{text(title, enTitle)}</h3><p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{text(body, enBody)}</p></article>)}
        </div>
      </section>
      <section className="border-y border-gray-200 bg-gray-50 py-20 dark:border-gray-800 dark:bg-gray-900/40">
        <div className={'grid gap-10 lg:grid-cols-[0.8fr_1.2fr] ' + wrap}>
          <div><Palette className="mb-5 size-8 text-emerald-500" /><h2 className="font-display text-3xl font-bold sm:text-4xl">{text('Ближе к вашему стилю', 'Closer to your style')}</h2><p className="mt-5 leading-relaxed text-gray-600 dark:text-gray-400">{text('Собственные цвета, профили оформления и высокая контрастность. На Android 12 и новее доступны динамические цвета системы.', 'Custom colours, appearance profiles and high contrast. Android 12 and later also support dynamic system colours.')}</p></div>
          <div className="grid gap-5 sm:grid-cols-2">
            {[[Smartphone, text('Удобно на большом экране', 'Room for more'), text('На широких экранах список диалогов и открытый чат располагаются рядом.', 'On wide screens, the conversation list and open chat appear side by side.')], [ShieldCheck, text('Личные данные на устройстве', 'Local data protection'), text('Черновики и очередь сообщений хранятся с шифрованием. Папки и локальный архив диалогов разделены по аккаунтам.', 'Drafts and outgoing messages use encrypted storage. Folders and local chat archives are separated by account.')]].map(([Icon, title, body]) => <article key={title} className="rounded-3xl border border-gray-200 bg-white p-7 dark:border-gray-800 dark:bg-gray-950"><Icon className="mb-5 size-6 text-emerald-500" /><h3 className="text-lg font-bold">{title}</h3><p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{body}</p></article>)}
          </div>
        </div>
      </section>
      <section className={'py-20 ' + wrap}>
        <div className="grid gap-8 rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-7 sm:p-10 lg:grid-cols-2">
          <div><h2 className="font-display text-3xl font-bold">{text('Готовим к публичному выпуску', 'Working towards a public release')}</h2><p className="mt-4 leading-relaxed text-gray-600 dark:text-gray-400">{text('Основные разделы уже реализованы. Сейчас приоритет — стабильность, проверка на устройствах и надёжная работа с VK. Страница описывает текущую разработку, а не завершённый публичный релиз.', 'The core sections are implemented. Stability, device testing and reliable VK integration are the priorities. This page describes development progress, not a completed public release.')}</p></div>
          <div className="space-y-5 text-sm leading-relaxed text-gray-600 dark:text-gray-400"><p><strong className="text-gray-900 dark:text-white">{text('Android 8 и новее. ', 'Android 8 and later. ')}</strong>{text('Для работы с аккаунтом нужен вход в VK. Доступность отдельных действий зависит от прав аккаунта и API VK.', 'Sign in to VK to use your account. Individual actions depend on account permissions and the VK API.')}</p><p>{text('Проверки на устройствах продолжаются: работа всех сценариев на всех телефонах пока не подтверждена. Ссылку на публичную установку добавим после подготовки выпуска.', 'Device testing is ongoing; not every scenario has been verified on every phone. A public installation link will be added when the release is ready.')}</p><Link to="/news" className="inline-flex font-semibold text-emerald-700 hover:underline dark:text-emerald-400">{text('Следить за новостями →', 'Follow the news →')}</Link></div>
        </div>
      </section>
      <RelatedProducts current="android" />
    </div>
  )
}
