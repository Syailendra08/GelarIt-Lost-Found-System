
import AddReportCard from "../AddReportCard"
import DashboardReportCard from "./DashboardReportCard"


export default function DashboardReportList({ reports, handleDelete, className = "" }) {

  
  return (
    <div
      className={`grid gap-5 ${className}`}
    >

      {reports.map((report) => (
        <DashboardReportCard
          key={report.id}
          report={report} handleDelete={handleDelete}
        />
      ))}
    <AddReportCard />
    </div>
  )
}