import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import IconInformation from "../../assets/IconInformation";

/**
 * InfoTooltip: Icono de información con tooltip flotante.
 * Props:
 * - color: tailwind o hex (por defecto text-slate-400)
 * - className: clases extra para el icono (por defecto h-4 w-4)
 * - tooltipBgColor: clase tailwind para el fondo del tooltip (por defecto bg-white/90)
 * - children: contenido del tooltip
 */
function InfoTooltip({ color = "text-slate-400", className = "h-4 w-4", tooltipBgColor = "bg-white/90", children }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const iconRef = useRef(null);

  const handleShow = () => {
    if (iconRef.current) {
      const rect = iconRef.current.getBoundingClientRect();
      setCoords({
        top: rect.top + window.scrollY - 48,
        left: rect.left + window.scrollX + rect.width / 2,
      });
    }
    setShowTooltip(true);
  };

  const handleHide = () => setShowTooltip(false);

  return (
    <span
      ref={iconRef}
      className={"relative inline-flex items-center group select-none " + className}
      onMouseEnter={handleShow}
      onMouseLeave={handleHide}
      tabIndex={0}
      onFocus={handleShow}
      onBlur={handleHide}
      style={{ outline: "none" }}
    >
      <IconInformation className={className + " " + color} />
      {showTooltip && children && ReactDOM.createPortal(
        <span
          className={`fixed z-[9999] w-max min-w-[180px] max-w-xs ${tooltipBgColor} backdrop-blur-sm text-slate-700 text-xs px-3 py-2 rounded-xl shadow-md text-center pointer-events-none transition-opacity duration-200 opacity-100`}
          style={{
            top: coords.top,
            left: coords.left,
            transform: "translate(-50%, -8px)",
          }}
          aria-hidden={!showTooltip}
        >
          {children}
        </span>,
        document.body
      )}
    </span>
  );
}

export default InfoTooltip;
