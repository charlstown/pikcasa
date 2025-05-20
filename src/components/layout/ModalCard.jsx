import React from "react";
import WindowOverlay from "../common/WindowOverlay";
import Form from "../form/Form";
import { useAppConfig } from '../../config/AppConfigContext';

function ModalCard({ isOpen, onClose, onSubmit }) {
  const { formFields } = useAppConfig();
  return (
    <WindowOverlay isOpen={isOpen} onClose={onClose}>
      <Form
        formFields={formFields}
        onSubmit={onSubmit}
        title="Añadir Vivienda"
        submitLabel="Añadir"
      />
    </WindowOverlay>
  );
}

export default ModalCard;