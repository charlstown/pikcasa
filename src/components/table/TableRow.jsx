import React from "react";
import IconDeleteRow from "../../assets/IconDeleteRow";

function TableRow({ row, columns, rowIndex, onRowDelete }) {
  return (
    <tr>
      {columns
        .filter(({ visible }) => visible)
        .map(({ field, highlight }) => (
          <td
            key={field}
            className={`p-2 text-sm text-slate-700 ${
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
          className="text-slate-500 hover:text-red-500"
          onClick={() => onRowDelete(rowIndex)}
        >
          <IconDeleteRow />
        </button>
      </td>
    </tr>
  );
}

export default TableRow;