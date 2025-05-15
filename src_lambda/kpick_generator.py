import json
import traceback

def lambda_handler(event, context):
    try:
        if "body" in event:
            data = json.loads(event["body"])
        else:
            # Evento directo (por ejemplo test en consola Lambda)
            data = event

        rows = data.get("rows", [])

        # Cálculo de máximos para normalizar
        max_values = {
            "precio": max((r.get("precio", 0) for r in rows), default=1),
            "superficie": max((r.get("superficie", 1) for r in rows), default=1),
            "habitaciones": max((r.get("habitaciones", 1) for r in rows), default=1),
            "baños": max((r.get("baños", 1) for r in rows), default=1),
        }

        # Mappings de las variables categóricas
        planta_mapping = {
            "Semisótano": 0, 
            "Baja": 0.25, 
            "Intermedia": 0.75, 
            "Ático": 1
        }
        bool_mapping = {"No": 0, "Sí": 1}
        fachada_mapping = {"Interior": 0, "Exterior": 1}

        for row in rows:
            factors = [
                1 - (row.get("precio", 0) / max_values["precio"]),
                row.get("superficie", 0) / max_values["superficie"],
                planta_mapping.get(row.get("planta", "Intermedia"), 0.75),
                bool_mapping.get(row.get("ascensor", "Sí"), 1),
                row.get("habitaciones", 0) / max_values["habitaciones"],
                row.get("baños", 0) / max_values["baños"],
                bool_mapping.get(row.get("calefacción", "Sí"), 1),
                fachada_mapping.get(row.get("fachada", "Exterior"), 1),
                bool_mapping.get(row.get("terraza", "No"), 0),
                bool_mapping.get(row.get("garaje", "No"), 0),
            ]
            kpi = sum(factors) / len(factors) * 100
            row["kpi"] = int(kpi)

        return {
            "statusCode": 200,
            "headers": { "Content-Type": "application/json" },
            "body": json.dumps({
                "message": "Lambda ejecutada correctamente.",
                "rows": rows
            }),
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "headers": { "Content-Type": "application/json" },
            "body": json.dumps({
                "error": str(e),
                "trace": traceback.format_exc(),
                "message": "Error en la ejecución de la lambda."
            }),
        }