import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import TrashTable from "../../../components/Admin/TrashTable";

import { getTrashItems, restoreItem, forceDeleteItem,} from "../../../api/item.api";

export default function TrashItem() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    async function fetchTrash() {
        try {
            setLoading(true);

            const result = await getTrashItems();

            setItems(result.data || []);
        } catch (error) {
            console.log(error);

            Swal.fire({
                icon: "error",
                title: "Failed fetch trash items",
            });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchTrash();
         
    }, []);

    async function handleRestore(row) {
        const confirm = await Swal.fire({
            title: "Restore item?",
            text: row.name,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#2563EB",
        });

        if (!confirm.isConfirmed) return;

        try {
            const result = await restoreItem(row.id);

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
                title: "Failed restore item",
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
            const result = await forceDeleteItem(row.id);

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
                title: "Failed delete item",
            });
        }
    }

    const columns = [
        { key: "id", label: "ID", },
        { key: "name", label: "Name", },
        { key: "category", label: "Category", },
        { key: "location", label: "Location", },
        { key: "status", label: "Status", },
        { key: "finder", label: "Finder", },
        { key: "receiver", label: "Receiver", },
        { key: "deletedAt", label: "Deleted At",  },
    ];

    const rows = items.map((item, index) => ({
        no: `ITM-${String(index + 1).padStart(3, "0")}`,
        id: item.id,
        name: item.name,
        category: item.category?.name || "-",
        location: item.location?.name || "-",
        status: item.status || "-",
        finder: item.finder?.name || "-",
        receiver: item.receiver?.name || "-",

        deletedAt: item.deletedAt
            ? new Date(item.deletedAt).toLocaleDateString()
            : "-",
    }));

    return (
        <div>
            <div>
                <button
                    onClick={() => navigate("/admin/item-management")}
                    className="mb-4 flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#00288E]"
                >
                    <ArrowLeft size={16} />
                    Back to Items
                </button>
            </div>

            <div className="mb-6">
                <p className="text-sm font-semibold uppercase tracking-wide text-[#00288E]">
                    System Trash
                </p>

                <h1 className="mt-1 text-4xl font-bold text-[#0F172A]">Trash Items</h1>

                <p className="mt-2 text-sm text-gray-500">
                    Restore or permanently delete removed items.
                </p>
            </div>

            <TrashTable
                title="Deleted Items"
                columns={columns}
                rows={rows}
                loading={loading}
                onRestore={handleRestore}
                onDeletePermanent={handleForceDelete}
            />
        </div>
    );
}
