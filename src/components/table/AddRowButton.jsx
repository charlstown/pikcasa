// src/components/table/AddRowButton.jsx

import React from "react";

function AddRowButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      type="button"
      aria-label="Añadir fila"
      className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 text-teal-400 hover:bg-teal-200 transition-colors shadow"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
      </svg>
    </button>
  );
}

export default AddRowButton;
