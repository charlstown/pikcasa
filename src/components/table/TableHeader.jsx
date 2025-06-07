import React from "react";
import SortIcon from "../../assets/SortIcon";
import SortIconUp from "../../assets/SortIconUp";
import SortIconDown from "../../assets/SortIconDown";
import { useAppConfig } from '../../config/AppConfigContext';

function TableHeader({ columns, onSort, sortConfig }) {
  const { configTable } = useAppConfig();
  const getSortIcon = (field) => {
    if (!sortConfig || sortConfig.field !== field) return <SortIcon className="w-4 h-4" />;
    if (sortConfig.direction === "asc") return <SortIconUp className="w-4 h-4" />;
    if (sortConfig.direction === "desc") return <SortIconDown className="w-4 h-4" />;
    return <SortIcon className="w-4 h-4" />;
  };

  return (
    <thead>
      <tr>
        {columns
          .filter(col => col.weight !== 0)
          .map(({ field, label }) => {
            const config = configTable.find(c => c.field === field);
            return (
              <th
                key={field}
                className="p-2 py-4 text-sm font-medium leading-none text-slate-500 bg-slate-100 min-w-max whitespace-nowrap text-center"
              >
                <div className="inline-flex items-center justify-center">
                  <span>
                    {label ?? field}
                  </span>
                  {config?.sortable && (
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
            );
          })}
        <th className="p-2 bg-slate-100"></th>
      </tr>
    </thead>
  );
}

export default TableHeader;