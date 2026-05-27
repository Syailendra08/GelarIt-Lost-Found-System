import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ArrowLeft, UserPlus } from "lucide-react";
import { createUser } from "../../../api/user.api";

export default function CreateUser() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
    });

    function validateForm() {
        const newErrors = {
            name: "",
            email: "",
            password: "",
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

        if (!form.password.trim()) {
            newErrors.password = "Password is required";

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

            const result = await createUser(form);

            Swal.fire({
                icon: "success",
                title: result.message || "Create user success",
                timer: 1500,
                showConfirmButton: false,
            });

            navigate("/admin/users");
        } catch (error) {
            console.log(error);

            Swal.fire({
                icon: "error",
                title: "Failed create user",
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
                        <UserPlus size={24} className="text-[#00288E]" />
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-[#0F172A]">
                            Create new user
                        </h2>

                        <p className="text-sm text-gray-500">
                            Fill all required fields below.
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
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Input user password"
                            className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none transition ${errors.password
                                    ? "border-red-500 focus:border-red-500"
                                    : "border-gray-300 focus:border-[#00288E]"
                                }`}
                        />

                        {errors.password && (
                            <p className="mt-2 text-sm text-red-500">{errors.password}</p>
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
                            {loading ? "Creating..." : "Create User"}
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/admin/users")}
                            className="rounded-2xl border border-gray-300 bg-red-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
