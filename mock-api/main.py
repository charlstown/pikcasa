from fastapi import FastAPI
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
    # Ejemplo: genera una kpick mock para cada vivienda
    data = []
    for idx, viv in enumerate(viviendas):
        data.append({
            "id": viv.id,
            "name": viv.name,
            "price": viv.price,
            "area": viv.area,
            "kpick": round(0.5 + idx * 0.2, 2)
        })
    return {
        "ok": True,
        "msg": "Datos recibidos correctamente",
        "data": data
    }
