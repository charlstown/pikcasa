import React from "react";
import IconDeleteRow from "../../assets/IconDeleteRow";
import IconEditRow from "../../assets/IconEditRow";
import IconLink from "../../assets/IconLink";
import EmojiSelectorCell from "./EmojiSelectorCell";

function TableRow({ row, columns, onRowDelete, onEditRow, onEmojiChange }) {
  return (
    <tr className="group hover:bg-teal-50 transition-colors">
      {columns
        .filter(({ weight }) => weight !== 0)
        .map(({ field, highlight, align }) => (
          <td
            key={field}
            className={`p-2 text-sm text-slate-700 min-h-[2.5rem]
              ${highlight ? "bg-teal-50 text-teal-400 font-bold" : "bg-white group-hover:bg-teal-50"}
              ${align === "center" ? "text-center" : align === "right" ? "text-right" : "text-left"}`}
          >
            {field === "link" ? (
              <a
                href={row[field]}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center items-center text-slate-500 hover:text-teal-500"
              >
                <IconLink />
              </a>
            ) : field === "emoji" ? (
              <EmojiSelectorCell
                value={row.emoji}
                onChange={emoji => onEmojiChange(row.id, emoji)}
              />
            ) : field === "precio" ? (
              <span className="font-semibold text-slate-500">
                {Number(row[field]).toLocaleString("es-ES")} €
              </span>
            ) : field === "superficie" ? (
              <span className="font-semibold text-slate-500">
                {Number(row[field]).toLocaleString("es-ES")} m²
              </span>
            ) : field === "eurom2" ? (
              <span className="font-semibold text-slate-500">
                {row[field] ? `${Number(row[field]).toLocaleString("es-ES")} €/m²` : ""}
              </span>
            ) : (
              row[field]
            )}
          </td>
        ))}
      <td className="py-3 mr-2 text-sm text-slate-700 align-middle flex items-center justify-center space-x-2 min-h-[2.5rem]">
        <button
          type="button"
          className="text-slate-400 hover:text-teal-500"
          onClick={onEditRow}
        >
          <IconEditRow />
        </button>
        <button
          type="button"
          className="text-slate-400 hover:text-red-500"
          onClick={onRowDelete}
        >
          <IconDeleteRow />
        </button>
      </td>
    </tr>
  );
}

export default TableRow;