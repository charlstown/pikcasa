import React, { useState } from "react";
import HelperTooltip from "./HelperTooltip";
import toast from 'react-hot-toast';

/**
 * IconLinkButton: Enlace externo con icono, accesible y estilizable.
 * Props:
 * - link: string (href)
 * - color: string (clases tailwind para color, por defecto 'text-slate-500 hover:text-teal-500')
 * - labelHelper: string (texto del tooltip)
 * - children: icono (ej: <IconLink />)
 */
function IconLinkButton({ link, color = "text-slate-500 hover:text-teal-500", labelHelper, children, ...props }) {
  const [showHelper, setShowHelper] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (e) => {
    setShowHelper(true);
    setMousePos({ x: e.clientX, y: e.clientY });
  };
  const handleMouseLeave = () => setShowHelper(false);
  const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });

  const handleClick = (e) => {
    if (!link) {
      e.preventDefault();
      toast.error("No has añadido link a esta vivienda." , { id: "no-link-toast" });
    }
  };

  return (
    <>
      <a
        href={link || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className={"flex justify-center items-center transition " + color}
        onMouseEnter={labelHelper ? handleMouseEnter : undefined}
        onMouseLeave={labelHelper ? handleMouseLeave : undefined}
        onMouseMove={labelHelper ? handleMouseMove : undefined}
        onClick={handleClick}
        {...props}
      >
        {children}
      </a>
      <HelperTooltip visible={showHelper} label={labelHelper} position={mousePos} />
    </>
  );
}

export default IconLinkButton;
