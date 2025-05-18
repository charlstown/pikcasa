import React from "react";

function ButtonSlider({ value, onChange, disabled }) {
  const handleDecrement = () => {
    if (value > 0) {
      onChange(Math.max(0, +(value - 0.25).toFixed(2)));
    }
  };
  const handleIncrement = () => {
    if (value < 1) {
      onChange(Math.min(1, +(value + 0.25).toFixed(2)));
    }
  };
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        className={`w-7 h-7 rounded-lg border border-slate-300 flex items-center justify-center text-slate-400 hover:text-teal-500 hover:border-teal-400 transition disabled:opacity-40 disabled:cursor-not-allowed`}
        onClick={handleDecrement}
        disabled={disabled || value <= 0}
        tabIndex={-1}
      >
        -
      </button>
      <span
        className={
          `w-10 text-center font-semibold select-none ` +
          (value === 1 ? "text-teal-400" : value === 0 ? "text-slate-200" : "text-slate-400")
        }
      >
        {value.toFixed(2)}
      </span>
      <button
        type="button"
        className={`w-7 h-7 rounded-lg border border-slate-300 flex items-center justify-center text-slate-400 hover:text-teal-500 hover:border-teal-400 transition disabled:opacity-40 disabled:cursor-not-allowed`}
        onClick={handleIncrement}
        disabled={disabled || value >= 1}
        tabIndex={-1}
      >
        +
      </button>
    </div>
  );
}

export default ButtonSlider;
