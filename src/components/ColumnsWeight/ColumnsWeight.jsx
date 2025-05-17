import React, { useState } from "react";
import CheckList from "./CheckList";

function ColumnsWeight({ isOpen, onClose, columns, setColumns }) {
  if (!isOpen) return null;

  // Exclude columns that should not be toggled (emoji, id, link, etc.)
  const excludedFields = ["id", "link", "emoji", "kpi", "precio", "superficie", "eurom2"];
  const filteredColumns = columns.filter(col => !excludedFields.includes(col.field));

  // Local state for checklist
  const [localColumns, setLocalColumns] = useState(filteredColumns.map(col => ({ ...col })));

  // Sync localColumns if columns change
  React.useEffect(() => {
    setLocalColumns(filteredColumns.map(col => ({ ...col })));
    // eslint-disable-next-line
  }, [columns, isOpen]);

  // Toggle weight between 0 and 1
  const handleCheckboxChange = (field) => {
    setLocalColumns(cols =>
      cols.map(col =>
        col.field === field ? { ...col, weight: col.weight === 0 ? 1 : 0 } : col
      )
    );
  };

  const handleAccept = () => {
    setColumns(prevCols =>
      prevCols.map(col =>
        excludedFields.includes(col.field)
          ? col
          : {
              ...col,
              weight: localColumns.find(lc => lc.field === col.field)?.weight ?? col.weight,
            }
      )
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-[24rem] max-h-screen overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-1 text-slate-500">Activar/Desactivar columnas</h2>
        <p className="text-sm text-slate-500 mb-4">
          Las seleccionadas se incluirán en el cálculo del K-Pick
        </p>
        <form>
          <CheckList items={localColumns} onToggle={handleCheckboxChange} />
          <button
            type="button"
            className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-400 transition"
            onClick={handleAccept}
          >
            Aceptar
          </button>
        </form>
      </div>
    </div>
  );
}

export default ColumnsWeight;