import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import RegisterPage from "../pages/Register";
import LoginPage from "../pages/Login";
import Dashboard from "../pages/users/Dashboard";
import ProtectedRoute from "../components/ProtectedRoute";
import CreateItem from "../pages/items/CreateItem";

export const router = createBrowserRouter([
    {path: "/",element: <App />},
    {path: "/register", element: <RegisterPage />},
    {path: "/login",element: <LoginPage />},

  
    {
        element: <ProtectedRoute />,
        children: [
            {path: "/dashboard", element: <Dashboard />},
            {path: "/items/create", element: <CreateItem />}
        ]
    }
]);