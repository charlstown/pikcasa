// src/config/appData.js
export const appData = [
  {
    field: "id",
    isKpick: false,
    weight: 0,
  },
  {
    field: "link",
    isKpick: false,
    weight: 1,
    label: "Link",
    dataType: "numeric"
  },
  {
    field: "emoji",
    isKpick: false,
    weight: 1,
    label: "❤️",
    dataType: "numeric"
  },
  {
    field: "kpi",
    isKpick: false,
    weight: 1,
    label: "K-Pick",
    dataType: "numeric",
  },
  {
    field: "precio",
    isKpick: false,
    weight: 1,
    label: "Precio",
    dataType: "numeric"
  },
  {
    field: "superficie",
    isKpick: true,
    weight: 1,
    label: "Superficie",
    dataType: "numeric",
    ascending: true
  },
  {
    field: "eurom2",
    isKpick: true,
    weight: 1,
    label: "€/m²",
    dataType: "numeric",
    ascending: false
  },
  {
    field: "habitaciones",
    isKpick: true,
    weight: 1,
    label: "Habitaciones",
    dataType: "numeric",
    ascending: true
  },
  {
    field: "baños",
    isKpick: true,
    weight: 1,
    label: "Baños",
    dataType: "numeric",
    ascending: true
  },
  {
    field: "planta",
    isKpick: true,
    weight: 1,
    label: "Planta",
    dataType: "category",
    options: ["Ático", "Intermedia", "Baja", "Semisótano"],
    ascending: false
  },
  {
    field: "ascensor",
    isKpick: true,
    weight: 1,
    label: "Ascensor",
    dataType: "category",
    options: ["Sí", "No"],
    ascending: false
  },
  {
    field: "calefaccion",
    isKpick: true,
    weight: 1,
    label: "Calefacción",
    dataType: "category",
    options: ["Sí", "No"],
    ascending: false
  },
  {
    field: "fachada",
    isKpick: true,
    weight: 1,
    label: "Fachada",
    dataType: "category",
    options: ["Exterior", "Interior"],
    ascending: false
  },
  {
    field: "terraza",
    isKpick: true,
    weight: 1,
    label: "Terraza",
    dataType: "category",
    options: ["Sí", "No"],
    ascending: false
  },
  {
    field: "garaje",
    isKpick: true,
    weight: 1,
    label: "Garaje",
    dataType: "category",
    options: ["Sí", "No"],
    ascending: false
  },
  {
    field: "trastero",
    isKpick: true,
    weight: 0,
    label: "Trastero",
    dataType: "category",
    options: ["Sí", "No"],
    ascending: false
  },
  {
    field: "ac",
    isKpick: true,
    weight: 0,
    label: "Aire acond.",
    dataType: "category",
    options: ["Sí", "No"],
    ascending: false
  },
  {
    field: "año",
    isKpick: true,
    weight: 0,
    label: "Año de construcción",
    dataType: "numeric",
    ascending: true
  },
  {
    field: "estado",
    isKpick: true,
    weight: 0,
    label: "Estado",
    dataType: "category",
    options: ["Nueva/Reformada", "Buen estado", "Necesita reforma", "Reforma integral"],
    ascending: false
  }
];
