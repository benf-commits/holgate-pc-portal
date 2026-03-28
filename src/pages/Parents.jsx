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
    <div className="p-8 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6">
        {/* Left column: Coming Up */}
        <div className="bg-white rounded-lg shadow-[0_1px_3px_var(--color-card-shadow)] p-6">
          <div className="text-[13px] font-semibold text-accent uppercase tracking-[1px] mb-4">
            Coming Up
          </div>
          <EventTimeline events={upcomingEvents} />
        </div>

        {/* Right column: Updates + Quick Links */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-[0_1px_3px_var(--color-card-shadow)] p-6">
            <div className="text-[13px] font-semibold text-decision uppercase tracking-[1px] mb-4">
              Latest Updates
            </div>
            <div className="space-y-3">
              {visibleUpdates.map((update) => (
                <UpdateCard key={update.id} update={update} />
              ))}
            </div>
            {hasMore && !showAllUpdates && (
              <button
                onClick={() => setShowAllUpdates(true)}
                className="text-[14px] text-accent hover:underline mt-4"
              >
                See all updates →
              </button>
            )}
          </div>

          <div>
            <div className="text-[13px] font-semibold text-text-secondary uppercase tracking-[1px] mb-3">
              Quick Links
            </div>
            <QuickLinkPanel sections={reference} />
          </div>
        </div>
      </div>
    </div>
  )
}
