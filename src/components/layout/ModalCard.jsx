import React from "react";
import Form from "../form/Form";

function ModalCard({ isOpen, onClose, onSubmit }) {
  if (!isOpen) return null;

  const formFields = [
    { name: "link", label: "Link", type: "string", maxLength: 255, mandatory: false, placeholder: "Añade el link al anuncio de tu vivienda", width: "full" },
    { name: "precio", label: "Precio", type: "numeric", mandatory: true, placeholder: "Introduce el precio", width: "half" },
    { name: "superficie", label: "Superficie", type: "numeric", mandatory: true, placeholder: "Introduce el área", width: "half" },
    { name: "planta", label: "Planta", type: "select", options: ["Semisótano", "Baja", "Intermedia", "Ático"], default_option: "Intermedia", mandatory: false, placeholder: "Introduce la planta", width: "half" },
    { name: "ascensor", label: "Ascensor", type: "select", options: ["Sí", "No"], default_option: "Sí", mandatory: false, placeholder: "Seleccione una opción", width: "half" },
    { name: "habitaciones", label: "Habitaciones", type: "numeric", mandatory: false, placeholder: "Número de habitaciones", width: "half" },
    { name: "baños", label: "Baños", type: "numeric", mandatory: false, placeholder: "Número de baños", width: "half" },
    { name: "calefacción", label: "Calefacción", type: "select", options: ["Caldera", "Electrica", "No tiene"], default_option: "Caldera", mandatory: false, placeholder: "Seleccione calefacción", width: "half" },
    { name: "fachada", label: "Fachada", type: "select", options: ["Exterior", "Interior"], default_option: "Exterior", mandatory: false, width: "half" },
    { name: "terraza", label: "Terraza", type: "select", options: ["Sí", "No"], default_option: "No", mandatory: false, width: "half" },
    { name: "garaje", label: "Garaje", type: "select", options: ["Sí", "No"], default_option: "No", mandatory: false, width: "half" },
  ];

  const handleFormSubmit = (formData) => {
    onSubmit(formData);
  };

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-[30rem] max-h-screen overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <Form
          formFields={formFields}
          onSubmit={handleFormSubmit}
          title="Nueva Vivienda"
          submitLabel="Guardar"
        />
      </div>
    </div>
  );
}

export default ModalCard;