// Реальные иконки ВКонтакте (@vkontakte/icons) для документации.
// Те же глифы, что использует само расширение и левое меню VK.
import {
  // Разделы и фичи (24/28px)
  Icon24Palette, Icon24Hide, Icon28GridLayoutOutline, Icon24DropsOutline,
  Icon24TextTtOutline, Icon24Filter, Icon24Picture, Icon24Bookmark, Icon24Share,
  Icon24UserCircleOutline, Icon24NewsfeedOutline, Icon24MessageOutline,
  Icon24UsersOutline, Icon24Users3Outline, Icon24LogoVkMusicOutline,
  Icon24MenuOutline, Icon24Globe,
  // «Позже»-вкладки
  Icon24Download, Icon28ShieldKeyholeOutline, Icon24StatisticsOutline,
  Icon24Flash, Icon24Block, Icon24BracketsSlashOutline, Icon24Settings,
  // Пункты левого меню ВК (20px — как в самом меню)
  Icon20UserCircleOutline, Icon20NewsfeedOutline, Icon20MessageOutline,
  Icon20PhoneOutline, Icon20UsersOutline, Icon20Users3Outline, Icon20PictureOutline,
  Icon20MusicOutline, Icon20LogoVkVideoOutline, Icon20LogoClipsOutline,
  Icon20GameOutline, Icon20StickerSmileOutline, Icon20MarketOutline,
  Icon20ServicesOutline, Icon20CoinsOutline, Icon20BookmarkOutline,
  Icon20DocumentOutline, Icon20MegaphoneOutline, Icon20HelpOutline,
} from '@vkontakte/icons'

// Ключ (из data/docs.js) → компонент иконки VK.
export const VK_ICONS = {
  // Секции и фичи
  palette: Icon24Palette,
  hide: Icon24Hide,
  layout: Icon28GridLayoutOutline,
  drops: Icon24DropsOutline,
  text: Icon24TextTtOutline,
  filter: Icon24Filter,
  picture: Icon24Picture,
  bookmark: Icon24Bookmark,
  share: Icon24Share,
  profile: Icon24UserCircleOutline,
  feed: Icon24NewsfeedOutline,
  message: Icon24MessageOutline,
  users: Icon24UsersOutline,
  users3: Icon24Users3Outline,
  music: Icon24LogoVkMusicOutline,
  menu: Icon24MenuOutline,
  globe: Icon24Globe,
  // «Позже»-вкладки
  download: Icon24Download,
  shield: Icon28ShieldKeyholeOutline,
  activity: Icon24StatisticsOutline,
  flash: Icon24Flash,
  ban: Icon24Block,
  code: Icon24BracketsSlashOutline,
  settings: Icon24Settings,
}

/**
 * Иконка VK по ключу. Размер задаём явными width/height (иконки @vkontakte/icons
 * имеют свой width/height, поэтому Tailwind-классы w-/h- на них не действуют),
 * цвет — через className (fill наследует currentColor).
 */
export function VkIcon({ name, size = 24, className = '' }) {
  const Comp = VK_ICONS[name]
  if (!Comp) return null
  return <Comp width={size} height={size} fill="currentColor" className={className} />
}

// Левое меню ВКонтакте — пункты в порядке навигации, с реальными иконками.
const VK_MENU_ITEMS = [
  { name: 'Профиль', Icon: Icon20UserCircleOutline },
  { name: 'Лента', Icon: Icon20NewsfeedOutline },
  { name: 'Мессенджер', Icon: Icon20MessageOutline },
  { name: 'Звонки', Icon: Icon20PhoneOutline },
  { name: 'Друзья', Icon: Icon20UsersOutline },
  { name: 'Сообщества', Icon: Icon20Users3Outline },
  { name: 'Фото', Icon: Icon20PictureOutline },
  { name: 'Музыка', Icon: Icon20MusicOutline },
  { name: 'Видео', Icon: Icon20LogoVkVideoOutline },
  { name: 'Клипы', Icon: Icon20LogoClipsOutline },
  { name: 'Игры', Icon: Icon20GameOutline },
  { name: 'Стикеры', Icon: Icon20StickerSmileOutline },
  { name: 'Маркет', Icon: Icon20MarketOutline },
  { divider: true },
  { name: 'Сервисы', Icon: Icon20ServicesOutline },
  { name: 'Голоса', Icon: Icon20CoinsOutline },
  { divider: true },
  { name: 'Закладки', Icon: Icon20BookmarkOutline },
  { name: 'Файлы', Icon: Icon20DocumentOutline },
  { name: 'Реклама', Icon: Icon20MegaphoneOutline },
  { name: 'Помощь', Icon: Icon20HelpOutline },
]

/**
 * Макет левого меню ВКонтакте с настоящими иконками. Часть пунктов помечена как
 * скрытая — наглядно показывает, что делает функция «Пункты меню».
 */
export function VkMenuMock({ hidden = ['Игры', 'Маркет', 'Реклама'], caption }) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="p-2 max-w-[280px]">
        {VK_MENU_ITEMS.map((item, i) => {
          if (item.divider) {
            return <div key={i} className="my-1.5 mx-3 border-t border-gray-100 dark:border-gray-800" />
          }
          const isHidden = hidden.includes(item.name)
          return (
            <div
              key={i}
              className={`flex items-center gap-3 px-3 py-1.5 rounded-lg text-sm ${
                isHidden
                  ? 'text-gray-300 dark:text-gray-700 line-through'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              <item.Icon
                width={20}
                height={20}
                fill="currentColor"
                className={isHidden ? 'text-gray-300 dark:text-gray-700' : 'text-gray-500 dark:text-gray-400'}
              />
              <span>{item.name}</span>
            </div>
          )
        })}
      </div>
      {caption && (
        <figcaption className="px-3 py-2 text-[11px] text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
