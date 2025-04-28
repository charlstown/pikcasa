// src/components/table/AddRowButton.jsx
import React from "react";

import IconAddRow from "../../assets/IconAddRow";

function AddRowButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      type="button"
      aria-label="Añadir fila"
      className="flex items-center justify-center w-10 h-10 rounded-full bg-teal-300 text-white hover:bg-teal-300/70 transition-colors shadow"
    >
      <IconAddRow className="p-2" />
    </button>
  );
}

export default AddRowButton;
