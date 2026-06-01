import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import RegisterPage from "../pages/Register";
import LoginPage from "../pages/Login";
import Dashboard from "../pages/users/Dashboard";
import ProtectedRoute from "../components/ProtectedRoute";
import CreateItem from "../pages/items/CreateItem";

import EditItem from "../pages/items/EditItem";
import GalleryPage from "../pages/users/GalleryPage";
import ItemDetailPage from "../pages/users/ItemDetailPage";
import UserTemplate from "../UserTemplate";
import MyReport from "../pages/users/MyReport";
import MyClaim from "../pages/users/MyClaim";
import AdminTemplate from "../AdminTemplate";
import AdminDashboard from "../pages/Admin/AdminDashboard";

import CreateCategory from "../pages/Admin/Category/CreateCategory";
import EditCategory from "../pages/Admin/Category/EditCategory";
import CategoryManagement from "../pages/Admin/Category/CategoryManagement";
import TrashCategory from "../pages/Admin/Category/TrashCategory";
import LocationManagement from "../pages/Admin/Location/LocationManagement";
import CreateLocation from "../pages/Admin/Location/CreateLocation";
import EditLocation from "../pages/Admin/Location/EditLocation";
import TrashLocation from "../pages/Admin/Location/TrashLocation";
import UserManagement from "../pages/Admin/User/UserManagement";
import CreateUser from "../pages/Admin/User/CreateUser";
import EditUser from "../pages/Admin/User/EditUser";
import TrashUser from "../pages/Admin/User/TrashUser";
import ItemManagement from "../pages/Admin/Item/ItemManagement";
import CreateItemAdmin from "../pages/Admin/Item/CreateItemAdmin";
import EditItemAdmin from "../pages/Admin/Item/EditItemAdmin";
import TrashItem from "../pages/Admin/Item/TrashItem";
import RequestManagement from "../pages/Admin/Request/RequestManagement";
import TrashRequest from "../pages/Admin/Request/TrashRequest";


export const router = createBrowserRouter([
    {
        element: <UserTemplate />,
        children: [
            { path: "/", element: <App /> },
            { path: "/register", element: <RegisterPage /> },
            { path: "/login", element: <LoginPage /> },
        ]
    },



    {
        element: <ProtectedRoute />,
        children: [
            {
                element: <UserTemplate />,
                children: [
                    { path: "/dashboard", element: <Dashboard /> },
                    { path: "/items/create", element: <CreateItem /> },
                    { path: "/items/edit/:id", element: <EditItem /> },
                    { path: "/gallery-page", element: <GalleryPage /> },
                    { path: "/items/:id", element: <ItemDetailPage /> },
                    { path: "/MyReport", element: <MyReport /> },
                    { path: "/dashboard/my-claims", element: <MyClaim /> }

                ]
            }

        ]
    },

    {
        element: <ProtectedRoute adminOnly={true} />,
        children: [
            {
                element: <AdminTemplate />,
                children: [
                    {
                        path: "/admin",
                        element: <Navigate to="/admin/dashboard" replace />
                    },
                    { path: "/admin/dashboard", element: <AdminDashboard /> },
                    { path: "/admin/category-management", element: <CategoryManagement /> },
                    { path: "/admin/categories/create", element: < CreateCategory /> },
                    { path: "/admin/categories/edit/:id", element: <EditCategory /> },
                    { path: "/admin/categories/trash", element: <TrashCategory /> },
                    { path: "/admin/location-management", element: <LocationManagement /> },
                    { path: "/admin/locations/create", element: <CreateLocation /> },
                    { path: "/admin/locations/edit/:id", element: <EditLocation /> },
                    { path: "/admin/locations/trash", element: <TrashLocation /> },
                    { path: "/admin/users", element: <UserManagement /> },
                    { path: "/admin/users/create", element: <CreateUser /> },
                    { path: "/admin/users/edit/:id", element: <EditUser /> },
                    { path: "/admin/users/trash", element: <TrashUser /> },
                    { path: "/admin/item-management", element: <ItemManagement /> },
                    { path: "/admin/items/create", element: <CreateItemAdmin /> },
                    { path: "/admin/items/edit/:id", element: <EditItemAdmin /> },
                    { path: "/admin/items/trash", element: <TrashItem /> },
                    { path: "/admin/request-management", element: <RequestManagement /> },
                    { path: "/admin/requests/trash", element: <TrashRequest /> },

                ]
            }
        ]
    }
]);