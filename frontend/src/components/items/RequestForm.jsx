// components/requests/RequestForm.jsx

import { useState } from "react";

import Swal from "sweetalert2";

import { ShieldCheck } from "lucide-react";

import {
    createRequest
} from "../../api/request.api";

export default function RequestForm({
    itemId
}) {

    const [message, setMessage] = useState("");

    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!message.trim()) {

            return Swal.fire({
                icon: "warning",
                title: "Message is required",
                timer: 1500,
                showConfirmButton: false,
            });

        }

        try {

            setLoading(true);

            const result = await createRequest(
                itemId,
                {
                    message
                }
            );

            console.log(result);

            Swal.fire({
                icon: "success",
                title: "Request submitted successfully",
                timer: 1500,
                showConfirmButton: false,
            });

            setMessage("");

        } catch (error) {

            console.log(error);

            Swal.fire({
                icon: "error",
                title: "Failed submit request",
                text:
                    error?.response?.data?.message ||
                    "Something went wrong",
            });

        } finally {

            setLoading(false);

        }

    };

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">

            <div className="mb-5">

                <h2 className="text-2xl font-bold text-gray-800">
                    Verify Identity
                </h2>

                <p className="mt-2 text-sm leading-relaxed text-gray-500">

                    To ensure the item reaches its rightful owner,
                    please provide specific details that are not
                    visible in the description or photo.

                </p>

            </div>

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >
                <div>

                    <label className="mb-2 block text-sm font-semibold text-gray-700">

                        Proof of Ownership / Details

                    </label>

                    <textarea
                        rows={5}
                        placeholder="Ex: Any unique marks on the bottom, specific stickers we didn’t mention, or what was inside the bottle."
                        value={message}
                        onChange={(e) =>
                            setMessage(e.target.value)
                        }
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-[#00288e]"
                    />

                </div>

                
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-[#00288e] px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#001f70] disabled:opacity-50"
                >

                    {loading
                        ? "Submitting..."
                        : "Submit Claim Request"}

                </button>

               
                <div className="flex items-center justify-center gap-2 text-xs text-gray-400">

                    <ShieldCheck size={14} />

                    <p>
                        Admin will review your request within 24
                        hours.
                    </p>

                </div>

            </form>

        </div>
    );
} 