const variants = {
  carried: 'bg-carried-bg text-carried-text',
  open: 'bg-open-bg text-open-text',
  defeated: 'bg-defeated-bg text-defeated-text',
  overdue: 'bg-overdue text-white',
  neutral: 'bg-neutral-bg text-neutral-text',
  meeting: 'bg-meeting/10 text-meeting',
  action: 'bg-action/10 text-action',
  decision: 'bg-decision/10 text-decision',
  document: 'bg-document/10 text-document',
}

export default function Badge({ label, variant = 'neutral' }) {
  const style = variants[variant] || variants.neutral
  return (
    <span className={`inline-block px-2 py-0.5 text-[9px] font-bold rounded-full whitespace-nowrap ${style}`}>
      {label}
    </span>
  )
}
