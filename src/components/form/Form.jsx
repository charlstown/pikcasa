import React, { useState, useEffect } from "react";
import FormField from "./FormField";

function Form({ configForm, onSubmit, title, submitLabel, initialValues }) {
  const getInitialState = () =>
    configForm.reduce(
      (acc, field) => ({
        ...acc,
        [field.field]:
          (initialValues && initialValues[field.field] !== undefined)
            ? initialValues[field.field]
            : field.default_option || "",
      }),
      {}
    );

  const [formData, setFormData] = useState(getInitialState());
  const [errors, setErrors] = useState({});

  // Si initialValues cambia (por ejemplo, al editar otra fila), actualiza el estado
  useEffect(() => {
    setFormData(getInitialState());
  }, [initialValues, configForm]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    configForm.forEach((field) => {
      const value = formData[field.field];
      if (field.mandatory && !value) {
        newErrors[field.field] = `${field.label} es obligatorio.`;
      } else if (field.type === "numeric" && isNaN(value)) {
        newErrors[field.field] = `${field.label} debe ser un número.`;
      } else if (field.type === "string" && field.maxLength && value.length > field.maxLength) {
        newErrors[field.field] = `${field.label} no puede tener más de ${field.maxLength} caracteres.`;
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
      {title && <h2 className="text-xl font-bold mb-4 text-slate-500">{title}</h2>}
      <div className="flex flex-wrap -mx-2">
        {configForm.map((field) => (
          <FormField
            key={field.field}
            field={field}
            value={formData[field.field]}
            onChange={handleChange}
            error={errors[field.field]}
          />
        ))}
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-teal-400 text-white rounded-lg hover:bg-teal-300"
      >
        {submitLabel || "Enviar"}
      </button>
    </form>
  );
}

export default Form;