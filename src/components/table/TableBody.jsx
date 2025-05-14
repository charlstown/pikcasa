import React from "react";
import TableRow from "./TableRow";

function TableBody({ rows, columns, onRowDelete, onEditRow }) {
  return (
    <tbody>
      {rows.map((row, rowIndex) => (
        <TableRow
          key={rowIndex}
          row={row}
          columns={columns}
          rowIndex={rowIndex}
          onRowDelete={onRowDelete}
          onEditRow={onEditRow}
        />
      ))}
    </tbody>
  );
}

export default TableBody;