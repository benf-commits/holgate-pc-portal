export default function DotList({ items, accentDots = false, className = '' }) {
  if (!items || items.length === 0) return null;
  return (
    <ul className={`dot-list ${accentDots ? 'dot-list--accent' : ''} ${className}`}>
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}
