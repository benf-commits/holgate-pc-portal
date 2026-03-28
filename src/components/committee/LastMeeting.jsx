import { FileText, CheckCircle2, CircleCheck } from 'lucide-react';
import TabBar from '../shared/TabBar';
import DotList from '../shared/DotList';
import Avatar from '../shared/Avatar';
import data from '../../data/committee-meeting.json';

function MinutesPanel() {
  const attendeeNames = data.attendance
    ?.filter(a => a.name)
    .map(a => a.name)
    .join(', ');

  const minutesContent = data.minutesPoints || null;

  return (
    <div className="prose">
      {attendeeNames && (
        <p><strong>Attended:</strong> {attendeeNames}</p>
      )}
      {minutesContent ? (
        minutesContent.map((section, i) => (
          <div key={i} style={{ marginTop: i === 0 && !attendeeNames ? 0 : 12 }}>
            <p><strong>{section.topic}</strong></p>
            <ul className="dot-list" style={{ margin: '8px 0 0' }}>
              {section.points.map((point, j) => (
                <li key={j}>{point}</li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <div style={{ marginTop: 12 }}>
          <p><strong>Key Points</strong></p>
          <DotList items={data.summaryPoints} />
        </div>
      )}
    </div>
  );
}

function DecisionsPanel() {
  return (
    <div>
      {data.decisions?.map(decision => (
        <div className="decision-row" key={decision.id}>
          <span className={`badge badge--${decision.result}`}>
            {decision.result}
          </span>
          <div>
            <div className="decision-text">{decision.title}</div>
            {(decision.movedBy || decision.secondedBy) && (
              <div className="decision-meta">
                {decision.movedBy && `Moved ${decision.movedBy}`}
                {decision.movedBy && decision.secondedBy && ' \u00b7 '}
                {decision.secondedBy && `Seconded ${decision.secondedBy}`}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function ActionsPanel() {
  return (
    <div>
      {data.actions?.map(action => {
        const primaryOwner = action.owners?.[0] || action.owner || {};
        const ownerDisplay = action.owners
          ? action.owners.map(o => {
              const parts = [o.name];
              if (o.role) parts.push(`(${o.role})`);
              return parts.join(' ');
            }).join(', ')
          : [primaryOwner.name, primaryOwner.role && `(${primaryOwner.role})`].filter(Boolean).join(' ');

        return (
          <div className="action-row" key={action.id}>
            <Avatar id={primaryOwner.id} />
            <div className="action-content">
              <div className="action-name">{action.description}</div>
              <div className="action-meta">
                {ownerDisplay}
                {action.timing && ` \u00b7 ${action.timing}`}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function LastMeeting() {
  const tabs = [
    {
      id: 'minutes',
      label: 'Full Minutes',
      icon: <FileText size={15} style={{ opacity: 0.5 }} />,
      content: <MinutesPanel />,
    },
    {
      id: 'decisions',
      label: 'Decisions',
      icon: <CheckCircle2 size={15} style={{ opacity: 0.5 }} />,
      count: data.decisions?.length,
      content: <DecisionsPanel />,
    },
    {
      id: 'actions',
      label: 'Actions',
      icon: <CircleCheck size={15} style={{ opacity: 0.5 }} />,
      count: data.actions?.length,
      content: <ActionsPanel />,
    },
  ];

  return (
    <section className="section hero">
      <div className="section-inner">
        <div className="reveal">
          <div className="hero-label">Last Meeting</div>
          <h1 className="hero-date">{data.title}</h1>
          <DotList items={data.summaryPoints} accentDots className="hero-summary" />
        </div>

        <div className="hero-content reveal">
          <TabBar tabs={tabs} />
        </div>
      </div>
    </section>
  );
}
