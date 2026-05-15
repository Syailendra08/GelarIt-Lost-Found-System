import {
  Checkbox,
} from "flowbite-react";
import FormInput from "../components/FormInput";
import ButtonComp from "../components/ButtonComp";



export default function LoginPage() {
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

        
        <form className="space-y-4">
            <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
                Email
              </label>
</div>
          <FormInput
            label="Email Address"
            type="email"
            placeholder="student@university.edu"
          />

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>

              <button
                type="button"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <FormInput
              type="password"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center gap-2">
            <Checkbox />

            <span className="text-sm text-gray-500">
              Remember this device
            </span>
          </div>
    
          <ButtonComp className="w-full bg-yellow-400 text-black hover:bg-yellow-500">
            Login
          </ButtonComp>
        </form>

       
        <div className="mt-6  pt-4 text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          
          <button className="font-medium text-blue-600 hover:underline">
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}