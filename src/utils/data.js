import people from '../data/people.json'
import meetings from '../data/meetings.json'
import actions from '../data/actions.json'
import decisions from '../data/decisions.json'
import events from '../data/events.json'
import school from '../data/school.json'
import correspondence from '../data/correspondence.json'
import meta from '../data/meta.json'

export { people, meetings, actions, decisions, events, school, correspondence, meta }

export function getPersonByInitials(initials) {
  return people.find((p) => p.id === initials) || { initials, name: initials, role: '' }
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
