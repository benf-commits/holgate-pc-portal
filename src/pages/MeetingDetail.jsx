import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  getMeetingById,
  getActionsForMeeting,
  getDecisionsForMeeting,
  getPersonByInitials,
  getMeetingStatusBadge,
  getAttendanceCount,
} from '../utils/data'
import { formatDate, getAgingInfo } from '../utils/dates'
import Badge from '../components/Badge'
import EmptyState from '../components/EmptyState'

const tabs = ['Summary', 'Agenda', 'Minutes', 'Attendance']

function agingBadge(aging) {
  if (aging.status === 'completed') return { label: 'Completed', variant: 'success' }
  if (aging.status === 'overdue') return { label: aging.label, variant: 'warning' }
  if (aging.status === 'upcoming') return { label: aging.label, variant: 'info' }
  return { label: aging.label, variant: 'neutral' }
}

function outcomeIcon(type) {
  if (type === 'success') return { symbol: '\u2713', colour: 'text-success' }
  if (type === 'warning') return { symbol: '\u26A0', colour: 'text-warning' }
  return { symbol: '\u2139', colour: 'text-info' }
}

function attendanceStatusStyle(status) {
  const map = {
    present: 'bg-green-100 text-green-800',
    online: 'bg-blue-100 text-blue-800',
    apologies: 'bg-amber-100 text-amber-800',
    absent: 'bg-red-100 text-red-800',
  }
  return map[status] || 'bg-gray-100 text-gray-700'
}

function attendanceStatusLabel(status) {
  const map = {
    present: 'Present',
    online: 'Online',
    apologies: 'Apology',
    absent: 'Absent',
  }
  return map[status] || status
}

// ── Tab content components ──────────────────────────────────────────

function SummaryTab({ meeting }) {
  const actions = getActionsForMeeting(meeting.id)
  const decisions = getDecisionsForMeeting(meeting.id)
  const attendanceCount = getAttendanceCount(meeting)
  const reimbursementTotal = (meeting.reimbursements || []).reduce(
    (sum, r) => sum + r.amount,
    0
  )

  return (
    <div className="space-y-6">
      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Attended', value: attendanceCount },
          { label: 'Actions', value: actions.length },
          { label: 'Decisions', value: decisions.length },
          {
            label: 'Reimbursements',
            value: reimbursementTotal > 0 ? `$${reimbursementTotal.toLocaleString('en-AU', { minimumFractionDigits: 2 })}` : '$0',
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-lg shadow-[0_2px_8px_rgba(74,21,37,0.06)] p-4 text-center"
          >
            <div className="text-xl font-bold text-text-primary">{stat.value}</div>
            <div className="text-xs text-text-secondary mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Key outcomes */}
      {meeting.keyOutcomes && meeting.keyOutcomes.length > 0 && (
        <div className="bg-white rounded-lg shadow-[0_2px_8px_rgba(74,21,37,0.06)] p-5">
          <h3 className="text-sm font-bold uppercase tracking-[1px] text-gold-500 mb-3">
            Key Outcomes
          </h3>
          <ul className="space-y-2">
            {meeting.keyOutcomes.map((outcome, i) => {
              const icon = outcomeIcon(outcome.type)
              return (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className={`${icon.colour} mt-0.5 shrink-0 font-bold`}>
                    {icon.symbol}
                  </span>
                  <span className="text-text-primary">{outcome.text}</span>
                </li>
              )
            })}
          </ul>
        </div>
      )}

      {/* Actions from this meeting */}
      {actions.length > 0 && (
        <div className="bg-white rounded-lg shadow-[0_2px_8px_rgba(74,21,37,0.06)] p-5">
          <h3 className="text-sm font-bold uppercase tracking-[1px] text-gold-500 mb-3">
            Actions
          </h3>
          <div className="space-y-3">
            {actions.map((action) => {
              const aging = getAgingInfo(action, meeting.date)
              const badge = agingBadge(aging)
              return (
                <div key={action.id} className="border-b border-gray-100 pb-3 last:border-0">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-sm text-text-primary">{action.description}</span>
                    <Badge label={badge.label} variant={badge.variant} />
                  </div>
                  <div className="text-xs text-text-secondary mt-1">
                    {(action.owners || [])
                      .map((id) => getPersonByInitials(id).name)
                      .join(', ')}
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

function AgendaTab({ meeting }) {
  const items = meeting.agendaItems || []
  if (items.length === 0) {
    return <p className="text-sm text-text-secondary py-4">No agenda items recorded.</p>
  }
  return (
    <div className="bg-white rounded-lg shadow-[0_2px_8px_rgba(74,21,37,0.06)] p-5">
      <ol className="list-decimal list-inside space-y-2">
        {items.map((item, i) => (
          <li key={i} className="text-sm text-text-primary">
            {item}
          </li>
        ))}
      </ol>
    </div>
  )
}

function MinutesTab({ meeting }) {
  const items = meeting.minutesItems || []
  if (items.length === 0) {
    return <p className="text-sm text-text-secondary py-4">No minutes recorded.</p>
  }
  return (
    <div className="bg-white rounded-lg shadow-[0_2px_8px_rgba(74,21,37,0.06)] p-5">
      <ul className="list-disc list-inside space-y-2">
        {items.map((item, i) => (
          <li key={i} className="text-sm text-text-primary">
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function AttendanceTab({ meeting }) {
  const attendance = meeting.attendance || {}
  const groups = [
    { key: 'present', people: attendance.present || [] },
    { key: 'online', people: attendance.online || [] },
    { key: 'apologies', people: attendance.apologies || [] },
    { key: 'absent', people: attendance.absent || [] },
  ]

  const allEntries = groups.flatMap(({ key, people }) =>
    people.map((id) => ({ id, status: key }))
  )

  if (allEntries.length === 0) {
    return <p className="text-sm text-text-secondary py-4">No attendance recorded.</p>
  }

  return (
    <div className="bg-white rounded-lg shadow-[0_2px_8px_rgba(74,21,37,0.06)] p-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {allEntries.map(({ id, status }) => {
          const person = getPersonByInitials(id)
          return (
            <div
              key={id}
              className="flex items-center justify-between gap-2 p-2 rounded-lg bg-gray-50"
            >
              <div>
                <div className="text-sm font-medium text-text-primary">{person.name}</div>
                {person.role && (
                  <div className="text-xs text-text-secondary">{person.role}</div>
                )}
              </div>
              <span
                className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full shrink-0 ${attendanceStatusStyle(status)}`}
              >
                {attendanceStatusLabel(status)}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Main component ──────────────────────────────────────────────────

export default function MeetingDetail() {
  const { id } = useParams()
  const [activeTab, setActiveTab] = useState('Summary')

  const meeting = getMeetingById(id)

  if (!meeting) {
    return (
      <div className="p-6">
        <EmptyState message="Meeting not found." />
      </div>
    )
  }

  const badge = getMeetingStatusBadge(meeting.status)
  const isAgm = meeting.type.includes('agm')

  const tabContent = {
    Summary: <SummaryTab meeting={meeting} />,
    Agenda: <AgendaTab meeting={meeting} />,
    Minutes: <MinutesTab meeting={meeting} />,
    Attendance: <AttendanceTab meeting={meeting} />,
  }

  return (
    <div className="p-6 space-y-5">
      {/* Breadcrumb */}
      <nav className="text-xs text-text-secondary">
        <Link to="/meetings" className="text-info hover:underline">
          Meetings
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-text-primary">{meeting.title}</span>
      </nav>

      {/* Header */}
      <div>
        <div className="flex items-start gap-2 flex-wrap">
          <h1 className="text-lg font-bold text-text-primary">{meeting.title}</h1>
          <Badge label={badge.label} variant={badge.variant} />
          {isAgm && <Badge label="AGM" variant="election" />}
        </div>
        <div className="flex flex-wrap gap-3 mt-2 text-sm text-text-secondary">
          <span>{formatDate(meeting.date)}</span>
          {meeting.openTime && <span>{meeting.openTime}{meeting.closeTime ? ` – ${meeting.closeTime}` : ''}</span>}
          {meeting.location && <span>{meeting.location}</span>}
        </div>
      </div>

      {/* Tab bar */}
      <div className="border-b border-gray-200 overflow-x-auto">
        <div className="flex gap-1 -mb-px">
          {tabs.map((tab) => {
            const isActive = tab === activeTab
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? 'border-b-2 border-maroon-900 text-maroon-900'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {tab}
              </button>
            )
          })}
        </div>
      </div>

      {/* Tab content */}
      {tabContent[activeTab]}
    </div>
  )
}
