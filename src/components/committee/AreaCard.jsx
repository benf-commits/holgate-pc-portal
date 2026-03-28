import { ChevronDown } from 'lucide-react';

export default function AreaCard({ area, isExpanded, onToggle }) {
  return (
    <div className={`area-card ${isExpanded ? 'expanded' : ''}`}>
      <button className="area-trigger" aria-expanded={isExpanded} onClick={onToggle}>
        <div className={`area-color-bar area-color-bar--${area.id}`} />
        <div className="area-info">
          <div className="area-name">{area.name}</div>
          <div className="area-oneliner">{area.oneLiner}</div>
        </div>
        <span className={`area-pill area-pill--${area.statusType}`}>{area.status}</span>
        <ChevronDown className="area-chevron" size={20} />
      </button>
      <div className="area-body">
        <div className="area-body-inner">
          <ul className="dot-list" style={{ marginBottom: 16 }}>
            {area.summaryPoints.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
          {area.openItems.length > 0 && (
            <>
              <div className="area-open-label">Open items</div>
              <ul className="area-open-list">
                {area.openItems.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
