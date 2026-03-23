export default function FilterChips({ options, active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isActive = option.value === active
        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
              isActive
                ? 'bg-maroon-900 text-white'
                : 'bg-white text-text-secondary border border-gray-200 hover:border-maroon-900 hover:text-maroon-900'
            }`}
          >
            {option.label}
            {option.count != null && (
              <span
                className={`ml-1.5 text-xs ${isActive ? 'text-white/70' : 'text-text-secondary/60'}`}
              >
                {option.count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
