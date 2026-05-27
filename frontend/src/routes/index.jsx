import { createBrowserRouter } from "react-router-dom";
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

export const router = createBrowserRouter([
    { path: "/", element: <App /> },
    { path: "/register", element: <RegisterPage /> },
    { path: "/login", element: <LoginPage /> },


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
                    {path: "/items/:id", element: <ItemDetailPage /> },
                    {path: "/MyReport", element: <MyReport /> },
                    {path: "/dashboard/my-claims", element: <MyClaim />}

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
                    {path: "/admin/dashboard", element: <AdminDashboard />},
                    {path: "/admin/category-management", element: <CategoryManagement />},
                    {path: "/admin/categories/create", element: < CreateCategory />},
                    {path: "/admin/categories/edit/:id", element: <EditCategory />},
                    {path: "/admin/categories/trash", element: <TrashCategory />}
                ]
            }
        ]
    }
]);