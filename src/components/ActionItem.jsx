import { getPersonByInitials, getMeetingById } from '../utils/data'
import { formatDate } from '../utils/dates'

export default function ActionItem({ action }) {
  const meeting = getMeetingById(action.meetingId)
  const ownerNames = action.owners
    .map((id) => getPersonByInitials(id).name.split(' ')[0])
    .join(', ')

  return (
    <div className="border-l-[3px] border-l-action pl-4 py-1.5">
      <div className="text-[14px] text-text-primary">{action.description}</div>
      <div className="text-[13px] text-text-secondary mt-0.5">
        {ownerNames}
        {meeting && <> &middot; from {formatDate(meeting.date)} meeting</>}
      </div>
    </div>
  )
}
