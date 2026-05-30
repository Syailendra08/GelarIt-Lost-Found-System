import { matchPath, useLocation } from "react-router-dom";

export default function AdminHeader() {

  const location = useLocation();

  const titles = {
    "/admin/dashboard": "Dashboard",
    "/admin/item-management": "Item Management",
    "/admin/request-management": "Request Management",
    "/admin/category-management": "Category Management",
    "/admin/location-management": "Location Management",
    "/admin/categories/create": "Create Category",
    "/admin/categories/edit/:id": "Edit Category",
    "/admin/categories/trash": "Category Trash",
    "/admin/locations/create": "Create Location",
    "/admin/locations/edit/:id": "Edit Location",
    "/admin/locations/trash": "Location Trash",
    "/admin/users": "User Directory",
    "/admin/users/create": "Create User",
    "/admin/users/edit/:id": "Edit User",
    "/admin/items/create": "Create Item",
    "/admin/items/edit/:id": "Edit Item",
    "/admin/items/trash": "Create Item",
    "/admin/requests/trash": "Request Trash"

    
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

      
    </header>
  );
}