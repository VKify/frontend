import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, MousePointerClick, Settings, Play, CheckCircle2, ArrowRight, X,  Film, Bell } from 'lucide-react'
import Button from '../common/Button'
import Section, { SectionHeader } from '../common/Section'
import config from '../../config'

const steps = [
  {
    icon: Download,
    title: 'Установите расширение',
    description: 'Добавьте VKify в браузер из Chrome Web Store бесплатно',
    color: 'from-blue-500 to-cyan-500',
    features: ['Бесплатно навсегда', 'Без регистрации', 'Автообновления'],
  },
  {
    icon: MousePointerClick,
    title: 'Откройте VK',
    description: 'Перейдите на vk.com — расширение активируется автоматически',
    color: 'from-purple-500 to-pink-500',
    features: ['Мгновенная активация', 'Работает сразу', 'Без перезагрузки'],
  },
  {
    icon: Settings,
    title: 'Настройте под себя',
    description: 'Выберите тему, включите нужные функции и наслаждайтесь',
    color: 'from-orange-500 to-red-500',
    features: ['50+ настроек', '12 тем оформления', 'Гибкая кастомизация'],
  },
]

// ID видео с YouTube
const YOUTUBE_VIDEO_ID = config.app.video

export default function HowItWorks() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  return (
    <Section id="how-it-works" variant="default" withPattern>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Быстрый старт"
          badgeIcon={CheckCircle2}
          badgeColor="green"
          title="Три шага до"
          titleHighlight="идеального VK"
          description="Установка займёт меньше минуты. Никакой регистрации, никаких сложных настроек — просто установите и пользуйтесь."
        />

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`relative ${index === 2 ? 'sm:col-span-2 lg:col-span-1 sm:max-w-md sm:mx-auto lg:max-w-none' : ''}`}
            >
              <div className="bg-white dark:bg-gray-950 rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 border border-gray-200 dark:border-gray-800 hover:shadow-xl hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 h-full">
                {/* Icon with number */}
                <div className="flex justify-center mb-4 sm:mb-6 lg:mb-8">
                  <div className="relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.color} rounded-2xl sm:rounded-3xl blur-xl opacity-30`} />
                    
                    <motion.div
                      whileHover={{ scale: 1.05, rotate: 3 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className={`
                        relative w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 
                        rounded-2xl sm:rounded-3xl flex items-center justify-center
                        bg-gradient-to-br ${step.color}
                        shadow-xl
                      `}
                    >
                      <step.icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-9 lg:h-9 text-white" />
                    </motion.div>
                    
                    <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-full bg-gray-900 dark:bg-white flex items-center justify-center shadow-lg">
                      <span className="text-white dark:text-gray-900 font-bold text-xs sm:text-sm">
                        {index + 1}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 sm:mb-6">
                    {step.description}
                  </p>

                  {/* Features list */}
                  <div className="space-y-1.5 sm:space-y-2">
                    {step.features.map((feature, i) => (
                      <div 
                        key={i}
                        className="flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Arrow for mobile - только на 1 колонку */}
                {index < steps.length - 1 && (
                  <div className="flex justify-center mt-4 sm:hidden">
                    <ArrowRight className="w-5 h-5 text-gray-300 dark:text-gray-600 rotate-90" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Video Demo Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 sm:mt-20 md:mt-24"
        >
          <div className="relative max-w-4xl mx-auto">
            {/* Glow эффект */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-3xl blur-2xl" />
            
            {/* Контейнер видео */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800">
              
              {/* Браузерная шапка */}
              <div className="flex items-center px-4 py-3 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div className="flex gap-1.5 w-14 flex-shrink-0">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                
                <div className="flex-1 flex justify-center">
                  <div className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-white dark:bg-gray-900 text-sm text-gray-500">
                    <div className="w-4 h-4 rounded bg-green-500/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                    </div>
                    <span>vk.com</span>
                  </div>
                </div>
                
                <div className="w-14 flex-shrink-0" />
              </div>
              
              {/* Видео контейнер */}
              <div className="relative aspect-video bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                {!YOUTUBE_VIDEO_ID ? (
                  // Заглушка - видео в разработке
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-6">
                    {/* Анимированный фон */}
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="absolute top-1/4 -left-10 sm:-left-20 w-32 sm:w-64 h-32 sm:h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
                      <div className="absolute bottom-1/4 -right-10 sm:-right-20 w-32 sm:w-64 h-32 sm:h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                    </div>
                    
                    {/* Контент */}
                    <div className="relative z-10 flex flex-col items-center text-center">
                      {/* Иконка */}
                      <motion.div
                        animate={{ 
                          scale: [1, 1.05, 1],
                          rotate: [0, 2, -2, 0]
                        }}
                        transition={{ 
                          duration: 4, 
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="relative mb-3 sm:mb-6"
                      >
                        <div className="w-14 h-14 sm:w-20 md:w-24 sm:h-20 md:h-24 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#0077ff] to-blue-600 flex items-center justify-center shadow-2xl shadow-blue-500/30">
                          <Film className="w-7 h-7 sm:w-10 md:w-12 sm:h-10 md:h-12 text-white" />
                        </div>
                        
                        {/* Бейдж "Скоро" */}
                        <div className="absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-orange-500 rounded-full">
                          <span className="text-[8px] sm:text-[10px] md:text-xs font-bold text-white">Скоро</span>
                        </div>
                      </motion.div>
                      
                      {/* Текст */}
                      <h3 className="text-base sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2">
                        Видео уже в работе
                      </h3>
                      <p className="text-white/60 text-xs sm:text-sm md:text-base max-w-xs sm:max-w-md mb-3 sm:mb-6 leading-relaxed">
                        Мы готовим подробный видеообзор. Скоро здесь появится демонстрация всех возможностей!
                      </p>
                      
                      {/* Прогресс бар */}
                      <div className="w-full max-w-[200px] sm:max-w-xs">
                        <div className="flex items-center justify-between text-[10px] sm:text-xs text-white/40 mb-1.5 sm:mb-2">
                          <span>Прогресс</span>
                          <span>~80%</span>
                        </div>
                        <div className="h-1.5 sm:h-2 bg-white/10 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-gradient-to-r from-[#0077ff] to-blue-400 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: '80%' }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                      
                      {/* Подписка - скрываем на очень маленьких экранах */}
                      <div className="hidden sm:flex mt-4 sm:mt-6 items-center gap-2 text-white/40 text-xs sm:text-sm">
                        <Bell className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span>Следите за обновлениями в Telegram</span>
                      </div>
                    </div>
                  </div>
                ) : isVideoPlaying ? (
                  <>
                    <iframe
                      src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
                      title="VKify Demo"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                    
                    <button
                      onClick={() => setIsVideoPlaying(false)}
                      className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors z-10"
                      aria-label="Закрыть видео"
                    >
                      <X className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </>
                ) : (
                  <div
                    className="absolute inset-0 cursor-pointer group"
                    onClick={() => setIsVideoPlaying(true)}
                  >
                    {/* YouTube превью */}
                    <img
                      src={`https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/maxresdefault.jpg`}
                      alt="Video preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = `https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/hqdefault.jpg`
                      }}
                    />
                    
                    {/* Оверлей */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                    
                    {/* Кнопка Play по центру */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#0077ff] to-blue-600 flex items-center justify-center shadow-xl">
                            <Play className="w-5 h-5 sm:w-7 sm:h-7 text-white ml-0.5 sm:ml-1" fill="white" />
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Текст снизу */}
                    <div className="absolute bottom-4 sm:bottom-8 left-0 right-0 text-center px-4">
                      <p className="text-white font-medium text-sm sm:text-base">
                        Посмотрите {config.app.name} в действии
                      </p>
                      <p className="text-white/60 text-xs sm:text-sm mt-1">
                        2 минуты • Обзор возможностей
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Button
            href={config.links.chromeWebStore}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            className="shadow-lg shadow-blue-500/25"
          >
            <Download className="w-5 h-5 mr-2" />
            Установить бесплатно
          </Button>
        </motion.div>
      </div>
    </Section>
  )
}