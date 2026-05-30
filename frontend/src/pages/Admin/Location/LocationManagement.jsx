import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import TableCRUD from "../../../components/admin/TableCRUD";

import {
    deleteLocation,
    exportLocations,
    getLocations,
    getLocationStats,
} from "../../../api/locations.api";
import StatsCard from "../../../components/Admin/StatsCard";
import { MapPin, Trash2 } from "lucide-react";

export default function LocationManagement() {
    const navigate = useNavigate();
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] =
        useState({
            total: 0,
            totalPage: 1,
            rangeData: "0-0",
        });


    const [stats, setStats] = useState({
        totalLocation: 0,
        deletedLocation: 0,
    });


    async function fetchLocations() {
        try {
            setLoading(true);

            const result =
                await getLocations({
                    page,
                    limit: 10,
                    sortBy: "createdAt",
                    order: "ASC",
                });

            setLocations(result.data?.data || []);

            setPagination({
                total:
                    result.data?.total || 0,
                totalPage:
                    result.data?.totalPage || 1,
                rangeData:
                    result.data?.rangeData ||
                    "0-0",
            });

        } catch (error) {
            console.log(error);

            Swal.fire({
                icon: "error",
                title:
                    "Failed fetch locations",
            });

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchLocations();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    async function handleDelete(row) {

        const confirm =
            await Swal.fire({
                title: "Delete this location?",
                text: row.name,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor:
                    "#DC2626",

            });

        if (!confirm.isConfirmed)
            return;

        try {

            const result =
                await deleteLocation(
                    row.id
                );

            Swal.fire({
                icon: "success",
                title:
                    result.message ||
                    "Delete location success",

                timer: 1500,

                showConfirmButton: false,
            });

            fetchLocations();

        } catch (error) {
            console.log(error);

            Swal.fire({
                icon: "error",
                title: "Failed delete location",
            });

        }
    }

    const columns = [
        { key: "no", label: "ID", },
        { key: "name", label: "Location Name", },
        { key: "description", label: "Description", },
        { key: "createdAt", label: "Created At", },
    ];

    const rows = locations.map(
        (item, index) => ({
            no: `LOC-${String((page - 1) * 10 + index + 1).padStart(3, "0")}`,
            id: item.id,
            name: item.name,
            description: item.description || "-",
            createdAt: new Date(item.createdAt).toLocaleDateString(),
        }));

        const fetchStats = async () => {
            const result = await getLocationStats();
           console.log("stats result:", result);
            setStats(result.data);
        };
        useEffect(() => {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            fetchStats();
        }, []);

    return (
        <div className="p-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <StatsCard
                    title="Total Location"
                    value={stats.totalLocation}
                    icon={MapPin}
                    iconBg="bg-indigo-100"
                    iconColor="text-indigo-600"
                />

                <StatsCard
                    title="Deleted Location"
                    value={stats.deletedLocation}
                    icon={Trash2}
                    iconBg="bg-red-100"
                    iconColor="text-red-600"
                />

            </div>

            <TableCRUD
                title="Locations List"
                columns={columns}
                rows={rows}
                loading={loading}
                page={page}
                setPage={setPage}
                pagination={pagination}
                onEdit={(row) =>
                    navigate(
                        `/admin/locations/edit/${row.id}`
                    )
                }
                onCreate={() =>
                    navigate("/admin/locations/create")
                }
                onDelete={handleDelete}
                onTrash={() =>
                    navigate("/admin/locations/trash")
                }
                onExport={async () => {
                    await exportLocations();
                }}
            />
        </div>
    );
}