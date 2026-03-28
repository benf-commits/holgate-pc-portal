import { useState } from 'react';
import TaskRow from './TaskRow';
import data from '../../data/committee-tasks.json';

export default function OpenTasks() {
  const [activeTab, setActiveTab] = useState('recent');

  const progressPct = data.total > 0
    ? Math.round((data.completedThisMonth / data.total) * 100)
    : 0;

  // Extract meeting name from first recent task's origin for the tab label
  const recentLabel = data.recent?.[0]?.origin
    ? `From ${data.recent[0].origin} meeting`
    : 'Recent';

  return (
    <section className="section tasks-section">
      <div className="section-inner">
        <div className="reveal">
          <div className="tasks-top">
            <h2 className="section-heading">
              Open Tasks<span className="count-badge">{data.total}</span>
            </h2>
            <span className="tasks-progress-text">
              {data.completedThisMonth} of {data.total} completed this month
            </span>
          </div>

          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progressPct}%` }} />
          </div>

          <div className="task-tabs" role="tablist">
            <button
              className={`task-tab ${activeTab === 'recent' ? 'active' : ''}`}
              role="tab"
              aria-selected={activeTab === 'recent'}
              onClick={() => setActiveTab('recent')}
            >
              <span className="task-tab-dot task-tab-dot--recent" />
              {recentLabel}
              <span className="task-tab-count">{data.recent?.length || 0}</span>
            </button>
            <button
              className={`task-tab ${activeTab === 'carried' ? 'active' : ''}`}
              role="tab"
              aria-selected={activeTab === 'carried'}
              onClick={() => setActiveTab('carried')}
            >
              <span className="task-tab-dot task-tab-dot--carried" />
              Carried forward
              <span className="task-tab-count">{data.carriedForward?.length || 0}</span>
            </button>
          </div>
          <div className="tasks-divider" />

          <div className={`task-panel ${activeTab === 'recent' ? 'active' : ''}`} role="tabpanel">
            {data.recent?.map(task => (
              <TaskRow key={task.id} task={task} indicator="recent" />
            ))}
          </div>

          <div className={`task-panel ${activeTab === 'carried' ? 'active' : ''}`} role="tabpanel">
            {data.carriedForward?.length > 0 ? (
              data.carriedForward.map(task => (
                <TaskRow key={task.id} task={task} indicator="carried" />
              ))
            ) : (
              <p style={{ padding: '24px 0', color: 'var(--text-muted)', fontSize: 14 }}>
                No carried forward tasks.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
