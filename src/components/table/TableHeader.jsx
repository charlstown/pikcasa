// src/components/table/TableHeader.jsx
import SortIcon from "../common/SortIcon";

const COLUMN_LABELS = {
  habitaciones: "Habitaciones",
  banos: "Baños",
  planta: "Planta"
};

function TableHeader({ sort, onSort, hasKpick, dynamicColumns = [] }) {
  const columns = [
    { key: "name", label: "Nombre" },
    { key: "price", label: "Precio" },
    { key: "surface", label: "Superficie" },
  ];

  return (
    <thead>
      <tr className="bg-slate-100">
        <th></th>
        {columns.map(col => (
          <th
            key={col.key}
            className="px-4 py-2 text-left cursor-pointer select-none"
            onClick={() => onSort(col.key)}
          >
            <span className="flex items-center">
              {col.label}
              <SortIcon
                active={sort.field === col.key}
                direction={sort.direction}
              />
            </span>
          </th>
        ))}
        {dynamicColumns.map(colKey => (
          <th key={colKey} className="px-4 py-2 text-left">{COLUMN_LABELS[colKey]}</th>
        ))}
        {hasKpick && (
          <th
            className="min-w-20 px-4 text-center text-teal-400 cursor-pointer select-none whitespace-nowrap"
            onClick={() => onSort('kpick')}
          >
            <span className="flex items-center justify-center">
              {"K-Pick"}
              <SortIcon
                active={sort.field === "kpick"}
                direction={sort.direction}
                activeColor="text-teal-400"
                inactiveColor="text-teal-200"
              />
            </span>
          </th>
        )}
      </tr>
    </thead>
  );
}

export default TableHeader;
