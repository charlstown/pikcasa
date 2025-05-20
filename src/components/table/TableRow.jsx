import React from "react";
import IconCross from "../../assets/IconCross";
import IconEditRow from "../../assets/IconEditRow";
import IconLink from "../../assets/IconLink";
import EmojiSelectorCell from "./EmojiSelectorCell";
import IconButton from "../common/IconButton";
import IconLinkButton from "../common/IconLinkButton";

function TableRow({ row, columns, onRowDelete, onEditRow, onEmojiChange }) {
  return (
    <tr className="group hover:bg-teal-50 transition-colors">
      {columns
        .filter(({ weight }) => weight !== 0)
        .map(({ field, highlight }) => (
          <td
            key={field}
            className={`p-2 text-sm text-slate-700 min-h-[2.5rem] text-center
              ${highlight ? "bg-teal-50 text-teal-400 font-bold" : "bg-white group-hover:bg-teal-50"}`}
          >
            {field === "link" ? (
              <IconLinkButton link={row[field]} labelHelper="Abrir link del anuncio">
                <IconLink />
              </IconLinkButton>
            ) : field === "emoji" ? (
              <EmojiSelectorCell
                value={row.emoji}
                onChange={emoji => onEmojiChange(row.id, emoji)}
              />
            ) : field === "precio" ? (
              <span className="font-semibold text-slate-500 text-center block">
                {Number(row[field]).toLocaleString("es-ES")} €
              </span>
            ) : field === "superficie" ? (
              <span className="font-semibold text-slate-500 text-center block">
                {Number(row[field]).toLocaleString("es-ES")} m²
              </span>
            ) : field === "eurom2" ? (
              <span className="font-semibold text-slate-500 text-center block">
                {row[field] ? `${Number(row[field]).toLocaleString("es-ES")} €/m²` : ""}
              </span>
            ) : (
              <span className="text-center block">{row[field]}</span>
            )}
          </td>
        ))}
      <td className="py-3 mr-2 text-sm text-slate-700 align-middle flex items-center justify-center space-x-2 min-h-[2.5rem]">
        <IconButton
          className="text-slate-400 hover:text-teal-500"
          onClick={onEditRow}
          helperLabel="Editar fila"
        >
          <IconEditRow />
        </IconButton>
        <IconButton
          className="text-slate-400 hover:text-red-500"
          onClick={onRowDelete}
          helperLabel="Eliminar fila"
        >
          <IconCross />
        </IconButton>
      </td>
    </tr>
  );
}

export default TableRow;