import React, { useState } from "react";
import HelperTooltip from "./HelperTooltip";

const SquareButton = ({
  children,
  helperLabel,
  colorType = "white", // "accent" o "white"
  iconColor,
  hoverColor,
  ...props
}) => {
  const [showHelper, setShowHelper] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  const handleMouseEnter = () => { setShowHelper(true); setHover(true); };
  const handleMouseLeave = () => { setShowHelper(false); setHover(false); };
  const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });

  // Definición de estilos según colorType y hover
  let buttonBgClass = "";
  let iconColorClass = iconColor || "";
  if (colorType === "accent") {
    buttonBgClass = hover ? "bg-teal-300" : "bg-teal-400";
    iconColorClass = iconColor || "text-white";
  } else { // white
    buttonBgClass = hover ? "bg-white" : "bg-white";
    iconColorClass = iconColor || (hover ? "text-teal-300" : "text-teal-400");
  }

  // Si el hijo es un icono, pásale la clase de color
  const childWithColor = React.isValidElement(children)
    ? React.cloneElement(children, { className: `w-6 h-6 ${iconColorClass}` })
    : children;

  return (
    <>
      <button
        {...props}
        onMouseEnter={helperLabel ? handleMouseEnter : undefined}
        onMouseLeave={helperLabel ? handleMouseLeave : undefined}
        onMouseMove={helperLabel ? handleMouseMove : undefined}
        className={`rounded-md ${buttonBgClass} p-2 shadow transition ${hoverColor || ""} ${props.className || ""}`}
      >
        {childWithColor}
      </button>
      <HelperTooltip visible={showHelper} label={helperLabel} position={mousePos} />
    </>
  );
};

export default SquareButton;