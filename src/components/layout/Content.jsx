// src/components/layout/Content.jsx
import React, { useState } from 'react';

import PrimaryButton from '../common/PrimaryButton';
import RoundedButton from '../common/RoundedButton';
import SquareButton from '../common/SquareButton';
import CallToAction from './CallToAction';
import DataTable from '../table/Table';
import ModalCard from './ModalCard';
import EditModalCard from './EditModalCard';
import ColumnsModal from './ColumnsModal';

import IconAddRow from '../../assets/IconAddRow';
import IconEnableColumns from '../../assets/IconEnableColumns';
import { usePersistentState } from "../../hooks/usePersistentState";

const columns = [
  { field: "id", active: true, label: "ID", visible: false, width: 50, highlight: false, sortable: false, align: "left" },
  { field: "link", active: true, label: "Link", visible: true, width: 200, highlight: false, sortable: false, align: "center" },
  { field: "kpi", active: true, label: "K-Pick", visible: true, width: 100, highlight: true, sortable: true, align: "center" },
  { field: "precio", active: true, label: "Precio", visible: true, width: 100, highlight: false, sortable: true, align: "center" },
  { field: "superficie", active: true, label: "Superficie", visible: true, width: 80, highlight: false, sortable: true, align: "center" },
  { field: "eurom2", active: true, label: "€/m²", visible: true, width: 90, highlight: false, sortable: true, align: "center" },
  { field: "planta", active: true, label: "Planta", visible: true, width: 70, highlight: false, sortable: false, align: "center" },
  { field: "ascensor", active: true, label: "Ascensor", visible: true, width: 80, highlight: false, sortable: false, align: "center" },
  { field: "habitaciones", active: true, label: "Habitaciones", visible: true, width: 90, highlight: false, sortable: false, align: "center" },
  { field: "baños", active: true, label: "Baños", visible: true, width: 70, highlight: false, sortable: false, align: "center" },
  { field: "calefaccion", active: true, label: "Calefacción", visible: true, width: 100, highlight: false, sortable: false, align: "center" },
  { field: "fachada", active: true, label: "Fachada", visible: true, width: 120, highlight: false, sortable: false, align: "center" },
  { field: "garaje", active: true, label: "Garaje", visible: true, width: 120, highlight: false, sortable: false, align: "center" },
  { field: "terraza", active: true, label: "Terraza", visible: true, width: 120, highlight: false, sortable: false, align: "center" },
];

const formFields = [
  { name: "link", label: "Link", type: "string", maxLength: 255, mandatory: false, placeholder: "Añade el link al anuncio de tu vivienda", width: "full" },
  { name: "precio", label: "Precio", type: "numeric", mandatory: true, placeholder: "Introduce el precio", width: "half" },
  { name: "superficie", label: "Superficie", type: "numeric", mandatory: true, placeholder: "Introduce la superficie", width: "half" },
  { name: "planta", label: "Planta", type: "select", options: ["Semisótano", "Baja", "Intermedia", "Ático"], default_option: "Intermedia", mandatory: false, placeholder: "Introduce la planta", width: "half" },
  { name: "ascensor", label: "Ascensor", type: "select", options: ["Sí", "No"], default_option: "Sí", mandatory: false, placeholder: "Seleccione una opción", width: "half" },
  { name: "habitaciones", label: "Habitaciones", type: "numeric", mandatory: false, placeholder: "Número de habitaciones", width: "half" },
  { name: "baños", label: "Baños", type: "numeric", mandatory: false, placeholder: "Número de baños", width: "half" },
  { name: "calefaccion", label: "Calefacción", type: "select", options: ["Sí", "No"], default_option: "Sí", mandatory: false, placeholder: "Seleccione calefacción", width: "half" },
  { name: "fachada", label: "Fachada", type: "select", options: ["Exterior", "Interior"], default_option: "Exterior", mandatory: false, width: "half" },
  { name: "terraza", label: "Terraza", type: "select", options: ["Sí", "No"], default_option: "No", mandatory: false, width: "half" },
  { name: "garaje", label: "Garaje", type: "select", options: ["Sí", "No"], default_option: "No", mandatory: false, width: "half" },
];

const initialRows = [
  {
    id: 1,
    link: "https://www.example.com/property/1",
    kpi: 0,
    precio: 250000,
    superficie: 120,
    eurom2: 2083,
    planta: "Intermedia",
    ascensor: "Sí",
    habitaciones: 3,
    baños: 2,
    calefaccion: "Sí",
    fachada: "Exterior",
    garaje: "No",
    terraza: "Sí",
  },
  {
    id: 2,
    link: "https://www.example.com/property/2",
    kpi: 0,
    precio: 210000,
    superficie: 90,
    eurom2: 2333,
    planta: "Baja",
    ascensor: "No",
    habitaciones: 2,
    baños: 1,
    calefaccion: "No",
    fachada: "Interior",
    garaje: "Sí",
    terraza: "No",
  },
  {
    id: 3,
    link: "https://www.example.com/property/3",
    kpi: 0,
    precio: 320000,
    superficie: 150,
    eurom2: 2133,
    planta: "Ático",
    ascensor: "Sí",
    habitaciones: 4,
    baños: 3,
    calefaccion: "Sí",
    fachada: "Exterior",
    garaje: "Sí",
    terraza: "Sí",
  },
];

const API_URL = "https://o9qh2kvujg.execute-api.eu-west-3.amazonaws.com/generate-kpick";

function Content() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rows, setRows] = usePersistentState("viviendas", initialRows);
  const [loading, setLoading] = useState(false);

  // Estado para edición
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [rowToEdit, setRowToEdit] = useState(null);

  // Estado para el modal de columnas
  const [isColumnsModalOpen, setIsColumnsModalOpen] = useState(false);

  // Nuevo estado para columns
  const [columnsState, setColumnsState] = useState(columns);

  // Estado para ordenación
  const [sortConfig, setSortConfig] = useState({ field: null, direction: null });

  // Ordena las filas según sortConfig
  const getSortedRows = () => {
    if (!sortConfig.field) return rows;
    const sorted = [...rows].sort((a, b) => {
      let aValue = a[sortConfig.field];
      let bValue = b[sortConfig.field];

      if (sortConfig.field === "kpi") {
        aValue = Number(aValue ?? 0);
        bValue = Number(bValue ?? 0);
      }

      if (isNaN(aValue) || isNaN(bValue)) return 0;
      if (sortConfig.direction === "asc") {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    });
    return sorted;
  };

  // Handler para cambiar la ordenación desde el header
  const handleSort = (field, direction) => {
    setSortConfig({ field, direction });
  };

  // Añadir nueva fila desde el formulario
  const handleAddRow = (newRow) => {
    setRows(prevRows => {
      const precio = Number(newRow.precio);
      const superficie = Number(newRow.superficie);
      const habitaciones = Number(newRow.habitaciones);
      const baños = Number(newRow.baños);
      const eurom2 = (precio && superficie) ? Math.round(precio / superficie) : "";

      // Calcula el id usando prevRows para evitar duplicados
      const maxId = prevRows.length > 0 ? Math.max(...prevRows.map(r => r.id || 0)) : 0;
      const nextId = maxId + 1;

      const newItem = {
        ...newRow,
        id: nextId,
        precio,
        superficie,
        habitaciones,
        baños,
        kpi: 0,
        eurom2
      };

      return [...prevRows, newItem];
    });
    setIsModalOpen(false);
  };

  // Eliminar fila por id
  const handleDeleteRow = (id) => {
    setRows(prevRows => prevRows.filter(row => row.id !== id));
  };

  // Editar fila por id
  const handleEditRow = (id) => {
    const idx = rows.findIndex(row => row.id === id);
    setRowToEdit({ ...rows[idx], rowIndex: idx });
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

  // Nueva función para generar K-Pick y ordenar por kpi descendente
  const handleGenerateKPick = async () => {
    setLoading(true);
    try {
      const columnsPayload = columnsState.map(col => ({
        field: col.field,
        active: col.active,
      }));

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rows,
          columns: columnsPayload,
        }),
      });
      if (!response.ok) throw new Error("Error en la respuesta del servidor");
      const data = await response.json();
      if (data.rows) {
        setRows(data.rows);
        setSortConfig({ field: "kpi", direction: "desc" }); // Ordena por K-Pick descendente
      }
    } catch (err) {
      alert("Error generando K-Pick: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-teal-50 flex-1 flex flex-col items-center justify-start p-2">
      <CallToAction />
      <div className="flex gap-4 mb-2">
        <PrimaryButton className="flex items-center" onClick={handleGenerateKPick}>
          {loading ? "Generando..." : "Generar K-Pick"}
        </PrimaryButton>
        <SquareButton
          onClick={() => setIsColumnsModalOpen(true)}
          className="ml-1"
          helperLabel="Activa o desactiva columnas"
        >
          <IconEnableColumns />
        </SquareButton>
      </div>

      <ColumnsModal
        isOpen={isColumnsModalOpen}
        onClose={() => setIsColumnsModalOpen(false)}
        columns={columnsState}
        setColumns={setColumnsState}
      />

      <DataTable
        columns={columnsState.filter(col => col.active)}
        rows={getSortedRows()}
        onRowDelete={handleDeleteRow}
        onEditRow={handleEditRow}
        onSort={handleSort}
        sortConfig={sortConfig}
      />

      <RoundedButton
        onClick={() => setIsModalOpen(true)}
        className="flex items-center"
        helperLabel="Añade una nueva vivienda"
      >
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
