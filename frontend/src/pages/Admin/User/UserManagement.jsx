import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import TableCRUD from "../../../components/admin/TableCRUD";
import { deleteUser, exportUsers, getUsers, getUserStats } from "../../../api/user.api";
import StatsCard from "../../../components/Admin/StatsCard";
import { GraduationCap, ShieldCheck, Users, UserX } from "lucide-react";

export default function UserManagement() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({
        total: 0,
        totalPage: 1,
        rangeData: "0-0",
    });

    const [stats, setStats] = useState({
        totalUsers: 0,
        totalStudents: 0,
        totalAdmins: 0,
        deletedUsers: 0,
    });

    async function fetchUsers() {
        try {
            setLoading(true);

            const result = await getUsers({
                page,
                limit: 6,
                sortBy: "createdAt",
                order: "ASC",
            });

            setUsers(result.data?.data || []);

            setPagination({
                total: result.data?.total || 0,
                totalPage: result.data?.totalPage || 1,
                rangeData: result.data?.rangeData || "0-0",
            });
        } catch (error) {
            console.log(error);

            Swal.fire({
                icon: "error",
                title: "Failed fetch users",
            });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    async function handleDelete(row) {
        const confirm = await Swal.fire({
            title: "Delete this user?",
            text: row.name,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DC2626",
        });

        if (!confirm.isConfirmed) return;

        try {
            const result = await deleteUser(row.id);

            Swal.fire({
                icon: "success",
                title: result.message || "Delete user success",
                timer: 1500,
                showConfirmButton: false,
            });

            fetchUsers();
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
            key: "no",
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
            key: "reportedTotal",
            label: "Report Items",
        },

        {
            key: "receivedTotal",
            label: "Received Items",
        },

        {
            key: "createdAt",
            label: "Created At",
        },
    ];

    const rows = users.map((item, index) => ({
        no: `USR-${String((page - 1) * 6 + index + 1).padStart(3, "0")}`,
        id: item.id,
        name: item.name,
        email: item.email,
        role: item.role,
        reportedTotal: item.foundItems.length,
        receivedTotal: item.receivedItems.length,
        createdAt: new Date(item.createdAt).toLocaleDateString(),
    }));

    const fetchStats = async () => {
        const result = await getUserStats();
        console.log("stats result:", result);
        setStats(result.data);
    };
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchStats();
    }, []);


    return (
        <div className="p-6">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard
                    title="Total Users"
                    value={stats.totalUsers}
                    icon={Users}
                    iconBg="bg-blue-100"
                    iconColor="text-blue-600"
                />

                <StatsCard
                    title="Students"
                    value={stats.totalStudents}
                    icon={GraduationCap}
                    iconBg="bg-green-100"
                    iconColor="text-green-600"
                />

                <StatsCard
                    title="Admins"
                    value={stats.totalAdmins}
                    icon={ShieldCheck}
                    iconBg="bg-purple-100"
                    iconColor="text-purple-600"
                />

                <StatsCard
                    title="Deleted Users"
                    value={stats.deletedUsers}
                    icon={UserX}
                    iconBg="bg-red-100"
                    iconColor="text-red-600"
                />

            </div>
            <TableCRUD
                title="Users List"
                columns={columns}
                rows={rows}
                loading={loading}
                page={page}
                setPage={setPage}
                pagination={pagination}
                onEdit={(row) => navigate(`/admin/users/edit/${row.id}`)}
                onCreate={() => navigate("/admin/users/create")}
                onDelete={handleDelete}
                onTrash={() => navigate("/admin/users/trash")}
                onExport={async () => {
                    await exportUsers();
                }}
            />
        </div>
    );
}
