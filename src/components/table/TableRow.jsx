import React from "react";
import IconDeleteRow from "../../assets/IconDeleteRow";
import IconEditRow from "../../assets/IconEditRow";
import IconLink from "../../assets/IconLink";

function TableRow({ row, columns, rowIndex, onRowDelete }) {
  return (
    <tr>
      {columns
        .filter(({ visible }) => visible)
        .map(({ field, highlight, align }) => (
          <td
            key={field}
            className={`p-2 text-sm text-slate-700 ${
              highlight ? "bg-teal-50" : "bg-white"
            } ${align === "center" ? "text-center" : align === "right" ? "text-right" : "text-left"}`}
          >
            {field === "link" ? (
              <a
                href={row[field]}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center items-center text-slate-500 hover:text-teal-500"
              >
                <IconLink />
              </a>
            ) : field === "precio" ? (
              <span className="font-semibold text-slate-500">
                {Number(row[field]).toLocaleString("es-ES")} €
              </span>
            ) : (
              row[field]
            )}
          </td>
        ))}
      <td className="p-1 text-sm text-slate-700 flex space-x-2">
        <button
          type="button"
          className="text-slate-500 hover:text-teal-500"
          onClick={() => console.log(`Edit row ${rowIndex}`)}
        >
          <IconEditRow />
        </button>
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