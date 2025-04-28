// src/components/layout/Window.jsx
import React from "react";

function Window({ children, className = "" }) {
  return (
    <div
      className={`bg-white rounded-2xl p-8 shadow-lg min-w-[300px] max-w-lg ${className}`}
      onClick={e => e.stopPropagation()}
    >
      {children}
    </div>
  );
}

export default Window;
