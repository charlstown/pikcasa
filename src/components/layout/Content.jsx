// src/components/layout/Content.jsx
import React, { useState } from 'react';

import Button from '../common/Button';
import CallToAction from './CallToAction';
import DataTable from '../table/Table'

import { sendRowsToBackend } from '../../api/generate';

const ALL_DYNAMIC_COLUMNS = [
  { key: "habitaciones", label: "Habitaciones", default: 2 },
  { key: "banos", label: "Baños", default: 2 },
  { key: "planta", label: "Planta", default: "intermedia" },
];

function Content() {
  //pass
  return (
    <main className="bg-teal-50 flex-1 flex flex-col items-center justify-start p-2">
      <CallToAction />
      <div className="flex gap-4 mb-2">
        <Button className="flex items-center">
          Generar K-Pick
        </Button>
      </div>

      <DataTable />

    </main>
  );
}

export default Content;
