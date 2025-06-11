import React from "react";
import WindowOverlay from "../common/WindowOverlay";
import Form from "../form/Form";
import { useAppConfig } from '../../config/AppConfigContext';

function ModalCard({ isOpen, onClose, onSubmit, formFields }) {
  return (
    <WindowOverlay isOpen={isOpen} onClose={onClose}>
      <Form
        configForm={formFields}
        onSubmit={onSubmit}
        title="Añadir Vivienda"
        submitLabel="Añadir"
      />
    </WindowOverlay>
  );
}

export default ModalCard;