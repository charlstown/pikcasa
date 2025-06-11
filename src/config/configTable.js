// src/config/configTable.js
import { appData } from './appData';

// Columnas base sin label, type ni options
const baseTableColumns = [
  {
    field: "id",
  },
  {
    field: "link",
    highlight: false,
    sortable: false
  },
  {
    field: "emoji",
    highlight: false,
    sortable: false
  },
  {
    field: "nombre",
    highlight: false,
    sortable: false
  },
  {
    field: "kpi",
    highlight: true,
    sortable: true
  },
  {
    field: "precio",
    highlight: false,
    sortable: true
  },
  {
    field: "superficie",
    highlight: false,
    sortable: true
  },
  {
    field: "eurom2",
    highlight: false,
    sortable: true
  },
  {
    field: "habitaciones",
    highlight: false,
    sortable: false
  },
  {
    field: "baños",
    highlight: false,
    sortable: false
  },
  {
    field: "planta",
    highlight: false,
    sortable: false
  },
  {
    field: "ascensor",
    highlight: false,
    sortable: false
  },
  {
    field: "calefaccion",
    highlight: false,
    sortable: false
  },
  {
    field: "fachada",
    highlight: false,
    sortable: false
  },
  {
    field: "garaje",
    highlight: false,
    sortable: false
  },
  {
    field: "terraza",
    highlight: false,
    sortable: false
  },
  {
    field: "trastero",
    highlight: false,
    sortable: false
  },
  {
    field: "ac",
    highlight: false,
    sortable: false
  },
  {
    field: "año",
    highlight: false,
    sortable: true
  },
  {
    field: "estado",
    highlight: false,
    sortable: false
  }
];

export const configTable = baseTableColumns;
