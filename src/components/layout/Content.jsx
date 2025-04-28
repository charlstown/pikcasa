// src/components/layout/Content.jsx
import React, { useState } from 'react';

import Table from '../table/Table';
import Button from '../common/Button';
import CallToAction from './CallToAction';
import AddColumnButton from '../table/AddColumnButton';
import PopupWindow from './PopupWindow';

import { sendRowsToBackend } from '../../api/generate';
import { useTableRows } from '../../hooks/useTableRows';

function Content() {
  // Estado para el popup
  const [popupOpen, setPopupOpen] = useState(false);

  // Nuevo: Estado para los campos seleccionados
  const [selectedColumns, setSelectedColumns] = useState([]);

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
      />
      <PopupWindow
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
        selectedColumns={selectedColumns}
        setSelectedColumns={setSelectedColumns}
      />
    </main>
  );
}

export default Content;
