import EventCard from './EventCard';
import events from '../../data/parents-events.json';

const GROUP_ORDER = ['This Week', 'Next Week', 'Later This Term', 'Next Term'];

export default function WhatsComingUp() {
  const groups = GROUP_ORDER
    .map(label => ({ label, events: events.filter(e => e.group === label) }))
    .filter(g => g.events.length > 0);

  return (
    <section className="section section--white">
      <div className="section-inner">
        <h2 className="section-heading">What's coming up</h2>
        <p className="section-subheading">School and P&C events for the weeks ahead</p>
        {groups.map(group => (
          <div key={group.label}>
            <div className="event-group-label">{group.label}</div>
            {group.events.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ))}
        {groups.length === 0 && (
          <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>No upcoming events — check back after the next newsletter.</p>
        )}
      </div>
    </section>
  );
}
