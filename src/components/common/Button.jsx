import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const variants = {
  primary: 'bg-[#0077ff] hover:bg-[#0066dd] text-white shadow-lg shadow-blue-500/25',
  secondary: 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700',
  ghost: 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white',
  danger: 'bg-red-500 hover:bg-red-600 text-white',
  outline: 'border-2 border-[#0077ff] text-[#0077ff] hover:bg-[#0077ff] hover:text-white',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

const Button = forwardRef(({ 
  as = 'button',
  to,
  href,
  variant = 'primary', 
  size = 'md', 
  className = '', 
  children,
  disabled = false,
  ...props 
}, ref) => {
  const baseClasses = `
    inline-flex items-center justify-center
    font-semibold rounded-xl
    transition-all duration-200
    disabled:opacity-50 disabled:cursor-not-allowed
    focus:outline-none focus:ring-2 focus:ring-[#0077ff] focus:ring-offset-2
    dark:focus:ring-offset-gray-900
    ${variants[variant]}
    ${sizes[size]}
    ${className}
  `

  // React Router Link
  if (to) {
    return (
      <motion.div
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
      >
        <Link
          ref={ref}
          to={to}
          className={baseClasses}
          {...props}
        >
          {children}
        </Link>
      </motion.div>
    )
  }

  // External link
  if (href) {
    return (
      <motion.a
        ref={ref}
        href={href}
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        className={baseClasses}
        {...props}
      >
        {children}
      </motion.a>
    )
  }

  // Button
  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={baseClasses}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  )
})

Button.displayName = 'Button'

export default Button