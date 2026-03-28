export default function CommitteeIntro() {
  const base = import.meta.env.BASE_URL;

  return (
    <section className="committee-intro">
      <div className="section-inner">
        <div className="committee-intro-content">
          <div className="committee-intro-text">
            <h2 className="committee-intro-heading">Your committee at a glance</h2>
            <p className="committee-intro-body">
              This portal keeps everything from our P&C meetings in one place — what was decided, who's doing what, and what's coming next. It's updated after each meeting so you always have the latest picture.
            </p>
            <ul className="committee-intro-guide">
              <li><strong>Last Meeting</strong> — summary, full minutes, decisions, and action items</li>
              <li><strong>Open Tasks</strong> — what needs doing and who owns it</li>
              <li><strong>Next Meeting</strong> — date, time, and expected agenda</li>
              <li><strong>P&C Areas</strong> — current status of canteen, uniforms, grants, events, finance, and governance</li>
              <li><strong>Principal's Report</strong> — school updates and items we're waiting on</li>
            </ul>
          </div>
          <div className="committee-intro-image">
            <img
              src={`${base}images/school-building.jpg`}
              alt="Holgate Public School — Est. 1928"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
