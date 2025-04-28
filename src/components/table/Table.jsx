// src/components/table/Table.jsx
import React from "react";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import AddRowButton from "./AddRowButton";
import { useTableSort } from "../../hooks/useTableSort";

function Table({ rows, onCellChange, onAddRow, onDeleteRow, onReplaceRows, dynamicColumns }) {
  const [sort, handleSort] = useTableSort(rows, onReplaceRows);

  const hasKpick = rows.some(r => r.kpick !== undefined);

  return (
    <>
      <div className="mt-6 overflow-x-auto overflow-hidden shadow-md sm:rounded-lg max-w-4xl w-full mx-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <TableHeader sort={sort} onSort={handleSort} hasKpick={hasKpick} dynamicColumns={dynamicColumns} />
          <tbody>
            {rows.map((row, idx) => (
              <TableRow
                key={row.id}
                row={row}
                rowIndex={idx}
                onCellChange={onCellChange}
                onDelete={onDeleteRow}
                dynamicColumns={dynamicColumns}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="max-w-3xl w-full mx-auto flex justify-center mt-6">
        <AddRowButton onClick={onAddRow} />
      </div>
    </>
  );
}
export default Table;