import { API_URL } from './config';

export async function sendRowsToBackend(rows) {
  const dataToSend = rows.map(row => ({
    id: row.id,
    name: row.name,
    price: row.price,
    area: row.surface,
  }));

  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dataToSend),
  });

  if (!response.ok) {
    throw new Error("Error en la respuesta del servidor");
  }

  return response.json();
}
