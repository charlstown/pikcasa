import React from "react";
import WindowOverlay from "../common/WindowOverlay";
import Form from "../form/Form";

function ModalCard({ isOpen, onClose, onSubmit, formFields }) {
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