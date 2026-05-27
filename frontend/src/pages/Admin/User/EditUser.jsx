import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import { ArrowLeft, UserCog } from "lucide-react";

import { getUsers, updateUser } from "../../../api/user.api";

export default function EditUser() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);

    const [form, setForm] = useState({
        name: "",
        email: "",
        role: "",
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        role: "",
    });

    async function fetchUser() {
        try {
            setFetchLoading(true);
            const result = await getUsers();
            const user = result.data.data.find((item) => item.id === Number(id));

            if (!user) {
                Swal.fire({
                    icon: "error",
                    title: "User not found",
                });

                navigate("/admin/users");
                return;
            }

            setForm({
                name: user.name || "",
                email: user.email || "",
                role: user.role || "",
            });
        } catch (error) {
            console.log(error);

            Swal.fire({
                icon: "error",
                title: "Failed fetch user",
            });
        } finally {
            setFetchLoading(false);
        }
    }

    useEffect(() => {
        fetchUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function validateForm() {
        const newErrors = {
            name: "",
            email: "",
            role: "",
        };

        let isValid = true;

        if (!form.name.trim()) {
            newErrors.name = "User name is required";
            isValid = false;
        }

        if (!form.email.trim()) {
            newErrors.email = "Email is required";
            isValid = false;
        }

        if (!form.role.trim()) {
            newErrors.role = "Role is required";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!validateForm()) return;
        try {
            setLoading(true);

            const result = await updateUser(id, form);

            Swal.fire({
                icon: "success",
                title: result.message || "Update user success",
                timer: 1500,
                showConfirmButton: false,
            });

            navigate("/admin/users");
        } catch (error) {
            console.log(error);

            Swal.fire({
                icon: "error",
                title: "Failed update user",
            });
        } finally {
            setLoading(false);
        }
    }

    function handleChange(e) {
        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value,
        });

        setErrors({
            ...errors,
            [name]: "",
        });
    }

    if (fetchLoading) {
        return <div className="p-6">Loading...</div>;
    }

    return (
        <div className="p-2">
            <div className="mb-1 flex items-center justify-between">
                <div>
                    <button
                        onClick={() => navigate("/admin/users")}
                        className="mb-4 flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#00288E]"
                    >
                        <ArrowLeft size={16} />
                        Back to Users
                    </button>
                </div>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
                <div className="mb-8 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF2FF]">
                        <UserCog size={24} className="text-[#00288E]" />
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-[#0F172A]">
                            Update User
                        </h2>

                        <p className="text-sm text-gray-500">
                            Edit user information below.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
    
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            User Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Input user name"
                            className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none transition ${errors.name
                                    ? "border-red-500 focus:border-red-500"
                                    : "border-gray-300 focus:border-[#00288E]"
                                }`}
                        />

                        {errors.name && (
                            <p className="mt-2 text-sm text-red-500">{errors.name}</p>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Input user email"
                            className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none transition ${errors.email
                                    ? "border-red-500 focus:border-red-500"
                                    : "border-gray-300 focus:border-[#00288E]"
                                }`}
                        />

                        {errors.email && (
                            <p className="mt-2 text-sm text-red-500">{errors.email}</p>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Role
                        </label>

                        <select
                            name="role"
                            value={form.role}
                            onChange={handleChange}
                            className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none transition ${errors.role
                                    ? "border-red-500 focus:border-red-500"
                                    : "border-gray-300 focus:border-[#00288E]"
                                }`}
                        >
                            <option value="">Select role</option>
                            <option value="admin">Admin</option>
                            <option value="student">Student</option>
                        </select>

                        {errors.role && (
                            <p className="mt-2 text-sm text-red-500">{errors.role}</p>
                        )}
                    </div>

                    <div className="flex items-center gap-3 pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-2xl bg-[#00288E] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#001f70] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {loading ? "Updating..." : "Update User"}
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/admin/users")}
                            className="rounded-2xl border border-gray-300 bg-red-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
