import React from "react";
import SortIcon from "../../assets/SortIcon";
import SortIconUp from "../../assets/SortIconUp";
import SortIconDown from "../../assets/SortIconDown";

function TableHeader({ columns, onSort, sortConfig }) {
  const getSortIcon = (field) => {
    if (!sortConfig || sortConfig.field !== field) return <SortIcon className="w-4 h-4" />;
    if (sortConfig.direction === "asc") return <SortIconUp className="w-4 h-4" />;
    if (sortConfig.direction === "desc") return <SortIconDown className="w-4 h-4" />;
    return <SortIcon className="w-4 h-4" />;
  };

  return (
    <thead>
      <tr>
        {columns.map(({ field, label, visible, sortable, align }) =>
          visible ? (
            <th
              key={field}
              className={`p-2 py-4 text-sm font-medium leading-none text-slate-500 bg-slate-100 min-w-max whitespace-nowrap ${
                align === "center" ? "text-center" : align === "right" ? "text-right" : "text-left"
              }`}
            >
              <div
                className={`inline-flex items-center ${
                  align === "center" ? "justify-center" : align === "right" ? "justify-end" : "justify-start"
                }`}
              >
                <span>
                  {label ?? field}
                </span>
                {sortable && (
                  <button
                    type="button"
                    className="ml-2 text-slate-500 hover:text-slate-700"
                    onClick={() =>
                      onSort(
                        field,
                        sortConfig?.field === field && sortConfig.direction === "desc" ? "asc" : "desc"
                      )
                    }
                  >
                    {getSortIcon(field)}
                  </button>
                )}
              </div>
            </th>
          ) : null
        )}
        <th className="p-2 bg-slate-100"></th>
      </tr>
    </thead>
  );
}

export default TableHeader;