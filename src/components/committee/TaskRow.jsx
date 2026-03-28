import Avatar from '../shared/Avatar';

export default function TaskRow({ task, indicator = 'recent' }) {
  const primaryOwner = task.owners?.[0] || {};
  const ownerDisplay = task.owners?.map(o => {
    const parts = [o.name];
    if (o.role) parts.push(`(${o.role})`);
    return parts.join(' ');
  }).join(', ');

  return (
    <div className="task-row">
      <div className={`task-indicator task-indicator--${indicator}`} />
      <Avatar id={primaryOwner.id} />
      <div className="action-content">
        <div className="task-name">{task.description}</div>
        <div className="task-meta">
          {ownerDisplay}
          {task.origin && ` \u00b7 ${task.origin}`}
          {task.note && ` \u00b7 ${task.note}`}
        </div>
      </div>
    </div>
  );
}
