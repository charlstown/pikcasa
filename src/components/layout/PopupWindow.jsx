import React from "react";
import Window from "./Window";
import CheckList from "./CheckList";

function PopupWindow({ open, onClose, selectedColumns, setSelectedColumns }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <Window>
        <h1 className="text-xl text-slate-600 font-bold mb-4">Añadir campo</h1>
        <CheckList
          selected={selectedColumns}
          setSelected={setSelectedColumns}
        />
      </Window>
    </div>
  );
}

export default PopupWindow;
