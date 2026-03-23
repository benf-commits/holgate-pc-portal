import { useState, useMemo } from 'react'
import { school, people } from '../utils/data'
import { formatDate, daysSince } from '../utils/dates'
import Badge from '../components/Badge'
import EmptyState from '../components/EmptyState'

const TABS = ['Pending', 'Updates', 'Reference', 'People']

function agingBorder(days) {
  if (days >= 30) return 'border-l-warning'
  if (days >= 14) return 'border-l-gold-500'
  return 'border-l-gray-300'
}

function agingBadge(days) {
  if (days >= 30) return { label: `${days}d`, variant: 'warning' }
  if (days >= 14) return { label: `${days}d`, variant: 'neutral' }
  return { label: `${days}d`, variant: 'neutral' }
}

/* ───── Pending Tab ───── */
function PendingTab() {
  const openItems = school.pendingItems?.filter((i) => i.status === 'open') || []
  const resolvedItems = school.resolvedItems || []

  if (openItems.length === 0 && resolvedItems.length === 0) {
    return <EmptyState message="No pending items. All clear!" />
  }

  return (
    <div className="space-y-6">
      {openItems.length > 0 && (
        <section>
          <h2 className="text-sm font-bold uppercase tracking-[1px] text-gold-500 mb-3">
            Open ({openItems.length})
          </h2>
          <div className="space-y-3">
            {openItems.map((item) => {
              const days = daysSince(item.meetingId)
              const border = agingBorder(days)
              const badge = agingBadge(days)
              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-lg shadow-[0_2px_8px_rgba(74,21,37,0.06)] border-l-[4px] ${border} p-4`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium text-text-primary">{item.title}</p>
                    <Badge label={badge.label} variant={badge.variant} />
                  </div>
                  {item.description && (
                    <p className="text-xs text-text-secondary mt-2">{item.description}</p>
                  )}
                  <div className="flex items-center flex-wrap gap-3 mt-3 text-xs text-text-secondary">
                    {item.waitingOn && (
                      <span>
                        Waiting on <span className="font-medium text-text-primary">{item.waitingOn}</span>
                      </span>
                    )}
                    <span>{days} {days === 1 ? 'day' : 'days'} since {formatDate(item.meetingId)}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {resolvedItems.length > 0 && (
        <section>
          <h2 className="text-sm font-bold uppercase tracking-[1px] text-success mb-3">
            Recently Resolved ({resolvedItems.length})
          </h2>
          <div className="space-y-3">
            {resolvedItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-[0_2px_8px_rgba(74,21,37,0.06)] border-l-[4px] border-l-success p-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-success">&#10003;</span>
                    <p className="text-sm font-medium text-text-primary">{item.title}</p>
                  </div>
                </div>
                <div className="flex items-center flex-wrap gap-3 mt-2 text-xs text-text-secondary">
                  {item.resolution && <span>{item.resolution}</span>}
                  {item.resolvedDate && <span>— {formatDate(item.resolvedDate)}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

/* ───── Updates Tab ───── */
function UpdatesTab() {
  const updates = school.updates || []

  if (updates.length === 0) {
    return <EmptyState message="No updates recorded yet." />
  }

  // Sort by date descending
  const sorted = [...updates].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div className="space-y-3">
      {sorted.map((update) => (
        <div
          key={update.id}
          className="bg-white rounded-lg shadow-[0_2px_8px_rgba(74,21,37,0.06)] p-4"
        >
          <div className="flex items-start justify-between gap-2 mb-2">
            <Badge label={update.source.toUpperCase()} variant="operational" />
            <span className="text-xs text-text-secondary whitespace-nowrap">{formatDate(update.date)}</span>
          </div>
          <p className="text-sm font-medium text-text-primary">{update.title}</p>
          {update.content && (
            <p className="text-xs text-text-secondary mt-2 leading-relaxed">{update.content}</p>
          )}
        </div>
      ))}
    </div>
  )
}

/* ───── Reference Tab ───── */
function ReferenceTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Quick Reference */}
      <div className="bg-white rounded-lg shadow-[0_2px_8px_rgba(74,21,37,0.06)] p-4">
        <h3 className="text-sm font-bold text-text-primary mb-3">Quick Reference</h3>
        <dl className="space-y-2 text-xs">
          <div className="flex justify-between gap-2">
            <dt className="text-text-secondary">Principal</dt>
            <dd className="text-text-primary font-medium text-right">{school.principal}</dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt className="text-text-secondary">Phone</dt>
            <dd className="text-text-primary font-medium text-right">{school.phone}</dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt className="text-text-secondary">Address</dt>
            <dd className="text-text-primary font-medium text-right">{school.address}</dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt className="text-text-secondary">Email</dt>
            <dd className="text-text-primary font-medium text-right break-all">{school.email}</dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt className="text-text-secondary">Enrolment Cap</dt>
            <dd className="text-text-primary font-medium text-right">{school.enrolmentCap}</dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt className="text-text-secondary">Classes</dt>
            <dd className="text-text-primary font-medium text-right">{school.classes}</dd>
          </div>
        </dl>
      </div>

      {/* Key Policies & Rules */}
      <div className="bg-white rounded-lg shadow-[0_2px_8px_rgba(74,21,37,0.06)] p-4">
        <h3 className="text-sm font-bold text-text-primary mb-3">Key Policies &amp; Rules</h3>
        <dl className="space-y-2 text-xs">
          <div>
            <dt className="text-text-secondary mb-1">School Values</dt>
            <dd className="text-text-primary font-medium">
              {(school.values || []).join(' \u00B7 ')}
            </dd>
          </div>
          <div>
            <dt className="text-text-secondary mb-1">Motto</dt>
            <dd className="text-text-primary font-medium italic">
              &ldquo;{school.motto}&rdquo;
            </dd>
          </div>
        </dl>
      </div>

      {/* P&C Operating Rules */}
      <div className="bg-white rounded-lg shadow-[0_2px_8px_rgba(74,21,37,0.06)] p-4">
        <h3 className="text-sm font-bold text-text-primary mb-3">P&amp;C Operating Rules</h3>
        {(school.operatingRules || []).length > 0 ? (
          <ul className="space-y-1.5">
            {school.operatingRules.map((rule, i) => (
              <li key={i} className="text-xs text-text-secondary flex gap-2">
                <span className="text-gold-500 mt-0.5 shrink-0">&bull;</span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs text-text-secondary">No operating rules recorded.</p>
        )}
      </div>

      {/* Uniform Pricing */}
      <div className="bg-white rounded-lg shadow-[0_2px_8px_rgba(74,21,37,0.06)] p-4">
        <h3 className="text-sm font-bold text-text-primary mb-3">Uniform Pricing</h3>
        {(school.uniformPricing || []).length > 0 ? (
          <div className="space-y-2">
            {school.uniformPricing.map((item, i) => (
              <div key={i} className="flex items-start justify-between gap-2 text-xs">
                <div>
                  <span className="text-text-primary font-medium">{item.item}</span>
                  <span className="text-text-secondary ml-1">— {item.description}</span>
                </div>
                <span className="text-text-primary font-medium whitespace-nowrap">
                  ${item.price.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-text-secondary">No uniform pricing recorded.</p>
        )}
      </div>
    </div>
  )
}

/* ───── People Tab ───── */
function PeopleTab() {
  const [previousExpanded, setPreviousExpanded] = useState(false)

  const activePeople = useMemo(() => people.filter((p) => p.active), [])
  const inactivePeople = useMemo(() => people.filter((p) => !p.active), [])

  // Group active people: office-bearer first, then committee, then staff, then member
  const typeOrder = ['office-bearer', 'committee', 'staff', 'member']
  const typeLabels = {
    'office-bearer': 'Office Bearers',
    'committee': 'Committee',
    'staff': 'School Staff',
    'member': 'Members',
  }

  const groupedActive = useMemo(() => {
    const groups = {}
    for (const person of activePeople) {
      const type = person.type || 'member'
      if (!groups[type]) groups[type] = []
      groups[type].push(person)
    }
    return typeOrder.filter((t) => groups[t]?.length > 0).map((t) => ({
      type: t,
      label: typeLabels[t],
      people: groups[t],
    }))
  }, [activePeople])

  if (activePeople.length === 0 && inactivePeople.length === 0) {
    return <EmptyState message="No people recorded yet." />
  }

  return (
    <div className="space-y-6">
      {groupedActive.map((group) => (
        <section key={group.type}>
          <h2 className="text-sm font-bold uppercase tracking-[1px] text-gold-500 mb-3">
            {group.label}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {group.people.map((person) => (
              <div
                key={person.id}
                className="bg-white rounded-lg shadow-[0_2px_8px_rgba(74,21,37,0.06)] p-4"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-maroon-100 text-maroon-900 text-xs font-bold">
                    {person.id}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-text-primary">{person.name}</p>
                    {person.role && (
                      <p className="text-xs text-text-secondary">{person.role}</p>
                    )}
                  </div>
                </div>
                {person.responsibilities && person.responsibilities.length > 0 && (
                  <ul className="mt-3 space-y-1">
                    {person.responsibilities.map((r, i) => (
                      <li key={i} className="text-xs text-text-secondary flex gap-2">
                        <span className="text-gold-500 mt-0.5 shrink-0">&bull;</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}

      {inactivePeople.length > 0 && (
        <section>
          <button
            onClick={() => setPreviousExpanded(!previousExpanded)}
            className="flex items-center gap-2 text-sm font-bold uppercase tracking-[1px] text-text-secondary mb-3 hover:opacity-80 transition-opacity"
          >
            <span
              className={`transition-transform ${previousExpanded ? 'rotate-90' : ''}`}
            >
              &#9654;
            </span>
            Previous Members ({inactivePeople.length})
          </button>
          {previousExpanded && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {inactivePeople.map((person) => (
                <div
                  key={person.id}
                  className="bg-white rounded-lg shadow-[0_2px_8px_rgba(74,21,37,0.06)] p-4 opacity-60"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-500 text-xs font-bold">
                      {person.id}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-text-primary">{person.name}</p>
                      {person.role && (
                        <p className="text-xs text-text-secondary">{person.role}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  )
}

/* ───── Main School Page ───── */
export default function School() {
  const [activeTab, setActiveTab] = useState('Pending')

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <h1 className="text-lg font-bold text-text-primary">School</h1>

      {/* Tab Bar */}
      <div className="flex gap-1 border-b border-gray-200">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'text-maroon-900 border-b-2 border-maroon-900 -mb-px'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'Pending' && <PendingTab />}
      {activeTab === 'Updates' && <UpdatesTab />}
      {activeTab === 'Reference' && <ReferenceTab />}
      {activeTab === 'People' && <PeopleTab />}
    </div>
  )
}
