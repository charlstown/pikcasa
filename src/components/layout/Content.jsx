// src/components/layout/Content.jsx
import React, { useState } from 'react';

import PrimaryButton from '../common/PrimaryButton';
import RoundedButton from '../common/RoundedButton';
import CallToAction from './CallToAction';
import DataTable from '../table/Table';
import ModalCard from './ModalCard';
import EditModalCard from './EditModalCard'; // Nuevo componente para editar

import IconAddRow from '../../assets/IconAddRow';
import { usePersistentState } from "../../hooks/usePersistentState";

const columns = [
  { field: "id", visible: false, width: 50, highlight: false, sortable: false, align: "left" },
  { field: "link", visible: true, width: 200, highlight: false, sortable: false, align: "center" },
  { field: "kpi", visible: true, width: 100, highlight: true, sortable: true, align: "center" },
  { field: "precio", visible: true, width: 100, highlight: false, sortable: true, align: "center" },
  { field: "superficie", visible: true, width: 80, highlight: false, sortable: true, align: "center" },
  { field: "eurom2", label: "€/m²", visible: true, width: 90, highlight: false, sortable: true, align: "center" },
  { field: "planta", visible: true, width: 70, highlight: false, sortable: false, align: "center" },
  { field: "ascensor", visible: true, width: 80, highlight: false, sortable: false, align: "center" },
  { field: "habitaciones", visible: true, width: 90, highlight: false, sortable: false, align: "center" },
  { field: "baños", visible: true, width: 70, highlight: false, sortable: false, align: "center" },
  { field: "calefacción", visible: true, width: 100, highlight: false, sortable: false, align: "center" },
  { field: "fachada", visible: true, width: 120, highlight: false, sortable: false, align: "center" },
  { field: "garaje", visible: true, width: 120, highlight: false, sortable: false, align: "center" },
  { field: "terraza", visible: true, width: 120, highlight: false, sortable: false, align: "center" },
];

const formFields = [
  { name: "link", label: "Link", type: "string", maxLength: 255, mandatory: false, placeholder: "Añade el link al anuncio de tu vivienda", width: "full" },
  { name: "precio", label: "Precio", type: "numeric", mandatory: true, placeholder: "Introduce el precio", width: "half" },
  { name: "superficie", label: "Superficie", type: "numeric", mandatory: true, placeholder: "Introduce la superficie", width: "half" },
  { name: "planta", label: "Planta", type: "select", options: ["Semisótano", "Baja", "Intermedia", "Ático"], default_option: "Intermedia", mandatory: false, placeholder: "Introduce la planta", width: "half" },
  { name: "ascensor", label: "Ascensor", type: "select", options: ["Sí", "No"], default_option: "Sí", mandatory: false, placeholder: "Seleccione una opción", width: "half" },
  { name: "habitaciones", label: "Habitaciones", type: "numeric", mandatory: false, placeholder: "Número de habitaciones", width: "half" },
  { name: "baños", label: "Baños", type: "numeric", mandatory: false, placeholder: "Número de baños", width: "half" },
  { name: "calefacción", label: "Calefacción", type: "select", options: ["Sí", "No"], default_option: "Sí", mandatory: false, placeholder: "Seleccione calefacción", width: "half" },
  { name: "fachada", label: "Fachada", type: "select", options: ["Exterior", "Interior"], default_option: "Exterior", mandatory: false, width: "half" },
  { name: "terraza", label: "Terraza", type: "select", options: ["Sí", "No"], default_option: "No", mandatory: false, width: "half" },
  { name: "garaje", label: "Garaje", type: "select", options: ["Sí", "No"], default_option: "No", mandatory: false, width: "half" },
];

const initialRows = [
  {
    id: 1,
    link: "https://www.example.com/property/1",
    kpi: "no calculado",
    precio: 250000,
    superficie: 120,
    eurom2: 2083,
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
    precio: 210000,
    superficie: 90,
    eurom2: 2333,
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
    eurom2: 2133,
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
  const [rows, setRows] = usePersistentState("viviendas", initialRows);

  // Estado para edición
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [rowToEdit, setRowToEdit] = useState(null);

  // Añadir nueva fila desde el formulario
  const handleAddRow = (newRow) => {
    const precio = Number(newRow.precio);
    const superficie = Number(newRow.superficie);
    const eurom2 = (precio && superficie) ? Math.round(precio / superficie) : "";
    setRows(prevRows => [
      ...prevRows,
      {
        ...newRow,
        id: prevRows.length ? Math.max(...prevRows.map(r => r.id)) + 1 : 1,
        kpi: "no calculado",
        eurom2
      }
    ]);
    setIsModalOpen(false);
  };

  // Eliminar fila
  const handleDeleteRow = (rowIndex) => {
    setRows(prevRows => prevRows.filter((_, idx) => idx !== rowIndex));
  };

  // Editar fila
  const handleEditRow = (rowIndex) => {
    setRowToEdit({ ...rows[rowIndex], rowIndex });
    setEditModalOpen(true);
  };

  // Guardar cambios de edición
  const handleUpdateRow = (updatedRow) => {
    const precio = Number(updatedRow.precio);
    const superficie = Number(updatedRow.superficie);
    const eurom2 = (precio && superficie) ? Math.round(precio / superficie) : "";
    setRows(prevRows =>
      prevRows.map((row, idx) =>
        idx === rowToEdit.rowIndex
          ? { ...row, ...updatedRow, eurom2 }
          : row
      )
    );
    setEditModalOpen(false);
    setRowToEdit(null);
  };

  return (
    <main className="bg-teal-50 flex-1 flex flex-col items-center justify-start p-2">
      <CallToAction />
      <div className="flex gap-4 mb-2">
        <PrimaryButton className="flex items-center">
          Generar K-Pick
        </PrimaryButton>
      </div>

      <DataTable columns={columns} rows={rows} onRowDelete={handleDeleteRow} onEditRow={handleEditRow} />

      <RoundedButton onClick={() => setIsModalOpen(true)} className="flex items-center">
        <IconAddRow className="w-6 h-6 text-white" />
      </RoundedButton>

      <ModalCard
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddRow}
        formFields={formFields}
      />

      <EditModalCard
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSubmit={handleUpdateRow}
        formFields={formFields}
        rowData={rowToEdit}
      />
    </main>
  );
}

export default Content;
