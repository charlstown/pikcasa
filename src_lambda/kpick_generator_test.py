from kpick_generator import lambda_handler
import json

# Simula un evento de AWS Lambda con datos de ejemplo
test_event = {
    "body": json.dumps({
        "rows": [
            {
                "precio": 200000,
                "superficie": 100,
                "planta": "Intermedia",
                "ascensor": "Sí",
                "habitaciones": 3,
                "baños": 2,
                "calefacción": "Sí",
                "fachada": "Exterior",
                "terraza": "Sí",
                "garaje": "No"
            },
            {
                "precio": 150000,
                "superficie": 80,
                "planta": "Baja",
                "ascensor": "No",
                "habitaciones": 2,
                "baños": 1,
                "calefacción": "No",
                "fachada": "Interior",
                "terraza": "No",
                "garaje": "Sí"
            }
        ]
    })
}

# Context puede ser None para pruebas locales
response = lambda_handler(test_event, None)
print("Status code:", response["statusCode"])
print("Response body:", response["body"])