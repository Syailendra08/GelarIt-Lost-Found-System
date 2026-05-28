import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Trash2, RotateCcw } from "lucide-react";
import LoadingComp from "../../../components/LoadingComp";
import { useNavigate } from "react-router-dom";

import {
    getTrashRequests,
    forceDeleteRequest,
    restoreRequest,
} from "../../../api/request.api";

export default function TrashRequest() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function fetchTrash() {
        try {
            setLoading(true);

            const result = await getTrashRequests();

            setRequests(result.data?.data || []);
        } catch (error) {
            console.log(error);

            Swal.fire({
                icon: "error",
                title: "Failed fetch trash requests",
            });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchTrash();
    }, []);

    async function handleRestore(id) {
        const confirm = await Swal.fire({
            title: "Restore this request?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#2563EB",
        });

        if (!confirm.isConfirmed) return;

        try {
            const result = await restoreRequest(id);

            Swal.fire({
                icon: "success",
                title: result.data?.message || "Restore success",
                timer: 1500,
                showConfirmButton: false,
            });

            fetchTrash();
        } catch (error) {
            console.log(error);

            Swal.fire({
                icon: "error",
                title: "Failed restore request",
            });
        }
    }

    async function handleForceDelete(id) {
        const confirm = await Swal.fire({
            title: "Permanent delete request?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DC2626",
        });

        if (!confirm.isConfirmed) return;

        try {
            const result = await forceDeleteRequest(id);

            Swal.fire({
                icon: "success",
                title: result.data?.message || "Delete success",
                timer: 1500,
                showConfirmButton: false,
            });

            fetchTrash();
        } catch (error) {
            console.log(error);

            Swal.fire({
                icon: "error",
                title: "Failed delete request",
            });
        }
    }

    return (
        <div className="p-6">
            <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
                    <h1 className="text-xl font-bold text-[#0F172A]">Trash Requests</h1>

                    <button
                        onClick={() => navigate("/admin/request-management")}
                        className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
                    >
                        Back
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-225">
                        <thead className="bg-[#F8FAFC]">
                            <tr>
                                <th className="px-6 py-4 text-left text-[11px] font-bold uppercase text-gray-400">
                                    ID
                                </th>
                                <th className="px-6 py-4 text-left text-[11px] font-bold uppercase text-gray-400">
                                    Requester
                                </th>
                                <th className="px-6 py-4 text-left text-[11px] font-bold uppercase text-gray-400">
                                    Item
                                </th>
                                <th className="px-6 py-4 text-left text-[11px] font-bold uppercase text-gray-400">
                                    Deleted At
                                </th>
                                <th className="px-6 py-4 text-left text-[11px] font-bold uppercase text-gray-400">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-10">
                                        <LoadingComp />
                                    </td>
                                </tr>
                            ) : requests.length > 0 ? (
                                requests.map((r) => (
                                    <tr
                                        key={r.id}
                                        className="border-t border-gray-100 hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-5 text-sm text-gray-600">
                                           { r.id}
                                        </td>

                                        <td className="px-6 py-5 text-sm text-gray-600">
                                            {r.user?.name || "-"}
                                        </td>

                                        <td className="px-6 py-5 text-sm text-gray-600">
                                            {r.item?.name || "-"}
                                        </td>

                                        <td className="px-6 py-5 text-sm text-gray-600">
                                            {r.deletedAt
                                                ? new Date(r.deletedAt).toLocaleDateString()
                                                : "-"}
                                        </td>

                                        <td className="px-6 py-5">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleRestore(r.id)}
                                                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600 hover:bg-blue-100"
                                                >
                                                    <RotateCcw size={16} />
                                                </button>

                                                <button
                                                    onClick={() => handleForceDelete(r.id)}
                                                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-100 bg-red-50 text-red-600 hover:bg-red-100"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="px-6 py-10 text-center text-sm text-gray-400"
                                    >
                                        No trash data found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
