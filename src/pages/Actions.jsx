import { useState, useMemo } from 'react'
import { actions, getPersonByInitials, getMeetingById } from '../utils/data'
import { filterActions } from '../utils/filters'
import { getAgingInfo } from '../utils/dates'
import FilterChips from '../components/FilterChips'
import ActionItem from '../components/ActionItem'
import EmptyState from '../components/EmptyState'

function getMeetingDate(action) {
  const meeting = getMeetingById(action.meetingId)
  return meeting?.date || action.meetingId
}

export default function Actions() {
  const [statusFilter, setStatusFilter] = useState('open')
  const [ownerFilter, setOwnerFilter] = useState('')
  const [completedExpanded, setCompletedExpanded] = useState(false)

  // Compute counts for filter chips (before owner filter, so counts reflect status totals)
  const overdueCount = useMemo(
    () => filterActions(actions, { status: 'overdue' }).length,
    []
  )
  const openCount = useMemo(
    () => filterActions(actions, { status: 'open' }).length,
    []
  )
  const completedCount = useMemo(
    () => filterActions(actions, { status: 'completed' }).length,
    []
  )

  const filterOptions = [
    { value: 'open', label: 'Open', count: openCount },
    { value: 'overdue', label: 'Overdue', count: overdueCount },
    { value: 'completed', label: 'Completed', count: completedCount },
    { value: 'all', label: 'All' },
  ]

  // Unique owners across all actions for dropdown
  const owners = useMemo(() => {
    const ids = new Set()
    actions.forEach((a) => (a.owners || []).forEach((id) => ids.add(id)))
    return Array.from(ids)
      .map((id) => ({ id, name: getPersonByInitials(id).name }))
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [])

  // Apply filters
  const filtered = useMemo(() => {
    const opts = {}
    if (ownerFilter) opts.owner = ownerFilter
    if (statusFilter !== 'all') opts.status = statusFilter
    return filterActions(actions, opts)
  }, [statusFilter, ownerFilter])

  // Group into overdue / open / completed
  const overdue = useMemo(
    () =>
      filtered.filter((a) => {
        const aging = getAgingInfo(a, getMeetingDate(a))
        return aging.status === 'overdue'
      }),
    [filtered]
  )

  const open = useMemo(
    () =>
      filtered.filter((a) => {
        const aging = getAgingInfo(a, getMeetingDate(a))
        return aging.status === 'open' || aging.status === 'upcoming'
      }),
    [filtered]
  )

  const completed = useMemo(
    () => filtered.filter((a) => a.status === 'completed'),
    [filtered]
  )

  // Global empty state
  if (!actions || actions.length === 0) {
    return (
      <div className="p-6">
        <EmptyState message="No actions tracked yet. Actions will appear as meetings are ingested." />
      </div>
    )
  }

  const noResults = filtered.length === 0

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-lg font-bold text-text-primary">Actions</h1>
        <FilterChips
          options={filterOptions}
          active={statusFilter}
          onChange={setStatusFilter}
        />
      </div>

      {/* Owner filter */}
      <div>
        <select
          value={ownerFilter}
          onChange={(e) => setOwnerFilter(e.target.value)}
          className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-maroon-900/20 focus:border-maroon-900"
        >
          <option value="">All owners</option>
          {owners.map((o) => (
            <option key={o.id} value={o.id}>
              {o.name}
            </option>
          ))}
        </select>
      </div>

      {noResults ? (
        <EmptyState message="No actions match your filters." />
      ) : (
        <div className="space-y-6">
          {/* Overdue group */}
          {overdue.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-[1px] text-warning mb-3">
                Overdue ({overdue.length})
              </h2>
              <div className="space-y-3">
                {overdue.map((a) => (
                  <ActionItem
                    key={a.id}
                    action={a}
                    meetingDate={getMeetingDate(a)}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Open group */}
          {open.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-[1px] text-gold-500 mb-3">
                Open ({open.length})
              </h2>
              <div className="space-y-3">
                {open.map((a) => (
                  <ActionItem
                    key={a.id}
                    action={a}
                    meetingDate={getMeetingDate(a)}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Completed group — collapsed by default */}
          {completed.length > 0 && (
            <section>
              <button
                onClick={() => setCompletedExpanded(!completedExpanded)}
                className="flex items-center gap-2 text-sm font-bold uppercase tracking-[1px] text-success mb-3 hover:opacity-80 transition-opacity"
              >
                <span
                  className={`transition-transform ${completedExpanded ? 'rotate-90' : ''}`}
                >
                  &#9654;
                </span>
                Completed ({completed.length})
              </button>
              {completedExpanded && (
                <div className="space-y-3">
                  {completed.map((a) => (
                    <ActionItem
                      key={a.id}
                      action={a}
                      meetingDate={getMeetingDate(a)}
                    />
                  ))}
                </div>
              )}
            </section>
          )}
        </div>
      )}
    </div>
  )
}
