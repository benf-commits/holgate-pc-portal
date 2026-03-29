export default function NewsCard({ item }) {
  const sourceClass = item.source === 'pc' ? 'news-card-source--pc' : 'news-card-source--school';
  const sourceLabel = item.source === 'pc' ? 'P&C Update' : 'School News';
  const dateStr = new Date(item.date).toLocaleDateString('en-AU', { month: 'long', year: 'numeric' });

  return (
    <div className="news-card">
      <div className={`news-card-source ${sourceClass}`}>{sourceLabel}</div>
      <div className="news-card-title">{item.title}</div>
      <div className="news-card-body">{item.body}</div>
      <div className="news-card-date">{dateStr}</div>
    </div>
  );
}
