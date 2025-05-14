import React, { useState } from "react";
import DataGrid from "./DataGrid";

export default function Table({ columns, rows, onRowDelete, onEditRow }) {
  const [sortedRows, setSortedRows] = useState(rows);
  const [sortConfig, setSortConfig] = useState({ field: null, direction: null });

  React.useEffect(() => {
    setSortedRows(rows);
  }, [rows]);

  const handleSort = (field, direction) => {
    setSortConfig({ field, direction });
    const sorted = [...rows].sort((a, b) => {
      if (a[field] === undefined || b[field] === undefined) return 0;
      if (direction === "asc") {
        return a[field] > b[field] ? 1 : a[field] < b[field] ? -1 : 0;
      } else {
        return a[field] < b[field] ? 1 : a[field] > b[field] ? -1 : 0;
      }
    });
    setSortedRows(sorted);
  };

  return (
    <div className="mt-8 mb-8 relative max-w-[90%] w-min overflow-x-auto max-h-[28rem] flex flex-col h-full text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
      <DataGrid columns={columns} rows={sortedRows} onRowDelete={onRowDelete} onEditRow={onEditRow} onSort={handleSort} />
    </div>
  );
}