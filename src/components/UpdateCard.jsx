import Badge from './Badge'
import { formatShortDate } from '../utils/dates'

export default function UpdateCard({ update }) {
  const content = (
    <div className="bg-white rounded-lg shadow-[0_1px_3px_var(--color-card-shadow)] p-4">
      <div className="flex items-center gap-2 mb-1.5">
        <Badge
          label={update.source === 'school' ? 'School' : 'P&C'}
          variant={update.source === 'school' ? 'school' : 'pc'}
        />
        <span className="text-[13px] text-text-secondary">{formatShortDate(update.date)}</span>
      </div>
      <div className="text-[15px] font-semibold text-text-primary leading-snug">{update.title}</div>
      {update.summary && (
        <div className="text-[14px] text-text-secondary mt-1 leading-relaxed">{update.summary}</div>
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
