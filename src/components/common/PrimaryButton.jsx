// src/components/common/PrimaryButton.jsx
import React, { useState } from "react";
import HelperTooltip from "./HelperTooltip";

function PrimaryButton({ onClick, children, className = "", helperLabel }) {
  const [showHelper, setShowHelper] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseEnter = () => setShowHelper(true);
  const handleMouseLeave = () => setShowHelper(false);
  const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });

  const baseClass = "px-4 py-2 bg-teal-400 text-white rounded-lg font-semibold hover:bg-teal-400/70 transition-colors shadow";
  return (
    <>
      <button
        type="button"
        onClick={onClick}
        className={`${baseClass} ${className}`}
        onMouseEnter={helperLabel ? handleMouseEnter : undefined}
        onMouseLeave={helperLabel ? handleMouseLeave : undefined}
        onMouseMove={helperLabel ? handleMouseMove : undefined}
      >
        {children}
      </button>
      <HelperTooltip visible={showHelper} label={helperLabel} position={mousePos} />
    </>
  );
}

export default PrimaryButton;
