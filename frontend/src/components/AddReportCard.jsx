import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AddReportCard() {

    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate("/items/create")}
            className="flex min-h-80 w-full flex-col items-center justify-center  rounded-2xl border-2 border-dashed  border-gray-300 bg-[#f8f8fb] p-6 text-center transition  hover:border-[#00288E] hover:bg-white">

           
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#E5EAFE]">
                <Plus
                    size={32}
                    className="text-[#00288E]"
                />
            </div>

            <h3 className="text-xl font-bold text-[#0F172A]">
                Report New Item
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-gray-500">

                Lost something else?
                <br />
                Submit a new report.
            </p>
        </button>
    );
}