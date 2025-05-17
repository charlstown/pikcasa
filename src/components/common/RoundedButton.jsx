// src/components/common/RoundedButton.jsx
import React, { useState } from "react";
import HelperTooltip from "./HelperTooltip";

const RoundedButton = ({ children, helperLabel, ...props }) => {
  const [showHelper, setShowHelper] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseEnter = () => setShowHelper(true);
  const handleMouseLeave = () => setShowHelper(false);
  const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });

  return (
    <>
      <button
        {...props}
        onMouseEnter={helperLabel ? handleMouseEnter : undefined}
        onMouseLeave={helperLabel ? handleMouseLeave : undefined}
        onMouseMove={helperLabel ? handleMouseMove : undefined}
        className={`rounded-full bg-teal-400 hover:bg-teal-300 text-white p-3 shadow-md transition ${props.className || ""}`}
      >
        {children}
      </button>
      <HelperTooltip visible={showHelper} label={helperLabel} position={mousePos} />
    </>
  );
};

export default RoundedButton;
