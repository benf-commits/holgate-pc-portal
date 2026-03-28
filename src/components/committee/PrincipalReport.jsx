import { FileText, Clock } from 'lucide-react';
import TabBar from '../shared/TabBar';
import DotList from '../shared/DotList';
import Avatar from '../shared/Avatar';
import data from '../../data/committee-principal.json';

function FullReportPanel() {
  if (!data.fullReport?.sections) return null;

  return (
    <div className="prose">
      {data.fullReport.sections.map((section, i) => (
        <div key={i} style={{ marginTop: i === 0 ? 0 : 20 }}>
          <p><strong>{section.heading}</strong></p>
          <ul className="dot-list" style={{ margin: '8px 0 0' }}>
            {section.points.map((point, j) => (
              <li key={j}>{point}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function WaitingPanel() {
  if (!data.waitingOnSchool?.length) {
    return (
      <p style={{ padding: '16px 0', color: 'var(--text-muted)', fontSize: 14 }}>
        No items waiting on the school.
      </p>
    );
  }

  return (
    <div>
      {data.waitingOnSchool.map((item, i) => (
        <div className="action-row" key={i}>
          <Avatar id="VG" />
          <div className="action-content">
            <div className="action-name">{item.description}</div>
            <div className="action-meta">
              {item.owner}
              {item.note && ` \u00b7 ${item.note}`}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function PrincipalReport() {
  const tabs = [
    {
      id: 'full',
      label: 'Full Report',
      icon: <FileText size={14} style={{ opacity: 0.5 }} />,
      content: <FullReportPanel />,
    },
    {
      id: 'school',
      label: 'Waiting on School',
      icon: <Clock size={14} style={{ opacity: 0.5 }} />,
      count: data.waitingOnSchool?.length,
      content: <WaitingPanel />,
    },
  ];

  return (
    <section className="section principal-section">
      <div className="section-inner">
        <div className="reveal">
          <h2 className="section-heading">Principal's Report</h2>
          <DotList items={data.summaryPoints} accentDots className="principal-summary" />
        </div>

        <div className="principal-content reveal">
          <TabBar
            tabs={tabs}
            tabsClass="principal-tabs"
            tabClass="principal-tab"
            countClass="principal-tab-count"
            panelClass="principal-panel"
          />
        </div>
      </div>
    </section>
  );
}
