import { Link } from 'react-router-dom'
import { getMeetingById } from '../utils/data'
import { formatDate } from '../utils/dates'

const typeStyles = {
  meeting: {
    bg: 'bg-event-meeting/10',
    border: 'border-l-event-meeting',
    dot: 'bg-event-meeting',
  },
  'pc-event': {
    bg: 'bg-event-pc/10',
    border: 'border-l-event-pc',
    dot: 'bg-event-pc',
  },
  'school-event': {
    bg: 'bg-event-school/10',
    border: 'border-l-event-school',
    dot: 'bg-event-school',
  },
  external: {
    bg: 'bg-event-external/10',
    border: 'border-l-event-external',
    dot: 'bg-event-external',
  },
}

export default function EventItem({ event }) {
  const style = typeStyles[event.type] || typeStyles.meeting
  const isTentative = event.status === 'tentative'
  const meeting = event.discussedIn ? getMeetingById(event.discussedIn) : null

  return (
    <div
      className={`rounded-lg border-l-[4px] ${style.border} ${style.bg} p-4 ${
        isTentative ? 'border border-dashed border-gray-300' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold text-text-primary">{event.title}</h3>
        {isTentative && (
          <span className="inline-block px-2 py-0.5 text-[10px] font-medium rounded-full bg-gray-100 text-text-secondary uppercase tracking-wide">
            TBC
          </span>
        )}
      </div>

      <div className="flex items-center flex-wrap gap-3 mt-2 text-xs text-text-secondary">
        {event.time && <span>{event.time}</span>}
        {event.location && (
          <>
            {event.time && <span aria-hidden="true">&middot;</span>}
            <span>{event.location}</span>
          </>
        )}
      </div>

      {(event.notes || meeting) && (
        <div className="flex items-center flex-wrap gap-3 mt-2 text-xs text-text-secondary">
          {event.notes && <span>{event.notes}</span>}
          {meeting && (
            <Link
              to={`/meetings/${meeting.id}`}
              className="text-info hover:underline"
            >
              Discussed in {formatDate(meeting.date)} meeting
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
