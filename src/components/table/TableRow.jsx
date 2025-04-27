import React from "react";
import TableCell from "./TableCell";

function TableRow({ row, rowIndex, onCellChange }) {
  return (
    <tr className="bg-white border-b border-gray-200 hover:bg-gray-50">
      <TableCell
        value={row.name}
        onChange={value => onCellChange(rowIndex, "name", value)}
      />
      <TableCell
        value={row.price}
        onChange={value => onCellChange(rowIndex, "price", value)}
        type="number"
        suffix=" €"
      />
      <TableCell
        value={row.surface}
        onChange={value => onCellChange(rowIndex, "surface", value)}
        type="number"
        suffix=" m²"
      />
    </tr>
  );
}

export default TableRow;
