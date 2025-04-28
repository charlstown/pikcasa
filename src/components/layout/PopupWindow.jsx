import React from "react";
import Window from "./Window";
import CheckList from "./CheckList";

function PopupWindow({ open, onClose, selectedColumns, setSelectedColumns, onApply }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <Window>
        <h1 className="text-2xl font-bold mb-4">Agregar columna</h1>
        <CheckList
          selected={selectedColumns}
          setSelected={setSelectedColumns}
        />
        <button
          className="mt-6 px-4 py-2 bg-teal-400 text-white rounded-lg font-semibold hover:bg-teal-400/70 transition-colors shadow"
          onClick={() => {
            onApply(selectedColumns); // Ahora sí existe y no habrá error
            onClose();
          }}
        >
          Aplicar
        </button>
      </Window>
    </div>
  );
}


export default PopupWindow;

