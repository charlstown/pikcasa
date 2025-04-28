// src/components/common/AddColumnButton.jsx
import React from "react";
import IconAddColumn from "../../assets/IconAddColumn";

function AddColumnButton({ onClick, className = "" }) {
  const baseClass = "flex items-center justify-center w-10 h-10 bg-teal-400 text-white rounded-lg font-semibold hover:bg-teal-400/70 transition-colors shadow";
  return (
    <button
      type="button"
      aria-label="Añadir columna"
      onClick={onClick}
      className={`${baseClass} ${className}`}
    >
      <IconAddColumn className="w-7 h-7" />
    </button>
  );
}

export default AddColumnButton;
