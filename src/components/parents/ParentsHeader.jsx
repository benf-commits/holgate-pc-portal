import { ArrowUpRight } from 'lucide-react';

export default function ParentsHeader() {
  const base = import.meta.env.BASE_URL;
  return (
    <header
      className="committee-hero-banner"
      style={{ backgroundImage: `url(${base}images/school-building.jpg)` }}
    >
      <div className="committee-hero-banner-overlay" />
      <div className="committee-hero-banner-content section-inner">
        <div className="committee-hero-brand">
          <img src={`${base}images/holgate-logo.png`} alt="Holgate P.S." className="committee-hero-crest" />
          <div>
            <div className="committee-hero-title">Holgate P&C</div>
            <div className="committee-hero-subtitle">Parents & Citizens Association</div>
          </div>
        </div>
        <a href="#/committee" className="committee-hero-portal-link">
          Committee Portal <ArrowUpRight size={14} strokeWidth={2.5} />
        </a>
      </div>
      <div className="committee-hero-banner-fade" />
    </header>
  );
}
