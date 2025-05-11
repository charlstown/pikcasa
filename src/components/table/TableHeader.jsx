import React from "react";

function TableHeader({ columns }) {
  return (
    <thead>
      <tr>
        {columns.map(({ field, visible }) =>
          visible ? (
            <th
              key={field}
              className="p-4 text-sm font-bold leading-none text-slate-500 bg-slate-100"
            >
              {field.toUpperCase()}
            </th>
          ) : null
        )}
        <th className="p-4 bg-slate-100"></th>
      </tr>
    </thead>
  );
}

export default TableHeader;