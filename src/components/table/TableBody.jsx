import React from "react";
import TableRow from "./TableRow";

function TableBody({ rows, columns, onRowDelete, onEditRow, onEmojiChange }) {
  return (
    <tbody>
      {rows.map((row) => (
        <TableRow
          key={row.id}
          row={row}
          columns={columns}
          onRowDelete={() => onRowDelete(row.id)}
          onEditRow={() => onEditRow(row.id)}
          onEmojiChange={onEmojiChange}
        />
      ))}
    </tbody>
  );
}

export default TableBody;