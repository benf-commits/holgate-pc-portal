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
      return { status: 'overdue', days, label: `${days} days overdue` }
    }
    return { status: 'upcoming', days: -days, label: `Due in ${-days} days` }
  }
  return {
    status: 'open',
    days: daysSince(meetingDate),
    label: `Open since ${formatDate(meetingDate)}`,
  }
}
