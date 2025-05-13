// src/components/layout/Content.jsx
import React, { useState } from 'react';

import PrimaryButton from '../common/PrimaryButton';
import RoundedButton from '../common/RoundedButton';
import CallToAction from './CallToAction';
import DataTable from '../table/Table';
import ModalCard from './ModalCard';

import IconAddRow from '../../assets/IconAddRow';

const columns = [
  { field: "id", visible: false, width: 50, highlight: false, sortable: false, align: "left" },
  { field: "link", visible: true, width: 200, highlight: false, sortable: false, align: "center" },
  { field: "kpi", visible: true, width: 100, highlight: true, sortable: true, align: "center" },
  { field: "precio", visible: true, width: 100, highlight: false, sortable: true, align: "center" },
  { field: "superficie", visible: true, width: 80, highlight: false, sortable: true, align: "center" },
  { field: "planta", visible: true, width: 70, highlight: false, sortable: false, align: "center" },
  { field: "ascensor", visible: true, width: 80, highlight: false, sortable: false, align: "center" },
  { field: "habitaciones", visible: true, width: 90, highlight: false, sortable: false, align: "center" },
  { field: "baños", visible: true, width: 70, highlight: false, sortable: false, align: "center" },
  { field: "calefacción", visible: true, width: 100, highlight: false, sortable: false, align: "center" },
  { field: "fachada", visible: true, width: 120, highlight: false, sortable: false, align: "center" },
  { field: "garaje", visible: true, width: 120, highlight: false, sortable: false, align: "center" },
  { field: "terraza", visible: true, width: 120, highlight: false, sortable: false, align: "center" },
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
    garaje: "No",
    terraza: "Sí",
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
    garaje: "Sí",
    terraza: "No",
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
    garaje: "Sí",
    terraza: "Sí",
  },
];

function Content() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rows, setRows] = useState(initialRows);

  // Añadir nueva fila desde el formulario
  const handleAddRow = (newRow) => {
    setRows(prevRows => [
      ...prevRows,
      {
        ...newRow,
        id: prevRows.length ? Math.max(...prevRows.map(r => r.id)) + 1 : 1,
        kpi: "no calculado"
      }
    ]);
    setIsModalOpen(false);
  };

  // Eliminar fila
  const handleDeleteRow = (rowIndex) => {
    setRows(prevRows => prevRows.filter((_, idx) => idx !== rowIndex));
  };

  return (
    <main className="bg-teal-50 flex-1 flex flex-col items-center justify-start p-2">
      <CallToAction />
      <div className="flex gap-4 mb-2">
        <PrimaryButton className="flex items-center">
          Generar K-Pick
        </PrimaryButton>
      </div>

      <DataTable columns={columns} rows={rows} onRowDelete={handleDeleteRow} />

      <RoundedButton onClick={() => setIsModalOpen(true)} className="flex items-center">
        <IconAddRow className="w-6 h-6 text-white" />
      </RoundedButton>

      <ModalCard
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddRow}
      />
    </main>
  );
}

export default Content;
