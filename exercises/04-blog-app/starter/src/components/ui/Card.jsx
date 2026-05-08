export function Card({ children, className = '', padding = true, hover = false }) {
  return (
    <div
      className={`
        bg-paper border border-edge rounded-lg
        ${padding ? 'p-5' : ''}
        ${hover ? 'transition-shadow hover:shadow-md cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
