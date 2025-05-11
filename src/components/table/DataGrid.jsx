import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

function DataGrid({ columns, rows, onRowDelete, onSort }) {
  return (
    <table className="w-full text-left table-auto min-w-max">
      <TableHeader columns={columns} onSort={onSort} />
      <TableBody rows={rows} columns={columns} onRowDelete={onRowDelete} />
    </table>
  );
}

export default DataGrid;