// src/components/common/RoundedButton.jsx
import React from "react";

function RoundedButton({ onClick, children, className = "", color = "bg-teal-400", hoverColor = "hover:bg-teal-400/70" }) {
  const baseClass =
    "w-10 h-10 flex items-center justify-center text-white rounded-full transition-colors shadow";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseClass} ${color} ${hoverColor} ${className}`}
    >
      {children}
    </button>
  );
}

export default RoundedButton;
