import React from "react";

function FormField({ field, value, onChange, error }) {
  const { name, label, type, options, maxLength, placeholder, width, default_option } = field;

  // Determina la clase de ancho según el valor de `width`
  const widthClass = width === "half" ? "w-1/2" : "w-full";

  return (
    <div className={`mb-4 ${widthClass} px-2`}>
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {type === "select" ? (
          <select
            name={name}
            value={value}
            onChange={onChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm font-normal placeholder-gray-400"
          >
            {/* Solo muestra la opción de placeholder si NO hay default_option */}
            {!default_option && (
              <option value="">{placeholder || "Seleccione una opción"}</option>
            )}
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type === "numeric" ? "number" : "text"}
            name={name}
            value={value}
            onChange={onChange}
            maxLength={type === "string" ? maxLength : undefined}
            placeholder={placeholder}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm font-normal placeholder-gray-400"
          />
        )}
      </label>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

export default FormField;