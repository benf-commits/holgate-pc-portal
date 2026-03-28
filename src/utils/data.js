import people from '../data/people.json'
import meetings from '../data/meetings.json'
import actions from '../data/actions.json'
import decisions from '../data/decisions.json'
import school from '../data/school.json'
import correspondence from '../data/correspondence.json'
import documents from '../data/documents.json'
import meta from '../data/meta.json'
import events from '../data/events.json'
import updates from '../data/updates.json'
import reference from '../data/reference.json'

export { people, meetings, actions, decisions, school, correspondence, documents, meta, events, updates, reference }

export function getPersonByInitials(initials) {
  return people.find((p) => p.id === initials) || { id: initials, name: initials, role: '' }
}

export function getMeetingById(id) {
  return meetings.find((m) => m.id === id)
}

export function getActionsForMeeting(meetingId) {
  return actions.filter((a) => a.meetingId === meetingId)
}

export function getDecisionsForMeeting(meetingId) {
  return decisions.filter((d) => d.meetingId === meetingId)
}

export function getCorrespondenceForMeeting(meetingId) {
  return correspondence.filter((c) => c.meetingId === meetingId)
}

export function getDocumentsForMeeting(meetingId) {
  return documents.filter((d) => d.relatedMeetings?.includes(meetingId))
}

export function getNextMeeting() {
  const today = new Date().toISOString().split('T')[0]
  return (
    meetings.find((m) => m.status === 'scheduled') ||
    [...meetings].sort((a, b) => a.date.localeCompare(b.date)).find((m) => m.date >= today)
  )
}

export function getAttendanceCount(meeting) {
  return (
    (meeting.attendance?.present?.length || 0) +
    (meeting.attendance?.online?.length || 0)
  )
}

export function getUpcomingEvents() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return events
    .filter((e) => new Date(e.date + 'T00:00:00') >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
}

export function getRecentUpdates(limit) {
  const sorted = [...updates].sort((a, b) => b.date.localeCompare(a.date))
  return limit ? sorted.slice(0, limit) : sorted
}
