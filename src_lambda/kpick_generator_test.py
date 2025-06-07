from kpick_generator import lambda_handler
import json

# Simula un evento de AWS Lambda con datos de ejemplo
test_event = {
    "body": json.dumps({
    "rows": [
        {
            "id": 1,
            "link": "https://www.example.com/property/1",
            "emoji": "",
            "kpi": 50,
            "precio": 250000,
            "superficie": 120,
            "eurom2": 2083,
            "habitaciones": 3,
            "baños": 2,
            "planta": "Intermedia",
            "ascensor": "Sí",
            "calefaccion": "Sí",
            "fachada": "Exterior",
            "garaje": "No",
            "terraza": "Sí"
        },
        {
            "id": 2,
            "link": "https://www.example.com/property/2",
            "emoji": "",
            "kpi": 47,
            "precio": 210000,
            "superficie": 90,
            "eurom2": 2333,
            "habitaciones": 2,
            "baños": 1,
            "planta": "Baja",
            "ascensor": "No",
            "calefaccion": "No",
            "fachada": "Interior",
            "garaje": "Sí",
            "terraza": "No"
        },
        {
            "id": 3,
            "link": "https://www.example.com/property/3",
            "emoji": "",
            "kpi": 50,
            "precio": 320000,
            "superficie": 150,
            "eurom2": 2133,
            "habitaciones": 3,
            "baños": 2,
            "planta": "Ático",
            "ascensor": "Sí",
            "calefaccion": "Sí",
            "fachada": "Exterior",
            "garaje": "Sí",
            "terraza": "Sí"
        }
    ],
    "columns": [
        {
            "field": "id",
            "isKpick": False,
            "weight": 0
        },
        {
            "field": "link",
            "isKpick": False,
            "weight": 1,
            "label": "Link",
            "dataType": "numeric",
            "ascending": False
        },
        {
            "field": "emoji",
            "isKpick": False,
            "weight": 1,
            "label": "❤️",
            "dataType": "numeric",
            "ascending": False
        },
        {
            "field": "kpi",
            "isKpick": False,
            "weight": 1,
            "label": "K-Pick",
            "dataType": "numeric"
        },
        {
            "field": "precio",
            "isKpick": True,
            "weight": 1,
            "label": "Precio",
            "dataType": "numeric"        },
        {
            "field": "superficie",
            "isKpick": True,
            "weight": 1,
            "label": "Superficie",
            "dataType": "numeric",
            "ascending": False
        },
        {
            "field": "eurom2",
            "isKpick": True,
            "weight": 1,
            "label": "€/m²",
            "dataType": "numeric"
        },
        {
            "field": "habitaciones",
            "isKpick": True,
            "weight": 0.25,
            "label": "Habitaciones",
            "dataType": "numeric"
        },
        {
            "field": "baños",
            "isKpick": True,
            "weight": 0.75,
            "label": "Baños",
            "dataType": "numeric"
        },
        {
            "field": "planta",
            "isKpick": True,
            "weight": 1,
            "label": "Planta",
            "dataType": "category",
            "options": [
                "Ático",
                "Intermedia",
                "Baja",
                "Semisótano"
            ],
            "ascending": False
        },
        {
            "field": "ascensor",
            "isKpick": True,
            "weight": 0.25,
            "label": "Ascensor",
            "dataType": "category",
            "options": [
                "Sí",
                "No"
            ],
            "ascending": False
        },
        {
            "field": "calefaccion",
            "isKpick": True,
            "weight": 1,
            "label": "Calefacción",
            "dataType": "category",
            "options": [
                "Sí",
                "No"
            ],
            "ascending": False
        },
        {
            "field": "fachada",
            "isKpick": True,
            "weight": 0,
            "label": "Fachada",
            "dataType": "category",
            "options": [
                "Exterior",
                "Interior"
            ],
            "ascending": False
        },
        {
            "field": "terraza",
            "isKpick": True,
            "weight": 0,
            "label": "Terraza",
            "dataType": "category",
            "options": [
                "Sí",
                "No"
            ],
            "ascending": False
        },
        {
            "field": "garaje",
            "isKpick": True,
            "weight": 0,
            "label": "Garaje",
            "dataType": "category",
            "options": [
                "Sí",
                "No"
            ],
            "ascending": False
        },
        {
            "field": "trastero",
            "isKpick": True,
            "weight": 0,
            "label": "Trastero",
            "dataType": "category",
            "options": [
                "Sí",
                "No"
            ],
            "ascending": False
        },
        {
            "field": "ac",
            "isKpick": True,
            "weight": 0,
            "label": "Aire acond.",
            "dataType": "category",
            "options": [
                "Sí",
                "No"
            ],
            "ascending": False
        },
        {
            "field": "año",
            "isKpick": True,
            "weight": 0,
            "label": "Año de construcción",
            "dataType": "numeric",
            "options": [],
            "ascending": False
        },
        {
            "field": "estado",
            "isKpick": True,
            "weight": 0,
            "label": "Estado",
            "dataType": "category",
            "options": [
                "Nueva/Reformada",
                "Buen estado",
                "Necesita reforma",
                "Reforma integral"
            ],
            "ascending": False
        }
    ]
})
}

# Context puede ser None para pruebas locales
response = lambda_handler(test_event, None)
print("Status code:", response["statusCode"])
print("Response body:", response["body"])