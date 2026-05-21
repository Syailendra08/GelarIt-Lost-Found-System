import { ArrowLeft, MapPin } from "lucide-react";
import StatusBadge from "../StatusBadge";
import { Navigate, useNavigate } from "react-router-dom";

export default function ItemDetailCard({ item }) {
    const Navigate = useNavigate();
    return (
        <div className="min-h-screen bg-[#ffffff] p-4 md:p-8">
            
            <button onClick={() => Navigate(-1)} className="mb-5 flex items-center gap-2 text-sm text-[#5c5470] transition hover:text-black">
                <ArrowLeft size={16} />
                Back to Gallery
            </button>

            <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-[1.45fr_0.9fr]">
            
                <div className="relative h-[320px] md:h-[500px]">
                    <img
                        src={item?.image}
                        alt={item?.name}
                        className="rounded-xl h-full w-full object-cover"
                    />
                </div>

    
                  <div className="rounded-2xl bg-[#f4f2fc] p-6 shadow-sm md:p-7">
                    
                    <div>
                 
                        <div className="mb-6 flex items-center justify-between">
                            <StatusBadge status={item?.status} />
                               
                           

                            <p className="text-xs text-gray-500">
                                
                            </p>
                        </div>

                        {/* TITLE */}
                        <h1 className="max-w-md text-4xl font-bold leading-tight text-[#111827]">
                            {item?.name}
                        </h1>

                        {/* LOCATION */}
                        <div className="mt-4 flex items-center gap-2 text-sm text-[#4f46e5]">
                            <MapPin size={15} />

                            <span>
                                {item?.location?.name || "Unknown Location"}
                            </span>
                        </div>

                        <div className="mt-8 min-h-[140px]">
                            <h2 className="mb-1 text-sm font-medium text-gray-700">
                                Description
                            </h2>

                            <p className="max-w-lg leading-8 text-gray-600">
                                {item?.description}
                            </p>
                        </div>
                    </div>

                    {/* BOTTOM */}
                    <div className="mt-10 border-t border-gray-300 pt-5">
                        <div className="grid grid-cols-2 gap-6">
                            
                            {/* DATE */}
                            <div>
                                <p className="mb-1 text-xs uppercase tracking-[0.2em] text-gray-500">
                                    Date Found
                                </p>

                                <p className="font-medium text-gray-800">
                                    {item?.date
                                        ? new Date(item.date).toLocaleDateString(
                                              "en-US",
                                              {
                                                  day: "numeric",
                                                  month: "long",
                                                  year: "numeric",
                                              }
                                          )
                                        : "-"}
                                </p>
                            </div>

                            <div>
                                <p className="mb-1 text-xs uppercase tracking-[0.2em] text-gray-500">
                                    Category
                                </p>

                                <p className="font-medium text-gray-800">
                                    {item?.category?.name || "-"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}