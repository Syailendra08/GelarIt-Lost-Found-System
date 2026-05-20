import { useEffect, useState } from "react";
import { getCategories } from "../../api/categories.api";
import { getLocations } from "../../api/locations.api";
import { CloudUpload } from "lucide-react";

export default function ReportForm({
    onSubmit,
    loading = false,
    submitText = "Submit Report",
}) {
    const [categories, setCategories] = useState([]);
    const [locations, setLocations] = useState([]);

    const [imagePreview, setImagePreview] = useState(null);

    const [form, setForm] = useState({
        itemName: "",
        category: "",
        location: "",
        date: "",
        description: "",
        color: "",
        status: "lost",
        image: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleFile = (e) => {
        const file = e.target.files[0];

        setForm((prev) => ({ ...prev, image: file }));

        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSelect = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: Number(value) }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await onSubmit({
            categories_id: form.category,
            locations_id: form.location,
            name: form.itemName,
            description: form.description,
            color: form.color,
            status: form.status,
            date: form.date,
            image: form.image,
        });
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const catRes = await getCategories();
                const locRes = await getLocations();

                setCategories(catRes.data.data || []);
                setLocations(locRes.data.data || []);
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center p-6">
  <form
    onSubmit={handleSubmit}
    className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8"
  >
    
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-800">
        Report a Lost Item
      </h1>

      <p className="text-sm text-gray-500 mt-1">
        Provide as many details as possible to help us reunite you
      </p>
    </div>

    {/* ITEM NAME */}
    <div className="mb-5">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Item Name
      </label>

      <input
        name="itemName"
        value={form.itemName}
        onChange={handleChange}
        placeholder="e.g., Blue North Face Backpack"
        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-300"
      />
    </div>

    {/* CATEGORY + DATE */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Category
        </label>

        <select
          name="category"
          value={form.category}
          onChange={handleSelect}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-300"
        >
          <option value="">Select a category</option>

          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Date Lost
        </label>

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-300"
        />
      </div>
    </div>

    {/* LOCATION */}
    <div className="mb-5">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Last Seen Location
      </label>

      <select
        name="location"
        value={form.location}
        onChange={handleSelect}
        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-300"
      >
        <option value="">Select campus area</option>

        {locations.map((loc) => (
          <option key={loc.id} value={loc.id}>
            {loc.name}
          </option>
        ))}
      </select>
    </div>

    {/* COLOR + STATUS */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Item Color
        </label>

        <input
          name="color"
          value={form.color}
          onChange={handleChange}
          placeholder="e.g., Black, Blue"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-300"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Status
        </label>

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-300"
        >
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>
      </div>
    </div>

    {/* DESCRIPTION */}
    
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Detailed Description
      </label>

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Describe unique features, scratches, stickers, or internal contents..."
        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm h-32 resize-none outline-none focus:ring-2 focus:ring-indigo-300"
      />



                <div className="mt-6">
                    <p className="text-sm font-semibold text-gray-700 mb-2">
                        Upload Image (Optional)
                    </p>

                    <input
                        type="file"
                        id="file"
                        className="hidden"
                        onChange={handleFile}
                    />

                    <label
                        htmlFor="file"
                        className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl h-64 cursor-pointer bg-[#f8f7fc] hover:bg-[#f3f2fa] transition"
                    >
                        {imagePreview ? (
                            <div className="flex flex-col items-center gap-3">
                                <img
                                    src={imagePreview}
                                    alt="preview"
                                    className="w-40 h-40 object-cover rounded-xl shadow-md"
                                />

                                <p className="text-sm text-gray-500">
                                    Click to change image
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="w-16 h-16 rounded-full bg-indigo-200 flex items-center justify-center mb-4">
                                  <CloudUpload />
                                </div>

                                <p className="text-sm font-medium text-gray-700">
                                    Click to upload or drag and drop
                                </p>

                                <p className="text-xs text-gray-400 mt-1">
                                    PNG, JPG or PDF (MAX. 5MB)
                                </p>
                            </>
                        )}
                    </label>
                </div>

                <div className="flex gap-4 mt-8">
                    <button
                        type="button"
                        className="w-1/2 border border-indigo-400 text-indigo-700 rounded-xl py-3 font-medium hover:bg-indigo-50 transition"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-1/2 bg-yellow-400 hover:bg-yellow-500 text-gray-800 rounded-xl py-3 font-semibold shadow-md transition"
                    >
                        {loading ? "Loading..." : submitText}
                    </button>
                </div>
            </form>
        </div>
    );
}