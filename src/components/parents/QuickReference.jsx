import reference from '../../data/parents-reference.json';

const SECTION_ORDER = ['canteen', 'uniforms', 'contacts', 'links'];
const TITLES = { canteen: 'Canteen', uniforms: 'Uniforms', contacts: 'School contacts', links: 'Key links' };

export default function QuickReference() {
  return (
    <section className="section section--warm">
      <div className="section-inner">
        <h2 className="section-heading">Quick reference</h2>
        <p className="section-subheading">The essentials, easy to find</p>
        <div className="ref-grid">
          {SECTION_ORDER.map(key => {
            const section = reference[key];
            if (!section) return null;
            return (
              <div key={key} className="ref-card">
                <div className="ref-card-title">{TITLES[key] || section.title}</div>
                {section.items.map((item, i) => (
                  <div key={i} className="ref-item">
                    <strong>{item.label}:</strong>{' '}
                    {item.link
                      ? <a href={item.link} className="ref-link" target="_blank" rel="noopener noreferrer">{item.value.replace(/^https?:\/\//, '').split('/')[0]}</a>
                      : item.value}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
