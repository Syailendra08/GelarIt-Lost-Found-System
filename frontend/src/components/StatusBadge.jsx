export default function StatusBadge({ status }) {
  const colors = {
    lost: "bg-yellow-400",
    found: "bg-orange-400",
    returned: "bg-green-500",
  }

  return (
    <span
      className={`${colors[status]} text-white text-xs px-3 py-1 rounded-full`}
    >
      {status.toUpperCase()}
    </span>
  )
}