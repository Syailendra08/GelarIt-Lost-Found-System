import { useContext, useEffect, useState } from "react";
import { Search } from "lucide-react";
import DashboardReportList from "../../components/dashboard/DashboardReportList";
import { deleteItem, getItemsByUser } from "../../api/item.api";
import { AuthContext } from "../../contexts/AuthContext";
import Swal from "sweetalert2";

export default function MyReport() {

    const { user } = useContext(AuthContext);
    const [reports, setReports] = useState([]);
    const [activeTab, setActiveTab] =
        useState("all");
    const [search, setSearch] =
        useState("");
   


    async function fetchReports(
        userId
    ) {

        try {

            
            const result =
                await getItemsByUser(
                    userId,
                    {
                        sortBy: "createdAt",
                        order: "DESC",
                    }
                );

            setReports(
                result.data?.data || []
            );

        } catch (error) {

            console.log(error);

        } finally {

          

        }

    }
    
    const handleDelete = async (id) => {

    const result = await Swal.fire({
        title: "Delete Report?",
        text: "Are you sure want to delete this report?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#4f46e5",
        cancelButtonColor: "#ef4444",
        confirmButtonText: "Yes, delete it",
        cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {

        await deleteItem(id);

        Swal.fire({
            icon: "success",
            title: "Report deleted successfully",
            timer: 1500,
            showConfirmButton: false,
        });

        fetchReports(user.id);

    } catch (error) {

        console.log(error);

        Swal.fire({
            icon: "error",
            title: "Failed to delete report",
            timer: 1500,
            showConfirmButton: false,
        });

    }

};

    useEffect(() => {

        if (user?.id) {
            fetchReports(user.id);
        }

    }, [user]);

    // ====================================
    // FILTER REPORTS
    // ====================================
    const filteredReports =
        reports.filter((item) => {

            const matchSearch =
                item.name
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    ) ||
                item.location?.name
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    );

            const matchTab = (() => {

                if (activeTab === "all") {
                    return true;
                }

                if (activeTab === "lost") {
                    return item.status === "lost";
                }

                if (activeTab === "found") {
                    return item.status === "found";
                }

                return [
                    "claimed",
                    "taken",
                ].includes(item.status);

            })();
            return (
                matchSearch && matchTab
            );

        });

    return (
        <div className="min-h-screen bg-[#f6f7fb] px-5 py-7 md:px-8">
            <div className="mb-7">

                <h1 className="text-4xl font-bold text-[#0F172A]">
                    My Reports
                </h1>

                <p className="mt-2 text-sm text-gray-500">

                    Manage and track the
                    status of items you've
                    lost or found within the
                    campus grounds.

                </p>
            </div>
            <div className="mb-7 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div className="flex w-fit items-center rounded-2xl bg-[#ECECF4] p-1">



                    <button
                        onClick={() =>
                            setActiveTab("all")
                        }
                        className={`rounded-xl px-5 py-2 text-sm font-semibold transition ${activeTab === "all"
                            ? "bg-[#00288E] text-white shadow-sm"
                            : "text-gray-500 hover:text-gray-700"
                            }`}
                    >

                        All Reports

                    </button>
                    <button
                        onClick={() =>
                            setActiveTab("lost")
                        }
                        className={`rounded-xl px-5 py-2 text-sm font-semibold transition ${activeTab === "lost"
                            ? "bg-[#00288E] text-white shadow-sm"
                            : "text-gray-500 hover:text-gray-700"
                            }`}
                    >

                        Lost Reports

                    </button>

                    <button
                        onClick={() =>
                            setActiveTab("found")
                        }
                        className={`rounded-xl px-5 py-2 text-sm font-semibold transition ${activeTab === "found"
                            ? "bg-[#00288E] text-white shadow-sm"
                            : "text-gray-500 hover:text-gray-700"
                            }`}
                    >

                        Found Reports

                    </button>

                </div>

                <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
                    <Search
                        size={18}
                        className="text-gray-400"
                    />

                    <input
                        type="text"
                        placeholder="Search by item name or location..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        className="w-65 bg-transparent text-sm outline-none placeholder:text-gray-400"
                    />

                </div>
            </div>

            <DashboardReportList reports={filteredReports} handleDelete={handleDelete} className="grid-cols-3"/>
        </div>
    );
}