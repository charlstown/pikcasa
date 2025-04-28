// src/hooks/useTableSort.js
import { useState } from "react";

export function useTableSort(rows, setRows) {
  const [sort, setSort] = useState({ field: null, direction: "asc" });

  const handleSort = (field) => {
    const direction =
      sort.field === field && sort.direction === "asc" ? "desc" : "asc";
    setSort({ field, direction });

    const isNumeric = field === "price" || field === "surface" || field === "kpick";

    const sortedRows = [...rows].sort((a, b) => {
      let aValue = a[field];
      let bValue = b[field];

      if (isNumeric) {
        aValue = Number(aValue);
        bValue = Number(bValue);
      }

      if (aValue === bValue) return 0;
      if (direction === "asc") return aValue > bValue ? 1 : -1;
      return aValue < bValue ? 1 : -1;
    });

    setRows(sortedRows);
  };

  return [sort, handleSort];
}
