import { useMemo } from 'react'
import { getEventGroup, formatShortDate } from '../utils/dates'

const categoryColors = {
  school: 'bg-decision',   // green #2d6a4f
  pc: 'bg-accent',         // terracotta #b85c38
  community: 'bg-meeting', // purple #5b4a8a
}

function EventEntry({ event }) {
  const dotColor = categoryColors[event.category] || 'bg-text-secondary'

  return (
    <div className="flex gap-3 py-2">
      <div className="flex flex-col items-center pt-2">
        <div className={`w-2.5 h-2.5 rounded-full ${dotColor} shrink-0`} />
      </div>
      <div className="min-w-0">
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-[15px] font-bold text-text-primary whitespace-nowrap">
            {formatShortDate(event.date)}
          </span>
          {event.time && (
            <span className="text-[13px] text-text-secondary">{event.time}</span>
          )}
        </div>
        <div className="text-[15px] text-text-primary font-medium">{event.title}</div>
        {event.yearGroups && (
          <span className="text-[12px] text-text-secondary">
            {event.yearGroups.join(', ')}
          </span>
        )}
        {event.note && (
          <div className="text-[13px] text-text-secondary mt-0.5">{event.note}</div>
        )}
      </div>
    </div>
  )
}

export default function EventTimeline({ events }) {
  const groups = useMemo(() => {
    const order = ['This Week', 'Next Week', 'Later This Term', 'Next Term']
    const grouped = {}

    events.forEach((event) => {
      const group = getEventGroup(event.date)
      if (!grouped[group]) grouped[group] = []
      grouped[group].push(event)
    })

    return order
      .filter((label) => grouped[label]?.length > 0)
      .map((label) => ({ label, events: grouped[label] }))
  }, [events])

  if (groups.length === 0) {
    return <p className="text-[14px] text-text-secondary italic">No upcoming events</p>
  }

  return (
    <div className="space-y-4">
      {groups.map((group) => (
        <div key={group.label}>
          <div className="text-[12px] font-semibold text-text-secondary uppercase tracking-[1px] mb-2">
            {group.label}
          </div>
          <div className="border-l-2 border-header-border pl-3 ml-1">
            {group.events.map((event) => (
              <EventEntry key={event.id} event={event} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
