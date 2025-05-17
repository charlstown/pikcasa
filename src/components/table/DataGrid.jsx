import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

function DataGrid({ columns, rows, onRowDelete, onEditRow, onSort, sortConfig, onEmojiChange }) {
  return (
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
  );
}

export default DataGrid;