// src/components/layout/Content.jsx
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

import PrimaryButton from '../common/PrimaryButton';
import RoundedButton from '../common/RoundedButton';
import SquareButton from '../common/SquareButton';
import CallToAction from './CallToAction';
import DataTable from '../table/Table';
import ModalCard from './ModalCard';
import EditModalCard from './EditModalCard';
import ColumnsWeight from '../ColumnsWeight/ColumnsWeight';

import IconAddRow from '../../assets/IconAddRow';
import IconEnableColumns from '../../assets/IconEnableColumns';
import { usePersistentState } from "../../hooks/usePersistentState";

const columns = [
  { field: "id", weight: 0, visible:false, label: "ID", width: 50, highlight: false, sortable: false, align: "left" },
  { field: "link", weight: 1, label: "Link", width: 200, highlight: false, sortable: false, align: "center" },
  { field: "emoji", weight: 1, label: "❤️", width: 60, highlight: false, sortable: false, align: "center" },
  { field: "kpi", weight: 1, label: "K-Pick", width: 100, highlight: true, sortable: true, align: "center" },
  { field: "precio", weight: 1, label: "Precio", width: 100, highlight: false, sortable: true, align: "center" },
  { field: "superficie", weight: 1, label: "Superficie", width: 80, highlight: false, sortable: true, align: "center" },
  { field: "eurom2", weight: 1, label: "€/m²", width: 90, highlight: false, sortable: true, align: "center" },
  { field: "habitaciones", weight: 1, label: "Habitaciones", width: 90, highlight: false, sortable: false, align: "center" },
  { field: "baños", weight: 1, label: "Baños", width: 70, highlight: false, sortable: false, align: "center" },
  { field: "planta", weight: 1, label: "Planta", width: 70, highlight: false, sortable: false, align: "center" },
  { field: "ascensor", weight: 1, label: "Ascensor", width: 80, highlight: false, sortable: false, align: "center" },
  { field: "calefaccion", weight: 1, label: "Calefacción", width: 100, highlight: false, sortable: false, align: "center" },
  { field: "fachada", weight: 1, label: "Fachada", width: 120, highlight: false, sortable: false, align: "center" },
  { field: "garaje", weight: 1, label: "Garaje", width: 120, highlight: false, sortable: false, align: "center" },
  { field: "terraza", weight: 1, label: "Terraza", width: 120, highlight: false, sortable: false, align: "center" },
  { field: "trastero", weight: 0, label: "Trastero", width: 100, highlight: false, sortable: false, align: "center" },
  { field: "ac", weight: 0, label: "Aire acond.", width: 120, highlight: false, sortable: false, align: "center" },
  { field: "año", weight: 0, label: "Año de const.", width: 120, highlight: false, sortable: true, align: "center" },
  { field: "estado", weight: 0, label: "Estado", width: 150, highlight: false, sortable: false, align: "center" },
];

const formFields = [
  { name: "link", label: "Link", type: "string", maxLength: 255, mandatory: false, placeholder: "Añade el link al anuncio de tu vivienda", width: "full" },
  { name: "precio", label: "Precio", type: "numeric", mandatory: true, placeholder: "Introduce el precio", width: "half" },
  { name: "superficie", label: "Superficie", type: "numeric", mandatory: true, placeholder: "Introduce la superficie", width: "half" },
  { name: "habitaciones", label: "Habitaciones", type: "numeric", mandatory: false, placeholder: "Número de habitaciones", width: "half" },
  { name: "baños", label: "Baños", type: "numeric", mandatory: false, placeholder: "Número de baños", width: "half" },
  { name: "planta", label: "Planta", type: "select", options: ["Semisótano", "Baja", "Intermedia", "Ático"], default_option: "Intermedia", mandatory: false, placeholder: "Introduce la planta", width: "half" },
  { name: "ascensor", label: "Ascensor", type: "select", options: ["Sí", "No"], default_option: "Sí", mandatory: false, placeholder: "Seleccione una opción", width: "half" },
  { name: "calefaccion", label: "Calefacción", type: "select", options: ["Sí", "No"], default_option: "Sí", mandatory: false, placeholder: "Seleccione calefacción", width: "half" },
  { name: "fachada", label: "Fachada", type: "select", options: ["Exterior", "Interior"], default_option: "Exterior", mandatory: false, width: "half" },
  { name: "terraza", label: "Terraza", type: "select", options: ["Sí", "No"], default_option: "No", mandatory: false, width: "half" },
  { name: "garaje", label: "Garaje", type: "select", options: ["Sí", "No"], default_option: "No", mandatory: false, width: "half" },
  { name: "trastero", label: "Trastero", type: "select", options: ["Sí", "No"], default_option: "No", mandatory: false, width: "half" },
  { name: "ac", label: "Aire acond.", type: "select", options: ["Sí", "No"], default_option: "No", mandatory: false, width: "half" },
  { name: "año", label: "Año de construcción", type: "numeric", mandatory: false, placeholder: "Año de construcción", width: "half" },
  { name: "estado", label: "Estado", type: "select", options: ["Nueva/reformada", "Buen estado", "Necesita reforma", "Reforma integral"], default_option: "Buen estado", mandatory: false, width: "half" },
];

const initialRows = [
  {
    id: 1,
    link: "https://www.example.com/property/1",
    emoji: "",
    kpi: 0,
    precio: 250000,
    superficie: 120,
    eurom2: 2083,
    habitaciones: 3,
    baños: 2,
    planta: "Intermedia",
    ascensor: "Sí",
    calefaccion: "Sí",
    fachada: "Exterior",
    garaje: "No",
    terraza: "Sí",
  },
  {
    id: 2,
    link: "https://www.example.com/property/2",
    emoji: "",
    kpi: 0,
    precio: 210000,
    superficie: 90,
    eurom2: 2333,
    habitaciones: 2,
    baños: 1,
    planta: "Baja",
    ascensor: "No",
    calefaccion: "No",
    fachada: "Interior",
    garaje: "Sí",
    terraza: "No",
  },
  {
    id: 3,
    link: "https://www.example.com/property/3",
    emoji: "",
    kpi: 0,
    precio: 320000,
    superficie: 150,
    eurom2: 2133,
    habitaciones: 3,
    baños: 2,
    planta: "Ático",
    ascensor: "Sí",
    calefaccion: "Sí",
    fachada: "Exterior",
    garaje: "Sí",
    terraza: "Sí",
  },
];

const API_URL = "https://o9qh2kvujg.execute-api.eu-west-3.amazonaws.com/generate-kpick";

function MainContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rows, setRows] = usePersistentState("viviendas", initialRows);
  const [loading, setLoading] = useState(false);

  // Estado para edición
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [rowToEdit, setRowToEdit] = useState(null);

  // Estado para el modal de columnas
  const [isColumnsWeightOpen, setIsColumnsWeightOpen] = useState(false);

  // Nuevo estado para columns
  const [columnsState, setColumnsState] = usePersistentState("columnsState", columns);

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

  //Handler para cambiar los emojis
  const handleEmojiChange = (id, emoji) => {
    setRows(prevRows =>
      prevRows.map(row =>
        row.id === id ? { ...row, emoji } : row
      )
    );
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
    const columnsPayload = columnsState.map(col => ({
      field: col.field,
      weight: col.weight,
    }));

    const fetchPromise = fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        rows,
        columns: columnsPayload,
      }),
    }).then(response => {
      if (!response.ok) throw new Error("Error en la respuesta del servidor");
      return response.json();
    });

    toast.promise(
      fetchPromise,
      {
        loading: 'Generando K-Pick...',
        success: <b>K-Pick generado!</b>,
        error: <b>Error al generar el K-Pick.</b>,
      },
      {
        iconTheme: {
          primary: 'oklch(77.7% .152 181.912)', // teal-900
          secondary: '#fff',
        },
      }
    );

    try {
      const data = await fetchPromise;
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

        <SquareButton
          onClick={() => setIsModalOpen(true)}
          className="flex items-center"
          helperLabel="Añade una nueva vivienda a la tabla"
          iconColor='text-white'
          colorType='accent'
          hoverColor='bg-teal-300'
        >
          <IconAddRow className="w-6 h-6 text-white" />
        </SquareButton>

        <SquareButton
          onClick={() => setIsColumnsWeightOpen(true)}
          className="ml-1"
          helperLabel="Ajusta los pesos de las columnas"
        >
          <IconEnableColumns />
        </SquareButton>
      </div>

      <ColumnsWeight
        key={isColumnsWeightOpen ? "open" : "closed"}
        isOpen={isColumnsWeightOpen}
        onClose={() => setIsColumnsWeightOpen(false)}
        columns={columnsState}
        setColumns={setColumnsState}
      />

      <DataTable
        columns={columnsState.filter(col => col.weight !== 0 && col.visible !== false)}
        rows={getSortedRows()}
        onRowDelete={handleDeleteRow}
        onEditRow={handleEditRow}
        onSort={handleSort}
        sortConfig={sortConfig}
        onEmojiChange={handleEmojiChange}
      />

        <PrimaryButton
          className="flex items-center"
          onClick={handleGenerateKPick}
          helperLabel="Genera el K-Pick y ordena tus viviendas"
          >
          {loading ? "Generando..." : "Generar K-Pick"}
        </PrimaryButton>

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

export default MainContent;
