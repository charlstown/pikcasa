// src/components/common/PrimaryButton.jsx
import React from "react";

function PrimaryButton({ onClick, children, className = "" }) {
  const baseClass = "px-4 py-2 bg-teal-400 text-white rounded-lg font-semibold hover:bg-teal-400/70 transition-colors shadow";
  return (
    <button type="PrimaryButton"
    onClick={onClick}
    className={`${baseClass} ${className}`}>
      {children}
    </button>
  );
}

export default PrimaryButton;
