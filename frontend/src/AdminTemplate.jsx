limport { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";

export default function AdminTemplate() {

  return (
    <div className="flex min-h-screen bg-[#F6F7FB]">
      <AdminSidebar />

      
      <main className="flex-1 overflow-y-auto p-6">

        <Outlet />
      </main>
    </div>
  );
}