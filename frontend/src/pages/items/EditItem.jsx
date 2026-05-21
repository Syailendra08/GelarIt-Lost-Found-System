import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {updateItem,getItemById} from "../../api/item.api";

import ReportForm from "../../components/items/ReportForm";
import NavbarComp from "../../components/NavbarComp";

import Swal from "sweetalert2";

export default function EditItem() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [item, setItem] = useState(null);

    async function fetchItem() {
        try {

            const result = await getItemById(id);

            setItem(result.data);

        } catch (error) {
            console.log(error);
        }
    }

    async function handleUpdate(form) {

        try {

            setLoading(true);

            const result = await updateItem(id, form);

            console.log(result);

            Swal.fire({
                icon: "success",
                title: "Report Update successfully",
                timer: 1200,
                showConfirmButton: false,
            });

            navigate("/dashboard");

        } catch (error) {

            console.log(error);

            Swal.fire({
                icon: "error",
                title: "Failed update report",
                timer: 1200,
                showConfirmButton: false,
            });

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchItem();
    }, []);

    return (
        <>
            <NavbarComp />

            <ReportForm
                initialData={item}
                onSubmit={handleUpdate}
                loading={loading}
                submitText="Update Report"
                titleText="Update"
            />
        </>
    );
}