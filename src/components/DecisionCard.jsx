import { Link } from 'react-router-dom'
import { getPersonByInitials, getMeetingById } from '../utils/data'
import { formatDate } from '../utils/dates'
import Badge from './Badge'

const resultConfig = {
  carried: { border: 'border-l-success', label: 'Carried', variant: 'success' },
  defeated: { border: 'border-l-warning', label: 'Defeated', variant: 'warning' },
  deferred: { border: 'border-l-amber-500', label: 'Deferred', variant: 'spending' },
}

const categoryConfig = {
  spending: { label: 'Spending', variant: 'spending' },
  policy: { label: 'Policy', variant: 'policy' },
  election: { label: 'Election', variant: 'election' },
  operational: { label: 'Operational', variant: 'operational' },
}

export default function DecisionCard({ decision }) {
  const config = resultConfig[decision.result] || resultConfig.carried
  const catConfig = categoryConfig[decision.category]
  const meeting = getMeetingById(decision.meetingId)

  const mover = decision.moved ? getPersonByInitials(decision.moved) : null
  const seconder = decision.seconded ? getPersonByInitials(decision.seconded) : null

  return (
    <div
      className={`bg-white rounded-lg shadow-[0_2px_8px_rgba(74,21,37,0.06)] border-l-[4px] ${config.border} p-4`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge label={config.label} variant={config.variant} />
          {catConfig && <Badge label={catConfig.label} variant={catConfig.variant} />}
        </div>
      </div>

      <h3 className="text-sm font-medium text-text-primary mt-2">{decision.title}</h3>

      {decision.description && (
        <p className="text-xs text-text-secondary mt-1">{decision.description}</p>
      )}

      <div className="flex items-center flex-wrap gap-3 mt-3 text-xs text-text-secondary">
        {(mover || seconder) && (
          <span>
            {mover && <>Moved: {mover.name}</>}
            {mover && seconder && ' / '}
            {seconder && <>Seconded: {seconder.name}</>}
          </span>
        )}

        {meeting && (
          <Link
            to={`/meetings/${meeting.id}`}
            className="text-info hover:underline"
          >
            {formatDate(meeting.date)}
          </Link>
        )}
      </div>
    </div>
  )
}
