import React from "react";

const IconEmojiCheck = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    viewBox="0 0 333.33 333"
    className={`w-6 h-6 ${props.className || ""}`}
    fill="currentColor"
    {...props}
  >
    <g>
      <path d="M16.38 213.59c-13.2,-13.19 -13.2,-34.59 0,-47.78 13.19,-13.2 34.59,-13.2 47.79,0l56.97 56.97 145.66 -183.83c11.52,-14.58 32.68,-17.06 47.26,-5.55 14.58,11.52 17.06,32.68 5.54,47.26l-167.29 211.14c-1.26,1.94 -2.74,3.78 -4.45,5.48 -13.19,13.2 -34.59,13.2 -47.78,0l-83.69 -83.69z"/>
    </g>
  </svg>
);

export default IconEmojiCheck;