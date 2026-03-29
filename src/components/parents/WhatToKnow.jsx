import NewsCard from './NewsCard';
import news from '../../data/parents-news.json';

export default function WhatToKnow() {
  return (
    <section className="section section--page">
      <div className="section-inner">
        <h2 className="section-heading">What you need to know</h2>
        <p className="section-subheading">Latest news and updates from school and the P&C</p>
        <div className="news-grid">
          {news.map(item => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
