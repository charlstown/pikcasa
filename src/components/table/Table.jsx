import React, { useState } from "react";
import DataGrid from "./DataGrid";

const columns = [
  { field: "id", visible: false, width: 50, highlight: false },
  { field: "link", visible: true, width: 200, highlight: false },
  { field: "kpi", visible: true, width: 100, highlight: true }, // Resaltar esta columna
  { field: "precio", visible: true, width: 100, highlight: false },
  { field: "superficie", visible: true, width: 80, highlight: false },
  { field: "planta", visible: true, width: 70, highlight: false },
  { field: "ascensor", visible: true, width: 80, highlight: false },
  { field: "habitaciones", visible: true, width: 90, highlight: false },
  { field: "baños", visible: true, width: 70, highlight: false },
  { field: "calefacción", visible: true, width: 100, highlight: false },
  { field: "fachada", visible: true, width: 120, highlight: false },
];

const initialRows = [
  {
    id: 1,
    link: "https://www.example.com/property/1",
    kpi: "no calculado",
    precio: 250000,
    superficie: 120,
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
    superficie: 90,
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
    superficie: 150,
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

  const deleteRow = (rowIndex) => {
    setRows((prevRows) => prevRows.filter((_, index) => index !== rowIndex));
  };

  return (
    <div className="mt-8 relative max-w-[80%] flex flex-col w-full h-full overflow-y-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
      <DataGrid columns={columns} rows={rows} onRowDelete={deleteRow} />
    </div>
  );
}