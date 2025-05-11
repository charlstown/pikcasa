import React from "react";

function TableRow({ row, columns, rowIndex, onRowDelete }) {
  return (
    <tr>
      {columns
        .filter(({ visible }) => visible)
        .map(({ field, highlight }) => (
          <td
            key={field}
            className={`p-4 text-sm text-slate-700 ${
              highlight ? "bg-teal-50" : "bg-white"
            }`}
          >
            {field === "link" ? (
              <a
                href={row[field]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-500 underline hover:text-teal-700"
              >
                {row[field]}
              </a>
            ) : (
              row[field]
            )}
          </td>
        ))}
      <td className="p-4 text-sm text-slate-700">
        <button
          type="button"
          className="text-slate-500 hover:text-slate-700"
          onClick={() => onRowDelete(rowIndex)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </td>
    </tr>
  );
}

export default TableRow;