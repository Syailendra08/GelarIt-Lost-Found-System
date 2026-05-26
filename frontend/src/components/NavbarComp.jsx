import { Button } from "flowbite-react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import ButtonComp from "./ButtonComp";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function NavbarComp() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLogin, logout } = useContext(AuthContext);





  return (
    <nav className="border-b border-gray-200 bg-[#f8f7fc] px-6 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">

        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-blue-800">
            GelarIt
          </h1>
        </div>

        <div className="hidden items-center gap-7 text-sm font-medium md:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `pb-1 border-b-2 transition ${isActive
                ? "border-blue-700 text-blue-800"
                : "border-transparent text-gray-500 hover:text-gray-800"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `pb-1 border-b-2 transition ${isActive
                ? "border-blue-700 text-blue-800"
                : "border-transparent text-gray-500 hover:text-gray-800"
              }`
            }
          >
            Dashboard
          </NavLink>



          <NavLink
            to="/gallery-page"
            className={({ isActive }) =>
              `pb-1 border-b-2 transition ${isActive
                ? "border-blue-700 text-blue-800"
                : "border-transparent text-gray-500 hover:text-gray-800"
              }`
            }
          >
            Browse Items
          </NavLink>

          <NavLink
            to="/support"
            className="text-gray-500 transition hover:text-gray-800"
          >
            Support
          </NavLink>
        </div>


        <div className="hidden items-center gap-3 md:flex">
          <ButtonComp className="bg-yellow-400 text-black hover:bg-yellow-500">
            Report Item
          </ButtonComp>

          {isLogin ? (
            <ButtonComp
              onClick={logout}
              className="bg-red-500 hover:bg-red-600"
            >
              Logout
            </ButtonComp>
          ) : (
            <Link
              to="/login"
              style={{ textDecoration: "none" }}
            >
              <Button
                outline
                className="border border-blue-700 text-blue-700 hover:bg-blue-50"
              >
                Log In
              </Button>
            </Link>
          )}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 md:hidden"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {isOpen && (
        <div className="mt-4 flex flex-col gap-4 border-t border-gray-200 pt-4 md:hidden">

          <Link
            to="/"
            className="font-medium text-blue-800"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>

          <Link
            to="/browse"
            className="font-medium text-gray-600 hover:text-black"
            onClick={() => setIsOpen(false)}
          >
            Browse Items
          </Link>

          <Link to="/how-it-works"
            className="font-medium text-gray-600 hover:text-black"
            onClick={() => setIsOpen(false)}
          >
            How It Works
          </Link>

          <Link to="/support"
            className="font-medium text-gray-600 hover:text-black"
            onClick={() => setIsOpen(false)}
          >
            Support
          </Link>

          <div className="mt-2 flex flex-col gap-3">
            <ButtonComp className="bg-yellow-400 text-black hover:bg-yellow-500">
              Report Item
            </ButtonComp>

            {isLogin ? (
              <ButtonComp
                onClick={logout} className="bg-red-500 hover:bg-red-600">
                Logout
              </ButtonComp>
            ) : (
              <Link to="/login">
                <Button outline className="w-full border border-blue-700 text-blue-700 hover:bg-blue-50" >
                  Log In
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}