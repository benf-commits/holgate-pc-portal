import { getPersonByInitials, getMeetingById } from '../utils/data'
import { getAgingInfo } from '../utils/dates'

export default function AttentionBanner({ actions }) {
  if (!actions || actions.length === 0) return null

  return (
    <div className="bg-overdue-bg border border-overdue-border rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="bg-overdue text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
          {actions.length} OVERDUE
        </span>
        <span className="text-[14px] text-text-secondary">
          Actions past due date or open too long
        </span>
      </div>
      <div className="space-y-3">
        {actions.map((action) => {
          const meeting = getMeetingById(action.meetingId)
          const aging = getAgingInfo(action, meeting?.date)
          const ownerNames = action.owners
            .map((id) => getPersonByInitials(id).name.split(' ')[0])
            .join(', ')
          return (
            <div key={action.id} className="flex justify-between items-start gap-4 text-[14px]">
              <span className="text-text-primary">{action.description}</span>
              <span className="text-text-secondary whitespace-nowrap shrink-0">
                {ownerNames} &middot; {aging.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
