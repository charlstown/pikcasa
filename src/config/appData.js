// src/config/appData.js
export const appData = [
  {
    field: "id",
    isKpick: false,
  },
  {
    field: "link",
    isKpick: false,
    weight: 1,
    label: "Link",
    dataType: "numeric",
    ascending: true
  },
  {
    field: "emoji",
    isKpick: false,
    weight: 1,
    label: "❤️",
    dataType: "numeric",
    ascending: true
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
    isKpick: true,
    weight: 1,
    label: "Precio",
    dataType: "numeric",
    ascending: true
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
    width: 90,
    highlight: false,
    sortable: true,
    align: "center"
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
    ascending: true
  },
  {
    field: "ascensor",
    isKpick: true,
    weight: 1,
    label: "Ascensor",
    dataType: "category",
    options: ["Sí", "No"],
    ascending: true
  },
  {
    field: "calefaccion",
    isKpick: true,
    weight: 1,
    label: "Calefacción",
    dataType: "category",
    options: ["Sí", "No"],
    ascending: true
  },
  {
    field: "fachada",
    isKpick: true,
    weight: 1,
    label: "Fachada",
    dataType: "category",
    options: ["Exterior", "Interior"],
    ascending: true
  },
  {
    field: "terraza",
    isKpick: true,
    weight: 1,
    label: "Terraza",
    dataType: "category",
    options: ["Sí", "No"],
    ascending: true
  },
  {
    field: "garaje",
    isKpick: true,
    weight: 1,
    label: "Garaje",
    dataType: "category",
    options: ["Sí", "No"],
    ascending: true
  },
  {
    field: "trastero",
    isKpick: true,
    weight: 0,
    label: "Trastero",
    dataType: "category",
    options: ["Sí", "No"],
    ascending: true
  },
  {
    field: "ac",
    isKpick: true,
    weight: 0,
    label: "Aire acond.",
    dataType: "category",
    options: ["Sí", "No"],
    ascending: true
  },
  {
    field: "año",
    isKpick: true,
    weight: 0,
    label: "Año de construcción",
    dataType: "numeric",
    options: [],
    ascending: true
  },
  {
    field: "estado",
    isKpick: true,
    weight: 0,
    label: "Estado",
    dataType: "category",
    options: ["Nueva/Reformada", "Buen estado", "Necesita reforma", "Reforma integral"],
    ascending: true
  }
];
