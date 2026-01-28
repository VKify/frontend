import { motion } from 'framer-motion'
import { 
  PartyPopper, 
  ExternalLink, 
  Settings,
  Palette,
  Shield,
  ChevronRight,
  Sparkles
} from 'lucide-react'
import SEO from '../components/common/SEO'
import Button from '../components/common/Button'
import { TelegramIcon, VKIcon, GitHubIcon } from '../components/common/SocialIcons'
import config from '../config'

const steps = [
  {
    icon: ExternalLink,
    title: 'Откройте vk.com',
    description: 'Перейдите на сайт ВКонтакте в браузере',
  },
  {
    icon: Settings,
    title: 'Нажмите на иконку VKify',
    description: 'Найдите значок расширения в панели браузера',
  },
  {
    icon: Palette,
    title: 'Настройте под себя',
    description: 'Выберите тему, включите нужные функции',
  },
]

const quickLinks = [
  {
    icon: TelegramIcon,
    title: 'Telegram-канал',
    description: 'Новости и обновления',
    href: config.links.telegram,
    color: 'bg-[#0088cc]',
  },
  {
    icon: VKIcon,
    title: 'Группа ВКонтакте',
    description: 'Поддержка и обсуждения',
    href: config.links.vk,
    color: 'bg-[#0077ff]',
  },
  {
    icon: GitHubIcon,
    title: 'GitHub',
    description: 'Исходный код и баги',
    href: config.links.github,
    color: 'bg-gray-800 dark:bg-gray-700',
  },
]

export default function Welcome() {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
      <SEO 
        title="Добро пожаловать"
        description="Спасибо за установку VKify! Узнайте, как начать использовать расширение."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-6"
          >
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#0077ff] to-blue-400 flex items-center justify-center shadow-2xl shadow-blue-500/30">
              <PartyPopper className="w-12 h-12 text-white" />
            </div>
          </motion.div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Добро пожаловать в{' '}
            <span className="bg-gradient-to-r from-[#0077ff] to-blue-400 bg-clip-text text-transparent">
              VKify!
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Спасибо за установку! Теперь ваш ВКонтакте станет удобнее и красивее.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Как начать
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="relative p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-[#0077ff] text-white font-bold flex items-center justify-center text-sm shadow-lg">
                  {index + 1}
                </div>
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-[#0077ff]/10 flex items-center justify-center">
                  <step.icon className="w-7 h-7 text-[#0077ff]" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mb-16"
        >
          <Button
            href="https://vk.com/id0"
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            className="gap-2 shadow-xl shadow-blue-500/25"
          >
            Открыть VK
            <ExternalLink className="w-5 h-5" />
          </Button>
        </motion.div>

        {/* Quick Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Settings className="w-5 h-5 text-[#0077ff]" />
              Быстрые настройки
            </h2>
            
            <div className="space-y-4">
              {/* Theme Toggle */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#0077ff]/10 flex items-center justify-center">
                    <Palette className="w-5 h-5 text-[#0077ff]" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Тема оформления</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Выберите светлую или тёмную</div>
                  </div>
                </div>
                <select className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0077ff]">
                  <option value="auto">Авто</option>
                  <option value="light">Светлая</option>
                  <option value="dark">Тёмная</option>
                </select>
              </div>

              {/* Adblock Toggle */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#0077ff]/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-[#0077ff]" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Блокировка рекламы</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Скрыть рекламу в ленте</div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:ring-2 peer-focus:ring-[#0077ff] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0077ff]"></div>
                </label>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Полезные ресурсы
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4 }}
                className="group p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex items-center gap-4 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-700 transition-all"
              >
                <div className={`w-12 h-12 rounded-xl ${link.color} flex items-center justify-center shadow-lg`}>
                  <link.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900 dark:text-white group-hover:text-[#0077ff] transition-colors">
                    {link.title}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{link.description}</div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#0077ff] group-hover:translate-x-1 transition-all" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}