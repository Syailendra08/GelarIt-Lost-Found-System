// components/NavbarComp.jsx
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import ButtonComp from "./ButtonComp";

export default function NavbarComp() {
  return (
    <nav className="border-b border-gray-200 bg-[#f8f7fc] px-6 py-3">
      <div className="mx-auto flex max-w-7xl items-center justify-between">


        <div className="flex items-center gap-40">

          <h1 className="text-2xl font-bold text-blue-800">
            GelarIt
          </h1>

          <div className="flex items-center gap-7 text-sm font-medium">

            <Link
              to="/"
              className="border-b-2 border-blue-700 pb-1 text-blue-800"
            >
              Home
            </Link>

            <Link
              to="/browse"
              className="text-gray-500 hover:text-gray-800"
            >
              Browse Items
            </Link>

            <Link
              to="/how-it-works"
              className="text-gray-500 hover:text-gray-800"
            >
              How It Works
            </Link>

            <Link
              to="/support"
              className="text-gray-500 hover:text-gray-800"
            >
              Support
            </Link>
          </div>
        </div>


        <div className="flex items-center gap-3">

          <ButtonComp className="bg-yellow-400 text-black hover:bg-yellow-500">
            Report Item
          </ButtonComp>

          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Button
              outline
              className="border border-blue-700 text-blue-700 hover:bg-blue-50"
            >
              Log In
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}