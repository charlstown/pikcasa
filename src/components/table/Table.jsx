import React from "react";
import DataGrid from "./DataGrid";

export default function Table({ columns, rows, onRowDelete, onEditRow, onSort, sortConfig }) {
  return (
    <div className="mt-8 mb-8 relative max-w-[96%] w-min overflow-x-auto max-h-[28rem] flex flex-col h-full text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
      <DataGrid
        columns={columns}
        rows={rows}
        onRowDelete={onRowDelete}
        onEditRow={onEditRow}
        onSort={onSort}
        sortConfig={sortConfig}
      />
    </div>
  );
}