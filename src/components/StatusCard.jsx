import { Link } from 'react-router-dom'

export default function StatusCard({ label, value, subtext, accentColor, to }) {
  return (
    <Link
      to={to}
      className="block bg-white rounded-lg shadow-[0_2px_8px_rgba(74,21,37,0.06)] no-underline transition-shadow hover:shadow-[0_4px_12px_rgba(74,21,37,0.12)]"
    >
      <div className="border-t-[3px] rounded-t-lg" style={{ borderColor: accentColor }} />
      <div className="px-5 py-4">
        <div className="text-[10px] font-bold uppercase tracking-[1.5px] text-gold-500 mb-1">
          {label}
        </div>
        <div className="text-2xl font-bold text-text-primary">{value}</div>
        {subtext && <div className="text-xs text-text-secondary mt-1">{subtext}</div>}
      </div>
    </Link>
  )
}
