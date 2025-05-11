import React, { useState } from "react";
import DataGrid from "./DataGrid";

const columns = [
  { field: "id", visible: false, width: 50, highlight: false, sortable: false, align: "left" },
  { field: "link", visible: true, width: 200, highlight: false, sortable: false, align: "center" },
  { field: "kpi", visible: true, width: 100, highlight: true, sortable: true, align: "left" },
  { field: "precio", visible: true, width: 100, highlight: false, sortable: true, align: "left" },
  { field: "area", visible: true, width: 80, highlight: false, sortable: true, align: "left" },
  { field: "planta", visible: true, width: 70, highlight: false, sortable: false, align: "left" },
  { field: "ascensor", visible: true, width: 80, highlight: false, sortable: false, align: "left" },
  { field: "habitaciones", visible: true, width: 90, highlight: false, sortable: false, align: "left" },
  { field: "baños", visible: true, width: 70, highlight: false, sortable: false, align: "left" },
  { field: "calefacción", visible: true, width: 100, highlight: false, sortable: false, align: "left" },
  { field: "fachada", visible: true, width: 120, highlight: false, sortable: false, align: "left" },
];

const initialRows = [
  {
    id: 1,
    link: "https://www.example.com/property/1",
    kpi: "no calculado",
    precio: 250000,
    area: 120,
    planta: "Primera",
    ascensor: "Sí",
    habitaciones: 3,
    baños: 2,
    calefacción: "Sí",
    fachada: "Exterior",
  },
  {
    id: 2,
    link: "https://www.example.com/property/2",
    kpi: "no calculado",
    precio: 180000,
    area: 90,
    planta: "Baja",
    ascensor: "No",
    habitaciones: 2,
    baños: 1,
    calefacción: "No",
    fachada: "Interior",
  },
  {
    id: 3,
    link: "https://www.example.com/property/3",
    kpi: "no calculado",
    precio: 320000,
    area: 150,
    planta: "Última",
    ascensor: "Sí",
    habitaciones: 4,
    baños: 3,
    calefacción: "Sí",
    fachada: "Exterior",
  },
];

export default function Table() {
  const [rows, setRows] = useState(initialRows);

  const sortRows = (field, order) => {
    if (!field || !order) return;

    const sortedRows = [...rows].sort((a, b) => {
      if (order === "asc") {
        return a[field] > b[field] ? 1 : a[field] < b[field] ? -1 : 0;
      } else if (order === "desc") {
        return a[field] < b[field] ? 1 : a[field] > b[field] ? -1 : 0;
      }
      return 0;
    });

    setRows(sortedRows);
  };

  const deleteRow = (rowIndex) => {
    setRows((prevRows) => prevRows.filter((_, index) => index !== rowIndex));
  };

  return (
    <div className="mt-8 relative max-w-[80%] max-h-[28rem] flex flex-col w-full h-full overflow-y-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
      <DataGrid columns={columns} rows={rows} onRowDelete={deleteRow} onSort={sortRows} />
    </div>
  );
}