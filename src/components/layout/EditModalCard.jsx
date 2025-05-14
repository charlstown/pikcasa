import React from "react";
import Form from "../form/Form";

function EditModalCard({ isOpen, onClose, onSubmit, formFields, rowData }) {
  if (!isOpen) return null;

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
        onClick={e => e.stopPropagation()}
      >
        <Form
          formFields={formFields}
          onSubmit={handleFormSubmit}
          title="Editar Vivienda"
          submitLabel="Guardar cambios"
          initialValues={rowData}
        />
      </div>
    </div>
  );
}

export default EditModalCard;