import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import IconEmojiHeart from "../../assets/IconEmojiHeart";
import IconEmojiCross from "../../assets/IconEmojiCross";

const emojiOptions = [
  { key: "", icon: <span className="w-6 h-6 text-slate-300">–</span> },
  { key: "heart", icon: <IconEmojiHeart className="w-6 h-6 text-teal-500" /> },
  { key: "cross", icon: <IconEmojiCross className="w-6 h-6 text-red-500" /> },
];

const emojiMap = {
  heart: <IconEmojiHeart className="w-6 h-6 text-teal-500" />,
  cross: <IconEmojiCross className="w-6 h-6 text-red-500" />,
  "": null,
};

export default function EmojiSelectorCell({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });
  const btnRef = useRef();
  const menuRef = useRef();

  // Calcula la posición del menú al abrir
  useEffect(() => {
    if (open && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setMenuPos({
        x: rect.left + rect.width / 2,
        y: rect.bottom + 4,
      });
    }
  }, [open]);

  // Click-outside seguro para portal
  useEffect(() => {
    function handleClick(event) {
      if (
        btnRef.current &&
        !btnRef.current.contains(event.target) &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [open]);

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        className="w-8 h-8 flex items-center justify-center p-1 rounded-full border border-slate-200 bg-white hover:border-teal-300 transition"
        onClick={() => setOpen((v) => !v)}
        tabIndex={-1}
      >
        {emojiMap[value] ?? <span className="text-slate-300 w-6 h-6">–</span>}
      </button>
      {open &&
        createPortal(
          <div
            ref={menuRef}
            className="bg-white border border-slate-200 rounded shadow flex flex-col z-[9999]"
            style={{
              position: "fixed",
              left: menuPos.x,
              top: menuPos.y,
              transform: "translateX(-50%)",
              minWidth: "2.5rem",
            }}
          >
            {emojiOptions.map(opt => (
              <button
                key={opt.key}
                type="button"
                className={`p-2 hover:bg-teal-50 flex items-center justify-center ${value === opt.key ? "bg-teal-50" : ""}`}
                onClick={() => {
                  onChange(opt.key);
                  setOpen(false);
                }}
              >
                {opt.icon}
              </button>
            ))}
          </div>,
          document.body
        )
      }
    </>
  );
}