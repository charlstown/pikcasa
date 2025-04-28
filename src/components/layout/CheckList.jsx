import React from "react";
import IconCheck from "../../assets/IconCheck";

const OPTIONS = [
  { key: "habitaciones", label: "Habitaciones" },
  { key: "banos", label: "Baños" },
  { key: "planta", label: "Planta" },
];

function CheckList({ selected = [], setSelected, options = OPTIONS }) {
  const handleSelect = (key) => {
    setSelected(prev =>
      prev.includes(key)
        ? prev.filter(k => k !== key)
        : [...prev, key]
    );
  };

  return (
    <ul className="flex flex-col gap-2 mt-4">
      {options.map(opt => (
        <li
          key={opt.key}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer select-none
            transition
            ${selected.includes(opt.key) ? "bg-slate-200" : "hover:bg-slate-100"}
          `}
          onClick={() => handleSelect(opt.key)}
        >
          <span
            className="inline-block w-5"
            style={{ minWidth: 20 }}
          >
            {selected.includes(opt.key) && <IconCheck />}
          </span>
          <span>{opt.label}</span>
        </li>
      ))}
    </ul>
  );
}

export default CheckList;
