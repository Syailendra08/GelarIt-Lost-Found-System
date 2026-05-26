import { Trash2, Download, ChevronLeft, ChevronRight, Pencil, Plus, } from "lucide-react";

export default function TableCRUD({
    title = "Inventory",
    columns = [],
    rows = [],
    onTrash,
    onExport,
    onCreate,
    onEdit,
    onDelete,
    pagination,
    page,
    setPage,
}) {

    const renderStatus = (status) => {

        const styles = {
            found: "bg-yellow-100 text-yellow-700",
            lost: "bg-indigo-100 text-indigo-700",
            returned: "bg-green-100 text-green-700",
            claimed: "bg-blue-100 text-blue-700",
            taken: "bg-emerald-100 text-emerald-700",
            pending: "bg-orange-100 text-orange-700",
            approved: "bg-cyan-100 text-cyan-700",
            rejected: "bg-red-100 text-red-700",
        };

        return (
            <span
                className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase ${styles[status] || "bg-gray-100 text-gray-600"
                    }`}
            >
                {status}
            </span>
        );

    };

    return (
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">

            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">

                <h1 className="text-xl font-bold text-[#0F172A]">
                    {title}
                </h1>

                <div className="flex items-center gap-3">

                    <button
                        onClick={onTrash}
                        className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
                    >

                        <Trash2 size={16} />
                        Trash
                    </button>

                    <button
                        onClick={onExport}
                        className="flex items-center gap-2 rounded-xl bg-[#00288E] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#001f70]">

                        <Download size={16} />
                        Export
                    </button>
                    <button
                        onClick={onCreate}
                        className="flex items-center gap-2 rounded-xl bg-[#00288E] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#001f70]">

                       <Plus size={16} />
                        Add New
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full min-w-225">
                    <thead className="bg-[#F8FAFC]">

                        <tr>

                            {columns.map((column) => (

                                <th
                                    key={column.key}
                                    className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wide text-gray-400"
                                >

                                    {column.label}

                                </th>

                            ))}

                            <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wide text-gray-400">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {rows.map((row, index) => (

                            <tr
                                key={index}
                                className="border-t border-gray-100 transition hover:bg-gray-50"
                            >

                                {columns.map((column) => (

                                    <td
                                        key={column.key}
                                        className="px-6 py-5 text-sm text-gray-600"
                                    >

                                        {column.key === "status"
                                            ? renderStatus(row[column.key])
                                            : row[column.key]}

                                    </td>
                                ))}

                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => onEdit(row)}
                                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-700 transition hover:bg-blue-100"
                                        >

                                            <Pencil size={16} />

                                        </button>

                                        <button
                                            onClick={() => onDelete(row)}
                                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-100 bg-red-50 text-red-600 transition hover:bg-red-100"
                                        >

                                            <Trash2 size={16} />

                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-col gap-4 border-t border-gray-100 px-6 py-4 md:flex-row md:items-center md:justify-between">

                <p className="text-sm text-gray-400">

                    Showing {pagination.rangeData} of {pagination.total} results

                </p>

                <div className="flex items-center gap-2">

                    <button
                        disabled={page === 1}
                        onClick={() => setPage((prev) => prev - 1)}
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition hover:bg-gray-50 disabled:opacity-50"
                    >

                        <ChevronLeft size={16} />
                    </button>
                    {Array.from(
                        { length: pagination.totalPage || 1 },
                        (_, index) => (

                            <button
                                key={index + 1}
                                onClick={() => setPage(index + 1)}
                                className={`flex h-9 min-w-9 items-center justify-center rounded-xl px-3 text-sm font-semibold transition ${page === index + 1
                                    ? "bg-[#00288E] text-white"
                                    : "border border-gray-200 bg-white text-gray-500 hover:bg-gray-50"
                                    }`}
                            >

                                {index + 1}
                            </button>
                        )
                    )}

                    <button
                        disabled={page >= (pagination.totalPage || 1)}
                        onClick={() => setPage((prev) => prev + 1)}
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition hover:bg-gray-50 disabled:opacity-50"
                    >

                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}