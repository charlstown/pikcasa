import React from "react";

const HelperTooltip = ({ visible, label, position }) => {
  if (!visible) return null;
  return (
    <div
      className="fixed z-50 px-2 py-1 rounded bg-slate-700 text-white text-xs pointer-events-none"
      style={{
        left: position.x + 12,
        top: position.y + 12,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </div>
  );
};

export default HelperTooltip;