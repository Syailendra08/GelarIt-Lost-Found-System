import { useContext, useEffect, useState } from "react"

import WelcomeSection from "../../components/dashboard/WelcomeSection"
import QuickActions from "../../components/dashboard/QuickActions"

import DashboardReportList from "../../components/dashboard/DashboardReportList"
import { getItemsByUser } from "../../api/item.api"
import { AuthContext } from "../../contexts/AuthContext"
import NotificationPanel from "../../components/dashboard/NotificationPanel"


export default function Dashboard() {
  const [reports, setReports] = useState([]);
  const { user } = useContext(AuthContext);

  async function fetchDashboard(userId) {
    try {

      const result = await getItemsByUser(userId);
      setReports(result.data?.data || []);





    } catch (error) {

      console.log(error);

    }
  }

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

              <button className="text-sm text-blue-700 hover:underline">
                See all →
              </button>

            </div>
            <DashboardReportList reports={reports} />
          </div>

          <div className="col-span-12 lg:col-span-4">
            <NotificationPanel />
          </div>
        </div>
      </div>
    </>
  )
}