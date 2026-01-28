import { motion } from 'framer-motion'
import { Download, MousePointerClick, Settings, Play, CheckCircle2, ArrowRight } from 'lucide-react'
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

export default function HowItWorks() {
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
        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-28 left-[20%] right-[20%] h-0.5">
            <div className="w-full h-full bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 opacity-20" />
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 origin-left"
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                <div className="bg-white dark:bg-gray-950 rounded-3xl p-8 border border-gray-200 dark:border-gray-800 hover:shadow-xl hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 h-full">
                  {/* Icon with number */}
                  <div className="flex justify-center mb-8">
                    <div className="relative">
                      <div className={`absolute inset-0 bg-gradient-to-br ${step.color} rounded-3xl blur-xl opacity-30`} />
                      
                      <motion.div
                        whileHover={{ scale: 1.05, rotate: 3 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        className={`
                          relative w-20 h-20 rounded-3xl flex items-center justify-center
                          bg-gradient-to-br ${step.color}
                          shadow-xl
                        `}
                      >
                        <step.icon className="w-9 h-9 text-white" />
                      </motion.div>
                      
                      <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gray-900 dark:bg-white flex items-center justify-center shadow-lg">
                        <span className="text-white dark:text-gray-900 font-bold text-sm">
                          {index + 1}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      {step.description}
                    </p>

                    {/* Features list */}
                    <div className="space-y-2">
                      {step.features.map((feature, i) => (
                        <div 
                          key={i}
                          className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400"
                        >
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Arrow for mobile */}
                  {index < steps.length - 1 && (
                    <div className="flex justify-center mt-6 lg:hidden">
                      <ArrowRight className="w-5 h-5 text-gray-300 dark:text-gray-600 rotate-90" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Video Demo Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 md:mt-24"
        >
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-3xl blur-2xl" />
            
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-gray-900 to-gray-800">
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-800 border-b border-gray-700">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="px-4 py-1 rounded-md bg-gray-700 text-gray-400 text-sm">
                    vk.com
                  </div>
                </div>
              </div>
              
              <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 relative group cursor-pointer">
                <div className="absolute inset-0 opacity-20">
                  <div className="h-14 bg-gray-700" />
                  <div className="flex h-full">
                    <div className="w-64 bg-gray-800" />
                    <div className="flex-1 p-4 space-y-4">
                      <div className="h-32 bg-gray-700 rounded-xl" />
                      <div className="h-32 bg-gray-700 rounded-xl" />
                    </div>
                  </div>
                </div>
                
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative z-10"
                >
                  <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0077ff] to-blue-600 flex items-center justify-center shadow-xl">
                      <Play className="w-7 h-7 text-white ml-1" fill="white" />
                    </div>
                  </div>
                </motion.div>

                <div className="absolute bottom-8 left-0 right-0 text-center">
                  <p className="text-white/80 font-medium">
                    Посмотрите {config.app.name} в действии
                  </p>
                  <p className="text-white/50 text-sm mt-1">
                    2 минуты • Обзор возможностей
                  </p>
                </div>
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