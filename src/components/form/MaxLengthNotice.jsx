import React from "react";

function MaxLengthNotice({ show, maxLength }) {
  if (!show) return null;
  return (
    <span className="absolute right-2 top-1/2 -translate-y-1/2 bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded shadow z-10 animate-pulse">
      max. {maxLength} caracteres
    </span>
  );
}

export default MaxLengthNotice;
