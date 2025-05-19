import React from "react";
import IconCross from "../../assets/IconCross";

function WindowOverlay({ isOpen, onClose, children, className = "", ...props }) {
  if (!isOpen) return null;

  // Cierra al hacer click fuera del contenido
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose && onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div
        className={`relative bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-[30rem] max-h-screen overflow-y-auto ${className}`}
        onClick={e => e.stopPropagation()}
        {...props}
      >
        {/* Aspa de cierre en la esquina superior derecha */}
        <button
          type="button"
          aria-label="Cerrar ventana"
          onClick={onClose}
          className="absolute top-3 right-3 p-1 rounded hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-400 z-10"
          tabIndex={0}
        >
          <IconCross className="w-6 h-6 text-slate-400 hover:text-teal-500" />
        </button>
        {/* Contenido del hijo */}
        <div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default WindowOverlay;
