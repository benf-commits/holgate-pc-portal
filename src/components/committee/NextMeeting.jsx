import data from '../../data/committee-next-meeting.json';

function parseCalendarParts(dateStr) {
  if (!dateStr) return { month: '', day: '' };
  const date = new Date(dateStr);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return {
    month: months[date.getUTCMonth()],
    day: date.getUTCDate(),
  };
}

export default function NextMeeting() {
  if (!data) {
    return (
      <section className="section next-section">
        <div className="section-inner">
          <div className="reveal">
            <h2 className="next-heading">Next Meeting</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: 8 }}>
              No meeting currently scheduled.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const { month, day } = parseCalendarParts(data.date);

  return (
    <section className="section next-section">
      <div className="section-inner">
        <div className="reveal">
          <div className="next-layout">
            <div className="calendar-block">
              <div className="calendar-block-month">{month}</div>
              <div className="calendar-block-day">{day}</div>
            </div>
            <div className="next-info">
              <h2 className="next-heading">Next Meeting</h2>
              <div className="next-date">{data.title}</div>
              <div className="next-details">
                {data.time}
                {data.location && ` \u00b7 ${data.location}`}
                {data.online && ' \u00b7 Online option available'}
              </div>
              {data.expectedAgenda && data.expectedAgenda.length > 0 && (
                <div className="next-agenda">
                  <span className="next-agenda-label">Expected agenda</span>
                  {data.expectedAgenda.join(' \u00b7 ')}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
