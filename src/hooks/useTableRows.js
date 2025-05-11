import { useState } from "react";

function useTableRows(initialRows) {
  const [rows, setRows] = useState(initialRows);

  const updateRow = (rowIndex, field, value) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex] = { ...updatedRows[rowIndex], [field]: value };
    setRows(updatedRows);
  };

  const addRow = (newRow) => {
    setRows([...rows, newRow]);
  };

  const deleteRow = (rowIndex) => {
    const updatedRows = rows.filter((_, index) => index !== rowIndex);
    setRows(updatedRows);
  };

  const resetRows = () => {
    setRows(initialRows);
  };

  return { rows, updateRow, addRow, deleteRow, resetRows };
}

export default useTableRows;