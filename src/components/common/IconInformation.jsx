import React from "react";

/**
 * IconInformation: SVG info icon with customizable color and size.
 * Props:
 * - color: Tailwind or hex color (default: 'text-slate-400')
 * - className: extra classes for icon size (default: 'h-4 w-4')
 */
function IconInformation({ color = "text-slate-400", className = "h-4 w-4" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={color + " " + className}
      fill="none"
      stroke="currentColor"
      strokeWidth="0"
      aria-hidden="true"
    >
      <path d="M12,1C5.935,1,1,5.935,1,12s4.935,11,11,11s11-4.935,11-11S18.065,1,12,1z M12,21c-4.962,0-9-4.038-9-9s4.038-9,9-9  s9,4.038,9,9S16.962,21,12,21z" fill="currentColor"/>
      <path d="M12,9c-0.552,0-1,0.448-1,1v7c0,0.552,0.448,1,1,1s1-0.448,1-1v-7C13,9.448,12.552,9,12,9z" fill="currentColor"/>
      <circle cx="12" cy="7" r="1" fill="currentColor"/>
    </svg>
  );
}

export default IconInformation;
