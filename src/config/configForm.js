import { features } from './appData';

// Campos del formulario sin label, type ni options
const baseFormFields = [
  {
    field: "link",
    type: "string",
    maxLength: 255,
    mandatory: false,
    placeholder: "Añade el link al anuncio de tu vivienda",
    width: "full"
  },
  {
    field: "precio",
    type: "numeric",
    mandatory: true,
    placeholder: "Introduce el precio",
    width: "half"
  },
  {
    field: "superficie",
    type: "numeric",
    mandatory: true,
    placeholder: "Introduce la superficie",
    width: "half"
  },
  {
    field: "habitaciones",
    type: "numeric",
    mandatory: false,
    placeholder: "Número de habitaciones",
    width: "half"
  },
  {
    field: "baños",
    type: "numeric",
    mandatory: false,
    placeholder: "Número de baños",
    width: "half"
  },
  {
    field: "planta",
    type: "select",
    default_option: "Intermedia",
    mandatory: false,
    placeholder: "Introduce la planta",
    width: "half"
  },
  {
    field: "ascensor",
    type: "select",
    default_option: "Sí",
    mandatory: false,
    placeholder: "Seleccione una opción",
    width: "half"
  },
  {
    field: "calefaccion",
    type: "select",
    default_option: "Sí",
    mandatory: false,
    placeholder: "Seleccione calefacción",
    width: "half"
  },
  {
    field: "fachada",
    type: "select",
    default_option: "Exterior",
    mandatory: false,
    width: "half"
  },
  {
    field: "terraza",
    type: "select",
    default_option: "No",
    mandatory: false,
    width: "half"
  },
  {
    field: "garaje",
    type: "select",
    default_option: "No",
    mandatory: false,
    width: "half"
  }
];

// Mergea label, type y options desde features si existen
function mergeWithFeatures(field) {
  const feature = features.find(f => f.field === field.field);
  if (feature) {
    return {
      ...field,
      label: feature.label,
      type: feature.type,
      options: feature.options
    };
  }
  return field;
}

export const formFields = baseFormFields.map(mergeWithFeatures);
