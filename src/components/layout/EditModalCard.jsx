import React from "react";
import WindowOverlay from "../common/WindowOverlay";
import Form from "../form/Form";
import { useAppConfig } from '../../config/AppConfigContext';

function EditModalCard({ isOpen, onClose, onSubmit, rowData }) {
  const { configForm } = useAppConfig();
  if (!isOpen) return null;

  const handleFormSubmit = (formData) => {
    onSubmit(formData);
  };

  return (
    <WindowOverlay isOpen={isOpen} onClose={onClose}>
      <Form
        configForm={configForm}
        onSubmit={handleFormSubmit}
        title="Editar Vivienda"
        submitLabel="Guardar cambios"
        initialValues={rowData}
      />
    </WindowOverlay>
  );
}

export default EditModalCard;