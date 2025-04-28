import { useState } from "react";

export function useTableRows(initialRows = []) {
  const [rows, setRows] = useState(initialRows);

  // Editar celda
  const handleCellChange = (rowIndex, field, value) => {
    const newRows = rows.map((row, idx) =>
      idx === rowIndex ? { ...row, [field]: value } : row
    );
    setRows(newRows);
  };

  // Añadir fila
  const handleAddRow = () => {
    const maxId = rows.length > 0 ? Math.max(...rows.map(r => r.id)) : 0;
    setRows([
      ...rows,
      { id: maxId + 1, name: "Nueva vivienda", price: "324000", surface: "90" }
    ]);
  };

  // Eliminar fila
  const handleDeleteRow = (id) => {
    setRows(rows.filter(row => row.id !== id));
  };

  // Alias para setRows (por ejemplo, para sobrescribir desde el backend)
  const replaceRows = (newRows) => {
    setRows(newRows);
  };

  return {
    rows,
    handleCellChange,
    handleAddRow,
    handleDeleteRow,
    replaceRows
  };
}
