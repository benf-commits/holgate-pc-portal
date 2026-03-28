export function formatDate(isoDate) {
  if (!isoDate) return ''
  const d = new Date(isoDate + 'T00:00:00')
  return d.toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })
}

export function daysUntil(isoDate) {
  const target = new Date(isoDate + 'T00:00:00')
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  return Math.round((target - now) / (1000 * 60 * 60 * 24))
}

export function daysSince(isoDate) {
  return -daysUntil(isoDate)
}

export function getAgingInfo(action, meetingDate) {
  if (action.status === 'completed') {
    return {
      status: 'completed',
      days: 0,
      label: action.completedDate ? `Completed ${formatDate(action.completedDate)}` : 'Completed',
    }
  }
  if (action.dueDate) {
    const days = daysSince(action.dueDate)
    if (days > 0) {
      return { status: 'overdue', days, label: `${days} ${days === 1 ? 'day' : 'days'} overdue` }
    }
    return { status: 'upcoming', days: -days, label: `Due in ${-days} ${-days === 1 ? 'day' : 'days'}` }
  }
  return {
    status: 'open',
    days: daysSince(meetingDate),
    label: `Open since ${formatDate(meetingDate)}`,
  }
}

export function formatShortDate(isoDate) {
  if (!isoDate) return ''
  const d = new Date(isoDate + 'T00:00:00')
  const weekday = d.toLocaleDateString('en-AU', { weekday: 'short' })
  const day = d.getDate()
  const month = d.toLocaleDateString('en-AU', { month: 'short' })
  return `${weekday} ${day} ${month}`
}

export function isUpcoming(isoDate) {
  if (!isoDate) return false
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const target = new Date(isoDate + 'T00:00:00')
  return target >= today
}

// NSW 2026 school term dates (update annually)
const TERM_DATES_2026 = [
  { term: 1, start: '2026-01-28', end: '2026-04-02' },
  { term: 2, start: '2026-04-20', end: '2026-06-26' },
  { term: 3, start: '2026-07-13', end: '2026-09-18' },
  { term: 4, start: '2026-10-05', end: '2026-12-18' },
]

function getMonday(d) {
  const date = new Date(d)
  const day = date.getDay()
  const diff = day === 0 ? -6 : 1 - day
  date.setDate(date.getDate() + diff)
  return date
}

export function getEventGroup(isoDate) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const target = new Date(isoDate + 'T00:00:00')

  const thisMonday = getMonday(today)
  const nextMonday = new Date(thisMonday)
  nextMonday.setDate(nextMonday.getDate() + 7)
  const weekAfterNext = new Date(nextMonday)
  weekAfterNext.setDate(weekAfterNext.getDate() + 7)

  if (target >= thisMonday && target < nextMonday) return 'This Week'
  if (target >= nextMonday && target < weekAfterNext) return 'Next Week'

  // Find which term "today" is in (or the nearest upcoming term)
  const currentTermIndex = TERM_DATES_2026.findIndex((t) => {
    const end = new Date(t.end + 'T00:00:00')
    return today <= end
  })
  if (currentTermIndex === -1) return 'Later This Term'

  const currentTerm = TERM_DATES_2026[currentTermIndex]
  const currentTermEnd = new Date(currentTerm.end + 'T00:00:00')

  if (target <= currentTermEnd) return 'Later This Term'
  return 'Next Term'
}
