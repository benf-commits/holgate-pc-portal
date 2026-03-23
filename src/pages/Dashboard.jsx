import { Link } from 'react-router-dom'
import { meetings, actions, decisions, events, school, getPersonByInitials, getMeetingById } from '../utils/data'
import { formatDate, daysUntil, getAgingInfo } from '../utils/dates'
import { filterActions } from '../utils/filters'
import StatusCard from '../components/StatusCard'
import Badge from '../components/Badge'
import EmptyState from '../components/EmptyState'

const eventTypeColors = {
  meeting: 'bg-event-meeting',
  'pc-event': 'bg-event-pc',
  'school-event': 'bg-event-school',
  external: 'bg-event-external',
}

const eventTypeTextColors = {
  meeting: 'text-event-meeting',
  'pc-event': 'text-event-pc',
  'school-event': 'text-event-school',
  external: 'text-event-external',
}

function resultVariant(result) {
  if (result === 'carried') return 'success'
  if (result === 'defeated') return 'warning'
  return 'neutral'
}

export default function Dashboard() {
  // Guard: no meetings yet
  if (!meetings || meetings.length === 0) {
    return (
      <div className="p-6">
        <EmptyState message="Welcome to the Holgate P&C Portal. Data will appear here as meetings are added." />
      </div>
    )
  }

  const today = new Date().toISOString().split('T')[0]

  // Next meeting: first scheduled, or first future meeting
  const nextMeeting =
    meetings.find((m) => m.status === 'scheduled') ||
    [...meetings].sort((a, b) => a.date.localeCompare(b.date)).find((m) => m.date >= today)
  const nextMeetingDays = nextMeeting ? daysUntil(nextMeeting.date) : null
  const nextMeetingLabel = nextMeeting
    ? nextMeetingDays === 0
      ? 'Today'
      : nextMeetingDays === 1
        ? 'Tomorrow'
        : nextMeetingDays < 0
          ? 'Date passed'
          : `In ${nextMeetingDays} days`
    : 'None scheduled'

  // Actions
  const overdueActions = filterActions(actions, { status: 'overdue' })
  const openActions = filterActions(actions, { status: 'open' })
  const allOpenCount = actions.filter((a) => a.status === 'open').length
  const overdueCount = overdueActions.length
  const openSubtext =
    overdueCount > 0 ? `${overdueCount} overdue` : 'None overdue'

  // Upcoming events (have a date and date is in the future)
  const futureEvents = events
    .filter((e) => e.date && e.date > today)
    .sort((a, b) => a.date.localeCompare(b.date))
  const upcomingEventsCount = futureEvents.length
  const nextEvent = futureEvents[0]

  // Pending school items
  const pendingSchoolItems = (school.pendingItems || []).filter(
    (item) => item.status === 'open'
  )

  // Actions needing attention: overdue first (red), then open (amber), max 5
  const attentionActions = [...overdueActions, ...openActions].slice(0, 5)

  // Recent decisions: newest first by meeting date, max 5
  const recentDecisions = [...decisions]
    .sort((a, b) => {
      const mA = getMeetingById(a.meetingId)
      const mB = getMeetingById(b.meetingId)
      const dateA = mA ? mA.date : ''
      const dateB = mB ? mB.date : ''
      return dateB.localeCompare(dateA) || b.id.localeCompare(a.id)
    })
    .slice(0, 5)

  // Coming up: next 3 future events
  const comingUpEvents = futureEvents.slice(0, 3)

  return (
    <div className="p-6 space-y-6">
      {/* Row 1: Status cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatusCard
          label="Next Meeting"
          value={nextMeeting ? formatDate(nextMeeting.date) : '—'}
          subtext={nextMeetingLabel}
          accentColor="#27ae60"
          to="/meetings"
        />
        <StatusCard
          label="Open Actions"
          value={allOpenCount}
          subtext={openSubtext}
          accentColor="#D4A843"
          to="/actions"
        />
        <StatusCard
          label="Upcoming Events"
          value={upcomingEventsCount}
          subtext={nextEvent ? nextEvent.title : 'No upcoming events'}
          accentColor="#7b1fa2"
          to="/calendar"
        />
        <StatusCard
          label="Pending for School"
          value={pendingSchoolItems.length}
          subtext={`${pendingSchoolItems.length === 1 ? 'item' : 'items'} awaiting response`}
          accentColor="#3949ab"
          to="/school"
        />
      </div>

      {/* Row 2: Actions + Decisions two-column */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Actions Needing Attention */}
        <div className="bg-white rounded-lg shadow-[0_2px_8px_rgba(74,21,37,0.06)] p-5">
          <h2 className="text-sm font-bold uppercase tracking-[1px] text-gold-500 mb-4">
            Actions Needing Attention
          </h2>
          {attentionActions.length === 0 ? (
            <p className="text-sm text-text-secondary">All actions are on track.</p>
          ) : (
            <div className="space-y-3">
              {attentionActions.map((action) => {
                const meeting = getMeetingById(action.meetingId)
                const aging = getAgingInfo(action, meeting?.date)
                const isOverdue = aging.status === 'overdue'
                const borderColor = isOverdue ? 'border-l-warning' : 'border-l-gold-500'

                return (
                  <div
                    key={action.id}
                    className={`border-l-[3px] ${borderColor} pl-3 py-1`}
                  >
                    <div className="text-sm text-text-primary font-medium">
                      {action.description}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-text-secondary">
                      <span className={isOverdue ? 'text-warning font-medium' : ''}>
                        {aging.label}
                      </span>
                      <span>·</span>
                      <span>
                        {action.owners
                          .map((id) => getPersonByInitials(id).name.split(' ')[0])
                          .join(', ')}
                      </span>
                      {meeting && (
                        <>
                          <span>·</span>
                          <Link
                            to={`/meetings/${meeting.id}`}
                            className="text-info hover:underline"
                          >
                            {formatDate(meeting.date)}
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                )
              })}
              {overdueActions.length + openActions.length > 5 && (
                <Link
                  to="/actions"
                  className="inline-block text-sm font-medium text-info hover:underline mt-2"
                >
                  View all &rarr;
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Recent Decisions */}
        <div className="bg-white rounded-lg shadow-[0_2px_8px_rgba(74,21,37,0.06)] p-5">
          <h2 className="text-sm font-bold uppercase tracking-[1px] text-gold-500 mb-4">
            Recent Decisions
          </h2>
          {recentDecisions.length === 0 ? (
            <p className="text-sm text-text-secondary">No decisions recorded yet.</p>
          ) : (
            <div className="space-y-3">
              {recentDecisions.map((decision) => {
                const meeting = getMeetingById(decision.meetingId)
                const moverName = decision.moved
                  ? getPersonByInitials(decision.moved).name.split(' ')[0]
                  : null
                const seconderName = decision.seconded
                  ? getPersonByInitials(decision.seconded).name.split(' ')[0]
                  : null

                return (
                  <div key={decision.id} className="border-b border-gray-100 pb-3 last:border-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="text-sm text-text-primary font-medium">
                        {decision.title}
                      </div>
                      <Badge label={decision.result} variant={resultVariant(decision.result)} />
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-text-secondary">
                      {meeting && <span>{formatDate(meeting.date)}</span>}
                      {moverName && (
                        <>
                          <span>·</span>
                          <span>
                            Moved: {moverName}
                            {seconderName ? ` / Seconded: ${seconderName}` : ''}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Row 3: Coming Up strip */}
      {comingUpEvents.length > 0 && (
        <div className="bg-white rounded-lg shadow-[0_2px_8px_rgba(74,21,37,0.06)] p-5">
          <h2 className="text-sm font-bold uppercase tracking-[1px] text-gold-500 mb-4">
            Coming Up
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {comingUpEvents.map((event) => {
              const bgColor = eventTypeColors[event.type] || 'bg-gray-100'
              const textColor = eventTypeTextColors[event.type] || 'text-text-secondary'

              return (
                <div
                  key={event.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-gray-50"
                >
                  <div className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${bgColor}`} />
                  <div>
                    <div className={`text-sm font-medium ${textColor}`}>{event.title}</div>
                    <div className="text-xs text-text-secondary">
                      {formatDate(event.date)}
                      {event.time ? ` · ${event.time}` : ''}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
