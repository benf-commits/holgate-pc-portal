import { Link } from 'react-router-dom'
import { getPersonByInitials, getMeetingById } from '../utils/data'
import { getAgingInfo, formatDate } from '../utils/dates'
import Badge from './Badge'

function borderClass(status) {
  if (status === 'overdue') return 'border-l-warning'
  if (status === 'completed') return 'border-l-success'
  return 'border-l-gold-500'
}

function agingBadge(aging) {
  if (aging.status === 'completed') return { label: 'Completed', variant: 'success' }
  if (aging.status === 'overdue') return { label: aging.label, variant: 'warning' }
  if (aging.status === 'upcoming') return { label: aging.label, variant: 'info' }
  return { label: aging.label, variant: 'neutral' }
}

export default function ActionItem({ action, meetingDate }) {
  const aging = getAgingInfo(action, meetingDate)
  const badge = agingBadge(aging)
  const meeting = getMeetingById(action.meetingId)

  return (
    <div
      className={`bg-white rounded-lg shadow-[0_2px_8px_rgba(74,21,37,0.06)] border-l-[4px] ${borderClass(aging.status)} p-4`}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm text-text-primary">{action.description}</p>
        <Badge label={badge.label} variant={badge.variant} />
      </div>

      <div className="flex items-center flex-wrap gap-3 mt-3">
        {(() => {
          const owners = (action.owners || []).map((id) => ({ id, ...getPersonByInitials(id) }))
          return (
            <>
              <div className="flex -space-x-1">
                {owners.map((person) => (
                  <span
                    key={person.id}
                    title={person.name}
                    className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-maroon-100 text-maroon-900 text-[10px] font-bold ring-2 ring-white"
                  >
                    {person.id}
                  </span>
                ))}
              </div>
              <span className="text-xs text-text-secondary">
                {owners.map((p) => p.name).join(', ')}
              </span>
            </>
          )
        })()}
      </div>

      <div className="flex items-center flex-wrap gap-3 mt-2 text-xs text-text-secondary">
        {meeting && (
          <Link
            to={`/meetings/${meeting.id}`}
            className="text-info hover:underline"
          >
            {formatDate(meeting.date)} meeting
          </Link>
        )}
        {action.notes && <span>— {action.notes}</span>}
      </div>
    </div>
  )
}
