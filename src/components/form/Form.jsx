import React, { useState } from "react";
import FormField from "./FormField";

function Form({ formFields, onSubmit, title, submitLabel }) {
  // Inicializa el estado usando default_option si existe
  const [formData, setFormData] = useState(
    formFields.reduce(
      (acc, field) => ({
        ...acc,
        [field.name]: field.default_option || "",
      }),
      {}
    )
  );
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    formFields.forEach((field) => {
      const value = formData[field.name];
      if (field.mandatory && !value) {
        newErrors[field.name] = `${field.label} es obligatorio.`;
      } else if (field.type === "numeric" && isNaN(value)) {
        newErrors[field.name] = `${field.label} debe ser un número.`;
      } else if (field.type === "string" && field.maxLength && value.length > field.maxLength) {
        newErrors[field.name] = `${field.label} no puede tener más de ${field.maxLength} caracteres.`;
      }
    });
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
      <div className="flex flex-wrap -mx-2">
        {formFields.map((field) => (
          <FormField
            key={field.name}
            field={field}
            value={formData[field.name]}
            onChange={handleChange}
            error={errors[field.name]}
          />
        ))}
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-400"
      >
        {submitLabel || "Enviar"}
      </button>
    </form>
  );
}

export default Form;