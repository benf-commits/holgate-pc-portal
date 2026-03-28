import Badge from './Badge'

export default function UpdateCard({ update }) {
  const content = (
    <div className="bg-white rounded-[10px] shadow-[0_1px_3px_var(--color-card-shadow)] p-3">
      <div className="flex items-center gap-2 mb-1">
        <Badge
          label={update.source === 'school' ? 'School' : 'P&C'}
          variant={update.source === 'school' ? 'school' : 'pc'}
        />
        <span className="text-[10px] text-text-secondary">{update.date}</span>
      </div>
      <div className="text-[11px] font-semibold text-text-primary leading-tight">{update.title}</div>
      {update.summary && (
        <div className="text-[10px] text-text-secondary mt-1 leading-relaxed">{update.summary}</div>
      )}
    </div>
  )

  if (update.link) {
    return (
      <a href={update.link} target="_blank" rel="noopener noreferrer" className="block no-underline hover:opacity-80 transition-opacity">
        {content}
      </a>
    )
  }

  return content
}
