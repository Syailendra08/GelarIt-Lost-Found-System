
import { useEffect, useState } from "react";
import { createComment, deleteComment, getCommentsByItem, } from "../../api/comment.api";

import { Trash2 } from "lucide-react";
import Swal from "sweetalert2";

export default function CommentSection({ itemId, currentUser, }) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchComments = async () => {
        try {
            const result = await getCommentsByItem(
                itemId, {
                    sortBy: "createdAt",
                    order: "asc", 
                }
            );

            setComments(result.data.data);

        } catch (error) {
            console.log(error);
        }

    };

    useEffect(() => {
        fetchComments();
    }, [itemId]);

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!comment.trim()) return;

        try {

            setLoading(true);

            const result = await createComment(
                itemId,
                {
                    comment: comment
                }
            );

            console.log(result);
            setComment("");
            fetchComments();

        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false);

        }

    };

    const handleDelete = async (id) => {

        const result = await Swal.fire({
            title: "Delete Comment?",
            text: "Are you sure want to delete this comment?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#4f46e5",
            cancelButtonColor: "#ef4444",
            confirmButtonText: "Yes, delete it",
            cancelButtonText: "Cancel",
        });

        if (!result.isConfirmed) return;

        try {

            const response = await deleteComment(id);

            console.log(response);

            Swal.fire({
                icon: "success",
                title: "Comment deleted successfully",
                timer: 1500,
                showConfirmButton: false,
            });

            fetchComments();

        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Failed to delete comment",
                timer: 1500,
                showConfirmButton: false,
            });

        }

    };


    const timeAgo = (date) => {

        const seconds = Math.floor(
            (new Date() - new Date(date)) / 1000
        );

        let interval = seconds / 31536000;

        if (interval > 1) {
            return Math.floor(interval) + " years ago";
        }

        interval = seconds / 2592000;

        if (interval > 1) {
            return Math.floor(interval) + " months ago";
        }

        interval = seconds / 86400;

        if (interval > 1) {
            return Math.floor(interval) + " days ago";
        }

        interval = seconds / 3600;

        if (interval > 1) {
            return Math.floor(interval) + " hours ago";
        }

        interval = seconds / 60;
        if (interval > 1) {
            return Math.floor(interval) + " mins ago";
        }
        return "Just now";

    };


    const getInitial = (name) => {

        return name
            ?.split(" ")
            .map((word) => word[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);

    };

    return (
        <div className=" rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
            <div className="mb-6">

                <h2 className="text-xl font-bold text-gray-800">
                    Comments
                </h2>

            </div>

            <div className="space-y-5">
                {comments.length > 0 ? (

                    comments.map((item) => (

                        <div
                            key={item.id}
                            className="border-b border-gray-100 pb-5 last:border-none"
                        >
                            <div className="flex gap-4">
                                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600">

                                    {getInitial(item.user?.name)}

                                </div>


                                <div className="flex-1">

                                    <div className="flex flex-wrap items-center gap-2">

                                        <h3 className="text-sm font-semibold text-gray-800">
                                            {item.user?.name}
                                        </h3>

                                        <span className="text-xs text-gray-400">
                                            {timeAgo(item.createdAt)}
                                        </span>

                                    </div>

                                    <p className="mt-1 text-sm leading-relaxed text-gray-600">
                                        {item.comment}
                                    </p>

                                </div>


                                {(currentUser?.id === item.user_id ||
                                    currentUser?.role === "admin") && (

                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-500 transition hover:bg-red-100"
                                        >

                                            <Trash2 size={16} />

                                        </button>

                                    )}

                            </div>

                        </div>

                    ))

                ) : (

                    <div className="rounded-xl border border-dashed border-gray-300 py-10 text-center">

                        <p className="text-sm text-gray-400">
                            No comments yet
                        </p>

                    </div>

                )}

            </div>


            <form
                onSubmit={handleSubmit}
                className="mt-6"
            >

                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-3">

                    <textarea
                        rows={4}
                        placeholder="Add a comment..."
                        value={comment}
                        onChange={(e) =>
                            setComment(e.target.value)
                        }
                        className="w-full resize-none bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
                    />


                </div>
                <div className="mt-3 flex justify-end">

                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 rounded-xl bg-[#00288e] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#001f70] disabled:opacity-50"
                    >


                        {loading
                            ? "Posting..."
                            : "Post Comment"}

                    </button>
                </div>
            </form>
        </div>
    );
}