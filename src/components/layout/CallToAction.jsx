import React, { useState } from "react";

function CallToAction() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <p className="p-4 mb-8 max-w-3xl text-lg text-center text-slate-500 font-medium relative">
      La forma más sencilla de comparar viviendas y elegir la mejor.
      Añade tus datos y pulsa
      <span
        className="relative mx-1 underline underline-offset-4 decoration-teal-400 font-semibold cursor-default"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        tabIndex={0} // Permite mostrar tooltip con teclado (opcional)
      >
        Generar K-Pick
        <span
          className={`
            absolute left-1/2 -top-16 -translate-x-1/2
            w-max min-w-[220px] max-w-xs
            bg-white/80 backdrop-blur-sm
            text-slate-700 text-sm px-4 py-2 rounded-xl shadow-md z-20
            text-center pointer-events-none
            transition-opacity duration-200
            ${showTooltip ? "opacity-100" : "opacity-0"}
          `}
          aria-hidden={!showTooltip}
        >
          <strong className="font-semibold text-teal-500">K-Pick</strong> es la nota global de tu vivienda: un indicador de 0 a 1 que resume en un solo número la calidad según todos tus criterios.
        </span>
      </span>
      para obtener al instante el ranking definitivo.
      <br />
      <span className="block mt-2 text-slate-500">¡Agrega, compara y elige!</span>
    </p>
  );
}

export default CallToAction;
