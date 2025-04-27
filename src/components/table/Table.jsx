// src/components/table/Table.jsx
import React, { useState } from "react";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import AddRowButton from "./AddRowButton";

function Table({ rows, setRows }) {
  // El estado de las filas ya lo recibes por props, NO lo creas aquí.

  // Gestionar cambios en una celda
  const handleCellChange = (rowIndex, field, value) => {
    const newRows = rows.map((row, idx) =>
      idx === rowIndex ? { ...row, [field]: value } : row
    );
    setRows(newRows);
  };

  // El estado de sort puede ser local porque solo afecta a la visualización
  const [sort, setSort] = useState({ field: null, direction: "asc" });

  const handleSort = (field) => {
    const direction =
      sort.field === field && sort.direction === "asc" ? "desc" : "asc";
    setSort({ field, direction });

    const sortedRows = [...rows].sort((a, b) => {
      if (a[field] === b[field]) return 0;
      if (direction === "asc") return a[field] > b[field] ? 1 : -1;
      return a[field] < b[field] ? 1 : -1;
    });
    setRows(sortedRows);
  };

  return (
    <>
      <div className="mt-10 overflow-hidden shadow-md sm:rounded-lg max-w-3xl w-full mx-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <TableHeader sort={sort} onSort={handleSort} />
          <tbody>
            {rows.map((row, idx) => (
              <TableRow
                key={idx}
                row={row}
                rowIndex={idx}
                onCellChange={handleCellChange}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="max-w-3xl w-full mx-auto flex justify-center mt-6">
        <AddRowButton
          onClick={() => {
            // Encuentra el ID más alto actual
            const maxId = rows.length > 0 ? Math.max(...rows.map(r => r.id)) : 0;
            setRows([
              ...rows,
              { id: maxId + 1, name: "Nueva vivienda", price: "324000", surface: "90" }
            ]);
          }}
        />
      </div>
    </>
  );
}

export default Table;
