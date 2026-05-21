import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Swal from "sweetalert2";

import NavbarComp from "../../components/NavbarComp";
import ItemDetailCard from "../../components/items/ItemDetailCard";

import { getItemById } from "../../api/item.api";

export default function ItemDetailPage() {

    const navigate = useNavigate();

    const { id } = useParams();

    const [item, setItem] = useState(null);

    const [loading, setLoading] = useState(false);

    async function fetchItem() {

        try {

            setLoading(true);
            const result = await getItemById(id);
            console.log(result);
            setItem(result.data);

        } catch (error) {

            console.log(error);

            Swal.fire({
                icon: "error",
                title: "Failed get item detail",
                timer: 1500,
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

            <ItemDetailCard
                item={item}
                loading={loading}
                onBack={() => navigate(-1)}
            />
        </>
    );
}