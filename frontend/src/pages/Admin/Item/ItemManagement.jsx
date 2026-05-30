import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import TableCRUD from "../../../components/admin/TableCRUD";
import { deleteItem, exportItems, getItems } from "../../../api/item.api";
import StatsCard from "../../../components/Admin/StatsCard";
import { Package } from "lucide-react";

export default function ItemManagement() {
    const navigate = useNavigate();

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    const [pagination, setPagination] = useState({
        total: 0,
        totalPage: 1,
        rangeData: "0-0",
    });

    async function fetchItems() {
        try {
            setLoading(true);

            const result = await getItems({
                page,
                limit: 6,
                sortBy: "createdAt",
                order: "ASC",
            });

            setItems(result.data?.data || []);

            setPagination({
                total: result.data?.total || 0,
                totalPage: result.data?.totalPage || 1,
                rangeData: result.data?.rangeData || "0-0",
            });
        } catch (error) {
            console.log(error);

            Swal.fire({
                icon: "error",
                title: "Failed fetch items",
            });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchItems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    async function handleDelete(row) {
        const confirm = await Swal.fire({
            title: "Delete this item?",
            text: row.name,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DC2626",
        });

        if (!confirm.isConfirmed) return;

        try {
            const result = await deleteItem(row.id);

            Swal.fire({
                icon: "success",
                title: result.message || "Delete item success",
                timer: 1500,
                showConfirmButton: false,
            });

            fetchItems();
        } catch (error) {
            console.log(error);

            Swal.fire({
                icon: "error",
                title: "Failed delete item",
            });
        }
    }

    const columns = [
        { key: "no", label: "ID" },
        { key: "name", label: "Name" },
        { key: "category", label: "Category" },
        { key: "location", label: "Location" },
        { key: "status", label: "Status" },
        { key: "finder", label: "Finder" },
        { key: "receiver", label: "Receiver" },
        { key: "createdAt", label: "Date" },
    ];

    const rows = items.map((item, index) => ({
        no: `ITM-${String((page - 1) * 6 + index + 1).padStart(3, "0")}`,
        id: item.id,
        name: item.name,
        category: item.category?.name || "-",
        location: item.location?.name || "-",
        status: item.status,
        finder: item.finder?.name || "-",
        receiver: item.receiver?.name || "-",
        createdAt: new Date(item.createdAt).toLocaleDateString(),
    }));

    return (
        <div className="p-6">
            <div className="space-y-6">
            <StatsCard title="Total Item" value={pagination.total} icon={Package} iconBg="bg-red-100" iconColor="text-yellow-100" />
            
                <TableCRUD
                    title="Items List"
                    columns={columns}
                    rows={rows}
                    loading={loading}
                    page={page}
                    setPage={setPage}
                    pagination={pagination}
                    onEdit={(row) => navigate(`/admin/items/edit/${row.id}`)}
                    onCreate={() => navigate("/admin/items/create")}
                    onDelete={handleDelete}
                    onTrash={() => navigate("/admin/items/trash")}
                    onExport={async () => {
                        await exportItems();
                    }}
                />
           </div>
        </div>
    );
}
