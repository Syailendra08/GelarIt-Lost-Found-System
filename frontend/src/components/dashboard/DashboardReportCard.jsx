  import { CalendarDays, MapPin } from "lucide-react"
  import { Link } from "react-router-dom"
  import StatusBadge from "../StatusBadge"
  import { motion } from "framer-motion"

  export default function DashboardReportCard({ report }) {

    if (!report) return null

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

        {/* CONTENT */}
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

          </div>

          <div className="mt-4 space-y-2 text-sm text-gray-500">

            <p>
              <CalendarDays /> Reported: {
                new Date(report.date).toLocaleDateString()
              }
            </p>

            <p>
              <MapPin className="sm" /> Category: {report.category?.name}
            </p>

          </div>
  <Link to = {`/items/edit/${report.id}`}>
          <button className="w-full border border-blue-300 text-blue-700 rounded-xl py-2.5 mt-5 hover:bg-blue-50 transition font-medium">

            Edit Report

          </button>
          </Link>

        </div>

      </motion.div>
    )
  }