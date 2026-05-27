import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

import { ArrowLeft, MapPinned } from "lucide-react";
import { createLocation } from "../../../api/locations.api";


export default function CreateLocation() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: "",
        description: "",
    });

    const [errors, setErrors] = useState({
        name: "",
        description: "",
    });

    function validateForm() {
        const newErrors = {
            name: "",
            description: "",
        };

        let isValid = true;

        if (!form.name.trim()) {
            newErrors.name = "Location name is required";

            isValid = false;
        }

        if (!form.description.trim()) {
            newErrors.description = "Description is required";

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

            const result = await createLocation(form);

            Swal.fire({
                icon: "success",
                title: result.message || "Create location success",
                timer: 1500,
                showConfirmButton: false,
            });

            navigate("/admin/location-management");

        } catch (error) {
            console.log(error);

            Swal.fire({
                icon: "error",
                title: "Failed create location",
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
                        onClick={() =>
                            navigate("/admin/location-management")
                        }
                        className="mb-4 flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#00288E]"
                    >
                        <ArrowLeft size={16} />

                        Back to Locations
                    </button>
                </div>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
                <div className="mb-8 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF2FF]">
                        <MapPinned
                            size={24}
                            className="text-[#00288E]"
                        />
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-[#0F172A]">
                            Create new location
                        </h2>

                        <p className="text-sm text-gray-500">
                            Fill all required fields below.
                        </p>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Location Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Example: Warehouse A"
                            className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none transition ${errors.name
                                    ? "border-red-500 focus:border-red-500"
                                    : "border-gray-300 focus:border-[#00288E]"
                                }`}
                        />

                        {errors.name && (
                            <p className="mt-2 text-sm text-red-500">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Description
                        </label>

                        <textarea
                            rows={5}
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Write location description..."
                            className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none transition ${errors.description
                                    ? "border-red-500 focus:border-red-500"
                                    : "border-gray-300 focus:border-[#00288E]"
                                }`}
                        />

                        {errors.description && (
                            <p className="mt-2 text-sm text-red-500">
                                {errors.description}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center gap-3 pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-2xl bg-[#00288E] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#001f70] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {loading
                                ? "Creating..."
                                : "Create Location"}
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                navigate("/admin/location-management")
                            }
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