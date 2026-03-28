import { useState, useMemo } from 'react'
import { getUpcomingEvents, getRecentUpdates, reference } from '../utils/data'
import EventTimeline from '../components/EventTimeline'
import UpdateCard from '../components/UpdateCard'
import QuickLinkPanel from '../components/QuickLinkPanel'

export default function Parents() {
  const [showAllUpdates, setShowAllUpdates] = useState(false)
  const upcomingEvents = useMemo(() => getUpcomingEvents(), [])
  const allUpdates = useMemo(() => getRecentUpdates(), [])
  const visibleUpdates = showAllUpdates ? allUpdates : allUpdates.slice(0, 5)
  const hasMore = allUpdates.length > 5

  return (
    <div className="p-5 space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-4">
        {/* Left column: Coming Up */}
        <div className="bg-white rounded-[10px] shadow-[0_1px_3px_var(--color-card-shadow)] p-4">
          <div className="text-[10px] font-bold text-accent uppercase tracking-[0.8px] mb-3">
            Coming Up
          </div>
          <EventTimeline events={upcomingEvents} />
        </div>

        {/* Right column: Updates + Quick Links */}
        <div className="space-y-4">
          <div className="bg-white rounded-[10px] shadow-[0_1px_3px_var(--color-card-shadow)] p-4">
            <div className="text-[10px] font-bold text-decision uppercase tracking-[0.8px] mb-3">
              Latest Updates
            </div>
            <div className="space-y-2">
              {visibleUpdates.map((update) => (
                <UpdateCard key={update.id} update={update} />
              ))}
            </div>
            {hasMore && !showAllUpdates && (
              <button
                onClick={() => setShowAllUpdates(true)}
                className="text-[11px] text-accent hover:underline mt-3"
              >
                See all updates →
              </button>
            )}
          </div>

          <div>
            <div className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.8px] mb-2">
              Quick Links
            </div>
            <QuickLinkPanel sections={reference} />
          </div>
        </div>
      </div>
    </div>
  )
}
