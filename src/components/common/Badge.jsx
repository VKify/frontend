const badgeVariants = {
  new: 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800',
  fix: 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800',
  improvement: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800',
  version: 'bg-[#0077ff]/10 text-[#0077ff] border border-[#0077ff]/20',
}

export default function Badge({ variant = 'new', children, className = '' }) {
  return (
    <span 
      className={`
        inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold
        ${badgeVariants[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  )
}