import { useState } from "react";
import { useNavigate } from "react-router-dom";



import { createItem } from "../../api/item.api";
import ReportForm from "../../components/items/ReportForm";

import Swal from "sweetalert2";

export default function CreateItem() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    async function handleCreate(form) {
    try {
        setLoading(true);

        const result = await createItem(form);

        console.log(result);

        Swal.fire({
               icon: "success",
               title: "Report create successfully",
               timer: 1200,
               showConfirmButton: false,
             });

        navigate("/dashboard");

    } catch (error) {
        console.log(error);

        Swal.fire({
               icon: "error",
               title: "Failed create report",
               timer: 1200,
               showConfirmButton: false,
             });

    } finally {
        setLoading(false);
    }
}

    return (
        <>
        
        <ReportForm
            onSubmit={handleCreate}
            loading={loading}
            submitText="Create Report"
        />
        </>
    );
}