import { Calendar, Newspaper, HandHeart, BookOpen } from 'lucide-react';

export default function ParentsWelcome() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="committee-hero-nav">
      <div className="section-inner">
        <p className="committee-hero-welcome">
          Your go-to for everything happening at Holgate Public School — events, news, ways to get involved, and all the info you need as a parent. Jump straight to a section:
        </p>
        <div className="committee-hero-grid">
          <button className="committee-hero-card" onClick={() => scrollTo('whats-coming-up')}>
            <div className="committee-hero-card-icon committee-hero-card-icon--meeting">
              <Calendar size={22} />
            </div>
            <div className="committee-hero-card-body">
              <div className="committee-hero-card-title">What's coming up</div>
              <div className="committee-hero-card-meta">School and P&C events for the weeks ahead</div>
            </div>
          </button>

          <button className="committee-hero-card" onClick={() => scrollTo('what-to-know')}>
            <div className="committee-hero-card-icon committee-hero-card-icon--areas">
              <Newspaper size={22} />
            </div>
            <div className="committee-hero-card-body">
              <div className="committee-hero-card-title">What you need to know</div>
              <div className="committee-hero-card-meta">Latest news from school and the P&C</div>
            </div>
          </button>

          <button className="committee-hero-card" onClick={() => scrollTo('how-to-help')}>
            <div className="committee-hero-card-icon committee-hero-card-icon--tasks">
              <HandHeart size={22} />
            </div>
            <div className="committee-hero-card-body">
              <div className="committee-hero-card-title">How can I help</div>
              <div className="committee-hero-card-meta">Volunteer, donate, sponsor, get involved</div>
            </div>
          </button>

          <button className="committee-hero-card" onClick={() => scrollTo('quick-reference')}>
            <div className="committee-hero-card-icon committee-hero-card-icon--principal">
              <BookOpen size={22} />
            </div>
            <div className="committee-hero-card-body">
              <div className="committee-hero-card-title">Quick reference</div>
              <div className="committee-hero-card-meta">Canteen, uniforms, contacts, key links</div>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
