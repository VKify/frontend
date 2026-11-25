import { useTranslation } from '../../i18n'
export default function LampaProxyGuide() {
 const {lang}=useTranslation(); const t=(ru,en)=>lang==='ru'?ru:en
 return <div id="lampa-proxy" className="mt-6 scroll-mt-28 rounded-3xl border border-gray-200 p-6 dark:border-gray-800 sm:p-8">
  <h3 className="text-xl font-bold">{t('Как подключить прокси','How to connect a proxy')}</h3>
  <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray-600 dark:text-gray-400">{t('Для браузера и других Smart TV нужен совместимый с VKify CORS-прокси. В приложении Lampa для Android этот шаг пропустите.','Browsers and other Smart TVs need a VKify-compatible CORS proxy. Skip this step in the Lampa Android app.')}</p>
  <ol className="mt-6 grid gap-6 sm:grid-cols-2">
   {[
    [t('Получите HTTPS-адрес','Get an HTTPS address'),t('Используйте свой прокси или адрес от его владельца. Нужен сервис для VKify с поддержкой ?target=. Адрес VPN или обычного HTTP/SOCKS-прокси сюда не подходит.','Use your own proxy or an address from its operator. It must support the VKify ?target= protocol. A VPN or ordinary HTTP/SOCKS proxy address will not work.')],
    [t('Откройте настройки VKify','Open VKify settings'),t('В Lampa: «Настройки → VKify Видео → Прокси для браузера / Smart TV».','In Lampa: Settings → VKify Video → Proxy for browser / Smart TV.')],
    [t('Вставьте адрес и сохраните','Paste the address and save'),t('Вставьте корневой HTTPS-адрес сервиса. Ссылку на видео и параметр target добавлять не нужно — плагин подставит их сам.','Paste the service’s root HTTPS address. Do not add a video URL or target parameter; the plugin supplies these automatically.')],
    [t('Проверьте подключение','Check the connection'),t('Нажмите «Проверить подключение» в настройках VKify. Затем откройте каталог и запустите видео: успешная диагностика ещё не гарантирует воспроизведение.','Run Check connection in VKify settings. Then open the catalogue and play a video: successful diagnostics alone do not guarantee playback.')],
   ].map(([title,body],index)=><li key={title} className="flex gap-3"><span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-xs font-bold text-orange-600 dark:text-orange-300">{index+1}</span><div><h4 className="text-sm font-semibold">{title}</h4><p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{body}</p></div></li>)}
  </ol>
  <details className="mt-7 border-t border-gray-200 pt-5 dark:border-gray-800">
   <summary className="cursor-pointer text-sm font-semibold">{t('Если не подключается','If the connection fails')}</summary>
   <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
    <li>{t('Проверьте адрес и доступность сервиса с самого устройства. localhost и 127.0.0.1 на телевизоре указывают на телевизор, а не на ваш компьютер.','Check the address and service availability from the device itself. On a TV, localhost and 127.0.0.1 refer to the TV, not your computer.')}</li>
    <li>{t('Ошибка HTTPS или сертификата: проверьте публичный адрес прокси. Одного работающего предпросмотра сервиса недостаточно.','For HTTPS or certificate errors, check the public proxy address. A working service preview is not sufficient.')}</li>
    <li>{t('Каталог работает, видео — нет: попробуйте другое видео или меньшее качество. Доступность потока зависит от VK и устройства.','If the catalogue works but playback fails, try another video or lower quality. Stream availability depends on VK and your device.')}</li>
    <li>{t('Чтобы отключить прокси, очистите поле адреса и сохраните. В браузере после этого прямой доступ может не работать.','To disable the proxy, clear and save the address field. Direct browser access may then be unavailable.')}</li>
   </ul>
  </details>
  <p className="mt-5 text-xs leading-relaxed text-gray-500 dark:text-gray-400">{t('Общий публичный прокси не предоставляется. На физических Samsung и LG работа пока не подтверждена.','A shared public proxy is not provided. Physical Samsung and LG devices have not yet been verified.')}</p>
 </div>
}
