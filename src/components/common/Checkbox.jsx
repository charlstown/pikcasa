import React from "react";

function Checkbox({ id, checked, onChange, label, className = "", activeColor = "teal-400", ...props }) {
  // Tailwind classes for dynamic color
  const colorClass = `checked:border-${activeColor} checked:bg-${activeColor} checked:before:bg-${activeColor}`;

  return (
    <label className={"relative flex cursor-pointer items-center p-0 " + className} htmlFor={id} data-ripple-dark="true">
      <span className="relative inline-block h-5 w-5">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className={
            // z-10 para que el SVG esté por encima, bg-transparent para que no tape el SVG
            "before:content-[''] peer relative z-10 h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all " +
            "before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 " +
            colorClass +
            (checked ? " bg-teal-400 border-teal-400" : " bg-white border-blue-gray-200")
          }
          style={{ boxShadow: "none" }}
          {...props}
        />
        {/* SVG checkmark absolutamente centrado, siempre blanco, solo visible cuando checked */}
        <span className="pointer-events-none absolute left-0 top-0 w-full h-full flex items-center justify-center z-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 333.33 330"
            className={`h-3.5 w-3.5 transition-opacity duration-200 ${checked ? "opacity-100" : "opacity-0"}`}
            fill="white"
          >
            <g>
              <path
                d="M129.46 193.17l129.3 -129.3c7.54,-7.54 19.84,-7.54 27.38,-0l17.61 17.61c7.54,7.54 7.54,19.84 0,27.38l-160.61 160.61c-7.54,7.54 -19.84,7.54 -27.38,0l-86.19 -86.19c-7.54,-7.54 -7.54,-19.84 0,-27.38l17.61 -17.61c7.54,-7.54 19.84,-7.54 27.38,0l54.89 54.89z"
                fill="white"
              />
            </g>
          </svg>
        </span>
      </span>
      {label && (
        <span className="ml-2 mt-px cursor-pointer select-none font-light text-slate-500">{label}</span>
      )}
    </label>
  );
}

export default Checkbox;
