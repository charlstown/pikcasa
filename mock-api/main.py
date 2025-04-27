from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

# Permitir CORS para desarrollo local
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción pon solo el origen frontend
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modelo para cada vivienda (campo area en vez de surface)
class Vivienda(BaseModel):
    id: int
    name: str
    price: float
    area: float

@app.post("/api/endpoint")
async def recibir_viviendas(viviendas: List[Vivienda]):
    print("Datos recibidos:", viviendas)
    # Devuelve la métrica mock
    return {
        "ok": True,
        "msg": "Datos recibidos correctamente",
        "data": viviendas,
        "metric": [0.88, 0.65, 0.75]  # Ejemplo de métrica por vivienda
    }
