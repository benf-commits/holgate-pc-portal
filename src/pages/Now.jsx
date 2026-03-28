import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { meetings, actions, decisions, school, getPersonByInitials, getMeetingById, getNextMeeting } from '../utils/data'
import { formatDate, daysUntil, getAgingInfo } from '../utils/dates'
import { filterActions } from '../utils/filters'
import AttentionBanner from '../components/AttentionBanner'
import ActionItem from '../components/ActionItem'
import DecisionItem from '../components/DecisionItem'

export default function Now() {
  const nextMeeting = getNextMeeting()
  const nextMeetingDays = nextMeeting ? daysUntil(nextMeeting.date) : null
  const nextMeetingCountdown = nextMeeting
    ? nextMeetingDays === 0 ? 'Today'
    : nextMeetingDays === 1 ? 'Tomorrow'
    : nextMeetingDays < 0 ? 'Date passed'
    : `in ${nextMeetingDays} days`
    : null

  const overdueActions = useMemo(() => {
    return actions.filter((a) => {
      if (a.status !== 'open') return false
      const meeting = getMeetingById(a.meetingId)
      const aging = getAgingInfo(a, meeting?.date)
      return aging.status === 'overdue' || (aging.status === 'open' && aging.days > 21)
    })
  }, [])

  const openActions = useMemo(() => {
    return actions
      .filter((a) => a.status === 'open')
      .sort((a, b) => {
        const mA = getMeetingById(a.meetingId)
        const mB = getMeetingById(b.meetingId)
        const agingA = getAgingInfo(a, mA?.date)
        const agingB = getAgingInfo(b, mB?.date)
        const aOverdue = agingA.status === 'overdue' || (agingA.status === 'open' && agingA.days > 21)
        const bOverdue = agingB.status === 'overdue' || (agingB.status === 'open' && agingB.days > 21)
        if (aOverdue && !bOverdue) return -1
        if (!aOverdue && bOverdue) return 1
        return (mB?.date || '').localeCompare(mA?.date || '')
      })
  }, [])

  const recentDecisions = useMemo(() => {
    return [...decisions]
      .sort((a, b) => {
        const mA = getMeetingById(a.meetingId)
        const mB = getMeetingById(b.meetingId)
        return (mB?.date || '').localeCompare(mA?.date || '') || b.id.localeCompare(a.id)
      })
      .slice(0, 5)
  }, [])

  const pendingItems = (school.pendingItems || []).filter((i) => i.status === 'open')

  const displayActions = openActions.slice(0, 5)
  const remainingActions = openActions.length - displayActions.length

  return (
    <div className="p-5 space-y-4">
      <AttentionBanner actions={overdueActions} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-[10px] shadow-[0_1px_3px_var(--color-card-shadow)] p-4">
          <div className="text-[10px] font-bold text-action uppercase tracking-[0.8px] mb-3">
            Open Actions ({openActions.length})
          </div>
          <div className="space-y-2">
            {displayActions.map((action) => (
              <ActionItem key={action.id} action={action} />
            ))}
          </div>
          {remainingActions > 0 && (
            <Link to="/archive?filter=actions" className="inline-block text-[11px] text-action hover:underline mt-3">
              +{remainingActions} more &rarr;
            </Link>
          )}
        </div>

        <div className="bg-white rounded-[10px] shadow-[0_1px_3px_var(--color-card-shadow)] p-4">
          <div className="text-[10px] font-bold text-decision uppercase tracking-[0.8px] mb-3">
            Recent Decisions
          </div>
          <div className="space-y-2">
            {recentDecisions.map((decision) => (
              <DecisionItem key={decision.id} decision={decision} />
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-4">
        <div className="bg-white rounded-[10px] shadow-[0_1px_3px_var(--color-card-shadow)] p-4">
          <div className="text-[10px] font-bold text-pending uppercase tracking-[0.8px] mb-2">
            Next Meeting
          </div>
          {nextMeeting ? (
            <>
              <div className="flex justify-between items-baseline">
                <div className="text-base font-bold text-text-primary">{formatDate(nextMeeting.date)}</div>
                <div className="text-[11px] text-text-secondary">
                  {nextMeeting.openTime || nextMeeting.time || ''} &middot; {nextMeeting.location || 'Staffroom'} &middot; {nextMeetingCountdown}
                </div>
              </div>
              <div className="border-t border-header-border mt-3 pt-3">
                <div className="text-[10px] font-semibold text-pending mb-2">AGENDA</div>
                {(nextMeeting.agendaItems || []).length > 0 ? (
                  <div className="space-y-1">
                    {nextMeeting.agendaItems.map((item, i) => (
                      <div key={i} className="text-[11px] text-text-primary flex gap-2">
                        <span className="text-text-secondary min-w-[14px]">{i + 1}.</span>
                        {item}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[11px] text-text-secondary italic">Agenda items will appear as they're added</p>
                )}
              </div>
            </>
          ) : (
            <p className="text-[11px] text-text-secondary">No upcoming meetings scheduled</p>
          )}
        </div>

        <div className="bg-white rounded-[10px] shadow-[0_1px_3px_var(--color-card-shadow)] p-4">
          <div className="text-[10px] font-bold text-pending uppercase tracking-[0.8px] mb-3">
            Waiting On School
          </div>
          {pendingItems.length > 0 ? (
            <div className="space-y-2">
              {pendingItems.map((item) => (
                <div key={item.id} className="border-l-[3px] border-l-pending-light pl-3 py-1">
                  <div className="text-[11px] text-text-primary">{item.title}</div>
                  {item.description && (
                    <div className="text-[10px] text-text-secondary mt-0.5">{item.waitingOn || ''}</div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[11px] text-text-secondary">Nothing pending</p>
          )}
        </div>
      </div>
    </div>
  )
}
