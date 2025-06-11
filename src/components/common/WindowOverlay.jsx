import React, { useRef } from "react";
import IconCross from "../../assets/IconCross";

function WindowOverlay({ isOpen, onClose, children, className = "", ...props }) {
  if (!isOpen) return null;

  const overlayRef = useRef(null);
  const mouseDownOutside = useRef(false);

  // Marca si el mousedown fue fuera del modal
  const handleOverlayMouseDown = (e) => {
    if (e.target === overlayRef.current) {
      mouseDownOutside.current = true;
    } else {
      mouseDownOutside.current = false;
    }
  };

  // Solo cierra si el mousedown y mouseup fueron fuera
  const handleOverlayMouseUp = (e) => {
    if (e.target === overlayRef.current && mouseDownOutside.current) {
      onClose && onClose();
    }
    mouseDownOutside.current = false;
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
      onMouseDown={handleOverlayMouseDown}
      onMouseUp={handleOverlayMouseUp}
    >
      <div
        className={`relative bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-[30rem] max-h-screen overflow-y-auto ${className}`}
        onMouseDown={e => e.stopPropagation()}
        onMouseUp={e => e.stopPropagation()}
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
