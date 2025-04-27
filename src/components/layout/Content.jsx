// SRC/components/layout/Content.jsx
import React, { useState } from 'react';
import Table from '../table/Table';
import Button from '../common/Button';
import { sendRowsToBackend } from '../../api/generate';

function Content() {
  const [rows, setRows] = useState([
    { id: 1, name: "Castellana 324 2,C.", price: 150000, surface: 75 },
    { id: 2, name: "Principe de vergara 27, 4A.", price: 175000, surface: 82 }
  ]);

  const handleButtonClick = async () => {
    try {
      const result = await sendRowsToBackend(rows);
      console.log('Respuesta:', result);
      // Lógica con el resultado
    } catch (err) {
      console.error('Error al enviar:', err);
      // Lógica de error
    }
  };

  return (
    <main className="flex-1 flex flex-col items-center justify-start p-8">
      <Button className="flex items-center mb-4" onClick={handleButtonClick}>
        Generar K-Pick
      </Button>
      <Table rows={rows} setRows={setRows} />
    </main>
  );
}

export default Content;
