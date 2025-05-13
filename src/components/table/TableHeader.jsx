import React, { useState } from "react";
import SortIcon from "../../assets/SortIcon";
import SortIconUp from "../../assets/SortIconUp";
import SortIconDown from "../../assets/SortIconDown";

function TableHeader({ columns, onSort }) {
  const [sortState, setSortState] = useState({});

  const toggleSort = (field) => {
    setSortState((prevState) => {
      const currentSort = prevState[field];
      const nextSort = currentSort === "desc" ? "asc" : "desc";
      const newSortState = { [field]: nextSort };
      onSort(field, nextSort);
      return newSortState;
    });
  };

  const getSortIcon = (field) => {
    const sortOrder = sortState[field];
    if (sortOrder === "asc") return <SortIconUp className="w-4 h-4" />;
    if (sortOrder === "desc") return <SortIconDown className="w-4 h-4" />;
    return <SortIcon className="w-4 h-4" />;
  };

  return (
    <thead>
      <tr>
        {columns.map(({ field, visible, sortable, align }) =>
          visible ? (
            <th
              key={field}
              className={`p-2 px-4 py-4 text-sm font-medium leading-none text-slate-500 bg-slate-100 min-w-max whitespace-nowrap ${
                align === "center" ? "text-center" : align === "right" ? "text-right" : "text-left"
              }`}
            >
              <div
                className={`inline-flex items-center ${
                  align === "center" ? "justify-center" : align === "right" ? "justify-end" : "justify-start"
                }`}
              >
                <span>{field.toUpperCase()}</span>
                {sortable && (
                  <button
                    type="button"
                    className="ml-2 text-slate-500 hover:text-slate-700"
                    onClick={() => toggleSort(field)}
                  >
                    {getSortIcon(field)}
                  </button>
                )}
              </div>
            </th>
          ) : null
        )}
        <th className="p-4 bg-slate-100"></th>
      </tr>
    </thead>
  );
}

export default TableHeader;