import { useState } from "react";
import FormInput from "../components/FormInput";
import ButtonComp from "../components/ButtonComp";
import { Link, useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

export default function RegisterPage() {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    async function processRegister(e) {
        e.preventDefault();
        const url = "http://localhost:3000/register";

        try {

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),

            });

            const result = await response.json();

            // kalau register gagal
            if (response.status !== 201) {

                throw new Error(
                    result.message || "Register Failed"
                );

            }

            alert("Register Success");

            navigate("/login");

        } catch (error) {

            console.log(error);

            alert(error.message);

        }

    }

    return (
        <div
            className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center"
            style={{
                backgroundImage:
                    "url('https://jurnalku.smkwikrama.sch.id/assets/img/cover/Banner-Web.jpg')",
            }}
        >
             <div className="container mx-auto px-4">
                <div className="w-full max-w-[460px] rounded-2xl bg-white p-8 shadow-xl">

                    <div className="mb-6 text-center">
                        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-800">
                           <Plus color="white" />
                        </div>

                        <h1 className="text-2xl font-bold text-blue-800">
                            GelarIt
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Create your student account
                        </p>
                    </div>

                    <form
                        className="space-y-4"
                        onSubmit={processRegister}
                    >
                        <FormInput
                            label="Full Name"
                            type="text"
                            name="name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                        />

                        <FormInput
                            label="Email"
                            type="email"
                            name="email"
                            placeholder="example@gmail.com"
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

                        <ButtonComp
                            type="submit"
                            className="w-full bg-yellow-400 text-black hover:bg-yellow-500"
                        >
                            Create Account
                        </ButtonComp>
                    </form>

                    <div className="mt-6 pt-4 text-center text-sm text-gray-500">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="font-medium text-blue-600 hover:underline"
                        >
                            Login
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );

}