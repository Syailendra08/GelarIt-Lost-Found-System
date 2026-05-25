import { useContext, useEffect, useState } from "react"

import WelcomeSection from "../../components/dashboard/WelcomeSection"
import QuickActions from "../../components/dashboard/QuickActions"
import { useNavigate } from "react-router-dom";
import DashboardReportList from "../../components/dashboard/DashboardReportList"
import { getItemsByUser } from "../../api/item.api"
import { AuthContext } from "../../contexts/AuthContext"
import NotificationPanel from "../../components/dashboard/NotificationPanel"
import Swal from "sweetalert2"
import { deleteItem } from "../../api/item.api"


export default function Dashboard() {
  const [reports, setReports] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  async function fetchDashboard(userId) {
    try {

      const result = await getItemsByUser(
        userId,
        {
          limit: 3,
          sortBy: "createdAt",
          order: "DESC"
        }
      );

      setReports(result.data?.data || []);

    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = async (id) => {
  
    const result = await Swal.fire({
      title: "Delete Report?",
      text: "Are you sure want to delete this report?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
    });
  
    if (!result.isConfirmed) return;
  
    try {
  
      await deleteItem(id);
  
      Swal.fire({
        icon: "success",
        title: "Report deleted successfully",
        timer: 1500,
        showConfirmButton: false,
      });
  
      fetchDashboard(user.id);
  
    } catch (error) {
  
      console.log(error);
  
      Swal.fire({
        icon: "error",
        title: "Failed to delete report",
        timer: 1500,
        showConfirmButton: false,
      });
  
    }
  };
  
  

  useEffect(() => {
    if (user?.id) {
      fetchDashboard(user.id);
    }
  }, [user]);


  return (
    <>
      <div className="min-h-screen bg-[#f5f5f7] p-6">
        <WelcomeSection user={user} />
        <QuickActions />

        <div className="grid grid-cols-12 gap-5 mt-8">


          <div className="col-span-12 lg:col-span-8">

            <div className="flex items-center justify-between mb-4">

              <h1 className="text-3xl font-bold text-blue-950">
                My Reports
              </h1>

              
              <button onClick={() => navigate("/MyReport")} className="text-sm text-blue-900 hover:underline">
                See all →
              </button>

            </div>
            <DashboardReportList reports={reports} handleDelete={handleDelete}  className="grid-cols-2" />
          </div>

          <div className="col-span-12 lg:col-span-4">
            <NotificationPanel />
          </div>
        </div>
      </div>
    </>
  )
}