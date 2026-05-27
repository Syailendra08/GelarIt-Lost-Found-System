import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import TrashTable from "../../../components/Admin/TrashTable";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
    getTrashUsers,
    restoreUser,
    forceDeleteUser,
} from "../../../api/user.api";

export default function TrashUser() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function fetchTrash() {
        try {
            setLoading(true);

            const result = await getTrashUsers();

            setUsers(result.data || []);
        } catch (error) {
            console.log(error);

            Swal.fire({
                icon: "error",
                title: "Failed fetch trash users",
            });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchTrash();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function handleRestore(row) {
        const confirm = await Swal.fire({
            title: "Restore user?",
            text: row.name,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#2563EB",
        });

        if (!confirm.isConfirmed) return;

        try {
            const result = await restoreUser(row.id);

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
                title: "Failed restore user",
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
            const result = await forceDeleteUser(row.id);

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
                title: "Failed delete user",
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
            label: "User Name",
        },
        {
            key: "email",
            label: "Email",
        },
        {
            key: "role",
            label: "Role",
        },
        {
            key: "deletedAt",
            label: "Deleted At",
        },
    ];

    const rows = users.map((item) => ({
        id: item.id,
        name: item.name,
        email: item.email,
        role: item.role,
        deletedAt: item.deletedAt
            ? new Date(item.deletedAt).toLocaleDateString()
            : "-",
    }));

    return (
        <div className="p-6">
            <div>
                <button
                    onClick={() => navigate("/admin/users")}
                    className="mb-4 flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#00288E]"
                >
                    <ArrowLeft size={16} />
                    Back to Users
                </button>
            </div>

            <div className="mb-6">
                <p className="text-sm font-semibold uppercase tracking-wide text-[#00288E]">
                    System Trash
                </p>

                <h1 className="mt-1 text-4xl font-bold text-[#0F172A]">Trash Users</h1>

                <p className="mt-2 text-sm text-gray-500">
                    Restore or permanently delete removed users.
                </p>
            </div>

            <TrashTable
                title="Deleted Users"
                columns={columns}
                rows={rows}
                loading={loading}
                onRestore={handleRestore}
                onDeletePermanent={handleForceDelete}
            />
        </div>
    );
}
