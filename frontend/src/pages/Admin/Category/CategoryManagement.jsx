import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import TableCRUD from "../../../components/admin/TableCRUD";

import {
    deleteCategory,
    exportCategories,
    getCategories,
} from "../../../api/categories.api";

export default function CategoryManagement() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({
        total: 0,
        totalPage: 1,
        rangeData: "0-0",
    });

    async function fetchCategories() {
        try {
            setLoading(true);

            const result = await getCategories({
                page,
                limit: 10,
                sortBy: "createdAt",
                order: "ASC",
            });

            setCategories(result.data?.data || []);

            setPagination({
                total: result.data?.total || 0,
                totalPage: result.data?.totalPage || 1,
                rangeData: result.data?.rangeData || "0-0",
            });
        } catch (error) {
            console.log(error);

            Swal.fire({
                icon: "error",
                title: "Failed fetch categories",
            });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, [page]);

    async function handleDelete(row) {
        const confirm = await Swal.fire({
            title: "Delete this category?",
            text: row.name,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DC2626",
        });

        if (!confirm.isConfirmed) return;

        try {
            const result = await deleteCategory(row.id);

            Swal.fire({
                icon: "success",
                title: result.message || "Delete category success",
                timer: 1500,
                showConfirmButton: false,
            });

            fetchCategories();
        } catch (error) {
            console.log(error);

            Swal.fire({
                icon: "error",
                title: "Failed delete category",
            });
        }
    }

    const columns = [
        {
            key: "no",
            label: "ID",
        },

        {
            key: "name",
            label: "Category Name",
        },

        {
            key: "description",
            label: "Description",
        },

        {
            key: "createdAt",
            label: "Created At",
        },
    ];

    const rows = categories.map((item, index) => ({
        no: `CAT-${String(index + 1).padStart(3, "0")}`,
        id: item.id,
        name: item.name,
        description: item.description || "-",
        createdAt: new Date(item.createdAt).toLocaleDateString(),
    }));

    return (
        <div className="p-6">
            <TableCRUD
                title="Categories List"
                columns={columns}
                rows={rows}
                loading={loading}
                page={page}
                setPage={setPage}
                pagination={pagination}
                onEdit={(row) => navigate(`/admin/categories/edit/${row.id}`)}
                onCreate={() => navigate("/admin/categories/create")}
                onDelete={handleDelete}
                onTrash={() => navigate("/admin/categories/trash")}
                onExport={async () => {
                    await exportCategories();
                }}
            />
        </div>
    );
}
