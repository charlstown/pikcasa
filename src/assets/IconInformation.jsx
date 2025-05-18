// SVG icon for information, styled like IconEnableColumns
import React from "react";

function IconInformation({ className = "w-4 h-4", color = "currentColor", ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <path d="M12,1C5.935,1,1,5.935,1,12s4.935,11,11,11s11-4.935,11-11S18.065,1,12,1z M12,21c-4.962,0-9-4.038-9-9s4.038-9,9-9  s9,4.038,9,9S16.962,21,12,21z" fill={color}/>
      <path d="M12,9c-0.552,0-1,0.448-1,1v7c0,0.552,0.448,1,1,1s1-0.448,1-1v-7C13,9.448,12.552,9,12,9z" fill={color}/>
      <circle cx="12" cy="7" r="1" fill={color}/>
    </svg>
  );
}

export default IconInformation;
