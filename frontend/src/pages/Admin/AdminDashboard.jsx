import { useEffect, useState } from "react";

import DashboardStats from "../../components/Admin/DashboardStats";
import ItemStatusChart from "../../components/Admin/ItemStatusChart";
import RequestStatusChart from "../../components/Admin/RequestStatusChart";
import { getItemStats } from "../../api/item.api";
import { getRequestStats } from "../../api/request.api";

export default function Dashboard() {
    const [stats, setStats] = useState(null);
    const [requestStats, setRequestStats] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const [itemResponse, requestResponse] =
                await Promise.all([
                    getItemStats(),
                    getRequestStats(),
                ])

            setStats(itemResponse.data);
            setRequestStats(requestResponse.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex h-64 items-center justify-center">
                Loading...
            </div>
        );
    }

    if (!stats || !requestStats) {
        return (
            <div className="text-center text-red-500">
                Failed to load dashboard data
            </div>
        );
    }

    const chartData = [
        {
            name: "Lost",
            value: stats.lost,
        },
        {
            name: "Found",
            value: stats.found,
        },
        {
            name: "Claimed",
            value: stats.claimed,
        },
        {
            name: "Taken",
            value: stats.taken,
        },
    ];

    const requestChartData = [
        {
            name: "Pending",
            value: requestStats.pending,
        },
        {
            name: "Approved",
            value: requestStats.approved,
        },
        {
            name: "Rejected",
            value: requestStats.rejected,
        },
        {
            name: "Completed",
            value: requestStats.completed,
        },
    ];

    return (
        <div className="space-y-6">
            <DashboardStats />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <ItemStatusChart data={chartData} />
                <RequestStatusChart
                    data={requestChartData}
                />
            </div>
        </div>
    );
}