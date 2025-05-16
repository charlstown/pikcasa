import React, { useState } from "react";
import CheckList from "../common/CheckList";

function ColumnsModal({ isOpen, onClose, columns, setColumns }) {
  if (!isOpen) return null;

  const excludedFields = ["id", "link", "kpi", "precio", "superficie", "eurom2"];
  const filteredColumns = columns.filter(col => !excludedFields.includes(col.field));

  // Estado local para los checks
  const [localColumns, setLocalColumns] = useState(filteredColumns.map(col => ({ ...col })));

  // Sincroniza localColumns si columns cambia (opcional, para mantener consistencia)
  React.useEffect(() => {
    setLocalColumns(filteredColumns.map(col => ({ ...col })));
    // eslint-disable-next-line
  }, [columns, isOpen]);

  const handleCheckboxChange = (field) => {
    setLocalColumns(cols =>
      cols.map(col =>
        col.field === field ? { ...col, active: !col.active } : col
      )
    );
  };

  const handleAccept = () => {
    // Actualiza el estado global de columns
    setColumns(prevCols =>
      prevCols.map(col =>
        excludedFields.includes(col.field)
          ? col
          : {
              ...col,
              active: localColumns.find(lc => lc.field === col.field)?.active ?? col.active,
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
          Las seleccionadas se incluiran en el cálculo del K-Pick
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

export default ColumnsModal;