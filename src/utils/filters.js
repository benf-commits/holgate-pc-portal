import { daysSince } from './dates'

export function filterActions(actions, { owner = null, status = null } = {}) {
  return actions.filter((a) => {
    if (owner && !a.owners.includes(owner)) return false
    if (status === 'overdue') return a.status === 'open' && a.dueDate && daysSince(a.dueDate) > 0
    if (status === 'open') return a.status === 'open' && (!a.dueDate || daysSince(a.dueDate) <= 0)
    if (status === 'completed') return a.status === 'completed'
    return true
  })
}

export function filterDecisions(decisions, { category = null, query = null } = {}) {
  return decisions.filter((d) => {
    if (category && d.category !== category) return false
    if (query) {
      const q = query.toLowerCase()
      return d.title.toLowerCase().includes(q) || d.description.toLowerCase().includes(q)
    }
    return true
  })
}

export function filterMeetings(meetings, { year = null, type = null } = {}) {
  return meetings.filter((m) => {
    if (year && !m.date.startsWith(String(year))) return false
    if (type === 'agm' && !m.type.includes('agm')) return false
    return true
  })
}

export function filterEvents(events, { type = null } = {}) {
  return events.filter((e) => {
    if (type && e.type !== type) return false
    return true
  })
}
