import NewsCard from './NewsCard';
import news from '../../data/parents-news.json';

export default function WhatToKnow() {
  const pcNews = news.filter(n => n.source === 'pc');
  const schoolNews = news.filter(n => n.source === 'school');

  return (
    <section id="what-to-know" className="section section--page">
      <div className="section-inner">
        <h2 className="section-heading">What you need to know</h2>
        <p className="section-subheading">Latest news and updates from school and the P&C</p>

        {pcNews.length > 0 && (
          <>
            <div className="event-group-label">P&C Updates</div>
            <div className="news-grid">
              {pcNews.map(item => (
                <NewsCard key={item.id} item={item} />
              ))}
            </div>
          </>
        )}

        {schoolNews.length > 0 && (
          <>
            <div className="event-group-label" style={{ marginTop: 36 }}>School News</div>
            <div className="news-grid">
              {schoolNews.map(item => (
                <NewsCard key={item.id} item={item} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
