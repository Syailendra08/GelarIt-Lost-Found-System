import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import RegisterPage from "../pages/Register";
import LoginPage from "../pages/Login";
import Dashboard from "../pages/users/Dashboard";

export const router = createBrowserRouter([
    {path: "/", element: <App />},
    {path: "/register", element: <RegisterPage />},
    {path: "/login", element: <LoginPage />},
    {path: "/dashboard", element: <Dashboard />}
])