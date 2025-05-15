// src/components/common/RoundedButton.jsx
import React from "react";

function RoundedButton({
  onClick,
  children,
  className = "",
  color = "bg-teal-400",
  hoverColor = "hover:bg-teal-400/70",
  width = "w-10",
  height = "h-10"
}) {
  const baseClass =
    "flex items-center justify-center text-white rounded-full transition-colors shadow";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseClass} ${width} ${height} ${color} ${hoverColor} ${className}`}
    >
      {children}
    </button>
  );
}

export default RoundedButton;
