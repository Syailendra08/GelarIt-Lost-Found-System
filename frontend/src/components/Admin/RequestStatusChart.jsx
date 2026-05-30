import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const COLORS = [
    "#f59e0b",
    "#22c55e",
    "#ef4444",
    "#3b82f6",
];

export default function RequestStatusChart({
    data,
}) {
    const total = data.reduce(
        (sum, item) => sum + item.value,
        0
    );

    return (
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
            <h2 className="mb-6 text-lg font-semibold text-gray-800">
                Request Status Overview
            </h2>

             <div className="flex flex-col items-center gap-6 lg:flex-row">
                        
                            <div className="relative h-[300px] w-full lg:w-1/2">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={data}
                                            dataKey="value"
                                            nameKey="name"
                                            innerRadius={70}
                                            outerRadius={100}
                                            paddingAngle={4}
                                            strokeWidth={2}
                                        >
                                            {data.map((entry, index) => (
                                                <Cell
                                                    key={index}
                                                    fill={
                                                        COLORS[index % COLORS.length]
                                                    }
                                                />
                                            ))}
                                        </Pie>
            
                                        <Tooltip
                                            contentStyle={{
                                                borderRadius: "12px",
                                                border: "none",
                                                boxShadow:
                                                    "0 4px 20px rgba(0,0,0,0.1)",
                                            }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
            
                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                    <span className="text-3xl font-bold text-gray-900">
                                        {total}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        Total Items
                                    </span>
                                </div>
                            </div>
            
            
                            <div className="flex w-full flex-col gap-4 lg:w-1/2">
                                {data.map((item, index) => (
                                    <div
                                        key={item.name}
                                        className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="h-4 w-4 rounded-full"
                                                style={{
                                                    backgroundColor:
                                                        COLORS[index % COLORS.length],
                                                }}
                                            />
            
                                            <span className="font-medium text-gray-700">
                                                {item.name}
                                            </span>
                                        </div>
            
                                        <span className="font-semibold text-gray-900">
                                            {item.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
        </div>
    );
}