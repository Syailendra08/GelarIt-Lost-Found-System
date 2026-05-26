import { ClipboardList, PackageCheck, Clock3, TrendingUp, } from "lucide-react";

export default function DashboardStats() {

  const stats = [
    {
      title: "TOTAL ITEMS REPORTED",
      value: "1,284",
      subtitle: "vs. last month: 1,142",
      icon: ClipboardList,
      iconBg: "bg-[#EEF2FF]",
      iconColor: "text-[#4F46E5]",
      extra: "↗ 12%",
      extraColor: "text-green-600",
    },

    {
      title: "ACTIVE CLAIMS",
      value: "42",
      subtitle: "Pending verification",
      icon: PackageCheck,
      iconBg: "bg-[#FEF3C7]",
      iconColor: "text-[#B45309]",
      extra: "!  8 new",
      extraColor: "text-red-500",
    },

    {
      title: "RETURN RATE",
      value: "68.4%",
      subtitle: "",
      icon: TrendingUp,
      iconBg: "bg-[#DCFCE7]",
      iconColor: "text-[#15803D]",
      extra: "+3%",
      extraColor: "text-green-600",
      progress: 68,
    },

    {
      title: "AVG. RESOLUTION TIME",
      value: "4.2 days",
      subtitle: "Target: < 5.0 days",
      icon: Clock3,
      iconBg: "bg-[#FEE2E2]",
      iconColor: "text-[#B45309]",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">

      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={index}
            className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm"
          >

    
            <div className="mb-3 flex items-start justify-between">

              <div
                className={`flex h-11 w-11 items-center justify-center rounded-2xl ${item.iconBg}`}
              >
                <Icon size={20} className={item.iconColor} />
              </div>

              {item.extra && (
                <span
                  className={`text-sm font-medium ${item.extraColor}`}
                >
                  {item.extra}
                </span>
              )}

            </div>

  
            <div>

              <p className="text-[11px] font-semibold tracking-[0.15em] text-gray-500">
                {item.title}
              </p>

              <h2 className="mt-2 text-4xl font-semibold tracking-tight text-[#0F172A]">
                {item.value}
              </h2>

              {item.progress && (
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full rounded-full bg-[#22C55E]"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              )}

              {item.subtitle && (
                <p className="mt-3 text-sm text-gray-500">
                  {item.subtitle}
                </p>
              )}

            </div>
          </div>
        );
      })}
    </div>
  );
}