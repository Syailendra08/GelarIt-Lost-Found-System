
import {
    Bell,
    CheckCircle2,
    AlertCircle,
} from "lucide-react";

export default function NotificationPanel() {

    const notifications = [
        {
            id: 1,
            type: "comment",
            title: "New comment on your report",
            message:
                "Jane Doe: 'I think I saw your water bottle near the gym lockers this morning.'",
            time: "2h ago",
            initials: "JD",
            color:
                "bg-yellow-400 text-yellow-900",
        },

        {
            id: 2,
            type: "approved",
            title: "Status change: Approved",
            message:
                'Your claim for "Calculus Textbook" has been approved. Visit the office to collect it.',
            time: "4h ago",
            icon: (
                <CheckCircle2 size={16} />
            ),
            color:
                "bg-[#1E40AF] text-white",
        },

        {
            id: 3,
            type: "info",
            title: "General update",
            message:
                "New lost and found policy has been updated for the fall semester.",
            time: "1d ago",
            icon: (
                <AlertCircle size={16} />
            ),
            color:
                "bg-gray-100 text-gray-500",
        },
    ];

    return (
        <div className="rounded-3xl bg-[#f7f5ff] p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2">

                    <Bell
                        size={18}
                        className="text-[#1E40AF]"
                    />

                    <h2 className="text-2xl font-bold text-[#1E3A8A]">
                        Notifications
                    </h2>
                </div>
                <button className="text-xs font-medium text-[#4F46E5] hover:underline">
                    Mark all as read
                </button>
            </div>
           
            <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Today
                </p>

                <div className="space-y-3">
                    {notifications
                        .slice(0, 2)
                        .map((item) => (
                            <div
                                key={item.id}
                                className="flex gap-3 rounded-2xl bg-white p-3 transition hover:shadow-md"
                            >

                                <div
                                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${item.color}`}
                                >
                                    {item.initials
                                        ? item.initials
                                        : item.icon}
                                </div>

                                <div className="min-w-0 flex-1">
                                    <div className="flex items-start justify-between gap-3">
                                        <h3 className="line-clamp-1 text-sm font-semibold text-gray-800">
                                            {item.title}
                                        </h3>
                                        <span className="shrink-0 text-xs text-gray-400">
                                            {item.time}
                                        </span>
                                    </div>
                                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-gray-500">
                                        {item.message}
                                    </p>
                                </div>
                            </div>
                        ))}
                </div>
            </div>

            <div className="mt-6">

                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Yesterday
                </p>

                <div className="space-y-3">
                    {notifications
                        .slice(2)
                        .map((item) => (

                            <div
                                key={item.id}
                                className="flex gap-3 rounded-2xl bg-white p-3 transition hover:shadow-md"
                            >

                                <div
                                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${item.color}`}
                                >
                                    {item.icon}
                                </div>

                                <div className="min-w-0 flex-1">
                                    <div className="flex items-start justify-between gap-3">
                                        <h3 className="line-clamp-1 text-sm font-semibold text-gray-800">
                                            {item.title}
                                        </h3>
                                        <span className="shrink-0 text-xs text-gray-400">
                                            {item.time}
                                        </span>
                                    </div>
                                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-gray-500">
                                        {item.message}
                                    </p>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}