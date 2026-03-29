export default function EventCard({ event }) {
  const tagClass = {
    school: 'event-tag--school',
    pc: 'event-tag--pc',
    community: 'event-tag--community',
  }[event.category] || 'event-tag--school';

  return (
    <div className="event-card">
      <div className="event-date-block">
        <div className="event-date-day">{event.day}</div>
        <div className="event-date-month">{event.month}</div>
      </div>
      <div className="event-body">
        <div className="event-title">{event.title}</div>
        {(event.time || event.note) && (
          <div className="event-meta">
            {[event.time, event.note].filter(Boolean).join(' · ')}
          </div>
        )}
        <span className={`event-tag ${tagClass}`}>
          {event.category === 'pc' ? 'P&C' : event.category.charAt(0).toUpperCase() + event.category.slice(1)}
        </span>
      </div>
    </div>
  );
}
