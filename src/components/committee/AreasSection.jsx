import { useState } from 'react';
import AreaCard from './AreaCard';
import areasData from '../../data/committee-areas.json';

export default function AreasSection() {
  const [expanded, setExpanded] = useState(null);

  return (
    <section className="section areas-section">
      <div className="section-inner">
        <div className="reveal">
          <h2 className="section-heading">P&C Areas</h2>
        </div>
        <div className="areas-grid">
          {areasData.map(area => (
            <AreaCard
              key={area.id}
              area={area}
              isExpanded={expanded === area.id}
              onToggle={() => setExpanded(expanded === area.id ? null : area.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
