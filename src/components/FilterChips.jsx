export default function FilterChips({ options, active, onChange }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((opt) => {
        const isActive = opt.value === active
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`px-3 py-1 text-[11px] font-medium rounded-full transition-colors ${
              isActive
                ? 'bg-text-primary text-white'
                : 'bg-neutral-bg text-neutral-text hover:bg-header-border'
            }`}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
