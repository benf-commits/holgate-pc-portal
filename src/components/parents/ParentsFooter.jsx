import meta from '../../data/meta.json';

export default function ParentsFooter() {
  const base = import.meta.env.BASE_URL;
  return (
    <footer className="section footer-section">
      <div className="footer-inner section-inner">
        <img src={`${base}images/holgate-logo.png`} alt="Holgate P.S." className="footer-logo" />
        <div>
          holgate.pandc@gmail.com
          <span className="footer-sep">&middot;</span>
          Updated {meta.lastUpdated}
        </div>
      </div>
    </footer>
  );
}
