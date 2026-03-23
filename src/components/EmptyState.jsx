export default function EmptyState({ message }) {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="bg-white rounded-lg shadow-[0_2px_8px_rgba(74,21,37,0.06)] px-8 py-10 text-center max-w-sm w-full">
        <p className="text-text-secondary text-sm">{message}</p>
      </div>
    </div>
  )
}
