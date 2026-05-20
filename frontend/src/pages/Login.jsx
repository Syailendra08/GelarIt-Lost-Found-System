import { Checkbox } from "flowbite-react";
import { useState } from "react";
import FormInput from "../components/FormInput";
import ButtonComp from "../components/ButtonComp";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Swal from "sweetalert2";

export default function LoginPage() {
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  async function processLogin(e) {

    e.preventDefault();

    const url = "http://localhost:3000/login";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();


      if (response.status !== 200) {

        throw new Error(
          result.message || "Login Failed"
        );

      }

      
      login(result.data.token, result.data);

      Swal.fire({
        icon: "success",
        title: "Login berhasil",
        timer: 1200,
        showConfirmButton: false,
      });

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Login Failed",
        timer: 1200,
        showConfirmButton: false,
      });

    }

  }

  return (

    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-[#f4f3ff] to-[#e7e6ff] px-4">

      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-lg">

        <div className="mb-6 text-center">

          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-700">

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>

          </div>

          <h1 className="text-2xl font-bold text-blue-950">
            GelarIt
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            University Lost & Found Portal
          </p>

        </div>

        <form
          className="space-y-4"
          onSubmit={processLogin}
        >

          <FormInput
            label="Email Address"
            type="email"
            name="email"
            placeholder="student@university.edu"
            value={formData.email}
            onChange={handleChange}
          />

          <FormInput
            label="Password"
            type="password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
          />

          <div className="flex items-center gap-2">

            <Checkbox />

            <span className="text-sm text-gray-500">
              Remember this device
            </span>

          </div>

          <ButtonComp
            type="submit"
            className="w-full bg-yellow-400 text-black hover:bg-yellow-500"
          >
            Login
          </ButtonComp>

        </form>

        <div className="mt-6 pt-4 text-center text-sm text-gray-500">

          Don&apos;t have an account?{" "}

          <Link
            to="/register"
            className="font-medium text-blue-600 hover:underline"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>

  );

}