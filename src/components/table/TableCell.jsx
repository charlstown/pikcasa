//src/components/table/TableCell.jsx
import React from "react";

function TableCell({ value, onChange, type = "text", suffix }) {
  return (
    <td className="border-none px-4 py-2">
      {onChange ? (
        <div className="flex items-center">
          <input
            className="w-full border border-gray-200 rounded px-2 py-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-200"
            type={type}
            placeholder={value}
            onChange={e => onChange(e.target.value)}
          />
          {suffix && <span className="ml-1 text-gray-500">{suffix}</span>}
        </div>
      ) : (
        value
      )}
    </td>
  );
}

export default TableCell;
