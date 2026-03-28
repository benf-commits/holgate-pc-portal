import meta from '../../data/meta.json';

export default function CommitteeFooter() {
  return (
    <footer className="section footer-section">
      <div className="footer-inner">
        <a href="#/">Parents Portal</a>
        <span className="footer-sep">&middot;</span>
        holgate.pandc@gmail.com
        <span className="footer-sep">&middot;</span>
        Updated {meta.lastUpdated}
      </div>
    </footer>
  );
}
