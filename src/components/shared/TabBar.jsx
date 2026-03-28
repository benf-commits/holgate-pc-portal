import { useState } from 'react';

export default function TabBar({
  tabs,
  tabsClass = 'hero-tabs',
  tabClass = 'hero-tab',
  countClass = 'hero-tab-count',
  panelClass = 'hero-panel',
}) {
  const [active, setActive] = useState(tabs[0]?.id);

  return (
    <div>
      <div className={tabsClass} role="tablist">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`${tabClass} ${active === tab.id ? 'active' : ''}`}
            role="tab"
            aria-selected={active === tab.id}
            onClick={() => setActive(tab.id)}
          >
            {tab.icon}
            {tab.label}
            {tab.count != null && <span className={countClass}>{tab.count}</span>}
          </button>
        ))}
      </div>
      {tabs.map(tab => (
        <div
          key={tab.id}
          className={`${panelClass} ${active === tab.id ? 'active' : ''}`}
          role="tabpanel"
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
