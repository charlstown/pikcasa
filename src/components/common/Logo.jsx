// src/components/Logo.jsx
import React from "react";

function Logo({ className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-5.0 -10.0 110.0 135.0"
      className={className}
    >
      <path fill="currentColor" d="m81.25 47.625-19.406-21.836 8.4688-10.164 23.438 28.125v28.125h-12.5z"/>
      <path fill="currentColor" d="m29.688 15.625 8.4688 10.164-19.406 21.836v24.25h-12.5v-28.125z"/>
      <path fill="currentColor" d="m50 21.875-25 28.125v31.25h18.75v-18.75h12.5v18.75h18.75v-31.25z"/>
    </svg>
  );
}

export default Logo;
