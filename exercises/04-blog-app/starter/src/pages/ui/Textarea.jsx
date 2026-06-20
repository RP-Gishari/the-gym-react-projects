export function Textarea({ label, id, rows = 4, error, className = '', ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-ink">
          {label}
        </label>
      )}
      <textarea
        id={id}
        rows={rows}
        className={`
          w-full border border-edge rounded-md
          px-3 py-2 text-sm text-ink
          placeholder:text-muted
          outline-none focus:border-ink
          transition-colors resize-y
          ${error ? 'border-red-500' : ''}
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
