import { useEffect, useState } from "react"
import axios from "axios"

import WelcomeSection from "../../components/dashboard/WelcomeSection"
import QuickActions from "../../components/dashboard/QuickActions"

import DashboardReportList from "../../components/dashboard/DashboardReportList"
import NavbarComp from "../../components/NavbarComp"

export default function Dashboard() {
    const user = JSON.parse(localStorage.getItem("user"))

  const [reports, setReports] = useState([])

  async function fetchDashboard() {
    try {

      const user = JSON.parse(localStorage.getItem("user"))
const token = localStorage.getItem("token")

const reportResponse = await axios.get(
  `http://localhost:3000/items/users/${user.id}`,
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
)

    setReports(reportResponse.data.data?.data || [])
    
console.log(reportResponse.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchDashboard()
  }, [])

  return ( <>
    <NavbarComp />
    <div className="min-h-screen bg-[#f5f5f7] p-6">

      <WelcomeSection user={user} />

      <QuickActions />

      <div className="grid grid-cols-12 gap-5 mt-8">

        
        <div className="col-span-8">

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

       
      </div>
    </div>
    </>
  )
}