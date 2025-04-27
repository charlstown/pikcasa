// src/components/common/Button.jsx
import React from "react";

function Button({ onClick, children, className = "" }) {
  const baseClass = "px-4 py-2 bg-slate-100 text-slate-500 rounded-lg font-semibold hover:bg-teal-300 hover:text-white transition-colors shadow";
  return (
    <button type="button"
    onClick={onClick}
    className={`${baseClass} ${className}`}>
      {children}
    </button>
  );
}

export default Button;
