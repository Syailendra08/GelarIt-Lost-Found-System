import { useEffect, useState } from "react";

import Swal from "sweetalert2";

import {
    Clock3,
    CheckCircle2,
    PackageCheck,
    CalendarDays,
    MapPin,
} from "lucide-react";

import { getAllRequests } from "../../api/request.api";
import PageHeader from "../../components/PageHeader";

export default function MyClaim() {
    const [claims, setClaims] = useState([]);
    const [loading, setLoading] = useState(false);

    async function fetchClaims() {
        try {
            setLoading(true);

            const result = await getAllRequests({
                limit: 20,
                sortBy: "createdAt",
                order: "DESC",
            });

            setClaims(result.data?.data?.data || []);
        } catch (error) {
            console.log(error);

            Swal.fire({
                icon: "error",
                title: "Failed fetch claims",
                timer: 1500,
                showConfirmButton: false,
            });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchClaims();
    }, []);

    const activeClaims = claims.filter((item) =>
        ["pending", "processed", "approved"].includes(item.status)
    ).length;

    const returnedClaims = claims.filter(
        (item) => item.status === "completed"
    ).length;

    const renderActionButton = (item) => {
        if (item.status === "pending") {
            return (
                <button className="rounded-lg border border-yellow-300 bg-yellow-50 px-4 py-2 text-xs font-semibold text-yellow-700">
                    Waiting Review
                </button>
            );
        }

        if (item.status === "processed") {
            return (
                <button className="rounded-lg border border-blue-300 bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-700">
                    Under Review
                </button>
            );
        }

        if (item.status === "approved") {
            return (
                <button
                    onClick={() =>
                        Swal.fire({
                            title: "Claim Approved",

                            html: `
              <div style="text-align:left">
                <p>Your claim has been approved.</p>
                <p>Please wait for pickup confirmation.</p>
              </div>
            `,

                            icon: "success",

                            confirmButtonColor: "#00288E",
                        })
                    }
                    className="rounded-lg border border-indigo-300 bg-indigo-50 px-4 py-2 text-xs font-semibold text-indigo-700"
                >
                    View Details
                </button>
            );
        }

        if (item.status === "completed") {
            return (
                <button
                    onClick={() =>
                        Swal.fire({
                            title: "Pickup Instructions",

                            html: `
              <div style="text-align:left">
                <p>Please visit Student Affairs Office.</p>
                <p>Bring your Student ID Card.</p>
                <p>Pickup available from 09:00 - 16:00.</p>
              </div>
            `,

                            icon: "info",

                            confirmButtonColor: "#00288E",
                        })
                    }
                    className="rounded-lg bg-[#00288E] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#001f70]"
                >
                    Pickup Instructions
                </button>
            );
        }

        if (item.status === "completed" || item.item?.status === "completed") {
            return (
                <button
                    onClick={() =>
                        Swal.fire({
                            title: "Receipt",

                            html: `
              <div style="text-align:left">
                <p>Item successfully returned.</p>
                <p>Thank you for using Lost & Found.</p>
              </div>
            `,

                            icon: "success",
                            confirmButtonColor: "#00288E",
                        })
                    }
                    className="rounded-lg border border-green-300 bg-green-50 px-4 py-2 text-xs font-semibold text-green-700"
                >
                    View Receipt
                </button>
            );
        }

        return (
            <button className="rounded-lg border border-red-300 bg-red-50 px-4 py-2 text-xs font-semibold text-red-600">
                Request Rejected
            </button>
        );
    };
    return (
        <div className="min-h-screen bg-[#F6F7FB] p-6">
            <PageHeader title="My Claims"
             description="Track the status of your lost item recovery requests." />

            <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-2xl bg-[#2444B8] p-5 text-white shadow-lg">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-white/80">
                                Active Claims
                            </p>

                            <h2 className="mt-2 text-4xl font-bold">{activeClaims}</h2>
                        </div>

                        <div className="rounded-xl bg-white/20 p-3">
                            <Clock3 size={20} />
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                Successfully Returned
                            </p>

                            <h2 className="mt-2 text-4xl font-bold text-[#0F172A]">
                                {returnedClaims}
                            </h2>
                        </div>

                        <div className="rounded-xl bg-yellow-100 p-3 text-yellow-600">
                            <CheckCircle2 size={20} />
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                Avg. Return Time
                            </p>

                            <h2 className="mt-2 text-4xl font-bold text-[#0F172A]">2 Days</h2>
                        </div>

                        <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600">
                            <PackageCheck size={20} />
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div className="mb-5 flex items-center gap-3">
                    <h2 className="text-xl font-bold text-[#0F172A]">Recent Activity</h2>

                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                        New Updates
                    </span>
                </div>

                <div className="space-y-5">
                    {claims.map((item) => (
                        <div
                            key={item.id}
                            className="flex flex-col gap-5 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm md:flex-row"
                        >
     
                            <img
                                src={item.item?.image}
                                alt=""
                                className="h-32 w-full rounded-xl object-cover md:w-40"
                            />

                           
                            <div className="flex flex-1 flex-col justify-between">
                                <div>
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="text-xl font-bold text-[#00288E]">
                                                {item.item?.name}
                                            </h3>

                                            <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                                                <div className="flex items-center gap-1">
                                                    <CalendarDays size={14} />
                                                    Claimed{" "}
                                                    {new Date(item.createdAt).toLocaleDateString()}
                                                </div>

                                                <div className="flex items-center gap-1">
                                                    <MapPin size={14} />

                                                    {item.item?.location?.name}
                                                </div>
                                            </div>
                                        </div>

                                        <span className="text-xs font-medium text-gray-400">
                                            Claim ID #{item.id}
                                        </span>
                                    </div>

                                    <div className="mt-4">
                                        {item.status === "pending" && (
                                            <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                                                Pending Review
                                            </span>
                                        )}

                                        {item.status === "processed" && (
                                            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                                                Under Review
                                            </span>
                                        )}

                                        {item.status === "approved" && (
                                            <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                                                Approved
                                            </span>
                                        )}

                                        {item.status === "completed" && (
                                            <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-700">
                                                Ready For Pickup
                                            </span>
                                        )}

                                        {(item.status === "completed" ||
                                            item.item?.status === "completed") && (
                                                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                                    Successfully Returned
                                                </span>
                                            )}

                                        {item.status === "rejected" && (
                                            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                                                Rejected
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-5 flex justify-end">
                                    {renderActionButton(item)}
                                </div>
                            </div>
                        </div>
                    ))}

                    {!loading && claims.length === 0 && (
                        <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-16 text-center">
                            <p className="text-gray-400">No claims yet</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
