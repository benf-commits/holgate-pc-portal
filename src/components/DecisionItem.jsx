import Badge from './Badge'
import { getPersonByInitials, getMeetingById } from '../utils/data'
import { formatDate } from '../utils/dates'

export default function DecisionItem({ decision }) {
  const meeting = getMeetingById(decision.meetingId)
  const moverName = decision.moved
    ? getPersonByInitials(decision.moved).name.split(' ')[0]
    : null
  const seconderName = decision.seconded
    ? getPersonByInitials(decision.seconded).name.split(' ')[0]
    : null

  return (
    <div className="border-l-[3px] border-l-decision pl-3 py-1">
      <div className="flex items-start justify-between gap-2">
        <span className="text-[11px] text-text-primary">{decision.title}</span>
        <Badge label={decision.result} variant={decision.result === 'carried' ? 'carried' : decision.result === 'defeated' ? 'defeated' : 'neutral'} />
      </div>
      <div className="text-[10px] text-text-secondary mt-0.5">
        {meeting && formatDate(meeting.date)}
        {moverName && <> &middot; Moved: {moverName}{seconderName && ` / ${seconderName}`}</>}
      </div>
    </div>
  )
}
