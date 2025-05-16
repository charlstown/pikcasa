import React from "react";
import TableRow from "./TableRow";

function TableBody({ rows, columns, onRowDelete, onEditRow }) {
  return (
    <tbody>
      {rows.map((row) => (
        <TableRow
          key={row.id}
          row={row}
          columns={columns}
          onRowDelete={() => onRowDelete(row.id)}
          onEditRow={() => onEditRow(row.id)}
        />
      ))}
    </tbody>
  );
}

export default TableBody;