// src/components/layout/Content.jsx
import React, { useState } from 'react';

import Table from '../table/Table';
import Button from '../common/Button';
import CallToAction from './CallToAction';
import AddColumnButton from '../table/AddColumnButton';
import PopupWindow from './PopupWindow';

import { sendRowsToBackend } from '../../api/generate';
import { useTableRows } from '../../hooks/useTableRows';

const ALL_DYNAMIC_COLUMNS = [
  { key: "habitaciones", label: "Habitaciones", default: 2 },
  { key: "banos", label: "Baños", default: 2 },
  { key: "planta", label: "Planta", default: "intermedia" },
];

function Content() {
  const [popupOpen, setPopupOpen] = useState(false);

  // Estado para columnas seleccionadas en el popup
  const [selectedColumns, setSelectedColumns] = useState([]);
  // Columnas dinámicas realmente activas en la tabla
  const [activeColumns, setActiveColumns] = useState([]);

  const {
    rows,
    handleCellChange,
    handleAddRow,
    handleDeleteRow,
    replaceRows,
  } = useTableRows([
    { id: 1, name: "Castellana 324 2,C.", price: 450000, surface: 75 },
    { id: 2, name: "Principe de vergara 27, 4A.", price: 375000, surface: 82 }
  ]);

  // Botón para generar K-Pick
  const handleButtonClick = async () => {
    try {
      const result = await sendRowsToBackend(rows);
      if (result && Array.isArray(result.data)) {
        const rowsFromBackend = result.data.map(row => ({
          ...row,
          surface: row.area // Alias para frontend
        }));
        replaceRows(rowsFromBackend);
      }
    } catch (err) {
      console.error('Error al enviar:', err);
    }
  };

  // Aplica la selección del popup: añade/quita columnas dinámicas
  const handleApplyColumns = (selected) => {
    // Determina columnas a añadir y a quitar
    const toAdd = ALL_DYNAMIC_COLUMNS.filter(col => selected.includes(col.key));
    const toRemove = ALL_DYNAMIC_COLUMNS.filter(col => !selected.includes(col.key));

    // Modifica las filas según las columnas seleccionadas
    const newRows = rows.map(row => {
      let updatedRow = { ...row };
      // Añadir campos con valores por defecto
      toAdd.forEach(col => {
        if (updatedRow[col.key] === undefined) {
          updatedRow[col.key] = col.default;
        }
      });
      // Eliminar campos deseleccionados
      toRemove.forEach(col => {
        if (updatedRow.hasOwnProperty(col.key)) {
          delete updatedRow[col.key];
        }
      });
      return updatedRow;
    });

    // Actualiza el estado
    setActiveColumns(selected);
    replaceRows(newRows);
    setPopupOpen(false);
  };

  return (
    <main className="flex-1 flex flex-col items-center justify-start p-8">
      <CallToAction />
      <div className="flex gap-4 mb-4">
        <Button className="flex items-center" onClick={handleButtonClick}>
          Generar K-Pick
        </Button>
        <AddColumnButton onClick={() => setPopupOpen(true)} />
      </div>
      <Table
        rows={rows}
        onCellChange={handleCellChange}
        onAddRow={handleAddRow}
        onDeleteRow={handleDeleteRow}
        onReplaceRows={replaceRows}
        dynamicColumns={activeColumns}
      />
      <PopupWindow
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
        selectedColumns={selectedColumns}
        setSelectedColumns={setSelectedColumns}
        onApply={handleApplyColumns}
      />
    </main>
  );
}

export default Content;
