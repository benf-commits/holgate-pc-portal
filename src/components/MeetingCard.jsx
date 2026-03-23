import { Link } from 'react-router-dom'
import { formatDate } from '../utils/dates'
import { getActionsForMeeting, getDecisionsForMeeting, getMeetingStatusBadge, getAttendanceCount } from '../utils/data'
import Badge from './Badge'

function borderColor(meeting) {
  if (meeting.status === 'scheduled') return 'border-l-green-500'
  if (meeting.type.includes('agm')) return 'border-l-maroon-900'
  return 'border-l-gray-300'
}

export default function MeetingCard({ meeting }) {
  const actions = getActionsForMeeting(meeting.id)
  const decisions = getDecisionsForMeeting(meeting.id)
  const attendanceCount = getAttendanceCount(meeting)
  const badge = getMeetingStatusBadge(meeting.status)

  return (
    <Link
      to={`/meetings/${meeting.id}`}
      className={`block bg-white rounded-lg shadow-[0_2px_8px_rgba(74,21,37,0.06)] border-l-[4px] ${borderColor(meeting)} p-4 hover:shadow-[0_4px_12px_rgba(74,21,37,0.10)] transition-shadow`}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold text-text-primary">{meeting.title}</h3>
        <Badge label={badge.label} variant={badge.variant} />
      </div>
      <div className="text-xs text-text-secondary mt-1">{formatDate(meeting.date)}</div>
      <div className="flex flex-wrap gap-3 mt-3 text-xs text-text-secondary">
        <span>{actions.length} action{actions.length !== 1 ? 's' : ''}</span>
        <span>{decisions.length} decision{decisions.length !== 1 ? 's' : ''}</span>
        <span>{attendanceCount} attended</span>
      </div>
    </Link>
  )
}
