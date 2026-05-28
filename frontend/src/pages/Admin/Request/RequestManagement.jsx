import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import {
    Check,
    X,
    HandHelping,
    Trash2,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import LoadingComp from "../../../components/LoadingComp";

import {
    getAllRequests,
    approveRequest,
    rejectRequest,
    markAsTaken,
    deleteRequest,
} from "../../../api/request.api";
import { useNavigate } from "react-router-dom";

export default function RequestManagement() {
    const navigate = useNavigate();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    const [pagination, setPagination] = useState({
        total: 0,
        totalPage: 1,
        rangeData: "0-0",
    });

    async function fetchRequests() {
        try {
            setLoading(true);

            const result = await getAllRequests({
                page,
                limit: 5,
                sortBy: "createdAt",
                order: "ASC",
            });

            setRequests(result.data?.data?.data || []);

            setPagination({
                total: result.data?.data.total || 0,
                totalPage: result.data?.data.totalPage || 1,
                rangeData: result.data?.data.rangeData || "0-0",
            });
        } catch (error) {
            console.log(error);

            Swal.fire({
                icon: "error",
                title: "Failed fetch requests",
            });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    const renderStatus = (status) => {
        const styles = {
            pending: "bg-orange-100 text-orange-700",
            approved: "bg-cyan-100 text-cyan-700",
            rejected: "bg-red-100 text-red-700",
            taken: "bg-emerald-100 text-emerald-700",
        };

        return (
            <span
                className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase ${styles[status] || "bg-gray-100 text-gray-600"
                    }`}
            >
                {status}
            </span>
        );
    };

    async function handleApprove(id) {
        try {
            const result = await approveRequest(id);

            Swal.fire({
                icon: "success",
                title: result.data?.message || "Request approved",
                timer: 1500,
                showConfirmButton: false,
            });

            fetchRequests();
        } catch (error) {
            console.log(error);

            Swal.fire({
                icon: "error",
                title: "Failed approve request",
            });
        }
    }

    async function handleReject(id) {
        try {
            const result = await rejectRequest(id);

            Swal.fire({
                icon: "success",
                title: result.data?.message || "Request rejected",
                timer: 1500,
                showConfirmButton: false,
            });

            fetchRequests();
        } catch (error) {
            console.log(error);

            Swal.fire({
                icon: "error",
                title: "Failed reject request",
            });
        }
    }

    async function handleTaken(id) {
        try {
            const result = await markAsTaken(id);

            Swal.fire({
                icon: "success",
                title: result.data?.message || "Item marked as taken",
                timer: 1500,
                showConfirmButton: false,
            });

            fetchRequests();
        } catch (error) {
            console.log(error);

            Swal.fire({
                icon: "error",
                title: "Failed mark as taken",
            });
        }
    }

    async function handleDelete(id) {
        const confirm = await Swal.fire({
            title: "Delete this request?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DC2626",
        });

        if (!confirm.isConfirmed) return;

        try {
            const result = await deleteRequest(id);

            Swal.fire({
                icon: "success",
                title: result.data?.message || "Delete request success",
                timer: 1500,
                showConfirmButton: false,
            });

            fetchRequests();
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

        <h1 className="text-xl font-bold text-[#0F172A]">
            Requests List
        </h1>

        <button
             onClick={() => navigate("/admin/requests/trash")}
            className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
        >

            <Trash2 size={16} />
            Trash

        </button>

    </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-225">
                        <thead className="bg-[#F8FAFC]">
                            <tr>
                                <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wide text-gray-400">
                                    ID
                                </th>

                                <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wide text-gray-400">
                                    Requester
                                </th>

                                <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wide text-gray-400">
                                    Item
                                </th>

                                <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wide text-gray-400">
                                    Status
                                </th>

                                <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wide text-gray-400">
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
                                requests.map((request, index) => (
                                    <tr
                                        key={request.id}
                                        className="border-t border-gray-100 transition hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-5 text-sm text-gray-600">
                                            {`REQ-${String((page - 1) * 6 + index + 1).padStart(3, "0")}`}
                                        </td>

                                        <td className="px-6 py-5 text-sm text-gray-600">
                                            {request.user?.name || "-"}
                                        </td>

                                        <td className="px-6 py-5 text-sm text-gray-600">
                                            {request.item?.name || "-"}
                                        </td>

                                        <td className="px-6 py-5 text-sm text-gray-600">
                                            {renderStatus(request.status)}
                                        </td>

                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2">
                                                {request.status === "pending" && (
                                                    <>
                                                        <button
                                                            onClick={() => handleApprove(request.id)}
                                                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-100 bg-cyan-50 text-cyan-700 transition hover:bg-cyan-100"
                                                        >
                                                            <Check size={16} />
                                                        </button>

                                                        <button
                                                            onClick={() => handleReject(request.id)}
                                                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-100 bg-red-50 text-red-600 transition hover:bg-red-100"
                                                        >
                                                            <X size={16} />
                                                        </button>
                                                    </>
                                                )}

                                                {request.status === "approved" && (
                                                    <button
                                                        onClick={() => handleTaken(request.id)}
                                                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-700 transition hover:bg-emerald-100"
                                                    >
                                                        <HandHelping size={16} />
                                                    </button>
                                                )}

                                                <button
                                                    onClick={() => handleDelete(request.id)}
                                                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-100 bg-red-50 text-red-600 transition hover:bg-red-100"
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
                                        No data found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="flex flex-col gap-4 border-t border-gray-100 px-6 py-4 md:flex-row md:items-center md:justify-between">
                    <p className="text-sm text-gray-400">
                        Showing {pagination.rangeData} of {pagination.total} results
                    </p>

                    <div className="flex items-center gap-2">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage((prev) => prev - 1)}
                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition hover:bg-gray-50 disabled:opacity-50"
                        >
                            <ChevronLeft size={16} />
                        </button>

                        {Array.from({ length: pagination.totalPage || 1 }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => setPage(index + 1)}
                                className={`flex h-9 min-w-9 items-center justify-center rounded-xl px-3 text-sm font-semibold transition ${page === index + 1
                                        ? "bg-[#00288E] text-white"
                                        : "border border-gray-200 bg-white text-gray-500 hover:bg-gray-50"
                                    }`}
                            >
                                {index + 1}
                            </button>
                        ))}

                        <button
                            disabled={page >= (pagination.totalPage || 1)}
                            onClick={() => setPage((prev) => prev + 1)}
                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition hover:bg-gray-50 disabled:opacity-50"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
