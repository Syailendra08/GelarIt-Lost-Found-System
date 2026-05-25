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
    }
]);