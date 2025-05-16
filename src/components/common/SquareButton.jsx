import React from "react";

function SquareButton({ children, onClick, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`bg-teal-50 border-2 border-teal-400 rounded-md w-10 h-10 flex items-center justify-center hover:bg-teal-100 transition-colors ${className}`}
    >
      {children}
    </button>
  );
}

export default SquareButton;