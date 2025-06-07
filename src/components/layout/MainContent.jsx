// src/components/layout/Content.jsx
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

import PrimaryButton from '../common/PrimaryButton';
import RoundedButton from '../common/RoundedButton';
import SquareButton from '../common/SquareButton';
import CallToAction from './CallToAction';
import DataTable from '../table/DataTable';
import ModalCard from './ModalCard';
import EditModalCard from './EditModalCard';
import ColumnsWeight from '../ColumnsWeight/ColumnsWeight';

import { useAppConfig } from '../../config/AppConfigContext';
import IconAddRow from '../../assets/IconAddRow';
import IconEnableColumns from '../../assets/IconEnableColumns';
import { usePersistentState } from "../../hooks/usePersistentState";
import { initialRows } from '../../config/initialRows';
import { API_URL } from '../../config/api';

function MainContent() {
  const { configTable, configForm, appData } = useAppConfig();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rows, setRows] = usePersistentState("viviendas", initialRows);
  const [loading, setLoading] = useState(false);

  // Estado para edición
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [rowToEdit, setRowToEdit] = useState(null);

  // Estado para el modal de columnas
  const [isColumnsWeightOpen, setIsColumnsWeightOpen] = useState(false);

  // Nuevo estado para columns
  const [columnsState, setColumnsState] = usePersistentState("columnsState", appData);

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

    const fetchPromise = fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        rows,
        columns: columnsState,
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
        columns={columnsState}
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
      />

      <EditModalCard
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSubmit={handleUpdateRow}
        rowData={rowToEdit}
      />
    </main>
  );
}

export default MainContent;
