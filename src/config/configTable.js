// src/config/configTable.js
import { features } from './appData';

// Columnas base sin label, type ni options
const baseTableColumns = [
  {
    field: "id",
    weight: 0,
    visible: false,
  },
  {
    field: "link",
    weight: 1,
    visible: true,
    highlight: false,
    sortable: false
  },
  {
    field: "emoji",
    weight: 1,
    visible: true,
    highlight: false,
    sortable: false
  },
  {
    field: "kpi",
    weight: 1,
    visible: true,
    highlight: true,
    sortable: true
  },
  {
    field: "precio",
    weight: 1,
    visible: true,
    highlight: false,
    sortable: true
  },
  {
    field: "superficie",
    weight: 1,
    visible: true,
    highlight: false,
    sortable: true
  },
  {
    field: "eurom2",
    weight: 1,
    visible: true,
    highlight: false,
    sortable: true
  },
  {
    field: "habitaciones",
    weight: 1,
    visible: true,
    highlight: false,
    sortable: false
  },
  {
    field: "baños",
    weight: 1,
    visible: true,
    highlight: false,
    sortable: false
  },
  {
    field: "planta",
    weight: 1,
    visible: true,
    highlight: false,
    sortable: false
  },
  {
    field: "ascensor",
    weight: 1,
    visible: true,
    highlight: false,
    sortable: false
  },
  {
    field: "calefaccion",
    weight: 1,
    visible: true,
    highlight: false,
    sortable: false
  },
  {
    field: "fachada",
    weight: 1,
    visible: true,
    highlight: false,
    sortable: false
  },
  {
    field: "garaje",
    weight: 1,
    visible: true,
    highlight: false,
    sortable: false
  },
  {
    field: "terraza",
    weight: 1,
    visible: true,
    highlight: false,
    sortable: false
  },
  {
    field: "trastero",
    weight: 0,
    visible: true,
    highlight: false,
    sortable: false
  },
  {
    field: "ac",
    weight: 0,
    visible: true,
    highlight: false,
    sortable: false
  },
  {
    field: "año",
    weight: 0,
    visible: true,
    highlight: false,
    sortable: true
  },
  {
    field: "estado",
    weight: 0,
    visible: true,
    highlight: false,
    sortable: false
  }
];

function mergeWithFeatures(col) {
  const feature = features.find(f => f.field === col.field);
  if (feature) {
    return {
      ...col,
      label: feature.label
    };
  }
  return col;
}

export const tableColumns = baseTableColumns.map(mergeWithFeatures);
