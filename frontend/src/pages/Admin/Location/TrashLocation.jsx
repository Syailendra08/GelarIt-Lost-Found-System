import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import TrashTable from "../../../components/Admin/TrashTable";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { forceDeleteLocation, getTrashLocations, restoreLocation } from "../../../api/locations.api";

export default function TrashLocation() {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function fetchTrash() {
        try {
            setLoading(true);

            const result = await getTrashLocations();

            setLocations(result.data || []);
        } catch (error) {
            console.log(error);

            Swal.fire({
                icon: "error",
                title: "Failed fetch trash locations",
            });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchTrash();
    }, []);

    async function handleRestore(row) {

        const confirm = await Swal.fire({
            title: "Restore location?",
            text: row.name,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#2563EB",
        });

        if (!confirm.isConfirmed) return;

        try {
            const result = await restoreLocation(row.id);

            Swal.fire({
                icon: "success",
                title: result.message || "Restore success",
                timer: 1500,
                showConfirmButton: false,
            });

            fetchTrash();
        } catch (error) {
            console.log(error);

            Swal.fire({
                icon: "error",
                title: "Failed restore location",
            });
        }
    }

    async function handleForceDelete(row) {

        const confirm = await Swal.fire({
            title: "Permanent delete?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DC2626",
        });

        if (!confirm.isConfirmed) return;

        try {
            const result = await forceDeleteLocation(row.id);

            Swal.fire({
                icon: "success",
                title: result.message || "Delete success",
                timer: 1500,
                showConfirmButton: false,
            });

            fetchTrash();
        } catch (error) {
            console.log(error);

            Swal.fire({
                icon: "error",
                title: "Failed delete location",
            });
        }
    }

    const columns = [
        {
            key: "id",
            label: "ID",
        },

        {
            key: "name",
            label: "Location Name",
        },

        {
            key: "description",
            label: "Description",
        },

        {
            key: "deletedAt",
            label: "Deleted At",
        },
    ];

    const rows = locations.map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description || "-",
        deletedAt: new Date(item.deletedAt).toLocaleDateString(),
    }));

    return (
        <div className="p-6">
            <div>
                <button
                    onClick={() => navigate("/admin/location-management")}
                    className="mb-4 flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#00288E]"
                >
                    <ArrowLeft size={16} />
                    Back to Locations
                </button>
            </div>

            <div className="mb-6">
                <p className="text-sm font-semibold uppercase tracking-wide text-[#00288E]">
                    System Trash
                </p>

                <h1 className="mt-1 text-4xl font-bold text-[#0F172A]">
                    Trash Locations
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                    Restore or permanently delete removed locations.
                </p>
            </div>

            <TrashTable
                title="Deleted Locations"
                columns={columns}
                rows={rows}
                loading={loading}
                onRestore={handleRestore}
                onDeletePermanent={handleForceDelete}
            />
        </div>
    );
}
