import StatusBadge from "./StatusBadge"
import { motion } from "framer-motion"
export default function ItemCard({ item }) {

  if (!item) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true }}
      className="w-87.5 bg-[#f3f3f3] rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition"
    >

     
      <div className="h-47.5 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover blur-sm scale-110"
        />
      </div>

      <div className="p-2">

        <div className="flex items-center justify-between gap-2">

          <div>
            <h2 className="text-[13px] font-semibold text-gray-800 leading-tight">
              {item.name}
            </h2>

            <p className="text-[11px] text-gray-500 mt-0.5">
              {item.location?.name}
            </p>
          </div>

          <StatusBadge status={item.status} />

        </div>
      </div>
    </motion.div>
  )
}