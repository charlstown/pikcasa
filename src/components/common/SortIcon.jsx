// SortIcon.jsx
function SortIcon({ direction = "asc", active = false }) {
    const color = active ? "text-slate-500" : "text-gray-300";
    return (
      <span className={`inline-block w-3 ml-1 align-middle ${color}`}>
        {direction === "asc" ? (
          <svg viewBox="0 0 10 6" fill="none"><path d="M5 0l5 6H0l5-6z" fill="currentColor"/></svg>
        ) : (
          <svg viewBox="0 0 10 6" fill="none"><path d="M5 6L0 0h10L5 6z" fill="currentColor"/></svg>
        )}
      </span>
    );
  }
  export default SortIcon;
  