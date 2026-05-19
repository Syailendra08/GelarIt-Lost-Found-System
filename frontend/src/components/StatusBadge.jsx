export default function StatusBadge({ status }) {
  const colors = {
    lost: "bg-red-500",
    found: "bg-blue-500",
    taken: "bg-amber-500",
    claimed: "bg-emerald-600",
  }

  return (
    <span
      className={`${colors[status]} text-white text-xs px-3 py-1 rounded-full capitalize`}
    >
      {status}
    </span>
  )
}