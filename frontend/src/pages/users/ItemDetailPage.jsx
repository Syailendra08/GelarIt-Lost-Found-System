import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Swal from "sweetalert2";

import ItemDetailCard from "../../components/items/ItemDetailCard";

import { getItemById } from "../../api/item.api";
import CommentSection from "../../components/dashboard/CommentSection";
import RequestForm from "../../components/items/RequestForm";

export default function ItemDetailPage() {

    const navigate = useNavigate();
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(false);

    const currentUser = JSON.parse(
        localStorage.getItem("user")
    );

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
<div className="bg-[#f8f8fb]">
    <ItemDetailCard
        item={item}
        loading={loading}
        onBack={() => navigate(-1)}
    />

    <div className="min-h-screen px-5 py-6 md:px-10 space">

        <div className="mx-auto max-w-5xl  space-y-6">
            <CommentSection
                itemId={id}
                currentUser={currentUser}
            />

            {item?.status === "found" && (
                <RequestForm
                    itemId={id}
                />
            )}
        </div>

    </div>
</div>
        </>
    );
}