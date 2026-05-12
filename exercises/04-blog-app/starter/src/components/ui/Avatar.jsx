const sizes = {
  sm: 'w-6 h-6 text-xs',
  md: 'w-8 h-8 text-sm',
  lg: 'w-10 h-10 text-base',
  xl: 'w-14 h-14 text-xl',
}

function getInitials(name = '') {
  return name
    .split(' ')
    .map(part => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export function Avatar({ src, name, size = 'md', className = '' }) {
  const sizeClass = sizes[size]

  if (src) {
    return (
      <img
        src={src}
        alt={name ?? 'Avatar'}
        className={`${sizeClass} rounded-full object-cover shrink-0 ${className}`}
      />
    )
  }

  return (
    <div
      className={`
        ${sizeClass} rounded-full shrink-0
        bg-ink text-paper
        flex items-center justify-center
        font-medium select-none
        ${className}
      `}
      aria-label={name}
    >
      {getInitials(name)}
    </div>
  )
}
