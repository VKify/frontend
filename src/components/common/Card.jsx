import { motion } from 'framer-motion'

export default function Card({ 
  children, 
  className = '', 
  hover = true,
  glow = false,
  padding = true,
  ...props 
}) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : {}}
      className={`
        bg-white dark:bg-gray-900 
        rounded-2xl 
        border border-gray-200 dark:border-gray-800
        ${hover ? 'hover:shadow-xl hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300' : ''}
        ${glow ? 'hover:shadow-[0_0_40px_rgba(0,119,255,0.15)]' : ''}
        ${padding ? 'p-6' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  )
}