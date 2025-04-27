// src/components/table/AddRowButton.jsx

import React from "react";

function AddRowButton({ onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center
                  w-10 h-10 rounded-full bg-blue-600 text-white shadow-lg
                  transition-opacity duration-200 hover:bg-blue-700
                  focus:outline-none ${className}`}
      aria-label="Añadir fila"
      type="button"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
      </svg>
    </button>
  );
}

export default AddRowButton;
