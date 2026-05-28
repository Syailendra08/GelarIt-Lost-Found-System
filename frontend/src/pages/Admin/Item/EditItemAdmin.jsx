import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import { ArrowLeft, Pencil, CloudUpload } from "lucide-react";

import { getItemById, updateItem } from "../../../api/item.api";
import { getCategories } from "../../../api/categories.api";
import { getLocations } from "../../../api/locations.api";

export default function EditItemAdmin() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);

    const [categories, setCategories] = useState([]);
    const [locations, setLocations] = useState([]);

    const [imagePreview, setImagePreview] = useState(null);

    const [form, setForm] = useState({
        name: "",
        category: "",
        location: "",
        description: "",
        color: "",
        status: "",
        date: "",
        image: null,
    });

    const [errors, setErrors] = useState({
        name: "",
        category: "",
        location: "",
        description: "",
        color: "",
        status: "",
        date: "",
        image: "",
    });

    async function fetchData() {
        try {
            setFetchLoading(true);

            const [itemRes, catRes, locRes] = await Promise.all([
                getItemById(id),
                getCategories(),
                getLocations(),
            ]);

            const item = itemRes.data;

            setCategories(catRes.data?.data || []);
            setLocations(locRes.data?.data || []);

            setForm({
                name: item.name || "",
                category: item.categories_id || "",
                location: item.locations_id || "",
                description: item.description || "",
                color: item.color || "",
                status: item.status || "",
                date: item.date?.split("T")[0] || "",
                image: null,
            });

            setImagePreview(item.image || null);
        } catch (error) {
            console.log(error);

            Swal.fire({
                icon: "error",
                title: "Failed fetch item",
            });

            navigate("/admin/item-management");
        } finally {
            setFetchLoading(false);
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function validateForm() {
        const newErrors = {
            name: "",
            category: "",
            location: "",
            description: "",
            color: "",
            status: "",
            date: "",
            image: "",
        };

        let isValid = true;

        Object.keys(form).forEach((key) => {
            if (key !== "image" && !form[key]?.toString().trim()) {
                newErrors[key] = `${key} is required`;
                isValid = false;
            }
        });

        setErrors(newErrors);

        return isValid;
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            setLoading(true);

            const payload = {
                categories_id: Number(form.category),
                locations_id: Number(form.location),
                name: form.name,
                description: form.description,
                color: form.color,
                status: form.status,
                date: form.date,
            };

            if (form.image) {
                payload.image = form.image;
            }

            const result = await updateItem(id, payload);

            Swal.fire({
                icon: "success",
                title: result.message || "Update item success",
                timer: 1500,
                showConfirmButton: false,
            });

            navigate("/admin/item-management");
        } catch (error) {
            console.log(error);

            Swal.fire({
                icon: "error",
                title: "Failed update item",
            });
        } finally {
            setLoading(false);
        }
    }

    function handleChange(e) {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    }

    function handleFile(e) {
        const file = e.target.files[0];

        setForm((prev) => ({
            ...prev,
            image: file,
        }));

        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }

        setErrors((prev) => ({
            ...prev,
            image: "",
        }));
    }

    if (fetchLoading) {
        return <div className="p-6">Loading...</div>;
    }

    return (
        <div className="p-2">
            <button
                onClick={() => navigate("/admin/item-management")}
                className="mb-4 flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#00288E]"
            >
                <ArrowLeft size={16} />
                Back to Items
            </button>

            <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
                <div className="mb-8 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF2FF]">
                        <Pencil size={24} className="text-[#00288E]" />
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-[#0F172A]">
                            Update Item
                        </h2>

                        <p className="text-sm text-gray-500">
                            Edit item information below.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Item Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Enter item name"
                                className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none transition ${
                                    errors.name
                                        ? "border-red-500"
                                        : "border-gray-300 focus:border-[#00288E]"
                                }`}
                            />

                            {errors.name && (
                                <p className="mt-2 text-sm text-red-500">{errors.name}</p>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Category
                            </label>

                            <select
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none transition ${
                                    errors.category
                                        ? "border-red-500"
                                        : "border-gray-300 focus:border-[#00288E]"
                                }`}
                            >
                                <option value="">Select category</option>

                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>

                            {errors.category && (
                                <p className="mt-2 text-sm text-red-500">{errors.category}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Location
                            </label>

                            <select
                                name="location"
                                value={form.location}
                                onChange={handleChange}
                                className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none transition ${
                                    errors.location
                                        ? "border-red-500"
                                        : "border-gray-300 focus:border-[#00288E]"
                                }`}
                            >
                                <option value="">Select location</option>

                                {locations.map((loc) => (
                                    <option key={loc.id} value={loc.id}>
                                        {loc.name}
                                    </option>
                                ))}
                            </select>

                            {errors.location && (
                                <p className="mt-2 text-sm text-red-500">{errors.location}</p>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Status
                            </label>

                            <select
                                name="status"
                                value={form.status}
                                onChange={handleChange}
                                className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none transition ${
                                    errors.status
                                        ? "border-red-500"
                                        : "border-gray-300 focus:border-[#00288E]"
                                }`}
                            >
                                <option value="">Select status</option>
                                <option value="lost">Lost</option>
                                <option value="found">Found</option>
                                <option value="claimed">Claimed</option>
                                <option value="taken">Taken</option>
                            </select>

                            {errors.status && (
                                <p className="mt-2 text-sm text-red-500">{errors.status}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Date
                        </label>

                        <input
                            type="date"
                            name="date"
                            value={form.date}
                            onChange={handleChange}
                            className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none transition ${
                                errors.date
                                    ? "border-red-500"
                                    : "border-gray-300 focus:border-[#00288E]"
                            }`}
                        />

                        {errors.date && (
                            <p className="mt-2 text-sm text-red-500">{errors.date}</p>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Color
                        </label>

                        <input
                            type="text"
                            name="color"
                            value={form.color}
                            onChange={handleChange}
                            placeholder="Enter item color"
                            className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none transition ${
                                errors.color
                                    ? "border-red-500"
                                    : "border-gray-300 focus:border-[#00288E]"
                            }`}
                        />

                        {errors.color && (
                            <p className="mt-2 text-sm text-red-500">{errors.color}</p>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Description
                        </label>

                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Enter item description"
                            rows={4}
                            className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none transition ${
                                errors.description
                                    ? "border-red-500"
                                    : "border-gray-300 focus:border-[#00288E]"
                            }`}
                        />

                        {errors.description && (
                            <p className="mt-2 text-sm text-red-500">{errors.description}</p>
                        )}
                    </div>

                    <div className="mt-2">
                        <p className="mb-2 text-sm font-semibold text-gray-700">
                            Upload Image
                        </p>

                        <input
                            type="file"
                            id="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleFile}
                        />

                        <label
                            htmlFor="file"
                            className="flex h-44 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-[#f8f7fc] transition hover:bg-[#f3f2fa]"
                        >
                            {imagePreview ? (
                                <div className="flex flex-col items-center gap-2">
                                    <img
                                        src={imagePreview}
                                        alt="preview"
                                        className="h-24 w-24 rounded-xl object-cover shadow-md"
                                    />

                                    <p className="text-xs text-gray-500">
                                        Click to change image
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-200">
                                        <CloudUpload size={22} />
                                    </div>

                                    <p className="text-sm font-medium text-gray-700">
                                        Click to upload
                                    </p>

                                    <p className="mt-1 text-xs text-gray-400">
                                        PNG or JPG (MAX. 5MB)
                                    </p>
                                </>
                            )}
                        </label>
                    </div>

                    <div className="flex items-center gap-3 pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-2xl bg-[#00288E] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#001f70] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {loading ? "Updating..." : "Update Item"}
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/admin/item-management")}
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