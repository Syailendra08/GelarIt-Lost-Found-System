import { useEffect, useState } from "react";
import { Package, Clock, FileText, Users } from "lucide-react";

import { getItemStats } from "../../api/item.api";
import { getRequestStats } from "../../api/request.api";
import { getUserStats } from "../../api/user.api";


export default function DashboardStats() {
  const [stats, setStats] = useState({
    totalItems: 0,
    pending: 0,
    total: 0,
    totalUsers: 0,
  });

  const fetchDashboardData = async () => {
    try {
      const [
        itemResult,
        requestResult,
        userResult,

      ] = await Promise.all([
        getItemStats(),
        getRequestStats(),
        getUserStats(),
      ]);

      setStats({
        totalItems: itemResult.data.total,
        pending: requestResult.data.pending,
        total: requestResult.data.total,
        totalUsers: userResult.data.totalUsers,
      });
      console.log("item", itemResult);
      console.log("request", requestResult);
      console.log("user", userResult);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchDashboardData();
  }, []);

  const cards = [
    {
      title: "TOTAL ITEMS",
      value: stats.totalItems,
      icon: Package,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "PENDING REQUESTS",
      value: stats.pending,
      icon: Clock,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      title: "TOTAL REQUESTS",
      value: stats.total,
      icon: FileText,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "TOTAL USERS",
      value: stats.totalUsers,
      icon: Users,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4 mb-4">
      {cards.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={index}
            className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div className="mb-3">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-2xl ${item.iconBg}`}
              >
                <Icon size={20} className={item.iconColor} />
              </div>
            </div>

            <p className="text-[11px] font-semibold tracking-[0.15em] text-gray-500">
              {item.title}
            </p>

            <h2 className="mt-2 text-4xl font-semibold text-slate-900">
              {item.value}
            </h2>
          </div>
        );
      })}
    </div>
  );
}