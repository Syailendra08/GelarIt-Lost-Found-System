import { Outlet } from "react-router-dom";
import AdminSidebar from "./components/Admin/AdminSidebar";
import AdminHeader from "./components/Admin/AdminHeader";
import Footer from "./components/Footer";


export default function AdminTemplate() {

  return (
    <div className="flex min-h-screen bg-[#F6F7FB]">
      <AdminSidebar />

      <div className="flex flex-1 flex-col">
        <AdminHeader />

        <main className="flex-1 overflow-y-auto p-6">

          <Outlet />
        </main>
        <Footer />
      </div>
      </div>
      );
}