import { useState } from 'react'
import { meetings } from '../utils/data'
import { filterMeetings } from '../utils/filters'
import FilterChips from '../components/FilterChips'
import MeetingCard from '../components/MeetingCard'
import EmptyState from '../components/EmptyState'

const filterOptions = [
  { value: 'all', label: 'All' },
  { value: '2026', label: '2026' },
  { value: '2025', label: '2025' },
  { value: 'agm', label: 'AGMs' },
]

export default function Meetings() {
  const [activeFilter, setActiveFilter] = useState('all')

  if (!meetings || meetings.length === 0) {
    return (
      <div className="p-6">
        <EmptyState message="No meetings recorded yet." />
      </div>
    )
  }

  // Apply filter
  let filtered
  if (activeFilter === 'all') {
    filtered = meetings
  } else if (activeFilter === 'agm') {
    filtered = filterMeetings(meetings, { type: 'agm' })
  } else {
    filtered = filterMeetings(meetings, { year: activeFilter })
  }

  // Split into upcoming (scheduled) and past
  const upcoming = filtered
    .filter((m) => m.status === 'scheduled')
    .sort((a, b) => a.date.localeCompare(b.date))
  const past = filtered
    .filter((m) => m.status !== 'scheduled')
    .sort((a, b) => b.date.localeCompare(a.date))

  const noResults = upcoming.length === 0 && past.length === 0

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-lg font-bold text-text-primary">Meetings</h1>
        <FilterChips options={filterOptions} active={activeFilter} onChange={setActiveFilter} />
      </div>

      {noResults ? (
        <EmptyState message="No meetings match that filter." />
      ) : (
        <>
          {upcoming.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-[1px] text-gold-500 mb-3">
                Upcoming
              </h2>
              <div className="space-y-3">
                {upcoming.map((m) => (
                  <MeetingCard key={m.id} meeting={m} />
                ))}
              </div>
            </section>
          )}

          {past.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-[1px] text-gold-500 mb-3">
                Past Meetings
              </h2>
              <div className="space-y-3">
                {past.map((m) => (
                  <MeetingCard key={m.id} meeting={m} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  )
}
