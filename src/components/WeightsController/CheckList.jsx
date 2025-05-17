import React from "react";

function CheckList({ items, onToggle }) {
  return (
    <div className="flex flex-col gap-2 mb-4">
      {items.map(item => (
        <label key={item.field} className="flex items-center gap-2 text-slate-500 cursor-pointer">
          <input
            type="checkbox"
            checked={item.weight !== 0}
            onChange={() => onToggle(item.field)}
            className="sr-only peer"
          />
          <span className="w-5 h-5 rounded-md border-2 border-teal-500 flex items-center justify-center
            peer-checked:bg-teal-500 peer-checked:border-teal-500 transition">
            {item.weight !== 0 && (
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </span>
          {item.label}
        </label>
      ))}
    </div>
  );
}

export default CheckList;