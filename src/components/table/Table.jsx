// src/components/table/Table.jsx
import React, { useState } from "react";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import AddRowButton from "./AddRowButton";

function Table() {
  // Initial data
  const [rows, setRows] = useState([
    { name: "Piso 1", price: 150000, surface: 75 },
    { name: "Piso 2", price: 175000, surface: 82 }
  ]);

  // Manage changes in a cell
  const handleCellChange = (rowIndex, field, value) => {
    const newRows = rows.map((row, idx) =>
      idx === rowIndex ? { ...row, [field]: value } : row
    );
    setRows(newRows);
  };

  // Sort the files
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
      <div className="mt-10 shadow-md sm:rounded-lg max-w-3xl w-full mx-auto">
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
      {/* ¡Asegura el centrado y el margen! */}
      <div className="max-w-3xl w-full mx-auto flex justify-center mt-6">
        <AddRowButton
          onClick={() =>
            setRows([...rows, { name: "", price: "", surface: "" }])
          }
        />
      </div>
    </>

  );
}

export default Table;
