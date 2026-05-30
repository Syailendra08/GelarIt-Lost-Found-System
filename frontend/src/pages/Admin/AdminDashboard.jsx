import { useEffect, useState } from "react";

import DashboardStats from "../../components/Admin/DashboardStats";
import { getItemStats } from "../../api/item.api";
import ItemStatusChart from "../../components/Admin/ItemStatusChart";

export default function Dashboard() {

    const [stats, setStats] = useState(null);

  

    const fetchItemStats = async () => {
        try {
            const response = await getItemStats();

            setStats(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchItemStats();
    }, []);

    if (!stats) return <p>Loading...</p>;

    const chartData = [
        {
            name: "Lost",
            value: stats.lost
        },
        {
            name: "Found",
            value: stats.found
        },
        {
            name: "Claimed",
            value: stats.claimed
        },
        {
            name: "Taken",
            value: stats.taken
        }
    ];

      
    return (
        <>
        <DashboardStats />
      <ItemStatusChart data={chartData} />
        </>
    )
}
    
