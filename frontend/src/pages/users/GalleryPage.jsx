import { useEffect, useState } from "react";

import {
  Search,
  MapPin,
  CalendarDays,
} from "lucide-react";

import { getItems } from "../../api/item.api";
import StatusBadge from "../../components/StatusBadge";

import { getCategories } from "../../api/categories.api";
import { getLocations } from "../../api/locations.api";
import { Link } from "react-router-dom";
import PageHeader from "../../components/PageHeader";

export default function GalleryPage() {

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  async function fetchItems() {

    try {

      setLoading(true);

      const result = await getItems({
        page,
        limit: 8,
        name: search,
        category_id: selectedCategory,
        location_id: selectedLocation,
      });

      console.log(result);

      setItems(result.data.data || []);

      setPagination(result.data || {});

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  }

  async function fetchFilters() {
    try {
      const categoryResult = await getCategories();
      const locationResult = await getLocations();

      setCategories(categoryResult.data.data || []);
      setLocations(locationResult.data.data || []);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {

    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchItems();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search, selectedCategory, selectedLocation]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchFilters();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-[#f6f4f8] px-4 py-8 md:px-10">

       <PageHeader title="Items Gallery" description="Search and browse through recently found and reported it" />

        <div className="mb-8 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row">


            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search for items (e.g., 'Blue Backpack', 'iPhone')..."
                className="h-14 w-full rounded-xl border border-gray-200 bg-[#f8f7fb] pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>


            <div className="flex flex-col gap-3 sm:flex-row">


              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setPage(1);
                }}
                className="h-14 rounded-xl border border-gray-200 bg-[#f8f7fb] px-4 text-sm text-gray-700 outline-none focus:border-blue-500"
              >
                <option value="">All Categories</option>

                {categories.map((category) => (
                  <option
                    key={category.id}
                    value={category.id}
                  >
                    {category.name}
                  </option>
                ))}
              </select>


              <select
                value={selectedLocation}
                onChange={(e) => {
                  setSelectedLocation(e.target.value);
                  setPage(1);
                }}
                className="h-14 rounded-xl border border-gray-200 bg-[#f8f7fb] px-4 text-sm text-gray-700 outline-none focus:border-blue-500"
              >
                <option value="">All Locations</option>

                {locations.map((location) => (
                  <option
                    key={location.id}
                    value={location.id}
                  >
                    {location.name}
                  </option>
                ))}
              </select>


             
            </div>
          </div>
        </div>

        {!loading && items.length > 0 && (

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item) => (

              <Link key={item.id} to={`/items/${item.id}`}>
                <div
                  key={item.id}
                  className="overflow-hidden rounded-2xl border h-68 border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >

                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />

                    <div className="absolute right-3 top-3">
                      <StatusBadge status={item.status} />
                    </div>
                  </div>

                  <div className="space-y-1 p-3">
                    <h2 className="line-clamp-1 text-[13px] font-semibold text-gray-800">
                      {item.name}
                    </h2>

                    <div className="flex items-start gap-2 text-xs text-gray-500">
                      <MapPin size={13} className="mt-0.5 text-gray-400" />

                      <span className="line-clamp-1">
                        {item.location?.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <CalendarDays size={13} className="text-gray-400" />

                      <span>
                        {new Date(item.date).toLocaleDateString(
                          "en-US",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </span>
                    </div>

                    <div className="pt-1">
                      <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-medium text-gray-600">
                        {item.category?.name}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>


        )}


        <div className="mt-10 flex items-center justify-center">
          <p className="text-sm text-gray-500">
            Showing {pagination.rangeData} of {pagination.total} items
          </p>

          <div className="flex items-center gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="h-9 w-9 rounded-lg border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50"
            >
              {"<"}
            </button>

            {Array.from(
              { length: pagination.totalPage || 1 },
              (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setPage(index + 1)}
                  className={`h-9 min-w-9 rounded-lg px-3 text-sm font-medium transition
            ${page === index + 1
                      ? "bg-blue-700 text-white"
                      : "border border-gray-300 bg-white text-gray-600 hover:bg-gray-100"
                    }
          `}
                >
                  {index + 1}
                </button>
              )
            )}

            <button
              disabled={page >= (pagination.totalPage || 1)}
              onClick={() => setPage((prev) => prev + 1)}
              className="h-9 w-9 rounded-lg border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50"
            >
              {">"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}