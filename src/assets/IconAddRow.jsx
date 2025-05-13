import React from "react";

const IconAddRow = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="13 14 74 74"
    fill="currentColor" // Hereda el color del texto
    className={`w-6 h-6 ${props.className || ""}`} // Permite personalizar el tamaño y color
    {...props}
  >
    <path d="M60,50H54V44a4,4,0,0,0-8,0v6H40a4,4,0,0,0,0,8h6v6a4,4,0,0,0,8,0V58h6a4,4,0,0,0,0-8Z" />
    <path d="M76.21,32.86l-19-12.67a13,13,0,0,0-14.42,0l-19,12.67A13,13,0,0,0,18,43.68V70A12,12,0,0,0,30,82H70A12,12,0,0,0,82,70V43.68A13,13,0,0,0,76.21,32.86ZM74,70a4,4,0,0,1-4,4H30a4,4,0,0,1-4-4V43.68a5,5,0,0,1,2.23-4.16l19-12.67a5,5,0,0,1,5.55,0l19,12.67A5,5,0,0,1,74,43.68Z" />
  </svg>
);

export default IconAddRow;
