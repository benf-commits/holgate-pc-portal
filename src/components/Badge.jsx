const variantStyles = {
  success: 'bg-green-100 text-green-800',
  warning: 'bg-red-100 text-red-800',
  info: 'bg-blue-100 text-blue-800',
  neutral: 'bg-gray-100 text-gray-700',
  spending: 'bg-amber-100 text-amber-800',
  policy: 'bg-purple-100 text-purple-800',
  election: 'bg-indigo-100 text-indigo-800',
  operational: 'bg-maroon-100 text-maroon-800',
}

export default function Badge({ label, variant = 'neutral' }) {
  const styles = variantStyles[variant] || variantStyles.neutral

  return (
    <span
      className={`inline-block px-2.5 py-0.5 text-xs font-medium rounded-full ${styles}`}
    >
      {label}
    </span>
  )
}
