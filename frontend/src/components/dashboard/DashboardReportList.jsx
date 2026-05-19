import DashboardReportCard from "./DashboardReportCard"

export default function DashboardReportList({ reports }) {

  return (
    <div className="grid grid-cols-2 gap-5">

      {reports.map((report) => (
        <DashboardReportCard
          key={report.id}
          report={report}
        />
      ))}

    </div>
  )
}