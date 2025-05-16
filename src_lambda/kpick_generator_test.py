from kpick_generator import lambda_handler
import json

# Simula un evento de AWS Lambda con datos de ejemplo
test_event = {
    "body": json.dumps({
        "rows": [
            {
                "id": 1,
                "link": "https://www.example.com/property/1",
                "kpi": 0,
                "precio": 250000,
                "superficie": 120,
                "eurom2": 2083,
                "planta": "Intermedia",
                "ascensor": "Sí",
                "habitaciones": 3,
                "baños": 2,
                "calefaccion": "Sí",
                "fachada": "Exterior",
                "garaje": "No",
                "terraza": "Sí"
            },
            {
                "id": 2,
                "link": "https://www.example.com/property/2",
                "kpi": 0,
                "precio": 210000,
                "superficie": 90,
                "eurom2": 2333,
                "planta": "Baja",
                "ascensor": "No",
                "habitaciones": 2,
                "baños": 1,
                "calefaccion": "No",
                "fachada": "Interior",
                "garaje": "Sí",
                "terraza": "No"
            },
            {
                "id": 3,
                "link": "https://www.example.com/property/3",
                "kpi": 0,
                "precio": 320000,
                "superficie": 150,
                "eurom2": 2133,
                "planta": "Ático",
                "ascensor": "Sí",
                "habitaciones": 4,
                "baños": 3,
                "calefaccion": "Sí",
                "fachada": "Exterior",
                "garaje": "Sí",
                "terraza": "Sí"
            }
        ],
        "columns": [
            {
                "field": "id",
                "active": True
            },
            {
                "field": "link",
                "active": True
            },
            {
                "field": "kpi",
                "active": True
            },
            {
                "field": "precio",
                "active": True
            },
            {
                "field": "superficie",
                "active": True
            },
            {
                "field": "eurom2",
                "active": True
            },
            {
                "field": "planta",
                "active": True
            },
            {
                "field": "ascensor",
                "active": True
            },
            {
                "field": "habitaciones",
                "active": True
            },
            {
                "field": "baños",
                "active": True
            },
            {
                "field": "calefaccion",
                "active": True
            },
            {
                "field": "fachada",
                "active": False
            },
            {
                "field": "garaje",
                "active": True
            },
            {
                "field": "terraza",
                "active": False
            }
        ]
    })
}

# Context puede ser None para pruebas locales
response = lambda_handler(test_event, None)
print("Status code:", response["statusCode"])
print("Response body:", response["body"])