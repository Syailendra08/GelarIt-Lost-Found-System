import { Search } from "lucide-react";
import { matchPath, useLocation } from "react-router-dom";

export default function AdminHeader() {

  const location = useLocation();

  const titles = {
    "/admin/dashboard": "Dashboard",
    "/admin/lost-management": "Lost Management",
    "/admin/found-management": "Found Management",
    "/admin/request-management": "Request Management",
    "/admin/category-management": "Category Management",
    "/admin/location-management": "Location Management",
    "/admin/categories/create": "Create Category",
    "/admin/categories/edit/:id": "Edit Category",
    "/admin/categories/trash": "Trash Category",
    "/admin/locations/create": "Create Location",
    "/admin/locations/edit/:id": "Edit Location",
    "/admin/locations/trash": "Trash Location",
    "/admin/students": "Student Directory",
    "/admin/settings": "Settings",
  };

  const currentTitle =
  Object.entries(titles).find(([path]) =>
    matchPath(path, location.pathname)
  )?.[1] || "Admin Panel";

  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-[#F7F8FC] px-8 py-4">

      <div>
        <h1 className="text-3xl font-bold text-[#00288E]">
          {currentTitle}
        </h1>
      </div>

      <div className="flex items-center gap-4">

        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search items..."
            className="w-72 rounded-2xl border border-gray-300 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#00288E]"
          />
        </div>

      
        <button className="rounded-2xl bg-[#F4C400] px-6 py-3 text-sm font-semibold text-[#1E293B] shadow-sm transition hover:opacity-90">
          + Report New Item
        </button>

      </div>
    </header>
  );
}