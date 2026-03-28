import Badge from './Badge'
import { getPersonByInitials, getMeetingById, getActionsForMeeting, getDecisionsForMeeting } from '../utils/data'
import { formatDate } from '../utils/dates'
import { highlightMatch } from '../utils/search'

const borderColors = {
  meeting: 'border-l-meeting',
  decision: 'border-l-decision',
  action: 'border-l-action',
  document: 'border-l-document',
}

const typeLabels = {
  meeting: 'Meeting',
  decision: 'Decision',
  action: 'Action',
  document: 'Document',
}

function MeetingResult({ data, query }) {
  const actionCount = getActionsForMeeting(data.id).length
  const decisionCount = getDecisionsForMeeting(data.id).length
  const matchingMinutes = (data.minutesItems || [])
    .filter((item) => item.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 2)

  return (
    <>
      <div className="flex justify-between items-center mb-1">
        <span className="text-[10px] font-semibold text-meeting uppercase tracking-[0.5px]">{typeLabels.meeting}</span>
        <span className="text-[10px] text-text-secondary">{formatDate(data.date)}</span>
      </div>
      <div className="text-[12px] font-semibold text-text-primary mb-1" dangerouslySetInnerHTML={{ __html: highlightMatch(data.title, query) }} />
      {matchingMinutes.length > 0 && (
        <div className="text-[11px] text-neutral-text leading-relaxed mb-2" dangerouslySetInnerHTML={{ __html: matchingMinutes.map((m) => highlightMatch(m, query)).join(' &middot; ') }} />
      )}
      <div className="flex gap-3 text-[10px]">
        {actionCount > 0 && <span className="text-action">{actionCount} actions</span>}
        {decisionCount > 0 && <span className="text-decision">{decisionCount} decisions</span>}
        {data.pdfPath && (
          <a href={data.pdfPath} target="_blank" rel="noopener noreferrer" className="text-meeting hover:underline">
            View minutes PDF
          </a>
        )}
      </div>
    </>
  )
}

function DecisionResult({ data, query }) {
  const meeting = getMeetingById(data.meetingId)
  return (
    <>
      <div className="flex justify-between items-center mb-1">
        <span className="text-[10px] font-semibold text-decision uppercase tracking-[0.5px]">{typeLabels.decision}</span>
        <Badge label={data.result} variant={data.result === 'carried' ? 'carried' : data.result === 'defeated' ? 'defeated' : 'neutral'} />
      </div>
      <div className="text-[12px] font-semibold text-text-primary mb-1" dangerouslySetInnerHTML={{ __html: highlightMatch(data.title, query) }} />
      {data.description && (
        <div className="text-[11px] text-neutral-text" dangerouslySetInnerHTML={{ __html: highlightMatch(data.description, query) }} />
      )}
      {meeting && <div className="text-[10px] text-text-secondary mt-1">{formatDate(meeting.date)} meeting</div>}
    </>
  )
}

function ActionResult({ data, query }) {
  const meeting = getMeetingById(data.meetingId)
  const ownerNames = (data.owners || []).map((id) => getPersonByInitials(id).name.split(' ')[0]).join(', ')
  const statusVariant = data.status === 'completed' ? 'carried' : 'open'
  return (
    <>
      <div className="flex justify-between items-center mb-1">
        <span className="text-[10px] font-semibold text-action uppercase tracking-[0.5px]">{typeLabels.action}</span>
        <Badge label={data.status} variant={statusVariant} />
      </div>
      <div className="text-[12px] font-semibold text-text-primary mb-1" dangerouslySetInnerHTML={{ __html: highlightMatch(data.description, query) }} />
      <div className="text-[10px] text-text-secondary">
        {ownerNames}
        {meeting && <> &middot; from {formatDate(meeting.date)} meeting</>}
      </div>
    </>
  )
}

function DocumentResult({ data, query }) {
  return (
    <>
      <div className="flex justify-between items-center mb-1">
        <span className="text-[10px] font-semibold text-document uppercase tracking-[0.5px]">{typeLabels.document}</span>
        <span className="text-[10px] text-text-secondary uppercase">{data.format}</span>
      </div>
      <div className="text-[12px] font-semibold text-text-primary mb-1" dangerouslySetInnerHTML={{ __html: highlightMatch(data.title, query) }} />
      {data.description && (
        <div className="text-[11px] text-neutral-text" dangerouslySetInnerHTML={{ __html: highlightMatch(data.description, query) }} />
      )}
      {data.path && (
        <a href={data.path} target="_blank" rel="noopener noreferrer" className="inline-block text-[10px] text-action hover:underline mt-1">
          Open document &rarr;
        </a>
      )}
    </>
  )
}

const renderers = {
  meeting: MeetingResult,
  decision: DecisionResult,
  action: ActionResult,
  document: DocumentResult,
}

export default function SearchResult({ result, query }) {
  const border = borderColors[result.type] || 'border-l-document'
  const Renderer = renderers[result.type]

  return (
    <div className={`bg-white rounded-[10px] shadow-[0_1px_3px_var(--color-card-shadow)] border-l-4 ${border} p-4`}>
      <Renderer data={result.data} query={query} />
    </div>
  )
}
