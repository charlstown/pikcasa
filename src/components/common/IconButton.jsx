import React, { useState } from "react";
import HelperTooltip from "./HelperTooltip";

function IconButton({ onClick, children, className = "", helperLabel, ...props }) {
  const [showHelper, setShowHelper] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (e) => {
    setShowHelper(true);
    setMousePos({ x: e.clientX, y: e.clientY });
  };
  const handleMouseLeave = () => setShowHelper(false);
  const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });

  return (
    <>
      <button
        type="button"
        className={className}
        onClick={onClick}
        onMouseEnter={helperLabel ? handleMouseEnter : undefined}
        onMouseLeave={helperLabel ? handleMouseLeave : undefined}
        onMouseMove={helperLabel ? handleMouseMove : undefined}
        {...props}
      >
        {children}
      </button>
      <HelperTooltip visible={showHelper} label={helperLabel} position={mousePos} />
    </>
  );
}

export default IconButton;