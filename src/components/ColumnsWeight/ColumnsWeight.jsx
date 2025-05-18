import React, { useState, useMemo, useEffect } from "react";
import Checkbox from "../common/Checkbox";
import ButtonSlider from "./ButtonSlider";
import InfoTooltip from "../common/InfoTooltip";

function ColumnsWeight({ isOpen, onClose, columns, setColumns }) {
  if (!isOpen) return null;

  const excludedFields = ["id", "link", "emoji", "kpi", "precio", "superficie", "eurom2"];
  const filteredColumns = useMemo(
    () => columns.filter(col => !excludedFields.includes(col.field)),
    [columns]
  );

  const [localColumns, setLocalColumns] = useState(() => filteredColumns.map(col => ({ ...col })));

  useEffect(() => {
    if (isOpen) {
      setLocalColumns(filteredColumns.map(col => ({ ...col })));
    }
    // eslint-disable-next-line
  }, [isOpen, columns]);

  // Debug: log localColumns and their keys
  useEffect(() => {
    if (isOpen) {
      const duplicates = localColumns.filter((col, idx, arr) => arr.findIndex(c => c.field === col.field) !== idx);
      if (duplicates.length > 0) {
        console.warn('[ColumnsWeight] Duplicate fields:', duplicates.map(col => col.field));
      }
    }
  }, [isOpen, localColumns]);

  // Checkbox toggle: if checked, set weight to 1 (default); if unchecked, set to 0
  const handleCheckboxChange = (field) => {
    setLocalColumns(cols =>
      cols.map(col =>
        col.field === field
          ? { ...col, weight: col.weight === 0 ? 1 : 0 }
          : col
      )
    );
  };

  // Slider change: set weight, if 0, also uncheck
  const handleSliderChange = (field, newWeight) => {
    setLocalColumns(cols =>
      cols.map(col =>
        col.field === field
          ? { ...col, weight: newWeight }
          : col
      )
    );
  };

  const handleAccept = () => {
    setColumns(prevCols =>
      prevCols.map(col =>
        excludedFields.includes(col.field)
          ? col
          : {
              ...col,
              weight: localColumns.find(lc => lc.field === col.field)?.weight ?? col.weight,
            }
      )
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-[28rem] max-h-screen overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-1 text-slate-500">Ajusta los pesos</h2>
        <p className="text-sm text-slate-500 mb-4">
          Indica qué variables influyen más en tu <span className="font-semibold">K-Pick</span>.
        </p>
        <form>
          <table className="w-full text-left mb-4">
            <thead>
              <tr className="text-slate-500 text-md">
                <th className="font-semibold px-2 py-1">
                  <span className="inline-flex items-center gap-1">
                    Campos
                    <InfoTooltip color="text-slate-400">
                      Selecciona los campos que quieres incluir en el cálculo del K-Pick.
                    </InfoTooltip>
                  </span>
                </th>
                <th className="font-semibold px-2 py-1 w-1 whitespace-nowrap text-left min-w-[90px]">
                  <span className="inline-flex items-center gap-1">
                    Pesos
                    <InfoTooltip color="text-slate-400">
                      Ajusta el peso relativo de cada campo. Un peso mayor significa que ese criterio tendrá más importancia en el resultado del K-Pick.
                    </InfoTooltip>
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {localColumns.map(col => (
                <tr key={col.field} className="border-b border-slate-100 last:border-b-0">
                  <td className="px-2 py-2">
                    <Checkbox
                      id={`col-check-${col.field}`}
                      checked={col.weight !== 0}
                      onChange={() => handleCheckboxChange(col.field)}
                      label={col.label}
                      activeColor="teal-400"
                    />
                  </td>
                  <td className="px-2 py-2 w-1 whitespace-nowrap min-w-[140px]">
                    <ButtonSlider
                      value={col.weight}
                      onChange={w => handleSliderChange(col.field, w)}
                      disabled={false}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            type="button"
            className="bg-teal-400 text-white px-4 py-2 rounded-md hover:bg-teal-300 transition w-full mt-2"
            onClick={handleAccept}
          >
            Aceptar
          </button>
        </form>
      </div>
    </div>
  );
}

export default ColumnsWeight;