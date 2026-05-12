const variants = {
  default: 'bg-subtle text-neutral-700',
  solid:   'bg-ink text-paper',
  outline: 'border border-edge text-muted',
}

export function Badge({ children, variant = 'default', className = '' }) {
  return (
    <span
      className={`
        inline-flex items-center
        px-2.5 py-0.5 rounded-full
        text-xs font-medium
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  )
}
