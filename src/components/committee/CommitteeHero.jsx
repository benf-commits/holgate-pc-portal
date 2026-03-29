import { FileText, CheckCircle, Calendar, Layers, GraduationCap, ArrowUpRight } from 'lucide-react';
import tasksData from '../../data/committee-tasks.json';
import meetingData from '../../data/committee-meeting.json';
import nextMeetingData from '../../data/committee-next-meeting.json';

export default function CommitteeHero() {
  const base = import.meta.env.BASE_URL;

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const nextDate = nextMeetingData
    ? new Date(nextMeetingData.date).toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'long' })
    : null;

  return (
    <section className="committee-hero">
      <div
        className="committee-hero-banner"
        style={{ backgroundImage: `url(${base}images/school-building.jpg)` }}
      >
        <div className="committee-hero-banner-overlay" />
        <div className="committee-hero-banner-content section-inner">
          <div className="committee-hero-brand">
            <img
              src={`${base}images/holgate-logo.png`}
              alt="Holgate P.S."
              className="committee-hero-crest"
            />
            <div>
              <div className="committee-hero-title">Holgate P&C</div>
              <div className="committee-hero-subtitle">Parents & Citizens Association</div>
            </div>
          </div>
          <a href="#/" className="committee-hero-portal-link">
            Parents Portal <ArrowUpRight size={14} strokeWidth={2.5} />
          </a>
        </div>
        <div className="committee-hero-banner-fade" />
      </div>

      <div className="committee-hero-nav">
        <div className="section-inner">
          <p className="committee-hero-welcome">
            Everything from our P&C meetings in one place — updated after each meeting.
          </p>
          <div className="committee-hero-grid">

            <button className="committee-hero-card" onClick={() => scrollTo('last-meeting')}>
              <div className="committee-hero-card-icon committee-hero-card-icon--meeting">
                <FileText size={22} />
              </div>
              <div className="committee-hero-card-body">
                <div className="committee-hero-card-title">Last Meeting</div>
                <div className="committee-hero-card-meta">
                  {meetingData.title} — {meetingData.decisions.length} decisions, {meetingData.actions.length} actions
                </div>
              </div>
            </button>

            <button className="committee-hero-card" onClick={() => scrollTo('open-tasks')}>
              <div className="committee-hero-card-icon committee-hero-card-icon--tasks">
                <CheckCircle size={22} />
              </div>
              <div className="committee-hero-card-body">
                <div className="committee-hero-card-title">Open Tasks</div>
                <div className="committee-hero-card-meta">
                  {tasksData.total} tasks — {tasksData.recent.length} from latest meeting, {tasksData.carriedForward.length} carried forward
                </div>
              </div>
            </button>

            <button className="committee-hero-card" onClick={() => scrollTo('next-meeting')}>
              <div className="committee-hero-card-icon committee-hero-card-icon--next">
                <Calendar size={22} />
              </div>
              <div className="committee-hero-card-body">
                <div className="committee-hero-card-title">Next Meeting</div>
                <div className="committee-hero-card-meta">
                  {nextDate || 'No meeting scheduled'}{nextMeetingData ? ` · ${nextMeetingData.time}` : ''}
                </div>
              </div>
            </button>

            <button className="committee-hero-card" onClick={() => scrollTo('pc-areas')}>
              <div className="committee-hero-card-icon committee-hero-card-icon--areas">
                <Layers size={22} />
              </div>
              <div className="committee-hero-card-body">
                <div className="committee-hero-card-title">P&C Areas</div>
                <div className="committee-hero-card-meta">
                  Canteen · Uniforms · Grants · Events · Finance · Governance
                </div>
              </div>
            </button>

            <button className="committee-hero-card" onClick={() => scrollTo('principal-report')}>
              <div className="committee-hero-card-icon committee-hero-card-icon--principal">
                <GraduationCap size={22} />
              </div>
              <div className="committee-hero-card-body">
                <div className="committee-hero-card-title">Principal's Report</div>
                <div className="committee-hero-card-meta">
                  School updates and items waiting on the school
                </div>
              </div>
            </button>

          </div>
        </div>
      </div>
    </section>
  );
}
