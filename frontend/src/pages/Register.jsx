
import FormInput from "../components/FormInput";
import ButtonComp from "../components/ButtonComp";
import { Link } from "react-router-dom";



export default function RegisterPage() {
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
                                d="M12 4v16m8-8H4"
                            />
                        </svg>
                    </div>

                    <h1 className="text-2xl font-bold text-blue-700">
                        FoundIt
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Create your university account
                    </p>
                </div>


                <form className="space-y-4">

                    <FormInput
                        label="Full Name"
                        type="text"
                        placeholder="John Doe"
                    />



                    <FormInput
                        label="Student ID"
                        type="text"
                        placeholder="12345678"
                    />

                    <FormInput
                        label="Password"
                        type="password"
                        placeholder="••••••••"
                    />




                    <Link to="/login">
                        <ButtonComp className="w-full bg-yellow-400 text-black hover:bg-yellow-500">
                            Create Account
                        </ButtonComp>
                    </Link>
                </form>


                <div className="mt-6  pt-4 text-center text-sm text-gray-500">
                    Already have an account?{" "}

                    <button className="font-medium text-blue-600 hover:underline">
                        Login
                    </button>

                </div>
            </div>
        </div>
    );
}