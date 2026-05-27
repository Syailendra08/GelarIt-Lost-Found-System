// components/admin/AdminSidebar.jsx

import {
    LayoutDashboard,
    PackageSearch,
    ClipboardCheck,
    FolderKanban,
    MapPinned,
    Tags,
    Users,
    Settings,
    CircleHelp,
    LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";

export default function AdminSidebar() {




    return (
        <aside className="flex min-h-screen w-72.5 flex-col border-r border-gray-200 bg-[#F7F8FC] px-5 py-7">
        
            <div className="mb-10">
                <h1 className="text-3xl font-black tracking-tight text-[#00288E]">
                    GelarIt
                </h1>

                <p className="mt-1 text-sm leading-relaxed text-gray-500">
                   <span className="text-blue-800 font-bold"> School Portal</span>
                    <br />
                    Lost & Found Admin
                </p>
            </div>

         
            <div className="flex-1 space-y-2">
                <NavLink
                    to="/admin/dashboard"
                    className={({ isActive }) =>
                        `group flex items-center gap-4 rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${isActive
                            ? "bg-[#F4C400] text-[#1E293B] shadow-sm"
                            : "text-gray-500 hover:bg-white hover:text-[#00288E] hover:shadow-sm"
                        }`
                    }
                >

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">

                        <LayoutDashboard size={18} />

                    </div>
                    Dashboard
                </NavLink>

            
                <NavLink
                    to="/admin/lost-management"
                    className={({ isActive }) =>
                        `group flex items-center gap-4 rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${isActive
                            ? "bg-[#F4C400] text-[#1E293B] shadow-sm"
                            : "text-gray-500 hover:bg-white hover:text-[#00288E] hover:shadow-sm"
                        }`
                    }
                >

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">

                        <PackageSearch size={18} />

                    </div>
                    Lost Management
                </NavLink>

                <NavLink
                    to="/admin/found-management"
                    className={({ isActive }) =>
                        `group flex items-center gap-4 rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${isActive
                            ? "bg-[#F4C400] text-[#1E293B] shadow-sm"
                            : "text-gray-500 hover:bg-white hover:text-[#00288E] hover:shadow-sm"
                        }`
                    }
                >

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">

                        <ClipboardCheck size={18} />

                    </div>
                    Found Management
                </NavLink>

                <NavLink
                    to="/admin/request-management"
                    className={({ isActive }) =>
                        `group flex items-center gap-4 rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${isActive
                            ? "bg-[#F4C400] text-[#1E293B] shadow-sm"
                            : "text-gray-500 hover:bg-white hover:text-[#00288E] hover:shadow-sm"
                        }`
                    }
                >

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">

                        <FolderKanban size={18} />

                    </div>
                    Request Management
                </NavLink>


                <NavLink
                    to="/admin/category-management"
                    className={({ isActive }) =>
                        `group flex items-center gap-4 rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${isActive
                            ? "bg-[#F4C400] text-[#1E293B] shadow-sm"
                            : "text-gray-500 hover:bg-white hover:text-[#00288E] hover:shadow-sm"
                        }`
                    }
                >

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">

                        <Tags size={18} />

                    </div>
                    Category Management
                </NavLink>

 
                <NavLink
                    to="/admin/location-management"
                    className={({ isActive }) =>
                        `group flex items-center gap-4 rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${isActive
                            ? "bg-[#F4C400] text-[#1E293B] shadow-sm"
                            : "text-gray-500 hover:bg-white hover:text-[#00288E] hover:shadow-sm"
                        }`
                    }
                >

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">

                        <MapPinned size={18} />

                    </div>
                    Location Management
                </NavLink>

     
                <NavLink
                    to="/admin/users"
                    className={({ isActive }) =>
                        `group flex items-center gap-4 rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${isActive
                            ? "bg-[#F4C400] text-[#1E293B] shadow-sm"
                            : "text-gray-500 hover:bg-white hover:text-[#00288E] hover:shadow-sm"
                        }`
                    }
                >

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
                        <Users size={18} />
                    </div>
                    Student Directory
                </NavLink>
                {/* SETTINGS */}
                <NavLink
                    to="/admin/settings"
                    className={({ isActive }) =>
                        `group flex items-center gap-4 rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${isActive
                            ? "bg-[#F4C400] text-[#1E293B] shadow-sm"
                            : "text-gray-500 hover:bg-white hover:text-[#00288E] hover:shadow-sm"
                        }`
                    }
                >

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
                        <Settings size={18} />
                    </div>
                    Settings
                </NavLink>
            </div>

            <div className="mt-8 border-t border-gray-200 pt-6 space-y-2">
                <button className="flex w-full items-center gap-4 rounded-2xl px-4 py-3 text-sm font-semibold text-gray-500 transition hover:bg-white hover:text-[#00288E] hover:shadow-sm">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
                        <CircleHelp size={18} />
                    </div>
                    Help Center
                </button>

                <button className="flex w-full items-center gap-4 rounded-2xl px-4 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
                        <LogOut size={18} />
                    </div>
                    Logout
                </button>
            </div>
        </aside>
    );
}