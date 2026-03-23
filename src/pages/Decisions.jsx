import { useState, useMemo } from 'react'
import { decisions, getMeetingById } from '../utils/data'
import { filterDecisions } from '../utils/filters'
import FilterChips from '../components/FilterChips'
import DecisionCard from '../components/DecisionCard'
import EmptyState from '../components/EmptyState'

const filterOptions = [
  { value: 'all', label: 'All' },
  { value: 'motions', label: 'Motions' },
  { value: 'spending', label: 'Spending' },
  { value: 'policy', label: 'Policy' },
  { value: 'election', label: 'Elections' },
  { value: 'operational', label: 'Operational' },
]

function getDecisionYear(decision) {
  const meeting = getMeetingById(decision.meetingId)
  if (meeting?.date) return meeting.date.substring(0, 4)
  return decision.id.substring(2, 6)
}

export default function Decisions() {
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [query, setQuery] = useState('')

  // Apply filters
  const filtered = useMemo(() => {
    const opts = {}
    if (categoryFilter !== 'all' && categoryFilter !== 'motions') {
      opts.category = categoryFilter
    }
    if (query.trim()) opts.query = query.trim()
    return filterDecisions(decisions, opts)
  }, [categoryFilter, query])

  // Group by year, newest first
  const groupedByYear = useMemo(() => {
    const groups = {}
    for (const d of filtered) {
      const year = getDecisionYear(d)
      if (!groups[year]) groups[year] = []
      groups[year].push(d)
    }
    return Object.entries(groups).sort(([a], [b]) => b.localeCompare(a))
  }, [filtered])

  // Global empty state
  if (!decisions || decisions.length === 0) {
    return (
      <div className="p-6">
        <EmptyState message="No decisions recorded yet." />
      </div>
    )
  }

  const noResults = filtered.length === 0

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-lg font-bold text-text-primary">Decisions</h1>
        <FilterChips
          options={filterOptions}
          active={categoryFilter}
          onChange={setCategoryFilter}
        />
      </div>

      {/* Search */}
      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search decisions..."
          className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-maroon-900/20 focus:border-maroon-900"
        />
      </div>

      {noResults ? (
        <EmptyState message="No decisions match your search." />
      ) : (
        <div className="space-y-8">
          {groupedByYear.map(([year, yearDecisions]) => (
            <section key={year}>
              <h2 className="text-sm font-bold uppercase tracking-[1px] text-gold-500 mb-3">
                {year}
              </h2>
              <div className="space-y-3">
                {yearDecisions.map((d) => (
                  <DecisionCard key={d.id} decision={d} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
