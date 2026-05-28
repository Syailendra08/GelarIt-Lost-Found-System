import { useEffect, useState } from "react";

import {
    Bell,
    CheckCircle2,
    AlertCircle,
    MessageSquare,
    X,
} from "lucide-react";
import { getNotifications, readAllNotifications, readNotification } from "../../api/notification.api";



export default function NotificationPanel() {

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/immutability
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {

        const result = await getNotifications();

        setNotifications(result.data);

    };

    const handleReadNotification = async (id) => {

        await readNotification(id);

        setNotifications((prev) =>
            prev.filter((item) => item.id !== id)
        );

    };

    const handleReadAllNotifications = async () => {

        await readAllNotifications();

        setNotifications([]);

    };

    const getNotificationIcon = (type) => {

        switch (type) {

            case "comment":
                return {
                    icon: <MessageSquare size={16} />,
                    color: "bg-yellow-400 text-white"
                };

            case "approved":
                return {
                    icon: <CheckCircle2 size={16} />,
                    color: "bg-[#1E40AF] text-white"
                };

            case "rejected":
                return {
                    icon: <X size={16} />,
                    color: "bg-red-600 text-white"
                };

            default:
                return {
                    icon: <AlertCircle size={16} />,
                    color: "bg-gray-100 text-gray-500"
                };

        }

    };

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

                <button
                    onClick={handleReadAllNotifications}
                    className="text-xs font-medium text-[#4F46E5] hover:underline"
                >
                    Mark all as read
                </button>

            </div>

            <div className="space-y-3">
                {notifications.length > 0 ? (
                    notifications.map((item)=> {
                        const notificationStyle = getNotificationIcon(item.type);
                        return (

                            <div
                                key={item.id}
                                onClick={() => handleReadNotification(item.id)}
                                className="flex cursor-pointer gap-3 rounded-2xl bg-white p-3 transition hover:shadow-md"
                            >

                                <div
                                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${notificationStyle.color}`}
                                >

                                    {notificationStyle.icon}

                                </div>

                                <div className="min-w-0 flex-1">

                                    <div className="flex items-start justify-between gap-3">

                                        <h3 className="line-clamp-1 text-sm font-semibold text-gray-800">
                                            {item.title}
                                        </h3>

                                        <span className="shrink-0 text-xs text-gray-400">

                                            {new Date(item.createdAt).toLocaleDateString()}

                                        </span>

                                    </div>

                                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-gray-500">
                                        {item.message}
                                    </p>
                                </div>
                            </div>
                        );

                    })

                ) : (

                    <div className="rounded-2xl bg-white p-5 text-center text-sm text-gray-400">
                        No notifications
                    </div>
                )}
            </div>
        </div>
    );
}