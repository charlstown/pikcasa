import React from "react";

function SquareButton({
  onClick,
  children,
  className = "",
  borderColor = "border-teal-400",
  width = "w-10",
  height = "h-10"
}) {
  const baseClass =
    "flex items-center justify-center border-2 bg-transparent transition-colors shadow rounded-lg";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseClass} ${borderColor} ${width} ${height} ${className}`}
      style={{ aspectRatio: "1 / 1" }}
    >
      {children}
    </button>
  );
}

export default SquareButton;