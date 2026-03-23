import { useState, useMemo } from 'react'
import { events } from '../utils/data'
import { filterEvents } from '../utils/filters'
import EventItem from '../components/EventItem'
import EmptyState from '../components/EmptyState'

const TERMS = [
  { term: 1, label: 'Term 1', dates: '28 Jan – 10 Apr' },
  { term: 2, label: 'Term 2', dates: '28 Apr – 3 Jul' },
  { term: 3, label: 'Term 3', dates: '21 Jul – 26 Sep' },
  { term: 4, label: 'Term 4', dates: '13 Oct – 18 Dec' },
]

const TERM_RANGES = {
  1: { start: '2026-01-28', end: '2026-04-10' },
  2: { start: '2026-04-28', end: '2026-07-03' },
  3: { start: '2026-07-21', end: '2026-09-26' },
  4: { start: '2026-10-13', end: '2026-12-18' },
}

const TYPE_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'meeting', label: 'Meetings', dot: 'bg-event-meeting' },
  { value: 'pc-event', label: 'P&C Events', dot: 'bg-event-pc' },
  { value: 'school-event', label: 'School Events', dot: 'bg-event-school' },
  { value: 'external', label: 'External', dot: 'bg-event-external' },
]

function getTermForDate(dateStr) {
  for (const [term, range] of Object.entries(TERM_RANGES)) {
    if (dateStr >= range.start && dateStr <= range.end) return Number(term)
  }
  return null
}

function formatDayColumn(dateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  const month = d.toLocaleDateString('en-AU', { month: 'short' }).toUpperCase()
  const day = d.getDate()
  const weekday = d.toLocaleDateString('en-AU', { weekday: 'short' })
  return { month, day, weekday }
}

function TypeFilterChips({ options, active, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto">
      {options.map((option) => {
        const isActive = option.value === active
        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-full whitespace-nowrap shrink-0 transition-colors ${
              isActive
                ? 'bg-maroon-900 text-white'
                : 'bg-white text-text-secondary border border-gray-200 hover:border-maroon-900 hover:text-maroon-900'
            }`}
          >
            {option.dot && (
              <span
                className={`inline-block w-2 h-2 rounded-full ${
                  isActive ? 'bg-white/70' : option.dot
                }`}
              />
            )}
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

export default function Calendar() {
  const [typeFilter, setTypeFilter] = useState('all')

  const filtered = useMemo(() => {
    if (typeFilter === 'all') return events
    return filterEvents(events, { type: typeFilter })
  }, [typeFilter])

  // Split into dated and TBC
  const dated = useMemo(
    () =>
      filtered
        .filter((e) => e.date)
        .sort((a, b) => a.date.localeCompare(b.date)),
    [filtered]
  )

  const tbc = useMemo(
    () => filtered.filter((e) => !e.date).sort((a, b) => (a.term || 0) - (b.term || 0)),
    [filtered]
  )

  // Group dated events by term
  const eventsByTerm = useMemo(() => {
    const grouped = {}
    for (const event of dated) {
      const term = getTermForDate(event.date) || event.term || 0
      if (!grouped[term]) grouped[term] = []
      grouped[term].push(event)
    }
    return grouped
  }, [dated])

  if (!events || events.length === 0) {
    return (
      <div className="p-6">
        <EmptyState message="No events scheduled yet." />
      </div>
    )
  }

  const noResults = filtered.length === 0

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-lg font-bold text-text-primary">Calendar 2026</h1>
        <TypeFilterChips
          options={TYPE_OPTIONS}
          active={typeFilter}
          onChange={setTypeFilter}
        />
      </div>

      {noResults ? (
        <EmptyState message="No events match that filter." />
      ) : (
        <div className="space-y-8">
          {/* Term sections */}
          {TERMS.map(({ term, label, dates }) => {
            const termEvents = eventsByTerm[term]
            if (!termEvents || termEvents.length === 0) return null

            return (
              <section key={term}>
                <div className="mb-4">
                  <h2 className="text-sm font-bold uppercase tracking-[1px] text-gold-500">
                    {label}
                  </h2>
                  <p className="text-xs text-text-secondary mt-0.5">{dates}</p>
                </div>

                <div className="space-y-3">
                  {termEvents.map((event) => {
                    const col = formatDayColumn(event.date)
                    return (
                      <div key={event.id} className="flex gap-4">
                        {/* Date column */}
                        <div className="w-14 shrink-0 text-center pt-3">
                          <p className="text-[10px] font-semibold uppercase tracking-wide text-text-secondary">
                            {col.month}
                          </p>
                          <p className="text-xl font-bold text-text-primary leading-tight">
                            {col.day}
                          </p>
                          <p className="text-[10px] text-text-secondary">
                            {col.weekday}
                          </p>
                        </div>

                        {/* Event card */}
                        <div className="flex-1 min-w-0">
                          <EventItem event={event} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </section>
            )
          })}

          {/* TBC section */}
          {tbc.length > 0 && (
            <section>
              <div className="mb-4">
                <h2 className="text-sm font-bold uppercase tracking-[1px] text-gold-500">
                  Date TBC
                </h2>
                <p className="text-xs text-text-secondary mt-0.5">
                  Events awaiting confirmed dates
                </p>
              </div>

              <div className="space-y-3">
                {tbc.map((event) => {
                  const termInfo = TERMS.find((t) => t.term === event.term)
                  return (
                    <div key={event.id} className="flex gap-4">
                      {/* Term placeholder column */}
                      <div className="w-14 shrink-0 text-center pt-3">
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-text-secondary">
                          {termInfo ? `T${termInfo.term}` : '—'}
                        </p>
                        <p className="text-xl font-bold text-text-secondary/40 leading-tight">
                          ?
                        </p>
                      </div>

                      {/* Event card */}
                      <div className="flex-1 min-w-0">
                        <EventItem event={event} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  )
}
