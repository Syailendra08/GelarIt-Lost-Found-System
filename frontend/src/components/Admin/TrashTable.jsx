import {
  RotateCcw,
  Trash2,
} from "lucide-react";

export default function TrashTable({
  title,
  columns,
  rows,
  onRestore,
  onDeletePermanent,
}) {

  return (
    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-100 px-6 py-5">

        <h1 className="text-2xl font-bold text-[#0F172A]">
          {title}
        </h1>

      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
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

            {rows.map((row) => (

              <tr key={row.id} className="border-t border-gray-100">

                {columns.map((column) => (

                  <td
                    key={column.key}
                    className="px-6 py-5 text-sm text-gray-600"
                  >

                    {row[column.key]}

                  </td>

                ))}

                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">

                    <button
                      onClick={() =>
                        onRestore(row)
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-700 transition hover:bg-blue-100">
                      <RotateCcw size={16} />
                    </button>

                    <button
                      onClick={() =>
                        onDeletePermanent(row)
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-100 bg-red-50 text-red-600 transition hover:bg-red-100">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}