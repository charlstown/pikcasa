import React from "react";
import WindowOverlay from "../common/WindowOverlay";
import Form from "../form/Form";

function EditModalCard({ isOpen, onClose, onSubmit, formFields, rowData }) {
  if (!isOpen) return null;

  const handleFormSubmit = (formData) => {
    onSubmit(formData);
  };

  return (
    <WindowOverlay isOpen={isOpen} onClose={onClose}>
      <Form
        formFields={formFields}
        onSubmit={handleFormSubmit}
        title="Editar Vivienda"
        submitLabel="Guardar cambios"
        initialValues={rowData}
      />
    </WindowOverlay>
  );
}

export default EditModalCard;