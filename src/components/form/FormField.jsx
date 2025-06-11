import React, { useState, useRef } from "react";
import MaxLengthNotice from "./MaxLengthNotice";

function FormField({ field, value, onChange, error }) {
  const { field: fieldName, label, type, options, maxLength, placeholder, width, default_option } = field;
  const widthClass = width === "half" ? "w-1/2" : "w-full";

  // Estado para mostrar aviso de maxLength
  const [showMaxLength, setShowMaxLength] = useState(false);
  const timeoutRef = useRef(null);

  // Handler para input con aviso visual
  const handleInputChange = (e) => {
    if (type === "string" && maxLength && e.target.value.length >= maxLength) {
      setShowMaxLength(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setShowMaxLength(false), 2000);
    }
    onChange(e);
  };

  return (
    <div className={`mb-4 ${widthClass} px-2`}>
      <label className="block text-sm font-medium text-slate-500">
        {label}
        {type === "select" ? (
          <select
            name={fieldName}
            value={value}
            onChange={onChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm font-normal placeholder-gray-400"
          >
            {!default_option && (
              <option value="">{placeholder || "Seleccione una opción"}</option>
            )}
            {(options || []).map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <div className="relative">
            <input
              type={type === "numeric" ? "number" : "text"}
              name={fieldName}
              value={value}
              onChange={handleInputChange}
              maxLength={type === "string" ? maxLength : undefined}
              placeholder={placeholder}
              min={type === "numeric" ? 0 : undefined}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm font-normal placeholder-gray-400"
            />
            <MaxLengthNotice show={showMaxLength} maxLength={maxLength} />
          </div>
        )}
      </label>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

export default FormField;