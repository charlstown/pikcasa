import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

export default function DataTable({ columns, rows, onRowDelete, onEditRow, onSort, sortConfig, onEmojiChange }) {
  return (
    <div className="mt-8 mb-8 relative max-w-[96%] w-min overflow-x-auto max-h-[28rem] flex flex-col h-full text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
      <table className="w-full text-left table-auto min-w-max">
        <TableHeader columns={columns} onSort={onSort} sortConfig={sortConfig} />
        <TableBody
          rows={rows}
          columns={columns}
          onRowDelete={onRowDelete}
          onEditRow={onEditRow}
          onEmojiChange={onEmojiChange}
        />
      </table>
    </div>
  );
}