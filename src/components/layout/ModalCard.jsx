import React from "react";
import WindowOverlay from "../common/WindowOverlay";
import Form from "../form/Form";
import { useAppConfig } from '../../config/AppConfigContext';

function ModalCard({ isOpen, onClose, onSubmit }) {
  const { configForm } = useAppConfig();
  return (
    <WindowOverlay isOpen={isOpen} onClose={onClose}>
      <Form
        configForm={configForm}
        onSubmit={onSubmit}
        title="Añadir Vivienda"
        submitLabel="Añadir"
      />
    </WindowOverlay>
  );
}

export default ModalCard;