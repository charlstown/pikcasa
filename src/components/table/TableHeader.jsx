import SortIcon from "../common/SortIcon";

function TableHeader({ sort, onSort }) {
  const columns = [
    { key: "name", label: "Nombre" },
    { key: "price", label: "Precio" },
    { key: "surface", label: "Superficie" }
  ];

  return (
    <thead>
      <tr className="bg-slate-100">
        {columns.map(col => (
          <th
            key={col.key}
            className="px-4 py-2 text-left cursor-pointer select-none"
            onClick={() => onSort(col.key)}
            scope="col"
          >
            <span className="flex items-center">
              {col.label}
              <SortIcon
                active={sort.field === col.key}
                direction={
                  sort.field === col.key ? sort.direction : "asc"
                }
              />
            </span>
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHeader;
