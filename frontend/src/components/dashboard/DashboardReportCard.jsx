import { CalendarDays, MapPin, Trash2 } from "lucide-react"
import { Link } from "react-router-dom"
import StatusBadge from "../StatusBadge"
import { motion } from "framer-motion"

export default function DashboardReportCard({ report, handleDelete   }) {

  if (!report) return null

  const isClaimed =
    report.status === "claimed" || report.status === "taken"

  const buttonText =
    report.status === "claimed"
      ? "Already Claimed"
      : report.status === "taken"
        ? "Already Taken"
        : "Edit Report"

        

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition"
    >


      <div className="relative h-52 overflow-hidden">

        <img
          src={report.image}
          alt={report.name}
          className="w-full h-full object-cover"
        />

        <div className="absolute top-3 right-3">
          <StatusBadge status={report.status} />
        </div>

      </div>


      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>

            <h1 className="font-bold text-lg text-gray-800 leading-tight">
              {report.name}
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              {report.location?.name}
            </p>

          </div>

          <button
            onClick={() => handleDelete(report.id)}
            className="p-2 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition"
          >
            <Trash2 size={18} />
          </button>

        </div>

        <div className="mt-4 space-y-2 text-sm text-gray-500">

          <p className="flex items-center gap-2">
            <CalendarDays size={16} />
            <span>
              Reported: {new Date(report.date).toLocaleDateString()}
            </span>
          </p>

          <p className="flex items-center gap-2">
            <MapPin size={16} />
            <span>
              Last Seen: {report.location?.name}
            </span>
          </p>

        </div>
        <Link to={`/items/edit/${report.id}`}>
          <button
            claimed={isClaimed}
            className={`w-full rounded-xl py-2.5 mt-5 transition font-medium
      ${isClaimed
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "border border-blue-300 text-blue-700 hover:bg-blue-50"
              }
    `}
          >
            {buttonText}
          </button>
        </Link>

      </div>

    </motion.div>
  )
}