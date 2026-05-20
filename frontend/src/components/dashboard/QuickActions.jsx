import { BookCheck, CirclePlus, Search } from "lucide-react";
import { Link } from "react-router-dom";

export default function QuickActions() {

  return (
    <div className="grid grid-cols-3 gap-5 mt-7">
      <Link to= "/items/create">
      <div className="bg-[#facc15] rounded-2xl h-36 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition">

        <div className="w-11 h-11 rounded-full bg-yellow-400 flex items-center justify-center mb-4">
          <CirclePlus />
        </div>

        <h1 className="font-semibold text-gray-800">
          Report Lost & Found Item
        </h1>

      </div>
      </Link>

      <div className="bg-[#1d4ed8] rounded-2xl h-36 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition">

        <div className="w-11 h-11 rounded-full bg-blue-400 flex items-center justify-center mb-4 text-white">
          <Search />
        </div>

        <h1 className="font-semibold text-white">
          View Found Items
        </h1>

      </div>

      <div className="bg-[#e5e7eb] rounded-2xl h-36 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition">

        <div className="w-11 h-11 rounded-full bg-gray-200 flex items-center justify-center mb-4">
          <BookCheck />
        </div>

        <h1 className="font-semibold text-blue-900">
          Check My Claims
        </h1>

      </div>

    </div>
  )
}